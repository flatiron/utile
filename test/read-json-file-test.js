var assert = require('assert'),
    path = require('path'),
    vows = require('vows'),
    macros = require('./helpers/macros'),
    utile = require('../');

var fixture = path.join(__dirname, 'fixtures', 'read-json-file', 'config.json');

vows.describe('utile/read-json-file').addBatch({
  'When using utile': {
    'the `readJSONFile()` function': {
      topic: function () {
        utile.readJSONFile(fixture, this.callback);
      },
      'should return correct JSON structure': macros.assertReadCorrectJSON
    },
    'the `readJSONFileSync()` function': {
      topic: utile.readJSONFileSync(fixture),
      'should return correct JSON structure': macros.assertReadCorrectJSON
    }
  }
}).export(module);

