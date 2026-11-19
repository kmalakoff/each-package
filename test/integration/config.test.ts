import assert from 'assert';
import fs from 'fs';
import { safeRmSync } from 'fs-remove-compat';
import path from 'path';
import { createScratch, type Run, runEp, type Scratch, VISIT, visitArgs, writeConfig, writeConfigDirectory } from '../lib/configFixture.ts';

const DEPRECATION = /deprecated/i;
const NOTICE = /^ep: config /m;

type Check = (results: Run[]) => void;

describe('config and flags', () => {
  let scratch: Scratch;
  beforeEach(() => {
    scratch = createScratch('cli');
  });
  afterEach(() => safeRmSync(scratch.dir, { recursive: true, force: true }));

  // runs each argument list in turn (visiting command appended unless raw), then checks the results
  function exec(list: string[][], check: Check, done: (err?: Error) => void, options?: { raw?: boolean; cwd?: string }): void {
    const results: Run[] = [];
    const next = (index: number): void => {
      if (index === list.length) {
        try {
          check(results);
        } catch (err) {
          return done(err as Error);
        }
        return done();
      }
      runEp(scratch, options?.raw ? list[index] : visitArgs(list[index]), options?.cwd, (err, res) => {
        if (err || !res) return done(err || new Error('no result'));
        results.push(res);
        next(index + 1);
      });
    };
    next(0);
  }

  function noticeLine(res: Run): string | undefined {
    return res.stderr.split(/\r?\n/).filter((line) => NOTICE.test(line))[0];
  }

  describe('1. no config file, no new flags: pins 1.7.2 behaviour', () => {
    it('a default run visits the same packages as 1.7.2', (done) => {
      exec([['--silent']], (r) => assert.deepEqual(r[0].visited, ['a', 'v', 'vo']), done);
    });
  });

  describe('2. global config', () => {
    beforeEach(() => writeConfig(scratch, { version: 1, private: true }));
    it('applies from the group folder and prints the notice on stderr only', (done) => {
      exec(
        [[]],
        (r) => {
          assert.deepEqual(r[0].visited, ['a', 'b', 'v', 'vo']);
          assert.ok(NOTICE.test(r[0].stderr), r[0].stderr);
          assert.ok(r[0].stderr.indexOf(scratch.configPath) >= 0);
          assert.ok(r[0].stderr.indexOf('private') >= 0);
          assert.equal(NOTICE.test(r[0].stdout), false);
        },
        done
      );
    });
    it('applies from inside a package', (done) => {
      writeConfig(scratch, { version: 1, exclude: ['sub'] });
      const inside = path.join(scratch.group, 'a');
      exec(
        [['--silent'], []],
        (r) => {
          assert.deepEqual(r[0].visited, ['f']);
          assert.ok(NOTICE.test(r[1].stderr), r[1].stderr);
        },
        done,
        { cwd: inside }
      );
    });
    it('--silent hides the notice', (done) => {
      exec([['--silent']], (r) => assert.equal(NOTICE.test(r[0].stderr), false), done);
    });
  });

  describe('3. --no-config', () => {
    it('ignores a valid file', (done) => {
      writeConfig(scratch, { version: 1, private: true });
      exec(
        [['--no-config']],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.deepEqual(r[0].visited, ['a', 'v', 'vo']);
          assert.equal(NOTICE.test(r[0].stderr), false);
        },
        done
      );
    });
    it('ignores invalid JSON', (done) => {
      writeConfig(scratch, '{ nope');
      exec(
        [['--no-config']],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.deepEqual(r[0].visited, ['a', 'v', 'vo']);
          assert.equal(r[0].stderr.indexOf('ep:'), -1);
        },
        done
      );
    });
    it('ignores a directory at the path', (done) => {
      writeConfigDirectory(scratch);
      exec(
        [['--no-config']],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.equal(r[0].stderr.indexOf('ep:'), -1);
        },
        done
      );
    });
  });

  describe('4. .git is never entered', () => {
    it('config dot: true', (done) => {
      writeConfig(scratch, { version: 1, dot: true });
      exec([['--silent']], (r) => assert.equal(r[0].visited.indexOf('p'), -1, r[0].visited.join()), done);
    });
  });

  describe('5. dot', () => {
    it('dot: true finds dot folders', (done) => {
      writeConfig(scratch, { version: 1, dot: true });
      exec([['--silent', '-d', '2']], (r) => assert.deepEqual(r[0].visited, ['a', 'c', 'f', 'g', 't', 'v', 'vo', 'w']), done);
    });
    it('--no-dot reverses config dot: true', (done) => {
      writeConfig(scratch, { version: 1, dot: true });
      exec([['--silent', '--no-dot']], (r) => assert.deepEqual(r[0].visited, ['a', 'v', 'vo']), done);
    });
  });

  describe('6. exclude', () => {
    it('config exclude drops vendor, keeps skipping node_modules, and prefix skips vendor-old', (done) => {
      writeConfig(scratch, { version: 1, exclude: ['vendor'] });
      exec([['--silent']], (r) => assert.deepEqual(r[0].visited, ['a']), done);
    });
    it('-x adds to the config exclude', (done) => {
      writeConfig(scratch, { version: 1, exclude: ['vendor'] });
      exec([['--silent', '-d', '3', '-x', 'fixtures']], (r) => assert.deepEqual(r[0].visited, ['a', 'c']), done);
    });
    it('-x a -x b equals -x a,b', (done) => {
      exec(
        [
          ['--silent', '-d', '3', '-x', 'fixtures', '-x', 'vendor'],
          ['--silent', '-d', '3', '-x', 'fixtures,vendor'],
        ],
        (r) => {
          assert.deepEqual(r[0].visited, ['a', 'c']);
          assert.deepEqual(r[1].visited, r[0].visited);
        },
        done
      );
    });
  });

  describe('7. -i legacy', () => {
    it('prints exactly one deprecation line', (done) => {
      exec(
        [['-d', '3', '-i', 'fixtures']],
        (r) => {
          const lines = r[0].stderr.split(/\r?\n/).filter((line) => DEPRECATION.test(line));
          assert.equal(lines.length, 1, r[0].stderr);
          assert.ok(lines[0].indexOf('-x/--exclude') >= 0);
        },
        done
      );
    });
    it('--silent suppresses the deprecation line', (done) => {
      exec([['--silent', '-i', 'fixtures']], (r) => assert.equal(DEPRECATION.test(r[0].stderr), false), done);
    });
    it('-i with -x exits 5 before anything runs', (done) => {
      exec(
        [['-i', 'fixtures', '-x', 'vendor']],
        (r) => {
          assert.equal(r[0].status, 5);
          assert.deepEqual(r[0].visited, []);
          assert.ok(`${r[0].stdout}${r[0].stderr}`.indexOf('cannot be combined; use --exclude only') >= 0);
        },
        done
      );
    });
    it('a typed -i replaces config exclude entries', (done) => {
      writeConfig(scratch, { version: 1, exclude: ['vendor'] });
      exec([['--silent', '-i', 'fixtures']], (r) => assert.deepEqual(r[0].visited, ['a', 'n', 'v', 'vo']), done);
    });
  });

  describe('8. overrides and the notice', () => {
    it('-d 3 beats config depth 1', (done) => {
      writeConfig(scratch, { version: 1, depth: 1 });
      exec([['--silent', '-d', '3']], (r) => assert.deepEqual(r[0].visited, ['a', 'c', 'f', 'v', 'vo']), done);
    });
    it('config depth applies when no -d is typed', (done) => {
      writeConfig(scratch, { version: 1, depth: 2 });
      exec([['--silent']], (r) => assert.deepEqual(r[0].visited, ['a', 'c', 'f', 'v', 'vo']), done);
    });
    it('--no-private beats private: true and its key leaves the notice', (done) => {
      writeConfig(scratch, { version: 1, private: true, exclude: ['vendor'] });
      exec(
        [['--no-private']],
        (r) => {
          assert.deepEqual(r[0].visited, ['a']);
          const notice = noticeLine(r[0]);
          assert.ok(notice, r[0].stderr);
          assert.equal((notice as string).slice(`ep: config ${scratch.configPath}: `.length).indexOf('private'), -1);
          assert.ok((notice as string).indexOf('exclude vendor') >= 0);
        },
        done
      );
    });
  });

  describe('9. file errors stop ep', () => {
    const broken: [string, string][] = [
      ['invalid JSON', '{ nope'],
      ['an array', '[]'],
      ['unknown key', '{"version":1,"ignore":["a"]}'],
      ['depth 0', '{"version":1,"depth":0}'],
    ];
    broken.forEach((c) => {
      it(`${c[0]}: exit 5, full path, nothing runs`, (done) => {
        writeConfig(scratch, c[1]);
        exec(
          [['--silent']],
          (r) => {
            assert.equal(r[0].status, 5);
            assert.deepEqual(r[0].visited, []);
            assert.ok(`${r[0].stdout}${r[0].stderr}`.indexOf(scratch.configPath) >= 0);
          },
          done
        );
      });
    });
    it('a directory at the path', (done) => {
      writeConfigDirectory(scratch);
      exec(
        [['--silent']],
        (r) => {
          assert.equal(r[0].status, 5);
          assert.deepEqual(r[0].visited, []);
        },
        done
      );
    });
    it('-v works with a broken file', (done) => {
      writeConfig(scratch, '{ nope');
      exec([['-v']], (r) => assert.equal(r[0].status, 0), done, { raw: true });
    });
    it('-h works with a broken file and shows the error', (done) => {
      writeConfig(scratch, '{ nope');
      exec(
        [['-h']],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.ok(r[0].stdout.indexOf('--exclude') >= 0);
          assert.ok(r[0].stdout.indexOf(scratch.configPath) >= 0);
        },
        done,
        { raw: true }
      );
    });
    it('-h shows the effective default from the file', (done) => {
      writeConfig(scratch, { version: 1, depth: 4 });
      exec([['-h']], (r) => assert.ok(/depth[^\n]*4/.test(r[0].stdout), r[0].stdout), done, { raw: true });
    });
    it('missing file is silent', (done) => {
      exec([['--silent']], (r) => assert.equal(r[0].status, 0), done);
    });
  });

  describe('10. parser fixes', () => {
    it('--fail-dependents does not swallow the command', (done) => {
      exec(
        [['--silent', '--streaming', '--fail-dependents', 'node', VISIT]],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.deepEqual(r[0].visited, ['a', 'v', 'vo']);
        },
        done,
        { raw: true }
      );
    });
    it('--fail-dependents with -t', (done) => {
      exec(
        [['--silent', '--streaming', '-t', '--fail-dependents', 'node', VISIT]],
        (r) => {
          assert.equal(r[0].status, 0);
          assert.deepEqual(r[0].visited, ['a', 'v', 'vo']);
        },
        done,
        { raw: true }
      );
    });
    ['abc'].forEach((value) => {
      it(`-d ${value} exits 5 without running`, (done) => {
        exec(
          [['--silent', '-d', value]],
          (r) => {
            assert.equal(r[0].status, 5);
            assert.deepEqual(r[0].visited, []);
          },
          done
        );
      });
    });
    it('help lists no .git default ignore and no -si or -fd', (done) => {
      exec(
        [['-h']],
        (r) => {
          assert.equal(r[0].stdout.indexOf('node_modules,.git'), -1);
          assert.equal(/-si\b|-fd\b/.test(r[0].stdout), false);
          assert.ok(DEPRECATION.test(r[0].stdout));
        },
        done,
        { raw: true }
      );
    });
  });

  it('never writes the config file', (done) => {
    exec([['--silent']], () => assert.equal(fs.existsSync(scratch.configPath), false), done);
  });
});
