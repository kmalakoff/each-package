var path = require('path');
var Iterator = require('fs-iterator');
var assign = require('object-assign');
var spawn = require('cross-spawn-cb');

const ignores = ['.git', 'node_modules', '.yarn'];
function ignore(entry) {
  return ~ignores.indexOf(entry.basename);
}

module.exports = function each(command, args, options, callback) {
  var depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages

  var iterator = new Iterator(process.cwd(), {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return !ignore(entry);
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth: depth,
  });

  var spawnOptions = assign({}, options);
  if (!spawnOptions.stdout && !spawnOptions.stdio) spawnOptions.stdio = 'inherit';

  var results = [];
  iterator.forEach(
    function (entry, callback) {
      if (!entry.stats.isFile()) return callback();
      !options.header || options.header(entry, command, args);
      spawn(command, args, assign({}, spawnOptions, { cwd: path.dirname(entry.fullPath) }), function (err, res) {
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
