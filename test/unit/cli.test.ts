import assert from 'assert';
import spawn from 'cross-spawn-cb';
import path from 'path';
import url from 'url';
import getLines from '../lib/getLines.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const CLI = path.join(__dirname, '..', '..', 'bin', 'cli.js');
const _NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');
const _ROOT = path.join(__dirname, '..', '..');
const FIXTURE_ROOT = path.join(__dirname, '..', 'fixtures', 'root');
const FIXTURE_SINGLE = path.join(__dirname, '..', 'fixtures', 'single-package');
const FIXTURE_MULTIPLE = path.join(__dirname, '..', 'fixtures', 'multiple-packages');

describe('cli', () => {
  describe('basic command', () => {
    it('root', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_SINGLE }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--concurrency=10', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_SINGLE }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--concurrency=10', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=node_modules', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_SINGLE }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=*mocha*', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(FIXTURE_MULTIPLE, 'packages') }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 4);
        done();
      });
    });

    it('node_modules/@types ignore=mocha', (done) => {
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=pkg-x', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, res) => {
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
      spawn(CLI, ['--silent', '--expanded', '--streaming', '--ignore=*mocha*', '--private', 'echo', '"hello"'], { encoding: 'utf8', cwd: FIXTURE_MULTIPLE }, (err, res) => {
        if (err) {
          done(err.message);
          return;
        }
        const results = getLines(res.stdout).filter((x) => x.indexOf('hello') >= 0);
        assert.equal(results.length, 6);
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

  describe('stdio=inherit with sustained output (regression test)', () => {
    const MAX_DURATION = 60 * 1000;
    const FIXTURE_SUSTAINED = path.join(__dirname, '..', 'fixtures', 'sustained-output');

    it('should process all packages without hanging', function (done) {
      this.timeout(MAX_DURATION);

      const startTime = Date.now();

      spawn(CLI, ['-t', '-c1', '-s', '--private', 'npm', 'test'], { encoding: 'utf8', cwd: FIXTURE_SUSTAINED }, (err, res) => {
        const duration = Date.now() - startTime;

        if (err) {
          done(new Error(`CLI failed: ${err.message}`));
          return;
        }

        // Should process both packages
        const output = res.stdout as string;
        const completedCount = (output.match(/✓ 50 tests completed/g) || []).length;

        assert.equal(completedCount, 2, 'Should process both pkg-a and pkg-b');
        assert.ok(duration < MAX_DURATION, `Should complete in < ${MAX_DURATION}ms (took ${duration}ms)`);
        done();
      });
    });
  });
});
