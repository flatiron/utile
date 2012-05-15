/*
 * args.js: function argument parsing helper utility
 *
 * (C) 2012, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var utile = require('../lib/');

//
// ### function utils.args(_args)
// #### _args {Arguments} Original function arguments
//
// Top-level method will accept a javascript "arguments" object (the actual keyword
// "arguments" inside any scope), and attempt to return back an intelligent object
// representing the functions arguments
//
module.exports = function (_args) {
  var args = {},
      _cb;

  //
  // convert to proper array object
  //
  args.array = Array.prototype.slice.call(_args || []);

  //
  // find any callbacks
  //
  _cb = args.array[args.array.length - 1] || args.array[args.array.length];
  if (typeof _cb === "function") {
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
