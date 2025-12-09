import type { SpawnResult } from 'cross-spawn-cb';
import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import loadSpawnTerm from './lib/loadSpawnTerm.ts';
import packageLayers, { type PackageEntry, type PackageGraph } from './lib/packageLayers.ts';

import type { EachCallback, EachError, EachOptions, EachResult } from './types.ts';

export default function worker(command: string, args: string[], options: EachOptions, callback: EachCallback): undefined {
  // Load spawn-term lazily
  loadSpawnTerm((loadErr, mod) => {
    if (loadErr) return callback(loadErr);
    const createSession = mod.createSession;

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

              const next = (err?: Error, res?: SpawnResult): undefined => {
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

      // Topological mode: streaming execution
      const graph = result as PackageGraph;
      const { entries, dependencies, dependents, roots } = graph;

      // Track in-degrees (number of incomplete dependencies)
      const inDegree: Record<string, number> = {};
      for (const name in dependencies) {
        inDegree[name] = dependencies[name].length;
      }

      const completed: Record<string, boolean> = {};
      const failed: Record<string, boolean> = {};
      const skipped: Record<string, boolean> = {};
      const running: Record<string, boolean> = {};
      let runningCount = 0;
      let completedCount = 0;
      const ready: string[] = roots.slice();

      // Count total entries
      let totalEntries = 0;
      for (const _name in entries) {
        totalEntries++;
      }

      const hasFailedDependency = (name: string): boolean => {
        if (!options.failDependents) return false;
        const deps = dependencies[name] || [];
        for (let i = 0; i < deps.length; i++) {
          if (failed[deps[i]] || skipped[deps[i]]) return true;
        }
        return false;
      };

      const onComplete = (name: string, didFail: boolean, wasSkipped = false): void => {
        delete running[name];
        runningCount--;
        completed[name] = true;
        completedCount++;
        if (didFail) failed[name] = true;
        if (wasSkipped) skipped[name] = true;

        // Unlock dependents
        const deps = dependents[name] || [];
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          inDegree[dep]--;
          if (inDegree[dep] === 0) {
            ready.push(dep);
          }
        }

        if (completedCount === totalEntries) {
          finalize();
        } else {
          tryStartNext();
        }
      };

      const runPackage = (name: string): void => {
        const entry = entries[name];
        const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };
        const prefix = path.dirname(entry.path);

        const next = (err?: Error, res?: SpawnResult): undefined => {
          if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
            res = err as unknown as SpawnResult;
            err = null;
          }

          results.push({ path: prefix, command, args, error: err, result: res });
          onComplete(name, !!err);
        };

        if (session) session.spawn(command, args, spawnOptions, { group: prefix, expanded: options.expanded }, next);
        else spawnStreaming(command, args, spawnOptions, { prefix }, next);
      };

      const tryStartNext = (): void => {
        while (ready.length > 0 && runningCount < concurrency) {
          const name = ready.shift();
          if (hasFailedDependency(name)) {
            // Skip this package and mark as skipped
            skipped[name] = true;
            onComplete(name, false, true);
            continue;
          }
          running[name] = true;
          runningCount++;
          runPackage(name);
        }
      };

      // Handle empty graph
      if (totalEntries === 0) {
        finalize();
        return;
      }

      tryStartNext();
    });
  });
}
