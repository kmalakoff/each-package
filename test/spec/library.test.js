// remove NODE_OPTIONS from ts-dev-stack
// biome-ignore lint/performance/noDelete: <explanation>
delete process.env.NODE_OPTIONS;

const assert = require('assert');
const isVersion = require('is-version');
const cr = require('cr');

const eachPackage = require('each-package');

describe('library', () => {
  describe('happy path', () => {
    it('basic command', (done) => {
      eachPackage('node', ['--version'], { silent: true, encoding: 'utf8' }, (err, results) => {
        assert.ok(!err);
        assert.ok(isVersion(cr(results[0].result.stdout).split('\n').slice(-2, -1)[0], 'v'));
        done();
      });
    });
    it('basic command (promises)', (done) => {
      eachPackage('node', ['--version'], { silent: true, encoding: 'utf8' })
        .then((results) => {
          assert.ok(isVersion(cr(results[0].result.stdout).split('\n').slice(-2, -1)[0], 'v'));
          done();
        })
        .catch((err) => {
          assert.ok(!err);
        });
    });
  });
});
