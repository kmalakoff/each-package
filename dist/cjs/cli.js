#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _exit = /*#__PURE__*/ _interop_require_default(require("exit"));
var _getoptscompat = /*#__PURE__*/ _interop_require_default(require("getopts-compat"));
var _index = /*#__PURE__*/ _interop_require_default(require("./index.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _default = function(argv) {
    var options = (0, _getoptscompat.default)(argv, {
        alias: {
            depth: "d",
            concurrency: "c",
            silent: "s"
        },
        boolean: [
            "silent"
        ],
        default: {
            depth: Infinity,
            concurrency: 1
        },
        stopEarly: true
    });
    var args = options._;
    if (!args.length) {
        console.log("Missing command. Example usage: each-package [command]");
        return (0, _exit.default)(-1);
    }
    if (!options.silent) options.header = function(entry, command, args) {
        console.log("\n----------------------");
        console.log("".concat([
            command
        ].concat(args).join(" "), " (").concat(_path.default.dirname(entry.path), ")"));
        console.log("----------------------");
    };
    options.stdio = "inherit";
    (0, _index.default)(args[0], args.slice(1), options, function(err, results) {
        if (err) {
            console.log(err.message);
            return (0, _exit.default)(err.code || -1);
        }
        var errors = results.filter(function(result) {
            return !!result.error;
        });
        if (!options.silent) {
            console.log("\n======================");
            if (errors.length) {
                console.log("Failed (".concat(errors.length, "). Passed (").concat(results.length - errors.length, ")"));
                for(var index = 0; index < errors.length; index++){
                    var result = errors[index];
                    console.log("".concat(result.path, " Error: ").concat(result.error.message));
                }
            } else console.log("Passed (".concat(results.length, ")"));
            console.log("======================");
        }
        (0, _exit.default)(errors.length ? -1 : 0);
    });
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }