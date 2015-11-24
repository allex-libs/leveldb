function createVerbatimDecoder(execlib) {
  'use strict';
  return {
    encode: function (val) { 
      if(!Buffer.isBuffer(val)){
        throw new execlib.lib.Error('PLAIN_CODEC_CANNOT_ENCODE_A_NOT_BUFFER');
      }
      return val;
    },
    decode: function (buff) { return buff; },
    buffer: true,
    type: 'verbatim'
  }
}

module.exports = createVerbatimDecoder;
