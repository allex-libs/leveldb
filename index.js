var levelup = require('level');

function createLib(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    LevelDBHandler = require('./dbhandlercreator')(execlib);

  function creator(hash) {
    return new LevelDBHandler(hash);
  }

  var _nullcodec = {
    encode: function (val) {
      return new Buffer(0);
    },
    decode: function (buffer) {
      return null;
    },
    buffer: true,
    type: 'null'
  };
  var numchecker = require('./numcheckercreator')(execlib);

  var ret = {
    createDBHandler: creator,
    LevelDBHandler: LevelDBHandler,
    NullCodec:_nullcodec,
    VerbatimDecoder: require('./codecs/verbatimdecodercreator')(execlib),
    Int8Codec: require('./codecs/int8codeccreator')(execlib, numchecker),
    Int16Codec: require('./codecs/int16codeccreator')(execlib, numchecker),
    Int32Codec: require('./codecs/int32codeccreator')(execlib, numchecker),
    Int64Codec: require('./codecs/int64codeccreator')(execlib, numchecker)
  };

  ret.QueueableMixin = require('./queueablemixincreator')(execlib, ret);
  ret.QueueableHandler = require('./queueablehandlercreator')(execlib, ret);
  ret.DBArray = require('./dbarrayhandlercreator')(execlib, ret);
  ret.Shift2Pusher = require('./shift2pushercreator')(execlib, ret);
  ret.KnownLengthInsertJob = require('./knownlengthinsertjobcreator')(execlib);
  ret.FiniteLengthInsertJob = require('./finitelengthinsertjobcreator')(execlib, ret.KnownLengthInsertJob);

  return ret;
}

module.exports = createLib;
