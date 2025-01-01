import worker from './worker';

export default function eachPackage(command, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(command, args, options, callback);
  return new Promise((resolve, reject) => worker(command, args, options, (err, result) => (err ? reject(err) : resolve(result))));
}
