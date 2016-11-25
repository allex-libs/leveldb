function createInt48LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeIntLE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readIntLE(0, 6);
    },
    buffer: true,
    type: 'int48'
  };
}

module.exports = createInt48LECodec;
