import fs from 'fs';
import Iterator from 'fs-iterator';
import removeBOM from 'remove-bom-buffer';
import topologicalSort from './topologicalSort';

export default function sortedLayers(options, callback) {
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

  const packages = {};
  iterator.forEach(
    (entry, cb) => {
      if (!entry.stats.isFile()) return cb();
      fs.readFile(entry.fullPath, 'utf8', (err, contents) => {
        if (err) return cb(err);
        const pkg = JSON.parse(removeBOM(contents));
        if (pkg.private && !options.private) return cb();
        if (packages[pkg.name]) {
          console.log(`Duplicate package named ${pkg.name} at ${packages[pkg.name].path} and ${entry.path}. Skipping`);
          return cb();
        }
        entry.package = pkg;
        packages[pkg.name] = entry;
        cb();
      });
    },
    { concurrency: Infinity, callbacks: true },
    (err) => {
      if (err) return callback(err);

      const edges = [];
      for (const name in packages) {
        const entry = packages[name];
        const deps = { ...(entry.package.dependencies || {}), ...(entry.package.optionalDependencies || {}) };
        for (const dep in deps) {
          if (packages[dep]) edges.push([dep, entry.package.name]);
        }
      }

      const { layers, cycles } = topologicalSort<string>(edges, Object.keys(packages));
      if (cycles && cycles.length) {
        cycles.forEach((c) => console.log(`Skipping cycle: ${c.join(' -> ')}`));
      }

      return callback(
        null,
        layers.map((layer) => layer.map((x) => packages[x]))
      );
    }
  );
}
