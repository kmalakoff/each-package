var spawn = require('cross-spawn-cb');

module.exports = function exec(command, args, options, callback) {
  if (!options.silent) {
    console.log('\n----------------------');
    console.log([command].concat(args).join(' ') + ' (' + options.relativePath + ')');
    console.log('----------------------');
  }

  spawn(command, args, { stdio: 'inherit', cwd: options.cwd }, callback);
};
