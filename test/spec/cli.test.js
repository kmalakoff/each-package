var assert = require('assert');
var path = require('path');
var spawn = require('cross-spawn-cb');

var CLI = path.join(__dirname, '..', '..', 'bin', 'each-package');

describe('cli', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      spawn(CLI, ['npm', 'whoami'], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        done();
      });
    });

    it('basic command with options', function (done) {
      spawn(CLI, ['node', '--version'], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        done();
      });
    });

    it('basic command with options', function (done) {
      spawn(CLI, ['--', 'node', '--version'], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('missing command', function (done) {
      spawn(CLI, [], { stdio: 'inherit' }, function (err, res) {
        assert.ok(!err);
        assert.ok(res.code !== 0);
        done();
      });
    });
  });
});
