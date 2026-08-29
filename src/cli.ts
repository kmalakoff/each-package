import exit from 'exit-compat';
import fs from 'fs';
import getopts from 'getopts-compat';
import Module from 'module';
import os from 'os';
import path from 'path';
import url from 'url';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const ERROR_CODE = 5;
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

import type { EachError, EachOptions, EachResult } from './types.ts';

function getVersion(): string {
  const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

function showHelp(name: string): void {
  const version = getVersion();
  console.log(`${name} v${version}`);
  console.log('');
  console.log(`Usage: ${name} [options] <command> [args...]

Run commands in each package folder within a monorepo.

Options:
  -d, --depth <n>        Maximum depth below cwd to search for packages (default: Infinity)
  -c, --concurrency <n>  Number of packages to process in parallel (default: cpu)
  -t, --topological      Process packages in topological order based on dependencies
  -fd, --fail-dependents Skip packages whose dependencies failed (use with -t)
  -e, --expanded         Use expanded terminal UI for output
  -s, --streaming        Stream output as it happens
  -si, --silent          Suppress output
  -p, --private          Include private packages
  -i, --ignore <pattern> Ignore packages matching pattern (default: node_modules,.git)
  -r, --root             Include the root package
  -I, --interactive      Enable interactive mode (default: true)
  -v, --version          Show version number
  -h, --help             Show this help message

Examples:
  ${name} npm install      Run 'npm install' in each package
  ${name} -t npm test      Run 'npm test' in topological order
  ${name} -c 4 npm build   Run 'npm build' with concurrency of 4`);
}

const concurrency = Math.min(64, Math.max(8, (os.cpus()?.length ?? 4) * 8));

export default (argv: string[], name: string): void => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', topological: 't', failDependents: 'fd', expanded: 'e', streaming: 's', silent: 'si', private: 'p', ignore: 'i', root: 'r', interactive: 'I', version: 'v', help: 'h' },
    boolean: ['topological', 'failDependents', 'expanded', 'streaming', 'silent', 'private', 'root', 'interactive', 'version', 'help'],
    default: { depth: Infinity, concurrency, interactive: true },
    stopEarly: true,
  });

  if (options.version) {
    console.log(getVersion());
    exit(0);
    return;
  }

  if (options.help) {
    showHelp(name);
    exit(0);
    return;
  }

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
