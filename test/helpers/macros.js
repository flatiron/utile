var assert = require('assert');

var macros = exports;

macros.assertReadCorrectJSON = function (obj) {
  assert.isObject(obj);
  assert.deepEqual(obj, {
    hello: 'World',
    'I am': ['the utile module'],
    thisMakesMe: {
      really: 1337,
      'right?': true
    }
  });
};

