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

  describe('happy path', () => {
    it('basic command', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
    it('basic command (concurrency 10)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 2, cwd: path.join(NODE_MODULES, '@types') }, (err, results) => {
        if (err) {
          done(err.message);
          return;
        }
        assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
        done();
      });
    });
    it('basic command (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') });
      assert.ok(isVersion(getLines(results[0].result.stdout).slice(-1)[0], 'v'));
    });
  });
});
