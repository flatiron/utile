var assert = require('assert'),
    vows = require('vows'),
    utile = require('../lib/');


vows.describe('utile/base64').addBatch({

  'Should treat input as a string for encode().': function() {
    assert.equal(utile.base64.encode('200'), utile.base64.encode(200))
    assert.equal(utile.base64.encode('100000000'), utile.base64.encode(1e8))
  },

  'Should treat input as a string for decode().': function() {
    assert.equal(utile.base64.decode('MTAw'), 100)
  }

}).export(module);