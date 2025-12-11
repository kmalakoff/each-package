import exit from 'exit-compat';
import fs from 'fs';
import getopts from 'getopts-compat';
import path from 'path';
import { createSession, figures, formatArguments } from 'spawn-term';
import url from 'url';
import run from './index.ts';

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
  -d, --depth <n>        Maximum depth to search for packages (default: Infinity)
  -c, --concurrency <n>  Number of packages to process in parallel (default: Infinity)
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

export default (argv: string[], name: string): undefined => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', topological: 't', failDependents: 'fd', expanded: 'e', streaming: 's', silent: 'si', private: 'p', ignore: 'i', root: 'r', interactive: 'I', version: 'v', help: 'h' },
    boolean: ['topological', 'failDependents', 'expanded', 'streaming', 'silent', 'private', 'root', 'interactive', 'version', 'help'],
    default: { depth: Infinity, concurrency: Infinity, interactive: true },
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
  run(args[0], args.slice(1), options as EachOptions, (err?: EachError, results?: EachResult[]): undefined => {
    if (err && !err.results) {
      console.log(err.message);
      exit(ERROR_CODE);
      return;
    }
    if (err) results = err.results;
    const errors = results.filter((result) => !!result.error);

    if (!options.silent) {
      if (!createSession) {
        console.log('\n======================');
        results.forEach((res) => {
          console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`);
        });
        console.log('\n----------------------');
        console.log(`${name} ${formatArguments(args)}`);
        console.log(`${figures.tick} ${results.length - errors.length} succeeded`);
        if (errors.length) console.log(`${figures.cross} ${errors.length} failed`);
      }
    }
    exit(err || errors.length ? ERROR_CODE : 0);
  });
};
