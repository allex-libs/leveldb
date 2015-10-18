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
    VerbatimDecoder: require('./codecs/verbatimdecodercreator')(execlib),
    Int8Codec: require('./codecs/int8codeccreator')(execlib)
    Int16Codec: require('./codecs/int16codeccreator')(execlib)
    Int32Codec: require('./codecs/int32codeccreator')(execlib)
    Int64Codec: require('./codecs/int64codeccreator')(execlib)
  };
}

module.exports = createLib;
