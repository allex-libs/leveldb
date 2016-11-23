function createHookableUserSessionMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function HookableUserSessionMixin (leveldb) {
    this.leveldb = leveldb;
    this.dbkeys = null;
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
      'onLevelDBDataChanged'
    );
  };

  HookableUserSessionMixin.ALL_KEYS = '***';

  HookableUserSessionMixin.prototype.destroy = function () {
    this.dbkeys = null;
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.leveldb = null;
  };

  HookableUserSessionMixin.prototype.hook = function (hookobj, defer) {
    var doscan = hookobj.scan, dbkeys = hookobj.accounts || hookobj.keys, checkforlistener = false, d, pser;
    if (!lib.isArray(dbkeys)) {
      defer.resolve(true);
    }
    if (dbkeys.indexOf(HookableUserSessionMixin.ALL_KEYS) >= 0) {
      this.dbkeys = true;
      checkforlistener = true;
    } else {
      this.dbkeys = this.dbkeys || [];
      lib.arryOperations.appendNonExistingItems(this.dbkeys, dbkeys);
      checkforlistener = this.dbkeys.length>0;
    }
    if (checkforlistener) {
      if (doscan) {
        pser = this.postScan.bind(this, defer, checkforlistener);
        this.leveldb.traverse(this.onScan.bind(this), {}).then(
          pser,
          pser
        );
      } else {
        this.postScan(defer, checkforlistener);
      }
    }
    defer = null;
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

  HookableUserSessionMixin.prototype._unhook = function (accountname){
    var ind;
    if (!this.dbkeys) {
      return;
    }
    if (this.dbkeys === true) {
      if (accountname === HookableUserSessionMixin.ALL_KEYS) {
        this.stopListening();
      }
      return;
    }
    ind = this.dbkeys.indexOf(accountname);
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
    defer.resolve('ok');
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
    return true;
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

