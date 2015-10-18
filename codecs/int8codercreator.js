function createInt8Codec(execlib) {
  return {
    encode: function(num) {
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
