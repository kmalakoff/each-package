const path = require('path');
const Iterator = require('fs-iterator');
const assign = require('just-extend');
const spawn = require('cross-spawn-cb');

const defaultIgnores = ['.git', 'node_modules', '.yarn'];

module.exports = function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const ignores = options.ignore ? options.ignore.split(',') : defaultIgnores;

  const iterator = new Iterator(process.cwd(), {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return !~ignores.indexOf(entry.basename);
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth: depth,
  });

  const results = [];
  iterator.forEach(
    (entry, callback) => {
      if (!entry.stats.isFile()) return callback();
      !options.header || options.header(entry, command, args);

      const spawnOptions = assign({}, options, { cwd: path.dirname(entry.fullPath) });
      spawn(command, args, spawnOptions, (err, res) => {
        results.push({ path: entry.path, error: err, result: res });
        callback();
      });
    },
    { callbacks: true, concurrency: 1 },
    function iteratorCallback(err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
