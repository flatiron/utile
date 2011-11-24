/*
 * require-directory-test.js: Tests for `requireDir` and `requireDirLazily`
 * methods.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    path = require('path'),
    vows = require('vows'),
    macros = require('./helpers/macros'),
    utile = require('../');

var requireFixtures = path.join(__dirname, 'fixtures', 'require-directory');

vows.describe('utile/require-directory').addBatch({
  'When using utile': {
    'the `requireDir()` function': {
      topic: utile.requireDir(requireFixtures),
      'should contain all wanted modules': macros.assertDirectoryRequired
    },
    'the `requireDirLazily()` function': {
      topic: utile.requireDirLazily(requireFixtures),
      'should contain all wanted modules': macros.assertDirectoryRequired,
      'all properties should be getters': function (obj) {
        assert.isObject(obj);
        assert.isTrue(!!obj.__lookupGetter__('directory'));
        assert.isTrue(!!obj.__lookupGetter__('helloWorld'));
      }
    }
  }
}).export(module);

