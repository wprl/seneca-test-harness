'use strict';

var pkg = require('./package');

var name = pkg.name

module.exports = function (options) {
  this.add({ role: 'test-worker', cmd: 'ping' }, function (args, done) {
    done(null, { msg: 'pong' });
  });

  return name;
};
