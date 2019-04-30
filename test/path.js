//allex-mocha

describe('Testing path parsing for creation', function () {
  it('Load Lib', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  it('3 segment path creation', function (done) {
    var d = q.defer();
    d.promise.then( function (db) {
      db.destroy();
      done();
      done = null;
    });
    new Lib.LevelDBHandler({
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
    new Lib.LevelDBHandler({
      dbname: 'test/bla/hm/nah/test.db',
      starteddefer: d,
      initiallyemptydb: true
    });
  });
});
