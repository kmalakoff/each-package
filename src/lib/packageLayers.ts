import fs from 'fs';
import Iterator, { type Entry } from 'fs-iterator';
import find from 'lodash.find';
import path from 'path';
import removeBOM from 'remove-bom-buffer';
import match from 'test-match';
import Graph from 'topological-sort-group';

export interface PackageEntry extends Entry {
  package: { name: string; dependencies: object; optionalDependencies: object };
}

import type { EachOptions } from '../types.ts';

export interface PackageGraph {
  entries: Record<string, PackageEntry>;
  dependencies: Record<string, string[]>;
  dependents: Record<string, string[]>;
  roots: string[];
}

export type Callback = (err?: Error, result?: PackageEntry[][] | PackageGraph) => undefined;

const defaultIgnores = 'node_modules,.git';

export default function packageLayers(options: EachOptions, callback: Callback): undefined {
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
  const entries = [];
  iterator.forEach(
    (entry: PackageEntry, cb): undefined => {
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

      const graph = new Graph<PackageEntry>({ path: 'package.name' });
      entries.forEach((entry) => {
        graph.add(entry);
      });

      // Build maps for streaming execution
      const entriesMap: Record<string, PackageEntry> = {};
      const dependenciesMap: Record<string, string[]> = {};
      const dependentsMap: Record<string, string[]> = {};

      entries.forEach((entry: PackageEntry) => {
        entriesMap[entry.package.name] = entry;
        dependenciesMap[entry.package.name] = [];
        dependentsMap[entry.package.name] = [];
      });

      // build graph edges from dependencies and optionalDependencies
      entries.forEach((entry: PackageEntry) => {
        const deps = { ...(entry.package.dependencies || {}), ...(entry.package.optionalDependencies || {}) };
        for (const name in deps) {
          const found = find(entries, (x) => x.package.name === name); // dependency in graph
          if (found) {
            graph.add(name, entry.package.name);
            // Track dependencies: entry depends on name
            dependenciesMap[entry.package.name].push(name);
            // Track dependents: name has entry as a dependent
            dependentsMap[name].push(entry.package.name);
          }
        }
      });

      const { cycles, duplicates } = graph.sort();
      if (cycles && cycles.length)
        cycles.forEach((c) => {
          console.log(`Skipping cycle: ${c.join(' -> ')}`);
        });
      if (duplicates && duplicates.length)
        duplicates.forEach((d) => {
          console.log(`Skipping duplicates: ${JSON.stringify(d.values.map((x) => x.path))}`);
        });

      // Find roots (packages with no internal dependencies)
      const roots: string[] = [];
      for (const name in dependenciesMap) {
        if (dependenciesMap[name].length === 0) {
          roots.push(name);
        }
      }

      // Remove cyclic packages from the graph
      if (cycles && cycles.length) {
        const cyclicPackages: Record<string, boolean> = {};
        for (const c of cycles) {
          for (const n of c) {
            cyclicPackages[String(n)] = true;
          }
        }
        for (const name in cyclicPackages) {
          delete entriesMap[name];
          delete dependenciesMap[name];
          delete dependentsMap[name];
          const rootIdx = roots.indexOf(name);
          if (rootIdx >= 0) roots.splice(rootIdx, 1);
        }
        // Remove references to cyclic packages from dependencies/dependents
        for (const key in dependenciesMap) {
          const deps = dependenciesMap[key];
          for (let i = deps.length - 1; i >= 0; i--) {
            if (cyclicPackages[deps[i]]) deps.splice(i, 1);
          }
        }
        for (const key in dependentsMap) {
          const deps = dependentsMap[key];
          for (let i = deps.length - 1; i >= 0; i--) {
            if (cyclicPackages[deps[i]]) deps.splice(i, 1);
          }
        }
      }

      return callback(null, {
        entries: entriesMap,
        dependencies: dependenciesMap,
        dependents: dependentsMap,
        roots,
      });
    }
  );
}
