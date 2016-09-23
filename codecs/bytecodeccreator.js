function createByteCodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_8BITS', num);
      }
      var ret = new Buffer(1);
      ret[0] = num;
      return ret;
    },
    decode: function (buff) {
      return buff[0];
    },
    buffer: true,
    type: 'int8'
  };
}

module.exports = createByteCodec;
