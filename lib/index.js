/*
 * index.js: Top-level include for the `utile` module.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */
 
var common = exports;

//
// @async {Object}
// Simple wrapper to `require('async')`.
//
common.__defineGetter__('async', function () {
  return require('async');
});

//
// ### function mkdirp
// Simple wrapper to `require('mkdirp')`
//
common.__defineGetter__('mkdirp', function () {
  return require('mkdirp');
});

//
// ### function rimraf
// Simple wrapper to `require('rimraf')`
//
common.__defineGetter__('rimraf', function () {
  return require('rimraf');
});

//
// ### function cpr
// Simple wrapper to `require('ncp').ncp`
//
common.__defineGetter__('cpr', function () {
  return require('ncp').ncp;
});

//
// ### @read {Object}
// Lazy-loaded `read` module
//
common.__defineGetter__('read', function () {
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
// ### function mixin (target [source0, source1, ...])
// Copies enumerable properties from `source0 ... sourceN`
// onto `target` and returns the resulting object.
//
common.mixin = function (target) {
  var objs = Array.prototype.slice.call(arguments, 1);
  objs.forEach(function (o) {
    Object.keys(o).forEach(function (attr) {
      if (! o.__lookupGetter__(attr)) {
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
common.clone = function (object) {
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
common.capitalize = function (str) {
  return str && str[0].toUpperCase() + str.slice(1);
};

//
// ### function randomString (bits)
// #### @bits {integer} The number of bits for the random base64 string returned to contain
// randomString returns a pseude-random ASCII string which contains at least the specified number of bits of entropy
// the return value is a string of length ⌈bits/6⌉ of characters from the base64 alphabet
//
common.randomString = function (bits) {
  var chars, rand, i, ret;

  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  ret = '';

  // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
  while (bits > 0) {
    // 32-bit integer
    rand = Math.floor(Math.random() * 0x100000000);
    // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
    for (i = 26; i > 0 && bits > 0; i -= 6, bits -= 6) {
      ret += chars[0x3F & rand >>> i];
    }
  }

  return ret;
};