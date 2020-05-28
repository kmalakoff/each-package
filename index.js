var path = require('path');
var Iterator = require('fs-iterator');
var assign = require('object-assign');
var spawn = require('cross-spawn-cb');

module.exports = function eachPackage(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  var depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages

  var iterator = new Iterator(process.cwd(), {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename !== '.git' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth: depth,
  });

  var results = [];
  iterator.forEach(
    function (entry, callback) {
      if (!entry.stats.isFile()) return callback();
      if (options.header) options.header(entry, command, args);
      var spawnOptions = assign({}, options, { cwd: path.dirname(entry.fullPath) });
      if (!spawnOptions.stdout && !spawnOptions.stdio) spawnOptions.stdio = 'inherit';

      spawn(command, args, spawnOptions, function (err, res) {
        if (err) return callback(err);
        results.push({ path: entry.path, result: res });
        callback();
      });
    },
    { callbacks: true, concurrency: 1 },
    function iteratorCallback(err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
