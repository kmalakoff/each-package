import exit from 'exit-compat';
import fs from 'fs';
import Module from 'module';
import os from 'os';
import path from 'path';
import url from 'url';
import { ERROR_CODE } from './constants.ts';
import loadConfig, { type ConfigResult } from './lib/loadConfig.ts';
import resolveOptions, { describeKeys, parse } from './lib/resolveOptions.ts';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

import type { EachError, EachOptions, EachResult } from './types.ts';

const concurrency = Math.min(64, Math.max(8, (os.cpus()?.length ?? 4) * 8));

function getVersion(): string {
  const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

function showHelp(name: string, config: ConfigResult | null): void {
  const values = config ? config.values : {};
  const from = (key: string): string => (key in values ? ', from config' : '');
  const defaultDepth = `${values.depth === undefined ? 1 : values.depth}${from('depth')}`;
  const defaultPrivate = `${values.private ? 'on' : 'off'}${from('private')}`;
  const defaultDot = `${values.dot ? 'on' : 'off'}${from('dot')}`;
  const configured = values.exclude && values.exclude.length ? `; config adds ${values.exclude.join(',')}` : '';
  console.log(`${name} v${getVersion()}`);
  console.log('');
  console.log(`Usage: ${name} [options] <command> [args...]

Run commands in each package folder within a monorepo.

Options:
  -d, --depth <n>        Maximum package.json depth to search (default: ${defaultDepth}). Depth counts package.json levels, not folders.
  -c, --concurrency <n>  Packages processed in parallel (default: cpu)
  -t, --topological      Process packages in dependency order
      --fail-dependents  Skip packages whose dependencies failed (use with -t)
  -e, --expanded         Expanded terminal UI
  -s, --streaming        Stream output as it happens
      --silent           Suppress output
  -p, --private          Include private packages (default: ${defaultPrivate}; --no-private to exclude)
  -x, --exclude <list>   Also skip folders matching these names or globs (repeatable; adds to node_modules${configured})
      --dot              Also enter dot-prefixed folders (default: ${defaultDot}; .git is always skipped; --no-dot to skip them)
      --no-config        Ignore ~/.config/each-package/config.json
  -i, --ignore <list>    Deprecated, will be removed in a future major: replaces the skip list, so node_modules is no longer skipped. Use -x.
  -r, --root             Include the root package
  -I, --interactive      Interactive mode (default: true)
  -v, --version          Show version number
  -h, --help             Show this help message

Skipped always: .git. Skipped by default: dot-prefixed folders, node_modules.`);
  if (config) console.log(`\nConfig: ${config.error ? config.error.message : config.path}${config.error || !Object.keys(values).length ? '' : ` (${describeKeys(Object.keys(values), values)})`}`);
  console.log(`
Examples:
  ${name} npm install      Run 'npm install' in each package
  ${name} -t npm test      Run 'npm test' in topological order
  ${name} -c 4 npm build   Run 'npm build' with concurrency of 4`);
}

export default (argv: string[], name: string): void => {
  const typedOn = parse(argv, { config: true });

  if (typedOn.version) {
    console.log(getVersion());
    exit(0);
    return;
  }

  const config: ConfigResult = typedOn.config === false ? { path: '', values: {} } : loadConfig();
  if (typedOn.help) {
    showHelp(name, typedOn.config === false ? null : config);
    exit(0);
    return;
  }
  const resolved = resolveOptions(argv, name, config, { depth: 1, concurrency, interactive: true });
  if ('error' in resolved) {
    console.log(resolved.error);
    exit(ERROR_CODE);
    return;
  }
  const options = resolved.options;
  resolved.warnings.forEach((line) => console.error(line));

  const args = options._;
  if (args.length === 0) {
    console.log(`Missing command. Example usage: ${name} [command]`);
    exit(ERROR_CODE);
    return;
  }

  options.stdio = 'inherit'; // pass through stdio
  const report = (err?: EachError | Error | null, results?: EachResult[]): void => {
    const epErr = err as EachError | undefined;
    if (epErr && !epErr.results) {
      console.log(epErr.message);
      exit(ERROR_CODE);
      return;
    }
    const allResults = (epErr ? epErr.results : results) ?? [];
    const errors = allResults.filter((result) => !!result.error);

    if (!options.silent) {
      // deferred: spawn-term's session/formatting helpers are only needed to report run results
      const { createSession, figures, formatArguments } = _require('spawn-term');
      if (!createSession) {
        console.log('\n======================');
        allResults.forEach((res) => {
          console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`);
        });
        console.log('\n----------------------');
        console.log(`${name} ${formatArguments(args)}`);
        console.log(`${figures.tick} ${allResults.length - errors.length} succeeded`);
        if (errors.length) console.log(`${figures.cross} ${errors.length} failed`);
      }
    }
    exit(err || errors.length ? ERROR_CODE : 0);
  };
  // deferred: index.ts pulls the whole scheduling/spawn pipeline. require() cannot load this ESM
  // sibling below Node 20.19 (require(esm)), so the ESM half needs a real dynamic import; the CJS
  // half's sibling is genuine CommonJS, so a plain synchronous require avoids depending on
  // Promise, which isn't global before Node 0.12.
  loadIndex((err, run) => (err || !run ? report(err) : run(args[0], args.slice(1), options as EachOptions, report)));
};

type RunFn = (command: string, args: string[], options: EachOptions, callback: (err?: EachError | Error | null, results?: EachResult[]) => void) => void;

function loadIndex(callback: (err: Error | null, run?: RunFn) => void): void {
  if (typeof require === 'undefined') {
    import('./index.js').then((mod) => callback(null, mod.default || mod)).catch((err) => callback(err instanceof Error ? err : new Error(String(err))));
  } else {
    try {
      const mod = require('./index.js');
      callback(null, mod.default || mod);
    } catch (err) {
      callback(err instanceof Error ? err : new Error(String(err)));
    }
  }
}
