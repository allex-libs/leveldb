function createLDBHandler (dbname) {
    var LevelDBHandler = Lib.LevelDBHandler,
        starteddefer = q.defer(),
        ret = starteddefer.promise;

    new LevelDBHandler ({
        'dbname' : dbname,
        initiallyemptydb: true,
        starteddefer : starteddefer
    });

    return ret.then (function (ldbhandler) {
        if (!Fs.dirExists(Path.resolve(process.cwd(), '_dbtest', 'test1'))) {
            throw new Error('Dir does not exist');
        }
        return ldbhandler;
    });
}

describe ('LevelDBHandler test', function () {
  it ('Load Node helpers', function () {
    var Node = require('allex_nodehelpersserverruntimelib')(lib);
    setGlobal('Path', Node.Path);
    setGlobal('Fs', Node.Fs);
  });
  it ('Load library', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  it ('Test creation', function () {
    return setGlobal('DB', createLDBHandler(['_dbtest', 'test1']), 'ldb');
  });
  it ('Test creation on path (make it fail by chowning _dbtest1 to some other user)', function () {
    return setGlobal('DB1', createLDBHandler('_dbtest1/test1'), 'ldb');
  });
  it ('Test creation again', function () {
    return setGlobal('DB1', createLDBHandler(['_dbtest', 'test1']), 'ldb');
  });

  it ('Test simple put after db is created', function (done) {
    var promise = DB.put ('bla', JSON.stringify({1: 2, 'bla': 'truc'}));
    promise.done (function (dataarr) {
      try {
        expect(dataarr.length).to.be.equal(2);
        expect(dataarr[0]).to.be.equal ('bla');
        expect(JSON.parse(dataarr[1])).to.be.deep.equal({1:2,'bla':'truc'});
        done();
      }catch (e) {
        done(e);
        return;
      }
    }, done.bind(null));
  });


  it ('Test get after db is created', function (done) {
    var promise = DB.get('bla');
    promise.done (function (data) {
      try {
        expect(JSON.parse(data)).to.be.deep.equal({1:2, 'bla':'truc'});
        done();
      }catch (e) {
        done(e);
      }
    }, done.bind(null));
  });

  it ('Test traverse', function () {
    DB.put ('truc', JSON.stringify({val:1}));
    DB.traverse (function (data) {
      var val = JSON.parse(data.value);
      if (data.key === 'truc'){
        expect (val).to.be.deep.equal({val:1});
        return;
      }

      if (data.key === 'bla'){
        expect(val).to.be.deep.equal({1:2, 'bla':'truc'});
        return;
      }

      throw new Error('Unexpected record '+data.key+' val: '+data.value);
    });
  });

  /*
  it ('Test destroy', function () {
    return DB.destroy();
  });
  it ('Test drop', function () {
    return DB.drop().then(function () {
      if (Fs.dirExists(Path.resolve(process.cwd(), '_dbtest', 'test1'))) {
        return q.reject(new Error('DB dir still exists'));
      }
      return q(true);
    });
  });
  */
  
});
