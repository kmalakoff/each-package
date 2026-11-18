import assert from 'assert';
import fs from 'fs';
import { safeRmSync } from 'fs-remove-compat';
import path from 'path';
import loadConfig from '../../../src/lib/loadConfig.ts';
import { createScratch, type Scratch, writeConfig, writeConfigDirectory } from '../../lib/configFixture.ts';

describe('loadConfig', () => {
  let scratch: Scratch;
  beforeEach(() => {
    scratch = createScratch('load');
  });
  afterEach(() => safeRmSync(scratch.dir, { recursive: true, force: true }));

  it('path is under the given home', () => {
    assert.equal(loadConfig(scratch.home).path, path.join(scratch.home, '.config', 'each-package', 'config.json'));
  });

  it('missing file gives no values and no error', () => {
    const res = loadConfig(scratch.home);
    assert.deepEqual(res.values, {});
    assert.equal(res.error, undefined);
  });

  it('a missing parent that is a file (ENOTDIR) is also silent', () => {
    fs.writeFileSync(path.join(scratch.home, '.config'), 'x');
    assert.equal(loadConfig(scratch.home).error, undefined);
  });

  it('returns the present keys except version', () => {
    writeConfig(scratch, { version: 1, depth: 2, private: true, dot: false, exclude: ['a', 'b*'] });
    const res = loadConfig(scratch.home);
    assert.equal(res.error, undefined);
    assert.deepEqual(res.values, { depth: 2, private: true, dot: false, exclude: ['a', 'b*'] });
  });

  it('accepts a byte order mark', () => {
    writeConfig(scratch, '﻿{"version":1,"private":true}');
    assert.deepEqual(loadConfig(scratch.home).values, { private: true });
  });

  it('a file with only version gives no values', () => {
    writeConfig(scratch, { version: 1 });
    const res = loadConfig(scratch.home);
    assert.equal(res.error, undefined);
    assert.deepEqual(res.values, {});
  });

  describe('errors', () => {
    const cases: [string, string | object][] = [
      ['invalid JSON', '{ nope'],
      ['empty file', ''],
      ['an array', []],
      ['null', 'null'],
      ['a number', '5'],
      ['version missing', { depth: 1 }],
      ['version 2', { version: 2 }],
      ['version as a string', { version: '1' }],
      ['unknown key', { version: 1, other: 1 }],
      ['ignore key', { version: 1, ignore: ['a'] }],
      ['include key', { version: 1, include: ['a'] }],
      ['depth 0', { version: 1, depth: 0 }],
      ['depth 1.5', { version: 1, depth: 1.5 }],
      ['depth as a string', { version: 1, depth: '2' }],
      ['depth negative', { version: 1, depth: -1 }],
      ['private as a string', { version: 1, private: 'true' }],
      ['dot as a string', { version: 1, dot: 'true' }],
      ['exclude as a string', { version: 1, exclude: 'a' }],
      ['exclude with an empty entry', { version: 1, exclude: [''] }],
      ['exclude with a comma', { version: 1, exclude: ['a,b'] }],
      ['exclude with a number', { version: 1, exclude: [1] }],
    ];
    cases.forEach(([title, contents]) => {
      it(title, () => {
        writeConfig(scratch, contents);
        const res = loadConfig(scratch.home);
        assert.ok(res.error, 'expected an error');
        assert.ok(res.error?.message.indexOf(scratch.configPath) >= 0, res.error?.message);
        assert.deepEqual(res.values, {});
      });
    });

    it('a directory at the path', () => {
      writeConfigDirectory(scratch);
      const res = loadConfig(scratch.home);
      assert.ok(res.error);
      assert.ok(res.error?.message.indexOf(scratch.configPath) >= 0);
    });
  });
});
