// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

const assert = require('assert');
const path = require('path');
const spawn = require('cross-spawn-cb');
const isVersion = require('is-version');
const cr = require('cr');

const CLI = path.join(__dirname, '..', '..', 'bin', 'cli.js');

describe('cli', () => {
  describe('happy path', () => {
    it('basic command', (done) => {
      spawn(CLI, ['--silent', 'echo', '"hello"'], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        const lines = cr(res.stdout).split('\n');
        assert.equal(lines.slice(-2, -1)[0], '"hello"');
        done();
      });
    });

    it('basic command with options', (done) => {
      spawn(CLI, ['--silent', 'node', '--version'], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        const lines = cr(res.stdout).split('\n');
        assert.ok(isVersion(lines.slice(-2, -1)[0], 'v'));
        done();
      });
    });

    it('basic command with options (--)', (done) => {
      spawn(CLI, ['--silent', '--', 'node', '--version'], { encoding: 'utf8' }, (err, res) => {
        assert.ok(!err, err ? err.message : '');
        const lines = cr(res.stdout).split('\n');
        assert.ok(isVersion(lines.slice(-2, -1)[0], 'v'));
        done();
      });
    });
  });

  describe('unhappy path', () => {
    it('missing command', (done) => {
      spawn(CLI, ['--silent'], { encoding: 'utf8' }, (err, _res) => {
        assert.ok(!!err);
        done();
      });
    });
  });
});
