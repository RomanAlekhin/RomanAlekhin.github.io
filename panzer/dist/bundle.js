webpackJsonp([0],[
/* 0 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_export.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 20);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_an-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_global.js ***!
  \**************************************/
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_fails.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-object.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_wks.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 53)('wks');
var uid = __webpack_require__(/*! ./_uid */ 43);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-length.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_descriptors.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_object-dp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 118);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_to-object.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */,
/* 11 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_a-function.js ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_hide.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 39);
module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_redefine.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 15);
var SRC = __webpack_require__(/*! ./_uid */ 43)('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ 200);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 20).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-html.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 25);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_has.js ***!
  \***********************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopd.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 52);
var createDesc = __webpack_require__(/*! ./_property-desc */ 39);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var has = __webpack_require__(/*! ./_has */ 15);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 118);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-gpo.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 15);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 93)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-iobject.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 51);
var defined = __webpack_require__(/*! ./_defined */ 25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_cof.js ***!
  \***********************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_core.js ***!
  \************************************/
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.10' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_ctx.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_strict-method.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_to-integer.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_array-methods.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var IObject = __webpack_require__(/*! ./_iobject */ 51);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var asc = __webpack_require__(/*! ./_array-species-create */ 77);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_defined.js ***!
  \***************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-sap.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 20);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_to-primitive.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_metadata.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 140);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 53)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 144))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_typed-array.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 7)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 32);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 69);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 98);
  var ctx = __webpack_require__(/*! ./_ctx */ 21);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 39);
  var hide = __webpack_require__(/*! ./_hide */ 12);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
  var toLength = __webpack_require__(/*! ./_to-length */ 6);
  var toIndex = __webpack_require__(/*! ./_to-index */ 138);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
  var has = __webpack_require__(/*! ./_has */ 15);
  var classof = __webpack_require__(/*! ./_classof */ 46);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 84);
  var create = __webpack_require__(/*! ./_object-create */ 36);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 100);
  var uid = __webpack_require__(/*! ./_uid */ 43);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 24);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 57);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 54);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 101);
  var Iterators = __webpack_require__(/*! ./_iterators */ 47);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 62);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 41);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 76);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 110);
  var $DP = __webpack_require__(/*! ./_object-dp */ 8);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./src/battleEngine/entities/Weapon.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geometry = __webpack_require__(/*! ../../utils/geometry */ 56);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debugAttack = true;

var Weapon = function () {
    function Weapon(engine, unit, name) {
        var stats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Weapon);

        this.engine = engine;

        stats = Object.assign({}, Weapon.defaultStats, stats);
        Object.assign(this, stats);

        this.name = name;
        this.unit = unit;
        this.ammo = this.maxAmmo;
        this.icon = stats.icon;
        this.state = 'NO_ACTION';
        this.frame = -1;

        this.used = false; // Is weapon used in this frame.

        this.resolveAction = {
            NO_ACTION: undefined,
            ATTACK: this.resolveAttack,
            COOLDOWN: this.resolveCooldown,
            RELOAD: this.resolveReload
        };
    }

    _createClass(Weapon, [{
        key: 'destroy',
        value: function destroy() {
            if (this.meleeEffect !== undefined) this.meleeEffect.destroy();
        }

        // Perform every frame.

    }, {
        key: 'update',
        value: function update() {
            if (this.requiresAmmo && this.unit.actions.reloading && this.state === 'NO_ACTION' && this.ammo < this.maxAmmo) {
                this.startReload();
            }
            if (this.isUsed && this.state === 'NO_ACTION') {
                // Check ammo.
                if (this.requiresAmmo) {
                    if (this.ammo > 0) {
                        this.startAttack();
                        this.ammo--;
                    } else {
                        if (debugAttack) console.log('need to reload!');
                        this.startReload();
                    }
                } else {
                    this.startAttack();
                }
            }

            if (this.state !== 'NO_ACTION' && this.frame <= 0) {
                // Action finished.
                this.resolveAction[this.state].apply(this);
            } else {
                this.frame--;

                if (this.state === 'ATTACK' && !this.isShooting && this.meleeEffect !== undefined) {
                    this.meleeEffect.update();
                }

                if (debugAttack) {
                    switch (this.state) {
                        case 'ATTACK':
                            console.log('attack in progress!');
                            break;
                        case 'COOLDOWN':
                            console.log('cooldown in progress!');
                            break;
                        case 'RELOAD':
                            console.log('reload in progress!');
                            break;
                    }
                }
            }
        }
    }, {
        key: 'startAttack',
        value: function startAttack() {
            this.state = 'ATTACK';
            this.frame = this.delayBeforeAttack;
            if (!this.isShooting && this.showMeleeEffect) this.meleeEffect = new MeleeEffect(this);
            this.engine.game.soundsManager.playSound(this.name);
            if (debugAttack) console.log('attack started'); // DEBUG
        }
    }, {
        key: 'resolveAttack',
        value: function resolveAttack() {
            if (this.isShooting) {
                this.shot();
            } else {
                this.hitWithMeleeWeapon();
            }
            this.startCooldown();
        }
    }, {
        key: 'startCooldown',
        value: function startCooldown() {
            this.state = 'COOLDOWN';
            this.frame = this.delayAfterAttack;
        }
    }, {
        key: 'resolveCooldown',
        value: function resolveCooldown() {
            this.state = 'NO_ACTION';
            if (debugAttack) console.log('cooldown finished!');
        }
    }, {
        key: 'startReload',
        value: function startReload() {
            this.state = 'RELOAD';
            this.frame = this.delayReload;
        }
    }, {
        key: 'resolveReload',
        value: function resolveReload() {
            this.state = 'NO_ACTION';
            this.ammo = this.maxAmmo;
            if (debugAttack) console.log('reload finished!'); // DEBUG
        }

        // Perform shot from weapon.

    }, {
        key: 'shot',
        value: function shot() {
            console.log('!!!shot!!!');
            var shooter = this.unit;
            this.engine.level.data.shots++;

            var point = (0, _geometry.getSpriteOffsetPointByAnchor)(shooter, shooter.points[this.point]);

            var additional = {
                damage: this.addDamage,
                speed: this.addProjectileSpeed
            };

            var projectile = new this.ProjectileType(this.engine, point.x, point.y, this.unit.angle + (Math.random() - 0.5) * this.deflectAngle * 2, additional);
            return projectile;
        }
    }, {
        key: 'hitWithMeleeWeapon',


        // Perform melee weapon attack.
        value: function hitWithMeleeWeapon() {
            var _this = this;

            var attacker = this.unit;
            var groupToCheck = attacker.role === 'hero' ? this.engine.enemies : attacker.role === 'enemy' || attacker.role === 'boss' ? [this.engine.hero] : [];
            var unitsHit = this.engine.physics.getHitUnits(this, groupToCheck);
            unitsHit.forEach(function (unit) {
                unit.takeDamage(_this.addDamage);
            });
            if (this.meleeEffect !== undefined) this.meleeEffect.destroy();
        }
    }]);

    return Weapon;
}();

exports.default = Weapon;


Weapon.defaultStats = { // Intervals counted in frames.
    delayBeforeAttack: 0, // Interval between start of attack and actual attack executing (damage dealing for
    // melee attack or projectile fire for shooting attack).
    delayAfterAttack: 10, // Interval between end of attack and possibility of starting new attack.
    range: 75, // For melee only - range from which melee attack can hit the target.
    hitAngle: 90, // For melee only - angle of possible hit.
    isShooting: true,
    addDamage: 0,
    addProjectileSpeed: 0,
    twoHanded: false,

    requiresAmmo: true,
    maxAmmo: 12,
    delayReload: 30,

    showMeleeEffect: false,
    point: 'default',
    deflectAngle: 10
};

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_add-to-unscopables.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_library.js ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_meta.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 43)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 15);
var setDesc = __webpack_require__(/*! ./_object-dp */ 8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_an-instance.js ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_for-of.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var call = __webpack_require__(/*! ./_iter-call */ 121);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 84);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 100);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-create.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 127);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 80);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 93)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 79)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 82).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gopn.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 129);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 80).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-keys.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 129);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 80);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 39 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_property-desc.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_redefine-all.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_set-species.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 42 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_to-absolute-index.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 43 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./~/core-js/modules/_uid.js ***!
  \***********************************/
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 44 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_validate-collection.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 45 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/battleEngine/entities/Unit.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _DefaultWeapon = __webpack_require__(/*! ./default/DefaultWeapon */ 151);

var _DefaultWeapon2 = _interopRequireDefault(_DefaultWeapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Unit = function (_Phaser$Sprite) {
    _inherits(Unit, _Phaser$Sprite);

    function Unit(engine, x, y, angle, assetName, parentGroup) {
        var stats = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

        _classCallCheck(this, Unit);

        var _this = _possibleConstructorReturn(this, (Unit.__proto__ || Object.getPrototypeOf(Unit)).call(this, engine.game, x, y, assetName));

        _this.angle = angle; // Direction of unit's facing.
        parentGroup.addChild(_this);
        _this.engine = engine;

        if (_this.key === '__missing') {
            debugger;
            _this.key = assetName; // Need this to get access to textures config.
        }

        _this.initStats(stats);
        _this.initPhysics();

        // Init weapons.
        if (_this.weapon1 !== undefined) _this.weapon1 = new _this.weapon1(_this.engine, _this);
        if (_this.weapon2 !== undefined) _this.weapon2 = new _this.weapon2(_this.engine, _this);

        engine.game.texturesManager.initSpriteSettings(_this);
        engine.game.texturesManager.initSpritePoints(_this); // Set attack points.
        // if (engine.game.texturesManager.spriteIsDynamic(assetName)) this.createDynamicSprite()

        // if (stats.weapon1 !== undefined) {
        //     if (attackPoints !== undefined) {
        //         this.weapon1.attackPoint = this.weapon1.twoHanded ? attackPoints.middle : this.weapon1.attackPoint = attackPoints.left
        //     } else {
        //         this.weapon1.attackPoint = { offset: 0, distance: 35 }
        //     }
        // };
        // if (stats.weapon2 !== undefined) {
        //     if (attackPoints !== undefined) {
        //         this.weapon2.attackPoint = attackPoints.right
        //     } else {
        //         this.weapon2.attackPoint = { offset: 45, distance: 30 }
        //     }
        // }
        return _this;
    }

    _createClass(Unit, [{
        key: 'initStats',
        value: function initStats(stats) {
            stats = Object.assign({}, Unit.defaultStats, stats);
            Object.assign(this, stats);
            this.hp = this.hpMax * stats.hp;
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            this.engine.physics.initPhysicsForUnit(this);
        }

        // createDynamicSprite () {
        //     const txManager = this.engine.game.texturesManager

        //     this.spriteParts = this.game.add.group(this, 'spriteParts')
        //     this.addChild(this.spriteParts)

        //     // Create sprite for body.
        //     this.spriteParts.add(txManager.createSpriteByName(0, 0, txManager.getDynamicBodyAsset(this.assetName)))
        //     // Set dynamic sprite.
        //     // this.weaponSprites = {
        //     //     left: this.weapon1 ? txManager.createSpriteByName(0, 0, txManager.getDynamicWeaponAssetByKey(assetName, this.weapon1.sprite, false)) : undefined,
        //     //     right: this.weapon2 ? txManager.createSpriteByName(0, 0, txManager.getDynamicWeaponAssetByKey(assetName, this.weapon2.sprite, true)) : undefined
        //     // }
        //     if (this.weapon1 !== undefined) {
        //         this.spriteParts.add(txManager.createSpriteByName(0, 0, txManager.getDynamicWeaponAssetByKey(this.assetName, this.weapon1.sprite, false)))
        //     }

        //     if (this.weapon2 !== undefined) {
        //         this.spriteParts.add(txManager.createSpriteByName(0, 0, txManager.getDynamicWeaponAssetByKey(this.assetName, this.weapon2.sprite, true)))
        //     }
        //     // if (this.weaponSprites.left !== undefined) {
        //     //     this.weaponSprites.left.parent = this.sprite
        //     // }
        //     // if (this.weaponSprites.right !== undefined) {
        //     //     this.weaponSprites.right.parent = this.sprite
        //     // }
        // }

    }, {
        key: 'createHpBar',
        value: function createHpBar() {}
    }, {
        key: 'update',
        value: function update() {
            if (this.hp > 0) {
                this.updateStats();

                this.controller.setActions();
                this.engine.physics.moveUnit(this); // Implemented in physics.js module

                this.updateAnimations();

                if (this.weapon1 !== undefined) {
                    this.weapon1.isUsed = this.actions.attacking1;
                    this.weapon1.update();
                }
                if (this.weapon2 !== undefined) {
                    this.weapon2.isUsed = this.actions.attacking2;
                    this.weapon2.update();
                }

                if (this.updateAdditional) this.updateAdditional();
            }
        }
    }, {
        key: 'updateStats',
        value: function updateStats() {
            if (this.hp < this.hpMax) {
                this.hp += this.hpMax * this.hpRegen / 100;
                if (this.hp > this.hpMax) this.hp = this.hpMax;
            };
        }
    }, {
        key: 'updateAnimations',
        value: function updateAnimations() {
            this.angle = this.actions.angle;
            if (this.actions.moving) {
                this.animations.play('move', this.animationSpeed || 10, true);
            } else {
                this.animations.play('idle');
            }
        }
    }, {
        key: 'takeDamage',
        value: function takeDamage(damage) {
            this.hp -= damage;
            if (this.hp <= 0) {
                this.remove();
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.kill(); // Run this action first because onKilled handler of engine refers to role property.
            this.createCorpse();

            if (this.weapon1) this.weapon1.destroy();
            if (this.weapon2) this.weapon2.destroy();

            // // Kill attached sprites with weapons (dynamic sprite).
            // if (this.weaponSprites !== undefined) {
            //     if (this.weapon1 !== undefined) this.weaponSprites.left.kill()
            //     if (this.weapon2 !== undefined) this.weaponSprites.right.kill()
            // }

            // this.parent.removeChild(this)

            if (this.role === 'hero') {
                // debugger
                if (!this.deathFrameCount || this.deathFrameCount < 20) {
                    // this.engine.createTheGuts(this)
                    this.deathFrameCount = this.deathFrameCount && this.deathFrameCount++ || 0;
                }
            } else if (this.role === 'enemy' || this.role === 'boss') {
                // this.engine.createTheGuts(this)
                // debugger
                // this.engine.score += 1000
            }

            this.destroy();
        }
    }, {
        key: 'createCorpse',
        value: function createCorpse() {
            this.engine.factory.createTheGuts(this.x, this.y, this.deathColor);
        }
    }]);

    return Unit;
}(_phaser2.default.Sprite);

exports.default = Unit;


Unit.defaultStats = {
    hpMax: 100,
    hp: 1, // 1 means that unit is created with 100% of its max HP. If you want create damaged unit, use value from 0 to 1.
    hpRegen: 1 / 60, // HP regen (in %) per frame
    speed: 100,
    weapon1: _DefaultWeapon2.default,
    deathColor: 'red',
    physicalSize: 20,

    // TODO - init weapons here
    weapons: {
        weapon1: _DefaultWeapon2.default
    }
};

/***/ }),
/* 46 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_classof.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 19);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 47 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iterators.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_set-to-string-tag.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 8).f;
var has = __webpack_require__(/*! ./_has */ 15);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 49 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_string-trim.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 25);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 96);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 50 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_flags.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 51 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_iobject.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-pie.js ***!
  \******************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 53 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_shared.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ 20);
var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ 32) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 54 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_species-constructor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 55 */,
/* 56 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/utils/geometry.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// import Phaser from 'phaser'

// // Converts angles (in degrees) from -180 to 0 to positive values from 180 to 360.
// export const angleTo360 = (angle) => {
//     if (angle < 0) angle += 360
//     return angle
// }


// // TODO - delete ?
// export const angleToPoint = (point1, point2) => {
//     const angle = Phaser.Physics.arcade.angleToXY(point1, point2.x, point2.y)
//     return angle
// }

// Converts from radians to degrees.
var radToDeg = exports.radToDeg = function radToDeg(radians) {
    return radians * 180 / Math.PI;
};

// Converts from degrees to radians.
var degToRad = exports.degToRad = function degToRad(degrees) {
    return degrees * Math.PI / 180;
};

// Check if angle is in interval from (midAngle - angleInterval) to (midAngle + angleInterval).
var isInAngle = exports.isInAngle = function isInAngle(angle, midAngle, angleInterval) {
    var deflection = midAngle - angle;
    if (deflection > 180) deflection -= 360;
    if (deflection < -180) deflection += 360;
    return Math.abs(deflection) <= angleInterval / 2; // .toString() + "  " + Math.abs(deflection);
};

// Angle is in degrees.
var getOffsetPoint = exports.getOffsetPoint = function getOffsetPoint(x, y, angle, distance) {
    var newX = x + Math.cos(degToRad(angle)) * distance;
    var newY = y + Math.sin(degToRad(angle)) * distance;
    return { x: newX, y: newY };
};

// Angle is in degrees.
var getSpriteOffsetPointByAnchor = exports.getSpriteOffsetPointByAnchor = function getSpriteOffsetPointByAnchor(sprite, pointAnchor) {
    // const offsetX = sprite.width * (pointAnchor.x - sprite.anchor.x)
    // const offsetY = sprite.height * (pointAnchor.y - sprite.anchor.y)
    // const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
    // return getOffsetPoint(sprite.x, sprite.y, sprite.angle, distance)

    var offsetX = sprite.width * (pointAnchor.x - sprite.anchor.x);
    var offsetY = sprite.height * (pointAnchor.y - sprite.anchor.y);
    var radAngle = Math.atan2(offsetX, offsetY);
    var degAngle = radToDeg(radAngle);
    var distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    return getOffsetPoint(sprite.x, sprite.y, sprite.angle + degAngle, distance);
};

/***/ }),
/* 57 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_array-includes.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 58 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_collection.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
var meta = __webpack_require__(/*! ./_meta */ 33);
var forOf = __webpack_require__(/*! ./_for-of */ 35);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 62);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 83);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 59 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_fix-re-wks.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.exec */ 141);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var hide = __webpack_require__(/*! ./_hide */ 12);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 25);
var wks = __webpack_require__(/*! ./_wks */ 5);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 91);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 60 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_is-array.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 61 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_is-regexp.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 19);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 62 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-detect.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 63 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_object-forced-pam.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 32) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 64 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_object-gops.js ***!
  \*******************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 65 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_regexp-exec-abstract.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ./_classof */ 46);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 66 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_set-collection-from.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var forOf = __webpack_require__(/*! ./_for-of */ 35);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 67 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_set-collection-of.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 68 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-at.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var defined = __webpack_require__(/*! ./_defined */ 25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 69 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/core-js/modules/_typed.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var uid = __webpack_require__(/*! ./_uid */ 43);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 70 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_user-agent.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 71 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./src/battleEngine/entities/Projectile.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projectile = function (_Phaser$Sprite) {
    _inherits(Projectile, _Phaser$Sprite);

    // additional - contains additional speed or damage that will be added to base value (according to gun or special ability).
    function Projectile(engine, x, y, direction, assetName) {
        var stats = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var additional = arguments[6];

        _classCallCheck(this, Projectile);

        var _this = _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this, engine.game, x, y, assetName));

        _this.engine = engine;

        engine.projectiles.addChild(_this);
        engine.physics.initPhysicsForProjectile(_this);

        stats = Object.assign({}, Projectile.defaultStats, stats);
        Object.assign(_this, stats);

        if (additional === undefined) additional = { damage: 0, speed: 0 };
        _this.damage += additional.damage;
        _this.speed += additional.speed;

        _this.angle = direction;
        return _this;
    }

    _createClass(Projectile, [{
        key: 'update',
        value: function update() {
            if (this.lifeTime <= 0) {
                this.remove();
            } else {
                this.lifeTime--;
                this.engine.physics.moveProjectile(this); // Implemented in physics.js module
            };
        }

        // What happens when projectile hits unit.

    }, {
        key: 'hit',
        value: function hit(unit) {
            unit.takeDamage(this.damage);
            if (!this.data.hit) {
                this.engine.level.data.hits++;
                this.data.hit = true; // If projectile hit at least one target it can't score any further hits.
            }
            if (unit.hp > 0) {
                this.remove();
            };
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.engine.projectiles.removeChild(this);
            this.destroy();
        }
    }]);

    return Projectile;
}(_phaser2.default.Sprite);

exports.default = Projectile;


Projectile.defaultStats = {
    speed: 1000,
    damage: 20,
    lifeTime: 60,
    icon: 'bullet'
};

/***/ }),
/* 72 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./src/battleEngine/entities/effects/Dialog.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ = __webpack_require__(/*! . */ 152);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Represents text message rendered over unit's head.
var Dialog = function (_Effect) {
    _inherits(Dialog, _Effect);

    function Dialog(engine, unit, phrase) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, engine, unit.x, unit.y - 50, 0, phrase, 180));

        _this.unit = unit;
        return _this;
    }

    return Dialog;
}(_2.default);

exports.default = Dialog;

/***/ }),
/* 73 */
/* no static exports found */
/* all exports used */
/*!*****************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/projectiles/RedBullet.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Projectile2 = __webpack_require__(/*! ../../../battleEngine/entities/Projectile */ 71);

var _Projectile3 = _interopRequireDefault(_Projectile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RedBullet = function (_Projectile) {
    _inherits(RedBullet, _Projectile);

    function RedBullet(engine, x, y, direction, additional) {
        _classCallCheck(this, RedBullet);

        return _possibleConstructorReturn(this, (RedBullet.__proto__ || Object.getPrototypeOf(RedBullet)).call(this, engine, x, y, direction, 'red_plasma', {}, additional));
    }

    return RedBullet;
}(_Projectile3.default);

exports.default = RedBullet;

/***/ }),
/* 74 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/utils/randomization.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getRandomInt = exports.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomDegAngle = exports.getRandomDegAngle = function getRandomDegAngle() {
    return Math.random() * 360;
};

var getRandomRadAngle = exports.getRandomRadAngle = function getRandomRadAngle() {
    return Math.random() * Math.PI * 2;
};

// Variates parameter in percentage.
var variate = exports.variate = function variate(value, varitationRate) {
    var quadratic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var variation = quadratic ? Math.random() + Math.random() - 1 : Math.random() * 2 - 1;
    return value * (1 + variation * varitationRate);
};

/***/ }),
/* 75 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_advance-string-index.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(/*! ./_string-at */ 68)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 76 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_array-fill.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 77 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_array-species-create.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 196);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 78 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_create-property.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 39);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 79 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_dom-create.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 80 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_enum-bug-keys.js ***!
  \*********************************************/
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 81 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_fails-is-regexp.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 82 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_html.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 83 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_inherit-if-required.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 92).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 84 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_is-array-iter.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 85 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-create.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 36);
var descriptor = __webpack_require__(/*! ./_property-desc */ 39);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 12)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 86 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_iter-define.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 32);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var hide = __webpack_require__(/*! ./_hide */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 85);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 87 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-expm1.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 88 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_math-sign.js ***!
  \*****************************************/
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 89 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_microtask.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 97).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 90 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/_new-promise-capability.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 91 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_regexp-exec.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./_flags */ 50);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 92 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_set-proto.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 21)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 93 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_shared-key.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 53)('keys');
var uid = __webpack_require__(/*! ./_uid */ 43);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 94 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_string-context.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 61);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 95 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_string-repeat.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 96 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_string-ws.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 97 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_task.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var invoke = __webpack_require__(/*! ./_invoke */ 119);
var html = __webpack_require__(/*! ./_html */ 82);
var cel = __webpack_require__(/*! ./_dom-create */ 79);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 98 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_typed-buffer.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var LIBRARY = __webpack_require__(/*! ./_library */ 32);
var $typed = __webpack_require__(/*! ./_typed */ 69);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toIndex = __webpack_require__(/*! ./_to-index */ 138);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 76);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 99 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_wks-define.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 20);
var LIBRARY = __webpack_require__(/*! ./_library */ 32);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 139);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 100 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/core.get-iterator-method.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 46);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
module.exports = __webpack_require__(/*! ./_core */ 20).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 101 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 31);
var step = __webpack_require__(/*! ./_iter-step */ 122);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 86)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/* no static exports found */
/* all exports used */
/*!******************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/projectiles/BlueBullet.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Projectile2 = __webpack_require__(/*! ../../../battleEngine/entities/Projectile */ 71);

var _Projectile3 = _interopRequireDefault(_Projectile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlueBullet = function (_Projectile) {
    _inherits(BlueBullet, _Projectile);

    function BlueBullet(engine, x, y, direction, additional) {
        _classCallCheck(this, BlueBullet);

        return _possibleConstructorReturn(this, (BlueBullet.__proto__ || Object.getPrototypeOf(BlueBullet)).call(this, engine, x, y, direction, 'blue_plasma', {}, additional));
    }

    return BlueBullet;
}(_Projectile3.default);

exports.default = BlueBullet;

/***/ }),
/* 106 */
/* no static exports found */
/* all exports used */
/*!******************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/projectiles/BossBullet.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Projectile2 = __webpack_require__(/*! ../../../battleEngine/entities/Projectile */ 71);

var _Projectile3 = _interopRequireDefault(_Projectile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BossBullet = function (_Projectile) {
    _inherits(BossBullet, _Projectile);

    function BossBullet(engine, x, y, direction, additional) {
        _classCallCheck(this, BossBullet);

        var _this = _possibleConstructorReturn(this, (BossBullet.__proto__ || Object.getPrototypeOf(BossBullet)).call(this, engine, x, y, direction, 'roach', {
            speed: 300,
            damage: 20,
            lifeTime: 120,
            icon: 'bullet'
        }, additional));

        _this.play('death');
        return _this;
    }

    return BossBullet;
}(_Projectile3.default);

exports.default = BossBullet;

/***/ }),
/* 107 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/Marine.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Marine = function (_Unit) {
    _inherits(Marine, _Unit);

    function Marine(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, Marine);

        return _possibleConstructorReturn(this, (Marine.__proto__ || Object.getPrototypeOf(Marine)).call(this, engine, x, y, angle,
        // 'marine',
        'soldier', parentGroup, {
            speed: 300,
            hpRegen: 0.5 / 60,
            weapon1: engine.game.data.chosenWeapon1,
            weapon2: engine.game.data.chosenWeapon2 ? engine.game.data.chosenWeapon2 : undefined,

            hpMax: 100000
        }));
        // this.animations.play('idle', 10, true);
    }

    return Marine;
}(_Unit3.default);

exports.default = Marine;

/***/ }),
/* 108 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/Minigun.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _BlueBullet = __webpack_require__(/*! ../projectiles/BlueBullet */ 105);

var _BlueBullet2 = _interopRequireDefault(_BlueBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Minigun = function (_Weapon) {
    _inherits(Minigun, _Weapon);

    function Minigun(engine, unit) {
        _classCallCheck(this, Minigun);

        return _possibleConstructorReturn(this, (Minigun.__proto__ || Object.getPrototypeOf(Minigun)).call(this, engine, unit, 'Minigun', {
            ProjectileType: _BlueBullet2.default,
            delayBeforeAttack: 0,
            delayAfterAttack: 2,
            addDamage: 20 * 5,
            addProjectileSpeed: 10,
            maxAmmo: 100 * 10,
            delayReload: 300,
            twoHanded: true,
            icon: 'machine_gun_icon',
            sprite: 'machinegun'
        }));
    }

    return Minigun;
}(_Weapon3.default);

exports.default = Minigun;


Minigun.icon = 'machine_gun_icon';

/***/ }),
/* 109 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_a-number-value.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 110 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_array-copy-within.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 111 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/_array-from-iterable.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 35);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 112 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/_array-reduce.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 51);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 113 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/core-js/modules/_bind.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 119);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 114 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_collection-strong.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var create = __webpack_require__(/*! ./_object-create */ 36);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var forOf = __webpack_require__(/*! ./_for-of */ 35);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 86);
var step = __webpack_require__(/*! ./_iter-step */ 122);
var setSpecies = __webpack_require__(/*! ./_set-species */ 41);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var fastKey = __webpack_require__(/*! ./_meta */ 33).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 115 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_collection-to-json.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 46);
var from = __webpack_require__(/*! ./_array-from-iterable */ 111);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 116 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_collection-weak.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
var getWeak = __webpack_require__(/*! ./_meta */ 33).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var forOf = __webpack_require__(/*! ./_for-of */ 35);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 24);
var $has = __webpack_require__(/*! ./_has */ 15);
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 117 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_flatten-into-array.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 60);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 118 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/_ie8-dom-define.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 7) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 79)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 119 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/_invoke.js ***!
  \**************************************/
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 120 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_is-integer.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 121 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-call.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 122 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_iter-step.js ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 123 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_math-fround.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 88);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 124 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-log1p.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 125 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_math-scale.js ***!
  \******************************************/
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 126 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/_object-assign.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var getKeys = __webpack_require__(/*! ./_object-keys */ 38);
var gOPS = __webpack_require__(/*! ./_object-gops */ 64);
var pIE = __webpack_require__(/*! ./_object-pie */ 52);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 51);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 127 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_object-dps.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 38);

module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 128 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-gopn-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 129 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/_object-keys-internal.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 15);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 57)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 93)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 130 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_object-to-array.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var getKeys = __webpack_require__(/*! ./_object-keys */ 38);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var isEnum = __webpack_require__(/*! ./_object-pie */ 52).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 131 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_own-keys.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37);
var gOPS = __webpack_require__(/*! ./_object-gops */ 64);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 132 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/_parse-float.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 96) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 133 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_parse-int.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 96);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 134 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_perform.js ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 135 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/_promise-resolve.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 90);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 136 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_same-value.js ***!
  \******************************************/
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 137 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/_string-pad.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var repeat = __webpack_require__(/*! ./_string-repeat */ 95);
var defined = __webpack_require__(/*! ./_defined */ 25);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 138 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_to-index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 139 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/_wks-ext.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 140 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.map.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 114);
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 58)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 141 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.exec.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 91);
__webpack_require__(/*! ./_export */ 0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 142 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.flags.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 7) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 50)
});


/***/ }),
/* 143 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/core-js/modules/es6.set.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 114);
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 58)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 144 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-map.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var each = __webpack_require__(/*! ./_array-methods */ 24)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var meta = __webpack_require__(/*! ./_meta */ 33);
var assign = __webpack_require__(/*! ./_object-assign */ 126);
var weak = __webpack_require__(/*! ./_collection-weak */ 116);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var NATIVE_WEAK_MAP = __webpack_require__(/*! ./_validate-collection */ 44);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 58)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 145 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(/*! ./config */ 186);

var _config2 = _interopRequireDefault(_config);

var _CaptainSlayerGame2 = __webpack_require__(/*! ./captainSlayer/CaptainSlayerGame */ 162);

var _CaptainSlayerGame3 = _interopRequireDefault(_CaptainSlayerGame2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_CaptainSlayerGame) {
    _inherits(Game, _CaptainSlayerGame);

    function Game() {
        _classCallCheck(this, Game);

        var gameWidth = _config2.default.gameWidth,
            gameHeight = _config2.default.gameHeight,
            targetFPS = _config2.default.targetFPS;
        return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, gameWidth, gameHeight, targetFPS));
    }

    return Game;
}(_CaptainSlayerGame3.default);

window.game = new Game();

/***/ }),
/* 146 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/babel-polyfill/lib/index.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 394);

__webpack_require__(/*! regenerator-runtime/runtime */ 194);

__webpack_require__(/*! core-js/fn/regexp/escape */ 195);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 55)))

/***/ }),
/* 147 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/battleEngine/config.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tintRange: 80
};

/***/ }),
/* 148 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./src/battleEngine/entities/AiBot.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AiBot = function () {
    function AiBot(engine, unit) {
        _classCallCheck(this, AiBot);

        this.engine = engine;
        this.game = engine.game;
        this.unit = unit;

        this.shootingWeaponsUsageRange = 400;
    }

    // Set simple actions for current frame.


    _createClass(AiBot, [{
        key: "getActions",
        value: function getActions() {
            var strategy = this.strategy,
                unit = this.unit;


            var actions = {
                angle: unit.angle,
                moving: false,
                attacking1: false,
                attacking2: false,
                reloading: false
            };

            var angleTarget = strategy.targetUnit || strategy.targetPoint;
            if (angleTarget) {
                // Rotate to position of target point.
                actions.angle = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(unit, angleTarget.x, angleTarget.y));
            }

            // Try to get target moving point.
            var moveTo = strategy.targetPoint || strategy.targetUnit;
            if (moveTo) {
                actions.moving = true;
                actions.movementDirection = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(unit, moveTo.x, moveTo.y));
            }

            if (strategy.targetUnit) {
                var allWeaponsAreInRange = true;

                if (unit.weapon1) {
                    var weapon1Range = unit.weapon1.isShooting ? this.shootingWeaponsUsageRange : unit.weapon1.range;
                    if (this.game.physics.arcade.distanceBetween(unit, strategy.targetUnit) <= weapon1Range) {
                        actions.attacking1 = true;
                    } else {
                        allWeaponsAreInRange = false;
                    }
                }

                if (unit.weapon2) {
                    var weapon2Range = unit.weapon2.isShooting ? 300 : unit.weapon2.range;
                    if (this.game.physics.arcade.distanceBetween(unit, strategy.targetUnit) <= weapon2Range) {
                        actions.attacking2 = true;
                    } else {
                        allWeaponsAreInRange = false;
                    }
                }

                if (allWeaponsAreInRange) actions.moving = false;
            }

            return actions;
        }
    }]);

    return AiBot;
}();

exports.default = AiBot;

/***/ }),
/* 149 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./src/battleEngine/entities/Level.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomization = __webpack_require__(/*! ../../utils/randomization */ 74);

var _Marine = __webpack_require__(/*! ../../captainSlayer/gameEntities/units/Marine */ 107);

var _Marine2 = _interopRequireDefault(_Marine);

var _Dialog = __webpack_require__(/*! ./effects/Dialog */ 72);

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Represents current game level.
var Level = function () {
    function Level(engine, width, height) {
        _classCallCheck(this, Level);

        this.engine = engine;
        this.game = engine.game;

        this.game.world.setBounds(0, 0, width, height);

        this.backGroundTexture = 'bricks';
        this.soundtrack = 'Soundtrack';
        this.spawnInterval = 18;
    }

    _createClass(Level, [{
        key: 'create',
        value: function create() {
            this.setBackgroundTexture();
            this.createStartingUnits();
            this.startSoundtrack();

            this.data = {
                shots: 0,
                hits: 0
            };

            this.frame = this.spawnInterval;
            this.victoryEnabled = false;
            this.defeatEnabled = true;
            this.finished = false;
            this.lost = false;
            this.showIntro();
        }
    }, {
        key: 'setBackgroundTexture',
        value: function setBackgroundTexture() {
            this.engine.background.loadTexture(this.backGroundTexture, 0);
            this.engine.background.width = this.game.world.width;
            this.engine.background.height = this.game.world.height;
        }
    }, {
        key: 'createStartingUnits',
        value: function createStartingUnits() {
            this.engine.factory.spawnHero(_Marine2.default, this.engine.game.world.centerX, this.engine.game.world.centerY, 90);
        }
    }, {
        key: 'startSoundtrack',
        value: function startSoundtrack() {
            this.engine.game.soundsManager.loopSound(this.soundtrack);
        }
    }, {
        key: 'showIntro',
        value: function showIntro() {
            var _this = this;

            this.engine.cinematicMode = true;
            new _Dialog2.default(this.engine, this.engine.hero, this.phrase);
            this.engine.coroutines.set('intro', 180, function () {
                _this.engine.cinematicMode = false;
            });
            this.engine.camera.followToUnit(this.engine.hero);
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.engine.cinematicMode) {
                this.tryEndLevel();
                this.spawn();
            }
        }
    }, {
        key: 'spawn',
        value: function spawn() {
            if (this.frame <= 0) {
                if (this.enemiesCounter > 0) {
                    var unitType = this.getRandomCreepType();
                    var point = this.getRandomPointForSpawn();
                    this.engine.factory.spawnEnemy(unitType, point.x + Math.random(), point.y + Math.random(), (0, _randomization.getRandomInt)(0, 359));
                    this.engine.factory.spawnEnemy(unitType, point.x + Math.random(), point.y + Math.random(), (0, _randomization.getRandomInt)(0, 359));
                    this.engine.factory.spawnEnemy(unitType, point.x + Math.random(), point.y + Math.random(), (0, _randomization.getRandomInt)(0, 359));
                    this.engine.factory.spawnEnemy(unitType, point.x + Math.random(), point.y + Math.random(), (0, _randomization.getRandomInt)(0, 359));
                    this.engine.factory.spawnEnemy(unitType, point.x + Math.random(), point.y + Math.random(), (0, _randomization.getRandomInt)(0, 359));
                    this.enemiesCounter--;
                } else {
                    this.victoryEnabled = true;
                }
                this.frame = this.spawnInterval;
            } else {
                this.frame--;
            }
        }
    }, {
        key: 'tryEndLevel',
        value: function tryEndLevel() {
            if (!this.finished) {
                if (this.checkDefeatCondition()) {
                    this.engine.lose();
                    this.finished = true;
                    this.lost = true;
                } else if (this.checkVictoryCondition()) {
                    this.engine.win();
                    this.finished = true;
                }
            }
        }
    }, {
        key: 'checkDefeatCondition',
        value: function checkDefeatCondition() {
            return this.defeatEnabled && this.engine.hero.hp <= 0;
        }
    }, {
        key: 'checkVictoryCondition',
        value: function checkVictoryCondition() {
            return this.victoryEnabled && this.engine.enemies.length === 0;
        }
    }, {
        key: 'getRandomCreepType',
        value: function getRandomCreepType() {
            return this.creepTypes[(0, _randomization.getRandomInt)(0, this.creepTypes.length - 1)];
        }
    }, {
        key: 'getRandomPointForSpawn',
        value: function getRandomPointForSpawn() {
            var enemyX = (0, _randomization.getRandomInt)(1, this.engine.game.world.width);
            var enemyY = (0, _randomization.getRandomInt)(1, this.engine.game.world.height);
            var heroX = this.engine.hero.x;
            if (heroX > enemyX) {
                enemyX = enemyX - heroX;
            }
            return { x: enemyX, y: enemyY };
        }
    }]);

    return Level;
}();

exports.default = Level;

/***/ }),
/* 150 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/battleEngine/entities/default/BerserkAi.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AiBot2 = __webpack_require__(/*! ../AiBot */ 148);

var _AiBot3 = _interopRequireDefault(_AiBot2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BerserkAi = function (_AiBot) {
    _inherits(BerserkAi, _AiBot);

    function BerserkAi() {
        _classCallCheck(this, BerserkAi);

        return _possibleConstructorReturn(this, (BerserkAi.__proto__ || Object.getPrototypeOf(BerserkAi)).apply(this, arguments));
    }

    _createClass(BerserkAi, [{
        key: 'setStrategy',
        value: function setStrategy() {
            // Simply target the hero.
            this.strategy = {
                // targetPoint: { x: engine.hero.x, y: engine.hero.y },


                //targetUnit: this.engine.hero
            };
        }
    }]);

    return BerserkAi;
}(_AiBot3.default);

exports.default = BerserkAi;

/***/ }),
/* 151 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./src/battleEngine/entities/default/DefaultWeapon.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultWeapon = function (_Weapon) {
    _inherits(DefaultWeapon, _Weapon);

    function DefaultWeapon(engine, unit) {
        _classCallCheck(this, DefaultWeapon);

        return _possibleConstructorReturn(this, (DefaultWeapon.__proto__ || Object.getPrototypeOf(DefaultWeapon)).call(this, engine, unit, "Monster's claw", {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 5
        }));
    }

    return DefaultWeapon;
}(_Weapon3.default);

exports.default = DefaultWeapon;

/***/ }),
/* 152 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/battleEngine/entities/effects/index.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Represents special effect that is rendered on the screeen and must disappear after some period of time.
var Effect = function (_Phaser$Sprite) {
    _inherits(Effect, _Phaser$Sprite);

    function Effect(engine, x, y, angle, assetName, lifeTime) {
        _classCallCheck(this, Effect);

        var _this = _possibleConstructorReturn(this, (Effect.__proto__ || Object.getPrototypeOf(Effect)).call(this, engine.game, x, y, assetName));

        _this.engine = engine;
        engine.game.texturesManager.initSpriteSettings(_this);

        _this.angle = angle;
        _this.lifeTime = lifeTime;
        engine.effects.add(_this);
        return _this;
    }

    _createClass(Effect, [{
        key: 'update',
        value: function update() {
            if (this.lifeTime <= 0) {
                this.kill();
                // TODO - remove from Engine.effects ???
            } else {
                this.lifeTime--;
            }
        }
    }]);

    return Effect;
}(_phaser2.default.Sprite);

exports.default = Effect;

/***/ }),
/* 153 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/battleEngine/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AiManager = __webpack_require__(/*! ./managers/AiManager */ 154);

var _AiManager2 = _interopRequireDefault(_AiManager);

var _CameraManager = __webpack_require__(/*! ./managers/CameraManager */ 155);

var _CameraManager2 = _interopRequireDefault(_CameraManager);

var _ControlsManager = __webpack_require__(/*! ./managers/ControlsManager */ 156);

var _ControlsManager2 = _interopRequireDefault(_ControlsManager);

var _CoroutineManager = __webpack_require__(/*! ./managers/CoroutineManager */ 157);

var _CoroutineManager2 = _interopRequireDefault(_CoroutineManager);

var _FactoryManager = __webpack_require__(/*! ./managers/FactoryManager */ 158);

var _FactoryManager2 = _interopRequireDefault(_FactoryManager);

var _PhysicsManager = __webpack_require__(/*! ./managers/PhysicsManager */ 159);

var _PhysicsManager2 = _interopRequireDefault(_PhysicsManager);

var _Dialog = __webpack_require__(/*! ./entities/effects/Dialog */ 72);

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Engine contains all information about the world.
var BattleEngine = function () {
    function BattleEngine(game) {
        _classCallCheck(this, BattleEngine);

        this.game = game;
        game.engine = this;
        this.aiManager = new _AiManager2.default(this);
        this.camera = new _CameraManager2.default(this);
        this.controlsManager = new _ControlsManager2.default(this);
        this.coroutines = new _CoroutineManager2.default(this);
        this.factory = new _FactoryManager2.default(this);
        this.physics = new _PhysicsManager2.default(this);
        this.debugAttack = false;
    }

    _createClass(BattleEngine, [{
        key: 'create',
        value: function create() {
            this.physics.start();
            // Initialize Phaser sprite groups.
            this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, '');
            this.deadBodies = this.game.add.group(undefined, 'deadBodies');

            this.projectiles = this.game.add.group(undefined, 'projectiles');

            this.allUnits = this.game.add.group(undefined, 'allUnits'); // contains both heroes and enemies
            this.enemies = this.game.add.group(undefined, 'enemies');
            this.allUnits.addChild(this.enemies);

            this.effects = this.game.add.group(undefined, 'effects');
            this.startLevel(this.game.getCurrentLevel());
        }
    }, {
        key: 'startLevel',
        value: function startLevel(LevelType) {
            this.hero = undefined;
            this.cinematicMode = false; // If true - no unit can take actions.
            this.level = new LevelType(this);
            this.level.create();
        }
    }, {
        key: 'heroKilledHandler',
        value: function heroKilledHandler(hero) {
            // lose?
        }
    }, {
        key: 'enemyKilledHandler',
        value: function enemyKilledHandler(enemy) {
            // should enemy also be exluded from unit group??
            this.game.data.score += 1000;
        }

        // Activity (Updates every frame).
        // Here must be executed all activity of every object during current frame.

    }, {
        key: 'update',
        value: function update() {
            this.level.update();
            this.physics.handleProjectilesCollisions();
            this.coroutines.updateCoroutines();
        }
    }, {
        key: 'win',
        value: function win() {
            var _this = this;

            this.displayScore = true;
            this.coroutines.set('nextLevel', 180, function () {
                _this.nextLevel();
            });
        }
    }, {
        key: 'lose',
        value: function lose() {
            var _this2 = this;

            new _Dialog2.default(this, this.hero, 'death-speech');
            this.camera.fade();
            this.game.soundsManager.stopSound('Soundtrack');
            this.coroutines.set('death', 120, function () {
                _this2.game.state.start('Death');
            });
        }
    }, {
        key: 'nextLevel',
        value: function nextLevel() {
            this.game.nextLevel();
            if (this.game.getCurrentLevel()) {
                this.game.state.start('Game');
            }
        }
    }]);

    return BattleEngine;
}();

exports.default = BattleEngine;

/***/ }),
/* 154 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./src/battleEngine/managers/AiManager.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AiController = __webpack_require__(/*! ./controllers/AiController */ 160);

var _AiController2 = _interopRequireDefault(_AiController);

var _BerserkAi = __webpack_require__(/*! ../entities/default/BerserkAi */ 150);

var _BerserkAi2 = _interopRequireDefault(_BerserkAi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AiManager = function () {
    function AiManager(engine) {
        _classCallCheck(this, AiManager);

        this.engine = engine;
        this.game = engine.game;
    }

    _createClass(AiManager, [{
        key: 'setAi',
        value: function setAi(unit) {
            unit.controller = new _AiController2.default(this.engine, unit, new _BerserkAi2.default(this.engine, unit));
        }
    }]);

    return AiManager;
}();

exports.default = AiManager;

/***/ }),
/* 155 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/battleEngine/managers/CameraManager.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CameraManager = function () {
    function CameraManager(engine) {
        _classCallCheck(this, CameraManager);

        this.engine = engine;
        this.game = engine.game;
    }

    _createClass(CameraManager, [{
        key: 'followToUnit',
        value: function followToUnit(unit) {
            this.game.camera.follow(unit);
        }
    }, {
        key: 'zoomIn',
        value: function zoomIn(frames) {
            var _this = this;

            var scale = 1.5;
            this.game.world.scale.setTo(scale, scale);
            this.game.camera.shake(0.05, frames / 60 * 1000);
            this.engine.coroutines.set('camera', frames, function () {
                _this.game.world.scale.setTo(1, 1);
            });
        }
    }, {
        key: 'fade',
        value: function fade() {
            this.game.camera.fade('#000000', 1000);
        }
    }]);

    return CameraManager;
}();

exports.default = CameraManager;

/***/ }),
/* 156 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./src/battleEngine/managers/ControlsManager.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControlsManager = function () {
    function ControlsManager(engine) {
        _classCallCheck(this, ControlsManager);

        this.engine = engine;
        this.game = engine.game;
        this.init();
    }

    _createClass(ControlsManager, [{
        key: 'init',
        value: function init() {
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.keys = this.game.input.keyboard.addKeys({
                'right': _phaser2.default.Keyboard.D,
                'left': _phaser2.default.Keyboard.A,
                'up': _phaser2.default.Keyboard.W,
                'down': _phaser2.default.Keyboard.S,
                'reload': _phaser2.default.Keyboard.R,
                'ability1': _phaser2.default.Keyboard.Q,
                'ability2': _phaser2.default.Keyboard.E
            });

            // Prevent opening context menu when clicking right MB.
            this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };

            this.game.input.mouse.capture = true;
        }
    }, {
        key: 'rightIsDown',
        value: function rightIsDown() {
            return this.cursors.right.isDown || this.keys['right'].isDown;
        }
    }, {
        key: 'leftIsDown',
        value: function leftIsDown() {
            return this.cursors.left.isDown || this.keys['left'].isDown;
        }
    }, {
        key: 'upIsDown',
        value: function upIsDown() {
            return this.cursors.up.isDown || this.keys['up'].isDown;
        }
    }, {
        key: 'downIsDown',
        value: function downIsDown() {
            return this.cursors.down.isDown || this.keys['down'].isDown;
        }

        // Returns angle (in degrees) of direction pressed by arrows. If no key is pressed - returns undefined.

    }, {
        key: 'getDirectionFromKeyboard',
        value: function getDirectionFromKeyboard() {
            var x = +this.rightIsDown() - this.leftIsDown();
            var y = +this.upIsDown() - this.downIsDown();
            if (x === 0 && y === 0) {
                return undefined;
            } else {
                return this.game.math.radToDeg(Math.atan2(-y, x)); // y * (-1 ) due to inversion of Y axis.
            }
        }
    }]);

    return ControlsManager;
}();

exports.default = ControlsManager;

/***/ }),
/* 157 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./src/battleEngine/managers/CoroutineManager.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoroutineManager = function () {
    function CoroutineManager(engine) {
        _classCallCheck(this, CoroutineManager);

        this.engine = engine;
        this.game = engine.game;
        this.coroutines = {};
    }

    _createClass(CoroutineManager, [{
        key: "set",
        value: function set(key, frames, callback) {
            this.coroutines[key] = {
                left: frames,
                callback: callback
            };
        }
    }, {
        key: "updateCoroutines",
        value: function updateCoroutines() {
            var _this = this;

            Object.keys(this.coroutines).forEach(function (name) {
                var coroutine = _this.coroutines[name];
                if (coroutine.left <= 0) {
                    coroutine.callback();
                    delete _this.coroutines[name];
                } else {
                    coroutine.left--;
                }
            });
        }
    }]);

    return CoroutineManager;
}();

exports.default = CoroutineManager;

/***/ }),
/* 158 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./src/battleEngine/managers/FactoryManager.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlayerController = __webpack_require__(/*! ./controllers/PlayerController */ 161);

var _PlayerController2 = _interopRequireDefault(_PlayerController);

var _randomization = __webpack_require__(/*! ../../utils/randomization */ 74);

var _config = __webpack_require__(/*! ../config */ 147);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FactoryManager = function () {
    function FactoryManager(engine) {
        _classCallCheck(this, FactoryManager);

        this.engine = engine;
        this.game = engine.game;
    }

    _createClass(FactoryManager, [{
        key: 'spawnHero',
        value: function spawnHero(UnitType, x, y, angle) {
            var engine = this.engine;

            engine.hero = new UnitType(engine, x, y, angle, engine.allUnits);
            engine.hero.controller = new _PlayerController2.default(engine, engine.hero);
            engine.hero.role = 'hero';
            engine.physics.initSpecialPhysicsForHeroUnit(engine.hero);
            return engine.hero;
        }
    }, {
        key: 'spawnEnemy',
        value: function spawnEnemy(UnitType, x, y, angle) {
            var engine = this.engine;

            var enemy = new UnitType(engine, x, y, angle, engine.enemies);
            engine.aiManager.setAi(enemy);
            enemy.role = 'enemy';
            enemy.events.onKilled.add(engine.enemyKilledHandler, engine);

            enemy.speed *= 1 + Math.random();
            //  enemy.speed * 1  variate(enemy.speed, 1)
            var scaleRate = (0, _randomization.variate)(1, 0.15);

            enemy.scale.x *= scaleRate;
            enemy.scale.y *= scaleRate;
            enemy.physicalSize *= scaleRate;
            this.engine.physics.initPhysicsForUnit(enemy);

            if (Math.random() > 0.5) enemy.scale.y *= -1;

            var tintRange = 80;

            enemy.tint = 0 + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 16) + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 8) + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 0);

            return enemy;
        }

        // Boss has specific physics and AI.

    }, {
        key: 'spawnBoss',
        value: function spawnBoss(UnitType, x, y, angle) {
            var engine = this.engine;

            engine.boss = new UnitType(engine, x, y, angle, engine.enemies);
            engine.boss.role = 'boss';
            engine.aiManager.setAi(engine.boss);
            // engine.physics.initSpecialPhysicsForBossUnit(engine.boss)
            return engine.boss;
        }

        // createProjectile (ProjectileType, x, y, angle, additional, shooter) {
        //     const point = getOffsetPoint(shooter.x, shooter.y, this.attackPoint.offset + shooter.angle, this.attackPoint.distance)
        //     const additional = {
        //         damage: this.addDamage,
        //         speed: this.addProjectileSpeed
        //     }
        //     const projectile = new this.ProjectileType(this.engine, point.x, point.y, this.unit.angle, additional)
        //     return projectile
        // }

    }, {
        key: 'createTheGuts',
        value: function createTheGuts(x, y, color) {
            var sprite = this.game.texturesManager.createSpriteByName(x, y, 'death_' + (color || 'green'));
            var scale = sprite.scale.x + sprite.scale.x * (Math.random() * 0.4 - 0.2);
            sprite.scale.setTo(scale);
            sprite.rotation = (0, _randomization.getRandomRadAngle)();

            var tintRange = _config2.default.tintRange;


            sprite.tint = 0 + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 16) + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 8) + (Math.round(Math.random() * tintRange + (255 - tintRange)) << 0);

            this.engine.deadBodies.add(sprite);
            sprite.sendToBack();
            sprite.animations.play('death', 10, false);
            sprite.body && (sprite.body.moves = false);
        }
    }]);

    return FactoryManager;
}();

exports.default = FactoryManager;

/***/ }),
/* 159 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./src/battleEngine/managers/PhysicsManager.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _geometry = __webpack_require__(/*! ../../utils/geometry */ 56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhysicsManager = function () {
    function PhysicsManager(engine) {
        _classCallCheck(this, PhysicsManager);

        this.engine = engine;
        this.game = engine.game;
    }

    _createClass(PhysicsManager, [{
        key: 'start',
        value: function start() {
            this.game.physics.startSystem(_phaser2.default.Physics.P2JS);
        }
    }, {
        key: 'initPhysicsForUnit',
        value: function initPhysicsForUnit(unit) {
            this.game.physics.p2.enable(unit);

            // Set physic boundary box of sprites according to spritesManager.
            // const boundaryBox = this.game.texturesManager.getBoundaryBox(unit.key)
            // const scale = unit.scale

            unit.body.setCircle(unit.physicalSize);
            unit.body.fixedRotation = true;
        }
    }, {
        key: 'initSpecialPhysicsForHeroUnit',
        value: function initSpecialPhysicsForHeroUnit(unit) {
            unit.body.collideWorldBounds = true;
        }
    }, {
        key: 'initSpecialPhysicsForBossUnit',
        value: function initSpecialPhysicsForBossUnit(unit) {
            unit.body.setCircle(100);
            unit.body.mass = 10000;
        }
    }, {
        key: 'initPhysicsForProjectile',
        value: function initPhysicsForProjectile(projectile) {
            this.game.physics.arcade.enable(projectile);
            projectile.body.width = 1;
            projectile.body.height = 1;
        }
    }, {
        key: 'moveUnit',
        value: function moveUnit(unit) {
            if (unit.actions.moving) {
                var direction = (0, _geometry.degToRad)(unit.actions.movementDirection);
                unit.body.velocity.x = unit.speed * Math.cos(direction);
                unit.body.velocity.y = unit.speed * Math.sin(direction);
            } else {
                unit.body.velocity.x = 0;
                unit.body.velocity.y = 0;
            }
        }
    }, {
        key: 'moveProjectile',
        value: function moveProjectile(projectile) {
            // const direction = degToRad(projectile.angle)
            // projectile.body.velocity.x = projectile.speed * Math.cos(direction)
            // projectile.body.velocity.y = projectile.speed * Math.sin(direction)

            this.game.physics.arcade.velocityFromAngle(projectile.angle, projectile.speed, projectile.body.velocity);
        }

        // moveInstantly (sprite, angle, distance) {
        //     const direction = degToRad(angle)
        //     sprite.x = distance * Math.cos(direction)
        //     sprite.y = distance * Math.sin(direction)
        // }

    }, {
        key: 'handleProjectilesCollisions',
        value: function handleProjectilesCollisions() {
            var _this = this;

            this.engine.projectiles.forEach(function (projectile) {
                var bodies = _this.game.physics.p2.hitTest(new _phaser2.default.Point(projectile.x, projectile.y));
                if (bodies.length > 0) {
                    var unit = bodies[0].parent.sprite;
                    projectile.hit(unit);
                }
            });
        }

        // Returns all units from specified group that are situated in the angle of attack and in range of weapon.

    }, {
        key: 'getHitUnits',
        value: function getHitUnits(weapon, group) {
            var attacker = weapon.unit;
            // const attackDirection = attacker.direction


            // const targets = []
            // group.forEach((unit) => {
            //     if (this.game.physics.arcade.distanceBetween(attacker, unit) <= weapon.range + unit.body.width / 2 &&
            //         isInAngle(attacker.angle, this.game.math.radToDeg(this.game.physics.arcade.angleBetween(attacker, unit)), weapon.hitAngle)) {
            //         targets.push(unit)
            //     }
            // })

            // return targets

            return [this.engine.hero];
        }
    }]);

    return PhysicsManager;
}();

exports.default = PhysicsManager;

/***/ }),
/* 160 */
/* no static exports found */
/* all exports used */
/*!***************************************************************!*\
  !*** ./src/battleEngine/managers/controllers/AiController.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AiController = function () {
    function AiController(engine, unit, AI) {
        _classCallCheck(this, AiController);

        this.engine = engine;
        this.unit = unit;
        this.AI = AI;
    }

    _createClass(AiController, [{
        key: "setActions",
        value: function setActions() {
            this.AI.setStrategy();
            var actions = this.AI.getActions();
            this.unit.actions = actions;
        }
    }]);

    return AiController;
}();

exports.default = AiController;

/***/ }),
/* 161 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************!*\
  !*** ./src/battleEngine/managers/controllers/PlayerController.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = function () {
    function PlayerController(engine, unit) {
        _classCallCheck(this, PlayerController);

        this.engine = engine;
        this.game = engine.game;
        this.unit = unit;
    }

    _createClass(PlayerController, [{
        key: 'setActions',
        value: function setActions() {
            var actions = {};

            if (!this.engine.cinematicMode) {
                actions.angle = this.game.math.radToDeg(this.game.physics.arcade.angleToPointer(this.unit));

                var movementDirection = this.engine.controlsManager.getDirectionFromKeyboard();
                if (movementDirection !== undefined) {
                    actions.moving = true;
                    actions.movementDirection = movementDirection;

                    console.log('ACTIONS SETTED');
                } else {
                    actions.moving = false;
                }

                // Check if attack buttons are pressed.
                actions.attacking1 = this.game.input.activePointer.leftButton.isDown;
                actions.attacking2 = this.game.input.activePointer.rightButton.isDown;
                actions.reloading = this.engine.controlsManager.keys['reload'].isDown;
            } else {
                actions.angle = this.unit.angle;
                actions.moving = false;
                actions.attacking1 = false;
                actions.attacking2 = false;
            }

            this.unit.actions = actions;
        }
    }]);

    return PlayerController;
}();

exports.default = PlayerController;

/***/ }),
/* 162 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./src/captainSlayer/CaptainSlayerGame.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShooterGame2 = __webpack_require__(/*! ../gameFramework/ShooterGame */ 188);

var _ShooterGame3 = _interopRequireDefault(_ShooterGame2);

var _SoundsConfig = __webpack_require__(/*! ./assetsConfig/SoundsConfig */ 163);

var _TexturesConfig = __webpack_require__(/*! ./assetsConfig/TexturesConfig */ 164);

var _Boot = __webpack_require__(/*! ../gameFramework/scenes/Boot */ 192);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ../gameFramework/scenes/Splash */ 193);

var _Splash2 = _interopRequireDefault(_Splash);

var _Menu = __webpack_require__(/*! ./scenes/Menu */ 184);

var _Menu2 = _interopRequireDefault(_Menu);

var _Tangram = __webpack_require__(/*! ./scenes/Tangram */ 185);

var _Tangram2 = _interopRequireDefault(_Tangram);

var _Brif = __webpack_require__(/*! ./scenes/Brif */ 177);

var _Brif2 = _interopRequireDefault(_Brif);

var _Game = __webpack_require__(/*! ./scenes/Game */ 183);

var _Game2 = _interopRequireDefault(_Game);

var _Death = __webpack_require__(/*! ./scenes/Death */ 178);

var _Death2 = _interopRequireDefault(_Death);

var _Levels = __webpack_require__(/*! ./gameEntities/levels/Levels */ 165);

var _Minigun = __webpack_require__(/*! ./gameEntities/weapons/Minigun */ 108);

var _Minigun2 = _interopRequireDefault(_Minigun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CaptainSlayerGame = function (_ShooterGame) {
    _inherits(CaptainSlayerGame, _ShooterGame);

    function CaptainSlayerGame(gameWidth, gameHeight, targetFPS) {
        _classCallCheck(this, CaptainSlayerGame);

        return _possibleConstructorReturn(this, (CaptainSlayerGame.__proto__ || Object.getPrototypeOf(CaptainSlayerGame)).call(this, gameWidth, gameHeight, _TexturesConfig.texturesConfig, _SoundsConfig.soundsConfig, targetFPS));
    }

    _createClass(CaptainSlayerGame, [{
        key: 'initGameStates',
        value: function initGameStates() {
            this.state.add('Boot', _Boot2.default, false);
            this.state.add('Splash', _Splash2.default, false);

            this.state.add('Menu', _Menu2.default, false);
            this.state.add('Tangram', _Tangram2.default, false);
            this.state.add('Brif', _Brif2.default, false);
            this.state.add('Game', _Game2.default, false);
            this.state.add('Death', _Death2.default, false);
        }
    }, {
        key: 'initGlobalData',
        value: function initGlobalData() {
            this.levels = [_Levels.Level1, _Levels.Level2, _Levels.Level3, _Levels.BossLevel];
            this.data = {
                chosenWeapon1: // null,
                _Minigun2.default,
                chosenWeapon2: null,
                currentLevel: 0,
                score: 0
            };
        }
    }, {
        key: 'getCurrentLevel',
        value: function getCurrentLevel() {
            return this.levels[this.data.currentLevel];
        }
    }, {
        key: 'nextLevel',
        value: function nextLevel() {
            this.data.currentLevel++;
        }
    }]);

    return CaptainSlayerGame;
}(_ShooterGame3.default);

exports.default = CaptainSlayerGame;

/***/ }),
/* 163 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/captainSlayer/assetsConfig/SoundsConfig.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var soundsConfig = exports.soundsConfig = [{ key: 'Soundtrack', path: 'assets/sounds/soundtrack.mp3' }, { key: 'Bare Hand', path: 'assets/sounds/punch.mp3' }, { key: "Monster's claw", path: 'assets/sounds/monster_claw.mp3' }, { key: "Boss's claw", path: 'assets/sounds/monster_claw.mp3' }, { key: 'Blaster Pistol', path: 'assets/sounds/blaster_shot.mp3' }, { key: 'Uzi', path: 'assets/sounds/uzi_shot.mp3' }, { key: 'Assault Rifle', path: 'assets/sounds/rifle_shot.mp3' }, { key: 'Minigun', path: 'assets/sounds/minigun_shot.mp3' }, { key: 'Railgun', path: 'assets/sounds/sniper_shot.mp3' }, { key: 'PoisonGun', path: 'assets/sounds/vibroblade.mp3' }, { key: 'Vibroblade', path: 'assets/sounds/vibroblade.mp3' }];

/***/ }),
/* 164 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./src/captainSlayer/assetsConfig/TexturesConfig.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Used by default.
var ZERO_ANCHOR = { x: 0, y: 0 };

var texturesConfig = exports.texturesConfig = {
    default: {
        anchor: { x: 0.5, y: 0.5 },
        scale: { x: 1, y: 1 }
    },

    // PRELOAD.
    'loaderBg': { path: './assets/images/loader-bg.png', preload: true },
    'loaderBar': { path: './assets/images/loader-bar.png', preload: true },
    'loadingImage': { path: 'assets/loading_bg.jpg', preload: true, scale: { x: 1.5, y: 1.5 }, anchor: { x: 0, y: -0.3 } },

    // Backgrounds.
    'sky': { path: 'assets/sky.png' }, // IS UNUSED ???
    // Tiles.
    // 'rockyGrass1': { path: 'assets/CircleTextures/TEXTURES/G0G0A800.BMP' },
    // 'rockyGrass2': { path: 'assets/CircleTextures/TEXTURES/G0G0A801.BMP' },
    // 'graySand': { path: 'assets/CircleTextures/TEXTURES/D000M801.BMP' },
    // 'grass': { path: 'assets/CircleTextures/TEXTURES/G100M800.BMP' },
    // 'orangeRocks': { path: 'assets/CircleTextures/TEXTURES/B1B0I800.BMP' },
    // 'grayRocks': { path: 'assets/CircleTextures/TEXTURES/S300M802.BMP' },
    // 'bricks': { path: 'assets/CircleTextures/TEXTURES/S4S0I811.BMP' },
    'bricks': { path: 'assets/texture.BMP' },

    // DEMO PROJECT.
    'marine': { path: 'assets/demo-marine.png', scale: { x: 0.4, y: 0.4 }, anchor: { x: 0.358, y: 0.472 } },
    'marine2': { path: 'assets/demo-marine2.png',
        scale: { x: 0.4, y: 0.4 },
        anchor: { x: 0.270, y: 0.500 },
        // Offsets of attack points must be multiplied by -1 due to reversion of Y axis of canvas.
        attackPoints: {
            left: { offset: -18, distance: 50 },
            right: { offset: 18, distance: 50 },
            middle: { offset: 0, distance: 50

                // Maybe better to implement it with coordinates like in anchor?
                // left: { x: 0.855, y: 0.220 },
                // right: { x: 0.855, y: 0.220 },
                // middle: { x: 0.461, y: 0.500 },
            } },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'marine_new': { path: '',
        scale: { x: 0.6, y: 0.6 },
        attackPoints: {
            left: { offset: -18, distance: 60 },
            right: { offset: 18, distance: 60 },
            middle: { offset: 0, distance: 60

                // Maybe better to implement it with coordinates like in anchor?
                // left: { x: 0.855, y: 0.220 },
                // right: { x: 0.855, y: 0.220 },
                // middle: { x: 0.461, y: 0.500 },
            } },
        dynamic: {
            body: 'marine_body',
            left: {
                'pistol': 'marine_left_hand_pistol',
                'uzi': 'marine_left_hand_uzi',
                'rifle': 'marine_auto_rifle',
                'sniper': 'marine_sniper_rifle',
                'machinegun': 'marine_machinegun'
            },
            right: {
                'pistol': 'marine_right_hand_pistol',
                'uzi': 'marine_right_hand_uzi'
            }
        }
    },

    // CAPTAIN SLAYER.
    // Dynamic body parts.
    'marine_body': { path: 'assets/Marine/marine_body_only.png' },
    'marine_left_hand_pistol': { path: 'assets/Marine/marine_pistol_left_hand.png' },
    'marine_left_hand_uzi': { path: 'assets/Marine/marine_hands_uzi_left.png' },
    'marine_right_hand_pistol': { path: 'assets/Marine/marine_pistol_right_hand.png' },
    'marine_right_hand_uzi': { path: 'assets/Marine/marine_hands_uzi_right.png' },
    'marine_auto_rifle': { path: 'assets/Marine/marine_auto_rifle.png' },
    'marine_sniper_rifle': { path: 'assets/Marine/marine_hands_sniper_rifle.png' },
    'marine_machinegun': { path: 'assets/Marine/marine_hands_machinegun.png' },

    'zombie': { path: 'assets/zombie-new.png',
        scale: { x: 0.7, y: 0.7 },
        spritesheet: { width: 128, height: 128, max: 2 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'zombie_body': { path: 'assets/zombie_body.png', scale: { x: 0.5, y: 0.5 } },
    'roach': { path: 'assets/roach.png',
        scale: { x: 0.3, y: 0.3 },
        spritesheet: { width: 128, height: 128, max: 7 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }, {
            name: 'death',
            frames: [2, 3, 4, 5, 6]
        }]
    },
    'spider': { path: 'assets/demo_spider.gif',
        scale: { x: 0.25, y: 0.25 },
        anchor: { x: 0.389, y: 0.533 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'spider_pixel': { path: 'assets/spider_pixel.png', scale: { x: 0.5, y: 0.5 } },
    'scorpio': { path: 'assets/scorpio.png',
        scale: { x: 0.3, y: 0.3 },
        spritesheet: { width: 140, height: 128, max: 2 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'spider_boss': { path: 'assets/spider-boss.png',
        scale: { x: 0.5, y: 0.5 },
        spritesheet: { width: 512, height: 512, max: 2 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }],
        attackPoints: {
            left: { offset: 0, distance: 100 },
            right: { offset: 0, distance: 125 },
            middle: { offset: 0, distance: 100 }
        }
    },

    'troll': { path: 'assets/troll.png', scale: { x: 0.2, y: 0.2 }, anchor: { x: 0.418, y: 0.443 } },

    // PANZER
    'tank': { path: 'assets/tank1.png', scale: { x: 0.65, y: 0.65 } },
    'soldier': { path: 'assets/panzer/soldier_rifle_right.png', scale: { x: 0.5, y: 0.5 }, points: { 'default': { x: 0.7, y: 0.8 } } },

    // Projectiles.
    'red_plasma': { path: 'assets/red_plasma.png', scale: { x: 0.75, y: 0.75 } },
    'blue_plasma': { path: 'assets/blue_plasma.png', scale: { x: 0.75, y: 0.75 } },
    'green_plasma': { path: 'assets/green_plasma.png', scale: { x: 0.75, y: 0.75 } },
    'yellow_plasma': { path: 'assets/yellow_plasma.png', scale: { x: 0.75, y: 0.75 } },

    // Special effects.
    'death_blue': { path: 'assets/deaths/blue.png',
        scale: { x: 0.5, y: 0.5 },
        spritesheet: { width: 128, height: 128, max: 3 },
        animations: [{ name: 'death', frames: [0, 1, 2] }]
    },
    'death_green': { path: 'assets/deaths/green.png',
        scale: { x: 0.5, y: 0.5 },
        spritesheet: { width: 128, height: 128, max: 3 },
        animations: [{ name: 'death', frames: [0, 1, 2] }]
    },
    'death_red': { path: 'assets/deaths/red.png',
        scale: { x: 0.5, y: 0.5 },
        spritesheet: { width: 128, height: 128, max: 3 },
        animations: [{ name: 'death', frames: [0, 1, 2] }]
    },
    'death_yellow': { path: 'assets/deaths/yellow.png',
        scale: { x: 0.5, y: 0.5 },
        spritesheet: { width: 128, height: 128, max: 3 },
        animations: [{ name: 'death', frames: [0, 1, 2] }]
    },
    'meleeEffect': { path: 'assets/melee.png', scale: { x: 0.5, y: 1.5 }, anchor: { x: 0, y: 0.5 } },

    // Icons for projectiles on ammo bar.
    'bullet': { path: 'assets/bullet.png', scale: { x: 0.25, y: 0.25 } }, // IS THIS PROJECTILE OR ICON ???
    'intro-first': { path: 'assets/level-1-intro.png', scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 } },
    'intro-second': { path: 'assets/level-2-intro.png', scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 } },
    'intro-third': { path: 'assets/level-3-intro.png', scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 } },
    'intro-boss': { path: 'assets/boss-intro.png', scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 } },
    'death-speech': { path: 'assets/death-speech.png', scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 } },

    // Logos and UI.
    'logo_skull': { path: 'assets/logo_skull.png' },
    'text_logo': { path: 'assets/text_logo.png', scale: { x: 0.8, y: 0.8 } },

    'toolbar_bg': { path: 'assets/gameplay_interface.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },
    'mute_icon': { path: 'assets/mute_icon.png', anchor: ZERO_ANCHOR },
    'mute_icon_active': { path: 'assets/icons_audio-vol_active_48px.png' },

    'pistol_icon': { path: 'assets/pistol_icon.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },
    'uzi_icon': { path: 'assets/uzi_icon.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },
    'assault_rifle_icon': { path: 'assets/assault_rifle_icon.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },
    'sniper_rifle_icon': { path: 'assets/sniper_rifle_icon.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },
    'machine_gun_icon': { path: 'assets/machine_gun_icon.png', scale: { x: 0.8, y: 0.8 }, anchor: ZERO_ANCHOR },

    'game_over': { path: 'assets/death_screen.png' },
    'black_screen': { path: 'assets/black_screen.png' },

    'tangram_active': { path: 'assets/tangram_active.png' },
    'tangram_inactive': { path: 'assets/tangram_inactive.png' },
    'tangram_discl': { path: 'assets/tangram_discl.png', anchor: { x: 0.5, y: 0 } },

    'unactive_box': { path: 'assets/unactive_box.png' },
    'unactive_box_hover': { path: 'assets/unactive_box_hover.png' },
    'active_box': { path: 'assets/active_box.png' },
    'disabled_box': { path: 'assets/disabled_box.png' },

    'box_button': { path: 'assets/box_button.png', spritesheet: { width: 254, height: 130 } },
    'button_next': { path: 'assets/next_button.png', spritesheet: { width: 246, height: 50 } }

};

/***/ }),
/* 165 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/levels/Levels.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BossLevel = exports.Level3 = exports.Level2 = exports.Level1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Level5 = __webpack_require__(/*! ../../../battleEngine/entities/Level */ 149);

var _Level6 = _interopRequireDefault(_Level5);

var _Marine = __webpack_require__(/*! ../units/Marine */ 107);

var _Marine2 = _interopRequireDefault(_Marine);

var _Spider = __webpack_require__(/*! ../units/Spider */ 168);

var _Spider2 = _interopRequireDefault(_Spider);

var _Scorpio = __webpack_require__(/*! ../units/Scorpio */ 167);

var _Scorpio2 = _interopRequireDefault(_Scorpio);

var _Zombie = __webpack_require__(/*! ../units/Zombie */ 170);

var _Zombie2 = _interopRequireDefault(_Zombie);

var _Roach = __webpack_require__(/*! ../units/Roach */ 166);

var _Roach2 = _interopRequireDefault(_Roach);

var _SpiderBoss = __webpack_require__(/*! ../units/SpiderBoss */ 169);

var _SpiderBoss2 = _interopRequireDefault(_SpiderBoss);

var _Dialog = __webpack_require__(/*! ../../../battleEngine/entities/effects/Dialog */ 72);

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level1 = exports.Level1 = function (_Level) {
    _inherits(Level1, _Level);

    function Level1(engine) {
        _classCallCheck(this, Level1);

        var _this = _possibleConstructorReturn(this, (Level1.__proto__ || Object.getPrototypeOf(Level1)).call(this, engine, 1920, 1920));

        _this.enemiesCounter = 30 / 5;
        _this.creepTypes = [_Zombie2.default, _Zombie2.default];
        _this.phrase = 'intro-first';

        // this.spawnInterval = 5
        return _this;
    }

    return Level1;
}(_Level6.default);

var Level2 = exports.Level2 = function (_Level2) {
    _inherits(Level2, _Level2);

    function Level2(engine) {
        _classCallCheck(this, Level2);

        var _this2 = _possibleConstructorReturn(this, (Level2.__proto__ || Object.getPrototypeOf(Level2)).call(this, engine, 1920, 1920));

        _this2.enemiesCounter = 40 / 5;
        _this2.creepTypes = [_Roach2.default, _Roach2.default, _Spider2.default, _Zombie2.default];
        _this2.phrase = 'intro-second';
        return _this2;
    }

    return Level2;
}(_Level6.default);

var Level3 = exports.Level3 = function (_Level3) {
    _inherits(Level3, _Level3);

    function Level3(engine) {
        _classCallCheck(this, Level3);

        var _this3 = _possibleConstructorReturn(this, (Level3.__proto__ || Object.getPrototypeOf(Level3)).call(this, engine, 1920, 1920));

        _this3.enemiesCounter = 40 / 5;
        _this3.creepTypes = [//Zombie, 
        _Spider2.default //, Roach
        ];
        _this3.phrase = 'intro-third';

        _this3.spawnInterval = 3;
        return _this3;
    }

    return Level3;
}(_Level6.default);

var BossLevel = exports.BossLevel = function (_Level4) {
    _inherits(BossLevel, _Level4);

    function BossLevel(engine) {
        _classCallCheck(this, BossLevel);

        var _this4 = _possibleConstructorReturn(this, (BossLevel.__proto__ || Object.getPrototypeOf(BossLevel)).call(this, engine, 1920, 1920));

        _this4.enemiesCounter = 20;
        _this4.spawnInterval = 60 / 30;
        _this4.creepTypes = [_Roach2.default];
        _this4.phrase = 'intro-boss';
        return _this4;
    }

    _createClass(BossLevel, [{
        key: 'createStartingUnits',
        value: function createStartingUnits() {
            this.engine.factory.spawnHero(_Marine2.default, this.engine.game.world.centerX + 600, this.engine.game.world.centerY, 180);
            this.engine.factory.spawnBoss(_SpiderBoss2.default, this.engine.game.world.centerX - 600, this.engine.game.world.centerY, 0);
        }
    }, {
        key: 'showIntro',
        value: function showIntro() {
            var _this5 = this;

            this.engine.cinematicMode = true;
            new _Dialog2.default(this.engine, this.engine.hero, this.phrase);
            this.engine.camera.followToUnit(this.engine.hero);
            this.engine.coroutines.set('intro', 180, function () {
                _this5.engine.camera.followToUnit(_this5.engine.boss);
                _this5.engine.camera.zoomIn(90);
                _this5.engine.coroutines.set('cameraReturn', 90, function () {
                    _this5.engine.camera.followToUnit(_this5.engine.hero);
                    _this5.engine.cinematicMode = false;
                });
            });
        }
    }]);

    return BossLevel;
}(_Level6.default);

/***/ }),
/* 166 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/Roach.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roach = function (_Unit) {
    _inherits(Roach, _Unit);

    function Roach(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, Roach);

        return _possibleConstructorReturn(this, (Roach.__proto__ || Object.getPrototypeOf(Roach)).call(this, engine, x, y, angle, 'roach', parentGroup, {
            speed: //200 
            250,

            hpMax: 40,
            physicalSize: 12
        }));
    }

    return Roach;
}(_Unit3.default);

exports.default = Roach;

/***/ }),
/* 167 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/Scorpio.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scorpio = function (_Unit) {
    _inherits(Scorpio, _Unit);

    function Scorpio(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, Scorpio);

        return _possibleConstructorReturn(this, (Scorpio.__proto__ || Object.getPrototypeOf(Scorpio)).call(this, engine, x, y, angle, 'scorpio', parentGroup, {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        }));
    }

    return Scorpio;
}(_Unit3.default);

exports.default = Scorpio;

/***/ }),
/* 168 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/Spider.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spider = function (_Unit) {
    _inherits(Spider, _Unit);

    function Spider(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, Spider);

        return _possibleConstructorReturn(this, (Spider.__proto__ || Object.getPrototypeOf(Spider)).call(this, engine, x, y, angle, 'spider_pixel', parentGroup, {
            // speed: 250,
            // hpMax: 400,
            deathColor: 'yellow',

            speed: 175,
            hpMax: 200
        }));
    }

    return Spider;
}(_Unit3.default);

exports.default = Spider;

/***/ }),
/* 169 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/SpiderBoss.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

var _BossClaw = __webpack_require__(/*! ../weapons/BossClaw */ 173);

var _BossClaw2 = _interopRequireDefault(_BossClaw);

var _BossShootingWeapon = __webpack_require__(/*! ../weapons/BossShootingWeapon */ 174);

var _BossShootingWeapon2 = _interopRequireDefault(_BossShootingWeapon);

var _BossBullet = __webpack_require__(/*! ../projectiles/BossBullet */ 106);

var _BossBullet2 = _interopRequireDefault(_BossBullet);

var _randomization = __webpack_require__(/*! ../../../utils/randomization */ 74);

var _geometry = __webpack_require__(/*! ../../../utils/geometry */ 56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpiderBoss = function (_Unit) {
    _inherits(SpiderBoss, _Unit);

    function SpiderBoss(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, SpiderBoss);

        var _this = _possibleConstructorReturn(this, (SpiderBoss.__proto__ || Object.getPrototypeOf(SpiderBoss)).call(this, engine, x, y, angle, 'spider_boss', parentGroup, {
            speed: 150,
            hpMax: 10000,
            weapon1: _BossClaw2.default,
            weapon2: _BossShootingWeapon2.default,
            deathColor: 'yellow'
        }));

        _this.animationSpeed = 5;
        _this.blowInterval = 150;
        _this.blowFrame = _this.blowInterval;
        _this.blows = 16;
        return _this;
    }

    _createClass(SpiderBoss, [{
        key: 'initPhysics',
        value: function initPhysics() {
            this.engine.physics.initPhysicsForUnit(this);
            this.engine.physics.initSpecialPhysicsForBossUnit(this);
        }
    }, {
        key: 'createCorpse',
        value: function createCorpse() {
            var _this2 = this;

            var _loop = function _loop(i) {
                var point = (0, _geometry.getOffsetPoint)(_this2.x, _this2.y, (0, _randomization.getRandomDegAngle)(), Math.random() * i * 5);
                var colors = ['blue', 'yellow', 'red', 'green'];
                _this2.engine.coroutines.set('explode_' + i, i * 1, function () {
                    return _this2.engine.factory.createTheGuts(point.x, point.y, colors[(0, _randomization.getRandomInt)(3, 3)]);
                });
            };

            for (var i = 0; i < 50; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'blow',
        value: function blow() {
            for (var i = 0; i < this.blows; i++) {
                var deg = i * (360 / this.blows);
                var _point = (0, _geometry.getOffsetPoint)(this.x, this.y, deg, 125);
                // this.engine.createProjectile(point.x, point.y, deg, BossBullet)
            }
        }
    }, {
        key: 'updateAdditional',
        value: function updateAdditional() {
            if (this.blowFrame <= 0) {
                this.blow();
                this.blowFrame = this.blowInterval;
            } else {
                this.blowFrame--;
            }
        }
    }]);

    return SpiderBoss;
}(_Unit3.default);

exports.default = SpiderBoss;

/***/ }),
/* 170 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/units/Zombie.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Unit2 = __webpack_require__(/*! ../../../battleEngine/entities/Unit */ 45);

var _Unit3 = _interopRequireDefault(_Unit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zombie = function (_Unit) {
    _inherits(Zombie, _Unit);

    function Zombie(engine, x, y, angle, parentGroup) {
        _classCallCheck(this, Zombie);

        var _this = _possibleConstructorReturn(this, (Zombie.__proto__ || Object.getPrototypeOf(Zombie)).call(this, engine, x, y, angle, 'zombie', parentGroup, {
            speed: 100,
            deathColor: 'blue',

            hpMax: 400
        }));

        _this.animationSpeed = 5;

        _this.anger = 0;
        return _this;
    }

    _createClass(Zombie, [{
        key: 'update',
        value: function update() {
            _Unit3.default.prototype.update.call(this);

            if (this.anger <= 0 && this.hp < this.hpMax) {
                this.anger = 100;
                this.mass *= 5;
                // this.speed *= 2
                this.speed = 350;
                this.animationSpeed = 40;
            }

            //     if (this.anger <= 0 && Math.random() < 1 / 60 / 20) {
            //         this.anger = 100
            //         this.mass *= 5
            //         this.speed = 500
            //     }

            //     if (this.anger > 0) {
            //         this.anger--
            //         if (this.anger <= 0) {
            //             this.anger = 0
            //             this.mass *= 0.2
            //             this.speed = 120
            //         }
            //     }

            // }
        }
    }]);

    return Zombie;
}(_Unit3.default);

exports.default = Zombie;

/***/ }),
/* 171 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/AssaultRifle.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _RedBullet = __webpack_require__(/*! ../projectiles/RedBullet */ 73);

var _RedBullet2 = _interopRequireDefault(_RedBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssaultRifle = function (_Weapon) {
    _inherits(AssaultRifle, _Weapon);

    function AssaultRifle(engine, unit) {
        _classCallCheck(this, AssaultRifle);

        return _possibleConstructorReturn(this, (AssaultRifle.__proto__ || Object.getPrototypeOf(AssaultRifle)).call(this, engine, unit, 'Assault Rifle', {
            ProjectileType: _RedBullet2.default,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 15,
            addProjectileSpeed: 5,
            maxAmmo: 30,
            delayReload: 90,
            sprite: 'rifle',
            icon: 'assault_rifle_icon',
            twoHanded: true
        }));
    }

    return AssaultRifle;
}(_Weapon3.default);

exports.default = AssaultRifle;


AssaultRifle.icon = 'assault_rifle_icon';

/***/ }),
/* 172 */
/* no static exports found */
/* all exports used */
/*!*****************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/BlasterPistol.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _RedBullet = __webpack_require__(/*! ../projectiles/RedBullet */ 73);

var _RedBullet2 = _interopRequireDefault(_RedBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlasterPistol = function (_Weapon) {
    _inherits(BlasterPistol, _Weapon);

    function BlasterPistol(engine, unit) {
        _classCallCheck(this, BlasterPistol);

        return _possibleConstructorReturn(this, (BlasterPistol.__proto__ || Object.getPrototypeOf(BlasterPistol)).call(this, engine, unit, 'Blaster Pistol', {
            ProjectileType: _RedBullet2.default,
            delayBeforeAttack: 0,
            delayAfterAttack: 15,
            maxAmmo: 12,
            addDamage: 20,
            delayReload: 15,
            icon: 'pistol_icon',
            sprite: 'pistol'
        }));
    }

    return BlasterPistol;
}(_Weapon3.default);

exports.default = BlasterPistol;


BlasterPistol.icon = 'pistol_icon';

/***/ }),
/* 173 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/BossClaw.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BossClaw = function (_Weapon) {
    _inherits(BossClaw, _Weapon);

    function BossClaw(engine, unit) {
        _classCallCheck(this, BossClaw);

        return _possibleConstructorReturn(this, (BossClaw.__proto__ || Object.getPrototypeOf(BossClaw)).call(this, engine, unit, "Boss's claw", {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 5,
            range: 175
            // showMeleeEffect: true
        }));
    }

    return BossClaw;
}(_Weapon3.default);

exports.default = BossClaw;

/***/ }),
/* 174 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/BossShootingWeapon.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _BossBullet = __webpack_require__(/*! ../projectiles/BossBullet */ 106);

var _BossBullet2 = _interopRequireDefault(_BossBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BossShootingWeapon = function (_Weapon) {
    _inherits(BossShootingWeapon, _Weapon);

    function BossShootingWeapon(engine, unit) {
        _classCallCheck(this, BossShootingWeapon);

        return _possibleConstructorReturn(this, (BossShootingWeapon.__proto__ || Object.getPrototypeOf(BossShootingWeapon)).call(this, engine, unit, 'PoisonGun', {
            ProjectileType: _BossBullet2.default,
            delayBeforeAttack: 5,
            delayAfterAttack: 15,
            // addDamage: 150,
            // addProjectileSpeed: 1000,
            maxAmmo: 5,
            delayReload: 180
            // icon: 'sniper_rifle_icon',
            // sprite: 'sniper'
        }));
    }

    return BossShootingWeapon;
}(_Weapon3.default);

exports.default = BossShootingWeapon;

/***/ }),
/* 175 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/Railgun.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _RedBullet = __webpack_require__(/*! ../projectiles/RedBullet */ 73);

var _RedBullet2 = _interopRequireDefault(_RedBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Railgun = function (_Weapon) {
    _inherits(Railgun, _Weapon);

    function Railgun(engine, unit) {
        _classCallCheck(this, Railgun);

        return _possibleConstructorReturn(this, (Railgun.__proto__ || Object.getPrototypeOf(Railgun)).call(this, engine, unit, 'Railgun', {
            ProjectileType: _RedBullet2.default,
            delayBeforeAttack: 15,
            delayAfterAttack: 45,
            addDamage: 400,
            addProjectileSpeed: 1000,
            maxAmmo: 20,
            delayReload: 120,
            twoHanded: true,
            icon: 'sniper_rifle_icon',
            sprite: 'sniper'
        }));
    }

    return Railgun;
}(_Weapon3.default);

exports.default = Railgun;


Railgun.icon = 'sniper_rifle_icon';

/***/ }),
/* 176 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./src/captainSlayer/gameEntities/weapons/Uzi.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Weapon2 = __webpack_require__(/*! ../../../battleEngine/entities/Weapon */ 30);

var _Weapon3 = _interopRequireDefault(_Weapon2);

var _BlueBullet = __webpack_require__(/*! ../projectiles/BlueBullet */ 105);

var _BlueBullet2 = _interopRequireDefault(_BlueBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uzi = function (_Weapon) {
    _inherits(Uzi, _Weapon);

    function Uzi(engine, unit) {
        _classCallCheck(this, Uzi);

        return _possibleConstructorReturn(this, (Uzi.__proto__ || Object.getPrototypeOf(Uzi)).call(this, engine, unit, 'Uzi', {
            ProjectileType: _BlueBullet2.default,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 5,
            addProjectileSpeed: 5,
            maxAmmo: 25,
            delayReload: 90,
            icon: 'uzi_icon',
            sprite: 'uzi'
        }));
    }

    return Uzi;
}(_Weapon3.default);

exports.default = Uzi;


Uzi.icon = 'uzi_icon';

/***/ }),
/* 177 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/captainSlayer/scenes/Brif.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _Minigun = __webpack_require__(/*! ../gameEntities/weapons/Minigun */ 108);

var _Minigun2 = _interopRequireDefault(_Minigun);

var _Railgun = __webpack_require__(/*! ../gameEntities/weapons/Railgun */ 175);

var _Railgun2 = _interopRequireDefault(_Railgun);

var _AssaultRifle = __webpack_require__(/*! ../gameEntities/weapons/AssaultRifle */ 171);

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

var _BlasterPistol = __webpack_require__(/*! ../gameEntities/weapons/BlasterPistol */ 172);

var _BlasterPistol2 = _interopRequireDefault(_BlasterPistol);

var _Uzi = __webpack_require__(/*! ../gameEntities/weapons/Uzi */ 176);

var _Uzi2 = _interopRequireDefault(_Uzi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            this.game.data.chosenWeapon1 = null;
            this.game.data.chosenWeapon2 = null;
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var game = this.game;

            game.add.text(game.width * 0.5 - 170, 80, 'CHOOSE THE WEAPON', { font: '42px caveStory', fill: '#ffffff', align: 'center' });
            game.add.text(game.width * 0.5 - 300, 150, 'YOU CAN USE TWO-HANDED WEAPONS FOR BOTH HANDS \n OR ONE TWO-HANDED WEAPON', { font: '32px caveStory', fill: '#F7931E', align: 'center' });

            this.nextButton = game.add.button(game.width / 2 - 135, game.height - 80, 'button_next', function () {
                game.state.start('Game');
            }, this, 2, 1, 2, 2);

            this.nextButton.visible = false;

            this.buttons = buttonsConfig.map(function (cfg) {
                var button = game.add.button(cfg.x, cfg.y, 'box_button', null, _this2, 0, 1);

                game.texturesManager.createSpriteByName(cfg.x + 30, cfg.y + 30, cfg.icon);
                game.add.text(cfg.x + 5, cfg.y + 120, cfg.title, { font: '38px caveStory', fill: '#ffffff', align: 'center' });
                if (cfg.description) game.add.text(cfg.x + 5, cfg.y + 155, cfg.description, { font: '26px caveStory', fill: '#D3D3D3', align: 'center' });

                button.weaponType = cfg.weaponType;
                button.twoHanded = cfg.twoHanded;

                if (cfg.callback !== undefined) {
                    button.events.onInputDown.add(function () {
                        cfg.callback(_this2);
                    });
                } else if (cfg.weaponType !== undefined) {
                    // Generate automatic weapon selection callback.
                    button.events.onInputDown.add(function () {
                        _this2.selectWeapon(button);
                    });
                }

                return button;
            });
        }
    }, {
        key: 'selectWeapon',
        value: function selectWeapon(button) {
            var data = this.game.data;

            if (data.chosenWeapon1 === null) {
                data.chosenWeapon1 = button.weaponType;
                if (button.twoHanded) {
                    button.setFrames(3, 3);
                    this.toggleAllWeaponButtonsInput(false);
                } else {
                    button.setFrames(2, 2);
                    this.toggleRightHandWeaponButtonsInput(false);
                }
                this.nextButton.visible = true;
            } else if (data.chosenWeapon2 === null) {
                button.setFrames(3, 3);
                data.chosenWeapon2 = button.weaponType;
                this.toggleAllWeaponButtonsInput(false);
            }

            // Let's allow player to proceed next even if he picks just one one handed weapon.
            this.nextButton.visible = true;
        }
    }, {
        key: 'deselectWeapons',
        value: function deselectWeapons() {
            this.game.data.chosenWeapon1 = null;
            this.game.data.chosenWeapon2 = null;
            this.toggleAllWeaponButtonsInput(true);
            this.nextButton.visible = false;
        }
    }, {
        key: 'toggleAllWeaponButtonsInput',
        value: function toggleAllWeaponButtonsInput(enabled) {
            var _this3 = this;

            this.buttons.forEach(function (button) {
                if (button.weaponType !== undefined) {
                    _this3.toggleButtonInput(button, enabled);
                }
            });
        }
    }, {
        key: 'toggleRightHandWeaponButtonsInput',
        value: function toggleRightHandWeaponButtonsInput(enabled) {
            var _this4 = this;

            this.buttons.forEach(function (button) {
                if (button.weaponType !== undefined && button.twoHanded) {
                    _this4.toggleButtonInput(button, enabled);
                }
            });
        }
    }, {
        key: 'toggleButtonInput',
        value: function toggleButtonInput(button, enabled) {
            button.tint = 0xffffff;
            button.input.enabled = enabled;
            if (enabled) {
                button.setFrames(0, 1);
            } else if (button.frame <= 1) {
                button.setFrames(0, 0);
            } else if (button.frame === 2) {
                // Don't modify frame of right hand weapon button, but instead shade button with tint.
                button.tint = 0x999999;
            }
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;


var buttonsConfig = [{
    x: 200,
    y: 250,
    title: 'MACHINE GUN',
    description: 'HEAVY AND POWERFUL',
    icon: 'machine_gun_icon',
    weaponType: _Minigun2.default,
    twoHanded: true
}, {
    x: 500,
    y: 250,
    title: 'SNIPER RIFLE',
    description: 'ULTIMATE SINGLE DAMAGE',
    icon: 'sniper_rifle_icon',
    weaponType: _Railgun2.default,
    twoHanded: true
}, {
    x: 800,
    y: 250,
    title: 'ASSAULT RIFLE',
    description: 'ARMYS\'S BEST FRIEND',
    icon: 'assault_rifle_icon',
    weaponType: _AssaultRifle2.default,
    twoHanded: true
}, {
    x: 200,
    y: 470,
    title: 'PISTOL',
    description: 'YOUR GIRLFRIEND\'S TOY',
    icon: 'pistol_icon',
    weaponType: _BlasterPistol2.default,
    twoHanded: false
}, {
    x: 500,
    y: 470,
    title: 'UZI',
    description: 'TWO-HANDED KILLER',
    icon: 'uzi_icon',
    weaponType: _Uzi2.default,
    twoHanded: false
}, {
    x: 800,
    y: 470,
    title: 'UNDO SELECTION',
    description: 'REAL MAN DOESN\'T NEED ANY',
    icon: '',
    callback: function callback(state) {
        state.deselectWeapons();
    }
}];

/***/ }),
/* 178 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/captainSlayer/scenes/Death.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            var game = this.game;

            this.game_over = game.texturesManager.createSpriteByName(game.width * 0.5, game.height * 0.5, 'game_over');

            this.menu = menuConfig.map(function (cfg) {
                var text = game.add.text(game.width * 0.5, cfg.y, cfg.text, style);
                text.anchor.setTo(0.5);
                text.inputEnabled = true;
                text.input.useHandCursor = true;

                text.events.onInputOver.add(function () {
                    text.fill = '#8CC63F';
                }, _this2);

                text.events.onInputOut.add(function () {
                    text.fill = '#FFFFFF';
                }, _this2);

                text.events.onInputDown.add(function () {
                    cfg.callback(game);
                });
                return text;
            });
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;


var menuConfig = [{
    text: 'TRY AGAIN',
    y: 643,
    callback: function callback(game) {
        game.state.start('Menu');
    }
}];

var style = {
    font: '42px caveStory',
    fill: '#ffffff',
    align: 'center'
};

/***/ }),
/* 179 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./src/captainSlayer/scenes/Game/UI/Buttons.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buttons = function () {
    function Buttons(state) {
        _classCallCheck(this, Buttons);

        this.state = state;
        this.game = state.game;
        this.button = this.game.add.button(50, 50, 'mute_icon', this.game.soundsManager.toggleMuteSounds, this.state);
        this.button.fixedToCamera = true;
    }

    _createClass(Buttons, [{
        key: 'render',
        value: function render() {
            this.button.tint = this.game.sound.mute ? 0xdcdcdc : 0xffffff;
        }
    }]);

    return Buttons;
}();

exports.default = Buttons;

/***/ }),
/* 180 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./src/captainSlayer/scenes/Game/UI/DebugInfo.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _geometry = __webpack_require__(/*! ../../../../utils/geometry */ 56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DebugInfo = function () {
    function DebugInfo(state) {
        _classCallCheck(this, DebugInfo);

        this.state = state;
        this.game = state.game;
    }

    _createClass(DebugInfo, [{
        key: 'render',
        value: function render() {
            this.debugPerformance();

            // this.debugAttackTarget(this.game.engine.hero.weapon1, '#00ff00')
            // if (this.game.engine.hero.weapon2) this.debugAttackTarget(this.game.engine.hero.weapon2, '#00ff00')

            this.debugBodies();
        }
    }, {
        key: 'debugPerformance',
        value: function debugPerformance() {
            this.game.debug.text('FPS: ' + this.game.time.fps, 10, 20, '#00ff00');
            this.game.debug.text('FPS rate: ' + this.game.timeManager.fpsRate, 10, 35, '#00ff00');
            this.game.debug.text('Enemies: ' + this.game.engine.enemies.length, 10, 50, '#00ff00');
            this.game.debug.text('Projectiles: ' + this.game.engine.projectiles.length, 10, 65, '#00ff00');
        }
    }, {
        key: 'debugBodies',
        value: function debugBodies() {
            var _this = this;

            if (this.game.engine.hero) this.debugBody(this.game.engine.hero, 'rgba(0,255,0,0.2)');

            this.game.engine.enemies.forEach(function (unit) {
                _this.debugBody(unit, 'rgba(0,255,0,0.2)');
            });
        }
    }, {
        key: 'debugBody',
        value: function debugBody(unit, color) {
            if (!unit) return;
            if (!unit.body) return;
            unit.body.debug = true;
            this.game.debug.body(unit, color);
            this.game.debug.geom(new _phaser2.default.Line(unit.x - 10, unit.y, unit.x + 10, unit.y), '#ff0000');
            this.game.debug.geom(new _phaser2.default.Line(unit.x, unit.y - 10, unit.x, unit.y + 10), '#ff0000');
        }
    }, {
        key: 'debugAttackTarget',
        value: function debugAttackTarget(weapon, color) {
            if (weapon.unit.hp > 0) {
                var unit = weapon.unit;
                if (weapon.isShooting) {
                    var point1 = (0, _geometry.getOffsetPoint)(unit.x, unit.y, weapon.attackPoint.offset + unit.angle, weapon.attackPoint.distance);
                    var point2 = (0, _geometry.getOffsetPoint)(point1.x, point1.y, unit.angle, 1000);

                    this.game.debug.geom(new _phaser2.default.Line(point1.x, point1.y, point2.x, point2.y), color);
                } else {
                    var range = weapon.range;
                    var hitAngle = weapon.hitAngle / 2;

                    var angle1 = unit.angle - hitAngle;
                    var _point = (0, _geometry.getOffsetPoint)(unit.x, unit.y, angle1, range);
                    this.game.debug.geom(new _phaser2.default.Line(unit.x, unit.y, _point.x, _point.y), color);

                    var angle2 = unit.angle + hitAngle;
                    var _point2 = (0, _geometry.getOffsetPoint)(unit.x, unit.y, angle2, range);
                    this.game.debug.geom(new _phaser2.default.Line(unit.x, unit.y, _point2.x, _point2.y), color);
                }
            }
        }
    }]);

    return DebugInfo;
}();

exports.default = DebugInfo;

/***/ }),
/* 181 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/captainSlayer/scenes/Game/UI/HpBars.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HpBars = function () {
    function HpBars(game) {
        _classCallCheck(this, HpBars);

        this.game = game;
        this.init();
    }

    _createClass(HpBars, [{
        key: 'init',
        value: function init() {
            this.hpBarOverUnitWidth = 25;
            this.hpBarOverUnitHeight = 3;

            this.hpBarOnScreenWidth = 747;
            this.hpBarOnScreenHeight = 9;

            // this.hpBarOnScreenX = (this.game.canvasWidth - this.hpBarOnScreenWidth) / 2
            this.hpBarOnScreenX = (this.game.canvas.width - this.hpBarOnScreenWidth) / 2;
            this.hpBarOnScreenY = this.game.height - 80;
        }

        // Compute parameters for rendering HP bar.

    }, {
        key: 'computeHpBar',
        value: function computeHpBar(unit, hpBarWidth) {
            var hpPercent = unit.hp > 0 ? unit.hp / unit.hpMax : 0;

            // Get width (in px) of coloured and black parts of HP bar.
            var hpLeftWidth = Math.round(hpPercent * hpBarWidth);
            var blackBarWidth = hpBarWidth - hpLeftWidth;

            // Color dynamically changes from green to red.
            var green = Math.round(255 * (hpPercent > 0.5 ? 1 : hpPercent));
            var red = Math.round(255 * (hpPercent > 0.5 ? 1 - hpPercent / 2 : 1));
            var color = 'rgb(' + red + ',' + green + ',0)';

            return {
                color: color,
                coloredPixels: hpLeftWidth,
                blackPixels: blackBarWidth
            };
        }
    }, {
        key: 'renderHpBar',
        value: function renderHpBar(x, y, width, height, bar) {
            this.game.debug.geom(new _phaser2.default.Rectangle(x, y, bar.coloredPixels, height), bar.color, true);
            this.game.debug.geom(new _phaser2.default.Rectangle(x + bar.coloredPixels, y, bar.blackPixels, height), 'black', true);
        }
    }, {
        key: 'renderHpBarOverUnit',
        value: function renderHpBarOverUnit(unit) {
            var barProps = this.computeHpBar(unit, this.hpBarOverUnitWidth);
            this.renderHpBar(unit.x - this.hpBarOverUnitWidth / 2, unit.y, this.hpBarOverUnitWidth, this.hpBarOverUnitHeight, barProps);
        }
    }, {
        key: 'renderHpBarOnScreen',
        value: function renderHpBarOnScreen(unit) {
            var barProps = this.computeHpBar(unit, this.hpBarOnScreenWidth);
            this.renderHpBar(this.hpBarOnScreenX + this.game.camera.view.x, this.hpBarOnScreenY + this.game.camera.view.y, this.hpBarOverUnitWidth, this.hpBarOnScreenHeight, barProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            if (this.game.engine.level.lost) return;

            this.renderHpBarOnScreen(this.game.engine.hero);
            this.game.engine.enemies.forEach(function (enemy) {
                if (enemy.hp < enemy.hpMax) {
                    _this.renderHpBarOverUnit(enemy);
                }
            });
        }
    }]);

    return HpBars;
}();

exports.default = HpBars;

/***/ }),
/* 182 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./src/captainSlayer/scenes/Game/UI/InfoBars.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoBars = function () {
    function InfoBars(state) {
        _classCallCheck(this, InfoBars);

        this.state = state;
        this.game = state.game;
        var game = this.game;

        this.toolBarBg = game.texturesManager.createSpriteByName(0, 0, 'toolbar_bg');
        this.toolBarBg.width = this.game.width;
        this.toolBarBg.height = this.game.height;
        this.toolBarBg.fixedToCamera = true;

        this.leftWeaponText = game.add.text(40, game.height - 70, '', textStyle);
        this.leftWeaponText.fixedToCamera = true;

        this.rightWeaponText = game.add.text(game.width - 220, game.height - 70, '', textStyle);
        this.rightWeaponText.fixedToCamera = true;

        this.scoreText = game.add.text(game.width * 0.5, game.height - 49, '', textStyle);
        this.scoreText.anchor.setTo(0.5);
        this.scoreText.fixedToCamera = true;

        if (game.data.chosenWeapon1) {
            this.firstWeaponIcon = game.texturesManager.createSpriteByName(40, game.height - 130, game.data.chosenWeapon1.icon);
            this.firstWeaponIcon.fixedToCamera = true;
        }

        if (game.data.chosenWeapon2) {
            this.secondWeaponIcon = game.texturesManager.createSpriteByName(game.width - 230, game.height - 130, game.data.chosenWeapon2.icon);
            this.secondWeaponIcon.fixedToCamera = true;
        }
    }

    _createClass(InfoBars, [{
        key: 'render',
        value: function render() {
            var game = this.game;
            var data = game.engine.level.data;

            this.renderWeaponsInfo(game.engine.hero);
            this.scoreText.text = game.data.score ? parseFloat(game.data.score) : 0;

            if (game.engine.displayScore) {
                var width = game.width,
                    height = game.height;

                game.debug.text('Level cleared', (width - 380) / 2, height / 2 - 50, '#00ff00', '50px Courier');
                game.debug.text('Total score:' + game.data.score, (width - 380) / 2, height / 2, '#00ff00', '35px Courier');
                game.debug.text('Shots done:' + data.shots, (width - 380) / 2, height / 2 + 35, '#00ff00', '35px Courier');
                // game.debug.text('Hits done:' + data.hits, (width - 380) / 2, (height / 2) + 70, '#00ff00', '35px Courier')
                game.debug.text('Accuracy:' + (data.hits / data.shots * 100).toFixed(2) + '%', (width - 380) / 2, height / 2 + 70, '#00ff00', '35px Courier');
                game.debug.text('Click to face new enemies!', (width - 380) / 2, height / 2 + 105, '#00ff00', '35px Courier');
            }
        }
    }, {
        key: 'renderWeaponsInfo',
        value: function renderWeaponsInfo(unit) {
            if (unit.weapon1) this.leftWeaponText.text = this.getWeaponsInfo(unit.weapon1);
            if (unit.weapon2) this.rightWeaponText.text = this.getWeaponsInfo(unit.weapon2);
        }
    }, {
        key: 'getWeaponsInfo',
        value: function getWeaponsInfo(weapon) {
            var weaponInfo = 'Ammo: ';
            if (weapon.state === 'RELOAD') {
                weaponInfo = 'RELOADING: ';
                weaponInfo += Math.round((1 - weapon.frame / weapon.delayReload) * 100) + '%';
            } else {
                weaponInfo += weapon.requiresAmmo ? ' ' + weapon.ammo + ' / ' + weapon.maxAmmo : '';
            }
            return weaponInfo;
        }
    }]);

    return InfoBars;
}();

exports.default = InfoBars;


var textStyle = {
    font: '34px caveStory',
    fill: '#ffffff',
    align: 'center'
};

/***/ }),
/* 183 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./src/captainSlayer/scenes/Game/index.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _battleEngine = __webpack_require__(/*! ../../../battleEngine */ 153);

var _battleEngine2 = _interopRequireDefault(_battleEngine);

var _Buttons = __webpack_require__(/*! ./UI/Buttons */ 179);

var _Buttons2 = _interopRequireDefault(_Buttons);

var _DebugInfo = __webpack_require__(/*! ./UI/DebugInfo */ 180);

var _DebugInfo2 = _interopRequireDefault(_DebugInfo);

var _InfoBars = __webpack_require__(/*! ./UI/InfoBars */ 182);

var _InfoBars2 = _interopRequireDefault(_InfoBars);

var _HpBars = __webpack_require__(/*! ./UI/HpBars */ 181);

var _HpBars2 = _interopRequireDefault(_HpBars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            this.engine = new _battleEngine2.default(this.game);
        }
    }, {
        key: 'create',
        value: function create() {
            this.engine.create();

            this.buttons = new _Buttons2.default(this);
            this.infoBars = new _InfoBars2.default(this);
            this.debugInfo = new _DebugInfo2.default(this);
            this.hpBars = new _HpBars2.default(this.game);
        }
    }, {
        key: 'update',
        value: function update() {
            this.game.timeManager.update();
            this.engine.update();
        }
    }, {
        key: 'render',
        value: function render() {
            this.buttons.render();
            this.infoBars.render();
            this.debugInfo.render();
            this.hpBars.render();
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 184 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/captainSlayer/scenes/Menu.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            var game = this.game;
            var manager = game.texturesManager;

            this.skull = manager.createSpriteByName(this.game.width * 0.5, 165, 'logo_skull');

            this.gameName = manager.createSpriteByName(this.game.width * 0.5, 350, 'text_logo');
            this.gameName.alpha = 0;
            this.game.add.tween(this.gameName).to({ alpha: 1 }, 2000, _phaser2.default.Easing.Linear.None, true, 500, 0, false);

            this.menu = menuConfig.map(function (cfg) {
                var text = game.add.text(game.width * 0.5, cfg.y, cfg.text, style);
                text.anchor.setTo(0.5);
                text.inputEnabled = true;
                text.input.useHandCursor = true;
                text.alpha = 0;
                text.events.onInputOver.add(function () {
                    text.fill = '#8CC63F';
                }, _this2);
                text.events.onInputOut.add(function () {
                    text.fill = '#ffffff';
                }, _this2);
                text.events.onInputDown.add(function () {
                    cfg.callback(game);
                }, _this2);
                game.add.tween(text).to({ alpha: 1 }, 2000, _phaser2.default.Easing.Linear.None, true, 1000, 0, false);
                return text;
            });

            this.copyRight = this.game.add.text(this.game.width * 0.5, this.game.height - 70, '2017 Killer Koderz Kode', style);
            this.copyRight.anchor.setTo(0.5);
            this.copyRight.alpha = 0;

            this.game.add.tween(this.copyRight).to({ alpha: 1 }, 2000, _phaser2.default.Easing.Linear.None, true, 0, 0, false);
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;


var menuConfig = [{
    text: 'NEW GAME',
    y: 475,
    callback: function callback(game) {
        game.state.start('Brif');
    }
}];

var style = {
    font: '42px caveStory',
    fill: '#ffffff',
    align: 'center'
};

/***/ }),
/* 185 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./src/captainSlayer/scenes/Tangram.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'create',
        value: function create() {
            var manager = this.game.texturesManager;

            var x = this.game.width * config.x;
            var y = this.game.height * config.y;

            this.inactive = manager.createSpriteByName(x, y, 'tangram_inactive');
            this.inactive.inputEnabled = true;

            this.active = manager.createSpriteByName(x, y, 'tangram_active');
            var _active = this.active,
                width = _active.width,
                height = _active.height;


            this.clickArea = new _phaser2.default.Polygon(x, y, x - width * 0.5 - 5, y, x, y + height * 0.5 + 5);

            this.disclaimer = manager.createSpriteByName(x, y + height * 0.5 + 25, 'tangram_discl');
        }
    }, {
        key: 'render',
        value: function render() {
            var hovered = this.clickArea.contains(this.game.input.x, this.game.input.y);
            this.active.visible = hovered;

            if (this.inactive.input.pointerDown() && hovered) {
                this.game.state.start('Brif');
            }
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;


var config = {
    x: 0.5,
    y: 0.39
};

/***/ }),
/* 186 */
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    gameWidth: 1280,
    gameHeight: 768,
    // gameWidth: 1920,
    // gameHeight: 1280,
    targetFPS: 60,
    localStorageName: 'phaseres6webpack'
};

/***/ }),
/* 187 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/gameFramework/ScaleManager.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScaleManager = function () {
    function ScaleManager(game, gameWidth, gameHeight, canvasId) {
        _classCallCheck(this, ScaleManager);

        this.game = game;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.canvasId = canvasId; // Id of DOM element with Game content.
    }

    _createClass(ScaleManager, [{
        key: 'init',
        value: function init() {
            this.game.scale.setResizeCallback(this.resize, this);
            this.resize();
            this.game.scale.refresh();
        }

        // Resize game scale to place canvas completely on screen.

    }, {
        key: 'resize',
        value: function resize() {
            var gameWidth = this.gameWidth,
                gameHeight = this.gameHeight;

            var scaleW = window.innerWidth / gameWidth;
            var scaleH = window.innerHeight / gameHeight;

            // Use lowest scale to be sure that both width and height of canvas are completely on the screen.
            var usedScale = Math.min(scaleW, scaleH);
            var newWidth = gameWidth * usedScale;
            var newHeight = gameHeight * usedScale;
            this.game.scale.setMinMax(newWidth, newHeight, newWidth, newHeight);

            // Center canvas horizontally on the screen if screen width is larger than canvas width.
            document.getElementById(this.canvasId).children[0].style.left = 'calc(50% - ' + newWidth / 2 + 'px)';
        }
    }]);

    return ScaleManager;
}();

exports.default = ScaleManager;

/***/ }),
/* 188 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/gameFramework/ShooterGame.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(/*! pixi */ 102);

__webpack_require__(/*! p2 */ 103);

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _ScaleManager = __webpack_require__(/*! ./ScaleManager */ 187);

var _ScaleManager2 = _interopRequireDefault(_ScaleManager);

var _SoundsManager = __webpack_require__(/*! ./SoundsManager */ 189);

var _SoundsManager2 = _interopRequireDefault(_SoundsManager);

var _TexturesManager = __webpack_require__(/*! ./TexturesManager */ 190);

var _TexturesManager2 = _interopRequireDefault(_TexturesManager);

var _TimeManager = __webpack_require__(/*! ./TimeManager */ 191);

var _TimeManager2 = _interopRequireDefault(_TimeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShooterGame = function (_Phaser$Game) {
    _inherits(ShooterGame, _Phaser$Game);

    function ShooterGame(gameWidth, gameHeight, texturesConfig, soundsConfig, targetFPS) {
        _classCallCheck(this, ShooterGame);

        var _this = _possibleConstructorReturn(this, (ShooterGame.__proto__ || Object.getPrototypeOf(ShooterGame)).call(this, gameWidth, gameHeight,
        // Phaser.CANVAS,
        _phaser2.default.AUTO, 'content', null));

        _this.scaleManager = new _ScaleManager2.default(_this, gameWidth, gameHeight, 'content');
        _this.soundsManager = new _SoundsManager2.default(_this, soundsConfig);
        _this.texturesManager = new _TexturesManager2.default(_this, texturesConfig);
        _this.timeManager = new _TimeManager2.default(_this, targetFPS);

        _this.initGameStates(); // Should be implemented by inheritor class.
        _this.initGlobalData(); // Should be implemented by inheritor class.

        _this.state.start('Boot'); // Name of starting state is hardcoded here.
        return _this;
    }

    return ShooterGame;
}(_phaser2.default.Game);

exports.default = ShooterGame;

/***/ }),
/* 189 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./src/gameFramework/SoundsManager.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundsManager = function () {
    function SoundsManager(game, config) {
        _classCallCheck(this, SoundsManager);

        this.game = game;
        this.config = config;
        this.soundList = [];
    }

    _createClass(SoundsManager, [{
        key: "loadSounds",
        value: function loadSounds() {
            var _this = this;

            Object.values(this.config).forEach(function (sound) {
                return _this.game.load.audio(sound.key, sound.path);
            });
        }
    }, {
        key: "addSoundsToGame",
        value: function addSoundsToGame() {
            var _this2 = this;

            Object.values(this.config).forEach(function (sound) {
                var newSound = _this2.game.add.audio(sound.key);
                _this2.soundList.push(newSound);
            });
        }
    }, {
        key: "playSound",
        value: function playSound(soundKey, volume) {
            var sound = this.soundList.find(function (sound) {
                return sound.key === soundKey;
            });
            sound.play();
        }
    }, {
        key: "toggleMuteSounds",
        value: function toggleMuteSounds() {
            if (!this.game.sound.mute) {
                this.game.sound.mute = true;
            } else {
                this.game.sound.mute = false;
            }
        }
    }, {
        key: "stopSound",
        value: function stopSound(soundKey) {
            var sound = this.soundList.find(function (sound) {
                return sound.key === soundKey;
            });
            sound.stop();
        }
    }, {
        key: "loopSound",
        value: function loopSound(soundKey) {
            var sound = this.soundList.find(function (sound) {
                return sound.key === soundKey;
            });
            sound.loopFull(0.3);
        }
    }]);

    return SoundsManager;
}();

exports.default = SoundsManager;

/***/ }),
/* 190 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./src/gameFramework/TexturesManager.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TexturesManager = function () {
    function TexturesManager(game, texturesConfig) {
        _classCallCheck(this, TexturesManager);

        this.game = game;
        this.texturesConfig = texturesConfig;
    }

    _createClass(TexturesManager, [{
        key: 'preloadAssets',
        value: function preloadAssets() {
            var _this = this;

            Object.entries(this.texturesConfig).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                if (value.preload) _this.loadImageOrSpritesheet(key, value);
            });
        }
    }, {
        key: 'loadAssets',
        value: function loadAssets() {
            var _this2 = this;

            Object.entries(this.texturesConfig).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    key = _ref4[0],
                    value = _ref4[1];

                if (!value.preload) _this2.loadImageOrSpritesheet(key, value);
            });
        }
    }, {
        key: 'loadImageOrSpritesheet',
        value: function loadImageOrSpritesheet(name, texture) {
            if (!texture.spritesheet) {
                this.game.load.image(name, texture.path);
            } else {
                this.game.load.spritesheet(name, texture.path, texture.spritesheet.width, texture.spritesheet.height, texture.spritesheet.max);
            }
        }
    }, {
        key: 'initSpriteSettings',
        value: function initSpriteSettings(sprite) {
            var asset = this.texturesConfig[sprite.key];
            if (asset === undefined) return;

            if (asset.scale !== undefined) {
                sprite.scale.setTo(asset.scale.x, asset.scale.y);
            } else {
                sprite.scale.setTo(this.texturesConfig.default.scale.x, this.texturesConfig.default.scale.y);
            }

            if (asset.anchor !== undefined) {
                sprite.anchor.setTo(asset.anchor.x, asset.anchor.y);
            } else {
                sprite.anchor.setTo(this.texturesConfig.default.anchor.x, this.texturesConfig.default.anchor.y);
            }

            if (asset.animations !== undefined) {
                asset.animations.forEach(function (info) {
                    sprite.animations.add(info.name, info.frames);
                });
            }
        }
    }, {
        key: 'initSpritePoints',
        value: function initSpritePoints(sprite) {
            var asset = this.texturesConfig[sprite.key];
            if (asset === undefined) return;
            sprite.points = asset.points || { 'default': { x: sprite.anchor.x, y: sprite.anchor.y } };
        }
    }, {
        key: 'createSpriteByName',
        value: function createSpriteByName(x, y, assetName) {
            var sprite = this.game.add.sprite(x, y, assetName);
            this.initSpriteSettings(sprite);
            return sprite;
        }

        // getBoundaryBox (assetName) {
        //     let asset = this.texturesConfig[assetName]
        //     return asset.boundaryBox
        // }

    }, {
        key: 'spriteIsDynamic',
        value: function spriteIsDynamic(assetName) {
            return this.texturesConfig[assetName].dynamic !== undefined;
        }
    }, {
        key: 'createDynamicSprite',
        value: function createDynamicSprite(x, y, bodyName, weapon1Name, weapon2Name) {
            var weapon1 = this.createSpriteByName(x, y, weapon1Name);
            var weapon2 = this.createSpriteByName(x, y, weapon2Name);
            var body = this.createSpriteByName(x, y, bodyName);
            return [weapon1, weapon2, body];
        }
    }, {
        key: 'getDynamicWeaponAssetByKey',
        value: function getDynamicWeaponAssetByKey(assetName, weaponType, rightHand) {
            if (rightHand === undefined) rightHand = false;
            var asset = this.texturesConfig[assetName].dynamic;
            var sprite = rightHand ? asset.right : asset.left;
            return sprite[weaponType];
        }
    }, {
        key: 'getDynamicBodyAsset',
        value: function getDynamicBodyAsset(assetName) {
            var asset = this.texturesConfig[assetName].dynamic;
            return asset.body;
        }
    }]);

    return TexturesManager;
}();

exports.default = TexturesManager;

/***/ }),
/* 191 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/gameFramework/TimeManager.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Controls time flow to achieve target game FPS.
var TimeManager = function () {
    function TimeManager(game, targetFPS) {
        _classCallCheck(this, TimeManager);

        this.game = game;
        this.targetFPS = targetFPS;
    }

    _createClass(TimeManager, [{
        key: "init",
        value: function init() {
            this.game.time.advancedTiming = true;
            this.targetTimeDiff = 1000 / this.targetFPS;
        }
    }, {
        key: "update",
        value: function update() {
            this.fpsRate = this.game.time.elapsedMS / this.targetTimeDiff;
        }
    }]);

    return TimeManager;
}();

exports.default = TimeManager;

/***/ }),
/* 192 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/gameFramework/scenes/Boot.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 104);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Here must be loaded only assets that is used during loading screen.
// Also here must be initiated all game managers.
var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            // this.stage.backgroundColor = '#EDEEC9'
            this.fontsReady = false;
            this.fontsLoaded = this.fontsLoaded.bind(this);

            this.game.scaleManager.init();
            this.game.timeManager.init();
        }
    }, {
        key: 'preload',
        value: function preload() {
            // Images for loading bar.
            this.game.texturesManager.preloadAssets();

            _webfontloader2.default.load({
                google: {
                    families: ['caveStory'] // ['Bangers']
                },
                active: this.fontsLoaded
            });

            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
            text.anchor.setTo(0.5);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.fontsReady) {
                this.state.start('Splash');
            }
        }
    }, {
        key: 'fontsLoaded',
        value: function fontsLoaded() {
            this.fontsReady = true;
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 193 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./src/gameFramework/scenes/Splash.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 10);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Here must be loaded all assets and resources used in game.
var _class = function (_Phaser$State) {
        _inherits(_class, _Phaser$State);

        function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
                key: 'preload',
                value: function preload() {
                        this.loadingImage = this.add.image(this.game.width * 0.5, this.game.height * 0.5, 'loadingImage');
                        this.loadingImage.scale.setTo(1.5);
                        this.loadingImage.anchor.setTo(0.5);

                        this.loader = this.add.sprite(this.game.width * 0.02, this.game.height * 0.925, 'loaderBg');
                        this.loader.anchor.setTo(0, 0.5);
                        this.loader.tint = 0x888888;
                        this.loader.scale.setTo(this.game.width * 0.96 / this.loader.width, 0.65);

                        var progressBar = this.add.sprite(5, 0, 'loaderBar');
                        progressBar.anchor.setTo(0, 0.5);
                        progressBar.tint = 0xffff00;

                        this.loader.addChild(progressBar);
                        this.load.setPreloadSprite(progressBar);

                        // Load game assets.
                        this.game.texturesManager.loadAssets();
                        this.game.soundsManager.loadSounds();
                }
        }, {
                key: 'create',
                value: function create() {
                        // Sounds should be added to game just after assets are loaded.
                        this.game.soundsManager.addSoundsToGame();
                        this.state.start('Game');

                        this.game.soundsManager.toggleMuteSounds();
                }
        }]);

        return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 194 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/babel-polyfill/~/regenerator-runtime/runtime.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
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

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
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

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
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
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
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
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
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
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
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

      if (record.type === "break" ||
          record.type === "continue") {
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
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 55)))

/***/ }),
/* 195 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/fn/regexp/escape.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 202);
module.exports = __webpack_require__(/*! ../../modules/_core */ 20).RegExp.escape;


/***/ }),
/* 196 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/_array-species-constructor.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 60);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 197 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_date-to-iso-string.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 198 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/_date-to-primitive.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 199 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/_enum-keys.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 38);
var gOPS = __webpack_require__(/*! ./_object-gops */ 64);
var pIE = __webpack_require__(/*! ./_object-pie */ 52);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 200 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/_function-to-string.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ 53)('native-function-to-string', Function.toString);


/***/ }),
/* 201 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./~/core-js/modules/_replacer.js ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 202 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/core.regexp.escape.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 201)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 203 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.array.copy-within.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 110) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('copyWithin');


/***/ }),
/* 204 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.every.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 24)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 205 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.fill.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 76) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('fill');


/***/ }),
/* 206 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.filter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 24)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 207 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.array.find-index.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 24)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 208 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.find.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 24)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 209 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.for-each.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 24)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 210 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.from.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 21);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 121);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 84);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var createProperty = __webpack_require__(/*! ./_create-property */ 78);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 100);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 62)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 211 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.index-of.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 57)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 212 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.array.is-array.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 60) });


/***/ }),
/* 213 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.join.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 51) != Object || !__webpack_require__(/*! ./_strict-method */ 22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 214 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.array.last-index-of.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 215 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.array.map.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 24)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 216 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.array.of.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 78);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 217 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce-right.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 112);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 218 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.array.reduce.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 112);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 219 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.array.slice.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 82);
var cof = __webpack_require__(/*! ./_cof */ 19);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 220 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.some.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 24)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 221 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.array.sort.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 222 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.array.species.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 41)('Array');


/***/ }),
/* 223 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.date.now.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 224 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-iso-string.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 197);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 225 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.date.to-json.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 226 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 198));


/***/ }),
/* 227 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.date.to-string.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 228 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.bind.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 113) });


/***/ }),
/* 229 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.function.has-instance.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 230 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.function.name.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 231 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.acosh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 124);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 232 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.asinh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 233 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.atanh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 234 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cbrt.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 88);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 235 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.clz32.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 236 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.cosh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 237 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.expm1.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 87);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 238 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.math.fround.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 123) });


/***/ }),
/* 239 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.hypot.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 240 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.imul.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 241 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log10.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 242 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.log1p.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 124) });


/***/ }),
/* 243 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.log2.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 244 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sign.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 88) });


/***/ }),
/* 245 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.sinh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 87);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 246 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.math.tanh.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 87);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 247 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.math.trunc.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 248 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 15);
var cof = __webpack_require__(/*! ./_cof */ 19);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 83);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 49).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 13)(global, NUMBER, $Number);
}


/***/ }),
/* 249 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.number.epsilon.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 250 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-finite.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 251 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-integer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 120) });


/***/ }),
/* 252 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-nan.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 253 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.number.is-safe-integer.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 120);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 254 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.max-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 255 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.number.min-safe-integer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 256 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-float.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 132);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 257 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.number.parse-int.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 133);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 258 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-fixed.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 109);
var repeat = __webpack_require__(/*! ./_string-repeat */ 95);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 259 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.number.to-precision.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 109);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 260 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.assign.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 126) });


/***/ }),
/* 261 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.create.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 36) });


/***/ }),
/* 262 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-properties.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 127) });


/***/ }),
/* 263 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.object.define-property.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 8).f });


/***/ }),
/* 264 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.object.freeze.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 265 */
/* no static exports found */
/* all exports used */
/*!*********************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 26)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 266 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-own-property-names.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 26)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 128).f;
});


/***/ }),
/* 267 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 26)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 268 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-extensible.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 269 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-frozen.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 270 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.is-sealed.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 26)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 271 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.object.is.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 136) });


/***/ }),
/* 272 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.keys.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 38);

__webpack_require__(/*! ./_object-sap */ 26)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 273 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.object.prevent-extensions.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 274 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.object.seal.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 26)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 275 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 92).set });


/***/ }),
/* 276 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.object.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 46);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 277 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.parse-float.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 132);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 278 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es6.parse-int.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 133);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 279 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/core-js/modules/es6.promise.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 32);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 21);
var classof = __webpack_require__(/*! ./_classof */ 46);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var forOf = __webpack_require__(/*! ./_for-of */ 35);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 54);
var task = __webpack_require__(/*! ./_task */ 97).set;
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 90);
var perform = __webpack_require__(/*! ./_perform */ 134);
var userAgent = __webpack_require__(/*! ./_user-agent */ 70);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 135);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 40)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 48)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 41)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 20)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 62)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 280 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.apply.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 281 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.construct.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 36);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 113);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 282 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.define-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 283 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.delete-property.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 284 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.enumerate.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 85)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 285 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 286 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 287 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.get.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 15);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 288 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.has.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 289 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.is-extensible.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 290 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.own-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 131) });


/***/ }),
/* 291 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 292 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 92);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 293 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.reflect.set.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 15);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 39);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 294 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.constructor.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 83);
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 37).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 61);
var $flags = __webpack_require__(/*! ./_flags */ 50);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 7) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 13)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 41)('RegExp');


/***/ }),
/* 295 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.match.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 75);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 65);

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 59)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 296 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.replace.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 75);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 65);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 59)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 297 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.search.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 1);
var sameValue = __webpack_require__(/*! ./_same-value */ 136);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 65);

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 59)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 298 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.regexp.split.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(/*! ./_is-regexp */ 61);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 54);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 75);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var callRegExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 65);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 91);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 59)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 299 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.regexp.to-string.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 142);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 50);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 300 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.anchor.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 301 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.big.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 302 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.blink.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 303 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.bold.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 304 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es6.string.code-point-at.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 68)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 305 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.ends-with.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var context = __webpack_require__(/*! ./_string-context */ 94);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 306 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.fixed.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 307 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontcolor.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 308 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.fontsize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 309 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/modules/es6.string.from-code-point.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 310 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.includes.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 94);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 311 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es6.string.italics.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 312 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.string.iterator.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 68)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 86)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 313 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.link.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 314 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.raw.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var toLength = __webpack_require__(/*! ./_to-length */ 6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 315 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.repeat.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 95)
});


/***/ }),
/* 316 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es6.string.small.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 317 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.string.starts-with.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var context = __webpack_require__(/*! ./_string-context */ 94);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 318 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es6.string.strike.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 319 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sub.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 320 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es6.string.sup.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 321 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es6.string.trim.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 49)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 322 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es6.symbol.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 15);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var META = __webpack_require__(/*! ./_meta */ 33).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 53);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 48);
var uid = __webpack_require__(/*! ./_uid */ 43);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 139);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 99);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 199);
var isArray = __webpack_require__(/*! ./_is-array */ 60);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var createDesc = __webpack_require__(/*! ./_property-desc */ 39);
var _create = __webpack_require__(/*! ./_object-create */ 36);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 128);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $GOPS = __webpack_require__(/*! ./_object-gops */ 64);
var $DP = __webpack_require__(/*! ./_object-dp */ 8);
var $keys = __webpack_require__(/*! ./_object-keys */ 38);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 52).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 32)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 323 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.array-buffer.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 69);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 98);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 42);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 54);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 41)(ARRAY_BUFFER);


/***/ }),
/* 324 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es6.typed.data-view.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 69).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 98).DataView
});


/***/ }),
/* 325 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float32-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 326 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/modules/es6.typed.float64-array.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 327 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int16-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 328 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int32-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 329 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es6.typed.int8-array.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 330 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint16-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 331 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint32-array.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 332 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-array.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 333 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 29)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 334 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es6.weak-set.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 116);
var validate = __webpack_require__(/*! ./_validate-collection */ 44);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 58)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 335 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.array.flat-map.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 117);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 77);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatMap');


/***/ }),
/* 336 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.array.flatten.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 117);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var toInteger = __webpack_require__(/*! ./_to-integer */ 23);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 77);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatten');


/***/ }),
/* 337 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.array.includes.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 57)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('includes');


/***/ }),
/* 338 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./~/core-js/modules/es7.asap.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 339 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.error.is-error.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 340 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es7.global.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 341 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es7.map.from.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 66)('Map');


/***/ }),
/* 342 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es7.map.of.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 67)('Map');


/***/ }),
/* 343 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.map.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 115)('Map') });


/***/ }),
/* 344 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.clamp.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 345 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.math.deg-per-rad.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 346 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es7.math.degrees.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 347 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.math.fscale.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 125);
var fround = __webpack_require__(/*! ./_math-fround */ 123);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 348 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.iaddh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 349 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.imulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 350 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.isubh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 351 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.math.rad-per-deg.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 352 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es7.math.radians.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 353 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.scale.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 125) });


/***/ }),
/* 354 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/es7.math.signbit.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 355 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.math.umulh.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 356 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 63), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 357 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.define-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 63), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 358 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.object.entries.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 130)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 359 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************!*\
  !*** ./~/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 131);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 18);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var createProperty = __webpack_require__(/*! ./_create-property */ 78);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 360 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-getter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 63), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 361 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.object.lookup-setter.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 27);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 63), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 362 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.object.values.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 130)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 363 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/modules/es7.observable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 20);
var microtask = __webpack_require__(/*! ./_microtask */ 89)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 34);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 40);
var hide = __webpack_require__(/*! ./_hide */ 12);
var forOf = __webpack_require__(/*! ./_for-of */ 35);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 41)('Observable');


/***/ }),
/* 364 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/modules/es7.promise.finally.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 20);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 54);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 135);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 365 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.promise.try.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 90);
var perform = __webpack_require__(/*! ./_perform */ 134);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 366 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.define-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 367 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.delete-metadata.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 368 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 143);
var from = __webpack_require__(/*! ./_array-from-iterable */ 111);
var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 369 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 370 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 371 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 372 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-metadata.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 373 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 374 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.reflect.metadata.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 375 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/modules/es7.set.from.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 66)('Set');


/***/ }),
/* 376 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/es7.set.of.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 67)('Set');


/***/ }),
/* 377 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.set.to-json.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 115)('Set') });


/***/ }),
/* 378 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/es7.string.at.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 68)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 379 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.match-all.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 25);
var toLength = __webpack_require__(/*! ./_to-length */ 6);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 61);
var getFlags = __webpack_require__(/*! ./_flags */ 50);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 85)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 380 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-end.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 137);
var userAgent = __webpack_require__(/*! ./_user-agent */ 70);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 381 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.pad-start.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 137);
var userAgent = __webpack_require__(/*! ./_user-agent */ 70);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 382 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-left.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 383 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.string.trim-right.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 49)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 384 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.async-iterator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 99)('asyncIterator');


/***/ }),
/* 385 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/modules/es7.symbol.observable.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 99)('observable');


/***/ }),
/* 386 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.system.global.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 387 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.weak-map.from.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 66)('WeakMap');


/***/ }),
/* 388 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.weak-map.of.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 67)('WeakMap');


/***/ }),
/* 389 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/modules/es7.weak-set.from.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 66)('WeakSet');


/***/ }),
/* 390 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/modules/es7.weak-set.of.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 67)('WeakSet');


/***/ }),
/* 391 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/modules/web.dom.iterable.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 101);
var getKeys = __webpack_require__(/*! ./_object-keys */ 38);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 47);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 392 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/modules/web.immediate.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 97);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 393 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/core-js/modules/web.timers.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var userAgent = __webpack_require__(/*! ./_user-agent */ 70);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 394 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./~/core-js/shim.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 322);
__webpack_require__(/*! ./modules/es6.object.create */ 261);
__webpack_require__(/*! ./modules/es6.object.define-property */ 263);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 262);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 265);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 267);
__webpack_require__(/*! ./modules/es6.object.keys */ 272);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 266);
__webpack_require__(/*! ./modules/es6.object.freeze */ 264);
__webpack_require__(/*! ./modules/es6.object.seal */ 274);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 273);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 269);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 270);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 268);
__webpack_require__(/*! ./modules/es6.object.assign */ 260);
__webpack_require__(/*! ./modules/es6.object.is */ 271);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 275);
__webpack_require__(/*! ./modules/es6.object.to-string */ 276);
__webpack_require__(/*! ./modules/es6.function.bind */ 228);
__webpack_require__(/*! ./modules/es6.function.name */ 230);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 229);
__webpack_require__(/*! ./modules/es6.parse-int */ 278);
__webpack_require__(/*! ./modules/es6.parse-float */ 277);
__webpack_require__(/*! ./modules/es6.number.constructor */ 248);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 258);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 259);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 249);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 250);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 251);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 252);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 253);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 254);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 255);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 256);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 257);
__webpack_require__(/*! ./modules/es6.math.acosh */ 231);
__webpack_require__(/*! ./modules/es6.math.asinh */ 232);
__webpack_require__(/*! ./modules/es6.math.atanh */ 233);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 234);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 235);
__webpack_require__(/*! ./modules/es6.math.cosh */ 236);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 237);
__webpack_require__(/*! ./modules/es6.math.fround */ 238);
__webpack_require__(/*! ./modules/es6.math.hypot */ 239);
__webpack_require__(/*! ./modules/es6.math.imul */ 240);
__webpack_require__(/*! ./modules/es6.math.log10 */ 241);
__webpack_require__(/*! ./modules/es6.math.log1p */ 242);
__webpack_require__(/*! ./modules/es6.math.log2 */ 243);
__webpack_require__(/*! ./modules/es6.math.sign */ 244);
__webpack_require__(/*! ./modules/es6.math.sinh */ 245);
__webpack_require__(/*! ./modules/es6.math.tanh */ 246);
__webpack_require__(/*! ./modules/es6.math.trunc */ 247);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 309);
__webpack_require__(/*! ./modules/es6.string.raw */ 314);
__webpack_require__(/*! ./modules/es6.string.trim */ 321);
__webpack_require__(/*! ./modules/es6.string.iterator */ 312);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 304);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 305);
__webpack_require__(/*! ./modules/es6.string.includes */ 310);
__webpack_require__(/*! ./modules/es6.string.repeat */ 315);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 317);
__webpack_require__(/*! ./modules/es6.string.anchor */ 300);
__webpack_require__(/*! ./modules/es6.string.big */ 301);
__webpack_require__(/*! ./modules/es6.string.blink */ 302);
__webpack_require__(/*! ./modules/es6.string.bold */ 303);
__webpack_require__(/*! ./modules/es6.string.fixed */ 306);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 307);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 308);
__webpack_require__(/*! ./modules/es6.string.italics */ 311);
__webpack_require__(/*! ./modules/es6.string.link */ 313);
__webpack_require__(/*! ./modules/es6.string.small */ 316);
__webpack_require__(/*! ./modules/es6.string.strike */ 318);
__webpack_require__(/*! ./modules/es6.string.sub */ 319);
__webpack_require__(/*! ./modules/es6.string.sup */ 320);
__webpack_require__(/*! ./modules/es6.date.now */ 223);
__webpack_require__(/*! ./modules/es6.date.to-json */ 225);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 224);
__webpack_require__(/*! ./modules/es6.date.to-string */ 227);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 226);
__webpack_require__(/*! ./modules/es6.array.is-array */ 212);
__webpack_require__(/*! ./modules/es6.array.from */ 210);
__webpack_require__(/*! ./modules/es6.array.of */ 216);
__webpack_require__(/*! ./modules/es6.array.join */ 213);
__webpack_require__(/*! ./modules/es6.array.slice */ 219);
__webpack_require__(/*! ./modules/es6.array.sort */ 221);
__webpack_require__(/*! ./modules/es6.array.for-each */ 209);
__webpack_require__(/*! ./modules/es6.array.map */ 215);
__webpack_require__(/*! ./modules/es6.array.filter */ 206);
__webpack_require__(/*! ./modules/es6.array.some */ 220);
__webpack_require__(/*! ./modules/es6.array.every */ 204);
__webpack_require__(/*! ./modules/es6.array.reduce */ 218);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 217);
__webpack_require__(/*! ./modules/es6.array.index-of */ 211);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 214);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 203);
__webpack_require__(/*! ./modules/es6.array.fill */ 205);
__webpack_require__(/*! ./modules/es6.array.find */ 208);
__webpack_require__(/*! ./modules/es6.array.find-index */ 207);
__webpack_require__(/*! ./modules/es6.array.species */ 222);
__webpack_require__(/*! ./modules/es6.array.iterator */ 101);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 294);
__webpack_require__(/*! ./modules/es6.regexp.exec */ 141);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 299);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 142);
__webpack_require__(/*! ./modules/es6.regexp.match */ 295);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 296);
__webpack_require__(/*! ./modules/es6.regexp.search */ 297);
__webpack_require__(/*! ./modules/es6.regexp.split */ 298);
__webpack_require__(/*! ./modules/es6.promise */ 279);
__webpack_require__(/*! ./modules/es6.map */ 140);
__webpack_require__(/*! ./modules/es6.set */ 143);
__webpack_require__(/*! ./modules/es6.weak-map */ 144);
__webpack_require__(/*! ./modules/es6.weak-set */ 334);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 323);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 324);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 329);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 332);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 333);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 327);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 330);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 328);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 331);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 325);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 326);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 280);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 281);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 282);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 283);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 284);
__webpack_require__(/*! ./modules/es6.reflect.get */ 287);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 285);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 286);
__webpack_require__(/*! ./modules/es6.reflect.has */ 288);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 289);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 290);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 291);
__webpack_require__(/*! ./modules/es6.reflect.set */ 293);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 292);
__webpack_require__(/*! ./modules/es7.array.includes */ 337);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 335);
__webpack_require__(/*! ./modules/es7.array.flatten */ 336);
__webpack_require__(/*! ./modules/es7.string.at */ 378);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 381);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 380);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 382);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 383);
__webpack_require__(/*! ./modules/es7.string.match-all */ 379);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 384);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 385);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 359);
__webpack_require__(/*! ./modules/es7.object.values */ 362);
__webpack_require__(/*! ./modules/es7.object.entries */ 358);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 356);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 357);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 360);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 361);
__webpack_require__(/*! ./modules/es7.map.to-json */ 343);
__webpack_require__(/*! ./modules/es7.set.to-json */ 377);
__webpack_require__(/*! ./modules/es7.map.of */ 342);
__webpack_require__(/*! ./modules/es7.set.of */ 376);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 388);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 390);
__webpack_require__(/*! ./modules/es7.map.from */ 341);
__webpack_require__(/*! ./modules/es7.set.from */ 375);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 387);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 389);
__webpack_require__(/*! ./modules/es7.global */ 340);
__webpack_require__(/*! ./modules/es7.system.global */ 386);
__webpack_require__(/*! ./modules/es7.error.is-error */ 339);
__webpack_require__(/*! ./modules/es7.math.clamp */ 344);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 345);
__webpack_require__(/*! ./modules/es7.math.degrees */ 346);
__webpack_require__(/*! ./modules/es7.math.fscale */ 347);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 348);
__webpack_require__(/*! ./modules/es7.math.isubh */ 350);
__webpack_require__(/*! ./modules/es7.math.imulh */ 349);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 351);
__webpack_require__(/*! ./modules/es7.math.radians */ 352);
__webpack_require__(/*! ./modules/es7.math.scale */ 353);
__webpack_require__(/*! ./modules/es7.math.umulh */ 355);
__webpack_require__(/*! ./modules/es7.math.signbit */ 354);
__webpack_require__(/*! ./modules/es7.promise.finally */ 364);
__webpack_require__(/*! ./modules/es7.promise.try */ 365);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 366);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 367);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 369);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 368);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 371);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 370);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 372);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 373);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 374);
__webpack_require__(/*! ./modules/es7.asap */ 338);
__webpack_require__(/*! ./modules/es7.observable */ 363);
__webpack_require__(/*! ./modules/web.timers */ 393);
__webpack_require__(/*! ./modules/web.immediate */ 392);
__webpack_require__(/*! ./modules/web.dom.iterable */ 391);
module.exports = __webpack_require__(/*! ./modules/_core */ 20);


/***/ }),
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */146);
module.exports = __webpack_require__(/*! c:\MyWebProjects\0_Panzer\src\main.js */145);


/***/ })
],[399]);
//# sourceMappingURL=bundle.js.map