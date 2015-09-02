'use strict';

var pkg = require('./package');
var name = pkg.name

module.exports = function (options) {
  var seneca = this;

  seneca.add({ role: name, cmd: 'ping' }, function (args, done) {
    console.log('PONG');
    done();
  });

  return name;
};
