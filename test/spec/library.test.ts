import assert from 'assert';
import path from 'path';
import url from 'url';
import isVersion from 'is-version';
import Pinkie from 'pinkie-promise';
import getLines from '../lib/getLines.cjs';

// @ts-ignore
import eachPackage from 'each-package';
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');

describe('library', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      // @ts-ignore
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  describe('happy path', () => {
    it('basic command', (done) => {
      eachPackage('node', ['--version'], { silent: true, encoding: 'utf8' }, (err, results) => {
        if (err) return done(err.message);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
    it('basic command (concurrency 10)', (done) => {
      eachPackage('node', ['--version'], { silent: true, encoding: 'utf8', concurrency: 10, cwd: NODE_MODULES }, (err, results) => {
        if (err) return done(err.message);
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
    it('basic command (promises)', async () => {
      const results = await eachPackage('node', ['--version'], { silent: true, encoding: 'utf8' });
      assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
    });
  });
});
