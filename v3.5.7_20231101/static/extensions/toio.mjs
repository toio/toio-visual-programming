var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var runtime = { exports: {} };
(function(module) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
      obj[key] = desc.value;
    };
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
    defineProperty(
      GeneratorFunctionPrototype,
      "constructor",
      { value: GeneratorFunction, configurable: true }
    );
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
      }
      defineProperty(this, "_invoke", { value: enqueue });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method;
      var method = delegate.iterator[methodName];
      if (method === undefined$1) {
        context.delegate = null;
        if (methodName === "throw" && delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }
        if (methodName !== "return") {
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a '" + methodName + "' method"
          );
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry2 = { tryLoc: locs[0] };
      if (1 in locs) {
        entry2.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry2.finallyLoc = locs[2];
        entry2.afterLoc = locs[3];
      }
      this.tryEntries.push(entry2);
    }
    function resetTryEntry(entry2) {
      var record = entry2.completion || {};
      record.type = "normal";
      delete record.arg;
      entry2.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(val) {
      var object = Object(val);
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key2 = keys.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next2.value = iterable[i];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry2 = this.tryEntries[i];
          var record = entry2.completion;
          if (entry2.tryLoc === "root") {
            return handle("end");
          }
          if (entry2.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry2, "catchLoc");
            var hasFinally = hasOwn.call(entry2, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry2.catchLoc) {
                return handle(entry2.catchLoc, true);
              } else if (this.prev < entry2.finallyLoc) {
                return handle(entry2.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry2.catchLoc) {
                return handle(entry2.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry2.finallyLoc) {
                return handle(entry2.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry2 = this.tryEntries[i];
          if (entry2.tryLoc <= this.prev && hasOwn.call(entry2, "finallyLoc") && this.prev < entry2.finallyLoc) {
            var finallyEntry = entry2;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry2 = this.tryEntries[i];
          if (entry2.finallyLoc === finallyLoc) {
            this.complete(entry2.completion, entry2.afterLoc);
            resetTryEntry(entry2);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry2 = this.tryEntries[i];
          if (entry2.tryLoc === tryLoc) {
            var record = entry2.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry2);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
    module.exports
  );
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
class JSONRPC$1 {
  constructor() {
    this._requestID = 0;
    this._openRequests = {};
  }
  sendRemoteRequest(method, params) {
    const requestID = this._requestID++;
    const promise = new Promise((resolve, reject) => {
      this._openRequests[requestID] = { resolve, reject };
    });
    this._sendRequest(method, params, requestID);
    return promise;
  }
  sendRemoteNotification(method, params) {
    this._sendRequest(method, params);
  }
  didReceiveCall() {
    throw new Error("Must override didReceiveCall");
  }
  _sendMessage() {
    throw new Error("Must override _sendMessage");
  }
  _sendRequest(method, params, id) {
    const request = {
      jsonrpc: "2.0",
      method,
      params
    };
    if (id !== null) {
      request.id = id;
    }
    this._sendMessage(request);
  }
  _handleMessage(json) {
    if (json.jsonrpc !== "2.0") {
      throw new Error(`Bad or missing JSON-RPC version in message: ${json}`);
    }
    if (json.hasOwnProperty("method")) {
      this._handleRequest(json);
    } else {
      this._handleResponse(json);
    }
  }
  _sendResponse(id, result, error) {
    const response = {
      jsonrpc: "2.0",
      id
    };
    if (error) {
      response.error = error;
    } else {
      response.result = result || null;
    }
    this._sendMessage(response);
  }
  _handleResponse(json) {
    const { result, error, id } = json;
    const openRequest = this._openRequests[id];
    delete this._openRequests[id];
    if (openRequest) {
      if (error) {
        openRequest.reject(error);
      } else {
        openRequest.resolve(result);
      }
    }
  }
  _handleRequest(json) {
    const { method, params, id } = json;
    const rawResult = this.didReceiveCall(method, params);
    if (id !== null && typeof id !== "undefined") {
      Promise.resolve(rawResult).then(
        (result) => {
          this._sendResponse(id, result);
        },
        (error) => {
          this._sendResponse(id, null, error);
        }
      );
    }
  }
}
var jsonrpc = JSONRPC$1;
const JSONRPC = jsonrpc;
class BLE extends JSONRPC {
  constructor(runtime2, extensionId, peripheralOptions, connectCallback, resetCallback = null) {
    super();
    this._socket = runtime2.getScratchLinkSocket("BLE");
    this._socket.setOnOpen(this.requestPeripheral.bind(this));
    this._socket.setOnClose(this.handleDisconnectError.bind(this));
    this._socket.setOnError(this._handleRequestError.bind(this));
    this._socket.setHandleMessage(this._handleMessage.bind(this));
    this._sendMessage = this._socket.sendMessage.bind(this._socket);
    this._availablePeripherals = {};
    this._connectCallback = connectCallback;
    this._connected = false;
    this._characteristicDidChangeCallback = null;
    this._resetCallback = resetCallback;
    this._discoverTimeoutID = null;
    this._extensionId = extensionId;
    this._peripheralOptions = peripheralOptions;
    this._runtime = runtime2;
    this._socket.open();
  }
  requestPeripheral() {
    this._availablePeripherals = {};
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15e3);
    this.sendRemoteRequest("discover", this._peripheralOptions).catch((e) => {
      this._handleRequestError(e);
    });
  }
  connectPeripheral(id) {
    this.sendRemoteRequest("connect", { peripheralId: id }).then(() => {
      this._connected = true;
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
      this._connectCallback();
    }).catch((e) => {
      this._handleRequestError(e);
    });
  }
  disconnect() {
    if (this._connected) {
      this._connected = false;
    }
    if (this._socket.isOpen()) {
      this._socket.close();
    }
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
  }
  isConnected() {
    return this._connected;
  }
  startNotifications(serviceId, characteristicId, onCharacteristicChanged = null) {
    const params = {
      serviceId,
      characteristicId
    };
    this._characteristicDidChangeCallback = onCharacteristicChanged;
    return this.sendRemoteRequest("startNotifications", params).catch((e) => {
      this.handleDisconnectError(e);
    });
  }
  read(serviceId, characteristicId, optStartNotifications = false, onCharacteristicChanged = null) {
    const params = {
      serviceId,
      characteristicId
    };
    if (optStartNotifications) {
      params.startNotifications = true;
    }
    if (onCharacteristicChanged) {
      this._characteristicDidChangeCallback = onCharacteristicChanged;
    }
    return this.sendRemoteRequest("read", params).catch((e) => {
      this.handleDisconnectError(e);
    });
  }
  write(serviceId, characteristicId, message, encoding = null, withResponse = null) {
    const params = { serviceId, characteristicId, message };
    if (encoding) {
      params.encoding = encoding;
    }
    if (withResponse !== null) {
      params.withResponse = withResponse;
    }
    return this.sendRemoteRequest("write", params).catch((e) => {
      this.handleDisconnectError(e);
    });
  }
  didReceiveCall(method, params) {
    switch (method) {
      case "didDiscoverPeripheral":
        this._availablePeripherals[params.peripheralId] = params;
        this._runtime.emit(
          this._runtime.constructor.PERIPHERAL_LIST_UPDATE,
          this._availablePeripherals
        );
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "userDidPickPeripheral":
        this._availablePeripherals[params.peripheralId] = params;
        this._runtime.emit(
          this._runtime.constructor.USER_PICKED_PERIPHERAL,
          this._availablePeripherals
        );
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "userDidNotPickPeripheral":
        this._runtime.emit(
          this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT
        );
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "characteristicDidChange":
        if (this._characteristicDidChangeCallback) {
          this._characteristicDidChangeCallback(params.message);
        }
        break;
      case "ping":
        return 42;
    }
  }
  handleDisconnectError() {
    if (!this._connected)
      return;
    this.disconnect();
    if (this._resetCallback) {
      this._resetCallback();
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
      message: `Scratch lost connection to`,
      extensionId: this._extensionId
    });
  }
  _handleRequestError() {
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
      message: `Scratch lost connection to`,
      extensionId: this._extensionId
    });
  }
  _handleDiscoverTimeout() {
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
  }
}
var ble = BLE;
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Bluetooth$1 {
  constructor() {
    __publicField$1(this, "connectionType");
  }
  async discover(_serviceUuid) {
    return;
  }
}
var base64Js$1 = {};
base64Js$1.byteLength = byteLength$1;
base64Js$1.toByteArray = toByteArray$1;
base64Js$1.fromByteArray = fromByteArray$1;
var lookup$1 = [];
var revLookup$1 = [];
var Arr$1 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i$1 = 0, len$1 = code$1.length; i$1 < len$1; ++i$1) {
  lookup$1[i$1] = code$1[i$1];
  revLookup$1[code$1.charCodeAt(i$1)] = i$1;
}
revLookup$1["-".charCodeAt(0)] = 62;
revLookup$1["_".charCodeAt(0)] = 63;
function getLens$1(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength$1(b64) {
  var lens = getLens$1(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength$1(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray$1(b64) {
  var tmp;
  var lens = getLens$1(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr$1(_byteLength$1(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup$1[b64.charCodeAt(i)] << 18 | revLookup$1[b64.charCodeAt(i + 1)] << 12 | revLookup$1[b64.charCodeAt(i + 2)] << 6 | revLookup$1[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup$1[b64.charCodeAt(i)] << 2 | revLookup$1[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup$1[b64.charCodeAt(i)] << 10 | revLookup$1[b64.charCodeAt(i + 1)] << 4 | revLookup$1[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64$1(num) {
  return lookup$1[num >> 18 & 63] + lookup$1[num >> 12 & 63] + lookup$1[num >> 6 & 63] + lookup$1[num & 63];
}
function encodeChunk$1(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64$1(tmp));
  }
  return output.join("");
}
function fromByteArray$1(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk$1(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup$1[tmp >> 2] + lookup$1[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup$1[tmp >> 10] + lookup$1[tmp >> 4 & 63] + lookup$1[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
class EventTarget$2 {
  constructor() {
    __publicField$1(this, "eventListeners", {});
  }
  addEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener);
  }
  removeEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      return;
    }
    this.eventListeners[type] = this.eventListeners[type].filter(
      (eventListener) => eventListener !== listener
    );
  }
  dispatchEvent(event) {
    if (!this.eventListeners[event.type]) {
      return true;
    }
    for (const eventListener of this.eventListeners[event.type]) {
      eventListener(event);
    }
    return true;
  }
}
class Peripheral$1 extends EventTarget$2 {
  constructor() {
    super(...arguments);
    __publicField$1(this, "id");
    __publicField$1(this, "name");
    __publicField$1(this, "rssi");
    __publicField$1(this, "watchdog");
  }
  async connect(_options = {}) {
  }
  disconnect() {
  }
  isConnected() {
    return false;
  }
  getId() {
    return this.id || "";
  }
  getName() {
    return this.name || "";
  }
  getRssi() {
    return this.rssi || -50;
  }
  async read(_characteristicUuid) {
  }
  async write(_characteristicUuid, _value, _withResponse = false) {
  }
  async startNotifications(_characteristicUuid, _listener) {
  }
}
class ScratchLinkPeripheral$1 extends Peripheral$1 {
  constructor(rpc, device) {
    super();
    __publicField$1(this, "rpc");
    __publicField$1(this, "id");
    __publicField$1(this, "name");
    __publicField$1(this, "listeners", []);
    this.rpc = rpc;
    this.id = device.id;
    this.name = device.name;
  }
  async connect() {
    this.rpc.send("connect", { peripheralId: this.id });
  }
  async write(characteristicUuid, value, withResponse = false) {
    this.rpc.send("write", {
      serviceId: "10b20100-5b3b-4571-9508-cf3efcd7bbae",
      characteristicId: characteristicUuid,
      message: base64Js$1.fromByteArray(Uint8Array.from(value)),
      encoding: "base64",
      withoutResponse: !withResponse
    });
  }
  async startNotifications(characteristicUuid, listener) {
    this.listeners.push(listener);
    this.rpc.send("startNotifications", {
      serviceId: "10b20100-5b3b-4571-9508-cf3efcd7bbae",
      characteristicId: characteristicUuid
    });
    this.rpc.setMessageHandler("characteristicDidChange", (event) => {
      const data = base64Js$1.toByteArray(event.params.message);
      const event2 = {
        target: {
          value: new DataView(data.buffer)
        }
      };
      for (const listener2 of this.listeners) {
        listener2(event2);
      }
    });
  }
}
class JsonRpc$1 {
  constructor() {
    __publicField$1(this, "webSocket");
    __publicField$1(this, "handlers", {});
  }
  static async getAvailability(url) {
    return new Promise((resolve) => {
      const webSocket = new WebSocket(url);
      webSocket.onopen = () => {
        resolve(true);
      };
      webSocket.onerror = () => {
        resolve(false);
      };
    });
  }
  async open(url) {
    return new Promise((resolve) => {
      this.webSocket = new WebSocket(url);
      this.webSocket.onmessage = this.handleMessage.bind(this);
      this.webSocket.onopen = () => resolve();
    });
  }
  close() {
    if (!this.webSocket) {
      return;
    }
    this.webSocket.close();
    delete this.webSocket;
  }
  setMessageHandler(event, handler) {
    this.handlers[event] = handler;
  }
  removeMessageHandler(event) {
    if (this.handlers[event]) {
      delete this.handlers[event];
    }
  }
  send(method, params) {
    if (!this.webSocket) {
      return;
    }
    const message = {
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    };
    this.webSocket.send(JSON.stringify(message));
  }
  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.jsonrpc !== "2.0") {
      return;
    }
    const handler = this.handlers[message.method];
    if (handler) {
      handler(message);
    }
  }
}
const BluetoothConnectionType$1 = {
  AUTO: "AUTO",
  WEB_BLUETOOTH: "WEB_BLUETOOTH",
  SCRATCH_LINK: "SCRATCH_LINK",
  SCRATCH_VM: "SCRATCH_VM"
};
const isRunningOnReactNative$1$1 = () => window.hasOwnProperty("ReactNativeWebView");
const _ScratchLinkBluetooth$1 = class extends Bluetooth$1 {
  constructor() {
    super(...arguments);
    __publicField$1(this, "connectionType", BluetoothConnectionType$1.SCRATCH_LINK);
    __publicField$1(this, "isScanning", false);
    __publicField$1(this, "timeout");
    __publicField$1(this, "foundDevices", {});
    __publicField$1(this, "handleMessage", (message) => {
      const device = {
        id: message.params.peripheralId,
        name: message.params.name || void 0,
        rssi: message.params.rssi || void 0
      };
      this.foundDevices[device.id] = device;
    });
  }
  static async isAvailable() {
    var _a;
    if (document.getElementById("scratch-link-extension-script") && ((_a = window.Scratch) == null ? void 0 : _a.ScratchLinkSafariSocket)) {
      return Promise.resolve(true);
    }
    return new Promise(async (resolve) => {
      if (isRunningOnReactNative$1$1()) {
        resolve(true);
        return;
      }
      await Promise.any([
        this.isWebSocketAvailable(_ScratchLinkBluetooth$1.SCRATCH_LINK_DEFAULT_URL),
        this.isWebSocketAvailable(_ScratchLinkBluetooth$1.SCRATCH_LINK_OLD_URL)
      ]).catch(() => {
        resolve(false);
      });
      resolve(true);
    });
  }
  static async isWebSocketAvailable(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        ws.close();
        resolve(url);
      };
      ws.onerror = () => {
        reject();
      };
    });
  }
  async discover(serviceUuid) {
    const rpc = new JsonRpc$1();
    await rpc.open(_ScratchLinkBluetooth$1.SCRATCH_LINK_DEFAULT_URL);
    const options = { filters: [{ services: [serviceUuid] }] };
    this.startScanning(rpc, options);
    return new Promise((resolve) => {
      this.timeout = setTimeout(() => {
        this.stopScanning(rpc);
        if (this.foundDevices.length === 0) {
          rpc.close();
          resolve();
        }
        const devices = Object.values(this.foundDevices).sort((a, b) => b.rssi - a.rssi);
        const device = devices[0];
        resolve(new ScratchLinkPeripheral$1(rpc, device));
      }, _ScratchLinkBluetooth$1.SCAN_TIMEOUT_MS);
    });
  }
  startScanning(rpc, options) {
    if (this.isScanning) {
      console.info("Already scanning.");
      return;
    }
    this.isScanning = true;
    rpc.setMessageHandler("didDiscoverPeripheral", this.handleMessage);
    rpc.send("discover", options);
  }
  stopScanning(rpc) {
    if (!this.isScanning) {
      return;
    }
    this.isScanning = false;
    clearTimeout(this.timeout);
    rpc.removeMessageHandler("didDiscoverPeripheral");
  }
};
let ScratchLinkBluetooth$1 = _ScratchLinkBluetooth$1;
__publicField$1(ScratchLinkBluetooth$1, "SCRATCH_LINK_DEFAULT_URL", "ws://127.0.0.1:20111/scratch/ble");
__publicField$1(ScratchLinkBluetooth$1, "SCRATCH_LINK_OLD_URL", "wss://device-manager.scratch.mit.edu:20110/scratch/ble");
__publicField$1(ScratchLinkBluetooth$1, "SCAN_TIMEOUT_MS", 1e3);
class Watchdog$1 {
  constructor() {
    __publicField$1(this, "isRunning", false);
    __publicField$1(this, "checkFunction");
    __publicField$1(this, "failedFunction");
    __publicField$1(this, "timer");
    __publicField$1(this, "timeoutMs");
    __publicField$1(this, "isAlive");
  }
  start(checkFunction, failedFunction, timeoutMs) {
    this.isRunning = true;
    this.checkFunction = checkFunction;
    this.failedFunction = failedFunction;
    this.timeoutMs = timeoutMs;
    this.isAlive = false;
    this.timer = setInterval(async () => {
      if (this.isAlive) {
        this.isAlive = false;
        return;
      }
      if (typeof this.checkFunction === "function") {
        try {
          await this.checkFunction();
        } catch (e) {
          this.timeout();
        }
      }
    }, this.timeoutMs);
  }
  tick() {
    if (!this.isRunning) {
      return;
    }
    this.isAlive = true;
  }
  timeout() {
    this.stop();
    if (typeof this.failedFunction === "function") {
      this.failedFunction();
    }
  }
  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      delete this.timer;
    }
  }
}
const isRunningOnReactNative$2 = () => window.ReactNativeWebView !== void 0;
const isWindows$1$1 = navigator.platform.startsWith("Win");
class ScratchVMPeripheral$1 extends Peripheral$1 {
  constructor(ble2) {
    super();
    __publicField$1(this, "ble");
    __publicField$1(this, "serviceUuid", "10b20100-5b3b-4571-9508-cf3efcd7bbae");
    this.ble = ble2;
    if (!isRunningOnReactNative$2()) {
      this.watchdog = new Watchdog$1();
    }
  }
  async connect(id) {
    return new Promise((resolve) => {
      this.id = id;
      this.ble.connectPeripheral(id);
      const peripheral = this.ble._availablePeripherals[this.id];
      if (peripheral) {
        this.name = peripheral.name;
      }
      const timer = setInterval(() => {
        const connected = this.isConnected();
        if (connected) {
          clearInterval(timer);
          this.dispatchEvent(new Event("connected"));
          resolve();
        }
      }, 50);
    });
  }
  disconnect() {
    if (this.ble) {
      this.ble.disconnect();
    }
    delete this.id;
    delete this.name;
  }
  isConnected() {
    return this.ble !== void 0 && this.ble.isConnected();
  }
  async read(_characteristicUuid) {
    console.warn("Reading data with Scratch Link is disabled since it stops notification");
  }
  async write(characteristicUuid, value, withResponse = false) {
    var _a;
    (_a = this.watchdog) == null ? void 0 : _a.tick();
    const base64 = base64Js$1.fromByteArray(Uint8Array.from(value));
    return this.ble.write(this.serviceUuid, characteristicUuid, base64, "base64", isWindows$1$1 ? false : withResponse);
  }
  async startNotifications(characteristicUuid, listener) {
    this.ble.startNotifications(this.serviceUuid, characteristicUuid, (value) => {
      var _a;
      (_a = this.watchdog) == null ? void 0 : _a.tick();
      if (!listener) {
        return;
      }
      const data = base64Js$1.toByteArray(value);
      const event2 = {
        target: {
          value: new DataView(data.buffer)
        }
      };
      listener(event2);
    });
  }
}
const _ScratchVMBluetooth$1 = class extends Bluetooth$1 {
  constructor(options) {
    super();
    __publicField$1(this, "connectionType", BluetoothConnectionType$1.SCRATCH_VM);
    __publicField$1(this, "runtime");
    __publicField$1(this, "extensionId");
    __publicField$1(this, "BLE");
    this.runtime = options.runtime;
    this.extensionId = options.extensionId;
    this.BLE = options.BLE;
  }
  async discover(serviceUuid) {
    const index = _ScratchVMBluetooth$1.EXTENSION_IDS.indexOf(this.extensionId);
    const ble2 = new this.BLE(
      this.runtime,
      this.extensionId,
      {
        filters: [{ services: [serviceUuid] }],
        index
      },
      this.onConnect,
      this.reset
    );
    if (!ble2) {
      return;
    }
    return new ScratchVMPeripheral$1(ble2);
  }
  onConnect() {
  }
  reset() {
  }
};
let ScratchVMBluetooth$1 = _ScratchVMBluetooth$1;
__publicField$1(ScratchVMBluetooth$1, "EXTENSION_IDS", ["toio", "toio2"]);
const isWindows$2 = navigator.platform.startsWith("Win");
const _WebBluetoothPeripheral$1 = class extends Peripheral$1 {
  constructor(device, serviceUuid) {
    super();
    __publicField$1(this, "device");
    __publicField$1(this, "serviceUuid");
    __publicField$1(this, "characteristics", {});
    __publicField$1(this, "onConnectionLost", () => {
      this.dispatchEvent(new Event("connectionlost"));
      this.disconnect();
    });
    this.device = device;
    this.id = this.device.id;
    this.name = this.device.name;
    this.serviceUuid = serviceUuid;
  }
  async connect() {
    if (!this.device.gatt) {
      return;
    }
    const server = await this.device.gatt.connect();
    if (!server) {
      return;
    }
    const service = await server.getPrimaryService(this.serviceUuid);
    if (!service) {
      return;
    }
    const characteristics = await service.getCharacteristics();
    if (!characteristics) {
      return;
    }
    for (const characteristic of characteristics) {
      this.characteristics[characteristic.uuid] = characteristic;
    }
    this.dispatchEvent(new Event("connected"));
    this.device.addEventListener("gattserverdisconnected", this.onConnectionLost);
  }
  disconnect() {
    var _a;
    (_a = this.watchdog) == null ? void 0 : _a.stop();
    if (!this.device.gatt) {
      return;
    }
    this.device.removeEventListener("gattserverdisconnected", this.onConnectionLost);
    this.device.gatt.disconnect();
    delete this.id;
    delete this.name;
    this.dispatchEvent(new Event("disconnected"));
  }
  isConnected() {
    var _a;
    return ((_a = this.device.gatt) == null ? void 0 : _a.connected) === true;
  }
  async write(characteristicUuid, value, withResponse = false) {
    if (isWindows$2) {
      withResponse = false;
    }
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }
    const data = Uint8Array.from(value);
    const doWrite = async (retryCount) => {
      try {
        withResponse ? await characteristic.writeValueWithResponse(data) : await characteristic.writeValueWithoutResponse(data);
        return data.length;
      } catch (e) {
        if (retryCount < _WebBluetoothPeripheral$1.MAX_RETRY_COUNT) {
          setTimeout(() => doWrite(retryCount + 1), retryCount * 10);
        } else {
          return;
        }
      }
    };
    doWrite(1);
  }
  async startNotifications(characteristicUuid, listener) {
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }
    characteristic.addEventListener("characteristicvaluechanged", listener);
    characteristic.startNotifications();
  }
};
let WebBluetoothPeripheral$1 = _WebBluetoothPeripheral$1;
__publicField$1(WebBluetoothPeripheral$1, "MAX_RETRY_COUNT", 100);
class WebBluetooth extends Bluetooth$1 {
  constructor() {
    super(...arguments);
    __publicField$1(this, "connectionType", BluetoothConnectionType$1.WEB_BLUETOOTH);
  }
  async discover(serviceUuid) {
    const options = { filters: [{ services: [serviceUuid] }] };
    const device = await navigator.bluetooth.requestDevice(options);
    if (!device) {
      console.info("No bluetooth devices");
      return;
    }
    return new WebBluetoothPeripheral$1(device, serviceUuid);
  }
}
const BluetoothFactory = {
  create: async (type = BluetoothConnectionType$1.AUTO, options = {}) => {
    const currentType = await BluetoothFactory.getConnectionType(type);
    switch (currentType) {
      case BluetoothConnectionType$1.SCRATCH_LINK:
        return new ScratchLinkBluetooth$1();
      case BluetoothConnectionType$1.SCRATCH_VM:
        return new ScratchVMBluetooth$1(options);
      case BluetoothConnectionType$1.WEB_BLUETOOTH:
      default:
        return new WebBluetooth();
    }
  },
  getConnectionType: async (type = BluetoothConnectionType$1.AUTO) => {
    switch (type) {
      case BluetoothConnectionType$1.AUTO:
        if (await ScratchLinkBluetooth$1.isAvailable()) {
          return BluetoothConnectionType$1.SCRATCH_LINK;
        }
        return BluetoothConnectionType$1.WEB_BLUETOOTH;
      case BluetoothConnectionType$1.SCRATCH_LINK:
        return BluetoothConnectionType$1.SCRATCH_LINK;
      case BluetoothConnectionType$1.SCRATCH_VM:
        if (await ScratchLinkBluetooth$1.isAvailable()) {
          return BluetoothConnectionType$1.SCRATCH_VM;
        } else {
          return BluetoothConnectionType$1.WEB_BLUETOOTH;
        }
      case BluetoothConnectionType$1.WEB_BLUETOOTH:
      default:
        return BluetoothConnectionType$1.WEB_BLUETOOTH;
    }
  }
};
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class EventTarget$1 {
  constructor() {
    __publicField2(this, "eventListeners", {});
  }
  addEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener);
  }
  removeEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      return;
    }
    this.eventListeners[type] = this.eventListeners[type].filter(
      (eventListener) => eventListener !== listener
    );
  }
  dispatchEvent(event) {
    if (!this.eventListeners[event.type]) {
      return true;
    }
    for (const eventListener of this.eventListeners[event.type]) {
      eventListener(event);
    }
    return true;
  }
}
const _VirtualState = class {
  constructor(coreCube) {
    __publicField2(this, "coreCube");
    __publicField2(this, "needUpdate", true);
    __publicField2(this, "x", 0);
    __publicField2(this, "y", 0);
    __publicField2(this, "direction", 0);
    this.coreCube = coreCube;
  }
  set state(state) {
    if (typeof state.x === "number") {
      this.x = state.x;
    }
    if (typeof state.y === "number") {
      this.y = state.y;
    }
    if (typeof state.direction === "number") {
      this.direction = state.direction;
    }
    this.needUpdate = false;
  }
  get state() {
    return {
      x: this.x,
      y: this.y,
      direction: this.direction
    };
  }
  updatePoseIfNeeded() {
    const { state } = this.coreCube;
    let newState = null;
    if (this.needUpdate || this.checkIfActualPositionDifferFromTarget(_VirtualState.DISTANCE_THRESHOLD)) {
      newState = {
        x: state.x,
        y: state.y,
        direction: state.direction
      };
    } else {
      if (this.checkIfActualDirectionDifferFromTarget(_VirtualState.DIRECTION_THRESHOLD)) {
        newState = {
          direction: state.direction
        };
      }
    }
    if (newState === null) {
      return;
    }
    this.state = newState;
    this.needUpdate = false;
  }
  checkIfActualPositionDifferFromTarget(threshold) {
    const actualState = this.coreCube.state;
    const dx = this.x - (actualState.x || 0);
    const dy = this.y - (actualState.y || 0);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > threshold;
  }
  checkIfActualDirectionDifferFromTarget(threshold) {
    const actualState = this.coreCube.state;
    let angle = (this.direction - (actualState.direction || 0)) % 360;
    if (angle > 180) {
      angle -= 360;
    } else if (angle < -180) {
      angle += 360;
    }
    return Math.abs(angle) > threshold;
  }
  move(distance) {
    this.updatePoseIfNeeded();
    this.x += Math.cos(this.direction * _VirtualState.DEGREE_TO_RADIAN) * distance;
    this.y += Math.sin(this.direction * _VirtualState.DEGREE_TO_RADIAN) * distance;
    this.x = Math.round(this.x * 100) / 100;
    this.y = Math.round(this.y * 100) / 100;
    return this.state;
  }
  rotate(angle) {
    this.updatePoseIfNeeded();
    this.direction += angle;
    this.direction = Math.round(this.direction * 100) / 100;
    if (this.direction > 360) {
      this.direction %= 360;
    } else if (this.direction < 0) {
      this.direction = 360 + this.direction % 360;
    }
    return this.state;
  }
  reset() {
    this.needUpdate = true;
  }
};
let VirtualState = _VirtualState;
__publicField2(VirtualState, "DEGREE_TO_RADIAN", Math.PI / 180);
__publicField2(VirtualState, "DISTANCE_THRESHOLD", 20 * 360 / 410);
__publicField2(VirtualState, "DIRECTION_THRESHOLD", 30);
class Task {
  constructor(callback, index) {
    __publicField2(this, "index");
    __publicField2(this, "promise");
    __publicField2(this, "resolve");
    __publicField2(this, "reject");
    this.index = index;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      callback(this.index);
    });
  }
}
const _Tasks = class {
  constructor() {
    __publicField2(this, "tasks", {});
  }
  create(callback) {
    const task = new Task(callback, _Tasks.index);
    this.tasks[_Tasks.index] = task;
    _Tasks.index++;
    return task.promise;
  }
  removeAll() {
    for (const task of Object.values(this.tasks)) {
      task.resolve();
    }
    this.tasks = {};
  }
};
let Tasks = _Tasks;
__publicField2(Tasks, "index", 0);
class CancelError extends Error {
  constructor(reason) {
    super(reason || "Promise was canceled");
    this.name = "CancelError";
  }
  get isCanceled() {
    return true;
  }
}
class PCancelable {
  static fn(userFunction) {
    return (...arguments_) => {
      return new PCancelable((resolve, reject, onCancel) => {
        arguments_.push(onCancel);
        userFunction(...arguments_).then(resolve, reject);
      });
    };
  }
  constructor(executor) {
    this._cancelHandlers = [];
    this._isPending = true;
    this._isCanceled = false;
    this._rejectOnCancel = true;
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject;
      const onResolve = (value) => {
        if (!this._isCanceled || !onCancel.shouldReject) {
          this._isPending = false;
          resolve(value);
        }
      };
      const onReject = (error) => {
        this._isPending = false;
        reject(error);
      };
      const onCancel = (handler) => {
        if (!this._isPending) {
          throw new Error("The `onCancel` handler was attached after the promise settled.");
        }
        this._cancelHandlers.push(handler);
      };
      Object.defineProperties(onCancel, {
        shouldReject: {
          get: () => this._rejectOnCancel,
          set: (boolean) => {
            this._rejectOnCancel = boolean;
          }
        }
      });
      executor(onResolve, onReject, onCancel);
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  finally(onFinally) {
    return this._promise.finally(onFinally);
  }
  cancel(reason) {
    if (!this._isPending || this._isCanceled) {
      return;
    }
    this._isCanceled = true;
    if (this._cancelHandlers.length > 0) {
      try {
        for (const handler of this._cancelHandlers) {
          handler();
        }
      } catch (error) {
        this._reject(error);
        return;
      }
    }
    if (this._rejectOnCancel) {
      this._reject(new CancelError(reason));
    }
  }
  get isCanceled() {
    return this._isCanceled;
  }
}
Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);
class CancelablePromise {
  constructor(callback, cancelCallback, duration) {
    __publicField2(this, "promise");
    __publicField2(this, "resolve");
    __publicField2(this, "timer");
    __publicField2(this, "cancelPromise");
    __publicField2(this, "cancelCallback");
    this.promise = new PCancelable((resolve, _, onCancel) => {
      this.resolve = resolve;
      onCancel.shouldReject = false;
      onCancel(() => this.cancel(false));
      if (callback) {
        callback(this);
      }
    });
    this.cancelCallback = cancelCallback;
    if (typeof duration === "number" && duration > 0) {
      this.timer = window.setTimeout(() => {
        this.cancel(true);
      }, duration);
    }
  }
  get rawPromise() {
    return this.promise;
  }
  cancel(needsStop, immediate = false) {
    if (!needsStop && this.cancelPromise) {
      this.cancelPromise.cancel();
      delete this.cancelPromise;
    }
    if (needsStop) {
      if (this.cancelCallback) {
        if (immediate) {
          this.cancelCallback();
        } else {
          this.cancelPromise = new PCancelable((_resolve, _reject, onCancel) => {
            const timer = setTimeout(() => this.cancelCallback(), 50);
            onCancel.shouldReject = false;
            onCancel(() => clearTimeout(timer));
          });
        }
      }
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
    if (this.resolve) {
      this.resolve();
      delete this.resolve;
    }
    if (this.promise) {
      this.promise.cancel();
      delete this.promise;
    }
  }
  get isCanceled() {
    return this.promise === void 0 || this.promise.isCanceled;
  }
}
class CharacteristicBase {
  constructor(coreCube) {
    __publicField2(this, "coreCube");
    __publicField2(this, "cancelablePromise");
    this.coreCube = coreCube;
  }
  generateCancelablePromise(callback, cancelCallback, durationMs) {
    this.cancelPromise();
    this.cancelablePromise = new CancelablePromise(callback, cancelCallback, durationMs);
    if (!this.cancelablePromise) {
      return;
    }
    return this.cancelablePromise.rawPromise;
  }
  cancelPromise() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel(false);
    }
  }
}
const _IdCharacteristic = class extends CharacteristicBase {
  constructor() {
    super(...arguments);
    __publicField2(this, "handleNotification", (event) => {
      const { state } = this.coreCube;
      const data = event.target.value;
      switch (data.getUint8(0)) {
        case 1:
          state.isTouched = true;
          state.x = data.getUint16(1, true);
          state.y = data.getUint16(3, true);
          state.direction = data.getUint16(5, true);
          state.standardId = void 0;
          break;
        case 2:
          state.isTouched = true;
          state.direction = data.getUint32(1, true);
          state.standardId = data.getUint16(5, true);
          break;
        default:
          state.isTouched = false;
          state.standardId = void 0;
          break;
      }
    });
  }
  static async from(coreCube) {
    const instance = new _IdCharacteristic(coreCube);
    await instance.coreCube.peripheral.startNotifications(_IdCharacteristic.UUID, instance.handleNotification);
    return instance;
  }
};
let IdCharacteristic = _IdCharacteristic;
__publicField2(IdCharacteristic, "UUID", uuid("0101"));
const _MotorCharacteristic = class extends CharacteristicBase {
  constructor() {
    super(...arguments);
    __publicField2(this, "detachStartTime", null);
  }
  static async from(coreCube) {
    const instance = new _MotorCharacteristic(coreCube);
    return instance;
  }
  async move(leftSpeed, rightSpeed, durationMs = _MotorCharacteristic.INFINITE_DURATION) {
    return this.generateCancelablePromise(
      () => this.doMove(leftSpeed, rightSpeed),
      () => this.coreCube.motor.stop(),
      durationMs
    );
  }
  async doMove(leftSpeed, rightSpeed, durationMs) {
    const data = [
      durationMs === void 0 ? 1 : 2,
      1,
      leftSpeed >= 0 ? 1 : 2,
      Math.abs(leftSpeed),
      2,
      rightSpeed >= 0 ? 1 : 2,
      Math.abs(rightSpeed)
    ];
    if (durationMs !== void 0) {
      data.push(durationMs / 10);
    }
    return this.coreCube.peripheral.write(_MotorCharacteristic.UUID, data);
  }
  async moveTo(x, y, direction = null, speed = 70, allowBackward = false) {
    if (!this.coreCube.state.isTouched) {
      return;
    }
    if (direction !== null) {
      direction = this.normalizeDirection(direction);
    }
    const currentX = this.coreCube.state.x || 0;
    const currentY = this.coreCube.state.y || 0;
    if (x < 0) {
      y = currentY + (y - currentY) * currentX / (currentX - x);
      x = 0;
    }
    if (y < 0) {
      x = currentX + (x - currentX) * currentY / (currentY - y);
      y = 0;
    }
    this.coreCube.virtualState.state = { x, y };
    this.coreCube.tasks.removeAll();
    return this.coreCube.tasks.create((index) => {
      const data = [
        3,
        index & 255,
        255,
        allowBackward ? 0 : 1,
        speed,
        0,
        0,
        x & 255,
        x >> 8,
        y & 255,
        y >> 8,
        direction !== null ? direction & 255 : 0,
        direction !== null ? direction >> 8 : 5 << 5
      ];
      this.coreCube.peripheral.write(_MotorCharacteristic.UUID, data);
    });
  }
  async pointInDirection(direction, speed = 70, turnDirection = _MotorCharacteristic.TurnDirection.NEAREST) {
    if (!this.coreCube.state.isTouched || this.coreCube.state.direction === void 0) {
      return;
    }
    const angle = this.normalizeDirection(this.coreCube.state.direction - direction);
    if (angle < _MotorCharacteristic.THRESHOLD_ANGLE || angle > 360 - _MotorCharacteristic.THRESHOLD_ANGLE) {
      return;
    }
    direction = this.normalizeDirection(direction);
    this.coreCube.virtualState.state = { direction };
    this.coreCube.tasks.removeAll();
    let wise;
    switch (turnDirection) {
      case _MotorCharacteristic.TurnDirection.NEAREST:
      default:
        wise = 0;
        break;
      case _MotorCharacteristic.TurnDirection.RIGHT:
        wise = 1;
        break;
      case _MotorCharacteristic.TurnDirection.LEFT:
        wise = 2;
        break;
    }
    return this.coreCube.tasks.create((index) => {
      const data = [
        3,
        index & 255,
        255,
        1,
        speed,
        0,
        0,
        255,
        255,
        255,
        255,
        direction & 255,
        (direction >> 8 & 31) + (wise << 5)
      ];
      this.coreCube.peripheral.write(_MotorCharacteristic.UUID, data);
    });
  }
  async stop() {
    this.cancelPromise();
    return this.doMove(0, 0);
  }
  normalizeDirection(direction) {
    if (direction < 0) {
      direction = 360 + direction % 360;
    } else if (direction > 360) {
      direction %= 360;
    }
    return direction;
  }
  startLoop(callback) {
    const tick = () => {
      if (!this.coreCube.isConnected()) {
        this.stopLoop();
        return;
      }
      if (this.cancelablePromise === void 0 || this.cancelablePromise.isCanceled) {
        return;
      }
      const isCompleted = callback();
      if (isCompleted) {
        setTimeout(() => this.stopLoop(), _MotorCharacteristic.WAIT_FOR_NEXT_COMMAND);
        return;
      }
      setTimeout(tick);
    };
    setTimeout(tick);
  }
  stopLoop() {
    this.cancelPromise();
    this.coreCube.tasks.removeAll();
  }
  isDetachedFromMat() {
    const { state } = this.coreCube;
    if (state.isTouched) {
      this.detachStartTime = null;
    } else {
      if (this.detachStartTime === null) {
        this.detachStartTime = Date.now();
      } else {
        const elapsedTime = Date.now() - this.detachStartTime;
        if (elapsedTime >= _MotorCharacteristic.DETACH_DURATION) {
          this.detachStartTime = null;
          return true;
        }
      }
    }
    return false;
  }
  isCloseToTargetPosition(x, y) {
    const deltaX = x - (this.coreCube.state.x || 0);
    const deltaY = y - (this.coreCube.state.y || 0);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance <= _MotorCharacteristic.DISTANCE_THRESHOLD;
  }
  isCloseToTargetDirection(direction) {
    let deltaAngle = direction - (this.coreCube.state.direction || 0);
    if (deltaAngle > 180) {
      deltaAngle -= 360;
    } else if (deltaAngle < -180) {
      deltaAngle += 360;
    }
    return Math.abs(deltaAngle) <= _MotorCharacteristic.DIRECTION_THRESHOLD;
  }
};
let MotorCharacteristic = _MotorCharacteristic;
__publicField2(MotorCharacteristic, "UUID", uuid("0102"));
__publicField2(MotorCharacteristic, "INFINITE_DURATION", 1e6);
__publicField2(MotorCharacteristic, "THRESHOLD_ANGLE", 5);
__publicField2(MotorCharacteristic, "WAIT_FOR_NEXT_COMMAND", 100);
__publicField2(MotorCharacteristic, "DETACH_DURATION", 100);
__publicField2(MotorCharacteristic, "DISTANCE_THRESHOLD", 15);
__publicField2(MotorCharacteristic, "DIRECTION_THRESHOLD", 8);
__publicField2(MotorCharacteristic, "MotorResult", {
  SUCCESS: 0,
  TIMEOUT: 1,
  ID_MISSED: 2,
  INVALID_PARAMS: 3,
  INVALID_STATUS: 4,
  OVERWRITE: 5,
  UNSUPPORTED: 6
});
__publicField2(MotorCharacteristic, "TurnDirection", {
  NEAREST: "NEAREST",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
});
const _MotorV200Characteristic = class extends MotorCharacteristic {
  constructor() {
    super(...arguments);
    __publicField2(this, "speedCounter", 0);
  }
  static async from(coreCube) {
    const instance = new _MotorV200Characteristic(coreCube);
    return instance;
  }
  async moveTo(x, y, _direction = null, speed = 70, allowBackward = false) {
    if (!this.coreCube.state.isTouched) {
      return;
    }
    if (!this.coreCube.state.x || !this.coreCube.state.y || !this.coreCube.state.direction) {
      return;
    }
    return this.generateCancelablePromise(() => {
      this.startLoop(() => {
        this.doMoveTo(x, y, speed, allowBackward);
        return this.isDetachedFromMat() || this.isCloseToTargetPosition(x, y);
      });
    });
  }
  doMoveTo(x, y, speed, allowBackward = false) {
    const deltaX = x - (this.coreCube.state.x || 0);
    const deltaY = y - (this.coreCube.state.y || 0);
    let deltaAngle = Math.atan2(deltaY, deltaX) - (this.coreCube.state.direction || 0) * _MotorV200Characteristic.DEGREE_TO_RADIAN;
    while (deltaAngle < -Math.PI) {
      deltaAngle += _MotorV200Characteristic.TWICE_PI;
    }
    while (deltaAngle > Math.PI) {
      deltaAngle -= _MotorV200Characteristic.TWICE_PI;
    }
    const isBackward = allowBackward && Math.abs(deltaAngle) > _MotorV200Characteristic.HALF_PI;
    if (isBackward) {
      deltaAngle = deltaAngle + Math.PI;
      while (deltaAngle < -Math.PI) {
        deltaAngle += _MotorV200Characteristic.TWICE_PI;
      }
      while (deltaAngle > Math.PI) {
        deltaAngle -= _MotorV200Characteristic.TWICE_PI;
      }
    }
    let leftSpeed = speed;
    let rightSpeed = speed;
    if (deltaAngle >= 0) {
      rightSpeed *= (_MotorV200Characteristic.HALF_PI - deltaAngle) / _MotorV200Characteristic.HALF_PI;
    } else {
      leftSpeed *= (_MotorV200Characteristic.HALF_PI + deltaAngle) / _MotorV200Characteristic.HALF_PI;
    }
    if (!isBackward) {
      this.doMove(leftSpeed, rightSpeed);
    } else {
      this.doMove(-rightSpeed, -leftSpeed);
    }
  }
  async pointInDirection(direction, speed = 70, _turnDirection = MotorCharacteristic.TurnDirection.NEAREST) {
    if (!this.coreCube.state.isTouched) {
      return;
    }
    if (!this.coreCube.state.direction) {
      return;
    }
    this.speedCounter = 0;
    return this.generateCancelablePromise(() => {
      this.startLoop(() => {
        const outSpeed = this.doPointInDirection(direction, speed);
        if (Math.abs(outSpeed) <= _MotorV200Characteristic.MINIMUM_SPEED) {
          this.speedCounter++;
        }
        const isTimeout = this.speedCounter > 5;
        return isTimeout || this.isDetachedFromMat() || this.isCloseToTargetDirection(direction);
      });
    });
  }
  doPointInDirection(direction, speed) {
    let deltaAngle = (direction - (this.coreCube.state.direction || 0)) * _MotorV200Characteristic.DEGREE_TO_RADIAN;
    if (deltaAngle < -Math.PI) {
      deltaAngle += _MotorV200Characteristic.TWICE_PI;
    }
    if (deltaAngle > Math.PI) {
      deltaAngle -= _MotorV200Characteristic.TWICE_PI;
    }
    let outSpeed;
    if (Math.abs(deltaAngle) < _MotorV200Characteristic.HALF_PI) {
      outSpeed = speed * Math.sin(deltaAngle);
    } else {
      outSpeed = deltaAngle >= 0 ? speed : -speed;
    }
    this.doMove(outSpeed, -outSpeed);
    return outSpeed;
  }
};
let MotorV200Characteristic = _MotorV200Characteristic;
__publicField2(MotorV200Characteristic, "MINIMUM_SPEED", 11);
__publicField2(MotorV200Characteristic, "HALF_PI", Math.PI / 2);
__publicField2(MotorV200Characteristic, "TWICE_PI", Math.PI * 2);
__publicField2(MotorV200Characteristic, "DEGREE_TO_RADIAN", Math.PI / 180);
class MotorV220Characteristic extends MotorCharacteristic {
  static async from(coreCube) {
    const instance = new MotorV220Characteristic(coreCube);
    return instance;
  }
  async moveTo(x, y, direction = null, speed = 70, allowBackward = false) {
    if (!this.coreCube.state.isTouched) {
      return;
    }
    if (direction !== null) {
      direction = this.normalizeDirection(direction);
    }
    const currentX = this.coreCube.state.x || 0;
    const currentY = this.coreCube.state.y || 0;
    if (x < 0) {
      y = currentY + (y - currentY) * currentX / (currentX - x);
      x = 0;
    }
    if (y < 0) {
      x = currentX + (x - currentX) * currentY / (currentY - y);
      y = 0;
    }
    this.coreCube.virtualState.state = { x, y };
    const index = 1;
    const data = [
      3,
      index & 255,
      255,
      allowBackward ? 0 : 1,
      speed,
      0,
      0,
      x & 255,
      x >> 8,
      y & 255,
      y >> 8,
      direction !== null ? direction & 255 : 0,
      direction !== null ? direction >> 8 : 5 << 5
    ];
    this.coreCube.peripheral.write(MotorCharacteristic.UUID, data);
    return this.generateCancelablePromise(() => {
      this.startLoop(() => {
        if (this.coreCube.state.motorResult === MotorCharacteristic.MotorResult.ID_MISSED) {
          this.coreCube.state.motorResult = MotorCharacteristic.MotorResult.SUCCESS;
          this.coreCube.peripheral.write(MotorCharacteristic.UUID, data);
        }
        return this.isDetachedFromMat() || this.isCloseToTargetPosition(x, y);
      });
    });
  }
  async pointInDirection(direction, speed = 70, turnDirection = MotorCharacteristic.TurnDirection.NEAREST) {
    if (!this.coreCube.state.isTouched || this.coreCube.state.direction === void 0) {
      return;
    }
    const angle = this.normalizeDirection(this.coreCube.state.direction - direction);
    if (angle < MotorCharacteristic.THRESHOLD_ANGLE || angle > 360 - MotorCharacteristic.THRESHOLD_ANGLE) {
      return;
    }
    direction = this.normalizeDirection(direction);
    this.coreCube.virtualState.state = { direction };
    let wise;
    switch (turnDirection) {
      case MotorCharacteristic.TurnDirection.NEAREST:
      default:
        wise = 0;
        break;
      case MotorCharacteristic.TurnDirection.RIGHT:
        wise = 1;
        break;
      case MotorCharacteristic.TurnDirection.LEFT:
        wise = 2;
        break;
    }
    const index = 1;
    const data = [
      3,
      index & 255,
      255,
      1,
      speed,
      0,
      0,
      255,
      255,
      255,
      255,
      direction & 255,
      (direction >> 8 & 31) + (wise << 5)
    ];
    this.coreCube.peripheral.write(MotorCharacteristic.UUID, data);
    return this.generateCancelablePromise(() => {
      this.startLoop(() => {
        if (this.coreCube.state.motorResult === MotorCharacteristic.MotorResult.ID_MISSED) {
          this.coreCube.state.motorResult = MotorCharacteristic.MotorResult.SUCCESS;
          this.coreCube.peripheral.write(MotorCharacteristic.UUID, data);
        }
        return this.isDetachedFromMat() || this.isCloseToTargetDirection(direction);
      });
    });
  }
}
const _LightCharacteristic = class extends CharacteristicBase {
  static async from(coreCube) {
    const instance = new _LightCharacteristic(coreCube);
    return instance;
  }
  async turnOn(red, green, blue, durationMs = 0) {
    const data = [3, 0, 1, 1, red, green, blue];
    this.coreCube.peripheral.write(_LightCharacteristic.UUID, data, true);
    return this.generateCancelablePromise(null, () => this.coreCube.light.turnOff(), durationMs);
  }
  async turnOff() {
    this.cancelPromise();
    return this.coreCube.peripheral.write(_LightCharacteristic.UUID, [1], true);
  }
};
let LightCharacteristic = _LightCharacteristic;
__publicField2(LightCharacteristic, "UUID", uuid("0103"));
const _SoundCharacteristic = class extends CharacteristicBase {
  static async from(coreCube) {
    const instance = new _SoundCharacteristic(coreCube);
    return instance;
  }
  async play(notes, loudness, durationMs = 100) {
    if (!Array.isArray(notes)) {
      notes = [notes];
    }
    const data = [3, 0, notes.length];
    for (let i = 0; i < notes.length; i++) {
      const delta = i === notes.length - 1 ? 10 : 0;
      data.push(durationMs / 10 + delta);
      data.push(notes[i]);
      data.push(loudness);
    }
    this.coreCube.peripheral.write(_SoundCharacteristic.UUID, data, true);
    return this.generateCancelablePromise(null, () => this.coreCube.sound.stop(), durationMs);
  }
  async playPreset(id) {
    this.cancelPromise();
    const data = [2, id, 255];
    return this.coreCube.peripheral.write(_SoundCharacteristic.UUID, data, true);
  }
  async stop() {
    this.cancelPromise();
    return this.coreCube.peripheral.write(_SoundCharacteristic.UUID, [1], true);
  }
};
let SoundCharacteristic = _SoundCharacteristic;
__publicField2(SoundCharacteristic, "UUID", uuid("0104"));
const ProtocolVersions = {
  LATEST: { major: 2, minor: 3, patch: 0 },
  SERIALIZED: { major: 2, minor: 3, patch: 0 },
  INTELLIGENT: { major: 2, minor: 1, patch: 0 }
};
const _ConfigCharacteristic = class extends CharacteristicBase {
  constructor(coreCube, versionDetectedListener) {
    super(coreCube);
    __publicField2(this, "isPreviousCommandCompleted", false);
    __publicField2(this, "delayForIdMissed", 70);
    __publicField2(this, "protocolVersion");
    __publicField2(this, "versionDetectedListener");
    __publicField2(this, "isNotificationActive", false);
    __publicField2(this, "handleNotification", (event) => {
      if (!this.isNotificationActive) {
        return;
      }
      const data = event.target.value;
      switch (data.getUint8(0)) {
        case 129:
          this.protocolVersion = {
            major: data.getUint8(2) - 48,
            minor: data.getUint8(4) - 48,
            patch: data.getUint8(6) - 48
          };
          if (this.versionDetectedListener) {
            this.versionDetectedListener(this.protocolVersion);
          }
          break;
        case 240:
          const { state } = this.coreCube;
          this.getId(data);
          state.buttonPressed = (data.getUint8(1) & 16) !== 0;
          state.motorFeedbackLeft = data.getUint8(10);
          state.motorFeedbackRight = data.getUint8(11);
          state.roll = data.getUint8(15) * ((data.getUint8(18) & 1) === 0 ? 1 : -1);
          state.pitch = data.getUint8(16) * ((data.getUint8(18) & 2) === 0 ? 1 : -1);
          state.yaw = data.getUint8(17) * ((data.getUint8(18) & 4) === 0 ? 1 : -1);
          state.postureValue = data.getUint8(12) >> 5 & 7;
          state.magnetState = data.getUint8(18) >> 5;
          state.magnetId = data.getUint8(18) >> 5;
          state.magnetLevel = data.getUint8(19);
          state.batteryLevel = data.getUint8(13) & 127;
          state.collisionDetected = (data.getUint8(14) >> 5 & 1) !== 0;
          state.motorResult = data.getUint8(12) & 31;
          this.handleCommandCompleted(data.getUint8(12) & 31);
      }
    });
    this.versionDetectedListener = versionDetectedListener;
  }
  static async from(coreCube, versionDetectedListener) {
    return new Promise(async (resolve) => {
      const instance = new _ConfigCharacteristic(coreCube, versionDetectedListener);
      await instance.coreCube.peripheral.write(_ConfigCharacteristic.UUID, [48, 19, 15, 0, 15, 0], true);
      await instance.coreCube.peripheral.write(
        _ConfigCharacteristic.UUID,
        [30, 0, _ConfigCharacteristic.NOTIFICATION_INTERVAL_MS / 10, 1],
        true
      );
      await instance.coreCube.peripheral.write(_ConfigCharacteristic.UUID, [27, 1, 1], true);
      await instance.coreCube.peripheral.startNotifications(_ConfigCharacteristic.UUID, instance.handleNotification);
      instance.isNotificationActive = true;
      await instance.coreCube.peripheral.write(_ConfigCharacteristic.UUID, [1, 2], true);
      resolve(instance);
    });
  }
  stopNotifications() {
    this.isNotificationActive = false;
  }
  getId(data) {
    const { state } = this.coreCube;
    const type = (data.getUint8(1) & 96) >> 5;
    switch (type) {
      case 1:
        state.isTouched = true;
        state.direction = data.getUint8(1) >> 7 | data.getUint8(2) << 1;
        state.standardId = data.getUint8(6) >> 4 | data.getUint8(7) << 4 | data.getUint8(8) << 12 | data.getUint8(9) << 20;
        break;
      case 2:
        state.isTouched = true;
        state.x = data.getUint8(3) | (data.getUint8(4) & 63) << 8;
        state.y = data.getUint8(4) >> 6 | data.getUint8(5) << 2 | (data.getUint8(6) & 15) << 10;
        state.direction = data.getUint8(1) >> 7 | data.getUint8(2) << 1;
        state.standardId = void 0;
        break;
      default:
        state.isTouched = false;
        state.standardId = void 0;
        break;
    }
    if (!state.isTouched) {
      this.coreCube.virtualState.reset();
    }
  }
  handleCommandCompleted(value) {
    const isCommandCompleted = value !== _ConfigCharacteristic.COMMAND_RUNNING;
    if (!this.isPreviousCommandCompleted && isCommandCompleted) {
      this.coreCube.tasks.removeAll();
    }
    this.isPreviousCommandCompleted = isCommandCompleted;
  }
  setDelayForIdMissed(delayMs = _ConfigCharacteristic.DEFAULT_DELAY_FOR_ID_MISSED) {
    if (this.delayForIdMissed === delayMs) {
      return;
    }
    this.delayForIdMissed = delayMs;
    const data = [25, 0, delayMs / 10];
    return this.coreCube.peripheral.write(_ConfigCharacteristic.UUID, data, true);
  }
  isUpdateAvailable() {
    if (!this.protocolVersion) {
      console.info("Protocol version is not ready");
      return false;
    }
    return this.compareVersions(this.protocolVersion, ProtocolVersions.LATEST) === -1;
  }
  compareVersions(version1, version2) {
    const value1 = version1.major * 1e4 + version1.minor * 100 + version1.patch;
    const value2 = version2.major * 1e4 + version2.minor * 100 + version2.patch;
    if (value1 > value2) {
      return 1;
    } else if (value1 < value2) {
      return -1;
    } else {
      return 0;
    }
  }
};
let ConfigCharacteristic = _ConfigCharacteristic;
__publicField2(ConfigCharacteristic, "UUID", uuid("01ff"));
__publicField2(ConfigCharacteristic, "COMMAND_RUNNING", 31);
__publicField2(ConfigCharacteristic, "NOTIFICATION_INTERVAL_MS", 30);
__publicField2(ConfigCharacteristic, "DEFAULT_DELAY_FOR_ID_MISSED", 70);
function uuid(id) {
  return `10b2${id}-5b3b-4571-9508-cf3efcd7bbae`;
}
const _CoreCube = class extends EventTarget$1 {
  constructor(peripheral) {
    super();
    __publicField2(this, "peripheral");
    __publicField2(this, "id");
    __publicField2(this, "motor");
    __publicField2(this, "light");
    __publicField2(this, "sound");
    __publicField2(this, "config");
    __publicField2(this, "tasks", new Tasks());
    __publicField2(this, "state", {});
    __publicField2(this, "virtualState", new VirtualState(this));
    __publicField2(this, "connectionState", "NotConnected");
    __publicField2(this, "onConnected", async () => {
      var _a;
      this.state = {};
      this.motor = await MotorCharacteristic.from(this);
      this.light = await LightCharacteristic.from(this);
      this.sound = await SoundCharacteristic.from(this);
      this.config = await ConfigCharacteristic.from(this, async (protocolVersion) => {
        let idClass;
        let motorClass;
        motorClass = MotorV220Characteristic;
        if (this.config.compareVersions(protocolVersion, ProtocolVersions.SERIALIZED) === -1) {
          idClass = IdCharacteristic;
          motorClass = MotorV220Characteristic;
          this.config.stopNotifications();
        }
        if (this.config.compareVersions(protocolVersion, ProtocolVersions.INTELLIGENT) === -1) {
          motorClass = MotorV200Characteristic;
        }
        if (idClass) {
          this.id = await idClass.from(this);
        }
        if (motorClass) {
          this.motor = await motorClass.from(this);
        }
        this.dispatchEvent(new CustomEvent("versiondetected", { detail: { protocolVersion } }));
      });
      this.peripheral.addEventListener("disconnected", this.onDisconnected);
      this.peripheral.addEventListener("connectionlost", this.onConnectionLost);
      (_a = this.peripheral.watchdog) == null ? void 0 : _a.start(
        () => this.peripheral.write(ConfigCharacteristic.UUID, [5, 0, 10], true),
        null,
        _CoreCube.BLE_WATCHDOG_TIMEOUT
      );
      this.dispatchEvent(new Event("connected"));
      this.connectionState = "Connected";
    });
    __publicField2(this, "onDisconnected", () => {
      this.disconnect();
      this.dispatchEvent(new Event("disconnected"));
    });
    __publicField2(this, "onConnectionLost", () => {
      this.disconnect();
      this.dispatchEvent(new Event("connectionlost"));
    });
    this.peripheral = peripheral;
  }
  static async discover(bluetooth) {
    const peripheral = await bluetooth.discover(_CoreCube.SERVICE_UUID);
    if (!peripheral) {
      console.info("No bluetooth devices");
      return;
    }
    return new _CoreCube(peripheral);
  }
  async connect(id = "") {
    this.connectionState = "Connecting";
    this.peripheral.addEventListener("connected", this.onConnected);
    await this.peripheral.connect(id);
  }
  disconnect() {
    if (this.isConnected()) {
      this.peripheral.disconnect();
    }
    if (this.connectionState === "Connecting") {
      setTimeout(() => {
        this.peripheral.disconnect();
      }, 500);
    }
    this.peripheral.removeEventListener("connected", this.onConnected);
    this.peripheral.removeEventListener("disconnected", this.onDisconnected);
    this.peripheral.removeEventListener("connectionlost", this.onConnectionLost);
    this.connectionState = "NotConnected";
  }
  isConnected() {
    return this.peripheral.isConnected();
  }
  getPeripheralName() {
    if (!this.peripheral.isConnected()) {
      return;
    }
    return this.peripheral.getName();
  }
  stop() {
    if (!this.peripheral.isConnected()) {
      return;
    }
    if (!this.motor) {
      return;
    }
    this.motor.stop();
    this.light.turnOff();
    this.sound.stop();
  }
  isUpdateAvailable() {
    return this.config.isUpdateAvailable();
  }
  async sleep(durationMs) {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  }
};
let CoreCube = _CoreCube;
__publicField2(CoreCube, "SERVICE_UUID", uuid("0100"));
__publicField2(CoreCube, "BLE_WATCHDOG_TIMEOUT", 2e3);
__publicField2(CoreCube, "MAXIMUM_SPEED", 255);
__publicField2(CoreCube, "MINIMUM_SPEED", 10);
const _Mat = class {
  static convertFromMatCoordinate(matX, matY) {
    const matColumn = Math.floor(matX / this.Region.X.BOUNDARY);
    const matRow = 0;
    const xRange = this.Region.X.Range[matColumn];
    const yRange = this.Region.Y.Range[matRow];
    return {
      x: this.convertFromMatCoordinateRange(matX, xRange.MIN, xRange.MAX),
      y: -this.convertFromMatCoordinateRange(matY, yRange.MIN, yRange.MAX),
      matColumn,
      matRow
    };
  }
  static convertFromMatCoordinateRange(value, min, max) {
    return ((value - min) / (max - min) * 2 - 1) * _Mat.COORDINATE_RANGE;
  }
  static convertDirection(direction) {
    const d = direction - 270;
    return d + (d <= -180 ? 360 : 0);
  }
  static checkIfOnColoredMat(state) {
    if (!state.x || !state.y) {
      return false;
    }
    return state.x >= _Mat.Region.X.BOUNDARY && state.y < _Mat.Region.Y.BOUNDARY;
  }
  static checkIfMatchColor(state, type) {
    if (!this.checkIfOnMat(state)) {
      return false;
    }
    if (!_Mat.checkIfInMat(state)) {
      return false;
    }
    const column = this.convertXToColumn(state.x || 0);
    const row = this.convertYToRow(state.y || 0);
    const colorCode = _Mat.COLOR_CODES_ON_MAT_GRID[4 - row][column + 4];
    const color2 = _Mat.COLORS[colorCode];
    return type.indexOf(color2) !== -1;
  }
  static convertColumnToX(column) {
    return column / _Mat.Grid.COLUMNS * _Mat.COORDINATE_RANGE * 2;
  }
  static convertRowToY(row) {
    return row / _Mat.Grid.ROWS * _Mat.COORDINATE_RANGE * 2;
  }
  static checkIfOnMat(state) {
    return state.isTouched === true && state.standardId === void 0;
  }
  static checkIfInMat(state) {
    const position = this.normalizePosition(state.x, state.y);
    return position.x >= 0 && position.x <= 1 && position.y >= 0 && position.y <= 1;
  }
  static getMatColor(state) {
    if (state.x === void 0 || state.y === void 0) {
      return;
    }
    if (!this.checkIfInMat(state)) {
      return;
    }
    const { column, row } = this.getColumnAndRow(state.x, state.y);
    const colorCode = _Mat.COLOR_CODES_ON_MAT_GRID[row][column];
    return _Mat.COLORS[colorCode];
  }
  static convertXToColumn(x) {
    if (x === void 0) {
      return 0;
    }
    const position = this.normalizePosition(x, 0);
    return Math.min(Math.max(Math.floor(position.x * this.Grid.COLUMNS), 0), this.Grid.COLUMNS - 1) - 4;
  }
  static convertYToRow(y) {
    if (y === void 0) {
      return 0;
    }
    const position = this.normalizePosition(0, y);
    return 4 - Math.min(Math.max(Math.floor(position.y * this.Grid.ROWS), 0), this.Grid.ROWS - 1);
  }
  static getColumnAndRow(x, y) {
    const position = this.normalizePosition(x, y);
    return {
      column: Math.min(Math.max(Math.floor(position.x * this.Grid.COLUMNS), 0), this.Grid.COLUMNS - 1),
      row: Math.min(Math.max(Math.floor(position.y * this.Grid.ROWS), 0), this.Grid.ROWS - 1)
    };
  }
  static normalizePosition(x, y) {
    x = x || 0;
    y = y || 0;
    const matColumn = Math.floor(x / this.Region.X.BOUNDARY);
    const matRow = Math.floor(y / this.Region.Y.BOUNDARY);
    const xRange = this.Region.X.Range[matColumn];
    const yRange = this.Region.Y.Range[matRow];
    return {
      x: this.normalizeValue(x, xRange.MIN, xRange.MAX),
      y: this.normalizeValue(y, yRange.MIN, yRange.MAX)
    };
  }
  static normalizeValue(value, min, max) {
    return (value - min) / (max - min);
  }
  static convertToMatCoordinate(state, normalizedX, normalizedY) {
    if (state.x === void 0 || state.y === void 0) {
      return [0, 0];
    }
    const matColumn = Math.floor(state.x / this.Region.X.BOUNDARY);
    const matRow = Math.floor(state.y / this.Region.Y.BOUNDARY);
    const xRange = this.Region.X.Range[matColumn];
    const yRange = this.Region.Y.Range[matRow];
    return [(xRange.MAX - xRange.MIN) * normalizedX + xRange.MIN, (yRange.MAX - yRange.MIN) * normalizedY + yRange.MIN];
  }
  static getGridIndices() {
    const indices = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];
    return { columnIndices: indices, rowIndices: indices };
  }
};
let Mat = _Mat;
__publicField2(Mat, "Region", {
  X: {
    BOUNDARY: 500,
    Range: [
      {
        MIN: 52,
        MAX: 445
      },
      {
        MIN: 554,
        MAX: 947
      },
      {
        MIN: 1063,
        MAX: 1446
      }
    ]
  },
  Y: {
    BOUNDARY: 500,
    Range: [
      {
        MIN: 52,
        MAX: 445
      },
      {
        MIN: 569,
        MAX: 953
      }
    ]
  }
});
__publicField2(Mat, "COORDINATE_RANGE", 180);
__publicField2(Mat, "FROM_SCRATCH_TO_TOIO_COORDINATE", 410 / 360);
__publicField2(Mat, "Grid", {
  Border: {
    LEFT: 555,
    RIGHT: 947,
    TOP: 53,
    BOTTOM: 446
  },
  COLUMNS: 9,
  ROWS: 9
});
__publicField2(Mat, "COLOR_CODES_ON_MAT_GRID", [
  "wbwywrwrw",
  "gwrwbwbwy",
  "wywywgwgw",
  "bwgwrwbwr",
  "wrwywgwgw",
  "ywbwbwywr",
  "wgwrwgwbw",
  "bwywbwrwy",
  "wrwgwywgw"
]);
__publicField2(Mat, "COLORS", {
  w: "white",
  b: "blue",
  g: "green",
  y: "yellow",
  r: "red"
});
const _Card = class {
  static initialize() {
    _Card.IDS.forEach((item) => {
      if (item.value) {
        _Card.ids[item.value] = item;
      }
    });
  }
  static get menus() {
    return _Card.IDS.map((item) => item.key || item.label);
  }
  static getId(state) {
    if (!this.isInitialized) {
      this.initialize();
      this.isInitialized = true;
    }
    if (!state.standardId) {
      return;
    }
    const id = this.ids[state.standardId];
    return id;
  }
};
let Card = _Card;
__publicField2(Card, "IDS", [
  {
    label: "front card",
    key: "frontCard",
    value: 3670026,
    group: "toio Collection card"
  },
  {
    label: "back card",
    key: "backCard",
    value: 3670064,
    group: "toio Collection card"
  },
  {
    label: "left card",
    key: "leftCard",
    value: 3670024,
    group: "toio Collection card"
  },
  {
    label: "right card",
    key: "rightCard",
    value: 3670062,
    group: "toio Collection card"
  },
  {
    label: "go card",
    key: "goCard",
    value: 3670028,
    group: "toio Collection card"
  },
  {
    label: "typhoon card",
    key: "typhoonCard",
    value: 3670016,
    group: "toio Collection card"
  },
  {
    label: "rush card",
    key: "rushCard",
    value: 3670054,
    group: "toio Collection card"
  },
  {
    label: "auto tackle card",
    key: "autoTackleCard",
    value: 3670018,
    group: "toio Collection card"
  },
  {
    label: "random card",
    key: "randomCard",
    value: 3670056,
    group: "toio Collection card"
  },
  {
    label: "push power up card",
    key: "pushPowerUpCard",
    value: 3670020,
    group: "toio Collection card"
  },
  {
    label: "strut power up card",
    key: "strutPowerUpCard",
    value: 3670058,
    group: "toio Collection card"
  },
  {
    label: "side attack card",
    key: "sideAttackCard",
    value: 3670022,
    group: "toio Collection card"
  },
  {
    label: "easy mode card",
    key: "easyModeCard",
    value: 3670060,
    group: "toio Collection card"
  },
  {
    label: "any card",
    key: "anyCard"
  },
  {
    label: "spin sticker",
    key: "spinSticker",
    value: 3670070,
    group: "toio Collection sticker"
  },
  {
    label: "shock sticker",
    key: "shockSticker",
    value: 3670034,
    group: "toio Collection sticker"
  },
  {
    label: "wobble sticker",
    key: "wobbleSticker",
    value: 3670068,
    group: "toio Collection sticker"
  },
  {
    label: "panic sticker",
    key: "panicSticker",
    value: 3670032,
    group: "toio Collection sticker"
  },
  {
    label: "speed up sticker",
    key: "speedUpSticker",
    value: 3670066,
    group: "toio Collection sticker"
  },
  {
    label: "speed down sticker",
    key: "speedDownSticker",
    value: 3670030,
    group: "toio Collection sticker"
  },
  {
    label: "any sticker",
    key: "anySticker"
  }
]);
__publicField2(Card, "isInitialized", false);
__publicField2(Card, "ids", {});
const _SimpleCard = class {
  static initialize() {
    _SimpleCard.IDS.forEach((item) => {
      if (item.value) {
        _SimpleCard.ids[item.value] = item;
      }
    });
  }
  static get menus() {
    return _SimpleCard.IDS.map((item) => item.key || item.label);
  }
  static getId(state) {
    if (!this.isInitialized) {
      this.initialize();
      this.isInitialized = true;
    }
    if (!state.standardId) {
      return;
    }
    const id = _SimpleCard.ids[state.standardId];
    return id;
  }
};
let SimpleCard = _SimpleCard;
__publicField2(SimpleCard, "IDS", [
  {
    label: "0",
    value: 3670320,
    group: "number"
  },
  {
    label: "1",
    value: 3670321,
    group: "number"
  },
  {
    label: "2",
    value: 3670322,
    group: "number"
  },
  {
    label: "3",
    value: 3670323,
    group: "number"
  },
  {
    label: "4",
    value: 3670324,
    group: "number"
  },
  {
    label: "5",
    value: 3670325,
    group: "number"
  },
  {
    label: "6",
    value: 3670326,
    group: "number"
  },
  {
    label: "7",
    value: 3670327,
    group: "number"
  },
  {
    label: "8",
    value: 3670328,
    group: "number"
  },
  {
    label: "9",
    value: 3670329,
    group: "number"
  },
  {
    label: "any number",
    key: "anyNumber"
  },
  {
    label: "A",
    value: 3670337,
    group: "alphabet"
  },
  {
    label: "B",
    value: 3670338,
    group: "alphabet"
  },
  {
    label: "C",
    value: 3670339,
    group: "alphabet"
  },
  {
    label: "D",
    value: 3670340,
    group: "alphabet"
  },
  {
    label: "E",
    value: 3670341,
    group: "alphabet"
  },
  {
    label: "F",
    value: 3670342,
    group: "alphabet"
  },
  {
    label: "G",
    value: 3670343,
    group: "alphabet"
  },
  {
    label: "H",
    value: 3670344,
    group: "alphabet"
  },
  {
    label: "I",
    value: 3670345,
    group: "alphabet"
  },
  {
    label: "J",
    value: 3670346,
    group: "alphabet"
  },
  {
    label: "K",
    value: 3670347,
    group: "alphabet"
  },
  {
    label: "L",
    value: 3670348,
    group: "alphabet"
  },
  {
    label: "M",
    value: 3670349,
    group: "alphabet"
  },
  {
    label: "N",
    value: 3670350,
    group: "alphabet"
  },
  {
    label: "O",
    value: 3670351,
    group: "alphabet"
  },
  {
    label: "P",
    value: 3670352,
    group: "alphabet"
  },
  {
    label: "Q",
    value: 3670353,
    group: "alphabet"
  },
  {
    label: "R",
    value: 3670354,
    group: "alphabet"
  },
  {
    label: "S",
    value: 3670355,
    group: "alphabet"
  },
  {
    label: "T",
    value: 3670356,
    group: "alphabet"
  },
  {
    label: "U",
    value: 3670357,
    group: "alphabet"
  },
  {
    label: "V",
    value: 3670358,
    group: "alphabet"
  },
  {
    label: "W",
    value: 3670359,
    group: "alphabet"
  },
  {
    label: "X",
    value: 3670360,
    group: "alphabet"
  },
  {
    label: "Y",
    value: 3670361,
    group: "alphabet"
  },
  {
    label: "Z",
    value: 3670362,
    group: "alphabet"
  },
  {
    label: "any alphabet",
    key: "anyAlphabet"
  },
  {
    label: "!",
    value: 3670305,
    group: "symbol"
  },
  {
    label: "?",
    value: 3670335,
    group: "symbol"
  },
  {
    label: "+",
    value: 3670315,
    group: "symbol"
  },
  {
    label: "-",
    value: 3670317,
    group: "symbol"
  },
  {
    label: "*",
    value: 3670314,
    group: "symbol"
  },
  {
    label: "/",
    value: 3670319,
    group: "symbol"
  },
  {
    label: "=",
    value: 3670333,
    group: "symbol"
  },
  {
    label: "%",
    value: 3670309,
    group: "symbol"
  },
  {
    label: "\u2191",
    value: 3670366,
    group: "symbol"
  },
  {
    label: "\u2193",
    value: 3670367,
    group: "symbol"
  },
  {
    label: "\u2190",
    value: 3670332,
    group: "symbol"
  },
  {
    label: "\u2192",
    value: 3670334,
    group: "symbol"
  },
  {
    label: "any symbol",
    key: "anySymbol"
  },
  {
    label: "any simple card",
    key: "anySimpleCard"
  }
]);
__publicField2(SimpleCard, "isInitialized", false);
__publicField2(SimpleCard, "ids", {});
var __defProp22 = Object.defineProperty;
var __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField22 = (obj, key, value) => {
  __defNormalProp22(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Bluetooth {
  constructor() {
    __publicField22(this, "connectionType");
  }
  async discover(_serviceUuid) {
    return;
  }
}
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
class EventTarget {
  constructor() {
    __publicField22(this, "eventListeners", {});
  }
  addEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener);
  }
  removeEventListener(type, listener) {
    if (!this.eventListeners[type]) {
      return;
    }
    this.eventListeners[type] = this.eventListeners[type].filter(
      (eventListener) => eventListener !== listener
    );
  }
  dispatchEvent(event) {
    if (!this.eventListeners[event.type]) {
      return true;
    }
    for (const eventListener of this.eventListeners[event.type]) {
      eventListener(event);
    }
    return true;
  }
}
class Peripheral extends EventTarget {
  constructor() {
    super(...arguments);
    __publicField22(this, "id");
    __publicField22(this, "name");
    __publicField22(this, "rssi");
    __publicField22(this, "watchdog");
  }
  async connect(_options = {}) {
  }
  disconnect() {
  }
  isConnected() {
    return false;
  }
  getId() {
    return this.id || "";
  }
  getName() {
    return this.name || "";
  }
  getRssi() {
    return this.rssi || -50;
  }
  async read(_characteristicUuid) {
  }
  async write(_characteristicUuid, _value, _withResponse = false) {
  }
  async startNotifications(_characteristicUuid, _listener) {
  }
}
class ScratchLinkPeripheral extends Peripheral {
  constructor(rpc, device) {
    super();
    __publicField22(this, "rpc");
    __publicField22(this, "id");
    __publicField22(this, "name");
    __publicField22(this, "listeners", []);
    this.rpc = rpc;
    this.id = device.id;
    this.name = device.name;
  }
  async connect() {
    this.rpc.send("connect", { peripheralId: this.id });
  }
  async write(characteristicUuid, value, withResponse = false) {
    this.rpc.send("write", {
      serviceId: "10b20100-5b3b-4571-9508-cf3efcd7bbae",
      characteristicId: characteristicUuid,
      message: base64Js.fromByteArray(Uint8Array.from(value)),
      encoding: "base64",
      withoutResponse: !withResponse
    });
  }
  async startNotifications(characteristicUuid, listener) {
    this.listeners.push(listener);
    this.rpc.send("startNotifications", {
      serviceId: "10b20100-5b3b-4571-9508-cf3efcd7bbae",
      characteristicId: characteristicUuid
    });
    this.rpc.setMessageHandler("characteristicDidChange", (event) => {
      const data = base64Js.toByteArray(event.params.message);
      const event2 = {
        target: {
          value: new DataView(data.buffer)
        }
      };
      for (const listener2 of this.listeners) {
        listener2(event2);
      }
    });
  }
}
class JsonRpc {
  constructor() {
    __publicField22(this, "webSocket");
    __publicField22(this, "handlers", {});
  }
  static async getAvailability(url) {
    return new Promise((resolve) => {
      const webSocket = new WebSocket(url);
      webSocket.onopen = () => {
        resolve(true);
      };
      webSocket.onerror = () => {
        resolve(false);
      };
    });
  }
  async open(url) {
    return new Promise((resolve) => {
      this.webSocket = new WebSocket(url);
      this.webSocket.onmessage = this.handleMessage.bind(this);
      this.webSocket.onopen = () => resolve();
    });
  }
  close() {
    if (!this.webSocket) {
      return;
    }
    this.webSocket.close();
    delete this.webSocket;
  }
  setMessageHandler(event, handler) {
    this.handlers[event] = handler;
  }
  removeMessageHandler(event) {
    if (this.handlers[event]) {
      delete this.handlers[event];
    }
  }
  send(method, params) {
    if (!this.webSocket) {
      return;
    }
    const message = {
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    };
    this.webSocket.send(JSON.stringify(message));
  }
  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.jsonrpc !== "2.0") {
      return;
    }
    const handler = this.handlers[message.method];
    if (handler) {
      handler(message);
    }
  }
}
const BluetoothConnectionType = {
  AUTO: "AUTO",
  WEB_BLUETOOTH: "WEB_BLUETOOTH",
  SCRATCH_LINK: "SCRATCH_LINK",
  SCRATCH_VM: "SCRATCH_VM"
};
const isRunningOnReactNative$1 = () => window.hasOwnProperty("ReactNativeWebView");
const _ScratchLinkBluetooth = class extends Bluetooth {
  constructor() {
    super(...arguments);
    __publicField22(this, "connectionType", BluetoothConnectionType.SCRATCH_LINK);
    __publicField22(this, "isScanning", false);
    __publicField22(this, "timeout");
    __publicField22(this, "foundDevices", {});
    __publicField22(this, "handleMessage", (message) => {
      const device = {
        id: message.params.peripheralId,
        name: message.params.name || void 0,
        rssi: message.params.rssi || void 0
      };
      this.foundDevices[device.id] = device;
    });
  }
  static async isAvailable() {
    var _a;
    if (document.getElementById("scratch-link-extension-script") && ((_a = window.Scratch) == null ? void 0 : _a.ScratchLinkSafariSocket)) {
      return Promise.resolve(true);
    }
    return new Promise(async (resolve) => {
      if (isRunningOnReactNative$1()) {
        resolve(true);
        return;
      }
      await Promise.any([
        this.isWebSocketAvailable(_ScratchLinkBluetooth.SCRATCH_LINK_DEFAULT_URL),
        this.isWebSocketAvailable(_ScratchLinkBluetooth.SCRATCH_LINK_OLD_URL)
      ]).catch(() => {
        resolve(false);
      });
      resolve(true);
    });
  }
  static async isWebSocketAvailable(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        ws.close();
        resolve(url);
      };
      ws.onerror = () => {
        reject();
      };
    });
  }
  async discover(serviceUuid) {
    const rpc = new JsonRpc();
    await rpc.open(_ScratchLinkBluetooth.SCRATCH_LINK_DEFAULT_URL);
    const options = { filters: [{ services: [serviceUuid] }] };
    this.startScanning(rpc, options);
    return new Promise((resolve) => {
      this.timeout = setTimeout(() => {
        this.stopScanning(rpc);
        if (this.foundDevices.length === 0) {
          rpc.close();
          resolve();
        }
        const devices = Object.values(this.foundDevices).sort((a, b) => b.rssi - a.rssi);
        const device = devices[0];
        resolve(new ScratchLinkPeripheral(rpc, device));
      }, _ScratchLinkBluetooth.SCAN_TIMEOUT_MS);
    });
  }
  startScanning(rpc, options) {
    if (this.isScanning) {
      console.info("Already scanning.");
      return;
    }
    this.isScanning = true;
    rpc.setMessageHandler("didDiscoverPeripheral", this.handleMessage);
    rpc.send("discover", options);
  }
  stopScanning(rpc) {
    if (!this.isScanning) {
      return;
    }
    this.isScanning = false;
    clearTimeout(this.timeout);
    rpc.removeMessageHandler("didDiscoverPeripheral");
  }
};
let ScratchLinkBluetooth = _ScratchLinkBluetooth;
__publicField22(ScratchLinkBluetooth, "SCRATCH_LINK_DEFAULT_URL", "ws://127.0.0.1:20111/scratch/ble");
__publicField22(ScratchLinkBluetooth, "SCRATCH_LINK_OLD_URL", "wss://device-manager.scratch.mit.edu:20110/scratch/ble");
__publicField22(ScratchLinkBluetooth, "SCAN_TIMEOUT_MS", 1e3);
class Watchdog {
  constructor() {
    __publicField22(this, "isRunning", false);
    __publicField22(this, "checkFunction");
    __publicField22(this, "failedFunction");
    __publicField22(this, "timer");
    __publicField22(this, "timeoutMs");
    __publicField22(this, "isAlive");
  }
  start(checkFunction, failedFunction, timeoutMs) {
    this.isRunning = true;
    this.checkFunction = checkFunction;
    this.failedFunction = failedFunction;
    this.timeoutMs = timeoutMs;
    this.isAlive = false;
    this.timer = setInterval(async () => {
      if (this.isAlive) {
        this.isAlive = false;
        return;
      }
      if (typeof this.checkFunction === "function") {
        try {
          await this.checkFunction();
        } catch (e) {
          this.timeout();
        }
      }
    }, this.timeoutMs);
  }
  tick() {
    if (!this.isRunning) {
      return;
    }
    this.isAlive = true;
  }
  timeout() {
    this.stop();
    if (typeof this.failedFunction === "function") {
      this.failedFunction();
    }
  }
  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      delete this.timer;
    }
  }
}
const isRunningOnReactNative = () => window.ReactNativeWebView !== void 0;
const isWindows$1 = navigator.platform.startsWith("Win");
class ScratchVMPeripheral extends Peripheral {
  constructor(ble2) {
    super();
    __publicField22(this, "ble");
    __publicField22(this, "serviceUuid", "10b20100-5b3b-4571-9508-cf3efcd7bbae");
    this.ble = ble2;
    if (!isRunningOnReactNative()) {
      this.watchdog = new Watchdog();
    }
  }
  async connect(id) {
    return new Promise((resolve) => {
      this.id = id;
      this.ble.connectPeripheral(id);
      const peripheral = this.ble._availablePeripherals[this.id];
      if (peripheral) {
        this.name = peripheral.name;
      }
      const timer = setInterval(() => {
        const connected = this.isConnected();
        if (connected) {
          clearInterval(timer);
          this.dispatchEvent(new Event("connected"));
          resolve();
        }
      }, 50);
    });
  }
  disconnect() {
    if (this.ble) {
      this.ble.disconnect();
    }
    delete this.id;
    delete this.name;
  }
  isConnected() {
    return this.ble !== void 0 && this.ble.isConnected();
  }
  async read(_characteristicUuid) {
    console.warn("Reading data with Scratch Link is disabled since it stops notification");
  }
  async write(characteristicUuid, value, withResponse = false) {
    var _a;
    (_a = this.watchdog) == null ? void 0 : _a.tick();
    const base64 = base64Js.fromByteArray(Uint8Array.from(value));
    return this.ble.write(this.serviceUuid, characteristicUuid, base64, "base64", isWindows$1 ? false : withResponse);
  }
  async startNotifications(characteristicUuid, listener) {
    this.ble.startNotifications(this.serviceUuid, characteristicUuid, (value) => {
      var _a;
      (_a = this.watchdog) == null ? void 0 : _a.tick();
      if (!listener) {
        return;
      }
      const data = base64Js.toByteArray(value);
      const event2 = {
        target: {
          value: new DataView(data.buffer)
        }
      };
      listener(event2);
    });
  }
}
const _ScratchVMBluetooth = class extends Bluetooth {
  constructor(options) {
    super();
    __publicField22(this, "connectionType", BluetoothConnectionType.SCRATCH_VM);
    __publicField22(this, "runtime");
    __publicField22(this, "extensionId");
    __publicField22(this, "BLE");
    this.runtime = options.runtime;
    this.extensionId = options.extensionId;
    this.BLE = options.BLE;
  }
  async discover(serviceUuid) {
    const index = _ScratchVMBluetooth.EXTENSION_IDS.indexOf(this.extensionId);
    const ble2 = new this.BLE(
      this.runtime,
      this.extensionId,
      {
        filters: [{ services: [serviceUuid] }],
        index
      },
      this.onConnect,
      this.reset
    );
    if (!ble2) {
      return;
    }
    return new ScratchVMPeripheral(ble2);
  }
  onConnect() {
  }
  reset() {
  }
};
let ScratchVMBluetooth = _ScratchVMBluetooth;
__publicField22(ScratchVMBluetooth, "EXTENSION_IDS", ["toio", "toio2"]);
const isWindows = navigator.platform.startsWith("Win");
const _WebBluetoothPeripheral = class extends Peripheral {
  constructor(device, serviceUuid) {
    super();
    __publicField22(this, "device");
    __publicField22(this, "serviceUuid");
    __publicField22(this, "characteristics", {});
    __publicField22(this, "onConnectionLost", () => {
      this.dispatchEvent(new Event("connectionlost"));
      this.disconnect();
    });
    this.device = device;
    this.id = this.device.id;
    this.name = this.device.name;
    this.serviceUuid = serviceUuid;
  }
  async connect() {
    if (!this.device.gatt) {
      return;
    }
    const server = await this.device.gatt.connect();
    if (!server) {
      return;
    }
    const service = await server.getPrimaryService(this.serviceUuid);
    if (!service) {
      return;
    }
    const characteristics = await service.getCharacteristics();
    if (!characteristics) {
      return;
    }
    for (const characteristic of characteristics) {
      this.characteristics[characteristic.uuid] = characteristic;
    }
    this.dispatchEvent(new Event("connected"));
    this.device.addEventListener("gattserverdisconnected", this.onConnectionLost);
  }
  disconnect() {
    var _a;
    (_a = this.watchdog) == null ? void 0 : _a.stop();
    if (!this.device.gatt) {
      return;
    }
    this.device.removeEventListener("gattserverdisconnected", this.onConnectionLost);
    this.device.gatt.disconnect();
    delete this.id;
    delete this.name;
    this.dispatchEvent(new Event("disconnected"));
  }
  isConnected() {
    var _a;
    return ((_a = this.device.gatt) == null ? void 0 : _a.connected) === true;
  }
  async write(characteristicUuid, value, withResponse = false) {
    if (isWindows) {
      withResponse = false;
    }
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }
    const data = Uint8Array.from(value);
    const doWrite = async (retryCount) => {
      try {
        withResponse ? await characteristic.writeValueWithResponse(data) : await characteristic.writeValueWithoutResponse(data);
        return data.length;
      } catch (e) {
        if (retryCount < _WebBluetoothPeripheral.MAX_RETRY_COUNT) {
          setTimeout(() => doWrite(retryCount + 1), retryCount * 10);
        } else {
          return;
        }
      }
    };
    doWrite(1);
  }
  async startNotifications(characteristicUuid, listener) {
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }
    characteristic.addEventListener("characteristicvaluechanged", listener);
    characteristic.startNotifications();
  }
};
let WebBluetoothPeripheral = _WebBluetoothPeripheral;
__publicField22(WebBluetoothPeripheral, "MAX_RETRY_COUNT", 100);
class PeripheralExtension {
  constructor(runtime2, extensionId) {
    __publicField(this, "runtime");
    __publicField(this, "extensionId");
    __publicField(this, "bluetooth");
    __publicField(this, "coreCube");
    __publicField(this, "onConnected", () => {
      this.runtime.emit("PERIPHERAL_CONNECTED");
    });
    __publicField(this, "onDisconnected", () => {
      this.runtime.emit("PERIPHERAL_DISCONNECTED");
    });
    __publicField(this, "onConnectionLost", () => {
      this.disconnect();
      this.runtime.emit("PERIPHERAL_CONNECTION_LOST_ERROR", {
        message: `Scratch lost connection to`,
        extensionId: this.extensionId
      });
    });
    this.runtime = runtime2;
    this.extensionId = extensionId;
    this.runtime.registerPeripheralExtension(this.extensionId, this);
    this.runtime.on("PROJECT_RUN_STOP", this.stop.bind(this));
    this.runtime.on("PROJECT_STOP_ALL", this.stop.bind(this));
  }
  async scan() {
    if (!this.bluetooth) {
      this.bluetooth = await BluetoothFactory.create(BluetoothConnectionType$1.SCRATCH_VM, {
        runtime: this.runtime,
        extensionId: this.extensionId,
        BLE: ble
      });
    }
    if (this.coreCube) {
      this.disconnect();
    }
    this.coreCube = await CoreCube.discover(this.bluetooth);
    if (!this.coreCube) {
      return;
    }
    if (this.bluetooth.connectionType === BluetoothConnectionType$1.WEB_BLUETOOTH) {
      this.runtime.connectPeripheral(this.extensionId, this.coreCube.peripheral.getId());
    }
  }
  async connect(id) {
    if (!this.coreCube) {
      return;
    }
    this.coreCube.addEventListener("connected", this.onConnected);
    this.coreCube.addEventListener("disconnected", this.onDisconnected);
    this.coreCube.addEventListener("connectionlost", this.onConnectionLost);
    await this.coreCube.connect(id);
  }
  disconnect() {
    if (!this.coreCube) {
      return;
    }
    this.coreCube.disconnect();
    this.coreCube.removeEventListener("connected", this.onConnected);
    this.coreCube.removeEventListener("disconnected", this.onDisconnected);
    this.coreCube.removeEventListener("connectionlost", this.onConnectionLost);
    delete this.coreCube;
  }
  isConnected() {
    return this.coreCube !== void 0 && this.coreCube.isConnected();
  }
  getPeripheralName() {
    var _a;
    return (_a = this.coreCube) == null ? void 0 : _a.getPeripheralName();
  }
  stop() {
    if (!this.coreCube) {
      return;
    }
    this.coreCube.stop();
  }
}
const BlockType = {
  BOOLEAN: "Boolean",
  BUTTON: "button",
  COMMAND: "command",
  CONDITIONAL: "conditional",
  EVENT: "event",
  HAT: "hat",
  LOOP: "loop",
  REPORTER: "reporter"
};
var blockType = BlockType;
const ArgumentType = {
  ANGLE: "angle",
  BOOLEAN: "Boolean",
  COLOR: "color",
  NUMBER: "number",
  STRING: "string",
  MATRIX: "matrix",
  NOTE: "note",
  IMAGE: "image"
};
var argumentType = ArgumentType;
class Color$1 {
  static get RGB_BLACK() {
    return { r: 0, g: 0, b: 0 };
  }
  static get RGB_WHITE() {
    return { r: 255, g: 255, b: 255 };
  }
  static decimalToHex(decimal) {
    if (decimal < 0) {
      decimal += 16777215 + 1;
    }
    let hex = Number(decimal).toString(16);
    hex = `#${"000000".substr(0, 6 - hex.length)}${hex}`;
    return hex;
  }
  static decimalToRgb(decimal) {
    const a = decimal >> 24 & 255;
    const r = decimal >> 16 & 255;
    const g = decimal >> 8 & 255;
    const b = decimal & 255;
    return { r, g, b, a: a > 0 ? a : 255 };
  }
  static hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  static rgbToHex(rgb) {
    return Color$1.decimalToHex(Color$1.rgbToDecimal(rgb));
  }
  static rgbToDecimal(rgb) {
    return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
  }
  static hexToDecimal(hex) {
    return Color$1.rgbToDecimal(Color$1.hexToRgb(hex));
  }
  static hsvToRgb(hsv) {
    let h = hsv.h % 360;
    if (h < 0)
      h += 360;
    const s = Math.max(0, Math.min(hsv.s, 1));
    const v = Math.max(0, Math.min(hsv.v, 1));
    const i = Math.floor(h / 60);
    const f2 = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f2);
    const t = v * (1 - s * (1 - f2));
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
  }
  static rgbToHsv(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const x = Math.min(Math.min(r, g), b);
    const v = Math.max(Math.max(r, g), b);
    let h = 0;
    let s = 0;
    if (x !== v) {
      const f2 = r === x ? g - b : g === x ? b - r : r - g;
      const i = r === x ? 3 : g === x ? 5 : 1;
      h = (i - f2 / (v - x)) * 60 % 360;
      s = (v - x) / v;
    }
    return { h, s, v };
  }
  static mixRgb(rgb0, rgb1, fraction1) {
    if (fraction1 <= 0)
      return rgb0;
    if (fraction1 >= 1)
      return rgb1;
    const fraction0 = 1 - fraction1;
    return {
      r: fraction0 * rgb0.r + fraction1 * rgb1.r,
      g: fraction0 * rgb0.g + fraction1 * rgb1.g,
      b: fraction0 * rgb0.b + fraction1 * rgb1.b
    };
  }
}
var color = Color$1;
const Color = color;
class Cast {
  static toNumber(value) {
    if (typeof value === "number") {
      if (Number.isNaN(value)) {
        return 0;
      }
      return value;
    }
    const n = Number(value);
    if (Number.isNaN(n)) {
      return 0;
    }
    return n;
  }
  static toBoolean(value) {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      if (value === "" || value === "0" || value.toLowerCase() === "false") {
        return false;
      }
      return true;
    }
    return Boolean(value);
  }
  static toString(value) {
    return String(value);
  }
  static toRgbColorList(value) {
    const color2 = Cast.toRgbColorObject(value);
    return [color2.r, color2.g, color2.b];
  }
  static toRgbColorObject(value) {
    let color2;
    if (typeof value === "string" && value.substring(0, 1) === "#") {
      color2 = Color.hexToRgb(value);
      if (!color2)
        color2 = { r: 0, g: 0, b: 0, a: 255 };
    } else {
      color2 = Color.decimalToRgb(Cast.toNumber(value));
    }
    return color2;
  }
  static isWhiteSpace(val) {
    return val === null || typeof val === "string" && val.trim().length === 0;
  }
  static compare(v1, v2) {
    let n1 = Number(v1);
    let n2 = Number(v2);
    if (n1 === 0 && Cast.isWhiteSpace(v1)) {
      n1 = NaN;
    } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
      n2 = NaN;
    }
    if (isNaN(n1) || isNaN(n2)) {
      const s1 = String(v1).toLowerCase();
      const s2 = String(v2).toLowerCase();
      if (s1 < s2) {
        return -1;
      } else if (s1 > s2) {
        return 1;
      }
      return 0;
    }
    if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
      return 0;
    }
    return n1 - n2;
  }
  static isInt(val) {
    if (typeof val === "number") {
      if (isNaN(val)) {
        return true;
      }
      return val === parseInt(val, 10);
    } else if (typeof val === "boolean") {
      return true;
    } else if (typeof val === "string") {
      return val.indexOf(".") < 0;
    }
    return false;
  }
  static get LIST_INVALID() {
    return "INVALID";
  }
  static get LIST_ALL() {
    return "ALL";
  }
  static toListIndex(index, length, acceptAll) {
    if (typeof index !== "number") {
      if (index === "all") {
        return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
      }
      if (index === "last") {
        if (length > 0) {
          return length;
        }
        return Cast.LIST_INVALID;
      } else if (index === "random" || index === "any") {
        if (length > 0) {
          return 1 + Math.floor(Math.random() * length);
        }
        return Cast.LIST_INVALID;
      }
    }
    index = Math.floor(Cast.toNumber(index));
    if (index < 1 || index > length) {
      return Cast.LIST_INVALID;
    }
    return index;
  }
}
var cast = Cast;
class Util {
  static getCoreCube(that) {
    return that.peripheral.runtime.peripheralExtensions["toio"].coreCube;
  }
}
var formatMessage$1 = { exports: {} };
var formatMessageParse = { exports: {} };
(function(module, exports) {
  var ARG_OPN = "{";
  var ARG_CLS = "}";
  var ARG_SEP = ",";
  var NUM_ARG = "#";
  var TAG_OPN = "<";
  var TAG_CLS = ">";
  var TAG_END = "</";
  var TAG_SELF_CLS = "/>";
  var ESC = "'";
  var OFFSET = "offset:";
  var simpleTypes = [
    "number",
    "date",
    "time",
    "ordinal",
    "duration",
    "spellout"
  ];
  var submTypes = [
    "plural",
    "select",
    "selectordinal"
  ];
  exports = module.exports = function parse(pattern, options) {
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: options && options.tagsType || null,
      tokens: options && options.tokens || null
    }, "");
  };
  function parseAST(current, parentType) {
    var pattern = current.pattern;
    var length = pattern.length;
    var elements = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text)
      elements.push(text);
    if (text && current.tokens)
      current.tokens.push(["text", pattern.slice(start, current.index)]);
    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType)
          throw expected(current);
        break;
      }
      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END)
        break;
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text)
        elements.push(text);
      if (text && current.tokens)
        current.tokens.push(["text", pattern.slice(start, current.index)]);
    }
    return elements;
  }
  function parseText(current, parentType) {
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = parentType === "plural" || parentType === "selectordinal";
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = parentType === "{style}";
    var text = "";
    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle && isWhitespace(char.charCodeAt(0))) {
        break;
      } else if (char === ESC) {
        char = pattern[++current.index];
        if (char === ESC) {
          text += char;
          ++current.index;
        } else if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle) {
          text += char;
          while (++current.index < length) {
            char = pattern[current.index];
            if (char === ESC && pattern[current.index + 1] === ESC) {
              text += ESC;
              ++current.index;
            } else if (char === ESC) {
              ++current.index;
              break;
            } else {
              text += char;
            }
          }
        } else {
          text += ESC;
        }
      } else {
        text += char;
        ++current.index;
      }
    }
    return text;
  }
  function isWhitespace(code2) {
    return code2 >= 9 && code2 <= 13 || code2 === 32 || code2 === 133 || code2 === 160 || code2 === 6158 || code2 >= 8192 && code2 <= 8205 || code2 === 8232 || code2 === 8233 || code2 === 8239 || code2 === 8287 || code2 === 8288 || code2 === 12288 || code2 === 65279;
  }
  function skipWhitespace(current) {
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;
    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }
    if (start < current.index && current.tokens) {
      current.tokens.push(["space", current.pattern.slice(start, current.index)]);
    }
  }
  function parsePlaceholder(current) {
    var pattern = current.pattern;
    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens)
        current.tokens.push(["syntax", NUM_ARG]);
      ++current.index;
      return [NUM_ARG];
    }
    var tag = parseTag(current);
    if (tag)
      return tag;
    if (pattern[current.index] !== ARG_OPN)
      throw expected(current, ARG_OPN);
    if (current.tokens)
      current.tokens.push(["syntax", ARG_OPN]);
    ++current.index;
    skipWhitespace(current);
    var id = parseId(current);
    if (!id)
      throw expected(current, "placeholder id");
    if (current.tokens)
      current.tokens.push(["id", id]);
    skipWhitespace(current);
    var char = pattern[current.index];
    if (char === ARG_CLS) {
      if (current.tokens)
        current.tokens.push(["syntax", ARG_CLS]);
      ++current.index;
      return [id];
    }
    if (char !== ARG_SEP)
      throw expected(current, ARG_SEP + " or " + ARG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", ARG_SEP]);
    ++current.index;
    skipWhitespace(current);
    var type = parseId(current);
    if (!type)
      throw expected(current, "placeholder type");
    if (current.tokens)
      current.tokens.push(["type", type]);
    skipWhitespace(current);
    char = pattern[current.index];
    if (char === ARG_CLS) {
      if (current.tokens)
        current.tokens.push(["syntax", ARG_CLS]);
      if (type === "plural" || type === "selectordinal" || type === "select") {
        throw expected(current, type + " sub-messages");
      }
      ++current.index;
      return [id, type];
    }
    if (char !== ARG_SEP)
      throw expected(current, ARG_SEP + " or " + ARG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", ARG_SEP]);
    ++current.index;
    skipWhitespace(current);
    var arg;
    if (type === "plural" || type === "selectordinal") {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [id, type, offset, parseSubMessages(current, type)];
    } else if (type === "select") {
      arg = [id, type, parseSubMessages(current, type)];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [id, type, parseSimpleFormat(current)];
    } else {
      var index = current.index;
      var format = parseSimpleFormat(current);
      skipWhitespace(current);
      if (pattern[current.index] === ARG_OPN) {
        current.index = index;
        format = parseSubMessages(current, type);
      }
      arg = [id, type, format];
    }
    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS)
      throw expected(current, ARG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", ARG_CLS]);
    ++current.index;
    return arg;
  }
  function parseTag(current) {
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN)
      return;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, "closing tag without matching opening tag");
    }
    if (current.tokens)
      current.tokens.push(["syntax", TAG_OPN]);
    ++current.index;
    var id = parseId(current, true);
    if (!id)
      throw expected(current, "placeholder id");
    if (current.tokens)
      current.tokens.push(["id", id]);
    skipWhitespace(current);
    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens)
        current.tokens.push(["syntax", TAG_SELF_CLS]);
      current.index += TAG_SELF_CLS.length;
      return [id, tagsType];
    }
    if (current.pattern[current.index] !== TAG_CLS)
      throw expected(current, TAG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", TAG_CLS]);
    ++current.index;
    var children = parseAST(current, tagsType);
    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END)
      throw expected(current, TAG_END + id + TAG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", TAG_END]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens)
      current.tokens.push(["id", closeId]);
    if (id !== closeId) {
      current.index = end;
      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS);
    }
    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS)
      throw expected(current, TAG_CLS);
    if (current.tokens)
      current.tokens.push(["syntax", TAG_CLS]);
    ++current.index;
    return [id, tagsType, { children }];
  }
  function parseId(current, isTag) {
    var pattern = current.pattern;
    var length = pattern.length;
    var id = "";
    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || char === ARG_SEP || char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) || isTag && (char === TAG_OPN || char === TAG_CLS || char === "/"))
        break;
      id += char;
      ++current.index;
    }
    return id;
  }
  function parseSimpleFormat(current) {
    var start = current.index;
    var style = parseText(current, "{style}");
    if (!style)
      throw expected(current, "placeholder style name");
    if (current.tokens)
      current.tokens.push(["style", current.pattern.slice(start, current.index)]);
    return style;
  }
  function parsePluralOffset(current) {
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;
    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens)
        current.tokens.push(["offset", "offset"], ["syntax", ":"]);
      current.index += OFFSET.length;
      skipWhitespace(current);
      var start = current.index;
      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }
      if (start === current.index)
        throw expected(current, "offset number");
      if (current.tokens)
        current.tokens.push(["number", pattern.slice(start, current.index)]);
      offset = +pattern.slice(start, current.index);
    }
    return offset;
  }
  function isDigit(code2) {
    return code2 >= 48 && code2 <= 57;
  }
  function parseSubMessages(current, parentType) {
    var pattern = current.pattern;
    var length = pattern.length;
    var options = {};
    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector)
        throw expected(current, "sub-message selector");
      if (current.tokens)
        current.tokens.push(["selector", selector]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }
    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType);
    }
    return options;
  }
  function parseSubMessage(current, parentType) {
    if (current.pattern[current.index] !== ARG_OPN)
      throw expected(current, ARG_OPN + " to start sub-message");
    if (current.tokens)
      current.tokens.push(["syntax", ARG_OPN]);
    ++current.index;
    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS)
      throw expected(current, ARG_CLS + " to end sub-message");
    if (current.tokens)
      current.tokens.push(["syntax", ARG_CLS]);
    ++current.index;
    return message;
  }
  function expected(current, expected2, found, message) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (current.index >= pattern.length ? "end of message pattern" : parseId(current) || pattern[current.index]);
    if (!message)
      message = errorMessage(expected2, found);
    message += " in " + pattern.replace(/\r?\n/g, "\n");
    return new SyntaxError(message, expected2, found, offset, line, column);
  }
  function errorMessage(expected2, found) {
    if (!expected2)
      return "Unexpected " + found + " found";
    return "Expected " + expected2 + " but found " + found;
  }
  function SyntaxError(message, expected2, found, offset, line, column) {
    Error.call(this, message);
    this.name = "SyntaxError";
    this.message = message;
    this.expected = expected2;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }
  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
})(formatMessageParse, formatMessageParse.exports);
var formatMessageInterpret = { exports: {} };
var LONG = "long";
var SHORT = "short";
var NARROW = "narrow";
var NUMERIC = "numeric";
var TWODIGIT = "2-digit";
var formatMessageFormats = {
  number: {
    decimal: {
      style: "decimal"
    },
    integer: {
      style: "decimal",
      maximumFractionDigits: 0
    },
    currency: {
      style: "currency",
      currency: "USD"
    },
    percent: {
      style: "percent"
    },
    default: {
      style: "decimal"
    }
  },
  date: {
    short: {
      month: NUMERIC,
      day: NUMERIC,
      year: TWODIGIT
    },
    medium: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    },
    long: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC
    },
    full: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC,
      weekday: LONG
    },
    default: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    }
  },
  time: {
    short: {
      hour: NUMERIC,
      minute: NUMERIC
    },
    medium: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    },
    long: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    full: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    default: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function(pattern) {
    if (!pattern)
      return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, "").length;
    if (!syms && currency)
      syms = 1;
    if (syms) {
      options.style = "currency";
      options.currencyDisplay = syms === 1 ? "symbol" : syms === 2 ? "code" : "name";
      options.currency = currency ? currency[0].toUpperCase() : "USD";
    } else if (pattern.indexOf("%") >= 0) {
      options.style = "percent";
    }
    if (!/[@#0]/.test(pattern))
      return options.style ? options : void 0;
    options.useGrouping = pattern.indexOf(",") >= 0;
    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf("@") >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, "");
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, "").length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, "").split(".");
      var integer = parts[0];
      var n = integer.length - 1;
      while (integer[n] === "0")
        --n;
      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || "";
      n = 0;
      while (fraction[n] === "0")
        ++n;
      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);
      while (fraction[n] === "#")
        ++n;
      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }
    return options;
  },
  parseDatePattern: function(pattern) {
    if (!pattern)
      return;
    var options = {};
    for (var i = 0; i < pattern.length; ) {
      var current = pattern[i];
      var n = 1;
      while (pattern[++i] === current)
        ++n;
      switch (current) {
        case "G":
          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;
        case "y":
        case "Y":
          options.year = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "M":
        case "L":
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
          break;
        case "E":
        case "e":
        case "c":
          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;
        case "d":
        case "D":
          options.day = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "h":
        case "K":
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "H":
        case "k":
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "m":
          options.minute = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "s":
        case "S":
          options.second = n === 2 ? TWODIGIT : NUMERIC;
          break;
        case "z":
        case "Z":
        case "v":
        case "V":
          options.timeZoneName = n === 1 ? SHORT : LONG;
          break;
      }
    }
    return Object.keys(options).length ? options : void 0;
  }
};
var lookupClosestLocale = function lookupClosestLocale2(locale, available) {
  if (typeof locale === "string" && available[locale])
    return locale;
  var locales = [].concat(locale || []);
  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split("-");
    while (current.length) {
      var candidate = current.join("-");
      if (available[candidate])
        return candidate;
      current.pop();
    }
  }
};
var zero = "zero", one = "one", two = "two", few = "few", many = "many", other = "other";
var f = [
  function(s) {
    var n = +s;
    return n === 1 ? one : other;
  },
  function(s) {
    var n = +s;
    return 0 <= n && n <= 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var n = +s;
    return i === 0 || n === 1 ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 0 ? zero : n === 1 ? one : n === 2 ? two : 3 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 99 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return i === 1 && v === 0 ? one : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 1 && n % 100 !== 11 ? one : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100) ? few : n % 10 === 0 || 5 <= n % 10 && n % 10 <= 9 || 11 <= n % 100 && n % 100 <= 14 ? many : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 1 && (n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91) ? one : n % 10 === 2 && (n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92) ? two : (3 <= n % 10 && n % 10 <= 4 || n % 10 === 9) && ((n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100)) ? few : n !== 0 && n % 1e6 === 0 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var f2 = +(s + ".").split(".")[1];
    return v === 0 && i % 10 === 1 && i % 100 !== 11 || f2 % 10 === 1 && f2 % 100 !== 11 ? one : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) || 2 <= f2 % 10 && f2 % 10 <= 4 && (f2 % 100 < 12 || 14 < f2 % 100) ? few : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return i === 1 && v === 0 ? one : 2 <= i && i <= 4 && v === 0 ? few : v !== 0 ? many : other;
  },
  function(s) {
    var n = +s;
    return n === 0 ? zero : n === 1 ? one : n === 2 ? two : n === 3 ? few : n === 6 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var t = +("" + s).replace(/^[^.]*.?|0+$/g, "");
    var n = +s;
    return n === 1 || t !== 0 && (i === 0 || i === 1) ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var f2 = +(s + ".").split(".")[1];
    return v === 0 && i % 100 === 1 || f2 % 100 === 1 ? one : v === 0 && i % 100 === 2 || f2 % 100 === 2 ? two : v === 0 && (3 <= i % 100 && i % 100 <= 4) || 3 <= f2 % 100 && f2 % 100 <= 4 ? few : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    return i === 0 || i === 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var f2 = +(s + ".").split(".")[1];
    return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && (i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9) || v !== 0 && (f2 % 10 !== 4 && f2 % 10 !== 6 && f2 % 10 !== 9) ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n === 2 ? two : 3 <= n && n <= 6 ? few : 7 <= n && n <= 10 ? many : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : 3 <= n && n <= 10 || 13 <= n && n <= 19 ? few : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return v === 0 && i % 10 === 1 ? one : v === 0 && i % 10 === 2 ? two : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few : v !== 0 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var n = +s;
    return i === 1 && v === 0 ? one : i === 2 && v === 0 ? two : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var t = +("" + s).replace(/^[^.]*.?|0+$/g, "");
    return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n === 2 ? two : other;
  },
  function(s) {
    var n = +s;
    return n === 0 ? zero : n === 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var n = +s;
    return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
  },
  function(s) {
    var f2 = +(s + ".").split(".")[1];
    var n = +s;
    return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100) ? few : f2 !== 0 ? many : other;
  },
  function(s) {
    var v = (s + ".").split(".")[1].length;
    var f2 = +(s + ".").split(".")[1];
    var n = +s;
    return n % 10 === 0 || 11 <= n % 100 && n % 100 <= 19 || v === 2 && (11 <= f2 % 100 && f2 % 100 <= 19) ? zero : n % 10 === 1 && n % 100 !== 11 || v === 2 && f2 % 10 === 1 && f2 % 100 !== 11 || v !== 2 && f2 % 10 === 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var f2 = +(s + ".").split(".")[1];
    return v === 0 && i % 10 === 1 && i % 100 !== 11 || f2 % 10 === 1 && f2 % 100 !== 11 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    var n = +s;
    return i === 1 && v === 0 ? one : v !== 0 || n === 0 || n !== 1 && (1 <= n % 100 && n % 100 <= 19) ? few : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n === 0 || 2 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 19 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return i === 1 && v === 0 ? one : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i !== 1 && (0 <= i % 10 && i % 10 <= 1) || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (12 <= i % 100 && i % 100 <= 14) ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    return 0 <= i && i <= 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i % 10 === 0 || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (11 <= i % 100 && i % 100 <= 14) ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var n = +s;
    return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var f2 = +(s + ".").split(".")[1];
    var n = +s;
    return n === 0 || n === 1 || i === 0 && f2 === 1 ? one : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    var v = (s + ".").split(".")[1].length;
    return v === 0 && i % 100 === 1 ? one : v === 0 && i % 100 === 2 ? two : v === 0 && (3 <= i % 100 && i % 100 <= 4) || v !== 0 ? few : other;
  },
  function(s) {
    var n = +s;
    return 0 <= n && n <= 1 || 11 <= n && n <= 99 ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    return i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8 || (i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80) ? one : i % 10 === 3 || i % 10 === 4 || (i % 1e3 === 100 || i % 1e3 === 200 || i % 1e3 === 300 || i % 1e3 === 400 || i % 1e3 === 500 || i % 1e3 === 600 || i % 1e3 === 700 || i % 1e3 === 800 || i % 1e3 === 900) ? few : i === 0 || i % 10 === 6 || (i % 100 === 40 || i % 100 === 60 || i % 100 === 90) ? many : other;
  },
  function(s) {
    var n = +s;
    return (n % 10 === 2 || n % 10 === 3) && (n % 100 !== 12 && n % 100 !== 13) ? few : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 3 ? one : n === 2 ? two : n === 4 ? few : other;
  },
  function(s) {
    var n = +s;
    return n === 0 || n === 7 || n === 8 || n === 9 ? zero : n === 1 ? one : n === 2 ? two : n === 3 || n === 4 ? few : n === 5 || n === 6 ? many : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 1 && n % 100 !== 11 ? one : n % 10 === 2 && n % 100 !== 12 ? two : n % 10 === 3 && n % 100 !== 13 ? few : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : n === 3 || n === 13 ? few : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 5 ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    return i === 1 ? one : i === 0 || (2 <= i % 100 && i % 100 <= 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? many : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many : other;
  },
  function(s) {
    var i = Math.floor(Math.abs(+s));
    return i % 10 === 1 && i % 100 !== 11 ? one : i % 10 === 2 && i % 100 !== 12 ? two : (i % 10 === 7 || i % 10 === 8) && (i % 100 !== 17 && i % 100 !== 18) ? many : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : other;
  },
  function(s) {
    var n = +s;
    return 1 <= n && n <= 4 ? one : other;
  },
  function(s) {
    var n = +s;
    return n === 1 || n === 5 || 7 <= n && n <= 9 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
  },
  function(s) {
    var n = +s;
    return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
  },
  function(s) {
    var n = +s;
    return (n % 10 === 1 || n % 10 === 2) && (n % 100 !== 11 && n % 100 !== 12) ? one : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
  },
  function(s) {
    var n = +s;
    return n % 10 === 3 && n % 100 !== 13 ? few : other;
  }
];
var plurals = {
  af: { cardinal: f[0] },
  ak: { cardinal: f[1] },
  am: { cardinal: f[2] },
  ar: { cardinal: f[3] },
  ars: { cardinal: f[3] },
  as: { cardinal: f[2], ordinal: f[34] },
  asa: { cardinal: f[0] },
  ast: { cardinal: f[4] },
  az: { cardinal: f[0], ordinal: f[35] },
  be: { cardinal: f[5], ordinal: f[36] },
  bem: { cardinal: f[0] },
  bez: { cardinal: f[0] },
  bg: { cardinal: f[0] },
  bh: { cardinal: f[1] },
  bn: { cardinal: f[2], ordinal: f[34] },
  br: { cardinal: f[6] },
  brx: { cardinal: f[0] },
  bs: { cardinal: f[7] },
  ca: { cardinal: f[4], ordinal: f[37] },
  ce: { cardinal: f[0] },
  cgg: { cardinal: f[0] },
  chr: { cardinal: f[0] },
  ckb: { cardinal: f[0] },
  cs: { cardinal: f[8] },
  cy: { cardinal: f[9], ordinal: f[38] },
  da: { cardinal: f[10] },
  de: { cardinal: f[4] },
  dsb: { cardinal: f[11] },
  dv: { cardinal: f[0] },
  ee: { cardinal: f[0] },
  el: { cardinal: f[0] },
  en: { cardinal: f[4], ordinal: f[39] },
  eo: { cardinal: f[0] },
  es: { cardinal: f[0] },
  et: { cardinal: f[4] },
  eu: { cardinal: f[0] },
  fa: { cardinal: f[2] },
  ff: { cardinal: f[12] },
  fi: { cardinal: f[4] },
  fil: { cardinal: f[13], ordinal: f[0] },
  fo: { cardinal: f[0] },
  fr: { cardinal: f[12], ordinal: f[0] },
  fur: { cardinal: f[0] },
  fy: { cardinal: f[4] },
  ga: { cardinal: f[14], ordinal: f[0] },
  gd: { cardinal: f[15], ordinal: f[40] },
  gl: { cardinal: f[4] },
  gsw: { cardinal: f[0] },
  gu: { cardinal: f[2], ordinal: f[41] },
  guw: { cardinal: f[1] },
  gv: { cardinal: f[16] },
  ha: { cardinal: f[0] },
  haw: { cardinal: f[0] },
  he: { cardinal: f[17] },
  hi: { cardinal: f[2], ordinal: f[41] },
  hr: { cardinal: f[7] },
  hsb: { cardinal: f[11] },
  hu: { cardinal: f[0], ordinal: f[42] },
  hy: { cardinal: f[12], ordinal: f[0] },
  ia: { cardinal: f[4] },
  io: { cardinal: f[4] },
  is: { cardinal: f[18] },
  it: { cardinal: f[4], ordinal: f[43] },
  iu: { cardinal: f[19] },
  iw: { cardinal: f[17] },
  jgo: { cardinal: f[0] },
  ji: { cardinal: f[4] },
  jmc: { cardinal: f[0] },
  ka: { cardinal: f[0], ordinal: f[44] },
  kab: { cardinal: f[12] },
  kaj: { cardinal: f[0] },
  kcg: { cardinal: f[0] },
  kk: { cardinal: f[0], ordinal: f[45] },
  kkj: { cardinal: f[0] },
  kl: { cardinal: f[0] },
  kn: { cardinal: f[2] },
  ks: { cardinal: f[0] },
  ksb: { cardinal: f[0] },
  ksh: { cardinal: f[20] },
  ku: { cardinal: f[0] },
  kw: { cardinal: f[19] },
  ky: { cardinal: f[0] },
  lag: { cardinal: f[21] },
  lb: { cardinal: f[0] },
  lg: { cardinal: f[0] },
  ln: { cardinal: f[1] },
  lt: { cardinal: f[22] },
  lv: { cardinal: f[23] },
  mas: { cardinal: f[0] },
  mg: { cardinal: f[1] },
  mgo: { cardinal: f[0] },
  mk: { cardinal: f[24], ordinal: f[46] },
  ml: { cardinal: f[0] },
  mn: { cardinal: f[0] },
  mo: { cardinal: f[25], ordinal: f[0] },
  mr: { cardinal: f[2], ordinal: f[47] },
  mt: { cardinal: f[26] },
  nah: { cardinal: f[0] },
  naq: { cardinal: f[19] },
  nb: { cardinal: f[0] },
  nd: { cardinal: f[0] },
  ne: { cardinal: f[0], ordinal: f[48] },
  nl: { cardinal: f[4] },
  nn: { cardinal: f[0] },
  nnh: { cardinal: f[0] },
  no: { cardinal: f[0] },
  nr: { cardinal: f[0] },
  nso: { cardinal: f[1] },
  ny: { cardinal: f[0] },
  nyn: { cardinal: f[0] },
  om: { cardinal: f[0] },
  or: { cardinal: f[0], ordinal: f[49] },
  os: { cardinal: f[0] },
  pa: { cardinal: f[1] },
  pap: { cardinal: f[0] },
  pl: { cardinal: f[27] },
  prg: { cardinal: f[23] },
  ps: { cardinal: f[0] },
  pt: { cardinal: f[28] },
  "pt-PT": { cardinal: f[4] },
  rm: { cardinal: f[0] },
  ro: { cardinal: f[25], ordinal: f[0] },
  rof: { cardinal: f[0] },
  ru: { cardinal: f[29] },
  rwk: { cardinal: f[0] },
  saq: { cardinal: f[0] },
  sc: { cardinal: f[4], ordinal: f[43] },
  scn: { cardinal: f[4], ordinal: f[43] },
  sd: { cardinal: f[0] },
  sdh: { cardinal: f[0] },
  se: { cardinal: f[19] },
  seh: { cardinal: f[0] },
  sh: { cardinal: f[7] },
  shi: { cardinal: f[30] },
  si: { cardinal: f[31] },
  sk: { cardinal: f[8] },
  sl: { cardinal: f[32] },
  sma: { cardinal: f[19] },
  smi: { cardinal: f[19] },
  smj: { cardinal: f[19] },
  smn: { cardinal: f[19] },
  sms: { cardinal: f[19] },
  sn: { cardinal: f[0] },
  so: { cardinal: f[0] },
  sq: { cardinal: f[0], ordinal: f[50] },
  sr: { cardinal: f[7] },
  ss: { cardinal: f[0] },
  ssy: { cardinal: f[0] },
  st: { cardinal: f[0] },
  sv: { cardinal: f[4], ordinal: f[51] },
  sw: { cardinal: f[4] },
  syr: { cardinal: f[0] },
  ta: { cardinal: f[0] },
  te: { cardinal: f[0] },
  teo: { cardinal: f[0] },
  ti: { cardinal: f[1] },
  tig: { cardinal: f[0] },
  tk: { cardinal: f[0], ordinal: f[52] },
  tl: { cardinal: f[13], ordinal: f[0] },
  tn: { cardinal: f[0] },
  tr: { cardinal: f[0] },
  ts: { cardinal: f[0] },
  tzm: { cardinal: f[33] },
  ug: { cardinal: f[0] },
  uk: { cardinal: f[29], ordinal: f[53] },
  ur: { cardinal: f[4] },
  uz: { cardinal: f[0] },
  ve: { cardinal: f[0] },
  vo: { cardinal: f[0] },
  vun: { cardinal: f[0] },
  wa: { cardinal: f[1] },
  wae: { cardinal: f[0] },
  xh: { cardinal: f[0] },
  xog: { cardinal: f[0] },
  yi: { cardinal: f[4] },
  zu: { cardinal: f[2] },
  lo: { ordinal: f[0] },
  ms: { ordinal: f[0] },
  vi: { ordinal: f[0] }
};
(function(module, exports) {
  var formats = formatMessageFormats;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var plurals$1 = plurals;
  exports = module.exports = function interpret(ast, locale, types) {
    return interpretAST(ast, null, locale || "en", types || {}, true);
  };
  exports.toParts = function toParts(ast, locale, types) {
    return interpretAST(ast, null, locale || "en", types || {}, false);
  };
  function interpretAST(elements, parent, locale, types, join) {
    var parts = elements.map(function(element) {
      return interpretElement(element, parent, locale, types, join);
    });
    if (!join) {
      return function format(args) {
        return parts.reduce(function(parts2, part) {
          return parts2.concat(part(args));
        }, []);
      };
    }
    if (parts.length === 1)
      return parts[0];
    return function format(args) {
      var message = "";
      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }
      return message;
    };
  }
  function interpretElement(element, parent, locale, types, join) {
    if (typeof element === "string") {
      var value = element;
      return function format() {
        return value;
      };
    }
    var id = element[0];
    var type = element[1];
    if (parent && element[0] === "#") {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([id, "number"], locale);
      return function format(args) {
        return formatter(getArg(id, args) - offset, args);
      };
    }
    var children;
    if (type === "plural" || type === "selectordinal") {
      children = {};
      Object.keys(element[3]).forEach(function(key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [element[0], element[1], element[2], children];
    } else if (element[2] && typeof element[2] === "object") {
      children = {};
      Object.keys(element[2]).forEach(function(key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [element[0], element[1], children];
    }
    var getFrmt = type && (types[type] || defaults[type]);
    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format(args) {
        return frmt(getArg(id, args), args);
      };
    }
    return join ? function format(args) {
      return String(getArg(id, args));
    } : function format(args) {
      return getArg(id, args);
    };
  }
  function getArg(id, args) {
    if (args && id in args)
      return args[id];
    var parts = id.split(".");
    var a = args;
    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }
    return a;
  }
  function interpretNumber(element, locales) {
    var style = element[2];
    var options = formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
    return new Intl.NumberFormat(locales, options).format;
  }
  function interpretDuration(element, locales) {
    var style = element[2];
    var options = formats.duration[style] || formats.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? "." : ":";
    return function(s, args) {
      s = +s;
      if (!isFinite(s))
        return fs(s);
      var h = ~~(s / 60 / 60);
      var m = ~~(s / 60 % 60);
      var dur = (h ? fh(Math.abs(h)) + sep : "") + fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
    };
  }
  function interpretDateTime(element, locales) {
    var type = element[1];
    var style = element[2];
    var options = formats[type][style] || formats.parseDatePattern(style) || formats[type].default;
    return new Intl.DateTimeFormat(locales, options).format;
  }
  function interpretPlural(element, locales) {
    var type = element[1];
    var pluralType = type === "selectordinal" ? "ordinal" : "cardinal";
    var offset = element[2];
    var children = element[3];
    var pluralRules;
    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, { type: pluralType });
    } else {
      var locale = lookupClosestLocale$1(locales, plurals$1);
      var select = locale && plurals$1[locale][pluralType] || returnOther;
      pluralRules = { select };
    }
    return function(value, args) {
      var clause = children["=" + +value] || children[pluralRules.select(value - offset)] || children.other;
      return clause(args);
    };
  }
  function returnOther() {
    return "other";
  }
  function interpretSelect(element, locales) {
    var children = element[2];
    return function(value, args) {
      var clause = children[value] || children.other;
      return clause(args);
    };
  }
  var defaults = {
    number: interpretNumber,
    ordinal: interpretNumber,
    spellout: interpretNumber,
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
})(formatMessageInterpret, formatMessageInterpret.exports);
(function(module, exports) {
  var parse = formatMessageParse.exports;
  var interpret = formatMessageInterpret.exports;
  var plurals$1 = plurals;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var origFormats = formatMessageFormats;
  function assign(target, source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
    return target;
  }
  function namespace() {
    var formats = assign({}, origFormats);
    var currentLocales = "en";
    var translations2 = {};
    var generateId = function(pattern) {
      return pattern;
    };
    var missingReplacement = null;
    var missingTranslation = "warning";
    var types = {};
    function formatMessage2(msg, args, locales) {
      var pattern = typeof msg === "string" ? msg : msg.default;
      var id = typeof msg === "object" && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = interpret(parse(translated.message), locales || currentLocales, types));
      return format(args);
    }
    formatMessage2.rich = function rich(msg, args, locales) {
      var pattern = typeof msg === "string" ? msg : msg.default;
      var id = typeof msg === "object" && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.toParts || (translated.toParts = interpret.toParts(parse(translated.message, { tagsType }), locales || currentLocales, types));
      return format(args);
    };
    var tagsType = "<>";
    function richType(node, locales) {
      var style = node[2];
      return function(fn, args) {
        var props = typeof style === "object" ? mapObject(style, args) : style;
        return typeof fn === "function" ? fn(props) : fn;
      };
    }
    types[tagsType] = richType;
    function mapObject(object, args) {
      return Object.keys(object).reduce(function(mapped, key) {
        mapped[key] = object[key](args);
        return mapped;
      }, {});
    }
    function translate(pattern, id, locales) {
      var locale = lookupClosestLocale$1(locales, translations2) || "en";
      var messages = translations2[locale] || (translations2[locale] = {});
      var translated = messages[id];
      if (typeof translated === "string") {
        translated = messages[id] = { message: translated };
      }
      if (!translated) {
        var message = 'Translation for "' + id + '" in "' + locale + '" is missing';
        if (missingTranslation === "warning") {
          if (typeof console !== "undefined")
            console.warn(message);
        } else if (missingTranslation !== "ignore") {
          throw new Error(message);
        }
        var replacement = typeof missingReplacement === "function" ? missingReplacement(pattern, id, locale) || pattern : missingReplacement || pattern;
        translated = messages[id] = { message: replacement };
      }
      return translated;
    }
    formatMessage2.setup = function setup(opt) {
      opt = opt || {};
      if (opt.locale)
        currentLocales = opt.locale;
      if ("translations" in opt)
        translations2 = opt.translations || {};
      if (opt.generateId)
        generateId = opt.generateId;
      if ("missingReplacement" in opt)
        missingReplacement = opt.missingReplacement;
      if (opt.missingTranslation)
        missingTranslation = opt.missingTranslation;
      if (opt.formats) {
        if (opt.formats.number)
          assign(formats.number, opt.formats.number);
        if (opt.formats.date)
          assign(formats.date, opt.formats.date);
        if (opt.formats.time)
          assign(formats.time, opt.formats.time);
      }
      if (opt.types) {
        types = opt.types;
        types[tagsType] = richType;
      }
      return {
        locale: currentLocales,
        translations: translations2,
        generateId,
        missingReplacement,
        missingTranslation,
        formats,
        types
      };
    };
    formatMessage2.number = function(value, style, locales) {
      var options = style && formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
      return new Intl.NumberFormat(locales || currentLocales, options).format(value);
    };
    formatMessage2.date = function(value, style, locales) {
      var options = style && formats.date[style] || formats.parseDatePattern(style) || formats.date.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };
    formatMessage2.time = function(value, style, locales) {
      var options = style && formats.time[style] || formats.parseDatePattern(style) || formats.time.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };
    formatMessage2.select = function(value, options) {
      return options[value] || options.other;
    };
    formatMessage2.custom = function(placeholder, locales, value, args) {
      if (!(placeholder[1] in types))
        return value;
      return types[placeholder[1]](placeholder, locales)(value, args);
    };
    formatMessage2.plural = plural.bind(null, "cardinal");
    formatMessage2.selectordinal = plural.bind(null, "ordinal");
    function plural(pluralType, value, offset, options, locale) {
      if (typeof offset === "object" && typeof options !== "object") {
        locale = options;
        options = offset;
        offset = 0;
      }
      var closest = lookupClosestLocale$1(locale || currentLocales, plurals$1);
      var plural2 = closest && plurals$1[closest][pluralType] || returnOther;
      return options["=" + +value] || options[plural2(value - offset)] || options.other;
    }
    function returnOther() {
      return "other";
    }
    formatMessage2.namespace = namespace;
    return formatMessage2;
  }
  module.exports = namespace();
})(formatMessage$1);
var formatMessage = formatMessage$1.exports;
var ja = {
  "extension.name": "toio",
  "extension.nameGui": "toio \u30B3\u30A2 \u30AD\u30E5\u30FC\u30D6",
  "extension.description": "\u5EA7\u6A19\u3092\u4F7F\u3063\u3066\u3001\u30ED\u30DC\u30C3\u30C8\u3092\u52D5\u304B\u3059\u3002",
  "extension2.name": "toio #2",
  "extension2.nameGui": "toio \u30B3\u30A2 \u30AD\u30E5\u30FC\u30D6 #2 (\u958B\u767A\u8005\u7248)",
  "extension2.description": "2\u53F0\u76EE\u306E\u30AD\u30E5\u30FC\u30D6\u3092\u52D5\u304B\u3059\u3002\u203B\u74B0\u5883\u306B\u3088\u308A\u52D5\u4F5C\u3057\u306A\u3044\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\u5C06\u6765\u306E\u4E92\u63DB\u6027\u306F\u4FDD\u8A3C\u3055\u308C\u307E\u305B\u3093\u3002",
  "extension.collaborator": "Sony Interactive Entertainment Inc.",
  "extension.connecting": "\u63A5\u7D9A\u4E2D",
  "toio.about": "\u3053\u306E\u30B5\u30A4\u30C8\u306B\u3064\u3044\u3066",
  "toio.help": "\u30D8\u30EB\u30D7",
  "toio.connect": "\u63A5\u7D9A",
  "toio.checkLinkApp": "\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u624B\u9806\u3092\u8A18\u3057\u305F\u30B5\u30A4\u30C8\u3092\u8868\u793A",
  "toio.punctuation": "\u3002",
  "toio.moveSteps": "[MAT_ICON][DIRECTION]\u306B\u901F\u3055[SPEED]\u3067[STEP_ICON][STEPS]\u6B69\u52D5\u304B\u3059",
  "toio.rotateBy": "[MAT_ICON][DIRECTION]\u306B\u901F\u3055[SPEED]\u3067[ANGLE]\u5EA6\u56DE\u3059",
  "toio.moveTo": "[MAT_ICON]x\u5EA7\u6A19[X]\u3001y\u5EA7\u6A19[Y]\u3078\u901F\u3055[SPEED]\u3067\u52D5\u304B\u3059",
  "toio.pointInDirection": "[MAT_ICON][DIRECTION]\u5EA6\u306B\u901F\u3055[SPEED]\u3067\u5411\u3051\u308B",
  "toio.stateTypeMenu.x": "[MAT_ICON]x\u5EA7\u6A19",
  "toio.stateTypeMenu.y": "[MAT_ICON]y\u5EA7\u6A19",
  "toio.stateTypeMenu.direction": "[MAT_ICON]\u5411\u304D",
  "toio.moveToOnGrid": "[MAT_ICON]\u5217[COLUMN]\u3001\u884C[ROW]\u306E\u30DE\u30B9\u3078\u901F\u3055[SPEED]\u3067\u52D5\u304B\u3059",
  "toio.getColumnOrRowIndex": "\u30DE\u30B9\u306E[MAT_AXES]\u756A\u53F7",
  "toio.getColumnOrRowIndexMenu.column": "\u5217",
  "toio.getColumnOrRowIndexMenu.row": "\u884C",
  "toio.getColumnIndex": "[MAT_ICON]\u30DE\u30B9\u306E\u5217\u756A\u53F7",
  "toio.getRowIndex": "[MAT_ICON]\u30DE\u30B9\u306E\u884C\u756A\u53F7",
  "toio.whenGridTouched": "[MAT_ICON]\u5217[COLUMN]\u3001\u884C[ROW]\u306E\u30DE\u30B9\u306B\u89E6\u308C\u305F\u3068\u304D",
  "toio.isGridTouched": "[MAT_ICON]\u5217[COLUMN]\u3001\u884C[ROW]\u306E\u30DE\u30B9\u306B\u89E6\u308C\u3066\u3044\u308B",
  "toio.whenTouched": "[MAT_CARD_ICON][TYPE]\u306B\u89E6\u308C\u305F\u3068\u304D",
  "toio.isTouched": "[MAT_CARD_ICON][TYPE]\u306B\u89E6\u308C\u3066\u3044\u308B",
  "toio.getTouchedSimpleCard": "[CARD_ICON]\u89E6\u308C\u3066\u3044\u308B\u7C21\u6613\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.mat": "\u30DE\u30C3\u30C8",
  "toio.whenTouchedMenu.frontCard": "\u524D\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.backCard": "\u5F8C\u308D\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.leftCard": "\u5DE6\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.rightCard": "\u53F3\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.goCard": "Go\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.typhoonCard": "\u30BF\u30A4\u30D5\u30FC\u30F3\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.rushCard": "\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.autoTackleCard": "\u30AA\u30FC\u30C8\u30BF\u30C3\u30AF\u30EB\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.randomCard": "\u30E9\u30F3\u30C0\u30E0\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.pushPowerUpCard": "\u30C4\u30AD\u30D1\u30EF\u30FC\u30A2\u30C3\u30D7\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.strutPowerUpCard": "\u30CF\u30EA\u30C6\u30D1\u30EF\u30FC\u30A2\u30C3\u30D7\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.sideAttackCard": "\u30B5\u30A4\u30C9\u30A2\u30BF\u30C3\u30AF\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.easyModeCard": "\u30A4\u30FC\u30B8\u30FC\u30E2\u30FC\u30C9\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.anyCard": "\u3069\u308C\u304B\u306E\u30C8\u30A4\u30AA\u30FB\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.spinSticker": "\u30B9\u30D4\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.shockSticker": "\u30B7\u30E7\u30C3\u30AF\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.wobbleSticker": "\u3075\u3089\u3064\u304D\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.panicSticker": "\u30D1\u30CB\u30C3\u30AF\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.speedUpSticker": "\u30B9\u30D4\u30FC\u30C9\u30A2\u30C3\u30D7\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.speedDownSticker": "\u30B9\u30D4\u30FC\u30C9\u30C0\u30A6\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.anySticker": "\u3069\u308C\u304B\u306E\u30C8\u30A4\u30AA\u30FB\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.whiteCell": "\u767D\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.redCell": "\u8D64\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.greenCell": "\u7DD1\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.yellowCell": "\u9EC4\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.blueCell": "\u9752\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.anyNumber": "\u3069\u308C\u304B\u306E\u6570\u5B57",
  "toio.whenTouchedMenu.anyAlphabet": "\u3069\u308C\u304B\u306E\u30A2\u30EB\u30D5\u30A1\u30D9\u30C3\u30C8",
  "toio.whenTouchedMenu.anySymbol": "\u3069\u308C\u304B\u306E\u8A18\u53F7",
  "toio.whenTouchedMenu.anySimpleCard": "\u3069\u308C\u304B\u306E\u7C21\u6613\u30AB\u30FC\u30C9",
  "toio.moveFor": "[DIRECTION]\u306B\u901F\u3055[SPEED]\u3067[WATCH_ICON][DURATION]\u79D2\u52D5\u304B\u3059",
  "toio.moveForMenu.forward": "\u524D",
  "toio.moveForMenu.backward": "\u5F8C\u308D",
  "toio.rotateFor": "[DIRECTION]\u306B\u901F\u3055[SPEED]\u3067[WATCH_ICON][DURATION]\u79D2\u56DE\u3059",
  "toio.rotateForMenu.left": "\u5DE6",
  "toio.rotateForMenu.right": "\u53F3",
  "toio.moveWheelsFor": "\u5DE6\u30BF\u30A4\u30E4\u3092\u901F\u3055[LEFT_SPEED]\u3001\u53F3\u30BF\u30A4\u30E4\u3092\u901F\u3055[RIGHT_SPEED]\u3067[WATCH_ICON][DURATION]\u79D2\u52D5\u304B\u3059",
  "toio.stopWheels": "\u30BF\u30A4\u30E4\u3092\u6B62\u3081\u308B",
  "toio.setLightColorFor": "\u30E9\u30F3\u30D7\u306E\u8272[COLOR]\u3092[WATCH_ICON][DURATION]\u79D2\u3064\u3051\u308B",
  "toio.turnOffLight": "\u30E9\u30F3\u30D7\u3092\u6D88\u3059",
  "toio.playNoteFor": "\u97F3[NOTE]\u3092[WATCH_ICON][DURATION]\u79D2\u9CF4\u3089\u3059",
  "toio.stopNote": "\u97F3\u3092\u6B62\u3081\u308B",
  "toio.whenMagnetDetected": "[MAGNET_STATE]\u306B\u89E6\u308C\u305F\u3068\u304D",
  "toio.isMagnetDetected": "[MAGNET_STATE]\u306B\u89E6\u308C\u3066\u3044\u308B",
  "toio.magnetState.nCenter": "N\u6975 \u771F\u3093\u4E2D",
  "toio.magnetState.nRight": "N\u6975 \u53F3",
  "toio.magnetState.nLeft": "N\u6975 \u5DE6",
  "toio.magnetState.sCenter": "S\u6975 \u771F\u3093\u4E2D",
  "toio.magnetState.sRight": "S\u6975 \u53F3",
  "toio.magnetState.sLeft": "S\u6975 \u5DE6",
  "toio.magnetState.anyN": "\u3069\u308C\u304B\u306EN\u6975",
  "toio.magnetState.anyS": "\u3069\u308C\u304B\u306ES\u6975",
  "toio.magnetState.any": "\u3069\u308C\u304B\u306E\u78C1\u77F3",
  "toio.getStateValue": "[STATE_VALUES]",
  "toio.infos.batteryLevel": "\u96FB\u6C60\u6B8B\u91CF",
  "toio.infos.peripheralName": "\u63A5\u7D9A\u4E2D\u306E\u30AD\u30E5\u30FC\u30D6\u540D",
  "toio.infos.postureRoll": "\u59FF\u52E2\u89D2 \u30ED\u30FC\u30EB",
  "toio.infos.posturePitch": "\u59FF\u52E2\u89D2 \u30D4\u30C3\u30C1",
  "toio.infos.postureYaw": "\u59FF\u52E2\u89D2 \u30E8\u30FC",
  "toio.infos.postureValue": "\u59FF\u52E2\u691C\u51FA",
  "toio.whenButtonPressed": "\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u305F\u3068\u304D",
  "toio.isButtonPressed": "\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u3066\u3044\u308B",
  "toio.whenStateChanged": "[CHANGED_STATE]",
  "toio.isStateChanged": "[CHANGED_STATE]",
  "toio.infos.buttonPressed": "\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u305F",
  "toio.infos.cubeConnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u63A5\u7D9A\u3055\u308C\u305F",
  "toio.infos.cubeDisconnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u5207\u65AD\u3055\u308C\u305F",
  "toio.infos.collisionDetected": "\u885D\u7A81\u3092\u691C\u51FA\u3057\u305F",
  "toio.infos.isButtonPressed": "\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u3066\u3044\u308B",
  "toio.infos.isCubeConnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u63A5\u7D9A\u3055\u308C\u3066\u3044\u308B",
  "toio.infos.isCollisionDetected": "\u885D\u7A81\u3092\u691C\u51FA\u3057\u3066\u3044\u308B",
  "toio.assets.toioCoreCube": "\u30AD\u30E5\u30FC\u30D6",
  "toio.assets.toioCollection.playMat.ring": "\u30DE\u30C3\u30C8[\u571F\u4FF5]",
  "toio.assets.toioCollection.playMat.tiled": "\u30DE\u30C3\u30C8[\u30DE\u30B9]",
  "toio.assets.toioCollection.playMat.ringPale": "\u30DE\u30C3\u30C8[\u571F\u4FF5](\u8584)",
  "toio.assets.toioCollection.playMat.tiledPale": "\u30DE\u30C3\u30C8[\u30DE\u30B9](\u8584)",
  "toio.assets.toioCollection.playMat.frame": "\u30DE\u30C3\u30C8[\u67A0]",
  "toio.assets.toioCollection.playMat.grid": "\u30DE\u30C3\u30C8[\u65B9\u773C]",
  "toio.assets.toioCoreCube.simplePlayMat": "\u7C21\u6613\u30DE\u30C3\u30C8",
  "toio.assets.toioCollection.car": "\u304F\u308B\u307E",
  "toio.assets.toioCoreCube.topView": "\u30AD\u30E5\u30FC\u30D6",
  "toio.assets.toioCoreCube.topViewWithPlate": "\u30AD\u30E5\u30FC\u30D6 (\u30D7\u30EC\u30FC\u30C8\u4ED8)"
};
var jaHira = {
  "extension.name": "toio",
  "extension.nameGui": "toio \u30B3\u30A2 \u30AD\u30E5\u30FC\u30D6",
  "extension.description": "\u3056\u3072\u3087\u3046\u3092\u3064\u304B\u3063\u3066\u3001\u30ED\u30DC\u30C3\u30C8\u3092\u3046\u3054\u304B\u3059\u3002",
  "extension2.name": "toio #2",
  "extension2.nameGui": "toio \u30B3\u30A2 \u30AD\u30E5\u30FC\u30D6 #2 (\u958B\u767A\u8005\u7248)",
  "extension2.description": "2\u53F0\u76EE\u306E\u30AD\u30E5\u30FC\u30D6\u3092\u52D5\u304B\u3059\u3002\u203B\u74B0\u5883\u306B\u3088\u308A\u52D5\u4F5C\u3057\u306A\u3044\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\u5C06\u6765\u306E\u4E92\u63DB\u6027\u306F\u4FDD\u8A3C\u3055\u308C\u307E\u305B\u3093\u3002\uFF08\u304A\u3068\u306A\u306E\u3072\u3068\u3068\u304B\u304F\u306B\u3093\u3057\u3066\u304F\u3060\u3055\u3044\uFF09",
  "extension.collaborator": "Sony Interactive Entertainment Inc.",
  "extension.connecting": "\u305B\u3064\u305E\u304F\u3061\u3085\u3046",
  "toio.about": "\u3053\u306E\u30B5\u30A4\u30C8\u306B\u3064\u3044\u3066",
  "toio.help": "\u30D8\u30EB\u30D7",
  "toio.connect": "\u305B\u3064\u305E\u304F",
  "toio.checkLinkApp": "\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u624B\u9806\u3092\u8A18\u3057\u305F\u30B5\u30A4\u30C8\u3092\u8868\u793A<br>\uFF08\u304A\u3068\u306A\u306E\u3072\u3068\u3068\u304B\u304F\u306B\u3093\u3057\u3066\u304F\u3060\u3055\u3044\uFF09",
  "toio.punctuation": "\u3002",
  "toio.moveSteps": "[MAT_ICON][DIRECTION]\u306B\u306F\u3084\u3055[SPEED]\u3067[STEP_ICON][STEPS]\u307B\u3046\u3054\u304B\u3059",
  "toio.rotateBy": "[MAT_ICON][DIRECTION]\u306B\u306F\u3084\u3055[SPEED]\u3067[ANGLE]\u3069\u307E\u308F\u3059",
  "toio.moveTo": "[MAT_ICON]x\u3056\u3072\u3087\u3046[X]\u3001y\u3056\u3072\u3087\u3046[Y]\u3078\u306F\u3084\u3055[SPEED]\u3067\u3046\u3054\u304B\u3059",
  "toio.pointInDirection": "[MAT_ICON][DIRECTION]\u3069\u306B\u306F\u3084\u3055[SPEED]\u3067\u3080\u3051\u308B",
  "toio.stateTypeMenu.x": "[MAT_ICON]x\u3056\u3072\u3087\u3046",
  "toio.stateTypeMenu.y": "[MAT_ICON]y\u3056\u3072\u3087\u3046",
  "toio.stateTypeMenu.direction": "[MAT_ICON]\u3080\u304D",
  "toio.moveToOnGrid": "[MAT_ICON]\u308C\u3064[COLUMN]\u3001\u304E\u3087\u3046[ROW]\u306E\u30DE\u30B9\u3078\u306F\u3084\u3055[SPEED]\u3067\u3046\u3054\u304B\u3059",
  "toio.getColumnOrRowIndex": "\u30DE\u30B9\u306E[MAT_AXES]\u3070\u3093\u3054\u3046",
  "toio.getColumnOrRowIndexMenu.column": "\u308C\u3064",
  "toio.getColumnOrRowIndexMenu.row": "\u304E\u3087\u3046",
  "toio.getColumnIndex": "[MAT_ICON]\u30DE\u30B9\u306E\u308C\u3064\u3070\u3093\u3054\u3046",
  "toio.getRowIndex": "[MAT_ICON]\u30DE\u30B9\u306E\u304E\u3087\u3046\u3070\u3093\u3054\u3046",
  "toio.whenGridTouched": "[MAT_ICON]\u308C\u3064[COLUMN]\u3001\u304E\u3087\u3046[ROW]\u306E\u30DE\u30B9\u306B\u3075\u308C\u305F\u3068\u304D",
  "toio.isGridTouched": "[MAT_ICON]\u308C\u3064[COLUMN]\u3001\u304E\u3087\u3046[ROW]\u306E\u30DE\u30B9\u306B\u3075\u308C\u3066\u3044\u308B",
  "toio.whenTouched": "[MAT_CARD_ICON][TYPE]\u306B\u3075\u308C\u305F\u3068\u304D",
  "toio.isTouched": "[MAT_CARD_ICON][TYPE]\u306B\u3075\u308C\u3066\u3044\u308B",
  "toio.getTouchedSimpleCard": "[CARD_ICON]\u3075\u308C\u3066\u3044\u308B\u304B\u3093\u3044\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.mat": "\u30DE\u30C3\u30C8",
  "toio.whenTouchedMenu.frontCard": "\u307E\u3048\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.backCard": "\u3046\u3057\u308D\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.leftCard": "\u3072\u3060\u308A\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.rightCard": "\u307F\u304E\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.goCard": "Go\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.typhoonCard": "\u30BF\u30A4\u30D5\u30FC\u30F3\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.rushCard": "\u30E9\u30C3\u30B7\u30E5\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.autoTackleCard": "\u30AA\u30FC\u30C8\u30BF\u30C3\u30AF\u30EB\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.randomCard": "\u30E9\u30F3\u30C0\u30E0\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.pushPowerUpCard": "\u30C4\u30AD\u30D1\u30EF\u30FC\u30A2\u30C3\u30D7\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.strutPowerUpCard": "\u30CF\u30EA\u30C6\u30D1\u30EF\u30FC\u30A2\u30C3\u30D7\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.sideAttackCard": "\u30B5\u30A4\u30C9\u30A2\u30BF\u30C3\u30AF\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.easyModeCard": "\u30A4\u30FC\u30B8\u30FC\u30E2\u30FC\u30C9\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.anyCard": "\u3069\u308C\u304B\u306E\u30C8\u30A4\u30AA\u30FB\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3\u30AB\u30FC\u30C9",
  "toio.whenTouchedMenu.spinSticker": "\u30B9\u30D4\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.shockSticker": "\u30B7\u30E7\u30C3\u30AF\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.wobbleSticker": "\u3075\u3089\u3064\u304D\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.panicSticker": "\u30D1\u30CB\u30C3\u30AF\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.speedUpSticker": "\u30B9\u30D4\u30FC\u30C9\u30A2\u30C3\u30D7\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.speedDownSticker": "\u30B9\u30D4\u30FC\u30C9\u30C0\u30A6\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.anySticker": "\u3069\u308C\u304B\u306E\u30C8\u30A4\u30AA\u30FB\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3\u30B7\u30FC\u30EB",
  "toio.whenTouchedMenu.whiteCell": "\u3057\u308D\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.redCell": "\u3042\u304B\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.greenCell": "\u307F\u3069\u308A\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.yellowCell": "\u304D\u3044\u308D\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.blueCell": "\u3042\u304A\u306E\u30DE\u30B9",
  "toio.whenTouchedMenu.anyNumber": "\u3069\u308C\u304B\u306E\u3059\u3046\u3058",
  "toio.whenTouchedMenu.anyAlphabet": "\u3069\u308C\u304B\u306E\u30A2\u30EB\u30D5\u30A1\u30D9\u30C3\u30C8",
  "toio.whenTouchedMenu.anySymbol": "\u3069\u308C\u304B\u306E\u304D\u3054\u3046",
  "toio.whenTouchedMenu.anySimpleCard": "\u3069\u308C\u304B\u306E\u304B\u3093\u3044\u30AB\u30FC\u30C9",
  "toio.moveFor": "[DIRECTION]\u306B\u306F\u3084\u3055[SPEED]\u3067[WATCH_ICON][DURATION]\u3073\u3087\u3046\u3046\u3054\u304B\u3059",
  "toio.moveForMenu.forward": "\u307E\u3048",
  "toio.moveForMenu.backward": "\u3046\u3057\u308D",
  "toio.rotateFor": "[DIRECTION]\u306B\u306F\u3084\u3055[SPEED]\u3067[WATCH_ICON][DURATION]\u3073\u3087\u3046\u307E\u308F\u3059",
  "toio.rotateForMenu.left": "\u3072\u3060\u308A",
  "toio.rotateForMenu.right": "\u307F\u304E",
  "toio.moveWheelsFor": "\u3072\u3060\u308A\u30BF\u30A4\u30E4\u3092\u306F\u3084\u3055[LEFT_SPEED]\u3001\u307F\u304E\u30BF\u30A4\u30E4\u3092\u306F\u3084\u3055[RIGHT_SPEED]\u3067[WATCH_ICON][DURATION]\u3073\u3087\u3046\u3046\u3054\u304B\u3059",
  "toio.stopWheels": "\u30BF\u30A4\u30E4\u3092\u3068\u3081\u308B",
  "toio.setLightColorFor": "\u30E9\u30F3\u30D7\u306E\u3044\u308D[COLOR]\u3092[WATCH_ICON][DURATION]\u3073\u3087\u3046\u3064\u3051\u308B",
  "toio.turnOffLight": "\u30E9\u30F3\u30D7\u3092\u3051\u3059",
  "toio.playNoteFor": "\u304A\u3068[NOTE]\u3092[WATCH_ICON][DURATION]\u3073\u3087\u3046\u306A\u3089\u3059",
  "toio.stopNote": "\u304A\u3068\u3092\u3068\u3081\u308B",
  "toio.whenMagnetDetected": "[MAGNET_STATE]\u306B\u3075\u308C\u305F\u3068\u304D",
  "toio.isMagnetDetected": "[MAGNET_STATE]\u306B\u3075\u308C\u3066\u3044\u308B",
  "toio.magnetState.nCenter": "N\u304D\u3087\u304F \u307E\u3093\u306A\u304B",
  "toio.magnetState.nRight": "N\u304D\u3087\u304F \u307F\u304E",
  "toio.magnetState.nLeft": "N\u304D\u3087\u304F \u3072\u3060\u308A",
  "toio.magnetState.sCenter": "S\u304D\u3087\u304F \u307E\u3093\u306A\u304B",
  "toio.magnetState.sRight": "S\u304D\u3087\u304F \u307F\u304E",
  "toio.magnetState.sLeft": "S\u304D\u3087\u304F \u3072\u3060\u308A",
  "toio.magnetState.anyN": "\u3069\u308C\u304B\u306EN\u304D\u3087\u304F",
  "toio.magnetState.anyS": "\u3069\u308C\u304B\u306ES\u304D\u3087\u304F",
  "toio.magnetState.any": "\u3069\u308C\u304B\u306E\u3058\u3057\u3083\u304F",
  "toio.getStateValue": "[STATE_VALUES]",
  "toio.infos.batteryLevel": "\u3067\u3093\u3061\u3056\u3093\u308A\u3087\u3046",
  "toio.infos.peripheralName": "\u305B\u3064\u305E\u304F\u3061\u3085\u3046\u306E\u30AD\u30E5\u30FC\u30D6\u3081\u3044",
  "toio.infos.postureRoll": "\u3057\u305B\u3044\u304B\u304F \u30ED\u30FC\u30EB",
  "toio.infos.posturePitch": "\u3057\u305B\u3044\u304B\u304F \u30D4\u30C3\u30C1",
  "toio.infos.postureYaw": "\u3057\u305B\u3044\u304B\u304F \u30E8\u30FC",
  "toio.infos.postureValue": "\u3057\u305B\u3044\u3051\u3093\u3057\u3085\u3064",
  "toio.whenButtonPressed": "\u30DC\u30BF\u30F3\u304C\u304A\u3055\u308C\u305F\u3068\u304D",
  "toio.isButtonPressed": "\u30DC\u30BF\u30F3\u304C\u304A\u3055\u308C\u3066\u3044\u308B",
  "toio.whenStateChanged": "[CHANGED_STATE]",
  "toio.isStateChanged": "[CHANGED_STATE]",
  "toio.infos.buttonPressed": "\u30DC\u30BF\u30F3\u304C\u304A\u3055\u308C\u305F",
  "toio.infos.cubeConnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u305B\u3064\u305E\u304F\u3055\u308C\u305F",
  "toio.infos.cubeDisconnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u305B\u3064\u3060\u3093\u3055\u308C\u305F",
  "toio.infos.collisionDetected": "\u3057\u3087\u3046\u3068\u3064\u3092\u3051\u3093\u3057\u3085\u3064\u3057\u305F",
  "toio.infos.isButtonPressed": "\u30DC\u30BF\u30F3\u304C\u304A\u3055\u308C\u3066\u3044\u308B",
  "toio.infos.isCubeConnected": "\u30AD\u30E5\u30FC\u30D6\u304C\u305B\u3064\u305E\u304F\u3055\u308C\u3066\u3044\u308B",
  "toio.infos.isCollisionDetected": "\u3057\u3087\u3046\u3068\u3064\u3092\u3051\u3093\u3057\u3085\u3064\u3057\u3066\u3044\u308B",
  "toio.assets.toioCoreCube": "\u30AD\u30E5\u30FC\u30D6",
  "toio.assets.toioCollection.playMat.ring": "\u30DE\u30C3\u30C8[\u3069\u3072\u3087\u3046]",
  "toio.assets.toioCollection.playMat.tiled": "\u30DE\u30C3\u30C8[\u30DE\u30B9]",
  "toio.assets.toioCollection.playMat.ringPale": "\u30DE\u30C3\u30C8[\u3069\u3072\u3087\u3046](\u3046\u3059\u3044)",
  "toio.assets.toioCollection.playMat.tiledPale": "\u30DE\u30C3\u30C8[\u30DE\u30B9](\u3046\u3059\u3044)",
  "toio.assets.toioCollection.playMat.frame": "\u30DE\u30C3\u30C8[\u308F\u304F]",
  "toio.assets.toioCollection.playMat.grid": "\u30DE\u30C3\u30C8[\u307B\u3046\u304C\u3093]",
  "toio.assets.toioCoreCube.simplePlayMat": "\u304B\u3093\u3044\u30DE\u30C3\u30C8",
  "toio.assets.toioCollection.car": "\u304F\u308B\u307E",
  "toio.assets.toioCoreCube.topView": "\u30AD\u30E5\u30FC\u30D6",
  "toio.assets.toioCoreCube.topViewWithPlate": "\u30AD\u30E5\u30FC\u30D6 (\u30D7\u30EC\u30FC\u30C8\u3064\u304D)"
};
var translationsEn = {
  "extension.name": "toio",
  "extension.nameGui": "toio Core Cube",
  "extension.description": "Build mobile robot with coordinates.",
  "extension2.name": "toio #2",
  "extension2.nameGui": "toio Core Cube #2 for Dev",
  "extension2.description": "Pair and control 2nd Core Cube.",
  "extension.collaborator": "Sony Interactive Entertainment Inc.",
  "extension.connecting": "Connecting",
  "toio.about": "About",
  "toio.help": "Help",
  "toio.connect": "Connect",
  "toio.checkLinkApp": "Click to check an instruction",
  "toio.punctuation": ".",
  "toio.moveSteps": "[MAT_ICON] move [DIRECTION] at [SPEED] speed [STEP_ICON] [STEPS] steps",
  "toio.rotateBy": "[MAT_ICON] rotate [DIRECTION] at [SPEED] speed by [ANGLE]",
  "toio.moveTo": "[MAT_ICON] move to x: [X] y: [Y] at [SPEED] speed",
  "toio.pointInDirection": "[MAT_ICON] point in direction [DIRECTION] at [SPEED] speed",
  "toio.stateTypeMenu.x": "[MAT_ICON] x position",
  "toio.stateTypeMenu.y": "[MAT_ICON] y position",
  "toio.stateTypeMenu.direction": "[MAT_ICON] direction",
  "toio.moveToOnGrid": "[MAT_ICON] move to column: [COLUMN] row: [ROW] at [SPEED] speed",
  "toio.getColumnOrRowIndex": "[MAT_AXES] index on grid",
  "toio.getColumnOrRowIndexMenu.column": "column",
  "toio.getColumnOrRowIndexMenu.row": "row",
  "toio.getColumnIndex": "[MAT_ICON] column index on grid",
  "toio.getRowIndex": "[MAT_ICON] row index on grid",
  "toio.whenGridTouched": "[MAT_ICON] when column: [COLUMN] row: [ROW] touched",
  "toio.isGridTouched": "[MAT_ICON] touching column: [COLUMN] row: [ROW]?",
  "toio.whenTouched": "[MAT_CARD_ICON] when [TYPE] touched",
  "toio.isTouched": "[MAT_CARD_ICON] touching [TYPE]?",
  "toio.getTouchedSimpleCard": "[CARD_ICON] touching simple card",
  "toio.whenTouchedMenu.mat": "mat",
  "toio.whenTouchedMenu.frontCard": "front card",
  "toio.whenTouchedMenu.backCard": "back card",
  "toio.whenTouchedMenu.leftCard": "left card",
  "toio.whenTouchedMenu.rightCard": "right card",
  "toio.whenTouchedMenu.goCard": "go card",
  "toio.whenTouchedMenu.typhoonCard": "typhoon card",
  "toio.whenTouchedMenu.rushCard": "rush card",
  "toio.whenTouchedMenu.autoTackleCard": "auto tackle card",
  "toio.whenTouchedMenu.randomCard": "random card",
  "toio.whenTouchedMenu.pushPowerUpCard": "push power up card",
  "toio.whenTouchedMenu.strutPowerUpCard": "strut power up card",
  "toio.whenTouchedMenu.sideAttackCard": "side attack card",
  "toio.whenTouchedMenu.easyModeCard": "easy mode card",
  "toio.whenTouchedMenu.anyCard": "any toio Collection card",
  "toio.whenTouchedMenu.spinSticker": "spin sticker",
  "toio.whenTouchedMenu.shockSticker": "shock sticker",
  "toio.whenTouchedMenu.wobbleSticker": "wobble sticker",
  "toio.whenTouchedMenu.panicSticker": "panic sticker",
  "toio.whenTouchedMenu.speedUpSticker": "speed up sticker",
  "toio.whenTouchedMenu.speedDownSticker": "speed down sticker",
  "toio.whenTouchedMenu.anySticker": "any toio Collection sticker",
  "toio.whenTouchedMenu.whiteCell": "white cell",
  "toio.whenTouchedMenu.redCell": "red cell",
  "toio.whenTouchedMenu.greenCell": "green cell",
  "toio.whenTouchedMenu.yellowCell": "yellow cell",
  "toio.whenTouchedMenu.blueCell": "blue cell",
  "toio.whenTouchedMenu.anyNumber": "any number",
  "toio.whenTouchedMenu.anyAlphabet": "any alphabet",
  "toio.whenTouchedMenu.anySymbol": "any symbol",
  "toio.whenTouchedMenu.anySimpleCard": "any simple card",
  "toio.moveFor": "move [DIRECTION] at [SPEED] speed for [WATCH_ICON] [DURATION] seconds",
  "toio.moveForMenu.forward": "forward",
  "toio.moveForMenu.backward": "backward",
  "toio.rotateFor": "rotate [DIRECTION] at [SPEED] speed for [WATCH_ICON] [DURATION] seconds",
  "toio.rotateForMenu.left": "left",
  "toio.rotateForMenu.right": "right",
  "toio.moveWheelsFor": "move left wheel forward at [LEFT_SPEED] speed and right wheel forward at [RIGHT_SPEED] speed for [WATCH_ICON] [DURATION] seconds",
  "toio.stopWheels": "stop wheels",
  "toio.setLightColorFor": "set light color to [COLOR] for [WATCH_ICON] [DURATION] seconds",
  "toio.turnOffLight": "turn off light",
  "toio.playNoteFor": "play note [NOTE] for [WATCH_ICON] [DURATION] seconds",
  "toio.stopNote": "stop note",
  "toio.whenMagnetDetected": "when [MAGNET_STATE] touched",
  "toio.isMagnetDetected": "touching [MAGNET_STATE]?",
  "toio.magnetState.nCenter": "center of north pole",
  "toio.magnetState.nRight": "right of north pole",
  "toio.magnetState.nLeft": "left of north pole",
  "toio.magnetState.sCenter": "center of south pole",
  "toio.magnetState.sRight": "right of south pole",
  "toio.magnetState.sLeft": "left of south pole",
  "toio.magnetState.anyN": "any north pole",
  "toio.magnetState.anyS": "any south pole",
  "toio.magnetState.any": "any magnet",
  "toio.getStateValue": "[STATE_VALUES]",
  "toio.infos.batteryLevel": "battery level",
  "toio.infos.peripheralName": "connected cube name",
  "toio.infos.postureRoll": "posture roll",
  "toio.infos.posturePitch": "posture pitch",
  "toio.infos.postureYaw": "posture yaw",
  "toio.infos.postureValue": "posture value",
  "toio.whenButtonPressed": "when button pressed",
  "toio.isButtonPressed": "button pressed?",
  "toio.whenStateChanged": "[CHANGED_STATE]",
  "toio.isStateChanged": "[CHANGED_STATE]",
  "toio.infos.buttonPressed": "button pressed",
  "toio.infos.cubeConnected": "cube connected",
  "toio.infos.cubeDisconnected": "cube disconnected",
  "toio.infos.collisionDetected": "collision detected",
  "toio.infos.isButtonPressed": "button pressed?",
  "toio.infos.isCubeConnected": "cube connected?",
  "toio.infos.isCollisionDetected": "collision detected?",
  "toio.assets.toioCoreCube": "cube",
  "toio.assets.toioCollection.playMat.ring": "mat [ring]",
  "toio.assets.toioCollection.playMat.tiled": "mat [tiled]",
  "toio.assets.toioCollection.playMat.ringPale": "mat [ring](pale)",
  "toio.assets.toioCollection.playMat.tiledPale": "mat [tiled](pale)",
  "toio.assets.toioCollection.playMat.frame": "mat [frame]",
  "toio.assets.toioCollection.playMat.grid": "mat [grid]",
  "toio.assets.toioCoreCube.simplePlayMat": "simple mat",
  "toio.assets.toioCollection.car": "car",
  "toio.assets.toioCoreCube.topView": "cube",
  "toio.assets.toioCoreCube.topViewWithPlate": "cube (with plate)"
};
var zhCn = {
  "extension.name": "toio",
  "extension.nameGui": "toio\u6838\u5FC3Q\u5B9D",
  "extension.description": "\u4F7F\u7528\u5750\u6807\u6765\u79FB\u52A8\u673A\u5668\u4EBA\u3002",
  "extension2.name": "toio #2",
  "extension2.nameGui": "\u7B2C\u4E8C\u4E2Atoio\u6838\u5FC3Q\u5B9D (\u5F00\u53D1\u8005\u7248)",
  "extension2.description": "\u8FD0\u884C\u7B2C\u4E8C\u4E2A\u6838\u5FC3Q\u5B9D\u3002\u203B\u6839\u636E\u73AF\u5883\u4E0D\u540C\uFF0C\u6838\u5FC3Q\u5B9D\u6709\u53EF\u80FD\u4E0D\u80FD\u542F\u52A8\u3002\u4E0D\u80FD\u4FDD\u8BC1\u672A\u6765\u7684\u517C\u5BB9\u6027\u3002",
  "extension.collaborator": "Sony Interactive Entertainment Inc.",
  "extension.connecting": "\u8FDE\u63A5",
  "toio.about": "\u5173\u4E8E\u672C\u7F51\u7AD9",
  "toio.help": "\u5E2E\u52A9",
  "toio.connect": "\u8FDE\u63A5",
  "toio.checkLinkApp": "\u67E5\u770B\u7F51\u7AD9\u7684\u8BBE\u7F6E\u8BF4\u660E",
  "toio.punctuation": "\u3002",
  "toio.moveSteps": "[MAT_ICON]\u5411[DIRECTION]\u4EE5[SPEED]\u901F\u5EA6\u79FB\u52A8[STEP_ICON][STEPS]\u6B69",
  "toio.rotateBy": "[MAT_ICON]\u5411[DIRECTION]\u4EE5[SPEED]\u901F\u5EA6\u8F6C\u5411[ANGLE]\u5EA6",
  "toio.moveTo": "[MAT_ICON]\u5411x\u5750\u6807[X]\u3001y\u5750\u6807[Y]\u4EE5[SPEED]\u901F\u5EA6\u79FB\u52A8",
  "toio.pointInDirection": "[MAT_ICON]\u4EE5[SPEED]\u901F\u5EA6\u8F6C\u5411[DIRECTION]\u65B9\u5411",
  "toio.stateTypeMenu.x": "[MAT_ICON]x\u5750\u6807",
  "toio.stateTypeMenu.y": "[MAT_ICON]y\u5750\u6807",
  "toio.stateTypeMenu.direction": "[MAT_ICON]\u65B9\u5411",
  "toio.moveToOnGrid": "[MAT_ICON]\u5411\u683C\u5B50\u5217[COLUMN]\u3001\u884C[ROW]\u4EE5[SPEED]\u901F\u5EA6\u79FB\u52A8",
  "toio.getColumnOrRowIndex": "\u683C\u5B50\u7684[MAT_AXES]\u5E8F\u53F7",
  "toio.getColumnOrRowIndexMenu.column": "\u5217",
  "toio.getColumnOrRowIndexMenu.row": "\u884C",
  "toio.getColumnIndex": "[MAT_ICON]\u683C\u5B50\u7684\u5217\u5E8F\u53F7",
  "toio.getRowIndex": "[MAT_ICON]\u683C\u5B50\u7684\u884C\u5E8F\u53F7",
  "toio.whenGridTouched": "[MAT_ICON]\u5F53\u78B0\u5230\u683C\u5B50\u5217[COLUMN]\u3001\u884C[ROW]",
  "toio.isGridTouched": "[MAT_ICON]\u78B0\u5230\u683C\u5B50\u5217[COLUMN]\u3001\u884C[ROW]?",
  "toio.whenTouched": "[MAT_CARD_ICON]\u5F53\u78B0\u5230[TYPE]",
  "toio.isTouched": "[MAT_CARD_ICON]\u78B0\u5230[TYPE]?",
  "toio.getTouchedSimpleCard": "[CARD_ICON]\u78B0\u5230\u7B80\u6613\u5361\u7247",
  "toio.whenTouchedMenu.mat": "\u64CD\u4F5C\u57AB",
  "toio.whenTouchedMenu.frontCard": "\u5411\u524D\u5361\u7247",
  "toio.whenTouchedMenu.backCard": "\u5411\u540E\u5361\u7247",
  "toio.whenTouchedMenu.leftCard": "\u5411\u5DE6\u5361\u7247",
  "toio.whenTouchedMenu.rightCard": "\u5411\u53F3\u5361\u7247",
  "toio.whenTouchedMenu.goCard": "Go\u5361\u7247",
  "toio.whenTouchedMenu.typhoonCard": "\u65CB\u98CE\u5361\u7247",
  "toio.whenTouchedMenu.rushCard": "\u7A81\u8FDB\u8FDE\u6233\u5361\u7247",
  "toio.whenTouchedMenu.autoTackleCard": "\u81EA\u52A8\u51B2\u649E\u5361\u7247",
  "toio.whenTouchedMenu.randomCard": "\u81EA\u7531\u8FDB\u653B\u5361\u7247",
  "toio.whenTouchedMenu.pushPowerUpCard": "\u5F3A\u529B\u6233\u51FB\u5361\u7247",
  "toio.whenTouchedMenu.strutPowerUpCard": "\u5F3A\u529B\u6A2A\u626B\u5361\u7247",
  "toio.whenTouchedMenu.sideAttackCard": "\u4FA7\u51FB\u5361\u7247",
  "toio.whenTouchedMenu.easyModeCard": "\u7B80\u6613\u6A21\u5F0F\u5361\u7247",
  "toio.whenTouchedMenu.anyCard": "\u4EFB\u610F\u7B56\u7565\u7ADE\u6280\u573A\u5361\u7247",
  "toio.whenTouchedMenu.spinSticker": "\u65CB\u8F6C\u8D34\u7EB8",
  "toio.whenTouchedMenu.shockSticker": "\u9707\u60CA\u8D34\u7EB8",
  "toio.whenTouchedMenu.wobbleSticker": "\u6447\u6446\u8D34\u7EB8",
  "toio.whenTouchedMenu.panicSticker": "\u60CA\u614C\u8D34\u7EB8",
  "toio.whenTouchedMenu.speedUpSticker": "\u52A0\u901F\u8D34\u7EB8",
  "toio.whenTouchedMenu.speedDownSticker": "\u51CF\u901F\u8D34\u7EB8",
  "toio.whenTouchedMenu.anySticker": "\u4EFB\u610F\u7B56\u7565\u7ADE\u6280\u573A\u8D34\u7EB8",
  "toio.whenTouchedMenu.whiteCell": "\u767D\u8272\u683C\u5B50",
  "toio.whenTouchedMenu.redCell": "\u7EA2\u8272\u683C\u5B50",
  "toio.whenTouchedMenu.greenCell": "\u7EFF\u8272\u683C\u5B50",
  "toio.whenTouchedMenu.yellowCell": "\u9EC4\u8272\u683C\u5B50",
  "toio.whenTouchedMenu.blueCell": "\u84DD\u8272\u683C\u5B50",
  "toio.whenTouchedMenu.anyNumber": "\u4EFB\u610F\u6570\u5B57",
  "toio.whenTouchedMenu.anyAlphabet": "\u4EFB\u610F\u82F1\u6587\u5B57\u6BCD",
  "toio.whenTouchedMenu.anySymbol": "\u4EFB\u610F\u7B26\u53F7",
  "toio.whenTouchedMenu.anySimpleCard": "\u4EFB\u610F\u7B80\u6613\u5361\u7247",
  "toio.moveFor": "\u5411[DIRECTION]\u4EE5[SPEED]\u901F\u5EA6\u79FB\u52A8[WATCH_ICON][DURATION]\u79D2",
  "toio.moveForMenu.forward": "\u524D",
  "toio.moveForMenu.backward": "\u540E",
  "toio.rotateFor": "\u5411[DIRECTION]\u4EE5[SPEED]\u901F\u5EA6\u8F6C\u5411[WATCH_ICON][DURATION]\u79D2",
  "toio.rotateForMenu.left": "\u5DE6",
  "toio.rotateForMenu.right": "\u53F3",
  "toio.moveWheelsFor": "\u5DE6\u8F6E\u4EE5[LEFT_SPEED]\u901F\u5EA6\u3001\u53F3\u8F6E\u4EE5[RIGHT_SPEED]\u901F\u5EA6\u79FB\u52A8[WATCH_ICON][DURATION]\u79D2",
  "toio.stopWheels": "\u505C\u4E0B\u8F6E\u5B50",
  "toio.setLightColorFor": "\u8BBE\u7F6E\u989C\u8272[COLOR]\u70B9\u4EAE\u706F[WATCH_ICON][DURATION]\u79D2",
  "toio.turnOffLight": "\u5173\u95ED\u706F",
  "toio.playNoteFor": "\u9E23\u7B1B[NOTE]\u6301\u7EED[WATCH_ICON][DURATION]\u79D2",
  "toio.stopNote": "\u505C\u6B62\u9E23\u7B1B",
  "toio.whenMagnetDetected": "\u5F53\u78B0\u5230[MAGNET_STATE]",
  "toio.isMagnetDetected": "\u78B0\u5230[MAGNET_STATE]?",
  "toio.magnetState.nCenter": "N\u6781 \u4E2D\u592E",
  "toio.magnetState.nRight": "N\u6781 \u53F3",
  "toio.magnetState.nLeft": "N\u6781 \u5DE6",
  "toio.magnetState.sCenter": "S\u6781 \u4E2D\u592E",
  "toio.magnetState.sRight": "S\u6781 \u53F3",
  "toio.magnetState.sLeft": "S\u6781 \u5DE6",
  "toio.magnetState.anyN": "\u4EFB\u610FN\u6781",
  "toio.magnetState.anyS": "\u4EFB\u610FS\u6781",
  "toio.magnetState.any": "\u4EFB\u610F\u78C1\u94C1",
  "toio.getStateValue": "[STATE_VALUES]",
  "toio.infos.batteryLevel": "\u7535\u6C60\u7535\u91CF",
  "toio.infos.peripheralName": "\u6838\u5FC3Q\u5B9D\u7684\u540D\u79F0",
  "toio.infos.postureRoll": "\u6001\u5EA6\u89D2 \u6446\u52A8",
  "toio.infos.posturePitch": "\u6001\u5EA6\u89D2 \u503E\u659C",
  "toio.infos.postureYaw": "\u6001\u5EA6\u89D2 \u504F\u822A",
  "toio.infos.postureValue": "\u59FF\u6001\u68C0\u6D4B",
  "toio.whenButtonPressed": "\u5F53\u6309\u4E0B\u6309\u94AE",
  "toio.isButtonPressed": "\u6309\u4E0B\u6309\u94AE?",
  "toio.whenStateChanged": "[CHANGED_STATE]",
  "toio.isStateChanged": "[CHANGED_STATE]",
  "toio.infos.buttonPressed": "\u6309\u4E0B\u6309\u94AE",
  "toio.infos.cubeConnected": "\u6838\u5FC3Q\u5B9D\u8FDE\u63A5",
  "toio.infos.cubeDisconnected": "\u6838\u5FC3Q\u5B9D\u65AD\u5F00\u8FDE\u63A5",
  "toio.infos.collisionDetected": "\u68C0\u6D4B\u5230\u78B0\u649E",
  "toio.infos.isButtonPressed": "\u6309\u4E0B\u6309\u94AE?",
  "toio.infos.isCubeConnected": "\u6838\u5FC3Q\u5B9D\u8FDE\u63A5?",
  "toio.infos.isCollisionDetected": "\u68C0\u6D4B\u78B0\u649E?",
  "toio.assets.toioCoreCube": "\u6838\u5FC3Q\u5B9D",
  "toio.assets.toioCollection.playMat.ring": "\u64CD\u4F5C\u57AB[\u64C2\u53F0]",
  "toio.assets.toioCollection.playMat.tiled": "\u64CD\u4F5C\u57AB[\u5F69\u8272\u65B9\u683C]",
  "toio.assets.toioCollection.playMat.ringPale": "\u64CD\u4F5C\u57AB[\u64C2\u53F0](\u6D45\u8272)",
  "toio.assets.toioCollection.playMat.tiledPale": "\u64CD\u4F5C\u57AB[\u5F69\u8272\u65B9\u683C](\u6D45\u8272)",
  "toio.assets.toioCollection.playMat.gesun": "\u64CD\u4F5C\u57AB[\u5DE5\u4F5C\u751F\u7269]",
  "toio.assets.toioCollection.playMat.gesunPale": "\u64CD\u4F5C\u57AB[\u5DE5\u4F5C\u751F\u7269](\u6D45\u8272)",
  "toio.assets.toioCollection.playMat.frame": "\u64CD\u4F5C\u57AB[\u6846\u67B6]",
  "toio.assets.toioCollection.playMat.grid": "\u64CD\u4F5C\u57AB[\u7F51\u683C]",
  "toio.assets.toioCoreCube.simplePlayMat": "\u7B80\u6613\u64CD\u4F5C\u57AB",
  "toio.assets.toioCollection.car": "\u6C7D\u8F66",
  "toio.assets.toioCoreCube.topView": "\u6838\u5FC3Q\u5B9D",
  "toio.assets.toioCoreCube.topViewWithPlate": "\u6838\u5FC3Q\u5B9D (\u5E26\u9876\u76D6)"
};
class Translations {
  constructor() {
    __publicField(this, "locale", "ja");
    formatMessage.setup({
      locale: this.locale,
      translations: {
        ja: { ...ja },
        "ja-Hira": { ...jaHira },
        en: { ...translationsEn },
        "zh-cn": { ...zhCn }
      }
    });
  }
  updateLocale() {
    const locale = this.getScratchLocale() || window.navigator.language;
    if (!locale) {
      return;
    }
    this.setLocale(locale);
  }
  getScratchLocale() {
    const element = document.body.querySelectorAll('select[class^="language-selector"]')[0];
    if (!element) {
      return;
    }
    return element.value;
  }
  setLocale(locale) {
    if (this.locale === locale) {
      return;
    }
    this.locale = locale;
    formatMessage.setup({ locale });
  }
  label(id) {
    return formatMessage(id);
  }
}
const translations = new Translations();
var matIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fS5jbHMtMntmaWxsOiM1YzUxNDI7fS5jbHMtM3tmaWxsOiNmZmIyYjI7fS5jbHMtNHtmaWxsOiNkY2VlYzU7fS5jbHMtNXtmaWxsOiNmZWY4YTY7fS5jbHMtNntmaWxsOiNiZWU2ZjY7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEzLjg2LDE1LjA1SDIuMTRBMS4xOSwxLjE5LDAsMCwxLDEsMTMuODZWMi4xNEExLjE5LDEuMTksMCwwLDEsMi4xNCwxSDEzLjg2YTEuMTksMS4xOSwwLDAsMSwxLjE5LDEuMTlWMTMuODZhMS4xOSwxLjE5LDAsMCwxLTEuMTksMS4xOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzLjg2LDE1LjVIMi4xNEExLjY1LDEuNjUsMCwwLDEsLjUsMTMuODZWMi4xNEExLjY1LDEuNjUsMCwwLDEsMi4xNC41SDEzLjg2QTEuNjUsMS42NSwwLDAsMSwxNS41LDIuMTRWMTMuODZBMS42NSwxLjY1LDAsMCwxLDEzLjg2LDE1LjVaTTIuMTQsMS40YS43NC43NCwwLDAsMC0uNzQuNzRWMTMuODZhLjc0Ljc0LDAsMCwwLC43NC43NEgxMy44NmEuNzQuNzQsMCwwLDAsLjc0LS43NFYyLjE0YS43NC43NCwwLDAsMC0uNzQtLjc0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTMiIHBvaW50cz0iNy4yOSA3Ljc1IDQuNTYgNy43NSA0LjU2IDEwLjQ4IDcuMjkgMTAuNDggNy4yOSA3Ljc1Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSIxMC40NiA0LjU4IDcuNzMgNC41OCA3LjczIDcuMzEgMTAuNDYgNy4zMSAxMC40NiA0LjU4Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSI0LjA3IDEwLjk3IDEuMzQgMTAuOTcgMS4zNCAxMy43IDQuMDcgMTMuNyA0LjA3IDEwLjk3Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSIxMy42NiA3Ljc1IDEwLjkzIDcuNzUgMTAuOTMgMTAuNDggMTMuNjYgMTAuNDggMTMuNjYgNy43NSIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTUiIHBvaW50cz0iNy4yOSAxLjMgNC41NiAxLjMgNC41NiA0LjAzIDcuMjkgNC4wMyA3LjI5IDEuMyIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTMiIHBvaW50cz0iMTMuNjYgMS4zIDEwLjkzIDEuMyAxMC45MyA0LjAzIDEzLjY2IDQuMDMgMTMuNjYgMS4zIi8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxMC40NiAxMC45NyA3LjczIDEwLjk3IDcuNzMgMTMuNyAxMC40NiAxMy43IDEwLjQ2IDEwLjk3Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI0LjA3IDQuNTggMS4zNCA0LjU4IDEuMzQgNy4zMSA0LjA3IDcuMzEgNC4wNyA0LjU4Ii8+PC9zdmc+";
var cardIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4zOCAxMS4xNiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fS5jbHMtMntmaWxsOiM1YzUxNDI7fTwvc3R5bGU+PC9kZWZzPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iNi42OSIgeT0iMy44NSIgd2lkdGg9IjguMTgiIGhlaWdodD0iOC4xOCIgcng9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4yOCAtNC4yMikgcm90YXRlKDEwLjI4KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEyLjg3LDEyLjg1YTIsMiwwLDAsMS0uMzQsMGwtNS4wOS0uOTNhMS45MiwxLjkyLDAsMCwxLTEuMjMtLjc4QTEuODksMS44OSwwLDAsMSw1LjksOS42OWwuOTMtNS4xQTEuOSwxLjksMCwwLDEsOSwzLjA2TDE0LjEzLDRhMS45MSwxLjkxLDAsMCwxLDEuNTMsMi4yMWwtLjkyLDUuMUExLjkxLDEuOTEsMCwwLDEsMTIuODcsMTIuODVabS0uMi0uODJBMS4xLDEuMSwwLDAsMCwxNCwxMS4xNGwuOTItNS4wOWExLjA4LDEuMDgsMCwwLDAtLjE3LS44MkExLjEsMS4xLDAsMCwwLDE0LDQuNzdsLTUuMS0uOTJhMS4xMSwxLjExLDAsMCwwLTEuMjguODhsLS45Miw1LjFhMS4wOCwxLjA4LDAsMCwwLC4xOC44MiwxLjE0LDEuMTQsMCwwLDAsLjcxLjQ2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMzEgLTIuNDIpIi8+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSI0LjI3IiB5PSIzLjMzIiB3aWR0aD0iOC4zOSIgaGVpZ2h0PSI4LjM5IiByeD0iMS41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS4zNyAtMS4wMykgcm90YXRlKC04Ljg3KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTYuMjEsMTIuNWExLjg2LDEuODYsMCwwLDEtMS4xMS0uMzYsMS45LDEuOSwwLDAsMS0uNzYtMS4yNEwzLjUxLDUuNTdBMS45LDEuOSwwLDAsMSw1LjA5LDMuNGw1LjMzLS44M2ExLjg5LDEuODksMCwwLDEsMS40Mi4zNCwxLjg1LDEuODUsMCwwLDEsLjc1LDEuMjRsLjgzLDUuMzNhMS44NywxLjg3LDAsMCwxLS4zNCwxLjQxLDEuOSwxLjksMCwwLDEtMS4yNC43NmwtNS4zMy44M0ExLjUxLDEuNTEsMCwwLDEsNi4yMSwxMi41Wm00LjUxLTkuMTYtLjE3LDAtNS4zMy44M0ExLjEsMS4xLDAsMCwwLDQuMyw1LjQ0bC44Myw1LjMzYTEuMSwxLjEsMCwwLDAsLjQ0LjcyLDEuMDUsMS4wNSwwLDAsMCwuODIuMmw1LjMzLS44M2ExLjEyLDEuMTIsMCwwLDAsLjcyLS40NCwxLjA5LDEuMDksMCwwLDAsLjE5LS44MkwxMS44LDQuMjdhMS4wNiwxLjA2LDAsMCwwLS40My0uNzFBMS4xMSwxLjExLDAsMCwwLDEwLjcyLDMuMzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4zMSAtMi40MikiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjEuNjkiIHk9IjMuOCIgd2lkdGg9IjguMzkiIGhlaWdodD0iOC4zOSIgcng9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMuNSAxLjUzKSByb3RhdGUoLTI5LjYzKSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTQuODgsMTMuNThhMS45MSwxLjkxLDAsMCwxLTEuNjUtMUwuNTYsNy45M2ExLjksMS45LDAsMCwxLC43MS0yLjU5TDYsMi42N2ExLjksMS45LDAsMCwxLDIuNTkuNzJsMi42Nyw0LjY4YTEuOTMsMS45MywwLDAsMSwuMTgsMS40NSwxLjg3LDEuODcsMCwwLDEtLjksMS4xNEw1LjgyLDEzLjMzQTEuODksMS44OSwwLDAsMSw0Ljg4LDEzLjU4Wm0yLTEwLjM2YTEuMDgsMS4wOCwwLDAsMC0uNTUuMTVMMS42Nyw2YTEuMSwxLjEsMCwwLDAtLjQyLDEuNWwyLjY3LDQuNjlhMS4xLDEuMSwwLDAsMCwxLjUuNDJMMTAuMTEsMTBhMS4xMywxLjEzLDAsMCwwLC41Mi0uNjcsMS4wOSwxLjA5LDAsMCwwLS4xMS0uODNMNy44NSwzLjc4YTEuMTEsMS4xMSwwLDAsMC0uNjYtLjUyQTEuNDUsMS40NSwwLDAsMCw2LjksMy4yMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjMxIC0yLjQyKSIvPjwvc3ZnPg==";
var matCardIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS40IDE0LjgyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzVjNTE0Mjt9LmNscy0ze2ZpbGw6I2ZmYjJiMjt9LmNscy00e2ZpbGw6I2RjZWVjNTt9LmNscy01e2ZpbGw6I2ZlZjhhNjt9LmNscy02e2ZpbGw6I2JlZTZmNjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTAuMzUsMTVIMS41NWEuOS45LDAsMCwxLS45LS45VjUuMjZhLjkuOSwwLDAsMSwuOS0uOWg4LjhhLjkuOSwwLDAsMSwuOS45djguOGEuOS45LDAsMCwxLS45LjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjI1IC0wLjU0KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEwLjM1LDE1LjM2SDEuNTVhMS4zLDEuMywwLDAsMS0xLjMtMS4zVjUuMjZBMS4zLDEuMywwLDAsMSwxLjU1LDRoOC44YTEuMywxLjMsMCwwLDEsMS4zLDEuM3Y4LjhBMS4zLDEuMywwLDAsMSwxMC4zNSwxNS4zNlpNMS41NSw0Ljc2YS41MS41MSwwLDAsMC0uNS41djguOGEuNS41LDAsMCwwLC41LjVoOC44YS41LjUsMCwwLDAsLjUtLjVWNS4yNmEuNS41LDAsMCwwLS41LS41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMjUgLTAuNTQpIi8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSI1LjU0IDkuMzEgMy40OSA5LjMxIDMuNDkgMTEuMzYgNS41NCAxMS4zNiA1LjU0IDkuMzEiLz48cG9seWxpbmUgY2xhc3M9ImNscy00IiBwb2ludHM9IjcuOTIgNi45MyA1Ljg3IDYuOTMgNS44NyA4Ljk4IDcuOTIgOC45OCA3LjkyIDYuOTMiLz48cG9seWxpbmUgY2xhc3M9ImNscy01IiBwb2ludHM9IjMuMTIgMTEuNzMgMS4wNyAxMS43MyAxLjA3IDEzLjc4IDMuMTIgMTMuNzggMy4xMiAxMS43MyIvPjxwb2x5bGluZSBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTAuMzMgOS4zMSA4LjI4IDkuMzEgOC4yOCAxMS4zNiAxMC4zMyAxMS4zNiAxMC4zMyA5LjMxIi8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSI1LjU0IDQuNDYgMy40OSA0LjQ2IDMuNDkgNi41MSA1LjU0IDYuNTEgNS41NCA0LjQ2Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSIxMC4zMyA0LjQ2IDguMjggNC40NiA4LjI4IDYuNTEgMTAuMzMgNi41MSAxMC4zMyA0LjQ2Ii8+PHBvbHlsaW5lIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI3LjkyIDExLjczIDUuODcgMTEuNzMgNS44NyAxMy43OCA3LjkyIDEzLjc4IDcuOTIgMTEuNzMiLz48cG9seWxpbmUgY2xhc3M9ImNscy02IiBwb2ludHM9IjMuMTIgNi45MyAxLjA3IDYuOTMgMS4wNyA4Ljk4IDMuMTIgOC45OCAzLjEyIDYuOTMiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjguNTkiIHk9IjEuODgiIHdpZHRoPSI2LjI4IiBoZWlnaHQ9IjYuMjgiIHJ4PSIxLjUiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTYsIDAuMjcsIC0wLjI3LCAwLjk2LCAxLjUyLCAtMy41KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEyLjg3LDguOTRhMS42OCwxLjY4LDAsMCwxLS41LS4wN2gwTDkuMiw4QTEuOTEsMS45MSwwLDAsMSw3Ljg4LDUuNjVsLjg4LTMuMTZBMS45LDEuOSwwLDAsMSwxMS4xLDEuMTdsMy4xNi44OGExLjg4LDEuODgsMCwwLDEsMS4zMiwyLjM0TDE0LjcsNy41NUExLjksMS45LDAsMCwxLDEyLjg3LDguOTRabS0uMjktLjg0YTEuMSwxLjEsMCwwLDAsMS4zNS0uNzdsLjg4LTMuMTZhMS4wOSwxLjA5LDAsMCwwLS4xLS44MywxLjA3LDEuMDcsMCwwLDAtLjY2LS41MmwtMy4xNi0uODhhMS4xMSwxLjExLDAsMCwwLTEuMzYuNzZMOC42NSw1Ljg2YTEuMTIsMS4xMiwwLDAsMCwuMTEuODQsMS4wNywxLjA3LDAsMCwwLC42Ni41MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjI1IC0wLjU0KSIvPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iNi43NyIgeT0iMS4zMSIgd2lkdGg9IjYuNDUiIGhlaWdodD0iNi40NSIgcng9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNTIgMC4xKSByb3RhdGUoLTMuNikiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik04LjM4LDguMjZhMS45MSwxLjkxLDAsMCwxLTEuOS0xLjc4TDYuMjcsMy4wNUExLjksMS45LDAsMCwxLDguMDUsMUwxMS40OC44MWExLjkyLDEuOTIsMCwwLDEsMiwxLjc4TDEzLjcyLDZhMS45MSwxLjkxLDAsMCwxLTEuNzgsMkw4LjUsOC4yNlpNMTEuNiwxLjYxaC0uMDdMOC4xLDEuODNhMS4wOSwxLjA5LDAsMCwwLS43Ni4zN0ExLDEsMCwwLDAsNy4wNywzbC4yMSwzLjQ0YTEuMDksMS4wOSwwLDAsMCwxLjE3LDFsMy40NC0uMjFhMS4xMSwxLjExLDAsMCwwLDEtMS4xN0wxMi43LDIuNjRBMS4xLDEuMSwwLDAsMCwxMS42LDEuNjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4yNSAtMC41NCkiLz48cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjQuNzYiIHk9IjEuNSIgd2lkdGg9IjYuNDUiIGhlaWdodD0iNi40NSIgcng9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNDkgMy4xNykgcm90YXRlKC0yNC4zNikiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik03LjEzLDguOWExLjkzLDEuOTMsMCwwLDEtLjY3LS4xMiwxLjg2LDEuODYsMCwwLDEtMS4wNi0xTDQsNC42NWExLjkxLDEuOTEsMCwwLDEsLjk1LTIuNTJMOC4wNi43MWExLjkxLDEuOTEsMCwwLDEsMi41MiwxTDEyLDQuOGExLjksMS45LDAsMCwxLS45NSwyLjUxTDcuOTEsOC43M0EyLDIsMCwwLDEsNy4xMyw4LjlaTTguODQsMS4zNGExLDEsMCwwLDAtLjQ1LjFMNS4yNSwyLjg2QTEuMTEsMS4xMSwwLDAsMCw0LjcsNC4zMkw2LjEyLDcuNDVBMS4xLDEuMSwwLDAsMCw3LjU4LDhsMy4xNC0xLjQyYTEuMSwxLjEsMCwwLDAsLjU1LTEuNDVMOS44NSwyQTEuMTEsMS4xMSwwLDAsMCw4Ljg0LDEuMzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4yNSAtMC41NCkiLz48L3N2Zz4=";
var watchIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNC4yOSAxNC4yOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtvcGFjaXR5OjAuNzU7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJjbHMtMSI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOCwuODVBNy4xNSw3LjE1LDAsMSwwLDE1LjE1LDgsNy4xNCw3LjE0LDAsMCwwLDgsLjg1Wm0uOCw4LjYzSDcuMjRMNCw3LjU4LDQuODQsNi4yLDcuMiw3LjZWMi4zNkg4LjhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC44NiAtMC44NSkiLz48L2c+PC9zdmc+";
var stepIcon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNC41NSAxNC45NCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtvcGFjaXR5OjAuNzU7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJjbHMtMSI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNi4xNCw2LjYzYTcuMSw3LjEsMCwwLDEtLjkxLDMuNzMsNS40NCw1LjQ0LDAsMCwwLS4zNCwxLjEybC0zLjU4LjM0QTE2LjcxLDE2LjcxLDAsMCwxLC43NSw3LjMzLDQuMjEsNC4yMSwwLDAsMSwyLjIxLDQuMTJhMi42MywyLjYzLDAsMCwxLDIuMzctLjI0QTMuNDQsMy40NCwwLDAsMSw2LjE0LDYuNjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MiAtMC41MykiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjU5LDEzbDMuMjgtLjMxYTUuMzMsNS4zMywwLDAsMSwwLDIuMDksMS42MSwxLjYxLDAsMCwxLTIuNS4yMUE0LjksNC45LDAsMCwxLDEuNTksMTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MiAtMC41MykiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNSw4LjQySDExLjQzQTQuNSw0LjUsMCwwLDAsMTEsNy4zMyw3LjI3LDcuMjcsMCwwLDEsOS43MywzLjY5LDMuNDEsMy40MSwwLDAsMSwxMSwuODFhMi42MSwyLjYxLDAsMCwxLDIuMzcsMCw0LjE2LDQuMTYsMCwwLDEsMS43NywzLjA2QTE2LjgxLDE2LjgxLDAsMCwxLDE1LDguNDJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC43MiAtMC41MykiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNC44NSw5LjU4SDExLjU2YTUuNDQsNS40NCwwLDAsMCwuMjMsMi4wOSwxLjYsMS42LDAsMCwwLDIuNSwwQTQuNzksNC43OSwwLDAsMCwxNC44NSw5LjU4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNzIgLTAuNTMpIi8+PC9nPjwvc3ZnPg==";
const MAT_ICON = {
  type: argumentType.IMAGE,
  dataURI: matIcon,
  alt: "This is a mat icon",
  flipRTL: false
};
const CARD_ICON = {
  type: argumentType.IMAGE,
  dataURI: cardIcon,
  alt: "This is a card icon",
  flipRTL: false
};
const MAT_CARD_ICON = {
  type: argumentType.IMAGE,
  dataURI: matCardIcon,
  alt: "This is a mat and card icon",
  flipRTL: false
};
const WATCH_ICON = {
  type: argumentType.IMAGE,
  dataURI: watchIcon,
  alt: "This is a watch icon",
  flipRTL: false
};
const STEP_ICON = {
  type: argumentType.IMAGE,
  dataURI: stepIcon,
  alt: "This is a step icon",
  flipRTL: false
};
const MoveForBlock = {
  info: () => ({
    opcode: "moveFor",
    blockType: blockType.COMMAND,
    text: translations.label("toio.moveFor"),
    arguments: {
      DIRECTION: {
        type: argumentType.STRING,
        menu: "moveDirections",
        defaultValue: "forward"
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 50
      },
      WATCH_ICON,
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  menus: () => ({
    moveDirections: {
      items: [
        {
          value: "forward",
          text: translations.label("toio.moveForMenu.forward")
        },
        {
          value: "backward",
          text: translations.label("toio.moveForMenu.backward")
        }
      ],
      acceptReporters: true
    }
  }),
  functions: {
    moveFor(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const durationMs = cast.toNumber(args.DURATION) * 1e3;
      if (durationMs <= 0) {
        return;
      }
      const direction = args.DIRECTION === "forward" ? 1 : -1;
      const speed = cast.toNumber(args.SPEED) * direction;
      coreCube.virtualState.reset();
      return coreCube.motor.move(speed, speed, durationMs);
    }
  }
};
const RotateForBlock = {
  info: () => ({
    opcode: "rotateFor",
    blockType: blockType.COMMAND,
    text: translations.label("toio.rotateFor"),
    arguments: {
      DIRECTION: {
        type: argumentType.STRING,
        menu: "rotateDirections",
        defaultValue: "left"
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 30
      },
      WATCH_ICON,
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  menus() {
    return {
      rotateDirections: {
        items: [
          {
            value: "left",
            text: translations.label("toio.rotateForMenu.left")
          },
          {
            value: "right",
            text: translations.label("toio.rotateForMenu.right")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    rotateFor(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const durationMs = cast.toNumber(args.DURATION) * 1e3;
      if (durationMs <= 0) {
        return;
      }
      const direction = args.DIRECTION === "left" ? 1 : -1;
      const speed = cast.toNumber(args.SPEED) * direction;
      coreCube.virtualState.reset();
      return coreCube.motor.move(-speed, +speed, durationMs);
    }
  }
};
const MoveWheelsForBlock = {
  info: () => ({
    opcode: "moveWheelsFor",
    blockType: blockType.COMMAND,
    text: translations.label("toio.moveWheelsFor"),
    arguments: {
      LEFT_SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 50
      },
      RIGHT_SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 50
      },
      WATCH_ICON,
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  functions: {
    moveWheelsFor(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const durationMs = cast.toNumber(args.DURATION) * 1e3;
      if (durationMs <= 0) {
        return;
      }
      const leftSpeed = cast.toNumber(args.LEFT_SPEED);
      const rightSpeed = cast.toNumber(args.RIGHT_SPEED);
      coreCube.virtualState.reset();
      return coreCube.motor.move(leftSpeed, rightSpeed, durationMs);
    }
  }
};
const StopWheelsBlock = {
  info: () => ({
    opcode: "stopWheels",
    blockType: blockType.COMMAND,
    text: translations.label("toio.stopWheels")
  }),
  functions: {
    stopWheels() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      return coreCube.motor.stop();
    }
  }
};
const MoveStepsBlock = {
  info: () => ({
    opcode: "moveSteps",
    blockType: blockType.COMMAND,
    text: translations.label("toio.moveSteps"),
    arguments: {
      MAT_ICON,
      DIRECTION: {
        type: argumentType.STRING,
        menu: "moveDirections",
        defaultValue: "forward"
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 70
      },
      STEP_ICON,
      STEPS: {
        type: argumentType.NUMBER,
        defaultValue: 100
      }
    }
  }),
  menus() {
    return {
      moveDirections: {
        items: [
          {
            value: "forward",
            text: translations.label("toio.moveForMenu.forward")
          },
          {
            value: "backward",
            text: translations.label("toio.moveForMenu.backward")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    async moveSteps(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const { state } = coreCube;
      if (!state.isTouched || state.x === void 0 || state.y === void 0) {
        return coreCube.motor.stop();
      }
      const steps = cast.toNumber(args.STEPS);
      if (steps === 0) {
        return coreCube.motor.stop();
      }
      const speed = args.SPEED !== void 0 ? cast.toNumber(args.SPEED) : 70;
      if (speed < CoreCube.MINIMUM_SPEED) {
        return coreCube.motor.stop();
      }
      const distance = steps * (args.DIRECTION === "forward" ? 1 : -1) * Mat.FROM_SCRATCH_TO_TOIO_COORDINATE;
      const target = coreCube.virtualState.move(distance);
      coreCube.config.setDelayForIdMissed(1e3);
      await coreCube.motor.moveTo(target.x, target.y, null, speed, true);
      await coreCube.config.setDelayForIdMissed();
    }
  }
};
const RotateByBlock = {
  info: () => ({
    opcode: "rotateBy",
    blockType: blockType.COMMAND,
    text: translations.label("toio.rotateBy"),
    arguments: {
      MAT_ICON,
      DIRECTION: {
        type: argumentType.STRING,
        menu: "rotateDirections",
        defaultValue: "left"
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 30
      },
      ANGLE: {
        type: argumentType.NUMBER,
        defaultValue: 90
      }
    }
  }),
  menus() {
    return {
      rotateDirections: {
        items: [
          {
            value: "left",
            text: translations.label("toio.rotateForMenu.left")
          },
          {
            value: "right",
            text: translations.label("toio.rotateForMenu.right")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    rotateBy(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const { state } = coreCube;
      if (!state.isTouched) {
        return;
      }
      const angle = cast.toNumber(args.ANGLE);
      if (angle === 0) {
        return;
      }
      const speed = args.SPEED !== void 0 ? cast.toNumber(args.SPEED) : 40;
      if (speed < CoreCube.MINIMUM_SPEED) {
        return;
      }
      const direction = args.DIRECTION === "left" ? -1 : 1;
      const target = coreCube.virtualState.rotate(angle * direction);
      return coreCube.motor.pointInDirection(target.direction, speed, args.DIRECTION === "left" ? "LEFT" : "RIGHT");
    }
  }
};
const MoveToBlock = {
  info: () => ({
    opcode: "moveTo",
    blockType: blockType.COMMAND,
    text: translations.label("toio.moveTo"),
    arguments: {
      MAT_ICON,
      X: {
        type: argumentType.NUMBER,
        defaultValue: 0
      },
      Y: {
        type: argumentType.NUMBER,
        defaultValue: 0
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 70
      }
    }
  }),
  functions: {
    async moveTo(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const { state } = coreCube;
      if (!state.isTouched || state.x === void 0 || state.y === void 0) {
        return coreCube.motor.stop();
      }
      const speed = args.SPEED !== void 0 ? cast.toNumber(args.SPEED) : 70;
      if (speed < CoreCube.MINIMUM_SPEED) {
        return coreCube.motor.stop();
      }
      const x = cast.toNumber(args.X);
      const y = cast.toNumber(args.Y);
      const allowBackward = args.ALLOW_BACKWARD === true;
      const normalizedX = 0.5 + x / 360;
      const normalizedY = 0.5 - y / 360;
      const [matX, matY] = Mat.convertToMatCoordinate(state, normalizedX, normalizedY);
      coreCube.config.setDelayForIdMissed(1e3);
      await coreCube.motor.moveTo(matX, matY, null, speed, allowBackward);
      await coreCube.config.setDelayForIdMissed();
    }
  }
};
const PointInDirectionBlock = {
  info: () => ({
    opcode: "pointInDirection",
    blockType: blockType.COMMAND,
    text: translations.label("toio.pointInDirection"),
    arguments: {
      MAT_ICON,
      DIRECTION: {
        type: argumentType.ANGLE,
        defaultValue: 0
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 40
      }
    }
  }),
  functions: {
    pointInDirection(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const { state } = coreCube;
      if (!state.isTouched) {
        return;
      }
      const speed = args.SPEED !== void 0 ? cast.toNumber(args.SPEED) : 40;
      if (speed < CoreCube.MINIMUM_SPEED) {
        return;
      }
      const direction = (cast.toNumber(args.DIRECTION) + 270) % 360;
      return coreCube.motor.pointInDirection(direction, speed);
    }
  }
};
const GetXPositionBlock = {
  info: () => ({
    opcode: "getXPosition",
    blockType: blockType.REPORTER,
    text: translations.label("toio.stateTypeMenu.x"),
    arguments: {
      MAT_ICON
    }
  }),
  functions: {
    getXPosition() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.x === void 0) {
        return 0;
      }
      const position = Mat.normalizePosition(coreCube.state.x, coreCube.state.y);
      return (position.x - 0.5) * 360;
    }
  }
};
const GetYPositionBlock = {
  info: () => ({
    opcode: "getYPosition",
    blockType: blockType.REPORTER,
    text: translations.label("toio.stateTypeMenu.y"),
    arguments: {
      MAT_ICON
    }
  }),
  functions: {
    getYPosition() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.y === void 0) {
        return 0;
      }
      const position = Mat.normalizePosition(coreCube.state.x, coreCube.state.y);
      return (0.5 - position.y) * 360;
    }
  }
};
const GetDirectionBlock = {
  info: () => ({
    opcode: "getDirection",
    blockType: blockType.REPORTER,
    text: translations.label("toio.stateTypeMenu.direction"),
    arguments: {
      MAT_ICON
    }
  }),
  functions: {
    getDirection() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.direction === void 0) {
        return 0;
      }
      const direction = coreCube.state.direction - 270;
      return direction + (direction <= -180 ? 360 : 0);
    }
  }
};
const MoveToOnGridBlock = {
  info: () => ({
    opcode: "moveToOnGrid",
    blockType: blockType.COMMAND,
    text: translations.label("toio.moveToOnGrid"),
    arguments: {
      MAT_ICON,
      COLUMN: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      },
      ROW: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      },
      SPEED: {
        type: argumentType.NUMBER,
        defaultValue: 70
      }
    }
  }),
  menus() {
    return {
      stateTypes: {
        items: ["4", "3", "2", "1", "0", "-1", "-2", "-3", "-4"],
        acceptReporters: true
      }
    };
  },
  functions: {
    moveToOnGrid(args) {
      const column = cast.toNumber(args.COLUMN);
      const row = cast.toNumber(args.ROW);
      const speed = args.SPEED !== void 0 ? cast.toNumber(args.SPEED) : 70;
      const x = Mat.convertColumnToX(column);
      const y = Mat.convertRowToY(row);
      return this.moveTo({ X: x, Y: y, SPEED: speed });
    }
  }
};
const GetColumnIndexBlock = {
  info: () => ({
    opcode: "getColumnIndex",
    blockType: blockType.REPORTER,
    text: translations.label("toio.getColumnIndex"),
    arguments: {
      MAT_ICON
    }
  }),
  functions: {
    getColumnIndex() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.x === void 0) {
        return 0;
      }
      return Mat.convertXToColumn(coreCube.state.x) - 4;
    }
  }
};
const GetRowIndexBlock = {
  info: () => ({
    opcode: "getRowIndex",
    blockType: blockType.REPORTER,
    text: translations.label("toio.getRowIndex"),
    arguments: {
      MAT_ICON
    }
  }),
  functions: {
    getRowIndex() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.y === void 0) {
        return 0;
      }
      return 4 - Mat.convertYToRow(coreCube.state.y);
    }
  }
};
const WhenGridTouchedBlock = {
  info: () => ({
    opcode: "whenGridTouched",
    blockType: blockType.HAT,
    text: translations.label("toio.whenGridTouched"),
    arguments: {
      MAT_ICON,
      COLUMN: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      },
      ROW: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      }
    }
  }),
  menus() {
    return {
      stateTypes: {
        items: ["4", "3", "2", "1", "0", "-1", "-2", "-3", "-4"],
        acceptReporters: true
      }
    };
  },
  functions: {
    whenGridTouched(args) {
      const column = cast.toNumber(args.COLUMN);
      const row = cast.toNumber(args.ROW);
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.x === void 0) {
        return false;
      }
      const { state } = coreCube;
      if (!state.isTouched) {
        return false;
      }
      if (!Mat.checkIfInMat(state)) {
        return false;
      }
      return Mat.convertXToColumn(state.x) - 4 === column && 4 - Mat.convertYToRow(state.y) === row;
    }
  }
};
const IsGridTouchedBlock = {
  info: () => ({
    opcode: "isGridTouched",
    blockType: blockType.BOOLEAN,
    text: translations.label("toio.isGridTouched"),
    arguments: {
      MAT_ICON,
      COLUMN: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      },
      ROW: {
        type: argumentType.STRING,
        menu: "stateTypes",
        defaultValue: "0"
      }
    }
  }),
  menus() {
    return {
      stateTypes: {
        items: ["4", "3", "2", "1", "0", "-1", "-2", "-3", "-4"],
        acceptReporters: true
      }
    };
  },
  functions: {
    isGridTouched(args) {
      const column = cast.toNumber(args.COLUMN);
      const row = cast.toNumber(args.ROW);
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || coreCube.state.x === void 0) {
        return false;
      }
      const { state } = coreCube;
      if (!state.isTouched) {
        return false;
      }
      if (!Mat.checkIfInMat(state)) {
        return false;
      }
      return Mat.convertXToColumn(state.x) - 4 === column && 4 - Mat.convertYToRow(state.y) === row;
    }
  }
};
const MENUS = [
  "mat",
  "whiteCell",
  "redCell",
  "greenCell",
  "yellowCell",
  "blueCell",
  ...Card.menus,
  ...SimpleCard.menus
];
const WhenTouchedBlock = {
  info: () => ({
    opcode: "whenTouched",
    blockType: blockType.HAT,
    text: translations.label("toio.whenTouched"),
    arguments: {
      MAT_CARD_ICON,
      TYPE: {
        type: argumentType.STRING,
        menu: "detectedTypes",
        defaultValue: "mat"
      }
    }
  }),
  menus() {
    const items = MENUS.map((menuItem) => {
      const id = "toio.whenTouchedMenu." + menuItem;
      const value = translationsEn[id];
      return value !== void 0 ? {
        text: translations.label(id),
        value
      } : {
        text: menuItem,
        value: menuItem
      };
    });
    return {
      detectedTypes: {
        items,
        acceptReporters: true
      }
    };
  },
  functions: {
    whenTouched(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return false;
      }
      const { state } = coreCube;
      if (!state.isTouched) {
        return false;
      }
      const id = Card.getId(state) || SimpleCard.getId(state) || {};
      switch (args.TYPE) {
        case "mat":
          return Mat.checkIfOnMat(state);
        case "white cell":
        case "red cell":
        case "green cell":
        case "yellow cell":
        case "blue cell": {
          const color2 = args.TYPE.split(" ")[0];
          const matColor = Mat.getMatColor(state);
          return color2 === matColor;
        }
        case "any card":
          return id.group !== void 0;
        case "any toio Collection card":
          return id.group === "toio Collection card";
        case "any toio Collection sticker":
          return id.group === "toio Collection sticker";
        case "any number":
          return id.group === "number";
        case "any alphabet":
          return id.group === "alphabet";
        case "any symbol":
          return id.group === "symbol";
        case "any simple card":
          return id.group === "number" || id.group === "alphabet" || id.group === "symbol";
        default:
          return id && id.label === args.TYPE;
      }
    }
  }
};
const IsTouchedBlock = {
  info: () => ({
    opcode: "isTouched",
    func: "whenTouched",
    blockType: blockType.BOOLEAN,
    text: translations.label("toio.isTouched"),
    arguments: {
      MAT_CARD_ICON,
      TYPE: {
        type: argumentType.STRING,
        menu: "detectedTypes",
        defaultValue: "mat"
      }
    }
  })
};
const GetTouchedSimpleCardBlock = {
  info: () => ({
    opcode: "getTouchedSimpleCard",
    blockType: blockType.REPORTER,
    text: translations.label("toio.getTouchedSimpleCard"),
    arguments: {
      CARD_ICON
    }
  }),
  functions: {
    getTouchedSimpleCard() {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return "";
      }
      const { state } = coreCube;
      const id = SimpleCard.getId(state);
      return id ? id.label : "";
    }
  }
};
const GetStateValueBlock = {
  info: () => ({
    opcode: "getStateValue",
    blockType: blockType.REPORTER,
    text: translations.label("toio.getStateValue"),
    arguments: {
      STATE_VALUES: {
        type: argumentType.STRING,
        menu: "stateValues",
        defaultValue: "peripheralName"
      }
    }
  }),
  menus() {
    return {
      stateValues: {
        items: [
          {
            value: "peripheralName",
            text: translations.label("toio.infos.peripheralName")
          },
          {
            value: "batteryLevel",
            text: translations.label("toio.infos.batteryLevel")
          },
          {
            value: "postureRoll",
            text: translations.label("toio.infos.postureRoll")
          },
          {
            value: "posturePitch",
            text: translations.label("toio.infos.posturePitch")
          },
          {
            value: "postureYaw",
            text: translations.label("toio.infos.postureYaw")
          },
          {
            value: "postureValue",
            text: translations.label("toio.infos.postureValue")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    getStateValue(args) {
      const coreCube = Util.getCoreCube(this);
      const isCubeAvailable = coreCube && coreCube.isConnected();
      switch (args.STATE_VALUES) {
        case "peripheralName":
          return isCubeAvailable ? (coreCube == null ? void 0 : coreCube.getPeripheralName()) || "" : "";
        case "batteryLevel": {
          const batteryLevel = isCubeAvailable ? coreCube.state.batteryLevel || 0 : 0;
          if (batteryLevel >= 50) {
            return 1;
          }
          if (batteryLevel >= 20) {
            return 0.5;
          }
          return 0;
        }
        case "postureRoll":
          return isCubeAvailable ? coreCube.state.roll || 0 : 0;
        case "posturePitch":
          return isCubeAvailable ? coreCube.state.pitch || 0 : 0;
        case "postureYaw":
          return isCubeAvailable ? coreCube.state.yaw || 0 : 0;
        case "postureValue":
          return isCubeAvailable ? coreCube.state.postureValue || 0 : 0;
      }
      return 0;
    }
  }
};
const falseLabels = ["", "0", "false", "no", "\u3044\u3044\u3048", "\u306A\u3044", "\u507D"];
const WhenStateChangedBlock = {
  info: () => ({
    opcode: "whenButtonPressed",
    func: "whenStateChanged",
    blockType: blockType.HAT,
    text: translations.label("toio.whenStateChanged"),
    arguments: {
      CHANGED_STATE: {
        type: argumentType.STRING,
        menu: "changedStates",
        defaultValue: "buttonPressed"
      }
    }
  }),
  menus() {
    return {
      changedStates: {
        items: [
          {
            value: "buttonPressed",
            text: translations.label("toio.infos.buttonPressed")
          },
          {
            value: "cubeConnected",
            text: translations.label("toio.infos.cubeConnected")
          },
          {
            value: "cubeDisconnected",
            text: translations.label("toio.infos.cubeDisconnected")
          },
          {
            value: "collisionDetected",
            text: translations.label("toio.infos.collisionDetected")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    whenStateChanged(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube) {
        return false;
      }
      switch (args.CHANGED_STATE) {
        case "buttonPressed":
        case void 0:
          return coreCube.isConnected() === true && coreCube.state.buttonPressed === true;
        case "cubeConnected":
          return coreCube.isConnected();
        case "cubeDisconnected":
          return !coreCube.isConnected();
        case "collisionDetected":
          return coreCube.isConnected() === true && coreCube.state.collisionDetected === true;
      }
      const value = cast.toString(args.CHANGED_STATE).toLowerCase();
      if (falseLabels.indexOf(value) >= 0) {
        return false;
      }
      return true;
    }
  }
};
const IsStateChangedBlock = {
  info: () => ({
    opcode: "isButtonPressed",
    func: "isStateChanged",
    blockType: blockType.BOOLEAN,
    text: translations.label("toio.isStateChanged"),
    arguments: {
      CHANGED_STATE: {
        type: argumentType.STRING,
        menu: "isChangedStates",
        defaultValue: "isButtonPressed"
      }
    }
  }),
  menus() {
    return {
      isChangedStates: {
        items: [
          {
            value: "isButtonPressed",
            text: translations.label("toio.infos.isButtonPressed")
          },
          {
            value: "isCubeConnected",
            text: translations.label("toio.infos.isCubeConnected")
          },
          {
            value: "isCollisionDetected",
            text: translations.label("toio.infos.isCollisionDetected")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    isStateChanged(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return false;
      }
      switch (args.CHANGED_STATE) {
        case "isButtonPressed":
        case void 0:
          return coreCube.state.buttonPressed === true;
        case "isCubeConnected":
          return coreCube.isConnected();
        case "isCollisionDetected":
          return coreCube.state.collisionDetected === true;
      }
      const value = cast.toString(args.CHANGED_STATE).toLowerCase();
      if (falseLabels.indexOf(value) >= 0) {
        return false;
      }
      return true;
    }
  }
};
const LightColors = {
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 255, 0],
  yellow: [255, 255, 0],
  blue: [0, 0, 255],
  magenta: [255, 0, 255],
  cyan: [0, 255, 255]
};
const SetLightColorForBlock = {
  info: () => ({
    opcode: "setLightColorFor",
    blockType: blockType.COMMAND,
    text: translations.label("toio.setLightColorFor"),
    arguments: {
      COLOR: {
        type: argumentType.COLOR
      },
      WATCH_ICON,
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  functions: {
    setLightColorFor(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const durationMs = cast.toNumber(args.DURATION) * 1e3;
      if (durationMs <= 0) {
        return;
      }
      const color2 = this.convertColorFromStringIntoIntegers(args.COLOR);
      return coreCube.light.turnOn(color2[0], color2[1], color2[2], durationMs);
    },
    convertColorFromStringIntoIntegers(color2) {
      const presetColor = LightColors[color2];
      if (presetColor) {
        return presetColor;
      }
      if (color2[0] === "#") {
        const r = parseInt(color2.slice(1, 3), 16);
        const g = parseInt(color2.slice(3, 5), 16);
        const b = parseInt(color2.slice(5, 7), 16);
        return [r, g, b];
      } else {
        return color2.split(" ").map((value) => parseInt(value, 10));
      }
    }
  }
};
const TurnOffLightBlock = {
  info: () => ({
    opcode: "turnOffLight",
    blockType: blockType.COMMAND,
    text: translations.label("toio.turnOffLight"),
    arguments: {
      COLOR: {
        type: argumentType.COLOR
      },
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  functions: {
    turnOffLight(forceToStop = false) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      if (forceToStop) {
        coreCube.light.turnOff();
      }
    }
  }
};
const PlayNoteForBlock = {
  info: () => ({
    opcode: "playNoteFor",
    blockType: blockType.COMMAND,
    text: translations.label("toio.playNoteFor"),
    arguments: {
      NOTE: {
        type: argumentType.NOTE,
        defaultValue: 60
      },
      WATCH_ICON,
      DURATION: {
        type: argumentType.NUMBER,
        defaultValue: 1
      }
    }
  }),
  functions: {
    playNoteFor(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      const durationMs = cast.toNumber(args.DURATION) * 1e3;
      if (durationMs <= 0) {
        return;
      }
      const note = cast.toNumber(args.NOTE);
      return coreCube.sound.play(note, 127, durationMs);
    }
  }
};
const StopNoteBlock = {
  info: () => ({
    opcode: "stopNote",
    blockType: blockType.COMMAND,
    text: translations.label("toio.stopNote")
  }),
  functions: {
    stopNote(forceToStop = false) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return;
      }
      if (forceToStop) {
        coreCube.sound.stop();
      }
    }
  }
};
const WhenMagnetDetectedBlock = {
  info: () => ({
    opcode: "whenMagnetDetected",
    blockType: blockType.HAT,
    text: translations.label("toio.whenMagnetDetected"),
    arguments: {
      MAGNET_STATE: {
        type: argumentType.STRING,
        menu: "magnetStates",
        defaultValue: "any"
      }
    }
  }),
  menus() {
    return {
      magnetStates: {
        items: [
          {
            value: "nCenter",
            text: translations.label("toio.magnetState.nCenter")
          },
          {
            value: "nRight",
            text: translations.label("toio.magnetState.nRight")
          },
          {
            value: "nLeft",
            text: translations.label("toio.magnetState.nLeft")
          },
          {
            value: "sCenter",
            text: translations.label("toio.magnetState.sCenter")
          },
          {
            value: "sRight",
            text: translations.label("toio.magnetState.sRight")
          },
          {
            value: "sLeft",
            text: translations.label("toio.magnetState.sLeft")
          },
          {
            value: "anyN",
            text: translations.label("toio.magnetState.anyN")
          },
          {
            value: "anyS",
            text: translations.label("toio.magnetState.anyS")
          },
          {
            value: "any",
            text: translations.label("toio.magnetState.any")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    whenMagnetDetected(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return false;
      }
      if (!coreCube.state.magnetState || coreCube.state.magnetState === 0) {
        return false;
      }
      switch (args.MAGNET_STATE) {
        case "nCenter":
          return coreCube.state.magnetState === 1;
        case "nRight":
          return coreCube.state.magnetState === 3;
        case "nLeft":
          return coreCube.state.magnetState === 5;
        case "sCenter":
          return coreCube.state.magnetState === 2;
        case "sRight":
          return coreCube.state.magnetState === 4;
        case "sLeft":
          return coreCube.state.magnetState === 6;
        case "anyN":
          return (coreCube.state.magnetState & 1) === 1;
        case "anyS":
          return (coreCube.state.magnetState & 1) === 0;
        case "any":
          return true;
      }
      return false;
    }
  }
};
const IsMagnetDetectedBlock = {
  info: () => ({
    opcode: "isMagnetDetected",
    blockType: blockType.BOOLEAN,
    text: translations.label("toio.isMagnetDetected"),
    arguments: {
      MAGNET_STATE: {
        type: argumentType.STRING,
        menu: "magnetStates",
        defaultValue: "any"
      }
    }
  }),
  menus() {
    return {
      magnetStates: {
        items: [
          {
            value: "nCenter",
            text: translations.label("toio.magnetState.nCenter")
          },
          {
            value: "nRight",
            text: translations.label("toio.magnetState.nRight")
          },
          {
            value: "nLeft",
            text: translations.label("toio.magnetState.nLeft")
          },
          {
            value: "sCenter",
            text: translations.label("toio.magnetState.sCenter")
          },
          {
            value: "sRight",
            text: translations.label("toio.magnetState.sRight")
          },
          {
            value: "sLeft",
            text: translations.label("toio.magnetState.sLeft")
          },
          {
            value: "anyN",
            text: translations.label("toio.magnetState.anyN")
          },
          {
            value: "anyS",
            text: translations.label("toio.magnetState.anyS")
          },
          {
            value: "any",
            text: translations.label("toio.magnetState.any")
          }
        ],
        acceptReporters: true
      }
    };
  },
  functions: {
    isMagnetDetected(args) {
      const coreCube = Util.getCoreCube(this);
      if (!coreCube || !coreCube.isConnected()) {
        return false;
      }
      if (!coreCube.state.magnetState || coreCube.state.magnetState === 0) {
        return false;
      }
      switch (args.MAGNET_STATE) {
        case "nCenter":
          return coreCube.state.magnetState === 1;
        case "nRight":
          return coreCube.state.magnetState === 3;
        case "nLeft":
          return coreCube.state.magnetState === 5;
        case "sCenter":
          return coreCube.state.magnetState === 2;
        case "sRight":
          return coreCube.state.magnetState === 4;
        case "sLeft":
          return coreCube.state.magnetState === 6;
        case "anyN":
          return (coreCube.state.magnetState & 1) === 1;
        case "anyS":
          return (coreCube.state.magnetState & 1) === 0;
        case "any":
          return true;
      }
      return false;
    }
  }
};
const blockOrder = [
  MoveForBlock,
  RotateForBlock,
  MoveWheelsForBlock,
  StopWheelsBlock,
  "---",
  MoveStepsBlock,
  RotateByBlock,
  "---",
  MoveToBlock,
  PointInDirectionBlock,
  GetXPositionBlock,
  GetYPositionBlock,
  GetDirectionBlock,
  "---",
  MoveToOnGridBlock,
  GetColumnIndexBlock,
  GetRowIndexBlock,
  WhenGridTouchedBlock,
  IsGridTouchedBlock,
  "---",
  WhenTouchedBlock,
  IsTouchedBlock,
  GetTouchedSimpleCardBlock,
  "---",
  GetStateValueBlock,
  WhenStateChangedBlock,
  IsStateChangedBlock,
  "---",
  SetLightColorForBlock,
  TurnOffLightBlock,
  "---",
  PlayNoteForBlock,
  StopNoteBlock,
  "---",
  WhenMagnetDetectedBlock,
  IsMagnetDetectedBlock
];
const Separator = "---";
const isSeparator = (block) => block === Separator;
const blocks = {
  infos: () => blockOrder.map((block) => isSeparator(block) ? block : block.info()),
  menus: () => blockOrder.reduce((acc, { menus }) => menus ? Object.assign(acc, menus()) : acc, {}),
  functions: blockOrder.reduce((acc, block) => Object.assign(acc, block.functions), {})
};
const NUMBER_OF_EXTENSIONS = 2;
const BLOCK_COLORS = [
  ["#01a3bc", "#0094ab", "#0189a0"],
  ["#f6624c", "#d15340", "#c54835"],
  ["#a2c732", "#8eae2c", "#96b43a"],
  ["#f48901", "#db7b03", "#e38815"]
];
var imageCube = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+Y3ViZV9tPC90aXRsZT4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cC1Db3B5LTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA1LjAwMDAwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzIuNjUzOTE0OCwzLjQ5Mzc1NDA3IEwyNC4zNTc5MTQ4LDIuMjA2ODc5MDcgQzI0LjI3MjkxNDgsMi4wNzgxMjkwNyAyNC4xNDA2OTI2LDEuOTc4NzU0MDcgMjMuOTY3NTQ0NCwxLjk0MzEyOTA3IEwyMi41NjAzMjIyLDEuNzA5Mzc5MDcgQzIyLjM3NjQ3MDQsMS42NzQzNzkwNyAyMi4xODQ0MzMzLDEuNzIyNTA0MDcgMjEuOTg2NzI5NiwxLjgwMDAwNDA3IEwxOC41MjgxNzQxLDEuMjA2ODc5MDcgQzE4LjQ2NjQ3MDQsMS4wNjE4NzkwNyAxOC4zNzUxNzQxLDAuOTQxMjU0MDc1IDE4LjE4Mzc2NjcsMC45MDYyNTQwNzUgTDE2LjgzMDA2MywwLjY1NTYyOTA3NSBDMTYuNTc3NTgxNSwwLjYwMzc1NDA3NSAxNi4zMTUwMjU5LDAuNjM5Mzc5MDc1IDE2LjE0NjI4NTIsMC43OTgxMjkwNzUgTDEyLjQ1NjAyNTksMC4wMzMxMjkwNzQ1IEMxMS43MzE5NTE5LC0wLjA4ODc0NTkyNTUgMTAuOTMyMzIyMiwwLjE0MzEyOTA3NSAxMC42MDExMzcsMC42NTUwMDQwNzUgTDAuNTE2OTg4ODg5LDEyLjQ2Mzc1NDEgQzAuMjE5ODAzNzA0LDEyLjg5ODc1NDEgMC4xMTE1MDc0MDcsMTMuNTM4NzU0MSAwLjEwMzMyMjIyMiwxNC4wOTc1MDQxIEwwLjU1NzI4NTE4NSwyNC41Mzc1MDQxIEMwLjU2NTQ3MDM3LDI1LjA1Mzc1NDEgMC45MTA1MDc0MDcsMjUuNTI1NjI5MSAxLjQ4Nzg3Nzc4LDI1LjYzNDM3OTEgTDIzLjk1OTk4ODksMjkuNzc5Mzc5MSBDMjQuNjQ2Mjg1MiwyOS45MjI1MDQxIDI1LjM5OTk1MTksMjkuNjQ2ODc5MSAyNS43MDQwNjMsMjkuMTIxMjU0MSBMMzIuNjc1OTUxOSwxNy42NzYyNTQxIEMzMi45MzUzNTkzLDE3LjE5Mzc1NDEgMzMuMDcwMSwxNi42Mjg3NTQxIDMzLjA4MDE3NDEsMTYuMDQxMjU0MSBMMzMuNzU3NjU1Niw0Ljc4NjI1NDA3IEMzMy43NDgyMTExLDQuMjExMjU0MDcgMzMuMzMzOTE0OCwzLjYyMTI1NDA3IDMyLjY1MzkxNDgsMy40OTM3NTQwNyIgaWQ9IkZpbGwtNjI5IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi4zNDc5NDgxLDEwLjgwODI1NDEgQzIyLjI0MTU0MDcsMTAuOTYwMTI5MSAyMi4yMTMyMDc0LDExLjE4NTEyOTEgMjIuMjEzMjA3NCwxMS4zNDM4NzkxIEwyMi4yMTMyMDc0LDExLjg2NzAwNDEgQzIyLjIyNTE3MDQsMTIuMDUwMTI5MSAyMi41NDk0Mjk2LDEyLjIxODI1NDEgMjIuODQ3MjQ0NCwxMi4yNTUxMjkxIEwyNC44NzQ2NTE5LDEyLjYzNDUwNDEgQzI1LjI0MzYxNDgsMTIuNzE5NTA0MSAyNS42NDcyMDc0LDEyLjU3Mzg3OTEgMjUuODY4MjA3NCwxMi4yMjAxMjkxIEwyNi40OTM0Mjk2LDExLjIzNDUwNDEgQzI2LjgxMjAyMjIsMTAuNjk4MjU0MSAyNS44NjgyMDc0LDEwLjI3MjYyOTEgMjYuMTc0ODM3LDkuNzk3NjI5MDcgTDI2Ljk2ODgsOS4xNTA3NTQwNyBDMjcuMjI2MzE4NSw4Ljc3Mzg3OTA3IDI4LjIzMTIwNzQsOS4wNzcwMDQwNyAyOC40NzczOTI2LDguNjg3NjI5MDcgTDI4LjYyNDA5NjMsOC40NDQ1MDQwNyBDMjguNzIxNjg4OSw4LjI2MTM3OTA3IDI4Ljg4MjI0NDQsNy45Njk1MDQwNyAyOC44ODIyNDQ0LDcuODEwNzU0MDcgTDI4Ljg4MjI0NDQsNy4yNzU3NTQwNyBDMjguODgyMjQ0NCw3LjA2ODI1NDA3IDI4LjY5ODM5MjYsNi44MzcwMDQwNyAyOC40NDA4NzQxLDYuNzc4MjU0MDcgQzI4LjU2MzAyMjIsNy4wMjAxMjkwNyAyOC41Mzg0NjY3LDcuMjYzMjU0MDcgMjguMzkxNzYzLDcuNTQzODc5MDcgTDI4LjI0NDQyOTYsNy43ODcwMDQwNyBDMjcuOTk4ODc0MSw4LjE3NjM3OTA3IDI3LjEwMzU0MDcsNy44NjAxMjkwNyAyNi44NDYwMjIyLDguMjM3MDA0MDcgTDI1LjczMjIwNzQsOS4zNjAxMjkwNyBDMjUuNDI2ODM3LDkuODM0NTA0MDcgMjYuMjQ4NTAzNywxMC4yNDc2MjkxIDI1LjkyODY1MTksMTAuNzgzODc5MSBMMjUuNDI2ODM3LDExLjUzODI1NDEgQzI1LjM0MTgzNywxMS42ODUxMjkxIDI1LjA4MzA1OTMsMTEuNzMzMjU0MSAyNC44NzQ2NTE5LDExLjY4NTEyOTEgTDIyLjg0NzI0NDQsMTEuMzA1NzU0MSBDMjIuNjMwMDIyMiwxMS4yODI2MjkxIDIyLjMxMTQyOTYsMTEuMTQ4ODc5MSAyMi4zNDc5NDgxLDEwLjgwODI1NDEiIGlkPSJGaWxsLTYzMSIgZmlsbD0iI0JFQjVBQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNC43OTYwMTQ4MSw3LjQ0OTUwNDA3IEM0LjY3OTUzMzMzLDcuNTk2Mzc5MDcgNC42MzkyMzcwNCw3LjgxODg3OTA3IDQuNjMxMDUxODUsNy45NzYzNzkwNyBMNC42MDI3MTg1Miw4LjQ5NjM3OTA3IEM0LjYwNTIzNzA0LDguNjc4MjU0MDcgNC45MjMyLDguODU1NzU0MDcgNS4yMTk3NTU1Niw4LjkwNDUwNDA3IEw3LjIzNzcxODUyLDkuMzU1NzU0MDcgQzcuNjAzNTMzMzMsOS40NTM4NzkwNyA4LjAxODQ1OTI2LDkuMzI0NTA0MDcgOC4yNTk2MDc0MSw4Ljk4MjAwNDA3IEw5LjAwMjU3MDM3LDguMDg1NzU0MDcgQzkuMzUyMDE0ODEsNy41NjU3NTQwNyA4LjYwMzM4NTE5LDcuMTU4ODc5MDcgOC45Mzc3MTg1Miw2LjY5ODI1NDA3IEw5LjUzMzM0ODE1LDYuMDIyNjI5MDcgQzkuODEyOTAzNyw1LjY1NzAwNDA3IDEwLjg0NzM4NTIsNS45NzgyNTQwNyAxMS4xMTU2MDc0LDUuNjAwNzU0MDcgTDExLjI5Mzc5MjYsNS4zNzc2MjkwNyBDMTEuNDAyNzE4NSw1LjE5OTUwNDA3IDExLjYxMDQ5NjMsNC45NjQ1MDQwNyAxMS42MTkzMTExLDQuODA3MDA0MDcgTDExLjY0ODI3NDEsNC4yNzU3NTQwNyBDMTEuNjU4OTc3OCw0LjA3MDEyOTA3IDExLjQzNzM0ODEsMy43NzI2MjkwNyAxMS4xODE3MTg1LDMuNzA0NTA0MDcgQzExLjI5MTkwMzcsMy45NDg4NzkwNyAxMS4zMzU5Nzc4LDQuMTcxMzc5MDcgMTEuMTcyMjc0MSw0LjQ0Mzg3OTA3IEwxMC45MjkyMzcsNC42OTgyNTQwNyBDMTAuNjYyMjc0MSw1LjA3NjM3OTA3IDkuNzM5MjM3MDQsNC43NDYzNzkwNyA5LjQ2MDMxMTExLDUuMTEyMDA0MDcgTDguNTE3MTI1OTMsNi4yNDcwMDQwNyBDOC4xODM0MjIyMiw2LjcwNzYyOTA3IDguODA4NjQ0NDQsNy4wOTc2MjkwNyA4LjQ1OTIsNy42MTc2MjkwNyBMNy44NTIyMzcwNCw4LjI4ODI1NDA3IEM3Ljc1Nzc5MjU5LDguNDMwMTI5MDcgNy40OTY0OTYzLDguNDY4ODc5MDcgNy4yODkzNDgxNSw4LjQxMzI1NDA3IEw1LjI3MTM4NTE5LDcuOTYyMDA0MDcgQzUuMDUzNTMzMzMsNy45MzA3NTQwNyA0Ljc0MDYwNzQxLDcuNzg3MDA0MDcgNC43OTYwMTQ4MSw3LjQ0OTUwNDA3IiBpZD0iRmlsbC02MzIiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTguMDgwNjY2NjcsMTMuMDA3NDQxNiBMOC4wODA2NjY2NywxMy41Mjg2OTE2IEM4LjA4MzgxNDgxLDEzLjc1MzY5MTYgOC40ODM2Mjk2MywxMy44OTM2OTE2IDguODAyMjIyMjIsMTMuOTMxODE2NiBMOS43OTM4ODg4OSwxNC4xMTM2OTE2IEMxMC4zNDk4NTE5LDE0LjIyOTk0MTYgMTAuOTc3NTkyNiwxMy42OTkzMTY2IDExLjI4Mjk2MywxMy42MzM2OTE2IEMxMS40Njg3MDM3LDEzLjU5MzA2NjYgMTEuNzMxMjU5MywxMy4yMDI0NDE2IDExLjc2OTY2NjcsMTIuNzkxODE2NiBMMTEuODQ1ODUxOSwxMi4wMTQ5NDE2IEMxMS44NDgzNzA0LDExLjg3NTU2NjYgMTEuNjg5NzAzNywxMS45NDE4MTY2IDExLjY0NDM3MDQsMTIuMDAzMDY2NiBMMTEuMjgzNTkyNiwxMi43MzI0NDE2IEMxMC43OTA1OTI2LDEyLjg3NjgxNjYgMTAuMzQ5ODUxOSwxMy4zMjk5NDE2IDkuNzkzODg4ODksMTMuMjE0MzE2NiBMOC44MDIyMjIyMiwxMy4wMzA1NjY2IEM4LjU0NjU5MjU5LDEzLjAwOTMxNjYgOC4wOTk1NTU1NiwxMi43MjY4MTY2IDguMDgwNjY2NjcsMTMuMDA3NDQxNiIgaWQ9IkZpbGwtNjMzIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy44MzY3NDA3LDEzLjI3MTA2NjYgQzE0LjEwNTU5MjYsMTMuNTg2MDY2NiAxNC4yNTYwNzQxLDE0LjA0NjY5MTYgMTQuNzU1MzcwNCwxNC4xMzczMTY2IEwxNS44ODgwNzQxLDE0LjMzODU2NjYgQzE2LjEwMDg4ODksMTQuMzc1NDQxNiAxNi4zNDI2NjY3LDE0LjMwNzMxNjYgMTYuNDE3NTkyNiwxNC4xNTU0NDE2IEwxNy4zNjgzMzMzLDEyLjY2Nzk0MTYgQzE3LjQxNDkyNTksMTIuNjA1NDQxNiAxNy41NzY3NDA3LDEyLjUzNzMxNjYgMTcuNTczNTkyNiwxMi42ODA0NDE2IEwxNy41NzM1OTI2LDEzLjI3MjMxNjYgQzE3LjU3MTA3NDEsMTMuNDI3OTQxNiAxNy40MzY5NjMsMTMuNzY5ODE2NiAxNy4yNzAxMTExLDE0LjAxMDQ0MTYgTDE2LjY5Nzc3NzgsMTQuOTQ2MDY2NiBDMTYuNTQ2MDM3LDE1LjIwNzMxNjYgMTYuMjQxOTI1OSwxNS4zMDY2OTE2IDE1Ljg4ODA3NDEsMTUuMjM3OTQxNiBMMTQuNzU1MzcwNCwxNS4wMzczMTY2IEMxNC4yNTU0NDQ0LDE0Ljk0NzMxNjYgMTQuMTA0OTYzLDE0LjQ4NDgxNjYgMTMuODM1NDgxNSwxNC4xNjk4MTY2IEwxMy44MzY3NDA3LDEzLjI3MTA2NjYgWiIgaWQ9IkZpbGwtNjM0IiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNS4wMDcwOTYzLDIuODUxMzE2NTcgTDE1LjAwNzA5NjMsMy4zNjMxOTE1NyBDMTUuMDEwMjQ0NCwzLjU4MzgxNjU3IDE1LjQwMzc2MywzLjcyMTk0MTU3IDE1LjcxNjA1OTMsMy43NTgxOTE1NyBMMTYuNjkwNzI1OSwzLjkzODE5MTU3IEMxNy4zOTUyODE1LDQuMDg1NjkxNTcgMTcuOTEwOTQ4MSwzLjMwNDQ0MTU3IDE4LjU4NzgsMy40NDAwNjY1NyBMMjAuMTk5NjUxOSwzLjcxMDY5MTU3IEMyMC44NjM5MTExLDMuODI4MTkxNTcgMjAuODU2OTg1Miw0LjcxNzU2NjU3IDIxLjU2NTMxODUsNC44NDYzMTY1NyBMMjIuNjc3ODc0MSw1LjA0MzgxNjU3IEMyMy4wMjY2ODg5LDUuMTEwMDY2NTcgMjMuMzI0NTAzNyw1LjAxMTk0MTU3IDIzLjQ3NTYxNDgsNC43NTYzMTY1NyBMMjQuMDM2NjE0OCwzLjgzNjMxNjU3IEMyNC4yMDA5NDgxLDMuNTk5NDQxNTcgMjQuMzMyNTQwNywzLjI2NDQ0MTU3IDI0LjMzNTA1OTMsMy4xMTA2OTE1NyBMMjQuMzM1MDU5MywyLjUyODgxNjU3IEMyNC4zMzc1Nzc4LDIuMzg5NDQxNTcgMjQuMTc4OTExMSwyLjQ1NTY5MTU3IDI0LjEzMzU3NzgsMi41MTY5NDE1NyBMMjMuMTk4NTc3OCwzLjk3ODE5MTU3IEMyMy4xMjQ5MTExLDQuMTI3NTY2NTcgMjIuODg4OCw0LjE5NTA2NjU3IDIyLjY3Nzg3NDEsNC4xNTg4MTY1NyBMMjEuNTY1MzE4NSwzLjk2MDY5MTU3IEMyMC44NTY5ODUyLDMuODMxOTQxNTcgMjAuODYzOTExMSwyLjk0MzE5MTU3IDIwLjE5OTY1MTksMi44MjYzMTY1NyBMMTguNTg3OCwyLjU1NTA2NjU3IEMxNy45MTA5NDgxLDIuNDE4ODE2NTcgMTcuMzk1MjgxNSwzLjIwMDY5MTU3IDE2LjY5MDcyNTksMy4wNTMxOTE1NyBMMTUuNzE2MDU5MywyLjg3MzgxNjU3IEMxNS40NjQ4MzcsMi44NTE5NDE1NyAxNS4wMjQ3MjU5LDIuNTc1NjkxNTcgMTUuMDA3MDk2MywyLjg1MTMxNjU3IiBpZD0iRmlsbC02MzUiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI1LjM3ODI5MjYsMjkuMTE5NzU0MSBMMzIuNTcyNDQwNywxNy42NzQxMjkxIEMzMi44MzE4NDgxLDE3LjE5Mjg3OTEgMzIuOTY2NTg4OSwxNi42Mjc4NzkxIDMyLjk3NjY2MywxNi4wNDAzNzkxIEwzMy42NTQ3NzQxLDQuNzg0NzU0MDcgQzMzLjY1MzUxNDgsNC40MzIyNTQwNyAzMy40OTczNjY3LDQuMjExMDA0MDcgMzMuMzExNjI1OSw0LjQ0NDEyOTA3IEwyNC4xODY0MDM3LDE3LjEzMjI1NDEgQzIzLjk0MzM2NjcsMTcuNTMyODc5MSAyMy43OTkxODE1LDE3LjY5ODUwNDEgMjMuODA1NDc3OCwxOC4xNzQ3NTQxIEwyMy44MDU0Nzc4LDI4Ljc3MTYyOTEgQzIzLjgxMTE0NDQsMjkuNTg2MDA0MSAyNC45Mzg4MTExLDI5Ljg3MTAwNDEgMjUuMzc4MjkyNiwyOS4xMTk3NTQxIiBpZD0iRmlsbC02MzYiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI4Ljg4MjE4MTUsNy44MTEzNzkwNyBMMjguODgyMTgxNSw3LjI3NTc1NDA3IEMyOC44ODIxODE1LDcuMDY4ODc5MDcgMjguNjk4MzI5Niw2LjgzNzYyOTA3IDI4LjQ0MDgxMTEsNi43NzgyNTQwNyBMMjYuMDI0MjkyNiw2LjM2MjYyOTA3IEMyNS43Nzg3MzcsNi4zMjYzNzkwNyAyNS40OTY2NjMsNi40MjM4NzkwNyAyNS4zOTg0NDA3LDYuNTk0NTA0MDcgTDI1LjAxODc3NDEsNy4xOTAxMjkwNyBDMjQuNjM4NDc3OCw3Ljc2MzI1NDA3IDI1LjcyODM2NjcsOC4xNTM4NzkwNyAyNS40NzIxMDc0LDguNTc4MjU0MDcgTDI0LjYxODMyOTYsOS41MjcwMDQwNyBDMjQuMzYwODExMSw5Ljk1MzI1NDA3IDIzLjE0NzUxNDgsOS42MjcwMDQwNyAyMi45MDE5NTkzLDEwLjAyOTUwNDEgTDIyLjM0Nzg4NTIsMTAuODA4ODc5MSBDMjIuMjQwODQ4MSwxMC45NjAxMjkxIDIyLjIxMjUxNDgsMTEuMTg1NzU0MSAyMi4yMTI1MTQ4LDExLjM0Mzg3OTEgTDIyLjIxMjUxNDgsMTEuODY3NjI5MSIgaWQ9IlN0cm9rZS02MzciIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjMxNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi44NDY5OTI2LDEyLjI1NTYyOTEgTDI0Ljg3NDQsMTIuNjM0Mzc5MSIgaWQ9IlN0cm9rZS02MzgiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjUuODY4MjA3NCwxMi4yMjA1NjY2IEwyNi40OTM0Mjk2LDExLjIzMzY5MTYgQzI2LjgxMjY1MTksMTAuNjk4NjkxNiAyNS44NjgyMDc0LDEwLjI3MjQ0MTYgMjYuMTc0ODM3LDkuNzk4MDY2NTcgTDI2Ljk2ODgsOS4xNTExOTE1NyBDMjcuMjI2MzE4NSw4Ljc3MzA2NjU3IDI4LjIzMTgzNyw5LjA3NzQ0MTU3IDI4LjQ3NzM5MjYsOC42ODgwNjY1NyBMMjguNjI0NzI1OSw4LjQ0NDMxNjU3IiBpZD0iU3Ryb2tlLTYzOSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MjIyNzA0LDQuODEwMTkxNTcgTDExLjY1MjQ5MjYsNC4yNzk1NjY1NyBDMTEuNjY0NDU1Niw0LjA3NTE5MTU3IDExLjQ0MTU2NjcsMy43NzcwNjY1NyAxMS4xODU5MzcsMy43MDk1NjY1NyBMOC44MDc4MjU5MywzLjE4MjA2NjU3IEM4LjU2MjksMy4xMzcwNjY1NyA4LjI3MzI3MDM3LDMuMjIyMDY2NTcgOC4xNjQzNDQ0NCwzLjM4NzY5MTU3IEw3LjY2MDAxMTExLDMuOTQxNDQxNTcgQzcuMjQ0NDU1NTYsNC40OTM5NDE1NyA4LjI3NjQxODUyLDQuOTI1ODE2NTcgNy45OTQ5NzQwNyw1LjMzNTgxNjU3IEw3LjE1NzU2NjY3LDYuMjY3MDY2NTcgQzYuODc0ODYyOTYsNi42Nzg5NDE1NyA1LjU4ODUyOTYzLDYuMjk2NDQxNTcgNS4zMTg0MTg1Miw2LjY4NDU2NjU3IEw0Ljc4MDcxNDgxLDcuNDM3NjkxNTcgQzQuNjYzNjAzNyw3LjU4NTE5MTU3IDQuNjIzMzA3NDEsNy44MDY0NDE1NyA0LjYxNDQ5MjU5LDcuOTYyNjkxNTcgTDQuNTg1NTI5NjMsOC40ODE0NDE1NyIgaWQ9IlN0cm9rZS02NDAiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjMxNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjIwMjQ0MDc0LDguODg5NzU0MDcgTDcuMjI0ODExMTEsOS4zNDM1MDQwNyIgaWQ9IlN0cm9rZS02NDEiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4yNDg2NTE4NSw4Ljk3MTA2NjU3IEw4Ljk5NDEzMzMzLDguMDc4NTY2NTcgQzkuMzQ1NDY2NjcsNy41NTk4MTY1NyA4LjU5NTU3Nzc4LDcuMTUxNjkxNTcgOC45MzE4LDYuNjkzNTY2NTcgTDkuNTMwNTc3NzgsNi4wMjA0NDE1NyBDOS44MTEzOTI1OSw1LjY1NjY5MTU3IDEwLjg0NjUwMzcsNS45Nzg1NjY1NyAxMS4xMTUzNTU2LDUuNjAxNjkxNTcgTDExLjI5NTQyOTYsNS4zNzg1NjY1NyIgaWQ9IlN0cm9rZS02NDIiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4wODA2NjY2NywxMy41Mjg2OTE2IEw4LjA4MDY2NjY3LDEzLjAwNzQ0MTYgQzguMDgwNjY2NjcsMTIuNzYzMDY2NiA4LjExMjE0ODE1LDEyLjQ3ODA2NjYgOC4yNTYzMzMzMywxMi4yNjU1NjY2IEw5LjA3NzM3MDM3LDExLjAxNDMxNjYgQzkuMjMzNTE4NTIsMTAuNzc0MzE2NiA5LjU0OTU5MjU5LDEwLjcxMzY5MTYgOS44NDg2NjY2NywxMC43NzYxOTE2IEwxMS4yMTkzNzA0LDExLjAzMDU2NjYgQzExLjU2NjI5NjMsMTEuMDk0MzE2NiAxMS42NjY0MDc0LDExLjUzNjE5MTYgMTEuNjk2LDExLjY5ODY5MTYgQzExLjcyNTU5MjYsMTEuODYwNTY2NiAxMS4zMjUxNDgxLDEyLjY3MzY5MTYgMTEuMzI1MTQ4MSwxMi42NzM2OTE2IiBpZD0iU3Ryb2tlLTY0MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE3LjU3NDI4NTIsMTMuMjcyMjU0MSBMMTcuNTc0Mjg1MiwxMi42Nzk3NTQxIEMxNy41NjYxLDEyLjQwMzUwNDEgMTcuMzgzNTA3NCwxMi4xNDI4NzkxIDE3LjA3MzEsMTIuMDc5NzU0MSBMMTUuNjQ4ODc3OCwxMS44NDM1MDQxIEMxNS4yMzY0NzA0LDExLjc2Mjg3OTEgMTQuNzc4NzI5NiwxMi4xMDEwMDQxIDE0LjMxNzIxMTEsMTIuMjU3ODc5MSBMMTMuODM1NTQ0NCwxMy4xMTY2MjkxIiBpZD0iU3Ryb2tlLTY0NCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjY5ODg0ODEsMTQuOTQ2NDQxNiBMMTcuMjY5OTIyMiwxNC4wMTAxOTE2IiBpZD0iU3Ryb2tlLTY0NSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4zNTg5MjIyLDMuMjg5NjkxNTcgTDI0LjM1ODkyMjIsMi43MDQ2OTE1NyBDMjQuMzUxMzY2NywyLjQzMDk0MTU3IDI0LjE3MTI5MjYsMi4xNzI4MTY1NyAyMy44NjM0MDM3LDIuMTEwMzE2NTcgTDIyLjQ1NjE4MTUsMS44NzcxOTE1NyBDMjEuODkwNzc0MSwxLjc2NzgxNjU3IDIxLjIzNzg0ODEsMi40NTQ2OTE1NyAyMC42MDk0Nzc4LDIuMzUyODE2NTcgTDE4LjkxMTM2NjcsMi4wNTU5NDE1NyBDMTguMzYxMDcwNCwxLjk3MDMxNjU3IDE4LjYyODY2MywxLjE3NDY5MTU3IDE4LjA4MDI1NTYsMS4wNzQwNjY1NyBMMTYuNzI1OTIyMiwwLjgyMzQ0MTU3NSBDMTYuNDMwNjI1OSwwLjc2MTU2NjU3NSAxNi4xMTg5NTkzLDAuODIwOTQxNTc1IDE1Ljk2NDA3MDQsMS4wNTg0NDE1NyBMMTUuMTUxODQ4MSwyLjI5NDY5MTU3IEMxNS4wMTA4MTExLDIuNTA1MzE2NTcgMTQuOTc5MzI5NiwyLjc4NTMxNjU3IDE0Ljk3OTMyOTYsMy4wMjc4MTY1NyBMMTQuOTc5MzI5NiwzLjU0MjgxNjU3IiBpZD0iU3Ryb2tlLTY0NiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuNjkyNDQ4MSwzLjc3MTc1NDA3IEwxNi42NzI3ODE1LDMuOTUyMzc5MDcgQzE3LjM3OTg1NTYsNC4xMDA1MDQwNyAxNy44OTgwNDA3LDMuMzE0MjU0MDcgMTguNTgxMTg4OSwzLjQ1MTEyOTA3IEwyMC4xOTk5NjY3LDMuNzIzNjI5MDcgQzIwLjg2ODYzMzMsMy44NDExMjkwNyAyMC44NjE3MDc0LDQuNzM1NTA0MDcgMjEuNTc0NDQ4MSw0Ljg2NDg3OTA3IEwyMi42OTMzLDUuMDYzNjI5MDciIGlkPSJTdHJva2UtNjQ3IiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTIzLjQ5NDEyNTksNC45NDQwNjY1NyBMMjQuMDU4OTAzNyw0LjAxOTA2NjU3IiBpZD0iU3Ryb2tlLTY0OCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMi41NTA1OTI2LDMuNDkyNTA0MDcgTDI0LjI1NDU5MjYsMi4yMDU2MjkwNyBDMjQuMTY5NTkyNiwyLjA3Njg3OTA3IDI0LjAzNzM3MDQsMS45Nzc1MDQwNyAyMy44NjQyMjIyLDEuOTQxODc5MDcgTDIyLjQ1NywxLjcwODEyOTA3IEMyMi4yNzMxNDgxLDEuNjczMTI5MDcgMjIuMDgxMTExMSwxLjcyMTI1NDA3IDIxLjg4MzQwNzQsMS43OTg3NTQwNyBMMTguNDI0ODUxOSwxLjIwNTYyOTA3IEMxOC4zNjMxNDgxLDEuMDYwNjI5MDcgMTguMjcxODUxOSwwLjk0MDAwNDA3NSAxOC4wODA0NDQ0LDAuOTA1MDA0MDc1IEwxNi43MjY3NDA3LDAuNjU0Mzc5MDc1IEMxNi40NzQyNTkzLDAuNjAyNTA0MDc1IDE2LjIxMTcwMzcsMC42MzgxMjkwNzUgMTYuMDQyOTYzLDAuNzk2ODc5MDc1IEwxMi4zNTI3MDM3LDAuMDMxODc5MDc0NSBDMTEuNjI4NjI5NiwtMC4wODk5OTU5MjU1IDEwLjgyOSwwLjE0MTg3OTA3NSAxMC40OTc4MTQ4LDAuNjUzNzU0MDc1IEwwLjQxMzY2NjY2NywxMi40NjI1MDQxIEMwLjExNjQ4MTQ4MSwxMi44OTc1MDQxIDAuMDA4MTg1MTg1MTksMTMuNTM3NTA0MSAwLDE0LjA5NjI1NDEgTDAuNDUzOTYyOTYzLDI0LjUzNjI1NDEgQzAuNDYyMTQ4MTQ4LDI1LjA1MjUwNDEgMC44MDcxODUxODUsMjUuNTI0Mzc5MSAxLjM4NDU1NTU2LDI1LjYzMzEyOTEgTDIzLjg1NjY2NjcsMjkuNzc4MTI5MSBDMjQuNTQyOTYzLDI5LjkyMTI1NDEgMjUuMjk2NjI5NiwyOS42NDU2MjkxIDI1LjYwMDc0MDcsMjkuMTIwMDA0MSBMMzIuNTcyNjI5NiwxNy42NzUwMDQxIEMzMi44MzIwMzcsMTcuMTkyNTA0MSAzMi45NjY3Nzc4LDE2LjYyNzUwNDEgMzIuOTc2ODUxOSwxNi4wNDAwMDQxIEwzMy42NTQzMzMzLDQuNzg1MDA0MDcgQzMzLjY0NDI1OTMsNC4yMTAwMDQwNyAzMy4yMzA1OTI2LDMuNjIwMDA0MDcgMzIuNTUwNTkyNiwzLjQ5MjUwNDA3IFoiIGlkPSJTdHJva2UtNjQ5IiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS4xMDI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTAuMTk2ODg1MTg1LDEzLjQyMjk0MTYgTDIyLjcxNjg0ODEsMTcuNTE2NjkxNiBDMjMuNDQ3ODQ4MSwxNy42NDk4MTY2IDI0LjA5NTczNywxNy40MDk4MTY2IDI0LjQwOTI5MjYsMTYuOTExNjkxNiBMMzMuMjA3NzM3LDQuNDA1NDQxNTciIGlkPSJTdHJva2UtNjUwIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjA1ODMxMTEsMTMuNzE4NzU0MSBDMTAuNjUyMiwxMy45MDMxMjkxIDEwLjI2NDM0ODEsMTQuMjExODc5MSA5Ljc5NDAxNDgxLDE0LjExMzc1NDEgTDguODAyMzQ4MTUsMTMuOTMxODc5MSIgaWQ9IlN0cm9rZS02NTEiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuODg3NzU5MywxNS4yMzU1MDQxIEwxNC43NTU2ODUyLDE1LjAzNDg3OTEiIGlkPSJTdHJva2UtNjUyIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LjM3NjI3MDQsMTIuMjY5NDQxNiBMMTMuODg1Nzg4OSwxMy4wNDg4MTY2IEMxMy43NzgxMjIyLDEzLjIwMDY5MTYgMTMuNzQ5Nzg4OSwxMy40MjU2OTE2IDEzLjc0OTc4ODksMTMuNTgzODE2NiBMMTMuNzQ5Nzg4OSwxNC4xMDc1NjY2IiBpZD0iU3Ryb2tlLTY1MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
var imageCube2 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU4ICg4NDY2MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+Y3ViZTJfbTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cC1Db3B5LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCA1LjAwMDAwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzIuNjUzOTE0OCwzLjQ5Mzc1NDA3IEwyNC4zNTc5MTQ4LDIuMjA2ODc5MDcgQzI0LjI3MjkxNDgsMi4wNzgxMjkwNyAyNC4xNDA2OTI2LDEuOTc4NzU0MDcgMjMuOTY3NTQ0NCwxLjk0MzEyOTA3IEwyMi41NjAzMjIyLDEuNzA5Mzc5MDcgQzIyLjM3NjQ3MDQsMS42NzQzNzkwNyAyMi4xODQ0MzMzLDEuNzIyNTA0MDcgMjEuOTg2NzI5NiwxLjgwMDAwNDA3IEwxOC41MjgxNzQxLDEuMjA2ODc5MDcgQzE4LjQ2NjQ3MDQsMS4wNjE4NzkwNyAxOC4zNzUxNzQxLDAuOTQxMjU0MDc1IDE4LjE4Mzc2NjcsMC45MDYyNTQwNzUgTDE2LjgzMDA2MywwLjY1NTYyOTA3NSBDMTYuNTc3NTgxNSwwLjYwMzc1NDA3NSAxNi4zMTUwMjU5LDAuNjM5Mzc5MDc1IDE2LjE0NjI4NTIsMC43OTgxMjkwNzUgTDEyLjQ1NjAyNTksMC4wMzMxMjkwNzQ1IEMxMS43MzE5NTE5LC0wLjA4ODc0NTkyNTUgMTAuOTMyMzIyMiwwLjE0MzEyOTA3NSAxMC42MDExMzcsMC42NTUwMDQwNzUgTDAuNTE2OTg4ODg5LDEyLjQ2Mzc1NDEgQzAuMjE5ODAzNzA0LDEyLjg5ODc1NDEgMC4xMTE1MDc0MDcsMTMuNTM4NzU0MSAwLjEwMzMyMjIyMiwxNC4wOTc1MDQxIEwwLjU1NzI4NTE4NSwyNC41Mzc1MDQxIEMwLjU2NTQ3MDM3LDI1LjA1Mzc1NDEgMC45MTA1MDc0MDcsMjUuNTI1NjI5MSAxLjQ4Nzg3Nzc4LDI1LjYzNDM3OTEgTDIzLjk1OTk4ODksMjkuNzc5Mzc5MSBDMjQuNjQ2Mjg1MiwyOS45MjI1MDQxIDI1LjM5OTk1MTksMjkuNjQ2ODc5MSAyNS43MDQwNjMsMjkuMTIxMjU0MSBMMzIuNjc1OTUxOSwxNy42NzYyNTQxIEMzMi45MzUzNTkzLDE3LjE5Mzc1NDEgMzMuMDcwMSwxNi42Mjg3NTQxIDMzLjA4MDE3NDEsMTYuMDQxMjU0MSBMMzMuNzU3NjU1Niw0Ljc4NjI1NDA3IEMzMy43NDgyMTExLDQuMjExMjU0MDcgMzMuMzMzOTE0OCwzLjYyMTI1NDA3IDMyLjY1MzkxNDgsMy40OTM3NTQwNyIgaWQ9IkZpbGwtNjI5IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi4zNDc5NDgxLDEwLjgwODI1NDEgQzIyLjI0MTU0MDcsMTAuOTYwMTI5MSAyMi4yMTMyMDc0LDExLjE4NTEyOTEgMjIuMjEzMjA3NCwxMS4zNDM4NzkxIEwyMi4yMTMyMDc0LDExLjg2NzAwNDEgQzIyLjIyNTE3MDQsMTIuMDUwMTI5MSAyMi41NDk0Mjk2LDEyLjIxODI1NDEgMjIuODQ3MjQ0NCwxMi4yNTUxMjkxIEwyNC44NzQ2NTE5LDEyLjYzNDUwNDEgQzI1LjI0MzYxNDgsMTIuNzE5NTA0MSAyNS42NDcyMDc0LDEyLjU3Mzg3OTEgMjUuODY4MjA3NCwxMi4yMjAxMjkxIEwyNi40OTM0Mjk2LDExLjIzNDUwNDEgQzI2LjgxMjAyMjIsMTAuNjk4MjU0MSAyNS44NjgyMDc0LDEwLjI3MjYyOTEgMjYuMTc0ODM3LDkuNzk3NjI5MDcgTDI2Ljk2ODgsOS4xNTA3NTQwNyBDMjcuMjI2MzE4NSw4Ljc3Mzg3OTA3IDI4LjIzMTIwNzQsOS4wNzcwMDQwNyAyOC40NzczOTI2LDguNjg3NjI5MDcgTDI4LjYyNDA5NjMsOC40NDQ1MDQwNyBDMjguNzIxNjg4OSw4LjI2MTM3OTA3IDI4Ljg4MjI0NDQsNy45Njk1MDQwNyAyOC44ODIyNDQ0LDcuODEwNzU0MDcgTDI4Ljg4MjI0NDQsNy4yNzU3NTQwNyBDMjguODgyMjQ0NCw3LjA2ODI1NDA3IDI4LjY5ODM5MjYsNi44MzcwMDQwNyAyOC40NDA4NzQxLDYuNzc4MjU0MDcgQzI4LjU2MzAyMjIsNy4wMjAxMjkwNyAyOC41Mzg0NjY3LDcuMjYzMjU0MDcgMjguMzkxNzYzLDcuNTQzODc5MDcgTDI4LjI0NDQyOTYsNy43ODcwMDQwNyBDMjcuOTk4ODc0MSw4LjE3NjM3OTA3IDI3LjEwMzU0MDcsNy44NjAxMjkwNyAyNi44NDYwMjIyLDguMjM3MDA0MDcgTDI1LjczMjIwNzQsOS4zNjAxMjkwNyBDMjUuNDI2ODM3LDkuODM0NTA0MDcgMjYuMjQ4NTAzNywxMC4yNDc2MjkxIDI1LjkyODY1MTksMTAuNzgzODc5MSBMMjUuNDI2ODM3LDExLjUzODI1NDEgQzI1LjM0MTgzNywxMS42ODUxMjkxIDI1LjA4MzA1OTMsMTEuNzMzMjU0MSAyNC44NzQ2NTE5LDExLjY4NTEyOTEgTDIyLjg0NzI0NDQsMTEuMzA1NzU0MSBDMjIuNjMwMDIyMiwxMS4yODI2MjkxIDIyLjMxMTQyOTYsMTEuMTQ4ODc5MSAyMi4zNDc5NDgxLDEwLjgwODI1NDEiIGlkPSJGaWxsLTYzMSIgZmlsbD0iI0JFQjVBQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNC43OTYwMTQ4MSw3LjQ0OTUwNDA3IEM0LjY3OTUzMzMzLDcuNTk2Mzc5MDcgNC42MzkyMzcwNCw3LjgxODg3OTA3IDQuNjMxMDUxODUsNy45NzYzNzkwNyBMNC42MDI3MTg1Miw4LjQ5NjM3OTA3IEM0LjYwNTIzNzA0LDguNjc4MjU0MDcgNC45MjMyLDguODU1NzU0MDcgNS4yMTk3NTU1Niw4LjkwNDUwNDA3IEw3LjIzNzcxODUyLDkuMzU1NzU0MDcgQzcuNjAzNTMzMzMsOS40NTM4NzkwNyA4LjAxODQ1OTI2LDkuMzI0NTA0MDcgOC4yNTk2MDc0MSw4Ljk4MjAwNDA3IEw5LjAwMjU3MDM3LDguMDg1NzU0MDcgQzkuMzUyMDE0ODEsNy41NjU3NTQwNyA4LjYwMzM4NTE5LDcuMTU4ODc5MDcgOC45Mzc3MTg1Miw2LjY5ODI1NDA3IEw5LjUzMzM0ODE1LDYuMDIyNjI5MDcgQzkuODEyOTAzNyw1LjY1NzAwNDA3IDEwLjg0NzM4NTIsNS45NzgyNTQwNyAxMS4xMTU2MDc0LDUuNjAwNzU0MDcgTDExLjI5Mzc5MjYsNS4zNzc2MjkwNyBDMTEuNDAyNzE4NSw1LjE5OTUwNDA3IDExLjYxMDQ5NjMsNC45NjQ1MDQwNyAxMS42MTkzMTExLDQuODA3MDA0MDcgTDExLjY0ODI3NDEsNC4yNzU3NTQwNyBDMTEuNjU4OTc3OCw0LjA3MDEyOTA3IDExLjQzNzM0ODEsMy43NzI2MjkwNyAxMS4xODE3MTg1LDMuNzA0NTA0MDcgQzExLjI5MTkwMzcsMy45NDg4NzkwNyAxMS4zMzU5Nzc4LDQuMTcxMzc5MDcgMTEuMTcyMjc0MSw0LjQ0Mzg3OTA3IEwxMC45MjkyMzcsNC42OTgyNTQwNyBDMTAuNjYyMjc0MSw1LjA3NjM3OTA3IDkuNzM5MjM3MDQsNC43NDYzNzkwNyA5LjQ2MDMxMTExLDUuMTEyMDA0MDcgTDguNTE3MTI1OTMsNi4yNDcwMDQwNyBDOC4xODM0MjIyMiw2LjcwNzYyOTA3IDguODA4NjQ0NDQsNy4wOTc2MjkwNyA4LjQ1OTIsNy42MTc2MjkwNyBMNy44NTIyMzcwNCw4LjI4ODI1NDA3IEM3Ljc1Nzc5MjU5LDguNDMwMTI5MDcgNy40OTY0OTYzLDguNDY4ODc5MDcgNy4yODkzNDgxNSw4LjQxMzI1NDA3IEw1LjI3MTM4NTE5LDcuOTYyMDA0MDcgQzUuMDUzNTMzMzMsNy45MzA3NTQwNyA0Ljc0MDYwNzQxLDcuNzg3MDA0MDcgNC43OTYwMTQ4MSw3LjQ0OTUwNDA3IiBpZD0iRmlsbC02MzIiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTguMDgwNjY2NjcsMTMuMDA3NDQxNiBMOC4wODA2NjY2NywxMy41Mjg2OTE2IEM4LjA4MzgxNDgxLDEzLjc1MzY5MTYgOC40ODM2Mjk2MywxMy44OTM2OTE2IDguODAyMjIyMjIsMTMuOTMxODE2NiBMOS43OTM4ODg4OSwxNC4xMTM2OTE2IEMxMC4zNDk4NTE5LDE0LjIyOTk0MTYgMTAuOTc3NTkyNiwxMy42OTkzMTY2IDExLjI4Mjk2MywxMy42MzM2OTE2IEMxMS40Njg3MDM3LDEzLjU5MzA2NjYgMTEuNzMxMjU5MywxMy4yMDI0NDE2IDExLjc2OTY2NjcsMTIuNzkxODE2NiBMMTEuODQ1ODgxNSwxMi4wMTQ5NDE2IEMxMS44NDgzNzA0LDExLjg3NTU2NjYgMTEuNjg5NzAzNywxMS45NDE4MTY2IDExLjY0NDM3MDQsMTIuMDAzMDY2NiBMMTEuMjgzNTkyNiwxMi43MzI0NDE2IEMxMC43OTA1OTI2LDEyLjg3NjgxNjYgMTAuMzQ5ODUxOSwxMy4zMjk5NDE2IDkuNzkzODg4ODksMTMuMjE0MzE2NiBMOC44MDIyMjIyMiwxMy4wMzA1NjY2IEM4LjU0NjU5MjU5LDEzLjAwOTMxNjYgOC4wOTk1NTU1NiwxMi43MjY4MTY2IDguMDgwNjY2NjcsMTMuMDA3NDQxNiIgaWQ9IkZpbGwtNjMzIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy44MzY3NDA3LDEzLjI3MTA2NjYgQzE0LjEwNTU5MjYsMTMuNTg2MDY2NiAxNC4yNTYwNzQxLDE0LjA0NjY5MTYgMTQuNzU1MzcwNCwxNC4xMzczMTY2IEwxNS44ODgwNzQxLDE0LjMzODU2NjYgQzE2LjEwMDg4ODksMTQuMzc1NDQxNiAxNi4zNDI2NjY3LDE0LjMwNzMxNjYgMTYuNDE3NTkyNiwxNC4xNTU0NDE2IEwxNy4zNjgzMzMzLDEyLjY2Nzk0MTYgQzE3LjQxNDkyNTksMTIuNjA1NDQxNiAxNy41NzY3NDA3LDEyLjUzNzMxNjYgMTcuNTczNTkyNiwxMi42ODA0NDE2IEwxNy41NzM1OTI2LDEzLjI3MjMxNjYgQzE3LjU3MTA3NDEsMTMuNDI3OTQxNiAxNy40MzY5NjMsMTMuNzY5ODE2NiAxNy4yNzAxMTExLDE0LjAxMDQ0MTYgTDE2LjY5Nzc3NzgsMTQuOTQ2MDY2NiBDMTYuNTQ2MDM3LDE1LjIwNzMxNjYgMTYuMjQxOTI1OSwxNS4zMDY2OTE2IDE1Ljg4ODA3NDEsMTUuMjM3OTQxNiBMMTQuNzU1MzcwNCwxNS4wMzczMTY2IEMxNC4yNTU0NDQ0LDE0Ljk0NzMxNjYgMTQuMTA0OTYzLDE0LjQ4NDgxNjYgMTMuODM1NDgxNSwxNC4xNjk4MTY2IEwxMy44MzY3NDA3LDEzLjI3MTA2NjYgWiIgaWQ9IkZpbGwtNjM0IiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNS4wMDcwOTYzLDIuODUxMzE2NTcgTDE1LjAwNzA5NjMsMy4zNjMxOTE1NyBDMTUuMDEwMjQ0NCwzLjU4MzgxNjU3IDE1LjQwMzc2MywzLjcyMTk0MTU3IDE1LjcxNjA1OTMsMy43NTgxOTE1NyBMMTYuNjkwNzI1OSwzLjkzODE5MTU3IEMxNy4zOTUyODE1LDQuMDg1NjkxNTcgMTcuOTEwOTQ4MSwzLjMwNDQ0MTU3IDE4LjU4NzgsMy40NDAwNjY1NyBMMjAuMTk5NjUxOSwzLjcxMDY5MTU3IEMyMC44NjM5MTExLDMuODI4MTkxNTcgMjAuODU2OTg1Miw0LjcxNzU2NjU3IDIxLjU2NTMxODUsNC44NDYzMTY1NyBMMjIuNjc3ODc0MSw1LjA0MzgxNjU3IEMyMy4wMjY2ODg5LDUuMTEwMDY2NTcgMjMuMzI0NTAzNyw1LjAxMTk0MTU3IDIzLjQ3NTYxNDgsNC43NTYzMTY1NyBMMjQuMDM2NjE0OCwzLjgzNjMxNjU3IEMyNC4yMDA5NDgxLDMuNTk5NDQxNTcgMjQuMzMyNTQwNywzLjI2NDQ0MTU3IDI0LjMzNTA4ODksMy4xMTA2OTE1NyBMMjQuMzM1MDg4OSwyLjUyODgxNjU3IEMyNC4zMzc1Nzc4LDIuMzg5NDQxNTcgMjQuMTc4OTExMSwyLjQ1NTY5MTU3IDI0LjEzMzU3NzgsMi41MTY5NDE1NyBMMjMuMTk4NTc3OCwzLjk3ODE5MTU3IEMyMy4xMjQ5MTExLDQuMTI3NTY2NTcgMjIuODg4OCw0LjE5NTA2NjU3IDIyLjY3Nzg3NDEsNC4xNTg4MTY1NyBMMjEuNTY1MzE4NSwzLjk2MDY5MTU3IEMyMC44NTY5ODUyLDMuODMxOTQxNTcgMjAuODYzOTExMSwyLjk0MzE5MTU3IDIwLjE5OTY1MTksMi44MjYzMTY1NyBMMTguNTg3OCwyLjU1NTA2NjU3IEMxNy45MTA5NDgxLDIuNDE4ODE2NTcgMTcuMzk1MjgxNSwzLjIwMDY5MTU3IDE2LjY5MDcyNTksMy4wNTMxOTE1NyBMMTUuNzE2MDU5MywyLjg3MzgxNjU3IEMxNS40NjQ4MzcsMi44NTE5NDE1NyAxNS4wMjQ3MjU5LDIuNTc1NjkxNTcgMTUuMDA3MDk2MywyLjg1MTMxNjU3IiBpZD0iRmlsbC02MzUiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI1LjM3ODI5MjYsMjkuMTE5NzU0MSBMMzIuNTcyNDQwNywxNy42NzQxMjkxIEMzMi44MzE4NDgxLDE3LjE5Mjg3OTEgMzIuOTY2NTg4OSwxNi42Mjc4NzkxIDMyLjk3NjY2MywxNi4wNDAzNzkxIEwzMy42NTQ3NzQxLDQuNzg0NzU0MDcgQzMzLjY1MzUxNDgsNC40MzIyNTQwNyAzMy40OTczNjY3LDQuMjExMDA0MDcgMzMuMzExNjI1OSw0LjQ0NDEyOTA3IEwyNC4xODY0MDM3LDE3LjEzMjI1NDEgQzIzLjk0MzM2NjcsMTcuNTMyODc5MSAyMy43OTkxODE1LDE3LjY5ODUwNDEgMjMuODA1NDc3OCwxOC4xNzQ3NTQxIEwyMy44MDU0Nzc4LDI4Ljc3MTYyOTEgQzIzLjgxMTE0NDQsMjkuNTg2MDA0MSAyNC45Mzg4MTExLDI5Ljg3MTAwNDEgMjUuMzc4MjkyNiwyOS4xMTk3NTQxIiBpZD0iRmlsbC02MzYiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI4Ljg4MjE4MTUsNy44MTEzNzkwNyBMMjguODgyMTgxNSw3LjI3NTc1NDA3IEMyOC44ODIxODE1LDcuMDY4ODc5MDcgMjguNjk4MzI5Niw2LjgzNzYyOTA3IDI4LjQ0MDgxMTEsNi43NzgyNTQwNyBMMjYuMDI0MjkyNiw2LjM2MjYyOTA3IEMyNS43Nzg3MzcsNi4zMjYzNzkwNyAyNS40OTY2NjMsNi40MjM4NzkwNyAyNS4zOTg0NDA3LDYuNTk0NTA0MDcgTDI1LjAxODc3NDEsNy4xOTAxMjkwNyBDMjQuNjM4NDc3OCw3Ljc2MzI1NDA3IDI1LjcyODM2NjcsOC4xNTM4NzkwNyAyNS40NzIxMDc0LDguNTc4MjU0MDcgTDI0LjYxODMyOTYsOS41MjcwMDQwNyBDMjQuMzYwODExMSw5Ljk1MzI1NDA3IDIzLjE0NzUxNDgsOS42MjcwMDQwNyAyMi45MDE5NTkzLDEwLjAyOTUwNDEgTDIyLjM0Nzg4NTIsMTAuODA4ODc5MSBDMjIuMjQwODQ4MSwxMC45NjAxMjkxIDIyLjIxMjUxNDgsMTEuMTg1NzU0MSAyMi4yMTI1MTQ4LDExLjM0Mzg3OTEgTDIyLjIxMjUxNDgsMTEuODY3NjI5MSIgaWQ9IlN0cm9rZS02MzciIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjMxNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi44NDY5OTI2LDEyLjI1NTYyOTEgTDI0Ljg3NDQsMTIuNjM0Mzc5MSIgaWQ9IlN0cm9rZS02MzgiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjUuODY4MjA3NCwxMi4yMjA1NjY2IEwyNi40OTM0Mjk2LDExLjIzMzY5MTYgQzI2LjgxMjY1MTksMTAuNjk4NjkxNiAyNS44NjgyMDc0LDEwLjI3MjQ0MTYgMjYuMTc0ODM3LDkuNzk4MDY2NTcgTDI2Ljk2ODgsOS4xNTExOTE1NyBDMjcuMjI2MzE4NSw4Ljc3MzA2NjU3IDI4LjIzMTgzNyw5LjA3NzQ0MTU3IDI4LjQ3NzM5MjYsOC42ODgwNjY1NyBMMjguNjI0NzI1OSw4LjQ0NDMxNjU3IiBpZD0iU3Ryb2tlLTYzOSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS42MjIyNzA0LDQuODEwMTkxNTcgTDExLjY1MjQ5MjYsNC4yNzk1NjY1NyBDMTEuNjY0NDU1Niw0LjA3NTE5MTU3IDExLjQ0MTU2NjcsMy43NzcwNjY1NyAxMS4xODU5MzcsMy43MDk1NjY1NyBMOC44MDc4MjU5MywzLjE4MjA2NjU3IEM4LjU2MjksMy4xMzcwNjY1NyA4LjI3MzI3MDM3LDMuMjIyMDY2NTcgOC4xNjQzNDQ0NCwzLjM4NzY5MTU3IEw3LjY2MDAxMTExLDMuOTQxNDQxNTcgQzcuMjQ0NDU1NTYsNC40OTM5NDE1NyA4LjI3NjQxODUyLDQuOTI1ODE2NTcgNy45OTQ5NzQwNyw1LjMzNTgxNjU3IEw3LjE1NzU2NjY3LDYuMjY3MDY2NTcgQzYuODc0ODYyOTYsNi42Nzg5NDE1NyA1LjU4ODUyOTYzLDYuMjk2NDQxNTcgNS4zMTg0MTg1Miw2LjY4NDU2NjU3IEw0Ljc4MDcxNDgxLDcuNDM3NjkxNTcgQzQuNjYzNjAzNyw3LjU4NTE5MTU3IDQuNjIzMzA3NDEsNy44MDY0NDE1NyA0LjYxNDQ5MjU5LDcuOTYyNjkxNTcgTDQuNTg1NTI5NjMsOC40ODE0NDE1NyIgaWQ9IlN0cm9rZS02NDAiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjMxNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjIwMjQ0MDc0LDguODg5NzU0MDcgTDcuMjI0ODExMTEsOS4zNDM1MDQwNyIgaWQ9IlN0cm9rZS02NDEiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4yNDg2NTE4NSw4Ljk3MTA2NjU3IEw4Ljk5NDEzMzMzLDguMDc4NTY2NTcgQzkuMzQ1NDY2NjcsNy41NTk4MTY1NyA4LjU5NTU3Nzc4LDcuMTUxNjkxNTcgOC45MzE4LDYuNjkzNTY2NTcgTDkuNTMwNTc3NzgsNi4wMjA0NDE1NyBDOS44MTEzOTI1OSw1LjY1NjY5MTU3IDEwLjg0NjUwMzcsNS45Nzg1NjY1NyAxMS4xMTUzNTU2LDUuNjAxNjkxNTcgTDExLjI5NTQyOTYsNS4zNzg1NjY1NyIgaWQ9IlN0cm9rZS02NDIiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOC4wODA2NjY2NywxMy41Mjg2OTE2IEw4LjA4MDY2NjY3LDEzLjAwNzQ0MTYgQzguMDgwNjY2NjcsMTIuNzYzMDY2NiA4LjExMjE0ODE1LDEyLjQ3ODA2NjYgOC4yNTYzMzMzMywxMi4yNjU1NjY2IEw5LjA3NzM3MDM3LDExLjAxNDMxNjYgQzkuMjMzNTE4NTIsMTAuNzc0MzE2NiA5LjU0OTU5MjU5LDEwLjcxMzY5MTYgOS44NDg2NjY2NywxMC43NzYxOTE2IEwxMS4yMTkzNzA0LDExLjAzMDU2NjYgQzExLjU2NjI5NjMsMTEuMDk0MzE2NiAxMS42NjY0MDc0LDExLjUzNjE5MTYgMTEuNjk2LDExLjY5ODY5MTYgQzExLjcyNTU5MjYsMTEuODYwNTY2NiAxMS4zMjUxNDgxLDEyLjY3MzY5MTYgMTEuMzI1MTQ4MSwxMi42NzM2OTE2IiBpZD0iU3Ryb2tlLTY0MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE3LjU3NDI4NTIsMTMuMjcyMjU0MSBMMTcuNTc0Mjg1MiwxMi42Nzk3NTQxIEMxNy41NjYxLDEyLjQwMzUwNDEgMTcuMzgzNTA3NCwxMi4xNDI4NzkxIDE3LjA3MzEsMTIuMDc5NzU0MSBMMTUuNjQ4ODc3OCwxMS44NDM1MDQxIEMxNS4yMzY0NzA0LDExLjc2Mjg3OTEgMTQuNzc4NzI5NiwxMi4xMDEwMDQxIDE0LjMxNzIxMTEsMTIuMjU3ODc5MSBMMTMuODM1NTQ0NCwxMy4xMTY2MjkxIiBpZD0iU3Ryb2tlLTY0NCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjY5ODg0ODEsMTQuOTQ2NDQxNiBMMTcuMjY5OTIyMiwxNC4wMTAxOTE2IiBpZD0iU3Ryb2tlLTY0NSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4zNTg5MjIyLDMuMjg5NjkxNTcgTDI0LjM1ODkyMjIsMi43MDQ2OTE1NyBDMjQuMzUxMzY2NywyLjQzMDk0MTU3IDI0LjE3MTI5MjYsMi4xNzI4MTY1NyAyMy44NjM0MDM3LDIuMTEwMzE2NTcgTDIyLjQ1NjE4MTUsMS44NzcxOTE1NyBDMjEuODkwNzc0MSwxLjc2NzgxNjU3IDIxLjIzNzg0ODEsMi40NTQ2OTE1NyAyMC42MDk0Nzc4LDIuMzUyODE2NTcgTDE4LjkxMTM2NjcsMi4wNTU5NDE1NyBDMTguMzYxMDcwNCwxLjk3MDMxNjU3IDE4LjYyODY2MywxLjE3NDY5MTU3IDE4LjA4MDI1NTYsMS4wNzQwNjY1NyBMMTYuNzI1OTIyMiwwLjgyMzQ0MTU3NSBDMTYuNDMwNjI1OSwwLjc2MTU2NjU3NSAxNi4xMTg5NTkzLDAuODIwOTQxNTc1IDE1Ljk2NDA3MDQsMS4wNTg0NDE1NyBMMTUuMTUxODQ4MSwyLjI5NDY5MTU3IEMxNS4wMTA4MTExLDIuNTA1MzE2NTcgMTQuOTc5MzI5NiwyLjc4NTMxNjU3IDE0Ljk3OTMyOTYsMy4wMjc4MTY1NyBMMTQuOTc5MzI5NiwzLjU0MjgxNjU3IiBpZD0iU3Ryb2tlLTY0NiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuNjkyNDQ4MSwzLjc3MTc1NDA3IEwxNi42NzI3ODE1LDMuOTUyMzc5MDcgQzE3LjM3OTg1NTYsNC4xMDA1MDQwNyAxNy44OTgwNDA3LDMuMzE0MjU0MDcgMTguNTgxMTg4OSwzLjQ1MTEyOTA3IEwyMC4xOTk5NjY3LDMuNzIzNjI5MDcgQzIwLjg2ODYzMzMsMy44NDExMjkwNyAyMC44NjE3MDc0LDQuNzM1NTA0MDcgMjEuNTc0NDQ4MSw0Ljg2NDg3OTA3IEwyMi42OTMzLDUuMDYzNjI5MDciIGlkPSJTdHJva2UtNjQ3IiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTIzLjQ5NDEyNTksNC45NDQwNjY1NyBMMjQuMDU4OTAzNyw0LjAxOTA2NjU3IiBpZD0iU3Ryb2tlLTY0OCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuNDcyNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMi41NTA1OTI2LDMuNDkyNTA0MDcgTDI0LjI1NDU5MjYsMi4yMDU2MjkwNyBDMjQuMTY5NTkyNiwyLjA3Njg3OTA3IDI0LjAzNzM3MDQsMS45Nzc1MDQwNyAyMy44NjQyMjIyLDEuOTQxODc5MDcgTDIyLjQ1NywxLjcwODEyOTA3IEMyMi4yNzMxNDgxLDEuNjczMTI5MDcgMjIuMDgxMTExMSwxLjcyMTI1NDA3IDIxLjg4MzQwNzQsMS43OTg3NTQwNyBMMTguNDI0ODUxOSwxLjIwNTYyOTA3IEMxOC4zNjMxNDgxLDEuMDYwNjI5MDcgMTguMjcxODUxOSwwLjk0MDAwNDA3NSAxOC4wODA0NDQ0LDAuOTA1MDA0MDc1IEwxNi43MjY3NDA3LDAuNjU0Mzc5MDc1IEMxNi40NzQyNTkzLDAuNjAyNTA0MDc1IDE2LjIxMTcwMzcsMC42MzgxMjkwNzUgMTYuMDQyOTYzLDAuNzk2ODc5MDc1IEwxMi4zNTI3MDM3LDAuMDMxODc5MDc0NSBDMTEuNjI4NjI5NiwtMC4wODk5OTU5MjU1IDEwLjgyOSwwLjE0MTg3OTA3NSAxMC40OTc4MTQ4LDAuNjUzNzU0MDc1IEwwLjQxMzY2NjY2NywxMi40NjI1MDQxIEMwLjExNjQ4MTQ4MSwxMi44OTc1MDQxIDAuMDA4MTg1MTg1MTksMTMuNTM3NTA0MSAwLDE0LjA5NjI1NDEgTDAuNDUzOTYyOTYzLDI0LjUzNjI1NDEgQzAuNDYyMTQ4MTQ4LDI1LjA1MjUwNDEgMC44MDcxODUxODUsMjUuNTI0Mzc5MSAxLjM4NDU1NTU2LDI1LjYzMzEyOTEgTDIzLjg1NjY2NjcsMjkuNzc4MTI5MSBDMjQuNTQyOTYzLDI5LjkyMTI1NDEgMjUuMjk2NjI5NiwyOS42NDU2MjkxIDI1LjYwMDc0MDcsMjkuMTIwMDA0MSBMMzIuNTcyNjI5NiwxNy42NzUwMDQxIEMzMi44MzIwMzcsMTcuMTkyNTA0MSAzMi45NjY3Nzc4LDE2LjYyNzUwNDEgMzIuOTc2ODUxOSwxNi4wNDAwMDQxIEwzMy42NTQzMzMzLDQuNzg1MDA0MDcgQzMzLjY0NDI1OTMsNC4yMTAwMDQwNyAzMy4yMzA1OTI2LDMuNjIwMDA0MDcgMzIuNTUwNTkyNiwzLjQ5MjUwNDA3IFoiIGlkPSJTdHJva2UtNjQ5IiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS4xMDI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTAuMTk2ODg1MTg1LDEzLjQyMjk0MTYgTDIyLjcxNjg0ODEsMTcuNTE2NjkxNiBDMjMuNDQ3ODQ4MSwxNy42NDk4MTY2IDI0LjA5NTczNywxNy40MDk4MTY2IDI0LjQwOTI5MjYsMTYuOTExNjkxNiBMMzMuMjA3NzM3LDQuNDA1NDQxNTciIGlkPSJTdHJva2UtNjUwIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjA1ODMxMTEsMTMuNzE4NzU0MSBDMTAuNjUyMiwxMy45MDMxMjkxIDEwLjI2NDM0ODEsMTQuMjExODc5MSA5Ljc5NDAxNDgxLDE0LjExMzc1NDEgTDguODAyMzQ4MTUsMTMuOTMxODc5MSIgaWQ9IlN0cm9rZS02NTEiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjQ3MjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuODg3NzU5MywxNS4yMzU1MDQxIEwxNC43NTU2ODUyLDE1LjAzNDg3OTEiIGlkPSJTdHJva2UtNjUyIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC40NzI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LjM3NjI3MDQsMTIuMjY5NDQxNiBMMTMuODg1Nzg4OSwxMy4wNDg4MTY2IEMxMy43NzgxMjIyLDEzLjIwMDY5MTYgMTMuNzQ5Nzg4OSwxMy40MjU2OTE2IDEzLjc0OTc4ODksMTMuNTgzODE2NiBMMTMuNzQ5Nzg4OSwxNC4xMDc1NjY2IiBpZD0iU3Ryb2tlLTY1MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuMzE1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9Ikdyb3VwLTQtQ29weS0yMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuMDAwMDAwLCAyNi4wMDAwMDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LDcgQzE0LDEwLjg2NjIxNDMgMTAuODY2MDgzLDE0IDYuOTk5NzA2NzgsMTQgQzMuMTMzOTE2OTgsMTQgMCwxMC44NjYyMTQzIDAsNyBDMCwzLjEzNDM3MjEyIDMuMTMzOTE2OTgsMCA2Ljk5OTcwNjc4LDAgQzEwLjg2NjA4MywwIDE0LDMuMTM0MzcyMTIgMTQsNyIgaWQ9IkZpbGwtMSIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOS4zMTA0NSw4LjczMDE3IEw5LjMxMDQ1LDkuOTY4NjYgTDQuOSw5Ljk2ODY2IEw0LjksOC43MzAxNyBMNS40MjcwOTY5NSw4LjI3NzQ3MDYgQzcuMTA2MzMzMDcsNi44MTk1MDYzIDcuNjUzMTksNi4xNjQ0MDgyMSA3LjY1MzE5LDUuNTMxNDggQzcuNjUzMTksNS4wMjM2MSA3LjI5Njc5LDQuNzM4NDkgNi43OTc4Myw0LjczODQ5IEM2LjQzMjUyLDQuNzM4NDkgNS45NTEzOCw0Ljg0NTQxIDUuMzU0NDEsNS4xODM5OSBMNC45LDQuMDcwMjQgQzUuNDg4MDYsMy42OTYwMiA2LjI4MTA1LDMuNSA2Ljk0OTMsMy41IEM4LjMzOTI2LDMuNSA5LjIxMjQ0LDQuMjEyOCA5LjIxMjQ0LDUuNDk1ODQgQzkuMjEyNDQsNi41OTE3NyA4LjQ0NjE4LDcuNDIwNCA2Ljg2MDIsOC43MzAxNyBMOS4zMTA0NSw4LjczMDE3IFoiIGlkPSIyIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
var imageExtension = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF0CAYAAAD/4EcMAAAABGdBTUEAALGPC/xhBQAAQABJREFUeAHsvQm4VcWV9r8u83gBUcAZkEFQREScFZSI84jimJg2dvJPdyftl/66Tez8o2ayTWJncDZRERRnEMFZlFEZFRBEFBlURFEQEBG4DF/9CtZ1czj7jPucu885az1PcYa9d+2qt/al3vOuVauqZOT07WJmCBgChoAhYAgYAoaAIRAZAvUiq8kqMgQMAUPAEDAEDAFDwBDwCBjBsgfBEDAEDAFDwBAwBAyBiBEwghUxoFadIWAIGAKGgCFgCBgCRrDsGTAEDAFDwBAwBAwBQyBiBIxgRQyoVWcIGAKGgCFgCBgChoARLHsGDAFDwBAwBAwBQ8AQiBgBI1gRA2rVGQKGgCFgCBgChoAhYATLngFDwBAwBAwBQ8AQMAQiRsAIVsSAWnWGgCFgCBgChoAhYAgYwbJnwBAwBAwBQ8AQMAQMgYgRMIIVMaBWnSFgCBgChoAhYAgYAkaw7BkwBAwBQ8AQMAQMAUMgYgSMYEUMqFVnCBgChoAhYAgYAoaAESx7BgwBQ8AQMAQMAUPAEIgYASNYEQNq1RkChoAhYAgYAoaAIWAEy54BQ8AQMAQMAUPAEDAEIkbACFbEgFp1hoAhYAgYAoaAIWAIGMGyZ8AQMAQMAUPAEDAEDIGIETCCFTGgVp0hYAgYAoaAIWAIGAJGsOwZMAQMAUPAEDAEDAFDIGIEjGBFDKhVZwgYAoaAIWAIGAKGgBEsewYMAUPAEDAEDAFDwBCIGAEjWBEDatUZAoaAIWAIGAKGgCFgBMueAUPAEDAEDAFDwBAwBCJGwAhWxIBadYaAIWAIGAKGgCFgCBjBsmfAEDAEDAFDwBAwBAyBiBEwghUxoFadIWAIGAKGgCFgCBgCRrDsGTAEDAFDwBAwBAwBQyBiBIxgRQyoVWcIGAKGgCFgCBgChoARLHsGDAFDwBAwBAwBQ8AQiBgBI1gRA5prdXs2aiBN61XlerldZwgYAoaAIWAIGAIxQqBBjNpScU1p7AjVjQfvK5fvv4fs37SRbN0uMm/dN/KbhZ/IyE++rDg8rMOGgCFgCBgChkC5IFAlI6e7ad2s2Ai0blhfJp10sBzSsmnSW9+2eKX8+9wPkx6zLw0BQ8AQMAQMAUMg3giYi7COxucvvQ4IJVc06Sed28k5HVrXUevstoaAIWAIGAKGgCGQDwJGsPJBL8drD3TuwO8d0Dbt1TccvE/ac+wEQ8AQMAQMAUPAEIgfAkaw6mBMjmzTPKO79mrVVBpVWeB7RmDZSYaAIWAIGAKGQIwQiE2Q+7C+naRnSDwSeN2wYLk8+9naGEGXe1PaNc4M9oaOXBGrtXLzltxvZlcaAoaAIWAIGAKGQNERyGymL0KzejhydUTrZqF3auvSGJSLvblmQ0Zd+WRjjZGrjJCykwwBQ8AQMAQMgXghYC7COhiPtxzBWvz1prR3fnL56rTn2AmGgCFgCBgChoAhED8EjGDVwZhs3r5drpq1RLaluPciR8Cuf2d5ijPskCFgCBgChoAhYAjEFQEjWHU0MlNWr5eTJr4r763fuFsLnnRJRo+fsEA2bE1FwXa7zL4wBAwBQ8AQMAQMgZggUD6BTTEBNJtmvO5IVq9x86W3Wy14ROvmsrZmq8xc87V8kIH7MJv72LmGgCFgCBgChoAhUFwEjGAVF+/d7lbj3IUzXUwWxcwQMAQMAUPAEDAEygMBcxGWxzhaLwwBQ8AQMAQMAUMgRggYwYrRYFhTDAFDwBAwBAwBQ6A8EDAXYcI4HuC2sdnflb2bNPQFF94Kl4+KstTFRpVi0k9ywR/UvLHs4/vUSDq41w1bt9b2i5ivNS7+y8wQMAQMAUPAEDAEokEgNgQr3YYw9dwJ9dP0OReKwH1P2rOlnOs2Vj5379aeiKS6zVtrN8gzK9bI6BVfyuy136Q6Ne2xVPLhdnc1JVcjC/ygdtW+T2e7vkEYw4y1ilNWrZcxrl+jXL8syD4MKfveEDAEDAFDwBDIDIEqGTk9n3k8s7tkcNaMAT2lb4pM7hlUIRdN/0BGuhQHmdqpe1XLzYfslzKDfKq6XnBb9/xi/scyZ132RKtnyyYyb+ChodW/+9VG6TluXujxsAMQxkv320N+02Nf6exUq2yNh+Ghj1bJr1wOrmXfbM72cjvfEDAEDAFDwBAwBBwCsVGwijka+zo1Z6jb+3CgI1j52OntWwll2Ier5N/mLJP1dZy36rDqpvJg384+7UOu/YKgfXf/tp6k/e/7n8kv3/lYclEGc72/XWcIGAKGgCFgCJQDAqm8VOXQv936cOwezWXmyYfkTa6CFX/vgLbyev8e0qlZo+DXRX1/4T5tfBvIqRWF4WK8rlsHeeH4btLGbThtZggYAoaAIWAIGAKZI1BRBOvifdvIayccLO0bRy/cHerUo+nOzdnPJQwttv1n1w7y5FEHSbP60Q8nKh/u2wNd4L+ZIWAIGAKGgCFgCGSGQPQzcmb3LfpZR7dpLsOc+6wR0fIFsraNGsjoY7sILshi2RBHGm9xcWSFNGK5Rh/bVZoXgMAVst1WtyFgCBgChoAhUFcIVATBgvCMOqaLNC4gudIB7NC4oYw+pqs0LcK9jmjVTB44opPeuqCvxHcNP7KzFI6eFrT5VrkhYAgYAoaAIVBUBKL3lRW1+Znd7O99OgrEJxOb41IvjPxktUz78mv55JsaaeiI0r5NG0p/l8ph8D57SMcM4qyOcKshb3Sr+K5zKwwLZQ0c0xnRr7M0zVBVmuzSMIxyKyznuDQTn26qcWpUfdnf9YWVlBe4+K12GbhNz3dpLK4+cE+5b9kXheqW1WsIGAKGgCFgCJQFArEhWIVSRgY4YsRKv3T2/vpN8h/zPpSxn67d7dS33Fd8//N5H8s/OYLxe+eS29O5A1PZTw9qL7d98Jl87BKUFsKuPnAv6daiSdqqpzui+O9zP/SEMfHkGW5jadJa/OztD+X/dOkg/91977SE7SZHHEe4NA7fbItFdo/ELtlnQ8AQMAQMAUMgFgikZglFbGK66fr7s5bIMDexZ2uZxCe9uHKdXDJ9kazbQsrNcCNdwT+cevOyO3/scV3lkJbhK/ZwR6JiXfPW0vAKczxCMPsNB++T9up/LP1C/tWljyAbfSqDLP3+vRXy4sq18oxzb6ZKSko2+J848viH9z9NVaUdMwQMAUPAEDAEKhqB2BCsQozCUS6wvZ8rqez11evl3DfeT0tCgnWQgPOUSQtduoeeflud4LHge9I3oA6lI27BazJ5T0qGVCSIOh52ZPSHs5dmUl3tObPWbJBTpyyUqf17SosG4eF5/9a5nRGsWtTK5029dWuk2aujpdE7b0r9VSvdTgJVsrXd3lLT7TDZfGhfqencQ7Y717KZIWAIGAKGQHoEyppgsf1NKlu3ZasMnrYoK3Kl9X2+eYtc7DLHT3X5r8KsgcsldUb71vLY8tVhp+T0PVv6pDLcnf+co3L2jssg/2NHzAhoD7P9XMqGPi7Anm2DzMoDgcZzpkrL4X+TqvXrajuE277BknWuLJSmLz4h25s0k5qefWTTof2k5pC+srVVm9pz7Y0hYAgYAobArgiUN8FKQ0T+8N6n8tmmLbsiksUn4psgT5fsu0foVZChKAlWI0faTmuXOqbsv1329Y15xEiN+Hi1j8kiWD/M6JcRrDB0Suf7qs2bpMUTf5cmk17wjW7UqJEMGTJEeh92mGxzruXZs2fLuHHjZOXKlVK1cYM0enOKL5y8Zf/OTtk60pV+sqVTd9leL1z1LB1ErKWGgCFgCESDQNkSrD1c9nGSf4bZVheWdNeSlWGHM/7+tg9WpiRYrD6M0vo40tMyhfuOFYJPZbEfY7K2EbF1++LP5P4UKSCi7leydth3hUWg/pdfSKs7bpL6Hy/xN+revbvcfddd0rNnz29vfNVV/v28efPklVde8WXWm2/Ktm3bpMFHi31p9vzjsr1ZC9nsVC1PuHoeIdtapv4R8O0N7J0hYAgYAuWJQGwIVrpVhE64ycr2aZI68/iUVV/JlzX577I31cVwfeHchWGrCju4oHCiVvK/047u75smo/rYFWtd7Ez+9myS1ZTBWvdNg2/wXHsfPwQaOnJUffuNUm/tDvf1NT/4gfzqV7+Sxo2TbxB+6KGHCuXaa6+VNWvWyGuvveaVrVfd66pVq6Rqw3ppPGOCL+L+WLd07LaTcDl1q2PXSJ7J+KFoLTIEDAFDIByB2BCs8CbuOFIvyxSX+7jcVals3lffpDqc8THWHS5wcUsntm2R9BqcJu1cDq4VTlmKwvZOk89r3rpo4qKIMcN9GratULog+yj6anUUBoHG82ZK9d//R2TTRmnYsKH8+c9/losvuijjm7Vu3VouuOACX7bvdCO+4tyIKFy4FMV9R9wWpdnYEbK9urVsdqoWrsTNLoZrm1O7zAwBQ8AQKHcESoZgZatgtU9DRD6NMD9VurraN2kQGcFCEUtluAijMvoVRrBYZUi6iA1bU6e2iKotVk80CDSd+Jy0ePRucT4+qa6ulqEPPCDHH398zpVXuT/MPn36+PKf//f/ejVr3KuverI1fvx4Wbt2rVS51YmNp77qi7g4rS2dDpZNvRzZcisTt+wXvpgi50bZhYaAIWAIxACB2BCsb9JM1C0bZLc8PN3EH+XGyOnqSteWbJ6DdHWla0s290pVF27ITWnGLJt72bmFRQAPe/On7pOmL4/yN9p///3lkREjpGvXrpHeuG3btjLk4ot9IU5r5qxZnmyNc+rWvPnzPbFr8ME7Qmn+9IOyrdUeO+K2HOGqObi3bHMrFc0MAUPAECgHBGJDsNIpL5ludaODsiKNQkWqgagsXV3p2pJNO1Zs3Jzy9HRtSXlx4CATcio360rnPowqrixwW3tbAASqajZL9QO31q7+O/zww+Wh4cNlr732KsDdvq2ynlOrjurXz5frf/EL+eyzz3zcFq7ECRMnyvr1630MWJMpLwlFXI6tmi6H7HAlom7tfcC3ldk7Q8AQMARKDIHYEKx0JIR987KxdESELXSisLaN6kuvVuGrFVGcvkqTIT6bdqTDacCe1fLbhSuyqTLpuUe2bu72Kwxfdp8O36SV2pdFR6DeV2ul1V2/kQaL3/X3PuOMM+SuO++Upk3Dn9lCNbJ9+/Zy+eWX+7JlyxaZPn26V7eI31q4cKFbCbJVGi6c6wtq27Y99tpJtlwqiO6HyfbGTQrVNKvXEDAEDIHIEYgNwfokjTJz7B6pM7InIrPcbdQMuQlzc6H0HO2yvLOpcz52wd5tJJyGiCxcvzGf6ne7Nl19J+3ZQtq5fRJXuiD1fOzifVMnkUzXjnzubddGg0CDz5ZLq9tvkHqf79jW6Ec/+pHcdOONbpFflktyo2nOLrU0aNBAjjvuOF9Yvbh8+fJasjV58mTZsGGD1Fv9uTRxMWMUadBQaroeutOdeKRsabfvLvWl+lDlXJWN5s+SRm9PlwYfLpJ6X7pVj9u2+sSpW9vt41Sznm7Fo6vzgINstWMqIO2YIWAIZIVAlYycHsWq/qxumuzkK/bbI2X2cK45dsKCrAjRyKO7yPkpko2+5PYUPP3195I1J6PvSPr57qm9pGMKde03734iN7iSaD1bNpF5Aw9N/Lr287tuZWLPcfNqPwffcB3Xh9lti1f6DZ7Djqf7nsD2DwYdFkpOuf67MxfLwy4hqVk8EWj0/jypvvt3UvX1V55Q/e53v5MfXH11PBub0KrNmzfLG2+8IboycfHixQlnuFCuPTvIZhe3tcklOq3p1ku2N0yucINDi4duk/qObKYzv9rREa1NvVydPVwur6YWD5YOMztuCBgC4QjEhmAxqa844/Dwlroj7JV37IR3ZEuGlPD7bi/AVMkyudkVjig8kiNR+H3PfeXn3fZO2eZ+49/x7U48KR+Cle6+W9wy+f6T3pU3Vuemzj1x1EEy2O13GGYkaW333FuR5BELu4d9nzsCTaaPl5bD/uJSrW+RZs2ayT133y2DBg3KvcI6vnLpsmW1gfJTXn9dNm3atGuLGjX2LkSfBsLFbm1t294fbzt+jNR/7F6XNWLHfxj77LOPHHPMMdKlSxdp2qSJrPz8c3n77bdllgvE/+abhLQt9Vw82MGHyTf9z5ZNvY/e9X72yRAwBAyBDBCIDcGirW+4ff1w26WyG50a9OskilCya0j++dHpvaVxvXCXCFvKDJycPRn57v5t5cG+nZLdtva7pRs2y0EvzU3qdsiHYB3h9gFko+lUxqKBEya8K4s3JExGqS5yx37dY1/5ZffUpPFlp/ydlofyl6YJdjgPBJo//5g0Gz3c19DOBbE//PDDcpjb9qZcbOPGjYILke17ULg+/PDD3bq2tcP+0qhdB9k6d4Y/Rt6um3//e7nwwgt3O5cvtrrYr2nTpsno0aPltfHjZZkjdEHb7AjWuqv/02LAgqDYe0PAEEiLQKwI1s+7dZDf99wvZaP5LXrt3A8FN1gm9sdD95P/6NIh5ambHMlic+SHPlqV8jwOkizivw/eR250JZ19f9YSGRZSZz4Ei/uOPqaLnJNmM+tVLg5riNuQ+rUvvkrXVGnqSOjtvQ+Ufzpwz7TnHj9xQc7qWNrK7YScEKhyJKHFw7dLk9df9tez7Q1pGPbdN/NYpZxuXMcXLVq0qDZ2a+rUqVJTU7NLi/bbbz959NFHpatTrTK1Tz75REY9/bQ8cP/98tHHH/vLtjllbNW/3ZRpFXaeIWAIGAIuPXpMYrAYC2KZFrqYpoYZBOH+5YPP5BfzPxbIUSpjT0LiiVq513Q2wRGR3y78RHhNdENCQM528Vw3Hryv9EgR/6T3mLfuGzn81fkSloYzX4LF9XNdLFaqAHtty5Nub8I/vf+pzHAB/YlotXa4ENB+g+vXPmmSmFLf0yvWyIXTFmnV9hoDBOp9s0Gq7/29NFzgsqg7O/HEEz05aNkympWyMehiRk342gXGP/zQQzL6mWdkyZIl0rlzZxn24IOyxx7hm7Gnqhi34fe+9z2ZOGmSP23jj34hX/U5PtUldswQMAQMgVoEYkWwaFW6+KLalrs377kVej+evSytQvOTzu3kr4dlnlNn9eat8ubar+UTtxKxgSNW+zni0c+5LpumSFsQbBckZtCUhTLu83DlKF+Cxf1uc336V9e3TO0Tlxts7toNQqqH5i4T+wFNG8uRbZpJgwwILfdgVeYRr813uGfndsy0fXZe9gjUdyvtWt1xo9RfvsOtddmll8qf/vQnYZVepRkK1ty5c31QPykhzjzzzLxxeNNtbP2Da64RVK2m7feWj264R7a7/F5mhoAhYAikQyB2BIvcS6hYmagp2rlRTqEZ7FxhqWyYi5e60sVNFcOuc8raH51ilMqiIFisYnzlhO5yQsg+iKnun8uxwU65GuUULLN4INDwww+k2pGremu/9A267r/+S372s5/Fo3FFbAUxVK+67XlQrUhBQXb6AQMGRNIC8nXdeNNN8ve//93Xt/WKf5XVJ54RSd1WiSFgCJQ3ArH7Kfa1U0l+MmfXINN0QzB51fp0p/gYq+l55rxKexN3AnFc6chVJvVkcs5mtzoK0vPhN6mzu2dSV7pzfrVguZGrdCAV8Xhjl9Op9a3XeXLFhs133H57RZIrgt7HjBnjyRXwH3XUUZGRK+pDCbz8ssv8ykM+Nxv7sJAZ38wQMAQMgXQIxI5g0WBUkn/JkGQtcPmiblv8Wbp++litM9zKt1c+X5f23FxP+PvSz+UHby7N9fKcrvvcBbIPcCkZ3nYxX4Uw3J2/fGd5JNnhC9G+Sqyz6fhnpfqu37rNIDdKq1at5InHH5eLLrqo4qBgI+lRo0bJypUr3R7S9eTUU0+V3r17R47DwQcfLOede66vd9PaNbLXuB37OUZ+I6vQEDAEygqB+nLJP98Yxx7NdDmv1tVsldPat0rZvMtnfiAffJ3ZL0pSMoxwChMB78fs0SJlvdkcJC/UT93KRhKKhgW1J9a3l8v79S8p4qe+cMTpjiWZrZRc43Aa/uEqH3zfo2V0W6Csd1v8sArxvmVf7NL8q91KQ2LS2ro0GN1aNJFFX2+Sg5o3FtJirHZtMSsMAlVOsWzx1P3S/BmXhsG9P+CAA2TUyJEFIRWF6UF0ta5YsULGjh3r81eh4J3rCFChVkziduzQoYPf2gcy12DxQpcd321HtXWLbG+9p0ty2jC6jllNhoAhUDYIxJZggfBU59L7wE3eA9tVu1xWu4ttI13s1S1pYp0SRwpF5kWXx2na6vVyaHUz6ZDByrnEOoKfyQl1yYwPZMyn2cUmRUmwaE+Nm3CfWP6lLHZ4HeH2EWR1YD5G8tUh0xclzZz/lguUP7FtS5/J/e99Osrzn66V7x6wp7RwgfOFUtLy6UspX9tw6fvS7JVRnlS1Hnmf1H/vbd+dbt26yW1/+5t3XVVaQDubRj/77LM+fxWJVAcPHixt2oQnxo1i/HUl4oQJE6TGZZpv8NFiaTxrsjR7eaQ0eneO1PtqjWx3md+3VbeO4nZWhyFgCJQBArEmWOA717m+HnLqzGEuuWZnp5KooUad88b7snZLbooJqsu9zqX3vluJeGCzxlkF1aNYjXepHMid9Ru3sTJJPbO1qAmW3h+87nI5wlDAOu1UlfRYulcwHePcs5fPWCx3LvlcUMbCDAUQAry/29Nxr8YNpdoRurXufCNYYYhl9319F7he/Y9bpPnIB6Sh26i53prVss0FXGM9e/SQIUOGeNfYnDlzfGJMUgqg5EA4yt2ee+45IfaK/vbv31/atct8JW0+2PTq5Rbf7L233ydxo8sm//XXbqcE98Om/uqVjmTNlqZuz8SmU16SBp9+7Pc63NZmL4K48rmlXWsIGAIljEDsVhGGYVnlDpztEmv++0Ht5ZS9WsoNLugachOVsWqRxJ2oZZCGvd3nDo44bHX/gZLWgLLEZUV//rO1vqQiH5m0iezyqfJpbXQs7t0INoru6kjWOS5/10lOcdp3Z7/au36RcmGF22CbfpHu4lmnQr28cq1840hWJnatGwdykf1Hl/YeL3JtHejqt/0JM0Ev9TkNPl7iNml2qwPX7Eh8S5wVRKK3y8h+kEuYeVS/fvLpp58Ke/R98cUXuyTXbNy4sXcdHnjggUKSzUaNku/Rl7oF8T1K3NVjjz0mHTt2lCZuuxvSJxx77LG+z8XaxJo2TJkyRd59911f3nv/fVn8wQeyySlbu5gjVzVd2KC6ryv9ZEuH1EmU9Vr+r2NlaL0vVkh9t1F3feeOrP/Fp1K1fkf86PaWrWTLPgdKTffDZMuBXXfLbaf12KshYAjULQIlQ7CCMB3q4owWfb1RUFzM6gYBJgHQ5xXT9zYiO/DI9d9G82e5pKH/I1WbvpH69ev7DZpvvNHluXLvw2zNmjV+T72PPvpI1q//dkUthGMvt10OZIR4LXVzhdVTCt8Te8WqQZKInnLKKUKeqnnz5vmmQyjp5/777y9Nm2YWi8g+hV999ZUv69atEy18t8ElLiUzPAH0ENfq6mrZc889fazX3k7J4vvP3X6G3J/tdSBcC997T95zBeKbaH6D6p1kq6ZTd+9W9OTJkah6jkB5MsXrKpfiJZGsJVa287PfoLrnEZ7Abe7ZR7Y1iy62NOSW9rUhYAhkiEBJEqwM+2anGQIlhUDTSS9Ii0fuEtm21asz/3PzzXKZSxGQjUEYmOjfd6oKkzx5nNRQfJRsERCOi63U7GO3dQ0uQpQ5Atshjdu2OTXWES/2JaSgMEGEIFskHMVtSq4syCcECvKkRIrvwAxsIFBayILfvHlzjxH145KkXoLcUc34Dgy5B4Vzwfqdd94Rtu/5wCla7y5c6MkW+bkSt/DJFHdIXHvnAt3XkUfIMm0lBo0x3n2D6nqypdPBsvHIE2Xjcafa3omZgmznGQIFQsAIVoGAtWoNgWwQaDJ9vLS8/0/+EgK2773nHjnppJOyqSLpuatWrfIKC8TExwztPIuJm9glCBcFYlEKhlL04osveuIE2YHcoGahWkGSMAgURAtFD5IJOaK/kCD6CXlSIqWviQsFIEuQr81OSeJaSJrGt0FycNFSP/dZvXq1J3q0hXaw4hD1ENIH4eKcdxYskPd2Eq7VX+5IDKt4U+8+++zjr+3kxoJEqRR183L/RIPgTZs+XZ5hg+rXXpMlS5fucsr26jby1VXXyqZD+u7yvX0wBAyB4iFgBKt4WNudDIGkCJC4su31/yRVX631cVO33HKLfGfgwKTn5vMlk7IqLBAvVB011Jjjjz9eWreO9yo44s5eeeUVOe6447yCtNCRlqWOXKBIofCoosT7dIYLUJUsfYWcoVRByjCIF7hRcBNChJRIKeGCuEK2IH/Lly/3hAx3JcQP8qoECWLGPekDKhhuRkgUMXb5GoSPlZUjXV6wWbNmeaVL6rmFJ/92g2x2LkQzQ8AQKD4CRrCKj7nd0RDYBYFGC+dKqz9f77+78847XXqlLXLxxRd7FWSXEyP+QPyQrkKEbEEmzjjjDD/xR3yryKrD9Yliw4bWPdxqSjUIEkoRBfKCCxElCcLIe8gNLrUgkaLPuElVxUpUt1q0aOHJEXFeYHXIIYcISiD3IO6tbdu2tYQONRDVCiKm7kpchcTOnXDCCf48bWuhX1kE8Ovf/Mard9v22EtW//Yfbv/E8Bi+QrfH6jcEKhUBI1iVOvLW79gg0Hzaa9LsgVt9ez5yk/fjLjP7kUceKWQQL4ahwDz88MOeTKDSEPeV6DIrRjsyuQexRxMnTpSTTz7Zu9GSXYN7D5JFrBKECkUKgkVcViKZUrdisnr0u5kzZ3pC9Z3vfEe/8u7DIKGDSAWD7KkXskUA/IwZM7w6WIzxhPgRowYG/+n2psTW/Ncfpabzt2S0thP2xhAwBAqKgCVpKSi8VrkhkBqBhsvel6YuOztGjBATdd++fYVJnTicVKsHU9ec+VFcVig5EIC3337bu7oOOuigzCso4pnq1lS3W7JbQw7VVcjxadOmedccqS5yMYhS4v1Qt3r27OkLbVLVCvccChsuV8bxMJdaA1I3btw4H2PFGBfKaAPxaYzd0UcfXUuwGrgcatln6itUK61eQ6ByENg9erJy+m49NQTqFIHGc6a5DZt/LlXrvvSK0fnnn+8JDkQHwqPpBwrZyKlTp3oyN2jQIK/AcC+Cx+NqSrCyUdiSEaRs+pfuelWviAu79NJLfRJY3JJs5cMYEodF7BakuVCG6xTl6vDDD/fuU2LJ1OpZpiyFwl4NgaIiYASrqHDbzQyBHQg0e/UZqb77ty7f0SYfJ/T9q66So486SmbPnu1XrvVzyUTfeust/74QmEFUXn75ZZ9S4LzzzvOKC+kEsGKoZrn2CZcfpkQrk3rSEaR0dWR7PXFfBK4TxA6B/dKtGkRRggThwovaiBFTtykEC/foaLe6UK3el1/U5qvT7+zVEDAECo+AEazCY2x3MARqEfAbNj9+rzR3xQUGSUe3iuxZp3SwmoyUAEzOkCxWoDFJ8z5qIzaJCZjYpAsvvNCnGHj99dc92eJeEIq4mrYtmHIiXVuzJUiJ9eVyPdfgDsRdN92lUyBfF2OKuzIq4x7jx4/3KtnZZ5/t61cl64gjjqh1azZ54h/S9r+ulOqhf5YmMydJvW/cFj9mhoAhUHAELAar4BDbDQyBHQhUObWq+r4/SqM5U/0XBLIPHzbMT74Eb6M89OnTx0/Chx56qPTu3VveeOMNOcopW9maJsYMJtVE/UFBgcjhhjzmmGN8tS+99JJfJUfgOKpWNupQtu3K93wUGjKl424jIJ9Nr9MZRCQbl2JifblczzWsKmSMH330UZ83C1WSFX4QXBKg5mOMIWPF+OJaJs6L+C8I+UCX4qNTp05ynkvE+oKLyWL1ZNW6NdJ46jhfHPPyCUk3HdZPNh9ypGzZr1M+TbFrDQFDIAQBI1ghwNjXhkCUCNRzcVat7vy1NFj6vq/2HKc43HHHHZ4k8AUupFEuhxEZwInXYbJkVVoqIxEm7ieIUyKRYhUZpCKYVBM1BVWMyZ0YL65nkoYMXHDBBbXZxrk2rgaRgEAQSI56gzpEjBNB7QSWJ3NvKtnJpE+sNgQXMNVEo2DLqkAUv0xzVnFP2kIwPOkdUK5wxRIYz3uy0OdqtIt4K9rEuDGW4EEuLpQsxpdzULGIrSML/DiXO4z8YfNd4lM34NLgg3d8aT7qQdnWuu2OrXYOOUJq2G6ncWbbDOXafrvOEKgUBIxgVcpIWz/rDIEGn34krW5zmzev+sy34V9+/GO54YYbdmmPJslk6T+qDDmUSFrZvXv3Xc5DgZo/f74sdck1cZOx5x6TPkSKvEwoF5qKIHE/PiUP5HIiKSZkDtfkgAEDPBljUsbirGDRPvoIXsSo0QeSp1IgNJoRHcIFDhj9Dq4CRP2BQGkJklMw4Pxkxr1ILqorFCF0kJtkRh1K9lAlH3nkEY85pAdFC2LI+2yVNfJxvfDCC76fKI6QYcgWz4IqWbSH8cXIFUYhvu/666/36hlE6xW3qnHChAn+OjYVbzL5BV9co6Wmq9ug2mWA39yLDar39/XYP4aAIZA9ApYHK3vM7ApDIGMESCJafffvpMrFvTDJs7/gVS6gPZkxgbOcH+NclBnUGlxNkB7chbgSmeC7dOniJ9nEPE7seafEgVfIA8oLrxQmflQVJv9evXp5RUXbgltxmHNZQmBOPfVU/TrWr/SHLOaakwpFT03Jp27YzLlgAsFKZpyv5BTCSsENCfYQGMgN5HTTpk3+csaIZKZKuIJZ8CEvXKtuWALRGV8SyOIiRHHCdRfMnaWZ4ZO1je8gTTwfuI9xG6uSRbtRqrifGq5CSByJY9m+J5lBzgjCp04IF67XRNvWtp1Tt47coXB1P0y2N/r2Honn2mdDwBDYFQEjWLviYZ8MgcgQaDL1VWk5/K9IQtLcKR//+Mc/5JRTTklaP5MdsVBM4BiqA9nKMYgP+Y0gBhAuAqaZ9FG4SKkAgVJSxeTPxA+JUrLAa9BViOry9NNP+zisYPJL6h86dKgnDKeffrq/d6n9A+nAVQaOYBMMhgeXIA6J+GSqJkGQdB9C9jpUA3MlWyiQBLnj+sUYX5Qrcpvpd+StgjQFM8NDhigkRWWcuI57ELzOtkBkhWfMVMlCRRvgFEj6FrS5c+d68nTaaad5lTJ4LOw9mEG0ULgmT568+2bSDRpKTbdennBtcurW1r32DqvKvjcEDAGHgBEsewwMgQIg0HzsCGnmCkZMzIgRI+RQF4uTzFAycPswaWJMwAS4Y5Cn559/3pMlVCWUJ9QQ8iupgoJyEiQLTOyoXqlszJgxXqlCDVEjbggSyLYvuJvKwVCtULDAI8ydl08/GTtVzyC8qo5B1oh5CyY3VQWSsQJ3yJi6cSGG1ANxox6IlRp1oXThUoR4LXXu4VdffdUrkATOJzPcyFOmTBGyz7N6MVujH1PcylLIFgqXpvAI1rPNESyIFq7Emi6HyPaGjYKH7b0hUPEIGMGq+EfAAIgSgSqnLKFaNXbqFUZQ8wi3DQ05kZKZbm3CBAsJgER1dK5BDNcXyhUuO9Qs1CmIGJMfricm6FwN0ka8khI56mFSf+CBB/ykf+WVV+ZadcVep+5KCBBqE+MUVCJxG0KQcQWiSEGeiSVDsWIsIbYY9aC8cT2kEGWMZ4PxYe9IYs94HhLj84LAQ64gWTwnZJPP15a4Pmmg/OvOVa1u0tp6netwc/fejmw5d6JbmbjVuRbNDIFKR8AIVqU/Adb/yBAgvxDxVg1d3BV2snPd3Hfffd5VlOwmqAJMukykZP4+55xzfKA65+Ji4hjbrZCagMmYYGbUKlSJfNUY3JGoIagiGJM6q/KY+LlfLqkhfEX2j0cAZYvxWrVqlV/ZB5kl7gpypS5C3LqqWpGigzFFqYJo4cpEuYJUQb5xd+JORPE66aSTQgk7N4dYkdcMw0WYDxH3lST8Q99wIXp1yylpqG6JtnXvA5wr0QXKH7pT3XLE0swQqDQEjGBV2ohbfwuCQH23QpCVgvXdikEMBegPt9ziFQs+46bSgHNcgQQ88xllApcRy+t1nzoClEnTQGwNbqbgHnPE4HBNvoaLCWUEIkXbIFy4plBUIHqZxiPl245yvp5xJvUGmJJOAVcbxCkZeSWmDpIFWSHmCgULcoUbmMJqT43PSoUZQevEX7H4gTg6VcVSXZPvMUi5rkzk/rQ7aNtd2oeaHof72C0C5re6tBBmhkAlIGAEqxJG2fpYMARwCTZcvECq/36L31OQG/3whz/0SR5Z0YbyBJGCxCQakyBqUdCFg3I1adIkv/qLFWqJSlZiHbl+Rh1DNePeKC20lUmcIHojV7miuvt15BlDqcT1y1i2adPGJx/d/czk36BcES/3gx/8IPkJO7+FoEGauRdpO84880xP5lJeVICDEEOeLYLlIZS4uRNtq0tsCtEifmtLp4NluyOQZoZAOSJgebDKcVStTwVFoD55gya9II3mTpOGy5fKdhccjkFMBrutZ/Z3bh4C0dVQICBTuIdQMFAViJ9Jtiwf9QG3IOSKWBvqGbBTydL6onjFHQX5Q2HZsGGDT4bJZsVRqGNRtK9c6kCtIiaLlAmQK56FbIznBvJE0bxaidezypTYPMgYsX64BSHPdWGosJA7CkZ+Ml2ZSPZ934+Pl0hTygtPyPamzWVzzyN2xG717CvbqlvXRbPtnoZAQRAwglUQWK3SckWg2StPS/NnhvtNmumjpqRkYrn66qull1sdhoJA0k9WD+Ieyoa0EI9FXawSJKBZM3PniyeTMDE/kCrigoj94TNtO/bYY/2KtHzvYdfvjgDPAmkVFixY4AlSti47zW1FUHkyQs4iCRYsoJKSGw0yni2J273V0X3DIg/KT3/yE/+8EeeHO/FVF4+GC5X8cI1nTfKFu245sGutK3FLx26yPQJ3eHS9sZoMgewQMIKVHV52doUiULVtq7R46HZp8vrLHgEUggH9+8t3nOuHCYQUDLrkPh+IOroVhG+//baPw2HChKRlYqRYYJLVfFjB93yXGBeDGsLyfYLcyatlVjgEUCRJ4gm5zdZSESyNzYOUM47sexhnI9aQLYJ0myDUWo3dQqlloUWDZe/70uzZR2R7i+odGeXJKu+28dnWfEdm/jj30dpmCAQRsBisIBr23hBIgkC9jRuk+p7fS8MFs/1RtrIZ9uCDPn1CktPz+gqliW1VcKXgxrv88suTrhhEhVq8eLF3C6FiBBNqBhuA25KJDdekbqmDqwolxWKtgkgV9j0uQhYvsJqQeCwlTpncdahL/orbL5jqg8ByYp0wVhVmsul1Jveqq3NWr17tV1niTmS1ZTAjv2+TU7KI19KViVsOOKhWPa6rNtt9DYF0CBjBSoeQHa9oBIi3anXbr6T+8mUehxOOP16GDx+e1F0TFVD8mmepPcvhE5UJ4qWYWINL43EdQaKCRQkVMTxmdY8AhJnFBKhOEGdWh7KogEzs6YguhBs3LuomxvNBPBMqKmSNOsrJULJYRauxWyi6iba9uo0nW5tIA9HDbVDdtFniKfbZEKhzBIxg1fkQWAPiikDVlhppc/P/ceRqqW/iELeP3F//+teCx7jgzlMVC9ffZZdd5t2PqFbE20CyUDPIBs7kWlcBzXEdt7i2C+IAWcA1xhhixEuhapGrigJJTjQWIuCGJp5vxowZPh8WKTbYZxA1stxtpYvVYoUk7kRiuHB/72L13AbVB/XYGbvlVibue+Auh+2DIVBXCBjBqivk7b6xR6DpxOelxYg7fDsvcFvH3HrrrbW5qgrdeBQsVAqCm5lcUTtY8g/5Cm6lU+h2WP3RIwDRYj9D3WIH95iarjLlFWWL8WYVInFWSsog1ySbjSLmT+9bKq8ogZBMjd1i8UCiNTqgs3z+vWtl836dEw/ZZ0OgqAgYwSoq3HazUkKg3T2/k+1vveHdM/98zTV+gmPvNxI+hi2Zj6p/KFePP/64J1hMrhhqxylus2i2zjErHwSIn8PlC+Ei2aiOd7CHuBVRK0nvAdk224EALlfybeFOnOhc51+rMugWcWw79wr54rQhFqtlD0udIWAEq86gtxvHGYEq17gDb/6pfL1ssZzuAozvv/9+Hxfy7rvv+qShQbcOakMhDFcSeYRYBQihiyplQyHaanVGhwBb42gmd1QszZ8W3R3KsyaS+T722GPyqxtuqF300axrT/noh/8t21q2Ks9OW69ijUB9ueSfb4x1C61xhkCREahybpmWQ/9Xtr3zlr8zqsHJJ5/sA5PZHBklAdcNq/hYHRbc9kY35s23yUyybNhLYLOmWYhqm5x822bXFxYBYup4jojH4jWbFYeFbVm8a2eLIX4AsTsBcVq4YWtWfy57zp8h6050iU+r+NlkZggUDwEjWMXD2u5UAgjU+/oraXXHTdLo7em+tV27dpXvfe97Xr0iUzbEimBjiE+PHj18fBSxMCRNZBk+2dd5z69pvs8lAJ3rx44d6wPZj3erFtn+BEWDWCxcRWaGgCGwKwL8yCGbPa51Vlxed9110tCpf2xKXfPVOtl+5AlS09KyxO+Kmn0qNALmIiw0wlZ/ySBQ//NPpdXtN0j9z5b7NrPpcT+XvJGl8CTjJPfQsmXLhKBkVm/pyi+2tSEjOsHL7L2m8TScx3WcR9yWnpcKEAKaWTHVq1cvId6LX+JPPvmkJ2yXXnpp0lVmqeqzY4ZAuSNASgcKf4MozSToVevm1GcSvLb6j9/Ioq599Gt7NQSKgoBlci8KzHaTuCPQcMlCaXXnr6Xqqx3Ztn/5y1/KIEesyDkFySHrOYSHwmouXQHGr2b+Y8dtqESKVV7sQYfqpOex9Q1B6vu5fQo5j9fg1ickCyXeinLiiSf6YGYUM+rnPCYJfp2bGQKGwLcIEOCOepUsRpGVhvxtYh81sDxZ36Jm74qFgBGsYiFt94ktAo1nvyHV9//J7y9IvMvtt98u5zr1ikSfuORYFs5/1KhKvEJ42F+OAulhJROqFXsHQsj23HNPr1hBpDgHV6KeB+HClUg+H9yH1E8qBlyPkDS2ESHLOm5BMloTT8KqMggW55gZAoaA+J0OnnnmGe+O52928ODBPl5NsSF3GK52NftpokjYazERMIJVTLTtXrFDoNkro6T5U/e7XZu3e3fesGHDvFuQhhJDxRYl5J+aOnWqD5rFXRg0VCmIEeWYY44RgtNVtSKpJL+sVbXCTch5xIiggilpYoLA5QjZgoiRqZuiW6BMmzbN35IcQGaGQKUjwHZSI0eO9H9rbP90wQUX1MY68mOE9Cb8ffG3yd8w6rCZIVAXCBjBqgvU7Z51jkCVIzItHrtbmkx4zreF3FKPPvqodEzIMUQ6hksuucSTLFQl3BFscxJmrPoiGJ0CISKvEeoWMSIoUqhTEC4C5TmXCYCAeEgZq56on6X5Z511Vu3ec5pzywhWGOr2faUgAFl6+umnvarLjxWy2UOksOAx1OELL7xQ7rr77kqBxvoZQwSMYMVwUKxJhUWgatNGqf7HLW6l4Ax/o6NdvNSDbvPmsG1H2M+P7On8xw4JSkWwgi2HGKFaUY477jivWEG2Pv74Y1m4cKH/lU1gPOc1b97cky9WDXZ0KxR10qA+I1hBVO19OgR4pjCNP0p3fqkc5+9GVwryA4a0JWrBY+Slu9hta5Vuj0e91l4NgUIhYASrUMhavbFEoP7aL6XarRRs8NFi377z3RY4t/3tb7UuhrBG62QVJD5h54Z9jzuDwh6CakyG1I3Lg0B6yFWiGcFKRMQ+BxHAZfbee+/JUrcClZWrmgme54YfDRB84gFRT/U5Dl5fCu/ZOur111/3TcXFTjykmh7jb4k+8jdtZgjEAQEjWHEYBWtDURBo4DZtbnX7jVLvyy/8/f79pz+V66+/PqN7F0oVCE54OjEmNkhdg0ykZoZAEAFWnRIfqAsg+AGgiUlxPZN8k0J+NmL8IFtstcMrymwpGAl3IVH0jZhI2q6mx/hMQuD+/fvrIXs1BOocASNYdT4E1oBiINDIZWWvvvdmqdq4wbvc/viHP8gVV1yR8a1Z6Yfh4iN+ijiqXJKIht1QN/ZNdpzAeYxVjWaGAAhA+CEXECyMfGuQC57NoJEqhMUW5G9jRwB2H6Bgbdu29Yop6lbidcE66uo9Cz5wCeL+gxyiTAXd+M8//7z/e6R9tgF6XY2S3TcVAkawUqFjx8oCgaZTXpIWD98hsm2rDyy/7777ZECWv3SJ6+AXNC4Yza9D4lB1vzDB5WO4c1SpCtZDkPyiRYt8PAkpH8wMAdQqVrZC9lFASQMSjEcKIkRsH6tbKRjPEtvJoGqtWrXKFxZg8GMBoqXqVpQ/HoLtyfQ9ai4xjwSusxiElYIsCMEgXk888YSPaeRvkpW9tgF2psjaecVEwAhWMdG2exUVAVIMNhs9XJo9/5i/LysCRzz8sJ+Qsm1I69at5ZprrvG5dTQNA/mvKOxHyESmZAt1K9sA22QKFpnjyauFDRw4sHaCybbtdn75IICK+dxzz3liBLmCOAXjkdL1lCznmumcNCEkwOV5Jpku5ItCveRy6+jiASFdKF3FNBRbYhJxiaOssaOC/j2RfgFyhaLMd+edd17R21dMLOxepY2AbZVT2uNnrQ9BoGpLjbR88C/SeMYOgkJgOeSqffv2IVdk/zUTACoCExRuDHUj8quabO5KuCBn6QxVjPOOdFvzYLr9B0oCcSfUZ1bZCOAWJIEm6hMkaNCgQZEpN9TNylaC5VG2iN9SI1YLssW+nIV+Dlml++yzz/qYMlKnBPPOkTiU5KIovahZrBRMF0fW1/098be55rpbpaZTd+2SvRoCRUHAFKyiwGw3KSYCbNhcfddvpeGi+f623/nOd+Tee++V5i4De5TGf+5MOhQmKLa2UXVr+fLlQiEAGfeiki1UNP01HmyLKljEyXANK8JwjZx55pmeeAXPtfeViQA50iBX5H+CBPFMRWUQNt2dgDq//PJLH7vFDwhUI9yKFO59yimnFERNpX/sw8nf0hFHHFH7Y4P2oKyRR45juOPJccUPGTNDIM4ImIIV59GxtmWNQP0v3IbNf3MbNq/csWHz96+6Sm6++eai/2fMpKTqFkRLVwgSa0XsFq4P3IoQK9QC3IFcQ1Ayxjn8ete4k6yBsAvKDgHIB0SDeCQUT1TZbNyDuQJCzBPbRc2dO9cTnOrqak9woozTmjlzpt+9AKIHgQvmmlM1l/YTa4Wim6mZgpUpUnZeIRAwBasQqFqddYJAw8UL3IbNv5Gq9ev8/W+44Qb5lx//uE7awn6FLBun8Kv7008/3U3dSmwYkwsKF0HLwQkm8Tz7XJkI6CpSSDmbiU+ePNmrTqywK6ShFLFKD/LPIg8K+2nShigMssjKRvrFDgZBN74e4z7sy6nB+lHc1+owBAqNgBGsQiNs9RcFgcZvTpHqB24Vqdns4zLuuOMOOdv9Zx0HgzgRu0JhoiJ2CxcMihXqABMLahauD96bGQLJEFAitWDBAr8zACSH0q9fv2SnR/od7kFI0Omnny4vvfSS34w8X4LFasgxY8b4hSO423H74RZXC27YzL6cuayi1ZW59WW7fBtVpnewV0OgsAjY/+aFxddqLwICzV5mw+b7/J1Y8TTcbdjct2/fItw5t1swmRQ6WDi3ltlVcUZAyQJk5/DDD/dkHbKDq7CQrmRWybLaEJc1K2T5wcCPg3wMNQ4CxYpBFneQ40pdjrjTWSmIYoZLnTjEXP5eIHC68KTh9m1iaXrzGTG7NhcEjGDlgppdEwsE/IbNj7oNmyfu2LAZt9ojI0ZEtrIqFp20RhgCOxFQgsV2MMQlnXjiiX5rGN6H5cHKBzzuR2A5qUjOPfdcn7qBxKYQl3Sr91LdF/WWHFfEHkLYUMU0YJ28VxAvjkG4Lrrool1UrVT1Bo9BAElEikKMbayqHzxs7w2BoiBgBKsoMNtNokbAb9jsMrM3mj/LV01sxoNDh9qKu6iBtvpig4ASLJ51CAoxSbicR48eLX369PFu5nwbC3liJSsxg6hWqFUE1eO6mzZtmt+yJh+1jIUfL774oic+hxxyiLC5uRorcFHkIEUE0kOucnGZEyMGuUIBU7eq3sNeDYFiImAEq5ho270iQaD+mlVuT8GbpP7HO7b8IHbjb3/9q/1nGgm6VklcEYBg4TLTJKC47nDbQX7IH8Vm4ZkY7jlIVGIh2SjKD6SKeEAWaOjG5ASbQ7pI7EkWeYhYtsaWPaQgwSBWECw1yJxu5kyQO/fJxVixC0lDASM2TfdlzKUuu8YQyBcBI1j5ImjXFxWBBh8vkVZ33FS7YfO1114rv/j5z4vaBruZIVAXCCjB4t4EmD/++OM+vQdKTTA4XNsGWYJwkDOLrO0QKkgU5AhlCJVIC6SGfG2tWrXydanLjuSerFbk3ihZEBYWaWTrIqQO3IvUi0sQ16DapEmThMB9iB2kjoD2XIxEqRMnTvT1sPOBrcTNBUW7JkoEjGBFiabVVVAEGr3zplTf4zZs3vSNnyD+9Kc/yWWXXlrQe1rlhkBcEAgSLNxpuNLY8BmyQlyWGm44VhcSO0UAOTnXKBAOJVSJBIm6CDiHhPnM5y4Win0wiYmC9OCWJN0Imy8ThN6zZ0+9XcpX6sVdB9HDXQdJC+5swLY/3A9yBWns3bt3yvrCDmoeLQggebLII2dmCNQ1Akaw6noE7P4ZIdB08gvSYsRdfsNmfmnf7zZszvWXbkY3tJMMgZghgFIFEXnjjTd8lnXe4y5kpwIMMoOCQzoFXHsDBgzwqpR2A2IEgYI4JboHqRsCBfFCxaLgwuvotsgh5gryBRmCcJHsU7d00rqTvXI/AtZRz1DYcOUrsUNFe/LJJ3076Eeu2/7QZwLxyQIPeWTFIa9mhkAcEDCCFYdRsDaEIlDljjQf9aA0ffEJfw5bdbCnYC45cUJvYgcMgRJAgPgrSAuxTJCSbt26Sf/+/X3LSUdA8DjuO4LDIRmQKJQd1CNW7nEtLjp+oKiSBVnivX6XLKgcNyHKFbFbELfjjjsuLVq4IiFXtAd1jQ2baT8W3MwZVYt4K2K+sjXtM7FhuDhRrpTAZVuXnW8IFAIBI1iFQNXqjAQBv2Hz0P+VxjMn+fpYNfXwQw/t4g6J5EYlUAlBu/xKxzXEfnRMlhgTCu4f9qWj5LPCqwRgqNgmQlQgIzruKEisHMQgUrjhSFZLPilIEjFPxDWxMwCuQfLDQaQ4J1Mjhos6cDfinoRYadB7qjoIuB87dqy/hnsTD6UWPMazmsmGzXpt8FX7jDpGcP/JJ59cS+CC59l7Q6AuETCCVZfo271DEaj39Tq/7U2DDxb4c1gtde899whb0FSaERzMijGdXOm/BiGrqwfyhaEE4NY54IADKpKIehDK7B9IBO453HiMO3v16YpBCAvKFeQaNQsiDrlB3Rk8eHBGyhDPFSqVPksoXihQmqQTEs/fH89UOmNPzfHjx3t3IySQTZvVgsd4TlHacjHtM6TTts/JBUG7plgIGMEqFtJ2n4wRqP/5Cml1Gxs2f+Kv+cHVV8tvf/vbWlKRcUUlfiIxMapE4BIiOJhAYAhU0CBXrKBi4tG94t58802fqLFLly4+63eyVWbBOux9/BCALDGubLTMexSss88+2yuWtHbJkiXCBtBkdWfnAggSRAx3H243zYwe1jNcdQTJo4ryrCUa6lenTp28K5J7pzMNNOdZTVzFRx9QwrgPdULYcjHtM7FXJFpl304zQyCuCBjBiuvIVGi7GjrFym/Y7BQs/qO+6cYb5Uc/+lHFocGESu4hVoSBAwHHYbEvuGEoGMoDMTrLli3zsS6oX++9954PeFbVo+LAjHmHUZAYN1WQUKxwA5NeAULC+OPiI72BuvgYV4LdWejRtWtXT65RsoipgniowhnWdZ4v9gHkvhB3rmM1H/ds06aNDxbXe4XVod/TxmTqu7YAAEAASURBVHHjxvngeuKsiLcKrmrUDZvpB2Qw1z0M586d6/NoQfYIike1MzME4oyAEaw4j06Fta3JrEnScuifazdsvuvOO/1/9BUGg0/2iBKBGoWRlDHTZfGoFxAxCkHJZPzGtcQEyIRJMLBZ8RHQFAhKoliNB5Hie8hOMtOkoiTMRE1S4zqSchLUDclg1SAr6YjJCrrk9Pxkr5ApyBVpEXr16uVjuCBXpHxAXcpEsaJeVgOm2rB55MiRnixCrnBhEpifrUHgUNoglYQIsFIwl6D4bO9r5xsC+SJgBCtfBO36SBBo9uKTbrXgUF8XS88fGj68Nog3khuUSCWQKsgVAcaoEIlJGbPpBkHETJaQLJ2kWCpvVngEwBvXLRszs8oNl1YyY4wZJwpB6KhJqD8QqjAXH+okRBlyhVpJfJ4qWcnukew70jBg3IfVfpBwVuaifkGGMjGeUb0WwsN+hdpm4qNIw8A5EEVcm7mQewgcmeNRcrkH5KoS4zAzGQ87J34IGMGK35hUVIuqtm2VFo/cJU0mveD7TcwQGzZnElBbbkAxieg2JExUTFj5/lKHrBLzwiSP2wm1w1yFhX1yUKnYrkUVSEgUyiIKIgQKdx8kitWfuRjJNCEuPC/sDwjpCCpcmdSp6Qxw36Gg4bbDfZep0Tf2QORaiB5qmrolOQaphxzRVoLtc4kBpI+sjkRZ4x7k+8pUWcu0H3aeIVBIBIxgFRJdqzslAvVcRvY97v6dVC2Y7c/DrTX0gQd8ksOUF5bhQZbDE9COoWRArqL6pY6LiW1VUCZQOyBcmaoUZQh1QbsEkSUWihV4KDcnnHCCz4Qe5U0hyBArkopi6Ug4rkDyYKl7klfcjBjpFxID0v2BFP8QFE8fUekS82IFj0EqScOQLLdWiur9IUiabthMIDs42jObDjU7HjcEjGDFbUQqpD31v/xC9rvt/5cNn3zke8yS7b/8+c8V+QuVyXLOnDl+AkHZOOuss3KalMIeHQgb7h8mPyZXyFymMV1hddr3uyOAS5BYKNyBuPzISQXJiNpQcYi1YqUo9+I1cQEELjqCwkmNgPsv0VBIeS7IH5WN6w6XJMH1WOIqPg1C59jee+/tg915n60RH4aSm4uylu297HxDoJAIGMEqJLpWd1IEGn28WNr97VeyYd0af5z9ye64/fak55bzl6gHTMi47fh1zkpAJrxC/FJnEl26dKknbm+99ZYRrIgfLCUXjF1iPFLEt/LVQZC5Jy44gr/JB6VuOPJY4fpDRYNIoVjiKoZQaeG6bA3FjJgyXIFnnHGGsKuCGhs2c4z+q+Kkx7J5pQ7q4h64BM2dnQ16dm7cEDCCFbcRKfP2NP7wA9nj1v+qdaGQr6ePi/0gZoPl5vyHyq//cjcmP7YfIXcVRh6jTFeAZYsNyhWTFq7ClStX+uBrVrERD2SWPwIEnU+dOtWTV+KrSFOg8Uj51568BupnPHEro2KRZwpyTt4siBBEhw2aSe+BqzIfo/5nn33Wbx4NYeMHkQbJUy+JTdnfEDv22GP9qkT/Ict/6APkn/gwYrqyUdbCboUb08wQqCsEjGDVFfIVet99Rtwm6x25gEQ9OHSoXxbOJMHET2E5NsHABLXi1grm0yknyAiChlwxEZKZW/NYRd1H1A2W9ONCQvVghSKmWbqjvl8l1jdr1iw/jig6kJlCkyvFmB8kuJZJx4ErkHujAKFOQVA6dOigp+b8ynPCSkFcy7g7IVcaIE8Q+xNPPOHTPdBnclPlsjgFAmcbNuc8RHZhjBEwghXjwSnHpn29bMeWLtddd13tRrWQC4JwSYi51Lmx+M+ciYLCf9z8kmUy6egymOt/7qWMDYrSihUr/ATIFiVBV0uU/SK2a/78+bUTH6vOVGnAPWmWPwIoJKzOJDkn6g05oUhPQL4nyEahVUJW/xGvhPH3ggsQ911QYcq1l/wdQq4gWfwNkmpB1TDyd9FPkqQSxA7xAoNsLajkQgghhrm4L7O9r51vCBQDASNYxUDZ7lGLgEr2Hzq3Cr9c9dc+/zkfffTRvhDcituFCQOVBzJCwfVBnAlZp7t37+7jSmorLqE3EB2MvdqIo2GiItkjBDKKiZHl7SiBYMdqROJvVMli0ofEFppgMbbJkmvqhEw/SVNAYsuoVkvWxSOgOBJUDrkZMmSIX0TAli64DVF9wJxCKgUlKFG1FeJDG1CEUbIIPI/iGeLvDbWTuvlxg/tRLXiMsWOlYC6kCALHPXjV+EP9/0Dvle8rCrGZIVBXCBjBqivkK/y+TL7333+/dwVCLoJ5fFglRT4sCkYeHGJLdPsXVBkKv5xxIUK2IF3Eh5SCQTIwXCz8YqdvFBSnbCZkfv0zOVF0qxWUQFyt4ImqgLuViR6Cxb2IvYqSYEGkSE3APambQluY7FMZK8XUUHkIxIaEMJ6lNCkqweJHAXFKKEoEnFMYH/qJYokLjHMYF9zf9BVClo/xNwRBQQElsJzAdsYhX0UUJXnChAk+DQNxXmSIV+PY+PHj/UeIe66JayH/xCCCUT7b52i77NUQiCMCRrDiOCoV0CYmftQsSBOFX66oWPySJVYoSJYIHCaGiAI5QR2AkDCZ4PJStxcTFioQ7pl0uYHqEmL9tY8iN2DAAB9rRrwZKohOyGziCwFjuTv9Bw/6rkQKUsVncIOU0XcKpJSs3mDJ9WxVgqLFYgLq4XpMiUGuOECsUN+IAWKSDBoEifbizkVxpC3cG/JEWzmflW6kNVBiRnAzBXIN+YAwBEl3sP44vVccUeLoM8k36TN9oEAcNb6OvkK2iJciLg6lSc9jnLNRb3BLkieK61CX+BvCGOt8LJgyJHEVHznU2LAZYzEKx3Mx3dqHZ4hnlWffzBAoRwSMYJXjqJZAn1jhBLngP2xcZigeKFUU/iPH5cEvcVZBBVcTMYmhWFEwYphQZyAmkA4mfQoTNTEdTNRMfrkkOyw0jEyuBLvjZkGB4zMTlyp3TMj0S5Uh+o7agwKihAqiGjRIKyoWuM6bN89PuLgJITiYuqiUGASvzfQ9RJBEk6gQmBJbxgvMwT6VcTw4higxtBWSwBhCvCjgwQIA+h1Xg8RitJHnmTgsSBQFRQkSAS6qWuEWpvC889xzHjFUiedpyoVk/QYn9pbkbwO3OvihUmJK3pNdl+o7nhvagbrJM8IzE8w0z3PKMcgzihPKVi4GIYfE8QygqPK3aWYIlCsCRrDKdWRLoF+QBSYljIkKtx8TK1mcmYAWLVrkC//hQxAgHvzaDZIlJgE2kcWY+LkeNwZEjQlM4524F+QFdQtCEAeD/EE0mTApwYkWcsGknCx1A1hBRFAx6G9Q1eI9kyVqEZMgrp7gwgAlWEoMssWBDOAoJ9yfyZbxI0YnH4NMgAOFtjMBk9AS8sG9mOzj6jaEGGGKKwQHPCj0BZLM2Gqmfp5DxpbC88zzyHmQVfrLjwVW1aL6Mf78uICAcx+wh+RAutkAnOdHlSwUW4hWLsaz8Mwzz/i6uJe6lrWup556yv89MQb5bNhMv8CBHwUE4sdZZda+26shkA8CRrDyQc+ujQwBSFPv3r19oVICaVE1iO+BbDFRUcgizSTAL1+26VBlhmsgEvyqpzBpcS2B8qoCkfGagtqA+wmyhrqgkyN1FMOU8ECOIBXBCVknWsgmuas4F7ca+BDDwyQKkWSyY6JSJQtXEaoQn5nElYRSR1Ct0r4Gv8u0z8FtYKifVWUQuSiNfoEJRIK+gwdEO18SF2Ubg3UpUVVcg8foCwSJQmwW7jtVrVAAMZ5jJdOco+dBtjgXdzjPP/XzHPDc4ipnnFXJ4u8AMobbNVujTepGhvDgSlYFkueMNAx6/1w3bOa55ccDf4f8vUKu+Bs2MwTKHQEjWOU+wiXaPwgDBSPWCLJF7AbuMrb+0MBwJh6CbVECIBgax8LkFqyDiUQVMdQtJnAK52nsF4oCk1ihjXaSOwlXJkSHIH8mTNqCi43CRMsEh0JBf5nIITWoPbSRV+1rqvZyTpBMMdlhuBGzMcigbgPD5MhEXAisaCv34RUiQQJaSEZcCZZiq4Q2Fabgpq5RFCkl0zwHKI0QHFW3OC8sNolnmR8akHBVsvj7wLJxp/J3gHLFMwFBO/3002uVwuBmzhBdgtlTuS3D+s2ziwpJfdzj1FNPrSX/YdfY94ZAuSBgBKtcRrKM+8GkgatM3WX8EmZyYYKChPBKQa1hEuA/clSsoAuCyU1XdzG5ERgPSaMu/vOnkEmayUTVLV4zITHZQo/yBDFkcqYfFHUJMcFCsLgvbck3RkXvo22EoGLZKAhgRcwPbUIdY4+9bCZyvXe6V8YSZQdCzT1UScnV9ZXuflEcV4KV7XPC+foDQOOoVLWCLHEc5Qu8wRpFFrICKYJ084zgOkVB5DkmBgu8NKA+Xd/4caExYokbNqOMEXPFPSH+7BOaCYFMvCdthVxBCFm4AhnkR4SZIVApCBjBqpSRLqN+QjqUeDApE6/DhEGMCpMxcR4UJgVitFADULjUmLyCdXANK7tQaVB2UMoonAdJQ9li4koMKNf6cnklVocJUw3iw701QJ/2QRR15R19QWngGuKfKExgrETr6FZOQtCSGQRL44QIfKewgACymakRE4WBBfcqBLmiP6QcQBU788wzPfaQOkyJlv8Qs3945jAlrrk2jx8GkBAK44WLnB8NxNTxfEJMGDfirnBrQ3ywmTNnerc3zxNB45k8o7phM3UmruIjCJ1FJpArfmDgFszFcG/iFkR5hUDi/jczBCoNASNYlTbiZdZfVB6CuXVVE+4kyBWrC1FCmKgouGCYxFitxy92naCAg+/J9UNhcmNyQBVAuUEtoKAQMMFBfHDdoCDk82v8iiuu8AQJ1YJCfJkakxL9oKQzyAdxZRCfgQMH7nY6JJH6UPeCAcaZkiSuBUvUFiZ30gvg0oyS9GhsF31gwieNAzmluDcYK0HcrXMx+ILnAINgQYCjwIUxg0RRwgxMeKb5YaCkNJMEo7phM8Qbl2DwHhzjuYdcMdYkLc3FeM4IaKcfuARJVWFmCFQiAkawKnHUy7jP/Geu/6HjmuAXOQQGhQQ1APcLhYkQdQiyFHSrMClAwigY17EqEXULtYIJjcJ5xH4RG5TrBtUE/FIgdpBBDYDmFWVODXWCgjqBy4gJFYJI4Xr6OWLECL9hNMeDRjuJ94Ik5hJgDMnBaB9KHnhSSDUQhYHreJe4EvcvOIAxShZk4ayzzpLhw4d7ohXFvQpRB8ohCinEhIBwUhjwPED8C2GQT1x4KJGQOp5hiFK6+0HIUm3YTCwWRBcj9o0fIbmY5sqiPbSL9pkZApWKgBGsSh35Cug3cUbkJaJgBLmzqhCyAWFg1RWFpJ6QFRQUYrdQtNT4XnMXQTZU3UIV05WNukE16ha//HOZVFCUIHpK9lCNVN3iPRMrZI+C6xAiRUHhgXhBpDSAXdtOf3EvMbnmG2BMjBqryQi+x/UDTih6+RgkAfI3wKV6oN+qZEGQUU/oW2IMWT73K9S1qG48axBPlBsKrmkNWA/mk8q0DTynKEHEePFs8OzhQtaYL7DBncizDUapjGcn1YbNbNXEc8UzlOuGzbSLxQm41iHHuHkLsQgiVT/tmCEQNwSMYMVtRKw9BUMABYaCQTxU3eI9yomqM0xouH4gS6pkcQ1xUEGFjAkPdQtXHhMUKgaFCY9Jlbivjo60pVMXqDvRuJ7St29fr2apukVQPpMvhQkR1x3kCaM9tANCttTFpPGeiZh2kL+I97kaChpk6IQTTvDt0ve51IcLCpcluKFSgbUqWfQXFUitFAgWuOKihnSibqIwET/FOIAT488YaTqGdO5Z8IGkYYyxqoh81hWvKKeZEBieAd2wGZzBWwkZz71u2IyiS/6rRAWUe6YzXZxAn7kHsWA8L2aGQKUjYASr0p+ACu0/KhWrmigYhEUTlKJuqXrE5Mmk09ERJWKPgmSJyS5xg2oIFhMNagwlig2quScTKoXJF+VM26cqHH0Yv3OPON4ziXI+hAUVLl8jwB2MCI7X9AnUCakIC7BPdk9UNhQwJn5WCqJ2sEUOcWQDdipZwetKgWBpe1GxNJcbzxBkmHGCHKtrmecJhVPVLdy2iYbLF9Xxsssu82ONMsS4o+qFpW5IrIPPxBCyig91iWchbMNmFFA2bE5H/JLdgx8m3IPx5McLYwgpNDMEDAH3o9xAMAQMAfETl05exLawmo+JkVV7KEMUiAC/zFGNcM/gElRDAQgqZKzwg2yhZhD7pekYIAwsv1d1K9tJjQlak1eimjAZ004UIMgKBTLEJJ7L0nrtT+Ir7UTNY0UhgcuQI96jgDBBK2Fg5VnYfVFM2OAXrLgeLAnUXurUtrAkluAFWSk1Ay9isSgYbmklxRBwCmlBIGWqbvE8gY26enHxcg7fgXnweUuHB2QYlRBihls3qApyDOKP5bNhs7p0cUESP6cLTdK1zY4bApWCgBGsShnpmPUzmKIgZk3zihVxNRhKArEwKBCQJiYTCAGFX+qoN7gNCQoOkiWUCZQeCgQBdxgKGeoTygIF09gvCBfEKFtjgtbkldlem835qCBkWMfdRCAzyhhxNuChSg0KGuQAAsrqNMgeBAkSSMwa8TmQNFQOcCWYHfKJaypMZaP+UiRYidhCZCgE89Mndfnyqq5lnifIM88ORBpyBXnNdlsZiC/ubupIXMXHalh+PGCQv1w3bIb8Md4Y7meeQTNDwBDYFYEqGTl9+65f2SdDoHAI7PX/7cir890rr5Sf/OQnu8Q4Fe6u0dUMySKPEKQC4hA0XHkoOLjNIBlhRmwOKgKKRpBoovwQw8JkhSKEclHXRnzNsGHD/GQNmSQGi4kV0oNiRzvpK0QKg0BCGiBUkCcUFHAhnozzOZeAeXJcQUiJ1wm6XYP95R4PPfSQ/+rqq68OHiqr90GXL0qXGngTMwWJzsTAmgShqKY8SyQihdSp6YbNfIYgU3IxlFzIH+MHgQumesilvkJe09etduVvdc11t0pNJyOBhcTa6t4dAVOwdsfEvikCAkyeZO3mFzqqBm4S/qMOcy8VoUkZ3QJ1AQUGI/iYzXlxz0G8ICOapBTCgSKFSgDhCvZLA9ipg2tU3YJ4MRlQMBQg1DHUrVyCj30lEf3D5A0xoo2XXHKJV/DoK0QJdQtiCdliHMMmbtQt8EJFIUAbt6ASs8RmQjyJ7QHjqFJCJN4jLp9x51LoJys1UTpRSFEIMyXZ4DR69Gj/HELIghs2oxay3yDjh6pFLBZkN1vjGdBcWcQwoqxlE3+X7f3sfEOg1BEwBavUR7DE2q8K1v/eequPKYFcqAsIFwkTNZM0pCvMbRTXLhNXQ44t3H9MlEEjpQEEErKFGyjMqAN1CxUoqJAx0YINZAt8goQtrK4ovlcFi7ogQ7QDgqWrxJh0VYGhzSgwjBtElImeCZ3xJa6NY0zMkGp1oSZrI2Q1uMUKqplZOAI8J7phM7iiXCkxY/yCGzafc845OaURgRyjgLGoAlWMHFeZKmvhLS/8EVOwCo+x3SEcASNY4djYkQIgoATrnrvv9oHOTNAEy2oAMMHkakzUEC2UEVxnYWqHnh+nVxQFyBbqFn1CRVCDHDERkvuJVBBh/YKkcb3GfwXr0NgvCFchiSj3vO+++7yrj7HA/YQyB+lhTBKNNkMw6TPvuR4yRhs1voi8YYx7MuIESbMtVhJRDf8MGUW54nljfMhjBanFgscYA1YK5kKKVE1EAeNvkbitYhH88J5ndsQIVmY42VmFQcAIVmFwtVpDEEgkWImn8Z+5ki1+LTNxYPyHjgKEesN/8sFkoIl1xPEzpIOVhMQmoSoEDUWHFWIEykO8khmEhGtRt3AhBusgFobrid0Co6iXybPyjzFBFWGCZmk+hguTsaAQW5Xpfd944w2vahEcHbTgFiu4sXQFXvAce/8tArgRdcNm0mewCEENIgxRheAyTpCrTMdH6+A1qCaivrJoQwlc8Ly4vjeCFdeRqYx2WQxWZYxzyfQSsoGqQ2FygFQo4WLSoGAoODq5o4zkMnkUExTcexQMlxmB8sQwQVYglbqSDCKpAeEQJu0Xk1qwDq5hJRcFZUFjvzhPY7/IfRQFEWVFJZO1JmRV3Mh9RD8oSoAZE8heYhJMXExBkknMUdB05RsB7wS+p3KjBq+r1PdkwSfQHGN8NMUIn1lBCJ4Yz0yuGzbzdweB40cO5C2bDcL9ze0fQ6DCETAFq8IfgGJ3P52Clao9rEpTssVkTXA1hrLCpM7kjsKVixsk1X0LfYw+od7gKmUJvxpkCYJEn1C3wgLdIaLggbqF6hesA8ICNkzAuPSUsOk9sn2FzNFeXHm0F2UNo636ns+oaowD39OeYDwZx3FZXXXVVX4MdYsV3IgEdhfS5cm9S93IHQYhZyzBS4k7/dJjvEdx0kS6fM7GWIyAK5d7nHLKKbX7e2ZTRxzONQUrDqNQuW0wBatyx77keo4qwqRBgVxBKpRwESxPwXCzqbqFUsIkH2fTttJGXH/kKcL9g7oFqWSyo0Ak6Q/KFLFXakyCkCgKxjWqbhFcru/BgQBlVpAR/5ULEUUdo5C4EiUOd6USLg3s5z6QPhQv3kOmcCGiSrEqkr0fGT/6ykpSAvshf7bFio5o8lcwI3cYqi4E9sILL9yFjI4ZM8YfA3Ncefyd5GKaKwtybhs254KgXWMI7EDAFCx7EoqKQD4KVqqGQkZwH6KsMAExwWNMRBq3BQHJd4PiVG0oxDFII8oUJERXW+p9UHoIbGYLnzBXIJMyJAjFA0IarAMswAZ3bBREVLOVMwa0Vw0iFxwD1DoIJKoWbkbIHjFXEEWz5AigArJSEPLMDw3IFcQVw4XHSkGOgSGkSMl28tqSf8uzAvnlmUMtJQ1Doqs3+ZXx/dYUrPiOTSW0zAhWJYxyjPpYKIIV7CITDq4yVVZQUtSIb1LFiPelZPSDeCeIJJNpoksOhQhXICpRmEFEWZXI6kTIjdbBxKyxXxCesOSfYfUmfg8hgGgxBsGgfO7DpE37IcEoYWzlYhaOAOMEuYIcowSSfFTJaPAYCmc+GzazmIGUG9wDNZEfJ6VuRrBKfQRLu/1GsEp7/Equ9cUgWImgBOOGUFZU3YJEBJUVVQQSr4/rZxJSQpaYFAkiV8NFxMqxjh07+titMFcgRBQShEJGPFWwDq5BHYOwRUFENVcWhEuzlScGZ2v77fVbBFAdcQvyzLLoIbjyMniM8RoyZEhOpAjSrdsW4X7mHkrgvm1Jab4zglWa41YurTaCVS4jWSL9qAuCFYQGEhGMGwoGX6MAqboVli4hWFec3qNkoG5BYFC6VJmCbKFEEOOEK5D+hRm5q3Al4iIK1kGeLlyIxH1B2vIlosRq4Y4Kc2uGta/SvseVyobN2NFHHy29e/euhYBxIqs64wwBRrnKxXCnEweHOsY+ieWWNd8IVi5PhV0TFQJGsKJC0urJCIG6JliJjQzGDaGyKDEhPknJFrmlSs1dwuRMcDtb26BUqaFMoG7pFj5hrkCIKK5IJnJUv2AdECNVt0qNiCoOcX/VQHMIMvv9QWzVNKUFn3HnDhw4UA9l9crzMX7nhs2oicGFE1lVFOOTjWDFeHAqoGlGsCpgkOPUxbgRrCA2/IrXuCFeNZknkxwKkBKuUtt/DRcpWeVR7oLxaPQdgkXMDSvOgsv9g7jwHiIK2YJ0kYNLiSj5r1D+mJwhXaVGRBP7WdefwRVFCSUSbM8777xdks9yjDHAUJtQnXKxUtqwOZf+6TVGsBQJe60LBCxNQ12gbveMJQKQAxQBCqZxQ5AtXCkU1AOSoSrZQt1iIoyzkVYBhQIjloeUD8ENqnEJUlC3II/0v2fPnruQJdI7UMirRAA7qwCJAQMjFhRQIKKoWwTZEy9UakS0rscQ1ZBtbyDExFSxUlDj5xi3p556ym9BBM7kptLnNJt2Uw9uR8gyY2UbNmeDnp1rCGSHgClY2eFlZ+eJQJwVrFRdQ81CVYBsoQRBMjBICQqQEi7cb6VkbIVC7BZ9IjZKlSkmcdQtVC3ULRS8MINkESgPPsGYNla1cR1kC3ziTkTD+leM71EFR40a5fHD7YpypXjx7D3++ONeUSUejs2cc1l4gEJLRn7IMNeTzqHU0pZkOxamYGWLmJ0fJQLx/ukdZU+tLkMgDwQgG7jBKJAQ4pIgFBRVcNhjjxQESrYgJ2EbOefRlEgvZTIfMGCAr5M4K/ZLZNsdVBQIF0oXhX6ghKm6pZM/FxIAT8EgA1zP6kbivyCkFAgbebuI/QLDUiOivnMF+gecSBIK/qh/bKYMXlhww2aewYsuuqhW1cqmObiGn3/+ea+A4colbis4htnUZecaAoZAZgiYgpUZTnZWRAiUqoKVqvuoNkGypekOICWQLAgX6SBKbQsYSCTqFq5RiJOqW2CB64pklqhbYWqKElEC7lUhUxxxx4IN6hb1xJ2IarujfsU1y35/YMUqQVYLqgWPkfgTcpVL+gTi5yBXEGa2XCLLe6VYHxejRjqLNdfdKjWduldKt62fMUHAFKyYDIQ1o3QRgGyQL4pCjAs5pZRwqYJD75gkNe8WbsVcJstiokTwOgXDvUSgPJM+6RwglcRgUSBHugUPqSC0X6gwuAjVvcg1qm4x6RPHReE8sEEdIw9TqWcPz3SMNNCc/pN7CrKpxrGZM2d64sUzQ6xULkZA/Lhx47w6duyxx/qs/7nUU6rX8NxiLbfVyOpS7YS1u2QRMAWrZIeuNBtejgpWqpHANaNki1/Smu4A9wwB8qpulVpOKPoC4ULd0ng0xYFFAJAC1BLciskMIsq1xG4FY9o4lzxbYAPh4FUJW7J6SvU7NrjGjUrfEjdsJnUCxBXLR3HC3fv66697AkxQfMdAqodSxS2bdpPq4qrvf1/Yj9MUrGyQs3OjQsAUrKiQtHoMgSQIQJxYkUeBVEBMlHChLuiSe4iIki1Uo7iTCtx7FAz3oW7hg7pFwDbEiUKgO3FekKWgQkP/IE8UDCJKXibivYj/QumioO6ADRtUUyBvpWwkWB07dqyP4YNIkiA06Dp++umn/cpM+siKzVw3bCYekDEhiJ1g9jA3biljGdb24J6Kcf87CuuDfV8eCJiCVR7jWDK9qDQFK9XAkH1dyRZqDhMDBikhLkkJly7VT1VXnI5BGom70u13grFbugiADaqDxCLYfogoqhapBFhAoG4eziHQG2xwx+JmhYCVikFEWSnIPoz0HXKlWfFRNlkpCNFMpmpl2keeIVyCuF5xu6KOlZo6mmlfk50HxuQKI34Q1/RNv/61f5ZMwUqGln1XaASMYBUaYat/FwSMYO0CR+0HJkbIBISLuC0mYTXim5RssVqvlEgFcVdz5871Sh2EMki2CHSnb5Al1Kkw4zrcaShauHu0DogI6hhxW6xOjDMRZb8/1CncqRDDQm3YTDA7qxJRFwcNGrRLLrMwfMvlezCm/zwvPE8D3OrYfm4jcci6EaxyGeXS6ocRrNIar5JvrRGszIYQIqHqFkoQqg6G4hFUt1B0SslwAeI6JHeWrrak/ZBG1C1SCKBuhakuEFEIKHWAS1DdgmAR+wVhixMRhTgz8TOGtE2TvtJvXMa6mTPuz4svvjgnUsTzwj0g5uW2YTM4pTOeBZQrCOzhhx8uRzlihVkerHTI2fFCImAxWIVE1+o2BHJEAPcO5bDDDvOB8fwKV3VLc1NRNURC1a1SiLNhpaBmIMcdpuoWxADlgbghCkSS/rAqkdxQaqxY7OiCtSkYxIKAcFY3omDgVqSgbnG9qlt1RUQhgmROR3VLXMWHG3Xy5Mn+GON4/vnn+z5l+w/uZcgFZLNv376+ZFtHKZ/P3wOLBsA4cTVmKffL2l76CJiCVfpjWFI9MAUr/+EiCFzVLWJN1GUGidA0ELyW2r6AECXIUeIG1ahbJCaFVEE4w8gScUzEf1EHuAQVMhQxiCiB9sUioqzgY6UlZI8Nm1Hn1DQInc+4s1jll4vhOp0wYYK/FHIBoawkmz17tkyfPt3HLeIS1UUTioEpWIqEvdYFAkaw6gL1Cr5nORAs3FTs58dkXdckBtUiqG6RTBKDlLAaEVJBCUuXENdHEWUKJQt3YHBzadoLwaJvqFv0LcwgoqpuBWPaUMFQjMgojzoW9RhCeF944QXfdtJxJG7YzDEIMmOE4pTrhs1vvvmmz5VF+yEXuqozDI9y+h6MJ06c6Mk05DlsT0UjWOU06qXXFyNYpTdmJd3iciBYbMiLQoJpTBT5ijQpZ10OEAk8Vd0izkmN+CTICMoWMVysVCwVI3YJVQqyRP8guGqQFDaVhiiR0iBM3YKIsrKOOsBF85FRD7FfHZ06BmHOl4iimhHMTroKYqpYKajB9/QjuGEzW+IE3Z/ap3Sv1AO5oC+QC1YK4k6uFAPjl156yS8KYZEEaSgU40QMjGAlImKfi4mAEaxiom33knIgWI8++qiPF0ocTlxB/IfPxBkWpJ14TSE/E/CLAgThQuViCTtGO1nCrupWqU3O7M+H640+sUpRXaT0jbxP9A2ylUrRgahB2nApEgumhuIEUYZs4dLLhoiitI0cOdJvScNzwKbMut8f7YRcoTCioBFvxQrIbA2iCLkgOB5XZyVs2BzECIwJ5ked5Pnlb00xDp6n741gKRL2WhcIWJB7XaBu9ywbBFA+ICxMeBAY1BEySPMff10b6hrxPZoCAdVNCRftpdBWjU9iwoKUpJqw6rpP3B9iQrwRhpqDu5YkpRAvCAwB7xTGBUWKFA4ojMF+QYAoJPOEiHI+ihDxX6z6o2Dkq9INqlMRUcadDZtR13gmiLlCXcNoF6oWxyCAgwcPDlVc/AUh/0AEWXGI+5R7ELcV7FPIZWXzNThCriCrEGj2VFSMy6aT1pGyQsAIVlkNp3Wm2AjgBmKSxgi2Jeg26MIqdntS3Q9lhnLkkUd6IqJkCyUIkkKBlECyVN0KSwaa6j7FPEZ7IU8UDIJE7BYECbKFUkVhbHAjkYMq0Z0LESV9AgWDLOkG1axsZEwpqFlcj7qlblZcjawUJGgdJS2YIoC6yN1F4k+OQdBy3bCZfhG7RZ9ofyVt2AyOqLBsig3exxxzjF/swPdmhkCcETCCFefRsbYZAgVCACWFIG8Kkz95hIKEC9LFKjgIlpItyAXurTgbbjNdkcdkzH58uv0OyoemuKAfKGGkjCBYPqgEEQBPwSA0kCRW60HUNL6NY5A7FDQMJWWAS2wJnmoahM5nMMSdl4vhxtQNmyFWSiZzqasUr4H4T5kyxeONMphL3Fop9tvaXPoIGMEq/TG0HhgCeSEAOYA8UUjQCBFRIoESRLwTBVLCMnjIAsHyBIfH2SBNvXv39oV2ki8KwhV056JWoT6hRKJKQV6CsVEQUdxRFIgoblbULa4jHgpVC1WwX79+u8Tdvfrqq95tyX1JnEoOrFwM3CG69OW0007bJdVDLvWV2jXTpk2TOXPm+MULEFQlvqXWD2tvZSJgBKsyx916bQiEIoArTV1mKDQQE1W3lHhxMS4vVbcILEfRibMpiaSNkCPIi26/Q/A0Qe8UyAzxWeSUwh2o/YKI0k9KKtMNmzn/hBNO8ApZqvPDjmkeLUgeaQhoU6UYbnZIKrFxPGf0P+6EvlLGxvqZOQJGsDLHys40BCoOAcgFqhWF2BcCrZVkoQSRiZ0CKQlu4YMiFGcjdxT5pzQHlcahQSYJesdlSiELuy4CQN1KFegOHrjycCuCG+kTUq1kDMMH1yb14BokBQXkIg6rUsPaG/X3LBYh3gyVEFKMchd1rrKo22z1GQLJEDCClQwV+84QMASSIsBE37NnT19QGSAVqm6RZ4qCsXpP1S1caKg5cTbIIQVjgidQnr6wYg9SqYsAcAkSlwYOvIcMkcSUbXp4jxE0T/6rXBYIQM4gFwS1Q2qJOaokcgGOrJSs1D0V/QNk/5QNAkawymYorSNxQUADn+PSnmA7IAy4wSBHTODB7VuC52XynpgsYrEoBF+z4i6obpGriNV3EISguoXLK85GslJiqigYShJxVyhaJLkkXQAl0SBWuBVzXeHH2EAuIHQEy7MptLonE+9Vjp9RD3VPxT59+tTiX459tT5VBgJGsCpjnK2XRUBAlQYUnfvvvz9pHE8RmhF6C92iRU8gBgkVhlV3+RAtrQ/FBjcaBTWHAHlVt4h1omDEEqm6VQpBy2Cj+KBuQSIhQ2Rrh3xBhnCfhmWRV3xSvaIEkkCU2DDSaKjrMtU15XSMPGbjx4/3XUpcjVlO/bS+VBYCRrAqa7yttwVEgI2IWcoPsUgWx8Py8lxXk+XbbNITQAwwSBWKEooBhAHVIOrcQsRkBYkJZIT7Q7hQgsCJNAaoPihgEC7alA9JyRejTK6nfZqKAXJFwR2aT7tJcMrWN9jJJ59ccRs2v/XWWzJjxgyvdOISRVk1MwTKAQEjWOUwitaHWCCAO0czuCeL4yGuh6BnVUOK2WgSbaqRioG0A5gugyejOxNbMEWBnh/FK8HaFNIm4GYjqFwJF+oFBUPRUnWrElbNzZo1SyionwRzE9RdKYYrnUUEuKyJaQvbsLlS8LB+lh8CRrDKb0ytRzFAAEUjGMfzxBNPeJcSylZdGIRPjQBitaOPPtoHFOO+Y+XakCFD9FDBXlHQUPM0YSTxTJAtCivHKDNnzvTbygTVLXXBFqxhRawYcjFhwgSfwJT0A5CLVCsUi9i0otwKV+jLL7/s1d5K3FOxKCDbTeocASNYdT4E1oByQwA1BhUmSAhwmaUz4pb4NY/rjrxMGC40Jl4yjjMR5WqQGpQjjPbhElQjBot8Q6zgYuIvdmA1qhmFwGYmXo3b4hX3GUVzUCnhwi1XqkYfccsyzih2JNDMx8VYajgQxM+egriNUXMHDhy4Syb9UuuPtdcQCEMg/f/6YVfa94aAIbAbAg899JDPhM4BJk1cPuqO2+3knV+w2g41g6X5yQxlh1xTrNoj5QGr1LIlGB3d5sCkGsDI1E5AMcHEGISKvFVMfLSBe9SVQUohkxSM9qi6BSGh6L6C6krEtQmBLAVDPYRcECSPgge5ZVwrxYi9o/+ko+DvQvfxrJT+Wz8rCwEjWJU13tbbAiIASYK8qOGWQxmiqLHdStBwkwSPE6dEnFarVq38xKukBzcakxKrzZ588klPsIj3ytStREZxNiXWFBKoQtTJ9xAqVBUsE6Ut2P5Cv0e1o/Tt29cH5Ku6RQwX/aFAECGyqm5likmh255YP2QRcsFzwYKIoIqYeG45fmZBQCXvqViOY2p9So2AEazU+NhRQyBjBHDnpTOUC7UguSI31CWXXLKLW1HP01fIG/vmQchQvYjrIulnpipA//79vXKlJA+CNXr0aK3eu+EKFeRee5M83qAIkmeKQh+I1VJ1i5WbFIL1CZhWdQuyGgfSuNQlLYVcQHAZr3SqZh4wxfJS9oBkw2bGYtCgQYKiamYIlDsCRrDKfYStf0VDQGOXiCs5/PDD/dJzSIBm+KYhup8asVZMuhiE4PLLL/fvU/3DHoHEq1CfbqXCxAWxuPDCC9MSCYgJcViTJ09OehuOl4oRk4XyRmExAeRT1S3w0MzruN8gWapu5ZJdPV9MWD0KMYZcsFIQ8ldJBunFxc2PCOLN8oklrCTcrK+lj4ARrNIfQ+tBHSIQtiqQif/ss8/2LUO1IM8PQeQoThjL01VJuuiii/x3if/gHoRAEQwMoSDuqkePHp6QMVHjLtR4nocfftgrYOmCpbk/GxgTZP3ZZ5/5jO7EPZHcUtuW2I5S+Az5pF8UcCXXlqpbEC8KmydDsILqlpLiQvSRdnBPxpD2QS4qIfWEYskPATZs5ocEblv2ZuTHhJkhUCkIGMGqlJG2fhYEAV3tl6pyJnHSIaiRWFFjoZjsg6sN9RxcdxCgoBHDwrWQBLZRQZm54oorvKuQ+KzHHnvMf07nEkPVYbIrV4OMEpNFAXfGSMkW6hYZ7CngRIC8qltRTv5BlZG4OvCO+wbYUT4PxJlB/ok74znFLZjsOY/ynlaXIRA3BIxgxW1ErD2xRyCoegT31WNiz8RQNNQIdg4axOuBBx7wylLw++B79vwbO3asdO7c2Sc2hWShYEGyiMu67LLLgqfXvmfCQ8lhosOFyZY26chY7cUl/AZig/JHAV9WIirh0mzsdA8ipGSrQ4cOOaerYBzAmhVzEDjIRamscoximIN7KuJ2JvYv+DcTxT2sDkOgFBAwglUKo2RtjBUCQVKSTMFS119Yo5mA1fh1H7ShQ4fWkiuUKj2OmsXEFayb5KAjR4708VcEyJMigjQA4wMpGIJ14zbDWDFIqgNNd8A9yLAe5wD3YD/yec9ED+mhsG0ReCnZwuVKrBAFQhTcoBoXXybG4gP2fMS9i7sSpTFT4p1J/XE/B/KqGzaznyKuZzNDoFIRMIJVqSNv/c4ZAQLVUScw1CQ1XUWoKQ/0+8RXJUlBosY5xGnhWmJCPvfcc5Pmo3rllVf8KkKtQ/MKkQn8rLPO8qsC33//fb9KLVUwMe4wAsMpulUNWdzjmuIgEcOoPjOWrOijbN261ce1KeEKptiAfOLOReEiOWhQkWEsIMDgrqkwCLwncWolGf0nVQlWiXsqVtJYW18zQ8AIVmY42VmGQC0CqB+auyqoRmkAczJVSy9G2VBLVDbUdUgAO0HyyYzcVygtuAjVcPuxKhHFhI2IyXFFCohUKxNRFjiXujiXYH3IYqURLMWQV2LTIFAUUimwKEHJFsoMaS2IgWPcULQgWbxHCVTCC3Hl2rrYbzLYl2K/Z+NutjfC/YxLVJXXYrfD7mcIxAkBI1hxGg1rS0kgwGo7cvropIpqcfDBB9dOKkESldghVBK14HuUK1IooGqlW8bP5HXeeefJM888U9sGVqtBsAa47Oy4DmkD8UXpJnrqgiyErYbUtlbiK8lee/Xq5QvjQ4A8CU5RDSHRjBekjPMgxKpwJRLncsaOmLaJEyd6Ug+5JJi/kkl6OY+19S17BIxgZY+ZXWEI+ImVSRcjzw8EC8PlRFzPnDlzfFyT/zLwTzAPk64k5DCpGCBs6dIsaFVM6Li1WA2HMdnrPQlenz17tkybNi0twdL6MnmlvdQLcaOPEETIBPFKTK4oP9y7HFeLQXwhq0HCCg7EGxHInbhYIRM8S/0cXOEvvfSSV0FxR5OGIrjoo9T7Z+03BPJFoF6+Fdj1hkAuCCg5yeXaOFxDCgA1JhpVrYi9wXCXJOtjorrBJI2hhGCqivkPaf5hT8JgLBBKGkYbuA9B8cnakKbapIefeuopue+++3y/WHrPMnxIHX1HzSEGiT4TpE+6CHWhJq3Mvix5BHjen376aU+uOrqs7MQMGrkq+WG1DkSMgBGsiAG16jJDgHijdMHgmdVUN2eRUT1Ilohjwrp06eJdRqg7wW1ogq0MkiJipzCSiFJfMKYreE3Y+2D2dVQljHp0RaAqXGHXp/ueOKR7773Xxx9B/mgne+gR3/XDH/7Ql8GDB8tRRx1VG/zNNeDBqsbEXF7p7mfH448ABHvUqFGewONCJeZKfyDEqfWQfNrqrUFpbAYeJ/ysLfkjYAQrfwythhwQII5lxIgRftsW4lqC8Ug5VFf0S3CDBd19/EfOajyM+ChIFEHRzz777G5tI9+SGn1Xo07N06TfpXsl1YBa0OWIqoARpJ2rQYAff/zx2stPPfVUIes87jBcgmqQOfJqnX/++XLNNdf4jZlxqbFCEZJJNm+z8kCArOxjxozxCibB/MHnL049JKYQ4s9rvcZNZGu7bxXnOLXT2lLeCBjBKu/xjW3vDjroIP+rlz3jnnvuOXnwwQd9/iA+qxIT28bvbBhukaCRfwrXCXFU55xzjleSCIzm137Q+vbtW/sRFx6r/rBOnTr5V/aty9QgZUElTa8jCSkWTCOhxzJ9ffTRR73LkvoJXtb2pbue/l199dW1cWkQT9yGUbkr093fjhcGAfZUJOYKQ7WK64bVuMZ/9rOfyXK3QhbbeOW/yrbGTf17+8cQKCYCFuReTLTtXrUIoLCg9LD8nTgkXQ6vigsrkQgoZmUWAd1Bt1ptJXX8hpgTgts19gkFiVglMqvTZggYv/ZRt4YNGyZXXnml7wd9pz+qOBGMTsoEYqogW6h7YBIMqE7VVY3bChIt8ONzrm5YiC5xVhh5n0i6mWjUTYoC0kToijruyypLyBhJNlnZiIqH2/CRRx7x+yWWYxB8Ijbl9plVqribeebJuaYpSeLWT9KOEBv2glt8gDXv1lM+73dy3Jpp7akQBEzBqpCBjmM3IQCkCcDN8P/aO9MwqaosXa9MZhBBmQRLSRSwBEEQFEUQccAJFJDB1nYqbbWd+nbfqevWrb5VWt7n3v7VP/pPPSJaDpQWimN7tUqqtEAFFJB5kkGTSaZkBkHg7nfrTk9GJJBDRJ4TJ771PIfIIeKcvd8dyflirbXXohI5LV4QGexGCzvxECh4t8jpIV+JsFOSDBER7TFHSAIhgbcGkYWIZJ6Ilcp8EDcBPHjByLuijhBhNSqqY8w3JM6H51X3iHAJFg3bhZ8FERe+r+kjCevBhg4dGr6sfORmy7oEjyPzI9kdjx1jJ9l99erVngH5WtyYmSeerCAIK0+mLxJLgPcxOyVZb0LbY8aMSay4Iq+T+nCEpPnb4e9uw8SHE8tWA0s/AQms9K9xwcyQEgds8+cT8j333OMfCUMQciNhlSrRJE7jJaLqOQnUSbhZ47GKJvkiJBgnoQrChoyRT/wIrmBUuuYGEGzu3Ln+psAOQHKaEEbkP3GOE1kI2fAcWpNEjetGrxH93cm+DnWxKMFAYnvUpk+fbng0TsQe7xbPY3ysH+KZR9gcL/k/eg19HT8B1ooPOHhTKa7Lh4XqRHz8IzX/fqQ2Ha2KPnVlU7Cmg6+2w2eW+a/1jwjEQUACKw7quuZJCSBYQkVtbs54uNi9xn/01IyiojY3arwo3Mhp08ENIS678847q4QxERg0XmaszCUzX4txhpIOfI1YIVcLYUVyLmIT7wHnOF5OFm1zOD+GKCMcFyyE9/CK1dYQs0E8Rb1znIekfDxTGK2BEIrsJiT5nR2NmdcjKZqCqPx87NixntGWLVu8x86fRP8kkgDCnvcjXlfC13zoSWpol8baYbfsh+5DGH83TZyY3zj63kSy1aCKh0Dt//ctHjaaaYIIUC2b3Wsc/AfKjZ7cHw5u+OGmT8FD8rY4TtSLL9dT4+Zz11132UsvveTzkTh/ECm0t8kUHvyenXfLli2rTOpHICKoQriU5H/mSXIx4Q9EFBzYcYn3LoRLEWOIsqgFHnXxOMA0WOivGL4POwIJ7Y4cOTL82Hu5EFscCELGHIwm03gfhw0b5n/POfDYkauFV0uWLALkMeF55EMCLZUyPaNJGS0fRvh7IUzO3wRj5oMXdvjGiXa0dZukDFXjKFICElhFuvCFPG3ESplLFOfACAuQHI8wQHjwqZsbODdvvGCILZK0M8WCf3EO/0Fk3XvvvTZt2rTKZtDkrZwoWR3vHAU8Q5kKbhbs3sMjxM49BNaMGTO8CGNe0TwuPGPU3UK4ZFqor8Xca2tBuPG66OYCro1njHlGxVXm+cmpgzsCMRjjYUMAuWeIL7xY5Gqx21KWHAJssqD1DYZYjtZZS84ozX+4ePXVV/37kffkVPd12I3bou9AK79mbJKGq7EUKQEJrCJd+DRNmxwhDjxC7GZDaCG4ECeEDjkwcqCCdwtvUL6MUBjXJDxG7aiTGR4rEuODx4vSCi+88IIXWAhDRBg3EcodELpB9PDz44knXk8NLvKv+vfvf7LLZ/0+KqpCqJEn0eMQO+OMM/zjif5hfBRjJXwb7C9/+YvddtttvqUK88OzhZijF6IsfgJ8KOFAQNNwPNqtIP7R/TgChD5hZz6UkMxOmsBm98EKazrseiu/7RE75t77MhGIm4AEVtwroOvnlABJ2dSACnWgKHkQvFt4TfBwkSDPrrYgtsjr4qaSS+OTf00//RPGI8SH5yvs+kMokmNGuQOECt44NgDUxMidQazhOasuNHmyc8AmWNSbxS5BjJBkTQxvFaFNhBSG8MPbiBgmxMiOQ8KJzE8WHwHec4Rw+VDA2pJvldSGzYS+CTHz/uZDxNOTJvndq3yYODbuXttwtTxX8b2TdOVMAhJYmUT0faoIsHuPgzwSckoQW8G7RdiKg/+c8coEwRWttN5QMBAdmTlcXJuE88mTJ3uxROjtRDlVzIs8FG6YzKkm3rPq5of3idwwjN2E3Mw4H+IVi3q1/A9O8A/J/bTaCUaz6KuuuspvWGA3KGOWxUeAvwnKMFCPjnpnNGxOal4cpUxC+RC81JOffdbnYzZ2H4723fdfbfeFP3Y1iI+oriwCPxKQwPqRhb5KOQG8VOQscWB4tLjB8581NxgOin6ycy6ILbxbdfEC1QUl4yOHi11RhDdDyBDBhNAi5IjIQQDiYeBGyA2SvC3CJni9gpFYHw31hZ/X5DGzYju1riiXQYgV4YVXsDZGYn6o1xVyyAjRMhfGTJjnRMKxNtfSc2tOgFpzvNcIO7PmCN9ouZGanyn/zyTUHDZuLHHvR/IUseatT7Wtj/zaDpb1yP8gdAURqCUBCaxaAtPT00OAT+wc7JTCK4PY4kDcICQ4ECnkogTBhVjItxGiIZRGkng0RIfgQlAR5uSozhgviePRmlvVPe9kP0NUslsTCwILYUooiVAfv6up8IRd2FXI+IMhsggfkpyc1J1qYaxpe0ToIq5439OwOak9BeFOZXY+DPH+/8gl4Ie8vpadOtv6x5+yI+06pm15NJ+UEJDASslCahr1I4A3iHo/HPxHjoAJgotcoZAvRI5KEFvkEeXrEz8hQ1rrILRIDqfeFePiqM4QVuSd4YXIhREmxGOG4eHgwGuGKMKDxU6zml4LEVudUUYDgVVbj1h159LPak6AdUWk4BmlYXNSewoixim2y4cMPJ1vuaKnhJixlj16WfnDv7KjLbRBouYrr2c2NAEJrIYmruslnkDIySIv65JLLvH/wUfFFonbHIgrRBaCi7IEp556as7nhtAKNa4IpZEzhveBmw+iit9T/oDHXNqVV15pz7l2NxiiDpFHmxRKQpA7xY5G2vrUZDdmNGcrWrg0JFJHvXT+gvonbwTwJLKxAO8jOwV57ybREPRs1kBYUR/uRVdfjr9BrPmgYfb1Xf9kx9zfn0wEkkxAAivJq6OxJYIAZQQQMRx86sfrEgQX+VscGIIhiC3CigigXBp5SgMGDMjJKUNO1PFORj4YuV6hUjxeJvLAyNXBU0bJBrbKhxY4xzsPP0eMBYvmd4Wdm6EGWHiOHnNPAJFMeyM+GPB+Jpk9qQ2bCdG/9957/m8NofWM2+TBI1Z60wQrH3VX7gHpjCKQBwISWHmAqlOmlwCiCa8VB6178CoFsUUF7IULF/oDDwEJ8kFwJSGJOxpepOI14RZE4fFaDFFMlHpVGK9lezwtgUigJ8mYXCzqd7FT8HierJAzxjnw+EXrcoV+hzXN5eIcstoTIF+Otkq8TxHNFLCNehJrf8b8vQIBGPpc8kFmkivCy/uk1L13Dv3to1Zx2cnryuVvdDqzCNSOgARW7Xjp2SJQhQDCiZYvHHi3EFlBcNEklwMjhBfEFgnoufZuVRlUDb9BNAUPFS+JJqDzPfWwSGwPHig8TVTPvv32223ChAn2yiuv+Arz1O8qc1X1hw4dWmWLP14Hcmgwwq7c2KNGHSMsqTf76FgL9WvCr3iD8EAi+EeMGFFZbiNpc6JZMwKL98oq5/VE3PMeberyrCr+/n/a/p59kzZkjUcETkhAAuuEePRLEag5AUQTyeEcgwcP9h6eILYoAYHHiIPyBDwnCK6GqmR+xx13eE8GO7KiJR3CDINHKXzPI4nshEDD7/DYIbJo5UN4EM8I4ULChxy0IyL0x/mzYBb9AAAlcklEQVSjuVeIq8zK4DDBuPHLck8A8cxOQdaMRuBXXHGFFy+5v1L9z8g4Q6h9zpw5PqGds7Y4vb1tevw3dviMn9T/IjqDCDQwAQmsBgauyxUPAZLeqb7OgfeHnYgILm4kQZBAg1yYILbYcccn+HwY4uemm26qPDVFG/FOUQ8JT8HxeiYipGhHwnMwdjYSGhw/frwPF+KpYlchyfcIsSDGCAkGr0mmx46wVcir4eYvyy0B3mv0esQrWUgNmyl6+umsWR5Gy67nWrmrcXX01La5haOziUADEZDAaiDQukxxE0BsIKI4MMRF8G6FUgVUqkYERb1b+ayqzY2X42SGR4qdjOweDCILUUYIh2rxjJc8LIyQFL8j7HeivDN2JWKUasgUX/4X+qfOBNhpSoNwDA9kKKxb5xPm6YW8V6ZOnVopyv/gvq5s2Hzhxfb1ff9sx5o2y9PVdVoRyD8BCaz8M9YVRCCLAMnlHH379vVFO9k5FbxbVKwOVavxaAXvFmIkLgvlIqIiizAgxVAJ/dFPkFBnOE40zlnOQ4EHDxs+fPiJnqrf1ZIAXskg1CnDUJPG3LW8RE6eTpj6bVfXCs8ugvx3zz9fWTy3yfCbrHzCQ2rYnBPSOkmcBCSw4qSva4uAI8AuujKXJM6BEYIL3i0KnnIz4saJNyuILepuhTIH/kUN8A8i6+6777YpU6ZUSYgnl+rFF1/0oU4E4/E8JiRaE7YiJwhjLohMWf0JsMHiww8/9CFfQtN0A2iIrgN1GTlhaTyYeEN5T7BTkEbihMaPTrjfNg6/pS6n1WtEIHEEJLAStyQaULETQMhw9OvXzwuZqHeLEAoHNyN2IyJSOHh+Qxii7p577vElG8LuwnBdbpaUcuDmSagTQUj4j3wrRBUiIBgigFpMsvoTIOeNJt8IXd4TeK7yGVquz4jnzp1rHBgfIp51xWx92yUXCtx3v2vY3PfS+pxerxWBRBGQwErUcmgwIlCVAIKGwp4cGInkJMlzcyJ3i4NdV4TmgtgisZydivk0cnuGDBniwzyh3EK4Hp4JdhBGdxGG3/FIUjsV4WX1J0B4jTAthWOT3rA57Dhl1osXL7ZXfijh0YyGzY89Yd+e3b3+QHQGEUgQAQmsBC2GhiICJyNAHhYHzZHxXASxhZdr+fLl/sBrRO5NEFz5CsOF5HfGTHgK0Xc8UcWYgneloUObJ2NaqL8ndEyNK5gTmqXwbVKNtjd8OMCLyY7T6c7TibU840zXsPk3duT0+PILk8pM4yp8AhJYhb+GmkGREiAMR75TyHkiXysILgqecpBQzm6+ILaoQJ+PyulXut6FwSgNgGcNAchuQq4pyy0BNgkQjkWw4Emk0G0SjfcCOwXJsWJTxBtvvuk7HTDWFuddYOV//y92tLkaNidx7TSm+hOQwKo/Q51BBBJBAA8RB6UXaH8TxBberaVLl/oDTxKCJwiufDSoxkPF+WX5IUA7JoQzQpk8NjY8JNEoRRIaNlOSgYbNvCexppdeaeV3/qMaNidx4TSmnBGQwMoZSp1IBJJDgDY3PXv29Ac5UXiUooIL0UXPNwRWEFuUW6BelyyZBFhH2skglsm5Y6fg8XpAxj0DwsUk3uNhIz9s0qRJttM9YqUjJ9qGkXfGPURdXwTyTkACK++IdQERiJcAOw4RTxyXXHKJLwZKj0QEFxW/STjmCJXXEVx4RVq3bh3vwHX1SgLstKPEBWvGjlHEVVJ7OPJeQrxj7Gx8ZvJkHy72DZvvetwqBl1dOS99IQJpJiCBlebV1dxEoBoCeD/OP/98f+Bh4CYYvFt4HjgwkuODd4ukecKLsoYnQHiNXn3s1qRqPtXz871LtK6zpIL8smXLfBmRFa6cCPXR8Lw1de+5iod+6Ro296nrqfU6ESg4AhJYBbdkGrAI5I4AoomyDhzsQqNeFd4tRBbCi3wfDvJ9oi18kuo9yR2ZZJyJorOIK5LEf/rTn9rQoUPz1quyvjN+5513/MYKzjNr9mzje6xFuw7fN2zupKbeHoj+KRoCElhFs9SaqAicnAA7Dnv37u0P2piwEzF4t9atW2ccGGGq4N0isT5fDar9xYr0H/LkCAuy+47QLoVnk2iEL1999VXbvXu3Lxr6nmvYPNsJLKxlGQ2bn7CjrdskcegakwjklYAEVl7x6uQiULgEyMkiF4tj8ODB/gYa9W7hXfniiy98y56od4sEe1n9CFDTjHAbwpU+j+eee279TpinV+PxnDZtWmVhWRo2r1q1yl+tOQ2b7/+5HWvSNE9X12lFINkEJLCSvT4anQgkhgA7Dvv06eMPvBYkyAfv1po1a4wDa9++faV3i2bVstoR+Oyzz2z+/Pm+3VCSGzZTd40wYGjYTNsbiolija8eaevHu4bNtZu6ni0CqSIggZWq5SyAyZS6MgBHj1T+R1wAI9YQqyFATlbXrl39wa8rKip83ha5W9x46Us4b948LxLwgBFOxMuV1B551UyxwX/EhgP6OK5evdqXz7jxxhv9Y4MPpAYXpB/mRx995BPYEVU0bCYZH4/b0YkP2KYrR9XgLHqKCKSbgARWutc3cbM77HYRNVn+hT3x5JPeE5Lk9h6Jg5fgAZ122mnGceGFF/qcIfKHEFt4uGgKHRpDk68VBBeeLtn3BKh6/77LXaJeGYyS3LAZDxuhYXYHfuXW+Nlnn/VerCauwOyeB35uey64WMsqAiLgCDSyiX/3K5EQgYYi8F2386ztrOl2yN1QCIOQ58P2c0oHkGAtK3wCrCliq6yszPfI45G1JZRE/zwS59nKT8FMPF94btiVyOsKySigibcJzxyiqK5Gcvjbb7/t/w5o6o24Smq/RpLuQxmGBW53aSjD0OzUNrb1H/+PHehxQV0x6HUikDoC8mClbkmTPaHv3FbtA6PusNKpk2zFihW+wCXNavFwcIOlMjUJvdRpykfPvGTTSefoWFOO/v37G73pQt4Wj4SaOAgtUWsreLfYpVgMRjgVzxV/A3j/Bg0alNhpv/baa14E4rmaPn26fehChFjLzj/5vmHzafJIJnbxNLBYCJTYtDnKQ4wFffFetMTlYJ31qwftwJbN/tP//37qKZ+3w00mang98A5QNiCpLUGi49XXtSdA/g6hRI6QIM1Z8GiGMhDU6EpiYU12VCKOCHP37du31pNnUwA5V3jwaNjMh4okGn+XlGEgxwqB/Pobb/gPRoy1pRo2J3HJNKaEEJAHKyELUUzDOOYS3XdMeNBa/PuvjVydta620kMPPuj/86aoJbWWaBTLFnC2q3PgzerQoYP16NHD99dTVfF0vGNYU44BAwZ4L07wbvG+CGvPWtPmJ3i3qDBf6LZgwQJfKwrhOGLECD+3JM6JUhxvOEHFrlEE1guuMjtrgzUdfJV9/bf/YPw9y0RABLIJyIOVzUQ/aSACZf/2c9u3fJHveTdv7tysHVN4Ncj3IPGXJOBghJPwbuHhwLuVhhtumJsevydAGIp8reDdIk8vWFh71r9Lly6xhZLr4sFiXjNnzvTva7x07BRMajgU9njoGDO5cvQUJO8MKx11u31z0+1hSfQoAiJQDQEJrGqg6EcNQ6DJpq/ttCcftWMuRNLJ1Uvik/z4CRNsoPNmZCY8E6bAu7V27Vpf8JL/9IMF7xatRPBwydJHAO9J8G5Rf4tQFcb7BJEVvFvU6mooq63AoiL7Bx984OeBqEJcIbKSaPytzZo1yw+NTQmIK5g3cp7kg3f/J9t58ZVJHLbGJAKJIiCBlajlKL7BdH7rd/bdu1OrTJxK4P1cwu+om2+2UaNGWUcXQso0hBYhJJKEw82W5wTvFjvXLrjgAu8dy3ytvi9sAohrvJrBu4V3JVibNm0qxRbCK5+h5NoILATiu+++a4TcEIPXXHNNIvPK4EgFef624MxGlJemTPFfN23ZynY8/C92oHvvgFuPIiACJyAggXUCOPpVwxBo4epinTvzXdvjwoX79+7JuigFLYcPH24TnXeLnWiIqKjRCJdP3Nzw9uzZ428G4ffkuLA7De9Wt27dwo/1mCICrH8QW3i3yBfC8GySIB+8W4QWc2k1FViIKsQVIotEdhLaM9/DuRxXfc4VGjYjrvBgvesaTWMtXcPmjf/wlB3u2KU+p9drRaCoCEhgFdVyJ3uyyKbGX62ybl/MsEZL5tr28q+riCVGT72kgQMH2uhbbrEbbrjB11vKnFXY+s+uNMIywbip4eEI3q2khmfCePVYewLsyNu0aVOl4Ao5Q5yJ2lzkbSG4EN319W7VRGAR1iQsyPuQEgyUYkiiIUqnuj6CfEDha4QVBUWxlmXdrfxR17D5lIYLvyaRkcYkArUlIIFVW2J6foMRKN23205fONvOWPiJ7VqxxA46D0DUEEzUzLrGNcMdN26crwwf/T1fU8QR7xYeDjwdIXeL11LMkRstXgVuvLL0EUAwBO8WuUQUO8XwbEYbVNdFbJ9MYLFBg4R2hBweWIqIJtHYrUuNKzaSHHC5jq+88oovoMpYm/cbZOvv++9q2JzEhdOYEk9AAivxS6QBQqDEhSwar11u5zjvli2eZzs2fr9VPEqHBOdBl1xio8eMsRHXXpu1K5HnctNbtWqV75UXQkn8nJsg3i1uguxMVM88qKTLEFeIrCC4EF/BqLOGyOagQXVNQngnElhz5szx7WR4H1GZvT6V3sMY8/GY2bB5smt7Qx9JrPHVN9vm8Q+oYXM+wOucRUFAAqsoljl9kyzdXWHtF86yTs67VbFymX2bUaQUwcSOQnYm3jp2bLVFHEmOxrtFXR+8W1HjxkjtJcQWydKy9BEgfBjEFmFFwosYns2Qt8Xj8cR2dQILEUfxUIqIIvgLqWHz05Mm2YEDB7y4PHLbg7Z92Mj0LbpmJAINSEACqwFh61L5IUBl+GZfLrWyBTPs6JL5VrF5U9aFqJV12WWXebF1lQsptsrYHs/Nld54tOyh5lIIJXEixBr5O8G7ldQ+cVmT1g9qTABvJgnyQXBFBTeFUIN3i6+DZQoshPrs2bP9+4fQM56rZs2ahacn6hEPG8VOCZmvc5tDnnvuOf+eb+zGu+eBf7a9vdWwOVELpsEUJAEJrIJcNg36RAQaVWyzjs6z1c55uCpWLa9SxoHXUTuJXYXXuxvgWOfd6t69e9bpEFncgLjpUoMr5G7xRMpI4NXq1auX93JlvVg/KHgC7PwLdbcoCRHWH8FECBHvFKKMcDPhRcKNodXTeeedZ0OHDq13En2+INKwmTInGA2baYODNTu1rW15/Ak79JNk5or5QeofESggAhJYBbRYGmrtCZS4m2DzlQut24KZdmjpF7Zr65ask3CDvHzwYBs/fry/MSKgosaNdMmSJT7xlxtvCCXxHLxbvJ5kewSXGlRHyaXja+qsBe9WdeFkZkmSPOFE3gNRL1fSCISGzbyH/+xCmR+Fhs1daNj8lB1p2y5pQ9Z4RKBgCUhgFezSaeB1IdBo22brvOATa7Notu1YvdK+i5Rx4HzsLuvtbpLXuxIQY1yyfJmrwZVpJAYvWrTIJ0yz8yp4N3geZSSovUTuVpJvtJlz0vc1J8CaE0IkYf6TTz5JdPmFMCu8a5RhIMcKwVilYfP5fa38oV/a0WZVP1iE1+pRBESgbgQksOrGTa9KAYGSw4es1YoF1tXtTPx26QLbtePHfndheoSDCPeMu/VWXyAyM/+K+kaILUIuJM1HvVuEIvFukWxPKQi8XbL0EMjMwUrqzPC6vvnmm74WF8KQhs145LCml19jG+94TA2bk7p4GldBE5DAKujl0+BzSaDxlg125hcz7ZTFn9n2NV/aERcajBr5N3369LGbXA+5m10bH+ooZRpejcWLF/til9EG1TyPSuKEkfBuJbXBb+Z89P3xCRSCwGKMf/zjH72XlQ8Ak555xteGY1Ylt9xhW274m+NPUL8RARGoFwEJrHrh04vTSqDk24N2yrJ5dvaCj23/sgW2d+fOrKmS6H6F826Ru3XppZdm5V8RlsG7tW7dOtvpXh8NJZKr1b59e+vZs6dPuM86uX6QeAJJF1hs0mC3IO87PFbUuPq+YXOTHxo2D0s8Yw1QBAqZgARWIa+ext5gBBpv+MrOXvixNV/kvFtfrbGjP1QEDwOgVlL/fv18c+qRI0dWW1iSGzKFTtmVRmgxKrhat27tSwHQoJqCp7LkE0iywPrrX//qGzXzHqN11IsvveTfb81anWLbXMPmg+f2Sj5gjVAECpyABFaBL6CG3/AESg/ut1OXzvXhxH3LFtm+PbuzBnG2CwUOu/JKm+AaVA8cMCAr/4rGv8G7RTufqNgi0Z7cL7b7V1dCIuti+kEsBJIqsN566y0v4nlPkYT/3vvvez4t2ne0Da5h85EOnWPhpYuKQLERkMAqthXXfHNOoEn5Gp8o33Tx57bt63VVxBIXYwv/RRddZKNHj7Ybrr/ehwYzB7F69WrvcWCHYmaDamoudXW7GfFukcclSwaBpAksyolQ0wrBztf/8e679vnnn3tYLbv1cA2bf21HW6lhczLePRpFMRCQwCqGVdYcG4xA6f69dtqiOdbZhRN3L19iB/btzbp2t27d7KqrrrLxrkF1PxdWzOx7R/NdWvhwA4/2y+NE7GKkrx27EsvKyrLOrR80HIEkCSzeM4grcqzI/fv9yy/7dj3QaH7RZbb+Z//NjjVu0nBwdCUREAGTwNKbQATyRKDEnbfxupXWzZWBKF0813ZsKM/ybuGRunjgQF9zi9YqtPTJNHJoOLZs2eI9E+H3CDOej9DCu5VZIDU8T4/5IZAUgUUfxXedt4r2TnivnnVtbyobNo8YbZvH3q+Gzfl5C+isInBCAhJYJ8SjX4pA7giU7tll7ZbMsU5ffGy7Viy1gwf2Vzk5gqmHa9tzteuVOM55txBNmcZuRMpA0DOPmkbR3C3KSNADj2rilIOQ5ZdAEgTW8uXLjYR2DAFOGQbfsNnVXDty20O2/Yob8wtBZxcBETguAQms46LRL0QgfwRKXKuSJmtXOO+Wuzni3dq0Meti5F4NGjTI90scce21WflXiCtusPTDw2NB3k0wxFpoUI3gYpejLLcE4hZYs2bN8qFkZkUpkOd+97vKhs27H/wftq/XgNxOWGcTARGoFQEJrFrh0pNFID8EGu2qsA4LP7X2rkl1xcpldsi1Y4kaVeDZVThixAgb61r40Kw602hQjXerun55CCzqdlHktHNn7SLLZFeX7+MUWBQPRVRh8+bPt9dff91/3bxNW/vmMTVs9jD0jwjETEACK+YF0OVFIJNAiculafblYufdmmlHls63im82Zz7FV4KnuCktfIYPH+53KkafRMuepUuX2pdffmkIL/JzgiHWqCRPg2oElxpUBzK1e4xDYLGu06ZNs9B0fPqf/1wZImzZ5SxbTxmGNqfXbiJ6tgiIQF4ISGDlBatOKgK5I9Box1br5BpUn06D6i+X22G3UyxqCCR2FV7vkuTHjh1r55xzTvTX/uutW7dWNqimBlfUSI4PDarZoSirGYGGFliZDZtfc0ILEY216HWhlT/4SzvWTKHgmq2eniUC+ScggZV/xrqCCOSMQMl3h63FioVW5spAHFoy33Zt25p1blrwDLn8cpswcaJd7cpBZBq5WoQS16xZU+kJCc8JDaopcEoYUt6tQCb7sSEFFl5IGjazdntp2PzCC0bfS6zpkGtt4+00bC7NHqR+IgIiEBsBCazY0OvCIlB/Ao22bbYubldim0WzbPvqVVUS3Tk7Daknumry999//3EbTLPNH8FFCx92oEWtVatW/hzsaGzXrl30V0X/dUMJLK7zpz/9yQgPIrToKUg5Bqxk7N22ZcT4ol8LARCBJBKQwEriqmhMIlAHAiWHvrVTViyws13drYOuQfXuHTsqz0J/Q3olDh482NfcooxDZoFTnkyhSlr4rF271jeo5qYeDO8W3rEePXp47xa5XMVsDSGwaNg8e/Zsj3m9a9j87A8Nmxu7dkr77/0n23XR0GJeAs1dBBJNQAIr0cujwYlA3Qm0njfTOvzHS7bHFTiNGvWy8GxRUf68nj397sRhw4b5GlrR5/F1eXm5z/OhhQ85QFGjSCpCDe8WJSGKzfItsD766CPfPgmuy1w5jilTpnjEzRz3bQ//Lzt4zvnFhlzzFYGCIiCBVVDLpcGKQO0JNHc7EjvO/H92ZOFndigjwT16trOc6EJoTbzttmobVCOwgndr165dVYqckqvVoUMH6/mDYIueN61f51NgkW+FqMVmzpxp77uyDFiLDp1sw+M0bD7Df69/REAEkktAAiu5a6ORiUBOCVDctPFXq+z0VQutxVcrrXTzejtcscMO7t+XdR12Fvbv399uvvlmG3nTTV48ZT6JOkzLli3zFcS/jdTtIvSIdys0qKZgahotHwKLJPapU6f6HpSH3dfvvPOOzZs3z+Nrce55tv7hX7mGza3TiFNzEoHUEZDASt2SakIiUDsCpQf2WVvXoLrLgpm2x7Xw2b93T9YJ6HdIg+oJ48dX26Catj14txBdNKiOtvBp4vKFOnbs6PO2qL2VFsu1wCJxnRpXoWHzlN//3ufCwav5gMtt/b3/RQ2b0/Lm0TyKgoAEVlEssyYpAjUj8H2D6lVW5lr4NFoyz3as/7qKWOIsoUH16NGjjQbV1eVfUeCUNj608EEwBMO7hUcL71afPn2MXYqFarkUWJRcoGEzmwoIv9KwmR2DWKPrxto3Y36mhs2F+kbRuIuWgARW0S69Ji4CJydQune3tVs82zWo/sR2rVziwolVi5QimLo7rxQNqsc771Z1DarxzODdokH13r17KwUbr8W7RYNqCqUiugrJciWwEKIzZszwXLa4grBPP/2031BQ4nZpHrn9Yds+5PpCwqKxioAI/EBAAktvBREQgRoRKHHNpRtHGlRXbNyQ9bpTW7e2Qa6FDxXlr73mGmvtvs+0FStW2MqVK7136/Dhw5W/puwD5STKXDgS71bSG1TnQmBRgoFSDBilMWjYjBersavIvvvBn6thc+W7Q1+IQOERkMAqvDXTiEUgEQRKd7sG1Qs+9U2qK1a5BtUZZRwQTOwqpEH1rU5wVdegeufOnd67RTkIvFtRo5wEjal79erly0pEf5eEr+srsN5//33jHBiJ7K+/8Yb/unnb02zzY0/a4TPL/Pf6RwREoDAJSGAV5rpp1CKQKAIlR12D6pWuQbVr4eMbVG/elDU+crUuu+wyL7aGu4T5Vi1bVnkOnht2JZK/Re5WZoNqXk/tLsKQTZs2rfLaOL6pq8Binq+99ppVVFT4OX4wfbovxcAcWvykq2147DeuYXPx1RWLYw11TRHIJwEJrHzS1blFoEgJNKrYZh0XfGztXIPqilXLqyS6g4Sq8HimrsO7deut1TaoJsmb3K3169f7Fj7RnYmUkcC71bt3b/8YB+a6CCxqif3hD3/wOVaUtkBoUUQUa9G7v5U/8As1bI5jMXVNEcgDAQmsPEDVKUVABH4kUOLqOTVfucDKnOA6vNQ1qHaJ3JlGC57LXRsfEuWHDh2alX9FfailS5fa6tWrfYPqqHcLsXb66ad7kYbgaqgG1bUVWNGGzXtcOPT555/3/R9h0XTodbbxbx5Rw+bMN4a+F4ECJiCBVcCLp6GLQCESoEF154WfWJsFs2zHGtegOpLoznzYWYhQuvHGG230LbdUu7uQKuc0qKa8AV6hqHerpQs9nnnmmT6USHX5fFltBBYJ7B988IEf53bXI/KZZ57x9cLYSXlszF22VQ2b87VMOq8IxEZAAis29LqwCIgADapbuQbVXb+Y+UOD6u9rP0XJUMZhyJAhNs6FEnlEgEUN7xZiC+8WeU3kOAXDm4V3q3v37j4kmcsG1TUVWPPnz7fPP//ciysaNk+ePNnYPekbNv/sP9uu/kPCcPUoAiKQIgISWClaTE1FBAqdQONvNtiZrqL8Ka6y/PY1X1ZJdGdu7Czs27evb99DG58uXbpkTRmv1pIlS2zTpk1VGlTjLcK7FRpUI7zqYzURWB9++KEvScF1lrgQ58svv+wv2eyU1rbtEdewudtP6zMEvVYERCDBBCSwErw4GpoIFDOBkm8PWuulc+0stzNx/9KFtnfXziwchAKHXXGFjRs3zi519bfIx4oa4UPE1po1a4ySENFQYmhQjXeLEhIIsNrYyQTWG67swpYtW/w1Z378sf0xNGzueIZr2Ox2CrZXw+ba8NZzRaDQCEhgFdqKabwiUKQEGm9YZ2e5RPnmiz+zHevWVAkFgoTCpP379bNRzrM1auRI3/8wExXV5CkFsXnzZr+zMSq4KIoavFtt27bNfGnW98cTWIQs2SlIXS++fvvtt22eCxNivmHzI7+2oy1PyTqffiACIpAuAhJY6VpPzUYEioJA6cH91mbJ5z6cuGfZItvvGkxn2tlnn23Dhw/3Daovuugiy8y/2u/a/pC7RYNq+v9FxVZoUN2jRw9fLDXz3HxfncCKNmw+cOCATZkyxdb9UEy0+cVDbP3dNGxuXN3p9DMREIGUEZDAStmCajoiUGwEfIPqr1e7RPkZ1mTx57a9/KsqYgke5F4NGDDA70q84YYbrF27dlmY2OlHX0B2KGY2qMa7FRpU0+waiwqsc845x+bMmeMT7RFqu1z/RXYKknSPNbphnG2+5R7/tf4RAREoDgISWMWxzpqlCBQNgdJ9e+w0lyTfedGntnv5Yjuwr2oLHnKtqAh/Fd6tCRPswgsvzGJDeG/hwoW+QfUe5x2LerfwhJFsj+Gl4vvozsVtrkDqb3/7W59gX+pywg7d8bBVDL4u6xr6gQiIQLoJSGCle301OxEoagK+QfW6ldbN7Uwscd6tHevLs3jgnbp44EAbM2aMXXfddb7hdOaTVq1a5XcDbnVFUqPerfA8QoqdOnXyz/m///qvXnA1cTlhux78he07v394mh5FQASKiIAEVhEttqYqAsVOoHT3Tmu/ZI5r4/OJ7VyxxL51Hqio4d3q4XYVXnPttX5nYm/Xzqc627dvn9Hqhp6IIWT4i1/8wia5sCDW/LR2tvnRJ1zD5q7VvVw/EwERKAICElhFsMiaogiIQDaBEleQtOna5VY2/69mi+fZjs0bs57Upk0bGzRokI0dO9ZGONHVqlWrrOcgtH52332+Uju/bHlWmZU/9qQdPVUNm7Ng6QciUEQEJLCKaLE1VREQgeMTaLRrh3VY+Km1X/Cp7Vi5zA67KvNRo8ZWz549fRiRFj5nd+1qX7kdiI8++qgvIspzW/S5yMr/zjVsbvp9jlb09fpaBESguAhIYBXXemu2IiACNSBQcuSINVu12OVuzbDvlsy3nVu+Oemrmg673jbe5ho217Jg6UlPrCeIgAgUJAEJrIJcNg1aBESgIQk02r7FznDerbaLZlnFlyucd+tQ5eUbu2T2w2Putm3DRlX+TF+IgAiIgASW3gMiIAIiUAsCvqGOCx+yQ9F7q1w48FgtXq+nioAIFAcBlRQujnXWLEVABHJEwIspiaoc0dRpRCC9BErTOzXNTAREQAREQAREQATiISCBFQ93XVUEREAEREAERCDFBCSwUry4mpoIiIAIiIAIiEA8BCSw4uGuq4qACIiACIiACKSYgARWihdXUxMBERABERABEYiHgARWPNx1VREQAREQAREQgRQTkMBK8eJqaiIgAiIgAiIgAvEQkMCKh7uuKgIiIAIiIAIikGICElgpXlxNTQREQAREQAREIB4CEljxcNdVRUAEREAEREAEUkxAAivFi6upiYAIiIAIiIAIxENAAise7rqqCIiACIiACIhAiglIYKV4cTU1ERABERABERCBeAhIYMXDXVcVAREQAREQARFIMQEJrBQvrqYmAiIgAiIgAiIQDwEJrHi466oiIAIiIAIiIAIpJiCBleLF1dREQAREQAREQATiISCBFQ93XVUEREAEREAERCDFBCSwUry4mpoIiIAIiIAIiEA8BCSw4uGuq4qACIiACIiACKSYgARWihdXUxMBERABERABEYiHgARWPNx1VREQAREQAREQgRQTkMBK8eJqaiIgAiIgAiIgAvEQkMCKh7uuKgIiIAIiIAIikGICElgpXlxNTQREQAREQAREIB4CEljxcNdVRUAEREAEREAEUkxAAivFi6upiYAIiIAIiIAIxENAAise7rqqCIiACIiACIhAiglIYKV4cTU1ERABERABERCBeAhIYMXDXVcVAREQAREQARFIMQEJrBQvrqYmAiIgAiIgAiIQDwEJrHi466oiIAIiIAIiIAIpJiCBleLF1dREQAREQAREQATiISCBFQ93XVUEREAEREAERCDFBCSwUry4mpoIiIAIiIAIiEA8BCSw4uGuq4qACIiACIiACKSYgARWihdXUxMBERABERABEYiHgARWPNx1VREQAREQAREQgRQTkMBK8eJqaiIgAiIgAiIgAvEQkMCKh7uuKgIiIAIiIAIikGICElgpXlxNTQREQAREQAREIB4CEljxcNdVRUAEREAEREAEUkxAAivFi6upiYAIiIAIiIAIxENAAise7rqqCIiACIiACIhAiglIYKV4cTU1ERABERABERCBeAhIYMXDXVcVAREQAREQARFIMQEJrBQvrqYmAiIgAiIgAiIQDwEJrHi466oiIAIiIAIiIAIpJiCBleLF1dREQAREQAREQATiISCBFQ93XVUEREAEREAERCDFBCSwUry4mpoIiIAIiIAIiEA8BCSw4uGuq4qACIiACIiACKSYgARWihdXUxMBERABERABEYiHgARWPNx1VREQAREQAREQgRQTkMBK8eJqaiIgAiIgAiIgAvEQ+P82lQKszPphfAAAAABJRU5ErkJggg==";
var imageCubeL = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPmN1YmVfbDwvdGl0bGU+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtQ29weS0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjAwMDAwMCwgMTUuMDAwMDAwKSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik05Ny45NjE3NDQ0LDEwLjQ4MTI2MjIgTDczLjA3Mzc0NDQsNi42MjA2MzcyMiBDNzIuODE4NzQ0NCw2LjIzNDM4NzIyIDcyLjQyMjA3NzgsNS45MzYyNjIyMiA3MS45MDI2MzMzLDUuODI5Mzg3MjIgTDY3LjY4MDk2NjcsNS4xMjgxMzcyMiBDNjcuMTI5NDExMSw1LjAyMzEzNzIyIDY2LjU1MzMsNS4xNjc1MTIyMiA2NS45NjAxODg5LDUuNDAwMDEyMjIgTDU1LjU4NDUyMjIsMy42MjA2MzcyMiBDNTUuMzk5NDExMSwzLjE4NTYzNzIyIDU1LjEyNTUyMjIsMi44MjM3NjIyMiA1NC41NTEzLDIuNzE4NzYyMjIgTDUwLjQ5MDE4ODksMS45NjY4ODcyMiBDNDkuNzMyNzQ0NCwxLjgxMTI2MjIyIDQ4Ljk0NTA3NzgsMS45MTgxMzcyMiA0OC40Mzg4NTU2LDIuMzk0Mzg3MjIgTDM3LjM2ODA3NzgsMC4wOTkzODcyMjM2IEMzNS4xOTU4NTU2LC0wLjI2NjIzNzc3NiAzMi43OTY5NjY3LDAuNDI5Mzg3MjI0IDMxLjgwMzQxMTEsMS45NjUwMTIyMiBMMS41NTA5NjY2NywzNy4zOTEyNjIyIEMwLjY1OTQxMTExMSwzOC42OTYyNjIyIDAuMzM0NTIyMjIyLDQwLjYxNjI2MjIgMC4zMDk5NjY2NjcsNDIuMjkyNTEyMiBMMS42NzE4NTU1Niw3My42MTI1MTIyIEMxLjY5NjQxMTExLDc1LjE2MTI2MjIgMi43MzE1MjIyMiw3Ni41NzY4ODcyIDQuNDYzNjMzMzMsNzYuOTAzMTM3MiBMNzEuODc5OTY2Nyw4OS4zMzgxMzcyIEM3My45Mzg4NTU2LDg5Ljc2NzUxMjIgNzYuMTk5ODU1Niw4OC45NDA2MzcyIDc3LjExMjE4ODksODcuMzYzNzYyMiBMOTguMDI3ODU1Niw1My4wMjg3NjIyIEM5OC44MDYwNzc4LDUxLjU4MTI2MjIgOTkuMjEwMyw0OS44ODYyNjIyIDk5LjI0MDUyMjIsNDguMTIzNzYyMiBMMTAxLjI3Mjk2NywxNC4zNTg3NjIyIEMxMDEuMjQ0NjMzLDEyLjYzMzc2MjIgMTAwLjAwMTc0NCwxMC44NjM3NjIyIDk3Ljk2MTc0NDQsMTAuNDgxMjYyMiIgaWQ9IkZpbGwtNjI5IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02Ny4wNDM4NDQ0LDMyLjQyNDc2MjIgQzY2LjcyNDYyMjIsMzIuODgwMzg3MiA2Ni42Mzk2MjIyLDMzLjU1NTM4NzIgNjYuNjM5NjIyMiwzNC4wMzE2MzcyIEw2Ni42Mzk2MjIyLDM1LjYwMTAxMjIgQzY2LjY3NTUxMTEsMzYuMTUwMzg3MiA2Ny42NDgyODg5LDM2LjY1NDc2MjIgNjguNTQxNzMzMywzNi43NjUzODcyIEw3NC42MjM5NTU2LDM3LjkwMzUxMjIgQzc1LjczMDg0NDQsMzguMTU4NTEyMiA3Ni45NDE2MjIyLDM3LjcyMTYzNzIgNzcuNjA0NjIyMiwzNi42NjAzODcyIEw3OS40ODAyODg5LDMzLjcwMzUxMjIgQzgwLjQzNjA2NjcsMzIuMDk0NzYyMiA3Ny42MDQ2MjIyLDMwLjgxNzg4NzIgNzguNTI0NTExMSwyOS4zOTI4ODcyIEw4MC45MDY0LDI3LjQ1MjI2MjIgQzgxLjY3ODk1NTYsMjYuMzIxNjM3MiA4NC42OTM2MjIyLDI3LjIzMTAxMjIgODUuNDMyMTc3OCwyNi4wNjI4ODcyIEw4NS44NzIyODg5LDI1LjMzMzUxMjIgQzg2LjE2NTA2NjcsMjQuNzg0MTM3MiA4Ni42NDY3MzMzLDIzLjkwODUxMjIgODYuNjQ2NzMzMywyMy40MzIyNjIyIEw4Ni42NDY3MzMzLDIxLjgyNzI2MjIgQzg2LjY0NjczMzMsMjEuMjA0NzYyMiA4Ni4wOTUxNzc4LDIwLjUxMTAxMjIgODUuMzIyNjIyMiwyMC4zMzQ3NjIyIEM4NS42ODkwNjY3LDIxLjA2MDM4NzIgODUuNjE1NCwyMS43ODk3NjIyIDg1LjE3NTI4ODksMjIuNjMxNjM3MiBMODQuNzMzMjg4OSwyMy4zNjEwMTIyIEM4My45OTY2MjIyLDI0LjUyOTEzNzIgODEuMzEwNjIyMiwyMy41ODAzODcyIDgwLjUzODA2NjcsMjQuNzExMDEyMiBMNzcuMTk2NjIyMiwyOC4wODAzODcyIEM3Ni4yODA1MTExLDI5LjUwMzUxMjIgNzguNzQ1NTExMSwzMC43NDI4ODcyIDc3Ljc4NTk1NTYsMzIuMzUxNjM3MiBMNzYuMjgwNTExMSwzNC42MTQ3NjIyIEM3Ni4wMjU1MTExLDM1LjA1NTM4NzIgNzUuMjQ5MTc3OCwzNS4xOTk3NjIyIDc0LjYyMzk1NTYsMzUuMDU1Mzg3MiBMNjguNTQxNzMzMywzMy45MTcyNjIyIEM2Ny44OTAwNjY3LDMzLjg0Nzg4NzIgNjYuOTM0Mjg4OSwzMy40NDY2MzcyIDY3LjA0Mzg0NDQsMzIuNDI0NzYyMiIgaWQ9IkZpbGwtNjMxIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC4zODgwNDQ0LDIyLjM0ODUxMjIgQzE0LjAzODYsMjIuNzg5MTM3MiAxMy45MTc3MTExLDIzLjQ1NjYzNzIgMTMuODkzMTU1NiwyMy45MjkxMzcyIEwxMy44MDgxNTU2LDI1LjQ4OTEzNzIgQzEzLjgxNTcxMTEsMjYuMDM0NzYyMiAxNC43Njk2LDI2LjU2NzI2MjIgMTUuNjU5MjY2NywyNi43MTM1MTIyIEwyMS43MTMxNTU2LDI4LjA2NzI2MjIgQzIyLjgxMDYsMjguMzYxNjM3MiAyNC4wNTUzNzc4LDI3Ljk3MzUxMjIgMjQuNzc4ODIyMiwyNi45NDYwMTIyIEwyNy4wMDc3MTExLDI0LjI1NzI2MjIgQzI4LjA1NjA0NDQsMjIuNjk3MjYyMiAyNS44MTAxNTU2LDIxLjQ3NjYzNzIgMjYuODEzMTU1NiwyMC4wOTQ3NjIyIEwyOC42MDAwNDQ0LDE4LjA2Nzg4NzIgQzI5LjQzODcxMTEsMTYuOTcxMDEyMiAzMi41NDIxNTU2LDE3LjkzNDc2MjIgMzMuMzQ2ODIyMiwxNi44MDIyNjIyIEwzMy44ODEzNzc4LDE2LjEzMjg4NzIgQzM0LjIwODE1NTYsMTUuNTk4NTEyMiAzNC44MzE0ODg5LDE0Ljg5MzUxMjIgMzQuODU3OTMzMywxNC40MjEwMTIyIEwzNC45NDQ4MjIyLDEyLjgyNzI2MjIgQzM0Ljk3NjkzMzMsMTIuMjEwMzg3MiAzNC4zMTIwNDQ0LDExLjMxNzg4NzIgMzMuNTQ1MTU1NiwxMS4xMTM1MTIyIEMzMy44NzU3MTExLDExLjg0NjYzNzIgMzQuMDA3OTMzMywxMi41MTQxMzcyIDMzLjUxNjgyMjIsMTMuMzMxNjM3MiBMMzIuNzg3NzExMSwxNC4wOTQ3NjIyIEMzMS45ODY4MjIyLDE1LjIyOTEzNzIgMjkuMjE3NzExMSwxNC4yMzkxMzcyIDI4LjM4MDkzMzMsMTUuMzM2MDEyMiBMMjUuNTUxMzc3OCwxOC43NDEwMTIyIEMyNC41NTAyNjY3LDIwLjEyMjg4NzIgMjYuNDI1OTMzMywyMS4yOTI4ODcyIDI1LjM3NzYsMjIuODUyODg3MiBMMjMuNTU2NzExMSwyNC44NjQ3NjIyIEMyMy4yNzMzNzc4LDI1LjI5MDM4NzIgMjIuNDg5NDg4OSwyNS40MDY2MzcyIDIxLjg2ODA0NDQsMjUuMjM5NzYyMiBMMTUuODE0MTU1NiwyMy44ODYwMTIyIEMxNS4xNjA2LDIzLjc5MjI2MjIgMTQuMjIxODIyMiwyMy4zNjEwMTIyIDE0LjM4ODA0NDQsMjIuMzQ4NTEyMiIgaWQ9IkZpbGwtNjMyIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4yNDIsMzkuMDIyMzI0NyBMMjQuMjQyLDQwLjU4NjA3NDcgQzI0LjI1MTQ0NDQsNDEuMjYxMDc0NyAyNS40NTA4ODg5LDQxLjY4MTA3NDcgMjYuNDA2NjY2Nyw0MS43OTU0NDk3IEwyOS4zODE2NjY3LDQyLjM0MTA3NDcgQzMxLjA0OTU1NTYsNDIuNjg5ODI0NyAzMi45MzI3Nzc4LDQxLjA5Nzk0OTcgMzMuODQ4ODg4OSw0MC45MDEwNzQ3IEMzNC40MDYxMTExLDQwLjc3OTE5OTcgMzUuMTkzNzc3OCwzOS42MDczMjQ3IDM1LjMwOSwzOC4zNzU0NDk3IEwzNS41Mzc1NTU2LDM2LjA0NDgyNDcgQzM1LjU0NTExMTEsMzUuNjI2Njk5NyAzNS4wNjkxMTExLDM1LjgyNTQ0OTcgMzQuOTMzMTExMSwzNi4wMDkxOTk3IEwzMy44NTA3Nzc4LDM4LjE5NzMyNDcgQzMyLjM3MTc3NzgsMzguNjMwNDQ5NyAzMS4wNDk1NTU2LDM5Ljk4OTgyNDcgMjkuMzgxNjY2NywzOS42NDI5NDk3IEwyNi40MDY2NjY3LDM5LjA5MTY5OTcgQzI1LjYzOTc3NzgsMzkuMDI3OTQ5NyAyNC4yOTg2NjY3LDM4LjE4MDQ0OTcgMjQuMjQyLDM5LjAyMjMyNDciIGlkPSJGaWxsLTYzMyIgZmlsbD0iI0JFQjVBQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNDEuNTEwMjIyMiwzOS44MTMxOTk3IEM0Mi4zMTY3Nzc4LDQwLjc1ODE5OTcgNDIuNzY4MjIyMiw0Mi4xNDAwNzQ3IDQ0LjI2NjExMTEsNDIuNDExOTQ5NyBMNDcuNjY0MjIyMiw0My4wMTU2OTk3IEM0OC4zMDI2NjY3LDQzLjEyNjMyNDcgNDkuMDI4LDQyLjkyMTk0OTcgNDkuMjUyNzc3OCw0Mi40NjYzMjQ3IEw1Mi4xMDUsMzguMDAzODI0NyBDNTIuMjQ0Nzc3OCwzNy44MTYzMjQ3IDUyLjczMDIyMjIsMzcuNjExOTQ5NyA1Mi43MjA3Nzc4LDM4LjA0MTMyNDcgTDUyLjcyMDc3NzgsMzkuODE2OTQ5NyBDNTIuNzEzMjIyMiw0MC4yODM4MjQ3IDUyLjMxMDg4ODksNDEuMzA5NDQ5NyA1MS44MTAzMzMzLDQyLjAzMTMyNDcgTDUwLjA5MzMzMzMsNDQuODM4MTk5NyBDNDkuNjM4MTExMSw0NS42MjE5NDk3IDQ4LjcyNTc3NzgsNDUuOTIwMDc0NyA0Ny42NjQyMjIyLDQ1LjcxMzgyNDcgTDQ0LjI2NjExMTEsNDUuMTExOTQ5NyBDNDIuNzY2MzMzMyw0NC44NDE5NDk3IDQyLjMxNDg4ODksNDMuNDU0NDQ5NyA0MS41MDY0NDQ0LDQyLjUwOTQ0OTcgTDQxLjUxMDIyMjIsMzkuODEzMTk5NyBaIiBpZD0iRmlsbC02MzQiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ1LjAyMTI4ODksOC41NTM5NDk3MiBMNDUuMDIxMjg4OSwxMC4wODk1NzQ3IEM0NS4wMzA3MzMzLDEwLjc1MTQ0OTcgNDYuMjExMjg4OSwxMS4xNjU4MjQ3IDQ3LjE0ODE3NzgsMTEuMjc0NTc0NyBMNTAuMDcyMTc3OCwxMS44MTQ1NzQ3IEM1Mi4xODU4NDQ0LDEyLjI1NzA3NDcgNTMuNzMyODQ0NCw5LjkxMzMyNDcyIDU1Ljc2MzQsMTAuMzIwMTk5NyBMNjAuNTk4OTU1NiwxMS4xMzIwNzQ3IEM2Mi41OTE3MzMzLDExLjQ4NDU3NDcgNjIuNTcwOTU1NiwxNC4xNTI2OTk3IDY0LjY5NTk1NTYsMTQuNTM4OTQ5NyBMNjguMDMzNjIyMiwxNS4xMzE0NDk3IEM2OS4wODAwNjY3LDE1LjMzMDE5OTcgNjkuOTczNTExMSwxNS4wMzU4MjQ3IDcwLjQyNjg0NDQsMTQuMjY4OTQ5NyBMNzIuMTA5ODQ0NCwxMS41MDg5NDk3IEM3Mi42MDI4NDQ0LDEwLjc5ODMyNDcgNzIuOTk3NjIyMiw5Ljc5MzMyNDcyIDczLjAwNTE3NzgsOS4zMzIwNzQ3MiBMNzMuMDA1MTc3OCw3LjU4NjQ0OTcyIEM3My4wMTI3MzMzLDcuMTY4MzI0NzIgNzIuNTM2NzMzMyw3LjM2NzA3NDcyIDcyLjQwMDczMzMsNy41NTA4MjQ3MiBMNjkuNTk1NzMzMywxMS45MzQ1NzQ3IEM2OS4zNzQ3MzMzLDEyLjM4MjY5OTcgNjguNjY2NCwxMi41ODUxOTk3IDY4LjAzMzYyMjIsMTIuNDc2NDQ5NyBMNjQuNjk1OTU1NiwxMS44ODIwNzQ3IEM2Mi41NzA5NTU2LDExLjQ5NTgyNDcgNjIuNTkxNzMzMyw4LjgyOTU3NDcyIDYwLjU5ODk1NTYsOC40Nzg5NDk3MiBMNTUuNzYzNCw3LjY2NTE5OTcyIEM1My43MzI4NDQ0LDcuMjU2NDQ5NzIgNTIuMTg1ODQ0NCw5LjYwMjA3NDcyIDUwLjA3MjE3NzgsOS4xNTk1NzQ3MiBMNDcuMTQ4MTc3OCw4LjYyMTQ0OTcyIEM0Ni4zOTQ1MTExLDguNTU1ODI0NzIgNDUuMDc0MTc3OCw3LjcyNzA3NDcyIDQ1LjAyMTI4ODksOC41NTM5NDk3MiIgaWQ9IkZpbGwtNjM1IiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03Ni4xMzQ4Nzc4LDg3LjM1OTI2MjIgTDk3LjcxNzMyMjIsNTMuMDIyMzg3MiBDOTguNDk1NTQ0NCw1MS41Nzg2MzcyIDk4Ljg5OTc2NjcsNDkuODgzNjM3MiA5OC45Mjk5ODg5LDQ4LjEyMTEzNzIgTDEwMC45NjQzMjIsMTQuMzU0MjYyMiBDMTAwLjk2MDU0NCwxMy4yOTY3NjIyIDEwMC40OTIxLDEyLjYzMzAxMjIgOTkuOTM0ODc3OCwxMy4zMzIzODcyIEw3Mi41NTkyMTExLDUxLjM5Njc2MjIgQzcxLjgzMDEsNTIuNTk4NjM3MiA3MS4zOTc1NDQ0LDUzLjA5NTUxMjIgNzEuNDE2NDMzMyw1NC41MjQyNjIyIEw3MS40MTY0MzMzLDg2LjMxNDg4NzIgQzcxLjQzMzQzMzMsODguNzU4MDEyMiA3NC44MTY0MzMzLDg5LjYxMzAxMjIgNzYuMTM0ODc3OCw4Ny4zNTkyNjIyIiBpZD0iRmlsbC02MzYiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTg2LjY0NjU0NDQsMjMuNDM0MTM3MiBMODYuNjQ2NTQ0NCwyMS44MjcyNjIyIEM4Ni42NDY1NDQ0LDIxLjIwNjYzNzIgODYuMDk0OTg4OSwyMC41MTI4ODcyIDg1LjMyMjQzMzMsMjAuMzM0NzYyMiBMNzguMDcyODc3OCwxOS4wODc4ODcyIEM3Ny4zMzYyMTExLDE4Ljk3OTEzNzIgNzYuNDg5OTg4OSwxOS4yNzE2MzcyIDc2LjE5NTMyMjIsMTkuNzgzNTEyMiBMNzUuMDU2MzIyMiwyMS41NzAzODcyIEM3My45MTU0MzMzLDIzLjI4OTc2MjIgNzcuMTg1MSwyNC40NjE2MzcyIDc2LjQxNjMyMjIsMjUuNzM0NzYyMiBMNzMuODU0OTg4OSwyOC41ODEwMTIyIEM3My4wODI0MzMzLDI5Ljg1OTc2MjIgNjkuNDQyNTQ0NCwyOC44ODEwMTIyIDY4LjcwNTg3NzgsMzAuMDg4NTEyMiBMNjcuMDQzNjU1NiwzMi40MjY2MzcyIEM2Ni43MjI1NDQ0LDMyLjg4MDM4NzIgNjYuNjM3NTQ0NCwzMy41NTcyNjIyIDY2LjYzNzU0NDQsMzQuMDMxNjM3MiBMNjYuNjM3NTQ0NCwzNS42MDI4ODcyIiBpZD0iU3Ryb2tlLTYzNyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTY4LjU0MDk3NzgsMzYuNzY2ODg3MiBMNzQuNjIzMiwzNy45MDMxMzcyIiBpZD0iU3Ryb2tlLTYzOCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03Ny42MDQ2MjIyLDM2LjY2MTY5OTcgTDc5LjQ4MDI4ODksMzMuNzAxMDc0NyBDODAuNDM3OTU1NiwzMi4wOTYwNzQ3IDc3LjYwNDYyMjIsMzAuODE3MzI0NyA3OC41MjQ1MTExLDI5LjM5NDE5OTcgTDgwLjkwNjQsMjcuNDUzNTc0NyBDODEuNjc4OTU1NiwyNi4zMTkxOTk3IDg0LjY5NTUxMTEsMjcuMjMyMzI0NyA4NS40MzIxNzc4LDI2LjA2NDE5OTcgTDg1Ljg3NDE3NzgsMjUuMzMyOTQ5NyIgaWQ9IlN0cm9rZS02MzkiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMzQuODY2ODExMSwxNC40MzA1NzQ3IEwzNC45NTc0Nzc4LDEyLjgzODY5OTcgQzM0Ljk5MzM2NjcsMTIuMjI1NTc0NyAzNC4zMjQ3LDExLjMzMTE5OTcgMzMuNTU3ODExMSwxMS4xMjg2OTk3IEwyNi40MjM0Nzc4LDkuNTQ2MTk5NzIgQzI1LjY4ODcsOS40MTExOTk3MiAyNC44MTk4MTExLDkuNjY2MTk5NzIgMjQuNDkzMDMzMywxMC4xNjMwNzQ3IEwyMi45ODAwMzMzLDExLjgyNDMyNDcgQzIxLjczMzM2NjcsMTMuNDgxODI0NyAyNC44MjkyNTU2LDE0Ljc3NzQ0OTcgMjMuOTg0OTIyMiwxNi4wMDc0NDk3IEwyMS40NzI3LDE4LjgwMTE5OTcgQzIwLjYyNDU4ODksMjAuMDM2ODI0NyAxNi43NjU1ODg5LDE4Ljg4OTMyNDcgMTUuOTU1MjU1NiwyMC4wNTM2OTk3IEwxNC4zNDIxNDQ0LDIyLjMxMzA3NDcgQzEzLjk5MDgxMTEsMjIuNzU1NTc0NyAxMy44Njk5MjIyLDIzLjQxOTMyNDcgMTMuODQzNDc3OCwyMy44ODgwNzQ3IEwxMy43NTY1ODg5LDI1LjQ0NDMyNDciIGlkPSJTdHJva2UtNjQwIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC45NDUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuNjA3MzIyMiwyNi42NjkyNjIyIEwyMS42NzQ0MzMzLDI4LjAzMDUxMjIiIGlkPSJTdHJva2UtNjQxIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS40MTc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI0Ljc0NTk1NTYsMjYuOTEzMTk5NyBMMjYuOTgyNCwyNC4yMzU2OTk3IEMyOC4wMzY0LDIyLjY3OTQ0OTcgMjUuNzg2NzMzMywyMS40NTUwNzQ3IDI2Ljc5NTQsMjAuMDgwNjk5NyBMMjguNTkxNzMzMywxOC4wNjEzMjQ3IEMyOS40MzQxNzc4LDE2Ljk3MDA3NDcgMzIuNTM5NTExMSwxNy45MzU2OTk3IDMzLjM0NjA2NjcsMTYuODA1MDc0NyBMMzMuODg2Mjg4OSwxNi4xMzU2OTk3IiBpZD0iU3Ryb2tlLTY0MiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4yNDIsNDAuNTg2MDc0NyBMMjQuMjQyLDM5LjAyMjMyNDcgQzI0LjI0MiwzOC4yODkxOTk3IDI0LjMzNjQ0NDQsMzcuNDM0MTk5NyAyNC43NjksMzYuNzk2Njk5NyBMMjcuMjMyMTExMSwzMy4wNDI5NDk3IEMyNy43MDA1NTU2LDMyLjMyMjk0OTcgMjguNjQ4Nzc3OCwzMi4xNDEwNzQ3IDI5LjU0NiwzMi4zMjg1NzQ3IEwzMy42NTgxMTExLDMzLjA5MTY5OTcgQzM0LjY5ODg4ODksMzMuMjgyOTQ5NyAzNC45OTkyMjIyLDM0LjYwODU3NDcgMzUuMDg4LDM1LjA5NjA3NDcgQzM1LjE3Njc3NzgsMzUuNTgxNjk5NyAzMy45NzU0NDQ0LDM4LjAyMTA3NDcgMzMuOTc1NDQ0NCwzOC4wMjEwNzQ3IiBpZD0iU3Ryb2tlLTY0MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTUyLjcyMjg1NTYsMzkuODE2NzYyMiBMNTIuNzIyODU1NiwzOC4wMzkyNjIyIEM1Mi42OTgzLDM3LjIxMDUxMjIgNTIuMTUwNTIyMiwzNi40Mjg2MzcyIDUxLjIxOTMsMzYuMjM5MjYyMiBMNDYuOTQ2NjMzMywzNS41MzA1MTIyIEM0NS43MDk0MTExLDM1LjI4ODYzNzIgNDQuMzM2MTg4OSwzNi4zMDMwMTIyIDQyLjk1MTYzMzMsMzYuNzczNjM3MiBMNDEuNTA2NjMzMywzOS4zNDk4ODcyIiBpZD0iU3Ryb2tlLTY0NCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTUwLjA5NjU0NDQsNDQuODM5MzI0NyBMNTEuODA5NzY2Nyw0Mi4wMzA1NzQ3IiBpZD0iU3Ryb2tlLTY0NSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03My4wNzY3NjY3LDkuODY5MDc0NzIgTDczLjA3Njc2NjcsOC4xMTQwNzQ3MiBDNzMuMDU0MSw3LjI5MjgyNDcyIDcyLjUxMzg3NzgsNi41MTg0NDk3MiA3MS41OTAyMTExLDYuMzMwOTQ5NzIgTDY3LjM2ODU0NDQsNS42MzE1NzQ3MiBDNjUuNjcyMzIyMiw1LjMwMzQ0OTcyIDYzLjcxMzU0NDQsNy4zNjQwNzQ3MiA2MS44Mjg0MzMzLDcuMDU4NDQ5NzIgTDU2LjczNDEsNi4xNjc4MjQ3MiBDNTUuMDgzMjExMSw1LjkxMDk0OTcyIDU1Ljg4NTk4ODksMy41MjQwNzQ3MiA1NC4yNDA3NjY3LDMuMjIyMTk5NzIgTDUwLjE3Nzc2NjcsMi40NzAzMjQ3MiBDNDkuMjkxODc3OCwyLjI4NDY5OTcyIDQ4LjM1Njg3NzgsMi40NjI4MjQ3MiA0Ny44OTIyMTExLDMuMTc1MzI0NzIgTDQ1LjQ1NTU0NDQsNi44ODQwNzQ3MiBDNDUuMDMyNDMzMyw3LjUxNTk0OTcyIDQ0LjkzNzk4ODksOC4zNTU5NDk3MiA0NC45Mzc5ODg5LDkuMDgzNDQ5NzIgTDQ0LjkzNzk4ODksMTAuNjI4NDQ5NyIgaWQ9IlN0cm9rZS02NDYiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ3LjA3NzM0NDQsMTEuMzE1MjYyMiBMNTAuMDE4MzQ0NCwxMS44NTcxMzcyIEM1Mi4xMzk1NjY3LDEyLjMwMTUxMjIgNTMuNjk0MTIyMiw5Ljk0Mjc2MjIyIDU1Ljc0MzU2NjcsMTAuMzUzMzg3MiBMNjAuNTk5OSwxMS4xNzA4ODcyIEM2Mi42MDU5LDExLjUyMzM4NzIgNjIuNTg1MTIyMiwxNC4yMDY1MTIyIDY0LjcyMzM0NDQsMTQuNTk0NjM3MiBMNjguMDc5OSwxNS4xOTA4ODcyIiBpZD0iU3Ryb2tlLTY0NyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03MC40ODIzNzc4LDE0LjgzMjE5OTcgTDcyLjE3NjcxMTEsMTIuMDU3MTk5NyIgaWQ9IlN0cm9rZS02NDgiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOTcuNjUxNzc3OCwxMC40Nzc1MTIyIEw3Mi43NjM3Nzc4LDYuNjE2ODg3MjIgQzcyLjUwODc3NzgsNi4yMzA2MzcyMiA3Mi4xMTIxMTExLDUuOTMyNTEyMjIgNzEuNTkyNjY2Nyw1LjgyNTYzNzIyIEw2Ny4zNzEsNS4xMjQzODcyMiBDNjYuODE5NDQ0NCw1LjAxOTM4NzIyIDY2LjI0MzMzMzMsNS4xNjM3NjIyMiA2NS42NTAyMjIyLDUuMzk2MjYyMjIgTDU1LjI3NDU1NTYsMy42MTY4ODcyMiBDNTUuMDg5NDQ0NCwzLjE4MTg4NzIyIDU0LjgxNTU1NTYsMi44MjAwMTIyMiA1NC4yNDEzMzMzLDIuNzE1MDEyMjIgTDUwLjE4MDIyMjIsMS45NjMxMzcyMiBDNDkuNDIyNzc3OCwxLjgwNzUxMjIyIDQ4LjYzNTExMTEsMS45MTQzODcyMiA0OC4xMjg4ODg5LDIuMzkwNjM3MjIgTDM3LjA1ODExMTEsMC4wOTU2MzcyMjM2IEMzNC44ODU4ODg5LC0wLjI2OTk4Nzc3NiAzMi40ODcsMC40MjU2MzcyMjQgMzEuNDkzNDQ0NCwxLjk2MTI2MjIyIEwxLjI0MSwzNy4zODc1MTIyIEMwLjM0OTQ0NDQ0NCwzOC42OTI1MTIyIDAuMDI0NTU1NTU1Niw0MC42MTI1MTIyIDAsNDIuMjg4NzYyMiBMMS4zNjE4ODg4OSw3My42MDg3NjIyIEMxLjM4NjQ0NDQ0LDc1LjE1NzUxMjIgMi40MjE1NTU1Niw3Ni41NzMxMzcyIDQuMTUzNjY2NjcsNzYuODk5Mzg3MiBMNzEuNTcsODkuMzM0Mzg3MiBDNzMuNjI4ODg4OSw4OS43NjM3NjIyIDc1Ljg4OTg4ODksODguOTM2ODg3MiA3Ni44MDIyMjIyLDg3LjM2MDAxMjIgTDk3LjcxNzg4ODksNTMuMDI1MDEyMiBDOTguNDk2MTExMSw1MS41Nzc1MTIyIDk4LjkwMDMzMzMsNDkuODgyNTEyMiA5OC45MzA1NTU2LDQ4LjEyMDAxMjIgTDEwMC45NjMsMTQuMzU1MDEyMiBDMTAwLjkzMjc3OCwxMi42MzAwMTIyIDk5LjY5MTc3NzgsMTAuODYwMDEyMiA5Ny42NTE3Nzc4LDEwLjQ3NzUxMjIgWiIgaWQ9IlN0cm9rZS02NDkiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIzLjMwNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMC41OTA2NTU1NTYsNDAuMjY4ODI0NyBMNjguMTUwNTQ0NCw1Mi41NTAwNzQ3IEM3MC4zNDM1NDQ0LDUyLjk0OTQ0OTcgNzIuMjg3MjExMSw1Mi4yMjk0NDk3IDczLjIyNzg3NzgsNTAuNzM1MDc0NyBMOTkuNjIzMjExMSwxMy4yMTYzMjQ3IiBpZD0iU3Ryb2tlLTY1MCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMy4xNzQ5MzMzLDQxLjE1NjI2MjIgQzMxLjk1NjYsNDEuNzA5Mzg3MiAzMC43OTMwNDQ0LDQyLjYzNTYzNzIgMjkuMzgyMDQ0NCw0Mi4zNDEyNjIyIEwyNi40MDcwNDQ0LDQxLjc5NTYzNzIiIGlkPSJTdHJva2UtNjUxIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS40MTc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ3LjY2MzI3NzgsNDUuNzA2NTEyMiBMNDQuMjY3MDU1Niw0NS4xMDQ2MzcyIiBpZD0iU3Ryb2tlLTY1MiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00My4xMjg4MTExLDM2LjgwODMyNDcgTDQxLjY1NzM2NjcsMzkuMTQ2NDQ5NyBDNDEuMzM0MzY2NywzOS42MDIwNzQ3IDQxLjI0OTM2NjcsNDAuMjc3MDc0NyA0MS4yNDkzNjY3LDQwLjc1MTQ0OTcgTDQxLjI0OTM2NjcsNDIuMzIyNjk5NyIgaWQ9IlN0cm9rZS02NTMiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjk0NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
var imageExtension2 = "data:image/png;base64,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QiBWCIhgxWo5NRkhIASEgBAQAkIgBAREsEJYBY1BCAgBISAEhIAQiBUCIlixWk5NRggIASEgBISAEAgBARGsEFZBYxACQkAICAEhIARihYAIVqyWU5MRAkJACAgBISAEQkBABCuEVdAYhIAQEAJCQAgIgVghIIIVq+XUZISAEBACQkAICIEQEBDBCmEVNAYhIASEgBAQAkIgVgiIYMVqOTUZISAEhIAQEAJCIAQERLBCWAWNQQgIASEgBISAEIgVAiJYsVpOTUYICAEhIASEgBAIAQERrBBWQWMQAkJACAgBISAEYoWACFasllOTEQJCQAgIASEgBEJAQAQrhFXQGISAEBACQkAICIFYISCCFavl1GSEgBAQAkJACAiBEBAQwQphFTQGISAEhIAQEAJCIFYIiGDFajk1GSEgBISAEBACQiAEBESwQlgFjUEICAEhIASEgBCIFQIiWLFaTk1GCAgBISAEhIAQCAEBEawQVkFjEAJCQAgIASEgBGKFgAhWrJZTkxECQkAICAEhIARCQEAEK4RV0BiEgBAQAkJACAiBWCEgghWr5dRkhIAQEAJCQAgIgRAQEMEKYRU0BiEgBISAEBACQiBWCIhgxWo5NRkhIASEgBAQAkIgBAREsEJYBY1BCAgBISAEhIAQiBUCIlixWk5NRggIASEgBISAEAgBARGsEFZBYxACQkAICAEhIARihYAIVqyWU5MRAkJACAgBISAEQkBABCuEVdAYhIAQEAJCQAgIgVghIIIVq+XUZISAEBACQkAICIEQEBDBCmEVNAYhIASEgBAQAkIgVgiIYMVqOTUZISAEhIAQEAJCIAQERLBCWAWNQQgIASEgBISAEIgVAiJYsVpOTUYICAEhIASEgBAIAQERrBBWQWMQAkJACAgBISAEYoWACFasllOTEQJCQAgIASEgBEJAQAQrhFXQGISAEBACQkAICIFYISCCFavl1GSEgBAQAkJACAiBEBAQwQphFTQGISAEhIAQEAJCIFYIiGDFajk1GSEgBISAEBACQiAEBESwQlgFjUEICAEhIASEgBCIFQIiWLFaTk1GCAgBISAEhIAQCAGB/wQiDk76SwDrsAAAAABJRU5ErkJggg==";
var imageCube2L = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1OCAoODQ2NjMpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPmN1YmUyX2w8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtQ29weS01IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDAwMCwgMTUuMDAwMDAwKSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik05Ny45NjE3NDQ0LDEwLjQ4MTI2MjIgTDczLjA3Mzc0NDQsNi42MjA2MzcyMiBDNzIuODE4NzQ0NCw2LjIzNDM4NzIyIDcyLjQyMjA3NzgsNS45MzYyNjIyMiA3MS45MDI2MzMzLDUuODI5Mzg3MjIgTDY3LjY4MDk2NjcsNS4xMjgxMzcyMiBDNjcuMTI5NDExMSw1LjAyMzEzNzIyIDY2LjU1MzMsNS4xNjc1MTIyMiA2NS45NjAxODg5LDUuNDAwMDEyMjIgTDU1LjU4NDUyMjIsMy42MjA2MzcyMiBDNTUuMzk5NDExMSwzLjE4NTYzNzIyIDU1LjEyNTUyMjIsMi44MjM3NjIyMiA1NC41NTEzLDIuNzE4NzYyMjIgTDUwLjQ5MDE4ODksMS45NjY4ODcyMiBDNDkuNzMyNzQ0NCwxLjgxMTI2MjIyIDQ4Ljk0NTA3NzgsMS45MTgxMzcyMiA0OC40Mzg4NTU2LDIuMzk0Mzg3MjIgTDM3LjM2ODA3NzgsMC4wOTkzODcyMjM2IEMzNS4xOTU4NTU2LC0wLjI2NjIzNzc3NiAzMi43OTY5NjY3LDAuNDI5Mzg3MjI0IDMxLjgwMzQxMTEsMS45NjUwMTIyMiBMMS41NTA5NjY2NywzNy4zOTEyNjIyIEMwLjY1OTQxMTExMSwzOC42OTYyNjIyIDAuMzM0NTIyMjIyLDQwLjYxNjI2MjIgMC4zMDk5NjY2NjcsNDIuMjkyNTEyMiBMMS42NzE4NTU1Niw3My42MTI1MTIyIEMxLjY5NjQxMTExLDc1LjE2MTI2MjIgMi43MzE1MjIyMiw3Ni41NzY4ODcyIDQuNDYzNjMzMzMsNzYuOTAzMTM3MiBMNzEuODc5OTY2Nyw4OS4zMzgxMzcyIEM3My45Mzg4NTU2LDg5Ljc2NzUxMjIgNzYuMTk5ODU1Niw4OC45NDA2MzcyIDc3LjExMjE4ODksODcuMzYzNzYyMiBMOTguMDI3ODU1Niw1My4wMjg3NjIyIEM5OC44MDYwNzc4LDUxLjU4MTI2MjIgOTkuMjEwMyw0OS44ODYyNjIyIDk5LjI0MDUyMjIsNDguMTIzNzYyMiBMMTAxLjI3Mjk2NywxNC4zNTg3NjIyIEMxMDEuMjQ0NjMzLDEyLjYzMzc2MjIgMTAwLjAwMTc0NCwxMC44NjM3NjIyIDk3Ljk2MTc0NDQsMTAuNDgxMjYyMiIgaWQ9IkZpbGwtNjI5IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02Ny4wNDM4NDQ0LDMyLjQyNDc2MjIgQzY2LjcyNDYyMjIsMzIuODgwMzg3MiA2Ni42Mzk2MjIyLDMzLjU1NTM4NzIgNjYuNjM5NjIyMiwzNC4wMzE2MzcyIEw2Ni42Mzk2MjIyLDM1LjYwMTAxMjIgQzY2LjY3NTUxMTEsMzYuMTUwMzg3MiA2Ny42NDgyODg5LDM2LjY1NDc2MjIgNjguNTQxNzMzMywzNi43NjUzODcyIEw3NC42MjM5NTU2LDM3LjkwMzUxMjIgQzc1LjczMDg0NDQsMzguMTU4NTEyMiA3Ni45NDE2MjIyLDM3LjcyMTYzNzIgNzcuNjA0NjIyMiwzNi42NjAzODcyIEw3OS40ODAyODg5LDMzLjcwMzUxMjIgQzgwLjQzNjA2NjcsMzIuMDk0NzYyMiA3Ny42MDQ2MjIyLDMwLjgxNzg4NzIgNzguNTI0NTExMSwyOS4zOTI4ODcyIEw4MC45MDY0LDI3LjQ1MjI2MjIgQzgxLjY3ODk1NTYsMjYuMzIxNjM3MiA4NC42OTM2MjIyLDI3LjIzMTAxMjIgODUuNDMyMTc3OCwyNi4wNjI4ODcyIEw4NS44NzIyODg5LDI1LjMzMzUxMjIgQzg2LjE2NTA2NjcsMjQuNzg0MTM3MiA4Ni42NDY3MzMzLDIzLjkwODUxMjIgODYuNjQ2NzMzMywyMy40MzIyNjIyIEw4Ni42NDY3MzMzLDIxLjgyNzI2MjIgQzg2LjY0NjczMzMsMjEuMjA0NzYyMiA4Ni4wOTUxNzc4LDIwLjUxMTAxMjIgODUuMzIyNjIyMiwyMC4zMzQ3NjIyIEM4NS42ODkwNjY3LDIxLjA2MDM4NzIgODUuNjE1NCwyMS43ODk3NjIyIDg1LjE3NTI4ODksMjIuNjMxNjM3MiBMODQuNzMzMjg4OSwyMy4zNjEwMTIyIEM4My45OTY2MjIyLDI0LjUyOTEzNzIgODEuMzEwNjIyMiwyMy41ODAzODcyIDgwLjUzODA2NjcsMjQuNzExMDEyMiBMNzcuMTk2NjIyMiwyOC4wODAzODcyIEM3Ni4yODA1MTExLDI5LjUwMzUxMjIgNzguNzQ1NTExMSwzMC43NDI4ODcyIDc3Ljc4NTk1NTYsMzIuMzUxNjM3MiBMNzYuMjgwNTExMSwzNC42MTQ3NjIyIEM3Ni4wMjU1MTExLDM1LjA1NTM4NzIgNzUuMjQ5MTc3OCwzNS4xOTk3NjIyIDc0LjYyMzk1NTYsMzUuMDU1Mzg3MiBMNjguNTQxNzMzMywzMy45MTcyNjIyIEM2Ny44OTAwNjY3LDMzLjg0Nzg4NzIgNjYuOTM0Mjg4OSwzMy40NDY2MzcyIDY3LjA0Mzg0NDQsMzIuNDI0NzYyMiIgaWQ9IkZpbGwtNjMxIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC4zODgwNDQ0LDIyLjM0ODUxMjIgQzE0LjAzODYsMjIuNzg5MTM3MiAxMy45MTc3MTExLDIzLjQ1NjYzNzIgMTMuODkzMTU1NiwyMy45MjkxMzcyIEwxMy44MDgxNTU2LDI1LjQ4OTEzNzIgQzEzLjgxNTcxMTEsMjYuMDM0NzYyMiAxNC43Njk2LDI2LjU2NzI2MjIgMTUuNjU5MjY2NywyNi43MTM1MTIyIEwyMS43MTMxNTU2LDI4LjA2NzI2MjIgQzIyLjgxMDYsMjguMzYxNjM3MiAyNC4wNTUzNzc4LDI3Ljk3MzUxMjIgMjQuNzc4ODIyMiwyNi45NDYwMTIyIEwyNy4wMDc3MTExLDI0LjI1NzI2MjIgQzI4LjA1NjA0NDQsMjIuNjk3MjYyMiAyNS44MTAxNTU2LDIxLjQ3NjYzNzIgMjYuODEzMTU1NiwyMC4wOTQ3NjIyIEwyOC42MDAwNDQ0LDE4LjA2Nzg4NzIgQzI5LjQzODcxMTEsMTYuOTcxMDEyMiAzMi41NDIxNTU2LDE3LjkzNDc2MjIgMzMuMzQ2ODIyMiwxNi44MDIyNjIyIEwzMy44ODEzNzc4LDE2LjEzMjg4NzIgQzM0LjIwODE1NTYsMTUuNTk4NTEyMiAzNC44MzE0ODg5LDE0Ljg5MzUxMjIgMzQuODU3OTMzMywxNC40MjEwMTIyIEwzNC45NDQ4MjIyLDEyLjgyNzI2MjIgQzM0Ljk3NjkzMzMsMTIuMjEwMzg3MiAzNC4zMTIwNDQ0LDExLjMxNzg4NzIgMzMuNTQ1MTU1NiwxMS4xMTM1MTIyIEMzMy44NzU3MTExLDExLjg0NjYzNzIgMzQuMDA3OTMzMywxMi41MTQxMzcyIDMzLjUxNjgyMjIsMTMuMzMxNjM3MiBMMzIuNzg3NzExMSwxNC4wOTQ3NjIyIEMzMS45ODY4MjIyLDE1LjIyOTEzNzIgMjkuMjE3NzExMSwxNC4yMzkxMzcyIDI4LjM4MDkzMzMsMTUuMzM2MDEyMiBMMjUuNTUxMzc3OCwxOC43NDEwMTIyIEMyNC41NTAyNjY3LDIwLjEyMjg4NzIgMjYuNDI1OTMzMywyMS4yOTI4ODcyIDI1LjM3NzYsMjIuODUyODg3MiBMMjMuNTU2NzExMSwyNC44NjQ3NjIyIEMyMy4yNzMzNzc4LDI1LjI5MDM4NzIgMjIuNDg5NDg4OSwyNS40MDY2MzcyIDIxLjg2ODA0NDQsMjUuMjM5NzYyMiBMMTUuODE0MTU1NiwyMy44ODYwMTIyIEMxNS4xNjA2LDIzLjc5MjI2MjIgMTQuMjIxODIyMiwyMy4zNjEwMTIyIDE0LjM4ODA0NDQsMjIuMzQ4NTEyMiIgaWQ9IkZpbGwtNjMyIiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4yNDIsMzkuMDIyMzI0NyBMMjQuMjQyLDQwLjU4NjA3NDcgQzI0LjI1MTQ0NDQsNDEuMjYxMDc0NyAyNS40NTA4ODg5LDQxLjY4MTA3NDcgMjYuNDA2NjY2Nyw0MS43OTU0NDk3IEwyOS4zODE2NjY3LDQyLjM0MTA3NDcgQzMxLjA0OTU1NTYsNDIuNjg5ODI0NyAzMi45MzI3Nzc4LDQxLjA5Nzk0OTcgMzMuODQ4ODg4OSw0MC45MDEwNzQ3IEMzNC40MDYxMTExLDQwLjc3OTE5OTcgMzUuMTkzNzc3OCwzOS42MDczMjQ3IDM1LjMwOSwzOC4zNzU0NDk3IEwzNS41Mzc2NDQ1LDM2LjA0NDgyNDcgQzM1LjU0NTExMTEsMzUuNjI2Njk5NyAzNS4wNjkxMTExLDM1LjgyNTQ0OTcgMzQuOTMzMTExMSwzNi4wMDkxOTk3IEwzMy44NTA3Nzc4LDM4LjE5NzMyNDcgQzMyLjM3MTc3NzgsMzguNjMwNDQ5NyAzMS4wNDk1NTU2LDM5Ljk4OTgyNDcgMjkuMzgxNjY2NywzOS42NDI5NDk3IEwyNi40MDY2NjY3LDM5LjA5MTY5OTcgQzI1LjYzOTc3NzgsMzkuMDI3OTQ5NyAyNC4yOTg2NjY3LDM4LjE4MDQ0OTcgMjQuMjQyLDM5LjAyMjMyNDciIGlkPSJGaWxsLTYzMyIgZmlsbD0iI0JFQjVBQSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNDEuNTEwMjIyMiwzOS44MTMxOTk3IEM0Mi4zMTY3Nzc4LDQwLjc1ODE5OTcgNDIuNzY4MjIyMiw0Mi4xNDAwNzQ3IDQ0LjI2NjExMTEsNDIuNDExOTQ5NyBMNDcuNjY0MjIyMiw0My4wMTU2OTk3IEM0OC4zMDI2NjY3LDQzLjEyNjMyNDcgNDkuMDI4LDQyLjkyMTk0OTcgNDkuMjUyNzc3OCw0Mi40NjYzMjQ3IEw1Mi4xMDUsMzguMDAzODI0NyBDNTIuMjQ0Nzc3OCwzNy44MTYzMjQ3IDUyLjczMDIyMjIsMzcuNjExOTQ5NyA1Mi43MjA3Nzc4LDM4LjA0MTMyNDcgTDUyLjcyMDc3NzgsMzkuODE2OTQ5NyBDNTIuNzEzMjIyMiw0MC4yODM4MjQ3IDUyLjMxMDg4ODksNDEuMzA5NDQ5NyA1MS44MTAzMzMzLDQyLjAzMTMyNDcgTDUwLjA5MzMzMzMsNDQuODM4MTk5NyBDNDkuNjM4MTExMSw0NS42MjE5NDk3IDQ4LjcyNTc3NzgsNDUuOTIwMDc0NyA0Ny42NjQyMjIyLDQ1LjcxMzgyNDcgTDQ0LjI2NjExMTEsNDUuMTExOTQ5NyBDNDIuNzY2MzMzMyw0NC44NDE5NDk3IDQyLjMxNDg4ODksNDMuNDU0NDQ5NyA0MS41MDY0NDQ0LDQyLjUwOTQ0OTcgTDQxLjUxMDIyMjIsMzkuODEzMTk5NyBaIiBpZD0iRmlsbC02MzQiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ1LjAyMTI4ODksOC41NTM5NDk3MiBMNDUuMDIxMjg4OSwxMC4wODk1NzQ3IEM0NS4wMzA3MzMzLDEwLjc1MTQ0OTcgNDYuMjExMjg4OSwxMS4xNjU4MjQ3IDQ3LjE0ODE3NzgsMTEuMjc0NTc0NyBMNTAuMDcyMTc3OCwxMS44MTQ1NzQ3IEM1Mi4xODU4NDQ0LDEyLjI1NzA3NDcgNTMuNzMyODQ0NCw5LjkxMzMyNDcyIDU1Ljc2MzQsMTAuMzIwMTk5NyBMNjAuNTk4OTU1NiwxMS4xMzIwNzQ3IEM2Mi41OTE3MzMzLDExLjQ4NDU3NDcgNjIuNTcwOTU1NiwxNC4xNTI2OTk3IDY0LjY5NTk1NTYsMTQuNTM4OTQ5NyBMNjguMDMzNjIyMiwxNS4xMzE0NDk3IEM2OS4wODAwNjY3LDE1LjMzMDE5OTcgNjkuOTczNTExMSwxNS4wMzU4MjQ3IDcwLjQyNjg0NDQsMTQuMjY4OTQ5NyBMNzIuMTA5ODQ0NCwxMS41MDg5NDk3IEM3Mi42MDI4NDQ0LDEwLjc5ODMyNDcgNzIuOTk3NjIyMiw5Ljc5MzMyNDcyIDczLjAwNTI2NjcsOS4zMzIwNzQ3MiBMNzMuMDA1MjY2Nyw3LjU4NjQ0OTcyIEM3My4wMTI3MzMzLDcuMTY4MzI0NzIgNzIuNTM2NzMzMyw3LjM2NzA3NDcyIDcyLjQwMDczMzMsNy41NTA4MjQ3MiBMNjkuNTk1NzMzMywxMS45MzQ1NzQ3IEM2OS4zNzQ3MzMzLDEyLjM4MjY5OTcgNjguNjY2NCwxMi41ODUxOTk3IDY4LjAzMzYyMjIsMTIuNDc2NDQ5NyBMNjQuNjk1OTU1NiwxMS44ODIwNzQ3IEM2Mi41NzA5NTU2LDExLjQ5NTgyNDcgNjIuNTkxNzMzMyw4LjgyOTU3NDcyIDYwLjU5ODk1NTYsOC40Nzg5NDk3MiBMNTUuNzYzNCw3LjY2NTE5OTcyIEM1My43MzI4NDQ0LDcuMjU2NDQ5NzIgNTIuMTg1ODQ0NCw5LjYwMjA3NDcyIDUwLjA3MjE3NzgsOS4xNTk1NzQ3MiBMNDcuMTQ4MTc3OCw4LjYyMTQ0OTcyIEM0Ni4zOTQ1MTExLDguNTU1ODI0NzIgNDUuMDc0MTc3OCw3LjcyNzA3NDcyIDQ1LjAyMTI4ODksOC41NTM5NDk3MiIgaWQ9IkZpbGwtNjM1IiBmaWxsPSIjQkVCNUFBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03Ni4xMzQ4Nzc4LDg3LjM1OTI2MjIgTDk3LjcxNzMyMjIsNTMuMDIyMzg3MiBDOTguNDk1NTQ0NCw1MS41Nzg2MzcyIDk4Ljg5OTc2NjcsNDkuODgzNjM3MiA5OC45Mjk5ODg5LDQ4LjEyMTEzNzIgTDEwMC45NjQzMjIsMTQuMzU0MjYyMiBDMTAwLjk2MDU0NCwxMy4yOTY3NjIyIDEwMC40OTIxLDEyLjYzMzAxMjIgOTkuOTM0ODc3OCwxMy4zMzIzODcyIEw3Mi41NTkyMTExLDUxLjM5Njc2MjIgQzcxLjgzMDEsNTIuNTk4NjM3MiA3MS4zOTc1NDQ0LDUzLjA5NTUxMjIgNzEuNDE2NDMzMyw1NC41MjQyNjIyIEw3MS40MTY0MzMzLDg2LjMxNDg4NzIgQzcxLjQzMzQzMzMsODguNzU4MDEyMiA3NC44MTY0MzMzLDg5LjYxMzAxMjIgNzYuMTM0ODc3OCw4Ny4zNTkyNjIyIiBpZD0iRmlsbC02MzYiIGZpbGw9IiNCRUI1QUEiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTg2LjY0NjU0NDQsMjMuNDM0MTM3MiBMODYuNjQ2NTQ0NCwyMS44MjcyNjIyIEM4Ni42NDY1NDQ0LDIxLjIwNjYzNzIgODYuMDk0OTg4OSwyMC41MTI4ODcyIDg1LjMyMjQzMzMsMjAuMzM0NzYyMiBMNzguMDcyODc3OCwxOS4wODc4ODcyIEM3Ny4zMzYyMTExLDE4Ljk3OTEzNzIgNzYuNDg5OTg4OSwxOS4yNzE2MzcyIDc2LjE5NTMyMjIsMTkuNzgzNTEyMiBMNzUuMDU2MzIyMiwyMS41NzAzODcyIEM3My45MTU0MzMzLDIzLjI4OTc2MjIgNzcuMTg1MSwyNC40NjE2MzcyIDc2LjQxNjMyMjIsMjUuNzM0NzYyMiBMNzMuODU0OTg4OSwyOC41ODEwMTIyIEM3My4wODI0MzMzLDI5Ljg1OTc2MjIgNjkuNDQyNTQ0NCwyOC44ODEwMTIyIDY4LjcwNTg3NzgsMzAuMDg4NTEyMiBMNjcuMDQzNjU1NiwzMi40MjY2MzcyIEM2Ni43MjI1NDQ0LDMyLjg4MDM4NzIgNjYuNjM3NTQ0NCwzMy41NTcyNjIyIDY2LjYzNzU0NDQsMzQuMDMxNjM3MiBMNjYuNjM3NTQ0NCwzNS42MDI4ODcyIiBpZD0iU3Ryb2tlLTYzNyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTY4LjU0MDk3NzgsMzYuNzY2ODg3MiBMNzQuNjIzMiwzNy45MDMxMzcyIiBpZD0iU3Ryb2tlLTYzOCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03Ny42MDQ2MjIyLDM2LjY2MTY5OTcgTDc5LjQ4MDI4ODksMzMuNzAxMDc0NyBDODAuNDM3OTU1NiwzMi4wOTYwNzQ3IDc3LjYwNDYyMjIsMzAuODE3MzI0NyA3OC41MjQ1MTExLDI5LjM5NDE5OTcgTDgwLjkwNjQsMjcuNDUzNTc0NyBDODEuNjc4OTU1NiwyNi4zMTkxOTk3IDg0LjY5NTUxMTEsMjcuMjMyMzI0NyA4NS40MzIxNzc4LDI2LjA2NDE5OTcgTDg1Ljg3NDE3NzgsMjUuMzMyOTQ5NyIgaWQ9IlN0cm9rZS02MzkiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMzQuODY2ODExMSwxNC40MzA1NzQ3IEwzNC45NTc0Nzc4LDEyLjgzODY5OTcgQzM0Ljk5MzM2NjcsMTIuMjI1NTc0NyAzNC4zMjQ3LDExLjMzMTE5OTcgMzMuNTU3ODExMSwxMS4xMjg2OTk3IEwyNi40MjM0Nzc4LDkuNTQ2MTk5NzIgQzI1LjY4ODcsOS40MTExOTk3MiAyNC44MTk4MTExLDkuNjY2MTk5NzIgMjQuNDkzMDMzMywxMC4xNjMwNzQ3IEwyMi45ODAwMzMzLDExLjgyNDMyNDcgQzIxLjczMzM2NjcsMTMuNDgxODI0NyAyNC44MjkyNTU2LDE0Ljc3NzQ0OTcgMjMuOTg0OTIyMiwxNi4wMDc0NDk3IEwyMS40NzI3LDE4LjgwMTE5OTcgQzIwLjYyNDU4ODksMjAuMDM2ODI0NyAxNi43NjU1ODg5LDE4Ljg4OTMyNDcgMTUuOTU1MjU1NiwyMC4wNTM2OTk3IEwxNC4zNDIxNDQ0LDIyLjMxMzA3NDcgQzEzLjk5MDgxMTEsMjIuNzU1NTc0NyAxMy44Njk5MjIyLDIzLjQxOTMyNDcgMTMuODQzNDc3OCwyMy44ODgwNzQ3IEwxMy43NTY1ODg5LDI1LjQ0NDMyNDciIGlkPSJTdHJva2UtNjQwIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMC45NDUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTUuNjA3MzIyMiwyNi42NjkyNjIyIEwyMS42NzQ0MzMzLDI4LjAzMDUxMjIiIGlkPSJTdHJva2UtNjQxIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS40MTc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTI0Ljc0NTk1NTYsMjYuOTEzMTk5NyBMMjYuOTgyNCwyNC4yMzU2OTk3IEMyOC4wMzY0LDIyLjY3OTQ0OTcgMjUuNzg2NzMzMywyMS40NTUwNzQ3IDI2Ljc5NTQsMjAuMDgwNjk5NyBMMjguNTkxNzMzMywxOC4wNjEzMjQ3IEMyOS40MzQxNzc4LDE2Ljk3MDA3NDcgMzIuNTM5NTExMSwxNy45MzU2OTk3IDMzLjM0NjA2NjcsMTYuODA1MDc0NyBMMzMuODg2Mjg4OSwxNi4xMzU2OTk3IiBpZD0iU3Ryb2tlLTY0MiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC4yNDIsNDAuNTg2MDc0NyBMMjQuMjQyLDM5LjAyMjMyNDcgQzI0LjI0MiwzOC4yODkxOTk3IDI0LjMzNjQ0NDQsMzcuNDM0MTk5NyAyNC43NjksMzYuNzk2Njk5NyBMMjcuMjMyMTExMSwzMy4wNDI5NDk3IEMyNy43MDA1NTU2LDMyLjMyMjk0OTcgMjguNjQ4Nzc3OCwzMi4xNDEwNzQ3IDI5LjU0NiwzMi4zMjg1NzQ3IEwzMy42NTgxMTExLDMzLjA5MTY5OTcgQzM0LjY5ODg4ODksMzMuMjgyOTQ5NyAzNC45OTkyMjIyLDM0LjYwODU3NDcgMzUuMDg4LDM1LjA5NjA3NDcgQzM1LjE3Njc3NzgsMzUuNTgxNjk5NyAzMy45NzU0NDQ0LDM4LjAyMTA3NDcgMzMuOTc1NDQ0NCwzOC4wMjEwNzQ3IiBpZD0iU3Ryb2tlLTY0MyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTUyLjcyMjg1NTYsMzkuODE2NzYyMiBMNTIuNzIyODU1NiwzOC4wMzkyNjIyIEM1Mi42OTgzLDM3LjIxMDUxMjIgNTIuMTUwNTIyMiwzNi40Mjg2MzcyIDUxLjIxOTMsMzYuMjM5MjYyMiBMNDYuOTQ2NjMzMywzNS41MzA1MTIyIEM0NS43MDk0MTExLDM1LjI4ODYzNzIgNDQuMzM2MTg4OSwzNi4zMDMwMTIyIDQyLjk1MTYzMzMsMzYuNzczNjM3MiBMNDEuNTA2NjMzMywzOS4zNDk4ODcyIiBpZD0iU3Ryb2tlLTY0NCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjAuOTQ1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTUwLjA5NjU0NDQsNDQuODM5MzI0NyBMNTEuODA5NzY2Nyw0Mi4wMzA1NzQ3IiBpZD0iU3Ryb2tlLTY0NSIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03My4wNzY3NjY3LDkuODY5MDc0NzIgTDczLjA3Njc2NjcsOC4xMTQwNzQ3MiBDNzMuMDU0MSw3LjI5MjgyNDcyIDcyLjUxMzg3NzgsNi41MTg0NDk3MiA3MS41OTAyMTExLDYuMzMwOTQ5NzIgTDY3LjM2ODU0NDQsNS42MzE1NzQ3MiBDNjUuNjcyMzIyMiw1LjMwMzQ0OTcyIDYzLjcxMzU0NDQsNy4zNjQwNzQ3MiA2MS44Mjg0MzMzLDcuMDU4NDQ5NzIgTDU2LjczNDEsNi4xNjc4MjQ3MiBDNTUuMDgzMjExMSw1LjkxMDk0OTcyIDU1Ljg4NTk4ODksMy41MjQwNzQ3MiA1NC4yNDA3NjY3LDMuMjIyMTk5NzIgTDUwLjE3Nzc2NjcsMi40NzAzMjQ3MiBDNDkuMjkxODc3OCwyLjI4NDY5OTcyIDQ4LjM1Njg3NzgsMi40NjI4MjQ3MiA0Ny44OTIyMTExLDMuMTc1MzI0NzIgTDQ1LjQ1NTU0NDQsNi44ODQwNzQ3MiBDNDUuMDMyNDMzMyw3LjUxNTk0OTcyIDQ0LjkzNzk4ODksOC4zNTU5NDk3MiA0NC45Mzc5ODg5LDkuMDgzNDQ5NzIgTDQ0LjkzNzk4ODksMTAuNjI4NDQ5NyIgaWQ9IlN0cm9rZS02NDYiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ3LjA3NzM0NDQsMTEuMzE1MjYyMiBMNTAuMDE4MzQ0NCwxMS44NTcxMzcyIEM1Mi4xMzk1NjY3LDEyLjMwMTUxMjIgNTMuNjk0MTIyMiw5Ljk0Mjc2MjIyIDU1Ljc0MzU2NjcsMTAuMzUzMzg3MiBMNjAuNTk5OSwxMS4xNzA4ODcyIEM2Mi42MDU5LDExLjUyMzM4NzIgNjIuNTg1MTIyMiwxNC4yMDY1MTIyIDY0LjcyMzM0NDQsMTQuNTk0NjM3MiBMNjguMDc5OSwxNS4xOTA4ODcyIiBpZD0iU3Ryb2tlLTY0NyIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03MC40ODIzNzc4LDE0LjgzMjE5OTcgTDcyLjE3NjcxMTEsMTIuMDU3MTk5NyIgaWQ9IlN0cm9rZS02NDgiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIxLjQxNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNOTcuNjUxNzc3OCwxMC40Nzc1MTIyIEw3Mi43NjM3Nzc4LDYuNjE2ODg3MjIgQzcyLjUwODc3NzgsNi4yMzA2MzcyMiA3Mi4xMTIxMTExLDUuOTMyNTEyMjIgNzEuNTkyNjY2Nyw1LjgyNTYzNzIyIEw2Ny4zNzEsNS4xMjQzODcyMiBDNjYuODE5NDQ0NCw1LjAxOTM4NzIyIDY2LjI0MzMzMzMsNS4xNjM3NjIyMiA2NS42NTAyMjIyLDUuMzk2MjYyMjIgTDU1LjI3NDU1NTYsMy42MTY4ODcyMiBDNTUuMDg5NDQ0NCwzLjE4MTg4NzIyIDU0LjgxNTU1NTYsMi44MjAwMTIyMiA1NC4yNDEzMzMzLDIuNzE1MDEyMjIgTDUwLjE4MDIyMjIsMS45NjMxMzcyMiBDNDkuNDIyNzc3OCwxLjgwNzUxMjIyIDQ4LjYzNTExMTEsMS45MTQzODcyMiA0OC4xMjg4ODg5LDIuMzkwNjM3MjIgTDM3LjA1ODExMTEsMC4wOTU2MzcyMjM2IEMzNC44ODU4ODg5LC0wLjI2OTk4Nzc3NiAzMi40ODcsMC40MjU2MzcyMjQgMzEuNDkzNDQ0NCwxLjk2MTI2MjIyIEwxLjI0MSwzNy4zODc1MTIyIEMwLjM0OTQ0NDQ0NCwzOC42OTI1MTIyIDAuMDI0NTU1NTU1Niw0MC42MTI1MTIyIDAsNDIuMjg4NzYyMiBMMS4zNjE4ODg4OSw3My42MDg3NjIyIEMxLjM4NjQ0NDQ0LDc1LjE1NzUxMjIgMi40MjE1NTU1Niw3Ni41NzMxMzcyIDQuMTUzNjY2NjcsNzYuODk5Mzg3MiBMNzEuNTcsODkuMzM0Mzg3MiBDNzMuNjI4ODg4OSw4OS43NjM3NjIyIDc1Ljg4OTg4ODksODguOTM2ODg3MiA3Ni44MDIyMjIyLDg3LjM2MDAxMjIgTDk3LjcxNzg4ODksNTMuMDI1MDEyMiBDOTguNDk2MTExMSw1MS41Nzc1MTIyIDk4LjkwMDMzMzMsNDkuODgyNTEyMiA5OC45MzA1NTU2LDQ4LjEyMDAxMjIgTDEwMC45NjMsMTQuMzU1MDEyMiBDMTAwLjkzMjc3OCwxMi42MzAwMTIyIDk5LjY5MTc3NzgsMTAuODYwMDEyMiA5Ny42NTE3Nzc4LDEwLjQ3NzUxMjIgWiIgaWQ9IlN0cm9rZS02NDkiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIzLjMwNzUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMC41OTA2NTU1NTYsNDAuMjY4ODI0NyBMNjguMTUwNTQ0NCw1Mi41NTAwNzQ3IEM3MC4zNDM1NDQ0LDUyLjk0OTQ0OTcgNzIuMjg3MjExMSw1Mi4yMjk0NDk3IDczLjIyNzg3NzgsNTAuNzM1MDc0NyBMOTkuNjIzMjExMSwxMy4yMTYzMjQ3IiBpZD0iU3Ryb2tlLTY1MCIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMy4xNzQ5MzMzLDQxLjE1NjI2MjIgQzMxLjk1NjYsNDEuNzA5Mzg3MiAzMC43OTMwNDQ0LDQyLjYzNTYzNzIgMjkuMzgyMDQ0NCw0Mi4zNDEyNjIyIEwyNi40MDcwNDQ0LDQxLjc5NTYzNzIiIGlkPSJTdHJva2UtNjUxIiBzdHJva2U9IiM1QzUxNDIiIHN0cm9rZS13aWR0aD0iMS40MTc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ3LjY2MzI3NzgsNDUuNzA2NTEyMiBMNDQuMjY3MDU1Niw0NS4xMDQ2MzcyIiBpZD0iU3Ryb2tlLTY1MiIgc3Ryb2tlPSIjNUM1MTQyIiBzdHJva2Utd2lkdGg9IjEuNDE3NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00My4xMjg4MTExLDM2LjgwODMyNDcgTDQxLjY1NzM2NjcsMzkuMTQ2NDQ5NyBDNDEuMzM0MzY2NywzOS42MDIwNzQ3IDQxLjI0OTM2NjcsNDAuMjc3MDc0NyA0MS4yNDkzNjY3LDQwLjc1MTQ0OTcgTDQxLjI0OTM2NjcsNDIuMzIyNjk5NyIgaWQ9IlN0cm9rZS02NTMiIHN0cm9rZT0iIzVDNTE0MiIgc3Ryb2tlLXdpZHRoPSIwLjk0NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJHcm91cC00LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk1LjAwMDAwMCwgODkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNC45OTg5NTI4LDEzIEMyNC45OTg5NTI4LDE5LjkwMzk1NDEgMTkuNDAyOTA2OSwyNS41IDEyLjQ5ODk1MjgsMjUuNSBDNS41OTYwNDU5MSwyNS41IDAsMTkuOTAzOTU0MSAwLDEzIEMwLDYuMDk3MDkzMDcgNS41OTYwNDU5MSwwLjUgMTIuNDk4OTUyOCwwLjUgQzE5LjQwMjkwNjksMC41IDI0Ljk5ODk1MjgsNi4wOTcwOTMwNyAyNC45OTg5NTI4LDEzIiBpZD0iRmlsbC0xIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi45NzYsMTYuMzc5IEwxNi45NzYsMTguNzQyIEw4LjU2MSwxOC43NDIgTDguNTYxLDE2LjM3OSBMOS42MjkyMywxNS40NjA5MTU2IEMxMi43ODQyMDg2LDEyLjcxNzE3NjkgMTMuODE0LDExLjQ3NTcxNDMgMTMuODE0LDEwLjI3NiBDMTMuODE0LDkuMzA3IDEzLjEzNCw4Ljc2MyAxMi4xODIsOC43NjMgQzExLjQ4NSw4Ljc2MyAxMC41NjcsOC45NjcgOS40MjgsOS42MTMgTDguNTYxLDcuNDg4IEM5LjY4Myw2Ljc3NCAxMS4xOTYsNi40IDEyLjQ3MSw2LjQgQzE1LjEyMyw2LjQgMTYuNzg5LDcuNzYgMTYuNzg5LDEwLjIwOCBDMTYuNzg5LDEyLjI5OSAxNS4zMjcsMTMuODggMTIuMzAxLDE2LjM3OSBMMTYuOTc2LDE2LjM3OSBaIiBpZD0iMiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
const toioExtension = () => {
  translations.updateLocale();
  return {
    name: translations.label("extension.nameGui"),
    extensionId: "toio",
    collaborator: translations.label("extension.collaborator"),
    iconURL: imageExtension,
    insetIconURL: imageCube,
    description: translations.label("extension.description"),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: imageCubeL,
    connectionSmallIconURL: imageCube,
    connectingMessage: translations.label("extension.connecting"),
    helpLink: "https://toio.io/programming/visual-programming.html/#preparation"
  };
};
const toioNExtension = (index) => ({
  ...toioExtension(),
  name: translations.label("extension2.nameGui").replace("#2", "#" + index),
  extensionId: "toio" + index,
  iconURL: imageExtension2,
  insetIconURL: imageCube2,
  description: translations.label("extension2.description").replace("2\u53F0\u76EE", index + "\u53F0\u76EE"),
  connectionIconURL: imageCube2L,
  connectionSmallIconURL: imageCube2
});
const entry = toioExtension();
const toioExtensions = [toioExtension()];
{
  for (let i = 2; i <= NUMBER_OF_EXTENSIONS; i++) {
    toioExtensions.push(toioNExtension(i));
  }
}
const EXTENSION_ID = "toio";
class Scratch3ToioBlocks {
  constructor(runtime2) {
    __publicField(this, "peripheral");
    this.peripheral = new PeripheralExtension(runtime2, EXTENSION_ID);
    for (const [name, func] of Object.entries(blocks.functions)) {
      this[name] = func.bind(this);
    }
  }
  getInfo() {
    translations.updateLocale();
    return {
      id: EXTENSION_ID,
      name: translations.label("extension.name"),
      blockIconURI: imageCube,
      showStatusButton: true,
      color1: BLOCK_COLORS[0][0],
      color2: BLOCK_COLORS[0][1],
      color3: BLOCK_COLORS[0][2],
      blocks: blocks.infos(),
      menus: blocks.menus()
    };
  }
}
const Scratch3ToioNBlocks = (index) => class Scratch3Toio2Blocks {
  constructor(runtime2) {
    __publicField(this, "peripheral");
    this.peripheral = new PeripheralExtension(runtime2, "toio" + index);
    for (const [name, func] of Object.entries(blocks.functions)) {
      this[name] = func.bind(this);
    }
  }
  getInfo() {
    translations.updateLocale();
    return {
      id: "toio" + index,
      name: translations.label("extension2.name").replace("#2", "#" + index),
      blockIconURI: imageCube2,
      showStatusButton: true,
      color1: BLOCK_COLORS[index - 1][0],
      color2: BLOCK_COLORS[index - 1][1],
      color3: BLOCK_COLORS[index - 1][2],
      blocks: blocks.infos(),
      menus: blocks.menus()
    };
  }
};
let Scratch3ToioBlocksExtensions = {
  toio: () => Scratch3ToioBlocks
};
const presetExtensions = ["toio"];
{
  for (let i = 2; i <= NUMBER_OF_EXTENSIONS; i++) {
    const extensionId = "toio" + i;
    Scratch3ToioBlocksExtensions[extensionId] = () => Scratch3ToioNBlocks(i);
    presetExtensions.push(extensionId);
  }
}
export { Scratch3ToioBlocksExtensions, Scratch3ToioBlocks as blockClass, Scratch3ToioBlocks as default, entry, presetExtensions, toioExtension, toioExtensions, toioNExtension };
