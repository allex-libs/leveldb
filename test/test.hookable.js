//loadMochaIntegration('allex_leveldblib');
loadMochaIntegration(require('path').join(__dirname, '../'));

describe ('Hook on a simple-key DB', function () {
  loadClientSide(['allex:leveldb:lib']);
  createLevelDBHandlerIt({
    handlerctorname: 'LevelDBHandler',
    instancename: 'db',
    dbname: 'testhookable.db',
    initiallyemptydb: true,
    listenable: true
  });
  it ('write to DB', function () {
    return db.put('a', '1');
  });
  it ('read from DB', function () {
    expect(db.get('a')).to.eventually.equal('1');
  });
  createLevelDBHookIt({
    instancename: 'Hook1',
    leveldb: 'db',
    hookTo: {keys: ['a'], scan: true}
  });
  it ('write and wait', function () {
    var w = Hook1.wait();
    db.put('a', '2');
    return w;
  });
  it ('unhook a', function () {
    return Hook1.unhook(['a']);
  });
});

describe ('Hook on 2-segment key DB', function () {
  loadClientSide(['allex:leveldb:lib']);
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
  createLevelDBHookIt({
    instancename: 'Hook1',
    leveldb: 'db',
    hookTo: {keys: [['a', '1']], scan: true}
  });
  createWriteAndGetInHookIt({
    expectablename: 'Hook1',
    dbname: 'db',
    key: ['a', '1'],
    value: '2'
  });
  createWriteAndNotGetInHookIt({
    expectablename: 'Hook1',
    dbname: 'db',
    key: ['b', '1'],
    value: 1
  });
  it ("unhook ['a', '1']", function () {
    return Hook1.unhook([['a', '1']]).then(
      function() {
        expect(Hook1._hook.keys.handlers).to.be.empty;
        return q(true);
      }
    );
  });
  createWriteAndNotGetInHookIt({
    expectablename: 'Hook1',
    dbname: 'db',
    key: ['a', '1'],
    value: 1
  });
  it ("Hook again", function () {
    return Hook1.hook({keys: [['***', '1']], scan: true});
  });
  createWriteAndGetInHookIt({
    expectablename: 'Hook1',
    dbname: 'db',
    key: ['?', '1'],
    value: '5'
  });
  it('destroy Hook1', function () {
    Hook1.destroy();
  });
  createLevelDBHookIt({
    instancename: 'Hook2',
    leveldb: 'db',
    hookTo: {filter:{
      keys: {op: 'and', filters: [{
        op: 'eq', field: 0, value: 'a'
      },{
        op: 'eq', field: 1, value: '1'
      }
      ]},
      values: {op: 'and', filters: [{
        op: 'gte', field: 'blah', value: 1
      },{
        op: 'lte', field: 'blah', value: 5
      }]
      }
    }, scan: true}
  });
  createWriteAndGetInHookIt({
    expectablename: 'Hook2',
    dbname: 'db',
    key: ['a', '1'],
    value: {blah: 3}
  });
  createWriteAndNotGetInHookIt({
    expectablename: 'Hook2',
    dbname: 'db',
    key: ['b', '1'],
    value: {blah: 7}
  });
});
