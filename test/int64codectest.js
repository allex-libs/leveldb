var i64c = require('../codecs/int64codeccreator')();

function testCodec(num) {
  var b = i64c.encode(num), r;
  console.log(num, 'encode =>', b);
  r = i64c.decode(b);
  console.log(b, 'decode =>', r);
  if (num!==r) {
    throw Error(num + '!==' + r);
  }
}


[0, 1, 1000, Math.pow(2,55)].forEach(testCodec);
