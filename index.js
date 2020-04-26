var path = require('path');
var Iterator = require('fs-iterator');

var exec = require('./lib/exec');

function execCommand(command, options, callback) {
  if (!options.silent) {
    console.log('\n----------------------');
    console.log(command.join(' ') + ' (' + options.relativePath + ')');
    console.log('----------------------');
  }
  // console.log()
  exec(command, options, callback);
}

module.exports = function eachPackage(command, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var iterator = new Iterator(process.cwd(), {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename !== '.git' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    alwaysStat: true,
  });

  var counter = 0;
  var errors = [];
  iterator.forEach(
    function (entry, callback) {
      if (!entry.stats.isFile()) return callback();
      counter++;
      execCommand(command, { relativePath: path.dirname(entry.path), cwd: path.dirname(entry.fullPath), silent: options.silent }, function (err) {
        if (err) errors.push({ command: command, entry: entry, error: err });
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
          console.log(error.entry.path, error.error.message);
        }
        console.log('**********************');
      }
      callback(new Error('Errors ' + errors.length));
    }
  );
};
