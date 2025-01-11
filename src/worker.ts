import path from 'path';
import spawn, { type SpawnResult } from 'cross-spawn-cb';
import Iterator from 'fs-iterator';
import spawnStreaming from 'spawn-streaming';
const THROTTLE_DURATION = 3000; // 3 sec

export default function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;
  const cwd = typeof options.cwd === 'undefined' ? process.cwd() : options.cwd;
  const inherit = options.stdout === 'inherit' || options.stdio === 'inherit';

  const iterator = new Iterator(cwd, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth,
  });

  const results = [];
  iterator.forEach(
    (entry, callback) => {
      if (!entry.stats.isFile()) return callback();

      const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };

      if (!inherit || concurrency < 2) {
        spawn(command, args, spawnOptions, (err, res) => {
          if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
            res = err as unknown as SpawnResult;
            err = null;
          }
          results.push({ path: path.dirname(entry.path), error: err, result: res });
          callback();
        });
      } else {
        spawnStreaming(command, args, spawnOptions, { prefix: path.dirname(entry.path), throttle: THROTTLE_DURATION }, (err, res) => {
          if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
            res = err as unknown as SpawnResult;
            err = null;
          }
          results.push({ path: path.dirname(entry.path), error: err, result: res });
          callback();
        });
      }
    },
    { callbacks: true, concurrency },
    (err) => {
      if (err) err.results = results;
      err ? callback(err) : callback(null, results);
    }
  );
}
