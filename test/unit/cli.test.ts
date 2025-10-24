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
const FIXTURE_ROOT = path.join(__dirname, '..', 'fixtures', 'root');


describe('cli', () => {
  describe('basic command', () => {
    it('root', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', 'echo', '"hello"'], { encoding: 'utf8', cwd: ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }

        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 0); // root excluded by default
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
        assert.equal(results.length, 0); // root excluded by default
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
        assert.equal(results.length, 0); // root excluded by default
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

  describe('root flag', () => {
    it('without --root flag (should exclude root package)', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 2); // pkg-a and pkg-b only
        done();
      });
    });

    it('with --root flag (should include root package)', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--private', '--root', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
        done();
      });
    });

    it('with -r flag (should include root package)', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--private', '-r', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_ROOT }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
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
