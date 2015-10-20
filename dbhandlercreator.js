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
    this.dbname = prophash.dbname;
    this.db = null;
    this.put = null;
    this.get = null;
    this.del = null;
    if (prophash.initiallyemptydb) {
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
  };
  LevelDBHandler.prototype.setDB = function (db, prophash) {
    var _db = this.db;
    this.db = db;
    this.put = q.nbind(this.db.put, this.db);
    this.get = q.nbind(this.db.get, this.db);
    this.del = q.nbind(this.db.del, this.db);
    if (_db && _db.transferCommands) {
      _db.transferCommands(this.db);
    }
  };
  LevelDBHandler.prototype.createDB = function (prophash) {
    this.setDB(levelup(prophash.dbname, lib.extend({}, prophash.dbcreationoptions)), prophash);
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(this);
    }
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
