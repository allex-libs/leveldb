var levelup = require('level-browserify'),
  child_process = require('child_process'),
  Path = require('path'),
  mkdirp = require('mkdirp');

function createDBHandler (execlib, datafilterslib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;

  function onDirMade(defer, err) {
    var pa;
    if (err && err.code && err.code === 'ENOENT') {
      pa = err.path.split(Path.sep);
      console.log(pa);
      return;
    }
    defer.resolve(true);
    defer = null;
  }

  function preparePath(path) {
    var pp = Path.parse(path),
      d = q.defer();
    mkdirp(pp.dir, onDirMade.bind(null, d));
    return d.promise;
  }

  function errorraiser (defer, error) {
    if (defer && lib.isFunction(defer.reject)) {
      defer.reject(error);
    }
    defer = null;
  }

  function FakeDB() {
    this.q = new lib.Fifo();
  }
  FakeDB.prototype.put = function (key, val, options, cb) {
    this.q.push(['put', [key, val, options, cb]]);
  };
  FakeDB.prototype.get = function (key, options, cb) {
    this.q.push(['get', [key, options, cb]]);
  };
  FakeDB.prototype.del = function (key, options, cb) {
    this.q.push(['del', [key, options, cb]]);
  };
  FakeDB.prototype.transferCommands = function (db) {
    if (!this.q) {
      return;
    }
    while (this.q.getFifoLength()) {
      var cp = this.q.pop(),
        command = cp[0],
        args = cp[1];
      db[command].apply(db,args);
    }
    this.q.destroy();
    this.q = null;
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
    this.opEvent = prophash.listenable ? new lib.HookCollection() : null;
    this.setDB(new FakeDB());
    if (prophash.initiallyemptydb) {
      console.log(prophash.dbname, 'initiallyemptydb!');
      child_process.exec('rm -rf '+prophash.dbname, this.createDB.bind(this, prophash));
    } else {
      this.createDB(prophash);
    }
  }
  LevelDBHandler.prototype.destroy = function () {
    if (this.opEvent) {
      this.opEvent.destroy();
    }
    this.opEvent = null;
    this.del = null;
    this.get = null;
    this.put = null;
    if (this.db && this.db.close) {
      this.db.close();
    }
    if (this.db && this.db.destroy) {
      this.db.destroy();
    }
    this.db = null;
    this.dbname = null;
  };

  function properPutterCB(key, val, defer, err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve([key,val]);
      if (this.opEvent) {
        this.opEvent.fire(key, val);
      }
    }
    key = null;
    val = null;
    defer = null;
  }
  function properPutter(key, val, options) {
    var d = q.defer();
    if (!this.db) {
      return;
    }
    this.db.put(key, val, options, properPutterCB.bind(this, key, val, d));
    return d.promise;
  }
  function properDelerCB(key, defer, err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(key);
      if (this.opEvent) {
        this.opEvent.fire(key);
      }
    }
    key = null;
    defer = null;
  }
  function properDeler(key, options) {
    var d = q.defer();
    if (!this.db) {
      return;
    }
    this.db.del(key, properDelerCB.bind(this, key, d));
    return d.promise;
  }
  LevelDBHandler.prototype.setDB = function (db, prophash) {
    var _db = this.db;
    this.db = db;
    //this.put = q.nbind(this.db.put, this.db);
    this.put = properPutter.bind(this);
    this.get = q.nbind(this.db.get, this.db);
    //this.del = q.nbind(this.db.del, this.db);
    this.del = properDeler.bind(this);
    if (_db && _db.transferCommands) {
      _db.transferCommands(this.db);
    }
  };
  LevelDBHandler.prototype.createDB = function (prophash) {
    levelup(prophash.dbname, lib.extend({}, prophash.dbcreationoptions), this.onLevelDBCreated.bind(this, prophash));
  };
  LevelDBHandler.prototype.onLevelDBCreated = function (prophash, err, db) {
    if (!this.dbname) {
      if (prophash.starteddefer) {
        prophash.starteddefer.reject(new lib.Error('NO_LEVELDB_NAME_SPECIFIED'));
      }
      return;
    }
    if (err) {
      if(err.message && /IO error.*LOCK/.test(err.message)) {
        preparePath(prophash.dbname).then(
          this.createDB.bind(this, prophash)
        );
        return;
      }
      console.error(prophash.dbname, 'could not be started now', err);
      lib.runNext(this.createDB.bind(this, prophash), 1000);
      return;
    }
    this.setDB(db, prophash);
    if (prophash.starteddefer) {
      //console.log(this.dbname, 'resolving starteddefer');
      prophash.starteddefer.resolve(this);
    }
  };

  function resultReporter(result) {
    return q(result);
  }

  function errorReporter(deflt, error) {
    if (error.notFound) {
      return q(deflt);
    } else {
      return q.reject(error);
    }
  };

  LevelDBHandler.prototype.getWDefault = function (key, deflt) {
    return this.get(key).then(
      resultReporter,
      errorReporter.bind(null, deflt)
    );
  };

  //  Upsert section //
  function putterAfterProcessor(handler, defer, key, item) {
    if (item === null) {
      defer.resolve(null);
      handler = null;
      defer = null;
      key = null;
      item = null;
      return;
    }
    handler.put(key, item).then(
      defer.resolve.bind(defer),
      defer.reject.bind(defer)
    );
    handler = null;
    defer = null;
    key = null;
    item = null;
  }
  function offerrerToProcessor(handler, defer, key, processorfunc, item) {
    //console.log('offerrerToProcessor', key, '=>', item);
    var procret;
    try {
      procret = processorfunc(item, key);
    } catch(e) {
      try {
      defer.reject(e);
      } catch(e) {
        console.error(e.stack);
        console.error(e);
      }
      //console.log('processorfunc threw', e);
      return;
    }
    //if (procret && 'function' === typeof procret.then){
    if (q.isPromise(procret)){
      procret.then(
        putterAfterProcessor.bind(null, handler, defer, key),
        defer.reject.bind(defer)
      );
    } else {
      putterAfterProcessor(handler, defer, key, procret);
    }
  }
  function defaultEvaluator(defaultrecord, defer) {
    if ('function' === typeof defaultrecord) {
      try {
        return defaultrecord();
      } catch (e) {
        defer.reject(e);
        return null;
      }
    }
    return defaultrecord;
  }
  function errorOfferrerToProcessor(handler, defer, key, processorfunc, defaultrecord, error) {
    if (error.notFound) {
      //console.log('record not found for', key);
      offerrerToProcessor(handler, defer, key, processorfunc, defaultEvaluator(defaultrecord, defer) || null);
    } else {
      console.error('Error in getting data for upsert!', error);
      defer.reject(error);
    }
  }
  LevelDBHandler.prototype.upsert = function (key, processorfunc, defaultrecord) {
    if ('function' !== typeof processorfunc) {
      return q.reject(lib.Error('PROCESSOR_NOT_A_FUNCTION'));
    }
    var d = q.defer();
    if ('function' !== typeof this.get) {
      console.log('what am I?', this);
    }
    this.get(key).then(
      offerrerToProcessor.bind(null, this, d, key, processorfunc),
      errorOfferrerToProcessor.bind(null, this, d, key, processorfunc, defaultrecord)
    );
    return d.promise;
  };
  // end of upsert section //


  // specialized upserters for bufferlib-based codecs //
  function incmapper(fieldindex, amount, item, itemindex) {
    if (itemindex!==fieldindex) {
      return item;
    }
    return item+amount;
  }
  function incer(fieldindex, amount, options, record) {
    if (!lib.isArray(record)) {
      var msg = 'Received record '+record+'. Did you specify a default record for inc?';
      console.error(msg);
      throw new lib.Error('INVALID_RECORD', msg);
    }
    var should = true;
    if (lib.isFunction(options.criterionfunction)) {
      should = options.criterionfunction(record, amount);
    }
    if (should) {
      return record.map(incmapper.bind(null, fieldindex, options.dec ? -amount : amount));
    } else {
      return null;
    }
  }

  LevelDBHandler.prototype.inc = function (key, fieldindex, amount, options) {
    //console.log('inc with defaultrecord', options.defaultrecord);
    return this.upsert(key, incer.bind(null, fieldindex, amount, options), options.defaultrecord);
  };

  LevelDBHandler.prototype.dec = function (key, fieldindex, amount, options) {
    options = options || {};
    options.dec = true;
    return this.inc(key, fieldindex, amount, options);
  };

  // end of specialized upserters //

  //safe get //

  function onSafeGetError(defaultval, defer, error) {
    if (error.notFound) {
      defer.resolve(defaultval);
    } else {
      defer.reject(error);
    }
    defaultval = null;
    defer = null;
  }

  LevelDBHandler.prototype.safeGet = function (key, defaultval) {
    var d = q.defer();
    this.get(key).then(
      d.resolve.bind(d),
      onSafeGetError.bind(null, defaultval, d)
    );
    return d.promise;
  };

  // end of safe get //


  // reading/traversing section //
  function streamTraverser(stream, cb, item) {
    cb(item, stream);
  }
  function functionFilterStreamTraverser(filterfunc, stream, cb, item) {
    if (filterfunc(item)) {
      cb(item, stream);
    }
  }
  function streamEnder(defer, stream, destroyables) {
    if (lib.isArray(destroyables) && destroyables.length>0) {
      lib.arryDestroyAll(destroyables);
    }
    stream.removeAllListeners();
    defer.resolve(true);
    defer = null;
    stream = null;
    destroyables = null;
  }
  function datafilterer (filter, keyfilter) {
    var ret = function (item) {
      if (filter && !filter.isOK(item.value)) {
        return false;
      }
      if (keyfilter && !keyfilter.isOK(item.key)) {
        return false;
      }
      return true;
    }
    ret.destroy = function () {
      filter = null;
      keyfilter = null;
      ret = null;
    };
    return ret;
  }
  LevelDBHandler.prototype.traverse = function (cb, options) {
    var stream = this.getReadStream(options),
      d = (options ? options.defer : null) || q.defer(),
      destroyables = [];
    switch (typeof (options ? options.filter : void 0)) {
      case 'function':
        stream.on('data', functionFilterStreamTraverser.bind(null, options.filter, stream, cb));
        break;
      case 'object':
        try {
          destroyables.push(
            datafilterer(
              datafilterslib.createFromDescriptor(options.filter),
              datafilterslib.createFromDescriptor(options.keyfilter)
            )
          );
          stream.on('data', functionFilterStreamTraverser.bind(
            null, 
            destroyables[0],
            stream,
            cb));
        } catch (e) {
          console.error(e.stack);
          console.error(e);
          stream.on('data', streamTraverser.bind(null, stream, cb));
        }
        break;
      default:
        stream.on('data', streamTraverser.bind(null, stream, cb));
        break;
    }
    stream.on('end', streamEnder.bind(null, d, stream, destroyables));
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
    var ret = this.traverse(notifier.bind(null, defer), options);
    ret.then(defer.resolve.bind(defer));
    defer = null;
    options = null;
    return ret;
  }
  LevelDBHandler.prototype.getReadStream = function (options) {
    //console.log('createReadStream', options);
    return this.db.createReadStream(options);
  };
  // end of reading/traversing section//
  
  // helpers //
  function dumper(dumperobj, keyvalobj) {
    dumperobj.rows++;
    console.log(keyvalobj.key, ':', keyvalobj.value);
  }
  LevelDBHandler.prototype.dumpToConsole = function (options) {
    var dumperobj = {rows: 0};
    return this.traverse(dumper.bind(null, dumperobj), options).then(qlib.returner(dumperobj));
  };
  // end of helpers section //


  return LevelDBHandler;
}

module.exports = createDBHandler;
