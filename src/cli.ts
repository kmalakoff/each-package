import exit from 'exit';
import getopts from 'getopts-compat';
import spawnTerm, { figures, formatArguments } from 'spawn-term';
import run from './index.ts';

const ERROR_CODE = 5;

import type { EachError, EachOptions, EachResult } from './types.ts';

export default (argv: string[], name: string): undefined => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', topological: 't', expanded: 'e', streaming: 's', silent: 'si', private: 'p', ignore: 'i' },
    boolean: ['topological', 'expanded', 'streaming', 'silent', 'private'],
    default: { depth: Infinity, concurrency: Infinity },
    stopEarly: true,
  });

  const args = options._;
  if (args.length === 0) {
    console.log(`Missing command. Example usage: ${name} [command]`);
    return exit(ERROR_CODE);
  }

  options.stdio = 'inherit'; // pass through stdio
  return run(args[0], args.slice(1), options as EachOptions, (err?: EachError, results?: EachResult[]): undefined => {
    if (err && !err.results) {
      console.log(err.message);
      return exit(ERROR_CODE);
    }
    if (err) results = err.results;
    const errors = results.filter((result) => !!result.error);

    if (!options.silent) {
      if (!spawnTerm) {
        console.log('\n======================');
        results.forEach((res) => {
          console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`);
        });
      }
      console.log('\n----------------------');
      console.log(`${name} ${formatArguments(args)}`);
      console.log(`${figures.tick} ${results.length - errors.length} succeeded`);
      if (errors.length) console.log(`${figures.cross} ${errors.length} failed`);
    }
    exit(err || errors.length ? ERROR_CODE : 0);
  });
};
