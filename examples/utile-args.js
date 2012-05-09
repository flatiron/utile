var utile = require('../lib');

var myFN = function(/* a, b, c, callback */) {
  var args = utile.args(arguments);
  console.log(args);
};

myFN("x", "y", "z", function(){ 
  return 'ok';
})

/*
  OUTPUTS:

{ array: [ 'x', 'y', 'z' ],
  a: 'x',
  b: 'y',
  c: 'z',
  callback: [Function],
  cb: [Function],
  last: 'z' }

*/

myFN(function(){ 
  return 'ok';
})

/*

  OUTPUTS:

  { array: [],
    a: [Function],
    b: undefined,
    c: undefined,
    callback: [Function],
    cb: [Function],
    last: undefined }

*/

myFN("x", "y", function(){ 
  return 'ok';
})

/*

  OUTPUTS:

  { array: [ 'x', 'y' ],
    a: 'x',
    b: 'y',
    c: [Function],
    callback: [Function],
    cb: [Function],
    last: 'y' }

*/

myFN(["foo", "bar", "tar"], "car", function(){ 
  return 'ok';
})

/*

  OUTPUTS:

  { array: [ [ 'foo', 'bar', 'tar' ], 'car' ],
    a: [ 'foo', 'bar', 'tar' ],
    b: 'car',
    c: [Function],
    callback: [Function],
    cb: [Function],
    last: 'car' }

*/

return;
