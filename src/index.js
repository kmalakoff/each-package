require('./polyfills');
const each = require('./each');

module.exports = function eachPackage(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return each(command, args, options, callback);
  return new Promise((resolve, reject) => {
    each(command, args, options, function eachCallback(err, result) {
      err ? reject(err) : resolve(result);
    });
  });
};
