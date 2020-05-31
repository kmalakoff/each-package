var assert = require('assert');
var path = require('path');
var spawn = require('cross-spawn-cb');
var isVersion = require('is-version');

var CLI = path.join(__dirname, '..', '..', 'bin', 'each-package.js');
var EOL = process.platform === 'win32' ? '\r\n' : '\n';

describe('cli', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      spawn(CLI, ['--silent', 'npm', '--version'], { stdout: 'string' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        assert.ok(isVersion(res.stdout.split(EOL).slice(-2, -1)[0]));
        done();
      });
    });

    it('basic command with options', function (done) {
      spawn(CLI, ['--silent', 'node', '--version'], { stdout: 'string' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        assert.ok(isVersion(res.stdout.split(EOL).slice(-2, -1)[0], 'v'));
        done();
      });
    });

    it('basic command with options (--)', function (done) {
      spawn(CLI, ['--silent', '--', 'node', '--version'], { stdout: 'string' }, function (err, res) {
        assert.ok(!err);
        assert.equal(res.code, 0);
        assert.ok(isVersion(res.stdout.split(EOL).slice(-2, -1)[0], 'v'));
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('missing command', function (done) {
      spawn(CLI, ['--silent'], { stdout: 'string' }, function (err, res) {
        assert.ok(!err);
        assert.ok(res.code !== 0);
        done();
      });
    });
  });
});
