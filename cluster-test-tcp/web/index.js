'use strict';

var pkg = require('./package');
var express = require('express');

var name = pkg.name

var config = {
  seneca: {
    transport: {
      type: 'tcp',
      tcp: { port: process.env.WORKER_1_PORT_23_TCP_PORT || 23 }
    }
  }
};

module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca);

  seneca.use('seneca-web');

  seneca.client({
    type: 'tcp',
    port: process.env.WORKER_1_PORT_23_TCP_PORT,
    host: process.env.WORKER_1_PORT_23_TCP_ADDR,
    pin: 'role:test-worker,cmd:*'
  });

  console.log('TALKING TO %s', process.env.WORKER_1_PORT);

  // Create a web server.
  seneca.add({ role: 'test-web', cmd: 'proxy' }, function (args, done) {
    done(null, {msg:'pong'})
    //this.act({ role: 'test-worker', cmd: 'ping' }, done);
  });

  seneca.act({ role: 'web' }, { use: {
    prefix: '/',
    pin: { role: 'test-web', cmd: '*' },
    map: { proxy: { GET: true, alias: 'ping' } }
  }});

  var app = express();
  app.use(function (req, res, next) {
    req.body = {}; // stop warning output
    next();
  });
  app.use(seneca.export('web'));
  app.listen(80);

  return name;
};
