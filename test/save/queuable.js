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
    _item = [1,5],
    _ctor = 'QueueableHandler',
    _initiallyemptydb = true,
    _batcher = doBatchThruArray; //doBatchThrudbPerforms/doBatchThruArray

function onLoad(done, lib) {
  leveldblib = lib;
  done();
}

describe('Queueable', test);

function test() {
  it('should insert '+_job+' items', insert.bind(null, _job));
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
    dbname: 'testqueueable.db',
    startfromone: true
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

function doBatchThrudbPerforms(todo) {
  var d;
  for (var i = 0; i<todo-1; i++) {
    this.handler.dbPerform('put', _item);
  }
  d = q.defer();
  d.promise.then(
    this.batchDone.bind(this, todo),
    this.fail.bind(this)
  );
  this.handler.dbPerform('put', _item, d);
}

function doBatchThruArray(todo) {
  var commandarry = [];
  for (var i = 0; i<todo; i++) {
    commandarry.push(['put', _item]);
  }
  this.handler.processQ(commandarry).then(
    this.batchDone.bind(this, todo),
    this.fail.bind(this)
  );
}

function QInserter (howmany, handler, done) {
  Inserter.call(this, howmany, handler, done);
}
lib.inherit(QInserter, Inserter);
QInserter.prototype.doBatch = _batcher;
QInserter.prototype.batchDone = function (len, item) {
  console.log('last batchDone', len);
  this.inserts += len;
  this.go();
};
