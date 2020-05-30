var assert = require('assert');
var isVersion = require('is-version');

var eachPackage = require('../..');

var EOL = process.platform === 'win32' ? '\r\n' : '\n';

describe('library', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      eachPackage('node', ['--version'], { silent: true, stdout: 'string' }, function (err, results) {
        assert.ok(!err);
        assert.ok(isVersion(results[0].result.stdout.split(EOL).slice(-2, -1)[0], 'v'));
        done();
      });
    });
  });
});
