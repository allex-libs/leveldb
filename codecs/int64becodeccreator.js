var Int64 = require('node-int64');
function createInt64BECodec(execlib) {
  return {
    encode: function(num) {
      var int64 = new Int64(num);
      return int64.toBuffer();
    },
    decode: function (buff) {
      var int64 = new Int64(buff);
      return int64+0;
    },
    buffer: true,
    type: 'int64le'
  };
}

module.exports = createInt64BECodec;
