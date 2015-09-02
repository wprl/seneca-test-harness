'use strict';

var pkg = require('./package');
var express = require('express');

var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  // seneca.options(config.seneca);

  seneca.client({ host: 'localhost' });

  seneca.add({ role: name, cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  seneca.act('role:web', { use: {
    prefix: '/api',
    pin: { role: name, cmd: '*' },
    map: { ping: true }
  }});

  express()
    .use(seneca.export('web'))
    .listen(80);

  return name;
};
