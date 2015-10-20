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
  QueueableMixin.prototype.destroy = function () {
    this._checker = null;
    if (this._waiters) {
      while (this._waiters.length) {
        this._waiters.pop().reject(_destroyingError);
      }
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
    return ret;
  };
  QueueableMixin.prototype.whenFree = function (cb) {
    var d = q.defer();
    d.promise.done(
      cb
    );
    this.busy(d);
  };
  QueueableMixin.prototype.checkQ = function () {
    var q;
    if (this.q.length<1) {
      if (this._waiters.length) {
        this._waiters.pop().resolve(true);
      }
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
  };
  function qresolver(item) {
    if (item[2]) {
      item[2].resolve(item[1]);
    }
  }
  function qrejecter(err, item) {
    if (item[2]) {
      item[2].reject(err);
    }
  }
  QueueableMixin.prototype.finish = function (q, err) {
    if (err) {
      console.log('error in batch', err);
      if (q) {
        consume(q,qrejecter.bind(null, err));
        if (q.destroy) {
          q.destroy();
        }
      }
      this._busy.reject(err);
    } else {
      if (q) {
        consume(q,qresolver);
        if (q.destroy) {
          q.destroy();
        }
      }
      this._busy.resolve(true);
    }
    this._busy = null;
    this.checkQ();
  };

  QueueableMixin.inheritMethods = function (childclass) {
    lib.inheritMethods(childclass, QueueableMixin, 'busy', 'whenFree', 'checkQ', 'begin', 'finish');
  };

  QueueableMixin.consume = consume;

  return QueueableMixin;
};

module.exports = createQueueableMixin;
