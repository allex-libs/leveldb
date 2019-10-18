function startArray (valueencoding, initiallyemptydb, indexsize) {
  var d = q.defer(), ret = d.promise, hash;
  hash = {
    dbname: [__dirname, 'testarry.db'],
    initiallyemptydb: initiallyemptydb,
    indexsize: indexsize || 'huge',
    dbcreationoptions: {
      valueEncoding: valueencoding
    }
  };
  hash.starteddefer = d;
  new Lib.DBArray(hash);
  return ret;
}

var _lastN;
function nPusher (n) {
  if (n!==_lastN-1) {
    console.error('Now it is',n,'should have been', _lastN-1);
    process.exit(1);
  }
  _lastN = n;
  if (n<1) {
    console.log('done!');
    return q(true);
  }
  return DBArray.push({a:n}).then(nPusher.bind(null, n-1));
}

function pushN (n) {
  _lastN = n+1;
  return nPusher(n);
}

var _insertchunkcount = 5e4;
var _insertloopcount = 10;

function doDaTest (valueencoding, indexsize) {
  it ('Create a DBArray with encoding '+valueencoding.toString(), function () {
    this.timeout(1e5);
    return setGlobal('DBArray', startArray(valueencoding, false, indexsize));
  });
  for (var i=0; i<_insertloopcount; i++) {
    it ('Insert '+_insertchunkcount, function () {
      this.timeout(_insertchunkcount);
      return pushN(_insertchunkcount);
    });
    it ('Destroy DBArray', function () {
      DBArray.destroy();
    });
    it ('Create DBArray again', function () {
      this.timeout(1e5);
      return setGlobal('DBArray', startArray(valueencoding, false, indexsize));
    });
  }
}

describe ('Test DBArray', function () {
  it('Load Lib', function () {
    return setGlobal('Lib', require('..')(execlib));
  });
  doDaTest ('json');
  it('Wait a bit', function (done) {
    this.timeout(1e5);
    lib.runNext(done, 1e4);
  });
});
