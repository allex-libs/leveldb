function createHookableUserSessionMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function HookableUserSessionMixin (leveldb) {
    this.leveldb = leveldb;
    this.isAllPass = false;
    this.dbkeys = [];
    this.dbOpListener = null;
  }

  HookableUserSessionMixin.addMethods = function (UserSession) {
    lib.inheritMethods (UserSession, HookableUserSessionMixin,
      'hook',
      'onScan',
      'postScan',
      '_unhook',
      'unhook',
      'stopListening',
      'onLevelDBDataChanged',
      'pickFromLevelDBAndReport',
      'isKeyValHashOk'
    );
  };

  HookableUserSessionMixin.ALL_KEYS = '***';

  HookableUserSessionMixin.prototype.destroy = function () {
    this.dbkeys = null;
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.isAllPass = null;
    this.leveldb = null;
  };

  HookableUserSessionMixin.prototype.hook = function (hookobj, defer) {
    var doscan = hookobj.scan,
      dbkeys = hookobj.accounts || hookobj.keys,
      checkforlistener = false,
      d,
      pser,
      isallpass;
    if (!lib.isArray(dbkeys)) {
      defer.resolve(true);
    } else {
      isallpass = dbkeys.indexOf(HookableUserSessionMixin.ALL_KEYS) >= 0;
      lib.arryOperations.appendNonExistingItems(this.dbkeys, dbkeys);
    }
    if (isallpass) {
      this.isAllPass = true;
    }
    checkforlistener = this.dbkeys.length>0;
    if (checkforlistener) {
      if (doscan) {
        pser = this.postScan.bind(this, defer, checkforlistener);
        if (isallpass) {
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
        this.postScan(defer, checkforlistener);
      }
    }
    defer = null;
  };

  HookableUserSessionMixin.prototype.pickFromLevelDBAndReport = function (dbkeys, defer) {
    var dbkey = dbkeys.shift(),
      pflar,
      oldc = this.onLevelDBDataChanged.bind(this);
    defer = defer || q.defer();
    if (!dbkey) {
      return defer.promise;
    }
    if (dbkeys.length>0) {
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

  HookableUserSessionMixin.prototype.onScan = function (keyvalhash) {
    if (this.isKeyValHashOk(keyvalhash)) {
      this.onLevelDBDataChanged(keyvalhash.key, keyvalhash.value);
    }
  };

  HookableUserSessionMixin.prototype.postScan = function (defer, checkforlistener) {
    if (checkforlistener) {
      if ( !this.dbOpListener && this.leveldb && this.leveldb.opEvent ) {
        this.dbOpListener = this.leveldb.opEvent.attach(this.onLevelDBDataChanged.bind(this));
      }
    } else {
      this.stopListening();
    }
    defer.resolve(true);
    defer = null;
  };

  HookableUserSessionMixin.prototype._unhook = function (keyname){
    var ind, isallkeys = keyname === HookableUserSessionMixin.ALL_KEYS;
    if (!this.dbkeys) {
      return;
    }
    if (isallkeys) {
      this.isAllPass = false;
    }
    if (this.dbkeys === true) {
      if (isallkeys) {
        this.stopListening();
      }
      return;
    }
    ind = this.dbkeys.indexOf(keyname);
    if (ind >= 0) {
      this.dbkeys.splice(ind, 1);
    }
  };

  HookableUserSessionMixin.prototype.unhook = function (dbkeys, defer) {
    if (!lib.isArray(dbkeys)) {
      this.stopListening();
      defer.resolve(true);
      defer = null;
      return;
    }
    dbkeys.forEach (this._unhook.bind(this));
    if (!this.dbkeys) {
      this.stopListening();
    }
    defer.resolve(true);
    defer = null;
  };

  HookableUserSessionMixin.prototype.stopListening = function () {
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.dbkeys = null;
  };

  HookableUserSessionMixin.prototype.onLevelDBDataChanged = function (key, value) {
    this.sendOOB('l',[key, value]);
  };

  HookableUserSessionMixin.prototype.isKeyValHashOk = function (keyvalhash) {
    if (this.isAllPass) {
      return true;
    }
    return this.dbkeys.indexOf(keyvalhash.key) >= 0
  };

  HookableUserSessionMixin.__methodDescriptors = {
    unhook: [{
      title: 'Unhook',
      type: 'array',
      items: {
        'type': 'string'
      },
      required: false
    }],
    hook : [{
      title: 'Hook',
      type: 'object',
      properties : {
        scan : {
          type : 'boolean',
        },
        accounts : {
          type : 'array',
          items : {
            type : 'string'
          }
        }
      },
      required: ['accounts'],
      additionalProperties : false
    }]
  };

  return HookableUserSessionMixin;

};

module.exports = createHookableUserSessionMixin;

