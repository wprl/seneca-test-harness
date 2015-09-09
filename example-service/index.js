'use strict';

var pkg = require('./package');
var express = require('express');

var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  seneca.add({ role: name, cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  seneca.act('role:web', { use: {
    prefix: '/',
    pin: { role: name, cmd: '*' },
    map: { ping: true }
  }});

  express()
    .use(function (request, response, next) {
      request.body = {}; // stop warning message
      next();
    })
    .use(seneca.export('web'))
    .listen(80);

  return name;
};
