'use strict';

var pkg = require('./package');

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

  // Create a worker.
  seneca.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  seneca.listen({ type: 'beanstalk' });

  console.log('LISTENING TO %s', process.env.BEANSTALK_PORT);

  return name;
};
