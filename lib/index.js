/*
 * index.js: Top-level include for the `utile` module.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var fs = require('fs'),
    path = require('path');

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

exports.find = function (object, iterator) {
  for( var key in object) {
    var value = object[key];
    if(iterator(value, key))
      return value;
  }
};

// get an item from deep down inside an object

exports.path = function (object, path) {

  for (var i in path) {
    //== is intended here. do not change to ===
    if(object == null) return undefined;
    var key = path[i];
    object = object[key];
  }
  return object;
};

//
// given an object, set value at path, creating objects if necessary.
//

exports.createPath = function (object, path, value) {
  
  for (var i in path) {
    var key = path[i];
    if(!object[key]) object[key] = ((+i + 1 == path.length) ? value : {});
    object = object[key];
  }
}

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
// #### @test {function} test applied to each property. `function (value, key, object)`
// filters the properties that `test` returns true on.
//

exports.filter = function (obj, test) {
  var n = Array.isArray(obj) ? [] : {};
  exports.each(obj, function (v, k) {
    if (test(v, k, obj)) {
      n[k] = v;
    }
  });
  
  return n;
};

//
// readJSONFile
//

exports.readJSONFile = function (file, callback) {
  if ('function' != typeof callback)
    throw new Error('readJSONFile needs a callback');
  fs.readFile(file, 'utf-8', function (err, json) {
    if (err)
      return callback (err);
    var obj;
    try {
      obj = JSON.parse(json);
    } catch (err) {
      return callback(err);
    }
    callback(null, obj);
    });
};

// Sync version of readJSONFile
exports.readJSONFileSync = function (file) {
  var fs = require('fs');

  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

exports.requireDirectory = function (directory) {
  var result = {},
      files = fs.readdirSync(directory);

  files.forEach(function (file) {
    if (file.substr(-3) == '.js') {
      file = file.substr(0, file.length - 3);
    }
    result[file] = require(path.resolve(directory, file));
  });
  return result;
};

//
// Extend the `utile` object with all methods from the
// core node `util` methods
//
utile.mixin(utile, require('util'));

