"use strict";
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var path = require('path');
var Iterator = require('fs-iterator');
var Queue = require('queue-cb');
var Console = require('foreman/lib/console.js');
var Colors = require('foreman/lib/colors.js');
var once = require('call-once-fn');
var throttle = require('lodash.throttle');
var crossSpawn = require('cross-spawn-cb');
var spawn = crossSpawn.spawn;
var THROTTLE_DURATION = 20000; // 20 sec
module.exports = function each(command, args, options, callback) {
    var depth = typeof options.depth === 'undefined' ? Infinity : options.depth;
    if (depth !== Infinity) depth++; // depth is relative to first level of packages
    var concurrency = typeof options.concurrency === 'undefined' ? 1 : options.concurrency;
    var cwd = typeof options.cwd === 'undefined' ? process.cwd() : options.cwd;
    var inherit = options.stdout === 'inherit' || options.stdio === 'inherit';
    var throttleDuration = typeof options.throttleDuration === 'undefined' ? THROTTLE_DURATION : options.throttleDuration;
    var iterator = new Iterator(cwd, {
        filter: function filter(entry) {
            if (entry.stats.isDirectory()) return entry.basename[0] !== '.' && entry.basename !== 'node_modules';
            if (entry.stats.isFile()) return entry.basename === 'package.json';
        },
        depth: depth
    });
    var results = [];
    var processed = 0;
    iterator.forEach(function(entry, callback) {
        if (!entry.stats.isFile()) return callback();
        var spawnOptions = _object_spread_props(_object_spread({}, options), {
            cwd: path.dirname(entry.fullPath)
        });
        if (!inherit || concurrency < 2) {
            var cp = spawn(command, args, spawnOptions);
            !options.header || options.header(entry, command, args);
            crossSpawn.normalize(cp, spawnOptions, function(err, res) {
                results.push({
                    path: entry.path,
                    error: err,
                    result: res
                });
                callback();
            });
        } else {
            var write = function write() {
                if (!chunks.length) return;
                !options.header || options.header(entry, command, args);
                cons.log('', {
                    color: color
                }, Buffer.concat(chunks.splice(0)).toString('utf8'));
            };
            var collect = function collect(stream, cb) {
                cb = once(cb);
                stream.on('data', function(chunk) {
                    chunks.push(chunk);
                    writeThrottled();
                });
                stream.once('end', cb);
                stream.once('error', cb);
            };
            spawnOptions.encoding = 'utf8';
            if (spawnOptions.stdout === 'inherit') spawnOptions.stdout = undefined;
            if (spawnOptions.stdio === 'inherit') spawnOptions.stdio = undefined;
            var cp1 = spawn(command, args, spawnOptions);
            var queue = new Queue();
            var cons = new Console();
            cons.padding = 0;
            cons.trimline = 0;
            cons.wrapline = 0;
            var color = Colors.colors[processed++ % Colors.colors_max];
            var chunks = [];
            var writeThrottled = throttle(write, throttleDuration);
            !cp1.stdout || queue.defer(function(cb) {
                return collect(cp1.stdout, cb);
            });
            !cp1.stderr || queue.defer(function(cb) {
                return collect(cp1.stderr, cb);
            });
            queue.defer(function(cb) {
                crossSpawn.normalize(cp1, spawnOptions, function(err, res) {
                    if (res && res.stdout) res.stdout = null;
                    if (res && res.stderr) res.stderr = null;
                    if (res && res.output) res.output[1] = null;
                    if (res && res.output) res.output[2] = null;
                    results.push({
                        path: entry.path,
                        error: err,
                        result: res
                    });
                    cb();
                });
            });
            queue.await(function(err) {
                write();
                callback(err);
            });
        }
    }, {
        callbacks: true,
        concurrency: concurrency
    }, function iteratorCallback(err) {
        err ? callback(err) : callback(null, results);
    });
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }