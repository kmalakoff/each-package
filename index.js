var path = require('path');
var Iterator = require('fs-iterator');
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

  var counter = 0;
  var errors = [];
  iterator.forEach(
    function (entry, callback) {
      if (!entry.stats.isFile()) return callback();

      if (!options.silent) {
        console.log('\n----------------------');
        console.log([command].concat(args).join(' ') + ' (' + path.dirname(entry.path) + ')');
        console.log('----------------------');
      }

      counter++;
      spawn(command, args, { stdio: 'inherit', cwd: path.dirname(entry.fullPath) }, function (err, res) {
        if (err) return callback(err);
        if (res.code !== 0) errors.push({ entry: entry, res: res });
        callback();
      });
    },
    { callbacks: true, concurrency: 1 },
    function iteratorCallback(err) {
      if (err) return callback(err);
      if (!errors.length) {
        if (!options.silent) {
          console.log('\n**********************');
          console.log('Success (' + counter + ')');
          console.log('**********************');
        }

        return callback();
      }

      if (!options.silent) {
        console.log('\n**********************');
        console.log('Errors (' + errors.length + ' of ' + counter + ')');
        for (var i = 0; i < errors.length; i++) {
          var error = errors[i];
          console.log(error.entry.path, error.res.code);
        }
        console.log('**********************');
      }
      callback(new Error('Errors ' + errors.length));
    }
  );
};
