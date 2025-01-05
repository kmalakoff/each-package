#!/usr/bin/env node

import path from 'path';
import exit from 'exit';
import getopts from 'getopts-compat';
import eachPackage from './index';

const figures = {
  tick: '✔',
  cross: '✘',
};

export default (argv) => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', silent: 's' },
    boolean: ['silent'],
    default: { depth: Infinity, concurrency: 1 },
    stopEarly: true,
  });

  const args = options._;
  if (!args.length) {
    console.log('Missing command. Example usage: ep [command]');
    return exit(-1);
  }

  if (!options.silent)
    options.header = (entry, command, args) => {
      console.log('\n----------------------');
      console.log(`${path.dirname(entry.path)}:\n\n${[command].concat(args).join(' ')}`);
      console.log('----------------------');
    };

  options.stdio = 'inherit';
  eachPackage(args[0], args.slice(1), options, (err, results) => {
    if (err && err.message.indexOf('ExperimentalWarning') >= 0) err = null;
    if (err) console.log(err.message);

    const errors = results.filter((result) => !!result.error);
    if (!options.silent) {
      console.log('\n======================');
      console.log(`ep ${args.join(' ')} ${errors.length ? 'failed' : 'succeeded'}`);
      results.forEach((res) => console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`));
    }
    exit(errors.length ? -1 : 0);
  });
};
