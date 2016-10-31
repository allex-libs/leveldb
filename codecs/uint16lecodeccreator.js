function createUInt16LECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeUInt16LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt16LE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createUInt16LECodec;
