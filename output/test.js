/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _blueTape = __webpack_require__(1);

	var _blueTape2 = _interopRequireDefault(_blueTape);

	var _index = __webpack_require__(36);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	(0, _blueTape2.default)('Tests run', function (assert) {
	  assert.pass('Tests run');
	  assert.end();
	});

	(0, _blueTape2.default)('Greet World', function (assert) {
	  return new Promise(function (resolve) {
	    assert.equal((0, _index2.default)('World'), 'Hello, World!');

	    setTimeout(function () {
	      // do some async stuff
	      resolve();
	    }, 10);
	  });
	});

	(0, _blueTape2.default)('Should support object spread', function (assert) {
	  return new Promise(function (resolve) {
	    var options = { x: 1, y: 2, z: 3 };
	    var x = options.x;

	    var opts = _objectWithoutProperties(options, ['x']);

	    assert.equal(x, 1);
	    assert.deepEqual(opts, { y: 2, z: 3 });

	    resolve();
	  });
	});

	(0, _blueTape2.default)('Should support object assign', function (assert) {
	  return new Promise(function (resolve) {
	    var defaults = { x: 1, y: 2, z: 3 };
	    var options = _extends(defaults, { w: 0, x: 11 });

	    assert.deepEqual(options, { w: 0, x: 11, y: 2, z: 3 });

	    resolve();
	  });
	});

	(0, _blueTape2.default)('Should just work (tm)', function (assert) {
	  assert.deepEqual({ a: 2 }, { a: 2 });
	  assert.end();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Test = __webpack_require__(2);

	function checkPromise(p) {
	    return p && p.then && typeof p.then === 'function';
	}

	Test.prototype.run = function () {
	    if (this._skip) return this.end();
	    this.emit('prerun');
	    try {
	        var p = this._cb && this._cb(this),
	            isPromise = checkPromise(p);
	        var self = this;
	        if (isPromise) p.then(function () {
	            self.end();
	        }, function (err) {
	            err ? self.error(err) : self.fail(err);
	            self.end();
	        });
	    } catch (err) {
	        err ? this.error(err) : this.fail(err);
	        this.end();
	        return;
	    }
	    this.emit('run');
	};

	module.exports = __webpack_require__(28);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var deepEqual = __webpack_require__(3);
	var defined = __webpack_require__(6);
	var path = __webpack_require__(7);
	var inherits = __webpack_require__(8);
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var has = __webpack_require__(11);
	var trim = __webpack_require__(13);

	module.exports = Test;

	var nextTick = typeof setImmediate !== 'undefined' ? setImmediate : process.nextTick;

	inherits(Test, EventEmitter);

	var getTestArgs = function getTestArgs(name_, opts_, cb_) {
	    var name = '(anonymous)';
	    var opts = {};
	    var cb;

	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        var t = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
	        if (t === 'string') {
	            name = arg;
	        } else if (t === 'object') {
	            opts = arg || opts;
	        } else if (t === 'function') {
	            cb = arg;
	        }
	    }
	    return { name: name, opts: opts, cb: cb };
	};

	function Test(name_, opts_, cb_) {
	    if (!(this instanceof Test)) {
	        return new Test(name_, opts_, cb_);
	    }

	    var args = getTestArgs(name_, opts_, cb_);

	    this.readable = true;
	    this.name = args.name || '(anonymous)';
	    this.assertCount = 0;
	    this.pendingCount = 0;
	    this._skip = args.opts.skip || false;
	    this._timeout = args.opts.timeout;
	    this._plan = undefined;
	    this._cb = args.cb;
	    this._progeny = [];
	    this._ok = true;

	    for (var prop in this) {
	        this[prop] = function bind(self, val) {
	            if (typeof val === 'function') {
	                return function bound() {
	                    return val.apply(self, arguments);
	                };
	            } else return val;
	        }(this, this[prop]);
	    }
	}

	Test.prototype.run = function () {
	    if (!this._cb || this._skip) {
	        return this._end();
	    }
	    if (this._timeout != null) {
	        this.timeoutAfter(this._timeout);
	    }
	    this.emit('prerun');
	    this._cb(this);
	    this.emit('run');
	};

	Test.prototype.test = function (name, opts, cb) {
	    var self = this;
	    var t = new Test(name, opts, cb);
	    this._progeny.push(t);
	    this.pendingCount++;
	    this.emit('test', t);
	    t.on('prerun', function () {
	        self.assertCount++;
	    });

	    if (!self._pendingAsserts()) {
	        nextTick(function () {
	            self._end();
	        });
	    }

	    nextTick(function () {
	        if (!self._plan && self.pendingCount == self._progeny.length) {
	            self._end();
	        }
	    });
	};

	Test.prototype.comment = function (msg) {
	    this.emit('result', trim(msg).replace(/^#\s*/, ''));
	};

	Test.prototype.plan = function (n) {
	    this._plan = n;
	    this.emit('plan', n);
	};

	Test.prototype.timeoutAfter = function (ms) {
	    if (!ms) throw new Error('timeoutAfter requires a timespan');
	    var self = this;
	    var timeout = setTimeout(function () {
	        self.fail('test timed out after ' + ms + 'ms');
	        self.end();
	    }, ms);
	    this.once('end', function () {
	        clearTimeout(timeout);
	    });
	};

	Test.prototype.end = function (err) {
	    var self = this;
	    if (arguments.length >= 1 && !!err) {
	        this.ifError(err);
	    }

	    if (this.calledEnd) {
	        this.fail('.end() called twice');
	    }
	    this.calledEnd = true;
	    this._end();
	};

	Test.prototype._end = function (err) {
	    var self = this;
	    if (this._progeny.length) {
	        var t = this._progeny.shift();
	        t.on('end', function () {
	            self._end();
	        });
	        t.run();
	        return;
	    }

	    if (!this.ended) this.emit('end');
	    var pendingAsserts = this._pendingAsserts();
	    if (!this._planError && this._plan !== undefined && pendingAsserts) {
	        this._planError = true;
	        this.fail('plan != count', {
	            expected: this._plan,
	            actual: this.assertCount
	        });
	    }
	    this.ended = true;
	};

	Test.prototype._exit = function () {
	    if (this._plan !== undefined && !this._planError && this.assertCount !== this._plan) {
	        this._planError = true;
	        this.fail('plan != count', {
	            expected: this._plan,
	            actual: this.assertCount,
	            exiting: true
	        });
	    } else if (!this.ended) {
	        this.fail('test exited without ending', {
	            exiting: true
	        });
	    }
	};

	Test.prototype._pendingAsserts = function () {
	    if (this._plan === undefined) {
	        return 1;
	    } else {
	        return this._plan - (this._progeny.length + this.assertCount);
	    }
	};

	Test.prototype._assert = function assert(ok, opts) {
	    var self = this;
	    var extra = opts.extra || {};

	    var res = {
	        id: self.assertCount++,
	        ok: Boolean(ok),
	        skip: defined(extra.skip, opts.skip),
	        name: defined(extra.message, opts.message, '(unnamed assert)'),
	        operator: defined(extra.operator, opts.operator)
	    };
	    if (has(opts, 'actual') || has(extra, 'actual')) {
	        res.actual = defined(extra.actual, opts.actual);
	    }
	    if (has(opts, 'expected') || has(extra, 'expected')) {
	        res.expected = defined(extra.expected, opts.expected);
	    }
	    this._ok = Boolean(this._ok && ok);

	    if (!ok) {
	        res.error = defined(extra.error, opts.error, new Error(res.name));
	    }

	    if (!ok) {
	        var e = new Error('exception');
	        var err = (e.stack || '').split('\n');
	        var dir = path.dirname(__dirname) + '/';

	        for (var i = 0; i < err.length; i++) {
	            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
	            if (!m) {
	                continue;
	            }

	            var s = m[1].split(/\s+/);
	            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
	            if (!filem) {
	                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);

	                if (!filem) {
	                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

	                    if (!filem) {
	                        continue;
	                    }
	                }
	            }

	            if (filem[1].slice(0, dir.length) === dir) {
	                continue;
	            }

	            res.functionName = s[0];
	            res.file = filem[1];
	            res.line = Number(filem[2]);
	            if (filem[3]) res.column = filem[3];

	            res.at = m[1];
	            break;
	        }
	    }

	    self.emit('result', res);

	    var pendingAsserts = self._pendingAsserts();
	    if (!pendingAsserts) {
	        if (extra.exiting) {
	            self._end();
	        } else {
	            nextTick(function () {
	                self._end();
	            });
	        }
	    }

	    if (!self._planError && pendingAsserts < 0) {
	        self._planError = true;
	        self.fail('plan != count', {
	            expected: self._plan,
	            actual: self._plan - pendingAsserts
	        });
	    }
	};

	Test.prototype.fail = function (msg, extra) {
	    this._assert(false, {
	        message: msg,
	        operator: 'fail',
	        extra: extra
	    });
	};

	Test.prototype.pass = function (msg, extra) {
	    this._assert(true, {
	        message: msg,
	        operator: 'pass',
	        extra: extra
	    });
	};

	Test.prototype.skip = function (msg, extra) {
	    this._assert(true, {
	        message: msg,
	        operator: 'skip',
	        skip: true,
	        extra: extra
	    });
	};

	Test.prototype.ok = Test.prototype['true'] = Test.prototype.assert = function (value, msg, extra) {
	    this._assert(value, {
	        message: msg,
	        operator: 'ok',
	        expected: true,
	        actual: value,
	        extra: extra
	    });
	};

	Test.prototype.notOk = Test.prototype['false'] = Test.prototype.notok = function (value, msg, extra) {
	    this._assert(!value, {
	        message: msg,
	        operator: 'notOk',
	        expected: false,
	        actual: value,
	        extra: extra
	    });
	};

	Test.prototype.error = Test.prototype.ifError = Test.prototype.ifErr = Test.prototype.iferror = function (err, msg, extra) {
	    this._assert(!err, {
	        message: defined(msg, String(err)),
	        operator: 'error',
	        actual: err,
	        extra: extra
	    });
	};

	Test.prototype.equal = Test.prototype.equals = Test.prototype.isEqual = Test.prototype.is = Test.prototype.strictEqual = Test.prototype.strictEquals = function (a, b, msg, extra) {
	    this._assert(a === b, {
	        message: defined(msg, 'should be equal'),
	        operator: 'equal',
	        actual: a,
	        expected: b,
	        extra: extra
	    });
	};

	Test.prototype.notEqual = Test.prototype.notEquals = Test.prototype.notStrictEqual = Test.prototype.notStrictEquals = Test.prototype.isNotEqual = Test.prototype.isNot = Test.prototype.not = Test.prototype.doesNotEqual = Test.prototype.isInequal = function (a, b, msg, extra) {
	    this._assert(a !== b, {
	        message: defined(msg, 'should not be equal'),
	        operator: 'notEqual',
	        actual: a,
	        notExpected: b,
	        extra: extra
	    });
	};

	Test.prototype.deepEqual = Test.prototype.deepEquals = Test.prototype.isEquivalent = Test.prototype.same = function (a, b, msg, extra) {
	    this._assert(deepEqual(a, b, { strict: true }), {
	        message: defined(msg, 'should be equivalent'),
	        operator: 'deepEqual',
	        actual: a,
	        expected: b,
	        extra: extra
	    });
	};

	Test.prototype.deepLooseEqual = Test.prototype.looseEqual = Test.prototype.looseEquals = function (a, b, msg, extra) {
	    this._assert(deepEqual(a, b), {
	        message: defined(msg, 'should be equivalent'),
	        operator: 'deepLooseEqual',
	        actual: a,
	        expected: b,
	        extra: extra
	    });
	};

	Test.prototype.notDeepEqual = Test.prototype.notEquivalent = Test.prototype.notDeeply = Test.prototype.notSame = Test.prototype.isNotDeepEqual = Test.prototype.isNotDeeply = Test.prototype.isNotEquivalent = Test.prototype.isInequivalent = function (a, b, msg, extra) {
	    this._assert(!deepEqual(a, b, { strict: true }), {
	        message: defined(msg, 'should not be equivalent'),
	        operator: 'notDeepEqual',
	        actual: a,
	        notExpected: b,
	        extra: extra
	    });
	};

	Test.prototype.notDeepLooseEqual = Test.prototype.notLooseEqual = Test.prototype.notLooseEquals = function (a, b, msg, extra) {
	    this._assert(!deepEqual(a, b), {
	        message: defined(msg, 'should be equivalent'),
	        operator: 'notDeepLooseEqual',
	        actual: a,
	        expected: b,
	        extra: extra
	    });
	};

	Test.prototype['throws'] = function (fn, expected, msg, extra) {
	    if (typeof expected === 'string') {
	        msg = expected;
	        expected = undefined;
	    }

	    var caught = undefined;

	    try {
	        fn();
	    } catch (err) {
	        caught = { error: err };
	        var message = err.message;
	        delete err.message;
	        err.message = message;
	    }

	    var passed = caught;

	    if (expected instanceof RegExp) {
	        passed = expected.test(caught && caught.error);
	        expected = String(expected);
	    }

	    if (typeof expected === 'function' && caught) {
	        passed = caught.error instanceof expected;
	        caught.error = caught.error.constructor;
	    }

	    this._assert(passed, {
	        message: defined(msg, 'should throw'),
	        operator: 'throws',
	        actual: caught && caught.error,
	        expected: expected,
	        error: !passed && caught && caught.error,
	        extra: extra
	    });
	};

	Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
	    if (typeof expected === 'string') {
	        msg = expected;
	        expected = undefined;
	    }
	    var caught = undefined;
	    try {
	        fn();
	    } catch (err) {
	        caught = { error: err };
	    }
	    this._assert(!caught, {
	        message: defined(msg, 'should not throw'),
	        operator: 'throws',
	        actual: caught && caught.error,
	        expected: expected,
	        error: caught && caught.error,
	        extra: extra
	    });
	};

	Test.skip = function (name_, _opts, _cb) {
	    var args = getTestArgs.apply(null, arguments);
	    args.opts.skip = true;
	    return Test(args.name, args.opts, args.cb);
	};

	// vim: set softtabstop=4 shiftwidth=4:
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(4);
	var isArguments = __webpack_require__(5);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	    // 7.3. Other pairs that do not both pass typeof value == 'object',
	    // equivalence is determined by ==.
	  } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
	      return opts.strict ? actual === expected : actual == expected;

	      // 7.4. For all other Object pairs, including Array objects, equivalence is
	      // determined by having the same number of owned properties (as verified
	      // with Object.prototype.hasOwnProperty.call), the same set of keys
	      // (although not necessarily the same order), equivalent values for every
	      // corresponding key, and an identical 'prototype' property. Note: this
	      // accounts for both named and indexed properties on Arrays.
	    } else {
	        return objEquiv(actual, expected, opts);
	      }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer(x) {
	  if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {
	    //happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

	exports.shim = shim;
	function shim(obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var supportsArgumentsClass = function () {
	  return Object.prototype.toString.call(arguments);
	}() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object) {
	  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (arguments[i] !== undefined) return arguments[i];
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9).inherits;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(12);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var binder = function binder() {
	        if (this instanceof bound) {
	            var result = target.apply(this, args.concat(slice.call(arguments)));
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(that, args.concat(slice.call(arguments)));
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(12);
	var define = __webpack_require__(14);

	var implementation = __webpack_require__(18);
	var getPolyfill = __webpack_require__(26);
	var shim = __webpack_require__(27);

	var boundTrim = bind.call(Function.call, implementation);

	define(boundTrim, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	module.exports = boundTrim;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var keys = __webpack_require__(15);
	var foreach = __webpack_require__(17);
	var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';

	var toStr = Object.prototype.toString;

	var isFunction = function isFunction(fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
			/* eslint-disable no-unused-vars, no-restricted-syntax */
			for (var _ in obj) {
				return false;
			}
			/* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) {
			/* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function defineProperty(object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function defineProperties(object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = props.concat(Object.getOwnPropertySymbols(map));
		}
		foreach(props, function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	module.exports = defineProperties;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(16);
	var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
	var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var blacklistedKeys = {
		$console: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$parent: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = function () {
		/* global window */
		if (typeof window === 'undefined') {
			return false;
		}
		for (var k in window) {
			try {
				if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}();
	var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2);
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' && value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	module.exports = function forEach(obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(12);
	var ES = __webpack_require__(19);
	var replace = bind.call(Function.call, String.prototype.replace);

	var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
	var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

	module.exports = function trim() {
		var S = ES.ToString(ES.CheckObjectCoercible(this));
		return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $isNaN = Number.isNaN || function (a) {
		return a !== a;
	};
	var $isFinite = __webpack_require__(20);

	var sign = __webpack_require__(21);
	var mod = __webpack_require__(22);

	var IsCallable = __webpack_require__(23);
	var toPrimitive = __webpack_require__(24);

	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,

		ToBoolean: function ToBoolean(value) {
			return Boolean(value);
		},
		ToNumber: function ToNumber(value) {
			return Number(value);
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) {
				return 0;
			}
			if (number === 0 || !$isFinite(number)) {
				return number;
			}
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) {
				return 0;
			}
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) {
				// 0 === -0, but they are not identical.
				if (x === 0) {
					return 1 / x === 1 / y;
				}
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		}
	};

	module.exports = ES5;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var $isNaN = Number.isNaN || function (a) {
	  return a !== a;
	};

	module.exports = Number.isFinite || function (x) {
	  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var fnToStr = Function.prototype.toString;

	var constructorRegex = /\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) {
				return false;
			}
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

	module.exports = function isCallable(value) {
		if (!value) {
			return false;
		}
		if (typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
			return false;
		}
		if (hasToStringTag) {
			return tryFunctionObject(value);
		}
		if (isES6ClassFn(value)) {
			return false;
		}
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toStr = Object.prototype.toString;

	var isPrimitive = __webpack_require__(25);

	var isCallable = __webpack_require__(23);

	// https://es5.github.io/#x8.12
	var ES5internalSlots = {
		'[[DefaultValue]]': function DefaultValue(O, hint) {
			var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};

	// https://es5.github.io/#x9
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isPrimitive(value) {
		return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(18);

	var zeroWidthSpace = '​';

	module.exports = function getPolyfill() {
		if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
			return String.prototype.trim;
		}
		return implementation;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var define = __webpack_require__(14);
	var getPolyfill = __webpack_require__(26);

	module.exports = function shimStringTrim() {
		var polyfill = getPolyfill();
		define(String.prototype, { trim: polyfill }, { trim: function trim() {
				return String.prototype.trim !== polyfill;
			} });
		return polyfill;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defined = __webpack_require__(6);
	var createDefaultStream = __webpack_require__(29);
	var Test = __webpack_require__(2);
	var createResult = __webpack_require__(33);
	var through = __webpack_require__(30);

	var canEmitExit = typeof process !== 'undefined' && process && typeof process.on === 'function' && process.browser !== true;
	var canExit = typeof process !== 'undefined' && process && typeof process.exit === 'function';

	var nextTick = typeof setImmediate !== 'undefined' ? setImmediate : process.nextTick;

	exports = module.exports = function () {
	    var harness;
	    var lazyLoad = function lazyLoad() {
	        return getHarness().apply(this, arguments);
	    };

	    lazyLoad.only = function () {
	        return getHarness().only.apply(this, arguments);
	    };

	    lazyLoad.createStream = function (opts) {
	        if (!opts) opts = {};
	        if (!harness) {
	            var output = through();
	            getHarness({ stream: output, objectMode: opts.objectMode });
	            return output;
	        }
	        return harness.createStream(opts);
	    };

	    lazyLoad.onFinish = function () {
	        return getHarness().onFinish.apply(this, arguments);
	    };

	    lazyLoad.getHarness = getHarness;

	    return lazyLoad;

	    function getHarness(opts) {
	        if (!opts) opts = {};
	        opts.autoclose = !canEmitExit;
	        if (!harness) harness = createExitHarness(opts);
	        return harness;
	    }
	}();

	function createExitHarness(conf) {
	    if (!conf) conf = {};
	    var harness = createHarness({
	        autoclose: defined(conf.autoclose, false)
	    });

	    var stream = harness.createStream({ objectMode: conf.objectMode });
	    var es = stream.pipe(conf.stream || createDefaultStream());
	    if (canEmitExit) {
	        es.on('error', function (err) {
	            harness._exitCode = 1;
	        });
	    }

	    var ended = false;
	    stream.on('end', function () {
	        ended = true;
	    });

	    if (conf.exit === false) return harness;
	    if (!canEmitExit || !canExit) return harness;

	    var inErrorState = false;

	    process.on('exit', function (code) {
	        // let the process exit cleanly.
	        if (code !== 0) {
	            return;
	        }

	        if (!ended) {
	            var only = harness._results._only;
	            for (var i = 0; i < harness._tests.length; i++) {
	                var t = harness._tests[i];
	                if (only && t.name !== only) continue;
	                t._exit();
	            }
	        }
	        harness.close();
	        process.exit(code || harness._exitCode);
	    });

	    return harness;
	}

	exports.createHarness = createHarness;
	exports.Test = Test;
	exports.test = exports; // tap compat
	exports.test.skip = Test.skip;

	var exitInterval;

	function createHarness(conf_) {
	    if (!conf_) conf_ = {};
	    var results = createResult();
	    if (conf_.autoclose !== false) {
	        results.once('done', function () {
	            results.close();
	        });
	    }

	    var test = function test(name, conf, cb) {
	        var t = new Test(name, conf, cb);
	        test._tests.push(t);

	        (function inspectCode(st) {
	            st.on('test', function sub(st_) {
	                inspectCode(st_);
	            });
	            st.on('result', function (r) {
	                if (!r.ok && typeof r !== 'string') test._exitCode = 1;
	            });
	        })(t);

	        results.push(t);
	        return t;
	    };
	    test._results = results;

	    test._tests = [];

	    test.createStream = function (opts) {
	        return results.createStream(opts);
	    };

	    test.onFinish = function (cb) {
	        results.on('done', cb);
	    };

	    var only = false;
	    test.only = function (name) {
	        if (only) throw new Error('there can only be one only test');
	        results.only(name);
	        only = true;
	        return test.apply(null, arguments);
	    };
	    test._exitCode = 0;

	    test.close = function () {
	        results.close();
	    };

	    return test;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var through = __webpack_require__(30);
	var fs = __webpack_require__(32);

	module.exports = function () {
	    var line = '';
	    var stream = through(write, flush);
	    return stream;

	    function write(buf) {
	        for (var i = 0; i < buf.length; i++) {
	            var c = typeof buf === 'string' ? buf.charAt(i) : String.fromCharCode(buf[i]);
	            if (c === '\n') flush();else line += c;
	        }
	    }

	    function flush() {
	        if (fs.writeSync && /^win/.test(process.platform)) {
	            try {
	                fs.writeSync(1, line + '\n');
	            } catch (e) {
	                stream.emit('error', e);
	            }
	        } else {
	            try {
	                console.log(line);
	            } catch (e) {
	                stream.emit('error', e);
	            }
	        }
	        line = '';
	    }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stream = __webpack_require__(31);

	// through
	//
	// a stream that does nothing but re-emit the input.
	// useful for aggregating a series of changing but not ending streams into one stream)

	exports = module.exports = through;
	through.through = through;

	//create a readable writable stream.

	function through(write, end, opts) {
	  write = write || function (data) {
	    this.queue(data);
	  };
	  end = end || function () {
	    this.queue(null);
	  };

	  var ended = false,
	      destroyed = false,
	      buffer = [],
	      _ended = false;
	  var stream = new Stream();
	  stream.readable = stream.writable = true;
	  stream.paused = false;

	  //  stream.autoPause   = !(opts && opts.autoPause   === false)
	  stream.autoDestroy = !(opts && opts.autoDestroy === false);

	  stream.write = function (data) {
	    write.call(this, data);
	    return !stream.paused;
	  };

	  function drain() {
	    while (buffer.length && !stream.paused) {
	      var data = buffer.shift();
	      if (null === data) return stream.emit('end');else stream.emit('data', data);
	    }
	  }

	  stream.queue = stream.push = function (data) {
	    //    console.error(ended)
	    if (_ended) return stream;
	    if (data === null) _ended = true;
	    buffer.push(data);
	    drain();
	    return stream;
	  };

	  //this will be registered as the first 'end' listener
	  //must call destroy next tick, to make sure we're after any
	  //stream piped from here.
	  //this is only a problem if end is not emitted synchronously.
	  //a nicer way to do this is to make sure this is the last listener for 'end'

	  stream.on('end', function () {
	    stream.readable = false;
	    if (!stream.writable && stream.autoDestroy) process.nextTick(function () {
	      stream.destroy();
	    });
	  });

	  function _end() {
	    stream.writable = false;
	    end.call(stream);
	    if (!stream.readable && stream.autoDestroy) stream.destroy();
	  }

	  stream.end = function (data) {
	    if (ended) return;
	    ended = true;
	    if (arguments.length) stream.write(data);
	    _end(); // will emit or queue
	    return stream;
	  };

	  stream.destroy = function () {
	    if (destroyed) return;
	    destroyed = true;
	    ended = true;
	    buffer.length = 0;
	    stream.writable = stream.readable = false;
	    stream.emit('close');
	    return stream;
	  };

	  stream.pause = function () {
	    if (stream.paused) return;
	    stream.paused = true;
	    return stream;
	  };

	  stream.resume = function () {
	    if (stream.paused) {
	      stream.paused = false;
	      stream.emit('resume');
	    }
	    drain();
	    //may have become paused again,
	    //as drain emits 'data'.
	    if (!stream.paused) stream.emit('drain');
	    return stream;
	  };
	  return stream;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(10).EventEmitter;
	var inherits = __webpack_require__(8);
	var through = __webpack_require__(30);
	var resumer = __webpack_require__(34);
	var inspect = __webpack_require__(35);
	var bind = __webpack_require__(12);
	var has = __webpack_require__(11);
	var regexpTest = bind.call(Function.call, RegExp.prototype.test);
	var yamlIndicators = /\:|\-|\?/;
	var nextTick = typeof setImmediate !== 'undefined' ? setImmediate : process.nextTick;

	module.exports = Results;
	inherits(Results, EventEmitter);

	function Results() {
	    if (!(this instanceof Results)) return new Results();
	    this.count = 0;
	    this.fail = 0;
	    this.pass = 0;
	    this._stream = through();
	    this.tests = [];
	}

	Results.prototype.createStream = function (opts) {
	    if (!opts) opts = {};
	    var self = this;
	    var output,
	        testId = 0;
	    if (opts.objectMode) {
	        output = through();
	        self.on('_push', function ontest(t, extra) {
	            if (!extra) extra = {};
	            var id = testId++;
	            t.once('prerun', function () {
	                var row = {
	                    type: 'test',
	                    name: t.name,
	                    id: id
	                };
	                if (has(extra, 'parent')) {
	                    row.parent = extra.parent;
	                }
	                output.queue(row);
	            });
	            t.on('test', function (st) {
	                ontest(st, { parent: id });
	            });
	            t.on('result', function (res) {
	                res.test = id;
	                res.type = 'assert';
	                output.queue(res);
	            });
	            t.on('end', function () {
	                output.queue({ type: 'end', test: id });
	            });
	        });
	        self.on('done', function () {
	            output.queue(null);
	        });
	    } else {
	        output = resumer();
	        output.queue('TAP version 13\n');
	        self._stream.pipe(output);
	    }

	    nextTick(function next() {
	        var t;
	        while (t = getNextTest(self)) {
	            t.run();
	            if (!t.ended) return t.once('end', function () {
	                nextTick(next);
	            });
	        }
	        self.emit('done');
	    });

	    return output;
	};

	Results.prototype.push = function (t) {
	    var self = this;
	    self.tests.push(t);
	    self._watch(t);
	    self.emit('_push', t);
	};

	Results.prototype.only = function (name) {
	    this._only = name;
	};

	Results.prototype._watch = function (t) {
	    var self = this;
	    var write = function write(s) {
	        self._stream.queue(s);
	    };
	    t.once('prerun', function () {
	        write('# ' + t.name + '\n');
	    });

	    t.on('result', function (res) {
	        if (typeof res === 'string') {
	            write('# ' + res + '\n');
	            return;
	        }
	        write(encodeResult(res, self.count + 1));
	        self.count++;

	        if (res.ok) self.pass++;else self.fail++;
	    });

	    t.on('test', function (st) {
	        self._watch(st);
	    });
	};

	Results.prototype.close = function () {
	    var self = this;
	    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
	    self.closed = true;
	    var write = function write(s) {
	        self._stream.queue(s);
	    };

	    write('\n1..' + self.count + '\n');
	    write('# tests ' + self.count + '\n');
	    write('# pass  ' + self.pass + '\n');
	    if (self.fail) write('# fail  ' + self.fail + '\n');else write('\n# ok\n');

	    self._stream.queue(null);
	};

	function encodeResult(res, count) {
	    var output = '';
	    output += (res.ok ? 'ok ' : 'not ok ') + count;
	    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';

	    if (res.skip) output += ' # SKIP';else if (res.todo) output += ' # TODO';

	    output += '\n';
	    if (res.ok) return output;

	    var outer = '  ';
	    var inner = outer + '  ';
	    output += outer + '---\n';
	    output += inner + 'operator: ' + res.operator + '\n';

	    if (has(res, 'expected') || has(res, 'actual')) {
	        var ex = inspect(res.expected);
	        var ac = inspect(res.actual);

	        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
	            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
	            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
	        } else {
	            output += inner + 'expected: ' + ex + '\n';
	            output += inner + 'actual:   ' + ac + '\n';
	        }
	    }
	    if (res.at) {
	        output += inner + 'at: ' + res.at + '\n';
	    }
	    if (res.operator === 'error' && res.actual && res.actual.stack) {
	        var lines = String(res.actual.stack).split('\n');
	        output += inner + 'stack: |-\n';
	        for (var i = 0; i < lines.length; i++) {
	            output += inner + '  ' + lines[i] + '\n';
	        }
	    }

	    output += outer + '...\n';
	    return output;
	}

	function getNextTest(results) {
	    if (!results._only) {
	        return results.tests.shift();
	    }

	    do {
	        var t = results.tests.shift();
	        if (!t) continue;
	        if (results._only === t.name) {
	            return t;
	        }
	    } while (results.tests.length !== 0);
	}

	function invalidYaml(str) {
	    return regexpTest(yamlIndicators, str);
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var through = __webpack_require__(30);
	var nextTick = typeof setImmediate !== 'undefined' ? setImmediate : process.nextTick;

	module.exports = function (write, end) {
	    var tr = through(write, end);
	    tr.pause();
	    var resume = tr.resume;
	    var pause = tr.pause;
	    var paused = false;

	    tr.pause = function () {
	        paused = true;
	        return pause.apply(this, arguments);
	    };

	    tr.resume = function () {
	        paused = false;
	        return resume.apply(this, arguments);
	    };

	    nextTick(function () {
	        if (!paused) tr.resume();
	    });

	    return tr;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function inspect_(obj, opts, depth, seen) {
	    if (!opts) opts = {};

	    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
	    if (depth === undefined) depth = 0;
	    if (depth >= maxDepth && maxDepth > 0 && obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	        return '[Object]';
	    }

	    if (seen === undefined) seen = [];else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj);
	    } else if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        return '[Function' + (name ? ': ' + name : '') + ']';
	    } else if (obj === null) {
	        return 'null';
	    } else if (isSymbol(obj)) {
	        var symString = Symbol.prototype.toString.call(obj);
	        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' ? 'Object(' + symString + ')' : symString;
	    } else if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) s += '...';
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    } else if (isArray(obj)) {
	        if (obj.length === 0) return '[]';
	        var xs = Array(obj.length);
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    } else if (isError(obj)) {
	        var parts = [];
	        for (var key in obj) {
	            if (!has(obj, key)) continue;

	            if (/[^\w$]/.test(key)) {
	                parts.push(inspect(key) + ': ' + inspect(obj[key]));
	            } else {
	                parts.push(key + ': ' + inspect(obj[key]));
	            }
	        }
	        if (parts.length === 0) return '[' + obj + ']';
	        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
	    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.inspect === 'function') {
	        return obj.inspect();
	    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !isDate(obj) && !isRegExp(obj)) {
	        var xs = [],
	            keys = [];
	        for (var key in obj) {
	            if (has(obj, key)) keys.push(key);
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (/[^\w$]/.test(key)) {
	                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
	            } else xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	        if (xs.length === 0) return '{}';
	        return '{ ' + xs.join(', ') + ' }';
	    } else return String(obj);
	};

	function quote(s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray(obj) {
	    return toStr(obj) === '[object Array]';
	}
	function isDate(obj) {
	    return toStr(obj) === '[object Date]';
	}
	function isRegExp(obj) {
	    return toStr(obj) === '[object RegExp]';
	}
	function isError(obj) {
	    return toStr(obj) === '[object Error]';
	}
	function isSymbol(obj) {
	    return toStr(obj) === '[object Symbol]';
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) {
	    return key in this;
	};
	function has(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr(obj) {
	    return Object.prototype.toString.call(obj);
	}

	function nameOf(f) {
	    if (f.name) return f.name;
	    var m = f.toString().match(/^function\s*([\w$]+)/);
	    if (m) return m[1];
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	}

	function isElement(x) {
	    if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object') return false;
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str) {
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return "'" + s + "'";

	    function lowbyte(c) {
	        var n = c.charCodeAt(0);
	        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
	        if (x) return '\\' + x;
	        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
	    }
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function hello(name) {
	  var format = function format() {
	    return 'Hello, ' + (name || 'Anonymous') + '!';
	  };

	  return '' + format();
	}

	exports.default = hello;

/***/ }
/******/ ]);