#!/usr/bin/env node

import exit from 'exit';
import getopts from 'getopts-compat';
import eachPackage from './index';

const figures = {
  tick: '✔',
  cross: '✘',
};

export default (argv, name) => {
  const options = getopts(argv, {
    alias: { depth: 'd', concurrency: 'c', silent: 's', private: 'p' },
    boolean: ['silent', 'private'],
    default: { depth: Infinity, concurrency: 1, silent: false, private: false },
    stopEarly: true,
  });

  const args = options._;
  if (!args.length) {
    console.log(`Missing command. Example usage: ${name} [command]`);
    return exit(4);
  }

  options.stdio = 'inherit';
  eachPackage(args[0], args.slice(1), options, (err, results) => {
    if (err && err.message.indexOf('ExperimentalWarning') >= 0) err = null;
    if (err) {
      results = err.results || [];
      console.log(err.message);
    }
    const errors = results.filter((result) => !!result.error);

    if (!options.silent) {
      console.log('\n======================');
      results.forEach((res) => console.log(`${res.error ? figures.cross : figures.tick} ${res.path}${res.error ? ` Error: ${res.error.message}` : ''}`));
      console.log('\n----------------------');
      console.log(`${name} ${args.map((x) => (x.indexOf(' ') >= 0 ? `"${x}"` : x)).join(' ')}`);
      console.log(`${figures.tick} ${results.length - errors.length} succeeded`);
      if (errors.length) console.log(`${figures.cross} ${errors.length} failed`);
    }
    exit(err || errors.length ? 5 : 0);
  });
};
