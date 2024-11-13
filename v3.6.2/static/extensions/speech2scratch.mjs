var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);

emptyFunction.thatReturnsThis = function () {
  return this;
};

emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

var q = "function" === typeof Symbol && Symbol["for"],
    r = q ? Symbol["for"]("react.element") : 60103,
    t = q ? Symbol["for"]("react.call") : 60104,
    u = q ? Symbol["for"]("react.return") : 60105,
    v = q ? Symbol["for"]("react.portal") : 60106,
    w = q ? Symbol["for"]("react.fragment") : 60107,
    x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }

  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}

var z = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};

function A(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

A.prototype.isReactComponent = {};

A.prototype.setState = function (a, b) {
  "object" !== _typeof$1(a) && "function" !== typeof a && null != a ? y("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

function C() {}

C.prototype = A.prototype;
var D = B.prototype = new C();
D.constructor = B;
objectAssign(D, A.prototype);
D.isPureReactComponent = !0;

function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = emptyObject_1;
  this.updater = e || z;
}

var F = E.prototype = new C();
F.constructor = E;
objectAssign(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;

F.render = function () {
  return this.props.children;
};

var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }
  return {
    $$typeof: r,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}

function K(a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === r;
}

function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var L = /\/+/g,
    M = [];

function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}

function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M.length && M.push(a);
}

function P(a, b, e, c) {
  var d = _typeof$1(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case r:
        case t:
        case u:
        case v:
          g = !0;
      }

  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}

function Q(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}

function R(a, b) {
  a.func.call(a.context, b, a.count++);
}

function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, emptyFunction_1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}

function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}

var U = {
  Children: {
    map: function map(a, b, e) {
      if (null == a) return a;
      var c = [];
      T(a, c, null, b, e);
      return c;
    },
    forEach: function forEach(a, b, e) {
      if (null == a) return a;
      b = N(null, null, b, e);
      null == a || P(a, "", R, b);
      O(b);
    },
    count: function count(a) {
      return null == a ? 0 : P(a, "", emptyFunction_1.thatReturnsNull, null);
    },
    toArray: function toArray(a) {
      var b = [];
      T(a, b, null, emptyFunction_1.thatReturnsArgument);
      return b;
    },
    only: function only(a) {
      K(a) ? void 0 : y("143");
      return a;
    }
  },
  Component: A,
  PureComponent: B,
  unstable_AsyncComponent: E,
  Fragment: w,
  createElement: J,
  cloneElement: function cloneElement(a, b, e) {
    var c = objectAssign({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);

      for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }

      c.children = f;
    }
    return {
      $$typeof: r,
      type: a.type,
      key: d,
      ref: g,
      props: c,
      _owner: k
    };
  },
  createFactory: function createFactory(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: K,
  version: "16.2.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: G,
    assign: objectAssign
  }
},
    V = Object.freeze({
  default: U
}),
    W = V && U || V;
W["default"] ? W["default"] : W;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var invariant_1 = invariant$1;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */


var warning = emptyFunction_1;

{
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var printWarning$1 = function printWarning() {};

{
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var react_development = createCommonjsModule(function (module) {

  {
    (function () {

      var _assign = objectAssign;
      var emptyObject = emptyObject_1;
      var invariant = invariant_1;
      var warning = warning_1;
      var emptyFunction = emptyFunction_1;
      var checkPropTypes = checkPropTypes_1; // TODO: this is special because it gets imported during build.

      var ReactVersion = '16.2.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
      var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
      var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';

      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable === 'undefined') {
          return null;
        }

        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

        if (typeof maybeIterator === 'function') {
          return maybeIterator;
        }

        return null;
      }
      /**
       * WARNING: DO NOT manually require this module.
       * This is a replacement for `invariant(...)` used by the error code system
       * and will _only_ be required by the corresponding babel pass.
       * It always throws.
       */

      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarning = function lowPriorityWarning() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarning = function lowPriorityWarning(condition, format) {
          if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(undefined, [format].concat(args));
          }
        };
      }
      var lowPriorityWarning$1 = lowPriorityWarning;
      var didWarnStateUpdateForUnmountedComponent = {};

      function warnNoop(publicInstance, callerName) {
        {
          var constructor = publicInstance.constructor;
          var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
          var warningKey = componentName + '.' + callerName;

          if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
            return;
          }

          warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
          didWarnStateUpdateForUnmountedComponent[warningKey] = true;
        }
      }
      /**
       * This is the abstract API for an update queue.
       */


      var ReactNoopUpdateQueue = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted(publicInstance) {
          return false;
        },

        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
          warnNoop(publicInstance, 'forceUpdate');
        },

        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, 'replaceState');
        },

        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, 'setState');
        }
      };
      /**
       * Base class helpers for the updating state of a component.
       */

      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      Component.prototype.isReactComponent = {};
      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */

      Component.prototype.setState = function (partialState, callback) {
        !(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
        this.updater.enqueueSetState(this, partialState, callback, 'setState');
      };
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */


      Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
      };
      /**
       * Deprecated APIs. These APIs used to exist on classic React classes but since
       * we would like to deprecate them, we're not going to move them over to this
       * modern base class. Instead, we define a getter that warns if it's accessed.
       */


      {
        var deprecatedAPIs = {
          isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
          replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
        };

        var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function get() {
              lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
              return undefined;
            }
          });
        };

        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }
      /**
       * Base class helpers for the updating state of a component.
       */

      function PureComponent(props, context, updater) {
        // Duplicated from Component.
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      function ComponentDummy() {}

      ComponentDummy.prototype = Component.prototype;
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

      _assign(pureComponentPrototype, Component.prototype);

      pureComponentPrototype.isPureReactComponent = true;

      function AsyncComponent(props, context, updater) {
        // Duplicated from Component.
        this.props = props;
        this.context = context;
        this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
        // renderer.

        this.updater = updater || ReactNoopUpdateQueue;
      }

      var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
      asyncComponentPrototype.constructor = AsyncComponent; // Avoid an extra prototype jump for these methods.

      _assign(asyncComponentPrototype, Component.prototype);

      asyncComponentPrototype.unstable_isAsyncReactComponent = true;

      asyncComponentPrototype.render = function () {
        return this.props.children;
      };
      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */


      var ReactCurrentOwner = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;

      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }

      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }

      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        };

        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }

      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
          }
        };

        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, no instanceof check
       * will work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} key
       * @param {string|object} ref
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @param {*} owner
       * @param {*} props
       * @internal
       */


      var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allow us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          }); // self and source are DEV only properties.

          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          }); // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });

          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      /**
       * Create and return a new ReactElement of the given type.
       * See https://reactjs.org/docs/react-api.html#createelement
       */


      function createElement(type, config, children) {
        var propName; // Reserved names are extracted

        var props = {};
        var key = null;
        var ref = null;
        var self = null;
        var source = null;

        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
          }

          if (hasValidKey(config)) {
            key = '' + config.key;
          }

          self = config.__self === undefined ? null : config.__self;
          source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.


        var childrenLength = arguments.length - 2;

        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }

          {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        } // Resolve default props


        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;

          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }

        {
          if (key || ref) {
            if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
              var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }

              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
      /**
       * Return a function that produces ReactElements of a given type.
       * See https://reactjs.org/docs/react-api.html#createfactory
       */


      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      /**
       * Clone and return a new ReactElement using element as the starting point.
       * See https://reactjs.org/docs/react-api.html#cloneelement
       */


      function cloneElement(element, config, children) {
        var propName; // Original props are copied

        var props = _assign({}, element.props); // Reserved names are extracted


        var key = element.key;
        var ref = element.ref; // Self is preserved since the owner is preserved.

        var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.

        var source = element._source; // Owner will be preserved, unless ref is overridden

        var owner = element._owner;

        if (config != null) {
          if (hasValidRef(config)) {
            // Silently steal the ref from the parent.
            ref = config.ref;
            owner = ReactCurrentOwner.current;
          }

          if (hasValidKey(config)) {
            key = '' + config.key;
          } // Remaining properties override existing props


          var defaultProps;

          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                // Resolve default props
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        } // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.


        var childrenLength = arguments.length - 2;

        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }

          props.children = childArray;
        }

        return ReactElement(element.type, key, ref, self, source, owner, props);
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a valid component.
       * @final
       */


      function isValidElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      var ReactDebugCurrentFrame = {};
      {
        // Component that is being worked on
        ReactDebugCurrentFrame.getCurrentStack = null;

        ReactDebugCurrentFrame.getStackAddendum = function () {
          var impl = ReactDebugCurrentFrame.getCurrentStack;

          if (impl) {
            return impl();
          }

          return null;
        };
      }
      var SEPARATOR = '.';
      var SUBSEPARATOR = ':';
      /**
       * Escape and wrap key so it is safe to use as a reactid
       *
       * @param {string} key to be escaped.
       * @return {string} the escaped key.
       */

      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          '=': '=0',
          ':': '=2'
        };
        var escapedString = ('' + key).replace(escapeRegex, function (match) {
          return escaperLookup[match];
        });
        return '$' + escapedString;
      }
      /**
       * TODO: Test that a single child and an array with one item have the same key
       * pattern.
       */


      var didWarnAboutMaps = false;
      var userProvidedKeyEscapeRegex = /\/+/g;

      function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
      }

      var POOL_SIZE = 10;
      var traverseContextPool = [];

      function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
        if (traverseContextPool.length) {
          var traverseContext = traverseContextPool.pop();
          traverseContext.result = mapResult;
          traverseContext.keyPrefix = keyPrefix;
          traverseContext.func = mapFunction;
          traverseContext.context = mapContext;
          traverseContext.count = 0;
          return traverseContext;
        } else {
          return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0
          };
        }
      }

      function releaseTraverseContext(traverseContext) {
        traverseContext.result = null;
        traverseContext.keyPrefix = null;
        traverseContext.func = null;
        traverseContext.context = null;
        traverseContext.count = 0;

        if (traverseContextPool.length < POOL_SIZE) {
          traverseContextPool.push(traverseContext);
        }
      }
      /**
       * @param {?*} children Children tree container.
       * @param {!string} nameSoFar Name of the key path so far.
       * @param {!function} callback Callback to invoke with each child found.
       * @param {?*} traverseContext Used to pass information throughout the traversal
       * process.
       * @return {!number} The number of children in this subtree.
       */


      function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
        var type = _typeof$1(children);

        if (type === 'undefined' || type === 'boolean') {
          // All of the above are perceived as null.
          children = null;
        }

        var invokeCallback = false;

        if (children === null) {
          invokeCallback = true;
        } else {
          switch (type) {
            case 'string':
            case 'number':
              invokeCallback = true;
              break;

            case 'object':
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_CALL_TYPE:
                case REACT_RETURN_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
              }

          }
        }

        if (invokeCallback) {
          callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
          // so that it's consistent if the number of children grows.
          nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
          return 1;
        }

        var child;
        var nextName;
        var subtreeCount = 0; // Count of children found in the current subtree.

        var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else {
          var iteratorFn = getIteratorFn(children);

          if (typeof iteratorFn === 'function') {
            {
              // Warn about using Maps as children
              if (iteratorFn === children.entries) {
                warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
                didWarnAboutMaps = true;
              }
            }
            var iterator = iteratorFn.call(children);
            var step;
            var ii = 0;

            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else if (type === 'object') {
            var addendum = '';
            {
              addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
            }
            var childrenString = '' + children;
            invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
          }
        }

        return subtreeCount;
      }
      /**
       * Traverses children that are typically specified as `props.children`, but
       * might also be specified through attributes:
       *
       * - `traverseAllChildren(this.props.children, ...)`
       * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
       *
       * The `traverseContext` is an optional argument that is passed through the
       * entire traversal. It can be used to store accumulations or anything else that
       * the callback might find relevant.
       *
       * @param {?*} children Children tree object.
       * @param {!function} callback To invoke upon traversing each child.
       * @param {?*} traverseContext Context for traversal.
       * @return {!number} The number of children in this subtree.
       */


      function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
          return 0;
        }

        return traverseAllChildrenImpl(children, '', callback, traverseContext);
      }
      /**
       * Generate a key string that identifies a component within a set.
       *
       * @param {*} component A component that could contain a manual key.
       * @param {number} index Index that is used if a manual key is not provided.
       * @return {string}
       */


      function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
          // Explicit key
          return escape(component.key);
        } // Implicit key determined by the index in the set


        return index.toString(36);
      }

      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
            context = bookKeeping.context;
        func.call(context, child, bookKeeping.count++);
      }
      /**
       * Iterates through children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.foreach
       *
       * The provided forEachFunc(child, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} forEachFunc
       * @param {*} forEachContext Context for forEachContext.
       */


      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children;
        }

        var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        releaseTraverseContext(traverseContext);
      }

      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
            keyPrefix = bookKeeping.keyPrefix,
            func = bookKeeping.func,
            context = bookKeeping.context;
        var mappedChild = func.call(context, child, bookKeeping.count++);

        if (Array.isArray(mappedChild)) {
          mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
          }

          result.push(mappedChild);
        }
      }

      function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        var escapedPrefix = '';

        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + '/';
        }

        var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
        releaseTraverseContext(traverseContext);
      }
      /**
       * Maps children that are typically specified as `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.map
       *
       * The provided mapFunction(child, key, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} func The map function.
       * @param {*} context Context for mapFunction.
       * @return {object} Object containing the ordered map of results.
       */


      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }

        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      }
      /**
       * Count the number of children that are typically specified as
       * `props.children`.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.count
       *
       * @param {?*} children Children tree container.
       * @return {number} The number of children.
       */


      function countChildren(children, context) {
        return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
      }
      /**
       * Flatten a children object (typically specified as `props.children`) and
       * return an array with appropriately re-keyed children.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.toarray
       */


      function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
        return result;
      }
      /**
       * Returns the first child in a collection of children and verifies that there
       * is only one child in the collection.
       *
       * See https://reactjs.org/docs/react-api.html#react.children.only
       *
       * The current implementation of this function assumes that a single child gets
       * passed without a wrapper, but the purpose of this helper function is to
       * abstract away the particular structure of children.
       *
       * @param {?object} children Child collection structure.
       * @return {ReactElement} The first and only `ReactElement` contained in the
       * structure.
       */


      function onlyChild(children) {
        !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
        return children;
      }

      var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
        return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
      };

      function getComponentName(fiber) {
        var type = fiber.type;

        if (typeof type === 'string') {
          return type;
        }

        if (typeof type === 'function') {
          return type.displayName || type.name;
        }

        return null;
      }
      /**
       * ReactElementValidator provides a wrapper around a element factory
       * which validates the props passed to the element. This is intended to be
       * used only in DEV and could be replaced by a static type checker for languages
       * that support it.
       */


      {
        var currentlyValidatingElement = null;
        var propTypesMisspellWarningShown = false;

        var getDisplayName = function getDisplayName(element) {
          if (element == null) {
            return '#empty';
          } else if (typeof element === 'string' || typeof element === 'number') {
            return '#text';
          } else if (typeof element.type === 'string') {
            return element.type;
          } else if (element.type === REACT_FRAGMENT_TYPE) {
            return 'React.Fragment';
          } else {
            return element.type.displayName || element.type.name || 'Unknown';
          }
        };

        var getStackAddendum = function getStackAddendum() {
          var stack = '';

          if (currentlyValidatingElement) {
            var name = getDisplayName(currentlyValidatingElement);
            var owner = currentlyValidatingElement._owner;
            stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
          }

          stack += ReactDebugCurrentFrame.getStackAddendum() || '';
          return stack;
        };

        var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
      }

      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current);

          if (name) {
            return '\n\nCheck the render method of `' + name + '`.';
          }
        }

        return '';
      }

      function getSourceInfoErrorAddendum(elementProps) {
        if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
          var source = elementProps.__source;
          var fileName = source.fileName.replace(/^.*[\\\/]/, '');
          var lineNumber = source.lineNumber;
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }

        return '';
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */


      var ownerHasKeyUseWarning = {};

      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();

        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

          if (parentName) {
            info = '\n\nCheck the top-level render call using <' + parentName + '>.';
          }
        }

        return info;
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */


      function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }

        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }

        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = '';

        if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
          // Give the component that originally created this child.
          childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
        }

        currentlyValidatingElement = element;
        {
          warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
        }
        currentlyValidatingElement = null;
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */


      function validateChildKeys(node, parentType) {
        if (_typeof$1(node) !== 'object') {
          return;
        }

        if (Array.isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];

            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);

          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;

              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */


      function validatePropTypes(element) {
        var componentClass = element.type;

        if (typeof componentClass !== 'function') {
          return;
        }

        var name = componentClass.displayName || componentClass.name;
        var propTypes = componentClass.propTypes;

        if (propTypes) {
          currentlyValidatingElement = element;
          checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
          currentlyValidatingElement = null;
        } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true;
          warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
        }

        if (typeof componentClass.getDefaultProps === 'function') {
          warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */


      function validateFragmentProps(fragment) {
        currentlyValidatingElement = fragment;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!VALID_FRAGMENT_PROPS.has(key)) {
              warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (fragment.ref !== null) {
          warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
        }

        currentlyValidatingElement = null;
      }

      function createElementWithValidation(type, props, children) {
        var validType = typeof type === 'string' || typeof type === 'function' || _typeof$1(type) === 'symbol' || typeof type === 'number'; // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = '';

          if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }

          var sourceInfo = getSourceInfoErrorAddendum(props);

          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }

          info += getStackAddendum() || '';
          warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$1(type), info);
        }

        var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element;
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)


        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }

        if (_typeof$1(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }

        return element;
      }

      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type); // Legacy hook TODO: Warn if this is accessed

        validatedFactory.type = type;
        {
          Object.defineProperty(validatedFactory, 'type', {
            enumerable: false,
            get: function get() {
              lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
              Object.defineProperty(this, 'type', {
                value: type
              });
              return type;
            }
          });
        }
        return validatedFactory;
      }

      function cloneElementWithValidation(element, props, children) {
        var newElement = cloneElement.apply(this, arguments);

        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }

        validatePropTypes(newElement);
        return newElement;
      }

      var React = {
        Children: {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray: toArray,
          only: onlyChild
        },
        Component: Component,
        PureComponent: PureComponent,
        unstable_AsyncComponent: AsyncComponent,
        Fragment: REACT_FRAGMENT_TYPE,
        createElement: createElementWithValidation,
        cloneElement: cloneElementWithValidation,
        createFactory: createFactoryWithValidation,
        isValidElement: isValidElement,
        version: ReactVersion,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentOwner: ReactCurrentOwner,
          // Used by renderers to avoid bundling object-assign twice in UMD bundles:
          assign: _assign
        }
      };
      {
        _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
          // These should not be included in production.
          ReactDebugCurrentFrame: ReactDebugCurrentFrame,
          // Shim for React DOM 16.0.0 which still destructured (but not used) this.
          // TODO: remove in React 17.0.
          ReactComponentTreeHook: {}
        });
      }
      var React$2 = Object.freeze({
        default: React
      });
      var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
      // This is hacky but makes it work with both Rollup and Jest.

      var react = React$3['default'] ? React$3['default'] : React$3;
      module.exports = react;
    })();
  }
});

var react = createCommonjsModule(function (module) {

  {
    module.exports = react_development;
  }
});

var allLocaleData = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var extend_1 = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

var hop_1 = hop;
var utils = {
  extend: extend_1,
  hop: hop_1
};

var es5$1 = createCommonjsModule(function (module, exports) {
  // Copyright 2013 Andy Earnshaw, MIT License

  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!utils.hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };

  var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}

    F.prototype = proto;
    obj = new F();

    for (k in props) {
      if (utils.hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }

    return obj;
  };

  exports.defineProperty = defineProperty, exports.objCreate = objCreate;
});

var compiler = createCommonjsModule(function (module, exports) {

  exports["default"] = Compiler;

  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }

  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };

  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern = [];
    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];

      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;

        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;

        default:
          throw new Error('Message element does not have a valid type');
      }
    }

    return pattern;
  };

  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    } // Unescape the escaped '#'s in the message text.


    return element.value.replace(/\\#/g, '#');
  };

  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
      return new StringFormat(element.id);
    }

    var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };

      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);

      default:
        throw new Error('Message element does not have a valid format type');
    }
  };

  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
        options = format.options,
        optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.

    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i]; // Compile the sub-pattern and save it under the options's selector.

      optionsHash[option.selector] = this.compileMessage(option.value);
    } // Pop the plural stack to put back the original current plural value.


    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  }; // -- Compiler Helper Classes --------------------------------------------------


  function StringFormat(id) {
    this.id = id;
  }

  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  };

  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }

  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };

  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };

  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }

  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
});

var parser = createCommonjsModule(function (module, exports) {

  exports["default"] = function () {
    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
        start: peg$parsestart
      },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
        return {
          type: 'messageFormatPattern',
          elements: elements,
          location: location()
        };
      },
          peg$c1 = function peg$c1(text) {
        var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;

        for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
          inner = text[i];

          for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
            string += inner[j];
          }
        }

        return string;
      },
          peg$c2 = function peg$c2(messageText) {
        return {
          type: 'messageTextElement',
          value: messageText,
          location: location()
        };
      },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
          peg$c5 = "{",
          peg$c6 = {
        type: "literal",
        value: "{",
        description: "\"{\""
      },
          peg$c7 = ",",
          peg$c8 = {
        type: "literal",
        value: ",",
        description: "\",\""
      },
          peg$c9 = "}",
          peg$c10 = {
        type: "literal",
        value: "}",
        description: "\"}\""
      },
          peg$c11 = function peg$c11(id, format) {
        return {
          type: 'argumentElement',
          id: id,
          format: format && format[2],
          location: location()
        };
      },
          peg$c12 = "number",
          peg$c13 = {
        type: "literal",
        value: "number",
        description: "\"number\""
      },
          peg$c14 = "date",
          peg$c15 = {
        type: "literal",
        value: "date",
        description: "\"date\""
      },
          peg$c16 = "time",
          peg$c17 = {
        type: "literal",
        value: "time",
        description: "\"time\""
      },
          peg$c18 = function peg$c18(type, style) {
        return {
          type: type + 'Format',
          style: style && style[2],
          location: location()
        };
      },
          peg$c19 = "plural",
          peg$c20 = {
        type: "literal",
        value: "plural",
        description: "\"plural\""
      },
          peg$c21 = function peg$c21(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: false,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c22 = "selectordinal",
          peg$c23 = {
        type: "literal",
        value: "selectordinal",
        description: "\"selectordinal\""
      },
          peg$c24 = function peg$c24(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: true,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c25 = "select",
          peg$c26 = {
        type: "literal",
        value: "select",
        description: "\"select\""
      },
          peg$c27 = function peg$c27(options) {
        return {
          type: 'selectFormat',
          options: options,
          location: location()
        };
      },
          peg$c28 = "=",
          peg$c29 = {
        type: "literal",
        value: "=",
        description: "\"=\""
      },
          peg$c30 = function peg$c30(selector, pattern) {
        return {
          type: 'optionalFormatPattern',
          selector: selector,
          value: pattern,
          location: location()
        };
      },
          peg$c31 = "offset:",
          peg$c32 = {
        type: "literal",
        value: "offset:",
        description: "\"offset:\""
      },
          peg$c33 = function peg$c33(number) {
        return number;
      },
          peg$c34 = function peg$c34(offset, options) {
        return {
          type: 'pluralFormat',
          offset: offset,
          options: options,
          location: location()
        };
      },
          peg$c35 = {
        type: "other",
        description: "whitespace"
      },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
          peg$c38 = {
        type: "other",
        description: "optionalWhitespace"
      },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
          peg$c43 = "0",
          peg$c44 = {
        type: "literal",
        value: "0",
        description: "\"0\""
      },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
          peg$c47 = function peg$c47(digits) {
        return parseInt(digits, 10);
      },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
          peg$c50 = "\\\\",
          peg$c51 = {
        type: "literal",
        value: "\\\\",
        description: "\"\\\\\\\\\""
      },
          peg$c52 = function peg$c52() {
        return '\\';
      },
          peg$c53 = "\\#",
          peg$c54 = {
        type: "literal",
        value: "\\#",
        description: "\"\\\\#\""
      },
          peg$c55 = function peg$c55() {
        return '\\#';
      },
          peg$c56 = "\\{",
          peg$c57 = {
        type: "literal",
        value: "\\{",
        description: "\"\\\\{\""
      },
          peg$c58 = function peg$c58() {
        return "{";
      },
          peg$c59 = "\\}",
          peg$c60 = {
        type: "literal",
        value: "\\}",
        description: "\"\\\\}\""
      },
          peg$c61 = function peg$c61() {
        return "}";
      },
          peg$c62 = "\\u",
          peg$c63 = {
        type: "literal",
        value: "\\u",
        description: "\"\\\\u\""
      },
          peg$c64 = function peg$c64(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
          peg$c65 = function peg$c65(chars) {
        return chars.join('');
      },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
        line: 1,
        column: 1,
        seenCR: false
      }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }

      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }

      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p,
            ch;

        if (details) {
          return details;
        } else {
          p = pos - 1;

          while (!peg$posDetailsCache[p]) {
            p--;
          }

          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };

          while (p < pos) {
            ch = input.charAt(p);

            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }

              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }

            p++;
          }

          peg$posDetailsCache[pos] = details;
          return details;
        }
      }

      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }

      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      }

      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }

        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }

          var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }

      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }

      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }

        return s0;
      }

      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];

          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }

          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);

              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();

                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }

                if (s5 === peg$FAILED) {
                  s5 = null;
                }

                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();

                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }

        return s0;
      }

      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }

          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();

                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = null;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();

                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }

        return s0;
      }

      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();

          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();

            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];

        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);

            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        return s0;
      }

      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        return s0;
      }

      function peg$parsedigit() {
        var s0;

        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }

        return s0;
      }

      function peg$parsehexDigit() {
        var s0;

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }

        return s0;
      }

      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;

          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();

                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();

                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();

                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();

                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }

                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        return s0;
      }

      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }

        s0 = s1;
        return s0;
      }

      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }

    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
});

var intlMessageformatParser = createCommonjsModule(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
});

var core$1 = createCommonjsModule(function (module, exports) {

  exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

    es5$1.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    }); // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.

    var pluralFn = this._findPluralRuleFunction(this._locale);

    var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.


    var messageFormat = this;

    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  } // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.


  es5$1.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  }); // Define internal private properties for dealing with locale data.

  es5$1.defineProperty(MessageFormat, '__localeData__', {
    value: es5$1.objCreate(null)
  });
  es5$1.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }

      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  }); // Defines `__parse()` static method as an exposed private.

  es5$1.defineProperty(MessageFormat, '__parse', {
    value: intlMessageformatParser["default"].parse
  }); // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.

  es5$1.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });

  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };

  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler$1 = new compiler["default"](locales, formats, pluralFn);
    return compiler$1.compile(ast);
  };

  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.

    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };

  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i,
        len,
        part,
        id,
        value,
        err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i]; // Exist early for string parts.

      if (typeof part === 'string') {
        result += part;
        continue;
      }

      id = part.id; // Enforce that all required values are provided by the caller.

      if (!(values && utils.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }

      value = values[id]; // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.

      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }

    return result;
  };

  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type,
        mergedType;

    for (type in defaults) {
      if (!utils.hop.call(defaults, type)) {
        continue;
      }

      mergedFormats[type] = mergedType = es5$1.objCreate(defaults[type]);

      if (formats && utils.hop.call(formats, type)) {
        utils.extend(mergedType, formats[type]);
      }
    }

    return mergedFormats;
  };

  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
});

var en$1 = createCommonjsModule(function (module, exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
});

var main$1 = createCommonjsModule(function (module, exports) {

  core$1["default"].__addLocaleData(en$1["default"]);

  core$1["default"].defaultLocale = 'en';
  exports["default"] = core$1["default"];
});

var intlMessageformat = createCommonjsModule(function (module, exports) {

  var IntlMessageFormat = main$1['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
});

var diff = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */

  var round = Math.round;

  function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
  } // Thanks to date-fns
  // https://github.com/date-fns/date-fns
  // MIT © Sasha Koss


  var MILLISECONDS_IN_MINUTE = 60000;
  var MILLISECONDS_IN_DAY = 86400000;

  function startOfDay(dirtyDate) {
    var date = new Date(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
    var startOfDayLeft = startOfDay(dirtyDateLeft);
    var startOfDayRight = startOfDay(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)

    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
  }

  function default_1(from, to) {
    // Convert to ms timestamps.
    from = +from;
    to = +to;
    var millisecond = round(to - from),
        second = round(millisecond / 1000),
        minute = round(second / 60),
        hour = round(minute / 60); // We expect a more precision in rounding when dealing with
    // days as it feels wrong when something happended 13 hours ago and
    // is regarded as "yesterday" even if the time was this morning.

    var day = differenceInCalendarDays(to, from);
    var week = round(day / 7);
    var rawYears = daysToYears(day),
        month = round(rawYears * 12),
        year = round(rawYears);
    return {
      millisecond: millisecond,
      second: second,
      'second-short': second,
      minute: minute,
      'minute-short': minute,
      hour: hour,
      'hour-short': hour,
      day: day,
      'day-short': day,
      week: week,
      'week-short': week,
      month: month,
      'month-short': month,
      year: year,
      'year-short': year
    };
  }

  exports.default = default_1;
});

var es5 = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */
  // Purposely using the same implementation as the Intl.js `Intl` polyfill.
  // Copyright 2013 Andy Earnshaw, MIT License

  var hop = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;

  var realDefineProp = function () {
    try {
      return !!Object.defineProperty({}, 'a', {});
    } catch (e) {
      return false;
    }
  }();
  var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
    if ('get' in desc && obj.__defineGetter__) {
      obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
      obj[name] = desc.value;
    }
  };
  exports.defineProperty = defineProperty;

  var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}

    F.prototype = proto;
    obj = new F();

    for (k in props) {
      if (hop.call(props, k)) {
        defineProperty(obj, k, props[k]);
      }
    }

    return obj;
  };

  exports.objCreate = objCreate;

  var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;

    if (!arr.length) {
      return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
      if (arr[i] === search) {
        return i;
      }
    }

    return -1;
  };

  exports.arrIndexOf = arrIndexOf;

  var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  };

  exports.isArray = isArray;

  var dateNow = Date.now || function () {
    return new Date().getTime();
  };

  exports.dateNow = dateNow;
});

var core = createCommonjsModule(function (module, exports) {
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* jslint esnext: true */

  exports.default = RelativeFormat; // -----------------------------------------------------------------------------

  var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
  var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

  function RelativeFormat(locales, options) {
    options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.

    if (es5.isArray(locales)) {
      locales = locales.concat();
    }

    es5.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    });
    es5.defineProperty(this, '_options', {
      value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
      }
    });
    es5.defineProperty(this, '_locales', {
      value: locales
    });
    es5.defineProperty(this, '_fields', {
      value: this._findFields(this._locale)
    });
    es5.defineProperty(this, '_messages', {
      value: es5.objCreate(null)
    }); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.

    var relativeFormat = this;

    this.format = function format(date, options) {
      return relativeFormat._format(date, options);
    };
  } // Define internal private properties for dealing with locale data.


  es5.defineProperty(RelativeFormat, '__localeData__', {
    value: es5.objCreate(null)
  });
  es5.defineProperty(RelativeFormat, '__addLocaleData', {
    value: function value() {
      for (var i = 0; i < arguments.length; i++) {
        var datum = arguments[i];

        if (!(datum && datum.locale)) {
          throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
        }

        RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

        intlMessageformat.default.__addLocaleData(datum);
      }
    }
  }); // Define public `defaultLocale` property which can be set by the developer, or
  // it will be set when the first RelativeFormat instance is created by
  // leveraging the resolved locale from `Intl`.

  es5.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  }); // Define public `thresholds` property which can be set by the developer, and
  // defaults to relative time thresholds from moment.js.

  es5.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,
    value: {
      second: 45,
      'second-short': 45,
      minute: 45,
      'minute-short': 45,
      hour: 22,
      'hour-short': 22,
      day: 26,
      'day-short': 26,
      month: 11,
      'month-short': 11 // months to year

    }
  });

  RelativeFormat.prototype.resolvedOptions = function () {
    return {
      locale: this._locale,
      style: this._options.style,
      units: this._options.units
    };
  };

  RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales = this._locales;
    this._locale;
    var field = this._fields[units];
    var relativeTime = field.relativeTime;
    var future = '';
    var past = '';
    var i;

    for (i in relativeTime.future) {
      if (relativeTime.future.hasOwnProperty(i)) {
        future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
      }
    }

    for (i in relativeTime.past) {
      if (relativeTime.past.hasOwnProperty(i)) {
        past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
      }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.

    return new intlMessageformat.default(message, locales);
  };

  RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

    if (!messages[units]) {
      messages[units] = this._compileMessage(units);
    }

    return messages[units];
  };

  RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];

    if (field.relative) {
      return field.relative[diff];
    }
  };

  RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.

    while (data) {
      if (data.fields) {
        return data.fields;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
  };

  RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : es5.dateNow();

    if (date === undefined) {
      date = now;
    } // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.


    if (!isFinite(now)) {
      throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }

    if (!isFinite(date)) {
      throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
    }

    var diffReport = diff.default(now, date);

    var units = this._options.units || this._selectUnits(diffReport);

    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
      var relativeUnits = this._getRelativeUnits(diffInUnits, units);

      if (relativeUnits) {
        return relativeUnits;
      }
    }

    return this._getMessage(units).format({
      '0': Math.abs(diffInUnits),
      when: diffInUnits < 0 ? 'past' : 'future'
    });
  };

  RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || es5.arrIndexOf.call(FIELDS, units) >= 0) {
      return true;
    }

    if (typeof units === 'string') {
      var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

      if (suggestion && es5.arrIndexOf.call(FIELDS, suggestion) >= 0) {
        throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
      }
    }

    throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
  };

  RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(RelativeFormat.defaultLocale);
    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };

  RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
      return STYLES[0];
    }

    if (es5.arrIndexOf.call(STYLES, style) >= 0) {
      return style;
    }

    throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
  };

  RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function (field) {
      return field.indexOf('-short') < 1;
    });

    for (i = 0, l = fields.length; i < l; i += 1) {
      units = fields[i];

      if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
        break;
      }
    }

    return units;
  };
});

var en = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* @generated */

  exports.default = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split('.'),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
      return n == 1 && v0 ? 'one' : 'other';
    },
    "fields": {
      "year": {
        "displayName": "year",
        "relative": {
          "0": "this year",
          "1": "next year",
          "-1": "last year"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} year",
            "other": "in {0} years"
          },
          "past": {
            "one": "{0} year ago",
            "other": "{0} years ago"
          }
        }
      },
      "year-short": {
        "displayName": "yr.",
        "relative": {
          "0": "this yr.",
          "1": "next yr.",
          "-1": "last yr."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} yr.",
            "other": "in {0} yr."
          },
          "past": {
            "one": "{0} yr. ago",
            "other": "{0} yr. ago"
          }
        }
      },
      "month": {
        "displayName": "month",
        "relative": {
          "0": "this month",
          "1": "next month",
          "-1": "last month"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} month",
            "other": "in {0} months"
          },
          "past": {
            "one": "{0} month ago",
            "other": "{0} months ago"
          }
        }
      },
      "month-short": {
        "displayName": "mo.",
        "relative": {
          "0": "this mo.",
          "1": "next mo.",
          "-1": "last mo."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} mo.",
            "other": "in {0} mo."
          },
          "past": {
            "one": "{0} mo. ago",
            "other": "{0} mo. ago"
          }
        }
      },
      "week": {
        "displayName": "week",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this week",
          "1": "next week",
          "-1": "last week"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} week",
            "other": "in {0} weeks"
          },
          "past": {
            "one": "{0} week ago",
            "other": "{0} weeks ago"
          }
        }
      },
      "week-short": {
        "displayName": "wk.",
        "relativePeriod": "the week of {0}",
        "relative": {
          "0": "this wk.",
          "1": "next wk.",
          "-1": "last wk."
        },
        "relativeTime": {
          "future": {
            "one": "in {0} wk.",
            "other": "in {0} wk."
          },
          "past": {
            "one": "{0} wk. ago",
            "other": "{0} wk. ago"
          }
        }
      },
      "day": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "day-short": {
        "displayName": "day",
        "relative": {
          "0": "today",
          "1": "tomorrow",
          "-1": "yesterday"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} day",
            "other": "in {0} days"
          },
          "past": {
            "one": "{0} day ago",
            "other": "{0} days ago"
          }
        }
      },
      "hour": {
        "displayName": "hour",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hour",
            "other": "in {0} hours"
          },
          "past": {
            "one": "{0} hour ago",
            "other": "{0} hours ago"
          }
        }
      },
      "hour-short": {
        "displayName": "hr.",
        "relative": {
          "0": "this hour"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} hr.",
            "other": "in {0} hr."
          },
          "past": {
            "one": "{0} hr. ago",
            "other": "{0} hr. ago"
          }
        }
      },
      "minute": {
        "displayName": "minute",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} minute",
            "other": "in {0} minutes"
          },
          "past": {
            "one": "{0} minute ago",
            "other": "{0} minutes ago"
          }
        }
      },
      "minute-short": {
        "displayName": "min.",
        "relative": {
          "0": "this minute"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} min.",
            "other": "in {0} min."
          },
          "past": {
            "one": "{0} min. ago",
            "other": "{0} min. ago"
          }
        }
      },
      "second": {
        "displayName": "second",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} second",
            "other": "in {0} seconds"
          },
          "past": {
            "one": "{0} second ago",
            "other": "{0} seconds ago"
          }
        }
      },
      "second-short": {
        "displayName": "sec.",
        "relative": {
          "0": "now"
        },
        "relativeTime": {
          "future": {
            "one": "in {0} sec.",
            "other": "in {0} sec."
          },
          "past": {
            "one": "{0} sec. ago",
            "other": "{0} sec. ago"
          }
        }
      }
    }
  };
});

var main = createCommonjsModule(function (module, exports) {
  /* jslint esnext: true */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  core.default.__addLocaleData(en.default);

  core.default.defaultLocale = 'en';
  exports.default = core.default;
});

var intlRelativeformat = createCommonjsModule(function (module, exports) {

  var IntlRelativeFormat = main['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
});

createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
  var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.concurrent_mode") : 60111,
      n = b ? Symbol.for("react.forward_ref") : 60112,
      p = b ? Symbol.for("react.suspense") : 60113,
      q = b ? Symbol.for("react.suspense_list") : 60120,
      r = b ? Symbol.for("react.memo") : 60115,
      t = b ? Symbol.for("react.lazy") : 60116,
      v = b ? Symbol.for("react.fundamental") : 60117,
      w = b ? Symbol.for("react.responder") : 60118,
      x = b ? Symbol.for("react.scope") : 60119;

  function y(a) {
    if ("object" === _typeof$1(a) && null !== a) {
      var u = a.$$typeof;

      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;

            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case h:
                  return a;

                default:
                  return u;
              }

          }

        case t:
        case r:
        case d:
          return u;
      }
    }
  }

  function z(a) {
    return y(a) === m;
  }

  exports.typeOf = y;
  exports.AsyncMode = l;
  exports.ConcurrentMode = m;
  exports.ContextConsumer = k;
  exports.ContextProvider = h;
  exports.Element = c;
  exports.ForwardRef = n;
  exports.Fragment = e;
  exports.Lazy = t;
  exports.Memo = r;
  exports.Portal = d;
  exports.Profiler = g;
  exports.StrictMode = f;
  exports.Suspense = p;

  exports.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
  };

  exports.isAsyncMode = function (a) {
    return z(a) || y(a) === l;
  };

  exports.isConcurrentMode = z;

  exports.isContextConsumer = function (a) {
    return y(a) === k;
  };

  exports.isContextProvider = function (a) {
    return y(a) === h;
  };

  exports.isElement = function (a) {
    return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
  };

  exports.isForwardRef = function (a) {
    return y(a) === n;
  };

  exports.isFragment = function (a) {
    return y(a) === e;
  };

  exports.isLazy = function (a) {
    return y(a) === t;
  };

  exports.isMemo = function (a) {
    return y(a) === r;
  };

  exports.isPortal = function (a) {
    return y(a) === d;
  };

  exports.isProfiler = function (a) {
    return y(a) === g;
  };

  exports.isStrictMode = function (a) {
    return y(a) === f;
  };

  exports.isSuspense = function (a) {
    return y(a) === p;
  };
});

var reactIs_development = createCommonjsModule(function (module, exports) {

  {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
});

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function printWarning() {};

{
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = objectAssign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$1(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$1(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  {
    var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod

    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
});

var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var browser = invariant;

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      intlMessageformat.__addLocaleData(localeData);

      intlRelativeformat.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(intlMessageformat.__localeData__[normalizedLocale] && intlRelativeformat.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = propTypes.bool;
var number = propTypes.number;
var string = propTypes.string;
var func = propTypes.func;
var object = propTypes.object;
var oneOf = propTypes.oneOf;
var shape = propTypes.shape;
var any = propTypes.any;
var oneOfType = propTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  {
    console.error(error);
  }
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return intlMessageformat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return intlMessageformat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = intlRelativeformat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, intlRelativeformat.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  {
    browser(! /*#__PURE__*/react.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  } // `id` is a required field of a Message Descriptor.


  browser(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage(config, state, messageDescriptor, escapedValues);
}

var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage,
  formatHTMLMessage: formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
      getMessageFormat: memoizeFormatConstructor(intlMessageformat),
      getRelativeFormat: memoizeFormatConstructor(intlRelativeformat),
      getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.Component);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: propTypes.element.isRequired,
  initialNow: propTypes.any
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.Component);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.Component);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  updateInterval: propTypes.number,
  initialNow: propTypes.any,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.Component);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: propTypes.any.isRequired,
  format: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return /*#__PURE__*/react.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.Component);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: propTypes.any.isRequired,
  other: propTypes.node.isRequired,
  zero: propTypes.node,
  one: propTypes.node,
  two: propTypes.node,
  few: propTypes.node,
  many: propTypes.node,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }

  return formatMessage({}, {
    getMessageFormat: memoizeFormatConstructor(intlMessageformat)
  }, descriptor, values);
};

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if ( /*#__PURE__*/react.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.oneOfType([propTypes.string, propTypes.element]),
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/react.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: propTypes.object,
  tagName: propTypes.string,
  children: propTypes.func
}) ;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,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";

var translationMap = {
  'ja': {
    'gui.extension.speech2scratch.description': '音声を認識してテキストに変換する。'
  },
  'ja-Hira': {
    'gui.extension.speech2scratch.description': 'おんせいをにんしきしてテキストにへんかんする。'
  }
};
var entry = {
  name: 'Speech2Scratch',
  extensionId: 'speech2scratch',
  extensionURL: 'https://champierre.github.io/speech2scratch/speech2scratch.mjs',
  collaborator: 'champierre',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/react.createElement(FormattedMessage, {
    defaultMessage: "Speech2Scratch Blocks.",
    description: "Description for Speech2Scratch Blocks.",
    id: "gui.extension.speech2scratch.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: true,
  helpLink: 'https://github.com/champierre/speech2scratch/',
  translationMap: translationMap
};

/**
 * Types of block
 * @enum {string}
 */
var BlockType = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType;

var blockIconURI = 'data:image/png;base64,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';
var SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */

var extensionURL = 'https://champierre.github.io/speech2scratch/speech2scratch.mjs';

var Scratch3Speech2Scratch = /*#__PURE__*/function () {
  function Scratch3Speech2Scratch(runtime) {
    _classCallCheck(this, Scratch3Speech2Scratch);

    this.runtime = runtime;
    this.speech = '';
  }

  _createClass(Scratch3Speech2Scratch, [{
    key: "getInfo",
    value: function getInfo() {
      return {
        id: Scratch3Speech2Scratch.EXTENSION_ID,
        name: Scratch3Speech2Scratch.EXTENSION_NAME,
        extensionURL: Scratch3Speech2Scratch.extensionURL,
        blockIconURI: blockIconURI,
        blocks: [{
          opcode: 'startRecognition',
          blockType: blockType.COMMAND,
          text: '音声認識開始'
        }, {
          opcode: 'getSpeech',
          blockType: blockType.REPORTER,
          text: '音声'
        }],
        menus: {}
      };
    }
  }, {
    key: "startRecognition",
    value: function startRecognition() {
      var _this = this;

      var recognition = new SpeechRecognition();

      recognition.onresult = function (event) {
        _this.speech = event.results[0][0].transcript;
      };

      this.speech = '';
      recognition.start();
    }
  }, {
    key: "getSpeech",
    value: function getSpeech() {
      return this.speech;
    }
  }], [{
    key: "EXTENSION_NAME",
    get:
    /**
     * @return {string} - the name of this extension.
     */
    function get() {
      return 'Speech2Scratch';
    }
    /**
     * @return {string} - the ID of this extension.
     */

  }, {
    key: "EXTENSION_ID",
    get: function get() {
      return 'speech2scratch';
    }
    /**
     * URL to get this extension.
     * @type {string}
     */

  }, {
    key: "extensionURL",
    get: function get() {
      return extensionURL;
    }
    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    ,
    set: function set(url) {
      extensionURL = url;
    }
  }]);

  return Scratch3Speech2Scratch;
}();

var blockClass = Scratch3Speech2Scratch; // loadable-extension needs this line.

var _speech2scratch = Scratch3Speech2Scratch;
_speech2scratch.blockClass = blockClass;

export { _speech2scratch as __moduleExports, blockClass, entry };
