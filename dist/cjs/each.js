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
var path = require("path");
var Iterator = require("fs-iterator");
var crossSpawn = require("cross-spawn-cb");
var spawn = crossSpawn.spawn;
function pipe(res, clear) {
    if (res && typeof res.stdout === "string") {
        process.stdout.write(res.stdout);
        if (clear) res.stdout = null;
    }
    if (res && typeof res.stderr === "string") {
        process.stderr.write(res.stderr);
        if (clear) res.stderr = null;
    }
}
module.exports = function each(command, args, options, callback) {
    var depth = typeof options.depth === "undefined" ? Infinity : options.depth;
    if (depth !== Infinity) depth++; // depth is relative to first level of packages
    var concurrency = typeof options.concurrency === "undefined" ? 1 : options.concurrency;
    var cwd = typeof options.cwd === "undefined" ? process.cwd() : options.cwd;
    var inherit = options.stdout === "inherit" || options.stdio === "inherit";
    var iterator = new Iterator(cwd, {
        filter: function filter(entry) {
            if (entry.stats.isDirectory()) return entry.basename[0] !== "." && entry.basename !== "node_modules";
            if (entry.stats.isFile()) return entry.basename === "package.json";
        },
        depth: depth
    });
    var results = [];
    iterator.forEach(function(entry, callback) {
        if (!entry.stats.isFile()) return callback();
        var spawnOptions = _object_spread_props(_object_spread({}, options), {
            cwd: path.dirname(entry.fullPath)
        });
        if (concurrency > 1 && inherit) {
            spawnOptions.encoding = "utf8";
            if (spawnOptions.stdout === "inherit") spawnOptions.stdout = undefined;
            if (spawnOptions.stdio === "inherit") spawnOptions.stdio = undefined;
        } else {
            !options.header || options.header(entry, command, args);
        }
        var cp = spawn(command, args, spawnOptions);
        crossSpawn.normalize(cp, spawnOptions, function(err, res) {
            results.push({
                path: entry.path,
                error: err,
                result: res
            });
            if (concurrency > 1 && inherit) {
                !options.header || options.header(entry, command, args);
                res ? pipe(res, true) : pipe(err, false);
            }
            callback();
        });
    }, {
        callbacks: true,
        concurrency: concurrency
    }, function iteratorCallback(err) {
        err ? callback(err) : callback(null, results);
    });
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }