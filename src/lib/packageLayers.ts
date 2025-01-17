import fs from 'fs';
import path from 'path';
import Iterator from 'fs-iterator';
import removeBOM from 'remove-bom-buffer';
import topologicalSort from './topologicalSort';

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
        const existing = entries.find((x) => x.package.name === pkg.name);
        if (existing) {
          console.log(`Duplicate package named ${pkg.name} at ${existing.fullPath} and ${entry.fullPath}. Skipping`);
          return cb();
        }
        entry.package = pkg;
        entries.push(entry);
        cb();
      });
    },
    { concurrency: Infinity, callbacks: true },
    (err) => {
      if (err) return callback(err);

      // full graph at one layer, sorted by prefix
      if (!options.topological) {
        const sorted = entries.sort((a, b) => path.dirname(a.path).localeCompare(path.dirname(b.path)));
        return callback(null, [sorted]);
      }

      // build graph edges from dependencies and optionalDependencies
      const edges = [];
      entries.forEach((entry) => {
        const deps = { ...(entry.package.dependencies || {}), ...(entry.package.optionalDependencies || {}) };
        for (const name in deps) {
          const depPackage = entries.find((x) => x.package.name === name);
          if (depPackage) edges.push([name, entry.package.name]);
        }
      });

      const { layers, cycles } = topologicalSort<string>(
        edges,
        entries.map((entry) => entry.package.name)
      );
      if (cycles && cycles.length) {
        cycles.forEach((c) => console.log(`Skipping cycle: ${c.join(' -> ')}`));
      }

      return callback(
        null,
        layers.map((layer) => layer.map((name) => entries.find((x) => x.package.name === name)))
      );
    }
  );
}
