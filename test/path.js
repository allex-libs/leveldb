var expect = require('chai').expect,
  execlib = require('allex'),
  lib = execlib.lib,
  q = lib.q,
  qlib = lib.qlib,
  mylib = require('../')(require('allex')),
  LevelDBHandler = mylib.LevelDBHandler;

describe('Testing path parsing for creation', function () {
  it('3 segment path creation', function (done) {
    var d = q.defer();
    d.promise.then( function (db) {
      db.destroy();
      done();
      done = null;
    });
    new LevelDBHandler({
      dbname: 'test/bla/hm/nah/test.db',
      starteddefer: d
    });
  });
  it('3 segment path creation, initially empty', function (done) {
    var d = q.defer();
    d.promise.then( function (db) {
      db.destroy();
      done();
      done = null;
    });
    new LevelDBHandler({
      dbname: 'test/bla/hm/nah/test.db',
      starteddefer: d,
      initiallyemptydb: true
    });
  });
});
