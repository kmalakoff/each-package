import assert from 'assert';
import { safeRmSync } from 'fs-remove-compat';
import packageLayers from '../../../src/lib/packageLayers.ts';
import type { EachOptions } from '../../../src/types.ts';
import { createScratch, type Scratch, writeConfig } from '../../lib/configFixture.ts';

describe('packageLayers', () => {
  let scratch: Scratch;
  let originalHome: string | undefined;
  let originalProfile: string | undefined;
  beforeEach(() => {
    scratch = createScratch('layers');
    // a config that would change the results if the walk read it
    writeConfig(scratch, { version: 1, private: true, dot: true, exclude: ['a'] });
    originalHome = process.env.HOME;
    originalProfile = process.env.USERPROFILE;
    process.env.HOME = scratch.home;
    process.env.USERPROFILE = scratch.home;
  });
  afterEach(() => {
    if (originalHome === undefined) delete process.env.HOME;
    else process.env.HOME = originalHome;
    if (originalProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = originalProfile;
    safeRmSync(scratch.dir, { recursive: true, force: true });
  });

  function names(options: EachOptions, expected: string[], done: (err?: Error) => void): void {
    packageLayers({ cwd: scratch.group, ...options }, (err, entries) => {
      if (err || !entries) return done(err || new Error('no entries'));
      try {
        assert.deepEqual(entries.map((entry) => entry.package.name).sort(), expected);
      } catch (e) {
        return done(e as Error);
      }
      done();
    });
  }

  describe('1.7.2 pins (no dot, no exclude)', () => {
    it('depth 1', (done) => names({ depth: 1 }, ['a', 'v', 'vo'], done));
    it('depth 2', (done) => names({ depth: 2 }, ['a', 'c', 'f', 'v', 'vo'], done));
    it('depth 3', (done) => names({ depth: 3 }, ['a', 'c', 'f', 'v', 'vo'], done));
    it('private packages are found with private: true', (done) => names({ depth: 1, private: true }, ['a', 'b', 'v', 'vo'], done));
    it('ignore fixtures at depth 1', (done) => names({ depth: 1, ignore: 'fixtures' }, ['a', 'n', 'v', 'vo'], done));
    it('ignore fixtures at depth 3 walks node_modules and skips fixtures', (done) => names({ depth: 3, ignore: 'fixtures' }, ['a', 'c', 'n', 'v', 'vo'], done));
  });

  describe('.git is never entered', () => {
    it('dot: true', (done) => names({ depth: 2, dot: true }, ['a', 'c', 'f', 'g', 't', 'v', 'vo', 'w'], done));
    it('ignore x with dot', (done) => names({ depth: 2, ignore: 'x', dot: true }, ['a', 'c', 'f', 'g', 'n', 't', 'v', 'vo', 'w'], done));
    it("ignore '' falls back to the default list", (done) => names({ depth: 2, ignore: '' }, ['a', 'c', 'f', 'v', 'vo'], done));
    it("ignore '' with dot", (done) => names({ depth: 2, ignore: '', dot: true }, ['a', 'c', 'f', 'g', 't', 'v', 'vo', 'w'], done));
    it("ignore ',' falls back to the default list", (done) => names({ depth: 2, ignore: ',' }, ['a', 'c', 'f', 'v', 'vo'], done));
    it('ignore true falls back to the default list', (done) => names({ depth: 2, ignore: true as unknown as string }, ['a', 'c', 'f', 'v', 'vo'], done));
  });

  describe('dot', () => {
    it('is off by default', (done) => names({ depth: 2 }, ['a', 'c', 'f', 'v', 'vo'], done));
  });

  describe('exclude', () => {
    it('adds to node_modules and matches name prefixes (vendor skips vendor-old)', (done) => names({ depth: 1, exclude: ['vendor'] }, ['a'], done));
    it('a string is a comma list', (done) => names({ depth: 3, exclude: 'fixtures' }, ['a', 'c', 'v', 'vo'], done));
    it('repeated entries equal a comma list', (done) => {
      names({ depth: 3, exclude: ['fixtures', 'vendor'] }, ['a', 'c'], (err) => (err ? done(err) : names({ depth: 3, exclude: 'fixtures,vendor' }, ['a', 'c'], done)));
    });
    it('still skips node_modules', (done) => names({ depth: 1, exclude: ['vendor'], ignore: undefined }, ['a'], done));
    it('ignore replaces the base list', (done) => names({ depth: 2, ignore: 'vendor' }, ['a', 'c', 'f', 'n'], done));
  });
});
