function createInt16Codec(execlib) {
  return {
    encode: function(num) {
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
