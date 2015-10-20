var assert = require('assert'),
  lib = execlib.lib,
  q = lib.q,
  leveldblib;

describe('LevelDB library', load);

function load() {
  it('loading the library', function(done) {
    execlib.execSuite.libRegistry.register('allex_leveldblib').then(
      onLoad.bind(null, done),
      done
    );
  });
}

var _job = 10000,
    _batchsize = 200,
    _item = 5,
    _ctor = 'DBArray',
    _initiallyemptydb = false,
    _batcher = doBatchThruMany;
    //_batcher = doBatchThruPushes;

function onLoad(done, lib) {
  leveldblib = lib;
  done();
}

describe('Array', test);

function test() {
  it('should push/pop '+_job+' items', insert.bind(null, _job));
}

function insert(howmany, done) {
  var d = q.defer();
  d.promise.then(
   doinsert.bind(null, howmany, done),
   done
  );

  new leveldblib[_ctor]({
    initiallyemptydb: _initiallyemptydb,
    starteddefer: d,
    dbname: 'testarray.db',
    startfromone: false
  });
}

function doinsert(howmany, done, handler) {
  var i = new QInserter(howmany, handler, done);
  i.go();
}

function Inserter(howmany, handler, done) {
  this.howmany = howmany;
  this.handler = handler;
  this.done = done;
  this.inserts = 0;
}
Inserter.prototype.destroy = function () {
  this.done = null;
  if (this.handler) {
    this.handler.destroy();
  }
  this.handler = null;
  this.howmany = null;
};
Inserter.prototype.fail = function (reason) {
  this.done(reason);
  this.destroy();
};
Inserter.prototype.go = function () {
  var todo = this.howmany-this.inserts;
  if (todo>_batchsize) {
    todo = _batchsize;
  }
  if(todo<=0) {
    this.done();
    this.destroy();
    return;
  }
  this.doBatch(todo);
};

function doBatchThruPushes (todo) {
  for (var i = 0; i < todo; i++) {
    this.handler.push(_item);
  }
  for (var i = 0; i < todo-2; i++) {
    //this.handler.shift();
    this.handler.pop();
  }
  var d = q.defer();
  d.promise.then(
    this.batchDone.bind(this, todo),
    this.fail.bind(this)
  );
  this.handler.shift(d);
}

function doBatchThruMany (todo) {
  try {
  var items = [];
  for (var i = 0; i < todo; i++) {
    items.push(_item);
  }
  var pushd = q.defer(), d = q.defer();
  pushd.promise.then(
    this.handler.shiftMany.bind(this.handler, todo-1,d),
    console.error.bind(console, 'Error')
  );
  d.promise.then(
    this.batchDone.bind(this, todo),
    this.fail.bind(this)
  );
  this.handler.pushMany(items, pushd);
  this.handler.push(_item);
  } catch(e) {
    console.error(e.stack);
    console.error(e);
  }
}

function QInserter (howmany, handler, done) {
  Inserter.call(this, howmany, handler, done);
}
lib.inherit(QInserter, Inserter);
QInserter.prototype.doBatch = _batcher;
QInserter.prototype.batchDone = function (len, item) {
  console.log('last shifted', item.length);
  this.inserts += len;
  this.go();
};
