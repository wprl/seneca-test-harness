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

'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();

var interfaces = {};

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    interfaces[ifname] = iface.address;
  });
});

  console.log(interfaces)



module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca);
  seneca.use(require('seneca-beanstalk-transport'));


  // Create a worker.
  seneca.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong', ip: interfaces.eth0 });
  });

  seneca.listen({ type: 'beanstalk' });

  console.log('LISTENING TO %s', process.env.BEANSTALK_PORT);

  return name;
};
