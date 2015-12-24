var levelup = require('level-browserify');

function createLib(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
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
  ret.KnownLengthInsertJob = require('./transactions/knownlengthinsertjobcreator')(execlib, qlib.JobBase);
  ret.FiniteLengthInsertJob = require('./transactions/finitelengthinsertjobcreator')(execlib, ret.KnownLengthInsertJob);
  ret.ChainedOperationsJob = require('./transactions/chainedoperationsjobcreator')(execlib, qlib.JobBase);
  ret.ServiceUserMixin = require('./serviceusermixincreator')(execlib);
  ret.streamInSink = require('./streaminsinkcreator')(execlib);
  ret.enhanceSink = function(sinkklass) {
    sinkklass.prototype.ClientUser.prototype.__methodDescriptors.resumeLevelDBStream = require('./resumeleveldbstreamdescriptor');
  }

  return ret;
}

module.exports = createLib;
