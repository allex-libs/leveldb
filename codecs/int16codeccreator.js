function createInt16Codec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeUInt16BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt16BE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createInt16Codec;
