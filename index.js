var levelup = require('level');

function createLib(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    LevelDBHandler = require('./dbhandlercreator')(execlib);

  function creator(hash) {
    return new LevelDBHandler(hash);
  }

  return {
    createDBHandler: creator,
    LevelDBHandler: LevelDBHandler,
    Int32Codec: require('./codecs/int32codeccreator')(execlib)
  };
}

module.exports = createLib;
