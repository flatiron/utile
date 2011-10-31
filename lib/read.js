/*
 * read.js: Simple utilities for working with the file system.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */
 
var fs = require('fs');

exports.json = function (file, callback) {
  if (typeof callback !== 'function') {
    throw new Error('readJSONFile needs a callback')
  }

  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      return callback(err);
    }
    
    try {
      var json = JSON.parse(data);
      callback(null, json)  
    } 
    catch (err) {
      return callback(err)
    }
  });
};