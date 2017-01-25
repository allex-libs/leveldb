'use strict';

var utils = require('./utils'),
  inFCH = utils.instancenameFromCreationHash.bind(null, 'hook');

function HookHandlerBase (creationhash) {
  this.defer = null;
  this.cb = creationhash.cb;
}
HookHandlerBase.prototype.destroy = function () {
  var d = this.defer;
  this.cb = null;
  this.defer = null;
  if (d) {
    d.reject(new lib.Error('HOOK_DEAD'));
  }
};
HookHandlerBase.prototype.onHookData = function () {
  if (this.cb) {
    this.cb.apply(null, arguments);
  }
  if (this.defer) {
    this.defer.resolve(this.hookDataArgs2Defer(arguments));
    this.defer = null;
  }
};
HookHandlerBase.prototype.onLogHookData = function () {
  if (this.cb) {
    this.cb.apply(null, arguments);
  }
  if (this.defer) {
    this.defer.resolve(this.hookDataArgs2Defer(arguments));
    this.defer = null;
  }
};
HookHandlerBase.prototype.wait = function () {
  if (this.defer) {
    this.defer.resolve([]);
  }
  this.defer = q.defer();
  return this.defer.promise;
};

function HookHandler(ctor, creationhash) {
  HookHandlerBase.call(this, creationhash);
  creationhash.cb = this.onHookData.bind(this);
  this._hook = null;
  if (lib.isFunction(ctor)) {
    this._hook = new ctor(creationhash);
  } else {
    this._hook = ctor;
  }
  if (creationhash.hookTo) {
    this._hook.hook(creationhash.hookTo).then(
      creationhash.starteddefer.resolve.bind(creationhash.starteddefer, this)
    );
  } else if (creationhash.hookToLog) {
    this._hook.hookToLog(creationhash.hookToLog).then(
      creationhash.starteddefer.resolve.bind(creationhash.starteddefer, this)
    );
  }else {
    creationhash.starteddefer.resolve(this);
  }
}
lib.inherit(HookHandler, HookHandlerBase);
HookHandler.prototype.destroy = function () {
  if (this._hook) {
    this._hook.destroy();
  }
  this._hook = null;
  HookHandlerBase.prototype.destroy.call(this);
};
HookHandler.prototype.hook = function () {
  if (this.defer) {
    this.defer.reject(new lib.Error('HOOK_DYING'));
  }
  this.defer = null;
  if (!this._hook) {
    return;
  }
  return this._hook.hook.apply(this._hook, arguments);
};
HookHandler.prototype.unhook = function (keys) {
  return this._hook.unhook(keys);
};
HookHandler.prototype.unhookFroLog = function (keys) {
  return this._hook.unhookFroLog(keys);
};
HookHandler.prototype.hookDataArgs2Defer = function (args) {
  return Array.prototype.slice.call(args, 0);
};

function SinkHookHandler (sink, creationhash) {
  HookHandlerBase.call(this, creationhash);
  this.sink = sink;
  if (creationhash.hookTo) {
    this.sink.consumeChannel('l', this.onHookData.bind(this));
    this.sink.sessionCall('hook', creationhash.hookTo).then(
      creationhash.starteddefer.resolve.bind(creationhash.starteddefer, this)
    );
  } else if (creationhash.hookToLog) {
    this.sink.consumeChannel('g', this.onLogHookData.bind(this));
    this.sink.sessionCall('hookToLog', creationhash.hookToLog).then(
      creationhash.starteddefer.resolve.bind(creationhash.starteddefer, this)
    );
  }
}
lib.inherit(SinkHookHandler, HookHandlerBase);
SinkHookHandler.prototype.destroy = function () {
  this.sink = null;
  HookHandlerBase.prototype.destroy.call(this);
};
SinkHookHandler.prototype.hookDataArgs2Defer = function (args) {
  return args[0];
};
SinkHookHandler.prototype.hook = function (keysscanobj) {
  return this.sink.sessionCall('hook', keysscanobj);
};
SinkHookHandler.prototype.unhook = function (keysscanobj) {
  return this.sink.sessionCall('unhook', keysscanobj);
};

function createLevelDBHookIt (creationhash) {
  var _in = inFCH;
  it('Creating a HookHandler instance named '+_in(creationhash), function () {
    var instancename = _in(creationhash),
      ctor = getGlobal(creationhash.ctor) || leveldblib.Hook,
      db = creationhash.db,
      p;
    _in = null;
    if (lib.isString(creationhash.leveldb)) {
      creationhash.leveldb = getGlobal(creationhash.leveldb);
    }
    creationhash.starteddefer = q.defer();
    p = creationhash.starteddefer.promise;
    new HookHandler(ctor, creationhash);
    creationhash = null;
    return setGlobal(instancename, p);
  });
}

setGlobal('createLevelDBHookIt', createLevelDBHookIt);

function createSinkLevelDBHookIt (creationhash) {
  var _in = inFCH;
  it('Hooking (LevelDB) to sink '+creationhash.sinkname+' as '+_in(creationhash), function () {
    var instancename = _in(creationhash),
      p;
    _in = null;
    creationhash.starteddefer = q.defer();
    p = creationhash.starteddefer.promise;
    new SinkHookHandler(getGlobal(creationhash.sinkname), creationhash);
    creationhash = null;
    return setGlobal(instancename, p);
  });
}

setGlobal('createSinkLevelDBHookIt', createSinkLevelDBHookIt);

function writeForSingleHook (creationhash) {
  var db = getGlobal(creationhash.dbname),
    hook = getGlobal(creationhash.hookname),
    key = creationhash.key,
    val = creationhash.value,
    putparams = creationhash.putparams,
    expct = creationhash.expect || val,
    p,
    w;
  creationhash = null;
  w = hook.wait();
  p = putparams ? db.put.apply(db, putparams) : db.put(key, val);
  p.then(
    hook.wait.bind(hook)
  );
  return {promise: w, expect: expct};
}

function writeForHookArray (creationhash) {
  var db = getGlobal(creationhash.dbname),
    hooks = creationhash.hookname.map(getGlobal),
    key = creationhash.key,
    val = creationhash.value,
    putparams = creationhash.putparams,
    expct = creationhash.expect || val,
    p,
    w;
  function waiter (_h) {return _h.wait();}
  w = q.all(hooks.map(waiter));
  p = putparams ? db.put.apply(db, putparams) : db.put(key, val);
  p.then(hooks.forEach.bind(hooks, waiter));
  return {promise: w, expect: expct};
}

function writeForHook (creationhash) {
  if (lib.isArray(creationhash.hookname)) {
    return writeForHookArray(creationhash);
  }
  return writeForSingleHook(creationhash);
}

function expectForHook (creationhash, pe) {
  if (lib.isArray(creationhash.hookname)) {
    return pe.promise.then(function (res) {
      res.forEach(function(v) {
        expect(v[1]).to.equal(pe.expect)
      });
      pe = null;
      return q(true);
    });
  } else {
    return expect(pe.promise).to.eventually.have.property(1, pe.expect);
  }
}

function createWriteAndGetInHookIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and get data in hook '+creationhash.hookname, function () {
    var pe = writeForHook(creationhash), ret;
    ret = expectForHook(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

setGlobal('createWriteAndGetInHookIt', createWriteAndGetInHookIt);

function expectEmptyForHook (creationhash, pe) {
  if (lib.isArray(creationhash.hookname)) {
    return pe.promise.then(function (res) {
      res.forEach(function (r) {
        expect(r).to.be.empty;
      });
    });
  }
  return expect(pe.promise).to.eventually.be.empty;
}

function createWriteAndNotGetInHookIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and NOT get data in hook '+creationhash.hookname, function () {
    var pe = writeForHook(creationhash), ret;
    ret = expectEmptyForHook(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

setGlobal('createWriteAndNotGetInHookIt', createWriteAndNotGetInHookIt);
