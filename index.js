var levelup = require('level');

function createLib(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  return {
    LevelDBHandler: require('./dbhandlercreator')(execlib)
  };
}

module.exports = createLib;
