function createDoubleBECodec(execlib) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      var ret = new Buffer(8);
      ret.writeDoubleBE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readDoubleBE(0);
    },
    buffer: true,
    type: 'doublebe'
  };
}

module.exports = createDoubleBECodec;
