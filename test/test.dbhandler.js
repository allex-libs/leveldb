var Path = require('path'),
  RTToolbox = require('allex-rt-toolbox'),
  Fs = RTToolbox.node.Fs;

describe ('LevelDBHandler test', function () {
  var DB = null;
  it ('Load library', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  it ('Test creation', function (done) {
    var LevelDBHandler = Lib.LevelDBHandler,
      starteddefer = q.defer();

    DB = new LevelDBHandler ({
      'dbname' : ['_dbtest', 'test1'], //'_dbtest/test1',
      initiallyemptydb: true,
      starteddefer : starteddefer
    });

    starteddefer.promise.done (function () {
      if (!Fs.dirExists(Path.resolve(process.cwd(), '_dbtest', 'test1'))) {
        done (new Error('Dir does not exist'));
        return;
      }
      done();
    }, done.bind(null));
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
  */
  it ('Test drop', function () {
    return DB.drop();
  });
  
});
