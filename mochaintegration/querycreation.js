'use strict';

var utils = require('./utils'),
  inFCH = utils.instancenameFromCreationHash.bind(null, 'hook'),
  expecterswaiters = require('./expecterswriters'),
  writeForQuery = expecterswaiters.writeForWaitable,
  expectForQuery = expecterswaiters.expectForWaitable,
  expectEmptyForQuery = expecterswaiters.expectEmptyForWaitable;

function QueryHandler (cb) {
  var destroyer;
  this.querydefer = q.defer();
  this.defer = null;
  destroyer = this.destroy.bind(this);
  this.querydefer.promise.then(destroyer, destroyer, cb || null);
}
QueryHandler.prototype.destroy = function () {
  var d = this.defer;
  this.defer = null;
  if (d) {
    d.reject(new lib.Error('QUERY_DEAD'));
  }
  if (this.querydefer) {
    this.querydefer.resolve(true);
  }
  this.querydefer = null; 
};
QueryHandler.prototype.wait = function () {
  if (this.defer) {
    this.defer.resolve([]);
  }
  this.defer = q.defer();
  this.querydefer.promise.then(null, null, this.resolveWaiter.bind(this));
  return this.defer.promise;
};
QueryHandler.prototype.resolveWaiter = function (res) {
  if (this.defer) {
    this.defer.resolve(res);
  }
  this.defer = null;
};


function createLevelDBQueryIt (creationhash) {
  var _in = inFCH;
  it('Creating a QueryHandler instance named '+_in(creationhash), function () {
    var instancename = _in(creationhash),
      starteddefer = q.defer(),
      querymethodname = creationhash.queryMethodName || 'query',
      qh = new QueryHandler(creationhash.cb);
    _in = null;
    if (lib.isString(creationhash.leveldb)) {
      creationhash.leveldb = getGlobal(creationhash.leveldb);
    }
    creationhash.leveldb[querymethodname](creationhash.filter, qh.querydefer, starteddefer);
    return q.all([setGlobal(instancename, qh), starteddefer.promise]);
  });
}

setGlobal('createLevelDBQueryIt', createLevelDBQueryIt);

function createWriteAndGetInQueryIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and get data in query '+creationhash.expectablename, function () {
    var pe = writeForQuery(creationhash), ret;
    ret = expectForQuery(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

setGlobal('createWriteAndGetInQueryIt', createWriteAndGetInQueryIt);

function createWriteAndNotGetInQueryIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and NOT get data in query '+creationhash.expectablename, function () {
    var pe = writeForQuery(creationhash), ret;
    ret = expectEmptyForQuery(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

function SinkQueryHandler (prophash) {
  this.initdefer = q.defer();
  this.cb = prophash.cb;
  this.waitdefer = null;
  this.task = taskRegistry.run('queryLevelDB', {
    sink: getGlobal(prophash.sinkname),
    queryMethodName: prophash.methodname,
    scanInitially: prophash.scaninitially || false,
    filter: prophash.filter || {},
    onPut: this.onPut.bind(this),
    onDel: this.onDel.bind(this),
    onInit: this.onInit.bind(this)
  });
}
SinkQueryHandler.prototype.destroy = function () {
  if (this.task) {
    this.task.destroy();
  }
  this.task = null;
  if (this.initdefer) {
    this.initdefer.resolve(false);
  }
  this.cb = null;
  this.initdefer = null;
};
SinkQueryHandler.prototype.onPut = function (kva) {
  this.handleIncomingData(kva);
};
SinkQueryHandler.prototype.onDel = function (kva) {
  this.handleIncomingData(kva);
};
SinkQueryHandler.prototype.onInit = function (recordcount) {
  if (this.initdefer) {
    this.initdefer.resolve(recordcount);
  }
  this.initdefer = null;
};
SinkQueryHandler.prototype.wait = function () {
  if (this.waitdefer) {
    this.waitdefer.resolve([]);
  }
  this.waitdefer = q.defer();
  return this.waitdefer.promise;
};
SinkQueryHandler.prototype.handleIncomingData = function (kva) {
  if (this.waitdefer) {
    this.waitdefer.resolve(kva);
  }
  this.waitdefer = null;
  if (this.cb) {
    this.cb(kva);
  }
};

setGlobal('createWriteAndNotGetInQueryIt', createWriteAndNotGetInQueryIt);

function createSinkLevelDBQueryIt (creationhash) {
  var _in = inFCH;
  it('Querying (LevelDB) sink '+creationhash.sinkname+' as '+_in(creationhash), function () {
    var instancename = _in(creationhash),
      sqh;
    _in = null;
    sqh = new SinkQueryHandler(creationhash);
    creationhash = null;
    return sqh.initdefer.promise.then(setGlobal.bind(null, instancename, sqh));
  });
}

setGlobal('createSinkLevelDBQueryIt', createSinkLevelDBQueryIt);
