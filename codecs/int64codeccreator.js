function createInt64Codec(execlib) {
  /* problematic
  return {
    encode: function(num) {
      var ret = new Buffer(8);
      ret.writeUInt32BE(~~(num/0x100000000),0);
      ret.writeUInt32BE(num%0x100000000,4);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt64BE(0);
    },
    buffer: true,
    type: 'int64'
  };
  */
}

module.exports = createInt64Codec;
