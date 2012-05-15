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
  var args, _cb;

  //
  // Helper function which defines a non-enumarable
  // data property on the Array returned.
  //
  function namedArgument(name, value) {
    Object.defineProperty(args, name, {
      enumerable: false,
      value: value
    });
  }

  //
  // Convert the raw `_args` to a proper Array.
  //
  args = Array.prototype.slice.call(_args || []);

  //
  // Find and define the first argument
  //
  namedArgument('first', args[0])

  //
  // Find and define any callback
  //
  _cb = args[args.length - 1] || args[args.length];
  if (typeof _cb === "function") {
    namedArgument('callback', _cb);
    namedArgument('cb', _cb);
    args.pop();
  }

  //
  // Find and define the last argument
  //
  if (args.length) {
    namedArgument('last', args[args.length -1]);
  }
  
  return args;
};
