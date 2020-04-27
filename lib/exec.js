var execa = require('execa');

module.exports = function exec(command, args, options, callback) {
  if (!options.silent) {
    console.log('\n----------------------');
    console.log([command].concat(args).join(' ') + ' (' + options.relativePath + ')');
    console.log('----------------------');
  }

  execa(command, args, options)
    .then(function (res) {
      callback(null, res);
    })
    .catch(callback);
};
