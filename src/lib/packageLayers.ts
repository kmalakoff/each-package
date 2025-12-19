import fs from 'fs';
import Iterator, { type Entry } from 'fs-iterator';
import path from 'path';
import removeBOM from 'remove-bom-buffer';
import match from 'test-match';
import Graph, { type DependencyGraph } from 'topological-sort-group';

export interface PackageEntry extends Entry {
  package: { name: string; dependencies: object; optionalDependencies: object };
}

import type { EachOptions } from '../types.ts';

export type Callback = (err?: Error, result?: PackageEntry[][] | DependencyGraph<PackageEntry>) => void;

const defaultIgnores = 'node_modules,.git';

export default function packageLayers(options: EachOptions, callback: Callback): void {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages

  const cwd = options.cwd || process.cwd();

  const ignores = options.ignore ? options.ignore : defaultIgnores;
  const matcher = match({ exclude: ignores });

  const iterator = new Iterator(cwd as string, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory() || entry.realStats?.isDirectory()) return entry.basename[0] !== '.' && matcher(entry.basename);
      if (entry.stats.isFile()) {
        // Only include package.json files
        if (entry.basename !== 'package.json') return false;
        // Exclude root package.json unless --root flag is set
        if (!options.root && entry.path === 'package.json') return false;
        return true;
      }
      return false;
    },
    depth,
    lstat: true,
  });
  const entries: PackageEntry[] = [];
  iterator.forEach(
    (entry: PackageEntry, cb): void => {
      if (!entry.stats.isFile()) {
        cb();
        return;
      }
      fs.readFile(entry.fullPath, 'utf8', (err, contents) => {
        if (err) return cb(err);
        try {
          const pkg = JSON.parse(removeBOM(contents));
          if (pkg.private && !options.private) return cb();
          if (pkg.name === undefined) return cb(); // skip packages without names
          entry.package = pkg;
          entries.push(entry);
          cb();
        } catch (_err) {
          console.log(`Failed to parse JSON for ${entry.path}`);
          cb();
        }
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

      // Build nodes map
      const nodes: Record<string, PackageEntry> = {};
      const dependencies: Record<string, string[]> = {};
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        nodes[entry.package.name] = entry;
        dependencies[entry.package.name] = [];
      }

      // Build dependencies from package.json dependencies and optionalDependencies
      for (let j = 0; j < entries.length; j++) {
        const e = entries[j];
        const deps = { ...(e.package.dependencies || {}), ...(e.package.optionalDependencies || {}) };
        for (const name in deps) {
          if (nodes[name]) {
            // This package depends on another package in the graph
            dependencies[e.package.name].push(name);
          }
        }
      }

      // Use Graph for cycle detection
      const graph = Graph.from<PackageEntry>({ nodes, dependencies });
      const { cycles, duplicates } = graph.sort();

      if (cycles && cycles.length) {
        cycles.forEach((c) => {
          console.log(`Skipping cycle: ${c.join(' -> ')}`);
        });
      }
      if (duplicates && duplicates.length) {
        duplicates.forEach((d) => {
          console.log(`Skipping duplicates: ${JSON.stringify(d.values.map((x) => x.path))}`);
        });
      }

      // Remove cyclic packages from the graph
      if (cycles && cycles.length) {
        const cyclicPackages: Record<string, boolean> = {};
        for (let ci = 0; ci < cycles.length; ci++) {
          const c = cycles[ci];
          for (let cj = 0; cj < c.length; cj++) {
            cyclicPackages[String(c[cj])] = true;
          }
        }
        for (const cyclicName in cyclicPackages) {
          delete nodes[cyclicName];
          delete dependencies[cyclicName];
        }
        // Remove references to cyclic packages from dependencies
        for (const key in dependencies) {
          const depList = dependencies[key];
          for (let di = depList.length - 1; di >= 0; di--) {
            if (cyclicPackages[depList[di]]) depList.splice(di, 1);
          }
        }
      }

      return callback(null, { nodes, dependencies });
    }
  );
}
