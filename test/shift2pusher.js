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

var _job = 1000,
    _batchsize = 200,
    _item = 5,
    _ctor = 'DBArray',
    _initiallyemptydb = false,
    _batcher = doBatchThruMany;

function onLoad(done, lib) {
  leveldblib = lib;
  done();
}

describe('Shift2Pusher', test);

function test() {
  it('should shift2push '+_job+' items', go.bind(null, _job));
}

function go(howmany, done) {
  var d = q.defer();
  d.promise.then(
   created.bind(null, howmany, done),
   done
  );

  new leveldblib.Shift2Pusher({
    starteddefer: d,
    shifter:{
      initiallyemptydb: false,
      dbname: 'testshifter.db',
      startfromone: true
    },pusher:{
      initiallyemptydb: false,
      dbname: 'testpusher.db',
      startfromone: true
    }
  });
}

function created(howmany, done, handler) {
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

function doBatchThruMany (todo) {
  var items = [], d;
  for (var i = 0; i < todo; i++) {
    items.push(_item);
  }
  d = q.defer();
  d.promise.done(
    this.afterPush.bind(this, todo)
  );
  this.handler.shifter.pushMany(items, d);
}

function QInserter (howmany, handler, done) {
  Inserter.call(this, howmany, handler, done);
}
lib.inherit(QInserter, Inserter);
QInserter.prototype.doBatch = _batcher;
QInserter.prototype.batchDone = function (len, howmany) {
  console.log('last moved', howmany);
  this.inserts += len;
  this.go();
};
QInserter.prototype.afterPush = function (todo, pusherfinalizer) {
  pusherfinalizer().done(
    this.doMove.bind(this, todo, pusherfinalizer),
    process.exit.bind(process,0)
  );
};
QInserter.prototype.doMove = function (todo, pusherfinalizer) {
  console.log('after pushing', todo, 'items to shifter', this.handler.shifter.head, '-', this.handler.shifter.tail);
  var d = q.defer();
  d.promise.then(
    this.batchDone.bind(this, todo),
    this.fail.bind(this)
  );
  this.handler.move(todo, d);
};
