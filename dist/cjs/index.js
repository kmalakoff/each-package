"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return eachPackage;
    }
});
require("./polyfills.js");
var _each = /*#__PURE__*/ _interop_require_default(require("./each"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function eachPackage(command, args, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = options || {};
    if (typeof callback === 'function') return (0, _each.default)(command, args, options, callback);
    return new Promise(function(resolve, reject) {
        (0, _each.default)(command, args, options, function eachCallback(err, result) {
            err ? reject(err) : resolve(result);
        });
    });
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }