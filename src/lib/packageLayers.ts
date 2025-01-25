import fs from 'fs';
import path from 'path';
import Iterator from 'fs-iterator';
import find from 'lodash.find';
import removeBOM from 'remove-bom-buffer';
import { Graph, sort } from 'topological-sort-group';

export default function packageLayers(options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const cwd = options.cwd || process.cwd();

  const iterator = new Iterator(cwd, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth,
  });

  const entries = [];
  iterator.forEach(
    (entry, cb) => {
      if (!entry.stats.isFile()) return cb();
      fs.readFile(entry.fullPath, 'utf8', (err, contents) => {
        if (err) return cb(err);
        const pkg = JSON.parse(removeBOM(contents));
        if (pkg.private && !options.private) return cb();
        entry.package = pkg;
        entries.push(entry);
        cb();
      });
    },
    { concurrency: Infinity, callbacks: true },
    (err) => {
      if (err) return callback(err);

      // full graph at one layer, sorted by relative path
      if (!options.topological) {
        const sorted = entries.sort((a, b) => path.dirname(a.path).localeCompare(path.dirname(b.path)));
        return callback(null, [sorted]);
      }

      const graph = new Graph({ path: 'package.name' });
      entries.forEach((entry) => graph.add(entry));

      // build graph edges from dependencies and optionalDependencies
      entries.forEach((entry) => {
        const deps = { ...(entry.package.dependencies || {}), ...(entry.package.optionalDependencies || {}) };
        for (const name in deps) {
          const found = find(entries, (x) => x.package.name === name); // dependency in graph
          if (found) graph.add(name, entry.package.name);
        }
      });

      const { nodes, cycles } = sort(graph);
      if (cycles && cycles.length) cycles.forEach((c) => console.log(`Skipping cycle: ${c.join(' -> ')}`));
      return callback(null, nodes);
    }
  );
}