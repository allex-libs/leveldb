var levelup = require('level'),
  child_process = require('child_process');

function createDBHandler (execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function FakeDB() {
    this.q = new lib.Fifo();
  }
  FakeDB.prototype.put = function (key, val, options, cb) {
    this.q.push(['put', [key, val, options, cb]]);
  };
  FakeDB.prototype.get = function (key, options, cb) {
    this.q.push(['get', key, options, cb]);
  };
  FakeDB.prototype.transferCommands = function (db) {
    while (this.q.length) {
      var cp = this.q.pop(),
        command = cp[0],
        args = cp[1];
      db[command].apply(db,args);
    }
  };


  function LevelDBHandler(prophash) {
    var err;
    this.dbname = prophash.dbname;
    if (!this.dbname) {
      if (prophash.starteddefer) {
        err = new lib.Error('NO_DBNAME_IN_PROPERTYHASH','Property hash for LevelDBHandler misses the dbname property');
        prophash.starteddefer.reject(err);
        return;
      } else {
        throw err;
      }
    }
    this.db = null;
    this.put = null;
    this.get = null;
    this.del = null;
    if (prophash.initiallyemptydb) {
      console.log(prophash.dbname, 'initiallyemptydb!');
      this.setDB(new FakeDB());
      child_process.exec('rm -rf '+prophash.dbname, this.createDB.bind(this, prophash));
    } else {
      this.createDB(prophash);
    }
  }
  LevelDBHandler.prototype.destroy = function () {
    if (!this.db) {
      return;
    }
    if (this.db.close) {
      this.db.close();
    }
    if (this.db.destroy) {
      this.db.destroy();
    }
    this.db = null;
    this.dbname = null;
  };

  function properPutterCB(key, val, defer, err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve([key, val]);
    }
  }

  function createProperPutter(db) {
    return function (key, val, options) {
      var d = q.defer();
      db.put(key, val, options, properPutterCB.bind(null, key, val, d));
      return d.promise;
    };
  }
  LevelDBHandler.prototype.setDB = function (db, prophash) {
    var _db = this.db;
    this.db = db;
    //this.put = q.nbind(this.db.put, this.db);
    this.put = createProperPutter(this.db);
    this.get = q.nbind(this.db.get, this.db);
    this.del = q.nbind(this.db.del, this.db);
    if (_db && _db.transferCommands) {
      _db.transferCommands(this.db);
    }
  };
  LevelDBHandler.prototype.createDB = function (prophash) {
    levelup(prophash.dbname, lib.extend({}, prophash.dbcreationoptions), this.onLevelDBCreated.bind(this, prophash));
  };
  LevelDBHandler.prototype.onLevelDBCreated = function (prophash, err, db) {
    if (!this.dbname) {
      return;
    }
    if (err) {
      console.error(prophash.dbname, 'could not be started now', err);
      lib.runNext(this.createDB.bind(this, prophash), 1000);
      return;
    }
    this.setDB(db, prophash);
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(this);
    }
  };
  function putterAfterProcessor(handler, defer, key, item) {
    if (item === null) {
      defer.resolve(null);
      return;
    }
    handler.put(key, item).then(
      defer.resolve.bind(defer),
      defer.reject.bind(defer)
    );
  }
  function offerrerToProcessor(handler, defer, key, processorfunc, item) {
    var procret = processorfunc(item, key);
    if (procret && 'function' === typeof procret.then){
      procret.then(
        putterAfterProcessor.bind(null, handler, defer, key),
        function (error) {
          console.error('Error in putting data during upsert!', error);
          defer.reject(error);
        }
        //defer.reject.bind(defer)
      );
    } else {
      putterAfterProcessor(handler, defer, key, procret);
    }
  }
  function errorOfferrerToProcessor(handler, defer, key, processorfunc, error) {
    if (error.notFound) {
      offerrerToProcessor(handler, defer, key, processorfunc, null);
    } else {
      console.error('Error in getting data for upsert!', error);
      defer.reject(error);
    }
  }
  LevelDBHandler.prototype.upsert = function (key, processorfunc) {
    if ('function' !== typeof processorfunc) {
      return q.reject(lib.Error('PROCESSOR_NOT_A_FUNCTION'));
    }
    var d = q.defer();
    this.get(key).then(
      offerrerToProcessor.bind(null, this, d, key, processorfunc),
      errorOfferrerToProcessor.bind(null, this, d, key, processorfunc)
    );
    return d.promise;
  };
  function streamTraverser(stream, cb, item) {
    cb(item, stream);
  }
  function streamEnder(defer, stream) {
    stream.removeAllListeners();
    defer.resolve(true);
  }
  LevelDBHandler.prototype.traverse = function (cb, options) {
    var stream = this.getReadStream(options),
      d = (options ? options.defer : null) || q.defer();
    stream.on('data', streamTraverser.bind(null, stream, cb));
    stream.on('end', streamEnder.bind(null, d, stream));
    return d.promise;
  };
  function pusher(container, item) {
    container.push(item);
  }
  LevelDBHandler.prototype.readInto = function (container, options) {
    return this.traverse(pusher.bind(null, container), options);
  }; 
  function notifier(defer, item) {
    defer.notify(item);
  }
  LevelDBHandler.prototype.streamInto = function (defer, options) {
    return this.traverse(notifier.bind(null, defer), options);
  }
  LevelDBHandler.prototype.getReadStream = function (options) {
    //console.log('createReadStream', options);
    return this.db.createReadStream(options);
  };

  return LevelDBHandler;
}

module.exports = createDBHandler;
