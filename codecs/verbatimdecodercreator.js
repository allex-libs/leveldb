function createVerbatimDecoder(execlib) {
  'use strict';
  return {
    encode: function (val) { return new Buffer(0); },
    decode: function (buff) { return buff; },
    buffer: true,
    type: 'verbatim'
  }
}

module.exports = createVerbatimDecoder;
