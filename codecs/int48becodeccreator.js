function createInt48BECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeIntBE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readIntBE(0, 6);
    },
    buffer: true,
    type: 'int48'
  };
}

module.exports = createInt48BECodec;
