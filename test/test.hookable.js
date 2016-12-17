describe ('Hookable test', function () {
  loadClientSide(['allex:leveldb:lib'], function () {
    console.log('hah!');
  });
  it('create DB', function () {
    var d = q.defer();
    new (leveldblib.LevelDBHandler)({
      dbname: 'testhookable.db',
      starteddefer:d,
      initiallyemptydb: true,
      dbcreationoptions: {
        bufferKeyEncoding: ['String', 'String']
      }
    });
    return setGlobal('db', d.promise);
  });
  it ('write to DB', function () {
    return db.put(['a', '1'], '1');
  });
  it ('read from DB', function () {
    expect(db.get(['a', '1'])).to.eventually.equal('1');
  });
  it ('set hook', function () {
  });
});
