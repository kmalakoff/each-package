import assert from 'assert';
import eachPackage from 'each-package';
import { safeRmSync } from 'fs-remove-compat';
import isVersion from 'is-version';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';
import { createScratch, type Scratch, writeConfig } from '../lib/configFixture.ts';
import getLines from '../lib/getLines.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const _NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');
const _ROOT = path.join(__dirname, '..', '..');
const FIXTURE_ROOT = path.join(__dirname, '..', 'fixtures', 'root');
const FIXTURE_SINGLE = path.join(__dirname, '..', 'fixtures', 'single-package');
const FIXTURE_MULTIPLE = path.join(__dirname, '..', 'fixtures', 'multiple-packages');
const FIXTURE_DEPTH = path.join(__dirname, '..', 'fixtures', 'depth');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE ?? '');
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
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('node_modules/@types', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 2);
        assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') });
      if (!results) throw new Error('results undefined');
      assert.equal(results.length, 2);
      assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
    });
  });

  describe('concurrency', () => {
    it('root concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, cwd: FIXTURE_SINGLE }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('node_modules/@types concurrency=10', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', concurrency: 10, private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 2);
        assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
        done();
      });
    });
  });

  describe('custom ignore', () => {
    it('root ignore=node_modules', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'node_modules', cwd: FIXTURE_SINGLE }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 0); // root excluded by default
        done();
      });
    });

    it('root ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: '*mocha*', concurrency: 100, private: true, cwd: path.join(FIXTURE_MULTIPLE, 'packages') }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 4);
        assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules/@types ignore=mocha', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: 'pkg-x', private: true, cwd: path.join(FIXTURE_MULTIPLE, '@scoped') }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 1);
        assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
        done();
      });
    });

    it('node_modules ignore=each-package,each-package.*', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', ignore: '*mocha*', concurrency: 100, private: true, cwd: FIXTURE_MULTIPLE }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 6);
        assert.ok(isVersion(getLines(results[0]?.result?.stdout ?? '').slice(-1)[0], 'v'));
        done();
      });
    });
  });

  describe('dot and exclude', () => {
    let scratch: Scratch;
    let originalHome: string | undefined;
    let originalProfile: string | undefined;
    before(() => {
      scratch = createScratch('api');
      // a config that would change the result if the library read it
      writeConfig(scratch, { version: 1, private: true, dot: true, exclude: ['a'] });
      originalHome = process.env.HOME;
      originalProfile = process.env.USERPROFILE;
      process.env.HOME = scratch.home;
      process.env.USERPROFILE = scratch.home;
    });
    after(() => {
      if (originalHome === undefined) delete process.env.HOME;
      else process.env.HOME = originalHome;
      if (originalProfile === undefined) delete process.env.USERPROFILE;
      else process.env.USERPROFILE = originalProfile;
      safeRmSync(scratch.dir, { recursive: true, force: true });
    });

    function visited(options: Record<string, unknown>, callback: (err: Error | null, names?: string[]) => void): void {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', cwd: scratch.group, depth: 2, ...options }, (err, results) => {
        if (err || !results) return callback(err ?? new Error('No results'));
        callback(null, results.map((r) => path.basename(r.path)).sort());
      });
    }

    function expectVisited(options: Record<string, unknown>, expected: string[], done: (err?: Error) => void): void {
      visited(options, (err, names) => {
        if (err) return done(err);
        try {
          assert.deepEqual(names, expected);
        } catch (e) {
          return done(e as Error);
        }
        done();
      });
    }

    it('dot and exclude reach the walk, and the config file is never read', (done) => {
      expectVisited({ dot: true, exclude: 'vendor' }, ['a', 'c', 'f', 'g', 't', 'w'], done);
    });
  });

  describe('depth', () => {
    it('depth: 1 (skip nested test packages)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, depth: 1, cwd: FIXTURE_DEPTH }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 2); // pkg-a and pkg-b only
        done();
      });
    });

    it('depth: 1 with root package.json (root does not count as a level)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, depth: 1, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 2); // pkg-a and pkg-b only; root package.json is not a level
        done();
      });
    });

    it('depth: 2 (includes nested test packages)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, depth: 2, cwd: FIXTURE_DEPTH }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 3);
        done();
      });
    });

    it('depth: 3 (all)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, depth: 3, cwd: FIXTURE_DEPTH }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 4);
        done();
      });
    });

    it('depth: undefined (all)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', private: true, cwd: FIXTURE_DEPTH }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 4);
        done();
      });
    });
  });

  describe('root option', () => {
    it('with root: false (should exclude root package)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: false, private: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 2); // pkg-a and pkg-b only
        assert.ok(!results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true (should include root package)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
        assert.ok(results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true and topological (should include root in dependency graph)', (done) => {
      eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, topological: true, cwd: FIXTURE_ROOT }, (err, results) => {
        if (err || !results) return done(err ?? new Error('No results'));
        assert.equal(results.length, 3); // root, pkg-a, and pkg-b
        assert.ok(results.some((r) => r.path === '.'));
        done();
      });
    });

    it('with root: true (promises)', async () => {
      const results = await eachPackage(NODE, ['--version'], { silent: true, expanded: true, encoding: 'utf8', root: true, private: true, cwd: FIXTURE_ROOT });
      if (!results) throw new Error('results undefined');
      assert.equal(results.length, 3); // root, pkg-a, and pkg-b
      assert.ok(results.some((r) => r.path === '.'));
    });
  });
});
