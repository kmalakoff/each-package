import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import packageLayers from './lib/packageLayers';

import type { SpawnError } from './types';

export default function worker(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;

  packageLayers(options, (err, layers) => {
    if (err) return callback(err);

    const results = [];
    function processLayers(layers, callback) {
      if (layers.length === 0) return callback();
      const entries = layers.shift();

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
            cb();
          };

          spawnStreaming(command, args, { ...options, cwd }, { prefix }, next);
        });
      });

      queue.await((err) => (err ? callback(err) : processLayers(layers, callback)));
    }

    processLayers(layers, (err) => {
      if (err) (err as SpawnError).results = results;
      err ? callback(err) : callback(null, results);
    });
  });
}
