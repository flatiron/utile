/*
 * function-args-test.js: Tests for `args` method
 *
 * (C) 2012, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    path = require('path'),
    vows = require('vows'),
    macros = require('./helpers/macros'),
    utile = require('../');

vows.describe('utile/args').addBatch({
  'When using utile': {
    'the `args` function': {
      topic: utile,
      'should be a function': function (_utile) {
        assert.isFunction(_utile.args);
      },
    }
  },
  'util.args() with no arguments': {
    topic: function () {
      var result = utile.args();
      this.callback(null, result);
    },
    'should return an empty object': function (err, result) {
      assert.isNull(err);
      assert.isUndefined(result.callback);
      assert.isObject(result);
    }
  },
  'util.args() with simple arguments': {
    topic: function () {
      var that = this;
      (function () {
        var result = utile.args(arguments);
        that.callback(null, result);
      })("a", "b", "c", function () { 
        return 'ok';
      })
    },
    'should return an array with three items': function (err, result) {
      assert.isNull(err);
      assert.isArray(result.array);
      assert.equal(3, result.array.length);
    },
    'should return lookup helpers': function (err, result) {
      assert.isNull(err);
      assert.isObject(result);
      assert.equal(result.last, "c");
      assert.isFunction(result.callback);
      assert.isFunction(result.cb);
    }
  }
}).export(module);