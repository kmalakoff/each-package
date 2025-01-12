import path from 'path';
import spawn from 'cross-spawn-cb';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import sortedEntries from './lib/sortedEntries';

import type { SpawnError } from './types';

export default function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;

  sortedEntries(options, (err, entries) => {
    if (err) return callback(err);

    const results = [];
    const queue = new Queue(concurrency);

    entries.forEach((entry) => {
      queue.defer((cb) => {
        const cwd = path.dirname(entry.fullPath);
        const prefix = path.dirname(entry.path);

        const next = (err, res) => {
          if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
            res = err;
            err = null;
          }

          results.push({ path: prefix, command, args, error: err, result: res });
          if (err && options.concurrency === 1) return cb(err); // break early
          cb();
        };

        if (entries.length < 2) spawn(command, args, { ...options, cwd }, next);
        else spawnStreaming(command, args, { ...options, cwd }, { prefix }, next);
      });
    });

    queue.await((err) => {
      if (err) (err as SpawnError).results = results;
      err ? callback(err) : callback(null, results);
    });
  });
}
