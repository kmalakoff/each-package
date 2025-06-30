import assert from 'assert';
// @ts-ignore
import eachPackage from 'each-package';
import isVersion from 'is-version';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';
import getLines from '../lib/getLines.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');
const ROOT = path.join(__dirname, '..', '..');

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
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: ROOT }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(results.length, 2);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') });
      assert.equal(results.length, 2);
      assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
    });
  });

  describe('concurrency', () => {
    it('root concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, cwd: ROOT }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, cwd: path.join(NODE_MODULES, '@types') }, (err, results) => {
        if (err) {
          done(err.message);
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
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'node_modules', cwd: ROOT }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('root ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'each-package,each-package.*', concurrency: 100, cwd: ROOT }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.ok(results.length > 50);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types ignore=mocha', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'mocha', cwd: path.join(NODE_MODULES, '@types') }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'each-package,each-package.*', concurrency: 100, cwd: NODE_MODULES }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.ok(results.length > 50);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
  });
});
