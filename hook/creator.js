function createHook (execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    KeysHandler = require('./keyshandlercreator')(execlib);


  function Hook (prophash) {
    if (!prophash.leveldb) {
      throw new lib.Error('NO_LEVELDB_TO_HOOK_ON', 'Property hash has to have a leveldb property');
    }
    this.leveldb = prophash.leveldb;
    this.isAllPass = false;
    this.keys = new KeysHandler();
    this.dbOpListener = null;
    this.cb = prophash.cb;
  }

  Hook.addMethods = function (klass) {
    lib.inheritMethods (klass, Hook,
      'hook',
      'onScan',
      'postScan',
      '_unhook',
      'unhook',
      'stopListening',
      'onLevelDBDataChanged',
      'pickFromLevelDBAndReport',
      'isKeyValHashOk',
      'isKeyOk',
      'unhook'
    );
  };

  Hook.ALL_KEYS = KeysHandler.ALL_KEYS;

  Hook.prototype.destroy = function () {
    this.cb = null;
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.isAllPass = null;
    this.leveldb = null;
  };

  Hook.prototype.hook = function (hookobj, defer) {
    var doscan = hookobj.scan,
      dbkeys = hookobj.accounts || hookobj.keys,
      checkforlistener = false,
      nkh,
      pser,
      ret;
    defer = defer || q.defer();
    ret = defer.promise;
    nkh = this.keys.add(dbkeys);
    if (!nkh) {
      defer.resolve(true);
    }
    if (doscan) {
      pser = this.postScan.bind(this, defer);
      if (nkh.isAllPass) {
        this.leveldb.traverse(this.onScan.bind(this), {}).then(
          pser,
          pser
        );
      } else {
       this.pickFromLevelDBAndReport(dbkeys).then(
        pser,
        pser
       ) 
      }
    } else {
      this.postScan(defer);
    }
    defer = null;
    return ret;
  };

  Hook.prototype.pickFromLevelDBAndReport = function (dbkeys, defer) {
    var dbkl = dbkeys.length,
      dbkey = dbkeys.shift(),
      pflar,
      oldc = this.onLevelDBDataChanged.bind(this);
    defer = defer || q.defer();
    if (dbkl>0) {
      pflar = this.pickFromLevelDBAndReport.bind(this, dbkeys, defer);
    } else {
      pflar = defer.resolve.bind(defer, true);
    }
    this.leveldb.get(dbkey).then(function (val) {
      oldc(dbkey, val);
      if (pflar) {
        pflar();
        pflar = null;
      }
      dbkey = null;
      oldc = null;
    }, function (reason) {
      if (pflar) {
        pflar();
        pflar = null;
      }
      dbkey = null;
      oldc = null;
    });
    return defer.promise;
  };

  Hook.prototype.onScan = function (keyvalhash) {
    if (this.isKeyValHashOk(keyvalhash)) {
      this.onLevelDBDataChanged(keyvalhash.key, keyvalhash.value);
    }
  };

  Hook.prototype.postScan = function (defer) {
    if (this.keys.isEmpty()) {
      console.log('keys', this.keys, 'isEmpty');
      this.stopListening();
    } else {
      if ( !this.dbOpListener && this.leveldb) {
        if ( this.leveldb.opEvent ) {
          this.dbOpListener = this.leveldb.opEvent.attach(this.onLevelDBDataChanged.bind(this));
        } else {
          console.warn('LevelDB instance is not waitable!');
        }
      }
    }
    defer.resolve(true);
    defer = null;
  };

  Hook.prototype._unhook = function (key){
    this.keys.remove(key);
  };

  Hook.prototype.unhook = function (dbkeys, defer) {
    var ret;
    defer = defer || q.defer();
    ret = defer.promise;
    if (!lib.isArray(dbkeys)) {
      this.stopListening();
      defer.resolve(true);
      defer = null;
      return;
    }
    dbkeys.forEach (this._unhook.bind(this));
    if (this.keys.isEmpty()) {
      this.stopListening();
    }
    defer.resolve(true);
    defer = null;
    return ret;
  };

  Hook.prototype.stopListening = function () {
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.dbkeys = null;
  };

  Hook.prototype.onLevelDBDataChanged = function (key, value) {
    if (this.cb && this.isKeyOk(key)) {
      this.cb(key, value);
    }
  };

  Hook.prototype.isKeyValHashOk = function (keyvalhash) {
    if (this.isAllPass) {
      return true;
    }
    return this.isKeyOk(keyvalhash.key);
  };

  Hook.prototype.isKeyOk = function (key) {
    return this.keys.isOk(key);
  };

  return Hook;
}

module.exports = createHook;
