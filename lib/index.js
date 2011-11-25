/*
 * index.js: Top-level include for the `utile` module.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var utile = exports;

//
// @async {Object}
// Simple wrapper to `require('async')`.
//
utile.__defineGetter__('async', function () {
  return require('async');
});

//
// ### function mkdirp
// Simple wrapper to `require('mkdirp')`
//
utile.__defineGetter__('mkdirp', function () {
  return require('mkdirp');
});

//
// ### function rimraf
// Simple wrapper to `require('rimraf')`
//
utile.__defineGetter__('rimraf', function () {
  return require('rimraf');
});

//
// ### function cpr
// Simple wrapper to `require('ncp').ncp`
//
utile.__defineGetter__('cpr', function () {
  return require('ncp').ncp;
});

//
// ### @read {Object}
// Lazy-loaded `read` module
//
utile.__defineGetter__('read', function () {
  return require('./read');
});

//
// ### function each (obj, iterator)
// #### @obj {Object} Object to iterate over
// #### @iterator {function} Continuation to use on each key. `function (value, key, object)`
// Iterate over the keys of an object.
//
exports.each = function (obj, iterator) {
  Object.keys(obj).forEach(function (key) {
    iterator(obj[key], key, obj);
  });
};

//
// ### function find (o)
//
//
exports.find = function (obj, pred) {
  var value, key;

  for (key in obj) {
    value = obj[key];
    if (pred(value, key)) {
      return value;
    }
  }
};

//
// ### function createPath (obj, path, value)
// ### @obj {Object} Object to insert value into
// ### @path {Array} List of nested keys to insert value at
// Retreives a value from given Object, `obj`, located at the
// nested keys, `path`.
//
utile.path = function (obj, path) {
  var key, i;
  
  for (i in path) {
    if (typeof obj === 'undefined') {
      return undefined;
    }
    
    key = path[i];
    obj = obj[key];
  }
  
  return obj;
};

//
// ### function createPath (obj, path, value)
// ### @obj {Object} Object to insert value into
// ### @path {Array} List of nested keys to insert value at
// ### @value {*} Value to insert into the object.
// Inserts the `value` into the given Object, `obj`, creating
// any keys in `path` along the way if necessary.
//
utile.createPath = function (obj, path, value) {
  var key, i;
  
  for (i in path) {
    key = path[i];
    if (!obj[key]) {
      obj[key] = ((+i + 1 === path.length) ? value : {});
    }
    
    obj = obj[key];
  }
};

//
// ### function mixin (target [source0, source1, ...])
// Copies enumerable properties from `source0 ... sourceN`
// onto `target` and returns the resulting object.
//
utile.mixin = function (target) {
  var objs = Array.prototype.slice.call(arguments, 1);
  objs.forEach(function (o) {
    Object.keys(o).forEach(function (attr) {
      if (!o.__lookupGetter__(attr)) {
        target[attr] = o[attr];
      }
    });
  });
  return target;
};

//
// ### function clone (object)
// #### @object {Object} Object to clone
// Shallow clones the specified object.
//
utile.clone = function (object) {
  return Object.keys(object).reduce(function (obj, k) {
    obj[k] = object[k];
    return obj;
  }, {});
};

//
// ### function capitalize (str)
// #### @str {string} String to capitalize
// Capitalizes the specified `str`.
//
utile.capitalize = function (str) {
  return str && str[0].toUpperCase() + str.slice(1);
};

//
// ### function randomString (length)
// #### @length {integer} The number of bits for the random base64 string returned to contain
// randomString returns a pseude-random ASCII string (subset)
// the return value is a string of length ⌈bits/6⌉ of characters
// from the base64 alphabet.
//
utile.randomString = function (length) {
  var chars, rand, i, ret, mod, bits;

  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  ret = '';
  // standard 4
  mod = 4;
  // default is 16
  bits = length * mod || 64;

  // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
  while (bits > 0) {
    // 32-bit integer
    rand = Math.floor(Math.random() * 0x100000000);
    //we use the top bits
    for (i = 26; i > 0 && bits > 0; i -= mod, bits -= mod) {
      ret += chars[0x3F & rand >>> i];
    }
  }

  return ret;
};

//
// ### function filter (object, test)
// #### @obj {Object} Object to iterate over
// #### @pred {function} Predicate applied to each property. `function (value, key, object)`
// Returns an object with properties from `obj` which satisfy
// the predicate `pred`
//
exports.filter = function (obj, pred) {
  var copy = Array.isArray(obj) ? [] : {};
  exports.each(obj, function (val, key) {
    if (pred(val, key, obj)) {
      copy[key] = val;
    }
  });
  
  return copy;
};

//
// Extend the `utile` object with all methods from the
// core node `util` methods
//
utile.mixin(utile, require('util'));
