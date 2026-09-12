#!/usr/bin/env node

var getopts = require('getopts-compat');
var exit = require('exit');
var path = require('path');
var eachPackage = require('..');

(function () {
  var options = getopts(process.argv.slice(2), {
    alias: { depth: 'd', silent: 's' },
    boolean: ['silent'],
    default: { depth: Infinity },
    stopEarly: true,
  });

  // define.option('-s, --silent, 'silent');
  // define.option('-d, --depth <depth>', 'depth', parseInt, Infinity);

  var args = options._;
  if (!args.length) {
    console.log('Missing command. Example usage: each-package [command]');
    return exit(-1);
  }

  if (!options.silent)
    options.header = function (entry, command, args) {
      console.log('\n----------------------');
      console.log([command].concat(args).join(' ') + ' (' + path.dirname(entry.path) + ')');
      console.log('----------------------');
    };

  eachPackage(args[0], args.slice(1), options, function (err, results) {
    if (err) {
      console.log(err.message);
      return exit(err.code || -1);
    }
    var errors = results.filter(function (result) {
      return !!result.error;
    });

    if (!options.silent) {
      console.log('\n======================');
      if (errors.length) {
        console.log('Errors (' + errors.length + ')');
        for (var index = 0; index < errors.length; index++) {
          var result = errors[index];
          console.log(result.path + ' Error: ' + result.error.message);
        }
      } else console.log('Success (' + results.length + ')');
      console.log('======================');
    }

    exit(errors.length ? -1 : 0);
  });
})();
