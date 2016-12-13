function createDoubleLECodec(execlib) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      var ret = new Buffer(8);
      ret.writeDoubleLE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readDoubleLE(0);
    },
    buffer: true,
    type: 'doublele'
  };
}

module.exports = createDoubleLECodec;
