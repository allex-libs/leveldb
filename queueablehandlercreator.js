function createQueueableHandler(execlib, leveldblib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    DBHandler = leveldblib.LevelDBHandler,
    QueueableMixin = leveldblib.QueueableMixin,
    consume = QueueableMixin.consume;

  var _destroyingError = new lib.Error('DESTROYING', 'DBHandler is destroying');
  var _busyError = new lib.Error('BUSY', 'DBHandler is busy');

  function QueueableDBHandler(prophash) {
    DBHandler.call(this, prophash);
    QueueableMixin.call(this);
  }
  lib.inherit(QueueableDBHandler, DBHandler);
  QueueableMixin.inheritMethods(QueueableDBHandler);
  QueueableDBHandler.prototype.destroy = function () {
    QueueableMixin.prototype.destroy.call(this);
    DBHandler.prototype.destroy.call(this);
  };
  QueueableDBHandler.prototype.dbPerform = function (operation, args, defer) {
    if (!this.q) {
      if (defer) {
        defer.reject(_destroyingError);
      }
      return;
    }
    var qitem = defer ? [operation, args, defer] : [operation, args];
    if (this._busy) {
      this.q.add(qitem);
      return;
    }
    var m = this[operation];
    if (!m) {
      console.log('no method named', operation);
      this.checkQ();
      return;
    }
    /*
    this.begin();
    var ret = m.apply(this,args);
    ret.then(
      this.finish.bind(this, null),
      this.finish.bind(this, null, null)
    );
    */
    this.processQ([qitem]);
  };
  function putter(batch, opevent, item) {
    var operationname = item[0],
      operation = batch[operationname],
      defer = item[2];
    if (operation) {
      //console.log(operationname, 'for batch', item[1]);
      if (opevent) {
        if (operationname === 'put') {
          defer.promise.then(opevent.fire.bind(opevent, item[1][0], item[1][1]));
        }
        if (operationname === 'del') {
          defer.promise.then(opevent.fire.bind(opevent, item[1][0]));
        }
      }
      try {
      operation.apply(batch, item[1]);
      } catch (e) {
        if (defer) {
          defer.reject(e);
        } else {
          throw e;
        }
      }
    }
  }
  QueueableDBHandler.prototype.processQ = function (_q) {
    var ret, batch;
    if (this._busy) {
      console.trace();
      console.log(this.dbname, 'BUSYYYYYY');
      return q.reject(_busyError);
    }
    if (_q.length < 1) {
      return q(true);
    }
    //console.log('processQ', _q.length);
    this.begin();
    ret = this._busy.promise;
    batch = this.db.batch();
    try {
      consume(_q, putter.bind(null, batch, this.opEvent));
    } catch (e) {
      this._busy.reject(e);
      this._busy = null;
    }
    if (this._busy) {
      batch.write(this.finish.bind(this, _q));
    }
    batch = null;
    return ret;
  };
  QueueableDBHandler.consume = consume;

  return QueueableDBHandler;
}

module.exports = createQueueableHandler;

