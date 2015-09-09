'use strict';

var pkg = require('./package');

var name = pkg.name
var config = {
  seneca: {
    transport: { type: 'tcp', port: 8000 }
  }
};

module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca);

  // Create a worker.
  seneca.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  seneca.listen({ type: 'tcp' });

  console.log('LISTENING TO %s', config.seneca.transport.host);

  return name;

};
