#!/usr/bin/env node

import path from 'path';
import exit from 'exit';
import getopts from 'getopts-compat';
import run from './index';

const figures = {
  tick: '✔',
  cross: '✘',
};
const ERROR_CODE = 5;

export default (argv, name) => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', topological: 't', silent: 's', private: 'p' },
    boolean: ['topological', 'silent', 'private'],
    default: { depth: Infinity, concurrency: Infinity, topological: false, silent: false, private: false },
    stopEarly: true,
  });

  const args = options._;
  if (!args.length) {
    console.log(`Missing command. Example usage: ${name} [command]`);
    return exit(ERROR_CODE);
  }

  options.stdio = 'inherit'; // pass through stdio
  return run(args[0], args.slice(1), options, (err, results) => {
    if (err && !err.results) {
      console.log(err.message);
      return exit(ERROR_CODE);
    }
    if (err) results = err.results;
    const errors = results.filter((result) => !!result.error);

    if (!options.silent) {
      console.log('\n======================');
      results.forEach((res) => console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`));
      console.log('\n----------------------');
      console.log(`${name} ${args.map((x) => (x.indexOf(' ') >= 0 ? `"${x}"` : x)).join(' ')}`);
      console.log(`${figures.tick} ${results.length - errors.length} succeeded`);
      if (errors.length) console.log(`${figures.cross} ${errors.length} failed`);
    }
    exit(err || errors.length ? ERROR_CODE : 0);
  });
};
