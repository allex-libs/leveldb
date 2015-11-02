function createDBArray(execlib, leveldblib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    QueueableHandler = leveldblib.QueueableHandler;

  function keyEncodingFor(indexsize) {
    switch(indexsize) {
      case 'tiny':
        return leveldblib.Int8Codec;
      case 'short':
        return leveldblib.Int16Codec;
      case 'standard':
        return leveldblib.Int32Codec;
      case 'big':
        return leveldblib.Int64Codec;
      default:
        return leveldblib.Int32Codec;
    }
  }

  var _notInitiatedError = new lib.Error('NOT_INITIATED_YET', 'DBArrayHandler needs to be initiated to work');

  function DBArrayHandler(prophash) {
    prophash = prophash || {};
    prophash.dbcreationoptions = lib.extend(prophash.dbcreationoptions || {}, {
      keyEncoding: keyEncodingFor(prophash.indexsize)
    });
    QueueableHandler.call(this, prophash);
    this.head = Infinity;
    this.tail = 0;
    this.startfromone = prophash.startfromone;
  }
  lib.inherit(DBArrayHandler, QueueableHandler);
  DBArrayHandler.prototype.destroy = function () {
    if (this.db && this.db.close) {
      this.db.close();
    }
    this.db = null;
    this.startfromone = null;
    this.tail = null;
    this.head = null;
    console.log('DBArrayHandler destroyed');
  };
  DBArrayHandler.prototype.setDB = function (db, prophash) {
    QueueableHandler.prototype.setDB.call(this, db, prophash);
    if (this.db && this.db.createReadStream) {
      this.traverse(this.onInitTraversal.bind(this)).done(
        this.onInitDone.bind(this, prophash)
      );
    }
  };
  DBArrayHandler.prototype.onInitDone = function (prophash) {
    if (this.head === Infinity) {
      this.head = 0; //empty array
    } else {
      if (!this.startfromone) {
        this.tail++;
      } else {
        this.head--;
      }
    }
    console.log('init done', this.head, this.tail, prophash.dbname, prophash.starteddefer);
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(this);
    }
  };
  DBArrayHandler.prototype.onInitTraversal = function (item) {
    if (this.head === null) {
      return;
    }
    if (item.key<this.head) {
      this.head = item.key;
    }
    if (item.key>this.tail) {
      this.tail = item.key;
    }
  };
  DBArrayHandler.prototype.doMany = function (puttername, itemcontainer, defer) {
    //console.log('doMany', puttername, itemcontainer.length ? itemcontainer.length : itemcontainer);
    var commandcontainer = new lib.SortedList(),
      realputtername = this.startfromone ? puttername+'StartFromOne' : puttername;
    if ('number' === typeof itemcontainer) {
      for (var i=0; i<itemcontainer; i++) {
        this[realputtername](commandcontainer, null, i);
      }
    } else {
      QueueableHandler.consume(itemcontainer, this[realputtername].bind(this, commandcontainer));
    }
    if (defer) {
      defer.resolve(this.processQ.bind(this, commandcontainer));
      /*
      this.processQ(commandcontainer).done(
        defer.resolve.bind(defer),
        defer.reject.bind(defer),
        defer.notify.bind(defer)
      );
      */
    } else {
      this.processQ(commandcontainer);
    }
  };
  DBArrayHandler.prototype.push = function (item, defer) {
    /* for testing the no-operation
    if (defer) {
      defer.resolve({});
    }
    return;
    */
    if (this.head === Infinity) {
      if (defer) {
        defer.reject(_notInitiatedError);
      }
    }
    if (this.startfromone) {
      this.dbPerform('put', [++this.tail, item], defer);
    } else {
      this.dbPerform('put', [this.tail++, item], defer);
    }
  };
  DBArrayHandler.prototype.manyPutterStartFromOne = function(container, item) {
    container.push(['put', [++this.tail, item]]);
  };
  DBArrayHandler.prototype.manyPutter = function(container, item) {
    container.push(['put', [this.tail++, item]]);
  };
  DBArrayHandler.prototype.pushMany = function (itemcontainer, defer) {
    console.log(this.head, this.tail, 'pushMany', itemcontainer.length);
    this.doMany('manyPutter', itemcontainer, defer);
  };
  DBArrayHandler.prototype.shift = function (defer) {
    if (this.head === Infinity) {
      if (defer) {
        defer.reject(_notInitiatedError);
      }
    }
    if (this.startfromone) {
      this.dbPerform('del', [++this.head], defer);
    } else {
      this.dbPerform('del', [this.head++], defer);
    }
  };
  DBArrayHandler.prototype.manyShifterStartFromOne = function(container) {
    container.push(['del', [++this.head]]);
  };
  DBArrayHandler.prototype.manyShifter = function(container) {
    container.push(['del', [this.head++]]);
  }
  DBArrayHandler.prototype.shiftMany = function (howmany, defer) {
    this.whenFree(this.doShiftMany.bind(this, howmany, defer));
  };
  DBArrayHandler.prototype.doShiftMany = function (howmany, defer) {
    console.log(this.head, this.tail, 'shiftMany', howmany);
    var items = [],
      start = this.startfromone ? this.head+1 : this.head,
      d = q.defer();
    d.promise.done(
      function (finalizer) {
        defer.resolve({items:items, finalizer:finalizer});
      },
      //defer.resolve.bind(defer,items),
      defer.reject.bind(defer),
      defer.notify.bind(defer)
    );
    try {
    this.begin();
    this.readInto(items, {keys: false, gte: start, lt: start+howmany}).done(
      this.finishAndContinueWith.bind(this, 'manyShifter', howmany, d),
      defer.reject.bind(defer)
    );
    } catch(e) {
      console.error(e.stack);
      console.error(e);
    }
  };
  DBArrayHandler.prototype.pop = function (defer) {
    if (this.head === Infinity) {
      if (defer) {
        defer.reject(_notInitiatedError);
      }
    }
    if (this.startfromone) {
      this.dbPerform('del', [this.tail--], defer);
    } else {
      this.dbPerform('del', [--this.tail], defer);
    }
  };
  DBArrayHandler.prototype.manyPopperStartFromOne = function(container, item) {
    container.push(['del', [this.tail--]]);
  };
  DBArrayHandler.prototype.manyPopper = function(container, item) {
    container.push(['del', [--this.tail]]);
  }
  DBArrayHandler.prototype.popMany = function (howmany, defer) {
    var items = [],
      start = this.startfromone ? this.head+1 : this.head,
      d = q.defer();
    d.promise.done(
      defer.resolve.bind(defer,items),
      defer.reject.bind(defer),
      defer.notify.bind(defer)
    );
    this.begin();
    this.readInto(items, {keys: false, gte: start, lt: start+howmany}).done(
      this.finishAndContinueWith.bind(this, 'manyPopper', howmany, d),
      defer.reject.bind(defer)
    );
  };
  DBArrayHandler.prototype.finishAndContinueWith = function(processorname, howmany, defer) {
    var _q = this.q;
    this.q = new lib.SortedList();
    this.finish();
    this.q = _q;
    this.doMany(processorname, howmany, defer);
  };
  
  return DBArrayHandler;
}

module.exports = createDBArray;
