function createInt32Codec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffffffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_32BITS', num);
      }
      var ret = new Buffer(4);
      ret.writeUInt32BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt32BE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createInt32Codec;
