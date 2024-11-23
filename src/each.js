const path = require('path');
const Iterator = require('fs-iterator');
const crossSpawn = require('cross-spawn-cb');
const spawn = crossSpawn.spawn;

module.exports = function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;
  const cwd = typeof options.cwd === 'undefined' ? process.cwd() : options.cwd;
  const inherit = options.stdout === 'inherit' || options.stdio === 'inherit';

  const iterator = new Iterator(cwd, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth: depth,
  });

  const results = [];
  iterator.forEach(
    (entry, callback) => {
      if (!entry.stats.isFile()) return callback();
      !options.header || options.header(entry, command, args);

      const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };
      if (concurrency > 1 && inherit) {
        spawnOptions.encoding = 'utf8';
        if (spawnOptions.stdout === 'inherit') spawnOptions.stdout = undefined;
        if (spawnOptions.stdio === 'inherit') spawnOptions.stdio = undefined;
      }

      const cp = spawn(command, args, spawnOptions);
      crossSpawn.normalize(cp, spawnOptions, (err, res) => {
        results.push({ path: entry.path, error: err, result: res });
        if (concurrency > 1 && inherit) {
          if (typeof res.stdout === 'string') {
            process.stdout.write(res.stdout);
            res.stdout = null;
          }
          if (typeof res.stderr === 'string') {
            process.stderr.write(res.stderr);
            res.stderr = null;
          }
        }
        callback();
      });
    },
    { callbacks: true, concurrency: concurrency },
    function iteratorCallback(err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
