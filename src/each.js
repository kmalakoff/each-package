const path = require('path');
const Iterator = require('fs-iterator');
const Queue = require('queue-cb');
const Console = require('foreman/lib/console.js');
const Colors = require('foreman/lib/colors.js');
const once = require('call-once-fn');
const throttle = require('lodash.throttle');
const crossSpawn = require('cross-spawn-cb');
const spawn = crossSpawn.spawn;

const THROTTLE_DURATION = 30000; // 30 sec

module.exports = function each(command, args, options, callback) {
  let depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
  if (depth !== Infinity) depth++; // depth is relative to first level of packages
  const concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;
  const cwd = typeof options.cwd === 'undefined' ? process.cwd() : options.cwd;
  const inherit = options.stdout === 'inherit' || options.stdio === 'inherit';
  const throttleDuration = typeof options.throttleDuration === 'undefined' ? THROTTLE_DURATION : options.throttleDuration;

  const iterator = new Iterator(cwd, {
    filter: function filter(entry) {
      if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
      if (entry.stats.isFile()) return entry.basename === 'package.json';
    },
    depth: depth,
  });

  const results = [];
  let processed = 0;
  iterator.forEach(
    (entry, callback) => {
      if (!entry.stats.isFile()) return callback();

      const spawnOptions = { ...options, cwd: path.dirname(entry.fullPath) };

      if (!inherit || concurrency < 2) {
        const cp = spawn(command, args, spawnOptions);

        !options.header || options.header(entry, command, args);
        crossSpawn.normalize(cp, spawnOptions, (err, res) => {
          results.push({ path: entry.path, error: err, result: res });
          callback();
        });
      } else {
        spawnOptions.encoding = 'utf8';
        if (spawnOptions.stdout === 'inherit') spawnOptions.stdout = undefined;
        if (spawnOptions.stdio === 'inherit') spawnOptions.stdio = undefined;
        const cp = spawn(command, args, spawnOptions);

        const queue = new Queue();
        const cons = new Console();
        cons.padding = 0;
        cons.trimline = 0;
        cons.wrapline = 0;
        const color = Colors.colors[processed++ % Colors.colors_max];
        const chunks = [];
        function write() {
          if (!chunks.length) return;
          !options.header || options.header(entry, command, args);
          cons.log('', { color }, Buffer.concat(chunks.splice(0)).toString('utf8'));
        }
        const writeThrottled = throttle(write, throttleDuration);
        function collect(stream, cb) {
          cb = once(cb);
          stream.on('data', (chunk) => {
            chunks.push(chunk);
            writeThrottled();
          });
          stream.once('end', cb);
          stream.once('error', cb);
        }

        !cp.stdout || queue.defer((cb) => collect(cp.stdout, cb));
        !cp.stderr || queue.defer((cb) => collect(cp.stderr, cb));

        queue.defer((cb) => {
          crossSpawn.normalize(cp, spawnOptions, (err, res) => {
            if (res && res.stdout) res.stdout = null;
            if (res && res.stderr) res.stderr = null;
            if (res && res.output) res.output[1] = null;
            if (res && res.output) res.output[2] = null;
            results.push({ path: entry.path, error: err, result: res });
            cb();
          });
        });
        queue.await((err) => {
          write();
          callback(err);
        });
      }
    },
    { callbacks: true, concurrency },
    function iteratorCallback(err) {
      err ? callback(err) : callback(null, results);
    }
  );
};
