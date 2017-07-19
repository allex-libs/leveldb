/*
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
*/

function pow2(num) {
  return Math.pow(2, num);
}

function checker(traverseobj, kv) {
  if (kv.key <= traverseobj.min) {
    throw new Error(`${kv.key} > ${traverseobj.min}`);
  }
  traverseobj.min = kv.key;
}

function traverse (execlib, leveldblib, db) {
  var traverseobj = {min: 0};
  execlib.lib.qlib.promise2console(db.traverse(checker.bind(null, traverseobj)), 'traverse');
}

function put (execlib, leveldblib, keyvals, db) {
  'use strict';
  var q = execlib.lib.q,
    qlib = execlib.lib.qlib,
    _db = db,
    ps = keyvals.map(function (key, keyindex) {
      return _db.put(key, keyindex);
    });
  _db = null;
  q.all(ps).then(traverse.bind(null, execlib, leveldblib, db));
}

function runTest (execlib, leveldblib, codecname, keyvals) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    d = q.defer(),
    db = new (leveldblib.LevelDBHandler)({
      dbname: 'testuint64be.db',
      starteddefer: d,
      initiallyemptydb: true,
      dbcreationoptions: {
        leveldbKeyEncoding: codecname
      }
    });
    d.promise.then(put.bind(null, execlib, leveldblib, keyvals));
}

function run (execlib, leveldblib) {
  //runTest(execlib, leveldblib, 'UInt64LECodec');
  //runTest(execlib, leveldblib, 'UInt64BECodec', [pow2(32)-1, pow2(48)-1, pow2(51)-1, pow2(32)+1, pow2(48)+1, pow2(51)+1]);
  //runTest(execlib, leveldblib, 'Int48BECodec', [pow2(32)-1, pow2(47)-1, pow2(32)+1]);
  runTest(execlib, leveldblib, 'UInt48BECodec', [pow2(32)-1, pow2(48)-1, pow2(32)+1]);
  //runTest(execlib, leveldblib, 'Int64LECodec', [pow2(32)-1, pow2(48)+1]);
}

function main (execlib) {
  execlib.loadDependencies('client', ['allex_leveldblib'], run.bind(null, execlib));
}

module.exports = main;

