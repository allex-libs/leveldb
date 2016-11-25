function createUInt48LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeUIntLE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readUIntLE(0, 6);
    },
    buffer: true,
    type: 'uint48'
  };
}

module.exports = createUInt48LECodec;
