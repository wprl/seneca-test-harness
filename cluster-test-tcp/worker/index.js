'use strict';

var pkg = require('./package');

var config = {
  seneca: {
    transport: { type: 'tcp', port: 23 }
  }
};

'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var interfaces = {};

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    var key = ifname;

    interfaces[key] = iface.address;
    console.log(key, iface.address);
  });
});

var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  seneca.options(config.seneca);

  // Create a worker.
  seneca.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  seneca.listen({
    type: 'tcp',
    port:  23,
    host: interfaces.eth0
  });

  console.log('LISTENING TO %s', interfaces.eth0);

  return name;

};
