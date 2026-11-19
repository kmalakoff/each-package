import assert from 'assert';
import type { ConfigResult, ConfigValues } from '../../../src/lib/loadConfig.ts';
import resolveOptions from '../../../src/lib/resolveOptions.ts';

const NAME = 'ep';
const CONFIG_PATH = '/home/user/.config/each-package/config.json';
const DEFAULTS = { depth: 1, concurrency: 8, interactive: true };

function configOf(values: ConfigValues): ConfigResult {
  return { path: CONFIG_PATH, values };
}

function run(argv: string[], values: ConfigValues = {}) {
  const res = resolveOptions(argv, NAME, configOf(values), DEFAULTS);
  if ('error' in res) throw new Error(`unexpected error: ${res.error}`);
  return res;
}

function fails(argv: string[], values: ConfigValues = {}): string {
  const res = resolveOptions(argv, NAME, configOf(values), DEFAULTS);
  if (!('error' in res)) throw new Error('expected an error');
  return res.error;
}

function noticeOf(warnings: string[]): string | undefined {
  return warnings.filter((line) => /^ep: config /m.test(line))[0];
}

const NOTICE_PREFIX = `ep: config ${CONFIG_PATH}: `;

describe('resolveOptions', () => {
  describe('no config, no flags', () => {
    it('applies the defaults with an empty skip list', () => {
      const { options } = run(['cmd']);
      assert.equal(options.depth, 1);
      assert.equal(options.concurrency, 8);
      assert.equal(options.interactive, true);
      assert.deepEqual(options.exclude, []);
      assert.deepEqual(options._, ['cmd']);
    });
    it('no notice and no deprecation', () => {
      assert.deepEqual(run(['cmd']).warnings, []);
    });
  });

  describe('config values', () => {
    it('depth applies when no -d is typed', () => {
      assert.equal(run(['cmd'], { depth: 2 }).options.depth, 2);
    });
    it('-d 3 beats config depth 1', () => {
      assert.equal(run(['-d', '3', 'cmd'], { depth: 1 }).options.depth, 3);
    });
    it('private and dot apply', () => {
      const { options } = run(['cmd'], { private: true, dot: true });
      assert.equal(options.private, true);
      assert.equal(options.dot, true);
    });
    it('--no-dot reverses config dot: true', () => {
      assert.equal(run(['--no-dot', 'cmd'], { dot: true }).options.dot, false);
    });
    it('--no-private beats private: true', () => {
      assert.equal(run(['--no-private', 'cmd'], { private: true }).options.private, false);
    });
  });

  describe('exclude', () => {
    it('config exclude becomes the skip list', () => {
      assert.deepEqual(run(['cmd'], { exclude: ['vendor'] }).options.exclude, ['vendor']);
    });
    it('-x adds to the config exclude', () => {
      assert.deepEqual(run(['-x', 'fixtures', 'cmd'], { exclude: ['vendor'] }).options.exclude, ['vendor', 'fixtures']);
    });
    it('-x a -x b equals -x a,b', () => {
      assert.deepEqual(run(['-x', 'a', '-x', 'b', 'cmd']).options.exclude, ['a', 'b']);
      assert.deepEqual(run(['-x', 'a,b', 'cmd']).options.exclude, ['a', 'b']);
    });
    it('a typed -i replaces config exclude entries', () => {
      const { options } = run(['-i', 'fixtures', 'cmd'], { exclude: ['vendor'] });
      assert.deepEqual(options.exclude, []);
      assert.equal(options.ignore, 'fixtures');
    });
  });

  describe('errors', () => {
    it('a config error names the program and the full message', () => {
      const res = resolveOptions(['cmd'], NAME, { path: CONFIG_PATH, values: {}, error: new Error(`${CONFIG_PATH}: invalid JSON: nope`) }, DEFAULTS);
      assert.deepEqual(res, { error: `ep: ${CONFIG_PATH}: invalid JSON: nope` });
    });
    ['abc', '0', '1.5'].forEach((value) => {
      it(`-d ${value} is rejected`, () => {
        assert.equal(fails(['-d', value, 'cmd']), 'ep: --depth must be an integer of 1 or more');
      });
    });
    it('-i with -x cannot be combined, even with --silent', () => {
      assert.ok(fails(['-i', 'fixtures', '-x', 'vendor', 'cmd']).indexOf('cannot be combined; use --exclude only') >= 0);
      assert.ok(fails(['--silent', '-i', 'fixtures', '-x', 'vendor', 'cmd']).indexOf('cannot be combined; use --exclude only') >= 0);
    });
    it('-i without a value needs a value', () => {
      assert.equal(fails(['-i', '-p']), 'ep: -i/--ignore needs a value');
    });
    it('-x without a value needs a value', () => {
      assert.equal(fails(['-x', '-p']), 'ep: -x/--exclude needs a value');
    });
  });

  describe('-i deprecation', () => {
    it('gives exactly one deprecation line naming -x/--exclude', () => {
      const lines = run(['-i', 'fixtures', 'cmd']).warnings.filter((line) => /deprecated/i.test(line));
      assert.equal(lines.length, 1);
      assert.ok(lines[0].indexOf('-x/--exclude') >= 0);
    });
    it('--silent gives no warnings', () => {
      assert.deepEqual(run(['--silent', '-i', 'fixtures', 'cmd']).warnings, []);
    });
  });

  describe('notice', () => {
    it('names the config path and the applied keys', () => {
      const notice = noticeOf(run(['cmd'], { private: true }).warnings);
      assert.ok(notice, 'no notice');
      assert.ok((notice as string).indexOf(CONFIG_PATH) >= 0);
      assert.ok((notice as string).indexOf('private') >= 0);
    });
    it('--silent hides the notice', () => {
      assert.deepEqual(run(['--silent', 'cmd'], { private: true }).warnings, []);
    });
    it('--no-private leaves its key out and keeps the others', () => {
      const notice = noticeOf(run(['--no-private', 'cmd'], { private: true, exclude: ['vendor'] }).warnings);
      assert.ok(notice, 'no notice');
      assert.equal((notice as string).slice(NOTICE_PREFIX.length).indexOf('private'), -1);
      assert.ok((notice as string).indexOf('exclude vendor') >= 0);
    });
    it('-p with config private: true still counts as overriding', () => {
      assert.equal(noticeOf(run(['-p', 'cmd'], { private: true }).warnings), undefined);
    });
    it('no notice when every config value is overridden', () => {
      assert.equal(noticeOf(run(['--no-private', 'cmd'], { private: true }).warnings), undefined);
    });
    it('-d overrides config depth in the notice', () => {
      assert.equal(noticeOf(run(['-d', '2', 'cmd'], { depth: 1 }).warnings), undefined);
    });
    it('names depth and dot values', () => {
      const notice = noticeOf(run(['cmd'], { depth: 3, dot: true }).warnings) as string;
      assert.ok(notice.indexOf('depth 3') >= 0, notice);
      assert.ok(notice.indexOf('dot') >= 0, notice);
    });
    it('config exclude is not named in the notice when -i is typed', () => {
      const notice = noticeOf(run(['-i', 'fixtures', 'cmd'], { private: true, exclude: ['vendor'] }).warnings);
      assert.ok(notice && notice.indexOf('private') >= 0);
      assert.equal((notice as string).slice(NOTICE_PREFIX.length).indexOf('exclude'), -1);
    });
  });
});
