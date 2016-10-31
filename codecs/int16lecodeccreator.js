function createInt16LECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeInt16LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readInt16LE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createInt16LECodec;
