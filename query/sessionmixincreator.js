function createSessionMixin (execlib, Query) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function resolver(defer) {
    defer.resolve(true);
  }

  function startnotifier(defer, recordcount) {
    defer.notify([null, null, recordcount]);
    defer = null;
  }

  function QuerableUserSessionMixin () {
    this.queries = new lib.Map();
  }
  QuerableUserSessionMixin.prototype.destroy = function () {
    if (this.queries) {
      this.queries.traverse(resolver);
      this.queries.destroy();
    }
    this.queries = null;
  };
  QuerableUserSessionMixin.prototype.stopQuery = function (deferid, defer) {
    var qd;
    if (!this.queries) {
      defer.resolve(true);
      return;
    }
    qd = this.queries.remove(deferid);
    if (qd) {
      qd.resolve(true);
    }
    defer.resolve(true);
  };
  QuerableUserSessionMixin.prototype.onQueryDeferDone = function (deferid) {
    if (this.queries) {
      this.queries.remove(deferid);
    }
  };
  function onDB (qu, methodname, filterdesc, scaninitially, defer, db) {
    var starteddefer, deferid, oqdr;
    if (!db) {
      defer.reject(new lib.Error('NO_LEVELDB'));
      return;
    }
    if (!qu.queries) {
      defer.reject(new lib.Error('QUERY_DESTROYED'));
      return;
    }
    if (scaninitially) {
      starteddefer = q.defer();
      starteddefer.promise.then(startnotifier.bind(null, defer));
    }
    deferid = lib.uid();
    qu.queries.add(deferid, defer);
    oqdr = qu.onQueryDeferDone.bind(qu, deferid);
    defer.promise.then(
      oqdr,
      oqdr
    );
    defer.notify([null, null, deferid]);
    if (!scaninitially) {
      startnotifier(defer, 0);
    }
    db[methodname](filterdesc, defer, starteddefer);
  }
  QuerableUserSessionMixin.queryMethodGenerator = function (servicetodbcb, methodname) {
    return function (filterdesc, scaninitially, defer) {
      var db;
      if (!(this.user && this.user.__service && this.user.__service.aboutToDie)) {
        defer.reject(new lib.Error('SERVICE_DEAD'));
      }
      db = servicetodbcb(this.user.__service);
      if (db.then) {
        db.then(
          onDB.bind(null, this, methodname, filterdesc, scaninitially, defer),
          defer.reject.bind(defer)
        );
      } else {
        onDB(this, methodname, filterdesc, scaninitially, defer, db);
      }
    };
  };

  QuerableUserSessionMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, QuerableUserSessionMixin,
      'stopQuery',
      'onQueryDeferDone'
    );
  };

  QuerableUserSessionMixin.queryMethodParamDescriptor = [{
    title: 'Filter Descriptor',
    type: 'object'
  },{
    title: 'Scan initially',
    type: 'boolean'
  }];

  QuerableUserSessionMixin.stopQueryMethodDescriptor = {
    stopQuery: [{
      title: 'Defer ID',
      type: 'string'
    }]
  };

  return QuerableUserSessionMixin;

}

module.exports = createSessionMixin;
