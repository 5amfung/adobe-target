/**
 * @license
 * at.js 2.5.0 | (c) Adobe Systems Incorporated | All rights reserved
 * zepto.js | (c) 2010-2016 Thomas Fuchs | zeptojs.com/license
*/
window.adobe = window.adobe || {};
window.adobe.target = (function () {
	'use strict';

	// This is used to make RequireJS happy
	var define;
	var _win = window;
	var _doc = document;
	var _isIE10OrModernBrowser = _doc.documentMode ? _doc.documentMode >= 10 : true;
	var _isStandardMode = _doc.compatMode && _doc.compatMode === "CSS1Compat";

	function isIE() {
	  var ua = window.navigator.userAgent;
	  var ie10orOlder = ua.indexOf("MSIE ") > 0;
	  var ie11 = ua.indexOf("Trident/") > 0;

	  return ie10orOlder || ie11;
	}

	var _isEnabled = _isStandardMode && _isIE10OrModernBrowser && !isIE();
	var _globalSettings = _win.targetGlobalSettings;

	function doNothing() {
	  return {
	    then: doNothing,
	    catch: doNothing
	  };
	}

	if (!_isEnabled || (_globalSettings && _globalSettings.enabled === false)) {
	  _win.adobe = _win.adobe || {};
	  _win.adobe.target = {
	    VERSION: "",
	    event: {},
	    getAttributes: doNothing,
	    getOffer: doNothing,
	    getOffers: doNothing,
	    applyOffer: doNothing,
	    applyOffers: doNothing,
	    sendNotifications: doNothing,
	    trackEvent: doNothing,
	    triggerView: doNothing,
	    registerExtension: doNothing,
	    init: doNothing
	  };
	  _win.mboxCreate = doNothing;
	  _win.mboxDefine = doNothing;
	  _win.mboxUpdate = doNothing;

	  if ("console" in _win && "warn" in _win.console) {
	    _win.console.warn(
	      "AT: Adobe Target content delivery is disabled. Update your DOCTYPE to support Standards mode."
	    );
	  }

	  return _win.adobe.target;
	}


	var ARTIFACT_DOWNLOAD_SUCCEEDED = "artifactDownloadSucceeded";
	var ARTIFACT_DOWNLOAD_FAILED = "artifactDownloadFailed";
	var GEO_LOCATION_UPDATED = "geoLocationUpdated";

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
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
	    }
	    var test1 = new String('abc');
	    test1[5] = 'de';
	    if (Object.getOwnPropertyNames(test1)[0] === '5') {
	      return false;
	    }
	    var test2 = {};
	    for (var i = 0; i < 10; i++) {
	      test2['_' + String.fromCharCode(i)] = i;
	    }
	    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
	      return test2[n];
	    });
	    if (order2.join('') !== '0123456789') {
	      return false;
	    }
	    var test3 = {};
	    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
	      test3[letter] = letter;
	    });
	    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
	      return false;
	    }
	    return true;
	  } catch (err) {
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

	var reactorObjectAssign = objectAssign;

	function isNil(value) {
	  return value == null;
	}

	var isArray = Array.isArray;

	var objectProto = Object.prototype;
	var nativeObjectToString = objectProto.toString;
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	function baseGetTag(value) {
	  return objectToString(value);
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _defineProperty(obj, key, value) {
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

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it;

	  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = o[Symbol.iterator]();
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it['return'] != null) it['return']();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	function isObject(value) {
	  var type = _typeof(value);
	  var notNull = value != null;
	  return notNull && (type === "object" || type === "function");
	}

	var funcTag = "[object Function]";
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  return baseGetTag(value) === funcTag;
	}

	function identity(value) {
	  return value;
	}

	function castFunction(value) {
	  return isFunction(value) ? value : identity;
	}

	function keys(object) {
	  if (isNil(object)) {
	    return [];
	  }
	  return Object.keys(object);
	}

	var arrayEach = function arrayEach(iteratee, collection) {
	  return collection.forEach(iteratee);
	};

	var baseEach = function baseEach(iteratee, collection) {
	  arrayEach(function (key) {
	    return iteratee(collection[key], key);
	  }, keys(collection));
	};

	var arrayFilter = function arrayFilter(predicate, collection) {
	  return collection.filter(predicate);
	};
	var baseFilter = function baseFilter(predicate, collection) {
	  var result = {};
	  baseEach(function (value, key) {
	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }, collection);
	  return result;
	};
	function filter(predicate, collection) {
	  if (isNil(collection)) {
	    return [];
	  }
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(castFunction(predicate), collection);
	}

	function first(array) {
	  return array && array.length ? array[0] : undefined;
	}

	function flatten(array) {
	  if (isNil(array)) {
	    return [];
	  }
	  return [].concat.apply([], array);
	}

	function flow(funcs) {
	  var _this = this;
	  var length = funcs ? funcs.length : 0;
	  var index = length;
	  while (index -= 1) {
	    if (!isFunction(funcs[index])) {
	      throw new TypeError("Expected a function");
	    }
	  }
	  return function () {
	    var i = 0;
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    var result = length ? funcs[i].apply(_this, args) : args[0];
	    while ((i += 1) < length) {
	      result = funcs[i].call(_this, result);
	    }
	    return result;
	  };
	}

	function forEach(iteratee, collection) {
	  if (isNil(collection)) {
	    return;
	  }
	  var func = isArray(collection) ? arrayEach : baseEach;
	  func(castFunction(iteratee), collection);
	}

	function isObjectLike(value) {
	  var notNull = value != null;
	  return notNull && _typeof(value) === "object";
	}

	var stringTag = "[object String]";
	function isString(value) {
	  return typeof value === "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) === stringTag;
	}

	function hash(string) {
	  if (!isString(string)) {
	    return -1;
	  }
	  var result = 0;
	  var length = string.length;
	  for (var i = 0; i < length; i += 1) {
	    result = (result << 5) - result + string.charCodeAt(i) & 0xffffffff;
	  }
	  return result;
	}

	var MAX_SAFE_INTEGER = 9007199254740991;
	function isLength(value) {
	  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
	}

	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	var arrayMap = function arrayMap(iteratee, collection) {
	  return collection.map(iteratee);
	};

	function baseValues(props, object) {
	  return arrayMap(function (key) {
	    return object[key];
	  }, props);
	}
	function copyArray(source) {
	  var index = 0;
	  var length = source.length;
	  var array = Array(length);
	  while (index < length) {
	    array[index] = source[index];
	    index += 1;
	  }
	  return array;
	}
	function stringToArray(str) {
	  return str.split("");
	}
	function toArray(value) {
	  if (isNil(value)) {
	    return [];
	  }
	  if (isArrayLike(value)) {
	    return isString(value) ? stringToArray(value) : copyArray(value);
	  }
	  return baseValues(keys(value), value);
	}

	function includes(value, collection) {
	  var coll = isArrayLike(collection) ? collection : toArray(collection);
	  return coll.indexOf(value) > -1;
	}

	var objectProto$1 = Object.prototype;
	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice))) {
	    return !value.length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty$1.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	var stringProto = String.prototype;
	var nativeStringTrim = stringProto.trim;
	function trim(string) {
	  return isNil(string) ? "" : nativeStringTrim.call(string);
	}

	function isBlank(value) {
	  return isString(value) ? !trim(value) : isEmpty(value);
	}

	var isNotBlank = function isNotBlank(value) {
	  return !isBlank(value);
	};

	var numberTag = "[object Number]";
	function isNumber(value) {
	  return typeof value === "number" || isObjectLike(value) && baseGetTag(value) === numberTag;
	}

	var objectTag = "[object Object]";
	var funcProto = Function.prototype;
	var objectProto$2 = Object.prototype;
	var funcToString = funcProto.toString;
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
	var objectCtorString = funcToString.call(Object);
	function getPrototype(value) {
	  return Object.getPrototypeOf(Object(value));
	}
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
	  return typeof Ctor === "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
	}

	function join(joiner, collection) {
	  if (!isArray(collection)) {
	    return "";
	  }
	  return collection.join(joiner || "");
	}

	var baseMap = function baseMap(iteratee, collection) {
	  var result = {};
	  baseEach(function (value, key) {
	    result[key] = iteratee(value, key);
	  }, collection);
	  return result;
	};
	function map(iteratee, collection) {
	  if (isNil(collection)) {
	    return [];
	  }
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(castFunction(iteratee), collection);
	}

	function now() {
	  return new Date().getTime();
	}

	var arrayReduce = function arrayReduce(iteratee, accumulator, collection) {
	  return collection.reduce(iteratee, accumulator);
	};
	var baseReduce = function baseReduce(iteratee, accumulator, collection) {
	  var localAcc = accumulator;
	  baseEach(function (value, key) {
	    localAcc = iteratee(localAcc, value, key);
	  }, collection);
	  return localAcc;
	};
	function reduce(iteratee, accumulator, collection) {
	  if (isNil(collection)) {
	    return accumulator;
	  }
	  var func = isArray(collection) ? arrayReduce : baseReduce;
	  return func(castFunction(iteratee), accumulator, collection);
	}

	var arrayProto = Array.prototype;
	var nativeReverse = arrayProto.reverse;
	function reverse(array) {
	  return array == null ? array : nativeReverse.call(array);
	}

	function split(separator, string) {
	  if (isBlank(string)) {
	    return [];
	  }
	  return string.split(separator || "");
	}

	function random(lower, upper) {
	  return lower + Math.floor(Math.random() * (upper - lower + 1));
	}
	function uuid() {
	  var d = now();
	  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	    var r = (d + random(0, 16)) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
	  });
	}

	function values(obj) {
	  if (obj === null || _typeof(obj) !== "object") {
	    return [];
	  }
	  return Object.keys(obj).map(function (key) {
	    return obj[key];
	  });
	}

	function delay(func) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return setTimeout(func, Number(wait) || 0);
	}
	function cancelDelay(id) {
	  clearTimeout(id);
	}

	var DECISIONING_METHOD = {
	  ON_DEVICE: "on-device",
	  SERVER_SIDE: "server-side",
	  HYBRID: "hybrid"
	};

	var AT_PREFIX = "AT:";
	var NOOP_LOGGER = {
	  debug: function debug() {},
	  error: function error() {}
	};
	function getLogger() {
	  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  if (logger.built) {
	    return logger;
	  }
	  var debug = logger.debug,
	      error = logger.error;
	  var targetLogger = reactorObjectAssign({
	    built: true
	  }, NOOP_LOGGER);
	  if (isFunction(debug)) {
	    targetLogger.debug = function () {
	      for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
	        messages[_key] = arguments[_key];
	      }
	      logger.debug.apply(null, [AT_PREFIX].concat(messages));
	    };
	  }
	  if (isFunction(error)) {
	    targetLogger.error = function () {
	      for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        messages[_key2] = arguments[_key2];
	      }
	      logger.error.apply(null, [AT_PREFIX].concat(messages));
	    };
	  }
	  return targetLogger;
	}

	var ATTRIBUTE_NOT_EXIST = function ATTRIBUTE_NOT_EXIST(keyName, mboxName) {
	  return "Attribute '" + keyName + "' does not exist for mbox '" + mboxName + "'";
	};
	var DECISIONING_ENGINE_NOT_READY = "Unable to fulfill request; decisioning engine not ready.";
	var PROPERTY_TOKEN_MISMATCH = function PROPERTY_TOKEN_MISMATCH(requestProperty, configProperty) {
	  return "The property token specified in the request \"" + requestProperty + "\" does not match the one specified in the config \"" + configProperty + "\".";
	};

	var DEFAULT_GLOBAL_MBOX = "target-global-mbox";
	var DEFAULT_NUM_FETCH_RETRIES = 10;
	var ChannelType = {
	  Mobile: "mobile",
	  Web: "web"
	};
	var MetricType = {
	  Click: "click",
	  Display: "display"
	};
	var AuthenticatedState = {
	  Unknown: "unknown",
	  Authenticated: "authenticated",
	  LoggedOut: "logged_out"
	};
	var EMPTY_REQUEST = {
	  context: {
	    channel: ChannelType.Web
	  }
	};
	var ENVIRONMENT_PROD = "production";
	var ENVIRONMENT_STAGE = "staging";
	var ENVIRONMENT_DEV = "development";
	var POSSIBLE_ENVIRONMENTS = [ENVIRONMENT_PROD, ENVIRONMENT_STAGE, ENVIRONMENT_DEV];
	var UNKNOWN_IP_ADDRESS = "unknownIpAddress";

	var VIEWS = "views";
	var MBOXES = "mboxes";
	function isUndefined(value) {
	  return typeof value === "undefined";
	}
	function isDefined(value) {
	  return !isUndefined(value);
	}
	function getNamesForRequested(itemsKey, deliveryRequest) {
	  var resultSet = new Set();
	  ["prefetch", "execute"].forEach(function (type) {
	    var items = deliveryRequest && deliveryRequest[type] && deliveryRequest[type][itemsKey] instanceof Array ? deliveryRequest[type][itemsKey] : [];
	    items.filter(function (item) {
	      return isDefined(item.name);
	    }).forEach(function (item) {
	      resultSet.add(item.name);
	    });
	  });
	  return resultSet;
	}
	function getMboxNames(deliveryRequest) {
	  return getNamesForRequested(MBOXES, deliveryRequest);
	}
	function getViewNames(deliveryRequest) {
	  return getNamesForRequested(VIEWS, deliveryRequest);
	}
	function hasRequested(itemsKey, deliveryRequest) {
	  var types = ["prefetch", "execute"];
	  for (var i = 0; i < types.length; i += 1) {
	    var type = types[i];
	    var items = deliveryRequest && deliveryRequest[type] && deliveryRequest[type][itemsKey] instanceof Array ? deliveryRequest[type][itemsKey] : undefined;
	    if (isDefined(items) && items instanceof Array) {
	      return true;
	    }
	  }
	  return false;
	}
	function hasRequestedViews(deliveryRequest) {
	  return hasRequested(VIEWS, deliveryRequest);
	}
	function addMboxesToRequest(mboxNames, request) {
	  var requestType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "execute";
	  var requestedMboxes = getMboxNames(request);
	  var mboxes = [];
	  if (request && request[requestType] && request[requestType].mboxes instanceof Array) {
	    Array.prototype.push.apply(mboxes, request[requestType].mboxes);
	  }
	  var highestUserSpecifiedIndex = mboxes.reduce(function (highest, mbox) {
	    return Math.max(highest, isNumber(mbox.index) ? mbox.index : 0);
	  }, 0);
	  var nextIndex = highestUserSpecifiedIndex + 1;
	  mboxNames.filter(function (mboxName) {
	    return !requestedMboxes.has(mboxName);
	  }).forEach(function (mboxName) {
	    mboxes.push({
	      name: mboxName,
	      index: nextIndex
	    });
	    nextIndex += 1;
	  });
	  var result = _objectSpread2({}, request);
	  result[requestType] = _objectSpread2(_objectSpread2({}, request[requestType]), {}, {
	    mboxes: mboxes
	  });
	  return result;
	}
	function isBrowser() {
	  return typeof window !== "undefined";
	}
	function isNodeJS() {
	  return typeof global !== "undefined";
	}
	var noop = function noop() {
	  return undefined;
	};
	var noopPromise = function noopPromise(value) {
	  return Promise.resolve(value);
	};
	function requiresDecisioningEngine(decisioningMethod) {
	  return includes(decisioningMethod, [DECISIONING_METHOD.ON_DEVICE, DECISIONING_METHOD.HYBRID]);
	}
	function objectWithoutUndefinedValues(obj) {
	  var result = _objectSpread2({}, obj);
	  Object.keys(result).forEach(function (key) {
	    if (isUndefined(result[key])) {
	      delete result[key];
	    }
	  });
	  return result;
	}
	function getPropertyToken() {
	  var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	    token: undefined
	  };
	  var _property$token = property.token,
	      token = _property$token === void 0 ? undefined : _property$token;
	  return token;
	}
	function getProperty() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var logger = arguments.length > 2 ? arguments[2] : undefined;
	  var configPropertyToken = config.propertyToken;
	  var requestPropertyToken = getPropertyToken(request.property);
	  var propertyToken = requestPropertyToken || configPropertyToken;
	  if (isDefined(requestPropertyToken) && requestPropertyToken !== configPropertyToken) {
	    getLogger(logger).debug(PROPERTY_TOKEN_MISMATCH(requestPropertyToken, configPropertyToken));
	  }
	  return propertyToken ? {
	    token: propertyToken
	  } : undefined;
	}
	function isValidIpAddress(ipAddress) {
	  var IP_ADDRESS = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g;
	  return isString(ipAddress) && IP_ADDRESS.test(ipAddress);
	}
	function memoize(func) {
	  var keyResolverFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (arr) {
	    return arr[0];
	  };
	  var memoizedValues = {};
	  return function memoized() {
	    for (var _len = arguments.length, funcArgs = new Array(_len), _key = 0; _key < _len; _key++) {
	      funcArgs[_key] = arguments[_key];
	    }
	    var key = keyResolverFunc.call(this, funcArgs);
	    if (!isDefined(memoizedValues[key])) {
	      memoizedValues[key] = func.call.apply(func, [null].concat(funcArgs));
	    }
	    return memoizedValues[key];
	  };
	}

	var NOT_MODIFIED = 304;
	function getFetchApi(fetchApi) {
	  if (isFunction(fetchApi)) {
	    return fetchApi;
	  }
	  var api;
	  if (isNodeJS() && typeof global.fetch === "function") {
	    api = global.fetch;
	  } else if (isBrowser() &&
	  typeof window.fetch === "function") {
	    api = window.fetch.bind(window);
	  }
	  return api;
	}
	function getFetchWithRetry(fetchApi) {
	  var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_NUM_FETCH_RETRIES;
	  var errorFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (errorMessage) {
	    return errorMessage;
	  };
	  var incidentalFailureCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
	  return function fetchWithRetry(url, options) {
	    var numRetries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : maxRetries;
	    return fetchApi(url, options).then(function (res) {
	      if (!res.ok && res.status !== NOT_MODIFIED) {
	        throw Error(res.statusText);
	      }
	      return res;
	    })['catch'](function (err) {
	      if (isFunction(incidentalFailureCallback)) {
	        incidentalFailureCallback.call(undefined, err);
	      }
	      if (numRetries < 1) {
	        throw new Error(errorFunc(err.message));
	      }
	      return fetchWithRetry(url, options, numRetries - 1);
	    });
	  };
	}

	function createIndexed(response) {
	  var result = {};
	  ["prefetch", "execute"].forEach(function (requestType) {
	    if (isDefined(response[requestType]) && isDefined(response[requestType].mboxes) && response[requestType].mboxes instanceof Array) {
	      response[requestType].mboxes.forEach(function (mbox) {
	        var name = mbox.name,
	            _mbox$options = mbox.options,
	            options = _mbox$options === void 0 ? [] : _mbox$options;
	        options.forEach(function (option) {
	          var type = option.type,
	              content = option.content;
	          if (type === "json" && isDefined(content)) {
	            result[name] = reactorObjectAssign({}, result[name], content);
	          }
	        });
	      });
	    }
	  });
	  return result;
	}
	function AttributesProvider(offersResponse) {
	  var indexed = createIndexed(offersResponse.response);
	  function _getValue(mboxName, key) {
	    if (!Object.prototype.hasOwnProperty.call(indexed, mboxName) || !Object.prototype.hasOwnProperty.call(indexed[mboxName], key)) {
	      return new Error(ATTRIBUTE_NOT_EXIST(key, mboxName));
	    }
	    return indexed[mboxName][key];
	  }
	  function getAsObject(mboxName) {
	    if (isUndefined(mboxName)) {
	      return _objectSpread2({}, indexed);
	    }
	    return _objectSpread2({}, indexed[mboxName]);
	  }
	  return {
	    getValue: function getValue(mboxName, key) {
	      return _getValue(mboxName, key);
	    },
	    asObject: function asObject(mboxName) {
	      return getAsObject(mboxName);
	    },
	    toJSON: function toJSON() {
	      return getAsObject(undefined);
	    },
	    getResponse: function getResponse() {
	      return offersResponse;
	    }
	  };
	}

	function matchUserAgent(matchersList, processFunc) {
	  processFunc = typeof processFunc === "function" ? processFunc : function (matcher) {
	    return matcher.name;
	  };
	  return function checkMatches(userAgent) {
	    for (var i = 0; i < matchersList.length; i += 1) {
	      var matcher = matchersList[i];
	      var matches = userAgent.match(matcher.regex);
	      if (matches) {
	        return processFunc(matcher, matches);
	      }
	    }
	    return processFunc({
	      name: "Unknown"
	    });
	  };
	}
	var browserFromUserAgent = function browserFromUserAgent() {
	  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	  return matchUserAgent([{
	    name: "Edge",
	    regex: /(edge|edgios|edga|edg)\/((\d+)?[\w.]+)/i,
	    versionGroupIndex: 2
	  }, {
	    name: "Mobile Safari",
	    regex: /version\/([\w.]+).+?mobile\/\w+\s(safari)/i,
	    versionGroupIndex: 1
	  }, {
	    name: "Safari",
	    regex: /version\/([\w.]+).+?(mobile\s?safari|safari)/i,
	    versionGroupIndex: 1
	  }, {
	    name: "Chrome",
	    regex: /(chrome)\/v?([\w.]+)/i,
	    versionGroupIndex: 2
	  }, {
	    name: "Firefox",
	    regex: /(firefox)\/([\w.-]+)$/i,
	    versionGroupIndex: 2
	  }, {
	    name: "IE",
	    regex: /(?:ms|\()(ie)\s([\w.]+)/i,
	    versionGroupIndex: 2
	  }, {
	    name: "IE",
	    regex: /(trident).+rv[:\s]([\w.]+).+like\sgecko/i,
	    versionGroupIndex: 2,
	    version: 11
	  }], function (matcher, matches) {
	    var version = (matches && matches.length > matcher.versionGroupIndex ? matches[matcher.versionGroupIndex] : matcher.version) || "-1";
	    var majorVersion = typeof version === "string" ? parseInt(version.split(".")[0], 10) : -1;
	    return {
	      name: matcher.name,
	      version: majorVersion
	    };
	  })(userAgent);
	};
	var operatingSystemFromUserAgent = function operatingSystemFromUserAgent(userAgent) {
	  return matchUserAgent([{
	    name: "iOS",
	    regex: /iPhone|iPad|iPod/
	  }, {
	    name: "Android",
	    regex: /Android [0-9.]+;/
	  }, {
	    name: "Linux",
	    regex: / Linux /
	  }, {
	    name: "Unix",
	    regex: /FreeBSD|OpenBSD|CrOS/
	  }, {
	    name: "Windows",
	    regex: /[( ]Windows /
	  }, {
	    name: "Mac OS",
	    regex: /Macintosh;/
	  }])(userAgent);
	};

	function mul32(m, n) {
	  var nlo = n & 0xffff;
	  var nhi = n - nlo;
	  return (nhi * m | 0) + (nlo * m | 0) | 0;
	}
	function hashUnencodedCharsRaw(stringValue) {
	  var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var k1;
	  var len = stringValue.length;
	  var c1 = 0xcc9e2d51;
	  var c2 = 0x1b873593;
	  var h1 = seed;
	  var roundedEnd = len & ~0x1;
	  for (var i = 0; i < roundedEnd; i += 2) {
	    k1 = stringValue.charCodeAt(i) | stringValue.charCodeAt(i + 1) << 16;
	    k1 = mul32(k1, c1);
	    k1 = (k1 & 0x1ffff) << 15 | k1 >>> 17;
	    k1 = mul32(k1, c2);
	    h1 ^= k1;
	    h1 = (h1 & 0x7ffff) << 13 | h1 >>> 19;
	    h1 = h1 * 5 + 0xe6546b64 | 0;
	  }
	  if (len % 2 === 1) {
	    k1 = stringValue.charCodeAt(roundedEnd);
	    k1 = mul32(k1, c1);
	    k1 = (k1 & 0x1ffff) << 15 | k1 >>> 17;
	    k1 = mul32(k1, c2);
	    h1 ^= k1;
	  }
	  h1 ^= len << 1;
	  h1 ^= h1 >>> 16;
	  h1 = mul32(h1, 0x85ebca6b);
	  h1 ^= h1 >>> 13;
	  h1 = mul32(h1, 0xc2b2ae35);
	  h1 ^= h1 >>> 16;
	  return h1;
	}
	var hashUnencodedChars = memoize(hashUnencodedCharsRaw, function (arr) {
	  return arr.join("-");
	});

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var performanceNow = createCommonjsModule(function (module) {
	  (function () {
	    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
	    if (typeof performance !== "undefined" && performance !== null && performance.now) {
	      module.exports = function () {
	        return performance.now();
	      };
	    } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
	      module.exports = function () {
	        return (getNanoSeconds() - nodeLoadTime) / 1e6;
	      };
	      hrtime = process.hrtime;
	      getNanoSeconds = function getNanoSeconds() {
	        var hr;
	        hr = hrtime();
	        return hr[0] * 1e9 + hr[1];
	      };
	      moduleLoadTime = getNanoSeconds();
	      upTime = process.uptime() * 1e9;
	      nodeLoadTime = moduleLoadTime - upTime;
	    } else if (Date.now) {
	      module.exports = function () {
	        return Date.now() - loadTime;
	      };
	      loadTime = Date.now();
	    } else {
	      module.exports = function () {
	        return new Date().getTime() - loadTime;
	      };
	      loadTime = new Date().getTime();
	    }
	  }).call(commonjsGlobal);
	});

	function createPerfToolInstance() {
	  var timingIds = {};
	  var startTimes = {};
	  var timings = {};
	  function getUniqueTimingId(id) {
	    var count = (isDefined(timingIds[id]) ? timingIds[id] : 0) + 1;
	    timingIds[id] = count;
	    return "" + id + count;
	  }
	  function timeStart(id) {
	    var incrementTimer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var timingId = incrementTimer ? getUniqueTimingId(id) : id;
	    if (isUndefined(startTimes[timingId])) {
	      startTimes[timingId] = performanceNow();
	    }
	    return timingId;
	  }
	  function timeEnd(id) {
	    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    if (isUndefined(startTimes[id])) {
	      return -1;
	    }
	    var timing = performanceNow() - startTimes[id] - offset;
	    timings[id] = timing;
	    return timing;
	  }
	  function reset() {
	    timingIds = {};
	    startTimes = {};
	    timings = {};
	  }
	  return {
	    timeStart: timeStart,
	    timeEnd: timeEnd,
	    getTimings: function getTimings() {
	      return timings;
	    },
	    getTiming: function getTiming(key) {
	      return timings[key];
	    },
	    reset: reset
	  };
	}
	var perfTool = createPerfToolInstance();

	function parseURI(str, opts) {
	  if (!str) return undefined;
	  opts = opts || {};
	  var o = {
	    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
	    q: {
	      name: 'queryKey',
	      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	    },
	    parser: {
	      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
	      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	    }
	  };
	  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
	  var uri = {};
	  var i = 14;
	  while (i--) {
	    uri[o.key[i]] = m[i] || '';
	  }
	  uri[o.q.name] = {};
	  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	    if ($1) uri[o.q.name][$1] = $2;
	  });
	  return uri;
	}
	var parseUri = parseURI;

	var TYPE = "type";
	var CONTENT = "content";
	var HEIGHT = "height";
	var WIDTH = "width";
	var LEFT = "left";
	var TOP = "top";
	var FROM = "from";
	var TO = "to";
	var PRIORITY = "priority";
	var SELECTOR = "selector";
	var CSS_SELECTOR = "cssSelector";
	var SET_HTML = "setHtml";
	var SET_CONTENT = "setContent";
	var SET_TEXT = "setText";
	var SET_JSON = "setJson";
	var SET_ATTRIBUTE = "setAttribute";
	var SET_IMAGE_SOURCE = "setImageSource";
	var SET_STYLE = "setStyle";
	var REARRANGE = "rearrange";
	var RESIZE = "resize";
	var MOVE = "move";
	var REMOVE = "remove";
	var CUSTOM_CODE = "customCode";
	var REDIRECT = "redirect";
	var TRACK_CLICK = "trackClick";
	var SIGNAL_CLICK = "signalClick";
	var INSERT_BEFORE = "insertBefore";
	var INSERT_AFTER = "insertAfter";
	var APPEND_HTML = "appendHtml";
	var APPEND_CONTENT = "appendContent";
	var PREPEND_HTML = "prependHtml";
	var PREPEND_CONTENT = "prependContent";
	var REPLACE_HTML = "replaceHtml";
	var REPLACE_CONTENT = "replaceContent";
	var DEBUG = "mboxDebug";
	var DISABLE = "mboxDisable";
	var AUTHORING = "mboxEdit";
	var CHECK = "at_check";
	var TRUE = "true";
	var MBOX_LENGTH = 250;
	var DATA_SRC = "data-at-src";
	var JSON$1 = "json";
	var HTML = "html";
	var DYNAMIC = "dynamic";
	var SCRIPT = "script";
	var SRC = "src";
	var ID = "id";
	var CLASS = "class";
	var CLICK = "click";
	var HEAD_TAG = "head";
	var SCRIPT_TAG = "script";
	var STYLE_TAG = "style";
	var LINK_TAG = "link";
	var IMAGE_TAG = "img";
	var DIV_TAG = "div";
	var DELIVERY_DISABLED = 'Adobe Target content delivery is disabled. Ensure that you can save cookies to your current domain, there is no "mboxDisable" cookie and there is no "mboxDisable" parameter in query string.';
	var ALREADY_INITIALIZED = "Adobe Target has already been initialized.";
	var OPTIONS_REQUIRED = "options argument is required";
	var REQUEST_REQUIRED = "request option is required";
	var RESPONE_REQUIRED = "response option is required";
	var EXECUTE_OR_PREFETCH_REQUIRED = "execute or prefetch is required";
	var EXECUTE_OR_PREFETCH_NOT_ALLOWED = "execute or prefetch is not allowed";
	var NOTIFICATIONS_REQUIRED = "notifications are required";
	var MBOX_REQUIRED = "mbox option is required";
	var MBOX_TOO_LONG = "mbox option is too long";
	var SUCCESS_REQUIRED = "success option is required";
	var ERROR_REQUIRED = "error option is required";
	var OFFER_REQUIRED = "offer option is required";
	var UNEXPECTED_ERROR = "Unexpected error";
	var REQUEST_FAILED = "request failed";
	var REQUEST_SUCCEEDED = "request succeeded";
	var ACTION_RENDERED = "Action rendered successfully";
	var ACTION_RENDERING = "Rendering action";
	var EMPTY_CONTENT = "Action has no content";
	var EMPTY_ATTRIBUTE = "Action has no attributes";
	var EMPTY_PROPERTY = "Action has no CSS properties";
	var EMPTY_SIZES = "Action has no height or width";
	var EMPTY_COORDINATES = "Action has no left, top or position";
	var EMPTY_REARRANGE = "Action has no from or to";
	var EMPTY_URL = "Action has no url";
	var EMPTY_IMAGE_URL = "Action has no image url";
	var REARRANGE_MISSING = "Rearrange elements are missing";
	var LOADING_IMAGE = "Loading image";
	var TRACK_EVENT_SUCCESS = "Track event request succeeded";
	var TRACK_EVENT_ERROR = "Track event request failed";
	var NO_ACTIONS = "No actions to be rendered";
	var REDIRECT_ACTION = "Redirect action";
	var REMOTE_SCRIPT = "Script load";
	var ERROR = "error";
	var WARNING = "warning";
	var UNKNOWN = "unknown";
	var VALID = "valid";
	var SUCCESS = "success";
	var RENDER = "render";
	var METRIC = "metric";
	var MBOX = "mbox";
	var OFFER = "offer";
	var NAME = "name";
	var STATUS = "status";
	var PARAMS = "params";
	var ACTIONS = "actions";
	var RESPONSE_TOKENS = "responseTokens";
	var DATA = "data";
	var RESPONSE = "response";
	var REQUEST = "request";
	var PROVIDER = "provider";
	var PAGE_LOAD = "pageLoad";
	var FLICKER_CONTROL_CLASS = "at-flicker-control";
	var MARKER_CSS_CLASS = "at-element-marker";
	var CLICK_TRACKING_CSS_CLASS = "at-element-click-tracking";
	var ENABLED = "enabled";
	var CLIENT_CODE = "clientCode";
	var IMS_ORG_ID = "imsOrgId";
	var SERVER_DOMAIN = "serverDomain";
	var TIMEOUT = "timeout";
	var GLOBAL_MBOX_NAME = "globalMboxName";
	var GLOBAL_MBOX_AUTO_CREATE = "globalMboxAutoCreate";
	var VERSION = "version";
	var DEFAULT_CONTENT_HIDDEN_STYLE = "defaultContentHiddenStyle";
	var DEFAULT_CONTENT_VISIBLE_STYLE = "defaultContentVisibleStyle";
	var BODY_HIDDEN_STYLE = "bodyHiddenStyle";
	var BODY_HIDING_ENABLED = "bodyHidingEnabled";
	var DEVICE_ID_LIFETIME = "deviceIdLifetime";
	var SESSION_ID_LIFETIME = "sessionIdLifetime";
	var SELECTORS_POLLING_TIMEOUT = "selectorsPollingTimeout";
	var VISITOR_API_TIMEOUT = "visitorApiTimeout";
	var OVERRIDE_MBOX_EDGE_SERVER = "overrideMboxEdgeServer";
	var OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT = "overrideMboxEdgeServerTimeout";
	var OPTOUT_ENABLED = "optoutEnabled";
	var SECURE_ONLY = "secureOnly";
	var SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT = "supplementalDataIdParamTimeout";
	var AUTHORING_SCRIPT_URL = "authoringScriptUrl";
	var SCHEME = "scheme";
	var COOKIE_DOMAIN = "cookieDomain";
	var MBOX_PARAMS = "mboxParams";
	var GLOBAL_MBOX_PARAMS = "globalMboxParams";
	var URL_SIZE_LIMIT = "urlSizeLimit";
	var SESSION_ID_PARAM = "mboxSession";
	var DEVICE_ID_COOKIE = "PC";
	var EDGE_CLUSTER_COOKIE = "mboxEdgeCluster";
	var SESSION_ID_COOKIE = "session";
	var GEO_COOKIE = "at_geo";
	var TRACES_SUFFIX = "Traces";
	var SETTINGS = "settings";
	var CLIENT_TRACES = "client" + TRACES_SUFFIX;
	var SERVER_TRACES = "server" + TRACES_SUFFIX;
	var TRACES = "___target_traces";
	var GLOBAL_SETTINGS = "targetGlobalSettings";
	var DATA_PROVIDER = "dataProvider";
	var DATA_PROVIDERS = DATA_PROVIDER + "s";
	var ENDPOINT = "endpoint";
	var VIEWS_ENABLED = "viewsEnabled";
	var PAGE_LOAD_ENABLED = "pageLoadEnabled";
	var AUTH_STATE = "authState";
	var AUTHENTICATED_STATE = "authenticatedState";
	var INTEGRATION_CODE = "integrationCode";
	var PRIMARY = "primary";
	var PAGE = "page";
	var VIEW = "view";
	var VIEWS$1 = "views";
	var OPTIONS = "options";
	var METRICS = "metrics";
	var VIEW_NAME = "viewName";
	var DISPLAY_EVENT = "display";
	var CONTENT_TYPE = "Content-Type";
	var TEXT_PLAIN = "text/plain";
	var RENDERING_VIEW_FAILED = "View rendering failed";
	var VIEW_DELIVERY_ERROR = "View delivery error";
	var VIEW_NAME_ERROR = "View name should be a non-empty string";
	var PAGE_LOAD_DISABLED = "Page load disabled";
	var USING_SERVER_STATE = "Using server state";
	var ADOBE = "adobe";
	var OPTIN = "optIn";
	var IS_APPROVED = "isApproved";
	var FETCH_PERMISSIONS = "fetchPermissions";
	var CATEGORIES = "Categories";
	var TARGET = "TARGET";
	var ANALYTICS = "ANALYTICS";
	var OPTIN_ENABLED = "optinEnabled";
	var ERROR_TARGET_NOT_OPTED_IN = "Adobe Target is not opted in";
	var ANALYTICS_LOGGING = "analyticsLogging";
	var SERVER_STATE = "serverState";
	var CSP_SCRIPT_NONCE = "cspScriptNonce";
	var CSP_STYLE_NONCE = "cspStyleNonce";
	var CACHE_UPDATED_EVENT = "cache-updated-event";
	var NO_OFFERS_EVENT = "no-offers-event";
	var REDIRECT_OFFER_EVENT = "redirect-offer-event";
	var DECISIONING_METHOD_SETTING = "decisioningMethod";
	var POLLING_INTERVAL_SETTING = "pollingInterval";
	var ARTIFACT_LOCATION_SETTING = "artifactLocation";
	var ARTIFACT_FORMAT_SETTING = "artifactFormat";
	var ARTIFACT_PAYLOAD_SETTING = "artifactPayload";
	var TARGET_ENVIRONMENT_SETTING = "environment";
	var CDN_ENVIRONMENT_SETTING = "cdnEnvironment";
	var TELEMETRY_ENABLED_SETTING = "telemetryEnabled";
	var CDN_BASEPATH_SETTING = "cdnBasePath";

	var FILE_PROTOCOL = "file:";
	var IP_V4_REGEX = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
	var STANDARD_DOMAIN_REGEX = /^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i;
	var config = {};
	var OVERRIDABLE_SETTINGS = [ENABLED, CLIENT_CODE, IMS_ORG_ID, SERVER_DOMAIN, COOKIE_DOMAIN, TIMEOUT, MBOX_PARAMS, GLOBAL_MBOX_PARAMS, DEFAULT_CONTENT_HIDDEN_STYLE, DEFAULT_CONTENT_VISIBLE_STYLE, DEVICE_ID_LIFETIME, BODY_HIDDEN_STYLE, BODY_HIDING_ENABLED, SELECTORS_POLLING_TIMEOUT, VISITOR_API_TIMEOUT, OVERRIDE_MBOX_EDGE_SERVER, OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT, OPTOUT_ENABLED, OPTIN_ENABLED, SECURE_ONLY, SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT, AUTHORING_SCRIPT_URL, URL_SIZE_LIMIT, ENDPOINT, PAGE_LOAD_ENABLED, VIEWS_ENABLED, ANALYTICS_LOGGING, SERVER_STATE, DECISIONING_METHOD_SETTING, POLLING_INTERVAL_SETTING, ARTIFACT_LOCATION_SETTING, ARTIFACT_FORMAT_SETTING, ARTIFACT_PAYLOAD_SETTING, TARGET_ENVIRONMENT_SETTING, CDN_ENVIRONMENT_SETTING, TELEMETRY_ENABLED_SETTING, CDN_BASEPATH_SETTING, CSP_SCRIPT_NONCE, CSP_STYLE_NONCE, GLOBAL_MBOX_NAME];
	function overrideSettingsIfRequired(settings, globalSettings) {
	  if (!settings[ENABLED]) {
	    return;
	  }
	  if (!isNil(globalSettings[GLOBAL_MBOX_AUTO_CREATE])) {
	    settings[PAGE_LOAD_ENABLED] = globalSettings[GLOBAL_MBOX_AUTO_CREATE];
	  }
	  forEach(function (field) {
	    if (!isNil(globalSettings[field])) {
	      settings[field] = globalSettings[field];
	    }
	  }, OVERRIDABLE_SETTINGS);
	}
	function isIE10OrModernBrowser(doc) {
	  var documentMode = doc.documentMode;
	  return documentMode ? documentMode >= 10 : true;
	}
	function isStandardMode(doc) {
	  var compatMode = doc.compatMode;
	  return compatMode && compatMode === "CSS1Compat";
	}
	function isIPv4(domain) {
	  return IP_V4_REGEX.test(domain);
	}
	function getCookieDomain(domain) {
	  if (isIPv4(domain)) {
	    return domain;
	  }
	  var parts = reverse(split(".", domain));
	  var len = parts.length;
	  if (len >= 3) {
	    if (STANDARD_DOMAIN_REGEX.test(parts[1])) {
	      return parts[2] + "." + parts[1] + "." + parts[0];
	    }
	  }
	  if (len === 1) {
	    return parts[0];
	  }
	  return parts[1] + "." + parts[0];
	}
	function overrideFromGlobalSettings(win, doc, settings) {
	  var fileProtocol = win.location.protocol === FILE_PROTOCOL;
	  var cookieDomain = "";
	  if (!fileProtocol) {
	    cookieDomain = getCookieDomain(win.location.hostname);
	  }
	  settings[COOKIE_DOMAIN] = cookieDomain;
	  settings[ENABLED] = isStandardMode(doc) && isIE10OrModernBrowser(doc);
	  overrideSettingsIfRequired(settings, win[GLOBAL_SETTINGS] || {});
	}
	function initConfig(settings) {
	  overrideFromGlobalSettings(window, document, settings);
	  var fileProtocol = window.location.protocol === FILE_PROTOCOL;
	  config = reactorObjectAssign({}, settings);
	  config[DEVICE_ID_LIFETIME] = settings[DEVICE_ID_LIFETIME] / 1000;
	  config[SESSION_ID_LIFETIME] = settings[SESSION_ID_LIFETIME] / 1000;
	  config[SCHEME] = config[SECURE_ONLY] || fileProtocol ? "https:" : "";
	}
	function getConfig() {
	  return config;
	}

	var js_cookie = createCommonjsModule(function (module, exports) {
	  (function (factory) {
	    var registeredInModuleLoader;
	    {
	      module.exports = factory();
	      registeredInModuleLoader = true;
	    }
	    if (!registeredInModuleLoader) {
	      var OldCookies = window.Cookies;
	      var api = window.Cookies = factory();
	      api.noConflict = function () {
	        window.Cookies = OldCookies;
	        return api;
	      };
	    }
	  })(function () {
	    function extend() {
	      var i = 0;
	      var result = {};
	      for (; i < arguments.length; i++) {
	        var attributes = arguments[i];
	        for (var key in attributes) {
	          result[key] = attributes[key];
	        }
	      }
	      return result;
	    }
	    function decode(s) {
	      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	    }
	    function init(converter) {
	      function api() {}
	      function set(key, value, attributes) {
	        if (typeof document === 'undefined') {
	          return;
	        }
	        attributes = extend({
	          path: '/'
	        }, api.defaults, attributes);
	        if (typeof attributes.expires === 'number') {
	          attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
	        }
	        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
	        try {
	          var result = JSON.stringify(value);
	          if (/^[\{\[]/.test(result)) {
	            value = result;
	          }
	        } catch (e) {}
	        value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
	        key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
	        var stringifiedAttributes = '';
	        for (var attributeName in attributes) {
	          if (!attributes[attributeName]) {
	            continue;
	          }
	          stringifiedAttributes += '; ' + attributeName;
	          if (attributes[attributeName] === true) {
	            continue;
	          }
	          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
	        }
	        return document.cookie = key + '=' + value + stringifiedAttributes;
	      }
	      function get(key, json) {
	        if (typeof document === 'undefined') {
	          return;
	        }
	        var jar = {};
	        var cookies = document.cookie ? document.cookie.split('; ') : [];
	        var i = 0;
	        for (; i < cookies.length; i++) {
	          var parts = cookies[i].split('=');
	          var cookie = parts.slice(1).join('=');
	          if (!json && cookie.charAt(0) === '"') {
	            cookie = cookie.slice(1, -1);
	          }
	          try {
	            var name = decode(parts[0]);
	            cookie = (converter.read || converter)(cookie, name) || decode(cookie);
	            if (json) {
	              try {
	                cookie = JSON.parse(cookie);
	              } catch (e) {}
	            }
	            jar[name] = cookie;
	            if (key === name) {
	              break;
	            }
	          } catch (e) {}
	        }
	        return key ? jar[key] : jar;
	      }
	      api.set = set;
	      api.get = function (key) {
	        return get(key, false
	        );
	      };
	      api.getJSON = function (key) {
	        return get(key, true
	        );
	      };
	      api.remove = function (key, attributes) {
	        set(key, '', extend(attributes, {
	          expires: -1
	        }));
	      };
	      api.defaults = {};
	      api.withConverter = init;
	      return api;
	    }
	    return init(function () {});
	  });
	});

	var reactorCookie = {
	  get: js_cookie.get,
	  set: js_cookie.set,
	  remove: js_cookie.remove
	};

	function hasOwnProperty$3(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	var decode = function decode(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	  var len = qs.length;
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	    if (!hasOwnProperty$3(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	  return obj;
	};

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (_typeof(v)) {
	    case 'string':
	      return v;
	    case 'boolean':
	      return v ? 'true' : 'false';
	    case 'number':
	      return isFinite(v) ? v : '';
	    default:
	      return '';
	  }
	};
	var encode = function encode(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	  if (_typeof(obj) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

	var querystring = createCommonjsModule(function (module, exports) {
	  exports.decode = exports.parse = decode;
	  exports.encode = exports.stringify = encode;
	});
	var querystring_1 = querystring.decode;
	var querystring_2 = querystring.parse;
	var querystring_3 = querystring.encode;
	var querystring_4 = querystring.stringify;

	var reactorQueryString = {
	  parse: function parse(string) {
	    if (typeof string === 'string') {
	      string = string.trim().replace(/^[?#&]/, '');
	    }
	    return querystring.parse(string);
	  },
	  stringify: function stringify(object) {
	    return querystring.stringify(object);
	  }
	};

	var parse = reactorQueryString.parse,
	    stringify = reactorQueryString.stringify;
	var ANCHOR = document.createElement("a");
	var CACHE = {};
	function parseQueryString(value) {
	  try {
	    return parse(value);
	  } catch (e) {
	    return {};
	  }
	}
	function stringifyQueryString(value) {
	  try {
	    return stringify(value);
	  } catch (e) {
	    return "";
	  }
	}
	function decode$1(value) {
	  try {
	    return decodeURIComponent(value);
	  } catch (e) {
	    return value;
	  }
	}
	function encode$1(value) {
	  try {
	    return encodeURIComponent(value);
	  } catch (e) {
	    return value;
	  }
	}
	function parseUri$1(url) {
	  if (CACHE[url]) {
	    return CACHE[url];
	  }
	  ANCHOR.href = url;
	  var parsedUri = parseUri(ANCHOR.href);
	  parsedUri.queryKey = parseQueryString(parsedUri.query);
	  CACHE[url] = parsedUri;
	  return CACHE[url];
	}

	var getCookie = reactorCookie.get,
	    setCookie = reactorCookie.set,
	    removeCookie = reactorCookie.remove;
	var MBOX_COOKIE = "mbox";
	function createCookie(name, value, expires) {
	  return {
	    name: name,
	    value: value,
	    expires: expires
	  };
	}
	function deserialize(str) {
	  var parts = split("#", str);
	  if (isEmpty(parts) || parts.length < 3) {
	    return null;
	  }
	  if (isNaN(parseInt(parts[2], 10))) {
	    return null;
	  }
	  return createCookie(decode$1(parts[0]), decode$1(parts[1]), Number(parts[2]));
	}
	function getInternalCookies(cookieValue) {
	  if (isBlank(cookieValue)) {
	    return [];
	  }
	  return split("|", cookieValue);
	}
	function readCookies() {
	  var cookies = map(deserialize, getInternalCookies(getCookie(MBOX_COOKIE)));
	  var nowInSeconds = Math.ceil(now() / 1000);
	  var isExpired = function isExpired(val) {
	    return isObject(val) && nowInSeconds <= val.expires;
	  };
	  return reduce(function (acc, val) {
	    acc[val.name] = val;
	    return acc;
	  }, {}, filter(isExpired, cookies));
	}

	function getTargetCookie(name) {
	  var cookiesMap = readCookies();
	  var cookie = cookiesMap[name];
	  return isObject(cookie) ? cookie.value : "";
	}
	function serialize(cookie) {
	  return join("#", [encode$1(cookie.name), encode$1(cookie.value), cookie.expires]);
	}
	function getExpires(cookie) {
	  return cookie.expires;
	}
	function getMaxExpires(cookies) {
	  var expires = map(getExpires, cookies);
	  return Math.max.apply(null, expires);
	}
	function saveCookies(cookiesMap, domain) {
	  var cookies = toArray(cookiesMap);
	  var maxExpires = Math.abs(getMaxExpires(cookies) * 1000 - now());
	  var serializedCookies = join("|", map(serialize, cookies));
	  var expires = new Date(now() + maxExpires);
	  setCookie(MBOX_COOKIE, serializedCookies, {
	    domain: domain,
	    expires: expires
	  });
	}
	function setTargetCookie(options) {
	  var name = options.name,
	      value = options.value,
	      expires = options.expires,
	      domain = options.domain;
	  var cookiesMap = readCookies();
	  cookiesMap[name] = createCookie(name, value, Math.ceil(expires + now() / 1000));
	  saveCookies(cookiesMap, domain);
	}

	function isCookiePresent(name) {
	  return isNotBlank(getCookie(name));
	}
	function isParamPresent(win, name) {
	  var location = win.location;
	  var search = location.search;
	  var params = parseQueryString(search);
	  return isNotBlank(params[name]);
	}
	function isRefParamPresent(doc, name) {
	  var referrer = doc.referrer;
	  var parsedUri = parseUri$1(referrer);
	  var refParams = parsedUri.queryKey;
	  return isNil(refParams) ? false : isNotBlank(refParams[name]);
	}
	function exists(win, doc, name) {
	  return isCookiePresent(name) || isParamPresent(win, name) || isRefParamPresent(doc, name);
	}

	function isCookieEnabled() {
	  var config = getConfig();
	  var cookieDomain = config[COOKIE_DOMAIN];
	  setCookie(CHECK, TRUE, {
	    domain: cookieDomain
	  });
	  var result = getCookie(CHECK) === TRUE;
	  removeCookie(CHECK);
	  return result;
	}
	function isDeliveryDisabled() {
	  return exists(window, document, DISABLE);
	}
	function isDeliveryEnabled() {
	  var config = getConfig();
	  var enabled = config[ENABLED];
	  return enabled && isCookieEnabled() && !isDeliveryDisabled();
	}
	function isDebugEnabled() {
	  return exists(window, document, DEBUG);
	}
	function isAuthoringEnabled() {
	  return exists(window, document, AUTHORING);
	}

	var ADOBE_TARGET_PREFIX = "AT:";
	function exists$1(win, method) {
	  var console = win.console;
	  return !isNil(console) && isFunction(console[method]);
	}
	function warn(win, args) {
	  var console = win.console;
	  if (!exists$1(win, "warn")) {
	    return;
	  }
	  console.warn.apply(console, [ADOBE_TARGET_PREFIX].concat(args));
	}
	function debug(win, args) {
	  var console = win.console;
	  if (!exists$1(win, "debug")) {
	    return;
	  }
	  if (isDebugEnabled()) {
	    console.debug.apply(console, [ADOBE_TARGET_PREFIX].concat(args));
	  }
	}

	function logWarn() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  warn(window, args);
	}
	function logDebug() {
	  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	  debug(window, args);
	}
	var logger = {
	  debug: logDebug,
	  error: logWarn,
	  built: true
	};

	var TRACES_FORMAT_VERSION = "1";
	function getSettings(config) {
	  return reduce(function (acc, key) {
	    acc[key] = config[key];
	    return acc;
	  }, {}, OVERRIDABLE_SETTINGS);
	}
	function initialize(win, config, debugEnabled) {
	  var result = win[TRACES] || [];
	  win[TRACES] = result;
	  if (!debugEnabled) {
	    return;
	  }
	  var oldPush = result.push;
	  result[VERSION] = TRACES_FORMAT_VERSION;
	  result[SETTINGS] = getSettings(config);
	  result[CLIENT_TRACES] = [];
	  result[SERVER_TRACES] = [];
	  result.push = function push(trace) {
	    result[SERVER_TRACES].push(reactorObjectAssign({
	      timestamp: now()
	    }, trace));
	    oldPush.call(this, trace);
	  };
	}
	function saveTrace(win, namespace, trace, debugEnabled) {
	  if (namespace === SERVER_TRACES) {
	    win[TRACES].push(trace);
	  }
	  if (!debugEnabled) {
	    return;
	  }
	  if (namespace !== SERVER_TRACES) {
	    win[TRACES][namespace].push(reactorObjectAssign({
	      timestamp: now()
	    }, trace));
	  }
	}

	var TIMING_GET_OFFER_TOTAL = "getOffers_total";
	var TIMING_GET_OFFER_DECISIONING = "getOffers_decisioningFinished";
	var TIMING_GET_OFFER_DELIVERY = "getOffers_deliveryRequest";
	var TIMING_OFFERS_RENDERED = "offersRendered";
	var TIMING_DECISIONING_ENGINE_INIT = "decisioningEngineInstance";
	var TIMING_TRACES_INIT = "initTraces";
	var TIMING_AUTHORING_INIT = "initAuthoring";
	var TIMING_QAMODE_INIT = "initQAMode";
	var TIMING_PREVIEW_MODE_INIT = "initPreviewMode";
	var TIMING_DELIVERY_INIT = "initDelivery";
	var TIMING_ATJS_INIT = "initAtJs";

	function initTraces() {
	  perfTool.timeStart(TIMING_TRACES_INIT);
	  initialize(window, getConfig(), isDebugEnabled());
	  perfTool.timeEnd(TIMING_TRACES_INIT);
	}
	function addServerTrace(trace) {
	  saveTrace(window, SERVER_TRACES, trace, isDebugEnabled());
	}
	function addClientTrace(trace) {
	  saveTrace(window, CLIENT_TRACES, trace, isDebugEnabled());
	}

	function finallyConstructor(callback) {
	  var constructor = this.constructor;
	  return this.then(function (value) {
	    return constructor.resolve(callback()).then(function () {
	      return value;
	    });
	  }, function (reason) {
	    return constructor.resolve(callback()).then(function () {
	      return constructor.reject(reason);
	    });
	  });
	}

	var setTimeoutFunc = setTimeout;
	function isArray$1(x) {
	  return Boolean(x && typeof x.length !== 'undefined');
	}
	function noop$1() {}
	function bind(fn, thisArg) {
	  return function () {
	    fn.apply(thisArg, arguments);
	  };
	}
	function Promise$1(fn) {
	  if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
	  if (typeof fn !== 'function') throw new TypeError('not a function');
	  this._state = 0;
	  this._handled = false;
	  this._value = undefined;
	  this._deferreds = [];
	  doResolve(fn, this);
	}
	function handle(self, deferred) {
	  while (self._state === 3) {
	    self = self._value;
	  }
	  if (self._state === 0) {
	    self._deferreds.push(deferred);
	    return;
	  }
	  self._handled = true;
	  Promise$1._immediateFn(function () {
	    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	      return;
	    }
	    var ret;
	    try {
	      ret = cb(self._value);
	    } catch (e) {
	      reject(deferred.promise, e);
	      return;
	    }
	    resolve(deferred.promise, ret);
	  });
	}
	function resolve(self, newValue) {
	  try {
	    if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	    if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
	      var then = newValue.then;
	      if (newValue instanceof Promise$1) {
	        self._state = 3;
	        self._value = newValue;
	        finale(self);
	        return;
	      } else if (typeof then === 'function') {
	        doResolve(bind(then, newValue), self);
	        return;
	      }
	    }
	    self._state = 1;
	    self._value = newValue;
	    finale(self);
	  } catch (e) {
	    reject(self, e);
	  }
	}
	function reject(self, newValue) {
	  self._state = 2;
	  self._value = newValue;
	  finale(self);
	}
	function finale(self) {
	  if (self._state === 2 && self._deferreds.length === 0) {
	    Promise$1._immediateFn(function () {
	      if (!self._handled) {
	        Promise$1._unhandledRejectionFn(self._value);
	      }
	    });
	  }
	  for (var i = 0, len = self._deferreds.length; i < len; i++) {
	    handle(self, self._deferreds[i]);
	  }
	  self._deferreds = null;
	}
	function Handler(onFulfilled, onRejected, promise) {
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}
	function doResolve(fn, self) {
	  var done = false;
	  try {
	    fn(function (value) {
	      if (done) return;
	      done = true;
	      resolve(self, value);
	    }, function (reason) {
	      if (done) return;
	      done = true;
	      reject(self, reason);
	    });
	  } catch (ex) {
	    if (done) return;
	    done = true;
	    reject(self, ex);
	  }
	}
	Promise$1.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise$1.prototype.then = function (onFulfilled, onRejected) {
	  var prom = new this.constructor(noop$1);
	  handle(this, new Handler(onFulfilled, onRejected, prom));
	  return prom;
	};
	Promise$1.prototype['finally'] = finallyConstructor;
	Promise$1.all = function (arr) {
	  return new Promise$1(function (resolve, reject) {
	    if (!isArray$1(arr)) {
	      return reject(new TypeError('Promise.all accepts an array'));
	    }
	    var args = Array.prototype.slice.call(arr);
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      try {
	        if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
	          var then = val.then;
	          if (typeof then === 'function') {
	            then.call(val, function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	        args[i] = val;
	        if (--remaining === 0) {
	          resolve(args);
	        }
	      } catch (ex) {
	        reject(ex);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};
	Promise$1.resolve = function (value) {
	  if (value && _typeof(value) === 'object' && value.constructor === Promise$1) {
	    return value;
	  }
	  return new Promise$1(function (resolve) {
	    resolve(value);
	  });
	};
	Promise$1.reject = function (value) {
	  return new Promise$1(function (resolve, reject) {
	    reject(value);
	  });
	};
	Promise$1.race = function (arr) {
	  return new Promise$1(function (resolve, reject) {
	    if (!isArray$1(arr)) {
	      return reject(new TypeError('Promise.race accepts an array'));
	    }
	    for (var i = 0, len = arr.length; i < len; i++) {
	      Promise$1.resolve(arr[i]).then(resolve, reject);
	    }
	  });
	};
	Promise$1._immediateFn =
	typeof setImmediate === 'function' && function (fn) {
	  setImmediate(fn);
	} || function (fn) {
	  setTimeoutFunc(fn, 0);
	};
	Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
	  if (typeof console !== 'undefined' && console) {
	    console.warn('Possible Unhandled Promise Rejection:', err);
	  }
	};

	var reactorPromise = typeof window !== 'undefined' && window.Promise || typeof commonjsGlobal !== 'undefined' && commonjsGlobal.Promise || Promise$1.default || Promise$1;

	var $ = (function (window) {
	  var Zepto = function () {
	    var undefined$1,
	        key,
	        $,
	        classList,
	        emptyArray = [],
	        _concat = emptyArray.concat,
	        _filter = emptyArray.filter,
	        _slice = emptyArray.slice,
	        document = window.document,
	        elementDisplay = {},
	        classCache = {},
	        cssNumber = {
	      "column-count": 1,
	      columns: 1,
	      "font-weight": 1,
	      "line-height": 1,
	      opacity: 1,
	      "z-index": 1,
	      zoom: 1
	    },
	        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	        rootNodeRE = /^(?:body|html)$/i,
	        capitalRE = /([A-Z])/g,
	    methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"],
	        adjacencyOperators = ["after", "prepend", "before", "append"],
	        table = document.createElement("table"),
	        tableRow = document.createElement("tr"),
	        containers = {
	      tr: document.createElement("tbody"),
	      tbody: table,
	      thead: table,
	      tfoot: table,
	      td: tableRow,
	      th: tableRow,
	      "*": document.createElement("div")
	    },
	        readyRE = /complete|loaded|interactive/,
	        simpleSelectorRE = /^[\w-]*$/,
	        class2type = {},
	        toString = class2type.toString,
	        zepto = {},
	        camelize,
	        uniq,
	        tempParent = document.createElement("div"),
	        propMap = {
	      tabindex: "tabIndex",
	      readonly: "readOnly",
	      'for': "htmlFor",
	      'class': "className",
	      maxlength: "maxLength",
	      cellspacing: "cellSpacing",
	      cellpadding: "cellPadding",
	      rowspan: "rowSpan",
	      colspan: "colSpan",
	      usemap: "useMap",
	      frameborder: "frameBorder",
	      contenteditable: "contentEditable"
	    },
	        isArray = Array.isArray || function (object) {
	      return object instanceof Array;
	    };
	    zepto.matches = function (element, selector) {
	      if (!selector || !element || element.nodeType !== 1) return false;
	      var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
	      if (matchesSelector) return matchesSelector.call(element, selector);
	      var match,
	          parent = element.parentNode,
	          temp = !parent;
	      if (temp) (parent = tempParent).appendChild(element);
	      match = ~zepto.qsa(parent, selector).indexOf(element);
	      temp && tempParent.removeChild(element);
	      return match;
	    };
	    function type(obj) {
	      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	    }
	    function isFunction(value) {
	      return type(value) == "function";
	    }
	    function isWindow(obj) {
	      return obj != null && obj == obj.window;
	    }
	    function isDocument(obj) {
	      return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	    }
	    function isObject(obj) {
	      return type(obj) == "object";
	    }
	    function isPlainObject(obj) {
	      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	    }
	    function likeArray(obj) {
	      var length = !!obj && "length" in obj && obj.length,
	          type = $.type(obj);
	      return "function" != type && !isWindow(obj) && ("array" == type || length === 0 || typeof length == "number" && length > 0 && length - 1 in obj);
	    }
	    function compact(array) {
	      return _filter.call(array, function (item) {
	        return item != null;
	      });
	    }
	    function flatten(array) {
	      return array.length > 0 ? $.fn.concat.apply([], array) : array;
	    }
	    camelize = function camelize(str) {
	      return str.replace(/-+(.)?/g, function (match, chr) {
	        return chr ? chr.toUpperCase() : "";
	      });
	    };
	    function dasherize(str) {
	      return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
	    }
	    uniq = function uniq(array) {
	      return _filter.call(array, function (item, idx) {
	        return array.indexOf(item) == idx;
	      });
	    };
	    function classRE(name) {
	      return name in classCache ? classCache[name] : classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)");
	    }
	    function maybeAddPx(name, value) {
	      return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
	    }
	    function defaultDisplay(nodeName) {
	      var element, display;
	      if (!elementDisplay[nodeName]) {
	        element = document.createElement(nodeName);
	        document.body.appendChild(element);
	        display = getComputedStyle(element, "").getPropertyValue("display");
	        element.parentNode.removeChild(element);
	        display == "none" && (display = "block");
	        elementDisplay[nodeName] = display;
	      }
	      return elementDisplay[nodeName];
	    }
	    function _children(element) {
	      return "children" in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
	        if (node.nodeType == 1) return node;
	      });
	    }
	    function Z(dom, selector) {
	      var i,
	          len = dom ? dom.length : 0;
	      for (i = 0; i < len; i++) {
	        this[i] = dom[i];
	      }
	      this.length = len;
	      this.selector = selector || "";
	    }
	    zepto.fragment = function (html, name, properties) {
	      var dom, nodes, container;
	      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
	      if (!dom) {
	        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
	        if (name === undefined$1) name = fragmentRE.test(html) && RegExp.$1;
	        if (!(name in containers)) name = "*";
	        container = containers[name];
	        container.innerHTML = "" + html;
	        dom = $.each(_slice.call(container.childNodes), function () {
	          container.removeChild(this);
	        });
	      }
	      if (isPlainObject(properties)) {
	        nodes = $(dom);
	        $.each(properties, function (key, value) {
	          if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
	        });
	      }
	      return dom;
	    };
	    zepto.Z = function (dom, selector) {
	      return new Z(dom, selector);
	    };
	    zepto.isZ = function (object) {
	      return object instanceof zepto.Z;
	    };
	    zepto.init = function (selector, context) {
	      var dom;
	      if (!selector) return zepto.Z();else if (typeof selector == "string") {
	        selector = selector.trim();
	        if (selector[0] == "<" && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;else if (context !== undefined$1)
	          return $(context).find(selector);
	        else dom = zepto.qsa(document, selector);
	      } else if (isFunction(selector))
	        return $(document).ready(selector);else if (zepto.isZ(selector))
	        return selector;else {
	        if (isArray(selector)) dom = compact(selector);else if (isObject(selector))
	          dom = [selector], selector = null;else if (fragmentRE.test(selector))
	          dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;else if (context !== undefined$1)
	          return $(context).find(selector);
	        else dom = zepto.qsa(document, selector);
	      }
	      return zepto.Z(dom, selector);
	    };
	    $ = function $(selector, context) {
	      return zepto.init(selector, context);
	    };
	    function extend(target, source, deep) {
	      for (key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
	          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
	          extend(target[key], source[key], deep);
	        } else if (source[key] !== undefined$1) target[key] = source[key];
	      }
	    }
	    $.extend = function (target) {
	      var deep,
	          args = _slice.call(arguments, 1);
	      if (typeof target == "boolean") {
	        deep = target;
	        target = args.shift();
	      }
	      args.forEach(function (arg) {
	        extend(target, arg, deep);
	      });
	      return target;
	    };
	    zepto.qsa = function (element, selector) {
	      var found,
	          maybeID = selector[0] == "#",
	          maybeClass = !maybeID && selector[0] == ".",
	          nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
	      isSimple = simpleSelectorRE.test(nameOnly);
	      return element.getElementById && isSimple && maybeID
	      ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11 ? [] : _slice.call(isSimple && !maybeID && element.getElementsByClassName
	      ? maybeClass ? element.getElementsByClassName(nameOnly)
	      : element.getElementsByTagName(selector)
	      : element.querySelectorAll(selector)
	      );
	    };
	    function filtered(nodes, selector) {
	      return selector == null ? $(nodes) : $(nodes).filter(selector);
	    }
	    $.contains = document.documentElement.contains ? function (parent, node) {
	      return parent !== node && parent.contains(node);
	    } : function (parent, node) {
	      while (node && (node = node.parentNode)) {
	        if (node === parent) return true;
	      }
	      return false;
	    };
	    function funcArg(context, arg, idx, payload) {
	      return isFunction(arg) ? arg.call(context, idx, payload) : arg;
	    }
	    function setAttribute(node, name, value) {
	      value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
	    }
	    function className(node, value) {
	      var klass = node.className || "",
	          svg = klass && klass.baseVal !== undefined$1;
	      if (value === undefined$1) return svg ? klass.baseVal : klass;
	      svg ? klass.baseVal = value : node.className = value;
	    }
	    function deserializeValue(value) {
	      try {
	        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	      } catch (e) {
	        return value;
	      }
	    }
	    $.type = type;
	    $.isFunction = isFunction;
	    $.isWindow = isWindow;
	    $.isArray = isArray;
	    $.isPlainObject = isPlainObject;
	    $.isEmptyObject = function (obj) {
	      var name;
	      for (name in obj) {
	        return false;
	      }
	      return true;
	    };
	    $.isNumeric = function (val) {
	      var num = Number(val),
	          type = _typeof(val);
	      return val != null && type != "boolean" && (type != "string" || val.length) && !isNaN(num) && isFinite(num) || false;
	    };
	    $.inArray = function (elem, array, i) {
	      return emptyArray.indexOf.call(array, elem, i);
	    };
	    $.camelCase = camelize;
	    $.trim = function (str) {
	      return str == null ? "" : String.prototype.trim.call(str);
	    };
	    $.uuid = 0;
	    $.support = {};
	    $.expr = {};
	    $.noop = function () {};
	    $.map = function (elements, callback) {
	      var value,
	          values = [],
	          i,
	          key;
	      if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i);
	        if (value != null) values.push(value);
	      } else for (key in elements) {
	        value = callback(elements[key], key);
	        if (value != null) values.push(value);
	      }
	      return flatten(values);
	    };
	    $.each = function (elements, callback) {
	      var i, key;
	      if (likeArray(elements)) {
	        for (i = 0; i < elements.length; i++) {
	          if (callback.call(elements[i], i, elements[i]) === false) return elements;
	        }
	      } else {
	        for (key in elements) {
	          if (callback.call(elements[key], key, elements[key]) === false) return elements;
	        }
	      }
	      return elements;
	    };
	    $.grep = function (elements, callback) {
	      return _filter.call(elements, callback);
	    };
	    if (window.JSON) $.parseJSON = JSON.parse;
	    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	      class2type["[object " + name + "]"] = name.toLowerCase();
	    });
	    $.fn = {
	      constructor: zepto.Z,
	      length: 0,
	      forEach: emptyArray.forEach,
	      reduce: emptyArray.reduce,
	      push: emptyArray.push,
	      sort: emptyArray.sort,
	      splice: emptyArray.splice,
	      indexOf: emptyArray.indexOf,
	      concat: function concat() {
	        var i,
	            value,
	            args = [];
	        for (i = 0; i < arguments.length; i++) {
	          value = arguments[i];
	          args[i] = zepto.isZ(value) ? value.toArray() : value;
	        }
	        return _concat.apply(zepto.isZ(this) ? this.toArray() : this, args);
	      },
	      map: function map(fn) {
	        return $($.map(this, function (el, i) {
	          return fn.call(el, i, el);
	        }));
	      },
	      slice: function slice() {
	        return $(_slice.apply(this, arguments));
	      },
	      ready: function ready(callback) {
	        if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener("DOMContentLoaded", function () {
	          callback($);
	        }, false);
	        return this;
	      },
	      get: function get(idx) {
	        return idx === undefined$1 ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
	      },
	      toArray: function toArray() {
	        return this.get();
	      },
	      size: function size() {
	        return this.length;
	      },
	      remove: function remove() {
	        return this.each(function () {
	          if (this.parentNode != null) this.parentNode.removeChild(this);
	        });
	      },
	      each: function each(callback) {
	        var len = this.length,
	            idx = 0,
	            el;
	        while (idx < len) {
	          el = this[idx];
	          if (callback.call(el, idx, el) === false) {
	            break;
	          }
	          idx++;
	        }
	        return this;
	      },
	      filter: function filter(selector) {
	        if (isFunction(selector)) return this.not(this.not(selector));
	        return $(_filter.call(this, function (element) {
	          return zepto.matches(element, selector);
	        }));
	      },
	      add: function add(selector, context) {
	        return $(uniq(this.concat($(selector, context))));
	      },
	      is: function is(selector) {
	        return this.length > 0 && zepto.matches(this[0], selector);
	      },
	      not: function not(selector) {
	        var nodes = [];
	        if (isFunction(selector) && selector.call !== undefined$1) this.each(function (idx) {
	          if (!selector.call(this, idx)) nodes.push(this);
	        });else {
	          var excludes = typeof selector == "string" ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
	          this.forEach(function (el) {
	            if (excludes.indexOf(el) < 0) nodes.push(el);
	          });
	        }
	        return $(nodes);
	      },
	      has: function has(selector) {
	        return this.filter(function () {
	          return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
	        });
	      },
	      eq: function eq(idx) {
	        return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
	      },
	      first: function first() {
	        var el = this[0];
	        return el && !isObject(el) ? el : $(el);
	      },
	      last: function last() {
	        var el = this[this.length - 1];
	        return el && !isObject(el) ? el : $(el);
	      },
	      find: function find(selector) {
	        var result,
	            $this = this;
	        if (!selector) result = $();else if (_typeof(selector) == "object") result = $(selector).filter(function () {
	          var node = this;
	          return emptyArray.some.call($this, function (parent) {
	            return $.contains(parent, node);
	          });
	        });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
	          return zepto.qsa(this, selector);
	        });
	        return result;
	      },
	      closest: function closest(selector, context) {
	        var nodes = [],
	            collection = _typeof(selector) == "object" && $(selector);
	        this.each(function (_, node) {
	          while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
	            node = node !== context && !isDocument(node) && node.parentNode;
	          }
	          if (node && nodes.indexOf(node) < 0) nodes.push(node);
	        });
	        return $(nodes);
	      },
	      parents: function parents(selector) {
	        var ancestors = [],
	            nodes = this;
	        while (nodes.length > 0) {
	          nodes = $.map(nodes, function (node) {
	            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	              ancestors.push(node);
	              return node;
	            }
	          });
	        }
	        return filtered(ancestors, selector);
	      },
	      parent: function parent(selector) {
	        return filtered(uniq(this.pluck("parentNode")), selector);
	      },
	      children: function children(selector) {
	        return filtered(this.map(function () {
	          return _children(this);
	        }), selector);
	      },
	      contents: function contents() {
	        return this.map(function () {
	          return this.contentDocument || _slice.call(this.childNodes);
	        });
	      },
	      siblings: function siblings(selector) {
	        return filtered(this.map(function (i, el) {
	          return _filter.call(_children(el.parentNode), function (child) {
	            return child !== el;
	          });
	        }), selector);
	      },
	      empty: function empty() {
	        return this.each(function () {
	          this.innerHTML = "";
	        });
	      },
	      pluck: function pluck(property) {
	        return $.map(this, function (el) {
	          return el[property];
	        });
	      },
	      show: function show() {
	        return this.each(function () {
	          this.style.display == "none" && (this.style.display = "");
	          if (getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
	        });
	      },
	      replaceWith: function replaceWith(newContent) {
	        return this.before(newContent).remove();
	      },
	      wrap: function wrap(structure) {
	        var func = isFunction(structure);
	        if (this[0] && !func) var dom = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1;
	        return this.each(function (index) {
	          $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
	        });
	      },
	      wrapAll: function wrapAll(structure) {
	        if (this[0]) {
	          $(this[0]).before(structure = $(structure));
	          var children;
	          while ((children = structure.children()).length) {
	            structure = children.first();
	          }
	          $(structure).append(this);
	        }
	        return this;
	      },
	      wrapInner: function wrapInner(structure) {
	        var func = isFunction(structure);
	        return this.each(function (index) {
	          var self = $(this),
	              contents = self.contents(),
	              dom = func ? structure.call(this, index) : structure;
	          contents.length ? contents.wrapAll(dom) : self.append(dom);
	        });
	      },
	      unwrap: function unwrap() {
	        this.parent().each(function () {
	          $(this).replaceWith($(this).children());
	        });
	        return this;
	      },
	      clone: function clone() {
	        return this.map(function () {
	          return this.cloneNode(true);
	        });
	      },
	      hide: function hide() {
	        return this.css("display", "none");
	      },
	      toggle: function toggle(setting) {
	        return this.each(function () {
	          var el = $(this);
	          (setting === undefined$1 ? el.css("display") == "none" : setting) ? el.show() : el.hide();
	        });
	      },
	      prev: function prev(selector) {
	        return $(this.pluck("previousElementSibling")).filter(selector || "*");
	      },
	      next: function next(selector) {
	        return $(this.pluck("nextElementSibling")).filter(selector || "*");
	      },
	      html: function html(_html) {
	        return 0 in arguments ? this.each(function (idx) {
	          var originHtml = this.innerHTML;
	          $(this).empty().append(funcArg(this, _html, idx, originHtml));
	        }) : 0 in this ? this[0].innerHTML : null;
	      },
	      text: function text(_text) {
	        return 0 in arguments ? this.each(function (idx) {
	          var newText = funcArg(this, _text, idx, this.textContent);
	          this.textContent = newText == null ? "" : "" + newText;
	        }) : 0 in this ? this.pluck("textContent").join("") : null;
	      },
	      attr: function attr(name, value) {
	        var result;
	        return typeof name == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined$1 : this.each(function (idx) {
	          if (this.nodeType !== 1) return;
	          if (isObject(name)) for (key in name) {
	            setAttribute(this, key, name[key]);
	          } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
	        });
	      },
	      removeAttr: function removeAttr(name) {
	        return this.each(function () {
	          this.nodeType === 1 && name.split(" ").forEach(function (attribute) {
	            setAttribute(this, attribute);
	          }, this);
	        });
	      },
	      prop: function prop(name, value) {
	        name = propMap[name] || name;
	        return 1 in arguments ? this.each(function (idx) {
	          this[name] = funcArg(this, value, idx, this[name]);
	        }) : this[0] && this[0][name];
	      },
	      removeProp: function removeProp(name) {
	        name = propMap[name] || name;
	        return this.each(function () {
	          delete this[name];
	        });
	      },
	      data: function data(name, value) {
	        var attrName = "data-" + name.replace(capitalRE, "-$1").toLowerCase();
	        var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
	        return data !== null ? deserializeValue(data) : undefined$1;
	      },
	      val: function val(value) {
	        if (0 in arguments) {
	          if (value == null) value = "";
	          return this.each(function (idx) {
	            this.value = funcArg(this, value, idx, this.value);
	          });
	        } else {
	          return this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function () {
	            return this.selected;
	          }).pluck("value") : this[0].value);
	        }
	      },
	      offset: function offset(coordinates) {
	        if (coordinates) return this.each(function (index) {
	          var $this = $(this),
	              coords = funcArg(this, coordinates, index, $this.offset()),
	              parentOffset = $this.offsetParent().offset(),
	              props = {
	            top: coords.top - parentOffset.top,
	            left: coords.left - parentOffset.left
	          };
	          if ($this.css("position") == "static") props["position"] = "relative";
	          $this.css(props);
	        });
	        if (!this.length) return null;
	        if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0])) return {
	          top: 0,
	          left: 0
	        };
	        var obj = this[0].getBoundingClientRect();
	        return {
	          left: obj.left + window.pageXOffset,
	          top: obj.top + window.pageYOffset,
	          width: Math.round(obj.width),
	          height: Math.round(obj.height)
	        };
	      },
	      css: function css(property, value) {
	        if (arguments.length < 2) {
	          var element = this[0];
	          if (typeof property == "string") {
	            if (!element) return;
	            return element.style[camelize(property)] || getComputedStyle(element, "").getPropertyValue(property);
	          } else if (isArray(property)) {
	            if (!element) return;
	            var props = {};
	            var computedStyle = getComputedStyle(element, "");
	            $.each(property, function (_, prop) {
	              props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
	            });
	            return props;
	          }
	        }
	        var css = "";
	        if (type(property) == "string") {
	          if (!value && value !== 0) this.each(function () {
	            this.style.removeProperty(dasherize(property));
	          });else css = dasherize(property) + ":" + maybeAddPx(property, value);
	        } else {
	          for (key in property) {
	            if (!property[key] && property[key] !== 0) this.each(function () {
	              this.style.removeProperty(dasherize(key));
	            });else css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";";
	          }
	        }
	        return this.each(function () {
	          this.style.cssText += ";" + css;
	        });
	      },
	      index: function index(element) {
	        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
	      },
	      hasClass: function hasClass(name) {
	        if (!name) return false;
	        return emptyArray.some.call(this, function (el) {
	          return this.test(className(el));
	        }, classRE(name));
	      },
	      addClass: function addClass(name) {
	        if (!name) return this;
	        return this.each(function (idx) {
	          if (!("className" in this)) return;
	          classList = [];
	          var cls = className(this),
	              newName = funcArg(this, name, idx, cls);
	          newName.split(/\s+/g).forEach(function (klass) {
	            if (!$(this).hasClass(klass)) classList.push(klass);
	          }, this);
	          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
	        });
	      },
	      removeClass: function removeClass(name) {
	        return this.each(function (idx) {
	          if (!("className" in this)) return;
	          if (name === undefined$1) return className(this, "");
	          classList = className(this);
	          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
	            classList = classList.replace(classRE(klass), " ");
	          });
	          className(this, classList.trim());
	        });
	      },
	      toggleClass: function toggleClass(name, when) {
	        if (!name) return this;
	        return this.each(function (idx) {
	          var $this = $(this),
	              names = funcArg(this, name, idx, className(this));
	          names.split(/\s+/g).forEach(function (klass) {
	            (when === undefined$1 ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
	          });
	        });
	      },
	      scrollTop: function scrollTop(value) {
	        if (!this.length) return;
	        var hasScrollTop = ("scrollTop" in this[0]);
	        if (value === undefined$1) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
	        return this.each(hasScrollTop ? function () {
	          this.scrollTop = value;
	        } : function () {
	          this.scrollTo(this.scrollX, value);
	        });
	      },
	      scrollLeft: function scrollLeft(value) {
	        if (!this.length) return;
	        var hasScrollLeft = ("scrollLeft" in this[0]);
	        if (value === undefined$1) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
	        return this.each(hasScrollLeft ? function () {
	          this.scrollLeft = value;
	        } : function () {
	          this.scrollTo(value, this.scrollY);
	        });
	      },
	      position: function position() {
	        if (!this.length) return;
	        var elem = this[0],
	        offsetParent = this.offsetParent(),
	        offset = this.offset(),
	            parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
	          top: 0,
	          left: 0
	        } : offsetParent.offset();
	        offset.top -= parseFloat($(elem).css("margin-top")) || 0;
	        offset.left -= parseFloat($(elem).css("margin-left")) || 0;
	        parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
	        parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0;
	        return {
	          top: offset.top - parentOffset.top,
	          left: offset.left - parentOffset.left
	        };
	      },
	      offsetParent: function offsetParent() {
	        return this.map(function () {
	          var parent = this.offsetParent || document.body;
	          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
	            parent = parent.offsetParent;
	          }
	          return parent;
	        });
	      }
	    };
	    $.fn.detach = $.fn.remove;
	    ["width", "height"].forEach(function (dimension) {
	      var dimensionProperty = dimension.replace(/./, function (m) {
	        return m[0].toUpperCase();
	      });
	      $.fn[dimension] = function (value) {
	        var offset,
	            el = this[0];
	        if (value === undefined$1) return isWindow(el) ? el["inner" + dimensionProperty] : isDocument(el) ? el.documentElement["scroll" + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
	          el = $(this);
	          el.css(dimension, funcArg(this, value, idx, el[dimension]()));
	        });
	      };
	    });
	    function traverseNode(node, fun) {
	      fun(node);
	      for (var i = 0, len = node.childNodes.length; i < len; i++) {
	        traverseNode(node.childNodes[i], fun);
	      }
	    }
	    function executeScript(doc, content, nonce) {
	      var nearestNode = doc.getElementsByTagName("script")[0];
	      if (!nearestNode) {
	        return;
	      }
	      var parentNode = nearestNode.parentNode;
	      if (!parentNode) {
	        return;
	      }
	      var script = doc.createElement("script");
	      script.innerHTML = content;
	      if (isNotBlank(nonce)) {
	        script.setAttribute("nonce", nonce);
	      }
	      parentNode.appendChild(script);
	      parentNode.removeChild(script);
	    }
	    adjacencyOperators.forEach(function (operator, operatorIndex) {
	      var inside = operatorIndex % 2;
	      $.fn[operator] = function () {
	        var argType,
	            nodes = $.map(arguments, function (arg) {
	          var arr = [];
	          argType = type(arg);
	          if (argType == "array") {
	            arg.forEach(function (el) {
	              if (el.nodeType !== undefined$1) return arr.push(el);else if ($.zepto.isZ(el)) return arr = arr.concat(el.get());
	              arr = arr.concat(zepto.fragment(el));
	            });
	            return arr;
	          }
	          return argType == "object" || arg == null ? arg : zepto.fragment(arg);
	        }),
	            parent,
	            copyByClone = this.length > 1;
	        if (nodes.length < 1) return this;
	        return this.each(function (_, target) {
	          parent = inside ? target : target.parentNode;
	          target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
	          var parentInDocument = $.contains(document.documentElement, parent);
	          var SCRIPT_TYPES = /^(text|application)\/(javascript|ecmascript)$/;
	          var config = getConfig();
	          var scriptNonce = config[CSP_SCRIPT_NONCE];
	          var styleNonce = config[CSP_STYLE_NONCE];
	          nodes.forEach(function (node) {
	            if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();
	            if (isNotBlank(scriptNonce) && node.tagName === "SCRIPT") {
	              node.setAttribute("nonce", scriptNonce);
	            }
	            if (isNotBlank(styleNonce) && node.tagName === "STYLE") {
	              node.setAttribute("nonce", styleNonce);
	            }
	            parent.insertBefore(node, target);
	            if (parentInDocument) traverseNode(node, function (el) {
	              if (el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || SCRIPT_TYPES.test(el.type.toLowerCase())) && !el.src) {
	                executeScript(document, el.innerHTML, el.nonce);
	              }
	            });
	          });
	        });
	      };
	      $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function (html) {
	        $(html)[operator](this);
	        return this;
	      };
	    });
	    zepto.Z.prototype = Z.prototype = $.fn;
	    zepto.uniq = uniq;
	    zepto.deserializeValue = deserializeValue;
	    $.zepto = zepto;
	    return $;
	  }();
	  (function ($) {
	    var _zid = 1,
	        undefined$1,
	        slice = Array.prototype.slice,
	        isFunction = $.isFunction,
	        isString = function isString(obj) {
	      return typeof obj == "string";
	    },
	        handlers = {},
	        specialEvents = {},
	        focusinSupported = ("onfocusin" in window),
	        focus = {
	      focus: "focusin",
	      blur: "focusout"
	    },
	        hover = {
	      mouseenter: "mouseover",
	      mouseleave: "mouseout"
	    };
	    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";
	    function zid(element) {
	      return element._zid || (element._zid = _zid++);
	    }
	    function findHandlers(element, event, fn, selector) {
	      event = parse(event);
	      if (event.ns) var matcher = matcherFor(event.ns);
	      return (handlers[zid(element)] || []).filter(function (handler) {
	        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	      });
	    }
	    function parse(event) {
	      var parts = ("" + event).split(".");
	      return {
	        e: parts[0],
	        ns: parts.slice(1).sort().join(" ")
	      };
	    }
	    function matcherFor(ns) {
	      return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
	    }
	    function eventCapture(handler, captureSetting) {
	      return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
	    }
	    function realEvent(type) {
	      return hover[type] || focusinSupported && focus[type] || type;
	    }
	    function add(element, events, fn, data, selector, delegator, capture) {
	      var id = zid(element),
	          set = handlers[id] || (handlers[id] = []);
	      events.split(/\s/).forEach(function (event) {
	        if (event == "ready") return $(document).ready(fn);
	        var handler = parse(event);
	        handler.fn = fn;
	        handler.sel = selector;
	        if (handler.e in hover) fn = function fn(e) {
	          var related = e.relatedTarget;
	          if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
	        };
	        handler.del = delegator;
	        var callback = delegator || fn;
	        handler.proxy = function (e) {
	          e = compatible(e);
	          if (e.isImmediatePropagationStopped()) return;
	          e.data = data;
	          var result = callback.apply(element, e._args == undefined$1 ? [e] : [e].concat(e._args));
	          if (result === false) e.preventDefault(), e.stopPropagation();
	          return result;
	        };
	        handler.i = set.length;
	        set.push(handler);
	        if ("addEventListener" in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	      });
	    }
	    function remove(element, events, fn, selector, capture) {
	      var id = zid(element);
	      (events || "").split(/\s/).forEach(function (event) {
	        findHandlers(element, event, fn, selector).forEach(function (handler) {
	          delete handlers[id][handler.i];
	          if ("removeEventListener" in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	        });
	      });
	    }
	    $.event = {
	      add: add,
	      remove: remove
	    };
	    $.proxy = function (fn, context) {
	      var args = 2 in arguments && slice.call(arguments, 2);
	      if (isFunction(fn)) {
	        var proxyFn = function proxyFn() {
	          return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
	        };
	        proxyFn._zid = zid(fn);
	        return proxyFn;
	      } else if (isString(context)) {
	        if (args) {
	          args.unshift(fn[context], fn);
	          return $.proxy.apply(null, args);
	        } else {
	          return $.proxy(fn[context], fn);
	        }
	      } else {
	        throw new TypeError("expected function");
	      }
	    };
	    $.fn.bind = function (event, data, callback) {
	      return this.on(event, data, callback);
	    };
	    $.fn.unbind = function (event, callback) {
	      return this.off(event, callback);
	    };
	    $.fn.one = function (event, selector, data, callback) {
	      return this.on(event, selector, data, callback, 1);
	    };
	    var returnTrue = function returnTrue() {
	      return true;
	    },
	        returnFalse = function returnFalse() {
	      return false;
	    },
	        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
	        eventMethods = {
	      preventDefault: "isDefaultPrevented",
	      stopImmediatePropagation: "isImmediatePropagationStopped",
	      stopPropagation: "isPropagationStopped"
	    };
	    function compatible(event, source) {
	      if (source || !event.isDefaultPrevented) {
	        source || (source = event);
	        $.each(eventMethods, function (name, predicate) {
	          var sourceMethod = source[name];
	          event[name] = function () {
	            this[predicate] = returnTrue;
	            return sourceMethod && sourceMethod.apply(source, arguments);
	          };
	          event[predicate] = returnFalse;
	        });
	        try {
	          event.timeStamp || (event.timeStamp = new Date().getTime());
	        } catch (ignored) {}
	        if (source.defaultPrevented !== undefined$1 ? source.defaultPrevented : "returnValue" in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
	      }
	      return event;
	    }
	    function createProxy(event) {
	      var key,
	          proxy = {
	        originalEvent: event
	      };
	      for (key in event) {
	        if (!ignoreProperties.test(key) && event[key] !== undefined$1) proxy[key] = event[key];
	      }
	      return compatible(proxy, event);
	    }
	    $.fn.delegate = function (selector, event, callback) {
	      return this.on(event, selector, callback);
	    };
	    $.fn.undelegate = function (selector, event, callback) {
	      return this.off(event, selector, callback);
	    };
	    $.fn.live = function (event, callback) {
	      $(document.body).delegate(this.selector, event, callback);
	      return this;
	    };
	    $.fn.die = function (event, callback) {
	      $(document.body).undelegate(this.selector, event, callback);
	      return this;
	    };
	    $.fn.on = function (event, selector, data, callback, one) {
	      var autoRemove,
	          delegator,
	          $this = this;
	      if (event && !isString(event)) {
	        $.each(event, function (type, fn) {
	          $this.on(type, selector, data, fn, one);
	        });
	        return $this;
	      }
	      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined$1;
	      if (callback === undefined$1 || data === false) callback = data, data = undefined$1;
	      if (callback === false) callback = returnFalse;
	      return $this.each(function (_, element) {
	        if (one) autoRemove = function autoRemove(e) {
	          remove(element, e.type, callback);
	          return callback.apply(this, arguments);
	        };
	        if (selector) delegator = function delegator(e) {
	          var evt,
	              match = $(e.target).closest(selector, element).get(0);
	          if (match && match !== element) {
	            evt = $.extend(createProxy(e), {
	              currentTarget: match,
	              liveFired: element
	            });
	            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
	          }
	        };
	        add(element, event, callback, data, selector, delegator || autoRemove);
	      });
	    };
	    $.fn.off = function (event, selector, callback) {
	      var $this = this;
	      if (event && !isString(event)) {
	        $.each(event, function (type, fn) {
	          $this.off(type, selector, fn);
	        });
	        return $this;
	      }
	      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined$1;
	      if (callback === false) callback = returnFalse;
	      return $this.each(function () {
	        remove(this, event, callback, selector);
	      });
	    };
	    $.fn.trigger = function (event, args) {
	      event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
	      event._args = args;
	      return this.each(function () {
	        if (event.type in focus && typeof this[event.type] == "function") this[event.type]();else if ("dispatchEvent" in this)
	          this.dispatchEvent(event);else $(this).triggerHandler(event, args);
	      });
	    };
	    $.fn.triggerHandler = function (event, args) {
	      var e, result;
	      this.each(function (i, element) {
	        e = createProxy(isString(event) ? $.Event(event) : event);
	        e._args = args;
	        e.target = element;
	        $.each(findHandlers(element, event.type || event), function (i, handler) {
	          result = handler.proxy(e);
	          if (e.isImmediatePropagationStopped()) return false;
	        });
	      });
	      return result;
	    };
	    ("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function (event) {
	      $.fn[event] = function (callback) {
	        return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
	      };
	    });
	    $.Event = function (type, props) {
	      if (!isString(type)) props = type, type = props.type;
	      var event = document.createEvent(specialEvents[type] || "Events"),
	          bubbles = true;
	      if (props) for (var name in props) {
	        name == "bubbles" ? bubbles = !!props[name] : event[name] = props[name];
	      }
	      event.initEvent(type, bubbles, true);
	      return compatible(event);
	    };
	  })(Zepto);
	  (function () {
	    try {
	      getComputedStyle(undefined);
	    } catch (e) {
	      var nativeGetComputedStyle = getComputedStyle;
	      window.getComputedStyle = function (element, pseudoElement) {
	        try {
	          return nativeGetComputedStyle(element, pseudoElement);
	        } catch (e) {
	          return null;
	        }
	      };
	    }
	  })();
	  (function ($) {
	    var zepto = $.zepto,
	        oldQsa = zepto.qsa,
	        childRe = /^\s*>/,
	        classTag = "Zepto" + +new Date();
	    zepto.qsa = function (node, selector) {
	      var sel = selector,
	          nodes,
	          taggedParent;
	      try {
	        if (!sel) sel = "*";else if (childRe.test(sel))
	          taggedParent = $(node).addClass(classTag), sel = "." + classTag + " " + sel;
	        nodes = oldQsa(node, sel);
	      } catch (e) {
	        throw e;
	      } finally {
	        if (taggedParent) taggedParent.removeClass(classTag);
	      }
	      return nodes;
	    };
	  })(Zepto);
	  return Zepto;
	})(window);

	var MO_OBJECT = window.MutationObserver || window.WebkitMutationObserver;
	function canUseMutationObserver() {
	  return isFunction(MO_OBJECT);
	}
	function getMutationObserver(callback) {
	  return new MO_OBJECT(callback);
	}

	var ARRAY_EXPECTED = "Expected an array of promises";
	function getMoImmediateFn() {
	  var textnode = document.createTextNode("");
	  var twiddleNode = function twiddleNode() {
	    textnode.textContent = textnode.textContent.length > 0 ? "" : "a";
	  };
	  var callbacks = [];
	  var mo = getMutationObserver(function () {
	    var len = callbacks.length;
	    for (var i = 0; i < len; i += 1) {
	      callbacks[i]();
	    }
	    callbacks.splice(0, len);
	  });
	  mo.observe(textnode, {
	    characterData: true
	  });
	  return function (fn) {
	    callbacks.push(fn);
	    twiddleNode();
	  };
	}
	function getOnReadyStateChangeImmediateFn() {
	  return function (fn) {
	    var scriptEl = $("<script>");
	    scriptEl.on("readystatechange", function () {
	      scriptEl.on("readystatechange", null);
	      scriptEl.remove();
	      scriptEl = null;
	      fn();
	    });
	    $(document.documentElement).append(scriptEl);
	  };
	}
	function setupPromiseImmediateFn() {
	  if (canUseMutationObserver()) {
	    reactorPromise._setImmediateFn(getMoImmediateFn());
	    return;
	  }
	  if (window.navigator.userAgent.indexOf("MSIE 10") !== -1) {
	    reactorPromise._setImmediateFn(getOnReadyStateChangeImmediateFn());
	  }
	}
	if (reactorPromise._setImmediateFn) {
	  setupPromiseImmediateFn();
	}
	function create(func) {
	  return new reactorPromise(func);
	}
	function resolve$1(value) {
	  return reactorPromise.resolve(value);
	}
	function reject$1(value) {
	  return reactorPromise.reject(value);
	}
	function race(arr) {
	  if (!isArray(arr)) {
	    return reject$1(new TypeError(ARRAY_EXPECTED));
	  }
	  return reactorPromise.race(arr);
	}
	function all(arr) {
	  if (!isArray(arr)) {
	    return reject$1(new TypeError(ARRAY_EXPECTED));
	  }
	  return reactorPromise.all(arr);
	}
	function timeout(promise, time, message) {
	  var id = -1;
	  var delayedPromise = create(function (_, rej) {
	    id = delay(function () {
	      return rej(new Error(message));
	    }, time);
	  });
	  return race([promise, delayedPromise]).then(function (val) {
	    cancelDelay(id);
	    return val;
	  }, function (err) {
	    cancelDelay(id);
	    throw err;
	  });
	}

	function isOptinAvailable(win) {
	  if (isNil(win[ADOBE])) {
	    return false;
	  }
	  var adobe = win[ADOBE];
	  if (isNil(adobe[OPTIN])) {
	    return false;
	  }
	  var optin = adobe[OPTIN];
	  return isFunction(optin[FETCH_PERMISSIONS]) && isFunction(optin[IS_APPROVED]);
	}
	function isOptinEnabled(win, optinEnabled) {
	  if (!optinEnabled) {
	    return false;
	  }
	  return isOptinAvailable(win);
	}
	function isCategoryApproved(win, key) {
	  if (!isOptinAvailable(win)) {
	    return true;
	  }
	  var optIn = win[ADOBE][OPTIN];
	  var categories = win[ADOBE][OPTIN][CATEGORIES] || {};
	  var category = categories[key];
	  return optIn[IS_APPROVED](category);
	}
	function fetchPermissions(win, key) {
	  if (!isOptinAvailable(win)) {
	    return resolve$1(true);
	  }
	  var optIn = win[ADOBE][OPTIN];
	  var categories = win[ADOBE][OPTIN][CATEGORIES] || {};
	  var category = categories[key];
	  return create(function (res, rej) {
	    optIn[FETCH_PERMISSIONS](function () {
	      if (optIn[IS_APPROVED](category)) {
	        res(true);
	      } else {
	        rej(ERROR_TARGET_NOT_OPTED_IN);
	      }
	    }, true);
	  });
	}

	function shouldUseOptin() {
	  var config = getConfig();
	  var optinEnabled = config[OPTIN_ENABLED];
	  return isOptinEnabled(window, optinEnabled);
	}
	function isTargetApproved() {
	  return isCategoryApproved(window, TARGET);
	}
	function isAnalyticsApproved() {
	  return isCategoryApproved(window, ANALYTICS);
	}
	function fetchOptinPermissions() {
	  return fetchPermissions(window, TARGET);
	}

	var SESSION_ID = uuid();
	function getSessionIdFromQuery() {
	  var location = window.location;
	  var search = location.search;
	  var params = parseQueryString(search);
	  return params[SESSION_ID_PARAM];
	}
	function saveSessionId(value, config) {
	  setTargetCookie({
	    name: SESSION_ID_COOKIE,
	    value: value,
	    expires: config[SESSION_ID_LIFETIME],
	    domain: config[COOKIE_DOMAIN]
	  });
	}
	function getSessionId() {
	  if (shouldUseOptin() && !isTargetApproved()) {
	    return SESSION_ID;
	  }
	  var config = getConfig();
	  var sessionIdQuery = getSessionIdFromQuery();
	  if (isNotBlank(sessionIdQuery)) {
	    saveSessionId(sessionIdQuery, config);
	    return getTargetCookie(SESSION_ID_COOKIE);
	  }
	  var sessionId = getTargetCookie(SESSION_ID_COOKIE);
	  if (isBlank(sessionId)) {
	    saveSessionId(SESSION_ID, config);
	  }
	  return getTargetCookie(SESSION_ID_COOKIE);
	}

	function setDeviceId(value) {
	  var config = getConfig();
	  setTargetCookie({
	    name: DEVICE_ID_COOKIE,
	    value: value,
	    expires: config[DEVICE_ID_LIFETIME],
	    domain: config[COOKIE_DOMAIN]
	  });
	}
	function getDeviceId() {
	  return getTargetCookie(DEVICE_ID_COOKIE);
	}

	var CLUSTER_ID_REGEX = /.*\.(\d+)_\d+/;
	function extractCluster(id) {
	  if (isBlank(id)) {
	    return "";
	  }
	  var result = CLUSTER_ID_REGEX.exec(id);
	  if (isEmpty(result) || result.length !== 2) {
	    return "";
	  }
	  return result[1];
	}
	function getEdgeCluster() {
	  var config = getConfig();
	  if (!config[OVERRIDE_MBOX_EDGE_SERVER]) {
	    return "";
	  }
	  var result = getCookie(EDGE_CLUSTER_COOKIE);
	  return isBlank(result) ? "" : result;
	}
	function setEdgeCluster(id) {
	  var config = getConfig();
	  if (!config[OVERRIDE_MBOX_EDGE_SERVER]) {
	    return;
	  }
	  var domain = config[COOKIE_DOMAIN];
	  var expires = new Date(now() + config[OVERRIDE_MBOX_EDGE_SERVER_TIMEOUT]);
	  var savedCluster = getCookie(EDGE_CLUSTER_COOKIE);
	  var attrs = {
	    domain: domain,
	    expires: expires
	  };
	  if (isNotBlank(savedCluster)) {
	    setCookie(EDGE_CLUSTER_COOKIE, savedCluster, attrs);
	    return;
	  }
	  var cluster = extractCluster(id);
	  if (isBlank(cluster)) {
	    return;
	  }
	  setCookie(EDGE_CLUSTER_COOKIE, cluster, attrs);
	}

	function bootstrapNotify(win, doc) {
	  if (isFunction(win.CustomEvent)) {
	    return;
	  }
	  function CustomEvent(event, params) {
	    var evt = doc.createEvent("CustomEvent");
	    params = params || {
	      bubbles: false,
	      cancelable: false,
	      detail: undefined
	    };
	    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	    return evt;
	  }
	  CustomEvent.prototype = win.Event.prototype;
	  win.CustomEvent = CustomEvent;
	}
	function createTracking(getSessionId, getDeviceId) {
	  var sessionId = getSessionId();
	  var deviceId = getDeviceId();
	  var result = {};
	  result.sessionId = sessionId;
	  if (isNotBlank(deviceId)) {
	    result.deviceId = deviceId;
	    return result;
	  }
	  return result;
	}
	function notify(win, doc, eventName, detail) {
	  var event = new win.CustomEvent(eventName, {
	    detail: detail
	  });
	  doc.dispatchEvent(event);
	}

	bootstrapNotify(window, document);
	var LIBRARY_LOADED = "at-library-loaded";
	var REQUEST_START = "at-request-start";
	var REQUEST_SUCCEEDED$1 = "at-request-succeeded";
	var REQUEST_FAILED$1 = "at-request-failed";
	var CONTENT_RENDERING_START = "at-content-rendering-start";
	var CONTENT_RENDERING_SUCCEEDED = "at-content-rendering-succeeded";
	var CONTENT_RENDERING_FAILED = "at-content-rendering-failed";
	var CONTENT_RENDERING_NO_OFFERS = "at-content-rendering-no-offers";
	var CONTENT_RENDERING_REDIRECT = "at-content-rendering-redirect";
	function buildPayload(type, detail) {
	  var mbox = detail.mbox,
	      error = detail.error,
	      url = detail.url,
	      analyticsDetails = detail.analyticsDetails,
	      responseTokens = detail.responseTokens,
	      execution = detail.execution;
	  var tracking = createTracking(getSessionId, getDeviceId);
	  var payload = {
	    type: type,
	    tracking: tracking
	  };
	  if (!isNil(mbox)) {
	    payload.mbox = mbox;
	  }
	  if (!isNil(error)) {
	    payload.error = error;
	  }
	  if (!isNil(url)) {
	    payload.url = url;
	  }
	  if (!isEmpty(analyticsDetails)) {
	    payload.analyticsDetails = analyticsDetails;
	  }
	  if (!isEmpty(responseTokens)) {
	    payload.responseTokens = responseTokens;
	  }
	  if (!isEmpty(execution)) {
	    payload.execution = execution;
	  }
	  return payload;
	}
	function notifyLibraryLoaded() {
	  var payload = buildPayload(LIBRARY_LOADED, {});
	  notify(window, document, LIBRARY_LOADED, payload);
	}
	function notifyRequestStart(detail) {
	  var payload = buildPayload(REQUEST_START, detail);
	  notify(window, document, REQUEST_START, payload);
	}
	function notifyRequestSucceeded(detail, redirect) {
	  var payload = buildPayload(REQUEST_SUCCEEDED$1, detail);
	  payload.redirect = redirect;
	  notify(window, document, REQUEST_SUCCEEDED$1, payload);
	}
	function notifyRequestFailed(detail) {
	  var payload = buildPayload(REQUEST_FAILED$1, detail);
	  notify(window, document, REQUEST_FAILED$1, payload);
	}
	function notifyRenderingStart(detail) {
	  perfTool.timeStart(TIMING_OFFERS_RENDERED);
	  var payload = buildPayload(CONTENT_RENDERING_START, detail);
	  notify(window, document, CONTENT_RENDERING_START, payload);
	}
	function notifyRenderingSucceeded(detail) {
	  perfTool.timeEnd(TIMING_OFFERS_RENDERED);
	  var payload = buildPayload(CONTENT_RENDERING_SUCCEEDED, detail);
	  notify(window, document, CONTENT_RENDERING_SUCCEEDED, payload);
	}
	function notifyRenderingFailed(detail) {
	  var payload = buildPayload(CONTENT_RENDERING_FAILED, detail);
	  notify(window, document, CONTENT_RENDERING_FAILED, payload);
	}
	function notifyRenderingNoOffers(detail) {
	  var payload = buildPayload(CONTENT_RENDERING_NO_OFFERS, detail);
	  notify(window, document, CONTENT_RENDERING_NO_OFFERS, payload);
	}
	function notifyRenderingRedirect(detail) {
	  var payload = buildPayload(CONTENT_RENDERING_REDIRECT, detail);
	  notify(window, document, CONTENT_RENDERING_REDIRECT, payload);
	}
	function notifyOnDeviceDecisioning(eventName, payload) {
	  notify(window, document, eventName, payload);
	}

	var getPromise = function getPromise(url, script) {
	  return new reactorPromise(function (resolve, reject) {
	    script.onload = function () {
	      resolve(script);
	    };
	    script.onerror = function () {
	      reject(new Error('Failed to load script ' + url));
	    };
	  });
	};
	var reactorLoadScript = function reactorLoadScript(url) {
	  var script = document.createElement('script');
	  script.src = url;
	  script.async = true;
	  var promise = getPromise(url, script);
	  document.getElementsByTagName('head')[0].appendChild(script);
	  return promise;
	};

	function isElement(value) {
	  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
	}

	var EQ_START = ":eq(";
	var EQ_END = ")";
	var EQ_LENGTH = EQ_START.length;
	var DIGIT_IN_SELECTOR_PATTERN = /((\.|#)(-)?\d{1})/g;
	function createPair(match) {
	  var first = match.charAt(0);
	  var second = match.charAt(1);
	  var third = match.charAt(2);
	  var result = {
	    key: match
	  };
	  if (second === "-") {
	    result.val = "" + first + second + "\\3" + third + " ";
	  } else {
	    result.val = first + "\\3" + second + " ";
	  }
	  return result;
	}
	function escapeDigitsInSelector(selector) {
	  var matches = selector.match(DIGIT_IN_SELECTOR_PATTERN);
	  if (isEmpty(matches)) {
	    return selector;
	  }
	  var pairs = map(createPair, matches);
	  return reduce(function (acc, pair) {
	    return acc.replace(pair.key, pair.val);
	  }, selector, pairs);
	}
	function parseSelector(selector) {
	  var result = [];
	  var sel = trim(selector);
	  var currentIndex = sel.indexOf(EQ_START);
	  var head;
	  var tail;
	  var eq;
	  var index;
	  while (currentIndex !== -1) {
	    head = trim(sel.substring(0, currentIndex));
	    tail = trim(sel.substring(currentIndex));
	    index = tail.indexOf(EQ_END);
	    eq = trim(tail.substring(EQ_LENGTH, index));
	    sel = trim(tail.substring(index + 1));
	    currentIndex = sel.indexOf(EQ_START);
	    if (head && eq) {
	      result.push({
	        sel: head,
	        eq: Number(eq)
	      });
	    }
	  }
	  if (sel) {
	    result.push({
	      sel: sel
	    });
	  }
	  return result;
	}
	function select(selector) {
	  if (isElement(selector)) {
	    return $(selector);
	  }
	  if (!isString(selector)) {
	    return $(selector);
	  }
	  var selectorAsString = escapeDigitsInSelector(selector);
	  if (selectorAsString.indexOf(EQ_START) === -1) {
	    return $(selectorAsString);
	  }
	  var parts = parseSelector(selectorAsString);
	  return reduce(function (acc, part) {
	    var sel = part.sel,
	        eq = part.eq;
	    acc = acc.find(sel);
	    if (isNumber(eq)) {
	      acc = acc.eq(eq);
	    }
	    return acc;
	  }, $(document), parts);
	}
	function exists$2(selector) {
	  return select(selector).length > 0;
	}
	function fragment(content) {
	  return $("<" + DIV_TAG + "/>").append(content);
	}
	function wrap(content) {
	  return $(content);
	}
	function prev(selector) {
	  return select(selector).prev();
	}
	function next(selector) {
	  return select(selector).next();
	}
	function parent(selector) {
	  return select(selector).parent();
	}
	function is(query, selector) {
	  return select(selector).is(query);
	}
	function find(query, selector) {
	  return select(selector).find(query);
	}
	function children(selector) {
	  return select(selector).children();
	}

	var LOAD_ERROR = "Unable to load target-vec.js";
	var LOAD_AUTHORING = "Loading target-vec.js";
	var NAMESPACE = "_AT";
	var EDITOR = "clickHandlerForExperienceEditor";
	var CURRENT_VIEW = "currentView";
	function initNamespace() {
	  window[NAMESPACE] = window[NAMESPACE] || {};
	  window[NAMESPACE].querySelectorAll = select;
	}
	function handleAuthoringTriggeredView(options) {
	  if (!isAuthoringEnabled()) {
	    return;
	  }
	  var viewName = options[VIEW_NAME];
	  window[NAMESPACE][CURRENT_VIEW] = viewName;
	}
	function setupClickHandler() {
	  document.addEventListener(CLICK, function (event) {
	    if (isFunction(window[NAMESPACE][EDITOR])) {
	      window[NAMESPACE][EDITOR](event);
	    }
	  }, true);
	}
	function initAuthoringCode() {
	  perfTool.timeStart(TIMING_AUTHORING_INIT);
	  if (!isAuthoringEnabled()) {
	    perfTool.timeEnd(TIMING_AUTHORING_INIT);
	    return;
	  }
	  initNamespace();
	  var config = getConfig();
	  var authoringScriptUrl = config[AUTHORING_SCRIPT_URL];
	  var success = function success() {
	    return setupClickHandler();
	  };
	  var error = function error() {
	    return logWarn(LOAD_ERROR);
	  };
	  logDebug(LOAD_AUTHORING);
	  reactorLoadScript(authoringScriptUrl).then(success)['catch'](error).finally(function () {
	    return perfTool.timeEnd(TIMING_AUTHORING_INIT);
	  });
	}

	var QA_MODE_COOKIE = "at_qa_mode";
	var PREVIEW_TOKEN = "at_preview_token";
	var PREVIEW_INDEX = "at_preview_index";
	var ACTIVITIES_ONLY = "at_preview_listed_activities_only";
	var TRUE_AUDIENCE_IDS = "at_preview_evaluate_as_true_audience_ids";
	var FALSE_AUDIENCE_IDS = "at_preview_evaluate_as_false_audience_ids";
	var UNDERSCORE = "_";
	var notNull = function notNull(v) {
	  return !isNil(v);
	};
	var qaModeActive = false;
	function toNumber(value) {
	  return parseInt(value, 10);
	}
	function getIndex(value) {
	  var result = toNumber(value);
	  return isNaN(result) ? null : result;
	}
	function extractAudienceIds(value) {
	  return split(UNDERSCORE, value);
	}
	function parsePreviewIndex(value) {
	  var pair = split(UNDERSCORE, value);
	  var activityIndex = getIndex(pair[0]);
	  if (isNil(activityIndex)) {
	    return null;
	  }
	  var result = {};
	  result.activityIndex = activityIndex;
	  var experienceIndex = getIndex(pair[1]);
	  if (!isNil(experienceIndex)) {
	    result.experienceIndex = experienceIndex;
	  }
	  return result;
	}
	function parsePreviewIndexes(values) {
	  return filter(notNull, map(parsePreviewIndex, values));
	}
	function extractPreviewIndexes(value) {
	  if (isArray(value)) {
	    return parsePreviewIndexes(value);
	  }
	  return parsePreviewIndexes([value]);
	}
	function extractQaMode(queryString) {
	  var query = parseQueryString(queryString);
	  var token = query[PREVIEW_TOKEN];
	  if (isBlank(token)) {
	    qaModeActive = false;
	    return null;
	  }
	  qaModeActive = true;
	  var result = {};
	  result.token = token;
	  var listedActivitiesOnly = query[ACTIVITIES_ONLY];
	  if (isNotBlank(listedActivitiesOnly) && listedActivitiesOnly === TRUE) {
	    result.listedActivitiesOnly = true;
	  }
	  var trueAudiences = query[TRUE_AUDIENCE_IDS];
	  if (isNotBlank(trueAudiences)) {
	    result.evaluateAsTrueAudienceIds = extractAudienceIds(trueAudiences);
	  }
	  var falseAudiences = query[FALSE_AUDIENCE_IDS];
	  if (isNotBlank(falseAudiences)) {
	    result.evaluateAsFalseAudienceIds = extractAudienceIds(falseAudiences);
	  }
	  var previewIndexes = query[PREVIEW_INDEX];
	  if (isEmpty(previewIndexes)) {
	    return result;
	  }
	  result.previewIndexes = extractPreviewIndexes(previewIndexes);
	  return result;
	}
	function initQaMode(win) {
	  perfTool.timeStart(TIMING_QAMODE_INIT);
	  var result = extractQaMode(win.location.search);
	  if (isNil(result)) {
	    return;
	  }
	  var expires = new Date(now() + 1.86e6);
	  setCookie(QA_MODE_COOKIE, JSON.stringify(result), {
	    expires: expires
	  });
	  perfTool.timeEnd(TIMING_QAMODE_INIT);
	}
	function getQaMode() {
	  var result = getCookie(QA_MODE_COOKIE);
	  if (isBlank(result)) {
	    return {};
	  }
	  try {
	    return JSON.parse(result);
	  } catch (e) {
	    return {};
	  }
	}
	function isQaMode() {
	  return qaModeActive;
	}

	var PREVIEW_MODE_COOKIE = "at_preview_mode";
	var PREVIEW_MODE_TOKEN = "at_preview";
	var previewActive = false;
	function extractPreviewMode(queryString) {
	  var query = parseQueryString(queryString);
	  var token = query[PREVIEW_MODE_TOKEN];
	  if (isBlank(token)) {
	    previewActive = false;
	    return null;
	  }
	  previewActive = true;
	  return {
	    token: token
	  };
	}
	function initPreviewMode(win) {
	  perfTool.timeStart(TIMING_PREVIEW_MODE_INIT);
	  var result = extractPreviewMode(win.location.search);
	  if (isNil(result)) {
	    return;
	  }
	  var expires = new Date(now() + 1.86e6);
	  setCookie(PREVIEW_MODE_COOKIE, JSON.stringify(result), {
	    expires: expires
	  });
	  perfTool.timeEnd(TIMING_PREVIEW_MODE_INIT);
	}
	function getPreview() {
	  var result = getCookie(PREVIEW_MODE_COOKIE);
	  if (isBlank(result)) {
	    return {};
	  }
	  try {
	    return JSON.parse(result);
	  } catch (e) {
	    return {};
	  }
	}
	function isPreviewMode() {
	  return previewActive;
	}

	function remove(selector) {
	  return select(selector).empty().remove();
	}
	function after(content, selector) {
	  return select(selector).after(content);
	}
	function before(content, selector) {
	  return select(selector).before(content);
	}
	function append(content, selector) {
	  return select(selector).append(content);
	}
	function prepend(content, selector) {
	  return select(selector).prepend(content);
	}
	function setHtml(content, selector) {
	  return select(selector).html(content);
	}
	function getHtml(selector) {
	  return select(selector).html();
	}
	function setText(content, selector) {
	  return select(selector).text(content);
	}

	var STYLE_PREFIX = "at-";
	var BODY_STYLE_ID = "at-body-style";
	var BODY_STYLE_ID_SELECTOR = "#" + BODY_STYLE_ID;
	var ALL_VIEWS_STYLE_ID = STYLE_PREFIX + "views";
	function createStyleMarkup(id, content) {
	  return "<" + STYLE_TAG + " " + ID + "=\"" + id + "\" " + CLASS + "=\"" + FLICKER_CONTROL_CLASS + "\">" + content + "</" + STYLE_TAG + ">";
	}
	function createActionStyle(styleDef, selector) {
	  var id = STYLE_PREFIX + hash(selector);
	  var style = selector + " {" + styleDef + "}";
	  return createStyleMarkup(id, style);
	}
	function createAllViewsStyle(styleDef, aggregateSelector) {
	  var style = aggregateSelector + " {" + styleDef + "}";
	  return createStyleMarkup(ALL_VIEWS_STYLE_ID, style);
	}
	function addHidingSnippet(config) {
	  var bodyHidingEnabled = config[BODY_HIDING_ENABLED];
	  if (bodyHidingEnabled !== true) {
	    return;
	  }
	  if (exists$2(BODY_STYLE_ID_SELECTOR)) {
	    return;
	  }
	  var bodyHiddenStyle = config[BODY_HIDDEN_STYLE];
	  append(createStyleMarkup(BODY_STYLE_ID, bodyHiddenStyle), HEAD_TAG);
	}
	function removeHidingSnippet(config) {
	  var bodyHidingEnabled = config[BODY_HIDING_ENABLED];
	  if (bodyHidingEnabled !== true) {
	    return;
	  }
	  if (!exists$2(BODY_STYLE_ID_SELECTOR)) {
	    return;
	  }
	  remove(BODY_STYLE_ID_SELECTOR);
	}
	function addActionHidings(config, selectors) {
	  if (isEmpty(selectors)) {
	    return;
	  }
	  var alreadyHidden = function alreadyHidden(selector) {
	    return !exists$2("#" + (STYLE_PREFIX + hash(selector)));
	  };
	  var selectorsToHide = filter(alreadyHidden, selectors);
	  if (isEmpty(selectorsToHide)) {
	    return;
	  }
	  var styleDef = config[DEFAULT_CONTENT_HIDDEN_STYLE];
	  var buildStyle = function buildStyle(selector) {
	    return createActionStyle(styleDef, selector);
	  };
	  var content = join("\n", map(buildStyle, selectorsToHide));
	  append(content, HEAD_TAG);
	}
	function addAllViewsHidings(config, selectors) {
	  if (isEmpty(selectors) || exists$2("#" + ALL_VIEWS_STYLE_ID)) {
	    return;
	  }
	  var styleDef = config[DEFAULT_CONTENT_HIDDEN_STYLE];
	  var aggregateSelector = join(", ", selectors);
	  var content = createAllViewsStyle(styleDef, aggregateSelector);
	  append(content, HEAD_TAG);
	}

	function injectHidingSnippetStyle() {
	  addHidingSnippet(getConfig());
	}
	function removeHidingSnippetStyle() {
	  removeHidingSnippet(getConfig());
	}
	function injectActionHidingStyles(selectors) {
	  addActionHidings(getConfig(), selectors);
	}
	function injectAllViewsHidingStyle(selectors) {
	  addAllViewsHidings(getConfig(), selectors);
	}
	function removeActionHidingStyle(selector) {
	  var id = STYLE_PREFIX + hash(selector);
	  remove("#" + id);
	}
	function removeAllViewsHidingStyle() {
	  var hidingStyleSelector = "#" + ALL_VIEWS_STYLE_ID;
	  if (exists$2(hidingStyleSelector)) {
	    remove(hidingStyleSelector);
	  }
	}

	var OPTOUT_MESSAGE = "Disabled due to optout";
	var MCAAMB = "MCAAMB";
	var MCAAMLH = "MCAAMLH";
	var MCMID = "MCMID";
	var MCOPTOUT = "MCOPTOUT";
	var SDID_METHOD = "getSupplementalDataID";
	var CIDS_METHOD = "getCustomerIDs";
	var SUPPORTS_NS = true;
	var NAMESPACE_TYPE = "NS";
	var DATASOURCE_TYPE = "DS";
	var TRACK_SERVER_PROP = "trackingServer";
	var TRACK_SERVER_SECURE_PROP = TRACK_SERVER_PROP + "Secure";
	function hasId(value) {
	  return !isNil(value[ID]);
	}
	function hasAuthState(value) {
	  return !isNil(value[AUTH_STATE]);
	}
	function getAuthenticatedState(value) {
	  switch (value) {
	    case 0:
	      return "unknown";
	    case 1:
	      return "authenticated";
	    case 2:
	      return "logged_out";
	    default:
	      return "unknown";
	  }
	}
	function isPrimary(value) {
	  return value[PRIMARY];
	}
	function isCustomerId(value) {
	  return hasId(value) || hasAuthState(value);
	}
	function normalizeCustomerIds(customerIds, customerIdType) {
	  return reduce(function (acc, value, key) {
	    var item = {};
	    item[INTEGRATION_CODE] = key;
	    if (hasId(value)) {
	      item[ID] = value[ID];
	    }
	    if (hasAuthState(value)) {
	      item[AUTHENTICATED_STATE] = getAuthenticatedState(value[AUTH_STATE]);
	    }
	    item[TYPE] = customerIdType;
	    if (isPrimary(value)) {
	      item[PRIMARY] = true;
	    }
	    acc.push(item);
	    return acc;
	  }, [], filter(isCustomerId, customerIds));
	}
	function buildDeliveryCustomerIds(customerIds) {
	  if (!customerIds.nameSpaces && !customerIds.dataSources) {
	    return normalizeCustomerIds(customerIds, DATASOURCE_TYPE);
	  }
	  var normalizedCustomerIds = [];
	  if (customerIds.nameSpaces) {
	    normalizedCustomerIds.push.apply(normalizedCustomerIds, _toConsumableArray(normalizeCustomerIds(customerIds.nameSpaces, NAMESPACE_TYPE)));
	  }
	  if (customerIds.dataSources) {
	    normalizedCustomerIds.push.apply(normalizedCustomerIds, _toConsumableArray(normalizeCustomerIds(customerIds.dataSources, DATASOURCE_TYPE)));
	  }
	  return normalizedCustomerIds;
	}
	function getCustomerIds(visitor) {
	  if (isNil(visitor)) {
	    return [];
	  }
	  if (!isFunction(visitor[CIDS_METHOD])) {
	    return [];
	  }
	  var customerIds = visitor[CIDS_METHOD](SUPPORTS_NS);
	  if (!isObject(customerIds)) {
	    return [];
	  }
	  return buildDeliveryCustomerIds(customerIds);
	}
	function getSdid(visitor, consumerId) {
	  if (isNil(visitor)) {
	    return null;
	  }
	  if (!isFunction(visitor[SDID_METHOD])) {
	    return null;
	  }
	  return visitor[SDID_METHOD](consumerId);
	}
	function getInstanceProperty(visitor, property) {
	  if (isNil(visitor)) {
	    return null;
	  }
	  var result = visitor[property];
	  if (isNil(result)) {
	    return null;
	  }
	  return result;
	}

	var VISITOR = "Visitor";
	var GET_INSTANCE_METHOD = "getInstance";
	var IS_ALLOWED_METHOD = "isAllowed";
	function getInstance(win, imsOrgId, sdidParamExpiry) {
	  if (isBlank(imsOrgId)) {
	    return null;
	  }
	  if (isNil(win[VISITOR])) {
	    return null;
	  }
	  if (!isFunction(win[VISITOR][GET_INSTANCE_METHOD])) {
	    return null;
	  }
	  var visitor = win[VISITOR][GET_INSTANCE_METHOD](imsOrgId, {
	    sdidParamExpiry: sdidParamExpiry
	  });
	  if (isObject(visitor) && isFunction(visitor[IS_ALLOWED_METHOD]) && visitor[IS_ALLOWED_METHOD]()) {
	    return visitor;
	  }
	  return null;
	}

	var TIMEOUT_MESSAGE = "Visitor API requests timed out";
	var ERROR_MESSAGE = "Visitor API requests error";
	function getVisitorValuesAsync(visitor, optoutEnabled) {
	  if (!isFunction(visitor.getVisitorValues)) {
	    return resolve$1({});
	  }
	  var fields = [MCMID, MCAAMB, MCAAMLH];
	  if (optoutEnabled) {
	    fields.push(MCOPTOUT);
	  }
	  return create(function (res) {
	    visitor.getVisitorValues(function (values) {
	      return res(values);
	    }, fields);
	  });
	}
	function handleError(error) {
	  logDebug(ERROR_MESSAGE, error);
	  return {};
	}
	function getAsyncValues(visitor, visitorApiTimeout, optoutEnabled) {
	  if (isNil(visitor)) {
	    return resolve$1({});
	  }
	  var requests = getVisitorValuesAsync(visitor, optoutEnabled);
	  return timeout(requests, visitorApiTimeout, TIMEOUT_MESSAGE)['catch'](handleError);
	}

	function getVisitorValues(visitor, optoutEnabled) {
	  if (!isFunction(visitor.getVisitorValues)) {
	    return {};
	  }
	  var fields = [MCMID, MCAAMB, MCAAMLH];
	  if (optoutEnabled) {
	    fields.push(MCOPTOUT);
	  }
	  var result = {};
	  visitor.getVisitorValues(function (values) {
	    return reactorObjectAssign(result, values);
	  }, fields);
	  return result;
	}
	function getSyncValues(visitor, optoutEnabled) {
	  if (isNil(visitor)) {
	    return {};
	  }
	  return getVisitorValues(visitor, optoutEnabled);
	}

	function getVisitorInstance() {
	  var config = getConfig();
	  var imsOrgId = config[IMS_ORG_ID];
	  var sdidParamExpiry = config[SUPPLEMENTAL_DATA_ID_PARAM_TIMEOUT];
	  return getInstance(window, imsOrgId, sdidParamExpiry);
	}
	function getAsyncVisitorValues() {
	  var visitor = getVisitorInstance();
	  var config = getConfig();
	  var visitorApiTimeout = config[VISITOR_API_TIMEOUT];
	  var optoutEnabled = config[OPTOUT_ENABLED];
	  return getAsyncValues(visitor, visitorApiTimeout, optoutEnabled);
	}
	function getSyncVisitorValues() {
	  var visitor = getVisitorInstance();
	  var config = getConfig();
	  var optoutEnabled = config[OPTOUT_ENABLED];
	  return getSyncValues(visitor, optoutEnabled);
	}
	function getCustomerIdsVisitorValues() {
	  return getCustomerIds(getVisitorInstance());
	}
	function getSdidVisitorValue(consumerId) {
	  return getSdid(getVisitorInstance(), consumerId);
	}
	function getVisitorProperty(property) {
	  return getInstanceProperty(getVisitorInstance(), property);
	}

	var storage = {};
	function setItem(key, value) {
	  storage[key] = value;
	}
	function getItem(key) {
	  return storage[key];
	}

	var LOG_PREFIX = "Data provider";
	var TIMED_OUT = "timed out";
	var MAX_TIMEOUT = 2000;
	function areDataProvidersPresent(win) {
	  var globalSettings = win[GLOBAL_SETTINGS];
	  if (isNil(globalSettings)) {
	    return false;
	  }
	  var dataProviders = globalSettings[DATA_PROVIDERS];
	  if (!isArray(dataProviders) || isEmpty(dataProviders)) {
	    return false;
	  }
	  return true;
	}
	function isValidDataProvider(dataProvider) {
	  var name = dataProvider[NAME];
	  if (!isString(name) || isEmpty(name)) {
	    return false;
	  }
	  var version = dataProvider[VERSION];
	  if (!isString(version) || isEmpty(version)) {
	    return false;
	  }
	  var wait = dataProvider[TIMEOUT];
	  if (!isNil(wait) && !isNumber(wait)) {
	    return false;
	  }
	  var provider = dataProvider[PROVIDER];
	  if (!isFunction(provider)) {
	    return false;
	  }
	  return true;
	}
	function createPromise(provider) {
	  return create(function (success, error) {
	    provider(function (err, params) {
	      if (!isNil(err)) {
	        error(err);
	        return;
	      }
	      success(params);
	    });
	  });
	}
	function createTrace(nameKey, name, versionKey, version, resKey, res) {
	  var dataProviderTrace = {};
	  dataProviderTrace[nameKey] = name;
	  dataProviderTrace[versionKey] = version;
	  dataProviderTrace[resKey] = res;
	  var result = {};
	  result[DATA_PROVIDER] = dataProviderTrace;
	  return result;
	}
	function convertToPromise(dataProvider) {
	  var name = dataProvider[NAME];
	  var version = dataProvider[VERSION];
	  var wait = dataProvider[TIMEOUT] || MAX_TIMEOUT;
	  var provider = dataProvider[PROVIDER];
	  var promise = createPromise(provider);
	  return timeout(promise, wait, TIMED_OUT).then(function (params) {
	    var trace = createTrace(NAME, name, VERSION, version, PARAMS, params);
	    logDebug(LOG_PREFIX, SUCCESS, trace);
	    addClientTrace(trace);
	    return params;
	  })['catch'](function (error) {
	    var trace = createTrace(NAME, name, VERSION, version, ERROR, error);
	    logDebug(LOG_PREFIX, ERROR, trace);
	    addClientTrace(trace);
	    return {};
	  });
	}
	function collectParams(arr) {
	  var result = reduce(function (acc, value) {
	    return reactorObjectAssign(acc, value);
	  }, {}, arr);
	  setItem(DATA_PROVIDERS, result);
	  return result;
	}
	function executeAsyncDataProviders(win) {
	  if (!areDataProvidersPresent(win)) {
	    return resolve$1({});
	  }
	  var dataProviders = win[GLOBAL_SETTINGS][DATA_PROVIDERS];
	  var validProviders = filter(isValidDataProvider, dataProviders);
	  return all(map(convertToPromise, validProviders)).then(collectParams);
	}
	function executeSyncDataProviders() {
	  var result = getItem(DATA_PROVIDERS);
	  if (isNil(result)) {
	    return {};
	  }
	  return result;
	}

	function getAsyncDataProvidersParameters() {
	  return executeAsyncDataProviders(window);
	}
	function getSyncDataProvidersParameters() {
	  return executeSyncDataProviders();
	}

	var TOKEN_PARAM = "authorization";
	var TOKEN_COOKIE = "mboxDebugTools";
	function getTokenFromQueryString(win) {
	  var location = win.location;
	  var search = location.search;
	  var params = parseQueryString(search);
	  var result = params[TOKEN_PARAM];
	  if (isBlank(result)) {
	    return null;
	  }
	  return result;
	}
	function getTokenFromCookie() {
	  var result = getCookie(TOKEN_COOKIE);
	  if (isBlank(result)) {
	    return null;
	  }
	  return result;
	}
	function getTraceToken() {
	  var param = getTokenFromQueryString(window);
	  var cookie = getTokenFromCookie();
	  return param || cookie;
	}

	function isPair(pair) {
	  return !isEmpty(pair) && pair.length === 2 && isNotBlank(pair[0]);
	}
	function createPair$1(param) {
	  var index = param.indexOf("=");
	  if (index === -1) {
	    return [];
	  }
	  return [param.substr(0, index), param.substr(index + 1)];
	}
	function objectToParamsInternal(obj, ks, result, keyFunc) {
	  forEach(function (value, key) {
	    if (isObject(value)) {
	      ks.push(key);
	      objectToParamsInternal(value, ks, result, keyFunc);
	      ks.pop();
	    } else if (isEmpty(ks)) {
	      result[keyFunc(key)] = value;
	    } else {
	      result[keyFunc(join(".", ks.concat(key)))] = value;
	    }
	  }, obj);
	}
	function queryStringToParams(queryString) {
	  return filter(function (value, key) {
	    return isNotBlank(key);
	  }, parseQueryString(queryString));
	}
	function arrayToParams(array) {
	  var pairs = reduce(function (acc, param) {
	    acc.push(createPair$1(param));
	    return acc;
	  }, [], filter(isNotBlank, array));
	  return reduce(function (acc, pair) {
	    acc[decode$1(trim(pair[0]))] = decode$1(trim(pair[1]));
	    return acc;
	  }, {}, filter(isPair, pairs));
	}
	function objectToParams(object, keyFunc) {
	  var result = {};
	  if (isNil(keyFunc)) {
	    objectToParamsInternal(object, [], result, identity);
	  } else {
	    objectToParamsInternal(object, [], result, keyFunc);
	  }
	  return result;
	}
	function functionToParams(func) {
	  if (!isFunction(func)) {
	    return {};
	  }
	  var params = null;
	  try {
	    params = func();
	  } catch (_ignore) {
	    return {};
	  }
	  if (isNil(params)) {
	    return {};
	  }
	  if (isArray(params)) {
	    return arrayToParams(params);
	  }
	  if (isString(params) && isNotBlank(params)) {
	    return queryStringToParams(params);
	  }
	  if (isObject(params)) {
	    return objectToParams(params);
	  }
	  return {};
	}

	function getParamsAll(mboxParams) {
	  return reactorObjectAssign({}, mboxParams, functionToParams(window.targetPageParamsAll));
	}
	function getParams(globalMboxParams) {
	  return reactorObjectAssign({}, globalMboxParams, functionToParams(window.targetPageParams));
	}
	function getTargetPageParams(mbox) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var mboxParams = config[MBOX_PARAMS];
	  var globalMboxParams = config[GLOBAL_MBOX_PARAMS];
	  if (globalMbox !== mbox) {
	    return getParamsAll(mboxParams || {});
	  }
	  return reactorObjectAssign(getParamsAll(mboxParams || {}), getParams(globalMboxParams || {}));
	}

	function getWebGLRendererInternal() {
	  var canvas = document.createElement("canvas");
	  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	  if (isNil(gl)) {
	    return null;
	  }
	  var glInfo = gl.getExtension("WEBGL_debug_renderer_info");
	  if (isNil(glInfo)) {
	    return null;
	  }
	  var result = gl.getParameter(glInfo.UNMASKED_RENDERER_WEBGL);
	  if (isNil(result)) {
	    return null;
	  }
	  return result;
	}
	var WEB_GL_RENDERER_INTERNAL = getWebGLRendererInternal();
	function getPixelRatio() {
	  var ratio = window.devicePixelRatio;
	  if (!isNil(ratio)) {
	    return ratio;
	  }
	  ratio = 1;
	  var screen = window.screen;
	  var systemXDPI = screen.systemXDPI,
	      logicalXDPI = screen.logicalXDPI;
	  if (!isNil(systemXDPI) && !isNil(logicalXDPI) && systemXDPI > logicalXDPI) {
	    ratio = systemXDPI / logicalXDPI;
	  }
	  return ratio;
	}
	function getScreenOrientation() {
	  var screen = window.screen;
	  var orientation = screen.orientation,
	      width = screen.width,
	      height = screen.height;
	  if (isNil(orientation)) {
	    return width > height ? "landscape" : "portrait";
	  }
	  if (isNil(orientation.type)) {
	    return null;
	  }
	  var parts = split("-", orientation.type);
	  if (isEmpty(parts)) {
	    return null;
	  }
	  var result = parts[0];
	  if (!isNil(result)) {
	    return result;
	  }
	  return null;
	}
	function getWebGLRenderer() {
	  return WEB_GL_RENDERER_INTERNAL;
	}

	var PROFILE_PREFIX = "profile.";
	var THIRD_PARTY_ID = "mbox3rdPartyId";
	var PROPERTY_TOKEN = "at_property";
	var ORDER_ID = "orderId";
	var ORDER_TOTAL = "orderTotal";
	var PRODUCT_PURCHASED_ID = "productPurchasedId";
	var PRODUCT_ID = "productId";
	var CATEGORY_ID = "categoryId";
	function isThirdPartyId(param) {
	  return param === THIRD_PARTY_ID;
	}
	function isProfileParam(param) {
	  return param.indexOf(PROFILE_PREFIX) !== -1;
	}
	function isPropertyToken(param) {
	  return param === PROPERTY_TOKEN;
	}
	function isOrderId(param) {
	  return param === ORDER_ID;
	}
	function isOrderTotal(param) {
	  return param === ORDER_TOTAL;
	}
	function isProductPurchasedId(param) {
	  return param === PRODUCT_PURCHASED_ID;
	}
	function isProductId(param) {
	  return param === PRODUCT_ID;
	}
	function isCategoryId(param) {
	  return param === CATEGORY_ID;
	}
	function isSpecialParam(param) {
	  return isProfileParam(param) || isThirdPartyId(param) || isPropertyToken(param) || isOrderId(param) || isOrderTotal(param) || isProductPurchasedId(param) || isProductId(param) || isCategoryId(param);
	}
	function extractProfileParam(param) {
	  return param.substring(PROFILE_PREFIX.length);
	}
	function getThirdPartyId(parameters) {
	  return parameters[THIRD_PARTY_ID];
	}
	function getPropertyToken$1(params) {
	  return params[PROPERTY_TOKEN];
	}
	function getOrderId(params) {
	  return params[ORDER_ID];
	}
	function getOrderTotal(params) {
	  return params[ORDER_TOTAL];
	}
	function getPurchasedProductIds(params) {
	  var value = params[PRODUCT_PURCHASED_ID];
	  var result = map(trim, split(",", value));
	  return filter(isNotBlank, result);
	}
	function getProductId(params) {
	  return params[PRODUCT_ID];
	}
	function getCategoryId(params) {
	  return params[CATEGORY_ID];
	}
	function getParams$1(params) {
	  return reduce(function (acc, value, key) {
	    if (isSpecialParam(key)) {
	      return acc;
	    }
	    acc[key] = isNil(value) ? "" : value;
	    return acc;
	  }, {}, params);
	}
	function getProfileParams(params) {
	  return reduce(function (acc, value, key) {
	    if (!isProfileParam(key)) {
	      return acc;
	    }
	    var profileKey = extractProfileParam(key);
	    if (isBlank(profileKey)) {
	      return acc;
	    }
	    acc[profileKey] = isNil(value) ? "" : value;
	    return acc;
	  }, {}, params);
	}

	var POST = "POST";
	var NETWORK_ERROR = "Network request failed";
	var REQUEST_TIMEOUT = "Request timed out";
	var MALFORMED_RESPONSE = "Malformed response JSON";
	function addOnload(xhr, resolve, reject) {
	  xhr.onload = function () {
	    var status = xhr.status === 1223 ? 204 : xhr.status;
	    if (status < 100 || status > 599) {
	      reject(new Error(NETWORK_ERROR));
	      return;
	    }
	    var response;
	    try {
	      response = JSON.parse(xhr.responseText);
	    } catch (e) {
	      reject(new Error(MALFORMED_RESPONSE));
	      return;
	    }
	    var headers = xhr.getAllResponseHeaders();
	    resolve({
	      status: status,
	      headers: headers,
	      response: response
	    });
	  };
	  return xhr;
	}
	function addOnerror(xhr, reject) {
	  xhr.onerror = function () {
	    reject(new Error(NETWORK_ERROR));
	  };
	  return xhr;
	}
	function addOntimeout(xhr, timeout, reject) {
	  xhr.timeout = timeout;
	  xhr.ontimeout = function () {
	    reject(new Error(REQUEST_TIMEOUT));
	  };
	  return xhr;
	}
	function addHeaders(xhr) {
	  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  forEach(function (values, key) {
	    if (!isArray(values)) {
	      return;
	    }
	    forEach(function (value) {
	      xhr.setRequestHeader(key, value);
	    }, values);
	  }, headers);
	  return xhr;
	}
	function executeXhr(_ref) {
	  var url = _ref.url,
	      headers = _ref.headers,
	      body = _ref.body,
	      timeout = _ref.timeout,
	      async = _ref.async;
	  return create(function (resolve, reject) {
	    var xhr = new window.XMLHttpRequest();
	    xhr = addOnload(xhr, resolve, reject);
	    xhr = addOnerror(xhr, reject);
	    xhr.open(POST, url, async);
	    xhr.withCredentials = true;
	    xhr = addHeaders(xhr, headers);
	    if (async) {
	      xhr = addOntimeout(xhr, timeout, reject);
	    }
	    xhr.send(JSON.stringify(body));
	  }).then(function (xhrResponse) {
	    var response = xhrResponse.response;
	    var status = response.status,
	        message = response.message;
	    if (!isNil(status) && !isNil(message)) {
	      throw new Error(message);
	    }
	    return response;
	  });
	}

	var Messages = {
	  ERROR_MAX_RETRY: function ERROR_MAX_RETRY(numRetries, errString) {
	    return "Unable to retrieve artifact after " + numRetries + " retries: " + errString;
	  },
	  ARTIFACT_NOT_AVAILABLE: "The decisioning artifact is not available",
	  ARTIFACT_VERSION_UNSUPPORTED: function ARTIFACT_VERSION_UNSUPPORTED(artifactVersion, supportedMajorVersion) {
	    return "The decisioning artifact version (" + artifactVersion + ") is not supported. This library is compatible with this major version: " + supportedMajorVersion;
	  },
	  ARTIFACT_FETCH_ERROR: function ARTIFACT_FETCH_ERROR(reason) {
	    return "Failed to retrieve artifact: " + reason;
	  },
	  ARTIFACT_INVALID: "Invalid Artifact",
	  INVALID_ENVIRONMENT: function INVALID_ENVIRONMENT(expectedEnvironment, defaultEnvironment) {
	    return "'" + expectedEnvironment + "' is not a valid target environment, defaulting to '" + defaultEnvironment + "'.";
	  },
	  NOT_APPLICABLE: "Not Applicable",
	  ARTIFACT_OBFUSCATION_ERROR: "Unable to read artifact JSON",
	  UNKNOWN: "unknown"
	};

	var DEFAULT_POLLING_INTERVAL = 300000;
	var MINIMUM_POLLING_INTERVAL = 300000;
	var NUM_FETCH_RETRIES = 10;
	var SUPPORTED_ARTIFACT_MAJOR_VERSION = 1;
	var SUPPORTED_ARTIFACT_OBFUSCATION_VERSION = 1;
	var REGEX_ARTIFACT_FILENAME_BINARY = /.+\.bin$/i;
	var ARTIFACT_FORMAT_BINARY = "bin";
	var ARTIFACT_FORMAT_JSON = "json";
	var ARTIFACT_FORMAT_DEFAULT = ARTIFACT_FORMAT_JSON;
	var ARTIFACT_FORMATS = [ARTIFACT_FORMAT_BINARY, ARTIFACT_FORMAT_JSON];
	var ARTIFACT_FILENAME = {};
	ARTIFACT_FILENAME[ARTIFACT_FORMAT_BINARY] = "rules.bin";
	ARTIFACT_FILENAME[ARTIFACT_FORMAT_JSON] = "rules.json";
	var LOG_PREFIX$1 = "LD";
	var CDN_BASE_PROD = "assets.adobetarget.com";
	var CDN_BASE_STAGE = "assets.staging.adobetarget.com";
	var CDN_BASE_DEV = "assets.staging.adobetarget.com";
	var HTTP_HEADER_FORWARDED_FOR = "x-forwarded-for";
	var HTTP_HEADER_GEO_LATITUDE = "x-geo-latitude";
	var HTTP_HEADER_GEO_LONGITUDE = "x-geo-longitude";
	var HTTP_HEADER_GEO_COUNTRY = "x-geo-country-code";
	var HTTP_HEADER_GEO_REGION = "x-geo-region-code";
	var HTTP_HEADER_GEO_CITY = "x-geo-city";
	var CDN_BASE = {};
	CDN_BASE[ENVIRONMENT_PROD] = CDN_BASE_PROD;
	CDN_BASE[ENVIRONMENT_STAGE] = CDN_BASE_STAGE;
	CDN_BASE[ENVIRONMENT_DEV] = CDN_BASE_DEV;
	var CAMPAIGN_BUCKET_SALT = "0";
	var AUDIENCE_IDS = "audience.ids";
	var ACTIVITY_DECISIONING_METHOD = "activity.decisioningMethod";
	var ACTIVITY_ID = "activity.id";
	var ACTIVITY_NAME = "activity.name";
	var ACTIVITY_TYPE = "activity.type";
	var EXPERIENCE_ID = "experience.id";
	var EXPERIENCE_NAME = "experience.name";
	var LOCATION_ID = "location.id";
	var LOCATION_NAME = "location.name";
	var LOCATION_TYPE = "location.type";
	var OFFER_ID = "offer.id";
	var OFFER_NAME = "offer.name";
	var OPTION_ID = "option.id";
	var OPTION_NAME = "option.name";
	var GEO_CITY = "geo.city";
	var GEO_COUNTRY = "geo.country";
	var GEO_STATE = "geo.state";
	var GEO_LATITUDE = "geo.latitude";
	var GEO_LONGITUDE = "geo.longitude";

	function getRuleKey(rule) {
	  return rule.ruleKey;
	}
	function parseURL(url) {
	  if (!isString(url)) {
	    url = "";
	  }
	  var parsed = parseUri(url) || {};
	  var _parsed$host = parsed.host,
	      host = _parsed$host === void 0 ? "" : _parsed$host,
	      _parsed$path = parsed.path,
	      path = _parsed$path === void 0 ? "" : _parsed$path,
	      _parsed$query = parsed.query,
	      query = _parsed$query === void 0 ? "" : _parsed$query,
	      _parsed$anchor = parsed.anchor,
	      anchor = _parsed$anchor === void 0 ? "" : _parsed$anchor;
	  var result = {
	    url: url,
	    path: path,
	    query: query,
	    fragment: anchor
	  };
	  var domainParts = host.split(".");
	  switch (domainParts.length) {
	    case 1:
	      result.subdomain = "";
	      result.domain = host;
	      result.topLevelDomain = "";
	      break;
	    case 2:
	      result.subdomain = "";
	      result.domain = host;
	      result.topLevelDomain = domainParts[1];
	      break;
	    case 3:
	      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
	      result.domain = host;
	      result.topLevelDomain = domainParts[2];
	      break;
	    case 4:
	      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
	      result.domain = host;
	      result.topLevelDomain = domainParts[2] + "." + domainParts[3];
	      break;
	  }
	  return result;
	}
	function hasRemoteDependency(artifact, request) {
	  if (isUndefined(artifact)) {
	    throw new Error(Messages.ARTIFACT_NOT_AVAILABLE);
	  }
	  var requestedMboxes = Array.from(getMboxNames(request));
	  var requestedViews = Array.from(getViewNames(request));
	  var _artifact$remoteMboxe = artifact.remoteMboxes,
	      remoteMboxes = _artifact$remoteMboxe === void 0 ? [] : _artifact$remoteMboxe,
	      _artifact$localMboxes = artifact.localMboxes,
	      localMboxes = _artifact$localMboxes === void 0 ? [] : _artifact$localMboxes,
	      _artifact$remoteViews = artifact.remoteViews,
	      remoteViews = _artifact$remoteViews === void 0 ? [] : _artifact$remoteViews,
	      _artifact$localViews = artifact.localViews,
	      localViews = _artifact$localViews === void 0 ? [] : _artifact$localViews;
	  var mboxesThatRequireRemote = new Set([].concat(_toConsumableArray(remoteMboxes.filter(function (mboxName) {
	    return includes(mboxName, requestedMboxes);
	  })), _toConsumableArray(requestedMboxes.filter(function (mboxName) {
	    return !includes(mboxName, localMboxes);
	  }))));
	  var viewsThatRequireRemote = hasRequestedViews(request) && requestedViews.length === 0 ? new Set(remoteViews) : new Set([].concat(_toConsumableArray(remoteViews.filter(function (viewName) {
	    return includes(viewName, requestedViews);
	  })), _toConsumableArray(requestedViews.filter(function (viewName) {
	    return !includes(viewName, localViews);
	  }))));
	  return {
	    remoteNeeded: mboxesThatRequireRemote.size > 0 || viewsThatRequireRemote.size > 0,
	    remoteMboxes: Array.from(mboxesThatRequireRemote),
	    remoteViews: Array.from(viewsThatRequireRemote)
	  };
	}
	function matchMajorVersion(semanticVersion, majorVersion) {
	  var _semanticVersion$spli = semanticVersion.split(".").map(function (value) {
	    return parseInt(value, 10);
	  }),
	      _semanticVersion$spli2 = _slicedToArray(_semanticVersion$spli, 3),
	      major = _semanticVersion$spli2[0],
	      minor = _semanticVersion$spli2[1],
	      patch = _semanticVersion$spli2[2];
	  return majorVersion === major;
	}
	function cloneDeep(obj) {
	  if (isDefined(obj)) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	  return undefined;
	}
	function getValidEnvironment(environmentName, logger) {
	  var isValid = includes(environmentName, POSSIBLE_ENVIRONMENTS);
	  if (!isValid) {
	    getLogger(logger).debug(Messages.INVALID_ENVIRONMENT(environmentName, ENVIRONMENT_PROD));
	  }
	  return isValid ? environmentName : ENVIRONMENT_PROD;
	}
	function getTargetEnvironment(config) {
	  var _config$environment = config.environment,
	      environment = _config$environment === void 0 ? ENVIRONMENT_PROD : _config$environment;
	  return getValidEnvironment(environment, config.logger);
	}
	function getCdnEnvironment(config) {
	  var _config$cdnEnvironmen = config.cdnEnvironment,
	      cdnEnvironment = _config$cdnEnvironmen === void 0 ? ENVIRONMENT_PROD : _config$cdnEnvironmen;
	  return getValidEnvironment(cdnEnvironment, config.logger);
	}
	function getCdnBasePath(config) {
	  var cdnBasePath = config.cdnBasePath;
	  if (!isDefined(cdnBasePath)) {
	    var cdnEnvironment = getCdnEnvironment(config);
	    var env = includes(cdnEnvironment, POSSIBLE_ENVIRONMENTS) ? cdnEnvironment : ENVIRONMENT_PROD;
	    cdnBasePath = CDN_BASE[env];
	  }
	  return "https://" + cdnBasePath;
	}
	function getArtifactFileName() {
	  var artifactFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ARTIFACT_FORMAT_DEFAULT;
	  artifactFormat = includes(artifactFormat, ARTIFACT_FORMATS) ? artifactFormat : ARTIFACT_FORMAT_DEFAULT;
	  return ARTIFACT_FILENAME[artifactFormat];
	}
	function getGeoLookupPath(config) {
	  var cdnBasePath = getCdnBasePath(config);
	  return cdnBasePath + "/v" + SUPPORTED_ARTIFACT_MAJOR_VERSION + "/geo";
	}
	function determineArtifactLocation(config) {
	  var addPropertyToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isBrowser();
	  var client = config.client,
	      propertyToken = config.propertyToken,
	      artifactFormat = config.artifactFormat,
	      artifactLocation = config.artifactLocation;
	  if (isString(artifactLocation)) {
	    return artifactLocation;
	  }
	  var targetEnvironment = getTargetEnvironment(config);
	  return [getCdnBasePath(config), client, targetEnvironment, "v" + SUPPORTED_ARTIFACT_MAJOR_VERSION, addPropertyToken ? propertyToken : undefined, getArtifactFileName(artifactFormat)].filter(function (value) {
	    return isDefined(value);
	  }).join("/");
	}
	function determineArtifactFormat(artifactLocation) {
	  return artifactLocation.match(REGEX_ARTIFACT_FILENAME_BINARY) != null ? ARTIFACT_FORMAT_BINARY : ARTIFACT_FORMAT_JSON;
	}
	function firstMatch(key) {
	  var searchObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  for (var i = 0; i < searchObjects.length; i += 1) {
	    var haystack = searchObjects[i];
	    if (isObject(haystack) && isDefined(haystack[key])) {
	      return haystack[key];
	    }
	  }
	  return defaultValue;
	}

	var EMPTY_CONTEXT = {
	  channel: ChannelType.Web
	};
	function getLowerCaseAttributes(obj) {
	  var result = {};
	  Object.keys(obj).forEach(function (key) {
	    result[key + "_lc"] = isString(obj[key]) ? obj[key].toLowerCase() : obj[key];
	  });
	  return result;
	}
	function createBrowserContext(context) {
	  var _context$userAgent = context.userAgent,
	      userAgent = _context$userAgent === void 0 ? "" : _context$userAgent;
	  var browser = browserFromUserAgent(userAgent);
	  var platform = operatingSystemFromUserAgent(userAgent);
	  return {
	    browserType: browser.name.toLowerCase(),
	    platform: platform,
	    locale: "en",
	    browserVersion: browser.version
	  };
	}
	function createUrlContext(url) {
	  if (!url || !isString(url)) {
	    url = "";
	  }
	  var urlAttributes = parseURL(url);
	  return _objectSpread2(_objectSpread2({}, urlAttributes), getLowerCaseAttributes(urlAttributes));
	}
	function createPageContext(address) {
	  return createUrlContext(address ? address.url : "");
	}
	function createReferringContext(address) {
	  return createUrlContext(address ? address.referringUrl : "");
	}
	function createMboxContext(mboxRequest) {
	  if (!mboxRequest) {
	    return {};
	  }
	  var parameters = mboxRequest.parameters || {};
	  return _objectSpread2(_objectSpread2({}, parameters), getLowerCaseAttributes(parameters));
	}
	function createGeoContext() {
	  var geoContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return {
	    country: geoContext.countryCode,
	    region: geoContext.stateCode,
	    city: geoContext.city,
	    latitude: geoContext.latitude,
	    longitude: geoContext.longitude
	  };
	}
	function createTimingContext() {
	  var now = new Date();
	  var twoDigitString = function twoDigitString(value) {
	    return value < 10 ? "0" + value : String(value);
	  };
	  var currentHours = twoDigitString(now.getUTCHours());
	  var currentMinutes = twoDigitString(now.getUTCMinutes());
	  var currentTime = "" + currentHours + currentMinutes;
	  var currentDay = now.getUTCDay();
	  return {
	    current_timestamp: now.getTime(),
	    current_time: currentTime,
	    current_day: currentDay === 0 ? 7 : currentDay
	  };
	}
	function createDecisioningContext(deliveryRequest) {
	  var _deliveryRequest$cont = deliveryRequest.context,
	      context = _deliveryRequest$cont === void 0 ? EMPTY_CONTEXT : _deliveryRequest$cont;
	  return _objectSpread2(_objectSpread2({}, createTimingContext()), {}, {
	    user: createBrowserContext(context),
	    page: createPageContext(context.address),
	    referring: createReferringContext(context.address),
	    geo: createGeoContext(context.geo || {})
	  });
	}

	var LOG_TAG = LOG_PREFIX$1 + ".NotificationProvider";
	function NotificationProvider(request, visitor, logger) {
	  var sendNotificationFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
	  var telemetryEnabled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	  var requestId = request.requestId;
	  var timestamp = now();
	  var prevEventKeys = new Set();
	  var notifications = [];
	  var telemetryEntries = [];
	  function addNotification(mbox) {
	    var traceFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var displayTokens = [];
	    mbox.options.forEach(function (option) {
	      var eventToken = option.eventToken;
	      var eventKey = mbox.name + "-" + eventToken;
	      if (isDefined(eventToken) && !prevEventKeys.has(eventKey)) {
	        displayTokens.push(eventToken);
	        prevEventKeys.add(eventKey);
	      }
	    });
	    if (displayTokens.length === 0) {
	      return;
	    }
	    var notification = {
	      id: uuid(),
	      impressionId: uuid(),
	      timestamp: timestamp,
	      type: MetricType.Display,
	      mbox: {
	        name: mbox.name
	      },
	      tokens: displayTokens
	    };
	    if (isFunction(traceFn)) {
	      traceFn(notification);
	    }
	    notifications.push(notification);
	  }
	  function addTelemetryEntry(entry) {
	    if (!telemetryEnabled) {
	      return;
	    }
	    telemetryEntries.push(_objectSpread2({
	      requestId: requestId,
	      timestamp: timestamp,
	      features: {
	        decisioningMethod: DECISIONING_METHOD.ON_DEVICE
	      }
	    }, entry));
	  }
	  function sendNotifications() {
	    logger.debug(LOG_TAG + ".sendNotifications", notifications, telemetryEntries);
	    if (notifications.length > 0 || telemetryEntries.length > 0) {
	      var id = request.id,
	          context = request.context,
	          experienceCloud = request.experienceCloud;
	      var notification = {
	        request: {
	          id: id,
	          context: context,
	          experienceCloud: experienceCloud
	        },
	        visitor: visitor
	      };
	      if (notifications.length > 0) {
	        notification.request.notifications = notifications;
	      }
	      if (telemetryEntries.length > 0) {
	        notification.request.telemetry = {
	          entries: telemetryEntries
	        };
	      }
	      setTimeout(function () {
	        return sendNotificationFunc.call(null, notification);
	      }, 0);
	      notifications = [];
	      telemetryEntries = [];
	    }
	  }
	  return {
	    addNotification: addNotification,
	    addTelemetryEntry: addTelemetryEntry,
	    sendNotifications: sendNotifications
	  };
	}

	var byOrder = function byOrder(a, b) {
	  return a.order - b.order;
	};
	function TraceProvider(config, targetOptions, artifactTrace) {
	  var clientCode = config.client;
	  var sessionId = targetOptions.sessionId,
	      request = targetOptions.request;
	  var showTraces = isDefined(request.trace);
	  var _ref = isDefined(request.id) && isString(request.id.tntId) ? request.id.tntId.split(".") : [undefined, undefined],
	      _ref2 = _slicedToArray(_ref, 2),
	      tntId = _ref2[0],
	      profileLocation = _ref2[1];
	  var profile = {
	    visitorId: _objectSpread2(_objectSpread2({}, request.id), {}, {
	      tntId: tntId,
	      profileLocation: profileLocation
	    })
	  };
	  function wrap(traceResult) {
	    if (!showTraces) {
	      return undefined;
	    }
	    return {
	      clientCode: clientCode,
	      artifact: artifactTrace,
	      profile: profile,
	      request: _objectSpread2({
	        sessionId: sessionId
	      }, traceResult.request),
	      campaigns: traceResult.campaigns,
	      evaluatedCampaignTargets: traceResult.evaluatedCampaignTargets
	    };
	  }
	  return {
	    wrap: wrap
	  };
	}
	function RequestTracer(traceProvider, artifact) {
	  var request = {};
	  var campaigns = {};
	  var campaignOrder = 0;
	  var evaluatedCampaignTargets = {};
	  var evaluatedCampaignTargetOrder = 0;
	  function traceRequest(mode, requestType, mboxRequest, context) {
	    request = {
	      pageURL: context.page.url,
	      host: context.page.domain
	    };
	    request[requestType] = _objectSpread2(_objectSpread2({}, mboxRequest), {}, {
	      type: mode
	    });
	  }
	  function addCampaign(rule, ruleSatisfied) {
	    var meta = rule.meta;
	    var activityId = meta[ACTIVITY_ID];
	    if (ruleSatisfied && isUndefined(campaigns[activityId])) {
	      campaignOrder += 1;
	      campaigns[activityId] = {
	        id: activityId,
	        order: campaignOrder,
	        campaignType: meta[ACTIVITY_TYPE],
	        branchId: meta[EXPERIENCE_ID],
	        offers: isDefined(meta[OFFER_ID]) ? [meta[OFFER_ID]] : [],
	        environment: artifact.meta.environment
	      };
	    }
	  }
	  function addEvaluatedCampaignTarget(rule, ruleContext, ruleSatisfied) {
	    var meta = rule.meta;
	    var audienceIds = meta[AUDIENCE_IDS];
	    var activityId = meta[ACTIVITY_ID];
	    if (isUndefined(evaluatedCampaignTargets[activityId])) {
	      evaluatedCampaignTargetOrder += 1;
	      evaluatedCampaignTargets[activityId] = {
	        order: evaluatedCampaignTargetOrder,
	        context: ruleContext,
	        campaignId: activityId,
	        campaignType: meta[ACTIVITY_TYPE],
	        matchedSegmentIds: new Set(),
	        unmatchedSegmentIds: new Set(),
	        matchedRuleConditions: [],
	        unmatchedRuleConditions: []
	      };
	    }
	    audienceIds.forEach(function (audienceId) {
	      evaluatedCampaignTargets[activityId][ruleSatisfied ? "matchedSegmentIds" : "unmatchedSegmentIds"].add(audienceId);
	    });
	    evaluatedCampaignTargets[activityId][ruleSatisfied ? "matchedRuleConditions" : "unmatchedRuleConditions"].push(rule.condition);
	  }
	  function traceRuleEvaluated(rule, mboxRequest, requestType, ruleContext, ruleSatisfied) {
	    addCampaign(rule, ruleSatisfied);
	    addEvaluatedCampaignTarget(rule, ruleContext, ruleSatisfied);
	  }
	  function traceNotification(rule) {
	    var meta = rule.meta;
	    var activityId = meta[ACTIVITY_ID];
	    if (!(campaigns[activityId].notifications instanceof Array)) {
	      campaigns[activityId].notifications = [];
	    }
	    return function (notification) {
	      campaigns[activityId].notifications.push(notification);
	    };
	  }
	  function toJSON() {
	    return {
	      campaigns: values(campaigns).sort(byOrder).map(function (campaign) {
	        var result = _objectSpread2({}, campaign);
	        delete result.order;
	        return result;
	      }),
	      evaluatedCampaignTargets: values(evaluatedCampaignTargets).sort(byOrder).map(function (evaluatedCampaignTarget) {
	        var result = _objectSpread2(_objectSpread2({}, evaluatedCampaignTarget), {}, {
	          matchedSegmentIds: _toConsumableArray(evaluatedCampaignTarget.matchedSegmentIds),
	          unmatchedSegmentIds: _toConsumableArray(evaluatedCampaignTarget.unmatchedSegmentIds)
	        });
	        delete result.order;
	        return result;
	      }),
	      request: request
	    };
	  }
	  function getTraceResult() {
	    return traceProvider.wrap(toJSON());
	  }
	  return {
	    toJSON: toJSON,
	    traceRuleEvaluated: traceRuleEvaluated,
	    traceRequest: traceRequest,
	    traceNotification: traceNotification,
	    getTraceResult: getTraceResult
	  };
	}
	function ArtifactTracer(artifactLocation, artifactPayload, pollingInterval, pollingHalted, firstArtifact) {
	  var artifact = firstArtifact;
	  var artifactRetrievalCount = 1;
	  var artifactLastRetrieved = new Date();
	  function provideNewArtifact(value) {
	    artifactLastRetrieved = new Date();
	    artifactRetrievalCount += 1;
	    artifact = value;
	  }
	  var meta = isDefined(artifact) ? artifact.meta : {};
	  function toJSON() {
	    return _objectSpread2({
	      artifactLocation: isObject(artifactPayload) ? Messages.NOT_APPLICABLE : artifactLocation,
	      pollingInterval: pollingInterval,
	      pollingHalted: pollingHalted,
	      artifactVersion: isDefined(artifact) ? artifact.version : Messages.UNKNOWN,
	      artifactRetrievalCount: artifactRetrievalCount,
	      artifactLastRetrieved: artifactLastRetrieved.toISOString()
	    }, meta);
	  }
	  return {
	    provideNewArtifact: provideNewArtifact,
	    toJSON: toJSON
	  };
	}

	var RequestType = {
	  MBOX: "mbox",
	  VIEW: "view",
	  PAGELOAD: "pageLoad"
	};
	var OptionType = {
	  Html: "html",
	  Json: "json",
	  Redirect: "redirect",
	  Dynamic: "dynamic",
	  Actions: "actions"
	};

	var MACRO_PATTERN_REGEX = /\$\{([a-zA-Z0-9_.]*?)\}/gi;
	var MACRO_NAME_REPLACEMENTS = {
	  campaign: "activity",
	  recipe: "experience"
	};
	var MACRO_NAME_REPLACEMENTS_REGEX = new RegExp(Object.keys(MACRO_NAME_REPLACEMENTS).join("|"), "gi");
	var MACRO_NAME_REMOVALS = ["mbox"];
	function noBlankOptions(option) {
	  return !(isUndefined(option.type) && isUndefined(option.content));
	}
	function prepareExecuteResponse(rule, mboxResponse, requestType, requestDetail, tracer) {
	  var _mboxResponse$metrics = mboxResponse.metrics,
	      metrics = _mboxResponse$metrics === void 0 ? [] : _mboxResponse$metrics,
	      _mboxResponse$options = mboxResponse.options,
	      options = _mboxResponse$options === void 0 ? [] : _mboxResponse$options;
	  var result = _objectSpread2(_objectSpread2({}, mboxResponse), {}, {
	    options: options.filter(noBlankOptions).map(function (pristineOption) {
	      var option = _objectSpread2({}, pristineOption);
	      delete option.eventToken;
	      return option;
	    }),
	    metrics: metrics.filter(function (metric) {
	      return metric.type === MetricType.Click;
	    })
	  });
	  if (result.metrics.length === 0) {
	    delete result.metrics;
	  }
	  return result;
	}
	function preparePrefetchResponse(rule, mboxResponse, requestType, requestDetail, tracer) {
	  var _mboxResponse$options2 = mboxResponse.options,
	      options = _mboxResponse$options2 === void 0 ? [] : _mboxResponse$options2;
	  var result = _objectSpread2(_objectSpread2({}, mboxResponse), {}, {
	    options: options.map(function (pristineOption, idx) {
	      var eventToken = pristineOption.eventToken;
	      if (isUndefined(eventToken) && mboxResponse.metrics.length > idx && mboxResponse.metrics[idx].type === MetricType.Display) {
	        eventToken = mboxResponse.metrics[idx].eventToken;
	      }
	      return _objectSpread2(_objectSpread2({}, pristineOption), {}, {
	        eventToken: eventToken
	      });
	    })
	  });
	  if (requestType !== RequestType.VIEW) {
	    delete result.metrics;
	  }
	  return result;
	}
	function addTrace(rule, mboxResponse, requestType, requestDetail, tracer) {
	  return _objectSpread2(_objectSpread2({}, mboxResponse), {}, {
	    trace: tracer.getTraceResult()
	  });
	}
	function cleanUp(rule, mboxResponse, requestType, requestDetail, tracer) {
	  var result = objectWithoutUndefinedValues(mboxResponse);
	  return result;
	}
	function removePageLoadAttributes(rule, mboxResponse, requestType, requestDetail, tracer) {
	  var processed = _objectSpread2({}, mboxResponse);
	  delete processed.index;
	  delete processed.name;
	  delete processed.trace;
	  return processed;
	}
	function createResponseTokensPostProcessor(context) {
	  var responseTokensInArtifact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var responseTokens = {};
	  responseTokens[ACTIVITY_DECISIONING_METHOD] = "on-device";
	  if (includes(GEO_CITY, responseTokensInArtifact) && isDefined(context.geo.city)) {
	    responseTokens[GEO_CITY] = context.geo.city;
	  }
	  if (includes(GEO_COUNTRY, responseTokensInArtifact) && isDefined(context.geo.country)) {
	    responseTokens[GEO_COUNTRY] = context.geo.country;
	  }
	  if (includes(GEO_STATE, responseTokensInArtifact) && isDefined(context.geo.region)) {
	    responseTokens[GEO_STATE] = context.geo.region;
	  }
	  if (includes(GEO_LATITUDE, responseTokensInArtifact) && isDefined(context.geo.latitude)) {
	    responseTokens[GEO_LATITUDE] = context.geo.latitude;
	  }
	  if (includes(GEO_LONGITUDE, responseTokensInArtifact) && isDefined(context.geo.longitude)) {
	    responseTokens[GEO_LONGITUDE] = context.geo.longitude;
	  }
	  return function addResponseTokens(rule, mboxResponse) {
	    var meta = rule.meta || {};
	    var responseTokensFromMeta = [ACTIVITY_ID, ACTIVITY_NAME, ACTIVITY_TYPE, EXPERIENCE_ID, EXPERIENCE_NAME, LOCATION_ID, LOCATION_NAME, LOCATION_TYPE, OFFER_ID, OFFER_NAME, OPTION_ID, OPTION_NAME].reduce(function (accumulator, key) {
	      if (includes(key, responseTokensInArtifact) && isDefined(meta[key])) {
	        accumulator[key] = meta[key];
	      }
	      return accumulator;
	    }, {});
	    var options = mboxResponse.options.map(function (option) {
	      return _objectSpread2(_objectSpread2({}, option), {}, {
	        responseTokens: _objectSpread2(_objectSpread2({}, responseTokensFromMeta), responseTokens)
	      });
	    });
	    return _objectSpread2(_objectSpread2({}, mboxResponse), {}, {
	      options: options
	    });
	  };
	}
	function replaceCampaignMacros(rule, mboxResponse, requestType, requestDetail, tracer) {
	  function addCampainMacroValues(htmlContent) {
	    if (isUndefined(htmlContent) || !isString(htmlContent)) {
	      return htmlContent;
	    }
	    return htmlContent.replace(MACRO_PATTERN_REGEX, function (defaultValue, macroKey) {
	      var parts = macroKey.replace(MACRO_NAME_REPLACEMENTS_REGEX, function (matched) {
	        return MACRO_NAME_REPLACEMENTS[matched];
	      }).split(".");
	      if (parts.length > 2) {
	        parts = parts.slice(parts.length - 2);
	      }
	      var key = parts.filter(function (part) {
	        return !includes(part, MACRO_NAME_REMOVALS);
	      }).join(".");
	      var _requestDetail$parame = requestDetail.parameters,
	          parameters = _requestDetail$parame === void 0 ? {} : _requestDetail$parame;
	      return firstMatch(key, [rule.meta, requestDetail, parameters], defaultValue);
	    });
	  }
	  return _objectSpread2(_objectSpread2({}, mboxResponse), {}, {
	    options: mboxResponse.options.map(
	    function (option) {
	      if (option.type === OptionType.Html) {
	        return _objectSpread2(_objectSpread2({}, option), {}, {
	          content: addCampainMacroValues(option.content)
	        });
	      }
	      if (option.type === OptionType.Actions) {
	        return _objectSpread2(_objectSpread2({}, option), {}, {
	          content: option.content.map(function (action) {
	            return _objectSpread2(_objectSpread2({}, action), {}, {
	              content: addCampainMacroValues(action.content)
	            });
	          })
	        });
	      }
	      return option;
	    })
	  });
	}

	var logic = createCommonjsModule(function (module, exports) {
	  (function (root, factory) {
	    {
	      module.exports = factory();
	    }
	  })(commonjsGlobal, function () {
	    if (!Array.isArray) {
	      Array.isArray = function (arg) {
	        return Object.prototype.toString.call(arg) === "[object Array]";
	      };
	    }
	    function arrayUnique(array) {
	      var a = [];
	      for (var i = 0, l = array.length; i < l; i++) {
	        if (a.indexOf(array[i]) === -1) {
	          a.push(array[i]);
	        }
	      }
	      return a;
	    }
	    var jsonLogic = {};
	    var operations = {
	      "==": function _(a, b) {
	        return a == b;
	      },
	      "===": function _(a, b) {
	        return a === b;
	      },
	      "!=": function _(a, b) {
	        return a != b;
	      },
	      "!==": function _(a, b) {
	        return a !== b;
	      },
	      ">": function _(a, b) {
	        return a > b;
	      },
	      ">=": function _(a, b) {
	        return a >= b;
	      },
	      "<": function _(a, b, c) {
	        return c === undefined ? a < b : a < b && b < c;
	      },
	      "<=": function _(a, b, c) {
	        return c === undefined ? a <= b : a <= b && b <= c;
	      },
	      "!!": function _(a) {
	        return jsonLogic.truthy(a);
	      },
	      "!": function _(a) {
	        return !jsonLogic.truthy(a);
	      },
	      "%": function _(a, b) {
	        return a % b;
	      },
	      "log": function log(a) {
	        console.log(a);
	        return a;
	      },
	      "in": function _in(a, b) {
	        if (!b || typeof b.indexOf === "undefined") return false;
	        return b.indexOf(a) !== -1;
	      },
	      "cat": function cat() {
	        return Array.prototype.join.call(arguments, "");
	      },
	      "substr": function substr(source, start, end) {
	        if (end < 0) {
	          var temp = String(source).substr(start);
	          return temp.substr(0, temp.length + end);
	        }
	        return String(source).substr(start, end);
	      },
	      "+": function _() {
	        return Array.prototype.reduce.call(arguments, function (a, b) {
	          return parseFloat(a, 10) + parseFloat(b, 10);
	        }, 0);
	      },
	      "*": function _() {
	        return Array.prototype.reduce.call(arguments, function (a, b) {
	          return parseFloat(a, 10) * parseFloat(b, 10);
	        });
	      },
	      "-": function _(a, b) {
	        if (b === undefined) {
	          return -a;
	        } else {
	          return a - b;
	        }
	      },
	      "/": function _(a, b) {
	        return a / b;
	      },
	      "min": function min() {
	        return Math.min.apply(this, arguments);
	      },
	      "max": function max() {
	        return Math.max.apply(this, arguments);
	      },
	      "merge": function merge() {
	        return Array.prototype.reduce.call(arguments, function (a, b) {
	          return a.concat(b);
	        }, []);
	      },
	      "var": function _var(a, b) {
	        var not_found = b === undefined ? null : b;
	        var data = this;
	        if (typeof a === "undefined" || a === "" || a === null) {
	          return data;
	        }
	        var sub_props = String(a).split(".");
	        for (var i = 0; i < sub_props.length; i++) {
	          if (data === null || data === undefined) {
	            return not_found;
	          }
	          data = data[sub_props[i]];
	          if (data === undefined) {
	            return not_found;
	          }
	        }
	        return data;
	      },
	      "missing": function missing() {
	        var missing = [];
	        var keys = Array.isArray(arguments[0]) ? arguments[0] : arguments;
	        for (var i = 0; i < keys.length; i++) {
	          var key = keys[i];
	          var value = jsonLogic.apply({
	            "var": key
	          }, this);
	          if (value === null || value === "") {
	            missing.push(key);
	          }
	        }
	        return missing;
	      },
	      "missing_some": function missing_some(need_count, options) {
	        var are_missing = jsonLogic.apply({
	          "missing": options
	        }, this);
	        if (options.length - are_missing.length >= need_count) {
	          return [];
	        } else {
	          return are_missing;
	        }
	      }
	    };
	    jsonLogic.is_logic = function (logic) {
	      return _typeof(logic) === "object" &&
	      logic !== null &&
	      !Array.isArray(logic) &&
	      Object.keys(logic).length === 1
	      ;
	    };
	    jsonLogic.truthy = function (value) {
	      if (Array.isArray(value) && value.length === 0) {
	        return false;
	      }
	      return !!value;
	    };
	    jsonLogic.get_operator = function (logic) {
	      return Object.keys(logic)[0];
	    };
	    jsonLogic.get_values = function (logic) {
	      return logic[jsonLogic.get_operator(logic)];
	    };
	    jsonLogic.apply = function (logic, data) {
	      if (Array.isArray(logic)) {
	        return logic.map(function (l) {
	          return jsonLogic.apply(l, data);
	        });
	      }
	      if (!jsonLogic.is_logic(logic)) {
	        return logic;
	      }
	      var op = jsonLogic.get_operator(logic);
	      var values = logic[op];
	      var i;
	      var current;
	      var scopedLogic, scopedData, filtered, initial;
	      if (!Array.isArray(values)) {
	        values = [values];
	      }
	      if (op === "if" || op == "?:") {
	        for (i = 0; i < values.length - 1; i += 2) {
	          if (jsonLogic.truthy(jsonLogic.apply(values[i], data))) {
	            return jsonLogic.apply(values[i + 1], data);
	          }
	        }
	        if (values.length === i + 1) return jsonLogic.apply(values[i], data);
	        return null;
	      } else if (op === "and") {
	        for (i = 0; i < values.length; i += 1) {
	          current = jsonLogic.apply(values[i], data);
	          if (!jsonLogic.truthy(current)) {
	            return current;
	          }
	        }
	        return current;
	      } else if (op === "or") {
	        for (i = 0; i < values.length; i += 1) {
	          current = jsonLogic.apply(values[i], data);
	          if (jsonLogic.truthy(current)) {
	            return current;
	          }
	        }
	        return current;
	      } else if (op === 'filter') {
	        scopedData = jsonLogic.apply(values[0], data);
	        scopedLogic = values[1];
	        if (!Array.isArray(scopedData)) {
	          return [];
	        }
	        return scopedData.filter(function (datum) {
	          return jsonLogic.truthy(jsonLogic.apply(scopedLogic, datum));
	        });
	      } else if (op === 'map') {
	        scopedData = jsonLogic.apply(values[0], data);
	        scopedLogic = values[1];
	        if (!Array.isArray(scopedData)) {
	          return [];
	        }
	        return scopedData.map(function (datum) {
	          return jsonLogic.apply(scopedLogic, datum);
	        });
	      } else if (op === 'reduce') {
	        scopedData = jsonLogic.apply(values[0], data);
	        scopedLogic = values[1];
	        initial = typeof values[2] !== 'undefined' ? values[2] : null;
	        if (!Array.isArray(scopedData)) {
	          return initial;
	        }
	        return scopedData.reduce(function (accumulator, current) {
	          return jsonLogic.apply(scopedLogic, {
	            'current': current,
	            'accumulator': accumulator
	          });
	        }, initial);
	      } else if (op === "all") {
	        scopedData = jsonLogic.apply(values[0], data);
	        scopedLogic = values[1];
	        if (!scopedData.length) {
	          return false;
	        }
	        for (i = 0; i < scopedData.length; i += 1) {
	          if (!jsonLogic.truthy(jsonLogic.apply(scopedLogic, scopedData[i]))) {
	            return false;
	          }
	        }
	        return true;
	      } else if (op === "none") {
	        filtered = jsonLogic.apply({
	          'filter': values
	        }, data);
	        return filtered.length === 0;
	      } else if (op === "some") {
	        filtered = jsonLogic.apply({
	          'filter': values
	        }, data);
	        return filtered.length > 0;
	      }
	      values = values.map(function (val) {
	        return jsonLogic.apply(val, data);
	      });
	      if (typeof operations[op] === "function") {
	        return operations[op].apply(data, values);
	      } else if (op.indexOf(".") > 0) {
	        var sub_ops = String(op).split(".");
	        var operation = operations;
	        for (i = 0; i < sub_ops.length; i++) {
	          operation = operation[sub_ops[i]];
	          if (operation === undefined) {
	            throw new Error("Unrecognized operation " + op + " (failed at " + sub_ops.slice(0, i + 1).join(".") + ")");
	          }
	        }
	        return operation.apply(data, values);
	      }
	      throw new Error("Unrecognized operation " + op);
	    };
	    jsonLogic.uses_data = function (logic) {
	      var collection = [];
	      if (jsonLogic.is_logic(logic)) {
	        var op = jsonLogic.get_operator(logic);
	        var values = logic[op];
	        if (!Array.isArray(values)) {
	          values = [values];
	        }
	        if (op === "var") {
	          collection.push(values[0]);
	        } else {
	          values.map(function (val) {
	            collection.push.apply(collection, jsonLogic.uses_data(val));
	          });
	        }
	      }
	      return arrayUnique(collection);
	    };
	    jsonLogic.add_operation = function (name, code) {
	      operations[name] = code;
	    };
	    jsonLogic.rm_operation = function (name) {
	      delete operations[name];
	    };
	    jsonLogic.rule_like = function (rule, pattern) {
	      if (pattern === rule) {
	        return true;
	      }
	      if (pattern === "@") {
	        return true;
	      }
	      if (pattern === "number") {
	        return typeof rule === "number";
	      }
	      if (pattern === "string") {
	        return typeof rule === "string";
	      }
	      if (pattern === "array") {
	        return Array.isArray(rule) && !jsonLogic.is_logic(rule);
	      }
	      if (jsonLogic.is_logic(pattern)) {
	        if (jsonLogic.is_logic(rule)) {
	          var pattern_op = jsonLogic.get_operator(pattern);
	          var rule_op = jsonLogic.get_operator(rule);
	          if (pattern_op === "@" || pattern_op === rule_op) {
	            return jsonLogic.rule_like(jsonLogic.get_values(rule, false), jsonLogic.get_values(pattern, false));
	          }
	        }
	        return false;
	      }
	      if (Array.isArray(pattern)) {
	        if (Array.isArray(rule)) {
	          if (pattern.length !== rule.length) {
	            return false;
	          }
	          for (var i = 0; i < pattern.length; i += 1) {
	            if (!jsonLogic.rule_like(rule[i], pattern[i])) {
	              return false;
	            }
	          }
	          return true;
	        } else {
	          return false;
	        }
	      }
	      return false;
	    };
	    return jsonLogic;
	  });
	});

	var TOTAL_BUCKETS = 10000;
	var MAX_PERCENTAGE = 100;
	function validTntId() {
	  var tntId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	  if (isString(tntId) && !isEmpty(tntId)) {
	    var _tntId$split = tntId.split("."),
	        _tntId$split2 = _slicedToArray(_tntId$split, 2),
	        id = _tntId$split2[0],
	        locationHint = _tntId$split2[1];
	    return id;
	  }
	  return undefined;
	}
	function getOrCreateVisitorId(visitorId) {
	  if (visitorId) {
	    return visitorId.marketingCloudVisitorId || validTntId(visitorId.tntId) || visitorId.thirdPartyId || uuid()
	    ;
	  }
	  return uuid();
	}
	function calculateAllocation(deviceId) {
	  var signedNumericHashValue = hashUnencodedChars(deviceId);
	  var hashFixedBucket = Math.abs(signedNumericHashValue) % TOTAL_BUCKETS;
	  var allocationValue = hashFixedBucket / TOTAL_BUCKETS * MAX_PERCENTAGE;
	  return Math.round(allocationValue * 100) / 100;
	}
	var calculateAllocationMemoized = memoize(calculateAllocation);
	function computeAllocation(clientId, activityId, visitorId) {
	  var salt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : CAMPAIGN_BUCKET_SALT;
	  var deviceId = [clientId, activityId, isString(visitorId) && !isEmpty(visitorId) ? visitorId : getOrCreateVisitorId(visitorId), salt].join(".");
	  return calculateAllocationMemoized(deviceId);
	}

	function ruleEvaluator(clientId, visitorId) {
	  var visitorIdString = getOrCreateVisitorId(visitorId);
	  return function processRule(rule, context, requestType, requestDetail, postProcessors, tracer) {
	    var consequence;
	    var page = context.page,
	        referring = context.referring;
	    if (isDefined(requestDetail.address)) {
	      page = createPageContext(requestDetail.address) || page;
	      referring = createPageContext(requestDetail.address) || referring;
	    }
	    var ruleContext = _objectSpread2(_objectSpread2({}, context), {}, {
	      page: page,
	      referring: referring,
	      mbox: createMboxContext(requestDetail),
	      allocation: computeAllocation(clientId, rule.meta[ACTIVITY_ID], visitorIdString)
	    });
	    var ruleSatisfied = logic.apply(rule.condition, ruleContext);
	    tracer.traceRuleEvaluated(rule, requestDetail, requestType, ruleContext, ruleSatisfied);
	    if (ruleSatisfied) {
	      consequence = _objectSpread2(_objectSpread2({}, rule.consequence), {}, {
	        index: requestDetail.index
	      });
	      postProcessors.forEach(function (postProcessFunc) {
	        consequence = postProcessFunc(rule, consequence, requestType, requestDetail, tracer);
	      });
	    }
	    return cloneDeep(consequence);
	  };
	}

	function byPropertyToken(propertyToken) {
	  function filter(rule) {
	    var _rule$propertyTokens = rule.propertyTokens,
	        propertyTokens = _rule$propertyTokens === void 0 ? [] : _rule$propertyTokens;
	    return isUndefined(propertyToken) ? propertyTokens.length === 0 : propertyTokens.length === 0 || includes(propertyToken, propertyTokens);
	  }
	  return filter;
	}

	var TIMING_GET_OFFER = "get_offer";
	var TIMING_ARTIFACT_DOWNLOADED_TOTAL = "artifactDownloaded_total";
	var TIMING_ARTIFACT_DOWNLOADED_FETCH = "artifactDownloaded_fetch";
	var TIMING_ARTIFACT_GET_INITIAL = "artifactGetInitial";
	var TIMING_ARTIFACT_READ_JSON = "artifactDownloaded_read_JSON";
	var TIMING_ARTIFACT_DEOBFUSCATE = "deobfuscate_total";

	var LOG_TAG$1 = LOG_PREFIX$1 + ".DecisionProvider";
	var PARTIAL_CONTENT = 206;
	var OK = 200;
	function DecisionProvider(config, targetOptions, context, artifact, logger, traceProvider) {
	  var timingTool = createPerfToolInstance();
	  timingTool.timeStart(TIMING_GET_OFFER);
	  var responseTokens = artifact.responseTokens,
	      rules = artifact.rules;
	  var globalMboxName = artifact.globalMbox || DEFAULT_GLOBAL_MBOX;
	  var clientId = config.client;
	  var request = targetOptions.request,
	      visitor = targetOptions.visitor;
	  var propertyToken = getPropertyToken(request.property);
	  var sendNotificationFunc = config.sendNotificationFunc,
	      _config$telemetryEnab = config.telemetryEnabled,
	      telemetryEnabled = _config$telemetryEnab === void 0 ? true : _config$telemetryEnab;
	  var visitorId = request.id;
	  var processRule = ruleEvaluator(clientId, visitorId);
	  var dependency = hasRemoteDependency(artifact, request);
	  var notificationProvider = NotificationProvider(request, visitor, logger, sendNotificationFunc, telemetryEnabled);
	  function getDecisions(mode, postProcessors) {
	    if (isUndefined(request[mode])) {
	      return undefined;
	    }
	    var requestTracer = RequestTracer(traceProvider, artifact);
	    function processViewRequest(requestDetails) {
	      var additionalPostProcessors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      requestTracer.traceRequest(mode, RequestType.VIEW, requestDetails, context);
	      var consequences = {};
	      var viewRules = [];
	      if (Object.prototype.hasOwnProperty.call(requestDetails, "name") && isDefined(requestDetails.name)) {
	        viewRules = rules.views[requestDetails.name] || [];
	      } else {
	        viewRules = Object.keys(rules.views).reduce(function (result, key) {
	          return [].concat(_toConsumableArray(result), _toConsumableArray(rules.views[key]));
	        }, []);
	      }
	      viewRules = viewRules.filter(byPropertyToken(propertyToken));
	      var matchedRuleKeys = new Set();
	      var _iterator = _createForOfIteratorHelper(viewRules),
	          _step;
	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var rule = _step.value;
	          var ruleKey = getRuleKey(rule);
	          var consequence = void 0;
	          if (!matchedRuleKeys.has(ruleKey)) {
	            consequence = processRule(rule, context, RequestType.VIEW, requestDetails, [].concat(_toConsumableArray(postProcessors), _toConsumableArray(additionalPostProcessors)), requestTracer);
	          }
	          if (consequence) {
	            matchedRuleKeys.add(ruleKey);
	            if (!consequences[consequence.name]) {
	              consequences[consequence.name] = consequence;
	            } else {
	              consequences[consequence.name] = _objectSpread2(_objectSpread2({}, consequences[consequence.name]), {}, {
	                options: [].concat(_toConsumableArray(consequences[consequence.name].options), _toConsumableArray(consequence.options)),
	                metrics: [].concat(_toConsumableArray(consequences[consequence.name].metrics), _toConsumableArray(consequence.metrics))
	              });
	            }
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	      return values(consequences);
	    }
	    function processMboxRequest(mboxRequest) {
	      var additionalPostProcessors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var isGlobalMbox = mboxRequest.name === globalMboxName;
	      requestTracer.traceRequest(mode, RequestType.MBOX, mboxRequest, context);
	      var consequences = [];
	      var mboxRules = (rules.mboxes[mboxRequest.name] || []).filter(byPropertyToken(propertyToken));
	      var matchedRuleKeys = new Set();
	      var _iterator2 = _createForOfIteratorHelper(mboxRules),
	          _step2;
	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var rule = _step2.value;
	          var ruleKey = getRuleKey(rule);
	          var consequence = void 0;
	          if (!isGlobalMbox || isGlobalMbox && !matchedRuleKeys.has(ruleKey)) {
	            consequence = processRule(rule, context, RequestType.MBOX, mboxRequest, [].concat(_toConsumableArray(postProcessors), _toConsumableArray(additionalPostProcessors)), requestTracer);
	          }
	          if (consequence) {
	            consequences.push(consequence);
	            matchedRuleKeys.add(ruleKey);
	            if (!isGlobalMbox) {
	              break;
	            }
	          }
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }
	      if (!isGlobalMbox && consequences.length === 0) {
	        consequences.push({
	          name: mboxRequest.name,
	          index: mboxRequest.index,
	          trace: requestTracer.getTraceResult()
	        });
	      }
	      return consequences;
	    }
	    function processPageLoadRequest(requestDetails) {
	      var trace;
	      var consequences = processMboxRequest(_objectSpread2(_objectSpread2({}, requestDetails), {}, {
	        name: globalMboxName
	      }), [function preserveTrace(rule, mboxResponse) {
	        trace = mboxResponse.trace;
	        return mboxResponse;
	      }, removePageLoadAttributes]);
	      var options = flatten(consequences.map(function (consequence) {
	        return consequence.options;
	      }));
	      var result = {
	        options: options,
	        trace: trace
	      };
	      var indexedMetrics = consequences.reduce(function (indexed, consequence) {
	        if (consequence.metrics instanceof Array) {
	          consequence.metrics.forEach(function (metric) {
	            indexed[metric.eventToken] = metric;
	          });
	        }
	        return indexed;
	      }, {});
	      var metrics = values(indexedMetrics);
	      if (metrics.length > 0) {
	        result.metrics = metrics;
	      }
	      return result;
	    }
	    var response = {};
	    if (request[mode].mboxes) {
	      response.mboxes = flatten(request[mode].mboxes.map(function (mboxRequest) {
	        return processMboxRequest(mboxRequest);
	      }));
	    }
	    if (request[mode].views) {
	      response.views = flatten(request[mode].views.map(function (requestDetails) {
	        return processViewRequest(requestDetails);
	      }));
	    }
	    if (request[mode].pageLoad) {
	      response.pageLoad = processPageLoadRequest(request[mode].pageLoad);
	    }
	    return response;
	  }
	  function getExecuteDecisions(postProcessors) {
	    return getDecisions("execute", [function prepareNotification(rule, mboxResponse, requestType, requestDetail, tracer) {
	      notificationProvider.addNotification(mboxResponse, tracer.traceNotification(rule));
	      return mboxResponse;
	    }, prepareExecuteResponse].concat(_toConsumableArray(postProcessors)));
	  }
	  function getPrefetchDecisions(postProcessors) {
	    return getDecisions("prefetch", [preparePrefetchResponse].concat(_toConsumableArray(postProcessors)));
	  }
	  var addResponseTokens = createResponseTokensPostProcessor(context, responseTokens);
	  var commonPostProcessor = [addResponseTokens, replaceCampaignMacros, addTrace, cleanUp];
	  var response = objectWithoutUndefinedValues({
	    status: dependency.remoteNeeded ? PARTIAL_CONTENT : OK,
	    remoteMboxes: dependency.remoteMboxes,
	    remoteViews: dependency.remoteViews,
	    requestId: request.requestId,
	    id: _objectSpread2({}, request.id),
	    client: clientId,
	    edgeHost: undefined,
	    execute: getExecuteDecisions(commonPostProcessor),
	    prefetch: getPrefetchDecisions(commonPostProcessor)
	  });
	  notificationProvider.addTelemetryEntry({
	    execution: timingTool.timeEnd(TIMING_GET_OFFER)
	  });
	  notificationProvider.sendNotifications();
	  logger.debug("" + LOG_TAG$1, request, response);
	  return Promise.resolve(response);
	}

	var GEO_MAPPINGS = [{
	  headerName: HTTP_HEADER_FORWARDED_FOR,
	  parseValue: function parseValue(value) {
	    return value;
	  },
	  valueKey: "ipAddress"
	}, {
	  headerName: HTTP_HEADER_GEO_LATITUDE,
	  parseValue: function parseValue(value) {
	    return parseFloat(value);
	  },
	  valueKey: "latitude"
	}, {
	  headerName: HTTP_HEADER_GEO_LONGITUDE,
	  parseValue: function parseValue(value) {
	    return parseFloat(value);
	  },
	  valueKey: "longitude"
	}, {
	  headerName: HTTP_HEADER_GEO_COUNTRY,
	  parseValue: function parseValue(value) {
	    return value;
	  },
	  valueKey: "countryCode"
	}, {
	  headerName: HTTP_HEADER_GEO_REGION,
	  parseValue: function parseValue(value) {
	    return value;
	  },
	  valueKey: "stateCode"
	}, {
	  headerName: HTTP_HEADER_GEO_CITY,
	  parseValue: function parseValue(value) {
	    return value;
	  },
	  valueKey: "city"
	}];
	function mapGeoValues(valueFn) {
	  var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return GEO_MAPPINGS.reduce(function (result, mapping) {
	    var value = valueFn.call(null, mapping.headerName);
	    if (value != null && isDefined(value)) {
	      result[mapping.valueKey] = mapping.parseValue(value);
	    }
	    return result;
	  }, initial);
	}
	function createGeoObjectFromHeaders(geoHeaders) {
	  return mapGeoValues(function (key) {
	    return geoHeaders.get(key);
	  });
	}
	function createGeoObjectFromPayload() {
	  var geoPayload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return mapGeoValues(function (key) {
	    return geoPayload[key];
	  });
	}
	function GeoProvider(config, artifact) {
	  var fetchApi = getFetchApi(config.fetchApi);
	  var _artifact$geoTargetin = artifact.geoTargetingEnabled,
	      geoTargetingEnabled = _artifact$geoTargetin === void 0 ? false : _artifact$geoTargetin;
	  var _config$eventEmitter = config.eventEmitter,
	      eventEmitter = _config$eventEmitter === void 0 ? noop : _config$eventEmitter;
	  function validGeoRequestContext() {
	    var geoRequestContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var validatedGeoRequestContext = _objectSpread2({}, geoRequestContext);
	    if (geoRequestContext.ipAddress === UNKNOWN_IP_ADDRESS || !isValidIpAddress(geoRequestContext.ipAddress)) {
	      delete validatedGeoRequestContext.ipAddress;
	    }
	    var geoLookupPath = getGeoLookupPath(config);
	    if (geoTargetingEnabled && (geoRequestContext.ipAddress === UNKNOWN_IP_ADDRESS || isValidIpAddress(geoRequestContext.ipAddress)) && isUndefined(geoRequestContext.latitude) && isUndefined(geoRequestContext.longitude) && isUndefined(geoRequestContext.countryCode) && isUndefined(geoRequestContext.stateCode) && isUndefined(geoRequestContext.city)) {
	      var headers = {};
	      if (geoRequestContext.ipAddress !== UNKNOWN_IP_ADDRESS) {
	        headers[HTTP_HEADER_FORWARDED_FOR] = geoRequestContext.ipAddress;
	      }
	      return fetchApi(geoLookupPath, {
	        headers: headers
	      }).then(function (geoResponse) {
	        return geoResponse.json().then(function (geoPayload) {
	          return createGeoObjectFromPayload(geoPayload);
	        });
	      }).then(function (fetchedGeoValues) {
	        reactorObjectAssign(validatedGeoRequestContext, fetchedGeoValues);
	        eventEmitter(GEO_LOCATION_UPDATED, {
	          geoContext: validatedGeoRequestContext
	        });
	        return validatedGeoRequestContext;
	      });
	    }
	    return Promise.resolve(validatedGeoRequestContext);
	  }
	  return validGeoRequestContext;
	}

	var HEADER_BOUNDARY = 40;
	function ObfuscationProvider(config) {
	  var organizationId = config.organizationId;
	  var decoder = new TextDecoder("utf-8");
	  function getHeader(buffer) {
	    var dataView = new DataView(buffer);
	    var text = decoder.decode(dataView);
	    var _text$slice$split = text.slice(0, 8).split(":"),
	        _text$slice$split2 = _slicedToArray(_text$slice$split, 2),
	        prefix = _text$slice$split2[0],
	        version = _text$slice$split2[1];
	    var key = text.slice(8, 41);
	    return {
	      prefix: prefix,
	      version: parseInt(version, 10),
	      key: key
	    };
	  }
	  function getArtifact(key, obfuscatedArtifactBuffer) {
	    var deobfuscatedArtifactJSON = {};
	    var keyBuffer = new TextEncoder().encode([organizationId, key].join(""));
	    var keyView = new DataView(keyBuffer.buffer);
	    var keyLength = keyView.byteLength;
	    var obfuscatedArtifactView = new DataView(obfuscatedArtifactBuffer);
	    var artifactLength = obfuscatedArtifactView.byteLength;
	    var deobfuscatedArtifactView = new DataView(new ArrayBuffer(artifactLength));
	    for (var i = 0; i < artifactLength; i += 1) {
	      deobfuscatedArtifactView.setInt8(i, obfuscatedArtifactView.getInt8(i) ^ keyView.getInt8(i % keyLength));
	    }
	    var deobfuscatedArtifactString = decoder.decode(deobfuscatedArtifactView);
	    try {
	      deobfuscatedArtifactJSON = JSON.parse(deobfuscatedArtifactString);
	    } catch (err) {
	      throw new Error(Messages.ARTIFACT_OBFUSCATION_ERROR);
	    }
	    return deobfuscatedArtifactJSON;
	  }
	  function deobfuscate(buffer) {
	    var header = getHeader(buffer.slice(0, HEADER_BOUNDARY));
	    if (header.version !== SUPPORTED_ARTIFACT_OBFUSCATION_VERSION) {
	      throw new Error(Messages.ARTIFACT_INVALID);
	    }
	    return getArtifact(header.key, buffer.slice(HEADER_BOUNDARY));
	  }
	  return {
	    deobfuscate: deobfuscate
	  };
	}

	var LOG_TAG$2 = LOG_PREFIX$1 + ".ArtifactProvider";
	var NOT_MODIFIED$1 = 304;
	var OK$1 = 200;
	function ArtifactProvider(config) {
	  var logger = getLogger(config.logger);
	  var _config$eventEmitter = config.eventEmitter,
	      eventEmitter = _config$eventEmitter === void 0 ? noop : _config$eventEmitter;
	  var obfuscationProvider = ObfuscationProvider(config);
	  function getPollingInterval() {
	    if (
	    isNumber(config.pollingInterval) && config.pollingInterval === 0) {
	      return 0;
	    }
	    return Math.max(MINIMUM_POLLING_INTERVAL, isNumber(config.pollingInterval) ? config.pollingInterval : DEFAULT_POLLING_INTERVAL);
	  }
	  var pollingInterval = getPollingInterval();
	  var fetchApi = getFetchApi(config.fetchApi);
	  var pollingHalted = false;
	  var pollingTimer;
	  var artifact;
	  var subscriptions = {};
	  var subscriptionCount = 0;
	  var lastResponseEtag;
	  var lastResponseData;
	  var artifactLocation = determineArtifactLocation(config);
	  var artifactFormat = isString(config.artifactFormat) ? config.artifactFormat : determineArtifactFormat(artifactLocation);
	  var fetchWithRetry = getFetchWithRetry(fetchApi, NUM_FETCH_RETRIES, function (errorMessage) {
	    return Messages.ERROR_MAX_RETRY(NUM_FETCH_RETRIES, errorMessage);
	  }, function (error) {
	    return eventEmitter(ARTIFACT_DOWNLOAD_FAILED, {
	      artifactLocation: artifactLocation,
	      error: error
	    });
	  });
	  function emitNewArtifact(artifactPayload) {
	    var geoContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    eventEmitter(ARTIFACT_DOWNLOAD_SUCCEEDED, {
	      artifactLocation: artifactLocation,
	      artifactPayload: artifactPayload
	    });
	    eventEmitter(GEO_LOCATION_UPDATED, {
	      geoContext: geoContext
	    });
	    values(subscriptions).forEach(function (subscriptionFunc) {
	      return subscriptionFunc(artifactPayload);
	    });
	  }
	  function deobfuscate(res) {
	    if (artifactFormat === ARTIFACT_FORMAT_BINARY) {
	      perfTool.timeStart(TIMING_ARTIFACT_DEOBFUSCATE);
	      return res.arrayBuffer().then(function (buffer) {
	        return obfuscationProvider.deobfuscate(buffer).then(function (deobfuscated) {
	          perfTool.timeEnd(TIMING_ARTIFACT_DEOBFUSCATE);
	          return deobfuscated;
	        });
	      });
	    }
	    perfTool.timeStart(TIMING_ARTIFACT_READ_JSON);
	    return res.json().then(function (data) {
	      perfTool.timeEnd(TIMING_ARTIFACT_READ_JSON);
	      return data;
	    });
	  }
	  function fetchArtifact(artifactUrl) {
	    perfTool.timeStart(TIMING_ARTIFACT_DOWNLOADED_TOTAL);
	    var headers = {};
	    logger.debug(LOG_TAG$2 + " fetching artifact - " + artifactUrl);
	    if (lastResponseEtag && !isBrowser() && isNodeJS()) {
	      headers["If-None-Match"] = lastResponseEtag;
	    }
	    perfTool.timeStart(TIMING_ARTIFACT_DOWNLOADED_FETCH);
	    return fetchWithRetry(artifactUrl, {
	      headers: headers,
	      cache: "default"
	    }).then(function (res) {
	      perfTool.timeEnd(TIMING_ARTIFACT_DOWNLOADED_FETCH);
	      logger.debug(LOG_TAG$2 + " artifact received - status=" + res.status);
	      if (res.status === NOT_MODIFIED$1 && lastResponseData) {
	        return lastResponseData;
	      }
	      if (res.ok && res.status === OK$1) {
	        return deobfuscate(res).then(function (responseData) {
	          var etag = res.headers.get("Etag");
	          if (etag != null && isDefined(etag)) {
	            lastResponseData = responseData;
	            lastResponseEtag = etag;
	          }
	          emitNewArtifact(responseData, createGeoObjectFromHeaders(res.headers));
	          perfTool.timeEnd(TIMING_ARTIFACT_DOWNLOADED_TOTAL);
	          return responseData;
	        });
	      }
	      return undefined;
	    })['catch'](function (err) {
	      var reason = err.message || err.toString();
	      logger.error(Messages.ARTIFACT_FETCH_ERROR(reason));
	    });
	  }
	  function addSubscription(callbackFunc) {
	    subscriptionCount += 1;
	    subscriptions[subscriptionCount] = callbackFunc;
	    return subscriptionCount;
	  }
	  function removeSubscription(id) {
	    delete subscriptions[id];
	  }
	  function scheduleNextUpdate() {
	    if (pollingInterval === 0 || pollingHalted) {
	      return;
	    }
	    pollingTimer = setTimeout(function () {
	      fetchArtifact(artifactLocation).then(function (newArtifact) {
	        artifact = newArtifact;
	        return newArtifact;
	      });
	      scheduleNextUpdate();
	    }, pollingInterval);
	  }
	  function stopAllPolling() {
	    if (isDefined(pollingTimer)) {
	      clearTimeout(pollingTimer);
	      pollingTimer = undefined;
	    }
	    pollingHalted = true;
	  }
	  function _resumePolling() {
	    pollingHalted = false;
	    scheduleNextUpdate();
	  }
	  function _getArtifact() {
	    return artifact;
	  }
	  function getInitialArtifact() {
	    perfTool.timeStart(TIMING_ARTIFACT_GET_INITIAL);
	    return isObject(config.artifactPayload) ? Promise.resolve(config.artifactPayload) : fetchArtifact(artifactLocation);
	  }
	  return getInitialArtifact().then(function (newArtifact) {
	    perfTool.timeEnd(TIMING_ARTIFACT_GET_INITIAL);
	    artifact = newArtifact;
	    var artifactTracer = ArtifactTracer(artifactLocation, config.artifactPayload, pollingInterval, pollingHalted, artifact);
	    addSubscription(function (value) {
	      return artifactTracer.provideNewArtifact(value);
	    });
	    return {
	      getArtifact: function getArtifact() {
	        return _getArtifact();
	      },
	      subscribe: function subscribe(callbackFunc) {
	        return addSubscription(callbackFunc);
	      },
	      unsubscribe: function unsubscribe(id) {
	        return removeSubscription(id);
	      },
	      stopPolling: function stopPolling() {
	        return stopAllPolling();
	      },
	      resumePolling: function resumePolling() {
	        return _resumePolling();
	      },
	      getTrace: function getTrace() {
	        return artifactTracer.toJSON();
	      }
	    };
	  }).finally(function () {
	    scheduleNextUpdate();
	  });
	}

	function getCustomerId(visitorId) {
	  if (!visitorId.customerIds || !(visitorId.customerIds instanceof Array)) {
	    return undefined;
	  }
	  var customerIds = visitorId.customerIds.filter(function (customerId) {
	    return customerId.authenticatedState === AuthenticatedState.Authenticated;
	  });
	  if (customerIds.length > 0) {
	    return customerIds[0].id;
	  }
	  return undefined;
	}
	function validVisitorId(visitorId, targetLocationHint) {
	  var result = _objectSpread2({}, visitorId);
	  if (!result.tntId && !result.marketingCloudVisitorId && !getCustomerId(result) && !result.thirdPartyId) {
	    var locationHint = isString(targetLocationHint) && !isBlank(targetLocationHint) ? "." + targetLocationHint + "_0" : "";
	    result.tntId = "" + uuid() + locationHint;
	  }
	  return result;
	}
	function validDeliveryRequest(request, targetLocationHint, validGeoRequestContext) {
	  var _request$context = request.context,
	      context = _request$context === void 0 ? {} : _request$context;
	  return validGeoRequestContext(context.geo || {}).then(function (geo) {
	    return _objectSpread2(_objectSpread2({}, request), {}, {
	      context: _objectSpread2(_objectSpread2({}, context), {}, {
	        geo: geo
	      }),
	      id: validVisitorId(request.id, targetLocationHint),
	      requestId: request.requestId || uuid()
	    });
	  });
	}

	function TargetDecisioningEngine(config) {
	  var logger = getLogger(config.logger);
	  var artifactProvider;
	  var artifact;
	  function _getOffers(targetOptions) {
	    var request = targetOptions.request;
	    if (isUndefined(artifact)) {
	      return Promise.reject(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
	    }
	    if (!matchMajorVersion(artifact.version, SUPPORTED_ARTIFACT_MAJOR_VERSION)) {
	      return Promise.reject(new Error(Messages.ARTIFACT_VERSION_UNSUPPORTED(artifact.version, SUPPORTED_ARTIFACT_MAJOR_VERSION)));
	    }
	    return validDeliveryRequest(request, targetOptions.targetLocationHint, GeoProvider(config, artifact)).then(function (validRequest) {
	      request = validRequest;
	      var options = _objectSpread2(_objectSpread2({}, targetOptions), {}, {
	        request: request
	      });
	      var traceProvider = TraceProvider(config, options, artifactProvider.getTrace());
	      return DecisionProvider(config, options, createDecisioningContext(request), artifact, logger, traceProvider);
	    });
	  }
	  function isReady() {
	    return isDefined(artifact);
	  }
	  return ArtifactProvider(_objectSpread2(_objectSpread2({}, config), {}, {
	    logger: logger
	  })).then(function (providerInstance) {
	    artifactProvider = providerInstance;
	    artifact = artifactProvider.getArtifact();
	    if (isUndefined(artifact)) {
	      throw new Error(Messages.ARTIFACT_NOT_AVAILABLE);
	    }
	    artifactProvider.subscribe(function (data) {
	      artifact = data;
	    });
	    return {
	      getRawArtifact: function getRawArtifact() {
	        return artifact;
	      },
	      stopPolling: function stopPolling() {
	        return artifactProvider.stopPolling();
	      },
	      getOffers: function getOffers(targetOptions) {
	        return _getOffers(targetOptions);
	      },
	      hasRemoteDependency: function hasRemoteDependency$1(request) {
	        return hasRemoteDependency(artifact, request);
	      },
	      isReady: isReady
	    };
	  });
	}

	function lowerCaseHeaders(headers) {
	  var headerKeys = [];
	  var headerEntries = [];
	  var headersObj = {};
	  Object.keys(headers).forEach(function (key) {
	    var headerKey = key.toLowerCase();
	    var headerValue = headers[key];
	    headerKeys.push(headerKey);
	    headersObj[headerKey] = headerValue;
	    headerEntries.push([headerKey, headerValue]);
	  });
	  return {
	    headerKeys: headerKeys,
	    headerEntries: headerEntries,
	    headersObj: headersObj
	  };
	}
	function unfetchResponse(responseURL, headers, body) {
	  var requestStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
	  var statusText = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
	  var encoder = new TextEncoder();
	  var decoder = new TextDecoder("utf-8");
	  var bodyArrayBuffer;
	  var bodyString;
	  if (isString(body)) {
	    bodyString = body;
	    bodyArrayBuffer = encoder.encode(body).buffer;
	  } else if (body instanceof ArrayBuffer) {
	    bodyString = decoder.decode(new DataView(body));
	    bodyArrayBuffer = body;
	  }
	  var _lowerCaseHeaders = lowerCaseHeaders(headers),
	      headerKeys = _lowerCaseHeaders.headerKeys,
	      headerEntries = _lowerCaseHeaders.headerEntries,
	      headersObj = _lowerCaseHeaders.headersObj;
	  var response = function response() {
	    return {
	      ok: (requestStatus / 100 | 0) === 2,
	      statusText: statusText,
	      status: requestStatus,
	      url: responseURL,
	      text: function text() {
	        return reactorPromise.resolve(bodyString);
	      },
	      json: function json() {
	        return reactorPromise.resolve(JSON.parse(bodyString));
	      },
	      blob: function blob() {
	        return reactorPromise.resolve(new Blob([bodyArrayBuffer]));
	      },
	      arrayBuffer: function arrayBuffer() {
	        return reactorPromise.resolve(bodyArrayBuffer);
	      },
	      clone: response,
	      headers: {
	        keys: function keys() {
	          return headerKeys;
	        },
	        entries: function entries() {
	          return headerEntries;
	        },
	        get: function get(n) {
	          return headersObj[n.toLowerCase()];
	        },
	        has: function has(n) {
	          return n.toLowerCase() in headersObj;
	        }
	      }
	    };
	  };
	  return response();
	}

	var hasNativeFetch = typeof window !== "undefined" && typeof window.fetch === "function";
	function getFetchResponseFactory() {
	  return hasNativeFetch ? function (url, headers, body) {
	    return new Response(new Blob([body], {
	      headers: headers
	    }));
	  } : unfetchResponse;
	}

	var TARGET_STORAGE_PREFIX = "tgt";
	var REGEX_TARGET_LOCAL_STORAGE_KEY = new RegExp("^" + TARGET_STORAGE_PREFIX + ":.+", "i");
	var REGEX_RULES_ARTIFACT = /rules\.(json|txt)$/i;
	var REGEX_CONTENT_TYPE_JSON = /(application\/json)|(text\/)/i;
	var createFetchResponse = getFetchResponseFactory();
	var isTargetLocalStorageKey = function isTargetLocalStorageKey(key) {
	  return REGEX_TARGET_LOCAL_STORAGE_KEY.test(key);
	};
	var isArtifactFile = function isArtifactFile(url) {
	  return url.match(REGEX_RULES_ARTIFACT);
	};
	var isJsonContentType = function isJsonContentType(contentType) {
	  return contentType && contentType.match(REGEX_CONTENT_TYPE_JSON);
	};
	var ARTIFACT_FETCH_DELAY = 1000;
	function localStorageAvailable() {
	  try {
	    var storage = window["localStorage"];
	    var x = "__storage_test__";
	    storage.setItem(x, x);
	    storage.removeItem(x);
	    return true;
	  } catch (e) {
	    return false;
	  }
	}
	var canCacheArtifact = localStorageAvailable();
	function getHeadersCacheKey(url) {
	  return TARGET_STORAGE_PREFIX + ":" + hashUnencodedChars(url) + ":h";
	}
	function getBodyCacheKey(url) {
	  return TARGET_STORAGE_PREFIX + ":" + hashUnencodedChars(url) + ":b";
	}
	function headersAsPOJO(headers) {
	  var result = {};
	  var _iterator = _createForOfIteratorHelper(headers.entries()),
	      _step;
	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var _step$value = _slicedToArray(_step.value, 2),
	          key = _step$value[0],
	          value = _step$value[1];
	      result[key] = value;
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }
	  return result;
	}
	function clearTargetLocalStorage() {
	  Object.keys(localStorage).filter(isTargetLocalStorageKey).forEach(function (key) {
	    return localStorage.removeItem(key);
	  });
	}
	function storeJsonInLocalStorage(key, jsonValue) {
	  try {
	    localStorage.setItem(key, JSON.stringify(jsonValue));
	  } catch (err) {
	    clearTargetLocalStorage();
	  }
	}
	function getArtifactFromCache(url) {
	  if (!canCacheArtifact) {
	    return undefined;
	  }
	  var cached = {
	    headers: localStorage.getItem(getHeadersCacheKey(url)),
	    body: localStorage.getItem(getBodyCacheKey(url))
	  };
	  if (cached.headers != null && cached.body != null) {
	    return cached;
	  }
	  return undefined;
	}
	function storeArtifactInCache(url, response) {
	  if (!canCacheArtifact) {
	    return resolve$1();
	  }
	  var headers = headersAsPOJO(response.headers);
	  storeJsonInLocalStorage(getHeadersCacheKey(url), headers);
	  return response.clone().json().then(function (content) {
	    storeJsonInLocalStorage(getBodyCacheKey(url), content);
	  });
	}
	function getFetchWithCaching(fetchApi) {
	  return function cachedFetch(url, options) {
	    if (!isArtifactFile(url)) {
	      return fetchApi(url, options);
	    }
	    var cachedArtifact = getArtifactFromCache(url);
	    function fetchAndCache() {
	      var additionalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      return fetchApi(url, _objectSpread2(_objectSpread2({}, options), additionalOptions)).then(function (response) {
	        if (isJsonContentType(response.headers.get("Content-Type"))) {
	          storeArtifactInCache(url, response);
	        }
	        return response;
	      });
	    }
	    if (isDefined(cachedArtifact)) {
	      $(function () {
	        setTimeout(function () {
	          return fetchAndCache();
	        }, ARTIFACT_FETCH_DELAY);
	      });
	      return resolve$1(createFetchResponse(url, JSON.parse(cachedArtifact.headers), cachedArtifact.body));
	    }
	    return fetchAndCache();
	  };
	}
	function ensureArtifactCached(decisioningConfig) {
	  if (!canCacheArtifact) {
	    return decisioningConfig;
	  }
	  var cachedArtifact = getArtifactFromCache(determineArtifactLocation(decisioningConfig));
	  if (isDefined(cachedArtifact)) {
	    return decisioningConfig;
	  }
	  $(function () {
	    setTimeout(function () {
	      return ArtifactProvider(decisioningConfig);
	    }, ARTIFACT_FETCH_DELAY);
	  });
	  throw new Error("No cached artifact available for Hybrid mode.");
	}

	var DEFAULT_POLLING_INTERVAL$1 = 0;
	var decisioningEnginePromise;
	function getDecisioningMethod(config) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return options[DECISIONING_METHOD_SETTING] || config[DECISIONING_METHOD_SETTING];
	}
	function isServerSideDecisioningMethod(config) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return getDecisioningMethod(config, options) === DECISIONING_METHOD.SERVER_SIDE;
	}
	function isHybridDecisioningMethod(config) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return getDecisioningMethod(config, options) === DECISIONING_METHOD.HYBRID;
	}
	function getPollingInterval(config) {
	  return isNumber(config[POLLING_INTERVAL_SETTING]) ? config[POLLING_INTERVAL_SETTING] : DEFAULT_POLLING_INTERVAL$1;
	}
	function getArtifactLocation(config) {
	  return config[ARTIFACT_LOCATION_SETTING];
	}
	function getArtifactFormat(config) {
	  return config[ARTIFACT_FORMAT_SETTING];
	}
	function getArtifactPayload(config) {
	  return config[ARTIFACT_PAYLOAD_SETTING];
	}
	function getTargetEnvironment$1(config) {
	  return config[TARGET_ENVIRONMENT_SETTING];
	}
	function getCdnEnvironment$1(config) {
	  return config[CDN_ENVIRONMENT_SETTING];
	}
	function getTelemetryEnabled(config) {
	  return config[TELEMETRY_ENABLED_SETTING];
	}
	function getCdnBasePath$1(config) {
	  return config[CDN_BASEPATH_SETTING];
	}
	function decisioningEngineRequired(config) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  if (isAuthoringEnabled() || isQaMode() || isPreviewMode()) {
	    return false;
	  }
	  return requiresDecisioningEngine(getDecisioningMethod(reactorObjectAssign({}, config), options));
	}
	function ifOnDeviceDecisioningPossible(config) {
	  return !isServerSideDecisioningMethod(config) ? resolve$1() : reject$1(new Error(DECISIONING_ENGINE_NOT_READY));
	}
	function eventEmitter(eventName, payload) {
	  var config = getConfig();
	  notifyOnDeviceDecisioning(eventName, payload);
	  if (eventName !== GEO_LOCATION_UPDATED) {
	    return;
	  }
	  var geoContext = payload.geoContext;
	  if (isDefined(geoContext) && !isEmpty(Object.keys(geoContext))) {
	    var geoCookieLifetime = 7 * 24 * 60 * 60 * 1000;
	    var expires = new Date(now() + geoCookieLifetime);
	    var domain = config[COOKIE_DOMAIN];
	    setCookie(GEO_COOKIE, JSON.stringify(geoContext), {
	      expires: expires,
	      domain: domain
	    });
	  }
	}
	function getGeoContext(request) {
	  var geoCookie = getCookie(GEO_COOKIE);
	  var geoContext = reactorObjectAssign({}, isDefined(geoCookie) ? JSON.parse(geoCookie) : {}, request.context.geo);
	  if (isObject(geoContext) && isEmpty(Object.keys(geoContext))) {
	    return {
	      ipAddress: UNKNOWN_IP_ADDRESS
	    };
	  }
	  return geoContext;
	}
	function prepareDecisioningConfig(config, sendNotificationFn, customFetch) {
	  var targetPageParams = getTargetPageParams(config[GLOBAL_MBOX_NAME]);
	  var propertyToken = getPropertyToken$1(targetPageParams);
	  var CONF = {
	    client: config[CLIENT_CODE],
	    organizationId: config[IMS_ORG_ID],
	    pollingInterval: getPollingInterval(config),
	    propertyToken: propertyToken,
	    environment: getTargetEnvironment$1(config),
	    cdnEnvironment: getCdnEnvironment$1(config),
	    cdnBasePath: getCdnBasePath$1(config),
	    telemetryEnabled: getTelemetryEnabled(config),
	    eventEmitter: eventEmitter,
	    logger: logger,
	    fetchApi: getFetchWithCaching(isFunction(customFetch) ? customFetch : getFetchApi(isFunction(window.fetch) ? window.fetch : noopPromise)),
	    sendNotificationFunc: function sendNotificationFunc(options) {
	      logDebug("sendNotificationFunc", options);
	      var request = options.request;
	      if (isFunction(sendNotificationFn)) {
	        sendNotificationFn(request);
	      }
	    }
	  };
	  var artifactPayload = getArtifactPayload(config);
	  return resolve$1(isDefined(artifactPayload) ? _objectSpread2(_objectSpread2({}, CONF), {}, {
	    artifactPayload: artifactPayload
	  }) : _objectSpread2(_objectSpread2({}, CONF), {}, {
	    artifactFormat: getArtifactFormat(config),
	    artifactLocation: getArtifactLocation(config)
	  }));
	}
	function abortIfHybridAndArtifactNotCached(config, decisioningConfig) {
	  return isHybridDecisioningMethod(config) ? ensureArtifactCached(decisioningConfig) : decisioningConfig;
	}
	function bootstrapDecisioningEngine(config, sendNotificationFn) {
	  var customFetch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  if (!decisioningEngineRequired(config)) {
	    return;
	  }
	  decisioningEnginePromise = undefined;
	  perfTool.timeStart(TIMING_DECISIONING_ENGINE_INIT);
	  decisioningEnginePromise = prepareDecisioningConfig(config, sendNotificationFn, customFetch).then(function (decisioningConfig) {
	    return abortIfHybridAndArtifactNotCached(config, decisioningConfig);
	  }).then(function (decisioningConfig) {
	    return TargetDecisioningEngine(decisioningConfig);
	  }).then(function (instance) {
	    perfTool.timeEnd(TIMING_DECISIONING_ENGINE_INIT);
	    return instance;
	  });
	}
	function whenDecisioningEngineIsReady() {
	  return isDefined(decisioningEnginePromise) ? decisioningEnginePromise : reject$1();
	}
	function executeDecisioningRequest(request) {
	  var _request$context = request.context,
	      context = _request$context === void 0 ? {} : _request$context;
	  return whenDecisioningEngineIsReady().then(function (decisioningEngine) {
	    var timingGetOffersDecisioningFinished = perfTool.timeStart(TIMING_GET_OFFER_DECISIONING, true);
	    return decisioningEngine.getOffers({
	      request: _objectSpread2(_objectSpread2({}, request), {}, {
	        context: _objectSpread2(_objectSpread2({}, context), {}, {
	          geo: getGeoContext(request)
	        })
	      }),
	      targetLocationHint: getEdgeCluster()
	    }).then(function (response) {
	      perfTool.timeEnd(timingGetOffersDecisioningFinished);
	      return reactorObjectAssign(response, {
	        decisioningMethod: DECISIONING_METHOD.ON_DEVICE
	      });
	    });
	  });
	}
	function hasRemoteDependency$1(request) {
	  return whenDecisioningEngineIsReady().then(function (decisioningEngine) {
	    return decisioningEngine.hasRemoteDependency(request);
	  });
	}

	var WEB_CHANNEL = "web";
	var EDGE_SERVER_PREFIX = "mboxedge";
	var EDGE_SERVER_DOMAIN = ".tt.omtrdc.net";
	var notEmpty = function notEmpty(val) {
	  return !isEmpty(val);
	};
	function throwIfOptout(values) {
	  var optout = values[MCOPTOUT];
	  if (optout) {
	    throw new Error(OPTOUT_MESSAGE);
	  }
	  return values;
	}
	function getAsyncThirdPartyData() {
	  var visitorValues = getAsyncVisitorValues();
	  var dataProvidersParams = getAsyncDataProvidersParameters();
	  return all([visitorValues.then(throwIfOptout), dataProvidersParams]);
	}
	function getSyncThirdPartyData() {
	  var visitorValues = getSyncVisitorValues();
	  var dataProvidersParams = getSyncDataProvidersParameters();
	  return [visitorValues, dataProvidersParams];
	}
	function getAllParams(providersParams) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  return reactorObjectAssign({}, providersParams, getTargetPageParams(globalMbox));
	}
	function getTimeOffset() {
	  return -new Date().getTimezoneOffset();
	}
	function createScreen() {
	  var screen = window.screen;
	  return {
	    width: screen.width,
	    height: screen.height,
	    orientation: getScreenOrientation(),
	    colorDepth: screen.colorDepth,
	    pixelRatio: getPixelRatio()
	  };
	}
	function createWindow() {
	  var documentElement = document.documentElement;
	  return {
	    width: documentElement.clientWidth,
	    height: documentElement.clientHeight
	  };
	}
	function createBrowser() {
	  var location = window.location;
	  return {
	    host: location.hostname,
	    webGLRenderer: getWebGLRenderer()
	  };
	}
	function createAddress() {
	  var location = window.location;
	  return {
	    url: location.href,
	    referringUrl: document.referrer
	  };
	}
	function createContext(context) {
	  if (!isNil(context) && context.channel === WEB_CHANNEL) {
	    return context;
	  }
	  var validContext = context || {};
	  var beacon = validContext.beacon;
	  return {
	    userAgent: window.navigator.userAgent,
	    timeOffsetInMinutes: getTimeOffset(),
	    channel: WEB_CHANNEL,
	    screen: createScreen(),
	    window: createWindow(),
	    browser: createBrowser(),
	    address: createAddress(),
	    geo: context && context.geo,
	    beacon: beacon
	  };
	}
	function createAudienceManager(audienceManager, visitorValues) {
	  if (!isNil(audienceManager)) {
	    return audienceManager;
	  }
	  var result = {};
	  if (isEmpty(visitorValues)) {
	    return result;
	  }
	  var locationHint = visitorValues[MCAAMLH];
	  var locationHintNumber = parseInt(locationHint, 10);
	  if (!isNaN(locationHintNumber)) {
	    result.locationHint = locationHintNumber;
	  }
	  var blob = visitorValues[MCAAMB];
	  if (isNotBlank(blob)) {
	    result.blob = blob;
	  }
	  return result;
	}
	function createCustomerId(data) {
	  var id = data.id,
	      integrationCode = data.integrationCode,
	      authenticatedState = data.authenticatedState,
	      type = data.type,
	      primary = data.primary;
	  var result = {};
	  if (isNotBlank(id)) {
	    result.id = id;
	  }
	  if (isNotBlank(integrationCode)) {
	    result.integrationCode = integrationCode;
	  }
	  if (isNotBlank(authenticatedState)) {
	    result.authenticatedState = authenticatedState;
	  }
	  if (isNotBlank(type)) {
	    result.type = type;
	  }
	  if (primary) {
	    result.primary = primary;
	  }
	  return result;
	}
	function createCustomerIds(customerIdsValues) {
	  return map(createCustomerId, customerIdsValues);
	}
	function createVisitorId(id, deviceId, thirdPartyId, visitorValues, customerIdsValues) {
	  var result = {};
	  if (isNotBlank(deviceId)) {
	    result.tntId = deviceId;
	  }
	  if (isNotBlank(thirdPartyId)) {
	    result.thirdPartyId = thirdPartyId;
	  }
	  if (isNotBlank(id.thirdPartyId)) {
	    result.thirdPartyId = id.thirdPartyId;
	  }
	  var mid = visitorValues[MCMID];
	  if (isNotBlank(mid)) {
	    result.marketingCloudVisitorId = mid;
	  }
	  if (isNotBlank(id.marketingCloudVisitorId)) {
	    result.marketingCloudVisitorId = id.marketingCloudVisitorId;
	  }
	  if (!isEmpty(id.customerIds)) {
	    result.customerIds = id.customerIds;
	    return result;
	  }
	  if (!isEmpty(customerIdsValues)) {
	    result.customerIds = createCustomerIds(customerIdsValues);
	  }
	  return result;
	}
	function createExperienceCloud(experienceCloud, visitorValues) {
	  var result = {};
	  var audienceManager = createAudienceManager(experienceCloud.audienceManager, visitorValues);
	  if (!isEmpty(audienceManager)) {
	    result.audienceManager = audienceManager;
	  }
	  if (!isEmpty(experienceCloud.analytics)) {
	    result.analytics = experienceCloud.analytics;
	  }
	  return result;
	}
	function createProperty(property, allParams) {
	  return getProperty({
	    propertyToken: getPropertyToken$1(allParams)
	  }, {
	    property: property
	  }, logger);
	}
	function createTrace$1(trace) {
	  if (!isNil(trace) && isNotBlank(trace.authorizationToken)) {
	    return trace;
	  }
	  var result = {};
	  var authorizationToken = getTraceToken();
	  if (isNotBlank(authorizationToken)) {
	    result.authorizationToken = authorizationToken;
	  }
	  return result;
	}
	function createPreview(preview) {
	  if (!isNil(preview)) {
	    return preview;
	  }
	  return getPreview();
	}
	function createQaMode(qaMode) {
	  if (!isNil(qaMode)) {
	    return qaMode;
	  }
	  return getQaMode();
	}
	function createOrder(params) {
	  var result = {};
	  var orderId = getOrderId(params);
	  if (!isNil(orderId)) {
	    result.id = orderId;
	  }
	  var orderTotal = getOrderTotal(params);
	  var orderTotalNumber = parseFloat(orderTotal);
	  if (!isNaN(orderTotalNumber)) {
	    result.total = orderTotalNumber;
	  }
	  var purchasedProductIds = getPurchasedProductIds(params);
	  if (!isEmpty(purchasedProductIds)) {
	    result.purchasedProductIds = purchasedProductIds;
	  }
	  return result;
	}
	function createProduct(params) {
	  var result = {};
	  var productId = getProductId(params);
	  if (!isNil(productId)) {
	    result.id = productId;
	  }
	  var categoryId = getCategoryId(params);
	  if (!isNil(categoryId)) {
	    result.categoryId = categoryId;
	  }
	  return result;
	}
	function createRequestDetails(item, allParams) {
	  var result = {};
	  var params = reactorObjectAssign({}, getParams$1(allParams), item.parameters || {});
	  var profileParams = reactorObjectAssign({}, getProfileParams(allParams), item.profileParameters || {});
	  var order = reactorObjectAssign({}, createOrder(allParams), item.order || {});
	  var product = reactorObjectAssign({}, createProduct(allParams), item.product || {});
	  if (!isEmpty(params)) {
	    result.parameters = params;
	  }
	  if (!isEmpty(profileParams)) {
	    result.profileParameters = profileParams;
	  }
	  if (!isEmpty(order)) {
	    result.order = order;
	  }
	  if (!isEmpty(product)) {
	    result.product = product;
	  }
	  return result;
	}
	function createMboxRequestDetails(item, allParams) {
	  var providersParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var index = item.index,
	      name = item.name,
	      address = item.address;
	  var params = reactorObjectAssign({}, name === globalMbox ? allParams : providersParams, getTargetPageParams(name));
	  var result = createRequestDetails(item, params);
	  if (!isNil(index)) {
	    result.index = index;
	  }
	  if (isNotBlank(name)) {
	    result.name = name;
	  }
	  if (!isEmpty(address)) {
	    result.address = address;
	  }
	  return result;
	}
	function createViewRequestDetails(item, allParams) {
	  var name = item.name,
	      address = item.address;
	  var result = createRequestDetails(item, allParams);
	  if (isNotBlank(name)) {
	    result.name = name;
	  }
	  if (!isEmpty(address)) {
	    result.address = address;
	  }
	  return result;
	}
	function createExecute(request, allParams, providersParams) {
	  var _request$execute = request.execute,
	      execute = _request$execute === void 0 ? {} : _request$execute;
	  var result = {};
	  if (isEmpty(execute)) {
	    return result;
	  }
	  var pageLoad = execute.pageLoad;
	  if (!isNil(pageLoad)) {
	    result.pageLoad = createRequestDetails(pageLoad, allParams);
	  }
	  var mboxes = execute.mboxes;
	  if (!isNil(mboxes) && isArray(mboxes) && !isEmpty(mboxes)) {
	    var temp = filter(notEmpty, map(function (e) {
	      return createMboxRequestDetails(e, allParams, providersParams);
	    }, mboxes));
	    if (!isEmpty(temp)) {
	      result.mboxes = temp;
	    }
	  }
	  return result;
	}
	function createPrefetch(request, allParams, providersParams) {
	  var _request$prefetch = request.prefetch,
	      prefetch = _request$prefetch === void 0 ? {} : _request$prefetch;
	  var result = {};
	  if (isEmpty(prefetch)) {
	    return result;
	  }
	  var mboxes = prefetch.mboxes;
	  if (!isNil(mboxes) && isArray(mboxes) && !isEmpty(mboxes)) {
	    result.mboxes = map(function (e) {
	      return createMboxRequestDetails(e, allParams, providersParams);
	    }, mboxes);
	  }
	  var views = prefetch.views;
	  if (!isNil(views) && isArray(views) && !isEmpty(views)) {
	    result.views = map(function (e) {
	      return createViewRequestDetails(e, allParams);
	    }, views);
	  }
	  return result;
	}
	function createAnalytics(consumerId, request) {
	  if (shouldUseOptin() && !isAnalyticsApproved()) {
	    return null;
	  }
	  var config = getConfig();
	  var sdid = getSdidVisitorValue(consumerId);
	  var server = getVisitorProperty(TRACK_SERVER_PROP);
	  var serverSecure = getVisitorProperty(TRACK_SERVER_SECURE_PROP);
	  var _request$experienceCl = request.experienceCloud,
	      experienceCloud = _request$experienceCl === void 0 ? {} : _request$experienceCl;
	  var _experienceCloud$anal = experienceCloud.analytics,
	      analytics = _experienceCloud$anal === void 0 ? {} : _experienceCloud$anal;
	  var logging = analytics.logging,
	      supplementalDataId = analytics.supplementalDataId,
	      trackingServer = analytics.trackingServer,
	      trackingServerSecure = analytics.trackingServerSecure;
	  var result = {};
	  if (!isNil(logging)) {
	    result.logging = logging;
	  } else {
	    result.logging = config[ANALYTICS_LOGGING];
	  }
	  if (!isNil(supplementalDataId)) {
	    result.supplementalDataId = supplementalDataId;
	  }
	  if (isNotBlank(sdid)) {
	    result.supplementalDataId = sdid;
	  }
	  if (!isNil(trackingServer)) {
	    result.trackingServer = trackingServer;
	  }
	  if (isNotBlank(server)) {
	    result.trackingServer = server;
	  }
	  if (!isNil(trackingServerSecure)) {
	    result.trackingServerSecure = trackingServerSecure;
	  }
	  if (isNotBlank(serverSecure)) {
	    result.trackingServerSecure = serverSecure;
	  }
	  if (isEmpty(result)) {
	    return null;
	  }
	  return result;
	}
	function createDeliveryRequest(request, visitorValues, providersParams) {
	  var allParams = getAllParams(providersParams);
	  var deviceId = getDeviceId();
	  var thirdPartyId = getThirdPartyId(allParams);
	  var customerIdsValues = getCustomerIdsVisitorValues();
	  var visitorId = createVisitorId(request.id || {}, deviceId, thirdPartyId, visitorValues, customerIdsValues);
	  var property = createProperty(request.property, allParams);
	  var experienceCloud = createExperienceCloud(request.experienceCloud || {}, visitorValues);
	  var trace = createTrace$1(request.trace);
	  var preview = createPreview(request.preview);
	  var qaMode = createQaMode(request.qaMode);
	  var execute = createExecute(request, allParams, providersParams);
	  var prefetch = createPrefetch(request, allParams, providersParams);
	  var notifications = request.notifications;
	  var result = {};
	  result.requestId = uuid();
	  result.context = createContext(request.context);
	  if (!isEmpty(visitorId)) {
	    result.id = visitorId;
	  }
	  if (!isEmpty(property)) {
	    result.property = property;
	  }
	  if (!isEmpty(trace)) {
	    result.trace = trace;
	  }
	  if (!isEmpty(experienceCloud)) {
	    result.experienceCloud = experienceCloud;
	  }
	  if (!isEmpty(preview)) {
	    result.preview = preview;
	  }
	  if (!isEmpty(qaMode)) {
	    result.qaMode = qaMode;
	  }
	  if (!isEmpty(execute)) {
	    result.execute = execute;
	  }
	  if (!isEmpty(prefetch)) {
	    result.prefetch = prefetch;
	  }
	  if (!isEmpty(notifications)) {
	    result.notifications = notifications;
	  }
	  return result;
	}
	function buildRequest(request, params, data) {
	  var visitorValues = data[0];
	  var providersValues = data[1];
	  var providersParams = reactorObjectAssign({}, providersValues, params);
	  return createDeliveryRequest(request, visitorValues, providersParams);
	}
	function createAsyncDeliveryRequest(request, params) {
	  return getAsyncThirdPartyData().then(function (data) {
	    return buildRequest(request, params, data);
	  });
	}
	function createSyncDeliveryRequest(request, params) {
	  var data = getSyncThirdPartyData();
	  return buildRequest(request, params, data);
	}
	function getTimeout(config, timeout) {
	  if (!isNumber(timeout)) {
	    return config[TIMEOUT];
	  }
	  if (timeout < 0) {
	    return config[TIMEOUT];
	  }
	  return timeout;
	}
	function getServerDomain(config) {
	  var serverDomain = config[SERVER_DOMAIN];
	  var overrideMboxEdgeServer = config[OVERRIDE_MBOX_EDGE_SERVER];
	  if (!overrideMboxEdgeServer) {
	    return serverDomain;
	  }
	  var cluster = getEdgeCluster();
	  if (isBlank(cluster)) {
	    return serverDomain;
	  }
	  return "" + EDGE_SERVER_PREFIX + cluster + EDGE_SERVER_DOMAIN;
	}
	function createRequestUrl(config) {
	  var scheme = config[SCHEME];
	  var host = getServerDomain(config);
	  var path = config[ENDPOINT];
	  var client = config[CLIENT_CODE];
	  var sessionId = getSessionId();
	  var version = config[VERSION];
	  var queryString = stringifyQueryString({
	    client: client,
	    sessionId: sessionId,
	    version: version
	  });
	  return scheme + "//" + host + path + "?" + queryString;
	}
	function executeDeliveryRequest(request, requestTimeout) {
	  var timingGetOffersDeliveryRequest = perfTool.timeStart(TIMING_GET_OFFER_DELIVERY, true);
	  var config = getConfig();
	  var url = createRequestUrl(config);
	  var headers = _defineProperty({}, CONTENT_TYPE, [TEXT_PLAIN]);
	  var timeout = getTimeout(config, requestTimeout);
	  var async = true;
	  var options = {
	    url: url,
	    headers: headers,
	    body: request,
	    timeout: timeout,
	    async: async
	  };
	  return executeXhr(options).then(function (response) {
	    perfTool.timeEnd(timingGetOffersDeliveryRequest);
	    return reactorObjectAssign(response, {
	      decisioningMethod: DECISIONING_METHOD.SERVER_SIDE
	    });
	  });
	}
	function prepareExecuteRequest(config, options, request, requestTimeout) {
	  var decisioningMethod = getDecisioningMethod(config, options);
	  if (!decisioningEngineRequired(config, options)) {
	    return executeDeliveryRequest(request, requestTimeout);
	  }
	  return ifOnDeviceDecisioningPossible(config).then(function () {
	    return hasRemoteDependency$1(request);
	  }).then(function (dependency) {
	    if (decisioningMethod === DECISIONING_METHOD.HYBRID && dependency.remoteNeeded) {
	      return executeDeliveryRequest(request, requestTimeout);
	    }
	    return executeDecisioningRequest(request);
	  })['catch'](function (err) {
	    if (decisioningMethod === DECISIONING_METHOD.HYBRID) {
	      return executeDeliveryRequest(request, requestTimeout);
	    }
	    throw err;
	  });
	}
	function executeRequest(options, request, requestTimeout) {
	  var config = getConfig();
	  logDebug(REQUEST, request);
	  addClientTrace({
	    request: request
	  });
	  return prepareExecuteRequest(config, options, request, requestTimeout).then(function (response) {
	    logDebug(RESPONSE, response);
	    addClientTrace({
	      response: response
	    });
	    return {
	      request: request,
	      response: response
	    };
	  });
	}

	var prop = function prop(key) {
	  return function (obj) {
	    return obj[key];
	  };
	};
	var not = function not(pred) {
	  return function (val) {
	    return !pred(val);
	  };
	};
	var notNil = not(isNil);
	var notBlank = not(isBlank);
	var filterBy = function filterBy(pred) {
	  return function (coll) {
	    return filter(pred, coll);
	  };
	};
	var isError = function isError(val) {
	  return val.status === ERROR;
	};
	var isActions = function isActions(val) {
	  return val.type === ACTIONS;
	};
	var isRedirect = function isRedirect(val) {
	  return val.type === REDIRECT;
	};
	var filterNotNil = filterBy(notNil);
	var filterNotBlank = filterBy(notBlank);
	var selectOptions = prop(OPTIONS);
	var selectContent = prop(CONTENT);
	var selectResponseTokens = prop(RESPONSE_TOKENS);
	var hasName = function hasName(val) {
	  return isNotBlank(val.name);
	};
	var hasIndex = function hasIndex(val) {
	  return !isNil(val.index);
	};
	var isValidMbox = function isValidMbox(val) {
	  return isObject(val) && hasName(val);
	};
	var isValidPrefetchMbox = function isValidPrefetchMbox(val) {
	  return isObject(val) && hasName(val) && hasIndex(val);
	};
	var isValidView = function isValidView(val) {
	  return isObject(val) && hasName(val);
	};
	var hasSelector = function hasSelector(val) {
	  return isNotBlank(val.selector);
	};
	var selectData = prop(DATA);
	var hasData = flow([selectData, notNil]);
	function createSuccess(type, data) {
	  return {
	    status: SUCCESS,
	    type: type,
	    data: data
	  };
	}
	function createError(type, data) {
	  return {
	    status: ERROR,
	    type: type,
	    data: data
	  };
	}
	function isValidOption(option) {
	  return isObject(option);
	}
	function isValidOptionEventToken(option) {
	  if (!isValidOption(option)) {
	    return false;
	  }
	  return isNotBlank(option.eventToken);
	}
	function isValidMetric(metric) {
	  if (isEmpty(metric) || isBlank(metric.type)) {
	    return false;
	  }
	  return isNotBlank(metric.eventToken);
	}
	function isValidSelectorMetric(metric) {
	  if (!isValidMetric(metric)) {
	    return false;
	  }
	  return isNotBlank(metric.selector);
	}

	function hasDeviceId(res) {
	  var id = res.id;
	  return isObject(id) && isNotBlank(id.tntId);
	}
	function handleDeviceId(context) {
	  var response = context.response;
	  if (hasDeviceId(response)) {
	    setDeviceId(response.id.tntId);
	  }
	  return context;
	}

	function handleEdgeCluster(context) {
	  var response = context.response;
	  if (hasDeviceId(response)) {
	    var id = response.id;
	    var tntId = id.tntId;
	    setEdgeCluster(tntId);
	  }
	  setEdgeCluster(null);
	  return context;
	}

	function addTraceIfExists() {
	  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var trace = item.trace;
	  if (!isEmpty(trace)) {
	    addServerTrace(trace);
	  }
	}
	function handleTraces(httpContext) {
	  var response = httpContext.response;
	  var _response$execute = response.execute,
	      execute = _response$execute === void 0 ? {} : _response$execute,
	      _response$prefetch = response.prefetch,
	      prefetch = _response$prefetch === void 0 ? {} : _response$prefetch;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad,
	      _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var _prefetch$mboxes = prefetch.mboxes,
	      prefetchMboxes = _prefetch$mboxes === void 0 ? [] : _prefetch$mboxes,
	      _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  addTraceIfExists(pageLoad);
	  forEach(addTraceIfExists, mboxes);
	  forEach(addTraceIfExists, prefetchMboxes);
	  forEach(addTraceIfExists, views);
	  return httpContext;
	}

	var SDID_PARAM = "adobe_mc_sdid";
	function getRedirectUriParams(uri) {
	  var result = uri.queryKey;
	  var param = result[SDID_PARAM];
	  if (!isString(param)) {
	    return result;
	  }
	  if (isBlank(param)) {
	    return result;
	  }
	  var nowInSeconds = Math.round(now() / 1000);
	  result[SDID_PARAM] = param.replace(/\|TS=\d+/, "|TS=" + nowInSeconds);
	  return result;
	}
	function getUriParams(uri) {
	  return uri.queryKey;
	}
	function createUrlInternal(url, params, uriParamsFunc) {
	  var parsedUri = parseUri$1(url);
	  var protocol = parsedUri.protocol;
	  var host = parsedUri.host;
	  var path = parsedUri.path;
	  var port = parsedUri.port === "" ? "" : ":" + parsedUri.port;
	  var anchor = isBlank(parsedUri.anchor) ? "" : "#" + parsedUri.anchor;
	  var uriParams = uriParamsFunc(parsedUri);
	  var queryString = stringifyQueryString(reactorObjectAssign({}, uriParams, params));
	  var query = isBlank(queryString) ? "" : "?" + queryString;
	  return protocol + "://" + host + port + path + query + anchor;
	}
	function createRedirectUrl(url, params) {
	  return createUrlInternal(url, params, getRedirectUriParams);
	}
	function createUrl(url, params) {
	  return createUrlInternal(url, params, getUriParams);
	}

	function createRedirectOption(option) {
	  var url = option.content;
	  if (isBlank(url)) {
	    logDebug(EMPTY_URL, option);
	    return null;
	  }
	  var result = reactorObjectAssign({}, option);
	  result.content = createRedirectUrl(url, {});
	  return result;
	}

	var NETWORK_ERROR$1 = "Network request failed";
	var REQUEST_TIMEOUT$1 = "Request timed out";
	var URL_REQUIRED = "URL is required";
	var GET = "GET";
	var POST$1 = "POST";
	var METHOD = "method";
	var URL = "url";
	var HEADERS = "headers";
	var DATA$1 = "data";
	var CREDENTIALS = "credentials";
	var TIMEOUT$1 = "timeout";
	var ASYNC = "async";
	function throwError(message) {
	  throw new Error(message);
	}
	function processOptions(options) {
	  var method = options[METHOD] || GET;
	  var url = options[URL] || throwError(URL_REQUIRED);
	  var headers = options[HEADERS] || {};
	  var data = options[DATA$1] || null;
	  var credentials = options[CREDENTIALS] || false;
	  var timeout = options[TIMEOUT$1] || 3000;
	  var async = isNil(options[ASYNC]) ? true : options[ASYNC] === true;
	  var result = {};
	  result[METHOD] = method;
	  result[URL] = url;
	  result[HEADERS] = headers;
	  result[DATA$1] = data;
	  result[CREDENTIALS] = credentials;
	  result[TIMEOUT$1] = timeout;
	  result[ASYNC] = async;
	  return result;
	}
	function addOnload$1(xhr, resolve, reject) {
	  xhr.onload = function () {
	    var status = xhr.status === 1223 ? 204 : xhr.status;
	    if (status < 100 || status > 599) {
	      reject(new Error(NETWORK_ERROR$1));
	      return;
	    }
	    var response = xhr.responseText;
	    var headers = xhr.getAllResponseHeaders();
	    var result = {
	      status: status,
	      headers: headers,
	      response: response
	    };
	    resolve(result);
	  };
	  return xhr;
	}
	function addOnerror$1(xhr, reject) {
	  xhr.onerror = function () {
	    reject(new Error(NETWORK_ERROR$1));
	  };
	  return xhr;
	}
	function addOntimeout$1(xhr, timeout, reject) {
	  xhr.timeout = timeout;
	  xhr.ontimeout = function () {
	    reject(new Error(REQUEST_TIMEOUT$1));
	  };
	  return xhr;
	}
	function addCredentials(xhr, credentials) {
	  if (credentials === true) {
	    xhr.withCredentials = credentials;
	  }
	  return xhr;
	}
	function addHeaders$1(xhr, headers) {
	  forEach(function (value, key) {
	    forEach(function (v) {
	      return xhr.setRequestHeader(key, v);
	    }, value);
	  }, headers);
	  return xhr;
	}
	function createXhrPromise(win, opts) {
	  var options = processOptions(opts);
	  var method = options[METHOD];
	  var url = options[URL];
	  var headers = options[HEADERS];
	  var data = options[DATA$1];
	  var credentials = options[CREDENTIALS];
	  var timeout = options[TIMEOUT$1];
	  var async = options[ASYNC];
	  return create(function (resolve, reject) {
	    var xhr = new win.XMLHttpRequest();
	    xhr = addOnload$1(xhr, resolve, reject);
	    xhr = addOnerror$1(xhr, reject);
	    xhr.open(method, url, async);
	    xhr = addCredentials(xhr, credentials);
	    xhr = addHeaders$1(xhr, headers);
	    if (async) {
	      xhr = addOntimeout$1(xhr, timeout, reject);
	    }
	    xhr.send(data);
	  });
	}

	function xhr(options) {
	  return createXhrPromise(window, options);
	}

	function createOptions(url, params, timeout) {
	  var result = {};
	  result[METHOD] = GET;
	  result[URL] = createUrl(url, params);
	  result[TIMEOUT$1] = timeout;
	  return result;
	}
	function isSuccess(status) {
	  return status >= 200 && status < 300 || status === 304;
	}
	function createOption(res) {
	  var status = res.status;
	  if (!isSuccess(status)) {
	    return null;
	  }
	  var content = res.response;
	  if (isBlank(content)) {
	    return null;
	  }
	  var result = {};
	  result.type = HTML;
	  result.content = content;
	  return result;
	}
	function createHtmlOption(option) {
	  var content = option.content;
	  var config = getConfig();
	  var timeout = config[TIMEOUT$1];
	  return xhr(createOptions(content, {}, timeout)).then(createOption)['catch'](function () {
	    return null;
	  });
	}

	var CLICK_TRACK_PATTERN = /CLKTRK#(\S+)/;
	var CLICK_TRACK_REPLACE_PATTERN = /CLKTRK#(\S+)\s/;
	function getClickTrackNodeId(action) {
	  var selector = action[SELECTOR];
	  if (isBlank(selector)) {
	    return "";
	  }
	  var result = CLICK_TRACK_PATTERN.exec(selector);
	  if (isEmpty(result) || result.length !== 2) {
	    return "";
	  }
	  return result[1];
	}
	function getContent(id, content) {
	  var div = document.createElement(DIV_TAG);
	  div.innerHTML = content;
	  var firstElement = div.firstElementChild;
	  if (isNil(firstElement)) {
	    return content;
	  }
	  firstElement.id = id;
	  return firstElement.outerHTML;
	}
	function processClickTrackId(action) {
	  var content = action[CONTENT];
	  var nodeId = getClickTrackNodeId(action);
	  if (isBlank(nodeId) || isBlank(content)) {
	    return action;
	  }
	  var selector = action[SELECTOR];
	  action[SELECTOR] = selector.replace(CLICK_TRACK_REPLACE_PATTERN, "");
	  action[CONTENT] = getContent(nodeId, content);
	  return action;
	}

	var notNull$1 = function notNull(val) {
	  return !isNil(val);
	};
	function hasSelector$1(action) {
	  var selector = action.selector;
	  return !isNil(selector);
	}
	function setHtml$1(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function setText$1(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function appendHtml(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function prependHtml(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function replaceHtml(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function insertBefore(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function insertAfter(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var result = processClickTrackId(action);
	  var content = result[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, result);
	    return null;
	  }
	  return result;
	}
	function customCode(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_CONTENT, action);
	    return null;
	  }
	  return action;
	}
	function setAttribute(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isObject(content)) {
	    logDebug(EMPTY_ATTRIBUTE, action);
	    return null;
	  }
	  return action;
	}
	function setImageSource(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isString(content)) {
	    logDebug(EMPTY_IMAGE_URL, action);
	    return null;
	  }
	  return action;
	}
	function setStyle(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isObject(content)) {
	    logDebug(EMPTY_PROPERTY, action);
	    return null;
	  }
	  return action;
	}
	function resize(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isObject(content)) {
	    logDebug(EMPTY_SIZES, action);
	    return null;
	  }
	  return action;
	}
	function move(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isObject(content)) {
	    logDebug(EMPTY_COORDINATES, action);
	    return null;
	  }
	  return action;
	}
	function remove$1(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  return action;
	}
	function rearrange(action) {
	  if (!hasSelector$1(action)) {
	    return null;
	  }
	  var content = action[CONTENT];
	  if (!isObject(content)) {
	    logDebug(EMPTY_REARRANGE, action);
	    return null;
	  }
	  return action;
	}
	function redirect(action) {
	  var content = action.content;
	  if (isBlank(content)) {
	    logDebug(EMPTY_URL, action);
	    return null;
	  }
	  action.content = createRedirectUrl(content, {});
	  return action;
	}
	function processAction(action) {
	  var type = action[TYPE];
	  if (isBlank(type)) {
	    return null;
	  }
	  switch (type) {
	    case SET_HTML:
	      return setHtml$1(action);
	    case SET_TEXT:
	      return setText$1(action);
	    case APPEND_HTML:
	      return appendHtml(action);
	    case PREPEND_HTML:
	      return prependHtml(action);
	    case REPLACE_HTML:
	      return replaceHtml(action);
	    case INSERT_BEFORE:
	      return insertBefore(action);
	    case INSERT_AFTER:
	      return insertAfter(action);
	    case CUSTOM_CODE:
	      return customCode(action);
	    case SET_ATTRIBUTE:
	      return setAttribute(action);
	    case SET_IMAGE_SOURCE:
	      return setImageSource(action);
	    case SET_STYLE:
	      return setStyle(action);
	    case RESIZE:
	      return resize(action);
	    case MOVE:
	      return move(action);
	    case REMOVE:
	      return remove$1(action);
	    case REARRANGE:
	      return rearrange(action);
	    case REDIRECT:
	      return redirect(action);
	    default:
	      return null;
	  }
	}
	function createActionsOption(option) {
	  var actions = option[CONTENT];
	  if (!isArray(actions)) {
	    return null;
	  }
	  if (isEmpty(actions)) {
	    return null;
	  }
	  var processedActions = filter(notNull$1, map(processAction, actions));
	  if (isEmpty(processedActions)) {
	    return null;
	  }
	  var result = reactorObjectAssign({}, option);
	  result.content = processedActions;
	  return result;
	}

	function getTokens() {
	  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var options = value.options;
	  if (!isArray(options)) {
	    return [];
	  }
	  if (isEmpty(options)) {
	    return [];
	  }
	  return filterNotNil(map(selectResponseTokens, options));
	}
	function getResponseTokens() {
	  var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _response$execute = response.execute,
	      execute = _response$execute === void 0 ? {} : _response$execute,
	      _response$prefetch = response.prefetch,
	      prefetch = _response$prefetch === void 0 ? {} : _response$prefetch;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad,
	      _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var _prefetch$mboxes = prefetch.mboxes,
	      prefetchMboxes = _prefetch$mboxes === void 0 ? [] : _prefetch$mboxes,
	      _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  var pageLoadTokens = getTokens(pageLoad);
	  var mboxesTokens = flatten(map(getTokens, mboxes));
	  var prefetchMboxesTokens = flatten(map(getTokens, prefetchMboxes));
	  var viewsTokens = flatten(map(getTokens, views));
	  return flatten([pageLoadTokens, mboxesTokens, prefetchMboxesTokens, viewsTokens]);
	}

	function getRedirect() {
	  var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _response$execute = response.execute,
	      execute = _response$execute === void 0 ? {} : _response$execute;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad,
	      _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var pageLoadOpts = selectOptions(pageLoad) || [];
	  var mboxesOpts = flatten(filterNotNil(map(selectOptions, mboxes)));
	  var options = flatten([pageLoadOpts, mboxesOpts]);
	  var actions = flatten(map(selectContent, filter(isActions, options)));
	  var redirectOptions = filter(isRedirect, options);
	  var redirectActions = filter(isRedirect, actions);
	  var redirects = redirectOptions.concat(redirectActions);
	  var result = {};
	  if (isEmpty(redirects)) {
	    return result;
	  }
	  var redirect = redirects[0];
	  var url = redirect.content;
	  if (isBlank(url)) {
	    return result;
	  }
	  result.url = url;
	  return result;
	}

	function getAnalytics() {
	  var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var analytics = item.analytics;
	  return isEmpty(analytics) ? [] : [analytics];
	}
	function getAnalyticsDetails() {
	  var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _response$execute = response.execute,
	      execute = _response$execute === void 0 ? {} : _response$execute,
	      _response$prefetch = response.prefetch,
	      prefetch = _response$prefetch === void 0 ? {} : _response$prefetch;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad,
	      _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var _prefetch$mboxes = prefetch.mboxes,
	      prefetchMboxes = _prefetch$mboxes === void 0 ? [] : _prefetch$mboxes,
	      _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  var pageLoadDetails = getAnalytics(pageLoad);
	  var mboxesDetails = flatten(map(getAnalytics, mboxes));
	  var prefetchMboxesDetails = flatten(map(getAnalytics, prefetchMboxes));
	  var viewsDetails = flatten(map(getAnalytics, views));
	  return flatten([pageLoadDetails, mboxesDetails, prefetchMboxesDetails, viewsDetails]);
	}

	function addContextDetails(to, from) {
	  to.parameters = from.parameters;
	  to.profileParameters = from.profileParameters;
	  to.order = from.order;
	  to.product = from.product;
	}
	function addOptionsAndMetrics(result, arr) {
	  var options = arr[0];
	  var metrics = arr[1];
	  var hasOptions = !isEmpty(options);
	  var hasMetrics = !isEmpty(metrics);
	  if (!hasOptions && !hasMetrics) {
	    return result;
	  }
	  if (hasOptions) {
	    result.options = options;
	  }
	  if (hasMetrics) {
	    result.metrics = metrics;
	  }
	  return result;
	}
	function processOption(option) {
	  var type = option.type;
	  switch (type) {
	    case REDIRECT:
	      return resolve$1(createRedirectOption(option));
	    case DYNAMIC:
	      return createHtmlOption(option);
	    case ACTIONS:
	      return resolve$1(createActionsOption(option));
	    default:
	      return resolve$1(option);
	  }
	}
	function processOptions$1(options, predicate) {
	  if (!isArray(options)) {
	    return resolve$1([]);
	  }
	  if (isEmpty(options)) {
	    return resolve$1([]);
	  }
	  var validOptions = filter(predicate, options);
	  if (isEmpty(validOptions)) {
	    return resolve$1([]);
	  }
	  var optionsPromises = map(function (opt) {
	    return processOption(opt);
	  }, validOptions);
	  return all(optionsPromises).then(filterNotNil);
	}
	function processMetrics(metrics, predicate) {
	  if (!isArray(metrics)) {
	    return resolve$1([]);
	  }
	  if (isEmpty(metrics)) {
	    return resolve$1([]);
	  }
	  return resolve$1(filter(predicate, metrics));
	}
	function processPageLoad(httpContext) {
	  var response = httpContext.response;
	  var execute = response.execute;
	  if (!isObject(execute)) {
	    return resolve$1(null);
	  }
	  var pageLoad = execute.pageLoad;
	  if (!isObject(pageLoad)) {
	    return resolve$1(null);
	  }
	  var analytics = pageLoad.analytics,
	      options = pageLoad.options,
	      metrics = pageLoad.metrics;
	  var result = {
	    analytics: analytics
	  };
	  return all([processOptions$1(options, isValidOption), processMetrics(metrics, isValidSelectorMetric)]).then(function (arr) {
	    return addOptionsAndMetrics(result, arr);
	  });
	}
	function processExecuteMbox(item) {
	  var name = item.name,
	      analytics = item.analytics,
	      options = item.options,
	      metrics = item.metrics;
	  var result = {
	    name: name,
	    analytics: analytics
	  };
	  return all([processOptions$1(options, isValidOption), processMetrics(metrics, isValidMetric)]).then(function (arr) {
	    return addOptionsAndMetrics(result, arr);
	  });
	}
	function processExecuteMboxes(httpContext) {
	  var response = httpContext.response;
	  var execute = response.execute;
	  if (!isObject(execute)) {
	    return resolve$1([]);
	  }
	  var mboxes = execute.mboxes;
	  if (!isArray(mboxes) || isEmpty(mboxes)) {
	    return resolve$1([]);
	  }
	  var validMboxes = filter(isValidMbox, mboxes);
	  return all(map(processExecuteMbox, validMboxes)).then(filterNotNil);
	}
	function sameMbox(mbox, index, name) {
	  return mbox.index === index && mbox.name === name;
	}
	function getRequestMbox(request, index, name) {
	  var _request$prefetch = request.prefetch,
	      prefetch = _request$prefetch === void 0 ? {} : _request$prefetch;
	  var _prefetch$mboxes = prefetch.mboxes,
	      mboxes = _prefetch$mboxes === void 0 ? [] : _prefetch$mboxes;
	  if (isEmpty(mboxes)) {
	    return null;
	  }
	  return first(filter(function (item) {
	    return sameMbox(item, index, name);
	  }, mboxes));
	}
	function processPrefetchMbox(request, item) {
	  var index = item.index,
	      name = item.name,
	      state = item.state,
	      analytics = item.analytics,
	      options = item.options,
	      metrics = item.metrics;
	  var requestMbox = getRequestMbox(request, index, name);
	  var result = {
	    name: name,
	    state: state,
	    analytics: analytics
	  };
	  if (!isNil(requestMbox)) {
	    addContextDetails(result, requestMbox);
	  }
	  return all([processOptions$1(options, isValidOptionEventToken), processMetrics(metrics, isValidMetric)]).then(function (arr) {
	    return addOptionsAndMetrics(result, arr);
	  });
	}
	function processPrefetchMboxes(httpContext) {
	  var request = httpContext.request,
	      response = httpContext.response;
	  var prefetch = response.prefetch;
	  if (!isObject(prefetch)) {
	    return resolve$1([]);
	  }
	  var mboxes = prefetch.mboxes;
	  if (!isArray(mboxes) || isEmpty(mboxes)) {
	    return resolve$1([]);
	  }
	  var validMboxes = filter(isValidPrefetchMbox, mboxes);
	  var process = function process(item) {
	    return processPrefetchMbox(request, item);
	  };
	  return all(map(process, validMboxes)).then(filterNotNil);
	}
	function getRequestView(request) {
	  var _request$prefetch2 = request.prefetch,
	      prefetch = _request$prefetch2 === void 0 ? {} : _request$prefetch2;
	  var _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  if (isEmpty(views)) {
	    return null;
	  }
	  return views[0];
	}
	function processView(request, view) {
	  var name = view.name,
	      state = view.state,
	      analytics = view.analytics,
	      options = view.options,
	      metrics = view.metrics;
	  var requestView = getRequestView(request);
	  var result = {
	    name: name.toLowerCase(),
	    state: state,
	    analytics: analytics
	  };
	  if (!isNil(requestView)) {
	    addContextDetails(result, requestView);
	  }
	  return all([processOptions$1(options, isValidOptionEventToken), processMetrics(metrics, isValidSelectorMetric)]).then(function (arr) {
	    return addOptionsAndMetrics(result, arr);
	  });
	}
	function processPrefetchViews(httpContext) {
	  var request = httpContext.request,
	      response = httpContext.response;
	  var prefetch = response.prefetch;
	  if (!isObject(prefetch)) {
	    return resolve$1([]);
	  }
	  var views = prefetch.views;
	  if (!isArray(views) || isEmpty(views)) {
	    return resolve$1([]);
	  }
	  var validViews = filter(isValidView, views);
	  var process = function process(view) {
	    return processView(request, view);
	  };
	  return all(map(process, validViews)).then(filterNotNil);
	}
	function processPrefetchMetrics(httpContext) {
	  var response = httpContext.response;
	  var prefetch = response.prefetch;
	  if (!isObject(prefetch)) {
	    return resolve$1([]);
	  }
	  var metrics = prefetch.metrics;
	  return processMetrics(metrics, isValidSelectorMetric);
	}
	function processMeta(httpContext) {
	  var response = httpContext.response;
	  var remoteMboxes = response.remoteMboxes,
	      remoteViews = response.remoteViews,
	      decisioningMethod = response.decisioningMethod;
	  var meta = {};
	  if (isObject(remoteMboxes)) {
	    meta.remoteMboxes = remoteMboxes;
	  }
	  if (isObject(remoteViews)) {
	    meta.remoteViews = remoteViews;
	  }
	  if (isString(decisioningMethod)) {
	    meta.decisioningMethod = decisioningMethod;
	  }
	  return resolve$1(meta);
	}
	function createResponseContext(arr) {
	  var pageLoad = arr[0];
	  var mboxes = arr[1];
	  var prefetchMboxes = arr[2];
	  var views = arr[3];
	  var prefetchMetrics = arr[4];
	  var meta = arr[5];
	  var result = {};
	  var execute = {};
	  if (isObject(pageLoad)) {
	    execute.pageLoad = pageLoad;
	  }
	  if (!isEmpty(mboxes)) {
	    execute.mboxes = mboxes;
	  }
	  var prefetch = {};
	  if (!isEmpty(prefetchMboxes)) {
	    prefetch.mboxes = prefetchMboxes;
	  }
	  if (!isEmpty(views)) {
	    prefetch.views = views;
	  }
	  if (!isEmpty(prefetchMetrics)) {
	    prefetch.metrics = prefetchMetrics;
	  }
	  if (!isEmpty(execute)) {
	    result.execute = execute;
	  }
	  if (!isEmpty(prefetch)) {
	    result.prefetch = prefetch;
	  }
	  if (!isEmpty(meta)) {
	    result.meta = meta;
	  }
	  return result;
	}
	function processResponse(httpContext) {
	  var handlers = [handleTraces, handleDeviceId, handleEdgeCluster];
	  var context = flow(handlers)(httpContext);
	  var pageLoad = processPageLoad(context);
	  var mboxes = processExecuteMboxes(context);
	  var prefetchMboxes = processPrefetchMboxes(context);
	  var views = processPrefetchViews(context);
	  var prefetchMetrics = processPrefetchMetrics(context);
	  var meta = processMeta(context);
	  var promises = [pageLoad, mboxes, prefetchMboxes, views, prefetchMetrics, meta];
	  return all(promises).then(createResponseContext);
	}

	function hasRedirect(response) {
	  var redirect = getRedirect(response);
	  return !isEmpty(redirect);
	}
	function createEventPayload(response) {
	  var responseTokens = getResponseTokens(response);
	  var payload = {};
	  if (!isEmpty(responseTokens)) {
	    payload.responseTokens = responseTokens;
	  }
	  return payload;
	}

	function handleRequestSuccess(response) {
	  var payload = createEventPayload(response);
	  var analyticsDetails = getAnalyticsDetails(response);
	  if (!isEmpty(analyticsDetails)) {
	    payload.analyticsDetails = analyticsDetails;
	  }
	  logDebug(REQUEST_SUCCEEDED, response);
	  notifyRequestSucceeded(payload, hasRedirect(response));
	  return resolve$1(response);
	}
	function handleMboxRequestSuccess(mbox, response) {
	  var payload = createEventPayload(response);
	  payload.mbox = mbox;
	  logDebug(REQUEST_SUCCEEDED, response);
	  notifyRequestSucceeded(payload, hasRedirect(response));
	  return resolve$1(response);
	}
	function handleRequestError(error) {
	  logWarn(REQUEST_FAILED, error);
	  notifyRequestFailed({
	    error: error
	  });
	  return reject$1(error);
	}
	function handleMboxRequestError(mbox, error) {
	  logWarn(REQUEST_FAILED, error);
	  notifyRequestFailed({
	    mbox: mbox,
	    error: error
	  });
	  return reject$1(error);
	}
	function executeGetOffer(options) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var mbox = options.mbox,
	      timeout = options.timeout;
	  var params = isObject(options.params) ? options.params : {};
	  var successFunc = function successFunc(response) {
	    return handleMboxRequestSuccess(mbox, response);
	  };
	  var errorFunc = function errorFunc(error) {
	    return handleMboxRequestError(mbox, error);
	  };
	  var payload = {};
	  var execute = {};
	  if (mbox === globalMbox) {
	    execute.pageLoad = {};
	  } else {
	    execute.mboxes = [{
	      index: 0,
	      name: mbox
	    }];
	  }
	  payload.execute = execute;
	  var analytics = createAnalytics(mbox, payload);
	  if (!isEmpty(analytics)) {
	    var experienceCloud = {};
	    experienceCloud.analytics = analytics;
	    payload.experienceCloud = experienceCloud;
	  }
	  notifyRequestStart({
	    mbox: mbox
	  });
	  return createAsyncDeliveryRequest(payload, params).then(function (request) {
	    return executeRequest(options, request, timeout);
	  }).then(processResponse).then(successFunc)['catch'](errorFunc);
	}
	function executeGetOffers(options) {
	  var timingGetOffersTotal = perfTool.timeStart(TIMING_GET_OFFER_TOTAL, true);
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var _options$consumerId = options.consumerId,
	      consumerId = _options$consumerId === void 0 ? globalMbox : _options$consumerId,
	      request = options.request,
	      timeout = options.timeout;
	  var analytics = createAnalytics(consumerId, request);
	  var successFunc = function successFunc(response) {
	    return handleRequestSuccess(response);
	  };
	  var errorFunc = function errorFunc(error) {
	    return handleRequestError(error);
	  };
	  if (!isEmpty(analytics)) {
	    var experienceCloud = request.experienceCloud || {};
	    experienceCloud.analytics = analytics;
	    request.experienceCloud = experienceCloud;
	  }
	  notifyRequestStart({});
	  function measurePerf(response) {
	    perfTool.timeEnd(timingGetOffersTotal);
	    return resolve$1(response);
	  }
	  return createAsyncDeliveryRequest(request, {}).then(function (deliveryRequest) {
	    return executeRequest(options, deliveryRequest, timeout);
	  }).then(processResponse).then(measurePerf).then(successFunc)['catch'](errorFunc);
	}

	function addClass(cssClass, selector) {
	  return select(selector).addClass(cssClass);
	}
	function setCss(style, selector) {
	  return select(selector).css(style);
	}

	function getAttr(name, selector) {
	  return select(selector).attr(name);
	}
	function setAttr(name, value, selector) {
	  return select(selector).attr(name, value);
	}
	function removeAttr(name, selector) {
	  return select(selector).removeAttr(name);
	}
	function copyAttr(from, to, selector) {
	  var value = getAttr(from, selector);
	  if (isNotBlank(value)) {
	    removeAttr(from, selector);
	    setAttr(to, value, selector);
	  }
	}
	function hasAttr(name, selector) {
	  return isNotBlank(getAttr(name, selector));
	}

	var VISIBILITY_STATE = "visibilityState";
	var VISIBLE = "visible";
	var DELAY = 100;
	function createError$1(selector) {
	  return new Error("Could not find: " + selector);
	}
	function awaitUsingMutationObserver(selector, timeout, queryFunc) {
	  return create(function (res, rej) {
	    var mo = getMutationObserver(function () {
	      var elems = queryFunc(selector);
	      if (!isEmpty(elems)) {
	        mo.disconnect();
	        res(elems);
	      }
	    });
	    delay(function () {
	      mo.disconnect();
	      rej(createError$1(selector));
	    }, timeout);
	    mo.observe(document, {
	      childList: true,
	      subtree: true
	    });
	  });
	}
	function canUseRequestAnimation() {
	  return document[VISIBILITY_STATE] === VISIBLE;
	}
	function awaitUsingRequestAnimation(selector, timeout, queryFunc) {
	  return create(function (res, rej) {
	    function execute() {
	      var elems = queryFunc(selector);
	      if (!isEmpty(elems)) {
	        res(elems);
	        return;
	      }
	      window.requestAnimationFrame(execute);
	    }
	    execute();
	    delay(function () {
	      rej(createError$1(selector));
	    }, timeout);
	  });
	}
	function awaitUsingTimer(selector, timeout, queryFunc) {
	  return create(function (res, rej) {
	    function execute() {
	      var elems = queryFunc(selector);
	      if (!isEmpty(elems)) {
	        res(elems);
	        return;
	      }
	      delay(execute, DELAY);
	    }
	    execute();
	    delay(function () {
	      rej(createError$1(selector));
	    }, timeout);
	  });
	}
	function awaitSelector(selector) {
	  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getConfig()[SELECTORS_POLLING_TIMEOUT];
	  var queryFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : select;
	  var elems = queryFunc(selector);
	  if (!isEmpty(elems)) {
	    return resolve$1(elems);
	  }
	  if (canUseMutationObserver()) {
	    return awaitUsingMutationObserver(selector, timeout, queryFunc);
	  }
	  if (canUseRequestAnimation()) {
	    return awaitUsingRequestAnimation(selector, timeout, queryFunc);
	  }
	  return awaitUsingTimer(selector, timeout, queryFunc);
	}

	function getDataSrc(item) {
	  return getAttr(DATA_SRC, item);
	}
	function hasDataSrc(item) {
	  return hasAttr(DATA_SRC, item);
	}
	function disableImages(html) {
	  forEach(function (item) {
	    return copyAttr(SRC, DATA_SRC, item);
	  }, toArray(find(IMAGE_TAG, html)));
	  return html;
	}
	function enableImages(html) {
	  forEach(function (item) {
	    return copyAttr(DATA_SRC, SRC, item);
	  }, toArray(find(IMAGE_TAG, html)));
	  return html;
	}
	function loadImage(src) {
	  logDebug(LOADING_IMAGE, src);
	  return getAttr(SRC, setAttr(SRC, src, wrap("<" + IMAGE_TAG + "/>")));
	}
	function loadImages(html) {
	  var elements = filter(hasDataSrc, toArray(find(IMAGE_TAG, html)));
	  if (isEmpty(elements)) {
	    return html;
	  }
	  forEach(loadImage, map(getDataSrc, elements));
	  return html;
	}
	function renderImages(html) {
	  return flow([disableImages, loadImages, enableImages])(html);
	}

	function getUrl(item) {
	  var src = getAttr(SRC, item);
	  return isNotBlank(src) ? src : null;
	}
	function getScriptsUrls(html) {
	  return filter(isNotBlank, map(getUrl, toArray(find(SCRIPT, html))));
	}
	function loadScripts(urls) {
	  return reduce(function (acc, url) {
	    return acc.then(function () {
	      logDebug(REMOTE_SCRIPT, url);
	      addClientTrace({
	        remoteScript: url
	      });
	      return reactorLoadScript(url);
	    });
	  }, resolve$1(), urls);
	}

	function handleRenderingSuccess(action) {
	  return action;
	}
	function handleRenderingError(action, error) {
	  logWarn(UNEXPECTED_ERROR, error);
	  addClientTrace({
	    action: action,
	    error: error
	  });
	  return action;
	}
	function renderHtml(renderFunc, action) {
	  var container = select(action[SELECTOR]);
	  var html = renderImages(fragment(action[CONTENT]));
	  var urls = getScriptsUrls(html);
	  var result;
	  try {
	    result = resolve$1(renderFunc(container, html));
	  } catch (err) {
	    return reject$1(handleRenderingError(action, err));
	  }
	  if (isEmpty(urls)) {
	    return result.then(function () {
	      return handleRenderingSuccess(action);
	    })['catch'](function (error) {
	      return handleRenderingError(action, error);
	    });
	  }
	  return result.then(function () {
	    return loadScripts(urls);
	  }).then(function () {
	    return handleRenderingSuccess(action);
	  })['catch'](function (error) {
	    return handleRenderingError(action, error);
	  });
	}

	var HEAD_TAGS_SELECTOR = SCRIPT_TAG + "," + LINK_TAG + "," + STYLE_TAG;
	function getHeadContent(content) {
	  var container = fragment(content);
	  var result = reduce(function (acc, elem) {
	    acc.push(getHtml(fragment(elem)));
	    return acc;
	  }, [], toArray(find(HEAD_TAGS_SELECTOR, container)));
	  return join("", result);
	}
	function preprocessAction(action) {
	  var result = reactorObjectAssign({}, action);
	  var content = result[CONTENT];
	  if (isBlank(content)) {
	    return result;
	  }
	  var container = select(result[SELECTOR]);
	  if (!is(HEAD_TAG, container)) {
	    return result;
	  }
	  result[TYPE] = APPEND_HTML;
	  result[CONTENT] = getHeadContent(content);
	  return result;
	}
	function addPxIfRequired(value) {
	  var hasPx = value.indexOf("px") === value.length - 2;
	  return hasPx ? value : value + "px";
	}
	function setHtmlRenderFunc(container, html) {
	  return setHtml(getHtml(html), container);
	}
	function setHtml$2(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(setHtmlRenderFunc, action);
	}
	function setText$2(action) {
	  var container = select(action[SELECTOR]);
	  var content = action[CONTENT];
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  setText(content, container);
	  return resolve$1(action);
	}
	function appendHtmlRenderFunc(container, html) {
	  return append(getHtml(html), container);
	}
	function appendHtml$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(appendHtmlRenderFunc, action);
	}
	function prependHtmlRenderFunc(container, html) {
	  return prepend(getHtml(html), container);
	}
	function prependHtml$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(prependHtmlRenderFunc, action);
	}
	function replaceHtmlRenderFunc(container, html) {
	  var parentContainer = parent(container);
	  remove(before(getHtml(html), container));
	  return parentContainer;
	}
	function replaceHtml$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(replaceHtmlRenderFunc, action);
	}
	function insertBeforeRenderFunc(container, html) {
	  return prev(before(getHtml(html), container));
	}
	function insertBefore$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(insertBeforeRenderFunc, action);
	}
	function insertAfterRenderFunc(container, html) {
	  return next(after(getHtml(html), container));
	}
	function insertAfter$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(insertAfterRenderFunc, action);
	}
	function customCodeRenderFunc(container, html) {
	  return parent(before(getHtml(html), container));
	}
	function customCode$1(action) {
	  logDebug(ACTION_RENDERING, action);
	  return renderHtml(customCodeRenderFunc, action);
	}
	function setImageSource$1(action) {
	  var content = action[CONTENT];
	  var container = select(action[SELECTOR]);
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  removeAttr(SRC, container);
	  setAttr(SRC, loadImage(content), container);
	  return resolve$1(action);
	}
	function setAttribute$1(action) {
	  var content = action[CONTENT];
	  var container = select(action[SELECTOR]);
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  forEach(function (value, key) {
	    return setAttr(key, value, container);
	  }, content);
	  return resolve$1(action);
	}
	function setCssWithPriority(container, style, priority) {
	  forEach(function (elem) {
	    forEach(function (value, key) {
	      return elem.style.setProperty(key, value, priority);
	    }, style);
	  }, toArray(container));
	}
	function setStyle$1(action) {
	  var container = select(action[SELECTOR]);
	  var content = action[CONTENT];
	  var priority = content[PRIORITY];
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  if (isBlank(priority)) {
	    setCss(content, container);
	  } else {
	    setCssWithPriority(container, content, priority);
	  }
	  return resolve$1(action);
	}
	function resize$1(action) {
	  var container = select(action[SELECTOR]);
	  var content = action[CONTENT];
	  content[WIDTH] = addPxIfRequired(content[WIDTH]);
	  content[HEIGHT] = addPxIfRequired(content[HEIGHT]);
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  setCss(content, container);
	  return resolve$1(action);
	}
	function move$1(action) {
	  var container = select(action[SELECTOR]);
	  var content = action[CONTENT];
	  content[LEFT] = addPxIfRequired(content[LEFT]);
	  content[TOP] = addPxIfRequired(content[TOP]);
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  setCss(content, container);
	  return resolve$1(action);
	}
	function remove$2(action) {
	  var container = select(action[SELECTOR]);
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  remove(container);
	  return resolve$1(action);
	}
	function rearrange$1(action) {
	  var container = select(action[SELECTOR]);
	  var content = action[CONTENT];
	  var from = content[FROM];
	  var to = content[TO];
	  var elements = toArray(children(container));
	  var elemFrom = elements[from];
	  var elemTo = elements[to];
	  if (!exists$2(elemFrom) || !exists$2(elemTo)) {
	    logDebug(REARRANGE_MISSING, action);
	    return reject$1(action);
	  }
	  logDebug(ACTION_RENDERING, action);
	  addClientTrace({
	    action: action
	  });
	  if (from < to) {
	    after(elemFrom, elemTo);
	  } else {
	    before(elemFrom, elemTo);
	  }
	  return resolve$1(action);
	}
	function executeRenderAction(action) {
	  var processedAction = preprocessAction(action);
	  var type = processedAction[TYPE];
	  switch (type) {
	    case SET_HTML:
	      return setHtml$2(processedAction);
	    case SET_TEXT:
	      return setText$2(processedAction);
	    case APPEND_HTML:
	      return appendHtml$1(processedAction);
	    case PREPEND_HTML:
	      return prependHtml$1(processedAction);
	    case REPLACE_HTML:
	      return replaceHtml$1(processedAction);
	    case INSERT_BEFORE:
	      return insertBefore$1(processedAction);
	    case INSERT_AFTER:
	      return insertAfter$1(processedAction);
	    case CUSTOM_CODE:
	      return customCode$1(processedAction);
	    case SET_ATTRIBUTE:
	      return setAttribute$1(processedAction);
	    case SET_IMAGE_SOURCE:
	      return setImageSource$1(processedAction);
	    case SET_STYLE:
	      return setStyle$1(processedAction);
	    case RESIZE:
	      return resize$1(processedAction);
	    case MOVE:
	      return move$1(processedAction);
	    case REMOVE:
	      return remove$2(processedAction);
	    case REARRANGE:
	      return rearrange$1(processedAction);
	    default:
	      return resolve$1(processedAction);
	  }
	}

	var ACTION_KEY_ATTR = "at-action-key";
	function isClickTracking(action) {
	  return action[TYPE] === TRACK_CLICK || action[TYPE] === SIGNAL_CLICK;
	}
	function hasValidSelector(action) {
	  var selector = action[SELECTOR];
	  return isNotBlank(selector) || isElement(selector);
	}
	function markAsRendered(action) {
	  var key = action.key;
	  if (isBlank(key)) {
	    return;
	  }
	  if (!hasValidSelector(action)) {
	    return;
	  }
	  var selector = action[SELECTOR];
	  setAttr(ACTION_KEY_ATTR, key, selector);
	}
	function removeActionCssHiding(action) {
	  var cssSelector = action[CSS_SELECTOR];
	  if (isBlank(cssSelector)) {
	    return;
	  }
	  removeActionHidingStyle(cssSelector);
	}
	function displayAction(action) {
	  if (!hasValidSelector(action)) {
	    removeActionCssHiding(action);
	    return;
	  }
	  var selector = action[SELECTOR];
	  if (isClickTracking(action)) {
	    addClass(CLICK_TRACKING_CSS_CLASS, selector);
	    return;
	  }
	  addClass(MARKER_CSS_CLASS, selector);
	  removeActionCssHiding(action);
	}
	function displayActions(actions) {
	  forEach(displayAction, actions);
	}
	function shouldRender(action) {
	  var key = action.key;
	  if (isBlank(key)) {
	    return true;
	  }
	  var type = action[TYPE];
	  if (type === CUSTOM_CODE) {
	    return action[PAGE];
	  }
	  var selector = action[SELECTOR];
	  var currentKey = getAttr(ACTION_KEY_ATTR, selector);
	  if (currentKey !== key) {
	    return true;
	  }
	  if (currentKey === key) {
	    return !action[PAGE];
	  }
	  return false;
	}
	function renderAwaitedAction(action) {
	  if (!shouldRender(action)) {
	    displayAction(action);
	    return action;
	  }
	  return executeRenderAction(action).then(function () {
	    logDebug(ACTION_RENDERED, action);
	    addClientTrace({
	      action: action
	    });
	    markAsRendered(action);
	    displayAction(action);
	    return action;
	  })['catch'](function (error) {
	    logWarn(UNEXPECTED_ERROR, error);
	    addClientTrace({
	      action: action,
	      error: error
	    });
	    displayAction(action);
	    var result = reactorObjectAssign({}, action);
	    result[ERROR] = true;
	    return result;
	  });
	}
	function postProcess(actions) {
	  var errorActions = filter(function (e) {
	    return e[ERROR] === true;
	  }, actions);
	  if (isEmpty(errorActions)) {
	    return resolve$1();
	  }
	  displayActions(errorActions);
	  return reject$1(actions);
	}
	function awaitAction(action) {
	  var selector = action[SELECTOR];
	  return awaitSelector(selector).then(function () {
	    return action;
	  })['catch'](function () {
	    var result = reactorObjectAssign({}, action);
	    result[ERROR] = true;
	    return result;
	  });
	}
	function awaitAndRenderAction(action) {
	  return awaitAction(action).then(renderAwaitedAction);
	}
	function executeRenderActions(actions) {
	  var promises = map(awaitAndRenderAction, actions);
	  return all(promises).then(postProcess);
	}

	function addEventListener(type, func, selector) {
	  return select(selector).on(type, func);
	}
	function removeEventListener(type, func, selector) {
	  return select(selector).off(type, func);
	}

	var METRIC_ELEMENT_NOT_FOUND = "metric element not found";
	function executeMetric(metric) {
	  var selector = metric[SELECTOR];
	  return awaitSelector(selector).then(function () {
	    addClientTrace({
	      metric: metric
	    });
	    var foundMetric = reactorObjectAssign({
	      found: true
	    }, metric);
	    return foundMetric;
	  })['catch'](function () {
	    logWarn(METRIC_ELEMENT_NOT_FOUND, metric);
	    addClientTrace({
	      metric: metric,
	      message: METRIC_ELEMENT_NOT_FOUND
	    });
	    return metric;
	  });
	}

	function saveView(view) {
	  var key = view.name;
	  var views = getItem(VIEWS$1) || {};
	  views[key] = view;
	  setItem(VIEWS$1, views);
	}
	function findView(key) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var _options$page = options.page,
	      page = _options$page === void 0 ? true : _options$page;
	  var views = getItem(VIEWS$1) || {};
	  var result = views[key];
	  if (isNil(result)) {
	    return result;
	  }
	  var impressionId = options.impressionId;
	  if (isNil(impressionId)) {
	    return result;
	  }
	  return reactorObjectAssign({
	    page: page,
	    impressionId: impressionId
	  }, result);
	}
	function persistViews(views) {
	  forEach(saveView, views);
	}

	var NAVIGATOR = "navigator";
	var SEND_BEACON = "sendBeacon";
	function executeSendBeacon(win, url, data) {
	  return win[NAVIGATOR][SEND_BEACON](url, data);
	}
	function executeSyncXhr(http, url, data) {
	  var headers = {};
	  headers[CONTENT_TYPE] = [TEXT_PLAIN];
	  var options = {};
	  options[METHOD] = POST$1;
	  options[URL] = url;
	  options[DATA$1] = data;
	  options[CREDENTIALS] = true;
	  options[ASYNC] = false;
	  options[HEADERS] = headers;
	  try {
	    http(options);
	  } catch (error) {
	    return false;
	  }
	  return true;
	}
	function isBeaconSupported(win) {
	  return NAVIGATOR in win && SEND_BEACON in win[NAVIGATOR];
	}
	function sendBeacon(url, data) {
	  if (isBeaconSupported(window)) {
	    return executeSendBeacon(window, url, data);
	  }
	  return executeSyncXhr(xhr, url, data);
	}

	var SEND_BEACON_SUCCESS = "Beacon data sent";
	var SEND_BEACON_ERROR = "Beacon data sent failed";
	var VIEW_TRIGGERED = "View triggered notification";
	var VIEW_RENDERED = "View rendered notification";
	var MBOXES_RENDERED = "Mboxes rendered notification";
	var EVENT_HANDLER = "Event handler notification";
	var MBOX_EVENT_HANDLER = "Mbox event handler notification";
	var VIEW_EVENT_HANDLER = "View event handler notification";
	var PREFETCH_MBOXES = "prefetchMboxes";
	var RENDERED = "rendered";
	var TRIGGERED = "triggered";
	function createRequest(consumerId) {
	  var analytics = createAnalytics(consumerId, {});
	  var request = {
	    context: {
	      beacon: true
	    }
	  };
	  if (!isEmpty(analytics)) {
	    var experienceCloud = {};
	    experienceCloud.analytics = analytics;
	    request.experienceCloud = experienceCloud;
	  }
	  return request;
	}
	function createSyncNotificationRequest(consumerId, params, notifications) {
	  var request = createRequest(consumerId);
	  var result = createSyncDeliveryRequest(request, params);
	  result.notifications = notifications;
	  return result;
	}
	function createAsyncNotificationRequest(consumerId, params, notifications) {
	  var request = createRequest(consumerId);
	  return createAsyncDeliveryRequest(request, params).then(function (result) {
	    result.notifications = notifications;
	    return result;
	  });
	}
	function createNotification(item, type, tokens) {
	  var id = uuid();
	  var timestamp = now();
	  var parameters = item.parameters,
	      profileParameters = item.profileParameters,
	      order = item.order,
	      product = item.product;
	  var result = {
	    id: id,
	    type: type,
	    timestamp: timestamp,
	    parameters: parameters,
	    profileParameters: profileParameters,
	    order: order,
	    product: product
	  };
	  if (isEmpty(tokens)) {
	    return result;
	  }
	  result.tokens = tokens;
	  return result;
	}
	function createMboxNotification(mbox, type, tokens) {
	  var name = mbox.name,
	      state = mbox.state;
	  var notification = createNotification(mbox, type, tokens);
	  notification.mbox = {
	    name: name,
	    state: state
	  };
	  return notification;
	}
	function createViewNotification(view, type, tokens) {
	  var name = view.name,
	      state = view.state;
	  var notification = createNotification(view, type, tokens);
	  notification.view = {
	    name: name,
	    state: state
	  };
	  return notification;
	}
	function executeBeaconNotification(request) {
	  var config = getConfig();
	  var url = createRequestUrl(config);
	  var data = JSON.stringify(request);
	  if (sendBeacon(url, data)) {
	    logDebug(SEND_BEACON_SUCCESS, url, request);
	    return true;
	  }
	  logWarn(SEND_BEACON_ERROR, url, request);
	  return false;
	}
	function sendEventNotification(source, type, token) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var params = getTargetPageParams(globalMbox);
	  var requestDetails = createRequestDetails({}, params);
	  var notification = createNotification(requestDetails, type, [token]);
	  var request = createSyncNotificationRequest(uuid(), params, [notification]);
	  logDebug(EVENT_HANDLER, source, notification);
	  addClientTrace({
	    source: source,
	    event: type,
	    request: request
	  });
	  executeBeaconNotification(request);
	}
	function sendMboxEventNotification(name, type, token) {
	  var params = getTargetPageParams(name);
	  var requestDetails = createRequestDetails({}, params);
	  var notification = createNotification(requestDetails, type, [token]);
	  notification.mbox = {
	    name: name
	  };
	  var request = createSyncNotificationRequest(uuid(), params, [notification]);
	  logDebug(MBOX_EVENT_HANDLER, name, notification);
	  addClientTrace({
	    mbox: name,
	    event: type,
	    request: request
	  });
	  executeBeaconNotification(request);
	}
	function sendMboxesRenderedNotifications(items) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var notifications = [];
	  var type = DISPLAY_EVENT;
	  forEach(function (item) {
	    var mbox = item.mbox,
	        data = item.data;
	    if (isNil(data)) {
	      return;
	    }
	    var _data$eventTokens = data.eventTokens,
	        eventTokens = _data$eventTokens === void 0 ? [] : _data$eventTokens;
	    if (isEmpty(eventTokens)) {
	      return;
	    }
	    notifications.push(createMboxNotification(mbox, type, eventTokens));
	  }, items);
	  if (isEmpty(notifications)) {
	    return;
	  }
	  var request = createSyncNotificationRequest(globalMbox, {}, notifications);
	  logDebug(MBOXES_RENDERED, notifications);
	  addClientTrace({
	    source: PREFETCH_MBOXES,
	    event: RENDERED,
	    request: request
	  });
	  executeBeaconNotification(request);
	}
	function sendViewEventNotification(name, type, token) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var params = getTargetPageParams(globalMbox);
	  var requestDetails = createRequestDetails({}, params);
	  var notification = createNotification(requestDetails, type, [token]);
	  notification.view = {
	    name: name
	  };
	  var request = createSyncNotificationRequest(uuid(), params, [notification]);
	  logDebug(VIEW_EVENT_HANDLER, name, notification);
	  addClientTrace({
	    view: name,
	    event: type,
	    request: request
	  });
	  executeBeaconNotification(request);
	}
	function sendViewTriggeredNotifications(options) {
	  var name = options.viewName,
	      impressionId = options.impressionId;
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var params = getTargetPageParams(globalMbox);
	  var requestDetails = createRequestDetails({}, params);
	  var notification = createNotification(requestDetails, DISPLAY_EVENT, []);
	  notification.view = {
	    name: name
	  };
	  logDebug(VIEW_TRIGGERED, name);
	  createAsyncNotificationRequest(name, params, [notification]).then(function (request) {
	    request.impressionId = impressionId;
	    addClientTrace({
	      view: name,
	      event: TRIGGERED,
	      request: request
	    });
	    executeBeaconNotification(request);
	  });
	}
	function sendViewRenderedNotifications(item) {
	  if (isNil(item)) {
	    return;
	  }
	  var view = item.view,
	      _item$data = item.data,
	      data = _item$data === void 0 ? {} : _item$data;
	  var _data$eventTokens2 = data.eventTokens,
	      eventTokens = _data$eventTokens2 === void 0 ? [] : _data$eventTokens2;
	  if (isEmpty(eventTokens)) {
	    return;
	  }
	  var name = view.name,
	      impressionId = view.impressionId;
	  var persistedView = findView(name);
	  if (isNil(persistedView)) {
	    return;
	  }
	  var notification = createViewNotification(persistedView, DISPLAY_EVENT, eventTokens);
	  var request = createSyncNotificationRequest(name, {}, [notification]);
	  request.impressionId = impressionId;
	  logDebug(VIEW_RENDERED, name, eventTokens);
	  addClientTrace({
	    view: name,
	    event: RENDERED,
	    request: request
	  });
	  executeBeaconNotification(request);
	}

	var CACHE$1 = {};
	var PAGE_LOAD$1 = "pageLoadMetrics";
	var PREFETCH = "prefetchMetrics";
	var selectMetrics = prop(METRICS);
	var createMetricSuccess = function createMetricSuccess() {
	  return createSuccess(METRIC);
	};
	var createMetricError = function createMetricError(error) {
	  return createError(METRIC, error);
	};
	function decorateElementIfRequired(type, selector) {
	  if (type !== CLICK) {
	    return;
	  }
	  addClass(CLICK_TRACKING_CSS_CLASS, selector);
	}
	function isHandlerCached(name, key) {
	  return !isNil(CACHE$1[name]) && !isNil(CACHE$1[name][key]);
	}
	function removePreviousHandlersFromCache(currentViewName, type, selector) {
	  if (!isNil(CACHE$1[currentViewName])) {
	    return;
	  }
	  var viewNames = keys(CACHE$1);
	  if (isEmpty(viewNames)) {
	    return;
	  }
	  forEach(function (viewName) {
	    var handlerNames = keys(CACHE$1[viewName]);
	    forEach(function (handlerName) {
	      var func = CACHE$1[viewName][handlerName];
	      removeEventListener(type, func, selector);
	    }, handlerNames);
	    delete CACHE$1[viewName];
	  }, viewNames);
	}
	function addHandlerToCache(name, key, handler) {
	  CACHE$1[name] = CACHE$1[name] || {};
	  CACHE$1[name][key] = handler;
	}
	function attachEventHandler(name, fromView, metric, notifyFunc) {
	  var type = metric.type,
	      selector = metric.selector,
	      eventToken = metric.eventToken;
	  var key = hash(type + ":" + selector + ":" + eventToken);
	  var handler = function handler() {
	    return notifyFunc(name, type, eventToken);
	  };
	  decorateElementIfRequired(type, selector);
	  if (!fromView) {
	    addEventListener(type, handler, selector);
	    return;
	  }
	  if (isHandlerCached(name, key)) {
	    return;
	  }
	  removePreviousHandlersFromCache(name, type, selector);
	  addHandlerToCache(name, key, handler);
	  addEventListener(type, handler, selector);
	}
	function attachMetricEventHandlers(name, fromView, metrics, notifyFunc) {
	  return all(map(executeMetric, metrics)).then(function (arr) {
	    forEach(function (metric) {
	      return attachEventHandler(name, fromView, metric, notifyFunc);
	    }, filter(function (metric) {
	      return metric.found;
	    }, arr));
	    return createMetricSuccess();
	  })['catch'](createMetricError);
	}
	function executeMboxMetrics(mbox) {
	  var name = mbox.name;
	  return attachMetricEventHandlers(name, false, selectMetrics(mbox), sendMboxEventNotification);
	}
	function executeViewMetrics(view) {
	  var name = view.name;
	  return attachMetricEventHandlers(name, true, selectMetrics(view), sendViewEventNotification);
	}
	function executePageLoadMetrics(pageLoad) {
	  return attachMetricEventHandlers(PAGE_LOAD$1, false, selectMetrics(pageLoad), sendEventNotification);
	}
	function executePrefetchMetrics(prefetch) {
	  return attachMetricEventHandlers(PREFETCH, false, selectMetrics(prefetch), sendEventNotification);
	}

	var selectContent$1 = prop(CONTENT);
	var selectCssSelector = prop(CSS_SELECTOR);
	var createRenderSuccess = function createRenderSuccess(eventToken) {
	  return createSuccess(RENDER, eventToken);
	};
	var createRenderError = function createRenderError(error) {
	  return createError(RENDER, error);
	};
	var hasNonErrorData = function hasNonErrorData(val) {
	  return not(isError)(val) && hasData(val);
	};
	function hideActions(actions) {
	  var items = map(selectCssSelector, actions);
	  injectActionHidingStyles(filterNotBlank(items));
	}
	function hideAllViewsActions(actions) {
	  var items = map(selectCssSelector, actions);
	  injectAllViewsHidingStyle(filterNotNil(items));
	}
	function extractActions(item) {
	  var options = filter(isActions, selectOptions(item));
	  return flatten(map(selectContent$1, options));
	}
	function isValidAction(action) {
	  return isObject(action) && action.type !== SET_JSON;
	}
	function decorateActions(actions, key, page) {
	  return map(function (e) {
	    return reactorObjectAssign({
	      key: key,
	      page: page
	    }, e);
	  }, filter(isValidAction, actions));
	}
	function executeRendering(option, key, page) {
	  var eventToken = option.eventToken,
	      content = option.content;
	  var actions = decorateActions(content, key, page);
	  return executeRenderActions(actions).then(function () {
	    return createRenderSuccess(eventToken);
	  })['catch'](createRenderError);
	}
	function isValidOption$1(option) {
	  return isObject(option) && option.type !== JSON$1;
	}
	function renderOptions(func, item) {
	  return map(func, filter(isValidOption$1, selectOptions(item)));
	}
	function postExecuteRendering(key, item, values) {
	  var result = _defineProperty({
	    status: SUCCESS
	  }, key, item);
	  var errors = map(selectData, filter(isError, values));
	  var data = {};
	  if (!isEmpty(errors)) {
	    result.status = ERROR;
	    data.errors = errors;
	  }
	  if (!isEmpty(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function postPrefetchRendering(key, item, values) {
	  var result = _defineProperty({
	    status: SUCCESS
	  }, key, item);
	  var errors = map(selectData, filter(isError, values));
	  var eventTokens = map(selectData, filter(hasNonErrorData, values));
	  var data = {};
	  if (!isEmpty(errors)) {
	    result.status = ERROR;
	    data.errors = errors;
	  }
	  if (!isEmpty(eventTokens)) {
	    data.eventTokens = eventTokens;
	  }
	  if (!isEmpty(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function renderExecuteItem(item, postRenderingFunc, metricsFunc) {
	  var render = function render(opt) {
	    return executeRendering(opt, true);
	  };
	  var options = renderOptions(render, item);
	  return all(options).then(postRenderingFunc).then(function (result) {
	    metricsFunc(item);
	    return result;
	  });
	}
	function renderPrefetchItem(key, item, page, metricsFunc) {
	  var name = item.name;
	  var render = function render(opt) {
	    return executeRendering(opt, name, page);
	  };
	  var options = renderOptions(render, item);
	  return all(options).then(function (arr) {
	    return postPrefetchRendering(key, item, arr);
	  }).then(function (result) {
	    metricsFunc(item);
	    return result;
	  });
	}
	function renderMbox(mbox) {
	  var postRenderingFunc = function postRenderingFunc(arr) {
	    return postExecuteRendering(MBOX, mbox, arr);
	  };
	  return renderExecuteItem(mbox, postRenderingFunc, executeMboxMetrics);
	}
	function renderPrefetchMbox(mbox) {
	  return renderPrefetchItem(MBOX, mbox, true, executeMboxMetrics);
	}
	function hideOptions(item) {
	  var actions = extractActions(item);
	  hideActions(actions);
	}
	function hidePageLoadOptions(context) {
	  var skipPrehiding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  if (skipPrehiding) {
	    return;
	  }
	  var _context$execute = context.execute,
	      execute = _context$execute === void 0 ? {} : _context$execute;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad;
	  if (!isEmpty(pageLoad)) {
	    hideOptions(pageLoad);
	  }
	}
	function hideAllViews(context) {
	  var _context$prefetch = context.prefetch,
	      prefetch = _context$prefetch === void 0 ? {} : _context$prefetch;
	  var _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  if (isEmpty(views)) {
	    return;
	  }
	  var actions = flatten(map(extractActions, views));
	  hideAllViewsActions(actions);
	}
	function hideViewOptions(view) {
	  var actions = extractActions(view);
	  hideActions(actions);
	  removeAllViewsHidingStyle();
	}
	function renderPageLoad(pageLoad) {
	  var postRenderingFunc = function postRenderingFunc(arr) {
	    return postExecuteRendering(PAGE_LOAD, pageLoad, arr);
	  };
	  return renderExecuteItem(pageLoad, postRenderingFunc, executePageLoadMetrics);
	}
	function renderMboxes(mboxes) {
	  return all(map(renderMbox, mboxes));
	}
	function renderPrefetchMboxes(mboxes) {
	  return all(map(renderPrefetchMbox, mboxes));
	}
	function renderPrefetchMetrics(prefetch) {
	  var metrics = [executePrefetchMetrics(prefetch)];
	  return all(metrics).then(postExecuteRendering);
	}
	function renderView(view) {
	  var page = view.page;
	  return renderPrefetchItem(VIEW, view, page, executeViewMetrics);
	}

	function E() {
	}
	E.prototype = {
	  on: function on(name, callback, ctx) {
	    var e = this.e || (this.e = {});
	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });
	    return this;
	  },
	  once: function once(name, callback, ctx) {
	    var self = this;
	    function listener() {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    }
	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },
	  emit: function emit(name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;
	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }
	    return this;
	  },
	  off: function off(name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];
	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	      }
	    }
	    liveEvents.length ? e[name] = liveEvents : delete e[name];
	    return this;
	  }
	};
	var tinyEmitter = E;
	var TinyEmitter = E;
	tinyEmitter.TinyEmitter = TinyEmitter;

	function create$1() {
	  return new tinyEmitter();
	}
	function publishOn(eventBus, name, args) {
	  eventBus.emit(name, args);
	}
	function subscribeTo(eventBus, name, func) {
	  eventBus.on(name, func);
	}

	var EVENT_BUS = create$1();
	function publish(name, args) {
	  publishOn(EVENT_BUS, name, args);
	}
	function subscribe(name, func) {
	  subscribeTo(EVENT_BUS, name, func);
	}

	function redirect$1(option) {
	  return {
	    type: REDIRECT,
	    content: option.url
	  };
	}
	function setContent(action) {
	  var result = {};
	  result.type = SET_HTML;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setText$3(action) {
	  var result = {};
	  result.type = SET_TEXT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function appendContent(action) {
	  var result = {};
	  result.type = APPEND_HTML;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function prependContent(action) {
	  var result = {};
	  result.type = PREPEND_HTML;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function replaceContent(action) {
	  var result = {};
	  result.type = REPLACE_HTML;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function insertBefore$2(action) {
	  var result = {};
	  result.type = INSERT_BEFORE;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function insertAfter$2(action) {
	  var result = {};
	  result.type = INSERT_AFTER;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function customCode$2(action) {
	  var result = {};
	  result.type = CUSTOM_CODE;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setAttribute$2(action) {
	  var result = {};
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  if (action.attribute === SRC) {
	    result.type = SET_IMAGE_SOURCE;
	    result.content = action.value;
	    return result;
	  }
	  result.type = SET_ATTRIBUTE;
	  var content = {};
	  content[action.attribute] = action.value;
	  result.content = content;
	  return result;
	}
	function setStyle$2(action) {
	  var _action$style = action.style,
	      style = _action$style === void 0 ? {} : _action$style;
	  var result = {};
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  if (!isNil(style.left) && !isNil(style.top)) {
	    result.type = MOVE;
	    result.content = style;
	    return result;
	  }
	  if (!isNil(style.width) && !isNil(style.height)) {
	    result.type = RESIZE;
	    result.content = style;
	    return result;
	  }
	  result.type = SET_STYLE;
	  result.content = style;
	  return result;
	}
	function remove$3(action) {
	  var result = {};
	  result.type = REMOVE;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function rearrange$2(action) {
	  var content = {};
	  content.from = action.from;
	  content.to = action.to;
	  var result = {};
	  result.type = REARRANGE;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  result.content = content;
	  return result;
	}
	function hasSelectors(action) {
	  return isNotBlank(action.selector) && isNotBlank(action.cssSelector);
	}
	function createPageLoad(items) {
	  var result = {};
	  if (isEmpty(items)) {
	    return result;
	  }
	  var options = [];
	  var metrics = [];
	  var actions = [];
	  forEach(function (item) {
	    var type = item.action;
	    switch (type) {
	      case SET_CONTENT:
	        if (hasSelectors(item)) {
	          actions.push(setContent(item));
	        } else {
	          options.push({
	            type: HTML,
	            content: item.content
	          });
	        }
	        break;
	      case SET_JSON:
	        if (!isEmpty(item.content)) {
	          forEach(function (e) {
	            return options.push({
	              type: JSON$1,
	              content: e
	            });
	          }, item.content);
	        }
	        break;
	      case SET_TEXT:
	        actions.push(setText$3(item));
	        break;
	      case APPEND_CONTENT:
	        actions.push(appendContent(item));
	        break;
	      case PREPEND_CONTENT:
	        actions.push(prependContent(item));
	        break;
	      case REPLACE_CONTENT:
	        actions.push(replaceContent(item));
	        break;
	      case INSERT_BEFORE:
	        actions.push(insertBefore$2(item));
	        break;
	      case INSERT_AFTER:
	        actions.push(insertAfter$2(item));
	        break;
	      case CUSTOM_CODE:
	        actions.push(customCode$2(item));
	        break;
	      case SET_ATTRIBUTE:
	        actions.push(setAttribute$2(item));
	        break;
	      case SET_STYLE:
	        actions.push(setStyle$2(item));
	        break;
	      case REMOVE:
	        actions.push(remove$3(item));
	        break;
	      case REARRANGE:
	        actions.push(rearrange$2(item));
	        break;
	      case REDIRECT:
	        options.push(redirect$1(item));
	        break;
	      case TRACK_CLICK:
	        metrics.push({
	          type: CLICK,
	          selector: item.selector,
	          eventToken: item.clickTrackId
	        });
	        break;
	    }
	  }, items);
	  var pageLoad = {};
	  var hasActions = !isEmpty(actions);
	  if (hasActions) {
	    options.push({
	      type: ACTIONS,
	      content: actions
	    });
	  }
	  var hasOptions = !isEmpty(options);
	  if (hasOptions) {
	    pageLoad.options = options;
	  }
	  var hasMetrics = !isEmpty(metrics);
	  if (hasMetrics) {
	    pageLoad.metrics = metrics;
	  }
	  if (isEmpty(pageLoad)) {
	    return result;
	  }
	  var execute = {};
	  execute.pageLoad = pageLoad;
	  result.execute = execute;
	  return result;
	}
	function createMboxes(name, items) {
	  var result = {};
	  if (isEmpty(items)) {
	    return result;
	  }
	  var options = [];
	  var metrics = [];
	  forEach(function (item) {
	    var type = item.action;
	    switch (type) {
	      case SET_CONTENT:
	        options.push({
	          type: HTML,
	          content: item.content
	        });
	        break;
	      case SET_JSON:
	        if (!isEmpty(item.content)) {
	          forEach(function (e) {
	            return options.push({
	              type: JSON$1,
	              content: e
	            });
	          }, item.content);
	        }
	        break;
	      case REDIRECT:
	        options.push(redirect$1(item));
	        break;
	      case SIGNAL_CLICK:
	        metrics.push({
	          type: CLICK,
	          eventToken: item.clickTrackId
	        });
	        break;
	    }
	  }, items);
	  var mbox = {
	    name: name
	  };
	  var hasOptions = !isEmpty(options);
	  if (hasOptions) {
	    mbox.options = options;
	  }
	  var hasMetrics = !isEmpty(metrics);
	  if (hasMetrics) {
	    mbox.metrics = metrics;
	  }
	  if (isEmpty(mbox)) {
	    return result;
	  }
	  var execute = {};
	  var mboxes = [mbox];
	  execute.mboxes = mboxes;
	  result.execute = execute;
	  return result;
	}
	function convertToContext(mbox, items, pageLoadEnabled) {
	  if (pageLoadEnabled) {
	    return createPageLoad(items);
	  }
	  return createMboxes(mbox, items);
	}

	var PAGE_LOAD_RENDERING_FAILED = "Page load rendering failed";
	var MBOXES_RENDERING_FAILED = "Mboxes rendering failed";
	var VIEW_RENDERING_FAILED = "View rendering failed";
	var PREFETCH_RENDERING_FAILED = "Prefetch rendering failed";
	var hasErrors = function hasErrors(items) {
	  return !isEmpty(filter(isError, items));
	};
	function getPageLoadData(pageLoad) {
	  var status = pageLoad.status,
	      data = pageLoad.data;
	  var result = {
	    status: status,
	    pageLoad: true
	  };
	  if (!isNil(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function getMboxData(item) {
	  var status = item.status,
	      mbox = item.mbox,
	      data = item.data;
	  var name = mbox.name;
	  var result = {
	    status: status,
	    mbox: name
	  };
	  if (!isNil(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function getViewData(item) {
	  var status = item.status,
	      view = item.view,
	      data = item.data;
	  var name = view.name;
	  var result = {
	    status: status,
	    view: name
	  };
	  if (!isNil(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function getPrefetchMetricsData(prefetchMetrics) {
	  var status = prefetchMetrics.status,
	      data = prefetchMetrics.data;
	  var result = {
	    status: status,
	    prefetchMetrics: true
	  };
	  if (!isNil(data)) {
	    result.data = data;
	  }
	  return result;
	}
	function handlePageLoad(pageLoad) {
	  if (isNil(pageLoad)) {
	    return [null];
	  }
	  var result = map(getPageLoadData, [pageLoad]);
	  if (hasErrors(result)) {
	    logWarn(PAGE_LOAD_RENDERING_FAILED, pageLoad);
	  }
	  return result;
	}
	function handleMboxes(mboxes) {
	  if (isNil(mboxes)) {
	    return [null];
	  }
	  var result = map(getMboxData, mboxes);
	  if (hasErrors(result)) {
	    logWarn(MBOXES_RENDERING_FAILED, mboxes);
	  }
	  return result;
	}
	function handlePrefetchMboxes(mboxes) {
	  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sendMboxesRenderedNotifications;
	  if (isNil(mboxes)) {
	    return [null];
	  }
	  var result = map(getMboxData, mboxes);
	  if (hasErrors(result)) {
	    logWarn(MBOXES_RENDERING_FAILED, mboxes);
	  }
	  func(mboxes);
	  return result;
	}
	function handleView(item) {
	  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sendViewRenderedNotifications;
	  if (isNil(item)) {
	    return [null];
	  }
	  var result = map(getViewData, [item]);
	  if (hasErrors(result)) {
	    logWarn(VIEW_RENDERING_FAILED, item);
	  }
	  var view = item.view;
	  if (!view.page) {
	    return result;
	  }
	  func(item);
	  return result;
	}
	function handlePrefetchMetrics(prefetchMetrics) {
	  if (isNil(prefetchMetrics)) {
	    return [null];
	  }
	  var result = map(getPrefetchMetricsData, [prefetchMetrics]);
	  if (hasErrors(result)) {
	    logWarn(PREFETCH_RENDERING_FAILED, prefetchMetrics);
	  }
	  return result;
	}
	function handleRenderingSuccess$1(values) {
	  var results = flatten([handlePageLoad(values[0]), handleMboxes(values[1]), handlePrefetchMboxes(values[2]), handlePrefetchMetrics(values[3])]);
	  var nonNull = filter(notNil, results);
	  var errors = filter(isError, nonNull);
	  if (!isEmpty(errors)) {
	    return reject$1(errors);
	  }
	  return resolve$1(nonNull);
	}
	function handleRenderingError$1(err) {
	  return reject$1(err);
	}

	function processOptions$2(selector, item) {
	  if (isEmpty(item)) {
	    return;
	  }
	  var options = item.options;
	  if (isEmpty(options)) {
	    return;
	  }
	  forEach(function (option) {
	    if (option.type !== HTML) {
	      return;
	    }
	    var type = SET_HTML;
	    var content = option.content;
	    option.type = ACTIONS;
	    option.content = [{
	      type: type,
	      selector: selector,
	      content: content
	    }];
	  }, options);
	}
	function processMetrics$1(selector, item) {
	  var metrics = item.metrics;
	  if (isEmpty(metrics)) {
	    return;
	  }
	  var name = item.name;
	  forEach(function (metric) {
	    metric.name = name;
	    metric.selector = metric.selector || selector;
	  }, metrics);
	}
	function createRenderingContext(selector, context) {
	  var result = reactorObjectAssign({}, context);
	  var _result$execute = result.execute,
	      execute = _result$execute === void 0 ? {} : _result$execute,
	      _result$prefetch = result.prefetch,
	      prefetch = _result$prefetch === void 0 ? {} : _result$prefetch;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad,
	      _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var _prefetch$mboxes = prefetch.mboxes,
	      prefetchMboxes = _prefetch$mboxes === void 0 ? [] : _prefetch$mboxes;
	  processOptions$2(selector, pageLoad);
	  forEach(function (elem) {
	    return processOptions$2(selector, elem);
	  }, mboxes);
	  forEach(function (elem) {
	    return processMetrics$1(selector, elem);
	  }, mboxes);
	  forEach(function (elem) {
	    return processOptions$2(selector, elem);
	  }, prefetchMboxes);
	  forEach(function (elem) {
	    return processMetrics$1(selector, elem);
	  }, prefetchMboxes);
	  return result;
	}
	function persistViewsIfPresent(context) {
	  var _context$prefetch = context.prefetch,
	      prefetch = _context$prefetch === void 0 ? {} : _context$prefetch;
	  var _prefetch$views = prefetch.views,
	      views = _prefetch$views === void 0 ? [] : _prefetch$views;
	  if (isEmpty(views)) {
	    return;
	  }
	  persistViews(views);
	}
	function renderContext(context) {
	  var promises = [];
	  var _context$execute = context.execute,
	      execute = _context$execute === void 0 ? {} : _context$execute;
	  var _execute$pageLoad2 = execute.pageLoad,
	      pageLoad = _execute$pageLoad2 === void 0 ? {} : _execute$pageLoad2,
	      _execute$mboxes2 = execute.mboxes,
	      mboxes = _execute$mboxes2 === void 0 ? [] : _execute$mboxes2;
	  if (!isEmpty(pageLoad)) {
	    promises.push(renderPageLoad(pageLoad));
	  } else {
	    promises.push(resolve$1(null));
	  }
	  if (!isEmpty(mboxes)) {
	    promises.push(renderMboxes(mboxes));
	  } else {
	    promises.push(resolve$1(null));
	  }
	  var _context$prefetch2 = context.prefetch,
	      prefetch = _context$prefetch2 === void 0 ? {} : _context$prefetch2;
	  var _prefetch$mboxes2 = prefetch.mboxes,
	      prefetchMboxes = _prefetch$mboxes2 === void 0 ? [] : _prefetch$mboxes2,
	      _prefetch$metrics = prefetch.metrics,
	      metrics = _prefetch$metrics === void 0 ? [] : _prefetch$metrics;
	  if (!isEmpty(prefetchMboxes)) {
	    promises.push(renderPrefetchMboxes(prefetchMboxes));
	  } else {
	    promises.push(resolve$1(null));
	  }
	  if (isArray(metrics) && !isEmpty(metrics)) {
	    promises.push(renderPrefetchMetrics(prefetch));
	  } else {
	    promises.push(resolve$1(null));
	  }
	  removeHidingSnippetStyle();
	  return all(promises).then(handleRenderingSuccess$1)['catch'](handleRenderingError$1);
	}
	function executeRedirect(win, url) {
	  delay(function () {
	    return win.location.replace(url);
	  });
	}
	function retrieveSelector(selector) {
	  if (isNotBlank(selector)) {
	    return selector;
	  }
	  if (isElement(selector)) {
	    return selector;
	  }
	  return HEAD_TAG;
	}
	function showElement(selector) {
	  addClass(MARKER_CSS_CLASS, selector);
	}
	function executeApplyOffer(options) {
	  var mbox = options.mbox,
	      selector = options.selector,
	      actions = options.offer;
	  var config = getConfig();
	  var pageLoadEnabled = mbox === config[GLOBAL_MBOX_NAME];
	  if (isEmpty(actions)) {
	    logDebug(NO_ACTIONS);
	    showElement(selector);
	    removeHidingSnippetStyle();
	    notifyRenderingNoOffers({
	      mbox: mbox
	    });
	    return;
	  }
	  var context = convertToContext(mbox, actions, pageLoadEnabled);
	  var renderingContext = createRenderingContext(selector, context);
	  var redirect = getRedirect(renderingContext);
	  if (!isEmpty(redirect)) {
	    var url = redirect.url;
	    logDebug(REDIRECT_ACTION, redirect);
	    notifyRenderingRedirect({
	      url: url
	    });
	    executeRedirect(window, url);
	    return;
	  }
	  notifyRenderingStart({
	    mbox: mbox
	  });
	  hidePageLoadOptions(renderingContext);
	  renderContext(renderingContext).then(function (execution) {
	    if (isEmpty(execution)) {
	      return;
	    }
	    notifyRenderingSucceeded({
	      mbox: mbox,
	      execution: execution
	    });
	  })['catch'](function (error) {
	    return notifyRenderingFailed({
	      error: error
	    });
	  });
	}
	function executeApplyOffers(options) {
	  var skipPrehiding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var selector = options.selector,
	      response = options.response;
	  if (isEmpty(response)) {
	    logDebug(NO_ACTIONS);
	    showElement(selector);
	    removeHidingSnippetStyle();
	    notifyRenderingNoOffers({});
	    publish(NO_OFFERS_EVENT);
	    return resolve$1();
	  }
	  var renderingContext = createRenderingContext(selector, response);
	  var redirect = getRedirect(renderingContext);
	  if (!isEmpty(redirect)) {
	    var url = redirect.url;
	    logDebug(REDIRECT_ACTION, redirect);
	    notifyRenderingRedirect({
	      url: url
	    });
	    publish(REDIRECT_OFFER_EVENT);
	    executeRedirect(window, url);
	    return resolve$1();
	  }
	  notifyRenderingStart({});
	  persistViewsIfPresent(renderingContext);
	  publish(CACHE_UPDATED_EVENT);
	  hidePageLoadOptions(renderingContext, skipPrehiding);
	  return renderContext(renderingContext).then(function (execution) {
	    if (isEmpty(execution)) {
	      return;
	    }
	    notifyRenderingSucceeded({
	      execution: execution
	    });
	  })['catch'](function (error) {
	    return notifyRenderingFailed({
	      error: error
	    });
	  });
	}

	function hasServerState(config) {
	  var serverState = config[SERVER_STATE];
	  if (isEmpty(serverState)) {
	    return false;
	  }
	  var request = serverState.request,
	      response = serverState.response;
	  if (isEmpty(request)) {
	    return false;
	  }
	  if (isEmpty(response)) {
	    return false;
	  }
	  return true;
	}
	function getServerState(config) {
	  return config[SERVER_STATE];
	}

	var INIT = "[page-init]";
	function handleError$1(error) {
	  logWarn(INIT, VIEW_DELIVERY_ERROR, error);
	  addClientTrace({
	    source: INIT,
	    error: error
	  });
	  removeHidingSnippetStyle();
	}
	function handleSuccess(response) {
	  var skipPrehiding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var options = {
	    selector: HEAD_TAG,
	    response: response
	  };
	  logDebug(INIT, RESPONSE, response);
	  addClientTrace({
	    source: INIT,
	    response: response
	  });
	  executeApplyOffers(options, skipPrehiding)['catch'](handleError$1);
	}
	function scrubServerStateResponse(config, response) {
	  var result = reactorObjectAssign({}, response);
	  var execute = result.execute,
	      prefetch = result.prefetch;
	  var pageLoadEnabled = config[PAGE_LOAD_ENABLED];
	  var viewsEnabled = config[VIEWS_ENABLED];
	  if (execute) {
	    result.execute.mboxes = null;
	  }
	  if (execute && !pageLoadEnabled) {
	    result.execute.pageLoad = null;
	  }
	  if (prefetch) {
	    result.prefetch.mboxes = null;
	  }
	  if (prefetch && !viewsEnabled) {
	    result.prefetch.views = null;
	  }
	  return result;
	}
	function processServerState(config) {
	  var serverState = getServerState(config);
	  var request = serverState.request,
	      response = serverState.response;
	  var skipPrehiding = true;
	  logDebug(INIT, USING_SERVER_STATE);
	  addClientTrace({
	    source: INIT,
	    serverState: serverState
	  });
	  var scrubbedResponse = scrubServerStateResponse(config, response);
	  hidePageLoadOptions(scrubbedResponse);
	  hideAllViews(scrubbedResponse);
	  processResponse({
	    request: request,
	    response: scrubbedResponse
	  }).then(function (res) {
	    return handleSuccess(res, skipPrehiding);
	  })['catch'](handleError$1);
	}
	function initDelivery() {
	  perfTool.timeStart(TIMING_DELIVERY_INIT);
	  if (!isDeliveryEnabled()) {
	    logWarn(INIT, DELIVERY_DISABLED);
	    addClientTrace({
	      source: INIT,
	      error: DELIVERY_DISABLED
	    });
	    perfTool.timeEnd(TIMING_DELIVERY_INIT);
	    return;
	  }
	  var config = getConfig();
	  if (hasServerState(config)) {
	    processServerState(config);
	    perfTool.timeEnd(TIMING_DELIVERY_INIT);
	    return;
	  }
	  bootstrapDecisioningEngine(config, executeBeaconNotification);
	  var pageLoadEnabled = config[PAGE_LOAD_ENABLED];
	  var viewsEnabled = config[VIEWS_ENABLED];
	  if (!pageLoadEnabled && !viewsEnabled) {
	    logDebug(INIT, PAGE_LOAD_DISABLED);
	    addClientTrace({
	      source: INIT,
	      error: PAGE_LOAD_DISABLED
	    });
	    perfTool.timeEnd(TIMING_DELIVERY_INIT);
	    return;
	  }
	  injectHidingSnippetStyle();
	  var request = {};
	  if (pageLoadEnabled) {
	    var execute = {};
	    execute.pageLoad = {};
	    request.execute = execute;
	  }
	  if (viewsEnabled) {
	    var prefetch = {};
	    prefetch.views = [{}];
	    request.prefetch = prefetch;
	  }
	  var timeout = config[TIMEOUT];
	  logDebug(INIT, REQUEST, request);
	  addClientTrace({
	    source: INIT,
	    request: request
	  });
	  var options = {
	    request: request,
	    timeout: timeout
	  };
	  if (!shouldUseOptin() || isTargetApproved()) {
	    executeGetOffers(options).then(handleSuccess)['catch'](handleError$1);
	    perfTool.timeEnd(TIMING_DELIVERY_INIT);
	    return;
	  }
	  fetchOptinPermissions().then(function () {
	    perfTool.timeEnd(TIMING_DELIVERY_INIT);
	    executeGetOffers(options).then(handleSuccess)['catch'](handleError$1);
	  })['catch'](handleError$1);
	}

	function createValid() {
	  var result = {};
	  result[VALID] = true;
	  return result;
	}
	function createInvalid(error) {
	  var result = {};
	  result[VALID] = false;
	  result[ERROR] = error;
	  return result;
	}
	function validateMbox(mbox) {
	  if (isBlank(mbox)) {
	    return createInvalid(MBOX_REQUIRED);
	  }
	  if (mbox.length > MBOX_LENGTH) {
	    return createInvalid(MBOX_TOO_LONG);
	  }
	  return createValid();
	}
	function validateGetOfferOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var mbox = options[MBOX];
	  var mboxValidation = validateMbox(mbox);
	  if (!mboxValidation[VALID]) {
	    return mboxValidation;
	  }
	  if (!isFunction(options[SUCCESS])) {
	    return createInvalid(SUCCESS_REQUIRED);
	  }
	  if (!isFunction(options[ERROR])) {
	    return createInvalid(ERROR_REQUIRED);
	  }
	  return createValid();
	}
	function validateGetOffersOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var request = options.request;
	  if (!isObject(request)) {
	    return createInvalid(REQUEST_REQUIRED);
	  }
	  var execute = request.execute,
	      prefetch = request.prefetch;
	  if (!isObject(execute) && !isObject(prefetch)) {
	    return createInvalid(EXECUTE_OR_PREFETCH_REQUIRED);
	  }
	  return createValid();
	}
	function validateSendNotificationsOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var request = options.request;
	  if (!isObject(request)) {
	    return createInvalid(REQUEST_REQUIRED);
	  }
	  var execute = request.execute,
	      prefetch = request.prefetch,
	      notifications = request.notifications;
	  if (isObject(execute) || isObject(prefetch)) {
	    return createInvalid(EXECUTE_OR_PREFETCH_NOT_ALLOWED);
	  }
	  if (!isArray(notifications)) {
	    return createInvalid(NOTIFICATIONS_REQUIRED);
	  }
	  return createValid();
	}
	function validateApplyOfferOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var mbox = options[MBOX];
	  var mboxValidation = validateMbox(mbox);
	  if (!mboxValidation[VALID]) {
	    return mboxValidation;
	  }
	  var offer = options[OFFER];
	  if (!isArray(offer)) {
	    return createInvalid(OFFER_REQUIRED);
	  }
	  return createValid();
	}
	function validateApplyOffersOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var response = options.response;
	  if (!isObject(response)) {
	    return createInvalid(RESPONE_REQUIRED);
	  }
	  return createValid();
	}
	function validateTrackEventOptions(options) {
	  if (!isObject(options)) {
	    return createInvalid(OPTIONS_REQUIRED);
	  }
	  var mbox = options[MBOX];
	  var mboxValidation = validateMbox(mbox);
	  if (!mboxValidation[VALID]) {
	    return mboxValidation;
	  }
	  return createValid();
	}

	function redirect$2(option) {
	  return {
	    action: REDIRECT,
	    url: option.content
	  };
	}
	function setHtml$3(action) {
	  var result = {};
	  result.action = SET_CONTENT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setText$4(action) {
	  var result = {};
	  result.action = SET_TEXT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function appendHtml$2(action) {
	  var result = {};
	  result.action = APPEND_CONTENT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function prependHtml$2(action) {
	  var result = {};
	  result.action = PREPEND_CONTENT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function replaceHtml$2(action) {
	  var result = {};
	  result.action = REPLACE_CONTENT;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function insertBefore$3(action) {
	  var result = {};
	  result.action = INSERT_BEFORE;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function insertAfter$3(action) {
	  var result = {};
	  result.action = INSERT_AFTER;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function customCode$3(action) {
	  var result = {};
	  result.action = CUSTOM_CODE;
	  result.content = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setAttribute$3(action) {
	  var attribute = keys(action.content)[0];
	  var result = {};
	  result.action = SET_ATTRIBUTE;
	  result.attribute = attribute;
	  result.value = action.content[attribute];
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setImageSource$2(action) {
	  var result = {};
	  result.action = SET_ATTRIBUTE;
	  result.attribute = SRC;
	  result.value = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function setStyle$3(action) {
	  var result = {};
	  result.action = SET_STYLE;
	  result.style = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function resize$2(action) {
	  var result = {};
	  result.action = SET_STYLE;
	  result.style = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function move$2(action) {
	  var result = {};
	  result.action = SET_STYLE;
	  result.style = action.content;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function remove$4(action) {
	  var result = {};
	  result.action = REMOVE;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function rearrange$3(action) {
	  var result = {};
	  result.action = REARRANGE;
	  result.from = action.content.from;
	  result.to = action.content.to;
	  result.selector = action.selector;
	  result.cssSelector = action.cssSelector;
	  return result;
	}
	function processActions(actions) {
	  var result = [];
	  forEach(function (action) {
	    var type = action.type;
	    switch (type) {
	      case SET_HTML:
	        result.push(setHtml$3(action));
	        break;
	      case SET_TEXT:
	        result.push(setText$4(action));
	        break;
	      case APPEND_HTML:
	        result.push(appendHtml$2(action));
	        break;
	      case PREPEND_HTML:
	        result.push(prependHtml$2(action));
	        break;
	      case REPLACE_HTML:
	        result.push(replaceHtml$2(action));
	        break;
	      case INSERT_BEFORE:
	        result.push(insertBefore$3(action));
	        break;
	      case INSERT_AFTER:
	        result.push(insertAfter$3(action));
	        break;
	      case CUSTOM_CODE:
	        result.push(customCode$3(action));
	        break;
	      case SET_ATTRIBUTE:
	        result.push(setAttribute$3(action));
	        break;
	      case SET_IMAGE_SOURCE:
	        result.push(setImageSource$2(action));
	        break;
	      case SET_STYLE:
	        result.push(setStyle$3(action));
	        break;
	      case RESIZE:
	        result.push(resize$2(action));
	        break;
	      case MOVE:
	        result.push(move$2(action));
	        break;
	      case REMOVE:
	        result.push(remove$4(action));
	        break;
	      case REARRANGE:
	        result.push(rearrange$3(action));
	        break;
	      case REDIRECT:
	        result.push(redirect$2(action));
	        break;
	    }
	  }, actions);
	  return result;
	}
	function processMetrics$2(metrics) {
	  if (isEmpty(metrics)) {
	    return [];
	  }
	  var result = [];
	  forEach(function (m) {
	    if (m.type !== CLICK) {
	      return;
	    }
	    if (hasSelector(m)) {
	      result.push({
	        action: TRACK_CLICK,
	        selector: m.selector,
	        clickTrackId: m.eventToken
	      });
	    } else {
	      result.push({
	        action: SIGNAL_CLICK,
	        clickTrackId: m.eventToken
	      });
	    }
	  }, metrics);
	  return result;
	}
	function processItem(item) {
	  if (isEmpty(item)) {
	    return [];
	  }
	  var htmls = [];
	  var jsons = [];
	  var actions = [];
	  var _item$options = item.options,
	      options = _item$options === void 0 ? [] : _item$options,
	      _item$metrics = item.metrics,
	      metrics = _item$metrics === void 0 ? [] : _item$metrics;
	  forEach(function (option) {
	    var type = option.type;
	    switch (type) {
	      case HTML:
	        htmls.push(option.content);
	        break;
	      case JSON$1:
	        jsons.push(option.content);
	        break;
	      case REDIRECT:
	        actions.push(redirect$2(option));
	        break;
	      case ACTIONS:
	        actions.push.apply(actions, processActions(option.content));
	        break;
	    }
	  }, options);
	  if (!isEmpty(htmls)) {
	    actions.push({
	      action: SET_CONTENT,
	      content: htmls.join("")
	    });
	  }
	  if (!isEmpty(jsons)) {
	    actions.push({
	      action: SET_JSON,
	      content: jsons
	    });
	  }
	  var clickActions = processMetrics$2(metrics);
	  if (!isEmpty(clickActions)) {
	    actions.push.apply(actions, clickActions);
	  }
	  return actions;
	}
	function convertToActions(response) {
	  var _response$execute = response.execute,
	      execute = _response$execute === void 0 ? {} : _response$execute;
	  var _execute$pageLoad = execute.pageLoad,
	      pageLoad = _execute$pageLoad === void 0 ? {} : _execute$pageLoad;
	  var _execute$mboxes = execute.mboxes,
	      mboxes = _execute$mboxes === void 0 ? [] : _execute$mboxes;
	  var result = [];
	  result.push.apply(result, processItem(pageLoad));
	  result.push.apply(result, flatten(map(processItem, mboxes)));
	  return result;
	}

	var GET_OFFER = "[getOffer()]";
	function handleRequestSuccess$1(options, response) {
	  var actions = convertToActions(response);
	  options[SUCCESS](actions);
	}
	function handleRequestError$1(options, error) {
	  var status = error[STATUS] || UNKNOWN;
	  options[ERROR](status, error);
	}
	function getOffer(options) {
	  var validationResult = validateGetOfferOptions(options);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(GET_OFFER, error);
	    addClientTrace({
	      source: GET_OFFER,
	      options: options,
	      error: error
	    });
	    return;
	  }
	  if (!isDeliveryEnabled()) {
	    delay(options[ERROR](WARNING, DELIVERY_DISABLED));
	    logWarn(GET_OFFER, DELIVERY_DISABLED);
	    addClientTrace({
	      source: GET_OFFER,
	      options: options,
	      error: DELIVERY_DISABLED
	    });
	    return;
	  }
	  var successFunc = function successFunc(response) {
	    return handleRequestSuccess$1(options, response);
	  };
	  var errorFunc = function errorFunc(err) {
	    return handleRequestError$1(options, err);
	  };
	  logDebug(GET_OFFER, options);
	  addClientTrace({
	    source: GET_OFFER,
	    options: options
	  });
	  if (!shouldUseOptin() || isTargetApproved()) {
	    executeGetOffer(options).then(successFunc)['catch'](errorFunc);
	    return;
	  }
	  fetchOptinPermissions().then(function () {
	    executeGetOffer(options).then(successFunc)['catch'](errorFunc);
	  });
	}

	var GET_OFFERS = "[getOffers()]";
	function getOffers(options) {
	  var validationResult = validateGetOffersOptions(options);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(GET_OFFERS, error);
	    addClientTrace({
	      source: GET_OFFERS,
	      options: options,
	      error: error
	    });
	    return reject$1(validationResult);
	  }
	  if (!isDeliveryEnabled()) {
	    logWarn(GET_OFFERS, DELIVERY_DISABLED);
	    addClientTrace({
	      source: GET_OFFERS,
	      options: options,
	      error: DELIVERY_DISABLED
	    });
	    return reject$1(new Error(DELIVERY_DISABLED));
	  }
	  logDebug(GET_OFFERS, options);
	  addClientTrace({
	    source: GET_OFFERS,
	    options: options
	  });
	  if (!shouldUseOptin() || isTargetApproved()) {
	    return executeGetOffers(options);
	  }
	  return fetchOptinPermissions().then(function () {
	    return executeGetOffers(options);
	  });
	}

	var APPLY_OFFER = "[applyOffer()]";
	function applyOffer(options) {
	  var selector = retrieveSelector(options.selector);
	  var validationResult = validateApplyOfferOptions(options);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(APPLY_OFFER, options, error);
	    addClientTrace({
	      source: APPLY_OFFER,
	      options: options,
	      error: error
	    });
	    showElement(selector);
	    return;
	  }
	  if (!isDeliveryEnabled()) {
	    logWarn(APPLY_OFFER, DELIVERY_DISABLED);
	    addClientTrace({
	      source: APPLY_OFFER,
	      options: options,
	      error: DELIVERY_DISABLED
	    });
	    showElement(selector);
	    return;
	  }
	  options.selector = selector;
	  logDebug(APPLY_OFFER, options);
	  addClientTrace({
	    source: APPLY_OFFER,
	    options: options
	  });
	  executeApplyOffer(options);
	}

	var APPLY_OFFERS = "[applyOffers()]";
	function applyOffers(options) {
	  var selector = retrieveSelector(options.selector);
	  var validationResult = validateApplyOffersOptions(options);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(APPLY_OFFERS, options, error);
	    addClientTrace({
	      source: APPLY_OFFERS,
	      options: options,
	      error: error
	    });
	    showElement(selector);
	    return reject$1(validationResult);
	  }
	  if (!isDeliveryEnabled()) {
	    logWarn(APPLY_OFFERS, DELIVERY_DISABLED);
	    addClientTrace({
	      source: APPLY_OFFERS,
	      options: options,
	      error: DELIVERY_DISABLED
	    });
	    showElement(selector);
	    return reject$1(new Error(DELIVERY_DISABLED));
	  }
	  options.selector = selector;
	  logDebug(APPLY_OFFERS, options);
	  addClientTrace({
	    source: APPLY_OFFERS,
	    options: options
	  });
	  return executeApplyOffers(options);
	}

	var SEND_NOTIFICATIONS = "[sendNotifications()]";
	function sendNotifications(options) {
	  var config = getConfig();
	  var globalMbox = config[GLOBAL_MBOX_NAME];
	  var _options$consumerId = options.consumerId,
	      consumerId = _options$consumerId === void 0 ? globalMbox : _options$consumerId,
	      request = options.request;
	  var validationResult = validateSendNotificationsOptions(options);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(SEND_NOTIFICATIONS, error);
	    addClientTrace({
	      source: SEND_NOTIFICATIONS,
	      options: options,
	      error: error
	    });
	    return;
	  }
	  if (!isDeliveryEnabled()) {
	    logWarn(SEND_NOTIFICATIONS, DELIVERY_DISABLED);
	    addClientTrace({
	      source: SEND_NOTIFICATIONS,
	      options: options,
	      error: DELIVERY_DISABLED
	    });
	    return;
	  }
	  logDebug(SEND_NOTIFICATIONS, options);
	  addClientTrace({
	    source: SEND_NOTIFICATIONS,
	    options: options
	  });
	  var notifications = request.notifications;
	  var notificationsRequest = createSyncNotificationRequest(consumerId, {}, notifications);
	  if (shouldUseOptin() && !isTargetApproved()) {
	    logWarn(SEND_NOTIFICATIONS, ERROR_TARGET_NOT_OPTED_IN);
	    return;
	  }
	  executeBeaconNotification(notificationsRequest);
	}

	var TRACK_EVENT = "[trackEvent()]";
	function normalizeOptions(config, options) {
	  var mbox = options[MBOX];
	  var result = reactorObjectAssign({}, options);
	  var optsParams = isObject(options.params) ? options.params : {};
	  result[PARAMS] = reactorObjectAssign({}, getTargetPageParams(mbox), optsParams);
	  result[TIMEOUT] = getTimeout(config, options[TIMEOUT]);
	  result[SUCCESS] = isFunction(options[SUCCESS]) ? options[SUCCESS] : noop;
	  result[ERROR] = isFunction(options[ERROR]) ? options[ERROR] : noop;
	  return result;
	}
	function shouldTrackBySelector(options) {
	  var type = options[TYPE];
	  var selector = options[SELECTOR];
	  return isNotBlank(type) && (isNotBlank(selector) || isElement(selector));
	}
	function trackImmediateInternal(options) {
	  var mbox = options.mbox;
	  var optsParams = isObject(options.params) ? options.params : {};
	  var params = reactorObjectAssign({}, getTargetPageParams(mbox), optsParams);
	  var type = DISPLAY_EVENT;
	  var requestDetails = createRequestDetails({}, params);
	  var notification = createNotification(requestDetails, type, []);
	  notification.mbox = {
	    name: mbox
	  };
	  var request = createSyncNotificationRequest(mbox, params, [notification]);
	  if (executeBeaconNotification(request)) {
	    logDebug(TRACK_EVENT_SUCCESS, options);
	    options[SUCCESS]();
	    return;
	  }
	  logWarn(TRACK_EVENT_ERROR, options);
	  options[ERROR](UNKNOWN, TRACK_EVENT_ERROR);
	}
	function trackImmediate(options) {
	  if (shouldUseOptin() && !isTargetApproved()) {
	    logWarn(TRACK_EVENT_ERROR, ERROR_TARGET_NOT_OPTED_IN);
	    options[ERROR](ERROR, ERROR_TARGET_NOT_OPTED_IN);
	    return;
	  }
	  trackImmediateInternal(options);
	}
	function handleEvent(options) {
	  trackImmediate(options);
	  return !options.preventDefault;
	}
	function trackBySelector(options) {
	  var selector = options[SELECTOR];
	  var type = options[TYPE];
	  var elements = toArray(select(selector));
	  var onEvent = function onEvent() {
	    return handleEvent(options);
	  };
	  forEach(function (element) {
	    return addEventListener(type, onEvent, element);
	  }, elements);
	}
	function trackEvent(opts) {
	  var validationResult = validateTrackEventOptions(opts);
	  var error = validationResult[ERROR];
	  if (!validationResult[VALID]) {
	    logWarn(TRACK_EVENT, error);
	    addClientTrace({
	      source: TRACK_EVENT,
	      options: opts,
	      error: error
	    });
	    return;
	  }
	  var config = getConfig();
	  var options = normalizeOptions(config, opts);
	  if (!isDeliveryEnabled()) {
	    logWarn(TRACK_EVENT, DELIVERY_DISABLED);
	    delay(options[ERROR](WARNING, DELIVERY_DISABLED));
	    addClientTrace({
	      source: TRACK_EVENT,
	      options: opts,
	      error: DELIVERY_DISABLED
	    });
	    return;
	  }
	  logDebug(TRACK_EVENT, options);
	  addClientTrace({
	    source: TRACK_EVENT,
	    options: options
	  });
	  if (shouldTrackBySelector(options)) {
	    trackBySelector(options);
	    return;
	  }
	  trackImmediate(options);
	}

	var TRIGGER_VIEW = "[triggerView()]";
	var TASKS = [];
	var LOADING = 0;
	var LOADED = 1;
	var STATE = LOADING;
	function executeApplyOffersForView(view) {
	  hideViewOptions(view);
	  return renderView(view).then(handleView).then(function (execution) {
	    if (isEmpty(execution)) {
	      return;
	    }
	    notifyRenderingSucceeded({
	      execution: execution
	    });
	  })['catch'](function (error) {
	    logWarn(RENDERING_VIEW_FAILED, error);
	    notifyRenderingFailed({
	      error: error
	    });
	  });
	}
	function processTriggeredViews() {
	  while (TASKS.length > 0) {
	    var triggeredView = TASKS.pop();
	    var viewName = triggeredView.viewName;
	    var persistedView = findView(viewName, triggeredView);
	    if (!isNil(persistedView)) {
	      executeApplyOffersForView(persistedView);
	    }
	  }
	}
	function processResponseEvents() {
	  STATE = LOADED;
	  processTriggeredViews();
	}
	function setupListeners() {
	  subscribe(CACHE_UPDATED_EVENT, processResponseEvents);
	  subscribe(NO_OFFERS_EVENT, processResponseEvents);
	  subscribe(REDIRECT_OFFER_EVENT, processResponseEvents);
	}
	function getTriggerViewOptions(viewName, opts) {
	  var result = {};
	  result.viewName = viewName;
	  result.impressionId = uuid();
	  result.page = true;
	  if (!isEmpty(opts)) {
	    result.page = !!opts.page;
	  }
	  return result;
	}
	function handleTriggeredView(options) {
	  handleAuthoringTriggeredView(options);
	  var viewName = options.viewName;
	  var persistedView = findView(viewName, options);
	  if (isNil(persistedView) && options.page) {
	    sendViewTriggeredNotifications(options);
	  }
	  TASKS.push(options);
	  if (STATE !== LOADED) {
	    return;
	  }
	  processTriggeredViews();
	}
	function triggerView(value, opts) {
	  if (!isString(value) || isBlank(value)) {
	    logWarn(TRIGGER_VIEW, VIEW_NAME_ERROR, value);
	    addClientTrace({
	      source: TRIGGER_VIEW,
	      view: value,
	      error: VIEW_NAME_ERROR
	    });
	    return;
	  }
	  var viewName = value.toLowerCase();
	  var options = getTriggerViewOptions(viewName, opts);
	  logDebug(TRIGGER_VIEW, viewName, options);
	  addClientTrace({
	    source: TRIGGER_VIEW,
	    view: viewName,
	    options: options
	  });
	  handleTriggeredView(options);
	}
	setupListeners();

	var COMMON_MBOX_WARN = "function has been deprecated. Please use getOffer() and applyOffer() functions instead.";
	var REGISTER_EXTENSION_WARN = "adobe.target.registerExtension() function has been deprecated. Please review the documentation for alternatives.";
	var MBOX_CREATE_WARN = "mboxCreate() " + COMMON_MBOX_WARN;
	var MBOX_DEFINE_WARN = "mboxDefine() " + COMMON_MBOX_WARN;
	var MBOX_UPDATE_WARN = "mboxUpdate() " + COMMON_MBOX_WARN;
	function registerExtension() {
	  logWarn(REGISTER_EXTENSION_WARN, arguments);
	}
	function mboxCreate() {
	  logWarn(MBOX_CREATE_WARN, arguments);
	}
	function mboxDefine() {
	  logWarn(MBOX_DEFINE_WARN, arguments);
	}
	function mboxUpdate() {
	  logWarn(MBOX_UPDATE_WARN, arguments);
	}

	var GET_ATTRIBUTES = "[getAttributes()]";
	function getAttributes(mboxNames) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  logDebug(GET_ATTRIBUTES, options);
	  var requestOptions = reactorObjectAssign({}, options, {
	    request: addMboxesToRequest(mboxNames, options.request || EMPTY_REQUEST, "execute")
	  });
	  return getOffers(requestOptions).then(function (response) {
	    var result = AttributesProvider({
	      request: requestOptions.request,
	      response: response
	    });
	    result.getResponse = function () {
	      return response;
	    };
	    return result;
	  });
	}

	perfTool.timeStart(TIMING_ATJS_INIT);
	function overridePublicApi(win) {
	  win.adobe = win.adobe || {};
	  win.adobe.target = {
	    VERSION: "",
	    event: {},
	    getAttributes: noopPromise,
	    getOffer: noop,
	    getOffers: noopPromise,
	    applyOffer: noop,
	    applyOffers: noopPromise,
	    sendNotifications: noop,
	    trackEvent: noop,
	    triggerView: noop,
	    registerExtension: noop,
	    init: noop
	  };
	  win.mboxCreate = noop;
	  win.mboxDefine = noop;
	  win.mboxUpdate = noop;
	}
	function init(win, doc, settings) {
	  if (win.adobe && win.adobe.target && typeof win.adobe.target.getOffer !== "undefined") {
	    logWarn(ALREADY_INITIALIZED);
	    return;
	  }
	  initConfig(settings);
	  var config = getConfig();
	  var version = config[VERSION];
	  win.adobe.target.VERSION = version;
	  win.adobe.target.event = {
	    LIBRARY_LOADED: LIBRARY_LOADED,
	    REQUEST_START: REQUEST_START,
	    REQUEST_SUCCEEDED: REQUEST_SUCCEEDED$1,
	    REQUEST_FAILED: REQUEST_FAILED$1,
	    CONTENT_RENDERING_START: CONTENT_RENDERING_START,
	    CONTENT_RENDERING_SUCCEEDED: CONTENT_RENDERING_SUCCEEDED,
	    CONTENT_RENDERING_FAILED: CONTENT_RENDERING_FAILED,
	    CONTENT_RENDERING_NO_OFFERS: CONTENT_RENDERING_NO_OFFERS,
	    CONTENT_RENDERING_REDIRECT: CONTENT_RENDERING_REDIRECT,
	    ARTIFACT_DOWNLOAD_SUCCEEDED: ARTIFACT_DOWNLOAD_SUCCEEDED,
	    ARTIFACT_DOWNLOAD_FAILED: ARTIFACT_DOWNLOAD_FAILED,
	    GEO_LOCATION_UPDATED: GEO_LOCATION_UPDATED
	  };
	  if (!config[ENABLED]) {
	    overridePublicApi(win);
	    logWarn(DELIVERY_DISABLED);
	    return;
	  }
	  initTraces();
	  initAuthoringCode();
	  initQaMode(win);
	  initPreviewMode(win);
	  initDelivery();
	  win.adobe.target.getAttributes = getAttributes;
	  win.adobe.target.getOffer = getOffer;
	  win.adobe.target.getOffers = getOffers;
	  win.adobe.target.applyOffer = applyOffer;
	  win.adobe.target.applyOffers = applyOffers;
	  win.adobe.target.sendNotifications = sendNotifications;
	  win.adobe.target.trackEvent = trackEvent;
	  win.adobe.target.triggerView = triggerView;
	  win.adobe.target.registerExtension = registerExtension;
	  win.mboxCreate = mboxCreate;
	  win.mboxDefine = mboxDefine;
	  win.mboxUpdate = mboxUpdate;
	  win.perfTool = perfTool;
	  notifyLibraryLoaded();
	  perfTool.timeEnd(TIMING_ATJS_INIT);
	}
	var bootstrap = {
	  init: init
	};

	return bootstrap;

}());
window.adobe.target.init(window, document, {
  "clientCode": "${clientCode}",
  "imsOrgId": "${imsOrgId}",
  "serverDomain": "${serverDomain}",
  "timeout": Number("${timeout}"),
  "globalMboxName": "${globalMboxName}",
  "version": "2.5.0",
  "defaultContentHiddenStyle": "visibility: hidden;",
  "defaultContentVisibleStyle": "visibility: visible;",
  "bodyHiddenStyle": "body {opacity: 0 !important}",
  "bodyHidingEnabled": true,
  "deviceIdLifetime": 63244800000,
  "sessionIdLifetime": 1860000,
  "selectorsPollingTimeout": 5000,
  "visitorApiTimeout": 2000,
  "overrideMboxEdgeServer": true,
  "overrideMboxEdgeServerTimeout": 1860000,
  "optoutEnabled": false,
  "optinEnabled": false,
  "secureOnly": false,
  "supplementalDataIdParamTimeout": 30,
  "authoringScriptUrl": "//cdn.tt.omtrdc.net/cdn/target-vec.js",
  "urlSizeLimit": 2048,
  "endpoint": "/rest/v1/delivery",
  "pageLoadEnabled": String("${globalMboxAutoCreate}") === "true",
  "viewsEnabled": true,
  "analyticsLogging": "server_side",
  "serverState": {},
  "decisioningMethod": "${decisioningMethod}",
  "legacyBrowserSupport": false
}
);
