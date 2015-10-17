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
    this.db = null;
    this.dbput = null;
    this.dbget = null;
    this.dbdel = null;
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
  LevelDBHandler.prototype.setDB = function (db) {
    var _db = this.db;
    this.db = db;
    this.dbput = q.nbind(this.db.put, this.db);
    this.dbget = q.nbind(this.db.get, this.db);
    this.dbdel = q.nbind(this.db.del, this.db);
    if (_db && _db.transferCommands) {
      _db.transferCommands(this.db);
    }
  };
  LevelDBHandler.prototype.createDB = function (prophash) {
    this.setDB(levelup(prophash.dbname, lib.extend({}, prophash.dbcreationoptions)));
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(true);
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
      d = options.defer || q.defer();
    stream.on('data', streamTraverser.bind(null, stream, cb));
    stream.on('end', streamEnder.bind(null, d, stream));
    return d.promise;
  };
  LevelDBHandler.prototype.getReadStream = function (options) {
    return this.db.createReadStream(options);
  };

  return LevelDBHandler;
}

module.exports = createDBHandler;
