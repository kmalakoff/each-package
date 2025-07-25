import assert from 'assert';
import cr from 'cr';
import spawn from 'cross-spawn-cb';
import path from 'path';
import url from 'url';
import getLines from '../lib/getLines.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const CLI = path.join(__dirname, '..', '..', 'bin', 'cli.js');
const NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');
const ROOT = path.join(__dirname, '..', '..');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';
const res = spawn.sync(NODE, ['--version'], { encoding: 'utf8' });
const _VERSION = cr(res.stdout).split('\n')[0];

describe('cli', () => {
  describe('basic command', () => {
    it('root', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', 'echo', '"hello"'], { encoding: 'utf8', cwd: ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }

        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 1);
        done();
      });
    });

    it('node_modules/@types', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 2);
        done();
      });
    });
  });

  describe('concurrency', () => {
    it('root concurrency=10', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--concurrency=10', 'echo', '"hello"'], { encoding: 'utf8', cwd: ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 1);
        done();
      });
    });

    it('node_modules/@types concurrency=10', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--concurrency=10', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 2);
        done();
      });
    });
  });

  describe('custom ignore', () => {
    it('root ignore=node_modules', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=node_modules', 'echo', '"hello"'], { encoding: 'utf8', cwd: ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 1);
        done();
      });
    });

    it('root ignore=each-package,each-package.*', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=each-package,each-package.*', 'echo', '"hello"'], { encoding: 'utf8', cwd: ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.ok(results.length > 50);
        done();
      });
    });

    it('node_modules/@types ignore=mocha', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=mocha', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 1);
        done();
      });
    });

    it('node_modules ignore=each-package,each-package.*', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=each-package,each-package.*', 'echo', '"hello"'], { encoding: 'utf8', cwd: NODE_MODULES }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.ok(results.length > 50);
        done();
      });
    });
  });

  describe('unhappy path', () => {
    it('missing command', (done) => {
      spawn(CLI, ['--silent'], { encoding: 'utf8' }, (err) => {
        assert.ok(!!err);
        done();
      });
    });
  });
});
