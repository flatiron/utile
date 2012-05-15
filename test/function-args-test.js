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
      assert.isArray(result);
    }
  },
  'util.args() with simple arguments': {
    topic: function () {
      var that = this;
      (function () {
        var result = utile.args(arguments);
        that.callback(null, result);
      })('a', 'b', 'c', function () { 
        return 'ok';
      })
    },
    'should return an array with three items': function (err, result) {
      assert.isNull(err);
      assert.isArray(result);
      assert.equal(3, result.length);
      assert.equal(result[0], 'a');
      assert.equal(result[1], 'b');
      assert.equal(result[2], 'c');
      
      //
      // Ensure that the Array returned
      // by `utile.args()` enumerates correctly
      //
      var length = 0;
      result.forEach(function (item) {
        length++;
      });
      
      assert.equal(length, 3);
    },
    'should return lookup helpers': function (err, result) {
      assert.isNull(err);
      assert.isArray(result);
      assert.equal(result.first, 'a');
      assert.equal(result.last, 'c');
      assert.isFunction(result.callback);
      assert.isFunction(result.cb);
    }
  }
}).export(module);