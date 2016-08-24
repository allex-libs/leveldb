function createHookableUserSessionMixin (execlib) {
  'use strict';

  var lib = execlib.lib;

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
    var doscan = hookobj.scan, dbkeys = hookobj.accounts, checkforlistener = false, d, pser;
    if (!lib.isArray(dbkeys)) {
      defer.resolve(true);
    }
    if (dbkeys.indexOf(HookableUserSessionMixin.ALL_KEYS) >= 0) {
      this.dbkeys = true;
      checkforlistener = true;
    } else {
      this.dbkeys = this.dbkeys || [];
      lib.arryOperations.appendNonExistingItems(this.dbkeys, dbkeys);
      checkforlistener = this.dbkeys.length;
    }
    if (checkforlistener) {
      if (doscan) {
        d = q.defer();
        pser = this.postScan.bind(this, defer, checkforlistener);
        d.promise.then(
          pser,
          pser,
          this.onScan.bind(this));
        this.user.traverseAccounts({}, d);
      } else {
        this.postScan(defer, checkforlistener);
      }
    }
  };

  HookableUserSessionMixin.prototype.onScan = function (accounthash) {
    this.onLevelDBDataChanged(accounthash.key, accounthash.value[0]);
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
      return;
    }
    dbkeys.forEach (this._unhook.bind(this));
    if (!this.dbkeys) {
      this.stopListening();
    }
    defer.resolve('ok');
  };

  HookableUserSessionMixin.prototype.stopListening = function () {
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.dbkeys = null;
  };

  HookableUserSessionMixin.prototype.onLevelDBDataChanged = function (username, balance) {
    this.sendOOB('l',[username, balance]);
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

