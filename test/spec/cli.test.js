var assert = require('assert');
var path = require('path');

var exec = require('../../lib/exec');

describe('cli', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      exec([path.join(__dirname, '..', '..', 'bin', 'each-package'), 'node', '--version'], function (err, code) {
        assert.ok(!err);
        assert.equal(code, 0);
        done();
      });
    });
  });

  describe('unhappy path', function () {
    it('missing command', function (done) {
      exec([path.join(__dirname, '..', '..', 'bin', 'each-package')], function (err, code) {
        assert.ok(!!err);
        done();
      });
    });
  });
});
