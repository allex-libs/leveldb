function createUInt64LECodec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(8),
        hi = ~~(num / 0x100000000),
        lo = num % 0x100000000;
    //console.log(item, '=> lo', lo, 'hi', hi);
      ret.writeUInt32LE(lo, 0);
      ret.writeUInt32LE(hi, 4);
      return ret;
    },
    decode: function (buff) {
      var ret = 0,
        lo = buff.readUInt32LE(0),
        hi = buff.readUInt32LE(4);
      ret += (lo);
      ret += ( hi * 0x100000000);
      return ret;
    },
    buffer: true,
    type: 'uint64le'
  };
}

module.exports = createUInt64LECodec;
