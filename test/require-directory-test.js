var assert = require('assert'),
    path = require('path'),
    vows = require('vows'),
    utile = require('../');

var requireFixtures = path.join(__dirname, 'fixtures', 'require-directory');

vows.describe('utile/require-directory').addBatch({
  'When using utile': {
    'the `requireDir()` function': {
      topic: utile.requireDir(requireFixtures),
      'should contain all wanted modules': function (obj) {
        assert.isObject(obj);
        assert.deepEqual(obj, {
          directory: {
            me: 'directory/index.js'
          },
          helloWorld: {
            me: 'helloWorld.js'
          }
        });
      }
    }
  }
}).export(module);

