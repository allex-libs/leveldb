var Int64 = require('node-int64');
function mirror64 (buffer) {
  var ret;
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('Value provided was not a buffer');
  }
  if (buffer.length !== 8) {
    throw new Error('Buffer provided was '+buffer.length+' bytes long instead of 8');
  }
  ret = new Buffer(8);
  buffer.copy(ret, 0, 0, 8);
  ret.swap64();
  return ret;
}
function createInt64LECodec(execlib) {
  return {
    encode: function(num) {
      var int64 = new Int64(num);
      return mirror64(int64.toBuffer());
    },
    decode: function (buff) {
      var int64 = new Int64(mirror64(buff));
      return int64+0;
    },
    buffer: true,
    type: 'int64le'
  };
}

module.exports = createInt64LECodec;
