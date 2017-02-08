'use strict';

var utils = require('./utils'),
  inFCH = utils.instancenameFromCreationHash.bind(null, 'hook'),
  expecterswaiters = require('./expecterswriters'),
  writeForHook = expecterswaiters.writeForWaitable,
  expectForHook = expecterswaiters.expectForWaitable,
  expectEmptyForHook = expecterswaiters.expectEmptyForWaitable;

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
  creationhash.logcb = this.onHookData.bind(this);
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
HookHandler.prototype.hookToLog = function () {
  if (this.defer) {
    this.defer.reject(new lib.Error('HOOK_DYING'));
  }
  this.defer = null;
  if (!this._hook) {
    return;
  }
  return this._hook.hookToLog.apply(this._hook, arguments);
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

function createWriteAndGetInHookIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and get data in hook '+creationhash.expectablename, function () {
    var pe = writeForHook(creationhash), ret;
    ret = expectForHook(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

setGlobal('createWriteAndGetInHookIt', createWriteAndGetInHookIt);

function createWriteAndNotGetInHookIt (creationhash) {
  it ('Write to '+creationhash.dbname+' and NOT get data in hook '+creationhash.expectablename, function () {
    var pe = writeForHook(creationhash), ret;
    ret = expectEmptyForHook(creationhash, pe);
    creationhash = null;
    return ret;
  });
}

setGlobal('createWriteAndNotGetInHookIt', createWriteAndNotGetInHookIt);
