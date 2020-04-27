var assert = require('assert');
var path = require('path');
var execa = require('execa');

describe('cli', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      execa(path.join(__dirname, '..', '..', 'bin', 'each-package'), ['node', '--version'])
        .then(function (res) {
          assert.equal(res.exitCode, 0);
          done();
        })
        .catch(function (err) {
          assert.ok(!err);
        });
    });
  });

  describe('unhappy path', function () {
    it('missing command', function (done) {
      execa(path.join(__dirname, '..', '..', 'bin', 'each-package'), [])
        .then(function () {
          assert.ok(false);
        })
        .catch(function (err) {
          assert.ok(!!err);
          done();
        });
    });
  });
});
