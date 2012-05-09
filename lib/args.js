/*
 * args.js: function argument parsing helper utility
 *
 * (C) 2012, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var utile = require('../lib/')

//
//  utils.args(arguments)
//  
//  Top-level method will accept a javascript "arguments" object ( the actual keyword "arguments" inside any scope ),
//  and attemp to return back an intelligent object representing the functions arguments
//
//  util.args also supports optional argument contract parsing through code comments inside method signatures
//  
//  For example: 
//
//    var myFN = function(/* a, b, c, callback */) {
//      var args = utile.args(arguments);
//      console.log(args);
//    };
//
//
//    myFN("x", "y", "z", function(){ 
//      return 'ok';
//    })
//
//      OUTPUTS:
//
//    { array: [ 'x', 'y', 'z' ],
//      a: 'x',
//      b: 'y',
//      c: 'z',
//      callback: [Function],
//      cb: [Function],
//      last: 'z' }
//
//
//

module["exports"] = function (_args) {

    var args = {};

    //
    // convert to proper array object
    //
    args.array = Array.prototype.slice.call(_args || []);

    //
    // mixin any potential arguments contracts
    //
    utile.mixin(args, mergeContract(_args.callee, args.array));
    
    //
    // find any callbacks
    //
    var _cb = args.array[args.array.length - 1] || args.array[args.array.length];
    if(typeof _cb === "function" ){
      args.callback = _cb;
      args.cb = args.callback;
      args.array.pop();
    }

    //
    // find last argument
    //
    args.last = args.array[args.array.length - 1] ||  args.array[1] || args.array[0];

    return args;

};

function mergeContract (fn, data) {

  var str = fn.toString(), start = 0, end = 0, obj = {}, arr = [];

  // find start
  start = str.search(" \\(/*");

  // find end
  end = str.search('\\*/\\) {', start);
 
  // substr
  str = str.substr(start + 5, end - start - 6);

  // merge argument contract into object
  arr = str.split(', ');
  arr.forEach(function(item, i){
    if (item.length) {
      obj[item] = data[i];
    }
  });

  return obj;
}