import type { SpawnResult } from 'cross-spawn-cb';
import path from 'path';
import Queue from 'queue-cb';
import spawnStreaming from 'spawn-streaming';
import { createSession } from 'spawn-term';
import schedule from 'topological-scheduler';
import packageLayers, { type PackageEntry } from './lib/packageLayers.ts';

import type { EachCallback, EachError, EachOptions, EachResult } from './types.ts';

export default function worker(command: string, args: string[], options: EachOptions, callback: EachCallback): void {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;

  packageLayers(options, (err, entries, graph) => {
    if (err) return callback(err);
    if (entries.length === 0) return callback(null, []);

    // Create session once for all processes (only when interactive is explicitly enabled, e.g. by CLI)
    const interactive = !!options.interactive;
    const quotedArgs = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));

    const header = `${process.cwd()}> ${command} ${quotedArgs.join(' ')}`;
    const session = entries.length >= 2 && process.stdout.isTTY && createSession && !options.streaming && interactive ? createSession({ header, showStatusBar: true, interactive }) : null;
    if (!session && !options.silent) console.log(header);

    const results: EachResult[] = [];

    const finalize = (err?: Error): void => {
      if (err) (err as EachError).results = results;
      if (session) session.waitAndClose(() => (err ? callback(err) : callback(null, results)));
      else err ? callback(err) : callback(null, results);
    };

    const spawnEntry = (entry: PackageEntry, cb) => {
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
      else spawnStreaming(command, args, spawnOptions, { prefix: process.stdout.isTTY ? prefix : undefined }, next);
    };

    // Topological mode: use topological-scheduler
    if (options.topological) schedule(graph, (entry, _id, cb) => spawnEntry(entry, cb), { concurrency, failDependents: options.failDependents }, finalize);
    // Non-topological mode: layers is PackageEntry[]
    else {
      const sorted = entries.sort((a, b) => path.dirname(a.path).localeCompare(path.dirname(b.path))) as PackageEntry[];
      const queue = new Queue(concurrency);
      sorted.forEach((entry) => queue.defer(spawnEntry.bind(null, entry)));
      queue.await(finalize);
      return;
    }
  });
}
