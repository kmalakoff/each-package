import fs from 'fs';
import Iterator, { type Entry } from 'fs-iterator';
import find from 'lodash.find';
import path from 'path';
import removeBOM from 'remove-bom-buffer';
import { Graph, sort } from 'topological-sort-group';

interface PackageEntry extends Entry {
  contents: { name: string; dependencies: object; optionalDependencies: object };
}

import type { EachOptions } from '../types.ts';

export type Callback = (err?: Error, node?: PackageEntry[][]) => undefined;

export default function packageLayers(options: EachOptions, callback: Callback): undefined {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const cwd = options.cwd || process.cwd();

  const iterator = new Iterator(cwd as string, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth,
  });

  const entries = [];
  iterator.forEach(
    (entry: PackageEntry, cb): undefined => {
      if (!entry.stats.isFile()) {
        cb();
        return;
      }
      fs.readFile(entry.fullPath, 'utf8', (err, contents) => {
        if (err) return cb(err);
        const pkg = JSON.parse(removeBOM(contents));
        if (pkg.private && !options.private) return cb();
        entry.contents = pkg;
        entries.push(entry);
        cb();
      });
    },
    { concurrency: Infinity, callbacks: true },
    (err) => {
      if (err) return callback(err);

      // full graph at one layer, sorted by relative path
      if (!options.topological) {
        const sorted = entries.sort((a, b) => path.dirname(a.path).localeCompare(path.dirname(b.path))) as PackageEntry[];
        return callback(null, [sorted]);
      }

      const graph = new Graph<PackageEntry>({ path: 'package.name' });
      entries.forEach((entry) => graph.add(entry));

      // build graph edges from dependencies and optionalDependencies
      entries.forEach((entry: PackageEntry) => {
        const deps = { ...(entry.contents.dependencies || {}), ...(entry.contents.optionalDependencies || {}) };
        for (const name in deps) {
          const found = find(entries, (x) => x.package.name === name); // dependency in graph
          if (found) graph.add(name, entry.contents.name);
        }
      });

      const { nodes, cycles } = sort(graph);
      if (cycles && cycles.length) cycles.forEach((c) => console.log(`Skipping cycle: ${c.join(' -> ')}`));
      return callback(null, nodes as unknown as PackageEntry[][]);
    }
  );
}
