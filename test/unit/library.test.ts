import assert from 'assert';
import eachPackage from 'each-package';
import isVersion from 'is-version';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';
import getLines from '../lib/getLines.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const _NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');
const _ROOT = path.join(__dirname, '..', '..');
const FIXTURE_ROOT = path.join(__dirname, '..', 'fixtures', 'root');
const FIXTURE_SINGLE = path.join(__dirname, '..', 'fixtures', 'single-package');
const FIXTURE_MULTIPLE = path.join(__dirname, '..', 'fixtures', 'multiple-packages');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';

describe('library', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  describe('basic command', () => {
    it('root', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: FIXTURE_SINGLE }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('node_modules/@types', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 2);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') });
      assert.equal(results.length, 2);
      assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
    });
  });

  describe('concurrency', () => {
    it('root concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, cwd: FIXTURE_SINGLE }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('node_modules/@types concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 2);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
  });

  describe('custom ignore', () => {
    it('root ignore=node_modules', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'node_modules', cwd: FIXTURE_SINGLE }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('root ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: '*mocha*', concurrency: 100, private: true, cwd: path.join(FIXTURE_MULTIPLE, 'packages') }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 4);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types ignore=mocha', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'pkg-x', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: '*mocha*', concurrency: 100, private: true, cwd: FIXTURE_MULTIPLE }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 6);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
  });

  describe('root option', () => {
    it('with root: false (should exclude root package)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: false, private: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 2); // pkg-a and pkg-b only
        assert.ok(!results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true (should include root package)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
        assert.ok(results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true and topological (should include root in dependency graph)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, topological: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
        assert.ok(results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, cwd: FIXTURE_ROOT });
      assert.equal(results.length, 3); // root, pkg-a, and pkg-b
      assert.ok(results.some((r) => r.path === '.'));
    });
  });
});
