//loadMochaIntegration('allex_leveldblib');
loadMochaIntegration(require('path').join(__dirname, '../'));

describe ('Query a simple-key DB', function () {
  loadClientSide(['allex_leveldblib']);
  createLevelDBHandlerIt({
    handlerctorname: 'LevelDBHandler',
    instancename: 'db',
    dbname: 'testquery.db',
    initiallyemptydb: true,
    listenable: true
  });
  it ('write to DB', function () {
    return db.put('a', '1');
  });
  it ('read from DB', function () {
    expect(db.get('a')).to.eventually.equal('1');
  });
  createLevelDBQueryIt({
    instancename: 'Query1',
    leveldb: 'db',
    filter: {keys: {
      op: 'eq',
      field: null,
      value: 'a'
    }}
  });
  it ('write and wait', function () {
    var w = Query1.wait();
    db.put('a', '2');
    return w;
  });
  it ('Destroy Query1', function () {
    return Query1.destroy();
  });
});

describe ('Query a 2-segment key DB', function () {
  loadClientSide(['allex_leveldblib']);
  createLevelDBHandlerIt({
    handlerctorname: 'LevelDBHandler',
    instancename: 'db',
    dbname: 'testhookable.db',
    initiallyemptydb: true,
    listenable: true,
    dbcreationoptions: {
      bufferKeyEncoding: ['String', 'String']
    }
  });
  it ('write to DB', function () {
    return db.put(['a', '1'], '1');
  });
  it ('read from DB', function () {
    expect(db.get(['a', '1'])).to.eventually.equal('1');
  });
  createLevelDBQueryIt({
    instancename: 'Query1',
    leveldb: 'db',
    filter: {keys: {
      op: 'and',
      filters: [{
        op: 'eq',
        field: 0,
        value: 'a'
      },{
        op: 'eq',
        field: 1,
        value: '1'
      }]
    }}  //[['a', '1']], scan: true}
  });
  createWriteAndGetInQueryIt({
    expectablename: 'Query1',
    dbname: 'db',
    key: ['a', '1'],
    value: '2'
  });
  createWriteAndNotGetInQueryIt({
    expectablename: 'Query1',
    dbname: 'db',
    key: ['b', '1'],
    value: 1
  });
  createWriteAndGetInQueryIt({
    expectablename: 'Query1',
    dbname: 'db',
    key: ['a', '1'],
    value: '4'
  });
  it ("destroy ['a', '1']", function () {
    return Query1.destroy();
  });
  createLevelDBQueryIt({
    instancename: 'Query1',
    leveldb: 'db',
    filter: {keys: {
      op: 'and',
      filters: [
        null,{
        op: 'eq',
        field: 1,
        value: '1'
      }]
    }}  //[['a', '1']], scan: true}
  });
  createWriteAndGetInHookIt({
    expectablename: 'Query1',
    dbname: 'db',
    key: ['?', '1'],
    value: '5'
  });
  it('destroy Query1', function () {
    Query1.destroy();
  });
});
