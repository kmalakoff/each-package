var assert = require('assert');
var isVersion = require('is-version');
var cr = require('cr');

var eachPackage = require('../..');

describe('library', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      eachPackage('node', ['--version'], { silent: true, stdout: 'string' }, function (err, results) {
        assert.ok(!err);
        assert.ok(isVersion(cr(results[0].result.stdout).split('\n').slice(-2, -1)[0], 'v'));
        done();
      });
    });
    it('basic command (promises)', function (done) {
      if (typeof Promise === 'undefined') return;

      eachPackage('node', ['--version'], { silent: true, stdout: 'string' })
        .then(function (results) {
          assert.ok(isVersion(cr(results[0].result.stdout).split('\n').slice(-2, -1)[0], 'v'));
          done();
        })
        .catch(function (err) {
          assert.ok(!err);
        });
    });
  });
});
