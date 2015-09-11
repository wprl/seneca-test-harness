'use strict';

var expect = require('code').expect;
var Lab = require('lab');
var name = require('./package').name;
var runner = require('lab/lib/runner');

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
  var lab = Lab.script({ schedule: false });
  var seneca = this;

  lab.before(function (done) {
    seneca.options(config.seneca);
    seneca.use(require('seneca-beanstalk-transport'));
    seneca.client({ type: 'beanstalk' });
    seneca.ready(done);
  });

  lab.experiment('seneca', function () {
    lab.test('responds to an action', function (done) {
      seneca.act({ role: 'test-worker', cmd: 'ping'}, function (err, result) {
        expect(err).to.be.null();
        expect(result).to.include({ 'msg': 'pong' });
        expect(result).to.include('ip');
        console.log('√ TEST PASSED');
        done();
      });
    });
  });

  runner.report(lab, {}, function (error, code, output) {
    if (error) throw error;
    console.log(output);
    console.log('FINISHED INSTANCE TESTS.  STATUS: %s (%s)', code, code ? 'ERR': 'OK');
  });

  return name;
};
