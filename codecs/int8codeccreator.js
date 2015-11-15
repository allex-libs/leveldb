function createInt8Codec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_8BITS', num);
      }
      var ret = new Buffer(1);
      ret.writeUInt8BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt8BE(0);
    },
    buffer: true,
    type: 'int8'
  };
}

module.exports = createInt8Codec;
