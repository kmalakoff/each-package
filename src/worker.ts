import fs from 'fs';
import path from 'path';
import type { RawManifest } from '@lerna-lite/core';
import Iterator from 'fs-iterator';
import removeBOM from 'remove-bom-buffer';
import spawnStreaming, { type SpawnResult } from 'spawn-streaming';
// @ts-ignore
import { Package } from '../../assets/package.cjs';
// @ts-ignore
import { runTopologically } from '../../assets/run-topologically.cjs';

export default function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;
  const cwd = typeof options.cwd === 'undefined' ? process.cwd() : options.cwd;

  const iterator = new Iterator(cwd, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth,
  });

  const packages = [];
  iterator.forEach(
    (entry) => {
      if (!entry.stats.isFile()) return;
      packages.push({ package: JSON.parse(removeBOM(fs.readFileSync(entry.fullPath)).toString()), path: entry.fullPath });
    },
    async (err) => {
      if (err) return callback(err);

      const results = [];
      try {
        await runTopologically(
          packages.map((x) => new Package({ ...x.package, devDependencies: {} } as unknown as RawManifest, path.dirname(x.path), cwd)),
          function runner(pkg) {
            return new Promise((resolve, _reject) => {
              spawnStreaming(command, args, { ...options, cwd: pkg.location }, { prefix: pkg.name }, (err, res) => {
                if (err && err.message.indexOf('ExperimentalWarning') >= 0) {
                  res = err as unknown as SpawnResult;
                  err = null;
                }
                results.push({ path: pkg.name, error: err, result: res });
                resolve(undefined);
              });
            });
          },
          {
            concurrency,
            rejectCycles: false,
          }
        );
        return callback(null, results);
      } catch (err) {
        err.results = results;
        return callback(err);
      }
    }
  );
}
