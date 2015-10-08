function createInt32Codec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(4);
      ret.writeUInt32BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt32BE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createInt32Codec;
