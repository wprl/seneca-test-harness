'use strict';

var pkg = require('./package');

var config = {
  seneca: {
    transport: { type: 'tcp', port: 23 }
  }
};


var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca)

  // Create a worker.
  seneca.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    return done(null, { msg: 'pong' });
  });

  seneca.listen();

  return name;
};
