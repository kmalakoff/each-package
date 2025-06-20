import assert from 'assert';
import cr from 'cr';
import spawn from 'cross-spawn-cb';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const CLI = path.join(__dirname, '..', '..', 'bin', 'cli.js');
const NODE_MODULES = path.join(__dirname, '..', '..', 'node_modules');

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const NODE = isWindows ? 'node.exe' : 'node';
const res = spawn.sync(NODE, ['--version'], { encoding: 'utf8' });
const VERSION = cr(res.stdout).split('\n')[0];

describe('cli', () => {
  describe('happy path', () => {
    it('basic command', (done) => {
      spawn(CLI, ['--silent', '--expanded', 'echo', '"hello"'], { encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, res) => {
        if (err) return done(err.message);
        assert.ok(res.stdout.indexOf('"hello"') >= 0);
        done();
      });
    });

    it('basic command with options', (done) => {
      spawn(CLI, ['--silent', '--expanded', NODE, '--version'], { encoding: 'utf8', cwd: path.join(NODE_MODULES, '@types') }, (err, res) => {
        if (err) return done(err.message);
        assert.ok(res.stdout.indexOf(VERSION) >= 0);
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
});
