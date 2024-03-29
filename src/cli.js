#!/usr/bin/env node

import path from 'path';
import exit from 'exit';
import getopts from 'getopts-compat';
import eachPackage from './index.mjs';

export default (argv) => {
  const options = getopts(argv, {
    alias: { depth: 'd', silent: 's' },
    boolean: ['silent'],
    default: { depth: Infinity },
    stopEarly: true,
  });

  // define.option('-s, --silent, 'silent');
  // define.option('-d, --depth <depth>', 'depth', parseInt, Infinity);

  const args = options._;
  if (!args.length) {
    console.log('Missing command. Example usage: each-package [command]');
    return exit(-1);
  }

  if (!options.silent)
    options.header = (entry, command, args) => {
      console.log('\n----------------------');
      console.log(`${[command].concat(args).join(' ')} (${path.dirname(entry.path)})`);
      console.log('----------------------');
    };

  options.stdio = 'inherit';
  eachPackage(args[0], args.slice(1), options, (err, results) => {
    if (err) {
      console.log(err.message);
      return exit(err.code || -1);
    }
    const errors = results.filter((result) => !!result.error);

    if (!options.silent) {
      console.log('\n======================');
      if (errors.length) {
        console.log(`Failed (${errors.length}). Passed (${results.length - errors.length})`);
        for (let index = 0; index < errors.length; index++) {
          const result = errors[index];
          console.log(`${result.path} Error: ${result.error.message}`);
        }
      } else console.log(`Passed (${results.length})`);
      console.log('======================');
    }

    exit(errors.length ? -1 : 0);
  });
};
