import type { SpawnResult } from 'cross-spawn-cb';
import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import spawnTerm from 'spawn-term';
import packageLayers from './lib/packageLayers.ts';

import type { EachCallback, EachError, EachOptions } from './types.ts';

export default function worker(command: string, args: string[], options: EachOptions, callback: EachCallback): undefined {
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
          const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };
          const prefix = path.dirname(entry.path);

          function next(err?: Error, res?: SpawnResult): undefined {
            if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
              res = err as unknown as SpawnResult;
              err = null;
            }

            results.push({ path: prefix, command, args, error: err, result: res });
            cb();
          }

          if (spawnTerm && !options.streaming) spawnTerm(command, args, spawnOptions, { group: prefix, expanded: options.expanded }, next);
          else spawnStreaming(command, args, spawnOptions, { prefix }, next);
        });
      });

      queue.await((err) => (err ? callback(err) : processLayers(layers, callback)));
    }

    processLayers(layers, (err) => {
      if (err) (err as EachError).results = results;
      err ? callback(err) : callback(null, results);
    });
  });
}
