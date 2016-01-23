function createInt64Codec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(8),
        hi = ~~(num / 0x100000000),
        lo = num % 0x100000000;
    //console.log(item, '=> lo', lo, 'hi', hi);
      ret.writeUInt32BE(lo, 0);
      ret.writeUInt32BE(hi, 4);
      return ret;
    },
    decode: function (buff) {
      var ret = 0,
        lo = buff.readUInt32BE(0),
        hi = buff.readUInt32BE(4);
      ret += (lo);
      ret += ( hi * 0x100000000);
      return ret;
    },
    buffer: true,
    type: 'int64'
  };
}

module.exports = createInt64Codec;
