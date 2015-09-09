'use strict';

var pkg = require('./package');
var express = require('express');

var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  seneca.use('seneca-web');

  // Create a web server.
  seneca.add({ role: 'test-web', cmd: 'proxy' }, function (args, done) {
    this.act({ role: 'test-worker', cmd: 'ping' }, function (error, result) {
      if (error) return done(error);
      done(null, result);
    });
  });

  seneca.act({ role: 'web' }, { use: {
    prefix: '/',
    pin: { role: 'test-web', cmd: '*' },
    map: { proxy: { GET: true, alias: 'ping' } }
  }});

  seneca.ready(function () {
    var app = express();
    app.use(function (req, res, next) {
      req.body = {}; // stop warning output
      next();
    });
    app.use(seneca.export('web'));
    app.listen(80);
    console.log('HTTP server listening on 80');
  });

  return name;
};
