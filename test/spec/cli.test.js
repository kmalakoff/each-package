var assert = require('assert');
var path = require('path');
var spawn = require('cross-spawn-cb');
var isVersion = require('is-version');
var cr = require('cr');

var CLI = path.join(__dirname, '..', '..', 'bin', 'each-package.js');

describe('cli', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      spawn(CLI, ['--silent', 'npm', '--version'], { encoding: 'utf8' }, function (err, res) {
        assert.ok(!err);
        var lines = cr(res.stdout).split('\n');
        assert.ok(isVersion(lines.slice(-2, -1)[0]));
        done();
      });
    });

    it('basic command with options', function (done) {
      spawn(CLI, ['--silent', 'node', '--version'], { encoding: 'utf8' }, function (err, res) {
        assert.ok(!err);
        var lines = cr(res.stdout).split('\n');
        assert.ok(isVersion(lines.slice(-2, -1)[0], 'v'));
        done();
      });
    });

    it('basic command with options (--)', function (done) {
      spawn(CLI, ['--silent', '--', 'node', '--version'], { encoding: 'utf8' }, function (err, res) {
        assert.ok(!err);
        var lines = cr(res.stdout).split('\n');
        assert.ok(isVersion(lines.slice(-2, -1)[0], 'v'));
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('missing command', function (done) {
      spawn(CLI, ['--silent'], { encoding: 'utf8' }, function (err, res) {
        assert.ok(!!err);
        done();
      });
    });
  });
});
