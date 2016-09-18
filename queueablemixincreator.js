function createQueueableMixin (execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function consume(container, processor) {
    if (container.forEach) {
      container.forEach(processor);
    } else if (container.traverse){
      container.traverse(processor);
    } else {
      throw new lib.Error('NOT_A_CONTAINER');
    }
  }

  function QueueableMixin() {
    this.q = new lib.SortedList();
    this._busy = null;
    this._waiters = new lib.Fifo();
    this._checker = this.checkQ.bind(this);
    this._finisher = this.finish.bind(this);
  }
  function trueresolver (waiter) {
    waiter.resolve(true);
  }
  function rejecter(waiter) {
    waiter.reject(_destroyingError);
  }
  QueueableMixin.prototype.destroy = function () {
    this._checker = null;
    if (this._waiters) {
      this._waiters.drain(rejecter);
      this._waiters.destroy();
    }
    this._waiters = null;
    this._busy = null;
    if (this.q) {
      this.q.destroy();
    }
    this.q = null;
  };
  QueueableMixin.prototype.busy = function (defer) {
    if (!this.q) {
      return false;
    }
    var ret = !!this._busy;
    if (ret && defer) {
      this._waiters.push(defer);
    } else {
      defer.resolve(this);
    }
    defer = null;
    return ret;
  };
  QueueableMixin.prototype.whenFree = function (cb) {
    var d = q.defer();
    d.promise.done(
      cb
    );
    this.busy(d);
    cb = null;
  };
  QueueableMixin.prototype.checkQ = function () {
    var q;
    if (this.q.length<1) {
      this._waiters.pop(trueresolver);
      return;
    }
    q = this.q;
    this.q = new lib.SortedList();
    this.processQ(q);
  };
  QueueableMixin.prototype.begin = function (cb) {
    if (this._busy) {
      throw _busyError;
    }
    this._busy = q.defer();
    if ('function' === typeof cb) {
      cb(this._finisher);
    }
    cb = null;
  };
  function qresolver(item) {
    var d = item[2];
    //console.log('qresolver?', item, d);
    if (d && d.resolve ) {
      d.resolve(item[1]);
    }
    item = null;
  }
  function qrejecter(err, item) {
    if (item[2]) {
      item[2].reject(err);
    }
    err = null;
  }
  QueueableMixin.prototype.finish = function (_q, err) {
    //console.log('finish', q, err);
    if (err) {
      console.trace();
      console.log('error in batch', err);
      if (_q) {
        consume(q,qrejecter.bind(null, err));
        if (_q.destroy) {
          _q.destroy();
        }
      }
      this._busy.reject(err);
    } else {
      if (_q) {
        consume(_q,qresolver);
        if (_q.destroy) {
          _q.destroy();
        }
      }
      this._busy.resolve(true);
    }
    this._busy = null;
    this.checkQ();
    _q = null;
  };

  QueueableMixin.inheritMethods = function (childclass) {
    lib.inheritMethods(childclass, QueueableMixin, 'busy', 'whenFree', 'checkQ', 'begin', 'finish');
  };

  QueueableMixin.consume = consume;

  return QueueableMixin;
};

module.exports = createQueueableMixin;
