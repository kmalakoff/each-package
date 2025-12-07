import type { SpawnResult } from 'cross-spawn-cb';
import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import loadSpawnTerm from './lib/loadSpawnTerm.ts';
import packageLayers from './lib/packageLayers.ts';

import type { EachCallback, EachError, EachOptions } from './types.ts';

export default function worker(command: string, args: string[], options: EachOptions, callback: EachCallback): undefined {
  // Load spawn-term lazily
  loadSpawnTerm((loadErr, mod) => {
    if (loadErr) return callback(loadErr);
    const createSession = mod.createSession;

    let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
    if (depth !== Infinity) depth++; // depth is relative to first level of packages
    const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;

    packageLayers(options, (err, layers) => {
      if (err) return callback(err);

      // Create session once for all processes (only when interactive is explicitly enabled, e.g. by CLI)
      const interactive = !!options.interactive;
      const quotedArgs = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));
      const session = createSession && !options.streaming && interactive ? createSession({ header: `${process.cwd()}> ${command} ${quotedArgs.join(' ')}`, showStatusBar: true, interactive }) : null;

      // Show command header when not using terminal session (unless silent)
      if (!session && !options.silent) {
        console.log(`$ ${command} ${quotedArgs.join(' ')}`);
      }

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

            if (session) session.spawn(command, args, spawnOptions, { group: prefix, expanded: options.expanded }, next);
            else spawnStreaming(command, args, spawnOptions, { prefix }, next);
          });
        });

        queue.await((err) => (err ? callback(err) : processLayers(layers, callback)));
      }

      processLayers(layers, (err) => {
        if (err) (err as EachError).results = results;
        if (session) {
          session.waitAndClose(() => {
            err ? callback(err) : callback(null, results);
          });
        } else {
          err ? callback(err) : callback(null, results);
        }
      });
    });
  });
}
