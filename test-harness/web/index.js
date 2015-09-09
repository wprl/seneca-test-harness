'use strict';

var pkg = require('./package');
var express = require('express');

var name = pkg.name
var config = {
  seneca: {
    transport: {
      type: 'beanstalk',
      port: process.env.BEANSTALK_PORT_11300_TCP_PORT,
      host: process.env.BEANSTALK_PORT_11300_TCP_ADDR
    }
  }
};

module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca);
  seneca.use(require('seneca-beanstalk-transport'));
  seneca.use('seneca-web');
  seneca.client({ type: 'beanstalk' });

  console.log('TALKING TO %s', process.env.BEANSTALK_PORT);

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
