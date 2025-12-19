import type { SpawnResult } from 'cross-spawn-cb';
import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import { createSession } from 'spawn-term';
import schedule, { type DependencyGraph } from 'topological-scheduler';
import packageLayers, { type PackageEntry } from './lib/packageLayers.ts';

import type { EachCallback, EachError, EachOptions, EachResult } from './types.ts';

export default function worker(command: string, args: string[], options: EachOptions, callback: EachCallback): void {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;

  packageLayers(options, (err, result) => {
    if (err) return callback(err);

    // Create session once for all processes (only when interactive is explicitly enabled, e.g. by CLI)
    const interactive = !!options.interactive;
    const quotedArgs = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));
    const session = createSession && !options.streaming && interactive ? createSession({ header: `${process.cwd()}> ${command} ${quotedArgs.join(' ')}`, showStatusBar: true, interactive }) : null;

    // Show command header when not using terminal session (unless silent)
    if (!session && !options.silent) {
      console.log(`$ ${command} ${quotedArgs.join(' ')}`);
    }

    const results: EachResult[] = [];

    const finalize = (err?: Error): void => {
      if (err) (err as EachError).results = results;
      if (session) {
        session.waitAndClose(() => {
          err ? callback(err) : callback(null, results);
        });
      } else {
        err ? callback(err) : callback(null, results);
      }
    };

    // Non-topological mode: layers is PackageEntry[][]
    if (Array.isArray(result)) {
      const layers = result as PackageEntry[][];
      const processLayers = (layers: PackageEntry[][], done: (err?: Error) => void): void => {
        if (layers.length === 0) {
          done();
          return;
        }
        const layerEntries = layers.shift();

        const queue = new Queue(concurrency);
        layerEntries.forEach((entry) => {
          queue.defer((cb: () => void) => {
            const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };
            const prefix = path.dirname(entry.path);

            const next = (err?: Error, res?: SpawnResult): void => {
              if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
                res = err as unknown as SpawnResult;
                err = null;
              }

              results.push({ path: prefix, command, args, error: err, result: res });
              cb();
            };

            if (session) session.spawn(command, args, spawnOptions, { group: prefix, expanded: options.expanded }, next);
            else spawnStreaming(command, args, spawnOptions, { prefix }, next);
          });
        });

        queue.await((err: Error) => (err ? done(err) : processLayers(layers, done)));
      };

      processLayers(layers, finalize);
      return;
    }

    // Topological mode: use topological-scheduler
    const graph = result as DependencyGraph<PackageEntry>;

    schedule(
      graph,
      (entry, _id, cb) => {
        const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };
        const prefix = path.dirname(entry.path);

        const next = (err?: Error, res?: SpawnResult): void => {
          if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
            res = err as unknown as SpawnResult;
            err = null;
          }

          results.push({ path: prefix, command, args, error: err, result: res });
          cb(err, res);
        };

        if (session) session.spawn(command, args, spawnOptions, { group: prefix, expanded: options.expanded }, next);
        else spawnStreaming(command, args, spawnOptions, { prefix }, next);
      },
      { concurrency, failDependents: options.failDependents },
      (err) => {
        finalize(err);
      }
    );
  });
}
