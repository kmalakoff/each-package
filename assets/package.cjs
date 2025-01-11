'use strict';

var fs = require('fs');
var require$$0$2 = require('url');
var require$$3 = require('path');
var require$$0$3 = require('module');
var require$$5 = require('os');
var EventEmitter = require('events');
var util = require('util');
var stream = require('stream');

function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator$1(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator$1(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : undefined,
            done: true
        };
    }
}
var readFile = fs.promises.readFile;
var parse = function(buffer) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, beforeParse = _ref.beforeParse, reviver = _ref.reviver;
    // Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
    var data = new TextDecoder().decode(buffer);
    if (typeof beforeParse === 'function') {
        data = beforeParse(data);
    }
    return JSON.parse(data, reviver);
};
function loadJsonFile(filePath, options) {
    return _loadJsonFile.apply(this, arguments);
}
function _loadJsonFile() {
    _loadJsonFile = _async_to_generator$1(function(filePath, options) {
        var buffer;
        return _ts_generator$1(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        readFile(filePath)
                    ];
                case 1:
                    buffer = _state.sent();
                    return [
                        2,
                        parse(buffer, options)
                    ];
            }
        });
    });
    return _loadJsonFile.apply(this, arguments);
}
function loadJsonFileSync(filePath, options) {
    var buffer = fs.readFileSync(filePath);
    return parse(buffer, options);
}

function _instanceof$c(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
    if (typeof f == "function") {
        var a = function a() {
            if (_instanceof$c(this, a)) {
                return Reflect.construct(f, arguments, this.constructor);
            }
            return f.apply(this, arguments);
        };
        a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {
        value: true
    });
    Object.keys(n).forEach(function(k) {
        var d = Object.getOwnPropertyDescriptor(n, k);
        Object.defineProperty(a, k, d.get ? d : {
            enumerable: true,
            get: function get() {
                return n[k];
            }
        });
    });
    return a;
}

var npa$1 = {
    exports: {}
};

/**
 * @module LRUCache
 */ function _array_like_to_array$b(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$6(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes$6(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$b(arr);
}
function _assert_this_initialized$6(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _call_super$6(_this, derived, args) {
    derived = _get_prototype_of$6(derived);
    return _possible_constructor_return$6(_this, _is_native_reflect_construct$7() ? Reflect.construct(derived, args, _get_prototype_of$6(_this).constructor) : derived.apply(_this, args));
}
function _check_private_redeclaration$2(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get$2(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _class_apply_descriptor_set$1(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) {
            throw new TypeError("attempted to read set only private field");
        }
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function _class_call_check$f(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _class_check_private_static_field_descriptor$1(descriptor, action) {
    if (descriptor === undefined) {
        throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
}
function _class_extract_field_descriptor$1(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _class_private_field_get$1(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor$1(receiver, privateMap, "get");
    return _class_apply_descriptor_get$2(receiver, descriptor);
}
function _class_private_field_init$1(obj, privateMap, value) {
    _check_private_redeclaration$2(obj, privateMap);
    privateMap.set(obj, value);
}
function _class_private_field_set$1(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor$1(receiver, privateMap, "set");
    _class_apply_descriptor_set$1(receiver, descriptor, value);
    return value;
}
function _class_private_field_update(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor$1(receiver, privateMap, "update");
    return _class_apply_descriptor_update(receiver, descriptor);
}
function _class_private_method_get$2(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _class_private_method_init$2(obj, privateSet) {
    _check_private_redeclaration$2(obj, privateSet);
    privateSet.add(obj);
}
function _class_static_private_field_spec_get$1(receiver, classConstructor, descriptor) {
    _class_check_private_static_access$1(receiver, classConstructor);
    _class_check_private_static_field_descriptor$1(descriptor, "get");
    return _class_apply_descriptor_get$2(receiver, descriptor);
}
function _class_static_private_field_spec_set(receiver, classConstructor, descriptor, value) {
    _class_check_private_static_access$1(receiver, classConstructor);
    _class_check_private_static_field_descriptor$1(descriptor, "set");
    _class_apply_descriptor_set$1(receiver, descriptor, value);
    return value;
}
function _construct$1(Parent, args, Class) {
    if (_is_native_reflect_construct$7()) {
        _construct$1 = Reflect.construct;
    } else {
        _construct$1 = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of$7(instance, Class.prototype);
            return instance;
        };
    }
    return _construct$1.apply(null, arguments);
}
function _defineProperties$4(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class$4(Constructor, protoProps, staticProps) {
    _defineProperties$4(Constructor.prototype, protoProps);
    return Constructor;
}
function _define_property$2(obj, key, value) {
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
function _get_prototype_of$6(o) {
    _get_prototype_of$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$6(o);
}
function _inherits$6(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of$7(subClass, superClass);
}
function _instanceof$b(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _iterable_to_array$6(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit$6(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$6() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread$6() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$2(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props$1(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _possible_constructor_return$6(self, call) {
    if (call && (_type_of$g(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$6(self);
}
function _set_prototype_of$7(o, p) {
    _set_prototype_of$7 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$7(o, p);
}
function _sliced_to_array$6(arr, i) {
    return _array_with_holes$6(arr) || _iterable_to_array_limit$6(arr, i) || _unsupported_iterable_to_array$b(arr, i) || _non_iterable_rest$6();
}
function _to_consumable_array$6(arr) {
    return _array_without_holes$6(arr) || _iterable_to_array$6(arr) || _unsupported_iterable_to_array$b(arr) || _non_iterable_spread$6();
}
function _type_of$g(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$b(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$b(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$b(o, minLen);
}
function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrap_native_super = function wrapNativeSuper(Class) {
        if (Class === null || !_is_native_function(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct$1(Class, arguments, _get_prototype_of$6(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _set_prototype_of$7(Wrapper, Class);
    };
    return _wrap_native_super(Class);
}
function _class_check_private_static_access$1(receiver, classConstructor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
}
function _is_native_reflect_construct$7() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$7 = function() {
        return !!result;
    })();
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v1) {
            return step([
                n,
                v1
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : undefined,
            done: true
        };
    }
}
var perf = (typeof performance === "undefined" ? "undefined" : _type_of$g(performance)) === 'object' && performance && typeof performance.now === 'function' ? performance : Date;
var warned = new Set();
/* c8 ignore start */ var PROCESS = (typeof process === "undefined" ? "undefined" : _type_of$g(process)) === 'object' && !!process ? process : {};
/* c8 ignore start */ var emitWarning = function(msg, type, code, fn) {
    typeof PROCESS.emitWarning === 'function' ? PROCESS.emitWarning(msg, type, code, fn) : console.error("[".concat(code, "] ").concat(type, ": ").concat(msg));
};
var AC = globalThis.AbortController;
var AS = globalThis.AbortSignal;
/* c8 ignore start */ if (typeof AC === 'undefined') {
    var _PROCESS_env;
    //@ts-ignore
    AS = /*#__PURE__*/ function() {
        function AbortSignal() {
            _class_call_check$f(this, AbortSignal);
            this._onabort = [];
            this.aborted = false;
        }
        var _proto = AbortSignal.prototype;
        _proto.addEventListener = function addEventListener(_, fn) {
            this._onabort.push(fn);
        };
        return AbortSignal;
    }();
    //@ts-ignore
    AC = /*#__PURE__*/ function() {
        function AbortController() {
            _class_call_check$f(this, AbortController);
            this.signal = new AS();
            warnACPolyfill();
        }
        var _proto = AbortController.prototype;
        _proto.abort = function abort(reason) {
            var _this_signal_onabort, _this_signal;
            if (this.signal.aborted) return;
            //@ts-ignore
            this.signal.reason = reason;
            //@ts-ignore
            this.signal.aborted = true;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                //@ts-ignore
                for(var _iterator = this.signal._onabort[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var fn = _step.value;
                    fn(reason);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            (_this_signal_onabort = (_this_signal = this.signal).onabort) === null || _this_signal_onabort === undefined ? undefined : _this_signal_onabort.call(_this_signal, reason);
        };
        return AbortController;
    }();
    var printACPolyfillWarning = ((_PROCESS_env = PROCESS.env) === null || _PROCESS_env === undefined ? undefined : _PROCESS_env.LRU_CACHE_IGNORE_AC_WARNING) !== '1';
    var warnACPolyfill = function() {
        if (!printACPolyfillWarning) return;
        printACPolyfillWarning = false;
        emitWarning('AbortController is not defined. If using lru-cache in ' + 'node 14, load an AbortController polyfill from the ' + '`node-abort-controller` package. A minimal polyfill is ' + 'provided for use by LRUCache.fetch(), but it should not be ' + 'relied upon in other contexts (eg, passing it to other APIs that ' + 'use AbortController/AbortSignal might have undesirable effects). ' + 'You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.', 'NO_ABORT_CONTROLLER', 'ENOTSUP', warnACPolyfill);
    };
}
/* c8 ignore stop */ var shouldWarn = function(code) {
    return !warned.has(code);
};
var isPosInt = function(n) {
    return n && n === Math.floor(n) && n > 0 && isFinite(n);
};
/* c8 ignore start */ // This is a little bit ridiculous, tbh.
// The maximum array length is 2^32-1 or thereabouts on most JS impls.
// And well before that point, you're caching the entire world, I mean,
// that's ~32GB of just integers for the next/prev links, plus whatever
// else to hold that many keys and values.  Just filling the memory with
// zeroes at init time is brutal when you get that big.
// But why not be complete?
// Maybe in the future, these limits will have expanded.
var getUintArray = function(max) {
    return !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
};
/* c8 ignore stop */ var ZeroArray = /*#__PURE__*/ function(Array1) {
    _inherits$6(ZeroArray, Array1);
    function ZeroArray(size) {
        _class_call_check$f(this, ZeroArray);
        var _this;
        _this = _call_super$6(this, ZeroArray, [
            size
        ]);
        _this.fill(0);
        return _this;
    }
    return ZeroArray;
}(_wrap_native_super(Array));
var Stack = /*#__PURE__*/ function() {
    function Stack(max, HeapCls) {
        _class_call_check$f(this, Stack);
        /* c8 ignore start */ if (!_class_static_private_field_spec_get$1(Stack, Stack, _constructing)) {
            throw new TypeError('instantiate Stack using Stack.create(n)');
        }
        /* c8 ignore stop */ this.heap = new HeapCls(max);
        this.length = 0;
    }
    var _proto = Stack.prototype;
    _proto.push = function push(n) {
        this.heap[this.length++] = n;
    };
    _proto.pop = function pop() {
        return this.heap[--this.length];
    };
    Stack.create = function create(max) {
        var HeapCls = getUintArray(max);
        if (!HeapCls) return [];
        _class_static_private_field_spec_set(Stack, Stack, _constructing, true);
        var s = new Stack(max, HeapCls);
        _class_static_private_field_spec_set(Stack, Stack, _constructing, false);
        return s;
    };
    return Stack;
}();
// private constructor
var _constructing = {
    writable: true,
    value: false
};
var prop;
var // options that cannot be changed without disaster
_max = /*#__PURE__*/ new WeakMap(), _maxSize = /*#__PURE__*/ new WeakMap(), _dispose = /*#__PURE__*/ new WeakMap(), _disposeAfter = /*#__PURE__*/ new WeakMap(), _fetchMethod = /*#__PURE__*/ new WeakMap(), _memoMethod = /*#__PURE__*/ new WeakMap(), // computed properties
_size = /*#__PURE__*/ new WeakMap(), _calculatedSize = /*#__PURE__*/ new WeakMap(), _keyMap = /*#__PURE__*/ new WeakMap(), _keyList = /*#__PURE__*/ new WeakMap(), _valList = /*#__PURE__*/ new WeakMap(), _next = /*#__PURE__*/ new WeakMap(), _prev = /*#__PURE__*/ new WeakMap(), _head = /*#__PURE__*/ new WeakMap(), _tail = /*#__PURE__*/ new WeakMap(), _free = /*#__PURE__*/ new WeakMap(), _disposed = /*#__PURE__*/ new WeakMap(), _sizes = /*#__PURE__*/ new WeakMap(), _starts = /*#__PURE__*/ new WeakMap(), _ttls = /*#__PURE__*/ new WeakMap(), _hasDispose = /*#__PURE__*/ new WeakMap(), _hasFetchMethod = /*#__PURE__*/ new WeakMap(), _hasDisposeAfter = /*#__PURE__*/ new WeakMap(), _initializeTTLTracking = /*#__PURE__*/ new WeakSet(), // conditionally set private methods related to TTL
_updateItemAge = /*#__PURE__*/ new WeakMap(), _statusTTL = /*#__PURE__*/ new WeakMap(), _setItemTTL = /*#__PURE__*/ new WeakMap(), /* c8 ignore stop */ _isStale = /*#__PURE__*/ new WeakMap(), _initializeSizeTracking = /*#__PURE__*/ new WeakSet(), _removeItemSize = /*#__PURE__*/ new WeakMap(), _addItemSize = /*#__PURE__*/ new WeakMap(), _requireSize = /*#__PURE__*/ new WeakMap(), _indexes = /*#__PURE__*/ new WeakSet(), _rindexes = /*#__PURE__*/ new WeakSet(), _isValidIndex = /*#__PURE__*/ new WeakSet(), _evict = /*#__PURE__*/ new WeakSet(), _backgroundFetch = /*#__PURE__*/ new WeakSet(), _isBackgroundFetch = /*#__PURE__*/ new WeakSet(), _connect = /*#__PURE__*/ new WeakSet(), _moveToTail = /*#__PURE__*/ new WeakSet(), _delete = /*#__PURE__*/ new WeakSet(), _clear = /*#__PURE__*/ new WeakSet();
var _Symbol_iterator = Symbol.iterator;
/**
 * Default export, the thing you're using this module to get.
 *
 * The `K` and `V` types define the key and value types, respectively. The
 * optional `FC` type defines the type of the `context` object passed to
 * `cache.fetch()` and `cache.memo()`.
 *
 * Keys and values **must not** be `null` or `undefined`.
 *
 * All properties from the options object (with the exception of `max`,
 * `maxSize`, `fetchMethod`, `memoMethod`, `dispose` and `disposeAfter`) are
 * added as normal public members. (The listed options are read-only getters.)
 *
 * Changing any of these will alter the defaults for subsequent method calls.
 */ var LRUCache = /*#__PURE__*/ function() {
    function LRUCache(options) {
        _class_call_check$f(this, LRUCache);
        _class_private_method_init$2(this, _initializeTTLTracking);
        _class_private_method_init$2(this, _initializeSizeTracking);
        _class_private_method_init$2(this, _indexes);
        _class_private_method_init$2(this, _rindexes);
        _class_private_method_init$2(this, _isValidIndex);
        _class_private_method_init$2(this, _evict);
        _class_private_method_init$2(this, _backgroundFetch);
        _class_private_method_init$2(this, _isBackgroundFetch);
        _class_private_method_init$2(this, _connect);
        _class_private_method_init$2(this, _moveToTail);
        _class_private_method_init$2(this, _delete);
        _class_private_method_init$2(this, _clear);
        _class_private_field_init$1(this, _max, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _maxSize, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _dispose, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _disposeAfter, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _fetchMethod, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _memoMethod, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _size, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _calculatedSize, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _keyMap, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _keyList, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _valList, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _next, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _prev, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _head, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _tail, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _free, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _disposed, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _sizes, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _starts, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _ttls, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _hasDispose, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _hasFetchMethod, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _hasDisposeAfter, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _updateItemAge, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _statusTTL, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _setItemTTL, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _isStale, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _removeItemSize, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _addItemSize, {
            writable: true,
            value: undefined
        });
        _class_private_field_init$1(this, _requireSize, {
            writable: true,
            value: undefined
        });
        _class_private_field_set$1(this, _updateItemAge, function() {});
        _class_private_field_set$1(this, _statusTTL, function() {});
        _class_private_field_set$1(this, _setItemTTL, function() {});
        _class_private_field_set$1(this, _isStale, function() {
            return false;
        });
        _class_private_field_set$1(this, _removeItemSize, function(_i) {});
        _class_private_field_set$1(this, _addItemSize, function(_i, _s, _st) {});
        _class_private_field_set$1(this, _requireSize, function(_k, _v, size, sizeCalculation) {
            if (size || sizeCalculation) {
                throw new TypeError('cannot set size without setting maxSize or maxEntrySize on cache');
            }
            return 0;
        });
        /**
     * A String value that is used in the creation of the default string
     * description of an object. Called by the built-in method
     * `Object.prototype.toString`.
     */ this[prop] = 'LRUCache';
        var _options_max = options.max, max = _options_max === undefined ? 0 : _options_max, ttl = options.ttl, _options_ttlResolution = options.ttlResolution, ttlResolution = _options_ttlResolution === undefined ? 1 : _options_ttlResolution, ttlAutopurge = options.ttlAutopurge, updateAgeOnGet = options.updateAgeOnGet, updateAgeOnHas = options.updateAgeOnHas, allowStale = options.allowStale, dispose = options.dispose, disposeAfter = options.disposeAfter, noDisposeOnSet = options.noDisposeOnSet, noUpdateTTL = options.noUpdateTTL, _options_maxSize = options.maxSize, maxSize = _options_maxSize === undefined ? 0 : _options_maxSize, _options_maxEntrySize = options.maxEntrySize, maxEntrySize = _options_maxEntrySize === undefined ? 0 : _options_maxEntrySize, sizeCalculation = options.sizeCalculation, fetchMethod = options.fetchMethod, memoMethod = options.memoMethod, noDeleteOnFetchRejection = options.noDeleteOnFetchRejection, noDeleteOnStaleGet = options.noDeleteOnStaleGet, allowStaleOnFetchRejection = options.allowStaleOnFetchRejection, allowStaleOnFetchAbort = options.allowStaleOnFetchAbort, ignoreFetchAbort = options.ignoreFetchAbort;
        if (max !== 0 && !isPosInt(max)) {
            throw new TypeError('max option must be a nonnegative integer');
        }
        var UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
            throw new Error('invalid max value: ' + max);
        }
        _class_private_field_set$1(this, _max, max);
        _class_private_field_set$1(this, _maxSize, maxSize);
        this.maxEntrySize = maxEntrySize || _class_private_field_get$1(this, _maxSize);
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
            if (!_class_private_field_get$1(this, _maxSize) && !this.maxEntrySize) {
                throw new TypeError('cannot set sizeCalculation without setting maxSize or maxEntrySize');
            }
            if (typeof this.sizeCalculation !== 'function') {
                throw new TypeError('sizeCalculation set to non-function');
            }
        }
        if (memoMethod !== undefined && typeof memoMethod !== 'function') {
            throw new TypeError('memoMethod must be a function if defined');
        }
        _class_private_field_set$1(this, _memoMethod, memoMethod);
        if (fetchMethod !== undefined && typeof fetchMethod !== 'function') {
            throw new TypeError('fetchMethod must be a function if specified');
        }
        _class_private_field_set$1(this, _fetchMethod, fetchMethod);
        _class_private_field_set$1(this, _hasFetchMethod, !!fetchMethod);
        _class_private_field_set$1(this, _keyMap, new Map());
        _class_private_field_set$1(this, _keyList, new Array(max).fill(undefined));
        _class_private_field_set$1(this, _valList, new Array(max).fill(undefined));
        _class_private_field_set$1(this, _next, new UintArray(max));
        _class_private_field_set$1(this, _prev, new UintArray(max));
        _class_private_field_set$1(this, _head, 0);
        _class_private_field_set$1(this, _tail, 0);
        _class_private_field_set$1(this, _free, Stack.create(max));
        _class_private_field_set$1(this, _size, 0);
        _class_private_field_set$1(this, _calculatedSize, 0);
        if (typeof dispose === 'function') {
            _class_private_field_set$1(this, _dispose, dispose);
        }
        if (typeof disposeAfter === 'function') {
            _class_private_field_set$1(this, _disposeAfter, disposeAfter);
            _class_private_field_set$1(this, _disposed, []);
        } else {
            _class_private_field_set$1(this, _disposeAfter, undefined);
            _class_private_field_set$1(this, _disposed, undefined);
        }
        _class_private_field_set$1(this, _hasDispose, !!_class_private_field_get$1(this, _dispose));
        _class_private_field_set$1(this, _hasDisposeAfter, !!_class_private_field_get$1(this, _disposeAfter));
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        // NB: maxEntrySize is set to maxSize if it's set
        if (this.maxEntrySize !== 0) {
            if (_class_private_field_get$1(this, _maxSize) !== 0) {
                if (!isPosInt(_class_private_field_get$1(this, _maxSize))) {
                    throw new TypeError('maxSize must be a positive integer if specified');
                }
            }
            if (!isPosInt(this.maxEntrySize)) {
                throw new TypeError('maxEntrySize must be a positive integer if specified');
            }
            _class_private_method_get$2(this, _initializeSizeTracking, initializeSizeTracking).call(this);
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
            if (!isPosInt(this.ttl)) {
                throw new TypeError('ttl must be a positive integer if specified');
            }
            _class_private_method_get$2(this, _initializeTTLTracking, initializeTTLTracking).call(this);
        }
        // do not allow completely unbounded caches
        if (_class_private_field_get$1(this, _max) === 0 && this.ttl === 0 && _class_private_field_get$1(this, _maxSize) === 0) {
            throw new TypeError('At least one of max, maxSize, or ttl is required');
        }
        if (!this.ttlAutopurge && !_class_private_field_get$1(this, _max) && !_class_private_field_get$1(this, _maxSize)) {
            var code = 'LRU_CACHE_UNBOUNDED';
            if (shouldWarn(code)) {
                warned.add(code);
                var msg = 'TTL caching without ttlAutopurge, max, or maxSize can ' + 'result in unbounded memory consumption.';
                emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
            }
        }
    }
    var _proto = LRUCache.prototype;
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */ _proto.getRemainingTTL = function getRemainingTTL(key) {
        return _class_private_field_get$1(this, _keyMap).has(key) ? Infinity : 0;
    };
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */ _proto.entries = function entries() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    if (!(_class_private_field_get$1(this, _valList)[i] !== undefined && _class_private_field_get$1(this, _keyList)[i] !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        [
                            _class_private_field_get$1(this, _keyList)[i],
                            _class_private_field_get$1(this, _valList)[i]
                        ]
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */ _proto.rentries = function rentries() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    if (!(_class_private_field_get$1(this, _valList)[i] !== undefined && _class_private_field_get$1(this, _keyList)[i] !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        [
                            _class_private_field_get$1(this, _keyList)[i],
                            _class_private_field_get$1(this, _valList)[i]
                        ]
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */ _proto.keys = function keys() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, k, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    k = _class_private_field_get$1(this, _keyList)[i];
                    if (!(k !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        k
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */ _proto.rkeys = function rkeys() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, k, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    k = _class_private_field_get$1(this, _keyList)[i];
                    if (!(k !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        k
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */ _proto.values = function values() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, v1, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    v1 = _class_private_field_get$1(this, _valList)[i];
                    if (!(v1 !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        _class_private_field_get$1(this, _valList)[i]
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */ _proto.rvalues = function rvalues() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, v1, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this)[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        5
                    ];
                    i = _step.value;
                    v1 = _class_private_field_get$1(this, _valList)[i];
                    if (!(v1 !== undefined && !_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, _class_private_field_get$1(this, _valList)[i]))) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        _class_private_field_get$1(this, _valList)[i]
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        8
                    ];
                case 7:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    };
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */ _proto[_Symbol_iterator] = function() {
        return this.entries();
    };
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */ _proto.find = function find(fn) {
        var getOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                var v1 = _class_private_field_get$1(this, _valList)[i];
                var value = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
                if (value === undefined) continue;
                if (fn(value, _class_private_field_get$1(this, _keyList)[i], this)) {
                    return this.get(_class_private_field_get$1(this, _keyList)[i], getOptions);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */ _proto.forEach = function forEach(fn) {
        var thisp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                var v1 = _class_private_field_get$1(this, _valList)[i];
                var value = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
                if (value === undefined) continue;
                fn.call(thisp, value, _class_private_field_get$1(this, _keyList)[i], this);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */ _proto.rforEach = function rforEach(fn) {
        var thisp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                var v1 = _class_private_field_get$1(this, _valList)[i];
                var value = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
                if (value === undefined) continue;
                fn.call(thisp, value, _class_private_field_get$1(this, _keyList)[i], this);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */ _proto.purgeStale = function purgeStale() {
        var deleted = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this, {
                allowStale: true
            })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                if (_class_private_field_get$1(this, _isStale).call(this, i)) {
                    _class_private_method_get$2(this, _delete, __delete).call(this, _class_private_field_get$1(this, _keyList)[i], 'expire');
                    deleted = true;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return deleted;
    };
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */ _proto.info = function info(key) {
        var i = _class_private_field_get$1(this, _keyMap).get(key);
        if (i === undefined) return undefined;
        var v1 = _class_private_field_get$1(this, _valList)[i];
        var value = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
        if (value === undefined) return undefined;
        var entry = {
            value: value
        };
        if (_class_private_field_get$1(this, _ttls) && _class_private_field_get$1(this, _starts)) {
            var ttl = _class_private_field_get$1(this, _ttls)[i];
            var start = _class_private_field_get$1(this, _starts)[i];
            if (ttl && start) {
                var remain = ttl - (perf.now() - start);
                entry.ttl = remain;
                entry.start = Date.now();
            }
        }
        if (_class_private_field_get$1(this, _sizes)) {
            entry.size = _class_private_field_get$1(this, _sizes)[i];
        }
        return entry;
    };
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRLUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */ _proto.dump = function dump() {
        var arr = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = _class_private_method_get$2(this, _indexes, indexes).call(this, {
                allowStale: true
            })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                var key = _class_private_field_get$1(this, _keyList)[i];
                var v1 = _class_private_field_get$1(this, _valList)[i];
                var value = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
                if (value === undefined || key === undefined) continue;
                var entry = {
                    value: value
                };
                if (_class_private_field_get$1(this, _ttls) && _class_private_field_get$1(this, _starts)) {
                    entry.ttl = _class_private_field_get$1(this, _ttls)[i];
                    // always dump the start relative to a portable timestamp
                    // it's ok for this to be a bit slow, it's a rare operation.
                    var age = perf.now() - _class_private_field_get$1(this, _starts)[i];
                    entry.start = Math.floor(Date.now() - age);
                }
                if (_class_private_field_get$1(this, _sizes)) {
                    entry.size = _class_private_field_get$1(this, _sizes)[i];
                }
                arr.unshift([
                    key,
                    entry
                ]);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return arr;
    };
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */ _proto.load = function load(arr) {
        this.clear();
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = _sliced_to_array$6(_step.value, 2), key = _step_value[0], entry = _step_value[1];
                if (entry.start) {
                    // entry.start is a portable timestamp, but we may be using
                    // node's performance.now(), so calculate the offset, so that
                    // we get the intended remaining TTL, no matter how long it's
                    // been on ice.
                    //
                    // it's ok for this to be a bit slow, it's a rare operation.
                    var age = Date.now() - entry.start;
                    entry.start = perf.now() - age;
                }
                this.set(key, entry.value, entry);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */ _proto.set = function set(k, v1) {
        var setOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var _this, _this1, _this2, _this3, _this4, _this5;
        if (v1 === undefined) {
            this.delete(k);
            return this;
        }
        var _setOptions_ttl = setOptions.ttl, ttl = _setOptions_ttl === undefined ? this.ttl : _setOptions_ttl, start = setOptions.start, _setOptions_noDisposeOnSet = setOptions.noDisposeOnSet, noDisposeOnSet = _setOptions_noDisposeOnSet === undefined ? this.noDisposeOnSet : _setOptions_noDisposeOnSet, _setOptions_sizeCalculation = setOptions.sizeCalculation, sizeCalculation = _setOptions_sizeCalculation === undefined ? this.sizeCalculation : _setOptions_sizeCalculation, status = setOptions.status;
        var _setOptions_noUpdateTTL = setOptions.noUpdateTTL, noUpdateTTL = _setOptions_noUpdateTTL === undefined ? this.noUpdateTTL : _setOptions_noUpdateTTL;
        var size = _class_private_field_get$1(this, _requireSize).call(this, k, v1, setOptions.size || 0, sizeCalculation);
        // if the item doesn't fit, don't do anything
        // NB: maxEntrySize set to maxSize by default
        if (this.maxEntrySize && size > this.maxEntrySize) {
            if (status) {
                status.set = 'miss';
                status.maxEntrySizeExceeded = true;
            }
            // have to delete, in case something is there already.
            _class_private_method_get$2(this, _delete, __delete).call(this, k, 'set');
            return this;
        }
        var index = _class_private_field_get$1(this, _size) === 0 ? undefined : _class_private_field_get$1(this, _keyMap).get(k);
        if (index === undefined) {
            // addition
            index = _class_private_field_get$1(this, _size) === 0 ? _class_private_field_get$1(this, _tail) : _class_private_field_get$1(this, _free).length !== 0 ? _class_private_field_get$1(this, _free).pop() : _class_private_field_get$1(this, _size) === _class_private_field_get$1(this, _max) ? _class_private_method_get$2(this, _evict, evict).call(this, false) : _class_private_field_get$1(this, _size);
            _class_private_field_get$1(this, _keyList)[index] = k;
            _class_private_field_get$1(this, _valList)[index] = v1;
            _class_private_field_get$1(this, _keyMap).set(k, index);
            _class_private_field_get$1(this, _next)[_class_private_field_get$1(this, _tail)] = index;
            _class_private_field_get$1(this, _prev)[index] = _class_private_field_get$1(this, _tail);
            _class_private_field_set$1(this, _tail, index);
            _class_private_field_update(this, _size).value++;
            _class_private_field_get$1(this, _addItemSize).call(this, index, size, status);
            if (status) status.set = 'add';
            noUpdateTTL = false;
        } else {
            // update
            _class_private_method_get$2(this, _moveToTail, moveToTail).call(this, index);
            var oldVal = _class_private_field_get$1(this, _valList)[index];
            if (v1 !== oldVal) {
                if (_class_private_field_get$1(this, _hasFetchMethod) && _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, oldVal)) {
                    oldVal.__abortController.abort(new Error('replaced'));
                    var s = oldVal.__staleWhileFetching;
                    if (s !== undefined && !noDisposeOnSet) {
                        if (_class_private_field_get$1(this, _hasDispose)) {
                            (_this = _class_private_field_get$1(_this1 = this, _dispose)) === null || _this === undefined ? undefined : _this.call(_this1, s, k, 'set');
                        }
                        if (_class_private_field_get$1(this, _hasDisposeAfter)) {
                            var _$_class_private_field_get;
                            (_$_class_private_field_get = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get === undefined ? undefined : _$_class_private_field_get.push([
                                s,
                                k,
                                'set'
                            ]);
                        }
                    }
                } else if (!noDisposeOnSet) {
                    if (_class_private_field_get$1(this, _hasDispose)) {
                        (_this2 = _class_private_field_get$1(_this3 = this, _dispose)) === null || _this2 === undefined ? undefined : _this2.call(_this3, oldVal, k, 'set');
                    }
                    if (_class_private_field_get$1(this, _hasDisposeAfter)) {
                        var _$_class_private_field_get1;
                        (_$_class_private_field_get1 = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get1 === undefined ? undefined : _$_class_private_field_get1.push([
                            oldVal,
                            k,
                            'set'
                        ]);
                    }
                }
                _class_private_field_get$1(this, _removeItemSize).call(this, index);
                _class_private_field_get$1(this, _addItemSize).call(this, index, size, status);
                _class_private_field_get$1(this, _valList)[index] = v1;
                if (status) {
                    status.set = 'replace';
                    var oldValue = oldVal && _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
                    if (oldValue !== undefined) status.oldValue = oldValue;
                }
            } else if (status) {
                status.set = 'update';
            }
        }
        if (ttl !== 0 && !_class_private_field_get$1(this, _ttls)) {
            _class_private_method_get$2(this, _initializeTTLTracking, initializeTTLTracking).call(this);
        }
        if (_class_private_field_get$1(this, _ttls)) {
            if (!noUpdateTTL) {
                _class_private_field_get$1(this, _setItemTTL).call(this, index, ttl, start);
            }
            if (status) _class_private_field_get$1(this, _statusTTL).call(this, status, index);
        }
        if (!noDisposeOnSet && _class_private_field_get$1(this, _hasDisposeAfter) && _class_private_field_get$1(this, _disposed)) {
            var dt = _class_private_field_get$1(this, _disposed);
            var task;
            while(task = dt === null || dt === undefined ? undefined : dt.shift()){
                var _this6;
                (_this4 = _class_private_field_get$1(_this5 = this, _disposeAfter)) === null || _this4 === undefined ? undefined : (_this6 = _this4).call.apply(_this6, [
                    _this5
                ].concat(_to_consumable_array$6(task)));
            }
        }
        return this;
    };
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */ _proto.pop = function pop() {
        var _this, _this1;
        try {
            while(_class_private_field_get$1(this, _size)){
                var val = _class_private_field_get$1(this, _valList)[_class_private_field_get$1(this, _head)];
                _class_private_method_get$2(this, _evict, evict).call(this, true);
                if (_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, val)) {
                    if (val.__staleWhileFetching) {
                        return val.__staleWhileFetching;
                    }
                } else if (val !== undefined) {
                    return val;
                }
            }
        } finally{
            if (_class_private_field_get$1(this, _hasDisposeAfter) && _class_private_field_get$1(this, _disposed)) {
                var dt = _class_private_field_get$1(this, _disposed);
                var task;
                while(task = dt === null || dt === undefined ? undefined : dt.shift()){
                    var _this2;
                    (_this = _class_private_field_get$1(_this1 = this, _disposeAfter)) === null || _this === undefined ? undefined : (_this2 = _this).call.apply(_this2, [
                        _this1
                    ].concat(_to_consumable_array$6(task)));
                }
            }
        }
    };
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */ _proto.has = function has(k) {
        var hasOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _hasOptions_updateAgeOnHas = hasOptions.updateAgeOnHas, updateAgeOnHas = _hasOptions_updateAgeOnHas === undefined ? this.updateAgeOnHas : _hasOptions_updateAgeOnHas, status = hasOptions.status;
        var index = _class_private_field_get$1(this, _keyMap).get(k);
        if (index !== undefined) {
            var v1 = _class_private_field_get$1(this, _valList)[index];
            if (_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) && v1.__staleWhileFetching === undefined) {
                return false;
            }
            if (!_class_private_field_get$1(this, _isStale).call(this, index)) {
                if (updateAgeOnHas) {
                    _class_private_field_get$1(this, _updateItemAge).call(this, index);
                }
                if (status) {
                    status.has = 'hit';
                    _class_private_field_get$1(this, _statusTTL).call(this, status, index);
                }
                return true;
            } else if (status) {
                status.has = 'stale';
                _class_private_field_get$1(this, _statusTTL).call(this, status, index);
            }
        } else if (status) {
            status.has = 'miss';
        }
        return false;
    };
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */ _proto.peek = function peek(k) {
        var peekOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _peekOptions_allowStale = peekOptions.allowStale, allowStale = _peekOptions_allowStale === undefined ? this.allowStale : _peekOptions_allowStale;
        var index = _class_private_field_get$1(this, _keyMap).get(k);
        if (index === undefined || !allowStale && _class_private_field_get$1(this, _isStale).call(this, index)) {
            return;
        }
        var v1 = _class_private_field_get$1(this, _valList)[index];
        // either stale and allowed, or forcing a refresh of non-stale value
        return _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1) ? v1.__staleWhileFetching : v1;
    };
    _proto.fetch = function fetch(k) {
        var fetchOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _this = this;
        return _async_to_generator(function() {
            var _fetchOptions_allowStale, // get options
            allowStale, _fetchOptions_updateAgeOnGet, updateAgeOnGet, _fetchOptions_noDeleteOnStaleGet, noDeleteOnStaleGet, _fetchOptions_ttl, // set options
            ttl, _fetchOptions_noDisposeOnSet, noDisposeOnSet, _fetchOptions_size, size, _fetchOptions_sizeCalculation, sizeCalculation, _fetchOptions_noUpdateTTL, noUpdateTTL, _fetchOptions_noDeleteOnFetchRejection, // fetch exclusive options
            noDeleteOnFetchRejection, _fetchOptions_allowStaleOnFetchRejection, allowStaleOnFetchRejection, _fetchOptions_ignoreFetchAbort, ignoreFetchAbort, _fetchOptions_allowStaleOnFetchAbort, allowStaleOnFetchAbort, context, _fetchOptions_forceRefresh, forceRefresh, status, signal, options, index, p, v1, stale, isStale, p1, hasStale, staleVal;
            return _ts_generator(this, function(_state) {
                _fetchOptions_allowStale = fetchOptions.allowStale, allowStale = _fetchOptions_allowStale === undefined ? _this.allowStale : _fetchOptions_allowStale, _fetchOptions_updateAgeOnGet = fetchOptions.updateAgeOnGet, updateAgeOnGet = _fetchOptions_updateAgeOnGet === undefined ? _this.updateAgeOnGet : _fetchOptions_updateAgeOnGet, _fetchOptions_noDeleteOnStaleGet = fetchOptions.noDeleteOnStaleGet, noDeleteOnStaleGet = _fetchOptions_noDeleteOnStaleGet === undefined ? _this.noDeleteOnStaleGet : _fetchOptions_noDeleteOnStaleGet, _fetchOptions_ttl = fetchOptions.ttl, ttl = _fetchOptions_ttl === undefined ? _this.ttl : _fetchOptions_ttl, _fetchOptions_noDisposeOnSet = fetchOptions.noDisposeOnSet, noDisposeOnSet = _fetchOptions_noDisposeOnSet === undefined ? _this.noDisposeOnSet : _fetchOptions_noDisposeOnSet, _fetchOptions_size = fetchOptions.size, size = _fetchOptions_size === undefined ? 0 : _fetchOptions_size, _fetchOptions_sizeCalculation = fetchOptions.sizeCalculation, sizeCalculation = _fetchOptions_sizeCalculation === undefined ? _this.sizeCalculation : _fetchOptions_sizeCalculation, _fetchOptions_noUpdateTTL = fetchOptions.noUpdateTTL, noUpdateTTL = _fetchOptions_noUpdateTTL === undefined ? _this.noUpdateTTL : _fetchOptions_noUpdateTTL, _fetchOptions_noDeleteOnFetchRejection = fetchOptions.noDeleteOnFetchRejection, noDeleteOnFetchRejection = _fetchOptions_noDeleteOnFetchRejection === undefined ? _this.noDeleteOnFetchRejection : _fetchOptions_noDeleteOnFetchRejection, _fetchOptions_allowStaleOnFetchRejection = fetchOptions.allowStaleOnFetchRejection, allowStaleOnFetchRejection = _fetchOptions_allowStaleOnFetchRejection === undefined ? _this.allowStaleOnFetchRejection : _fetchOptions_allowStaleOnFetchRejection, _fetchOptions_ignoreFetchAbort = fetchOptions.ignoreFetchAbort, ignoreFetchAbort = _fetchOptions_ignoreFetchAbort === undefined ? _this.ignoreFetchAbort : _fetchOptions_ignoreFetchAbort, _fetchOptions_allowStaleOnFetchAbort = fetchOptions.allowStaleOnFetchAbort, allowStaleOnFetchAbort = _fetchOptions_allowStaleOnFetchAbort === undefined ? _this.allowStaleOnFetchAbort : _fetchOptions_allowStaleOnFetchAbort, context = fetchOptions.context, _fetchOptions_forceRefresh = fetchOptions.forceRefresh, forceRefresh = _fetchOptions_forceRefresh === undefined ? false : _fetchOptions_forceRefresh, status = fetchOptions.status, signal = fetchOptions.signal;
                if (!_class_private_field_get$1(_this, _hasFetchMethod)) {
                    if (status) status.fetch = 'get';
                    return [
                        2,
                        _this.get(k, {
                            allowStale: allowStale,
                            updateAgeOnGet: updateAgeOnGet,
                            noDeleteOnStaleGet: noDeleteOnStaleGet,
                            status: status
                        })
                    ];
                }
                options = {
                    allowStale: allowStale,
                    updateAgeOnGet: updateAgeOnGet,
                    noDeleteOnStaleGet: noDeleteOnStaleGet,
                    ttl: ttl,
                    noDisposeOnSet: noDisposeOnSet,
                    size: size,
                    sizeCalculation: sizeCalculation,
                    noUpdateTTL: noUpdateTTL,
                    noDeleteOnFetchRejection: noDeleteOnFetchRejection,
                    allowStaleOnFetchRejection: allowStaleOnFetchRejection,
                    allowStaleOnFetchAbort: allowStaleOnFetchAbort,
                    ignoreFetchAbort: ignoreFetchAbort,
                    status: status,
                    signal: signal
                };
                index = _class_private_field_get$1(_this, _keyMap).get(k);
                if (index === undefined) {
                    if (status) status.fetch = 'miss';
                    p = _class_private_method_get$2(_this, _backgroundFetch, backgroundFetch).call(_this, k, index, options, context);
                    return [
                        2,
                        p.__returned = p
                    ];
                } else {
                    // in cache, maybe already fetching
                    v1 = _class_private_field_get$1(_this, _valList)[index];
                    if (_class_private_method_get$2(_this, _isBackgroundFetch, isBackgroundFetch).call(_this, v1)) {
                        stale = allowStale && v1.__staleWhileFetching !== undefined;
                        if (status) {
                            status.fetch = 'inflight';
                            if (stale) status.returnedStale = true;
                        }
                        return [
                            2,
                            stale ? v1.__staleWhileFetching : v1.__returned = v1
                        ];
                    }
                    // if we force a refresh, that means do NOT serve the cached value,
                    // unless we are already in the process of refreshing the cache.
                    isStale = _class_private_field_get$1(_this, _isStale).call(_this, index);
                    if (!forceRefresh && !isStale) {
                        if (status) status.fetch = 'hit';
                        _class_private_method_get$2(_this, _moveToTail, moveToTail).call(_this, index);
                        if (updateAgeOnGet) {
                            _class_private_field_get$1(_this, _updateItemAge).call(_this, index);
                        }
                        if (status) _class_private_field_get$1(_this, _statusTTL).call(_this, status, index);
                        return [
                            2,
                            v1
                        ];
                    }
                    // ok, it is stale or a forced refresh, and not already fetching.
                    // refresh the cache.
                    p1 = _class_private_method_get$2(_this, _backgroundFetch, backgroundFetch).call(_this, k, index, options, context);
                    hasStale = p1.__staleWhileFetching !== undefined;
                    staleVal = hasStale && allowStale;
                    if (status) {
                        status.fetch = isStale ? 'stale' : 'refresh';
                        if (staleVal && isStale) status.returnedStale = true;
                    }
                    return [
                        2,
                        staleVal ? p1.__staleWhileFetching : p1.__returned = p1
                    ];
                }
            });
        })();
    };
    _proto.forceFetch = function forceFetch(k) {
        var fetchOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _this = this;
        return _async_to_generator(function() {
            var v1;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.fetch(k, fetchOptions)
                        ];
                    case 1:
                        v1 = _state.sent();
                        if (v1 === undefined) throw new Error('fetch() returned undefined');
                        return [
                            2,
                            v1
                        ];
                }
            });
        })();
    };
    _proto.memo = function memo(k) {
        var memoOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var memoMethod = _class_private_field_get$1(this, _memoMethod);
        if (!memoMethod) {
            throw new Error('no memoMethod provided to constructor');
        }
        var context = memoOptions.context, forceRefresh = memoOptions.forceRefresh, options = _object_without_properties(memoOptions, [
            "context",
            "forceRefresh"
        ]);
        var v1 = this.get(k, options);
        if (!forceRefresh && v1 !== undefined) return v1;
        var vv = memoMethod(k, v1, {
            options: options,
            context: context
        });
        this.set(k, vv, options);
        return vv;
    };
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */ _proto.get = function get(k) {
        var getOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _getOptions_allowStale = getOptions.allowStale, allowStale = _getOptions_allowStale === undefined ? this.allowStale : _getOptions_allowStale, _getOptions_updateAgeOnGet = getOptions.updateAgeOnGet, updateAgeOnGet = _getOptions_updateAgeOnGet === undefined ? this.updateAgeOnGet : _getOptions_updateAgeOnGet, _getOptions_noDeleteOnStaleGet = getOptions.noDeleteOnStaleGet, noDeleteOnStaleGet = _getOptions_noDeleteOnStaleGet === undefined ? this.noDeleteOnStaleGet : _getOptions_noDeleteOnStaleGet, status = getOptions.status;
        var index = _class_private_field_get$1(this, _keyMap).get(k);
        if (index !== undefined) {
            var value = _class_private_field_get$1(this, _valList)[index];
            var fetching = _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, value);
            if (status) _class_private_field_get$1(this, _statusTTL).call(this, status, index);
            if (_class_private_field_get$1(this, _isStale).call(this, index)) {
                if (status) status.get = 'stale';
                // delete only if not an in-flight background fetch
                if (!fetching) {
                    if (!noDeleteOnStaleGet) {
                        _class_private_method_get$2(this, _delete, __delete).call(this, k, 'expire');
                    }
                    if (status && allowStale) status.returnedStale = true;
                    return allowStale ? value : undefined;
                } else {
                    if (status && allowStale && value.__staleWhileFetching !== undefined) {
                        status.returnedStale = true;
                    }
                    return allowStale ? value.__staleWhileFetching : undefined;
                }
            } else {
                if (status) status.get = 'hit';
                // if we're currently fetching it, we don't actually have it yet
                // it's not stale, which means this isn't a staleWhileRefetching.
                // If it's not stale, and fetching, AND has a __staleWhileFetching
                // value, then that means the user fetched with {forceRefresh:true},
                // so it's safe to return that value.
                if (fetching) {
                    return value.__staleWhileFetching;
                }
                _class_private_method_get$2(this, _moveToTail, moveToTail).call(this, index);
                if (updateAgeOnGet) {
                    _class_private_field_get$1(this, _updateItemAge).call(this, index);
                }
                return value;
            }
        } else if (status) {
            status.get = 'miss';
        }
    };
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */ _proto.delete = function _delete1(k) {
        return _class_private_method_get$2(this, _delete, __delete).call(this, k, 'delete');
    };
    /**
     * Clear the cache entirely, throwing away all values.
     */ _proto.clear = function clear1() {
        return _class_private_method_get$2(this, _clear, clear).call(this, 'delete');
    };
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */ LRUCache.unsafeExposeInternals = function unsafeExposeInternals(c) {
        return {
            // properties
            starts: _class_private_field_get$1(c, _starts),
            ttls: _class_private_field_get$1(c, _ttls),
            sizes: _class_private_field_get$1(c, _sizes),
            keyMap: _class_private_field_get$1(c, _keyMap),
            keyList: _class_private_field_get$1(c, _keyList),
            valList: _class_private_field_get$1(c, _valList),
            next: _class_private_field_get$1(c, _next),
            prev: _class_private_field_get$1(c, _prev),
            get head () {
                return _class_private_field_get$1(c, _head);
            },
            get tail () {
                return _class_private_field_get$1(c, _tail);
            },
            free: _class_private_field_get$1(c, _free),
            // methods
            isBackgroundFetch: function(p) {
                return _class_private_method_get$2(c, _isBackgroundFetch, isBackgroundFetch).call(c, p);
            },
            backgroundFetch: function(k, index, options, context) {
                return _class_private_method_get$2(c, _backgroundFetch, backgroundFetch).call(c, k, index, options, context);
            },
            moveToTail: function(index) {
                return _class_private_method_get$2(c, _moveToTail, moveToTail).call(c, index);
            },
            indexes: function(options) {
                return _class_private_method_get$2(c, _indexes, indexes).call(c, options);
            },
            rindexes: function(options) {
                return _class_private_method_get$2(c, _rindexes, rindexes).call(c, options);
            },
            isStale: function(index) {
                return _class_private_field_get$1(c, _isStale).call(c, index);
            }
        };
    };
    _create_class$4(LRUCache, [
        {
            key: "max",
            get: // Protected read-only members
            /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _max);
            }
        },
        {
            key: "maxSize",
            get: /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _maxSize);
            }
        },
        {
            key: "calculatedSize",
            get: /**
     * The total computed size of items in the cache (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _calculatedSize);
            }
        },
        {
            key: "size",
            get: /**
     * The number of items stored in the cache (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _size);
            }
        },
        {
            key: "fetchMethod",
            get: /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _fetchMethod);
            }
        },
        {
            key: "memoMethod",
            get: function get() {
                return _class_private_field_get$1(this, _memoMethod);
            }
        },
        {
            key: "dispose",
            get: /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _dispose);
            }
        },
        {
            key: "disposeAfter",
            get: /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */ function get() {
                return _class_private_field_get$1(this, _disposeAfter);
            }
        }
    ]);
    return LRUCache;
} 
();
prop = Symbol.toStringTag;
function initializeTTLTracking() {
    var _this = this;
    var _this1 = this;
    var ttls = new ZeroArray(_class_private_field_get$1(this, _max));
    var starts = new ZeroArray(_class_private_field_get$1(this, _max));
    _class_private_field_set$1(this, _ttls, ttls);
    _class_private_field_set$1(this, _starts, starts);
    _class_private_field_set$1(this, _setItemTTL, function(index, ttl) {
        var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : perf.now();
        starts[index] = ttl !== 0 ? start : 0;
        ttls[index] = ttl;
        if (ttl !== 0 && _this1.ttlAutopurge) {
            var t = setTimeout(function() {
                if (_class_private_field_get$1(_this1, _isStale).call(_this1, index)) {
                    _class_private_method_get$2(_this1, _delete, __delete).call(_this1, _class_private_field_get$1(_this1, _keyList)[index], 'expire');
                }
            }, ttl + 1);
            // unref() not supported on all platforms
            /* c8 ignore start */ if (t.unref) {
                t.unref();
            }
        /* c8 ignore stop */ }
    });
    _class_private_field_set$1(this, _updateItemAge, function(index) {
        starts[index] = ttls[index] !== 0 ? perf.now() : 0;
    });
    _class_private_field_set$1(this, _statusTTL, function(status, index) {
        if (ttls[index]) {
            var ttl = ttls[index];
            var start = starts[index];
            /* c8 ignore next */ if (!ttl || !start) return;
            status.ttl = ttl;
            status.start = start;
            status.now = cachedNow || getNow();
            var age = status.now - start;
            status.remainingTTL = ttl - age;
        }
    });
    // debounce calls to perf.now() to 1s so we're not hitting
    // that costly call repeatedly.
    var cachedNow = 0;
    var getNow = function() {
        var n = perf.now();
        if (_this.ttlResolution > 0) {
            cachedNow = n;
            var t = setTimeout(function() {
                return cachedNow = 0;
            }, _this.ttlResolution);
            // not available on all platforms
            /* c8 ignore start */ if (t.unref) {
                t.unref();
            }
        /* c8 ignore stop */ }
        return n;
    };
    this.getRemainingTTL = function(key) {
        var index = _class_private_field_get$1(_this, _keyMap).get(key);
        if (index === undefined) {
            return 0;
        }
        var ttl = ttls[index];
        var start = starts[index];
        if (!ttl || !start) {
            return Infinity;
        }
        var age = (cachedNow || getNow()) - start;
        return ttl - age;
    };
    _class_private_field_set$1(this, _isStale, function(index) {
        var s = starts[index];
        var t = ttls[index];
        return !!t && !!s && (cachedNow || getNow()) - s > t;
    });
}
function initializeSizeTracking() {
    var _this = this;
    var sizes = new ZeroArray(_class_private_field_get$1(this, _max));
    _class_private_field_set$1(this, _calculatedSize, 0);
    _class_private_field_set$1(this, _sizes, sizes);
    _class_private_field_set$1(this, _removeItemSize, function(index) {
        _class_private_field_set$1(_this, _calculatedSize, _class_private_field_get$1(_this, _calculatedSize) - sizes[index]);
        sizes[index] = 0;
    });
    _class_private_field_set$1(this, _requireSize, function(k, v1, size, sizeCalculation) {
        // provisionally accept background fetches.
        // actual value size will be checked when they return.
        if (_class_private_method_get$2(_this, _isBackgroundFetch, isBackgroundFetch).call(_this, v1)) {
            return 0;
        }
        if (!isPosInt(size)) {
            if (sizeCalculation) {
                if (typeof sizeCalculation !== 'function') {
                    throw new TypeError('sizeCalculation must be a function');
                }
                size = sizeCalculation(v1, k);
                if (!isPosInt(size)) {
                    throw new TypeError('sizeCalculation return invalid (expect positive integer)');
                }
            } else {
                throw new TypeError('invalid size value (must be positive integer). ' + 'When maxSize or maxEntrySize is used, sizeCalculation ' + 'or size must be set.');
            }
        }
        return size;
    });
    _class_private_field_set$1(this, _addItemSize, function(index, size, status) {
        sizes[index] = size;
        if (_class_private_field_get$1(_this, _maxSize)) {
            var maxSize = _class_private_field_get$1(_this, _maxSize) - sizes[index];
            while(_class_private_field_get$1(_this, _calculatedSize) > maxSize){
                _class_private_method_get$2(_this, _evict, evict).call(_this, true);
            }
        }
        _class_private_field_set$1(_this, _calculatedSize, _class_private_field_get$1(_this, _calculatedSize) + sizes[index]);
        if (status) {
            status.entrySize = size;
            status.totalCalculatedSize = _class_private_field_get$1(_this, _calculatedSize);
        }
    });
}
function indexes() {
    var _ref, _ref_allowStale, allowStale, i;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                _ref = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {}, _ref_allowStale = _ref.allowStale, allowStale = _ref_allowStale === undefined ? this.allowStale : _ref_allowStale;
                if (!_class_private_field_get$1(this, _size)) return [
                    3,
                    5
                ];
                i = _class_private_field_get$1(this, _tail);
                _state.label = 1;
            case 1:
                if (!_class_private_method_get$2(this, _isValidIndex, isValidIndex).call(this, i)) {
                    return [
                        3,
                        5
                    ];
                }
                if (!(allowStale || !_class_private_field_get$1(this, _isStale).call(this, i))) return [
                    3,
                    3
                ];
                return [
                    4,
                    i
                ];
            case 2:
                _state.sent();
                _state.label = 3;
            case 3:
                if (i === _class_private_field_get$1(this, _head)) {
                    return [
                        3,
                        5
                    ];
                } else {
                    i = _class_private_field_get$1(this, _prev)[i];
                }
                _state.label = 4;
            case 4:
                return [
                    3,
                    1
                ];
            case 5:
                return [
                    2
                ];
        }
    });
}
function rindexes() {
    var _ref, _ref_allowStale, allowStale, i;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                _ref = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {}, _ref_allowStale = _ref.allowStale, allowStale = _ref_allowStale === undefined ? this.allowStale : _ref_allowStale;
                if (!_class_private_field_get$1(this, _size)) return [
                    3,
                    5
                ];
                i = _class_private_field_get$1(this, _head);
                _state.label = 1;
            case 1:
                if (!_class_private_method_get$2(this, _isValidIndex, isValidIndex).call(this, i)) {
                    return [
                        3,
                        5
                    ];
                }
                if (!(allowStale || !_class_private_field_get$1(this, _isStale).call(this, i))) return [
                    3,
                    3
                ];
                return [
                    4,
                    i
                ];
            case 2:
                _state.sent();
                _state.label = 3;
            case 3:
                if (i === _class_private_field_get$1(this, _tail)) {
                    return [
                        3,
                        5
                    ];
                } else {
                    i = _class_private_field_get$1(this, _next)[i];
                }
                _state.label = 4;
            case 4:
                return [
                    3,
                    1
                ];
            case 5:
                return [
                    2
                ];
        }
    });
}
function isValidIndex(index) {
    return index !== undefined && _class_private_field_get$1(this, _keyMap).get(_class_private_field_get$1(this, _keyList)[index]) === index;
}
function evict(free) {
    var _this, _this1;
    var head = _class_private_field_get$1(this, _head);
    var k = _class_private_field_get$1(this, _keyList)[head];
    var v1 = _class_private_field_get$1(this, _valList)[head];
    if (_class_private_field_get$1(this, _hasFetchMethod) && _class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1)) {
        v1.__abortController.abort(new Error('evicted'));
    } else if (_class_private_field_get$1(this, _hasDispose) || _class_private_field_get$1(this, _hasDisposeAfter)) {
        if (_class_private_field_get$1(this, _hasDispose)) {
            (_this = _class_private_field_get$1(_this1 = this, _dispose)) === null || _this === undefined ? undefined : _this.call(_this1, v1, k, 'evict');
        }
        if (_class_private_field_get$1(this, _hasDisposeAfter)) {
            var _$_class_private_field_get;
            (_$_class_private_field_get = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get === undefined ? undefined : _$_class_private_field_get.push([
                v1,
                k,
                'evict'
            ]);
        }
    }
    _class_private_field_get$1(this, _removeItemSize).call(this, head);
    // if we aren't about to use the index, then null these out
    if (free) {
        _class_private_field_get$1(this, _keyList)[head] = undefined;
        _class_private_field_get$1(this, _valList)[head] = undefined;
        _class_private_field_get$1(this, _free).push(head);
    }
    if (_class_private_field_get$1(this, _size) === 1) {
        _class_private_field_set$1(this, _head, _class_private_field_set$1(this, _tail, 0));
        _class_private_field_get$1(this, _free).length = 0;
    } else {
        _class_private_field_set$1(this, _head, _class_private_field_get$1(this, _next)[head]);
    }
    _class_private_field_get$1(this, _keyMap).delete(k);
    _class_private_field_update(this, _size).value--;
    return head;
}
function backgroundFetch(k, index, options, context) {
    var _this = this;
    var _this1 = this;
    var _this2, _this3;
    var v1 = index === undefined ? undefined : _class_private_field_get$1(this, _valList)[index];
    if (_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1)) {
        return v1;
    }
    var ac = new AC();
    var signal = options.signal;
    // when/if our AC signals, then stop listening to theirs.
    signal === null || signal === undefined ? undefined : signal.addEventListener('abort', function() {
        return ac.abort(signal.reason);
    }, {
        signal: ac.signal
    });
    var fetchOpts = {
        signal: ac.signal,
        options: options,
        context: context
    };
    var cb = function(v1) {
        var updateCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var aborted = ac.signal.aborted;
        var ignoreAbort = options.ignoreFetchAbort && v1 !== undefined;
        if (options.status) {
            if (aborted && !updateCache) {
                options.status.fetchAborted = true;
                options.status.fetchError = ac.signal.reason;
                if (ignoreAbort) options.status.fetchAbortIgnored = true;
            } else {
                options.status.fetchResolved = true;
            }
        }
        if (aborted && !ignoreAbort && !updateCache) {
            return fetchFail(ac.signal.reason);
        }
        // either we didn't abort, and are still here, or we did, and ignored
        var bf = p;
        if (_class_private_field_get$1(_this1, _valList)[index] === p) {
            if (v1 === undefined) {
                if (bf.__staleWhileFetching) {
                    _class_private_field_get$1(_this1, _valList)[index] = bf.__staleWhileFetching;
                } else {
                    _class_private_method_get$2(_this1, _delete, __delete).call(_this1, k, 'fetch');
                }
            } else {
                if (options.status) options.status.fetchUpdated = true;
                _this1.set(k, v1, fetchOpts.options);
            }
        }
        return v1;
    };
    var eb = function(er) {
        if (options.status) {
            options.status.fetchRejected = true;
            options.status.fetchError = er;
        }
        return fetchFail(er);
    };
    var fetchFail = function(er) {
        var aborted = ac.signal.aborted;
        var allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
        var allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
        var noDelete = allowStale || options.noDeleteOnFetchRejection;
        var bf = p;
        if (_class_private_field_get$1(_this, _valList)[index] === p) {
            // if we allow stale on fetch rejections, then we need to ensure that
            // the stale value is not removed from the cache when the fetch fails.
            var del = !noDelete || bf.__staleWhileFetching === undefined;
            if (del) {
                _class_private_method_get$2(_this, _delete, __delete).call(_this, k, 'fetch');
            } else if (!allowStaleAborted) {
                // still replace the *promise* with the stale value,
                // since we are done with the promise at this point.
                // leave it untouched if we're still waiting for an
                // aborted background fetch that hasn't yet returned.
                _class_private_field_get$1(_this, _valList)[index] = bf.__staleWhileFetching;
            }
        }
        if (allowStale) {
            if (options.status && bf.__staleWhileFetching !== undefined) {
                options.status.returnedStale = true;
            }
            return bf.__staleWhileFetching;
        } else if (bf.__returned === bf) {
            throw er;
        }
    };
    var pcall = function(res, rej) {
        var fmp = (_this2 = _class_private_field_get$1(_this3 = _this, _fetchMethod)) === null || _this2 === undefined ? undefined : _this2.call(_this3, k, v1, fetchOpts);
        if (fmp && _instanceof$b(fmp, Promise)) {
            fmp.then(function(v1) {
                return res(v1 === undefined ? undefined : v1);
            }, rej);
        }
        // ignored, we go until we finish, regardless.
        // defer check until we are actually aborting,
        // so fetchMethod can override.
        ac.signal.addEventListener('abort', function() {
            if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
                res(undefined);
                // when it eventually resolves, update the cache.
                if (options.allowStaleOnFetchAbort) {
                    res = function(v1) {
                        return cb(v1, true);
                    };
                }
            }
        });
    };
    if (options.status) options.status.fetchDispatched = true;
    var p = new Promise(pcall).then(cb, eb);
    var bf = Object.assign(p, {
        __abortController: ac,
        __staleWhileFetching: v1,
        __returned: undefined
    });
    if (index === undefined) {
        // internal, don't expose status.
        this.set(k, bf, _object_spread_props$1(_object_spread$2({}, fetchOpts.options), {
            status: undefined
        }));
        index = _class_private_field_get$1(this, _keyMap).get(k);
    } else {
        _class_private_field_get$1(this, _valList)[index] = bf;
    }
    return bf;
}
function isBackgroundFetch(p) {
    if (!_class_private_field_get$1(this, _hasFetchMethod)) return false;
    var b = p;
    return !!b && _instanceof$b(b, Promise) && b.hasOwnProperty('__staleWhileFetching') && _instanceof$b(b.__abortController, AC);
}
function connect(p, n) {
    _class_private_field_get$1(this, _prev)[n] = p;
    _class_private_field_get$1(this, _next)[p] = n;
}
function moveToTail(index) {
    // if tail already, nothing to do
    // if head, move head to next[index]
    // else
    //   move next[prev[index]] to next[index] (head has no prev)
    //   move prev[next[index]] to prev[index]
    // prev[index] = tail
    // next[tail] = index
    // tail = index
    if (index !== _class_private_field_get$1(this, _tail)) {
        if (index === _class_private_field_get$1(this, _head)) {
            _class_private_field_set$1(this, _head, _class_private_field_get$1(this, _next)[index]);
        } else {
            _class_private_method_get$2(this, _connect, connect).call(this, _class_private_field_get$1(this, _prev)[index], _class_private_field_get$1(this, _next)[index]);
        }
        _class_private_method_get$2(this, _connect, connect).call(this, _class_private_field_get$1(this, _tail), index);
        _class_private_field_set$1(this, _tail, index);
    }
}
function __delete(k, reason) {
    var _$_class_private_field_get;
    var _this, _this1, _this2, _this3;
    var deleted = false;
    if (_class_private_field_get$1(this, _size) !== 0) {
        var index = _class_private_field_get$1(this, _keyMap).get(k);
        if (index !== undefined) {
            deleted = true;
            if (_class_private_field_get$1(this, _size) === 1) {
                _class_private_method_get$2(this, _clear, clear).call(this, reason);
            } else {
                _class_private_field_get$1(this, _removeItemSize).call(this, index);
                var v1 = _class_private_field_get$1(this, _valList)[index];
                if (_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1)) {
                    v1.__abortController.abort(new Error('deleted'));
                } else if (_class_private_field_get$1(this, _hasDispose) || _class_private_field_get$1(this, _hasDisposeAfter)) {
                    if (_class_private_field_get$1(this, _hasDispose)) {
                        (_this = _class_private_field_get$1(_this1 = this, _dispose)) === null || _this === undefined ? undefined : _this.call(_this1, v1, k, reason);
                    }
                    if (_class_private_field_get$1(this, _hasDisposeAfter)) {
                        var _$_class_private_field_get1;
                        (_$_class_private_field_get1 = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get1 === undefined ? undefined : _$_class_private_field_get1.push([
                            v1,
                            k,
                            reason
                        ]);
                    }
                }
                _class_private_field_get$1(this, _keyMap).delete(k);
                _class_private_field_get$1(this, _keyList)[index] = undefined;
                _class_private_field_get$1(this, _valList)[index] = undefined;
                if (index === _class_private_field_get$1(this, _tail)) {
                    _class_private_field_set$1(this, _tail, _class_private_field_get$1(this, _prev)[index]);
                } else if (index === _class_private_field_get$1(this, _head)) {
                    _class_private_field_set$1(this, _head, _class_private_field_get$1(this, _next)[index]);
                } else {
                    var pi = _class_private_field_get$1(this, _prev)[index];
                    _class_private_field_get$1(this, _next)[pi] = _class_private_field_get$1(this, _next)[index];
                    var ni = _class_private_field_get$1(this, _next)[index];
                    _class_private_field_get$1(this, _prev)[ni] = _class_private_field_get$1(this, _prev)[index];
                }
                _class_private_field_update(this, _size).value--;
                _class_private_field_get$1(this, _free).push(index);
            }
        }
    }
    if (_class_private_field_get$1(this, _hasDisposeAfter) && ((_$_class_private_field_get = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get === undefined ? undefined : _$_class_private_field_get.length)) {
        var dt = _class_private_field_get$1(this, _disposed);
        var task;
        while(task = dt === null || dt === undefined ? undefined : dt.shift()){
            var _this4;
            (_this2 = _class_private_field_get$1(_this3 = this, _disposeAfter)) === null || _this2 === undefined ? undefined : (_this4 = _this2).call.apply(_this4, [
                _this3
            ].concat(_to_consumable_array$6(task)));
        }
    }
    return deleted;
}
function clear(reason) {
    var _this, _this1, _ref, _this2, _this3;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = _class_private_method_get$2(this, _rindexes, rindexes).call(this, {
            allowStale: true
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var index = _step.value;
            var v1 = _class_private_field_get$1(this, _valList)[index];
            if (_class_private_method_get$2(this, _isBackgroundFetch, isBackgroundFetch).call(this, v1)) {
                v1.__abortController.abort(new Error('deleted'));
            } else {
                var k = _class_private_field_get$1(this, _keyList)[index];
                if (_class_private_field_get$1(this, _hasDispose)) {
                    (_this = _class_private_field_get$1(_ref = _this1 = this, _dispose)) === null || _this === void 0 ? void 0 : _this.call(_this1, v1, k, reason);
                }
                if (_class_private_field_get$1(this, _hasDisposeAfter)) {
                    var _$_class_private_field_get;
                    (_$_class_private_field_get = _class_private_field_get$1(this, _disposed)) === null || _$_class_private_field_get === void 0 ? void 0 : _$_class_private_field_get.push([
                        v1,
                        k,
                        reason
                    ]);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    _class_private_field_get$1(this, _keyMap).clear();
    _class_private_field_get$1(this, _valList).fill(undefined);
    _class_private_field_get$1(this, _keyList).fill(undefined);
    if (_class_private_field_get$1(this, _ttls) && _class_private_field_get$1(this, _starts)) {
        _class_private_field_get$1(this, _ttls).fill(0);
        _class_private_field_get$1(this, _starts).fill(0);
    }
    if (_class_private_field_get$1(this, _sizes)) {
        _class_private_field_get$1(this, _sizes).fill(0);
    }
    _class_private_field_set$1(this, _head, 0);
    _class_private_field_set$1(this, _tail, 0);
    _class_private_field_get$1(this, _free).length = 0;
    _class_private_field_set$1(this, _calculatedSize, 0);
    _class_private_field_set$1(this, _size, 0);
    if (_class_private_field_get$1(this, _hasDisposeAfter) && _class_private_field_get$1(this, _disposed)) {
        var dt = _class_private_field_get$1(this, _disposed);
        var task;
        while(task = dt === null || dt === undefined ? undefined : dt.shift()){
            var _this4;
            (_this2 = _class_private_field_get$1(_this3 = this, _disposeAfter)) === null || _this2 === undefined ? undefined : (_this4 = _this2).call.apply(_this4, [
                _this3
            ].concat(_to_consumable_array$6(task)));
        }
    }
}

var esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	LRUCache: LRUCache
});

var require$$0$1 = /*@__PURE__*/ getAugmentedNamespace(esm);

/* eslint-disable max-len */ function _array_like_to_array$a(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$5(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit$5(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$5() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$5(arr, i) {
    return _array_with_holes$5(arr) || _iterable_to_array_limit$5(arr, i) || _unsupported_iterable_to_array$a(arr, i) || _non_iterable_rest$5();
}
function _unsupported_iterable_to_array$a(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$a(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$a(o, minLen);
}
var hosts_1;
var hasRequiredHosts;
function requireHosts() {
    if (hasRequiredHosts) return hosts_1;
    hasRequiredHosts = 1;
    var maybeJoin = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return args.every(function(arg) {
            return arg;
        }) ? args.join('') : '';
    };
    var maybeEncode = function(arg) {
        return arg ? encodeURIComponent(arg) : '';
    };
    var formatHashFragment = function(f) {
        return f.toLowerCase().replace(/^\W+|\/|\W+$/g, '').replace(/\W+/g, '-');
    };
    var defaults = {
        sshtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "git@".concat(domain, ":").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        sshurltemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "git+ssh://git@".concat(domain, "/").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        edittemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, editpath = param.editpath, path = param.path;
            return "https://".concat(domain, "/").concat(user, "/").concat(project).concat(maybeJoin('/', editpath, '/', maybeEncode(committish || 'HEAD'), '/', path));
        },
        browsetemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, treepath = param.treepath;
            return "https://".concat(domain, "/").concat(user, "/").concat(project).concat(maybeJoin('/', treepath, '/', maybeEncode(committish)));
        },
        browsetreetemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, treepath = param.treepath, path = param.path, fragment = param.fragment, hashformat = param.hashformat;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/").concat(treepath, "/").concat(maybeEncode(committish || 'HEAD'), "/").concat(path).concat(maybeJoin('#', hashformat(fragment || '')));
        },
        browseblobtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, blobpath = param.blobpath, path = param.path, fragment = param.fragment, hashformat = param.hashformat;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/").concat(blobpath, "/").concat(maybeEncode(committish || 'HEAD'), "/").concat(path).concat(maybeJoin('#', hashformat(fragment || '')));
        },
        docstemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, treepath = param.treepath, committish = param.committish;
            return "https://".concat(domain, "/").concat(user, "/").concat(project).concat(maybeJoin('/', treepath, '/', maybeEncode(committish)), "#readme");
        },
        httpstemplate: function(param) {
            var auth = param.auth, domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "git+https://".concat(maybeJoin(auth, '@')).concat(domain, "/").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        filetemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, path = param.path;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/raw/").concat(maybeEncode(committish || 'HEAD'), "/").concat(path);
        },
        shortcuttemplate: function(param) {
            var type = param.type, user = param.user, project = param.project, committish = param.committish;
            return "".concat(type, ":").concat(user, "/").concat(project).concat(maybeJoin('#', committish));
        },
        pathtemplate: function(param) {
            var user = param.user, project = param.project, committish = param.committish;
            return "".concat(user, "/").concat(project).concat(maybeJoin('#', committish));
        },
        bugstemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/issues");
        },
        hashformat: formatHashFragment
    };
    var hosts = {};
    hosts.github = {
        // First two are insecure and generally shouldn't be used any more, but
        // they are still supported.
        protocols: [
            'git:',
            'http:',
            'git+ssh:',
            'git+https:',
            'ssh:',
            'https:'
        ],
        domain: 'github.com',
        treepath: 'tree',
        blobpath: 'blob',
        editpath: 'edit',
        filetemplate: function(param) {
            var auth = param.auth, user = param.user, project = param.project, committish = param.committish, path = param.path;
            return "https://".concat(maybeJoin(auth, '@'), "raw.githubusercontent.com/").concat(user, "/").concat(project, "/").concat(maybeEncode(committish || 'HEAD'), "/").concat(path);
        },
        gittemplate: function(param) {
            var auth = param.auth, domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "git://".concat(maybeJoin(auth, '@')).concat(domain, "/").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        tarballtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "https://codeload.".concat(domain, "/").concat(user, "/").concat(project, "/tar.gz/").concat(maybeEncode(committish || 'HEAD'));
        },
        extract: function(url) {
            var _url_pathname_split = _sliced_to_array$5(url.pathname.split('/', 5), 5), user = _url_pathname_split[1], project = _url_pathname_split[2], type = _url_pathname_split[3], committish = _url_pathname_split[4];
            if (type && type !== 'tree') {
                return;
            }
            if (!type) {
                committish = url.hash.slice(1);
            }
            if (project && project.endsWith('.git')) {
                project = project.slice(0, -4);
            }
            if (!user || !project) {
                return;
            }
            return {
                user: user,
                project: project,
                committish: committish
            };
        }
    };
    hosts.bitbucket = {
        protocols: [
            'git+ssh:',
            'git+https:',
            'ssh:',
            'https:'
        ],
        domain: 'bitbucket.org',
        treepath: 'src',
        blobpath: 'src',
        editpath: '?mode=edit',
        edittemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, treepath = param.treepath, path = param.path, editpath = param.editpath;
            return "https://".concat(domain, "/").concat(user, "/").concat(project).concat(maybeJoin('/', treepath, '/', maybeEncode(committish || 'HEAD'), '/', path, editpath));
        },
        tarballtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/get/").concat(maybeEncode(committish || 'HEAD'), ".tar.gz");
        },
        extract: function(url) {
            var _url_pathname_split = _sliced_to_array$5(url.pathname.split('/', 4), 4), user = _url_pathname_split[1], project = _url_pathname_split[2], aux = _url_pathname_split[3];
            if ([
                'get'
            ].includes(aux)) {
                return;
            }
            if (project && project.endsWith('.git')) {
                project = project.slice(0, -4);
            }
            if (!user || !project) {
                return;
            }
            return {
                user: user,
                project: project,
                committish: url.hash.slice(1)
            };
        }
    };
    hosts.gitlab = {
        protocols: [
            'git+ssh:',
            'git+https:',
            'ssh:',
            'https:'
        ],
        domain: 'gitlab.com',
        treepath: 'tree',
        blobpath: 'tree',
        editpath: '-/edit',
        httpstemplate: function(param) {
            var auth = param.auth, domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "git+https://".concat(maybeJoin(auth, '@')).concat(domain, "/").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        tarballtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/repository/archive.tar.gz?ref=").concat(maybeEncode(committish || 'HEAD'));
        },
        extract: function(url) {
            var path = url.pathname.slice(1);
            if (path.includes('/-/') || path.includes('/archive.tar.gz')) {
                return;
            }
            var segments = path.split('/');
            var project = segments.pop();
            if (project.endsWith('.git')) {
                project = project.slice(0, -4);
            }
            var user = segments.join('/');
            if (!user || !project) {
                return;
            }
            return {
                user: user,
                project: project,
                committish: url.hash.slice(1)
            };
        }
    };
    hosts.gist = {
        protocols: [
            'git:',
            'git+ssh:',
            'git+https:',
            'ssh:',
            'https:'
        ],
        domain: 'gist.github.com',
        editpath: 'edit',
        sshtemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "git@".concat(domain, ":").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        sshurltemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "git+ssh://git@".concat(domain, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        edittemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, editpath = param.editpath;
            return "https://".concat(domain, "/").concat(user, "/").concat(project).concat(maybeJoin('/', maybeEncode(committish)), "/").concat(editpath);
        },
        browsetemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(project).concat(maybeJoin('/', maybeEncode(committish)));
        },
        browsetreetemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish, path = param.path, hashformat = param.hashformat;
            return "https://".concat(domain, "/").concat(project).concat(maybeJoin('/', maybeEncode(committish))).concat(maybeJoin('#', hashformat(path)));
        },
        browseblobtemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish, path = param.path, hashformat = param.hashformat;
            return "https://".concat(domain, "/").concat(project).concat(maybeJoin('/', maybeEncode(committish))).concat(maybeJoin('#', hashformat(path)));
        },
        docstemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(project).concat(maybeJoin('/', maybeEncode(committish)));
        },
        httpstemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "git+https://".concat(domain, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        filetemplate: function(param) {
            var user = param.user, project = param.project, committish = param.committish, path = param.path;
            return "https://gist.githubusercontent.com/".concat(user, "/").concat(project, "/raw").concat(maybeJoin('/', maybeEncode(committish)), "/").concat(path);
        },
        shortcuttemplate: function(param) {
            var type = param.type, project = param.project, committish = param.committish;
            return "".concat(type, ":").concat(project).concat(maybeJoin('#', committish));
        },
        pathtemplate: function(param) {
            var project = param.project, committish = param.committish;
            return "".concat(project).concat(maybeJoin('#', committish));
        },
        bugstemplate: function(param) {
            var domain = param.domain, project = param.project;
            return "https://".concat(domain, "/").concat(project);
        },
        gittemplate: function(param) {
            var domain = param.domain, project = param.project, committish = param.committish;
            return "git://".concat(domain, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        tarballtemplate: function(param) {
            var project = param.project, committish = param.committish;
            return "https://codeload.github.com/gist/".concat(project, "/tar.gz/").concat(maybeEncode(committish || 'HEAD'));
        },
        extract: function(url) {
            var _url_pathname_split = _sliced_to_array$5(url.pathname.split('/', 4), 4), user = _url_pathname_split[1], project = _url_pathname_split[2], aux = _url_pathname_split[3];
            if (aux === 'raw') {
                return;
            }
            if (!project) {
                if (!user) {
                    return;
                }
                project = user;
                user = null;
            }
            if (project.endsWith('.git')) {
                project = project.slice(0, -4);
            }
            return {
                user: user,
                project: project,
                committish: url.hash.slice(1)
            };
        },
        hashformat: function hashformat(fragment) {
            return fragment && 'file-' + formatHashFragment(fragment);
        }
    };
    hosts.sourcehut = {
        protocols: [
            'git+ssh:',
            'https:'
        ],
        domain: 'git.sr.ht',
        treepath: 'tree',
        blobpath: 'tree',
        filetemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish, path = param.path;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/blob/").concat(maybeEncode(committish) || 'HEAD', "/").concat(path);
        },
        httpstemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, ".git").concat(maybeJoin('#', committish));
        },
        tarballtemplate: function(param) {
            var domain = param.domain, user = param.user, project = param.project, committish = param.committish;
            return "https://".concat(domain, "/").concat(user, "/").concat(project, "/archive/").concat(maybeEncode(committish) || 'HEAD', ".tar.gz");
        },
        bugstemplate: function() {
            return null;
        },
        extract: function(url) {
            var _url_pathname_split = _sliced_to_array$5(url.pathname.split('/', 4), 4), user = _url_pathname_split[1], project = _url_pathname_split[2], aux = _url_pathname_split[3];
            // tarball url
            if ([
                'archive'
            ].includes(aux)) {
                return;
            }
            if (project && project.endsWith('.git')) {
                project = project.slice(0, -4);
            }
            if (!user || !project) {
                return;
            }
            return {
                user: user,
                project: project,
                committish: url.hash.slice(1)
            };
        }
    };
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(hosts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array$5(_step.value, 2), name = _step_value[0], host = _step_value[1];
            hosts[name] = Object.assign({}, defaults, host);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    hosts_1 = hosts;
    return hosts_1;
}

var parseUrl;
var hasRequiredParseUrl;
function requireParseUrl() {
    if (hasRequiredParseUrl) return parseUrl;
    hasRequiredParseUrl = 1;
    var url = require$$0$2;
    var lastIndexOfBefore = function(str, char, beforeChar) {
        var startPosition = str.indexOf(beforeChar);
        return str.lastIndexOf(char, startPosition > -1 ? startPosition : Infinity);
    };
    var safeUrl = function(u) {
        try {
            return new url.URL(u);
        } catch (e) {
        // this fn should never throw
        }
    };
    // accepts input like git:github.com:user/repo and inserts the // after the first :
    var correctProtocol = function(arg, protocols) {
        var firstColon = arg.indexOf(':');
        var proto = arg.slice(0, firstColon + 1);
        if (Object.prototype.hasOwnProperty.call(protocols, proto)) {
            return arg;
        }
        var firstAt = arg.indexOf('@');
        if (firstAt > -1) {
            if (firstAt > firstColon) {
                return "git+ssh://".concat(arg);
            } else {
                return arg;
            }
        }
        var doubleSlash = arg.indexOf('//');
        if (doubleSlash === firstColon + 1) {
            return arg;
        }
        return "".concat(arg.slice(0, firstColon + 1), "//").concat(arg.slice(firstColon + 1));
    };
    // attempt to correct an scp style url so that it will parse with `new URL()`
    var correctUrl = function(giturl) {
        // ignore @ that come after the first hash since the denotes the start
        // of a committish which can contain @ characters
        var firstAt = lastIndexOfBefore(giturl, '@', '#');
        // ignore colons that come after the hash since that could include colons such as:
        // git@github.com:user/package-2#semver:^1.0.0
        var lastColonBeforeHash = lastIndexOfBefore(giturl, ':', '#');
        if (lastColonBeforeHash > firstAt) {
            // the last : comes after the first @ (or there is no @)
            // like it would in:
            // proto://hostname.com:user/repo
            // username@hostname.com:user/repo
            // :password@hostname.com:user/repo
            // username:password@hostname.com:user/repo
            // proto://username@hostname.com:user/repo
            // proto://:password@hostname.com:user/repo
            // proto://username:password@hostname.com:user/repo
            // then we replace the last : with a / to create a valid path
            giturl = giturl.slice(0, lastColonBeforeHash) + '/' + giturl.slice(lastColonBeforeHash + 1);
        }
        if (lastIndexOfBefore(giturl, ':', '#') === -1 && giturl.indexOf('//') === -1) {
            // we have no : at all
            // as it would be in:
            // username@hostname.com/user/repo
            // then we prepend a protocol
            giturl = "git+ssh://".concat(giturl);
        }
        return giturl;
    };
    parseUrl = function(giturl, protocols) {
        var withProtocol = protocols ? correctProtocol(giturl, protocols) : giturl;
        return safeUrl(withProtocol) || safeUrl(correctUrl(withProtocol));
    };
    return parseUrl;
}

function _instanceof$a(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var fromUrl;
var hasRequiredFromUrl;
function requireFromUrl() {
    if (hasRequiredFromUrl) return fromUrl;
    hasRequiredFromUrl = 1;
    var parseUrl = requireParseUrl();
    // look for github shorthand inputs, such as npm/cli
    var isGitHubShorthand = function(arg) {
        // it cannot contain whitespace before the first #
        // it cannot start with a / because that's probably an absolute file path
        // but it must include a slash since repos are username/repository
        // it cannot start with a . because that's probably a relative file path
        // it cannot start with an @ because that's a scoped package if it passes the other tests
        // it cannot contain a : before a # because that tells us that there's a protocol
        // a second / may not exist before a #
        var firstHash = arg.indexOf('#');
        var firstSlash = arg.indexOf('/');
        var secondSlash = arg.indexOf('/', firstSlash + 1);
        var firstColon = arg.indexOf(':');
        var firstSpace = /\s/.exec(arg);
        var firstAt = arg.indexOf('@');
        var spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash;
        var atOnlyAfterHash = firstAt === -1 || firstHash > -1 && firstAt > firstHash;
        var colonOnlyAfterHash = firstColon === -1 || firstHash > -1 && firstColon > firstHash;
        var secondSlashOnlyAfterHash = secondSlash === -1 || firstHash > -1 && secondSlash > firstHash;
        var hasSlash = firstSlash > 0;
        // if a # is found, what we really want to know is that the character
        // immediately before # is not a /
        var doesNotEndWithSlash = firstHash > -1 ? arg[firstHash - 1] !== '/' : !arg.endsWith('/');
        var doesNotStartWithDot = !arg.startsWith('.');
        return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
    };
    fromUrl = function(giturl, opts, param) {
        var gitHosts = param.gitHosts, protocols = param.protocols;
        var _protocols_parsed_protocol;
        if (!giturl) {
            return;
        }
        var correctedUrl = isGitHubShorthand(giturl) ? "github:".concat(giturl) : giturl;
        var parsed = parseUrl(correctedUrl, protocols);
        if (!parsed) {
            return;
        }
        var gitHostShortcut = gitHosts.byShortcut[parsed.protocol];
        var gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith('www.') ? parsed.hostname.slice(4) : parsed.hostname];
        var gitHostName = gitHostShortcut || gitHostDomain;
        if (!gitHostName) {
            return;
        }
        var gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain];
        var auth = null;
        if (((_protocols_parsed_protocol = protocols[parsed.protocol]) === null || _protocols_parsed_protocol === undefined ? undefined : _protocols_parsed_protocol.auth) && (parsed.username || parsed.password)) {
            auth = "".concat(parsed.username).concat(parsed.password ? ':' + parsed.password : '');
        }
        var committish = null;
        var user = null;
        var project = null;
        var defaultRepresentation = null;
        try {
            if (gitHostShortcut) {
                var pathname = parsed.pathname.startsWith('/') ? parsed.pathname.slice(1) : parsed.pathname;
                var firstAt = pathname.indexOf('@');
                // we ignore auth for shortcuts, so just trim it out
                if (firstAt > -1) {
                    pathname = pathname.slice(firstAt + 1);
                }
                var lastSlash = pathname.lastIndexOf('/');
                if (lastSlash > -1) {
                    user = decodeURIComponent(pathname.slice(0, lastSlash));
                    // we want nulls only, never empty strings
                    if (!user) {
                        user = null;
                    }
                    project = decodeURIComponent(pathname.slice(lastSlash + 1));
                } else {
                    project = decodeURIComponent(pathname);
                }
                if (project.endsWith('.git')) {
                    project = project.slice(0, -4);
                }
                if (parsed.hash) {
                    committish = decodeURIComponent(parsed.hash.slice(1));
                }
                defaultRepresentation = 'shortcut';
            } else {
                var _protocols_parsed_protocol1;
                if (!gitHostInfo.protocols.includes(parsed.protocol)) {
                    return;
                }
                var segments = gitHostInfo.extract(parsed);
                if (!segments) {
                    return;
                }
                user = segments.user && decodeURIComponent(segments.user);
                project = decodeURIComponent(segments.project);
                committish = decodeURIComponent(segments.committish);
                defaultRepresentation = ((_protocols_parsed_protocol1 = protocols[parsed.protocol]) === null || _protocols_parsed_protocol1 === void 0 ? void 0 : _protocols_parsed_protocol1.name) || parsed.protocol.slice(0, -1);
            }
        } catch (err) {
            /* istanbul ignore else */ if (_instanceof$a(err, URIError)) {
                return;
            } else {
                throw err;
            }
        }
        return [
            gitHostName,
            user,
            auth,
            project,
            committish,
            defaultRepresentation,
            opts
        ];
    };
    return fromUrl;
}

function _array_like_to_array$9(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$4(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes$5(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$9(arr);
}
function _check_private_redeclaration$1(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get$1(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _class_call_check$e(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _class_check_private_static_field_descriptor(descriptor, action) {
    if (descriptor === undefined) {
        throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
}
function _class_private_method_get$1(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _class_private_method_init$1(obj, privateSet) {
    _check_private_redeclaration$1(obj, privateSet);
    privateSet.add(obj);
}
function _class_static_private_field_spec_get(receiver, classConstructor, descriptor) {
    _class_check_private_static_access(receiver, classConstructor);
    _class_check_private_static_field_descriptor(descriptor, "get");
    return _class_apply_descriptor_get$1(receiver, descriptor);
}
function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct$6()) {
        _construct = Reflect.construct;
    } else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of$6(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _define_property$1(obj, key, value) {
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
function _iterable_to_array$5(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit$4(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread$5() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$1(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
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
function _set_prototype_of$6(o, p) {
    _set_prototype_of$6 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$6(o, p);
}
function _sliced_to_array$4(arr, i) {
    return _array_with_holes$4(arr) || _iterable_to_array_limit$4(arr, i) || _unsupported_iterable_to_array$9(arr, i) || _non_iterable_rest$4();
}
function _to_consumable_array$5(arr) {
    return _array_without_holes$5(arr) || _iterable_to_array$5(arr) || _unsupported_iterable_to_array$9(arr) || _non_iterable_spread$5();
}
function _unsupported_iterable_to_array$9(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$9(o, minLen);
}
function _class_check_private_static_access(receiver, classConstructor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
}
function _is_native_reflect_construct$6() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$6 = function() {
        return !!result;
    })();
}
var lib$2;
var hasRequiredLib$2;
function requireLib$2() {
    if (hasRequiredLib$2) return lib$2;
    hasRequiredLib$2 = 1;
    var LRUCache = require$$0$1.LRUCache;
    var hosts = requireHosts();
    var fromUrl = requireFromUrl();
    var parseUrl = requireParseUrl();
    var cache = new LRUCache({
        max: 1000
    });
    var _fill = /*#__PURE__*/ new WeakSet();
    var GitHost = /*#__PURE__*/ function() {
        function GitHost(type, user, auth, project, committish, defaultRepresentation) {
            var opts = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
            _class_call_check$e(this, GitHost);
            _class_private_method_init$1(this, _fill);
            Object.assign(this, _class_static_private_field_spec_get(GitHost, GitHost, _gitHosts)[type], {
                type: type,
                user: user,
                auth: auth,
                project: project,
                committish: committish,
                default: defaultRepresentation,
                opts: opts
            });
        }
        var _proto = GitHost.prototype;
        _proto.hash = function hash() {
            return this.committish ? "#".concat(this.committish) : '';
        };
        _proto.ssh = function ssh(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.sshtemplate, opts);
        };
        _proto.sshurl = function sshurl(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.sshurltemplate, opts);
        };
        _proto.browse = function browse(path) {
            for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                args[_key - 1] = arguments[_key];
            }
            // not a string, treat path as opts
            if (typeof path !== 'string') {
                return _class_private_method_get$1(this, _fill, fill).call(this, this.browsetemplate, path);
            }
            if (typeof args[0] !== 'string') {
                return _class_private_method_get$1(this, _fill, fill).call(this, this.browsetreetemplate, _object_spread_props(_object_spread$1({}, args[0]), {
                    path: path
                }));
            }
            return _class_private_method_get$1(this, _fill, fill).call(this, this.browsetreetemplate, _object_spread_props(_object_spread$1({}, args[1]), {
                fragment: args[0],
                path: path
            }));
        };
        // If the path is known to be a file, then browseFile should be used. For some hosts
        // the url is the same as browse, but for others like GitHub a file can use both `/tree/`
        // and `/blob/` in the path. When using a default committish of `HEAD` then the `/tree/`
        // path will redirect to a specific commit. Using the `/blob/` path avoids this and
        // does not redirect to a different commit.
        _proto.browseFile = function browseFile(path) {
            for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                args[_key - 1] = arguments[_key];
            }
            if (typeof args[0] !== 'string') {
                return _class_private_method_get$1(this, _fill, fill).call(this, this.browseblobtemplate, _object_spread_props(_object_spread$1({}, args[0]), {
                    path: path
                }));
            }
            return _class_private_method_get$1(this, _fill, fill).call(this, this.browseblobtemplate, _object_spread_props(_object_spread$1({}, args[1]), {
                fragment: args[0],
                path: path
            }));
        };
        _proto.docs = function docs(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.docstemplate, opts);
        };
        _proto.bugs = function bugs(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.bugstemplate, opts);
        };
        _proto.https = function https(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.httpstemplate, opts);
        };
        _proto.git = function git(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.gittemplate, opts);
        };
        _proto.shortcut = function shortcut(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.shortcuttemplate, opts);
        };
        _proto.path = function path(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.pathtemplate, opts);
        };
        _proto.tarball = function tarball(opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.tarballtemplate, _object_spread_props(_object_spread$1({}, opts), {
                noCommittish: false
            }));
        };
        _proto.file = function file(path, opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.filetemplate, _object_spread_props(_object_spread$1({}, opts), {
                path: path
            }));
        };
        _proto.edit = function edit(path, opts) {
            return _class_private_method_get$1(this, _fill, fill).call(this, this.edittemplate, _object_spread_props(_object_spread$1({}, opts), {
                path: path
            }));
        };
        _proto.getDefaultRepresentation = function getDefaultRepresentation() {
            return this.default;
        };
        _proto.toString = function toString(opts) {
            if (this.default && typeof this[this.default] === 'function') {
                return this[this.default](opts);
            }
            return this.sshurl(opts);
        };
        GitHost.addHost = function addHost(name, host) {
            _class_static_private_field_spec_get(GitHost, GitHost, _gitHosts)[name] = host;
            _class_static_private_field_spec_get(GitHost, GitHost, _gitHosts).byDomain[host.domain] = name;
            _class_static_private_field_spec_get(GitHost, GitHost, _gitHosts).byShortcut["".concat(name, ":")] = name;
            _class_static_private_field_spec_get(GitHost, GitHost, _protocols)["".concat(name, ":")] = {
                name: name
            };
        };
        GitHost.fromUrl = function fromUrl1(giturl, opts) {
            if (typeof giturl !== 'string') {
                return;
            }
            var key = giturl + JSON.stringify(opts || {});
            if (!cache.has(key)) {
                var hostArgs = fromUrl(giturl, opts, {
                    gitHosts: _class_static_private_field_spec_get(GitHost, GitHost, _gitHosts),
                    protocols: _class_static_private_field_spec_get(GitHost, GitHost, _protocols)
                });
                cache.set(key, hostArgs ? _construct(GitHost, _to_consumable_array$5(hostArgs)) : undefined);
            }
            return cache.get(key);
        };
        GitHost.parseUrl = function parseUrl1(url) {
            return parseUrl(url);
        };
        return GitHost;
    }();
    var _gitHosts = {
        writable: true,
        value: {
            byShortcut: {},
            byDomain: {}
        }
    };
    var _protocols = {
        writable: true,
        value: {
            'git+ssh:': {
                name: 'sshurl'
            },
            'ssh:': {
                name: 'sshurl'
            },
            'git+https:': {
                name: 'https',
                auth: true
            },
            'git:': {
                auth: true
            },
            'http:': {
                auth: true
            },
            'https:': {
                auth: true
            },
            'git+http:': {
                auth: true
            }
        }
    };
    function fill(template, opts) {
        if (typeof template !== 'function') {
            return null;
        }
        var options = _object_spread$1({}, this, this.opts, opts);
        // the path should always be set so we don't end up with 'undefined' in urls
        if (!options.path) {
            options.path = '';
        }
        // template functions will insert the leading slash themselves
        if (options.path.startsWith('/')) {
            options.path = options.path.slice(1);
        }
        if (options.noCommittish) {
            options.committish = null;
        }
        var result = template(options);
        return options.noGitPlus && result.startsWith('git+') ? result.slice(4) : result;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(hosts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array$4(_step.value, 2), name = _step_value[0], host = _step_value[1];
            GitHost.addHost(name, host);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    lib$2 = GitHost;
    return lib$2;
}

var re = {
    exports: {}
};

var constants;
var hasRequiredConstants;
function requireConstants() {
    if (hasRequiredConstants) return constants;
    hasRequiredConstants = 1;
    // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.
    var SEMVER_SPEC_VERSION = '2.0.0';
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
    // Max safe segment length for coercion.
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    // Max safe length for a build identifier. The max length minus 6 characters for
    // the shortest version with a build 0.0.0+BUILD.
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
        'major',
        'premajor',
        'minor',
        'preminor',
        'patch',
        'prepatch',
        'prerelease'
    ];
    constants = {
        MAX_LENGTH: MAX_LENGTH,
        MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH,
        MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
        RELEASE_TYPES: RELEASE_TYPES,
        SEMVER_SPEC_VERSION: SEMVER_SPEC_VERSION,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
    return constants;
}

function _array_like_to_array$8(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$4(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$8(arr);
}
function _iterable_to_array$4(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread$4() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$4(arr) {
    return _array_without_holes$4(arr) || _iterable_to_array$4(arr) || _unsupported_iterable_to_array$8(arr) || _non_iterable_spread$4();
}
function _type_of$f(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$8(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$8(o, minLen);
}
var debug_1;
var hasRequiredDebug;
function requireDebug() {
    var _console;
    if (hasRequiredDebug) return debug_1;
    hasRequiredDebug = 1;
    var debug = (typeof process === "undefined" ? "undefined" : _type_of$f(process)) === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return (_console = console).error.apply(_console, [
            'SEMVER'
        ].concat(_to_consumable_array$4(args)));
    } : function() {};
    debug_1 = debug;
    return debug_1;
}

function _array_like_to_array$7(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$3(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit$3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$3(arr, i) {
    return _array_with_holes$3(arr) || _iterable_to_array_limit$3(arr, i) || _unsupported_iterable_to_array$7(arr, i) || _non_iterable_rest$3();
}
function _unsupported_iterable_to_array$7(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$7(o, minLen);
}
var hasRequiredRe;
function requireRe() {
    if (hasRequiredRe) return re.exports;
    hasRequiredRe = 1;
    (function(module, exports) {
        var _require$$0 = requireConstants(), MAX_SAFE_COMPONENT_LENGTH = _require$$0.MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH = _require$$0.MAX_SAFE_BUILD_LENGTH, MAX_LENGTH = _require$$0.MAX_LENGTH;
        var debug = requireDebug();
        exports = module.exports = {};
        // The actual regexps go on exports.re
        var re = exports.re = [];
        var safeRe = exports.safeRe = [];
        var src = exports.src = [];
        var t = exports.t = {};
        var R = 0;
        var LETTERDASHNUMBER = '[a-zA-Z0-9-]';
        // Replace some greedy regex tokens to prevent regex dos issues. These regex are
        // used internally via the safeRe object since all inputs in this library get
        // normalized first to trim and collapse all extra whitespace. The original
        // regexes are exported for userland consumption and lower level usage. A
        // future breaking change could export the safer regex only with a note that
        // all input should have extra whitespace removed.
        var safeRegexReplacements = [
            [
                '\\s',
                1
            ],
            [
                '\\d',
                MAX_LENGTH
            ],
            [
                LETTERDASHNUMBER,
                MAX_SAFE_BUILD_LENGTH
            ]
        ];
        var makeSafeRegex = function(value) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = safeRegexReplacements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var _step_value = _sliced_to_array$3(_step.value, 2), token = _step_value[0], max = _step_value[1];
                    value = value.split("".concat(token, "*")).join("".concat(token, "{0,").concat(max, "}")).split("".concat(token, "+")).join("".concat(token, "{1,").concat(max, "}"));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            return value;
        };
        var createToken = function(name, value, isGlobal) {
            var safe = makeSafeRegex(value);
            var index = R++;
            debug(name, index, value);
            t[name] = index;
            src[index] = value;
            re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
            safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
        };
        // The following Regular Expressions can be used for tokenizing,
        // validating, and parsing SemVer version strings.
        // ## Numeric Identifier
        // A single `0`, or a non-zero digit followed by zero or more digits.
        createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
        createToken('NUMERICIDENTIFIERLOOSE', '\\d+');
        // ## Non-numeric Identifier
        // Zero or more digits, followed by a letter or hyphen, and then zero or
        // more letters, digits, or hyphens.
        createToken('NONNUMERICIDENTIFIER', "\\d*[a-zA-Z-]".concat(LETTERDASHNUMBER, "*"));
        // ## Main Version
        // Three dot-separated numeric identifiers.
        createToken('MAINVERSION', "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")"));
        createToken('MAINVERSIONLOOSE', "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")"));
        // ## Pre-release Version Identifier
        // A numeric identifier, or a non-numeric identifier.
        createToken('PRERELEASEIDENTIFIER', "(?:".concat(src[t.NUMERICIDENTIFIER], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
        createToken('PRERELEASEIDENTIFIERLOOSE', "(?:".concat(src[t.NUMERICIDENTIFIERLOOSE], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
        // ## Pre-release Version
        // Hyphen, followed by one or more dot-separated pre-release version
        // identifiers.
        createToken('PRERELEASE', "(?:-(".concat(src[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIER], ")*))"));
        createToken('PRERELEASELOOSE', "(?:-?(".concat(src[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIERLOOSE], ")*))"));
        // ## Build Metadata Identifier
        // Any combination of digits, letters, or hyphens.
        createToken('BUILDIDENTIFIER', "".concat(LETTERDASHNUMBER, "+"));
        // ## Build Metadata
        // Plus sign, followed by one or more period-separated build metadata
        // identifiers.
        createToken('BUILD', "(?:\\+(".concat(src[t.BUILDIDENTIFIER], "(?:\\.").concat(src[t.BUILDIDENTIFIER], ")*))"));
        // ## Full Version String
        // A main version, followed optionally by a pre-release version and
        // build metadata.
        // Note that the only major, minor, patch, and pre-release sections of
        // the version string are capturing groups.  The build metadata is not a
        // capturing group, because it should not ever be used in version
        // comparison.
        createToken('FULLPLAIN', "v?".concat(src[t.MAINVERSION]).concat(src[t.PRERELEASE], "?").concat(src[t.BUILD], "?"));
        createToken('FULL', "^".concat(src[t.FULLPLAIN], "$"));
        // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
        // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
        // common in the npm registry.
        createToken('LOOSEPLAIN', "[v=\\s]*".concat(src[t.MAINVERSIONLOOSE]).concat(src[t.PRERELEASELOOSE], "?").concat(src[t.BUILD], "?"));
        createToken('LOOSE', "^".concat(src[t.LOOSEPLAIN], "$"));
        createToken('GTLT', '((?:<|>)?=?)');
        // Something like "2.*" or "1.2.x".
        // Note that "x.x" is a valid xRange identifer, meaning "any version"
        // Only the first item is strictly required.
        createToken('XRANGEIDENTIFIERLOOSE', "".concat(src[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
        createToken('XRANGEIDENTIFIER', "".concat(src[t.NUMERICIDENTIFIER], "|x|X|\\*"));
        createToken('XRANGEPLAIN', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:".concat(src[t.PRERELEASE], ")?").concat(src[t.BUILD], "?") + ")?)?");
        createToken('XRANGEPLAINLOOSE', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:".concat(src[t.PRERELEASELOOSE], ")?").concat(src[t.BUILD], "?") + ")?)?");
        createToken('XRANGE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAIN], "$"));
        createToken('XRANGELOOSE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAINLOOSE], "$"));
        // Coercion.
        // Extract anything that could conceivably be a part of a valid semver
        createToken('COERCEPLAIN', "".concat('(^|[^\\d])' + '(\\d{1,').concat(MAX_SAFE_COMPONENT_LENGTH, "})") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?"));
        createToken('COERCE', "".concat(src[t.COERCEPLAIN], "(?:$|[^\\d])"));
        createToken('COERCEFULL', src[t.COERCEPLAIN] + "(?:".concat(src[t.PRERELEASE], ")?") + "(?:".concat(src[t.BUILD], ")?") + "(?:$|[^\\d])");
        createToken('COERCERTL', src[t.COERCE], true);
        createToken('COERCERTLFULL', src[t.COERCEFULL], true);
        // Tilde ranges.
        // Meaning is "reasonably at or greater than"
        createToken('LONETILDE', '(?:~>?)');
        createToken('TILDETRIM', "(\\s*)".concat(src[t.LONETILDE], "\\s+"), true);
        exports.tildeTrimReplace = '$1~';
        createToken('TILDE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAIN], "$"));
        createToken('TILDELOOSE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAINLOOSE], "$"));
        // Caret ranges.
        // Meaning is "at least and backwards compatible with"
        createToken('LONECARET', '(?:\\^)');
        createToken('CARETTRIM', "(\\s*)".concat(src[t.LONECARET], "\\s+"), true);
        exports.caretTrimReplace = '$1^';
        createToken('CARET', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAIN], "$"));
        createToken('CARETLOOSE', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAINLOOSE], "$"));
        // A simple gt/lt/eq thing, or just "" to indicate "any version"
        createToken('COMPARATORLOOSE', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], ")$|^$"));
        createToken('COMPARATOR', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.FULLPLAIN], ")$|^$"));
        // An expression to strip any whitespace between the gtlt and the thing
        // it modifies, so that `> 1.2.3` ==> `>1.2.3`
        createToken('COMPARATORTRIM', "(\\s*)".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], "|").concat(src[t.XRANGEPLAIN], ")"), true);
        exports.comparatorTrimReplace = '$1$2$3';
        // Something like `1.2.3 - 1.2.4`
        // Note that these all use the loose form, because they'll be
        // checked against either the strict or loose comparator form
        // later.
        createToken('HYPHENRANGE', "^\\s*(".concat(src[t.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAIN], ")") + "\\s*$");
        createToken('HYPHENRANGELOOSE', "^\\s*(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s*$");
        // Star ranges basically just allow anything at all.
        createToken('STAR', '(<|>)?=?\\s*\\*');
        // >=0.0.0 is like a star
        createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
        createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
    })(re, re.exports);
    return re.exports;
}

function _type_of$e(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
    if (hasRequiredParseOptions) return parseOptions_1;
    hasRequiredParseOptions = 1;
    // parse out just the options we care about
    var looseOption = Object.freeze({
        loose: true
    });
    var emptyOpts = Object.freeze({});
    var parseOptions = function(options) {
        if (!options) {
            return emptyOpts;
        }
        if ((typeof options === "undefined" ? "undefined" : _type_of$e(options)) !== 'object') {
            return looseOption;
        }
        return options;
    };
    parseOptions_1 = parseOptions;
    return parseOptions_1;
}

var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
    if (hasRequiredIdentifiers) return identifiers;
    hasRequiredIdentifiers = 1;
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = function(a, b) {
        var anum = numeric.test(a);
        var bnum = numeric.test(b);
        if (anum && bnum) {
            a = +a;
            b = +b;
        }
        return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = function(a, b) {
        return compareIdentifiers(b, a);
    };
    identifiers = {
        compareIdentifiers: compareIdentifiers,
        rcompareIdentifiers: rcompareIdentifiers
    };
    return identifiers;
}

function _class_call_check$d(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _instanceof$9(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of$d(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var semver$1;
var hasRequiredSemver$1;
function requireSemver$1() {
    if (hasRequiredSemver$1) return semver$1;
    hasRequiredSemver$1 = 1;
    var debug = requireDebug();
    var _require$$1 = requireConstants(), MAX_LENGTH = _require$$1.MAX_LENGTH, MAX_SAFE_INTEGER = _require$$1.MAX_SAFE_INTEGER;
    var _require$$2 = requireRe(), re = _require$$2.safeRe, t = _require$$2.t;
    var parseOptions = requireParseOptions();
    var compareIdentifiers = requireIdentifiers().compareIdentifiers;
    var SemVer = /*#__PURE__*/ function() {
        function SemVer(version, options) {
            _class_call_check$d(this, SemVer);
            options = parseOptions(options);
            if (_instanceof$9(version, SemVer)) {
                if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
                    return version;
                } else {
                    version = version.version;
                }
            } else if (typeof version !== 'string') {
                throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof version === "undefined" ? "undefined" : _type_of$d(version), '".'));
            }
            if (version.length > MAX_LENGTH) {
                throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
            }
            debug('SemVer', version, options);
            this.options = options;
            this.loose = !!options.loose;
            // this isn't actually relevant for versions, but keep it so that we
            // don't run into trouble passing this.options around.
            this.includePrerelease = !!options.includePrerelease;
            var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
            if (!m) {
                throw new TypeError("Invalid Version: ".concat(version));
            }
            this.raw = version;
            // these are actually numbers
            this.major = +m[1];
            this.minor = +m[2];
            this.patch = +m[3];
            if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
                throw new TypeError('Invalid major version');
            }
            if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
                throw new TypeError('Invalid minor version');
            }
            if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
                throw new TypeError('Invalid patch version');
            }
            // numberify any prerelease numeric ids
            if (!m[4]) {
                this.prerelease = [];
            } else {
                this.prerelease = m[4].split('.').map(function(id) {
                    if (/^[0-9]+$/.test(id)) {
                        var num = +id;
                        if (num >= 0 && num < MAX_SAFE_INTEGER) {
                            return num;
                        }
                    }
                    return id;
                });
            }
            this.build = m[5] ? m[5].split('.') : [];
            this.format();
        }
        var _proto = SemVer.prototype;
        _proto.format = function format() {
            this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);
            if (this.prerelease.length) {
                this.version += "-".concat(this.prerelease.join('.'));
            }
            return this.version;
        };
        _proto.toString = function toString() {
            return this.version;
        };
        _proto.compare = function compare(other) {
            debug('SemVer.compare', this.version, this.options, other);
            if (!_instanceof$9(other, SemVer)) {
                if (typeof other === 'string' && other === this.version) {
                    return 0;
                }
                other = new SemVer(other, this.options);
            }
            if (other.version === this.version) {
                return 0;
            }
            return this.compareMain(other) || this.comparePre(other);
        };
        _proto.compareMain = function compareMain(other) {
            if (!_instanceof$9(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        };
        _proto.comparePre = function comparePre(other) {
            if (!_instanceof$9(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            // NOT having a prerelease is > having one
            if (this.prerelease.length && !other.prerelease.length) {
                return -1;
            } else if (!this.prerelease.length && other.prerelease.length) {
                return 1;
            } else if (!this.prerelease.length && !other.prerelease.length) {
                return 0;
            }
            var i = 0;
            do {
                var a = this.prerelease[i];
                var b = other.prerelease[i];
                debug('prerelease compare', i, a, b);
                if (a === undefined && b === undefined) {
                    return 0;
                } else if (b === undefined) {
                    return 1;
                } else if (a === undefined) {
                    return -1;
                } else if (a === b) {
                    continue;
                } else {
                    return compareIdentifiers(a, b);
                }
            }while (++i);
        };
        _proto.compareBuild = function compareBuild(other) {
            if (!_instanceof$9(other, SemVer)) {
                other = new SemVer(other, this.options);
            }
            var i = 0;
            do {
                var a = this.build[i];
                var b = other.build[i];
                debug('build compare', i, a, b);
                if (a === undefined && b === undefined) {
                    return 0;
                } else if (b === undefined) {
                    return 1;
                } else if (a === undefined) {
                    return -1;
                } else if (a === b) {
                    continue;
                } else {
                    return compareIdentifiers(a, b);
                }
            }while (++i);
        };
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        _proto.inc = function inc(release, identifier, identifierBase) {
            switch(release){
                case 'premajor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor = 0;
                    this.major++;
                    this.inc('pre', identifier, identifierBase);
                    break;
                case 'preminor':
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor++;
                    this.inc('pre', identifier, identifierBase);
                    break;
                case 'prepatch':
                    // If this is already a prerelease, it will bump to the next version
                    // drop any prereleases that might already exist, since they are not
                    // relevant at this point.
                    this.prerelease.length = 0;
                    this.inc('patch', identifier, identifierBase);
                    this.inc('pre', identifier, identifierBase);
                    break;
                // If the input is a non-prerelease version, this acts the same as
                // prepatch.
                case 'prerelease':
                    if (this.prerelease.length === 0) {
                        this.inc('patch', identifier, identifierBase);
                    }
                    this.inc('pre', identifier, identifierBase);
                    break;
                case 'major':
                    // If this is a pre-major version, bump up to the same major version.
                    // Otherwise increment major.
                    // 1.0.0-5 bumps to 1.0.0
                    // 1.1.0 bumps to 2.0.0
                    if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                        this.major++;
                    }
                    this.minor = 0;
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'minor':
                    // If this is a pre-minor version, bump up to the same minor version.
                    // Otherwise increment minor.
                    // 1.2.0-5 bumps to 1.2.0
                    // 1.2.1 bumps to 1.3.0
                    if (this.patch !== 0 || this.prerelease.length === 0) {
                        this.minor++;
                    }
                    this.patch = 0;
                    this.prerelease = [];
                    break;
                case 'patch':
                    // If this is not a pre-release version, it will increment the patch.
                    // If it is a pre-release it will bump up to the same patch version.
                    // 1.2.0-5 patches to 1.2.0
                    // 1.2.0 patches to 1.2.1
                    if (this.prerelease.length === 0) {
                        this.patch++;
                    }
                    this.prerelease = [];
                    break;
                // This probably shouldn't be used publicly.
                // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
                case 'pre':
                    {
                        var base = Number(identifierBase) ? 1 : 0;
                        if (!identifier && identifierBase === false) {
                            throw new Error('invalid increment argument: identifier is empty');
                        }
                        if (this.prerelease.length === 0) {
                            this.prerelease = [
                                base
                            ];
                        } else {
                            var i = this.prerelease.length;
                            while(--i >= 0){
                                if (typeof this.prerelease[i] === 'number') {
                                    this.prerelease[i]++;
                                    i = -2;
                                }
                            }
                            if (i === -1) {
                                // didn't increment anything
                                if (identifier === this.prerelease.join('.') && identifierBase === false) {
                                    throw new Error('invalid increment argument: identifier already exists');
                                }
                                this.prerelease.push(base);
                            }
                        }
                        if (identifier) {
                            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                            var prerelease = [
                                identifier,
                                base
                            ];
                            if (identifierBase === false) {
                                prerelease = [
                                    identifier
                                ];
                            }
                            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                                if (isNaN(this.prerelease[1])) {
                                    this.prerelease = prerelease;
                                }
                            } else {
                                this.prerelease = prerelease;
                            }
                        }
                        break;
                    }
                default:
                    throw new Error("invalid increment argument: ".concat(release));
            }
            this.raw = this.format();
            if (this.build.length) {
                this.raw += "+".concat(this.build.join('.'));
            }
            return this;
        };
        return SemVer;
    }();
    semver$1 = SemVer;
    return semver$1;
}

function _instanceof$8(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var parse_1;
var hasRequiredParse;
function requireParse() {
    if (hasRequiredParse) return parse_1;
    hasRequiredParse = 1;
    var SemVer = requireSemver$1();
    var parse = function(version, options) {
        var throwErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (_instanceof$8(version, SemVer)) {
            return version;
        }
        try {
            return new SemVer(version, options);
        } catch (er) {
            if (!throwErrors) {
                return null;
            }
            throw er;
        }
    };
    parse_1 = parse;
    return parse_1;
}

var valid_1;
var hasRequiredValid$1;
function requireValid$1() {
    if (hasRequiredValid$1) return valid_1;
    hasRequiredValid$1 = 1;
    var parse = requireParse();
    var valid = function(version, options) {
        var v = parse(version, options);
        return v ? v.version : null;
    };
    valid_1 = valid;
    return valid_1;
}

var clean_1;
var hasRequiredClean;
function requireClean() {
    if (hasRequiredClean) return clean_1;
    hasRequiredClean = 1;
    var parse = requireParse();
    var clean = function(version, options) {
        var s = parse(version.trim().replace(/^[=v]+/, ''), options);
        return s ? s.version : null;
    };
    clean_1 = clean;
    return clean_1;
}

function _instanceof$7(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var inc_1;
var hasRequiredInc;
function requireInc() {
    if (hasRequiredInc) return inc_1;
    hasRequiredInc = 1;
    var SemVer = requireSemver$1();
    var inc = function(version, release, options, identifier, identifierBase) {
        if (typeof options === 'string') {
            identifierBase = identifier;
            identifier = options;
            options = undefined;
        }
        try {
            return new SemVer(_instanceof$7(version, SemVer) ? version.version : version, options).inc(release, identifier, identifierBase).version;
        } catch (er) {
            return null;
        }
    };
    inc_1 = inc;
    return inc_1;
}

var diff_1;
var hasRequiredDiff;
function requireDiff() {
    if (hasRequiredDiff) return diff_1;
    hasRequiredDiff = 1;
    var parse = requireParse();
    var diff = function(version1, version2) {
        var v1 = parse(version1, null, true);
        var v2 = parse(version2, null, true);
        var comparison = v1.compare(v2);
        if (comparison === 0) {
            return null;
        }
        var v1Higher = comparison > 0;
        var highVersion = v1Higher ? v1 : v2;
        var lowVersion = v1Higher ? v2 : v1;
        var highHasPre = !!highVersion.prerelease.length;
        var lowHasPre = !!lowVersion.prerelease.length;
        if (lowHasPre && !highHasPre) {
            // Going from prerelease -> no prerelease requires some special casing
            // If the low version has only a major, then it will always be a major
            // Some examples:
            // 1.0.0-1 -> 1.0.0
            // 1.0.0-1 -> 1.1.1
            // 1.0.0-1 -> 2.0.0
            if (!lowVersion.patch && !lowVersion.minor) {
                return 'major';
            }
            // Otherwise it can be determined by checking the high version
            if (highVersion.patch) {
                // anything higher than a patch bump would result in the wrong version
                return 'patch';
            }
            if (highVersion.minor) {
                // anything higher than a minor bump would result in the wrong version
                return 'minor';
            }
            // bumping major/minor/patch all have same result
            return 'major';
        }
        // add the `pre` prefix if we are going to a prerelease version
        var prefix = highHasPre ? 'pre' : '';
        if (v1.major !== v2.major) {
            return prefix + 'major';
        }
        if (v1.minor !== v2.minor) {
            return prefix + 'minor';
        }
        if (v1.patch !== v2.patch) {
            return prefix + 'patch';
        }
        // high and low are preleases
        return 'prerelease';
    };
    diff_1 = diff;
    return diff_1;
}

var major_1;
var hasRequiredMajor;
function requireMajor() {
    if (hasRequiredMajor) return major_1;
    hasRequiredMajor = 1;
    var SemVer = requireSemver$1();
    var major = function(a, loose) {
        return new SemVer(a, loose).major;
    };
    major_1 = major;
    return major_1;
}

var minor_1;
var hasRequiredMinor;
function requireMinor() {
    if (hasRequiredMinor) return minor_1;
    hasRequiredMinor = 1;
    var SemVer = requireSemver$1();
    var minor = function(a, loose) {
        return new SemVer(a, loose).minor;
    };
    minor_1 = minor;
    return minor_1;
}

var patch_1;
var hasRequiredPatch;
function requirePatch() {
    if (hasRequiredPatch) return patch_1;
    hasRequiredPatch = 1;
    var SemVer = requireSemver$1();
    var patch = function(a, loose) {
        return new SemVer(a, loose).patch;
    };
    patch_1 = patch;
    return patch_1;
}

var prerelease_1;
var hasRequiredPrerelease;
function requirePrerelease() {
    if (hasRequiredPrerelease) return prerelease_1;
    hasRequiredPrerelease = 1;
    var parse = requireParse();
    var prerelease = function(version, options) {
        var parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    prerelease_1 = prerelease;
    return prerelease_1;
}

var compare_1;
var hasRequiredCompare;
function requireCompare() {
    if (hasRequiredCompare) return compare_1;
    hasRequiredCompare = 1;
    var SemVer = requireSemver$1();
    var compare = function(a, b, loose) {
        return new SemVer(a, loose).compare(new SemVer(b, loose));
    };
    compare_1 = compare;
    return compare_1;
}

var rcompare_1;
var hasRequiredRcompare;
function requireRcompare() {
    if (hasRequiredRcompare) return rcompare_1;
    hasRequiredRcompare = 1;
    var compare = requireCompare();
    var rcompare = function(a, b, loose) {
        return compare(b, a, loose);
    };
    rcompare_1 = rcompare;
    return rcompare_1;
}

var compareLoose_1;
var hasRequiredCompareLoose;
function requireCompareLoose() {
    if (hasRequiredCompareLoose) return compareLoose_1;
    hasRequiredCompareLoose = 1;
    var compare = requireCompare();
    var compareLoose = function(a, b) {
        return compare(a, b, true);
    };
    compareLoose_1 = compareLoose;
    return compareLoose_1;
}

var compareBuild_1;
var hasRequiredCompareBuild;
function requireCompareBuild() {
    if (hasRequiredCompareBuild) return compareBuild_1;
    hasRequiredCompareBuild = 1;
    var SemVer = requireSemver$1();
    var compareBuild = function(a, b, loose) {
        var versionA = new SemVer(a, loose);
        var versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    compareBuild_1 = compareBuild;
    return compareBuild_1;
}

var sort_1;
var hasRequiredSort;
function requireSort() {
    if (hasRequiredSort) return sort_1;
    hasRequiredSort = 1;
    var compareBuild = requireCompareBuild();
    var sort = function(list, loose) {
        return list.sort(function(a, b) {
            return compareBuild(a, b, loose);
        });
    };
    sort_1 = sort;
    return sort_1;
}

var rsort_1;
var hasRequiredRsort;
function requireRsort() {
    if (hasRequiredRsort) return rsort_1;
    hasRequiredRsort = 1;
    var compareBuild = requireCompareBuild();
    var rsort = function(list, loose) {
        return list.sort(function(a, b) {
            return compareBuild(b, a, loose);
        });
    };
    rsort_1 = rsort;
    return rsort_1;
}

var gt_1;
var hasRequiredGt;
function requireGt() {
    if (hasRequiredGt) return gt_1;
    hasRequiredGt = 1;
    var compare = requireCompare();
    var gt = function(a, b, loose) {
        return compare(a, b, loose) > 0;
    };
    gt_1 = gt;
    return gt_1;
}

var lt_1;
var hasRequiredLt;
function requireLt() {
    if (hasRequiredLt) return lt_1;
    hasRequiredLt = 1;
    var compare = requireCompare();
    var lt = function(a, b, loose) {
        return compare(a, b, loose) < 0;
    };
    lt_1 = lt;
    return lt_1;
}

var eq_1;
var hasRequiredEq;
function requireEq() {
    if (hasRequiredEq) return eq_1;
    hasRequiredEq = 1;
    var compare = requireCompare();
    var eq = function(a, b, loose) {
        return compare(a, b, loose) === 0;
    };
    eq_1 = eq;
    return eq_1;
}

var neq_1;
var hasRequiredNeq;
function requireNeq() {
    if (hasRequiredNeq) return neq_1;
    hasRequiredNeq = 1;
    var compare = requireCompare();
    var neq = function(a, b, loose) {
        return compare(a, b, loose) !== 0;
    };
    neq_1 = neq;
    return neq_1;
}

var gte_1;
var hasRequiredGte;
function requireGte() {
    if (hasRequiredGte) return gte_1;
    hasRequiredGte = 1;
    var compare = requireCompare();
    var gte = function(a, b, loose) {
        return compare(a, b, loose) >= 0;
    };
    gte_1 = gte;
    return gte_1;
}

var lte_1;
var hasRequiredLte;
function requireLte() {
    if (hasRequiredLte) return lte_1;
    hasRequiredLte = 1;
    var compare = requireCompare();
    var lte = function(a, b, loose) {
        return compare(a, b, loose) <= 0;
    };
    lte_1 = lte;
    return lte_1;
}

function _type_of$c(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var cmp_1;
var hasRequiredCmp;
function requireCmp() {
    if (hasRequiredCmp) return cmp_1;
    hasRequiredCmp = 1;
    var eq = requireEq();
    var neq = requireNeq();
    var gt = requireGt();
    var gte = requireGte();
    var lt = requireLt();
    var lte = requireLte();
    var cmp = function(a, op, b, loose) {
        switch(op){
            case '===':
                if ((typeof a === "undefined" ? "undefined" : _type_of$c(a)) === 'object') {
                    a = a.version;
                }
                if ((typeof b === "undefined" ? "undefined" : _type_of$c(b)) === 'object') {
                    b = b.version;
                }
                return a === b;
            case '!==':
                if ((typeof a === "undefined" ? "undefined" : _type_of$c(a)) === 'object') {
                    a = a.version;
                }
                if ((typeof b === "undefined" ? "undefined" : _type_of$c(b)) === 'object') {
                    b = b.version;
                }
                return a !== b;
            case '':
            case '=':
            case '==':
                return eq(a, b, loose);
            case '!=':
                return neq(a, b, loose);
            case '>':
                return gt(a, b, loose);
            case '>=':
                return gte(a, b, loose);
            case '<':
                return lt(a, b, loose);
            case '<=':
                return lte(a, b, loose);
            default:
                throw new TypeError("Invalid operator: ".concat(op));
        }
    };
    cmp_1 = cmp;
    return cmp_1;
}

function _instanceof$6(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var coerce_1;
var hasRequiredCoerce;
function requireCoerce() {
    if (hasRequiredCoerce) return coerce_1;
    hasRequiredCoerce = 1;
    var SemVer = requireSemver$1();
    var parse = requireParse();
    var _require$$2 = requireRe(), re = _require$$2.safeRe, t = _require$$2.t;
    var coerce = function(version, options) {
        if (_instanceof$6(version, SemVer)) {
            return version;
        }
        if (typeof version === 'number') {
            version = String(version);
        }
        if (typeof version !== 'string') {
            return null;
        }
        options = options || {};
        var match = null;
        if (!options.rtl) {
            match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
        } else {
            // Find the right-most coercible string that does not share
            // a terminus with a more left-ward coercible string.
            // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
            // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
            //
            // Walk through the string checking with a /g regexp
            // Manually set the index so as to pick up overlapping matches.
            // Stop when we get a match that ends at the string end, since no
            // coercible string can be more right-ward without the same terminus.
            var coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
            var next;
            while((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)){
                if (!match || next.index + next[0].length !== match.index + match[0].length) {
                    match = next;
                }
                coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
            }
            // leave it in a clean state
            coerceRtlRegex.lastIndex = -1;
        }
        if (match === null) {
            return null;
        }
        var major = match[2];
        var minor = match[3] || '0';
        var patch = match[4] || '0';
        var prerelease = options.includePrerelease && match[5] ? "-".concat(match[5]) : '';
        var build = options.includePrerelease && match[6] ? "+".concat(match[6]) : '';
        return parse("".concat(major, ".").concat(minor, ".").concat(patch).concat(prerelease).concat(build), options);
    };
    coerce_1 = coerce;
    return coerce_1;
}

function _class_call_check$c(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var lrucache;
var hasRequiredLrucache;
function requireLrucache() {
    if (hasRequiredLrucache) return lrucache;
    hasRequiredLrucache = 1;
    var LRUCache = /*#__PURE__*/ function() {
        function LRUCache() {
            _class_call_check$c(this, LRUCache);
            this.max = 1000;
            this.map = new Map();
        }
        var _proto = LRUCache.prototype;
        _proto.get = function get(key) {
            var value = this.map.get(key);
            if (value === undefined) {
                return undefined;
            } else {
                // Remove the key from the map and add it to the end
                this.map.delete(key);
                this.map.set(key, value);
                return value;
            }
        };
        _proto.delete = function _delete(key) {
            return this.map.delete(key);
        };
        _proto.set = function set(key, value) {
            var deleted = this.delete(key);
            if (!deleted && value !== undefined) {
                // If cache is full, delete the least recently used item
                if (this.map.size >= this.max) {
                    var firstKey = this.map.keys().next().value;
                    this.delete(firstKey);
                }
                this.map.set(key, value);
            }
            return this;
        };
        return LRUCache;
    }();
    lrucache = LRUCache;
    return lrucache;
}

function _array_like_to_array$6(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$3(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$6(arr);
}
function _class_call_check$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties$3(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class$3(Constructor, protoProps, staticProps) {
    _defineProperties$3(Constructor.prototype, protoProps);
    return Constructor;
}
function _instanceof$5(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array$3(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread$3() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$3(arr) {
    return _array_without_holes$3(arr) || _iterable_to_array$3(arr) || _unsupported_iterable_to_array$6(arr) || _non_iterable_spread$3();
}
function _unsupported_iterable_to_array$6(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$6(o, minLen);
}
var range;
var hasRequiredRange;
function requireRange() {
    if (hasRequiredRange) return range;
    hasRequiredRange = 1;
    var SPACE_CHARACTERS = /\s+/g;
    // hoisted class for cyclic dependency
    var Range = /*#__PURE__*/ function() {
        function Range(range, options) {
            var _this = this;
            _class_call_check$b(this, Range);
            options = parseOptions(options);
            if (_instanceof$5(range, Range)) {
                if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                    return range;
                } else {
                    return new Range(range.raw, options);
                }
            }
            if (_instanceof$5(range, Comparator)) {
                // just put it in the set and return
                this.raw = range.value;
                this.set = [
                    [
                        range
                    ]
                ];
                this.formatted = undefined;
                return this;
            }
            this.options = options;
            this.loose = !!options.loose;
            this.includePrerelease = !!options.includePrerelease;
            // First reduce all whitespace as much as possible so we do not have to rely
            // on potentially slow regexes like \s*. This is then stored and used for
            // future error messages as well.
            this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');
            // First, split on ||
            this.set = this.raw.split('||')// map the range to a 2d array of comparators
            .map(function(r) {
                return _this.parseRange(r.trim());
            })// throw out any comparator lists that are empty
            // this generally means that it was not a valid range, which is allowed
            // in loose mode, but will still throw if the WHOLE range is invalid.
            .filter(function(c) {
                return c.length;
            });
            if (!this.set.length) {
                throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
            }
            // if we have any that are not the null set, throw out null sets.
            if (this.set.length > 1) {
                // keep the first one, in case they're all null sets
                var first = this.set[0];
                this.set = this.set.filter(function(c) {
                    return !isNullSet(c[0]);
                });
                if (this.set.length === 0) {
                    this.set = [
                        first
                    ];
                } else if (this.set.length > 1) {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        // if we have any that are *, then the range is just *
                        for(var _iterator = this.set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var c = _step.value;
                            if (c.length === 1 && isAny(c[0])) {
                                this.set = [
                                    c
                                ];
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
            this.formatted = undefined;
        }
        var _proto = Range.prototype;
        _proto.format = function format() {
            return this.range;
        };
        _proto.toString = function toString() {
            return this.range;
        };
        _proto.parseRange = function parseRange(range) {
            var _this = this;
            // memoize range parsing for performance.
            // this is a very hot path, and fully deterministic.
            var memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
            var memoKey = memoOpts + ':' + range;
            var cached = cache.get(memoKey);
            if (cached) {
                return cached;
            }
            var loose = this.options.loose;
            // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
            var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
            range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
            debug('hyphen replace', range);
            // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
            range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
            debug('comparator trim', range);
            // `~ 1.2.3` => `~1.2.3`
            range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
            debug('tilde trim', range);
            // `^ 1.2.3` => `^1.2.3`
            range = range.replace(re[t.CARETTRIM], caretTrimReplace);
            debug('caret trim', range);
            // At this point, the range is completely trimmed and
            // ready to be split into comparators.
            var rangeList = range.split(' ').map(function(comp) {
                return parseComparator(comp, _this.options);
            }).join(' ').split(/\s+/)// >=0.0.0 is equivalent to *
            .map(function(comp) {
                return replaceGTE0(comp, _this.options);
            });
            if (loose) {
                // in loose mode, throw out any that are not valid comparators
                rangeList = rangeList.filter(function(comp) {
                    debug('loose invalid filter', comp, _this.options);
                    return !!comp.match(re[t.COMPARATORLOOSE]);
                });
            }
            debug('range list', rangeList);
            // if any comparators are the null set, then replace with JUST null set
            // if more than one comparator, remove any * comparators
            // also, don't include the same comparator more than once
            var rangeMap = new Map();
            var comparators = rangeList.map(function(comp) {
                return new Comparator(comp, _this.options);
            });
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = comparators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var comp = _step.value;
                    if (isNullSet(comp)) {
                        return [
                            comp
                        ];
                    }
                    rangeMap.set(comp.value, comp);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            if (rangeMap.size > 1 && rangeMap.has('')) {
                rangeMap.delete('');
            }
            var result = _to_consumable_array$3(rangeMap.values());
            cache.set(memoKey, result);
            return result;
        };
        _proto.intersects = function intersects(range, options) {
            if (!_instanceof$5(range, Range)) {
                throw new TypeError('a Range is required');
            }
            return this.set.some(function(thisComparators) {
                return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
                    return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
                        return rangeComparators.every(function(rangeComparator) {
                            return thisComparator.intersects(rangeComparator, options);
                        });
                    });
                });
            });
        };
        // if ANY of the sets match ALL of its comparators, then pass
        _proto.test = function test(version) {
            if (!version) {
                return false;
            }
            if (typeof version === 'string') {
                try {
                    version = new SemVer(version, this.options);
                } catch (er) {
                    return false;
                }
            }
            for(var i = 0; i < this.set.length; i++){
                if (testSet(this.set[i], version, this.options)) {
                    return true;
                }
            }
            return false;
        };
        _create_class$3(Range, [
            {
                key: "range",
                get: function get() {
                    if (this.formatted === undefined) {
                        this.formatted = '';
                        for(var i = 0; i < this.set.length; i++){
                            if (i > 0) {
                                this.formatted += '||';
                            }
                            var comps = this.set[i];
                            for(var k = 0; k < comps.length; k++){
                                if (k > 0) {
                                    this.formatted += ' ';
                                }
                                this.formatted += comps[k].toString().trim();
                            }
                        }
                    }
                    return this.formatted;
                }
            }
        ]);
        return Range;
    }();
    range = Range;
    var LRU = requireLrucache();
    var cache = new LRU();
    var parseOptions = requireParseOptions();
    var Comparator = requireComparator();
    var debug = requireDebug();
    var SemVer = requireSemver$1();
    var _require$$5 = requireRe(), re = _require$$5.safeRe, t = _require$$5.t, comparatorTrimReplace = _require$$5.comparatorTrimReplace, tildeTrimReplace = _require$$5.tildeTrimReplace, caretTrimReplace = _require$$5.caretTrimReplace;
    var _require$$6 = requireConstants(), FLAG_INCLUDE_PRERELEASE = _require$$6.FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE = _require$$6.FLAG_LOOSE;
    var isNullSet = function(c) {
        return c.value === '<0.0.0-0';
    };
    var isAny = function(c) {
        return c.value === '';
    };
    // take a set of comparators and determine whether there
    // exists a version which can satisfy it
    var isSatisfiable = function(comparators, options) {
        var result = true;
        var remainingComparators = comparators.slice();
        var testComparator = remainingComparators.pop();
        while(result && remainingComparators.length){
            result = remainingComparators.every(function(otherComparator) {
                return testComparator.intersects(otherComparator, options);
            });
            testComparator = remainingComparators.pop();
        }
        return result;
    };
    // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.
    var parseComparator = function(comp, options) {
        debug('comp', comp, options);
        comp = replaceCarets(comp, options);
        debug('caret', comp);
        comp = replaceTildes(comp, options);
        debug('tildes', comp);
        comp = replaceXRanges(comp, options);
        debug('xrange', comp);
        comp = replaceStars(comp, options);
        debug('stars', comp);
        return comp;
    };
    var isX = function(id) {
        return !id || id.toLowerCase() === 'x' || id === '*';
    };
    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
    // ~0.0.1 --> >=0.0.1 <0.1.0-0
    var replaceTildes = function(comp, options) {
        return comp.trim().split(/\s+/).map(function(c) {
            return replaceTilde(c, options);
        }).join(' ');
    };
    var replaceTilde = function(comp, options) {
        var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
        return comp.replace(r, function(_, M, m, p, pr) {
            debug('tilde', comp, _, M, m, p, pr);
            var ret;
            if (isX(M)) {
                ret = '';
            } else if (isX(m)) {
                ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
            } else if (isX(p)) {
                // ~1.2 == >=1.2.0 <1.3.0-0
                ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
            } else if (pr) {
                debug('replaceTilde pr', pr);
                ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
            } else {
                // ~1.2.3 == >=1.2.3 <1.3.0-0
                ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
            debug('tilde return', ret);
            return ret;
        });
    };
    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    // ^1.2.3 --> >=1.2.3 <2.0.0-0
    // ^1.2.0 --> >=1.2.0 <2.0.0-0
    // ^0.0.1 --> >=0.0.1 <0.0.2-0
    // ^0.1.0 --> >=0.1.0 <0.2.0-0
    var replaceCarets = function(comp, options) {
        return comp.trim().split(/\s+/).map(function(c) {
            return replaceCaret(c, options);
        }).join(' ');
    };
    var replaceCaret = function(comp, options) {
        debug('caret', comp, options);
        var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
        var z = options.includePrerelease ? '-0' : '';
        return comp.replace(r, function(_, M, m, p, pr) {
            debug('caret', comp, _, M, m, p, pr);
            var ret;
            if (isX(M)) {
                ret = '';
            } else if (isX(m)) {
                ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
            } else if (isX(p)) {
                if (M === '0') {
                    ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
                } else {
                    ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
                }
            } else if (pr) {
                debug('replaceCaret pr', pr);
                if (M === '0') {
                    if (m === '0') {
                        ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
                    } else {
                        ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
                    }
                } else {
                    ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
                }
            } else {
                debug('no pr');
                if (M === '0') {
                    if (m === '0') {
                        ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
                    } else {
                        ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
                    }
                } else {
                    ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
                }
            }
            debug('caret return', ret);
            return ret;
        });
    };
    var replaceXRanges = function(comp, options) {
        debug('replaceXRanges', comp, options);
        return comp.split(/\s+/).map(function(c) {
            return replaceXRange(c, options);
        }).join(' ');
    };
    var replaceXRange = function(comp, options) {
        comp = comp.trim();
        var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
        return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
            debug('xRange', comp, ret, gtlt, M, m, p, pr);
            var xM = isX(M);
            var xm = xM || isX(m);
            var xp = xm || isX(p);
            var anyX = xp;
            if (gtlt === '=' && anyX) {
                gtlt = '';
            }
            // if we're including prereleases in the match, then we need
            // to fix this to -0, the lowest possible prerelease value
            pr = options.includePrerelease ? '-0' : '';
            if (xM) {
                if (gtlt === '>' || gtlt === '<') {
                    // nothing is allowed
                    ret = '<0.0.0-0';
                } else {
                    // nothing is forbidden
                    ret = '*';
                }
            } else if (gtlt && anyX) {
                // we know patch is an x, because we have any x at all.
                // replace X with 0
                if (xm) {
                    m = 0;
                }
                p = 0;
                if (gtlt === '>') {
                    // >1 => >=2.0.0
                    // >1.2 => >=1.3.0
                    gtlt = '>=';
                    if (xm) {
                        M = +M + 1;
                        m = 0;
                        p = 0;
                    } else {
                        m = +m + 1;
                        p = 0;
                    }
                } else if (gtlt === '<=') {
                    // <=0.7.x is actually <0.8.0, since any 0.7.x should
                    // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                    gtlt = '<';
                    if (xm) {
                        M = +M + 1;
                    } else {
                        m = +m + 1;
                    }
                }
                if (gtlt === '<') {
                    pr = '-0';
                }
                ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
            } else if (xm) {
                ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
            } else if (xp) {
                ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
            debug('xRange return', ret);
            return ret;
        });
    };
    // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.
    var replaceStars = function(comp, options) {
        debug('replaceStars', comp, options);
        // Looseness is ignored here.  star is always as loose as it gets!
        return comp.trim().replace(re[t.STAR], '');
    };
    var replaceGTE0 = function(comp, options) {
        debug('replaceGTE0', comp, options);
        return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
    };
    // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0-0
    // TODO build?
    var hyphenReplace = function(incPr) {
        return function($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) {
            if (isX(fM)) {
                from = '';
            } else if (isX(fm)) {
                from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
            } else if (isX(fp)) {
                from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
            } else if (fpr) {
                from = ">=".concat(from);
            } else {
                from = ">=".concat(from).concat(incPr ? '-0' : '');
            }
            if (isX(tM)) {
                to = '';
            } else if (isX(tm)) {
                to = "<".concat(+tM + 1, ".0.0-0");
            } else if (isX(tp)) {
                to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
            } else if (tpr) {
                to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
            } else if (incPr) {
                to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
            } else {
                to = "<=".concat(to);
            }
            return "".concat(from, " ").concat(to).trim();
        };
    };
    var testSet = function(set, version, options) {
        for(var i = 0; i < set.length; i++){
            if (!set[i].test(version)) {
                return false;
            }
        }
        if (version.prerelease.length && !options.includePrerelease) {
            // Find the set of versions that are allowed to have prereleases
            // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
            // That should allow `1.2.3-pr.2` to pass.
            // However, `1.2.4-alpha.notready` should NOT be allowed,
            // even though it's within the range set by the comparators.
            for(var i1 = 0; i1 < set.length; i1++){
                debug(set[i1].semver);
                if (set[i1].semver === Comparator.ANY) {
                    continue;
                }
                if (set[i1].semver.prerelease.length > 0) {
                    var allowed = set[i1].semver;
                    if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                        return true;
                    }
                }
            }
            // Version has a -pre, but it's not one of the ones we like.
            return false;
        }
        return true;
    };
    return range;
}

function _class_call_check$a(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties$2(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class$2(Constructor, protoProps, staticProps) {
    _defineProperties$2(Constructor, staticProps);
    return Constructor;
}
function _instanceof$4(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
    if (hasRequiredComparator) return comparator;
    hasRequiredComparator = 1;
    var ANY = Symbol('SemVer ANY');
    // hoisted class for cyclic dependency
    var Comparator = /*#__PURE__*/ function() {
        function Comparator(comp, options) {
            _class_call_check$a(this, Comparator);
            options = parseOptions(options);
            if (_instanceof$4(comp, Comparator)) {
                if (comp.loose === !!options.loose) {
                    return comp;
                } else {
                    comp = comp.value;
                }
            }
            comp = comp.trim().split(/\s+/).join(' ');
            debug('comparator', comp, options);
            this.options = options;
            this.loose = !!options.loose;
            this.parse(comp);
            if (this.semver === ANY) {
                this.value = '';
            } else {
                this.value = this.operator + this.semver.version;
            }
            debug('comp', this);
        }
        var _proto = Comparator.prototype;
        _proto.parse = function parse(comp) {
            var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
            var m = comp.match(r);
            if (!m) {
                throw new TypeError("Invalid comparator: ".concat(comp));
            }
            this.operator = m[1] !== undefined ? m[1] : '';
            if (this.operator === '=') {
                this.operator = '';
            }
            // if it literally is just '>' or '' then allow anything.
            if (!m[2]) {
                this.semver = ANY;
            } else {
                this.semver = new SemVer(m[2], this.options.loose);
            }
        };
        _proto.toString = function toString() {
            return this.value;
        };
        _proto.test = function test(version) {
            debug('Comparator.test', version, this.options.loose);
            if (this.semver === ANY || version === ANY) {
                return true;
            }
            if (typeof version === 'string') {
                try {
                    version = new SemVer(version, this.options);
                } catch (er) {
                    return false;
                }
            }
            return cmp(version, this.operator, this.semver, this.options);
        };
        _proto.intersects = function intersects(comp, options) {
            if (!_instanceof$4(comp, Comparator)) {
                throw new TypeError('a Comparator is required');
            }
            if (this.operator === '') {
                if (this.value === '') {
                    return true;
                }
                return new Range(comp.value, options).test(this.value);
            } else if (comp.operator === '') {
                if (comp.value === '') {
                    return true;
                }
                return new Range(this.value, options).test(comp.semver);
            }
            options = parseOptions(options);
            // Special cases where nothing can possibly be lower
            if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
                return false;
            }
            if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
                return false;
            }
            // Same direction increasing (> or >=)
            if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
                return true;
            }
            // Same direction decreasing (< or <=)
            if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
                return true;
            }
            // same SemVer and both sides are inclusive (<= or >=)
            if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
                return true;
            }
            // opposite directions less than
            if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
                return true;
            }
            // opposite directions greater than
            if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
                return true;
            }
            return false;
        };
        _create_class$2(Comparator, null, [
            {
                key: "ANY",
                get: function get() {
                    return ANY;
                }
            }
        ]);
        return Comparator;
    }();
    comparator = Comparator;
    var parseOptions = requireParseOptions();
    var _require$$1 = requireRe(), re = _require$$1.safeRe, t = _require$$1.t;
    var cmp = requireCmp();
    var debug = requireDebug();
    var SemVer = requireSemver$1();
    var Range = requireRange();
    return comparator;
}

var satisfies_1;
var hasRequiredSatisfies;
function requireSatisfies() {
    if (hasRequiredSatisfies) return satisfies_1;
    hasRequiredSatisfies = 1;
    var Range = requireRange();
    var satisfies = function(version, range, options) {
        try {
            range = new Range(range, options);
        } catch (er) {
            return false;
        }
        return range.test(version);
    };
    satisfies_1 = satisfies;
    return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;
function requireToComparators() {
    if (hasRequiredToComparators) return toComparators_1;
    hasRequiredToComparators = 1;
    var Range = requireRange();
    // Mostly just for testing and legacy API reasons
    var toComparators = function(range, options) {
        return new Range(range, options).set.map(function(comp) {
            return comp.map(function(c) {
                return c.value;
            }).join(' ').trim().split(' ');
        });
    };
    toComparators_1 = toComparators;
    return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
    if (hasRequiredMaxSatisfying) return maxSatisfying_1;
    hasRequiredMaxSatisfying = 1;
    var SemVer = requireSemver$1();
    var Range = requireRange();
    var maxSatisfying = function(versions, range, options) {
        var max = null;
        var maxSV = null;
        var rangeObj = null;
        try {
            rangeObj = new Range(range, options);
        } catch (er) {
            return null;
        }
        versions.forEach(function(v) {
            if (rangeObj.test(v)) {
                // satisfies(v, range, options)
                if (!max || maxSV.compare(v) === -1) {
                    // compare(max, v, true)
                    max = v;
                    maxSV = new SemVer(max, options);
                }
            }
        });
        return max;
    };
    maxSatisfying_1 = maxSatisfying;
    return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;
function requireMinSatisfying() {
    if (hasRequiredMinSatisfying) return minSatisfying_1;
    hasRequiredMinSatisfying = 1;
    var SemVer = requireSemver$1();
    var Range = requireRange();
    var minSatisfying = function(versions, range, options) {
        var min = null;
        var minSV = null;
        var rangeObj = null;
        try {
            rangeObj = new Range(range, options);
        } catch (er) {
            return null;
        }
        versions.forEach(function(v) {
            if (rangeObj.test(v)) {
                // satisfies(v, range, options)
                if (!min || minSV.compare(v) === 1) {
                    // compare(min, v, true)
                    min = v;
                    minSV = new SemVer(min, options);
                }
            }
        });
        return min;
    };
    minSatisfying_1 = minSatisfying;
    return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;
function requireMinVersion() {
    if (hasRequiredMinVersion) return minVersion_1;
    hasRequiredMinVersion = 1;
    var SemVer = requireSemver$1();
    var Range = requireRange();
    var gt = requireGt();
    var minVersion = function(range, loose) {
        var _loop = function(i) {
            var comparators = range.set[i];
            var setMin = null;
            comparators.forEach(function(comparator) {
                // Clone to avoid manipulating the comparator's semver object.
                var compver = new SemVer(comparator.semver.version);
                switch(comparator.operator){
                    case '>':
                        if (compver.prerelease.length === 0) {
                            compver.patch++;
                        } else {
                            compver.prerelease.push(0);
                        }
                        compver.raw = compver.format();
                    /* fallthrough */ case '':
                    case '>=':
                        if (!setMin || gt(compver, setMin)) {
                            setMin = compver;
                        }
                        break;
                    case '<':
                    case '<=':
                        break;
                    /* istanbul ignore next */ default:
                        throw new Error("Unexpected operation: ".concat(comparator.operator));
                }
            });
            if (setMin && (!minver || gt(minver, setMin))) {
                minver = setMin;
            }
        };
        range = new Range(range, loose);
        var minver = new SemVer('0.0.0');
        if (range.test(minver)) {
            return minver;
        }
        minver = new SemVer('0.0.0-0');
        if (range.test(minver)) {
            return minver;
        }
        minver = null;
        for(var i = 0; i < range.set.length; ++i)_loop(i);
        if (minver && range.test(minver)) {
            return minver;
        }
        return null;
    };
    minVersion_1 = minVersion;
    return minVersion_1;
}

var valid;
var hasRequiredValid;
function requireValid() {
    if (hasRequiredValid) return valid;
    hasRequiredValid = 1;
    var Range = requireRange();
    var validRange = function(range, options) {
        try {
            // Return '*' instead of '' so that truthiness works.
            // This will throw if it's invalid anyway
            return new Range(range, options).range || '*';
        } catch (er) {
            return null;
        }
    };
    valid = validRange;
    return valid;
}

function _type_of$b(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var outside_1;
var hasRequiredOutside;
function requireOutside() {
    if (hasRequiredOutside) return outside_1;
    hasRequiredOutside = 1;
    var SemVer = requireSemver$1();
    var Comparator = requireComparator();
    var ANY = Comparator.ANY;
    var Range = requireRange();
    var satisfies = requireSatisfies();
    var gt = requireGt();
    var lt = requireLt();
    var lte = requireLte();
    var gte = requireGte();
    var outside = function(version, range, hilo, options) {
        var _loop = function(i) {
            var comparators = range.set[i];
            var high = null;
            var low = null;
            comparators.forEach(function(comparator) {
                if (comparator.semver === ANY) {
                    comparator = new Comparator('>=0.0.0');
                }
                high = high || comparator;
                low = low || comparator;
                if (gtfn(comparator.semver, high.semver, options)) {
                    high = comparator;
                } else if (ltfn(comparator.semver, low.semver, options)) {
                    low = comparator;
                }
            });
            // If the edge version comparator has a operator then our version
            // isn't outside it
            if (high.operator === comp || high.operator === ecomp) {
                return {
                    v: false
                };
            }
            // If the lowest version comparator has an operator and our version
            // is less than it then it isn't higher than the range
            if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
                return {
                    v: false
                };
            } else if (low.operator === ecomp && ltfn(version, low.semver)) {
                return {
                    v: false
                };
            }
        };
        version = new SemVer(version, options);
        range = new Range(range, options);
        var gtfn, ltefn, ltfn, comp, ecomp;
        switch(hilo){
            case '>':
                gtfn = gt;
                ltefn = lte;
                ltfn = lt;
                comp = '>';
                ecomp = '>=';
                break;
            case '<':
                gtfn = lt;
                ltefn = gte;
                ltfn = gt;
                comp = '<';
                ecomp = '<=';
                break;
            default:
                throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        // If it satisfies the range it is not outside
        if (satisfies(version, range, options)) {
            return false;
        }
        // From now on, variable terms are as if we're in "gtr" mode.
        // but note that everything is flipped for the "ltr" function.
        for(var i = 0; i < range.set.length; ++i){
            var _ret = _loop(i);
            if (_type_of$b(_ret) === "object") return _ret.v;
        }
        return true;
    };
    outside_1 = outside;
    return outside_1;
}

var gtr_1;
var hasRequiredGtr;
function requireGtr() {
    if (hasRequiredGtr) return gtr_1;
    hasRequiredGtr = 1;
    // Determine if version is greater than all the versions possible in the range.
    var outside = requireOutside();
    var gtr = function(version, range, options) {
        return outside(version, range, '>', options);
    };
    gtr_1 = gtr;
    return gtr_1;
}

var ltr_1;
var hasRequiredLtr;
function requireLtr() {
    if (hasRequiredLtr) return ltr_1;
    hasRequiredLtr = 1;
    var outside = requireOutside();
    // Determine if version is less than all the versions possible in the range
    var ltr = function(version, range, options) {
        return outside(version, range, '<', options);
    };
    ltr_1 = ltr;
    return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;
function requireIntersects() {
    if (hasRequiredIntersects) return intersects_1;
    hasRequiredIntersects = 1;
    var Range = requireRange();
    var intersects = function(r1, r2, options) {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2, options);
    };
    intersects_1 = intersects;
    return intersects_1;
}

function _array_like_to_array$5(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$2(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit$2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$2(arr, i) {
    return _array_with_holes$2(arr) || _iterable_to_array_limit$2(arr, i) || _unsupported_iterable_to_array$5(arr, i) || _non_iterable_rest$2();
}
function _unsupported_iterable_to_array$5(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$5(o, minLen);
}
var simplify;
var hasRequiredSimplify;
function requireSimplify() {
    if (hasRequiredSimplify) return simplify;
    hasRequiredSimplify = 1;
    // given a set of versions and a range, create a "simplified" range
    // that includes the same versions that the original range does
    // If the original range is shorter than the simplified one, return that.
    var satisfies = requireSatisfies();
    var compare = requireCompare();
    simplify = function(versions, range, options) {
        var set = [];
        var first = null;
        var prev = null;
        var v = versions.sort(function(a, b) {
            return compare(a, b, options);
        });
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var version = _step.value;
                var included = satisfies(version, range, options);
                if (included) {
                    prev = version;
                    if (!first) {
                        first = version;
                    }
                } else {
                    if (prev) {
                        set.push([
                            first,
                            prev
                        ]);
                    }
                    prev = null;
                    first = null;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (first) {
            set.push([
                first,
                null
            ]);
        }
        var ranges = [];
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = set[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var _step_value = _sliced_to_array$2(_step1.value, 2), min = _step_value[0], max = _step_value[1];
                if (min === max) {
                    ranges.push(min);
                } else if (!max && min === v[0]) {
                    ranges.push('*');
                } else if (!max) {
                    ranges.push(">=".concat(min));
                } else if (min === v[0]) {
                    ranges.push("<=".concat(max));
                } else {
                    ranges.push("".concat(min, " - ").concat(max));
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        var simplified = ranges.join(' || ');
        var original = typeof range.raw === 'string' ? range.raw : String(range);
        return simplified.length < original.length ? simplified : range;
    };
    return simplify;
}

var subset_1;
var hasRequiredSubset;
function requireSubset() {
    if (hasRequiredSubset) return subset_1;
    hasRequiredSubset = 1;
    var Range = requireRange();
    var Comparator = requireComparator();
    var ANY = Comparator.ANY;
    var satisfies = requireSatisfies();
    var compare = requireCompare();
    // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
    // - Every simple range `r1, r2, ...` is a null set, OR
    // - Every simple range `r1, r2, ...` which is not a null set is a subset of
    //   some `R1, R2, ...`
    //
    // Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
    // - If c is only the ANY comparator
    //   - If C is only the ANY comparator, return true
    //   - Else if in prerelease mode, return false
    //   - else replace c with `[>=0.0.0]`
    // - If C is only the ANY comparator
    //   - if in prerelease mode, return true
    //   - else replace C with `[>=0.0.0]`
    // - Let EQ be the set of = comparators in c
    // - If EQ is more than one, return true (null set)
    // - Let GT be the highest > or >= comparator in c
    // - Let LT be the lowest < or <= comparator in c
    // - If GT and LT, and GT.semver > LT.semver, return true (null set)
    // - If any C is a = range, and GT or LT are set, return false
    // - If EQ
    //   - If GT, and EQ does not satisfy GT, return true (null set)
    //   - If LT, and EQ does not satisfy LT, return true (null set)
    //   - If EQ satisfies every C, return true
    //   - Else return false
    // - If GT
    //   - If GT.semver is lower than any > or >= comp in C, return false
    //   - If GT is >=, and GT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the GT.semver tuple, return false
    // - If LT
    //   - If LT.semver is greater than any < or <= comp in C, return false
    //   - If LT is <=, and LT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the LT.semver tuple, return false
    // - Else return true
    var subset = function(sub, dom) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (sub === dom) {
            return true;
        }
        sub = new Range(sub, options);
        dom = new Range(dom, options);
        var sawNonNull = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            OUTER: for(var _iterator = sub.set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var simpleSub = _step.value;
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = dom.set[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var simpleDom = _step1.value;
                        var isSub = simpleSubset(simpleSub, simpleDom, options);
                        sawNonNull = sawNonNull || isSub !== null;
                        if (isSub) {
                            continue OUTER;
                        }
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                // the null set is a subset of everything, but null simple ranges in
                // a complex range should be ignored.  so if we saw a non-null range,
                // then we know this isn't a subset, but if EVERY simple range was null,
                // then it is a subset.
                if (sawNonNull) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return true;
    };
    var minimumVersionWithPreRelease = [
        new Comparator('>=0.0.0-0')
    ];
    var minimumVersion = [
        new Comparator('>=0.0.0')
    ];
    var simpleSubset = function(sub, dom, options) {
        if (sub === dom) {
            return true;
        }
        if (sub.length === 1 && sub[0].semver === ANY) {
            if (dom.length === 1 && dom[0].semver === ANY) {
                return true;
            } else if (options.includePrerelease) {
                sub = minimumVersionWithPreRelease;
            } else {
                sub = minimumVersion;
            }
        }
        if (dom.length === 1 && dom[0].semver === ANY) {
            if (options.includePrerelease) {
                return true;
            } else {
                dom = minimumVersion;
            }
        }
        var eqSet = new Set();
        var gt, lt;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = sub[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var c = _step.value;
                if (c.operator === '>' || c.operator === '>=') {
                    gt = higherGT(gt, c, options);
                } else if (c.operator === '<' || c.operator === '<=') {
                    lt = lowerLT(lt, c, options);
                } else {
                    eqSet.add(c.semver);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (eqSet.size > 1) {
            return null;
        }
        var gtltComp;
        if (gt && lt) {
            gtltComp = compare(gt.semver, lt.semver, options);
            if (gtltComp > 0) {
                return null;
            } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
                return null;
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            // will iterate one or zero times
            for(var _iterator1 = eqSet[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var eq = _step1.value;
                if (gt && !satisfies(eq, String(gt), options)) {
                    return null;
                }
                if (lt && !satisfies(eq, String(lt), options)) {
                    return null;
                }
                var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                try {
                    for(var _iterator2 = dom[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                        var c1 = _step2.value;
                        if (!satisfies(eq, String(c1), options)) {
                            return false;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                        }
                    } finally{
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
                return true;
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        var higher, lower;
        var hasDomLT, hasDomGT;
        // if the subset has a prerelease, we need a comparator in the superset
        // with the same tuple and a prerelease, or it's not a subset
        var needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
        var needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
        // exception: <1.2.3-0 is the same as <1.2.3
        if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
            needDomLTPre = false;
        }
        var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
        try {
            for(var _iterator3 = dom[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                var c2 = _step3.value;
                hasDomGT = hasDomGT || c2.operator === '>' || c2.operator === '>=';
                hasDomLT = hasDomLT || c2.operator === '<' || c2.operator === '<=';
                if (gt) {
                    if (needDomGTPre) {
                        if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomGTPre.major && c2.semver.minor === needDomGTPre.minor && c2.semver.patch === needDomGTPre.patch) {
                            needDomGTPre = false;
                        }
                    }
                    if (c2.operator === '>' || c2.operator === '>=') {
                        higher = higherGT(gt, c2, options);
                        if (higher === c2 && higher !== gt) {
                            return false;
                        }
                    } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c2), options)) {
                        return false;
                    }
                }
                if (lt) {
                    if (needDomLTPre) {
                        if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomLTPre.major && c2.semver.minor === needDomLTPre.minor && c2.semver.patch === needDomLTPre.patch) {
                            needDomLTPre = false;
                        }
                    }
                    if (c2.operator === '<' || c2.operator === '<=') {
                        lower = lowerLT(lt, c2, options);
                        if (lower === c2 && lower !== lt) {
                            return false;
                        }
                    } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c2), options)) {
                        return false;
                    }
                }
                if (!c2.operator && (lt || gt) && gtltComp !== 0) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                }
            } finally{
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
        // if there was a < or >, and nothing in the dom, then must be false
        // UNLESS it was limited by another range in the other direction.
        // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
        if (gt && hasDomLT && !lt && gtltComp !== 0) {
            return false;
        }
        if (lt && hasDomGT && !gt && gtltComp !== 0) {
            return false;
        }
        // we needed a prerelease range in a specific tuple, but didn't get one
        // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
        // because it includes prereleases in the 1.2.3 tuple
        if (needDomGTPre || needDomLTPre) {
            return false;
        }
        return true;
    };
    // >=1.2.3 is lower than >1.2.3
    var higherGT = function(a, b, options) {
        if (!a) {
            return b;
        }
        var comp = compare(a.semver, b.semver, options);
        return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
    };
    // <=1.2.3 is higher than <1.2.3
    var lowerLT = function(a, b, options) {
        if (!a) {
            return b;
        }
        var comp = compare(a.semver, b.semver, options);
        return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
    };
    subset_1 = subset;
    return subset_1;
}

var semver;
var hasRequiredSemver;
function requireSemver() {
    if (hasRequiredSemver) return semver;
    hasRequiredSemver = 1;
    // just pre-load all the stuff that index.js lazily exports
    var internalRe = requireRe();
    var constants = requireConstants();
    var SemVer = requireSemver$1();
    var identifiers = requireIdentifiers();
    var parse = requireParse();
    var valid = requireValid$1();
    var clean = requireClean();
    var inc = requireInc();
    var diff = requireDiff();
    var major = requireMajor();
    var minor = requireMinor();
    var patch = requirePatch();
    var prerelease = requirePrerelease();
    var compare = requireCompare();
    var rcompare = requireRcompare();
    var compareLoose = requireCompareLoose();
    var compareBuild = requireCompareBuild();
    var sort = requireSort();
    var rsort = requireRsort();
    var gt = requireGt();
    var lt = requireLt();
    var eq = requireEq();
    var neq = requireNeq();
    var gte = requireGte();
    var lte = requireLte();
    var cmp = requireCmp();
    var coerce = requireCoerce();
    var Comparator = requireComparator();
    var Range = requireRange();
    var satisfies = requireSatisfies();
    var toComparators = requireToComparators();
    var maxSatisfying = requireMaxSatisfying();
    var minSatisfying = requireMinSatisfying();
    var minVersion = requireMinVersion();
    var validRange = requireValid();
    var outside = requireOutside();
    var gtr = requireGtr();
    var ltr = requireLtr();
    var intersects = requireIntersects();
    var simplifyRange = requireSimplify();
    var subset = requireSubset();
    semver = {
        parse: parse,
        valid: valid,
        clean: clean,
        inc: inc,
        diff: diff,
        major: major,
        minor: minor,
        patch: patch,
        prerelease: prerelease,
        compare: compare,
        rcompare: rcompare,
        compareLoose: compareLoose,
        compareBuild: compareBuild,
        sort: sort,
        rsort: rsort,
        gt: gt,
        lt: lt,
        eq: eq,
        neq: neq,
        gte: gte,
        lte: lte,
        cmp: cmp,
        coerce: coerce,
        Comparator: Comparator,
        Range: Range,
        satisfies: satisfies,
        toComparators: toComparators,
        maxSatisfying: maxSatisfying,
        minSatisfying: minSatisfying,
        minVersion: minVersion,
        validRange: validRange,
        outside: outside,
        gtr: gtr,
        ltr: ltr,
        intersects: intersects,
        simplifyRange: simplifyRange,
        subset: subset,
        SemVer: SemVer,
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: constants.RELEASE_TYPES,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
    return semver;
}

var lib$1;
var hasRequiredLib$1;
function requireLib$1() {
    if (hasRequiredLib$1) return lib$1;
    hasRequiredLib$1 = 1;
    var builtins = require$$0$3.builtinModules;
    var scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$');
    var blacklist = [
        'node_modules',
        'favicon.ico'
    ];
    function validate(name) {
        var warnings = [];
        var errors = [];
        if (name === null) {
            errors.push('name cannot be null');
            return done(warnings, errors);
        }
        if (name === undefined) {
            errors.push('name cannot be undefined');
            return done(warnings, errors);
        }
        if (typeof name !== 'string') {
            errors.push('name must be a string');
            return done(warnings, errors);
        }
        if (!name.length) {
            errors.push('name length must be greater than zero');
        }
        if (name.match(/^\./)) {
            errors.push('name cannot start with a period');
        }
        if (name.match(/^_/)) {
            errors.push('name cannot start with an underscore');
        }
        if (name.trim() !== name) {
            errors.push('name cannot contain leading or trailing spaces');
        }
        // No funny business
        blacklist.forEach(function(blacklistedName) {
            if (name.toLowerCase() === blacklistedName) {
                errors.push(blacklistedName + ' is a blacklisted name');
            }
        });
        // Generate warnings for stuff that used to be allowed
        // core module names like http, events, util, etc
        if (builtins.includes(name.toLowerCase())) {
            warnings.push(name + ' is a core module name');
        }
        if (name.length > 214) {
            warnings.push('name can no longer contain more than 214 characters');
        }
        // mIxeD CaSe nAMEs
        if (name.toLowerCase() !== name) {
            warnings.push('name can no longer contain capital letters');
        }
        if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
            warnings.push('name can no longer contain special characters ("~\'!()*")');
        }
        if (encodeURIComponent(name) !== name) {
            // Maybe it's a scoped package name, like @user/package
            var nameMatch = name.match(scopedPackagePattern);
            if (nameMatch) {
                var user = nameMatch[1];
                var pkg = nameMatch[2];
                if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
                    return done(warnings, errors);
                }
            }
            errors.push('name can only contain URL-friendly characters');
        }
        return done(warnings, errors);
    }
    var done = function done(warnings, errors) {
        var result = {
            validForNewPackages: errors.length === 0 && warnings.length === 0,
            validForOldPackages: errors.length === 0,
            warnings: warnings,
            errors: errors
        };
        if (!result.warnings.length) {
            delete result.warnings;
        }
        if (!result.errors.length) {
            delete result.errors;
        }
        return result;
    };
    lib$1 = validate;
    return lib$1;
}

function _array_like_to_array$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$2(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$4(arr);
}
function _iterable_to_array$2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread$2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array$2(arr) {
    return _array_without_holes$2(arr) || _iterable_to_array$2(arr) || _unsupported_iterable_to_array$4(arr) || _non_iterable_spread$2();
}
function _unsupported_iterable_to_array$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$4(o, minLen);
}
var lib;
var hasRequiredLib;
function requireLib() {
    if (hasRequiredLib) return lib;
    hasRequiredLib = 1;
    var META = Symbol('proc-log.meta');
    lib = {
        META: META,
        output: {
            LEVELS: [
                'standard',
                'error',
                'buffer',
                'flush'
            ],
            KEYS: {
                standard: 'standard',
                error: 'error',
                buffer: 'buffer',
                flush: 'flush'
            },
            standard: function standard() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'output',
                    'standard'
                ].concat(_to_consumable_array$2(args)));
            },
            error: function error() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'output',
                    'error'
                ].concat(_to_consumable_array$2(args)));
            },
            buffer: function buffer() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'output',
                    'buffer'
                ].concat(_to_consumable_array$2(args)));
            },
            flush: function flush() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'output',
                    'flush'
                ].concat(_to_consumable_array$2(args)));
            }
        },
        log: {
            LEVELS: [
                'notice',
                'error',
                'warn',
                'info',
                'verbose',
                'http',
                'silly',
                'timing',
                'pause',
                'resume'
            ],
            KEYS: {
                notice: 'notice',
                error: 'error',
                warn: 'warn',
                info: 'info',
                verbose: 'verbose',
                http: 'http',
                silly: 'silly',
                timing: 'timing',
                pause: 'pause',
                resume: 'resume'
            },
            error: function error() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'error'
                ].concat(_to_consumable_array$2(args)));
            },
            notice: function notice() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'notice'
                ].concat(_to_consumable_array$2(args)));
            },
            warn: function warn() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'warn'
                ].concat(_to_consumable_array$2(args)));
            },
            info: function info() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'info'
                ].concat(_to_consumable_array$2(args)));
            },
            verbose: function verbose() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'verbose'
                ].concat(_to_consumable_array$2(args)));
            },
            http: function http() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'http'
                ].concat(_to_consumable_array$2(args)));
            },
            silly: function silly() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'silly'
                ].concat(_to_consumable_array$2(args)));
            },
            timing: function timing() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                return (_process = process).emit.apply(_process, [
                    'log',
                    'timing'
                ].concat(_to_consumable_array$2(args)));
            },
            pause: function pause() {
                return process.emit('log', 'pause');
            },
            resume: function resume() {
                return process.emit('log', 'resume');
            }
        },
        time: {
            LEVELS: [
                'start',
                'end'
            ],
            KEYS: {
                start: 'start',
                end: 'end'
            },
            start: function start(name, fn) {
                process.emit('time', 'start', name);
                function end() {
                    return process.emit('time', 'end', name);
                }
                if (typeof fn === 'function') {
                    var res = fn();
                    if (res && res.finally) {
                        return res.finally(end);
                    }
                    end();
                    return res;
                }
                return end;
            },
            end: function end(name) {
                return process.emit('time', 'end', name);
            }
        },
        input: {
            LEVELS: [
                'start',
                'end',
                'read'
            ],
            KEYS: {
                start: 'start',
                end: 'end',
                read: 'read'
            },
            start: function start(fn) {
                process.emit('input', 'start');
                function end() {
                    return process.emit('input', 'end');
                }
                if (typeof fn === 'function') {
                    var res = fn();
                    if (res && res.finally) {
                        return res.finally(end);
                    }
                    end();
                    return res;
                }
                return end;
            },
            end: function end() {
                return process.emit('input', 'end');
            },
            read: function read() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _process;
                var resolve, reject;
                var promise = new Promise(function(_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
                (_process = process).emit.apply(_process, [
                    'input',
                    'read',
                    resolve,
                    reject
                ].concat(_to_consumable_array$2(args)));
                return promise;
            }
        }
    };
    return lib;
}

function _array_like_to_array$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _instanceof$3(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array_limit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$3(arr, i) || _non_iterable_rest$1();
}
function _type_of$a(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
}
var hasRequiredNpa;
function requireNpa() {
    if (hasRequiredNpa) return npa$1.exports;
    hasRequiredNpa = 1;
    npa$1.exports = npa;
    npa$1.exports.resolve = resolve;
    npa$1.exports.toPurl = toPurl;
    npa$1.exports.Result = Result;
    var URL = require$$0$2.URL;
    var HostedGit = requireLib$2();
    var semver = requireSemver();
    var path = commonjsGlobal.FAKE_WINDOWS ? require$$3.win32 : require$$3;
    var validatePackageName = requireLib$1();
    var homedir = require$$5.homedir;
    var log = requireLib().log;
    var isWindows = process.platform === 'win32' || commonjsGlobal.FAKE_WINDOWS;
    var hasSlashes = isWindows ? /\\|[/]/ : /[/]/;
    var isURL = /^(?:git[+])?[a-z]+:/i;
    var isGit = /^[^@]+@[^:.]+\.[^:]+:.+$/i;
    var isFilename = /[.](?:tgz|tar.gz|tar)$/i;
    function npa(arg, where) {
        var name;
        var spec;
        if ((typeof arg === "undefined" ? "undefined" : _type_of$a(arg)) === 'object') {
            if (_instanceof$3(arg, Result) && (!where || where === arg.where)) {
                return arg;
            } else if (arg.name && arg.rawSpec) {
                return npa.resolve(arg.name, arg.rawSpec, where || arg.where);
            } else {
                return npa(arg.raw, where || arg.where);
            }
        }
        var nameEndsAt = arg[0] === '@' ? arg.slice(1).indexOf('@') + 1 : arg.indexOf('@');
        var namePart = nameEndsAt > 0 ? arg.slice(0, nameEndsAt) : arg;
        if (isURL.test(arg)) {
            spec = arg;
        } else if (isGit.test(arg)) {
            spec = "git+ssh://".concat(arg);
        } else if (namePart[0] !== '@' && (hasSlashes.test(namePart) || isFilename.test(namePart))) {
            spec = arg;
        } else if (nameEndsAt > 0) {
            name = namePart;
            spec = arg.slice(nameEndsAt + 1) || '*';
        } else {
            var valid = validatePackageName(arg);
            if (valid.validForOldPackages) {
                name = arg;
                spec = '*';
            } else {
                spec = arg;
            }
        }
        return resolve(name, spec, where, arg);
    }
    var isFilespec = isWindows ? /^(?:[.]|~[/]|[/\\]|[a-zA-Z]:)/ : /^(?:[.]|~[/]|[/]|[a-zA-Z]:)/;
    function resolve(name, spec, where, arg) {
        var res = new Result({
            raw: arg,
            name: name,
            rawSpec: spec,
            fromArgument: arg != null
        });
        if (name) {
            res.setName(name);
        }
        if (spec && (isFilespec.test(spec) || /^file:/i.test(spec))) {
            return fromFile(res, where);
        } else if (spec && /^npm:/i.test(spec)) {
            return fromAlias(res, where);
        }
        var hosted = HostedGit.fromUrl(spec, {
            noGitPlus: true,
            noCommittish: true
        });
        if (hosted) {
            return fromHostedGit(res, hosted);
        } else if (spec && isURL.test(spec)) {
            return fromURL(res);
        } else if (spec && (hasSlashes.test(spec) || isFilename.test(spec))) {
            return fromFile(res, where);
        } else {
            return fromRegistry(res);
        }
    }
    var defaultRegistry = 'https://registry.npmjs.org';
    function toPurl(arg) {
        var reg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRegistry;
        var res = npa(arg);
        if (res.type !== 'version') {
            throw invalidPurlType(res.type, res.raw);
        }
        // URI-encode leading @ of scoped packages
        var purl = 'pkg:npm/' + res.name.replace(/^@/, '%40') + '@' + res.rawSpec;
        if (reg !== defaultRegistry) {
            purl += '?repository_url=' + reg;
        }
        return purl;
    }
    function invalidPackageName(name, valid, raw) {
        // eslint-disable-next-line max-len
        var err = new Error('Invalid package name "'.concat(name, '" of package "').concat(raw, '": ').concat(valid.errors.join('; '), "."));
        err.code = 'EINVALIDPACKAGENAME';
        return err;
    }
    function invalidTagName(name, raw) {
        // eslint-disable-next-line max-len
        var err = new Error('Invalid tag name "'.concat(name, '" of package "').concat(raw, '": Tags may not have any characters that encodeURIComponent encodes.'));
        err.code = 'EINVALIDTAGNAME';
        return err;
    }
    function invalidPurlType(type, raw) {
        // eslint-disable-next-line max-len
        var err = new Error('Invalid type "'.concat(type, '" of package "').concat(raw, '": Purl can only be generated for "version" types.'));
        err.code = 'EINVALIDPURLTYPE';
        return err;
    }
    function Result(opts) {
        this.type = opts.type;
        this.registry = opts.registry;
        this.where = opts.where;
        if (opts.raw == null) {
            this.raw = opts.name ? opts.name + '@' + opts.rawSpec : opts.rawSpec;
        } else {
            this.raw = opts.raw;
        }
        this.name = undefined;
        this.escapedName = undefined;
        this.scope = undefined;
        this.rawSpec = opts.rawSpec || '';
        this.saveSpec = opts.saveSpec;
        this.fetchSpec = opts.fetchSpec;
        if (opts.name) {
            this.setName(opts.name);
        }
        this.gitRange = opts.gitRange;
        this.gitCommittish = opts.gitCommittish;
        this.gitSubdir = opts.gitSubdir;
        this.hosted = opts.hosted;
    }
    Result.prototype.setName = function(name) {
        var valid = validatePackageName(name);
        if (!valid.validForOldPackages) {
            throw invalidPackageName(name, valid, this.raw);
        }
        this.name = name;
        this.scope = name[0] === '@' ? name.slice(0, name.indexOf('/')) : undefined;
        // scoped packages in couch must have slash url-encoded, e.g. @foo%2Fbar
        this.escapedName = name.replace('/', '%2f');
        return this;
    };
    Result.prototype.toString = function() {
        var full = [];
        if (this.name != null && this.name !== '') {
            full.push(this.name);
        }
        var spec = this.saveSpec || this.fetchSpec || this.rawSpec;
        if (spec != null && spec !== '') {
            full.push(spec);
        }
        return full.length ? full.join('@') : this.raw;
    };
    Result.prototype.toJSON = function() {
        var result = Object.assign({}, this);
        delete result.hosted;
        return result;
    };
    // sets res.gitCommittish, res.gitRange, and res.gitSubdir
    function setGitAttrs(res, committish) {
        if (!committish) {
            res.gitCommittish = null;
            return;
        }
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            // for each :: separated item:
            for(var _iterator = committish.split('::')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var part = _step.value;
                // if the item has no : the n it is a commit-ish
                if (!part.includes(':')) {
                    if (res.gitRange) {
                        throw new Error('cannot override existing semver range with a committish');
                    }
                    if (res.gitCommittish) {
                        throw new Error('cannot override existing committish with a second committish');
                    }
                    res.gitCommittish = part;
                    continue;
                }
                // split on name:value
                var _part_split = _sliced_to_array$1(part.split(':'), 2), name = _part_split[0], value = _part_split[1];
                // if name is semver do semver lookup of ref or tag
                if (name === 'semver') {
                    if (res.gitCommittish) {
                        throw new Error('cannot override existing committish with a semver range');
                    }
                    if (res.gitRange) {
                        throw new Error('cannot override existing semver range with a second semver range');
                    }
                    res.gitRange = decodeURIComponent(value);
                    continue;
                }
                if (name === 'path') {
                    if (res.gitSubdir) {
                        throw new Error('cannot override existing path with a second path');
                    }
                    res.gitSubdir = "/".concat(value);
                    continue;
                }
                log.warn('npm-package-arg', 'ignoring unknown key "'.concat(name, '"'));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    function fromFile(res, where) {
        if (!where) {
            where = process.cwd();
        }
        res.type = isFilename.test(res.rawSpec) ? 'file' : 'directory';
        res.where = where;
        // always put the '/' on where when resolving urls, or else
        // file:foo from /path/to/bar goes to /path/to/foo, when we want
        // it to be /path/to/bar/foo
        var specUrl;
        var resolvedUrl;
        var prefix = !/^file:/.test(res.rawSpec) ? 'file:' : '';
        var rawWithPrefix = prefix + res.rawSpec;
        var rawNoPrefix = rawWithPrefix.replace(/^file:/, '');
        try {
            resolvedUrl = new URL(rawWithPrefix, "file://".concat(path.resolve(where), "/"));
            specUrl = new URL(rawWithPrefix);
        } catch (originalError) {
            var er = new Error('Invalid file: URL, must comply with RFC 8089');
            throw Object.assign(er, {
                raw: res.rawSpec,
                spec: res,
                where: where,
                originalError: originalError
            });
        }
        // XXX backwards compatibility lack of compliance with RFC 8089
        if (resolvedUrl.host && resolvedUrl.host !== 'localhost') {
            var rawSpec = res.rawSpec.replace(/^file:\/\//, 'file:///');
            resolvedUrl = new URL(rawSpec, "file://".concat(path.resolve(where), "/"));
            specUrl = new URL(rawSpec);
            rawNoPrefix = rawSpec.replace(/^file:/, '');
        }
        // turn file:/../foo into file:../foo
        // for 1, 2 or 3 leading slashes since we attempted
        // in the previous step to make it a file protocol url with a leading slash
        if (/^\/{1,3}\.\.?(\/|$)/.test(rawNoPrefix)) {
            var rawSpec1 = res.rawSpec.replace(/^file:\/{1,3}/, 'file:');
            resolvedUrl = new URL(rawSpec1, "file://".concat(path.resolve(where), "/"));
            specUrl = new URL(rawSpec1);
            rawNoPrefix = rawSpec1.replace(/^file:/, '');
        }
        // XXX end RFC 8089 violation backwards compatibility section
        // turn /C:/blah into just C:/blah on windows
        var specPath = decodeURIComponent(specUrl.pathname);
        var resolvedPath = decodeURIComponent(resolvedUrl.pathname);
        if (isWindows) {
            specPath = specPath.replace(/^\/+([a-z]:\/)/i, '$1');
            resolvedPath = resolvedPath.replace(/^\/+([a-z]:\/)/i, '$1');
        }
        // replace ~ with homedir, but keep the ~ in the saveSpec
        // otherwise, make it relative to where param
        if (/^\/~(\/|$)/.test(specPath)) {
            res.saveSpec = "file:".concat(specPath.substr(1));
            resolvedPath = path.resolve(homedir(), specPath.substr(3));
        } else if (!path.isAbsolute(rawNoPrefix)) {
            res.saveSpec = "file:".concat(path.relative(where, resolvedPath));
        } else {
            res.saveSpec = "file:".concat(path.resolve(resolvedPath));
        }
        res.fetchSpec = path.resolve(where, resolvedPath);
        return res;
    }
    function fromHostedGit(res, hosted) {
        res.type = 'git';
        res.hosted = hosted;
        res.saveSpec = hosted.toString({
            noGitPlus: false,
            noCommittish: false
        });
        res.fetchSpec = hosted.getDefaultRepresentation() === 'shortcut' ? null : hosted.toString();
        setGitAttrs(res, hosted.committish);
        return res;
    }
    function unsupportedURLType(protocol, spec) {
        var err = new Error('Unsupported URL Type "'.concat(protocol, '": ').concat(spec));
        err.code = 'EUNSUPPORTEDPROTOCOL';
        return err;
    }
    function fromURL(res) {
        var rawSpec = res.rawSpec;
        res.saveSpec = rawSpec;
        if (rawSpec.startsWith('git+ssh:')) {
            // git ssh specifiers are overloaded to also use scp-style git
            // specifiers, so we have to parse those out and treat them special.
            // They are NOT true URIs, so we can't hand them to URL.
            // This regex looks for things that look like:
            // git+ssh://git@my.custom.git.com:username/project.git#deadbeef
            // ...and various combinations. The username in the beginning is *required*.
            var matched = rawSpec.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
            if (matched && !matched[1].match(/:[0-9]+\/?.*$/i)) {
                res.type = 'git';
                setGitAttrs(res, matched[2]);
                res.fetchSpec = matched[1];
                return res;
            }
        } else if (rawSpec.startsWith('git+file://')) {
            // URL can't handle windows paths
            rawSpec = rawSpec.replace(/\\/g, '/');
        }
        var parsedUrl = new URL(rawSpec);
        // check the protocol, and then see if it's git or not
        switch(parsedUrl.protocol){
            case 'git:':
            case 'git+http:':
            case 'git+https:':
            case 'git+rsync:':
            case 'git+ftp:':
            case 'git+file:':
            case 'git+ssh:':
                res.type = 'git';
                setGitAttrs(res, parsedUrl.hash.slice(1));
                if (parsedUrl.protocol === 'git+file:' && /^git\+file:\/\/[a-z]:/i.test(rawSpec)) {
                    // URL can't handle drive letters on windows file paths, the host can't contain a :
                    res.fetchSpec = "git+file://".concat(parsedUrl.host.toLowerCase(), ":").concat(parsedUrl.pathname);
                } else {
                    parsedUrl.hash = '';
                    res.fetchSpec = parsedUrl.toString();
                }
                if (res.fetchSpec.startsWith('git+')) {
                    res.fetchSpec = res.fetchSpec.slice(4);
                }
                break;
            case 'http:':
            case 'https:':
                res.type = 'remote';
                res.fetchSpec = res.saveSpec;
                break;
            default:
                throw unsupportedURLType(parsedUrl.protocol, rawSpec);
        }
        return res;
    }
    function fromAlias(res, where) {
        var subSpec = npa(res.rawSpec.substr(4), where);
        if (subSpec.type === 'alias') {
            throw new Error('nested aliases not supported');
        }
        if (!subSpec.registry) {
            throw new Error('aliases only work for registry deps');
        }
        if (!subSpec.name) {
            throw new Error('aliases must have a name');
        }
        res.subSpec = subSpec;
        res.registry = true;
        res.type = 'alias';
        res.saveSpec = null;
        res.fetchSpec = null;
        return res;
    }
    function fromRegistry(res) {
        res.registry = true;
        var spec = res.rawSpec.trim();
        // no save spec for registry components as we save based on the fetched
        // version, not on the argument so this can't compute that.
        res.saveSpec = null;
        res.fetchSpec = spec;
        var version = semver.valid(spec, true);
        var range = semver.validRange(spec, true);
        if (version) {
            res.type = 'version';
        } else if (range) {
            res.type = 'range';
        } else {
            if (encodeURIComponent(spec) !== spec) {
                throw invalidTagName(spec, res.raw);
            }
            res.type = 'tag';
        }
        return res;
    }
    return npa$1.exports;
}

var npaExports = requireNpa();
var npa = /*@__PURE__*/ getDefaultExportFromCjs(npaExports);

var consoleControlStrings = {};

var hasRequiredConsoleControlStrings;
function requireConsoleControlStrings() {
    if (hasRequiredConsoleControlStrings) return consoleControlStrings;
    hasRequiredConsoleControlStrings = 1;
    // These tables borrowed from `ansi`
    var prefix = '\x1b[';
    consoleControlStrings.up = function up(num) {
        return prefix + (num || '') + 'A';
    };
    consoleControlStrings.down = function down(num) {
        return prefix + (num || '') + 'B';
    };
    consoleControlStrings.forward = function forward(num) {
        return prefix + (num || '') + 'C';
    };
    consoleControlStrings.back = function back(num) {
        return prefix + (num || '') + 'D';
    };
    consoleControlStrings.nextLine = function nextLine(num) {
        return prefix + (num || '') + 'E';
    };
    consoleControlStrings.previousLine = function previousLine(num) {
        return prefix + (num || '') + 'F';
    };
    consoleControlStrings.horizontalAbsolute = function horizontalAbsolute(num) {
        if (num == null) throw new Error('horizontalAboslute requires a column to position to');
        return prefix + num + 'G';
    };
    consoleControlStrings.eraseData = function eraseData() {
        return prefix + 'J';
    };
    consoleControlStrings.eraseLine = function eraseLine() {
        return prefix + 'K';
    };
    consoleControlStrings.goto = function(x, y) {
        return prefix + y + ';' + x + 'H';
    };
    consoleControlStrings.gotoSOL = function() {
        return '\r';
    };
    consoleControlStrings.beep = function() {
        return '\x07';
    };
    consoleControlStrings.hideCursor = function hideCursor() {
        return prefix + '?25l';
    };
    consoleControlStrings.showCursor = function showCursor() {
        return prefix + '?25h';
    };
    var colors = {
        reset: 0,
        // styles
        bold: 1,
        italic: 3,
        underline: 4,
        inverse: 7,
        // resets
        stopBold: 22,
        stopItalic: 23,
        stopUnderline: 24,
        stopInverse: 27,
        // colors
        white: 37,
        black: 30,
        blue: 34,
        cyan: 36,
        green: 32,
        magenta: 35,
        red: 31,
        yellow: 33,
        bgWhite: 47,
        bgBlack: 40,
        bgBlue: 44,
        bgCyan: 46,
        bgGreen: 42,
        bgMagenta: 45,
        bgRed: 41,
        bgYellow: 43,
        grey: 90,
        brightBlack: 90,
        brightRed: 91,
        brightGreen: 92,
        brightYellow: 93,
        brightBlue: 94,
        brightMagenta: 95,
        brightCyan: 96,
        brightWhite: 97,
        bgGrey: 100,
        bgBrightBlack: 100,
        bgBrightRed: 101,
        bgBrightGreen: 102,
        bgBrightYellow: 103,
        bgBrightBlue: 104,
        bgBrightMagenta: 105,
        bgBrightCyan: 106,
        bgBrightWhite: 107
    };
    consoleControlStrings.color = function color(colorWith) {
        if (arguments.length !== 1 || !Array.isArray(colorWith)) {
            colorWith = Array.prototype.slice.call(arguments);
        }
        return prefix + colorWith.map(colorNameToCode).join(';') + 'm';
    };
    function colorNameToCode(color) {
        if (colors[color] != null) return colors[color];
        throw new Error('Unknown color or style name: ' + color);
    }
    return consoleControlStrings;
}

var consoleControlStringsExports = requireConsoleControlStrings();
var consoleControl = /*@__PURE__*/ getDefaultExportFromCjs(consoleControlStringsExports);

var setBlocking$1;
var hasRequiredSetBlocking;
function requireSetBlocking() {
    if (hasRequiredSetBlocking) return setBlocking$1;
    hasRequiredSetBlocking = 1;
    setBlocking$1 = function setBlocking(blocking) {
        [
            process.stdout,
            process.stderr
        ].forEach(function(stream) {
            if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
                stream._handle.setBlocking(blocking);
            }
        });
    };
    return setBlocking$1;
}

var setBlockingExports = requireSetBlocking();
var setBlocking = /*@__PURE__*/ getDefaultExportFromCjs(setBlockingExports);

function _assert_this_initialized$5(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super$5(_this, derived, args) {
    derived = _get_prototype_of$5(derived);
    return _possible_constructor_return$5(_this, _is_native_reflect_construct$5() ? Reflect.construct(derived, [], _get_prototype_of$5(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check$9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of$5(o) {
    _get_prototype_of$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$5(o);
}
function _inherits$5(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of$5(subClass, superClass);
}
function _possible_constructor_return$5(self, call) {
    if (call && (_type_of$9(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$5(self);
}
function _set_prototype_of$5(o, p) {
    _set_prototype_of$5 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$5(o, p);
}
function _type_of$9(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct$5() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$5 = function() {
        return !!result;
    })();
}
var trackerId = 0;
var TrackerBase = /*#__PURE__*/ function(EventEmitter) {
    _inherits$5(TrackerBase, EventEmitter);
    function TrackerBase() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        _class_call_check$9(this, TrackerBase);
        var _this;
        _this = _call_super$5(this, TrackerBase);
        _this.id = ++trackerId;
        _this.name = name;
        return _this;
    }
    return TrackerBase;
} 
(EventEmitter);

function _assert_this_initialized$4(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super$4(_this, derived, args) {
    derived = _get_prototype_of$4(derived);
    return _possible_constructor_return$4(_this, _is_native_reflect_construct$4() ? Reflect.construct(derived, args, _get_prototype_of$4(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check$8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of$4(o) {
    _get_prototype_of$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$4(o);
}
function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    _set_prototype_of$4(subClass, superClass);
}
function _possible_constructor_return$4(self, call) {
    if (call && (_type_of$8(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$4(self);
}
function _set_prototype_of$4(o, p) {
    _set_prototype_of$4 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$4(o, p);
}
function _type_of$8(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct$4() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$4 = function() {
        return !!result;
    })();
}
var Tracker = /*#__PURE__*/ function(TrackerBase) {
    _inherits$4(Tracker, TrackerBase);
    function Tracker(name, todo) {
        _class_call_check$8(this, Tracker);
        var _this;
        _this = _call_super$4(this, Tracker, [
            name
        ]);
        _this.workDone = 0;
        _this.workTodo = todo || 0;
        return _this;
    }
    var _proto = Tracker.prototype;
    _proto.completed = function completed() {
        return this.workTodo === 0 ? 0 : this.workDone / this.workTodo;
    };
    _proto.addWork = function addWork(work) {
        this.workTodo += work;
        this.emit('change', this.name, this.completed(), this);
    };
    _proto.completeWork = function completeWork(work) {
        this.workDone += work;
        if (this.workDone > this.workTodo) {
            this.workDone = this.workTodo;
        }
        this.emit('change', this.name, this.completed(), this);
    };
    _proto.finish = function finish() {
        this.workTodo = this.workDone = 1;
        this.emit('change', this.name, 1, this);
    };
    return Tracker;
} 
(TrackerBase);

function _assert_this_initialized$3(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super$3(_this, derived, args) {
    derived = _get_prototype_of$3(derived);
    return _possible_constructor_return$3(_this, _is_native_reflect_construct$3() ? Reflect.construct(derived, args, _get_prototype_of$3(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check$7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of$3(o) {
    _get_prototype_of$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$3(o);
}
function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of$3(subClass, superClass);
}
function _possible_constructor_return$3(self, call) {
    if (call && (_type_of$7(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$3(self);
}
function _set_prototype_of$3(o, p) {
    _set_prototype_of$3 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$3(o, p);
}
function _type_of$7(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct$3() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$3 = function() {
        return !!result;
    })();
}
var TrackerStream = /*#__PURE__*/ function(_stream_Transform) {
    _inherits$3(TrackerStream, _stream_Transform);
    function TrackerStream(name) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0, options = arguments.length > 2 ? arguments[2] : undefined;
        _class_call_check$7(this, TrackerStream);
        var _this;
        _this = _call_super$3(this, TrackerStream, [
            options
        ]);
        _this.tracker = new Tracker(name, size);
        _this.name = name;
        _this.id = _this.tracker.id;
        _this.tracker.on('change', _this.trackerChange.bind(_this));
        return _this;
    }
    var _proto = TrackerStream.prototype;
    _proto.trackerChange = function trackerChange(name, completion) {
        this.emit('change', name, completion, this);
    };
    _proto._transform = function _transform(data, encoding, cb) {
        this.tracker.completeWork(data.length ? data.length : 1);
        this.push(data);
        cb();
    };
    _proto._flush = function _flush(cb) {
        this.tracker.finish();
        cb();
    };
    _proto.completed = function completed() {
        return this.tracker.completed();
    };
    _proto.addWork = function addWork(work) {
        return this.tracker.addWork(work);
    };
    _proto.finish = function finish() {
        return this.tracker.finish();
    };
    return TrackerStream;
} 
(stream.Transform);

function _assert_this_initialized$2(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super$2(_this, derived, args) {
    derived = _get_prototype_of$2(derived);
    return _possible_constructor_return$2(_this, _is_native_reflect_construct$2() ? Reflect.construct(derived, args || [], _get_prototype_of$2(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check$6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of$2(o) {
    _get_prototype_of$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$2(o);
}
function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    _set_prototype_of$2(subClass, superClass);
}
function _instanceof$2(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _possible_constructor_return$2(self, call) {
    if (call && (_type_of$6(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$2(self);
}
function _set_prototype_of$2(o, p) {
    _set_prototype_of$2 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$2(o, p);
}
function _type_of$6(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct$2() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$2 = function() {
        return !!result;
    })();
}
var TrackerGroup = /*#__PURE__*/ function(TrackerBase) {
    _inherits$2(TrackerGroup, TrackerBase);
    function TrackerGroup() {
        _class_call_check$6(this, TrackerGroup);
        var _this;
        _this = _call_super$2(this, TrackerGroup, arguments);
        _this.parentGroup = null;
        _this.trackers = [];
        _this.completion = {};
        _this.weight = {};
        _this.totalWeight = 0;
        _this.finished = false;
        _this.bubbleChange = bubbleChange(_this);
        return _this;
    }
    var _proto = TrackerGroup.prototype;
    _proto.nameInTree = function nameInTree() {
        var names = [];
        var from = this;
        while(from){
            names.unshift(from.name);
            from = from.parentGroup;
        }
        return names.join('/');
    };
    _proto.addUnit = function addUnit(unit) {
        var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        if (unit.addUnit) {
            var toTest = this;
            while(toTest){
                if (unit === toTest) {
                    throw new Error('Attempted to add tracker group ' + unit.name + ' to tree that already includes it ' + this.nameInTree());
                }
                toTest = toTest.parentGroup;
            }
            unit.parentGroup = this;
        }
        this.weight[unit.id] = weight || 1;
        this.totalWeight += this.weight[unit.id];
        this.trackers.push(unit);
        this.completion[unit.id] = unit.completed();
        unit.on('change', this.bubbleChange);
        if (!this.finished) {
            this.emit('change', unit.name, this.completion[unit.id], unit);
        }
        return unit;
    };
    _proto.completed = function completed() {
        if (this.trackers.length === 0) {
            return 0;
        }
        var valPerWeight = 1 / this.totalWeight;
        var completed = 0;
        for(var ii = 0; ii < this.trackers.length; ii++){
            var trackerId = this.trackers[ii].id;
            completed += valPerWeight * this.weight[trackerId] * this.completion[trackerId];
        }
        return completed;
    };
    _proto.newGroup = function newGroup(name) {
        var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return this.addUnit(new TrackerGroup(name), weight);
    };
    _proto.newItem = function newItem(name, todo) {
        var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return this.addUnit(new Tracker(name, todo), weight);
    };
    _proto.newStream = function newStream(name, todo) {
        var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return this.addUnit(new TrackerStream(name, todo), weight);
    };
    _proto.finish = function finish() {
        this.finished = true;
        if (!this.trackers.length) {
            this.addUnit(new Tracker(), 1);
        }
        for(var ii = 0; ii < this.trackers.length; ii++){
            var tracker = this.trackers[ii];
            tracker.finish();
            tracker.removeListener('change', this.bubbleChange);
        }
        this.emit('change', this.name, 1, this);
    };
    _proto.debug = function debug() {
        var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var indent = ' '.repeat(depth);
        var output = "".concat(indent).concat(this.name || 'top', ": ").concat(this.completed(), "\n");
        this.trackers.forEach(function(tracker) {
            output += _instanceof$2(tracker, TrackerGroup) ? tracker.debug(depth + 1) : "".concat(indent, " ").concat(tracker.name, ": ").concat(tracker.completed(), "\n");
        });
        return output;
    };
    return TrackerGroup;
}(TrackerBase);
function bubbleChange(trackerGroup) {
    return function(name, completed, tracker) {
        trackerGroup.completion[tracker.id] = completed;
        if (trackerGroup.finished) {
            return;
        }
        trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup);
    };
}

var hasUnicode$1 = {
    exports: {}
};

var hasRequiredHasUnicode;
function requireHasUnicode() {
    if (hasRequiredHasUnicode) return hasUnicode$1.exports;
    hasRequiredHasUnicode = 1;
    var os = require$$5;
    hasUnicode$1.exports = function hasUnicode() {
        // Recent Win32 platforms (>XP) CAN support unicode in the console but
        // don't have to, and in non-english locales often use traditional local
        // code pages. There's no way, short of windows system calls or execing
        // the chcp command line program to figure this out. As such, we default
        // this to false and encourage your users to override it via config if
        // appropriate.
        if (os.type() == "Windows_NT") {
            return false;
        }
        var isUTF8 = /UTF-?8$/i;
        var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG;
        return isUTF8.test(ctype);
    };
    return hasUnicode$1.exports;
}

var hasUnicodeExports = requireHasUnicode();
var hasUnicode = /*@__PURE__*/ getDefaultExportFromCjs(hasUnicodeExports);

/**
 * This is not the set of all possible signals.
 *
 * It IS, however, the set of all signals that trigger
 * an exit on either Linux or BSD systems.  Linux is a
 * superset of the signal names supported on BSD, and
 * the unknown signals just fail to register, so we can
 * catch that easily enough.
 *
 * Windows signals are a different set, since there are
 * signals that terminate Windows processes, but don't
 * terminate (or don't even exist) on Posix systems.
 *
 * Don't bother with SIGKILL.  It's uncatchable, which
 * means that we can't fire any callbacks anyway.
 *
 * If a user does happen to register a handler on a non-
 * fatal signal like SIGWINCH or something, and then
 * exit, it'll end up firing `process.emit('exit')`, so
 * the handler will be fired anyway.
 *
 * SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
 * artificially, inherently leave the process in a
 * state from which it is not safe to try and enter JS
 * listeners.
 */ var signals = [];
signals.push('SIGHUP', 'SIGINT', 'SIGTERM');
if (process.platform !== 'win32') {
    signals.push('SIGALRM', 'SIGABRT', 'SIGVTALRM', 'SIGXCPU', 'SIGXFSZ', 'SIGUSR2', 'SIGTRAP', 'SIGSYS', 'SIGQUIT', 'SIGIOT');
}
if (process.platform === 'linux') {
    signals.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT');
}

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
function _array_like_to_array$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes$1(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$2(arr);
}
function _assert_this_initialized$1(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super$1(_this, derived, args) {
    derived = _get_prototype_of$1(derived);
    return _possible_constructor_return$1(_this, _is_native_reflect_construct$1() ? Reflect.construct(derived, args || [], _get_prototype_of$1(_this).constructor) : derived.apply(_this, args));
}
function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _class_call_check$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
    return _class_apply_descriptor_get(receiver, descriptor);
}
function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
    _class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _class_private_method_init(obj, privateSet) {
    _check_private_redeclaration(obj, privateSet);
    privateSet.add(obj);
}
function _get_prototype_of$1(o) {
    _get_prototype_of$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of$1(o);
}
function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of$1(subClass, superClass);
}
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possible_constructor_return$1(self, call) {
    if (call && (_type_of$5(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized$1(self);
}
function _set_prototype_of$1(o, p) {
    _set_prototype_of$1 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of$1(o, p);
}
function _to_consumable_array$1(arr) {
    return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$2(arr) || _non_iterable_spread$1();
}
function _type_of$5(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
}
function _is_native_reflect_construct$1() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct$1 = function() {
        return !!result;
    })();
}
var processOk = function(process) {
    return !!process && (typeof process === "undefined" ? "undefined" : _type_of$5(process)) === 'object' && typeof process.removeListener === 'function' && typeof process.emit === 'function' && typeof process.reallyExit === 'function' && typeof process.listeners === 'function' && typeof process.kill === 'function' && typeof process.pid === 'number' && typeof process.on === 'function';
};
var kExitEmitter = Symbol.for('signal-exit emitter');
var global$1 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
// teeny special purpose ee
var Emitter = /*#__PURE__*/ function() {
    function Emitter() {
        _class_call_check$5(this, Emitter);
        this.emitted = {
            afterExit: false,
            exit: false
        };
        this.listeners = {
            afterExit: [],
            exit: []
        };
        this.count = 0;
        this.id = Math.random();
        if (global$1[kExitEmitter]) {
            return global$1[kExitEmitter];
        }
        ObjectDefineProperty(global$1, kExitEmitter, {
            value: this,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
    var _proto = Emitter.prototype;
    _proto.on = function on(ev, fn) {
        this.listeners[ev].push(fn);
    };
    _proto.removeListener = function removeListener(ev, fn) {
        var list = this.listeners[ev];
        var i = list.indexOf(fn);
        /* c8 ignore start */ if (i === -1) {
            return;
        }
        /* c8 ignore stop */ if (i === 0 && list.length === 1) {
            list.length = 0;
        } else {
            list.splice(i, 1);
        }
    };
    _proto.emit = function emit(ev, code, signal) {
        if (this.emitted[ev]) {
            return false;
        }
        this.emitted[ev] = true;
        var ret = false;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = this.listeners[ev][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var fn = _step.value;
                ret = fn(code, signal) === true || ret;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        if (ev === 'exit') {
            ret = this.emit('afterExit', code, signal) || ret;
        }
        return ret;
    };
    return Emitter;
}();
var SignalExitBase = function SignalExitBase() {
    _class_call_check$5(this, SignalExitBase);
};
var signalExitWrap = function(handler) {
    return {
        onExit: function onExit(cb, opts) {
            return handler.onExit(cb, opts);
        },
        load: function load() {
            return handler.load();
        },
        unload: function unload() {
            return handler.unload();
        }
    };
};
var SignalExitFallback = /*#__PURE__*/ function(SignalExitBase) {
    _inherits$1(SignalExitFallback, SignalExitBase);
    function SignalExitFallback() {
        _class_call_check$5(this, SignalExitFallback);
        return _call_super$1(this, SignalExitFallback, arguments);
    }
    var _proto = SignalExitFallback.prototype;
    _proto.onExit = function onExit() {
        return function() {};
    };
    _proto.load = function load() {};
    _proto.unload = function unload() {};
    return SignalExitFallback;
}(SignalExitBase);
var // "SIGHUP" throws an `ENOSYS` error on Windows,
// so use a supported signal instead
/* c8 ignore start */ _hupSig = /*#__PURE__*/ new WeakMap(), /* c8 ignore stop */ _emitter = /*#__PURE__*/ new WeakMap(), _process = /*#__PURE__*/ new WeakMap(), _originalProcessEmit = /*#__PURE__*/ new WeakMap(), _originalProcessReallyExit = /*#__PURE__*/ new WeakMap(), _sigListeners = /*#__PURE__*/ new WeakMap(), _loaded = /*#__PURE__*/ new WeakMap(), _processReallyExit = /*#__PURE__*/ new WeakSet(), _processEmit = /*#__PURE__*/ new WeakSet();
var SignalExit = /*#__PURE__*/ function(SignalExitBase) {
    _inherits$1(SignalExit, SignalExitBase);
    function SignalExit(process1) {
        _class_call_check$5(this, SignalExit);
        var _this;
        _this = _call_super$1(this, SignalExit), _class_private_method_init(_this, _processReallyExit), _class_private_method_init(_this, _processEmit), _class_private_field_init(_this, _hupSig, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _emitter, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _process, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _originalProcessEmit, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _originalProcessReallyExit, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _sigListeners, {
            writable: true,
            value: undefined
        }), _class_private_field_init(_this, _loaded, {
            writable: true,
            value: undefined
        }), _class_private_field_set(_this, _hupSig, process$1.platform === 'win32' ? 'SIGINT' : 'SIGHUP'), _class_private_field_set(_this, _emitter, new Emitter()), _class_private_field_set(_this, _sigListeners, {}), _class_private_field_set(_this, _loaded, false);
        _class_private_field_set(_this, _process, process1);
        // { <signal>: <listener fn>, ... }
        _class_private_field_set(_this, _sigListeners, {});
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var sig = _step.value;
                _class_private_field_get(_this, _sigListeners)[sig] = function() {
                    // If there are no other listeners, an exit is coming!
                    // Simplest way: remove us and then re-send the signal.
                    // We know that this will kill the process, so we can
                    // safely emit now.
                    var listeners = _class_private_field_get(_this, _process).listeners(sig);
                    var count = _class_private_field_get(_this, _emitter).count;
                    // This is a workaround for the fact that signal-exit v3 and signal
                    // exit v4 are not aware of each other, and each will attempt to let
                    // the other handle it, so neither of them do. To correct this, we
                    // detect if we're the only handler *except* for previous versions
                    // of signal-exit, and increment by the count of listeners it has
                    // created.
                    /* c8 ignore start */ var p = process1;
                    if (_type_of$5(p.__signal_exit_emitter__) === 'object' && typeof p.__signal_exit_emitter__.count === 'number') {
                        count += p.__signal_exit_emitter__.count;
                    }
                    /* c8 ignore stop */ if (listeners.length === count) {
                        _this.unload();
                        var ret = _class_private_field_get(_this, _emitter).emit('exit', null, sig);
                        /* c8 ignore start */ var s = sig === 'SIGHUP' ? _class_private_field_get(_this, _hupSig) : sig;
                        if (!ret) process1.kill(process1.pid, s);
                    /* c8 ignore stop */ }
                };
            };
            for(var _iterator = signals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        _class_private_field_set(_this, _originalProcessReallyExit, process1.reallyExit);
        _class_private_field_set(_this, _originalProcessEmit, process1.emit);
        return _this;
    }
    var _proto = SignalExit.prototype;
    _proto.onExit = function onExit(cb, opts) {
        var _this = this;
        /* c8 ignore start */ if (!processOk(_class_private_field_get(this, _process))) {
            return function() {};
        }
        /* c8 ignore stop */ if (_class_private_field_get(this, _loaded) === false) {
            this.load();
        }
        var ev = (opts === null || opts === undefined ? undefined : opts.alwaysLast) ? 'afterExit' : 'exit';
        _class_private_field_get(this, _emitter).on(ev, cb);
        return function() {
            _class_private_field_get(_this, _emitter).removeListener(ev, cb);
            if (_class_private_field_get(_this, _emitter).listeners['exit'].length === 0 && _class_private_field_get(_this, _emitter).listeners['afterExit'].length === 0) {
                _this.unload();
            }
        };
    };
    _proto.load = function load() {
        var _this = this;
        var _this1 = this;
        if (_class_private_field_get(this, _loaded)) {
            return;
        }
        _class_private_field_set(this, _loaded, true);
        // This is the number of onSignalExit's that are in play.
        // It's important so that we can count the correct number of
        // listeners on signals, and don't wait for the other one to
        // handle it instead of us.
        _class_private_field_get(this, _emitter).count += 1;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = signals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var sig = _step.value;
                try {
                    var fn = _class_private_field_get(this, _sigListeners)[sig];
                    if (fn) _class_private_field_get(this, _process).on(sig, fn);
                } catch (_) {}
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        _class_private_field_get(this, _process).emit = function(ev) {
            for(var _len = arguments.length, a = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                a[_key - 1] = arguments[_key];
            }
            var _$_class_private_method_get;
            return (_$_class_private_method_get = _class_private_method_get(_this1, _processEmit, processEmit)).call.apply(_$_class_private_method_get, [
                _this1,
                ev
            ].concat(_to_consumable_array$1(a)));
        };
        _class_private_field_get(this, _process).reallyExit = function(code) {
            return _class_private_method_get(_this, _processReallyExit, processReallyExit).call(_this, code);
        };
    };
    _proto.unload = function unload() {
        var _this = this;
        if (!_class_private_field_get(this, _loaded)) {
            return;
        }
        _class_private_field_set(this, _loaded, false);
        signals.forEach(function(sig) {
            var listener = _class_private_field_get(_this, _sigListeners)[sig];
            /* c8 ignore start */ if (!listener) {
                throw new Error('Listener not defined for signal: ' + sig);
            }
            /* c8 ignore stop */ try {
                _class_private_field_get(_this, _process).removeListener(sig, listener);
            /* c8 ignore start */ } catch (_) {}
        /* c8 ignore stop */ });
        _class_private_field_get(this, _process).emit = _class_private_field_get(this, _originalProcessEmit);
        _class_private_field_get(this, _process).reallyExit = _class_private_field_get(this, _originalProcessReallyExit);
        _class_private_field_get(this, _emitter).count -= 1;
    };
    return SignalExit;
}(SignalExitBase);
function processReallyExit(code) {
    /* c8 ignore start */ if (!processOk(_class_private_field_get(this, _process))) {
        return 0;
    }
    _class_private_field_get(this, _process).exitCode = code || 0;
    /* c8 ignore stop */ _class_private_field_get(this, _emitter).emit('exit', _class_private_field_get(this, _process).exitCode, null);
    return _class_private_field_get(this, _originalProcessReallyExit).call(_class_private_field_get(this, _process), _class_private_field_get(this, _process).exitCode);
}
function processEmit(ev) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    var og = _class_private_field_get(this, _originalProcessEmit);
    if (ev === 'exit' && processOk(_class_private_field_get(this, _process))) {
        var _og;
        if (typeof args[0] === 'number') {
            _class_private_field_get(this, _process).exitCode = args[0];
        /* c8 ignore start */ }
        /* c8 ignore start */ var ret = (_og = og).call.apply(_og, [
            _class_private_field_get(this, _process),
            ev
        ].concat(_to_consumable_array$1(args)));
        /* c8 ignore start */ _class_private_field_get(this, _emitter).emit('exit', _class_private_field_get(this, _process).exitCode, null);
        /* c8 ignore stop */ return ret;
    } else {
        var _og1;
        return (_og1 = og).call.apply(_og1, [
            _class_private_field_get(this, _process),
            ev
        ].concat(_to_consumable_array$1(args)));
    }
}
var process$1 = globalThis.process;
var _signalExitWrap = signalExitWrap(processOk(process$1) ? new SignalExit(process$1) : new SignalExitFallback());
// wrap so that we call the method on the actual handler, without
// exporting it directly.
var /**
 * Called when the process is exiting, whether via signal, explicit
 * exit, or running out of stuff to do.
 *
 * If the global process object is not suitable for instrumentation,
 * then this will be a no-op.
 *
 * Returns a function that may be used to unload signal-exit.
 */ onExit = _signalExitWrap.onExit;

var colorSupport_1;
var hasRequiredColorSupport;
function requireColorSupport() {
    if (hasRequiredColorSupport) return colorSupport_1;
    hasRequiredColorSupport = 1;
    // call it on itself so we can test the export val for basic stuff
    colorSupport_1 = colorSupport({
        alwaysReturn: true
    }, colorSupport);
    function hasNone(obj, options) {
        obj.level = 0;
        obj.hasBasic = false;
        obj.has256 = false;
        obj.has16m = false;
        if (!options.alwaysReturn) {
            return false;
        }
        return obj;
    }
    function hasBasic(obj) {
        obj.hasBasic = true;
        obj.has256 = false;
        obj.has16m = false;
        obj.level = 1;
        return obj;
    }
    function has256(obj) {
        obj.hasBasic = true;
        obj.has256 = true;
        obj.has16m = false;
        obj.level = 2;
        return obj;
    }
    function has16m(obj) {
        obj.hasBasic = true;
        obj.has256 = true;
        obj.has16m = true;
        obj.level = 3;
        return obj;
    }
    function colorSupport(options, obj) {
        options = options || {};
        obj = obj || {};
        // if just requesting a specific level, then return that.
        if (typeof options.level === 'number') {
            switch(options.level){
                case 0:
                    return hasNone(obj, options);
                case 1:
                    return hasBasic(obj);
                case 2:
                    return has256(obj);
                case 3:
                    return has16m(obj);
            }
        }
        obj.level = 0;
        obj.hasBasic = false;
        obj.has256 = false;
        obj.has16m = false;
        if (typeof process === 'undefined' || !process || !process.stdout || !process.env || !process.platform) {
            return hasNone(obj, options);
        }
        var env = options.env || process.env;
        var stream = options.stream || process.stdout;
        var term = options.term || env.TERM || '';
        var platform = options.platform || process.platform;
        if (!options.ignoreTTY && !stream.isTTY) {
            return hasNone(obj, options);
        }
        if (!options.ignoreDumb && term === 'dumb' && !env.COLORTERM) {
            return hasNone(obj, options);
        }
        if (platform === 'win32') {
            return hasBasic(obj);
        }
        if (env.TMUX) {
            return has256(obj);
        }
        if (!options.ignoreCI && (env.CI || env.TEAMCITY_VERSION)) {
            if (env.TRAVIS) {
                return has256(obj);
            } else {
                return hasNone(obj, options);
            }
        }
        // TODO: add more term programs
        switch(env.TERM_PROGRAM){
            case 'iTerm.app':
                var ver = env.TERM_PROGRAM_VERSION || '0.';
                if (/^[0-2]\./.test(ver)) {
                    return has256(obj);
                } else {
                    return has16m(obj);
                }
            case 'HyperTerm':
            case 'Hyper':
                return has16m(obj);
            case 'MacTerm':
                return has16m(obj);
            case 'Apple_Terminal':
                return has256(obj);
        }
        if (/^xterm-256/.test(term)) {
            return has256(obj);
        }
        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(term)) {
            return hasBasic(obj);
        }
        if (env.COLORTERM) {
            return hasBasic(obj);
        }
        return hasNone(obj, options);
    }
    return colorSupport_1;
}

var colorSupportExports = requireColorSupport();
var colorSupport = /*@__PURE__*/ getDefaultExportFromCjs(colorSupportExports);

var hasColor = colorSupport().hasBasic;

function _instanceof$1(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of$4(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var aproba;
var hasRequiredAproba;
function requireAproba() {
    if (hasRequiredAproba) return aproba;
    hasRequiredAproba = 1;
    aproba = validate;
    function isArguments(thingy) {
        return thingy != null && (typeof thingy === "undefined" ? "undefined" : _type_of$4(thingy)) === 'object' && thingy.hasOwnProperty('callee');
    }
    var types = {
        '*': {
            label: 'any',
            check: function() {
                return true;
            }
        },
        A: {
            label: 'array',
            check: function(_) {
                return Array.isArray(_) || isArguments(_);
            }
        },
        S: {
            label: 'string',
            check: function(_) {
                return typeof _ === 'string';
            }
        },
        N: {
            label: 'number',
            check: function(_) {
                return typeof _ === 'number';
            }
        },
        F: {
            label: 'function',
            check: function(_) {
                return typeof _ === 'function';
            }
        },
        O: {
            label: 'object',
            check: function(_) {
                return (typeof _ === "undefined" ? "undefined" : _type_of$4(_)) === 'object' && _ != null && !types.A.check(_) && !types.E.check(_);
            }
        },
        B: {
            label: 'boolean',
            check: function(_) {
                return typeof _ === 'boolean';
            }
        },
        E: {
            label: 'error',
            check: function(_) {
                return _instanceof$1(_, Error);
            }
        },
        Z: {
            label: 'null',
            check: function(_) {
                return _ == null;
            }
        }
    };
    function addSchema(schema, arity) {
        var group = arity[schema.length] = arity[schema.length] || [];
        if (group.indexOf(schema) === -1) group.push(schema);
    }
    function validate(rawSchemas, args) {
        var _loop = function(ii) {
            var newMatching = matching.filter(function(schema) {
                var type = schema[ii];
                var typeCheck = types[type].check;
                return typeCheck(args[ii]);
            });
            if (!newMatching.length) {
                var labels = matching.map(function(_) {
                    return types[_[ii]].label;
                }).filter(function(_) {
                    return _ != null;
                });
                throw invalidType(ii, labels, args[ii]);
            }
            matching = newMatching;
        };
        if (arguments.length !== 2) throw wrongNumberOfArgs([
            'SA'
        ], arguments.length);
        if (!rawSchemas) throw missingRequiredArg(0);
        if (!args) throw missingRequiredArg(1);
        if (!types.S.check(rawSchemas)) throw invalidType(0, [
            'string'
        ], rawSchemas);
        if (!types.A.check(args)) throw invalidType(1, [
            'array'
        ], args);
        var schemas = rawSchemas.split('|');
        var arity = {};
        schemas.forEach(function(schema) {
            for(var ii = 0; ii < schema.length; ++ii){
                var type = schema[ii];
                if (!types[type]) throw unknownType(ii, type);
            }
            if (/E.*E/.test(schema)) throw moreThanOneError(schema);
            addSchema(schema, arity);
            if (/E/.test(schema)) {
                addSchema(schema.replace(/E.*$/, 'E'), arity);
                addSchema(schema.replace(/E/, 'Z'), arity);
                if (schema.length === 1) addSchema('', arity);
            }
        });
        var matching = arity[args.length];
        if (!matching) {
            throw wrongNumberOfArgs(Object.keys(arity), args.length);
        }
        for(var ii = 0; ii < args.length; ++ii)_loop(ii);
    }
    function missingRequiredArg(num) {
        return newException('EMISSINGARG', 'Missing required argument #' + (num + 1));
    }
    function unknownType(num, type) {
        return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1));
    }
    function invalidType(num, expectedTypes, value) {
        var valueType;
        Object.keys(types).forEach(function(typeCode) {
            if (types[typeCode].check(value)) valueType = types[typeCode].label;
        });
        return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' + englishList(expectedTypes) + ' but got ' + valueType);
    }
    function englishList(list) {
        return list.join(', ').replace(/, ([^,]+)$/, ' or $1');
    }
    function wrongNumberOfArgs(expected, got) {
        var english = englishList(expected);
        var args = expected.every(function(ex) {
            return ex.length === 1;
        }) ? 'argument' : 'arguments';
        return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got);
    }
    function moreThanOneError(schema) {
        return newException('ETOOMANYERRORTYPES', 'Only one error type per argument signature is allowed, more than one found in "' + schema + '"');
    }
    function newException(code, msg) {
        var err = new Error(msg);
        err.code = code;
        /* istanbul ignore else */ if (Error.captureStackTrace) Error.captureStackTrace(err, validate);
        return err;
    }
    return aproba;
}

var aprobaExports = requireAproba();
var validate$1 = /*@__PURE__*/ getDefaultExportFromCjs(aprobaExports);

var align$1 = {};

var ansiRegex;
var hasRequiredAnsiRegex;
function requireAnsiRegex() {
    if (hasRequiredAnsiRegex) return ansiRegex;
    hasRequiredAnsiRegex = 1;
    ansiRegex = function() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, _ref_onlyFirst = _ref.onlyFirst, onlyFirst = _ref_onlyFirst === undefined ? false : _ref_onlyFirst;
        var pattern = [
            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
        ].join('|');
        return new RegExp(pattern, onlyFirst ? undefined : 'g');
    };
    return ansiRegex;
}

var stripAnsi$1;
var hasRequiredStripAnsi;
function requireStripAnsi() {
    if (hasRequiredStripAnsi) return stripAnsi$1;
    hasRequiredStripAnsi = 1;
    var ansiRegex = requireAnsiRegex();
    stripAnsi$1 = function(string) {
        return typeof string === 'string' ? string.replace(ansiRegex(), '') : string;
    };
    return stripAnsi$1;
}

var stripAnsiExports = requireStripAnsi();
var stripAnsi = /*@__PURE__*/ getDefaultExportFromCjs(stripAnsiExports);

// Generated code.
function isAmbiguous(x) {
    return x === 0xA1 || x === 0xA4 || x === 0xA7 || x === 0xA8 || x === 0xAA || x === 0xAD || x === 0xAE || x >= 0xB0 && x <= 0xB4 || x >= 0xB6 && x <= 0xBA || x >= 0xBC && x <= 0xBF || x === 0xC6 || x === 0xD0 || x === 0xD7 || x === 0xD8 || x >= 0xDE && x <= 0xE1 || x === 0xE6 || x >= 0xE8 && x <= 0xEA || x === 0xEC || x === 0xED || x === 0xF0 || x === 0xF2 || x === 0xF3 || x >= 0xF7 && x <= 0xFA || x === 0xFC || x === 0xFE || x === 0x101 || x === 0x111 || x === 0x113 || x === 0x11B || x === 0x126 || x === 0x127 || x === 0x12B || x >= 0x131 && x <= 0x133 || x === 0x138 || x >= 0x13F && x <= 0x142 || x === 0x144 || x >= 0x148 && x <= 0x14B || x === 0x14D || x === 0x152 || x === 0x153 || x === 0x166 || x === 0x167 || x === 0x16B || x === 0x1CE || x === 0x1D0 || x === 0x1D2 || x === 0x1D4 || x === 0x1D6 || x === 0x1D8 || x === 0x1DA || x === 0x1DC || x === 0x251 || x === 0x261 || x === 0x2C4 || x === 0x2C7 || x >= 0x2C9 && x <= 0x2CB || x === 0x2CD || x === 0x2D0 || x >= 0x2D8 && x <= 0x2DB || x === 0x2DD || x === 0x2DF || x >= 0x300 && x <= 0x36F || x >= 0x391 && x <= 0x3A1 || x >= 0x3A3 && x <= 0x3A9 || x >= 0x3B1 && x <= 0x3C1 || x >= 0x3C3 && x <= 0x3C9 || x === 0x401 || x >= 0x410 && x <= 0x44F || x === 0x451 || x === 0x2010 || x >= 0x2013 && x <= 0x2016 || x === 0x2018 || x === 0x2019 || x === 0x201C || x === 0x201D || x >= 0x2020 && x <= 0x2022 || x >= 0x2024 && x <= 0x2027 || x === 0x2030 || x === 0x2032 || x === 0x2033 || x === 0x2035 || x === 0x203B || x === 0x203E || x === 0x2074 || x === 0x207F || x >= 0x2081 && x <= 0x2084 || x === 0x20AC || x === 0x2103 || x === 0x2105 || x === 0x2109 || x === 0x2113 || x === 0x2116 || x === 0x2121 || x === 0x2122 || x === 0x2126 || x === 0x212B || x === 0x2153 || x === 0x2154 || x >= 0x215B && x <= 0x215E || x >= 0x2160 && x <= 0x216B || x >= 0x2170 && x <= 0x2179 || x === 0x2189 || x >= 0x2190 && x <= 0x2199 || x === 0x21B8 || x === 0x21B9 || x === 0x21D2 || x === 0x21D4 || x === 0x21E7 || x === 0x2200 || x === 0x2202 || x === 0x2203 || x === 0x2207 || x === 0x2208 || x === 0x220B || x === 0x220F || x === 0x2211 || x === 0x2215 || x === 0x221A || x >= 0x221D && x <= 0x2220 || x === 0x2223 || x === 0x2225 || x >= 0x2227 && x <= 0x222C || x === 0x222E || x >= 0x2234 && x <= 0x2237 || x === 0x223C || x === 0x223D || x === 0x2248 || x === 0x224C || x === 0x2252 || x === 0x2260 || x === 0x2261 || x >= 0x2264 && x <= 0x2267 || x === 0x226A || x === 0x226B || x === 0x226E || x === 0x226F || x === 0x2282 || x === 0x2283 || x === 0x2286 || x === 0x2287 || x === 0x2295 || x === 0x2299 || x === 0x22A5 || x === 0x22BF || x === 0x2312 || x >= 0x2460 && x <= 0x24E9 || x >= 0x24EB && x <= 0x254B || x >= 0x2550 && x <= 0x2573 || x >= 0x2580 && x <= 0x258F || x >= 0x2592 && x <= 0x2595 || x === 0x25A0 || x === 0x25A1 || x >= 0x25A3 && x <= 0x25A9 || x === 0x25B2 || x === 0x25B3 || x === 0x25B6 || x === 0x25B7 || x === 0x25BC || x === 0x25BD || x === 0x25C0 || x === 0x25C1 || x >= 0x25C6 && x <= 0x25C8 || x === 0x25CB || x >= 0x25CE && x <= 0x25D1 || x >= 0x25E2 && x <= 0x25E5 || x === 0x25EF || x === 0x2605 || x === 0x2606 || x === 0x2609 || x === 0x260E || x === 0x260F || x === 0x261C || x === 0x261E || x === 0x2640 || x === 0x2642 || x === 0x2660 || x === 0x2661 || x >= 0x2663 && x <= 0x2665 || x >= 0x2667 && x <= 0x266A || x === 0x266C || x === 0x266D || x === 0x266F || x === 0x269E || x === 0x269F || x === 0x26BF || x >= 0x26C6 && x <= 0x26CD || x >= 0x26CF && x <= 0x26D3 || x >= 0x26D5 && x <= 0x26E1 || x === 0x26E3 || x === 0x26E8 || x === 0x26E9 || x >= 0x26EB && x <= 0x26F1 || x === 0x26F4 || x >= 0x26F6 && x <= 0x26F9 || x === 0x26FB || x === 0x26FC || x === 0x26FE || x === 0x26FF || x === 0x273D || x >= 0x2776 && x <= 0x277F || x >= 0x2B56 && x <= 0x2B59 || x >= 0x3248 && x <= 0x324F || x >= 0xE000 && x <= 0xF8FF || x >= 0xFE00 && x <= 0xFE0F || x === 0xFFFD || x >= 0x1F100 && x <= 0x1F10A || x >= 0x1F110 && x <= 0x1F12D || x >= 0x1F130 && x <= 0x1F169 || x >= 0x1F170 && x <= 0x1F18D || x === 0x1F18F || x === 0x1F190 || x >= 0x1F19B && x <= 0x1F1AC || x >= 0xE0100 && x <= 0xE01EF || x >= 0xF0000 && x <= 0xFFFFD || x >= 0x100000 && x <= 0x10FFFD;
}
function isFullWidth(x) {
    return x === 0x3000 || x >= 0xFF01 && x <= 0xFF60 || x >= 0xFFE0 && x <= 0xFFE6;
}
function isWide(x) {
    return x >= 0x1100 && x <= 0x115F || x === 0x231A || x === 0x231B || x === 0x2329 || x === 0x232A || x >= 0x23E9 && x <= 0x23EC || x === 0x23F0 || x === 0x23F3 || x === 0x25FD || x === 0x25FE || x === 0x2614 || x === 0x2615 || x >= 0x2630 && x <= 0x2637 || x >= 0x2648 && x <= 0x2653 || x === 0x267F || x >= 0x268A && x <= 0x268F || x === 0x2693 || x === 0x26A1 || x === 0x26AA || x === 0x26AB || x === 0x26BD || x === 0x26BE || x === 0x26C4 || x === 0x26C5 || x === 0x26CE || x === 0x26D4 || x === 0x26EA || x === 0x26F2 || x === 0x26F3 || x === 0x26F5 || x === 0x26FA || x === 0x26FD || x === 0x2705 || x === 0x270A || x === 0x270B || x === 0x2728 || x === 0x274C || x === 0x274E || x >= 0x2753 && x <= 0x2755 || x === 0x2757 || x >= 0x2795 && x <= 0x2797 || x === 0x27B0 || x === 0x27BF || x === 0x2B1B || x === 0x2B1C || x === 0x2B50 || x === 0x2B55 || x >= 0x2E80 && x <= 0x2E99 || x >= 0x2E9B && x <= 0x2EF3 || x >= 0x2F00 && x <= 0x2FD5 || x >= 0x2FF0 && x <= 0x2FFF || x >= 0x3001 && x <= 0x303E || x >= 0x3041 && x <= 0x3096 || x >= 0x3099 && x <= 0x30FF || x >= 0x3105 && x <= 0x312F || x >= 0x3131 && x <= 0x318E || x >= 0x3190 && x <= 0x31E5 || x >= 0x31EF && x <= 0x321E || x >= 0x3220 && x <= 0x3247 || x >= 0x3250 && x <= 0xA48C || x >= 0xA490 && x <= 0xA4C6 || x >= 0xA960 && x <= 0xA97C || x >= 0xAC00 && x <= 0xD7A3 || x >= 0xF900 && x <= 0xFAFF || x >= 0xFE10 && x <= 0xFE19 || x >= 0xFE30 && x <= 0xFE52 || x >= 0xFE54 && x <= 0xFE66 || x >= 0xFE68 && x <= 0xFE6B || x >= 0x16FE0 && x <= 0x16FE4 || x === 0x16FF0 || x === 0x16FF1 || x >= 0x17000 && x <= 0x187F7 || x >= 0x18800 && x <= 0x18CD5 || x >= 0x18CFF && x <= 0x18D08 || x >= 0x1AFF0 && x <= 0x1AFF3 || x >= 0x1AFF5 && x <= 0x1AFFB || x === 0x1AFFD || x === 0x1AFFE || x >= 0x1B000 && x <= 0x1B122 || x === 0x1B132 || x >= 0x1B150 && x <= 0x1B152 || x === 0x1B155 || x >= 0x1B164 && x <= 0x1B167 || x >= 0x1B170 && x <= 0x1B2FB || x >= 0x1D300 && x <= 0x1D356 || x >= 0x1D360 && x <= 0x1D376 || x === 0x1F004 || x === 0x1F0CF || x === 0x1F18E || x >= 0x1F191 && x <= 0x1F19A || x >= 0x1F200 && x <= 0x1F202 || x >= 0x1F210 && x <= 0x1F23B || x >= 0x1F240 && x <= 0x1F248 || x === 0x1F250 || x === 0x1F251 || x >= 0x1F260 && x <= 0x1F265 || x >= 0x1F300 && x <= 0x1F320 || x >= 0x1F32D && x <= 0x1F335 || x >= 0x1F337 && x <= 0x1F37C || x >= 0x1F37E && x <= 0x1F393 || x >= 0x1F3A0 && x <= 0x1F3CA || x >= 0x1F3CF && x <= 0x1F3D3 || x >= 0x1F3E0 && x <= 0x1F3F0 || x === 0x1F3F4 || x >= 0x1F3F8 && x <= 0x1F43E || x === 0x1F440 || x >= 0x1F442 && x <= 0x1F4FC || x >= 0x1F4FF && x <= 0x1F53D || x >= 0x1F54B && x <= 0x1F54E || x >= 0x1F550 && x <= 0x1F567 || x === 0x1F57A || x === 0x1F595 || x === 0x1F596 || x === 0x1F5A4 || x >= 0x1F5FB && x <= 0x1F64F || x >= 0x1F680 && x <= 0x1F6C5 || x === 0x1F6CC || x >= 0x1F6D0 && x <= 0x1F6D2 || x >= 0x1F6D5 && x <= 0x1F6D7 || x >= 0x1F6DC && x <= 0x1F6DF || x === 0x1F6EB || x === 0x1F6EC || x >= 0x1F6F4 && x <= 0x1F6FC || x >= 0x1F7E0 && x <= 0x1F7EB || x === 0x1F7F0 || x >= 0x1F90C && x <= 0x1F93A || x >= 0x1F93C && x <= 0x1F945 || x >= 0x1F947 && x <= 0x1F9FF || x >= 0x1FA70 && x <= 0x1FA7C || x >= 0x1FA80 && x <= 0x1FA89 || x >= 0x1FA8F && x <= 0x1FAC6 || x >= 0x1FACE && x <= 0x1FADC || x >= 0x1FADF && x <= 0x1FAE9 || x >= 0x1FAF0 && x <= 0x1FAF8 || x >= 0x20000 && x <= 0x2FFFD || x >= 0x30000 && x <= 0x3FFFD;
}

function _type_of$3(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function validate(codePoint) {
    if (!Number.isSafeInteger(codePoint)) {
        throw new TypeError("Expected a code point, got `".concat(typeof codePoint === "undefined" ? "undefined" : _type_of$3(codePoint), "`."));
    }
}
function eastAsianWidth(codePoint) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref_ambiguousAsWide = _ref.ambiguousAsWide, ambiguousAsWide = _ref_ambiguousAsWide === undefined ? false : _ref_ambiguousAsWide;
    validate(codePoint);
    if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
        return 2;
    }
    return 1;
}

var emojiRegex$1;
var hasRequiredEmojiRegex;
function requireEmojiRegex() {
    if (hasRequiredEmojiRegex) return emojiRegex$1;
    hasRequiredEmojiRegex = 1;
    emojiRegex$1 = function() {
        // https://mths.be/emoji
        return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
    return emojiRegex$1;
}

var emojiRegexExports = requireEmojiRegex();
var emojiRegex = /*@__PURE__*/ getDefaultExportFromCjs(emojiRegexExports);

var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function stringWidth(string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (typeof string !== 'string' || string.length === 0) {
        return 0;
    }
    var _options_ambiguousIsNarrow = options.ambiguousIsNarrow, ambiguousIsNarrow = _options_ambiguousIsNarrow === undefined ? true : _options_ambiguousIsNarrow, _options_countAnsiEscapeCodes = options.countAnsiEscapeCodes, countAnsiEscapeCodes = _options_countAnsiEscapeCodes === undefined ? false : _options_countAnsiEscapeCodes;
    if (!countAnsiEscapeCodes) {
        string = stripAnsi(string);
    }
    if (string.length === 0) {
        return 0;
    }
    var width = 0;
    var eastAsianWidthOptions = {
        ambiguousAsWide: !ambiguousIsNarrow
    };
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = segmenter.segment(string)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _step.value, character = _step_value.segment;
            var codePoint = character.codePointAt(0);
            // Ignore control characters
            if (codePoint <= 0x1F || codePoint >= 0x7F && codePoint <= 0x9F) {
                continue;
            }
            // Ignore zero-width characters
            if (codePoint >= 0x200B && codePoint <= 0x200F // Zero-width space, non-joiner, joiner, left-to-right mark, right-to-left mark
             || codePoint === 0xFEFF // Zero-width no-break space
            ) {
                continue;
            }
            // Ignore combining characters
            if (codePoint >= 0x300 && codePoint <= 0x36F // Combining diacritical marks
             || codePoint >= 0x1AB0 && codePoint <= 0x1AFF // Combining diacritical marks extended
             || codePoint >= 0x1DC0 && codePoint <= 0x1DFF // Combining diacritical marks supplement
             || codePoint >= 0x20D0 && codePoint <= 0x20FF // Combining diacritical marks for symbols
             || codePoint >= 0xFE20 && codePoint <= 0xFE2F // Combining half marks
            ) {
                continue;
            }
            // Ignore surrogate pairs
            if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                continue;
            }
            // Ignore variation selectors
            if (codePoint >= 0xFE00 && codePoint <= 0xFE0F) {
                continue;
            }
            // This covers some of the above cases, but we still keep them for performance reasons.
            if (defaultIgnorableCodePointRegex.test(character)) {
                continue;
            }
            // TODO: Use `/\p{RGI_Emoji}/v` when targeting Node.js 20.
            if (emojiRegex().test(character)) {
                width += 2;
                continue;
            }
            width += eastAsianWidth(codePoint, eastAsianWidthOptions);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return width;
}

var stringWidth$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: stringWidth
});

var require$$0 = /*@__PURE__*/ getAugmentedNamespace(stringWidth$1);

var hasRequiredAlign;
function requireAlign() {
    if (hasRequiredAlign) return align$1;
    hasRequiredAlign = 1;
    var stringWidth = require$$0;
    align$1.center = alignCenter;
    align$1.left = alignLeft;
    align$1.right = alignRight;
    // lodash's way of generating pad characters.
    function createPadding(width) {
        var result = '';
        var string = ' ';
        var n = width;
        do {
            if (n % 2) {
                result += string;
            }
            n = Math.floor(n / 2);
            string += string;
        }while (n);
        return result;
    }
    function alignLeft(str, width) {
        var trimmed = str.trimRight();
        if (trimmed.length === 0 && str.length >= width) return str;
        var padding = '';
        var strWidth = stringWidth(trimmed);
        if (strWidth < width) {
            padding = createPadding(width - strWidth);
        }
        return trimmed + padding;
    }
    function alignRight(str, width) {
        var trimmed = str.trimLeft();
        if (trimmed.length === 0 && str.length >= width) return str;
        var padding = '';
        var strWidth = stringWidth(trimmed);
        if (strWidth < width) {
            padding = createPadding(width - strWidth);
        }
        return padding + trimmed;
    }
    function alignCenter(str, width) {
        var trimmed = str.trim();
        if (trimmed.length === 0 && str.length >= width) return str;
        var padLeft = '';
        var padRight = '';
        var strWidth = stringWidth(trimmed);
        if (strWidth < width) {
            var padLeftBy = parseInt((width - strWidth) / 2, 10);
            padLeft = createPadding(padLeftBy);
            padRight = createPadding(width - (strWidth + padLeftBy));
        }
        return padLeft + trimmed + padRight;
    }
    return align$1;
}

var alignExports = requireAlign();
var align = /*@__PURE__*/ getDefaultExportFromCjs(alignExports);

var User = function(msg) {
    var err = new Error(msg);
    Error.captureStackTrace(err, User);
    err.code = 'EGAUGE';
    return err;
};
function MissingTemplateValue(item, values) {
    var err = User(util.format('Missing template value "%s"', item.type));
    Error.captureStackTrace(err, MissingTemplateValue);
    err.template = item;
    err.values = values;
    return err;
}
function Internal(msg) {
    var err = new Error(msg);
    Error.captureStackTrace(err, Internal);
    err.code = 'EGAUGEINTERNAL';
    return err;
}

function _class_call_check$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function isPercent(num) {
    if (typeof num !== 'string') {
        return false;
    }
    return num.slice(-1) === '%';
}
function percent(num) {
    return Number(num.slice(0, -1)) / 100;
}
var TemplateItem = /*#__PURE__*/ function() {
    function TemplateItem(values, outputLength) {
        _class_call_check$4(this, TemplateItem);
        this.type = null;
        this.value = null;
        this.length = null;
        this.maxLength = null;
        this.minLength = null;
        this.kerning = null;
        this.align = 'left';
        this.padLeft = 0;
        this.padRight = 0;
        this.index = null;
        this.first = null;
        this.last = null;
        this.overallOutputLength = outputLength;
        this.finished = false;
        this.type = null;
        this.value = null;
        this.length = null;
        this.maxLength = null;
        this.minLength = null;
        this.kerning = null;
        this.align = 'left';
        this.padLeft = 0;
        this.padRight = 0;
        this.index = null;
        this.first = null;
        this.last = null;
        if (typeof values === 'string') {
            this.value = values;
        } else {
            for(var prop in values){
                this[prop] = values[prop];
            }
        }
        if (isPercent(this.length)) {
            this.length = Math.round(this.overallOutputLength * percent(this.length));
        }
        if (isPercent(this.minLength)) {
            this.minLength = Math.round(this.overallOutputLength * percent(this.minLength));
        }
        if (isPercent(this.maxLength)) {
            this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength));
        }
        return this;
    }
    var _proto = TemplateItem.prototype;
    _proto.getBaseLength = function getBaseLength() {
        var length = this.length;
        if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {
            length = stringWidth(this.value);
        }
        return length;
    };
    _proto.getLength = function getLength() {
        var length = this.getBaseLength();
        if (length == null) {
            return null;
        }
        return length + this.padLeft + this.padRight;
    };
    _proto.getMaxLength = function getMaxLength() {
        if (this.maxLength == null) {
            return null;
        }
        return this.maxLength + this.padLeft + this.padRight;
    };
    _proto.getMinLength = function getMinLength() {
        if (this.minLength == null) {
            return null;
        }
        return this.minLength + this.padLeft + this.padRight;
    };
    return TemplateItem;
} 
();

function wideTruncate(str, target) {
    if (stringWidth(str) === 0) {
        return str;
    }
    if (target <= 0) {
        return '';
    }
    if (stringWidth(str) <= target) {
        return str;
    }
    var noAnsi = util.stripVTControlCharacters(str);
    var ansiSize = str.length + noAnsi.length;
    var truncated = str.slice(0, target + ansiSize);
    while(stringWidth(truncated) > target){
        truncated = truncated.slice(0, -1);
    }
    return truncated;
}

function renderValueWithValues(values) {
    return function(item) {
        return renderValue(item, values);
    };
}
var renderTemplate = function renderTemplate(width, template, values) {
    var items = prepareItems(width, template, values);
    var rendered = items.map(renderValueWithValues(values)).join('');
    return align.left(wideTruncate(rendered, width), width);
};
function preType(item) {
    var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
    return 'pre' + cappedTypeName;
}
function postType(item) {
    var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1);
    return 'post' + cappedTypeName;
}
function hasPreOrPost(item, values) {
    if (!item.type) {
        return;
    }
    return values[preType(item)] || values[postType(item)];
}
function generatePreAndPost(baseItem, parentValues) {
    var item = Object.assign({}, baseItem);
    var values = Object.create(parentValues);
    var template = [];
    var pre = preType(item);
    var post = postType(item);
    if (values[pre]) {
        template.push({
            value: values[pre]
        });
        values[pre] = null;
    }
    item.minLength = null;
    item.length = null;
    item.maxLength = null;
    template.push(item);
    values[item.type] = values[item.type];
    if (values[post]) {
        template.push({
            value: values[post]
        });
        values[post] = null;
    }
    return function($1, $2, length) {
        return renderTemplate(length, template, values);
    };
}
function prepareItems(width, template, values) {
    function cloneAndObjectify(item, index, arr) {
        var cloned = new TemplateItem(item, width);
        var type = cloned.type;
        if (cloned.value == null) {
            if (!(type in values)) {
                if (cloned == null) {
                    throw MissingTemplateValue(cloned, values);
                } else {
                    cloned.value = cloned;
                }
            } else {
                cloned.value = values[type];
            }
        }
        if (cloned.value == null || cloned.value === '') {
            return null;
        }
        cloned.index = index;
        cloned.first = index === 0;
        cloned.last = index === arr.length - 1;
        if (hasPreOrPost(cloned, values)) {
            cloned.value = generatePreAndPost(cloned, values);
        }
        return cloned;
    }
    var output = template.map(cloneAndObjectify).filter(function(item) {
        return item != null;
    });
    var remainingSpace = width;
    var variableCount = output.length;
    function consumeSpace(length) {
        if (length > remainingSpace) {
            length = remainingSpace;
        }
        remainingSpace -= length;
    }
    function finishSizing(item, length) {
        if (item.finished) {
            throw Internal('Tried to finish template item that was already finished');
        }
        if (length === Infinity) {
            throw Internal('Length of template item cannot be infinity');
        }
        if (length != null) {
            item.length = length;
        }
        item.minLength = null;
        item.maxLength = null;
        --variableCount;
        item.finished = true;
        if (item.length == null) {
            item.length = item.getBaseLength();
        }
        if (item.length == null) {
            throw Internal('Finished template items must have a length');
        }
        consumeSpace(item.getLength());
    }
    output.forEach(function(item) {
        if (!item.kerning) {
            return;
        }
        var prevPadRight = item.first ? 0 : output[item.index - 1].padRight;
        if (!item.first && prevPadRight < item.kerning) {
            item.padLeft = item.kerning - prevPadRight;
        }
        if (!item.last) {
            item.padRight = item.kerning;
        }
    });
    output.forEach(function(item) {
        if (item.getBaseLength() == null) {
            return;
        }
        finishSizing(item);
    });
    var resized = 0;
    var resizing;
    var hunkSize;
    do {
        resizing = false;
        hunkSize = Math.round(remainingSpace / variableCount);
        output.forEach(function(item) {
            if (item.finished) {
                return;
            }
            if (!item.maxLength) {
                return;
            }
            if (item.getMaxLength() < hunkSize) {
                finishSizing(item, item.maxLength);
                resizing = true;
            }
        });
    }while (resizing && resized++ < output.length);
    if (resizing) {
        throw Internal('Resize loop iterated too many times while determining maxLength');
    }
    resized = 0;
    do {
        resizing = false;
        hunkSize = Math.round(remainingSpace / variableCount);
        output.forEach(function(item) {
            if (item.finished) {
                return;
            }
            if (!item.minLength) {
                return;
            }
            if (item.getMinLength() >= hunkSize) {
                finishSizing(item, item.minLength);
                resizing = true;
            }
        });
    }while (resizing && resized++ < output.length);
    if (resizing) {
        throw Internal('Resize loop iterated too many times while determining minLength');
    }
    hunkSize = Math.round(remainingSpace / variableCount);
    output.forEach(function(item) {
        if (item.finished) {
            return;
        }
        finishSizing(item, hunkSize);
    });
    return output;
}
function renderFunction(item, values, length) {
    validate$1('OON', arguments);
    if (item.type) {
        return item.value(values, values[item.type + 'Theme'] || {}, length);
    } else {
        return item.value(values, {}, length);
    }
}
function renderValue(item, values) {
    var length = item.getBaseLength();
    var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value;
    if (value == null || value === '') {
        return '';
    }
    var alignWith = align[item.align] || align.left;
    var leftPadding = item.padLeft ? align.left('', item.padLeft) : '';
    var rightPadding = item.padRight ? align.right('', item.padRight) : '';
    var truncated = wideTruncate(String(value), length);
    var aligned = alignWith(truncated, length);
    return leftPadding + aligned + rightPadding;
}

function _class_call_check$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Plumbing = /*#__PURE__*/ function() {
    function Plumbing(theme, template, width) {
        _class_call_check$3(this, Plumbing);
        if (!width) {
            width = 80;
        }
        validate$1('OAN', [
            theme,
            template,
            width
        ]);
        this.showing = false;
        this.theme = theme;
        this.width = width;
        this.template = template;
    }
    var _proto = Plumbing.prototype;
    _proto.setTheme = function setTheme(theme) {
        validate$1('O', [
            theme
        ]);
        this.theme = theme;
    };
    _proto.setTemplate = function setTemplate(template) {
        validate$1('A', [
            template
        ]);
        this.template = template;
    };
    _proto.setWidth = function setWidth(width) {
        validate$1('N', [
            width
        ]);
        this.width = width;
    };
    _proto.hideCursor = function hideCursor() {
        return consoleControl.hideCursor();
    };
    _proto.showCursor = function showCursor() {
        return consoleControl.showCursor();
    };
    _proto.hide = function hide() {
        return consoleControl.gotoSOL() + consoleControl.eraseLine();
    };
    _proto.show = function show(status) {
        var values = Object.create(this.theme);
        for(var key in status){
            values[key] = status[key];
        }
        return renderTemplate(this.width, this.template, values).trim() + consoleControl.color('reset') + consoleControl.eraseLine() + consoleControl.gotoSOL();
    };
    return Plumbing;
} 
();

function setImmediateFn() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    try {
        return window.setImmediate(args);
    } catch (_) {
        return process.nextTick(args);
    }
}

function progressBar(theme, width, completed) {
    validate$1('ONN', [
        theme,
        width,
        completed
    ]);
    if (completed < 0) {
        completed = 0;
    }
    if (completed > 1) {
        completed = 1;
    }
    if (width <= 0) {
        return '';
    }
    var sofar = Math.round(width * completed);
    var rest = width - sofar;
    var template = [
        {
            type: 'complete',
            value: repeat(theme.complete, sofar),
            length: sofar
        },
        {
            type: 'remaining',
            value: repeat(theme.remaining, rest),
            length: rest
        }
    ];
    return renderTemplate(width, template, theme);
}
function repeat(string, width) {
    var result = '';
    var n = width;
    do {
        if (n % 2) {
            result += string;
        }
        n = Math.floor(n / 2);
        string += string;
    }while (n && stringWidth(result) < width);
    return wideTruncate(result, width);
}

function spin(spinstr, spun) {
    return spinstr[spun % spinstr.length];
}

function activityIndicator(values, theme, _width) {
    if (values.spun == null) {
        return;
    }
    return spin(theme, values.spun);
}
function progressbar(values, theme, width) {
    if (values.completed == null) {
        return;
    }
    return progressBar(theme, width, values.completed);
}
var baseTheme = {
    activityIndicator: activityIndicator,
    progressbar: progressbar
};

var ThemeSetProto = {};
ThemeSetProto.baseTheme = baseTheme;
ThemeSetProto.newTheme = function(parent, theme) {
    if (!theme) {
        theme = parent;
        parent = this.baseTheme;
    }
    return Object.assign({}, parent, theme);
};
ThemeSetProto.getThemeNames = function() {
    return Object.keys(this.themes);
};
ThemeSetProto.addTheme = function(name, parent, theme) {
    this.themes[name] = this.newTheme(parent, theme);
};
ThemeSetProto.addToAllThemes = function(theme) {
    var themes = this.themes;
    Object.keys(themes).forEach(function(name) {
        Object.assign(themes[name], theme);
    });
    Object.assign(this.baseTheme, theme);
};
ThemeSetProto.getTheme = function(name) {
    if (!this.themes[name]) {
        throw this.newMissingThemeError(name);
    }
    return this.themes[name];
};
ThemeSetProto.setDefault = function(opts, name) {
    if (name == null) {
        name = opts;
        opts = {};
    }
    var platform = opts.platform == null ? 'fallback' : opts.platform;
    var hasUnicode = !!opts.hasUnicode;
    var hasColor = !!opts.hasColor;
    if (!this.defaults[platform]) {
        this.defaults[platform] = {
            true: {},
            false: {}
        };
    }
    this.defaults[platform][String(hasUnicode)][String(hasColor)] = name;
};
ThemeSetProto.getDefault = function(opts) {
    if (!opts) {
        opts = {};
    }
    var platformName = opts.platform || process.platform;
    var platform = this.defaults[platformName] || this.defaults.fallback;
    var hasUnicode = !!opts.hasUnicode;
    var hasColor = !!opts.hasColor;
    if (!platform) {
        throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor);
    }
    if (!platform[String(hasUnicode)][String(hasColor)]) {
        if (hasUnicode && hasColor && platform[String(!hasUnicode)][String(hasColor)]) {
            hasUnicode = false;
        } else if (hasUnicode && hasColor && platform[String(hasUnicode)][String(!hasColor)]) {
            hasColor = false;
        } else if (hasUnicode && hasColor && platform[String(!hasUnicode)][String(!hasColor)]) {
            hasUnicode = false;
            hasColor = false;
        } else if (hasUnicode && !hasColor && platform[String(!hasUnicode)][String(hasColor)]) {
            hasUnicode = false;
        } else if (!hasUnicode && hasColor && platform[String(hasUnicode)][String(!hasColor)]) {
            hasColor = false;
        } else if (platform === this.defaults.fallback) {
            throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor);
        }
    }
    if (platform[String(hasUnicode)][String(hasColor)]) {
        return this.getTheme(platform[String(hasUnicode)][String(hasColor)]);
    } else {
        return this.getDefault(Object.assign({}, opts, {
            platform: 'fallback'
        }));
    }
};
ThemeSetProto.newMissingThemeError = function newMissingThemeError(name) {
    var err = new Error('Could not find a gauge theme named "' + name + '"');
    Error.captureStackTrace.call(err, newMissingThemeError);
    err.theme = name;
    err.code = 'EMISSINGTHEME';
    return err;
};
ThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError(platformName, hasUnicode, hasColor) {
    var err = new Error('Could not find a gauge theme for your platform/unicode/color use combo:\n' + '    platform = ' + platformName + '\n' + '    hasUnicode = ' + hasUnicode + '\n' + '    hasColor = ' + hasColor);
    Error.captureStackTrace.call(err, newMissingDefaultThemeError);
    err.platform = platformName;
    err.hasUnicode = hasUnicode;
    err.hasColor = hasColor;
    err.code = 'EMISSINGTHEME';
    return err;
};
ThemeSetProto.newThemeSet = function() {
    var themeset = function themeset1(opts) {
        return themeset.getDefault(opts);
    };
    return Object.assign(themeset, ThemeSetProto, {
        themes: Object.assign({}, this.themes),
        baseTheme: Object.assign({}, this.baseTheme),
        defaults: JSON.parse(JSON.stringify(this.defaults || {}))
    });
};
function ThemeSet() {
    return ThemeSetProto.newThemeSet();
}

var themes = ThemeSet();
themes.addTheme('ASCII', {
    preProgressbar: '[',
    postProgressbar: ']',
    progressbarTheme: {
        complete: '#',
        remaining: '.'
    },
    activityIndicatorTheme: '-\\|/',
    preSubsection: '>'
});
themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
    progressbarTheme: {
        preComplete: consoleControlStringsExports.color('bgBrightWhite', 'brightWhite'),
        complete: '#',
        postComplete: consoleControlStringsExports.color('reset'),
        preRemaining: consoleControlStringsExports.color('bgBrightBlack', 'brightBlack'),
        remaining: '.',
        postRemaining: consoleControlStringsExports.color('reset')
    }
});
themes.addTheme('brailleSpinner', {
    preProgressbar: '(',
    postProgressbar: ')',
    progressbarTheme: {
        complete: '#',
        remaining: '⠂'
    },
    activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
    preSubsection: '>'
});
themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
    progressbarTheme: {
        preComplete: consoleControlStringsExports.color('bgBrightWhite', 'brightWhite'),
        complete: '#',
        postComplete: consoleControlStringsExports.color('reset'),
        preRemaining: consoleControlStringsExports.color('bgBrightBlack', 'brightBlack'),
        remaining: '⠂',
        postRemaining: consoleControlStringsExports.color('reset')
    }
});
themes.setDefault({}, 'ASCII');
themes.setDefault({
    hasColor: true
}, 'colorASCII');
themes.setDefault({
    platform: 'darwin',
    hasUnicode: true
}, 'brailleSpinner');
themes.setDefault({
    platform: 'darwin',
    hasUnicode: true,
    hasColor: true
}, 'colorBrailleSpinner');
themes.setDefault({
    platform: 'linux',
    hasUnicode: true
}, 'brailleSpinner');
themes.setDefault({
    platform: 'linux',
    hasUnicode: true,
    hasColor: true
}, 'colorBrailleSpinner');

function _class_call_check$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _type_of$2(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function callWith(obj, method) {
    return function() {
        return method.call(obj);
    };
}
var Gauge = /*#__PURE__*/ function() {
    function Gauge(arg1, arg2) {
        _class_call_check$2(this, Gauge);
        var options, writeTo;
        if (arg1 && arg1.write) {
            writeTo = arg1;
            options = arg2 || {};
        } else if (arg2 && arg2.write) {
            writeTo = arg2;
            options = arg1 || {};
        } else {
            writeTo = process.stderr;
            options = arg1 || arg2 || {};
        }
        this._status = {
            spun: 0,
            section: '',
            subsection: ''
        };
        this._paused = false;
        this._disabled = true;
        this._showing = false;
        this._onScreen = false;
        this._needsRedraw = false;
        this._hideCursor = options.hideCursor == null ? true : options.hideCursor;
        this._fixedFramerate = options.fixedFramerate == null ? !/^v0\.8\./.test(process.version) : options.fixedFramerate;
        this._lastUpdateAt = null;
        this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval;
        this._themes = options.themes || themes;
        this._theme = options.theme;
        var theme = this._computeTheme(options.theme);
        var template = options.template || [
            {
                type: 'progressbar',
                length: 20
            },
            {
                type: 'activityIndicator',
                kerning: 1,
                length: 1
            },
            {
                type: 'section',
                kerning: 1,
                default: ''
            },
            {
                type: 'subsection',
                kerning: 1,
                default: ''
            }
        ];
        this.setWriteTo(writeTo, options.tty);
        var PlumbingClass = options.Plumbing || Plumbing;
        this._gauge = new PlumbingClass(theme, template, this.getWidth());
        this._$$doRedraw = callWith(this, this._doRedraw);
        this._$$handleSizeChange = callWith(this, this._handleSizeChange);
        this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit;
        this._removeOnExit = null;
        if (options.enabled || options.enabled == null && this._tty && this._tty.isTTY) {
            this.enable();
        } else {
            this.disable();
        }
    }
    var _proto = Gauge.prototype;
    _proto.isEnabled = function isEnabled() {
        return !this._disabled;
    };
    _proto.setTemplate = function setTemplate(template) {
        this._gauge.setTemplate(template);
        if (this._showing) {
            this._requestRedraw();
        }
    };
    _proto._computeTheme = function _computeTheme(theme) {
        if (!theme) {
            theme = {};
        }
        if (typeof theme === 'string') {
            theme = this._themes.getTheme(theme);
        } else if (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null) {
            var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode;
            var useColor = theme.hasColor == null ? hasColor : theme.hasColor;
            theme = this._themes.getDefault({
                hasUnicode: useUnicode,
                hasColor: useColor,
                platform: theme.platform
            });
        }
        return theme;
    };
    _proto.setThemeset = function setThemeset(themes) {
        this._themes = themes;
        this.setTheme(this._theme);
    };
    _proto.setTheme = function setTheme(theme) {
        this._gauge.setTheme(this._computeTheme(theme));
        if (this._showing) {
            this._requestRedraw();
        }
        this._theme = theme;
    };
    _proto._requestRedraw = function _requestRedraw() {
        this._needsRedraw = true;
        if (!this._fixedFramerate) {
            this._doRedraw();
        }
    };
    _proto.getWidth = function getWidth() {
        return (this._tty && this._tty.columns || 80) - 1;
    };
    _proto.setWriteTo = function setWriteTo(writeTo, tty) {
        var enabled = !this._disabled;
        if (enabled) {
            this.disable();
        }
        this._writeTo = writeTo;
        this._tty = tty || writeTo === process.stderr && process.stdout.isTTY && process.stdout || writeTo.isTTY && writeTo || this._tty;
        if (this._gauge) {
            this._gauge.setWidth(this.getWidth());
        }
        if (enabled) {
            this.enable();
        }
    };
    _proto.enable = function enable() {
        if (!this._disabled) {
            return;
        }
        this._disabled = false;
        if (this._tty) {
            this._enableEvents();
        }
        if (this._showing) {
            this.show();
        }
    };
    _proto.disable = function disable() {
        if (this._disabled) {
            return;
        }
        if (this._showing) {
            this._lastUpdateAt = null;
            this._showing = false;
            this._doRedraw();
            this._showing = true;
        }
        this._disabled = true;
        if (this._tty) {
            this._disableEvents();
        }
    };
    _proto._enableEvents = function _enableEvents() {
        if (this._cleanupOnExit) {
            this._removeOnExit = onExit(callWith(this, this.disable));
        }
        this._tty.on('resize', this._$$handleSizeChange);
        if (this._fixedFramerate) {
            this.redrawTracker = setInterval(this._$$doRedraw, this._updateInterval);
            if (this.redrawTracker.unref) {
                this.redrawTracker.unref();
            }
        }
    };
    _proto._disableEvents = function _disableEvents() {
        this._tty.removeListener('resize', this._$$handleSizeChange);
        if (this._fixedFramerate) {
            clearInterval(this.redrawTracker);
        }
        if (this._removeOnExit) {
            this._removeOnExit();
        }
    };
    _proto.hide = function hide(cb) {
        if (this._disabled) {
            return cb && process.nextTick(cb);
        }
        if (!this._showing) {
            return cb && process.nextTick(cb);
        }
        this._showing = false;
        this._doRedraw();
        cb && setImmediateFn(cb);
    };
    _proto.show = function show(section, completed) {
        this._showing = true;
        if (typeof section === 'string') {
            this._status.section = section;
        } else if ((typeof section === "undefined" ? "undefined" : _type_of$2(section)) === 'object') {
            var sectionKeys = Object.keys(section);
            for(var ii = 0; ii < sectionKeys.length; ++ii){
                var key = sectionKeys[ii];
                this._status[key] = section[key];
            }
        }
        if (completed != null) {
            this._status.completed = completed;
        }
        if (this._disabled) {
            return;
        }
        this._requestRedraw();
    };
    _proto.pulse = function pulse(subsection) {
        this._status.subsection = subsection || '';
        this._status.spun++;
        if (this._disabled) {
            return;
        }
        if (!this._showing) {
            return;
        }
        this._requestRedraw();
    };
    _proto._handleSizeChange = function _handleSizeChange() {
        this._gauge.setWidth(this._tty.columns - 1);
        this._requestRedraw();
    };
    _proto._doRedraw = function _doRedraw() {
        if (this._disabled || this._paused) {
            return;
        }
        if (!this._fixedFramerate) {
            var now = Date.now();
            if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) {
                return;
            }
            this._lastUpdateAt = now;
        }
        if (!this._showing && this._onScreen) {
            this._onScreen = false;
            var result = this._gauge.hide();
            if (this._hideCursor) {
                result += this._gauge.showCursor();
            }
            return this._writeTo.write(result);
        }
        if (!this._showing && !this._onScreen) {
            return;
        }
        if (this._showing && !this._onScreen) {
            this._onScreen = true;
            this._needsRedraw = true;
            if (this._hideCursor) {
                this._writeTo.write(this._gauge.hideCursor());
            }
        }
        if (!this._needsRedraw) {
            return;
        }
        if (!this._writeTo.write(this._gauge.show(this._status))) {
            this._paused = true;
            this._writeTo.on('drain', callWith(this, function() {
                this._paused = false;
                this._doRedraw();
            }));
        }
    };
    return Gauge;
} 
();

function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
function _assert_this_initialized(self) {
    if (self === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties$1(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class$1(Constructor, protoProps, staticProps) {
    _defineProperties$1(Constructor.prototype, protoProps);
    return Constructor;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of$1(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread();
}
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
setBlocking(true);
var Logger = /*#__PURE__*/ function(EventEmitter) {
    _inherits(Logger, EventEmitter);
    function Logger() {
        _class_call_check$1(this, Logger);
        var _this;
        _this = _call_super(this, Logger);
        _this._stream = process.stderr;
        _this._paused = false;
        _this._buffer = [];
        _this.unicodeEnabled = false;
        _this.colorEnabled = undefined;
        _this.id = 0;
        _this.record = [];
        _this.maxRecordSize = 10000;
        _this.level = 'info';
        _this.prefixStyle = {
            fg: 'magenta'
        };
        _this.headingStyle = {
            fg: 'white',
            bg: 'black'
        };
        _this.style = {};
        _this.levels = {};
        _this.disp = {};
        _this.gauge = new Gauge(_this._stream, {
            enabled: false,
            theme: {
                hasColor: _this.useColor()
            },
            template: [
                {
                    type: 'progressbar',
                    length: 20
                },
                {
                    type: 'activityIndicator',
                    kerning: 1,
                    length: 1
                },
                {
                    type: 'section',
                    default: ''
                },
                ':',
                {
                    type: 'logline',
                    kerning: 1,
                    default: ''
                }
            ]
        });
        _this.tracker = new TrackerGroup();
        _this.progressEnabled = _this.gauge.isEnabled();
        _this.addLevel('silly', -Infinity, {
            inverse: true
        }, 'sill');
        _this.addLevel('verbose', 1000, {
            fg: 'cyan',
            bg: 'black'
        }, 'verb');
        _this.addLevel('info', 2000, {
            fg: 'green'
        });
        _this.addLevel('timing', 2500, {
            fg: 'green',
            bg: 'black'
        });
        _this.addLevel('http', 3000, {
            fg: 'green',
            bg: 'black'
        });
        _this.addLevel('notice', 3500, {
            fg: 'cyan',
            bg: 'black'
        });
        _this.addLevel('warn', 4000, {
            fg: 'black',
            bg: 'yellow'
        }, 'WARN');
        _this.addLevel('error', 5000, {
            fg: 'red',
            bg: 'black'
        }, 'ERR!');
        _this.addLevel('silent', Infinity);
        _this.on('error', function() {});
        return _this;
    }
    var _proto = Logger.prototype;
    _proto.useColor = function useColor() {
        var _this__stream;
        var _this__stream_isTTY;
        return this.colorEnabled != null ? this.colorEnabled : (_this__stream_isTTY = (_this__stream = this._stream) === null || _this__stream === undefined ? undefined : _this__stream.isTTY) !== null && _this__stream_isTTY !== undefined ? _this__stream_isTTY : false;
    };
    _proto.enableColor = function enableColor() {
        this.colorEnabled = true;
        this.gauge.setTheme({
            hasColor: this.colorEnabled,
            hasUnicode: this.unicodeEnabled
        });
    };
    _proto.disableColor = function disableColor() {
        this.colorEnabled = false;
        this.gauge.setTheme({
            hasColor: this.colorEnabled,
            hasUnicode: this.unicodeEnabled
        });
    };
    _proto.enableUnicode = function enableUnicode() {
        this.unicodeEnabled = true;
        this.gauge.setTheme({
            hasColor: this.useColor(),
            hasUnicode: this.unicodeEnabled
        });
    };
    _proto.disableUnicode = function disableUnicode() {
        this.unicodeEnabled = false;
        this.gauge.setTheme({
            hasColor: this.useColor(),
            hasUnicode: this.unicodeEnabled
        });
    };
    _proto.setGaugeThemeset = function setGaugeThemeset(themes) {
        this.gauge.setThemeset(themes);
    };
    _proto.setGaugeTemplate = function setGaugeTemplate(template) {
        this.gauge.setTemplate(template);
    };
    _proto.enableProgress = function enableProgress() {
        if (this.progressEnabled || this._paused) {
            return;
        }
        this.progressEnabled = true;
        this.tracker.on('change', this.showProgress.bind(this));
        this.gauge.enable();
    };
    _proto.disableProgress = function disableProgress() {
        if (!this.progressEnabled) {
            return;
        }
        this.progressEnabled = false;
        this.tracker.removeListener('change', this.showProgress.bind(this));
        this.gauge.disable();
    };
    _proto.clearProgress = function clearProgress(cb) {
        if (!this.progressEnabled) {
            return cb && process.nextTick(cb);
        }
        this.gauge.hide(cb);
    };
    _proto.showProgress = function showProgress(name, completed) {
        if (!this.progressEnabled) {
            return;
        }
        var values = {};
        if (name) {
            values.section = name;
        }
        var last = this.record[this.record.length - 1];
        if (last) {
            values.subsection = last.prefix;
            var disp = this.disp[last.level];
            var logline = this._format(disp, this.style[last.level]);
            if (last.prefix) {
                logline += ' ' + this._format(last.prefix, this.prefixStyle);
            }
            logline += ' ' + last.message.split(/\r?\n/)[0];
            values.logline = logline;
        }
        values.completed = completed || this.tracker.completed();
        this.gauge.show(values);
    };
    _proto.pause = function pause() {
        this._paused = true;
        if (this.progressEnabled) {
            this.gauge.disable();
        }
    };
    _proto.resume = function resume() {
        var _this = this;
        if (!this._paused) {
            return;
        }
        this._paused = false;
        var buffer = this._buffer;
        this._buffer = [];
        buffer.forEach(function(m) {
            return _this.emitLog(m);
        });
        if (this.progressEnabled) {
            this.gauge.enable();
        }
    };
    _proto.log = function log(lvl, prefix) {
        for(var _len = arguments.length, messageArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            messageArgs[_key - 2] = arguments[_key];
        }
        var l = this.levels[lvl];
        if (l === undefined) {
            this.emit('error', new Error(util.format('Undefined log level: %j', lvl)));
            return;
        }
        var stack = null;
        var a = messageArgs.map(function(arg) {
            if (_instanceof(arg, Error) && arg.stack) {
                Object.defineProperty(arg, 'stack', {
                    value: stack = arg.stack + '',
                    enumerable: true,
                    writable: true
                });
            }
            return arg;
        });
        if (stack) {
            a.unshift(stack + '\n');
        }
        var message = util.format.apply(undefined, _to_consumable_array(a));
        var m = {
            id: this.id++,
            level: lvl,
            prefix: String(prefix || ''),
            message: message,
            messageRaw: a
        };
        this.emit('log', m);
        this.emit("log.".concat(lvl), m);
        if (m.prefix) {
            this.emit(m.prefix, m);
        }
        this.record.push(m);
        var mrs = this.maxRecordSize;
        if (this.record.length > mrs) {
            this.record = this.record.slice(-Math.floor(mrs * 0.9));
        }
        this.emitLog(m);
    };
    _proto.emitLog = function emitLog(m) {
        var _this = this;
        var _m_message;
        if (this._paused) {
            this._buffer.push(m);
            return;
        }
        if (this.progressEnabled) {
            this.gauge.pulse(m.prefix);
        }
        var l = this.levels[m.level];
        if (l === undefined || l < this.levels[this.level] || l > 0 && !isFinite(l)) {
            return;
        }
        var disp = this.disp[m.level];
        this.clearProgress();
        (_m_message = m.message) === null || _m_message === undefined ? undefined : _m_message.split(/\r?\n/).forEach(function(line) {
            var heading = _this.heading;
            if (heading) {
                _this.write(heading, _this.headingStyle);
                _this.write(' ');
            }
            _this.write(disp, _this.style[m.level]);
            var p = m.prefix || '';
            if (p) {
                _this.write(' ');
            }
            _this.write(p, _this.prefixStyle);
            _this.write(' ' + line + '\n');
        });
        this.showProgress();
    };
    _proto._format = function _format(msg, style) {
        if (!this._stream) {
            return;
        }
        var output = '';
        if (this.useColor()) {
            style = style || {};
            var settings = [];
            if (style.fg) {
                settings.push(style.fg);
            }
            if (style.bg) {
                settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1));
            }
            if (style.bold) {
                settings.push('bold');
            }
            if (style.underline) {
                settings.push('underline');
            }
            if (style.inverse) {
                settings.push('inverse');
            }
            if (settings.length) {
                output += consoleControl.color(settings);
            }
            if (style.beep) {
                output += consoleControl.beep();
            }
        }
        output += msg;
        if (this.useColor()) {
            output += consoleControl.color('reset');
        }
        return output;
    };
    _proto.write = function write(msg, style) {
        if (!this._stream) {
            return;
        }
        this._stream.write(this._format(msg, style));
    };
    _proto.addLevel = function addLevel(lvl, n, style) {
        var disp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        if (disp == null) {
            disp = lvl;
        }
        this.levels[lvl] = n;
        this.style[lvl] = style;
        if (!this[lvl]) {
            var _this = this;
            this[lvl] = function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var a = [
                    lvl
                ].concat(_to_consumable_array(args));
                return _this.log.apply(_this, a);
            };
        }
        this.disp[lvl] = disp;
    };
    _create_class$1(Logger, [
        {
            key: "stream",
            get: function get() {
                return this._stream;
            },
            set: function set(newStream) {
                this._stream = newStream;
                if (this.gauge) {
                    this.gauge.setWriteTo(this._stream, this._stream);
                }
            }
        }
    ]);
    return Logger;
}(EventEmitter.EventEmitter);
var log = new Logger();
var trackerConstructors = [
    'newGroup',
    'newItem',
    'newStream'
];
var mixinLog = function mixinLog1(tracker) {
    Array.from(new Set(_to_consumable_array(Object.keys(log)).concat(_to_consumable_array(Object.getOwnPropertyNames(Object.getPrototypeOf(log)))))).forEach(function(P) {
        if (P[0] === '_') {
            return;
        }
        if (trackerConstructors.filter(function(C) {
            return C === P;
        }).length) {
            return;
        }
        if (tracker[P]) {
            return;
        }
        if (typeof log[P] !== 'function') {
            return;
        }
        var func = log[P];
        tracker[P] = function() {
            return func.apply(log, arguments);
        };
    });
    if (_instanceof(tracker, TrackerGroup)) {
        trackerConstructors.forEach(function(C) {
            var func = tracker[C];
            tracker[C] = function() {
                return mixinLog(func.apply(tracker, arguments));
            };
        });
    }
    return tracker;
};
trackerConstructors.forEach(function(C) {
    log[C] = function() {
        return mixinLog(this.tracker[C].apply(this.tracker, arguments));
    };
});

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    _defineProperties(Constructor.prototype, protoProps);
    return Constructor;
}
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
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var PKG = Symbol('pkg');
var _location = Symbol('location');
var _resolved = Symbol('resolved');
var _rootPath = Symbol('rootPath');
var _scripts = Symbol('scripts');
var _contents = Symbol('contents');
function binSafeName(param) {
    var name = param.name, scope = param.scope;
    return scope ? name.substring(scope.length + 1) : name;
}
function shallowCopy(json) {
    return Object.keys(json).reduce(function(obj, key) {
        var val = json[key];
        if (Array.isArray(val)) {
            obj[key] = val.slice();
        } else if (val && (typeof val === "undefined" ? "undefined" : _type_of(val)) === 'object') {
            obj[key] = Object.assign({}, val);
        } else {
            obj[key] = val;
        }
        return obj;
    }, {});
}
var Package = /*#__PURE__*/ function() {
    function Package(pkg, location) {
        var rootPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : location;
        _class_call_check(this, Package);
        this._id = '';
        this.isBumpOnlyVersion = false;
        this.licensePath = '';
        this.localDependencies = new Map();
        var _pkg_name;
        var resolved = npa.resolve((_pkg_name = pkg === null || pkg === undefined ? undefined : pkg.name) !== null && _pkg_name !== undefined ? _pkg_name : '', "file:".concat(require$$3.relative(rootPath, location)), rootPath);
        var _pkg_name1;
        this.name = (_pkg_name1 = pkg === null || pkg === undefined ? undefined : pkg.name) !== null && _pkg_name1 !== undefined ? _pkg_name1 : '';
        this[PKG] = pkg;
        Object.defineProperty(this, PKG, {
            enumerable: false,
            writable: true
        });
        this[_location] = location;
        this[_resolved] = resolved;
        this[_rootPath] = rootPath;
        this[_scripts] = _object_spread({}, pkg.scripts);
    }
    var _proto = Package.prototype;
    _proto.get = function get(key) {
        return this[PKG][key];
    };
    _proto.set = function set(key, val) {
        this[PKG][key] = val;
        return this;
    };
    _proto.toJSON = function toJSON() {
        return shallowCopy(this[PKG]);
    };
    _proto.refresh = function refresh() {
        var _this = this;
        return loadJsonFile(this.manifestLocation).then(function(pkg) {
            _this[PKG] = pkg;
            return _this;
        });
    };
    _proto.serialize = function serialize() {
        var _this = this;
        return writePackage(this.manifestLocation, this[PKG]).then(function() {
            return _this;
        });
    };
    _proto.removeDependencyWorkspaceProtocolPrefix = function removeDependencyWorkspaceProtocolPrefix(pkgName, resolved) {
        var _this_peerDependencies;
        var depName = resolved.name;
        var _resolved_workspaceSpec;
        var workspaceSpec = (_resolved_workspaceSpec = resolved === null || resolved === undefined ? undefined : resolved.workspaceSpec) !== null && _resolved_workspaceSpec !== undefined ? _resolved_workspaceSpec : '';
        var localDependencies = this.retrievePackageDependencies(depName);
        var inspectDependencies = [
            localDependencies
        ];
        if ((_this_peerDependencies = this.peerDependencies) === null || _this_peerDependencies === undefined ? undefined : _this_peerDependencies[depName]) {
            inspectDependencies.push(this.peerDependencies);
        }
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = inspectDependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var depCollection = _step.value;
                if (depCollection && (resolved.registry || resolved.type === 'directory') && /^(workspace:)+(.*)$/.test(workspaceSpec)) {
                    if (workspaceSpec) {
                        if (resolved.fetchSpec === 'latest' || resolved.fetchSpec === '') {
                            log.error("publish", [
                                'Your package named "'.concat(pkgName, '" has external dependencies not handled by Lerna-Lite and without workspace version suffix, '),
                                "we recommend using defined versions with workspace protocol. ",
                                'Your dependency is currently being published with "'.concat(depName, '": "').concat(resolved.fetchSpec, '".')
                            ].join(''));
                        }
                        depCollection[depName] = resolved.fetchSpec;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    _proto.updateLocalDependency = function updateLocalDependency(resolved, depVersion, savePrefix) {
        var allowPeerDependenciesUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false, updatedByCommand = arguments.length > 4 ? arguments[4] : undefined;
        var _this_peerDependencies;
        var depName = resolved.name;
        var localDependencies = this.retrievePackageDependencies(depName);
        var updatingDependencies = [
            localDependencies
        ];
        if ((_this_peerDependencies = this.peerDependencies) === null || _this_peerDependencies === undefined ? undefined : _this_peerDependencies[depName]) {
            if (allowPeerDependenciesUpdate && /^(workspace:)?[~^*]?[\d.]*([-]+[\w.\-+]+)*$/i.test(this.peerDependencies[depName] || '') || updatedByCommand !== 'publish' && this.peerDependencies[depName].startsWith('workspace:')) {
                updatingDependencies.push(this.peerDependencies);
            } else if (updatedByCommand === 'publish' && this.peerDependencies[depName].startsWith('workspace:')) {
                this.peerDependencies[depName] = this.peerDependencies[depName].replace('workspace:', '');
                if (/^[~^]$/.test(this.peerDependencies[depName])) {
                    this.peerDependencies[depName] = resolved.fetchSpec || '';
                }
            }
        }
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = updatingDependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var depCollection = _step.value;
                if (depCollection && (resolved.registry || resolved.type === 'directory')) {
                    depCollection[depName] = "".concat(savePrefix).concat(depVersion);
                    if (resolved.workspaceSpec) {
                        var _resolved_workspaceSpec;
                        var workspaceSpec = (_resolved_workspaceSpec = resolved === null || resolved === void 0 ? void 0 : resolved.workspaceSpec) !== null && _resolved_workspaceSpec !== void 0 ? _resolved_workspaceSpec : '';
                        var _ref = _sliced_to_array(workspaceSpec.match(/^(workspace:)?([<>=]{0,2})?([*|~|^])?(.*)$/) || [], 5), _ = _ref[0], _wsTxt = _ref[1], operatorPrefix = _ref[2], rangePrefix = _ref[3], semver = _ref[4];
                        if (operatorPrefix) {
                            depCollection[depName] = "".concat(operatorPrefix).concat(rangePrefix || '').concat(semver);
                        } else {
                            depCollection[depName] = "".concat(rangePrefix || '').concat(depVersion);
                        }
                        if (updatedByCommand === 'publish') {
                            if (workspaceSpec === 'workspace:*') {
                                depCollection[depName] = depVersion;
                            } else if (workspaceSpec === 'workspace:~') {
                                depCollection[depName] = "~".concat(depVersion);
                            } else if (workspaceSpec === 'workspace:^') {
                                depCollection[depName] = "^".concat(depVersion);
                            }
                        } else {
                            depCollection[depName] = /^workspace:[*|~|^]{1}$/.test(workspaceSpec) ? resolved.workspaceSpec : "workspace:".concat(depCollection[depName]);
                        }
                    }
                } else if (resolved.gitCommittish) {
                    var _exec = _sliced_to_array(/^\D*/.exec(resolved.gitCommittish), 1), tagPrefix = _exec[0];
                    var hosted = resolved.hosted;
                    hosted.committish = "".concat(tagPrefix).concat(depVersion);
                    depCollection[depName] = hosted.toString({
                        noGitPlus: false,
                        noCommittish: false
                    });
                } else if (resolved.gitRange) {
                    var hosted1 = resolved.hosted;
                    hosted1.committish = "semver:".concat(savePrefix).concat(depVersion);
                    depCollection[depName] = hosted1.toString({
                        noGitPlus: false,
                        noCommittish: false
                    });
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };
    _proto.retrievePackageDependencies = function retrievePackageDependencies(depName) {
        var depCollection = this.dependencies;
        if (!depCollection || !depCollection[depName]) {
            depCollection = this.optionalDependencies;
        }
        if (!depCollection || !depCollection[depName]) {
            depCollection = this.devDependencies;
        }
        return depCollection;
    };
    Package.lazy = function lazy(ref) {
        var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
        if (typeof ref === 'string') {
            var location = require$$3.resolve(require$$3.basename(ref) === 'package.json' ? require$$3.dirname(ref) : ref);
            var manifest = loadJsonFileSync(require$$3.join(location, 'package.json'));
            return new Package(manifest, location);
        }
        if ('__isLernaPackage' in ref) {
            return ref;
        }
        return new Package(ref, dir);
    };
    _create_class(Package, [
        {
            key: "location",
            get: function get() {
                return this[_location];
            }
        },
        {
            key: "private",
            get: function get() {
                return Boolean(this[PKG].private);
            }
        },
        {
            key: "resolved",
            get: function get() {
                return this[_resolved];
            }
        },
        {
            key: "rootPath",
            get: function get() {
                return this[_rootPath];
            }
        },
        {
            key: "scripts",
            get: function get() {
                return this[_scripts];
            }
        },
        {
            key: "bin",
            get: function get() {
                var pkg = this[PKG];
                return typeof pkg.bin === 'string' ? _define_property({}, binSafeName(this.resolved), pkg.bin) : Object.assign({}, pkg.bin);
            }
        },
        {
            key: "binLocation",
            get: function get() {
                return require$$3.join(this.location, 'node_modules', '.bin');
            }
        },
        {
            key: "manifest",
            get: function get() {
                return this[PKG];
            }
        },
        {
            key: "manifestLocation",
            get: function get() {
                return require$$3.join(this.location, 'package.json');
            }
        },
        {
            key: "nodeModulesLocation",
            get: function get() {
                return require$$3.join(this.location, 'node_modules');
            }
        },
        {
            key: "__isLernaPackage",
            get: function get() {
                return true;
            }
        },
        {
            key: "version",
            get: function get() {
                return this[PKG].version;
            },
            set: function set(version) {
                this[PKG].version = version;
            }
        },
        {
            key: "workspaces",
            get: function get() {
                return this[PKG].workspaces;
            },
            set: function set(workspaces) {
                this[PKG].workspaces = workspaces;
            }
        },
        {
            key: "contents",
            get: function get() {
                var _this_PKG_publishConfig;
                if (this[_contents]) {
                    return this[_contents];
                }
                if ((_this_PKG_publishConfig = this[PKG].publishConfig) === null || _this_PKG_publishConfig === undefined ? undefined : _this_PKG_publishConfig.directory) {
                    return require$$3.join(this.location, this[PKG].publishConfig.directory);
                }
                return this.location;
            },
            set: function set(subDirectory) {
                this[_contents] = require$$3.join(this.location, subDirectory);
            }
        },
        {
            key: "dependencies",
            get: function get() {
                return this[PKG].dependencies;
            }
        },
        {
            key: "devDependencies",
            get: function get() {
                return this[PKG].devDependencies;
            }
        },
        {
            key: "optionalDependencies",
            get: function get() {
                return this[PKG].optionalDependencies;
            }
        },
        {
            key: "peerDependencies",
            get: function get() {
                return this[PKG].peerDependencies;
            }
        },
        {
            key: "pkg",
            get: function get() {
                return this[PKG];
            }
        }
    ]);
    return Package;
} 
();

exports.Package = Package;
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) { }; module.exports = exports.default; }
