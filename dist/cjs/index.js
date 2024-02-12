"use strict";
require("./polyfills");
var each = require("./each");
module.exports = function eachPackage(command, args, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    options = options || {};
    if (typeof callback === "function") return each(command, args, options, callback);
    return new Promise(function(resolve, reject) {
        each(command, args, options, function eachCallback(err, result) {
            err ? reject(err) : resolve(result);
        });
    });
};

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  for (var key in exports) exports.default[key] = exports[key];
  module.exports = exports.default;
}