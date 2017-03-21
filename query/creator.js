function createQuery (execlib, datafilterslib) {
  'use strict';
  var lib = execlib.lib;

  function Query (id, leveldb, filters) {
    this.id = id;
    this.leveldb = leveldb;
    this.defers = new lib.Fifo();
    this.traversers = new lib.Fifo();
    this.keyfilter = null;
    this.valfilter = null;
    this.listener = null;
    if (filters) {
      this.keyfilter = datafilterslib.createFromDescriptor(filters.keys);
      this.valfilter = datafilterslib.createFromDescriptor(filters.values);
    } else {
      this.keyfilter = datafilterslib.createFromDescriptor(null);
      this.valfilter = datafilterslib.createFromDescriptor(null);
    }
    if (leveldb.opEvent) {
      this.listener = leveldb.opEvent.attach(this.onLevelDBData.bind(this));
    }
  }
  function resolver(defer) {
    defer.resolve(true);
  }
  Query.prototype.destroy = function () {
    var ds, ts;
    if (this.listener) {
      this.listener.destroy();
    }
    this.listener = null;
    if (this.valfilter) {
      this.valfilter.destroy();
    }
    this.valfilter = null;
    if (this.keyfilter) {
      this.keyfilter.destroy();
    }
    this.keyfilter = null;
    ts = this.traversers;
    this.traversers = null;
    if (ts) {
      lib.containerDestroyAll(ts);
      ts.destroy();
    }
    ds = this.defers;
    this.defers = null;
    if (ds) {
      ds.drain(resolver);
      ds.destroy();
    }
    if (this.leveldb && this.id && this.leveldb.queries) {
      this.leveldb.queries.remove(this.id);
    }
    this.leveldb = null;
    this.id = null;
  };
  function traverser (query, defer, keyvalue) {
    if (defer && query.defers && query.traversers) {
      defer.notify([keyvalue.key, keyvalue.value]);
    } else {
      defer = null;
    }
  };
  Query.prototype.add = function (defer, starteddefer) {
    var traverseevents, traverseitem;
    if (starteddefer) {
      traverseevents = new lib.Fifo();
      traverseitem = this.traversers.push(traverseevents);
      this.leveldb.traverse(traverser.bind(null, this, defer), {
        keyfilter: this.keyfilter.__descriptor, 
        filter: this.valfilter.__descriptor
      }).then(
        this.onTraverseDone.bind(this, defer, traverseitem, starteddefer)
      );
    } else {
      this.onTraverseDone(defer);
    }
  };
  Query.prototype.removeDeferItem = function (item) {
    if (!this.defers) {
      return;
    }
    this.defers.remove(item);
    if (this.defers.length < 1) {
      this.destroy();
    }
  };
  function pusher (n, fifo) {
    fifo.push(n);
  }
  function notifier (n, defer) {
    defer.notify(n);
  }
  Query.prototype.onLevelDBData = function (key, value) {
    var kva;
    if (!(this.defers && this.traversers)) {
      return;
    }
    if (this.keyfilter.isOK(key) && this.valfilter.isOK(value)) {
      kva = [key, value];
      this.traversers.traverse(pusher.bind(null, kva));
      this.defers.traverse(notifier.bind(null, kva));
    }
  };
  Query.prototype.onTraverseDone = function (defer, traverseitem, starteddefer) {
    var recordcount, deferitem, fifo;
    if (!this.traversers) {
      return;
    }
    if (traverseitem) {
      recordcount = traverseitem.content.length;
      fifo = traverseitem.content;
      if (fifo && fifo.length) {
        fifo.drain(defer.notify.bind(defer));
      }
      this.traversers.remove(traverseitem);
    } else {
      recordcount = 0;
    }
    if (starteddefer) {
      starteddefer.resolve(recordcount);
    }
    deferitem = this.defers.push(defer);
    defer.promise.then(this.removeDeferItem.bind(this, deferitem));
  };

  return Query;
}

module.exports = createQuery;
