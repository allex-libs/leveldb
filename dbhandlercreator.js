var levelup = require('level');

var _LockErrorPattern = /IO error.*LOCK/,
  _AccessCollisionPatterns = [
    /already held by process/,
    /Resource temporarily unavailable/
  ];

function match (errmessage, pattern) {
  return pattern.test(errmessage);
}

function isACollisionError (errmessage) {
  return _AccessCollisionPatterns.some(match.bind(null, errmessage));
}

function createDBHandler (execlib, datafilterslib, encodingMakeup, Query, Node) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    Path = Node.Path;

  function onDirMade(err) {
    var pa;
    if (err && err.code && err.code === 'ENOENT') {
      pa = err.path.split(Path.sep);
      console.log(pa);
      return q.reject(err);
    }
    return q(true);
  }

  function makePath (path) {
    if (lib.isString(path)) {
      return path;
    }
    if (lib.isArray(path)) {
      return Path.join.apply(Path, path);
    }
  }

  function preparePath(path) {
    var pp = Path.parse(path);
    return Node.Fs.ensureDir(pp.dir).then(onDirMade);
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
  FakeDB.prototype.upsert = function (key, processorfunc, defaultrecord) {
    this.q.push(['upsert', [key, processorfunc, defaultrecord]]);
  };
  function fakeDBDrainer (db, dbh, cp) {
    var command = cp[0],
      args = cp[1];
    if (db[command]) {
      return db[command].apply(db,args);
    }
    if (dbh[command]) {
      return dbh[command].apply(dbh,args);
    }
  }
  FakeDB.prototype.transferCommands = function (db, dbh) {
    if (!this.q) {
      return;
    }
    this.q.drain(fakeDBDrainer.bind(null, db, dbh));
    this.q.destroy();
    this.q = null;
    db = null;
    dbh = null;
  };

  function checkEncodings(hash) {
    if (!hash) {
      return;
    }
    if (hash.hasOwnProperty('keyEncoding') && !hash.keyEncoding) {
      throw new Error('Invalid keyEncoding');
    }
    if (hash.hasOwnProperty('valueEncoding') && !hash.valueEncoding) {
      throw new Error('Invalid valueEncoding');
    }
  }

  function LevelDBHandler(prophash) {
    var err;
    encodingMakeup(prophash.dbcreationoptions, lib.uid());
    this.dbname = makePath(prophash.dbname);
    if (!this.dbname) {
      err = new lib.Error('NO_DBNAME_IN_PROPERTYHASH','Property hash for LevelDBHandler lacks the dbname property (String or Array of Strings)');
      if (prophash.starteddefer) {
        prophash.starteddefer.reject(err);
        return;
      } else {
        throw err;
      }
    }
    checkEncodings(prophash.dbcreationoptions);
    this.db = null;
    this.put = null;
    this.get = null;
    this.del = null;
    this.opEvent = prophash.listenable ? new lib.HookCollection() : null;
    this.queries = prophash.listenable ? new lib.Map() : null;
    this.setDB(new FakeDB());
    if (prophash.initiallyemptydb) {
      //console.log(this.dbname, 'initiallyemptydb!');
      Node.Fs.removeWithCb(this.dbname, this.createDB.bind(this, prophash));
    } else {
      this.createDB(prophash);
    }
  }
  LevelDBHandler.prototype.destroy = function () {
    if (this.queries) {
      lib.containerDestroyAll(this.queries);
      this.queries.destroy();
    }
    this.queries = null;
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
  LevelDBHandler.prototype.drop = function () {
    var dbname = this.dbname, d;
    this.destroy();
    if (dbname) {
      return Node.Fs.remove(dbname);
    }
    return q(true);
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
      _db.transferCommands(this.db, this);
    }
  };
  LevelDBHandler.prototype.createDB = function (prophash) {
    levelup(this.dbname, lib.extend({}, prophash.dbcreationoptions), this.onLevelDBCreated.bind(this, prophash));
  };
  LevelDBHandler.prototype.onLevelDBCreated = function (prophash, err, db) {
    if (!this.dbname) {
      if (prophash.starteddefer) {
        prophash.starteddefer.reject(new lib.Error('NO_LEVELDB_NAME_SPECIFIED'));
      }
      return;
    }
    if (err) {
      if (prophash.debugcreation) {
        console.error(err);
      }
      if(err.message && _LockErrorPattern.test(err.message)) {
        if (isACollisionError(err.message)) {
          console.error(process.pid + ' ' + this.dbname, 'is currently used by another process');
          lib.runNext(this.createDB.bind(this, prophash), 1000);
        } else {
          preparePath(this.dbname).then(
            this.createDB.bind(this, prophash),
            this.destroy.bind(this)
          );
        }
        return;
      }
      console.error(this.dbname, 'could not be started now', err);
      if (prophash.maxretries) {
        if (!prophash.currentretries) {
          prophash.currentretries = 0;
        }
        prophash.currentretries++;
        if (prophash.currentretries>prophash.maxretries) {
          if (prophash.starteddefer) {
            prophash.starteddefer.reject(new lib.Error('MAX_RETRIES_EXCEEDED'));
          }
          return;
        }
      }
      lib.runNext(this.createDB.bind(this, prophash), 1000);
      return;
    }
    this.setDB(db, prophash);
    if (prophash.starteddefer) {
      //console.log(this.dbname, 'resolving starteddefer');
      prophash.starteddefer.resolve(this);
    }
  };

  //  Upsert section //
  function putterAfterProcessor(handler, defer, key, item) {
    var und;
    if (item === null) {
      defer.resolve(null);
      handler = null;
      defer = null;
      key = null;
      item = null;
      return;
    }
    if (item === und) {
      handler.del(key).then(
        defer.resolve.bind(defer),
        defer.reject.bind(defer)
      );
    } else {
      handler.put(key, item).then(
        defer.resolve.bind(defer),
        defer.reject.bind(defer)
      );
    }
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
      console.error('Error in processorfunc', e.stack);
      console.error(e);
      defer.reject(e);
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
      offerrerToProcessor(handler, defer, key, processorfunc, defaultEvaluator(defaultrecord, defer));
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
    if (fieldindex!==null && !lib.isArray(record)) {
      var msg = 'Received record '+record+'. Did you specify a default record for inc?';
      console.error(msg);
      throw new lib.Error('INVALID_RECORD', msg);
    }
    var should = true;
    if (lib.isFunction(options.criterionfunction)) {
      should = options.criterionfunction(record, amount);
    }
    if (should) {
      if (lib.isArray(record)) {
        return record.map(incmapper.bind(null, fieldindex, options.dec ? -amount : amount));
      }
      return options.dec ? record-amount : record+amount;
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
  LevelDBHandler.prototype.getWDefault = LevelDBHandler.prototype.safeGet;


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
      if (ret) {
        ret.destroy = null;
      }
      ret = null;
    };
    return ret;
  }
  LevelDBHandler.prototype.traverse = function (cb, options) {
    var stream = this.getReadStream(options),
      d = (options ? options.defer : null) || q.defer(),
      destroyables = [stream],
      _lisa = lib.isArray,
      _lada = lib.arryDestroyAll,
      filtertype = typeof (options ? options.filter : void 0),
      keyfiltertype = typeof (options ? options.keyfilter : void 0);
    if (filtertype === 'function') {
      stream.on('data', functionFilterStreamTraverser.bind(null, options.filter, stream, cb));
    } else if (filtertype === 'object' || keyfiltertype === 'object') {
      try {
        destroyables.push(
          datafilterer(
            datafilterslib.createFromDescriptor(options.filter),
            datafilterslib.createFromDescriptor(options.keyfilter)
          )
        );
        stream.on('data', functionFilterStreamTraverser.bind(
          null, 
          destroyables[1],
          stream,
          cb));
      } catch (e) {
        console.error(e.stack);
        console.error(e);
        stream.on('data', streamTraverser.bind(null, stream, cb));
      }
    } else {
      stream.on('data', streamTraverser.bind(null, stream, cb));
    }
    //stream.on('end', streamEnder.bind(null, d, stream, destroyables));
    stream.on('end', function streamEnder() {
      stream.removeAllListeners();
      if (_lisa(destroyables) && destroyables.length>0) {
        _lada(destroyables);
      }
      d.resolve(true);
      d = null;
      stream = null;
      destroyables = null;
      options = null;
      cb = null;
      _lisa = null;
      _lada = null;
    });
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

  LevelDBHandler.prototype.query = function (filterdesc, defer, starteddefer) {
    var id = filterdesc ? JSON.stringify(filterdesc) : '',
      _q = this.queries.get(id),
      ret = starteddefer ? starteddefer.promise : q(true);
    if (!_q) {
      _q = new Query(id, this, filterdesc);
      this.queries.add(id, _q);
    }
    _q.add(defer, starteddefer);
    return ret;
  };
  function picker(tobj, item) {
    if (tobj.item) {
      console.error('item already exists, traverse needs to pass only 1 item');
      process.exit(0);
    }
    tobj.item = item;
  }
  LevelDBHandler.prototype.getFirst = function () {
    var tobj = {item: null};
    return this.traverse(picker.bind(null, tobj), {limit: 1}).then(
      qlib.propertyreturner(tobj, 'item')
    );
  };
  LevelDBHandler.prototype.getLast = function () {
    var tobj = {item: null};
    return this.traverse(picker.bind(null, tobj), {limit: 1, reverse: true}).then(
      qlib.propertyreturner(tobj, 'item')
    );
  };
  
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
