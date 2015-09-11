var assert = require('assert');
var exec = require('child_process').exec;
var lab = exports.lab = require('lab').script();
var seneca = require('seneca');

lab.experiment('1 worker', function () {

  // lab.before(function (done) {
  //   exec('docker-compose up -d', done);
  // });

  lab.test('happy simple', { timeout: 20000 }, function (done) {
    var config = {
      default_plugins: { web: false },
      transport: {
        type: 'beanstalk',
        port: 11300,
        host: '192.168.99.100'
      }
    };

    var s = seneca({ default_plugins: { web: false }});
    s.options(config);
    s.use(require('seneca-beanstalk-transport'));
    s.client({ type: 'beanstalk' });

    s.ready(function () {
      s.act({ role: 'test-worker', cmd: 'ping'}, function (err, result) {
        if (err) return done(err);
        assert(result.msg === 'pong');
        done();
      });
    });

    return 'happy-simple';
  });

  // lab.after(function (done) {
  //   exec('docker-compose stop', done);
  // });

});
