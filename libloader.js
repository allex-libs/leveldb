function realCreator(execlib, datafilterslib, bufferlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    encodingMakeup,
    LevelDBHandler;

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
    ByteCodec: require('./codecs/bytecodeccreator')(execlib, numchecker),
    UInt16LECodec: require('./codecs/uint16lecodeccreator')(execlib, numchecker),
    UInt16BECodec: require('./codecs/uint16becodeccreator')(execlib, numchecker),
    Int16LECodec: require('./codecs/int16lecodeccreator')(execlib, numchecker),
    Int16BECodec: require('./codecs/int16becodeccreator')(execlib, numchecker),
    UInt32LECodec: require('./codecs/uint32lecodeccreator')(execlib, numchecker),
    UInt32BECodec: require('./codecs/uint32becodeccreator')(execlib, numchecker),
    Int32LECodec: require('./codecs/int32lecodeccreator')(execlib, numchecker),
    Int32BECodec: require('./codecs/int32becodeccreator')(execlib, numchecker),
    UInt48LECodec: require('./codecs/uint48lecodeccreator')(execlib, numchecker),
    UInt48BECodec: require('./codecs/uint48becodeccreator')(execlib, numchecker),
    Int48LECodec: require('./codecs/int48lecodeccreator')(execlib, numchecker),
    Int48BECodec: require('./codecs/int48becodeccreator')(execlib, numchecker),
    UInt64BECodec: require('./codecs/uint64becodeccreator')(execlib, numchecker),
    UInt64LECodec: require('./codecs/uint64lecodeccreator')(execlib, numchecker),
    Int64BECodec: require('./codecs/int64becodeccreator')(execlib, numchecker),
    Int64LECodec: require('./codecs/int64lecodeccreator')(execlib, numchecker),
    DoubleBECodec: require('./codecs/doublebecodeccreator')(execlib),
    DoubleLECodec: require('./codecs/doublelecodeccreator')(execlib)
  };

  encodingMakeup = require('./encodingmakeupcreator')(execlib, ret, bufferlib);
  LevelDBHandler = require('./dbhandlercreator')(execlib, datafilterslib, encodingMakeup);
  function creator(hash) {
    return new LevelDBHandler(hash);
  }

  ret.encodingMakeup = encodingMakeup;
  ret.LevelDBHandler = LevelDBHandler;
  ret.createDBHandler = creator;
  ret.QueueableMixin = require('./queueablemixincreator')(execlib, ret);
  ret.QueueableHandler = require('./queueablehandlercreator')(execlib, ret);
  ret.DBArray = require('./dbarrayhandlercreator')(execlib, ret);
  ret.Shift2Pusher = require('./shift2pushercreator')(execlib, ret);
  ret.KnownLengthInsertJob = require('./transactions/knownlengthinsertjobcreator')(execlib, qlib.JobBase);
  ret.FiniteLengthInsertJob = require('./transactions/finitelengthinsertjobcreator')(execlib, ret.KnownLengthInsertJob);
  ret.ChainedOperationsJob = require('./transactions/chainedoperationsjobcreator')(execlib, qlib.JobBase);
  ret.ServiceUserMixin = require('./serviceusermixincreator')(execlib, datafilterslib);
  ret.Hook = require('./hookcreator')(execlib), 
  ret.HookableUserSessionMixin = require('./hookableusersessionmixincreator')(execlib, ret.Hook);
  ret.streamInSink = require('./streaminsinkcreator')(execlib);
  ret.enhanceSink = function(sinkklass) {
    sinkklass.prototype.ClientUser.prototype.__methodDescriptors.resumeLevelDBStream = require('./resumeleveldbstreamdescriptor');
  }
  return ret;
}

module.exports = realCreator;
