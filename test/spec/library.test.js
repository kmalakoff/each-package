var assert = require('assert');

var eachPackage = require('../..');

describe('library', function () {
  describe('happy path', function () {
    it('basic command', function (done) {
      eachPackage(['node', '--version'], { silent: true }, function (err) {
        assert.ok(!err);
        done();
      });
    });
  });
});
