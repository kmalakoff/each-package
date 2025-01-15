import assert from 'assert';
import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';
import isVersion from 'is-version';
import getLines from '../lib/getLines.cjs';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const CLI = path.join(__dirname, '..', '..', 'bin', 'cli.cjs');
const NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';

describe('cli', () => {
  describe('happy path', () => {
    it('basic command', (done) => {
      spawn(CLI, ['--silent', 'echo', '"hello"'], { encoding: 'utf8', cwd: NODE_MODULES }, (err, res) => {
        if (err) return done(err.message);
        assert.equal(getLines(res.stdout).slice(-2, -1)[0], '"hello"');
        done();
      });
    });

    it('basic command with options', (done) => {
      spawn(CLI, ['--silent', NODE, '--version'], { encoding: 'utf8', cwd: NODE_MODULES }, (err, res) => {
        if (err) return done(err.message);
        assert.ok(isVersion(getLines(res.stdout).slice(-2, -1)[0], 'v'));
        done();
      });
    });

    it('basic command with options (--)', (done) => {
      spawn(CLI, ['--silent', '--', NODE, '--version'], { encoding: 'utf8', cwd: NODE_MODULES }, (err, res) => {
        if (err) return done(err.message);
        assert.ok(isVersion(getLines(res.stdout).slice(-2, -1)[0], 'v'));
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
