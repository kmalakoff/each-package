import spawn from 'cross-spawn-cb';
import fs from 'fs';
import mkdirp from 'mkdirp-classic';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
const TMP = path.join(ROOT, '.tmp');
export const CLI = path.join(ROOT, 'bin', 'cli.js');
export const VISIT = path.join(__dirname, 'visit.cjs');

let counter = 0;

export interface Scratch {
  dir: string;
  group: string;
  home: string;
  configPath: string;
}

export interface Run {
  status: number;
  stdout: string;
  stderr: string;
  visited: string[];
}

function writePackage(dir: string, name: string, extra?: object): void {
  mkdirp.sync(dir);
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, ...(extra || {}) }));
}

// A group folder with real packages, dot folders and skipped folders, plus an empty home.
export function createScratch(label: string): Scratch {
  counter++;
  const dir = path.join(TMP, `ep-${label}-${process.pid}-${counter}`);
  const group = path.join(dir, 'group');
  const home = path.join(dir, 'home');
  mkdirp.sync(home);
  writePackage(path.join(group, 'a'), 'a');
  writePackage(path.join(group, 'b'), 'b', { private: true });
  writePackage(path.join(group, 'a', 'sub', 'c'), 'c');
  writePackage(path.join(group, 'a', 'test', 'fixtures', 'f'), 'f');
  writePackage(path.join(group, 'vendor', 'v'), 'v');
  writePackage(path.join(group, 'vendor-old', 'vo'), 'vo');
  writePackage(path.join(group, '.tmp', 't'), 't');
  writePackage(path.join(group, '.worktrees', 'w'), 'w');
  writePackage(path.join(group, '.github', 'actions', 'g'), 'g');
  writePackage(path.join(group, '.git', 'p'), 'p');
  writePackage(path.join(group, 'node_modules', 'n'), 'n');
  return { dir, group, home, configPath: path.join(home, '.config', 'each-package', 'config.json') };
}

export function writeConfig(scratch: Scratch, contents: string | object): void {
  mkdirp.sync(path.dirname(scratch.configPath));
  fs.writeFileSync(scratch.configPath, typeof contents === 'string' ? contents : JSON.stringify(contents));
}

// a directory where the config file should be
export function writeConfigDirectory(scratch: Scratch): void {
  mkdirp.sync(scratch.configPath);
}

// Runs ep in a group folder with HOME and USERPROFILE pointing at the scratch home.
export function runEp(scratch: Scratch, args: string[], cwd: string | undefined, callback: (err: Error | null, run?: Run) => void): void {
  const env: Record<string, string | undefined> = {};
  for (const key in process.env) env[key] = process.env[key];
  env.HOME = scratch.home;
  env.USERPROFILE = scratch.home;
  spawn(CLI, args, { encoding: 'utf8', cwd: cwd || scratch.group, env }, (err, res) => {
    const out = (err ? (err as unknown as Record<string, string>) : res) as unknown as { status: number; stdout: string; stderr: string } | undefined;
    if (!out || typeof out.status !== 'number') return callback(err || new Error('no result'));
    const stdout = String(out.stdout || '');
    const visited: string[] = [];
    const lines = stdout.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const match = /^VISIT:(.+)$/.exec(lines[i]);
      if (match) visited.push(match[1]);
    }
    visited.sort();
    callback(null, { status: out.status, stdout, stderr: String(out.stderr || ''), visited });
  });
}

// ep arguments that run the visiting command
export function visitArgs(args: string[]): string[] {
  return args.concat(['--streaming', 'node', VISIT]);
}
