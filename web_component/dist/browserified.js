(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
ALLEX.execSuite.libRegistry.register('allex_leveldblib',require('./webindex'));

},{"./webindex":99}],2:[function(require,module,exports){
(function (Buffer){(function (){
function createByteCodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_8BITS', num);
      }
      var ret = new Buffer(1);
      ret[0] = num;
      return ret;
    },
    decode: function (buff) {
      return buff[0];
    },
    buffer: true,
    type: 'int8'
  };
}

module.exports = createByteCodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],3:[function(require,module,exports){
(function (Buffer){(function (){
function createDoubleBECodec(execlib) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      var ret = new Buffer(8);
      ret.writeDoubleBE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readDoubleBE(0);
    },
    buffer: true,
    type: 'doublebe'
  };
}

module.exports = createDoubleBECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],4:[function(require,module,exports){
(function (Buffer){(function (){
function createDoubleLECodec(execlib) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      var ret = new Buffer(8);
      ret.writeDoubleLE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readDoubleLE(0);
    },
    buffer: true,
    type: 'doublele'
  };
}

module.exports = createDoubleLECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],5:[function(require,module,exports){
(function (Buffer){(function (){
function createInt16BECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeInt16BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readInt16BE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createInt16BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],6:[function(require,module,exports){
(function (Buffer){(function (){
function createInt16LECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeInt16LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readInt16LE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createInt16LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],7:[function(require,module,exports){
(function (Buffer){(function (){
function createInt32BECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffffffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_32BITS', num);
      }
      var ret = new Buffer(4);
      ret.writeInt32BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readInt32BE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createInt32BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],8:[function(require,module,exports){
(function (Buffer){(function (){
function createInt32LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffffffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_32BITS', num);
      }
      var ret = new Buffer(4);
      ret.writeInt32LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readInt32LE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createInt32LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],9:[function(require,module,exports){
(function (Buffer){(function (){
function createInt48BECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeIntBE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readIntBE(0, 6);
    },
    buffer: true,
    type: 'int48'
  };
}

module.exports = createInt48BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],10:[function(require,module,exports){
(function (Buffer){(function (){
function createInt48LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeIntLE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readIntLE(0, 6);
    },
    buffer: true,
    type: 'int48'
  };
}

module.exports = createInt48LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],11:[function(require,module,exports){
var Int64 = require('node-int64');
function createInt64BECodec(execlib) {
  return {
    encode: function(num) {
      var int64 = new Int64(num);
      return int64.toBuffer();
    },
    decode: function (buff) {
      var int64 = new Int64(buff);
      return int64+0;
    },
    buffer: true,
    type: 'int64le'
  };
}

module.exports = createInt64BECodec;

},{"node-int64":64}],12:[function(require,module,exports){
(function (Buffer){(function (){
function createInt64Codec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(8),
        hi = ~~(num / 0x100000000),
        lo = num % 0x100000000;
    //console.log(item, '=> lo', lo, 'hi', hi);
      ret.writeUInt32BE(lo, 0);
      ret.writeUInt32BE(hi, 4);
      return ret;
    },
    decode: function (buff) {
      var ret = 0,
        lo = buff.readUInt32BE(0),
        hi = buff.readUInt32BE(4);
      ret += (lo);
      ret += ( hi * 0x100000000);
      return ret;
    },
    buffer: true,
    type: 'int64'
  };
}
module.exports = createInt64Codec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],13:[function(require,module,exports){
(function (Buffer){(function (){
var Int64 = require('node-int64');
function mirror64 (buffer) {
  var ret;
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('Value provided was not a buffer');
  }
  if (buffer.length !== 8) {
    throw new Error('Buffer provided was '+buffer.length+' bytes long instead of 8');
  }
  ret = new Buffer(8);
  buffer.copy(ret, 0, 0, 8);
  ret.swap64();
  return ret;
}
function createInt64LECodec(execlib) {
  return {
    encode: function(num) {
      var int64 = new Int64(num);
      return mirror64(int64.toBuffer());
    },
    decode: function (buff) {
      var int64 = new Int64(mirror64(buff));
      return int64+0;
    },
    buffer: true,
    type: 'int64le'
  };
}

module.exports = createInt64LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108,"node-int64":64}],14:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt16BECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeUInt16BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt16BE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createUInt16BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],15:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt16LECodec(execlib, numchecker) {
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_16BITS', num);
      }
      var ret = new Buffer(2);
      ret.writeUInt16LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt16LE(0);
    },
    buffer: true,
    type: 'int16'
  };
}

module.exports = createUInt16LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],16:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt32BECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffffffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_32BITS', num);
      }
      var ret = new Buffer(4);
      ret.writeUInt32BE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt32BE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createUInt32BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],17:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt32LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      if (num>0xffffffff) {
        throw new lib('NUMBER_TOO_LARGE_FOR_32BITS', num);
      }
      var ret = new Buffer(4);
      ret.writeUInt32LE(num);
      return ret;
    },
    decode: function (buff) {
      return buff.readUInt32LE(0);
    },
    buffer: true,
    type: 'int32'
  };
}

module.exports = createUInt32LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],18:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt48BECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeUIntBE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readUIntBE(0, 6);
    },
    buffer: true,
    type: 'uint48'
  };
}

module.exports = createUInt48BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],19:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt48LECodec(execlib, numchecker) {
  'use strict';
  var lib = execlib.lib;
  return {
    encode: function(num) {
      num = numchecker(num);
      var ret = new Buffer(6);
      ret.writeUIntLE(num, 0, 6);
      return ret;
    },
    decode: function (buff) {
      return buff.readUIntLE(0, 6);
    },
    buffer: true,
    type: 'uint48'
  };
}

module.exports = createUInt48LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],20:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt64BECodec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(8),
        hi = ~~(num / 0x100000000),
        lo = num % 0x100000000;
    //console.log(item, '=> lo', lo, 'hi', hi);
      ret.writeUInt32BE(hi, 0);
      ret.writeUInt32BE(lo, 4);
      return ret;
    },
    decode: function (buff) {
      var ret = 0,
        hi = buff.readUInt32BE(0),
        lo = buff.readUInt32BE(4);
      ret += (lo);
      ret += ( hi * 0x100000000);
      return ret;
    },
    buffer: true,
    type: 'uint64be'
  };
}

module.exports = createUInt64BECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],21:[function(require,module,exports){
(function (Buffer){(function (){
function createUInt64LECodec(execlib) {
  return {
    encode: function(num) {
      var ret = new Buffer(8),
        hi = ~~(num / 0x100000000),
        lo = num % 0x100000000;
    //console.log(item, '=> lo', lo, 'hi', hi);
      ret.writeUInt32LE(lo, 0);
      ret.writeUInt32LE(hi, 4);
      return ret;
    },
    decode: function (buff) {
      var ret = 0,
        lo = buff.readUInt32LE(0),
        hi = buff.readUInt32LE(4);
      ret += (lo);
      ret += ( hi * 0x100000000);
      return ret;
    },
    buffer: true,
    type: 'uint64le'
  };
}

module.exports = createUInt64LECodec;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],22:[function(require,module,exports){
(function (Buffer){(function (){
function createVerbatimDecoder(execlib) {
  'use strict';
  return {
    encode: function (val) { 
      if(!Buffer.isBuffer(val)){
        throw new execlib.lib.Error('PLAIN_CODEC_CANNOT_ENCODE_A_NOT_BUFFER');
      }
      return val;
    },
    decode: function (buff) { return buff; },
    buffer: true,
    type: 'verbatim'
  }
}

module.exports = createVerbatimDecoder;

}).call(this)}).call(this,{"isBuffer":require("../../../node_modules/allexsdk/node_modules/is-buffer/index.js")})
},{"../../../node_modules/allexsdk/node_modules/is-buffer/index.js":123}],23:[function(require,module,exports){
function createDBArray(execlib, leveldblib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    QueueableHandler = leveldblib.QueueableHandler;

  function keyEncodingFor(indexsize) {
    switch(indexsize) {
      case 'tiny':
        return leveldblib.ByteCodec;
      case 'short':
        return leveldblib.UInt16BECodec;
      case 'standard':
        return leveldblib.UInt32BECodec;
      case 'big':
        return leveldblib.UInt48BECodec;
      case 'huge':
        return leveldblib.UInt64BECodec;
      default:
        return leveldblib.UInt32BECodec;
    }
  }

  var _notInitiatedError = new lib.Error('NOT_INITIATED_YET', 'DBArrayHandler needs to be initiated to work');

  function DBArrayHandler(prophash) {
    prophash = prophash || {};
    prophash.dbcreationoptions = lib.extend(prophash.dbcreationoptions || {}, {
      keyEncoding: keyEncodingFor(prophash.indexsize)
    });
    if (prophash.starteddefer) {
      prophash.dbarraystarteddefer = prophash.starteddefer;
      prophash.starteddefer = null;
    }
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
    QueueableHandler.prototype.destroy.call(this);
  };
  DBArrayHandler.prototype.setDB = function (db, prophash) {
    QueueableHandler.prototype.setDB.call(this, db, prophash);
    if (this.db && this.db.createReadStream) {
      this.doFirstAndLast().done(
        this.onInitDone.bind(this, prophash)
      );
    }
    prophash = null;
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
    console.log('init done', this.head, this.tail, prophash.dbname, prophash.dbarraystarteddefer ? 'with' : 'without', 'starteddefer');
    if (prophash.dbarraystarteddefer) {
      prophash.dbarraystarteddefer.resolve(this);
    }
    prophash = null;
  };
  DBArrayHandler.prototype.doFirstAndLast = function () {
    return this.getFirst().then(
      this.initHeadTail.bind(this, true)
    ).then(
      this.getLast.bind(this)
    ).then(
      this.initHeadTail.bind(this, false)
    );
  };
  DBArrayHandler.prototype.initHeadTail = function (ishead, item) {
    if (!(item && lib.isNumber(item.key))) {
      return;
    }
    if (this.head === null) {
      return;
    }
    this[ishead ? 'head' : 'tail'] = item.key;
    return q(this);
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
    puttername = null;
    itemcontainer = null;
    defer = null;
  };
  DBArrayHandler.prototype.push = function (item, defer) {
    if (!defer && defer!==0) {
      defer = q.defer();
    }
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
    if (defer) {
      return defer.promise;
    }
  };
  DBArrayHandler.prototype.manyPutterStartFromOne = function(container, item) {
    container.add(['put', [++this.tail, item]], 0);
  };
  DBArrayHandler.prototype.manyPutter = function(container, item) {
    container.add(['put', [this.tail++, item]], 0);
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
    container.add(['del', [++this.head]], 0);
  };
  DBArrayHandler.prototype.manyShifter = function(container) {
    container.add(['del', [this.head++]], 0);
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
        if (defer) {
          console.log('resolving defer');
          defer.resolve({items:items, finalizer:finalizer});
        } else {
          console.log('what is defer?', defer);
        }
        items = null;
        defer = null;
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
    howmany = null;
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
    defer = null;
  };
  DBArrayHandler.prototype.manyPopperStartFromOne = function(container, item) {
    container.push(['del', [this.tail--]], 0);
  };
  DBArrayHandler.prototype.manyPopper = function(container, item) {
    container.push(['del', [--this.tail]], 0);
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
    howmany = null;
    defer = null;
  };
  DBArrayHandler.prototype.finishAndContinueWith = function(processorname, howmany, defer) {
    var _q = this.q;
    this.q = new lib.SortedList();
    this.finish();
    this.q = _q;
    this.doMany(processorname, howmany, defer);
    processorname = null;
    howmany = null;
    defer = null;
  };
  
  return DBArrayHandler;
}

module.exports = createDBArray;

},{}],24:[function(require,module,exports){
(function (process){(function (){
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

  function retryOnOtherLockError (ldbhandler, prophash){
    if (!(
      ldbhandler &&
      ldbhandler.dbname 
    )) {
      return;
    }
    preparePath(ldbhandler.dbname).then(
      ldbhandler.createDB.bind(ldbhandler, prophash),
      ldbhandler.destroy.bind(ldbhandler)
    );
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
          console.error(process.pid + ' ' + this.dbname, err.message);
          lib.runNext(retryOnOtherLockError.bind(null, this, prophash), 1000);
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

}).call(this)}).call(this,require('_process'))
},{"_process":127,"level":58}],25:[function(require,module,exports){
function createEncodingMakeup (execlib, leveldblib, bufferlib) {
  'use strict';

  var lib = execlib.lib;

  function encodingFor(encname, dbcreationoptions, codecname) { //encname = 'key' || 'value'
    var encnamecap, bufferencname, leveldbencname, realencname;
    if (encname !== 'key' && encname !== 'value') {
      throw new Error('encname must be "key" or "value"');
    }
    if (!dbcreationoptions) {
      return 'json';
    }
    encnamecap = lib.capitalize(encname);
    bufferencname = 'buffer'+encnamecap+'Encoding';
    if (dbcreationoptions[bufferencname] &&
        lib.isArray(dbcreationoptions[bufferencname])) {
      return bufferlib.makeCodec(dbcreationoptions[bufferencname], codecname);
    }
    leveldbencname = 'leveldb'+encnamecap+'Encoding';
    if (dbcreationoptions[leveldbencname]) {
      if (!leveldblib[dbcreationoptions[leveldbencname]]) {
        throw new lib.Error('LEVELDB_ENCODING_NOT_RECOGNIZED', dbcreationoptions[leveldbencname]);
      }
      return leveldblib[dbcreationoptions[leveldbencname]];
    }
    return dbcreationoptions[encname+'Encoding'];
  }

  function encodingMakeup (dbcreationoptions, codecname) {
    var keyencoding,
      valueencoding;

    if (!(dbcreationoptions && 'object' === typeof dbcreationoptions)) {
      return;
    }
    keyencoding = encodingFor('key', dbcreationoptions, codecname+'key');
    valueencoding = encodingFor('value', dbcreationoptions, codecname);

    if (keyencoding) {
      dbcreationoptions.keyEncoding = keyencoding;
    }
    if (valueencoding) {
      dbcreationoptions.valueEncoding = valueencoding;
    }
  }

  return encodingMakeup;
}

module.exports = createEncodingMakeup;

},{}],26:[function(require,module,exports){


module.exports = {
  Fs: {
  },
  Path: {
  }
};

},{}],27:[function(require,module,exports){
function createHook (execlib, datafilterslib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    KeysHandler = require('./keyshandlercreator')(execlib, datafilterslib);


  function Hook (prophash) {
    if (!prophash.leveldb) {
      throw new lib.Error('NO_LEVELDB_TO_HOOK_ON', 'Property hash has to have a leveldb property');
    }
    if (!prophash.leveldb.opEvent) {
      console.error('leveldb is not listenable, will never get anything from it', prophash.leveldb);
    }
    this.leveldb = prophash.leveldb;
    this.isAllPass = false;
    this.keys = new KeysHandler();
    this.dbOpListener = null;
    this.cb = prophash.cb;
  }

  Hook.addMethods = function (klass) {
    lib.inheritMethods (klass, Hook,
      'hook',
      'onScan',
      'postScan',
      '_unhook',
      'unhook',
      'stopListening',
      'onLevelDBDataChanged',
      'pickFromLevelDBAndReport',
      'pickFromLevelDBAndReportForArrayDBKeys',
      'isKeyValHashOk',
      'isKeyOk',
      'unhook'
    );
  };

  Hook.ALL_KEYS = KeysHandler.ALL_KEYS;

  Hook.prototype.destroy = function () {
    this.cb = null;
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.isAllPass = null;
    this.leveldb = null;
  };

  Hook.prototype.hook = function (hookobj, defer) {
    var doscan = hookobj.scan,
      dbkeys = hookobj.accounts || hookobj.keys || hookobj.filter,
      checkforlistener = false,
      nkh,
      pser,
      ret;
    defer = defer || q.defer();
    ret = defer.promise;
    nkh = this.keys.add(dbkeys);
    if (!nkh) {
      defer.resolve(true);
    }
    if (nkh && doscan) { //with this `if`, if no new keys are found, no rescanning will be done. Problem?
      pser = this.postScan.bind(this, defer);
      if (nkh.isAllPass) {
        this.leveldb.traverse(this.onScan.bind(this), {}).then(
          pser,
          pser
        );
      } else {
       this.pickFromLevelDBAndReport(nkh, dbkeys).then(
        pser,
        pser
       ) 
      }
    } else {
      this.postScan(defer);
    }
    defer = null;
    return ret;
  };

  Hook.prototype.pickFromLevelDBAndReport = function (nkhorfilters, dbkeys) {
    if (lib.isArray(dbkeys)) {
      return this.pickFromLevelDBAndReportForArrayDBKeys(dbkeys);
    }
    return this.leveldb.traverse(this.onScan.bind(this), nkhorfilters);
  };
  Hook.prototype.pickFromLevelDBAndReportForArrayDBKeys = function (dbkeys, defer) {
    var dbkl = dbkeys.length,
      dbkey = dbkeys.shift(),
      pflar,
      oldc = this.onLevelDBDataChanged.bind(this);
    if (dbkl<1) {
      defer.resolve(true)
      return defer.promise;
    }
    defer = defer || q.defer();
    pflar = this.pickFromLevelDBAndReportForArrayDBKeys.bind(this, dbkeys, defer);
    this.leveldb.get(dbkey).then(function (val) {
      oldc(dbkey, val);
      if (pflar) {
        pflar();
        pflar = null;
      }
      dbkey = null;
      oldc = null;
    }, function (reason) {
      if (pflar) {
        pflar();
        pflar = null;
      }
      dbkey = null;
      oldc = null;
    });
    return defer.promise;
  };

  Hook.prototype.onScan = function (keyvalhash) {
    //if (this.isKeyValHashOk(keyvalhash)) {
      this.onLevelDBDataChanged(keyvalhash.key, keyvalhash.value);
    //}
  };

  Hook.prototype.postScan = function (defer) {
    if (this.keys.isEmpty()) {
      console.log('keys', this.keys, 'isEmpty');
      this.stopListening();
    } else {
      if ( !this.dbOpListener && this.leveldb) {
        if ( this.leveldb.opEvent ) {
          this.dbOpListener = this.leveldb.opEvent.attach(this.onLevelDBDataChanged.bind(this));
        } else {
          console.warn('LevelDB instance is not waitable!');
        }
      }
    }
    defer.resolve(true);
    defer = null;
  };

  Hook.prototype._unhook = function (key){
    this.keys.remove(key);
  };

  Hook.prototype.unhook = function (dbkeys, defer) {
    var ret;
    defer = defer || q.defer();
    ret = defer.promise;
    if (!lib.isArray(dbkeys)) {
      this.stopListening();
      defer.resolve(true);
      defer = null;
      return;
    }
    dbkeys.forEach (this._unhook.bind(this));
    if (this.keys.isEmpty()) {
      this.stopListening();
    }
    defer.resolve(true);
    defer = null;
    return ret;
  };

  Hook.prototype.stopListening = function () {
    if (this.dbOpListener) {
      this.dbOpListener.destroy();
    }
    this.dbOpListener = null;
    this.dbkeys = null;
  };

  Hook.prototype.onLevelDBDataChanged = function (key, value) {
    if (this.cb && this.isKeyValHashOk({key:key, value:value})) {
      this.cb(key, value);
    }
  };

  Hook.prototype.isKeyValHashOk = function (keyvalhash) {
    if (this.isAllPass) {
      return true;
    }
    return this.keys.isKeyValHashOk(keyvalhash);
  };

  Hook.prototype.isKeyOk = function (key) {
    return this.keys.isOk(key);
  };

  return Hook;
}

module.exports = createHook;

},{"./keyshandlercreator":29}],28:[function(require,module,exports){
function extendLibWithHooks (execlib, leveldblib, datafilterslib) {
  'use strict';

  var Hook = require('./creator')(execlib, datafilterslib),
    HookableUserSessionMixin = require('./sessionmixincreator')(execlib, Hook);

  leveldblib.Hook = Hook;
  leveldblib.HookableUserSessionMixin = HookableUserSessionMixin;
}

module.exports = extendLibWithHooks;

},{"./creator":27,"./sessionmixincreator":30}],29:[function(require,module,exports){
function createKeyHandler (execlib, datafilterslib) {
  'use strict';

  var lib = execlib.lib,
    ALL_KEYS = '***';

  function isAFilterKey (key) {
    if ('object' === typeof key && (key.hasOwnProperty('values')  || key.hasOwnProperty('keys'))) {
      return true;
    }
    return false;
  }

  function AllPassKey () {
  }
  AllPassKey.prototype.destroy = lib.dummyFunc;
  AllPassKey.prototype.isOk = function (key) {
    return true;
  };
  AllPassKey.prototype.isKeyValHashOk = function (keyvalhash) {
    return true;
  };
  AllPassKey.prototype.isAllPass = function () {
    return true;
  };
  AllPassKey.prototype.hasKey = function (key) {
    return key === ALL_KEYS;
  }

  function FilterKeyHandler (key) {
    this.keyfilter = null;
    this.valfilter = null;
    if (key.keys) {
      this.keyfilter = datafilterslib.createFromDescriptor(key.keys);
    }
    if (key.values) {
      this.valfilter = datafilterslib.createFromDescriptor(key.values);
    }
  }
  FilterKeyHandler.prototype.destroy = function () {
    this.keyfilter = null;
    this.valfilter = null;
  };
  FilterKeyHandler.prototype.isOk = function (key) {
    if (this.keyfilter) {
      return this.keyfilter.isOK(key);
    }
    return true;
  };
  FilterKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    if (!this.isOk(keyvalhash.key)) {
      //console.log('key', keyvalhash.key, 'is not ok with keyfilter');
      return false;
    }
    return this.isValOk(keyvalhash.value);
  };
  FilterKeyHandler.prototype.isValOk = function (value) {
    if (this.valfilter) {
      //console.log('value', value, 'ok with valfilter', this.valfilter, '?', this.valfilter.isOK(value));
      return this.valfilter.isOK(value);
    }
    return true;
  };
  FilterKeyHandler.prototype.hasKey = function (key) {
    return false; //TODO
  };

  function SimpleKeyHandler (key) {
    this.key = key;
  }
  SimpleKeyHandler.prototype.destroy = function () {
    this.key = null;
  };
  SimpleKeyHandler.prototype.isOk = function (key) {
    return key === this.key;
  };
  SimpleKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    //console.log('SimpleKeyHandler isOk?', keyvalhash.key);
    return this.isOk(keyvalhash.key);
  };
  SimpleKeyHandler.prototype.isAllPass = function () {
    return false;
  };
  SimpleKeyHandler.prototype.hasKey = function (key) {
    return key === this.key;
  };

  function ComplexKeyHandler (key) {
    this.keys = key.map(keyHandlerFactory);
  }
  ComplexKeyHandler.prototype.destroy = function () {
    var ks = this.keys;
    this.keys = null;
    if (ks) {
      lib.arryDestroyAll(ks);
    }
  };
  function isAllPassHandler (handler) {
    return handler.isAllPass();
  }
  ComplexKeyHandler.prototype.isAllPass = function () {
    return this.keys && this.keys.every(isAllPassHandler);
  };
  function keyEquals(keyarr, kh, khindex) {
    return kh.hasKey(keyarr[khindex]);
  }
  ComplexKeyHandler.prototype.hasKey = function (key) {
    if (!lib.isArray(key)) {
      return false;
    }
    return this.keys.every(keyEquals.bind(null, key));
  };
  function isOkOnSubHandler (key, handler, handlerindex) {
    return handler.isOk(key[handlerindex]);
  }
  ComplexKeyHandler.prototype.isOk = function (key) {
    return this.keys && this.keys.every(isOkOnSubHandler.bind(null, key));
  };
  function isKeyValHashOkOnSubHandler (keyvalhash, handler, handlerindex) {
    return handler.isOk(keyvalhash.key[handlerindex]);
  }
  ComplexKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    return this.keys && this.keys.every(isKeyValHashOkOnSubHandler.bind(null, keyvalhash));
  };

  function keyHandlerFactory (key) {
    if (key === ALL_KEYS) {
      return new AllPassKey();
    }
    if (lib.isString(key)) {
      return new SimpleKeyHandler(key);
    }
    if (lib.isArray(key)) {
      return new ComplexKeyHandler(key);
    }
    if (isAFilterKey(key)) {
      return new FilterKeyHandler(key);
    }
  }

  function KeysHandler () {
    this.handlers = [];
    this.isAllPass = false;
  }
  KeysHandler.prototype.destroy = function () {
    var hs;
    this.isAllPass = null;
    hs = this.handlers;
    this.handlers = null;
    if (hs) {
      lib.arryDestroyAll(hs);
    }
  };
  KeysHandler.prototype.isEmpty = function () {
    return (!(this.handlers && this.handlers.length > 0));
  };
  KeysHandler.prototype.setHandlers = function (handlers) {
    this.handlers = handlers;
    this.isAllPass = handlers.some(isAllPassHandler);
  };
  function handlerHasKey (key, handler) {
    return handler.hasKey(key);
  }
  KeysHandler.prototype.possiblyNewKey = function (res, key) {
    var kh;
    if (this.handlers.some(handlerHasKey.bind(null, key))) {
      //console.log('already handling key', key);
      return res;
    }
    kh = keyHandlerFactory(key);
    res.push(kh);
    return res;
  }
  KeysHandler.prototype.add = function (keys) {
    var newkeys, nkh;
    if (isAFilterKey(keys)) {
      this.handlers.push(new FilterKeyHandler(keys));
      return {
        filter: keys.values,
        keyfilter: keys.keys
      };
    }
    if (!lib.isArray(keys)) {
      return null;
    }
    newkeys = keys.reduce(this.possiblyNewKey.bind(this), []);
    if (newkeys.length) {
      Array.prototype.push.apply(this.handlers, newkeys);
      nkh = new KeysHandler();
      nkh.setHandlers(newkeys);
      this.isAllPass |= nkh.isAllPass;
      return nkh;
    }
    return null;
  };
  function indexAndElementFinder (findobj, handler, handlerindex) {
    if (handler.hasKey(findobj.key)) {
      findobj.handler = handler;
      findobj.index = handlerindex;
      return true;
    }
  }
  KeysHandler.prototype.remove = function (key) {
    var findobj = {key: key, handler: null, index: null},
      found = this.handlers.some(indexAndElementFinder.bind(null, findobj));
    if (found) {
      this.handlers.splice(findobj.index, 1);
    }
    return found;
  };
  function isOkOnHandler (key, handler) {
    //console.log(key, 'isOk', handler.isOk(key), 'on', handler);
    return handler.isOk(key);
  }
  KeysHandler.prototype.isOk = function (key) {
    return this.handlers && this.handlers.some(isOkOnHandler.bind(null, key));
  };
  function isKeyValHashOkOnHandler (keyvalhash, handler) {
    //console.log(key, 'isOk', handler.isKeyValHashOk(key), 'on', handler);
    return handler.isKeyValHashOk(keyvalhash);
  }
  KeysHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    return this.handlers && this.handlers.some(isKeyValHashOkOnHandler.bind(null, keyvalhash));
  };

  KeysHandler.ALL_KEYS = ALL_KEYS;

  return KeysHandler;
}

module.exports = createKeyHandler;

},{}],30:[function(require,module,exports){
function createHookableUserSessionMixin (execlib, Hook) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function HookableUserSessionMixin (leveldb) {
    Hook.call(this, {leveldb:leveldb, cb: this.onDataFromHook.bind(this)});
  }

  lib.inherit(HookableUserSessionMixin, Hook);

  HookableUserSessionMixin.addMethods = function (UserSession) {
    Hook.addMethods(UserSession);
    lib.inheritMethods(UserSession, HookableUserSessionMixin, 'onDataFromHook');
  };

  HookableUserSessionMixin.ALL_KEYS = Hook.ALL_KEYS;

  HookableUserSessionMixin.prototype.onDataFromHook = function (key, value) {
    this.sendOOB('l',[key, value]);
  };

  HookableUserSessionMixin.__methodDescriptors = {
    unhook: [{
      title: 'Unhook',
      type: 'array',
      items : {
        oneOf : [
          {type : 'string'},
          {type : 'array', items: {type: 'string'}}
        ]
      },
      required: false
    }],
    hook : [{
      title: 'Hook',
      type: 'object',
      anyOf : [
         { '$ref' : '#/definitions/propswithaccounts'},
         { '$ref' : '#/definitions/propswithkeys'},
         { '$ref' : '#/definitions/propswithfilter'}
      ],
      definitions: {
        propswithaccounts : {
          properties: {
            scan : {
              type : 'boolean',
            },
            accounts: {
              type : 'array',
              items : {
                type : 'string'
              }
            }
          },
          required: ['accounts'],
          additionalProperties : false
        },
        propswithkeys : {
          properties: {
            scan : {
              type : 'boolean',
            },
            keys: {
              type : 'array',
              items : {
                oneOf : [
                  {type : 'string'},
                  {type : 'array', items: {type: 'string'}}
                ]
              }
            }
          },
          required: ['keys'],
          additionalProperties : false
        },
        propswithfilter: {
          properties: {
            scan: {
              type: 'boolean'
            },
            filter: {
              type: 'object',
              properties: {
                values: {
                  type: 'object'
                }
              }
            }
          }
        }
      }
    }]
  };

  return HookableUserSessionMixin;

};

module.exports = createHookableUserSessionMixin;


},{}],31:[function(require,module,exports){
(function (Buffer){(function (){
function realCreator(execlib, datafilterslib, bufferlib, Node) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    encodingMakeup,
    querylib,
    LevelDBHandler;

  var _nullcodec = {
    encode: function (val) {
      return new Buffer(0);
    },
    decode: function (buffer) {
      return null;
    },
    buffer: true,
    type: 'null'
  };
  var numchecker = require('./numcheckercreator')(execlib);

  var ret = {
    createDBHandler: creator,
    LevelDBHandler: LevelDBHandler,
    NullCodec:_nullcodec,
    VerbatimDecoder: require('./codecs/verbatimdecodercreator')(execlib),
    ByteCodec: require('./codecs/bytecodeccreator')(execlib, numchecker),
    UInt16LECodec: require('./codecs/uint16lecodeccreator')(execlib, numchecker),
    UInt16BECodec: require('./codecs/uint16becodeccreator')(execlib, numchecker),
    Int16LECodec: require('./codecs/int16lecodeccreator')(execlib, numchecker),
    Int16BECodec: require('./codecs/int16becodeccreator')(execlib, numchecker),
    UInt32LECodec: require('./codecs/uint32lecodeccreator')(execlib, numchecker),
    UInt32BECodec: require('./codecs/uint32becodeccreator')(execlib, numchecker),
    Int32LECodec: require('./codecs/int32lecodeccreator')(execlib, numchecker),
    Int32BECodec: require('./codecs/int32becodeccreator')(execlib, numchecker),
    UInt48LECodec: require('./codecs/uint48lecodeccreator')(execlib, numchecker),
    UInt48BECodec: require('./codecs/uint48becodeccreator')(execlib, numchecker),
    Int48LECodec: require('./codecs/int48lecodeccreator')(execlib, numchecker),
    Int48BECodec: require('./codecs/int48becodeccreator')(execlib, numchecker),
    UInt64BECodec: require('./codecs/uint64becodeccreator')(execlib, numchecker),
    UInt64LECodec: require('./codecs/uint64lecodeccreator')(execlib, numchecker),
    Int64BECodec: require('./codecs/int64becodeccreator')(execlib, numchecker),
    Int64LECodec: require('./codecs/int64lecodeccreator')(execlib, numchecker),
    Int64LegacyCodec: require('./codecs/int64codeccreator')(execlib),
    DoubleBECodec: require('./codecs/doublebecodeccreator')(execlib),
    DoubleLECodec: require('./codecs/doublelecodeccreator')(execlib)
  };

  encodingMakeup = require('./encodingmakeupcreator')(execlib, ret, bufferlib);
  querylib = require('./query')(execlib, datafilterslib);
  //Query = require('./querycreator')(execlib, datafilterslib);
  LevelDBHandler = require('./dbhandlercreator')(execlib, datafilterslib, encodingMakeup, querylib.Query, Node);
  function creator(hash) {
    return new LevelDBHandler(hash);
  }

  ret.encodingMakeup = encodingMakeup;
  ret.LevelDBHandler = LevelDBHandler;
  ret.createDBHandler = creator;
  ret.QueueableMixin = require('./queueablemixincreator')(execlib, ret);
  ret.QueueableHandler = require('./queueablehandlercreator')(execlib, ret);
  ret.DBArray = require('./dbarrayhandlercreator')(execlib, ret);
  ret.Shift2Pusher = require('./shift2pushercreator')(execlib, ret);
  ret.KnownLengthInsertJob = require('./transactions/knownlengthinsertjobcreator')(execlib, qlib.JobBase);
  ret.FiniteLengthInsertJob = require('./transactions/finitelengthinsertjobcreator')(execlib, ret.KnownLengthInsertJob);
  ret.ChainedOperationsJob = require('./transactions/chainedoperationsjobcreator')(execlib, qlib.JobBase);
  ret.ServiceUserMixin = require('./serviceusermixincreator')(execlib, datafilterslib);
  require('./hook')(execlib, ret, datafilterslib);
  ret.QuerableUserSessionMixin = querylib.SessionMixin;
  ret.streamInSink = require('./streaminsinkcreator')(execlib);
  ret.enhanceSink = function(sinkklass) {
    sinkklass.prototype.ClientUser.prototype.__methodDescriptors.resumeLevelDBStream = require('./resumeleveldbstreamdescriptor');
  }
  return ret;
}

module.exports = realCreator;

}).call(this)}).call(this,require("buffer").Buffer)
},{"./codecs/bytecodeccreator":2,"./codecs/doublebecodeccreator":3,"./codecs/doublelecodeccreator":4,"./codecs/int16becodeccreator":5,"./codecs/int16lecodeccreator":6,"./codecs/int32becodeccreator":7,"./codecs/int32lecodeccreator":8,"./codecs/int48becodeccreator":9,"./codecs/int48lecodeccreator":10,"./codecs/int64becodeccreator":11,"./codecs/int64codeccreator":12,"./codecs/int64lecodeccreator":13,"./codecs/uint16becodeccreator":14,"./codecs/uint16lecodeccreator":15,"./codecs/uint32becodeccreator":16,"./codecs/uint32lecodeccreator":17,"./codecs/uint48becodeccreator":18,"./codecs/uint48lecodeccreator":19,"./codecs/uint64becodeccreator":20,"./codecs/uint64lecodeccreator":21,"./codecs/verbatimdecodercreator":22,"./dbarrayhandlercreator":23,"./dbhandlercreator":24,"./encodingmakeupcreator":25,"./hook":28,"./numcheckercreator":85,"./query":87,"./queueablehandlercreator":90,"./queueablemixincreator":91,"./resumeleveldbstreamdescriptor":92,"./serviceusermixincreator":93,"./shift2pushercreator":94,"./streaminsinkcreator":95,"./transactions/chainedoperationsjobcreator":96,"./transactions/finitelengthinsertjobcreator":97,"./transactions/knownlengthinsertjobcreator":98,"buffer":108}],32:[function(require,module,exports){
'use strict'

const emptyOptions = Object.freeze({})

function AbstractChainedBatch (db) {
  if (typeof db !== 'object' || db === null) {
    throw new TypeError('First argument must be an abstract-leveldown compliant store')
  }

  this.db = db
  this._operations = []
  this._written = false
}

AbstractChainedBatch.prototype._checkWritten = function () {
  if (this._written) {
    throw new Error('write() already called on this batch')
  }
}

AbstractChainedBatch.prototype.put = function (key, value, options) {
  this._checkWritten()

  const err = this.db._checkKey(key) || this.db._checkValue(value)
  if (err) throw err

  key = this.db._serializeKey(key)
  value = this.db._serializeValue(value)

  this._put(key, value, options != null ? options : emptyOptions)

  return this
}

AbstractChainedBatch.prototype._put = function (key, value, options) {
  this._operations.push({ ...options, type: 'put', key, value })
}

AbstractChainedBatch.prototype.del = function (key, options) {
  this._checkWritten()

  const err = this.db._checkKey(key)
  if (err) throw err

  key = this.db._serializeKey(key)
  this._del(key, options != null ? options : emptyOptions)

  return this
}

AbstractChainedBatch.prototype._del = function (key, options) {
  this._operations.push({ ...options, type: 'del', key })
}

AbstractChainedBatch.prototype.clear = function () {
  this._checkWritten()
  this._clear()

  return this
}

AbstractChainedBatch.prototype._clear = function () {
  this._operations = []
}

AbstractChainedBatch.prototype.write = function (options, callback) {
  this._checkWritten()

  if (typeof options === 'function') {
    callback = options
  }
  if (typeof callback !== 'function') {
    throw new Error('write() requires a callback argument')
  }
  if (typeof options !== 'object' || options === null) {
    options = {}
  }

  this._written = true
  this._write(options, callback)
}

AbstractChainedBatch.prototype._write = function (options, callback) {
  this.db._batch(this._operations, options, callback)
}

// Expose browser-compatible nextTick for dependents
AbstractChainedBatch.prototype._nextTick = require('./next-tick')

module.exports = AbstractChainedBatch

},{"./next-tick":36}],33:[function(require,module,exports){
'use strict'

function AbstractIterator (db) {
  if (typeof db !== 'object' || db === null) {
    throw new TypeError('First argument must be an abstract-leveldown compliant store')
  }

  this.db = db
  this._ended = false
  this._nexting = false
}

AbstractIterator.prototype.next = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('next() requires a callback argument')
  }

  if (this._ended) {
    this._nextTick(callback, new Error('cannot call next() after end()'))
    return this
  }

  if (this._nexting) {
    this._nextTick(callback, new Error('cannot call next() before previous next() has completed'))
    return this
  }

  this._nexting = true
  this._next((err, ...rest) => {
    this._nexting = false
    callback(err, ...rest)
  })

  return this
}

AbstractIterator.prototype._next = function (callback) {
  this._nextTick(callback)
}

AbstractIterator.prototype.seek = function (target) {
  if (this._ended) {
    throw new Error('cannot call seek() after end()')
  }
  if (this._nexting) {
    throw new Error('cannot call seek() before next() has completed')
  }

  target = this.db._serializeKey(target)
  this._seek(target)
}

AbstractIterator.prototype._seek = function (target) {}

AbstractIterator.prototype.end = function (callback) {
  if (typeof callback !== 'function') {
    throw new Error('end() requires a callback argument')
  }

  if (this._ended) {
    return this._nextTick(callback, new Error('end() already called on iterator'))
  }

  this._ended = true
  this._end(callback)
}

AbstractIterator.prototype._end = function (callback) {
  this._nextTick(callback)
}

// Expose browser-compatible nextTick for dependents
AbstractIterator.prototype._nextTick = require('./next-tick')

module.exports = AbstractIterator

},{"./next-tick":36}],34:[function(require,module,exports){
'use strict'

const supports = require('level-supports')
const isBuffer = require('is-buffer')
const AbstractIterator = require('./abstract-iterator')
const AbstractChainedBatch = require('./abstract-chained-batch')
const hasOwnProperty = Object.prototype.hasOwnProperty
const rangeOptions = ['lt', 'lte', 'gt', 'gte']

function AbstractLevelDOWN (manifest) {
  this.status = 'new'

  // TODO (next major): make this mandatory
  this.supports = supports(manifest, {
    status: true
  })
}

AbstractLevelDOWN.prototype.open = function (options, callback) {
  const oldStatus = this.status

  if (typeof options === 'function') callback = options

  if (typeof callback !== 'function') {
    throw new Error('open() requires a callback argument')
  }

  if (typeof options !== 'object' || options === null) options = {}

  options.createIfMissing = options.createIfMissing !== false
  options.errorIfExists = !!options.errorIfExists

  this.status = 'opening'
  this._open(options, (err) => {
    if (err) {
      this.status = oldStatus
      return callback(err)
    }
    this.status = 'open'
    callback()
  })
}

AbstractLevelDOWN.prototype._open = function (options, callback) {
  this._nextTick(callback)
}

AbstractLevelDOWN.prototype.close = function (callback) {
  const oldStatus = this.status

  if (typeof callback !== 'function') {
    throw new Error('close() requires a callback argument')
  }

  this.status = 'closing'
  this._close((err) => {
    if (err) {
      this.status = oldStatus
      return callback(err)
    }
    this.status = 'closed'
    callback()
  })
}

AbstractLevelDOWN.prototype._close = function (callback) {
  this._nextTick(callback)
}

AbstractLevelDOWN.prototype.get = function (key, options, callback) {
  if (typeof options === 'function') callback = options

  if (typeof callback !== 'function') {
    throw new Error('get() requires a callback argument')
  }

  const err = this._checkKey(key)
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key)

  if (typeof options !== 'object' || options === null) options = {}

  options.asBuffer = options.asBuffer !== false

  this._get(key, options, callback)
}

AbstractLevelDOWN.prototype._get = function (key, options, callback) {
  this._nextTick(function () { callback(new Error('NotFound')) })
}

AbstractLevelDOWN.prototype.put = function (key, value, options, callback) {
  if (typeof options === 'function') callback = options

  if (typeof callback !== 'function') {
    throw new Error('put() requires a callback argument')
  }

  const err = this._checkKey(key) || this._checkValue(value)
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key)
  value = this._serializeValue(value)

  if (typeof options !== 'object' || options === null) options = {}

  this._put(key, value, options, callback)
}

AbstractLevelDOWN.prototype._put = function (key, value, options, callback) {
  this._nextTick(callback)
}

AbstractLevelDOWN.prototype.del = function (key, options, callback) {
  if (typeof options === 'function') callback = options

  if (typeof callback !== 'function') {
    throw new Error('del() requires a callback argument')
  }

  const err = this._checkKey(key)
  if (err) return this._nextTick(callback, err)

  key = this._serializeKey(key)

  if (typeof options !== 'object' || options === null) options = {}

  this._del(key, options, callback)
}

AbstractLevelDOWN.prototype._del = function (key, options, callback) {
  this._nextTick(callback)
}

AbstractLevelDOWN.prototype.batch = function (array, options, callback) {
  if (!arguments.length) return this._chainedBatch()

  if (typeof options === 'function') callback = options

  if (typeof array === 'function') callback = array

  if (typeof callback !== 'function') {
    throw new Error('batch(array) requires a callback argument')
  }

  if (!Array.isArray(array)) {
    return this._nextTick(callback, new Error('batch(array) requires an array argument'))
  }

  if (array.length === 0) {
    return this._nextTick(callback)
  }

  if (typeof options !== 'object' || options === null) options = {}

  const serialized = new Array(array.length)

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== 'object' || array[i] === null) {
      return this._nextTick(callback, new Error('batch(array) element must be an object and not `null`'))
    }

    const e = Object.assign({}, array[i])

    if (e.type !== 'put' && e.type !== 'del') {
      return this._nextTick(callback, new Error("`type` must be 'put' or 'del'"))
    }

    const err = this._checkKey(e.key)
    if (err) return this._nextTick(callback, err)

    e.key = this._serializeKey(e.key)

    if (e.type === 'put') {
      const valueErr = this._checkValue(e.value)
      if (valueErr) return this._nextTick(callback, valueErr)

      e.value = this._serializeValue(e.value)
    }

    serialized[i] = e
  }

  this._batch(serialized, options, callback)
}

AbstractLevelDOWN.prototype._batch = function (array, options, callback) {
  this._nextTick(callback)
}

AbstractLevelDOWN.prototype.clear = function (options, callback) {
  if (typeof options === 'function') {
    callback = options
  } else if (typeof callback !== 'function') {
    throw new Error('clear() requires a callback argument')
  }

  options = cleanRangeOptions(this, options)
  options.reverse = !!options.reverse
  options.limit = 'limit' in options ? options.limit : -1

  this._clear(options, callback)
}

AbstractLevelDOWN.prototype._clear = function (options, callback) {
  // Avoid setupIteratorOptions, would serialize range options a second time.
  options.keys = true
  options.values = false
  options.keyAsBuffer = true
  options.valueAsBuffer = true

  const iterator = this._iterator(options)
  const emptyOptions = {}

  const next = (err) => {
    if (err) {
      return iterator.end(function () {
        callback(err)
      })
    }

    iterator.next((err, key) => {
      if (err) return next(err)
      if (key === undefined) return iterator.end(callback)

      // This could be optimized by using a batch, but the default _clear
      // is not meant to be fast. Implementations have more room to optimize
      // if they override _clear. Note: using _del bypasses key serialization.
      this._del(key, emptyOptions, next)
    })
  }

  next()
}

AbstractLevelDOWN.prototype._setupIteratorOptions = function (options) {
  options = cleanRangeOptions(this, options)

  options.reverse = !!options.reverse
  options.keys = options.keys !== false
  options.values = options.values !== false
  options.limit = 'limit' in options ? options.limit : -1
  options.keyAsBuffer = options.keyAsBuffer !== false
  options.valueAsBuffer = options.valueAsBuffer !== false

  return options
}

function cleanRangeOptions (db, options) {
  const result = {}

  for (const k in options) {
    if (!hasOwnProperty.call(options, k)) continue

    if (k === 'start' || k === 'end') {
      throw new Error('Legacy range options ("start" and "end") have been removed')
    }

    let opt = options[k]

    if (isRangeOption(k)) {
      // Note that we don't reject nullish and empty options here. While
      // those types are invalid as keys, they are valid as range options.
      opt = db._serializeKey(opt)
    }

    result[k] = opt
  }

  return result
}

function isRangeOption (k) {
  return rangeOptions.indexOf(k) !== -1
}

AbstractLevelDOWN.prototype.iterator = function (options) {
  if (typeof options !== 'object' || options === null) options = {}
  options = this._setupIteratorOptions(options)
  return this._iterator(options)
}

AbstractLevelDOWN.prototype._iterator = function (options) {
  return new AbstractIterator(this)
}

AbstractLevelDOWN.prototype._chainedBatch = function () {
  return new AbstractChainedBatch(this)
}

AbstractLevelDOWN.prototype._serializeKey = function (key) {
  return key
}

AbstractLevelDOWN.prototype._serializeValue = function (value) {
  return value
}

AbstractLevelDOWN.prototype._checkKey = function (key) {
  if (key === null || key === undefined) {
    return new Error('key cannot be `null` or `undefined`')
  } else if (isBuffer(key) && key.length === 0) { // TODO: replace with typed array check
    return new Error('key cannot be an empty Buffer')
  } else if (key === '') {
    return new Error('key cannot be an empty String')
  } else if (Array.isArray(key) && key.length === 0) {
    return new Error('key cannot be an empty Array')
  }
}

AbstractLevelDOWN.prototype._checkValue = function (value) {
  if (value === null || value === undefined) {
    return new Error('value cannot be `null` or `undefined`')
  }
}

// Expose browser-compatible nextTick for dependents
// TODO: rename _nextTick to _queueMicrotask
// TODO: after we drop node 10, also use queueMicrotask in node
AbstractLevelDOWN.prototype._nextTick = require('./next-tick')

module.exports = AbstractLevelDOWN

},{"./abstract-chained-batch":32,"./abstract-iterator":33,"./next-tick":36,"is-buffer":44,"level-supports":57}],35:[function(require,module,exports){
'use strict'

exports.AbstractLevelDOWN = require('./abstract-leveldown')
exports.AbstractIterator = require('./abstract-iterator')
exports.AbstractChainedBatch = require('./abstract-chained-batch')

},{"./abstract-chained-batch":32,"./abstract-iterator":33,"./abstract-leveldown":34}],36:[function(require,module,exports){
'use strict'

const queueMicrotask = require('queue-microtask')

module.exports = function (fn, ...args) {
  if (args.length === 0) {
    queueMicrotask(fn)
  } else {
    queueMicrotask(() => fn(...args))
  }
}

},{"queue-microtask":66}],37:[function(require,module,exports){
(function (process){(function (){
'use strict'

exports.fromCallback = function (callback) {
  if (callback === undefined) {
    var promise = new Promise(function (resolve, reject) {
      callback = function (err, res) {
        if (err) reject(err)
        else resolve(res)
      }
    })

    callback.promise = promise
  }

  return callback
}

exports.fromPromise = function (promise, callback) {
  if (callback === undefined) return promise

  promise
    .then(function (res) { process.nextTick(callback, null, res) })
    .catch(function (err) { process.nextTick(callback, err) })
}

}).call(this)}).call(this,require('_process'))
},{"_process":127}],38:[function(require,module,exports){
'use strict'

const AbstractIterator = require('abstract-leveldown').AbstractIterator
const inherits = require('inherits')

function DeferredIterator (db, options) {
  AbstractIterator.call(this, db)

  this._options = options
  this._iterator = null
  this._operations = []
}

inherits(DeferredIterator, AbstractIterator)

DeferredIterator.prototype.setDb = function (db) {
  const it = this._iterator = db.iterator(this._options)

  for (const op of this._operations) {
    it[op.method](...op.args)
  }
}

DeferredIterator.prototype._operation = function (method, args) {
  if (this._iterator) return this._iterator[method](...args)
  this._operations.push({ method, args })
}

for (const m of ['next', 'end']) {
  DeferredIterator.prototype['_' + m] = function (...args) {
    this._operation(m, args)
  }
}

// Must defer seek() rather than _seek() because it requires db._serializeKey to be available
DeferredIterator.prototype.seek = function (...args) {
  this._operation('seek', args)
}

module.exports = DeferredIterator

},{"abstract-leveldown":35,"inherits":43}],39:[function(require,module,exports){
'use strict'

const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
const inherits = require('inherits')
const DeferredIterator = require('./deferred-iterator')
const deferrables = 'put get del batch clear'.split(' ')
const optionalDeferrables = 'approximateSize compactRange'.split(' ')

function DeferredLevelDOWN (db) {
  AbstractLevelDOWN.call(this, db.supports || {})

  // TODO (future major): remove this fallback; db must have manifest that
  // declares approximateSize and compactRange in additionalMethods.
  for (const m of optionalDeferrables) {
    if (typeof db[m] === 'function' && !this.supports.additionalMethods[m]) {
      this.supports.additionalMethods[m] = true
    }
  }

  this._db = db
  this._operations = []

  closed(this)
}

inherits(DeferredLevelDOWN, AbstractLevelDOWN)

DeferredLevelDOWN.prototype.type = 'deferred-leveldown'

DeferredLevelDOWN.prototype._open = function (options, callback) {
  this._db.open(options, (err) => {
    if (err) return callback(err)

    for (const op of this._operations) {
      if (op.iterator) {
        op.iterator.setDb(this._db)
      } else {
        this._db[op.method](...op.args)
      }
    }

    this._operations = []

    open(this)
    callback()
  })
}

DeferredLevelDOWN.prototype._close = function (callback) {
  this._db.close((err) => {
    if (err) return callback(err)
    closed(this)
    callback()
  })
}

function open (self) {
  for (const m of deferrables.concat('iterator')) {
    self['_' + m] = function (...args) {
      return this._db[m](...args)
    }
  }

  for (const m of Object.keys(self.supports.additionalMethods)) {
    self[m] = function (...args) {
      return this._db[m](...args)
    }
  }
}

function closed (self) {
  for (const m of deferrables) {
    self['_' + m] = function (...args) {
      this._operations.push({ method: m, args })
    }
  }

  for (const m of Object.keys(self.supports.additionalMethods)) {
    self[m] = function (...args) {
      this._operations.push({ method: m, args })
    }
  }

  self._iterator = function (options) {
    const it = new DeferredIterator(self, options)
    this._operations.push({ iterator: it })
    return it
  }
}

DeferredLevelDOWN.prototype._serializeKey = function (key) {
  return key
}

DeferredLevelDOWN.prototype._serializeValue = function (value) {
  return value
}

module.exports = DeferredLevelDOWN
module.exports.DeferredIterator = DeferredIterator

},{"./deferred-iterator":38,"abstract-leveldown":35,"inherits":43}],40:[function(require,module,exports){
'use strict'

const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
const AbstractChainedBatch = require('abstract-leveldown').AbstractChainedBatch
const AbstractIterator = require('abstract-leveldown').AbstractIterator
const inherits = require('inherits')
const Codec = require('level-codec')
const EncodingError = require('level-errors').EncodingError
const rangeMethods = ['approximateSize', 'compactRange']

module.exports = DB

function DB (db, opts) {
  if (!(this instanceof DB)) return new DB(db, opts)

  const manifest = db.supports || {}
  const additionalMethods = manifest.additionalMethods || {}

  AbstractLevelDOWN.call(this, manifest)

  this.supports.encodings = true
  this.supports.additionalMethods = {}

  rangeMethods.forEach(function (m) {
    // TODO (future major): remove this fallback
    const fallback = typeof db[m] === 'function'

    if (additionalMethods[m] || fallback) {
      this.supports.additionalMethods[m] = true

      this[m] = function (start, end, opts, cb) {
        start = this.codec.encodeKey(start, opts)
        end = this.codec.encodeKey(end, opts)
        return this.db[m](start, end, opts, cb)
      }
    }
  }, this)

  opts = opts || {}
  if (typeof opts.keyEncoding === 'undefined') opts.keyEncoding = 'utf8'
  if (typeof opts.valueEncoding === 'undefined') opts.valueEncoding = 'utf8'

  this.db = db
  this.codec = new Codec(opts)
}

inherits(DB, AbstractLevelDOWN)

DB.prototype.type = 'encoding-down'

DB.prototype._serializeKey =
DB.prototype._serializeValue = function (datum) {
  return datum
}

DB.prototype._open = function (opts, cb) {
  this.db.open(opts, cb)
}

DB.prototype._close = function (cb) {
  this.db.close(cb)
}

DB.prototype._put = function (key, value, opts, cb) {
  key = this.codec.encodeKey(key, opts)
  value = this.codec.encodeValue(value, opts)
  this.db.put(key, value, opts, cb)
}

DB.prototype._get = function (key, opts, cb) {
  key = this.codec.encodeKey(key, opts)
  opts.asBuffer = this.codec.valueAsBuffer(opts)

  this.db.get(key, opts, (err, value) => {
    if (err) return cb(err)

    try {
      value = this.codec.decodeValue(value, opts)
    } catch (err) {
      return cb(new EncodingError(err))
    }

    cb(null, value)
  })
}

DB.prototype._del = function (key, opts, cb) {
  key = this.codec.encodeKey(key, opts)
  this.db.del(key, opts, cb)
}

DB.prototype._chainedBatch = function () {
  return new Batch(this)
}

DB.prototype._batch = function (ops, opts, cb) {
  ops = this.codec.encodeBatch(ops, opts)
  this.db.batch(ops, opts, cb)
}

DB.prototype._iterator = function (opts) {
  opts.keyAsBuffer = this.codec.keyAsBuffer(opts)
  opts.valueAsBuffer = this.codec.valueAsBuffer(opts)
  return new Iterator(this, opts)
}

DB.prototype._clear = function (opts, callback) {
  opts = this.codec.encodeLtgt(opts)
  this.db.clear(opts, callback)
}

function Iterator (db, opts) {
  AbstractIterator.call(this, db)
  this.codec = db.codec
  this.keys = opts.keys
  this.values = opts.values
  this.opts = this.codec.encodeLtgt(opts)
  this.it = db.db.iterator(this.opts)
}

inherits(Iterator, AbstractIterator)

Iterator.prototype._next = function (cb) {
  this.it.next((err, key, value) => {
    if (err) return cb(err)

    try {
      if (this.keys && typeof key !== 'undefined') {
        key = this.codec.decodeKey(key, this.opts)
      } else {
        key = undefined
      }

      if (this.values && typeof value !== 'undefined') {
        value = this.codec.decodeValue(value, this.opts)
      } else {
        value = undefined
      }
    } catch (err) {
      return cb(new EncodingError(err))
    }

    cb(null, key, value)
  })
}

Iterator.prototype._seek = function (key) {
  key = this.codec.encodeKey(key, this.opts)
  this.it.seek(key)
}

Iterator.prototype._end = function (cb) {
  this.it.end(cb)
}

function Batch (db, codec) {
  AbstractChainedBatch.call(this, db)
  this.codec = db.codec
  this.batch = db.db.batch()
}

inherits(Batch, AbstractChainedBatch)

Batch.prototype._put = function (key, value, options) {
  key = this.codec.encodeKey(key, options)
  value = this.codec.encodeValue(value, options)
  this.batch.put(key, value)
}

Batch.prototype._del = function (key, options) {
  key = this.codec.encodeKey(key, options)
  this.batch.del(key)
}

Batch.prototype._clear = function () {
  this.batch.clear()
}

Batch.prototype._write = function (opts, cb) {
  this.batch.write(opts, cb)
}

},{"abstract-leveldown":35,"inherits":43,"level-codec":45,"level-errors":47}],41:[function(require,module,exports){
var prr = require('prr')

function init (type, message, cause) {
  if (!!message && typeof message != 'string') {
    message = message.message || message.name
  }
  prr(this, {
      type    : type
    , name    : type
      // can be passed just a 'cause'
    , cause   : typeof message != 'string' ? message : cause
    , message : message
  }, 'ewr')
}

// generic prototype, not intended to be actually used - helpful for `instanceof`
function CustomError (message, cause) {
  Error.call(this)
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, this.constructor)
  init.call(this, 'CustomError', message, cause)
}

CustomError.prototype = new Error()

function createError (errno, type, proto) {
  var err = function (message, cause) {
    init.call(this, type, message, cause)
    //TODO: the specificity here is stupid, errno should be available everywhere
    if (type == 'FilesystemError') {
      this.code    = this.cause.code
      this.path    = this.cause.path
      this.errno   = this.cause.errno
      this.message =
        (errno.errno[this.cause.errno]
          ? errno.errno[this.cause.errno].description
          : this.cause.message)
        + (this.cause.path ? ' [' + this.cause.path + ']' : '')
    }
    Error.call(this)
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, err)
  }
  err.prototype = !!proto ? new proto() : new CustomError()
  return err
}

module.exports = function (errno) {
  var ce = function (type, proto) {
    return createError(errno, type, proto)
  }
  return {
      CustomError     : CustomError
    , FilesystemError : ce('FilesystemError')
    , createError     : ce
  }
}

},{"prr":65}],42:[function(require,module,exports){
var all = module.exports.all = [
  {
    errno: -2,
    code: 'ENOENT',
    description: 'no such file or directory'
  },
  {
    errno: -1,
    code: 'UNKNOWN',
    description: 'unknown error'
  },
  {
    errno: 0,
    code: 'OK',
    description: 'success'
  },
  {
    errno: 1,
    code: 'EOF',
    description: 'end of file'
  },
  {
    errno: 2,
    code: 'EADDRINFO',
    description: 'getaddrinfo error'
  },
  {
    errno: 3,
    code: 'EACCES',
    description: 'permission denied'
  },
  {
    errno: 4,
    code: 'EAGAIN',
    description: 'resource temporarily unavailable'
  },
  {
    errno: 5,
    code: 'EADDRINUSE',
    description: 'address already in use'
  },
  {
    errno: 6,
    code: 'EADDRNOTAVAIL',
    description: 'address not available'
  },
  {
    errno: 7,
    code: 'EAFNOSUPPORT',
    description: 'address family not supported'
  },
  {
    errno: 8,
    code: 'EALREADY',
    description: 'connection already in progress'
  },
  {
    errno: 9,
    code: 'EBADF',
    description: 'bad file descriptor'
  },
  {
    errno: 10,
    code: 'EBUSY',
    description: 'resource busy or locked'
  },
  {
    errno: 11,
    code: 'ECONNABORTED',
    description: 'software caused connection abort'
  },
  {
    errno: 12,
    code: 'ECONNREFUSED',
    description: 'connection refused'
  },
  {
    errno: 13,
    code: 'ECONNRESET',
    description: 'connection reset by peer'
  },
  {
    errno: 14,
    code: 'EDESTADDRREQ',
    description: 'destination address required'
  },
  {
    errno: 15,
    code: 'EFAULT',
    description: 'bad address in system call argument'
  },
  {
    errno: 16,
    code: 'EHOSTUNREACH',
    description: 'host is unreachable'
  },
  {
    errno: 17,
    code: 'EINTR',
    description: 'interrupted system call'
  },
  {
    errno: 18,
    code: 'EINVAL',
    description: 'invalid argument'
  },
  {
    errno: 19,
    code: 'EISCONN',
    description: 'socket is already connected'
  },
  {
    errno: 20,
    code: 'EMFILE',
    description: 'too many open files'
  },
  {
    errno: 21,
    code: 'EMSGSIZE',
    description: 'message too long'
  },
  {
    errno: 22,
    code: 'ENETDOWN',
    description: 'network is down'
  },
  {
    errno: 23,
    code: 'ENETUNREACH',
    description: 'network is unreachable'
  },
  {
    errno: 24,
    code: 'ENFILE',
    description: 'file table overflow'
  },
  {
    errno: 25,
    code: 'ENOBUFS',
    description: 'no buffer space available'
  },
  {
    errno: 26,
    code: 'ENOMEM',
    description: 'not enough memory'
  },
  {
    errno: 27,
    code: 'ENOTDIR',
    description: 'not a directory'
  },
  {
    errno: 28,
    code: 'EISDIR',
    description: 'illegal operation on a directory'
  },
  {
    errno: 29,
    code: 'ENONET',
    description: 'machine is not on the network'
  },
  {
    errno: 31,
    code: 'ENOTCONN',
    description: 'socket is not connected'
  },
  {
    errno: 32,
    code: 'ENOTSOCK',
    description: 'socket operation on non-socket'
  },
  {
    errno: 33,
    code: 'ENOTSUP',
    description: 'operation not supported on socket'
  },
  {
    errno: 34,
    code: 'ENOENT',
    description: 'no such file or directory'
  },
  {
    errno: 35,
    code: 'ENOSYS',
    description: 'function not implemented'
  },
  {
    errno: 36,
    code: 'EPIPE',
    description: 'broken pipe'
  },
  {
    errno: 37,
    code: 'EPROTO',
    description: 'protocol error'
  },
  {
    errno: 38,
    code: 'EPROTONOSUPPORT',
    description: 'protocol not supported'
  },
  {
    errno: 39,
    code: 'EPROTOTYPE',
    description: 'protocol wrong type for socket'
  },
  {
    errno: 40,
    code: 'ETIMEDOUT',
    description: 'connection timed out'
  },
  {
    errno: 41,
    code: 'ECHARSET',
    description: 'invalid Unicode character'
  },
  {
    errno: 42,
    code: 'EAIFAMNOSUPPORT',
    description: 'address family for hostname not supported'
  },
  {
    errno: 44,
    code: 'EAISERVICE',
    description: 'servname not supported for ai_socktype'
  },
  {
    errno: 45,
    code: 'EAISOCKTYPE',
    description: 'ai_socktype not supported'
  },
  {
    errno: 46,
    code: 'ESHUTDOWN',
    description: 'cannot send after transport endpoint shutdown'
  },
  {
    errno: 47,
    code: 'EEXIST',
    description: 'file already exists'
  },
  {
    errno: 48,
    code: 'ESRCH',
    description: 'no such process'
  },
  {
    errno: 49,
    code: 'ENAMETOOLONG',
    description: 'name too long'
  },
  {
    errno: 50,
    code: 'EPERM',
    description: 'operation not permitted'
  },
  {
    errno: 51,
    code: 'ELOOP',
    description: 'too many symbolic links encountered'
  },
  {
    errno: 52,
    code: 'EXDEV',
    description: 'cross-device link not permitted'
  },
  {
    errno: 53,
    code: 'ENOTEMPTY',
    description: 'directory not empty'
  },
  {
    errno: 54,
    code: 'ENOSPC',
    description: 'no space left on device'
  },
  {
    errno: 55,
    code: 'EIO',
    description: 'i/o error'
  },
  {
    errno: 56,
    code: 'EROFS',
    description: 'read-only file system'
  },
  {
    errno: 57,
    code: 'ENODEV',
    description: 'no such device'
  },
  {
    errno: 58,
    code: 'ESPIPE',
    description: 'invalid seek'
  },
  {
    errno: 59,
    code: 'ECANCELED',
    description: 'operation canceled'
  }
]

module.exports.errno = {}
module.exports.code = {}

all.forEach(function (error) {
  module.exports.errno[error.errno] = error
  module.exports.code[error.code] = error
})

module.exports.custom = require('./custom')(module.exports)
module.exports.create = module.exports.custom.createError

},{"./custom":41}],43:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],44:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

},{}],45:[function(require,module,exports){
'use strict'

const encodings = require('./lib/encodings')
const rangeOptions = new Set(['lt', 'gt', 'lte', 'gte'])

module.exports = Codec

function Codec (opts) {
  if (!(this instanceof Codec)) {
    return new Codec(opts)
  }
  this.opts = opts || {}
  this.encodings = encodings
}

Codec.prototype._encoding = function (encoding) {
  if (typeof encoding === 'string') encoding = encodings[encoding]
  if (!encoding) encoding = encodings.id
  return encoding
}

Codec.prototype._keyEncoding = function (opts, batchOpts) {
  return this._encoding((batchOpts && batchOpts.keyEncoding) ||
                        (opts && opts.keyEncoding) ||
                        this.opts.keyEncoding)
}

Codec.prototype._valueEncoding = function (opts, batchOpts) {
  return this._encoding((batchOpts && (batchOpts.valueEncoding || batchOpts.encoding)) ||
                        (opts && (opts.valueEncoding || opts.encoding)) ||
                        (this.opts.valueEncoding || this.opts.encoding))
}

Codec.prototype.encodeKey = function (key, opts, batchOpts) {
  return this._keyEncoding(opts, batchOpts).encode(key)
}

Codec.prototype.encodeValue = function (value, opts, batchOpts) {
  return this._valueEncoding(opts, batchOpts).encode(value)
}

Codec.prototype.decodeKey = function (key, opts) {
  return this._keyEncoding(opts).decode(key)
}

Codec.prototype.decodeValue = function (value, opts) {
  return this._valueEncoding(opts).decode(value)
}

Codec.prototype.encodeBatch = function (ops, opts) {
  return ops.map((_op) => {
    const op = {
      type: _op.type,
      key: this.encodeKey(_op.key, opts, _op)
    }
    if (this.keyAsBuffer(opts, _op)) op.keyEncoding = 'binary'
    if (_op.prefix) op.prefix = _op.prefix
    if ('value' in _op) {
      op.value = this.encodeValue(_op.value, opts, _op)
      if (this.valueAsBuffer(opts, _op)) op.valueEncoding = 'binary'
    }
    return op
  })
}

Codec.prototype.encodeLtgt = function (ltgt) {
  const ret = {}

  for (const key of Object.keys(ltgt)) {
    if (key === 'start' || key === 'end') {
      throw new Error('Legacy range options ("start" and "end") have been removed')
    }

    ret[key] = rangeOptions.has(key)
      ? this.encodeKey(ltgt[key], ltgt)
      : ltgt[key]
  }

  return ret
}

Codec.prototype.createStreamDecoder = function (opts) {
  if (opts.keys && opts.values) {
    return (key, value) => {
      return {
        key: this.decodeKey(key, opts),
        value: this.decodeValue(value, opts)
      }
    }
  } else if (opts.keys) {
    return (key) => {
      return this.decodeKey(key, opts)
    }
  } else if (opts.values) {
    return (_, value) => {
      return this.decodeValue(value, opts)
    }
  } else {
    return function () {}
  }
}

Codec.prototype.keyAsBuffer = function (opts) {
  return this._keyEncoding(opts).buffer
}

Codec.prototype.valueAsBuffer = function (opts) {
  return this._valueEncoding(opts).buffer
}

},{"./lib/encodings":46}],46:[function(require,module,exports){
'use strict'

const { Buffer } = require('buffer')

exports.utf8 = exports['utf-8'] = {
  encode: function (data) {
    return isBinary(data) ? data : String(data)
  },
  decode: identity,
  buffer: false,
  type: 'utf8'
}

exports.json = {
  encode: JSON.stringify,
  decode: JSON.parse,
  buffer: false,
  type: 'json'
}

exports.binary = {
  encode: function (data) {
    return isBinary(data) ? data : Buffer.from(data)
  },
  decode: identity,
  buffer: true,
  type: 'binary'
}

exports.none = {
  encode: identity,
  decode: identity,
  buffer: false,
  type: 'id'
}

exports.id = exports.none

const bufferEncodings = [
  'hex',
  'ascii',
  'base64',
  'ucs2',
  'ucs-2',
  'utf16le',
  'utf-16le'
]

for (const type of bufferEncodings) {
  exports[type] = {
    encode: function (data) {
      return isBinary(data) ? data : Buffer.from(data, type)
    },
    decode: function (buffer) {
      return buffer.toString(type)
    },
    buffer: true,
    type: type
  }
}

function identity (value) {
  return value
}

function isBinary (data) {
  return data === undefined || data === null || Buffer.isBuffer(data)
}

},{"buffer":108}],47:[function(require,module,exports){
'use strict'

const createError = require('errno').create
const LevelUPError = createError('LevelUPError')
const NotFoundError = createError('NotFoundError', LevelUPError)

NotFoundError.prototype.notFound = true
NotFoundError.prototype.status = 404

module.exports = {
  LevelUPError: LevelUPError,
  InitializationError: createError('InitializationError', LevelUPError),
  OpenError: createError('OpenError', LevelUPError),
  ReadError: createError('ReadError', LevelUPError),
  WriteError: createError('WriteError', LevelUPError),
  NotFoundError: NotFoundError,
  EncodingError: createError('EncodingError', LevelUPError)
}

},{"errno":42}],48:[function(require,module,exports){
'use strict'

const inherits = require('inherits')
const { Readable } = require('readable-stream')

module.exports = ReadStream
inherits(ReadStream, Readable)

function ReadStream (iterator, options) {
  if (!(this instanceof ReadStream)) return new ReadStream(iterator, options)
  options = options || {}
  Readable.call(this, Object.assign({}, options, {
    objectMode: true
  }))
  this._iterator = iterator
  this._options = options
  this.on('end', this.destroy.bind(this, null, null))
}

ReadStream.prototype._read = function () {
  if (this.destroyed) return

  this._iterator.next((err, key, value) => {
    if (this.destroyed) return
    if (err) return this.destroy(err)

    if (key === undefined && value === undefined) {
      this.push(null)
    } else if (this._options.keys !== false && this._options.values === false) {
      this.push(key)
    } else if (this._options.keys === false && this._options.values !== false) {
      this.push(value)
    } else {
      this.push({ key, value })
    }
  })
}

ReadStream.prototype._destroy = function (err, callback) {
  this._iterator.end(function (err2) {
    callback(err || err2)
  })
}

},{"inherits":43,"readable-stream":81}],49:[function(require,module,exports){
/* global indexedDB */

'use strict'

module.exports = Level

const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
const inherits = require('inherits')
const Iterator = require('./iterator')
const serialize = require('./util/serialize')
const deserialize = require('./util/deserialize')
const support = require('./util/support')
const clear = require('./util/clear')
const createKeyRange = require('./util/key-range')

const DEFAULT_PREFIX = 'level-js-'

function Level (location, opts) {
  if (!(this instanceof Level)) return new Level(location, opts)

  AbstractLevelDOWN.call(this, {
    bufferKeys: support.bufferKeys(indexedDB),
    snapshots: true,
    permanence: true,
    clear: true
  })

  opts = opts || {}

  if (typeof location !== 'string') {
    throw new Error('constructor requires a location string argument')
  }

  this.location = location
  this.prefix = opts.prefix == null ? DEFAULT_PREFIX : opts.prefix
  this.version = parseInt(opts.version || 1, 10)
}

inherits(Level, AbstractLevelDOWN)

Level.prototype.type = 'level-js'

Level.prototype._open = function (options, callback) {
  const req = indexedDB.open(this.prefix + this.location, this.version)

  req.onerror = function () {
    callback(req.error || new Error('unknown error'))
  }

  req.onsuccess = () => {
    this.db = req.result
    callback()
  }

  req.onupgradeneeded = (ev) => {
    const db = ev.target.result

    if (!db.objectStoreNames.contains(this.location)) {
      db.createObjectStore(this.location)
    }
  }
}

Level.prototype.store = function (mode) {
  const transaction = this.db.transaction([this.location], mode)
  return transaction.objectStore(this.location)
}

Level.prototype.await = function (request, callback) {
  const transaction = request.transaction

  // Take advantage of the fact that a non-canceled request error aborts
  // the transaction. I.e. no need to listen for "request.onerror".
  transaction.onabort = function () {
    callback(transaction.error || new Error('aborted by user'))
  }

  transaction.oncomplete = function () {
    callback(null, request.result)
  }
}

Level.prototype._get = function (key, options, callback) {
  const store = this.store('readonly')
  let req

  try {
    req = store.get(key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, function (err, value) {
    if (err) return callback(err)

    if (value === undefined) {
      // 'NotFound' error, consistent with LevelDOWN API
      return callback(new Error('NotFound'))
    }

    callback(null, deserialize(value, options.asBuffer))
  })
}

Level.prototype._del = function (key, options, callback) {
  const store = this.store('readwrite')
  let req

  try {
    req = store.delete(key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._put = function (key, value, options, callback) {
  const store = this.store('readwrite')
  let req

  try {
    // Will throw a DataError or DataCloneError if the environment
    // does not support serializing the key or value respectively.
    req = store.put(value, key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._serializeKey = function (key) {
  return serialize(key, this.supports.bufferKeys)
}

Level.prototype._serializeValue = function (value) {
  return serialize(value, true)
}

Level.prototype._iterator = function (options) {
  return new Iterator(this, this.location, options)
}

Level.prototype._batch = function (operations, options, callback) {
  if (operations.length === 0) return this._nextTick(callback)

  const store = this.store('readwrite')
  const transaction = store.transaction
  let index = 0
  let error

  transaction.onabort = function () {
    callback(error || transaction.error || new Error('aborted by user'))
  }

  transaction.oncomplete = function () {
    callback()
  }

  // Wait for a request to complete before making the next, saving CPU.
  function loop () {
    const op = operations[index++]
    const key = op.key

    let req

    try {
      req = op.type === 'del' ? store.delete(key) : store.put(op.value, key)
    } catch (err) {
      error = err
      transaction.abort()
      return
    }

    if (index < operations.length) {
      req.onsuccess = loop
    }
  }

  loop()
}

Level.prototype._clear = function (options, callback) {
  let keyRange
  let req

  try {
    keyRange = createKeyRange(options)
  } catch (e) {
    // The lower key is greater than the upper key.
    // IndexedDB throws an error, but we'll just do nothing.
    return this._nextTick(callback)
  }

  if (options.limit >= 0) {
    // IDBObjectStore#delete(range) doesn't have such an option.
    // Fall back to cursor-based implementation.
    return clear(this, this.location, keyRange, options, callback)
  }

  try {
    const store = this.store('readwrite')
    req = keyRange ? store.delete(keyRange) : store.clear()
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._close = function (callback) {
  this.db.close()
  this._nextTick(callback)
}

// NOTE: remove in a next major release
Level.prototype.upgrade = function (callback) {
  if (this.status !== 'open') {
    return this._nextTick(callback, new Error('cannot upgrade() before open()'))
  }

  const it = this.iterator()
  const batchOptions = {}
  const self = this

  it._deserializeKey = it._deserializeValue = identity
  next()

  function next (err) {
    if (err) return finish(err)
    it.next(each)
  }

  function each (err, key, value) {
    if (err || key === undefined) {
      return finish(err)
    }

    const newKey = self._serializeKey(deserialize(key, true))
    const newValue = self._serializeValue(deserialize(value, true))

    // To bypass serialization on the old key, use _batch() instead of batch().
    // NOTE: if we disable snapshotting (#86) this could lead to a loop of
    // inserting and then iterating those same entries, because the new keys
    // possibly sort after the old keys.
    self._batch([
      { type: 'del', key: key },
      { type: 'put', key: newKey, value: newValue }
    ], batchOptions, next)
  }

  function finish (err) {
    it.end(function (err2) {
      callback(err || err2)
    })
  }

  function identity (data) {
    return data
  }
}

Level.destroy = function (location, prefix, callback) {
  if (typeof prefix === 'function') {
    callback = prefix
    prefix = DEFAULT_PREFIX
  }
  const request = indexedDB.deleteDatabase(prefix + location)
  request.onsuccess = function () {
    callback()
  }
  request.onerror = function (err) {
    callback(err)
  }
}

},{"./iterator":50,"./util/clear":51,"./util/deserialize":52,"./util/key-range":53,"./util/serialize":54,"./util/support":55,"abstract-leveldown":35,"inherits":43}],50:[function(require,module,exports){
'use strict'

const inherits = require('inherits')
const AbstractIterator = require('abstract-leveldown').AbstractIterator
const createKeyRange = require('./util/key-range')
const deserialize = require('./util/deserialize')
const noop = function () {}

module.exports = Iterator

function Iterator (db, location, options) {
  AbstractIterator.call(this, db)

  this._limit = options.limit
  this._count = 0
  this._callback = null
  this._cache = []
  this._completed = false
  this._aborted = false
  this._error = null
  this._transaction = null

  this._keys = options.keys
  this._values = options.values
  this._keyAsBuffer = options.keyAsBuffer
  this._valueAsBuffer = options.valueAsBuffer

  if (this._limit === 0) {
    this._completed = true
    return
  }

  let keyRange

  try {
    keyRange = createKeyRange(options)
  } catch (e) {
    // The lower key is greater than the upper key.
    // IndexedDB throws an error, but we'll just return 0 results.
    this._completed = true
    return
  }

  this.createIterator(location, keyRange, options.reverse)
}

inherits(Iterator, AbstractIterator)

Iterator.prototype.createIterator = function (location, keyRange, reverse) {
  const transaction = this.db.db.transaction([location], 'readonly')
  const store = transaction.objectStore(location)
  const req = store.openCursor(keyRange, reverse ? 'prev' : 'next')

  req.onsuccess = (ev) => {
    const cursor = ev.target.result
    if (cursor) this.onItem(cursor)
  }

  this._transaction = transaction

  // If an error occurs (on the request), the transaction will abort.
  transaction.onabort = () => {
    this.onAbort(this._transaction.error || new Error('aborted by user'))
  }

  transaction.oncomplete = () => {
    this.onComplete()
  }
}

Iterator.prototype.onItem = function (cursor) {
  this._cache.push(cursor.key, cursor.value)

  if (this._limit <= 0 || ++this._count < this._limit) {
    cursor.continue()
  }

  this.maybeNext()
}

Iterator.prototype.onAbort = function (err) {
  this._aborted = true
  this._error = err
  this.maybeNext()
}

Iterator.prototype.onComplete = function () {
  this._completed = true
  this.maybeNext()
}

Iterator.prototype.maybeNext = function () {
  if (this._callback) {
    this._next(this._callback)
    this._callback = null
  }
}

Iterator.prototype._next = function (callback) {
  if (this._aborted) {
    // The error should be picked up by either next() or end().
    const err = this._error
    this._error = null
    this._nextTick(callback, err)
  } else if (this._cache.length > 0) {
    let key = this._cache.shift()
    let value = this._cache.shift()

    if (this._keys && key !== undefined) {
      key = this._deserializeKey(key, this._keyAsBuffer)
    } else {
      key = undefined
    }

    if (this._values && value !== undefined) {
      value = this._deserializeValue(value, this._valueAsBuffer)
    } else {
      value = undefined
    }

    this._nextTick(callback, null, key, value)
  } else if (this._completed) {
    this._nextTick(callback)
  } else {
    this._callback = callback
  }
}

// Exposed for the v4 to v5 upgrade utility
Iterator.prototype._deserializeKey = deserialize
Iterator.prototype._deserializeValue = deserialize

Iterator.prototype._end = function (callback) {
  if (this._aborted || this._completed) {
    return this._nextTick(callback, this._error)
  }

  // Don't advance the cursor anymore, and the transaction will complete
  // on its own in the next tick. This approach is much cleaner than calling
  // transaction.abort() with its unpredictable event order.
  this.onItem = noop
  this.onAbort = callback
  this.onComplete = callback
}

},{"./util/deserialize":52,"./util/key-range":53,"abstract-leveldown":35,"inherits":43}],51:[function(require,module,exports){
'use strict'

module.exports = function clear (db, location, keyRange, options, callback) {
  if (options.limit === 0) return db._nextTick(callback)

  const transaction = db.db.transaction([location], 'readwrite')
  const store = transaction.objectStore(location)
  let count = 0

  transaction.oncomplete = function () {
    callback()
  }

  transaction.onabort = function () {
    callback(transaction.error || new Error('aborted by user'))
  }

  // A key cursor is faster (skips reading values) but not supported by IE
  const method = store.openKeyCursor ? 'openKeyCursor' : 'openCursor'
  const direction = options.reverse ? 'prev' : 'next'

  store[method](keyRange, direction).onsuccess = function (ev) {
    const cursor = ev.target.result

    if (cursor) {
      // Wait for a request to complete before continuing, saving CPU.
      store.delete(cursor.key).onsuccess = function () {
        if (options.limit <= 0 || ++count < options.limit) {
          cursor.continue()
        }
      }
    }
  }
}

},{}],52:[function(require,module,exports){
(function (global){(function (){
'use strict'

const Buffer = require('buffer').Buffer
const ta2str = (function () {
  if (global.TextDecoder) {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode.bind(decoder)
  } else {
    return function ta2str (ta) {
      return ta2buf(ta).toString()
    }
  }
})()

const ab2str = (function () {
  if (global.TextDecoder) {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode.bind(decoder)
  } else {
    return function ab2str (ab) {
      return Buffer.from(ab).toString()
    }
  }
})()

function ta2buf (ta) {
  const buf = Buffer.from(ta.buffer)

  if (ta.byteLength === ta.buffer.byteLength) {
    return buf
  } else {
    return buf.slice(ta.byteOffset, ta.byteOffset + ta.byteLength)
  }
}

module.exports = function (data, asBuffer) {
  if (data instanceof Uint8Array) {
    return asBuffer ? ta2buf(data) : ta2str(data)
  } else if (data instanceof ArrayBuffer) {
    return asBuffer ? Buffer.from(data) : ab2str(data)
  } else {
    return asBuffer ? Buffer.from(String(data)) : String(data)
  }
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":108}],53:[function(require,module,exports){
/* global IDBKeyRange */

'use strict'

const ltgt = require('ltgt')
const NONE = Symbol('none')

module.exports = function createKeyRange (options) {
  const lower = ltgt.lowerBound(options, NONE)
  const upper = ltgt.upperBound(options, NONE)
  const lowerOpen = ltgt.lowerBoundExclusive(options, NONE)
  const upperOpen = ltgt.upperBoundExclusive(options, NONE)

  if (lower !== NONE && upper !== NONE) {
    return IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)
  } else if (lower !== NONE) {
    return IDBKeyRange.lowerBound(lower, lowerOpen)
  } else if (upper !== NONE) {
    return IDBKeyRange.upperBound(upper, upperOpen)
  } else {
    return null
  }
}

},{"ltgt":63}],54:[function(require,module,exports){
(function (global){(function (){
'use strict'

const Buffer = require('buffer').Buffer
// Returns either a Uint8Array or Buffer (doesn't matter to
// IndexedDB, because Buffer is a subclass of Uint8Array)
const str2bin = (function () {
  if (global.TextEncoder) {
    const encoder = new TextEncoder('utf-8')
    return encoder.encode.bind(encoder)
  } else {
    return Buffer.from
  }
})()

module.exports = function (data, asBuffer) {
  if (asBuffer) {
    return Buffer.isBuffer(data) ? data : str2bin(String(data))
  } else {
    return String(data)
  }
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":108}],55:[function(require,module,exports){
'use strict'

const Buffer = require('buffer').Buffer

exports.test = function (key) {
  return function test (impl) {
    try {
      impl.cmp(key, 0)
      return true
    } catch (err) {
      return false
    }
  }
}

// Detect binary key support (IndexedDB Second Edition)
exports.bufferKeys = exports.test(Buffer.alloc(0))

},{"buffer":108}],56:[function(require,module,exports){
'use strict'

const levelup = require('levelup')
const encode = require('encoding-down')

function packager (leveldown) {
  function Level (location, options, callback) {
    if (typeof location === 'function') {
      callback = location
    } else if (typeof options === 'function') {
      callback = options
    }

    if (!isObject(options)) {
      options = isObject(location) ? location : {}
    }

    return levelup(encode(leveldown(location, options), options), options, callback)
  }

  function isObject (o) {
    return typeof o === 'object' && o !== null
  }

  for (const m of ['destroy', 'repair']) {
    if (typeof leveldown[m] === 'function') {
      Level[m] = function (...args) {
        leveldown[m](...args)
      }
    }
  }

  Level.errors = levelup.errors

  return Level
}

module.exports = packager

},{"encoding-down":40,"levelup":61}],57:[function(require,module,exports){
'use strict'

module.exports = function supports (...manifests) {
  const manifest = manifests.reduce((acc, m) => Object.assign(acc, m), {})

  return Object.assign(manifest, {
    // Features of abstract-leveldown
    bufferKeys: manifest.bufferKeys || false,
    snapshots: manifest.snapshots || false,
    permanence: manifest.permanence || false,
    seek: manifest.seek || false,
    clear: manifest.clear || false,

    // Features of abstract-leveldown that levelup doesn't have
    status: manifest.status || false,

    // Features of disk-based implementations
    createIfMissing: manifest.createIfMissing || false,
    errorIfExists: manifest.errorIfExists || false,

    // Features of level(up) that abstract-leveldown doesn't have yet
    deferredOpen: manifest.deferredOpen || false,
    openCallback: manifest.openCallback || false,
    promises: manifest.promises || false,
    streams: manifest.streams || false,
    encodings: manifest.encodings || false,

    // Methods that are not part of abstract-leveldown or levelup
    additionalMethods: Object.assign({}, manifest.additionalMethods)
  })
}

},{}],58:[function(require,module,exports){
module.exports = require('level-packager')(require('level-js'))

},{"level-js":49,"level-packager":56}],59:[function(require,module,exports){
'use strict'

const WriteError = require('level-errors').WriteError
const catering = require('catering')
const getCallback = require('./common').getCallback
const getOptions = require('./common').getOptions

function Batch (levelup) {
  this.db = levelup
  this.batch = levelup.db.batch()
  this.ops = []
  this.length = 0
}

Batch.prototype.put = function (key, value, options) {
  try {
    this.batch.put(key, value, options)
  } catch (e) {
    throw new WriteError(e)
  }

  this.ops.push({ ...options, type: 'put', key, value })
  this.length++

  return this
}

Batch.prototype.del = function (key, options) {
  try {
    this.batch.del(key, options)
  } catch (err) {
    throw new WriteError(err)
  }

  this.ops.push({ ...options, type: 'del', key })
  this.length++

  return this
}

Batch.prototype.clear = function () {
  try {
    this.batch.clear()
  } catch (err) {
    throw new WriteError(err)
  }

  this.ops = []
  this.length = 0

  return this
}

Batch.prototype.write = function (options, callback) {
  const levelup = this.db
  const ops = this.ops

  callback = getCallback(options, callback)
  callback = catering.fromCallback(callback)
  options = getOptions(options)

  try {
    this.batch.write(options, function (err) {
      if (err) { return callback(new WriteError(err)) }
      levelup.emit('batch', ops)
      callback()
    })
  } catch (err) {
    throw new WriteError(err)
  }

  return callback.promise
}

module.exports = Batch

},{"./common":60,"catering":37,"level-errors":47}],60:[function(require,module,exports){
'use strict'

exports.getCallback = function (options, callback) {
  return typeof options === 'function' ? options : callback
}

exports.getOptions = function (options) {
  return typeof options === 'object' && options !== null ? options : {}
}

},{}],61:[function(require,module,exports){
'use strict'

const EventEmitter = require('events').EventEmitter
const inherits = require('util').inherits
const DeferredLevelDOWN = require('deferred-leveldown')
const IteratorStream = require('level-iterator-stream')
const Batch = require('./batch')
const errors = require('level-errors')
const supports = require('level-supports')
const assert = require('assert')
const catering = require('catering')
const getCallback = require('./common').getCallback
const getOptions = require('./common').getOptions

// TODO: after we drop node 10, also use queueMicrotask() in node
const nextTick = require('./next-tick')

const WriteError = errors.WriteError
const ReadError = errors.ReadError
const NotFoundError = errors.NotFoundError
const OpenError = errors.OpenError
const InitializationError = errors.InitializationError

// Possible AbstractLevelDOWN#status values:
//  - 'new'     - newly created, not opened or closed
//  - 'opening' - waiting for the database to be opened, post open()
//  - 'open'    - successfully opened the database, available for use
//  - 'closing' - waiting for the database to be closed, post close()
//  - 'closed'  - database has been successfully closed, should not be
//                 used except for another open() operation

function LevelUP (db, options, callback) {
  if (!(this instanceof LevelUP)) {
    return new LevelUP(db, options, callback)
  }

  let error

  EventEmitter.call(this)
  this.setMaxListeners(Infinity)

  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = options || {}

  if (!db || typeof db !== 'object') {
    error = new InitializationError('First argument must be an abstract-leveldown compliant store')
    if (typeof callback === 'function') {
      return nextTick(callback, error)
    }
    throw error
  }

  assert.strictEqual(typeof db.status, 'string', '.status required, old abstract-leveldown')

  this.options = getOptions(options)
  this._db = db
  this.db = new DeferredLevelDOWN(db)
  this.open(callback || ((err) => {
    if (err) this.emit('error', err)
  }))

  // Create manifest based on deferred-leveldown's
  this.supports = supports(this.db.supports, {
    status: false,
    deferredOpen: true,
    openCallback: true,
    promises: true,
    streams: true
  })

  // Experimental: enrich levelup interface
  for (const method of Object.keys(this.supports.additionalMethods)) {
    if (this[method] != null) continue

    // Don't do this.db[method].bind() because this.db is dynamic.
    this[method] = function (...args) {
      return this.db[method](...args)
    }
  }
}

LevelUP.prototype.emit = EventEmitter.prototype.emit
LevelUP.prototype.once = EventEmitter.prototype.once
inherits(LevelUP, EventEmitter)

LevelUP.prototype.open = function (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = null
  }

  callback = catering.fromCallback(callback)

  if (!opts) {
    opts = this.options
  }

  if (this.isOpen()) {
    nextTick(callback, null, this)
    return callback.promise
  }

  if (this._isOpening()) {
    this.once('open', () => { callback(null, this) })
    return callback.promise
  }

  this.emit('opening')

  this.db.open(opts, (err) => {
    if (err) {
      return callback(new OpenError(err))
    }
    this.db = this._db
    callback(null, this)
    this.emit('open')
    this.emit('ready')
  })

  return callback.promise
}

LevelUP.prototype.close = function (callback) {
  callback = catering.fromCallback(callback)

  if (this.isOpen()) {
    this.db.close((err, ...rest) => {
      this.emit('closed')
      callback(err, ...rest)
    })
    this.emit('closing')
    this.db = new DeferredLevelDOWN(this._db)
  } else if (this.isClosed()) {
    nextTick(callback)
  } else if (this.db.status === 'closing') {
    this.once('closed', callback)
  } else if (this._isOpening()) {
    this.once('open', () => {
      this.close(callback)
    })
  }

  return callback.promise
}

LevelUP.prototype.isOpen = function () {
  return this.db.status === 'open'
}

LevelUP.prototype._isOpening = function () {
  return this.db.status === 'opening'
}

LevelUP.prototype.isClosed = function () {
  return (/^clos|new/).test(this.db.status)
}

LevelUP.prototype.get = function (key, options, callback) {
  callback = getCallback(options, callback)
  callback = catering.fromCallback(callback)

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options)

  this.db.get(key, options, function (err, value) {
    if (err) {
      if ((/notfound/i).test(err) || err.notFound) {
        err = new NotFoundError('Key not found in database [' + key + ']', err)
      } else {
        err = new ReadError(err)
      }
      return callback(err)
    }
    callback(null, value)
  })

  return callback.promise
}

LevelUP.prototype.put = function (key, value, options, callback) {
  callback = getCallback(options, callback)
  callback = catering.fromCallback(callback)

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options)

  this.db.put(key, value, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('put', key, value)
    callback()
  })

  return callback.promise
}

LevelUP.prototype.del = function (key, options, callback) {
  callback = getCallback(options, callback)
  callback = catering.fromCallback(callback)

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options)

  this.db.del(key, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('del', key)
    callback()
  })

  return callback.promise
}

LevelUP.prototype.batch = function (arr, options, callback) {
  if (!arguments.length) {
    return new Batch(this)
  }

  if (typeof arr === 'function') callback = arr
  else callback = getCallback(options, callback)

  callback = catering.fromCallback(callback)

  if (maybeError(this, callback)) {
    return callback.promise
  }

  options = getOptions(options)

  this.db.batch(arr, options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('batch', arr)
    callback()
  })

  return callback.promise
}

LevelUP.prototype.iterator = function (options) {
  return this.db.iterator(options)
}

LevelUP.prototype.clear = function (options, callback) {
  callback = getCallback(options, callback)
  options = getOptions(options)
  callback = catering.fromCallback(callback)

  if (maybeError(this, callback)) {
    return callback.promise
  }

  this.db.clear(options, (err) => {
    if (err) {
      return callback(new WriteError(err))
    }
    this.emit('clear', options)
    callback()
  })

  return callback.promise
}

LevelUP.prototype.readStream =
LevelUP.prototype.createReadStream = function (options) {
  options = Object.assign({ keys: true, values: true }, options)
  if (typeof options.limit !== 'number') { options.limit = -1 }
  return new IteratorStream(this.db.iterator(options), options)
}

LevelUP.prototype.keyStream =
LevelUP.prototype.createKeyStream = function (options) {
  return this.createReadStream(Object.assign({}, options, { keys: true, values: false }))
}

LevelUP.prototype.valueStream =
LevelUP.prototype.createValueStream = function (options) {
  return this.createReadStream(Object.assign({}, options, { keys: false, values: true }))
}

LevelUP.prototype.toString = function () {
  return 'LevelUP'
}

LevelUP.prototype.type = 'levelup'

function maybeError (db, callback) {
  if (!db._isOpening() && !db.isOpen()) {
    nextTick(callback, new ReadError('Database is not open'))
    return true
  }
}

LevelUP.errors = errors
module.exports = LevelUP

},{"./batch":59,"./common":60,"./next-tick":62,"assert":101,"catering":37,"deferred-leveldown":39,"events":112,"level-errors":47,"level-iterator-stream":48,"level-supports":57,"util":130}],62:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36,"queue-microtask":66}],63:[function(require,module,exports){
(function (Buffer){(function (){

exports.compare = function (a, b) {

  if(Buffer.isBuffer(a)) {
    var l = Math.min(a.length, b.length)
    for(var i = 0; i < l; i++) {
      var cmp = a[i] - b[i]
      if(cmp) return cmp
    }
    return a.length - b.length
  }

  return a < b ? -1 : a > b ? 1 : 0
}

// to be compatible with the current abstract-leveldown tests
// nullish or empty strings.
// I could use !!val but I want to permit numbers and booleans,
// if possible.

function isDef (val) {
  return val !== undefined && val !== ''
}

function has (range, name) {
  return Object.hasOwnProperty.call(range, name)
}

function hasKey(range, name) {
  return Object.hasOwnProperty.call(range, name) && name
}

var lowerBoundKey = exports.lowerBoundKey = function (range) {
    return (
       hasKey(range, 'gt')
    || hasKey(range, 'gte')
    || hasKey(range, 'min')
    || (range.reverse ? hasKey(range, 'end') : hasKey(range, 'start'))
    || undefined
    )
}

var lowerBound = exports.lowerBound = function (range, def) {
  var k = lowerBoundKey(range)
  return k ? range[k] : def
}

var lowerBoundInclusive = exports.lowerBoundInclusive = function (range) {
  return has(range, 'gt') ? false : true
}

var upperBoundInclusive = exports.upperBoundInclusive =
  function (range) {
    return (has(range, 'lt') /*&& !range.maxEx*/) ? false : true
  }

var lowerBoundExclusive = exports.lowerBoundExclusive =
  function (range) {
    return !lowerBoundInclusive(range)
  }

var upperBoundExclusive = exports.upperBoundExclusive =
  function (range) {
    return !upperBoundInclusive(range)
  }

var upperBoundKey = exports.upperBoundKey = function (range) {
    return (
       hasKey(range, 'lt')
    || hasKey(range, 'lte')
    || hasKey(range, 'max')
    || (range.reverse ? hasKey(range, 'start') : hasKey(range, 'end'))
    || undefined
    )
}

var upperBound = exports.upperBound = function (range, def) {
  var k = upperBoundKey(range)
  return k ? range[k] : def
}

exports.start = function (range, def) {
  return range.reverse ? upperBound(range, def) : lowerBound(range, def)
}
exports.end = function (range, def) {
  return range.reverse ? lowerBound(range, def) : upperBound(range, def)
}
exports.startInclusive = function (range) {
  return (
    range.reverse
  ? upperBoundInclusive(range)
  : lowerBoundInclusive(range)
  )
}
exports.endInclusive = function (range) {
  return (
    range.reverse
  ? lowerBoundInclusive(range)
  : upperBoundInclusive(range)
  )
}

function id (e) { return e }

exports.toLtgt = function (range, _range, map, lower, upper) {
  _range = _range || {}
  map = map || id
  var defaults = arguments.length > 3
  var lb = exports.lowerBoundKey(range)
  var ub = exports.upperBoundKey(range)
  if(lb) {
    if(lb === 'gt') _range.gt = map(range.gt, false)
    else            _range.gte = map(range[lb], false)
  }
  else if(defaults)
    _range.gte = map(lower, false)

  if(ub) {
    if(ub === 'lt') _range.lt = map(range.lt, true)
    else            _range.lte = map(range[ub], true)
  }
  else if(defaults)
    _range.lte = map(upper, true)

  if(range.reverse != null)
    _range.reverse = !!range.reverse

  //if range was used mutably
  //(in level-sublevel it's part of an options object
  //that has more properties on it.)
  if(has(_range, 'max'))   delete _range.max
  if(has(_range, 'min'))   delete _range.min
  if(has(_range, 'start')) delete _range.start
  if(has(_range, 'end'))   delete _range.end

  return _range
}

exports.contains = function (range, key, compare) {
  compare = compare || exports.compare

  var lb = lowerBound(range)
  if(isDef(lb)) {
    var cmp = compare(key, lb)
    if(cmp < 0 || (cmp === 0 && lowerBoundExclusive(range)))
      return false
  }

  var ub = upperBound(range)
  if(isDef(ub)) {
    var cmp = compare(key, ub)
    if(cmp > 0 || (cmp === 0) && upperBoundExclusive(range))
      return false
  }

  return true
}

exports.filter = function (range, compare) {
  return function (key) {
    return exports.contains(range, key, compare)
  }
}



}).call(this)}).call(this,{"isBuffer":require("../../../../node_modules/allexsdk/node_modules/is-buffer/index.js")})
},{"../../../../node_modules/allexsdk/node_modules/is-buffer/index.js":123}],64:[function(require,module,exports){
(function (Buffer){(function (){
//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/**
 * Support for handling 64-bit int numbers in Javascript (node.js)
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
 * objects operate directly on the buffer which means that if they are created
 * using an existing buffer then setting the value will modify the Buffer, and
 * vice-versa.
 *
 * Internal Representation
 *
 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
 * at buffer[0], the least-significant at buffer[7].  For the purposes of
 * converting to/from JS native numbers, the value is assumed to be a signed
 * integer stored in 2's complement form.
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 */

// Useful masks and values for bit twiddling
var MASK31 =  0x7fffffff, VAL31 = 0x80000000;
var MASK32 =  0xffffffff, VAL32 = 0x100000000;

// Map for converting hex octets to strings
var _HEX = [];
for (var i = 0; i < 256; i++) {
  _HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
}

//
// Int64
//

/**
 * Constructor accepts any of the following argument types:
 *
 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
 * new Int64(string)             - Hex string (throws if n is outside int64 range)
 * new Int64(number)             - Number (throws if n is outside int64 range)
 * new Int64(hi, lo)             - Raw bits as two 32-bit values
 */
var Int64 = module.exports = function(a1, a2) {
  if (a1 instanceof Buffer) {
    this.buffer = a1;
    this.offset = a2 || 0;
  } else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
    // Under Browserify, Buffers can extend Uint8Arrays rather than an
    // instance of Buffer. We could assume the passed in Uint8Array is actually
    // a buffer but that won't handle the case where a raw Uint8Array is passed
    // in. We construct a new Buffer just in case.
    this.buffer = new Buffer(a1);
    this.offset = a2 || 0;
  } else {
    this.buffer = this.buffer || new Buffer(8);
    this.offset = 0;
    this.setValue.apply(this, arguments);
  }
};


// Max integer value that JS can accurately represent
Int64.MAX_INT = Math.pow(2, 53);

// Min integer value that JS can accurately represent
Int64.MIN_INT = -Math.pow(2, 53);

Int64.prototype = {

  constructor: Int64,

  /**
   * Do in-place 2's compliment.  See
   * http://en.wikipedia.org/wiki/Two's_complement
   */
  _2scomp: function() {
    var b = this.buffer, o = this.offset, carry = 1;
    for (var i = o + 7; i >= o; i--) {
      var v = (b[i] ^ 0xff) + carry;
      b[i] = v & 0xff;
      carry = v >> 8;
    }
  },

  /**
   * Set the value. Takes any of the following arguments:
   *
   * setValue(string) - A hexidecimal string
   * setValue(number) - Number (throws if n is outside int64 range)
   * setValue(hi, lo) - Raw bits as two 32-bit values
   */
  setValue: function(hi, lo) {
    var negate = false;
    if (arguments.length == 1) {
      if (typeof(hi) == 'number') {
        // Simplify bitfield retrieval by using abs() value.  We restore sign
        // later
        negate = hi < 0;
        hi = Math.abs(hi);
        lo = hi % VAL32;
        hi = hi / VAL32;
        if (hi > VAL32) throw new RangeError(hi  + ' is outside Int64 range');
        hi = hi | 0;
      } else if (typeof(hi) == 'string') {
        hi = (hi + '').replace(/^0x/, '');
        lo = hi.substr(-8);
        hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
        hi = parseInt(hi, 16);
        lo = parseInt(lo, 16);
      } else {
        throw new Error(hi + ' must be a Number or String');
      }
    }

    // Technically we should throw if hi or lo is outside int32 range here, but
    // it's not worth the effort. Anything past the 32'nd bit is ignored.

    // Copy bytes to buffer
    var b = this.buffer, o = this.offset;
    for (var i = 7; i >= 0; i--) {
      b[o+i] = lo & 0xff;
      lo = i == 4 ? hi : lo >>> 8;
    }

    // Restore sign of passed argument
    if (negate) this._2scomp();
  },

  /**
   * Convert to a native JS number.
   *
   * WARNING: Do not expect this value to be accurate to integer precision for
   * large (positive or negative) numbers!
   *
   * @param allowImprecise If true, no check is performed to verify the
   * returned value is accurate to integer precision.  If false, imprecise
   * numbers (very large positive or negative numbers) will be forced to +/-
   * Infinity.
   */
  toNumber: function(allowImprecise) {
    var b = this.buffer, o = this.offset;

    // Running sum of octets, doing a 2's complement
    var negate = b[o] & 0x80, x = 0, carry = 1;
    for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
      var v = b[o+i];

      // 2's complement for negative numbers
      if (negate) {
        v = (v ^ 0xff) + carry;
        carry = v >> 8;
        v = v & 0xff;
      }

      x += v * m;
    }

    // Return Infinity if we've lost integer precision
    if (!allowImprecise && x >= Int64.MAX_INT) {
      return negate ? -Infinity : Infinity;
    }

    return negate ? -x : x;
  },

  /**
   * Convert to a JS Number. Returns +/-Infinity for values that can't be
   * represented to integer precision.
   */
  valueOf: function() {
    return this.toNumber(false);
  },

  /**
   * Return string value
   *
   * @param radix Just like Number#toString()'s radix
   */
  toString: function(radix) {
    return this.valueOf().toString(radix || 10);
  },

  /**
   * Return a string showing the buffer octets, with MSB on the left.
   *
   * @param sep separator string. default is '' (empty string)
   */
  toOctetString: function(sep) {
    var out = new Array(8);
    var b = this.buffer, o = this.offset;
    for (var i = 0; i < 8; i++) {
      out[i] = _HEX[b[o+i]];
    }
    return out.join(sep || '');
  },

  /**
   * Returns the int64's 8 bytes in a buffer.
   *
   * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
   *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
   */
  toBuffer: function(rawBuffer) {
    if (rawBuffer && this.offset === 0) return this.buffer;

    var out = new Buffer(8);
    this.buffer.copy(out, 0, this.offset, this.offset + 8);
    return out;
  },

  /**
   * Copy 8 bytes of int64 into target buffer at target offset.
   *
   * @param {Buffer} targetBuffer       Buffer to copy into.
   * @param {number} [targetOffset=0]   Offset into target buffer.
   */
  copy: function(targetBuffer, targetOffset) {
    this.buffer.copy(targetBuffer, targetOffset || 0, this.offset, this.offset + 8);
  },

  /**
   * Returns a number indicating whether this comes before or after or is the
   * same as the other in sort order.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  compare: function(other) {

    // If sign bits differ ...
    if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
      return other.buffer[other.offset] - this.buffer[this.offset];
    }

    // otherwise, compare bytes lexicographically
    for (var i = 0; i < 8; i++) {
      if (this.buffer[this.offset+i] !== other.buffer[other.offset+i]) {
        return this.buffer[this.offset+i] - other.buffer[other.offset+i];
      }
    }
    return 0;
  },

  /**
   * Returns a boolean indicating if this integer is equal to other.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  equals: function(other) {
    return this.compare(other) === 0;
  },

  /**
   * Pretty output in console.log
   */
  inspect: function() {
    return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
  }
};

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":108}],65:[function(require,module,exports){
/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('prr', this, function() {

  var setProperty = typeof Object.defineProperty == 'function'
      ? function (obj, key, options) {
          Object.defineProperty(obj, key, options)
          return obj
        }
      : function (obj, key, options) { // < es5
          obj[key] = options.value
          return obj
        }

    , makeOptions = function (value, options) {
        var oo = typeof options == 'object'
          , os = !oo && typeof options == 'string'
          , op = function (p) {
              return oo
                ? !!options[p]
                : os
                  ? options.indexOf(p[0]) > -1
                  : false
            }

        return {
            enumerable   : op('enumerable')
          , configurable : op('configurable')
          , writable     : op('writable')
          , value        : value
        }
      }

    , prr = function (obj, key, value, options) {
        var k

        options = makeOptions(value, options)

        if (typeof key == 'object') {
          for (k in key) {
            if (Object.hasOwnProperty.call(key, k)) {
              options.value = key[k]
              setProperty(obj, k, options)
            }
          }
          return obj
        }

        return setProperty(obj, key, options)
      }

  return prr
})
},{}],66:[function(require,module,exports){
(function (global){(function (){
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],67:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],68:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":70,"./_stream_writable":72,"_process":127,"inherits":43}],69:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":71,"inherits":43}],70:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":67,"./_stream_duplex":68,"./internal/streams/async_iterator":73,"./internal/streams/buffer_list":74,"./internal/streams/destroy":75,"./internal/streams/from":77,"./internal/streams/state":79,"./internal/streams/stream":80,"_process":127,"buffer":108,"events":112,"inherits":43,"string_decoder/":83,"util":107}],71:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":67,"./_stream_duplex":68,"inherits":43}],72:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":67,"./_stream_duplex":68,"./internal/streams/destroy":75,"./internal/streams/state":79,"./internal/streams/stream":80,"_process":127,"buffer":108,"inherits":43,"util-deprecate":84}],73:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":76,"_process":127}],74:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":108,"util":107}],75:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":127}],76:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":67}],77:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],78:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":67,"./end-of-stream":76}],79:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":67}],80:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":112}],81:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');
exports.finished = require('./lib/internal/streams/end-of-stream.js');
exports.pipeline = require('./lib/internal/streams/pipeline.js');

},{"./lib/_stream_duplex.js":68,"./lib/_stream_passthrough.js":69,"./lib/_stream_readable.js":70,"./lib/_stream_transform.js":71,"./lib/_stream_writable.js":72,"./lib/internal/streams/end-of-stream.js":76,"./lib/internal/streams/pipeline.js":78}],82:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":108}],83:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":82}],84:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],85:[function(require,module,exports){
function createNumChecker(execlib) {
  'use strict';
  var lib = execlib.lib;

  return function numChecker(num) {
    var ret;
    if (lib.isNumber(num)) {
      ret = num;
    }
    if (lib.isString(num)) {
      ret = parseInt(num.replace(/^[0]*/,'','g'));
    }
    if (isNaN(num)) {
      throw new lib.Error('NOT_A_NUMBER', num);
    }
    if (!lib.isNumber(ret)) {
      throw new lib.Error('NOT_A_NUMBER', num);
    }
    return ret;
  }
}

module.exports = createNumChecker;

},{}],86:[function(require,module,exports){
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

},{}],87:[function(require,module,exports){
function createQueryLib (execlib, datafilterslib) {
  'use strict';

  var Query = require('./creator')(execlib, datafilterslib);

  require('./querytaskcreator')(execlib);

  return {
    Query: Query,
    SessionMixin: require('./sessionmixincreator')(execlib, Query)
  };
}

module.exports = createQueryLib;

},{"./creator":86,"./querytaskcreator":88,"./sessionmixincreator":89}],88:[function(require,module,exports){
function createQueryLDBTask (execlib) {
  'use strict';

  var lib = execlib.lib,
    execSuite = execlib.execSuite,
    taskRegistry = execSuite.taskRegistry,
    SinkTask = execSuite.SinkTask;

  function QueryLevelDBTask (prophash) {
    SinkTask.call(this, prophash);
    this.sink = prophash.sink;
    this.queryMethodName = prophash.queryMethodName || 'query';
    this.id = null;
    this.filter = prophash.filter;
    this.scanInitially = prophash.scanInitially;
    this.onPut = prophash.onPut;
    this.onDel = prophash.onDel;
    this.onInit = prophash.onInit;
    this.running = null;
  }
  lib.inherit(QueryLevelDBTask, SinkTask);
  QueryLevelDBTask.prototype.__cleanUp = function () {
    this.running = null;
    this.onInit = null;
    this.onDel = null;
    this.onPut = null;
    this.scanInitially = null;
    this.filter = null;
    if (this.sink && this.sink.destroyed && this.id) {
      this.sink.sessionCall('stopQuery', this.id);
    }
    this.id = null;
    this.sink = null;
  };
  QueryLevelDBTask.prototype.go = function () {
    if (this.running) {
      return;
    }
    if (!this.sink) {
      return;
    }
    this.running = this.sink.sessionCall(this.queryMethodName, this.filter, this.scanInitially);
    this.running.then(
      this.destroy.bind(this),
      this.destroy.bind(this),
      this.onNotification.bind(this)
    );
  };
  QueryLevelDBTask.prototype.onNotification = function (kva) {
    var key, value, spec;
    if (!lib.isArray(kva)) {
      return;
    }
    key = kva[0], value = kva[1];
    if (kva.length === 3) {
      spec = kva[2];
      if (!this.id) {
        this.id = spec;
      } else {
        if (this.onInit) {
          this.onInit(spec);
        }
      }
      return;
    }
    if (lib.isVal(value)) {
      if (this.onPut) {
        this.onPut(kva);
      }
    } else {
      if (this.onDel) {
        this.onDel(key);
      }
    }
  };

  QueryLevelDBTask.prototype.compulsoryConstructionProperties = ['sink', 'scanInitially', 'onPut', 'onDel'];

  taskRegistry.register('allex_leveldblib', [{name: 'queryLevelDB', klass: QueryLevelDBTask}]);
}

module.exports = createQueryLDBTask;


},{}],89:[function(require,module,exports){
function createSessionMixin (execlib, Query) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function resolver(defer) {
    defer.resolve(true);
  }

  function startnotifier(defer, recordcount) {
    defer.notify([null, null, recordcount]);
    defer = null;
  }

  function QuerableUserSessionMixin () {
    this.queries = new lib.Map();
  }
  QuerableUserSessionMixin.prototype.destroy = function () {
    if (this.queries) {
      this.queries.traverse(resolver);
      this.queries.destroy();
    }
    this.queries = null;
  };
  QuerableUserSessionMixin.prototype.stopQuery = function (deferid, defer) {
    var qd;
    if (!this.queries) {
      defer.resolve(true);
      return;
    }
    qd = this.queries.remove(deferid);
    if (qd) {
      qd.resolve(true);
    }
    defer.resolve(true);
  };
  QuerableUserSessionMixin.prototype.onQueryDeferDone = function (deferid) {
    if (this.queries) {
      this.queries.remove(deferid);
    }
  };
  function onDB (qu, methodname, filterdesc, scaninitially, defer, db) {
    var starteddefer, deferid, oqdr;
    if (!db) {
      defer.reject(new lib.Error('NO_LEVELDB'));
      return;
    }
    if (!qu.queries) {
      defer.reject(new lib.Error('QUERY_DESTROYED'));
      return;
    }
    if (scaninitially) {
      starteddefer = q.defer();
      starteddefer.promise.then(startnotifier.bind(null, defer));
    }
    deferid = lib.uid();
    qu.queries.add(deferid, defer);
    oqdr = qu.onQueryDeferDone.bind(qu, deferid);
    defer.promise.then(
      oqdr,
      oqdr
    );
    defer.notify([null, null, deferid]);
    if (!scaninitially) {
      startnotifier(defer, 0);
    }
    db[methodname](filterdesc, defer, starteddefer);
  }
  QuerableUserSessionMixin.queryMethodGenerator = function (servicetodbcb, methodname) {
    if (!lib.isFunction(servicetodbcb)) {
      throw new Error('cannot invoke queryMethodGenerator with no servicetodbcb function for methodname '+methodname);
    }
    return function (filterdesc, scaninitially, defer) {
      var db;
      if (!(this.user && this.user.__service && this.user.__service.aboutToDie)) {
        defer.reject(new lib.Error('SERVICE_DEAD'));
      }
      db = servicetodbcb(this.user.__service);
      if (db.then) {
        db.then(
          onDB.bind(null, this, methodname, filterdesc, scaninitially, defer),
          defer.reject.bind(defer)
        );
      } else {
        onDB(this, methodname, filterdesc, scaninitially, defer, db);
      }
    };
  };

  QuerableUserSessionMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, QuerableUserSessionMixin,
      'stopQuery',
      'onQueryDeferDone'
    );
  };

  QuerableUserSessionMixin.queryMethodParamDescriptor = [{
    title: 'Filter Descriptor',
    type: 'object'
  },{
    title: 'Scan initially',
    type: 'boolean'
  }];

  QuerableUserSessionMixin.stopQueryMethodDescriptor = {
    stopQuery: [{
      title: 'Defer ID',
      type: 'string'
    }]
  };

  return QuerableUserSessionMixin;

}

module.exports = createSessionMixin;

},{}],90:[function(require,module,exports){
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


},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
module.exports = [{
  title: 'Streaming Defer Id',
  type: 'string',
  strongtype: 'String'
}];

},{}],93:[function(require,module,exports){
function createServicePackMixin(execlib, datafilterslib) {
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    JobBase = qlib.JobBase;

  function StreamingDefer(defer) {
    JobBase.call(this, defer);
    this.id = lib.uid();
    this.stream = null;
  }
  lib.inherit(StreamingDefer, JobBase);
  StreamingDefer.prototype.destroy = function () {
    this.id = null;
    this.stream = null;
    JobBase.prototype.destroy.call(this);
  };
  StreamingDefer.prototype.setStream = function (stream) {
    this.stream = stream;
  };

  var resumeLevelDBStreamDescriptor = require('./resumeleveldbstreamdescriptor');
  function UserLevelDBMixin() {
    this.__streamingDefers = new lib.Map();
  }

  function rejecter(defer) {
    defer.reject(new lib.Error('USER_UNDER_DESTRUCTION'));
  }
  UserLevelDBMixin.prototype.__cleanUp = function () {
    if (this.__streamingDefers) {
      this.__streamingDefers.traverse(rejecter);
      this.__streamingDefers.destroy();
    }
    this.__streamingDefers = null;
  };

  function notifier(countobj, streamingdefer, options, item, stream) {
    streamingdefer.setStream(stream);
    countobj.count ++;
    streamingdefer.notify(item);
    if (options && options.pagesize && (countobj.count % options.pagesize === 0)) {
      stream.pause();
      streamingdefer.notify({pagebreak: streamingdefer.id});
    }
  }

  UserLevelDBMixin.prototype.streamLevelDB = function (db, options, defer) {
    var remover, streamingdefer, streamingobj, sds;
    if (options && options.pagesize) {
      streamingdefer = new StreamingDefer(defer);
      sds = this.__streamingDefers; 
      streamingobj = {count: 0};
      remover = function () {
        sds.remove(streamingdefer.id);
        streamingdefer.resolve(streamingobj);
        streamingdefer = null;
        streamingobj = null;
        options = null;
        sds = null;
        remover = null;
      };
      this.__streamingDefers.add(streamingdefer.id, streamingdefer);
      db.traverse(notifier.bind(null, streamingobj, streamingdefer, options),options).then(
        remover,
        remover
      );
    } else {
      return db.streamInto(defer, options);
    }
  };

  UserLevelDBMixin.prototype.resumeLevelDBStream = function (streamingdeferid, defer) {
    var streamingdefer = this.__streamingDefers.get(streamingdeferid);
    if (!streamingdefer) {
      defer.reject(new lib.Error('NO_STREAMING_DEFER', streamingdeferid));
      streamingdeferid = null;
      defer = null;
      return;
    }
    defer.resolve(true);
    streamingdefer.stream.resume();
    streamingdeferid = null;
    defer = null;
  };


  UserLevelDBMixin.addMethods = function (userklass) {
    userklass.prototype.streamLevelDB = UserLevelDBMixin.prototype.streamLevelDB;
    userklass.prototype.resumeLevelDBStream = UserLevelDBMixin.prototype.resumeLevelDBStream;
    userklass.prototype.__methodDescriptors.resumeLevelDBStream = resumeLevelDBStreamDescriptor;
  }

  return UserLevelDBMixin;
}

module.exports = createServicePackMixin;

},{"./resumeleveldbstreamdescriptor":92}],94:[function(require,module,exports){
function createShift2Pusher(execlib, leveldblib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    QueueableMixin = leveldblib.QueueableMixin,
    DBArray = leveldblib.DBArray,
    consume = QueueableMixin.consume;

  function Shift2Pusher(prophash){
    QueueableMixin.call(this);
    var sd = q.defer(), pd = q.defer();
    q.all([sd.promise, pd.promise]).then(
      this.created.bind(this, prophash),
      this.destroy.bind(this)
    ); 
    prophash.shifter.starteddefer = sd;
    prophash.pusher.starteddefer = pd;
    this.shifter = new DBArray(prophash.shifter);
    this.pusher = new DBArray(prophash.pusher);
  }
  QueueableMixin.inheritMethods(Shift2Pusher);
  Shift2Pusher.prototype.destroy = function () {
    if (this.shifter) {
      this.shifter.destroy();
    }
    this.shifter = null;
    if (this.pusher) {
      this.pusher.destroy();
    }
    this.pusher.destroy();
  };
  Shift2Pusher.prototype.created = function (prophash) {
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(this);
    }
    prophash = null;
  };
  Shift2Pusher.prototype.move = function (howmany, defer) {
    var shiftd = q.defer();
    shiftd.promise.done(
      this.afterShiftMany.bind(this,howmany, defer)
    );
    this.shifter.shiftMany(howmany, shiftd);
  };
  Shift2Pusher.prototype.afterShiftMany = function (howmany, defer, shiftresult) {
    shiftresult.finalizer().done(
      this.doPush.bind(this, howmany, defer, shiftresult),
      defer.reject.bind(defer)
    );
  };
  Shift2Pusher.prototype.doPush = function (howmany, defer, shiftresult) {
    /*
    var items = [];
    this.shifter.readInto(items).done(
      console.log.bind(console, 'after shift', items)
    );
    return;
    */
    var d = q.defer(), shifted = shiftresult.items;
    //console.log(shifted);
    d.promise.done(
      //defer.resolve.bind(defer, shifted.length),
      this.finalizeMove.bind(this, defer, shifted.length),
      defer.reject.bind(defer)
    );
    //consume(shifted, this.convert.bind(this));
    this.pusher.pushMany(shifted, d);
    howmany = null;
    defer = null;
    shiftresult = null;
  };
  Shift2Pusher.prototype.finalizeMove = function (defer, len, pushfinalizer) {
    pushfinalizer().done(
      defer.resolve.bind(defer, len),
      defer.reject.bind(defer)
    );
    defer = null;
    len = null;
    pushfinalizer = null;
  };
  Shift2Pusher.prototype.convert = function (shifteditem) {
    return shifteditem;
  };

  return Shift2Pusher;
}

module.exports = createShift2Pusher;

},{}],95:[function(require,module,exports){
function createStreamInSink(execlib) {
  var q = execlib.lib.q,
    qlib = execlib.lib.qlib;

  function notificator(sink, defer, itemer, pager, item) {
    if (item.pagebreak) {
      var d = q.defer();
      d.promise.then(sink.call.bind(sink, 'resumeLevelDBStream', item.pagebreak));
      pager(d);
      return;
    }
    itemer(item);
  }

  return function (sink, method, options, itemcb, pagecb) {
    var d = q.defer();
    var sd;
    if (execlib.lib.isArray(options)) {
      options.unshift(method);
      sd = sink.call.apply(sink, options)
    } else {
      sd = sink.call(method, options);
    } 
    sd.then(
      d.resolve.bind(d),
      d.reject.bind(d),
      notificator.bind(null, sink, d, itemcb, pagecb)
    );
    return d.promise;
  }
}

module.exports = createStreamInSink;

},{}],96:[function(require,module,exports){
function createChainedOperationsJob(execlib) {
  'use strict';

  function ChainedOperationsJob(dbswithopsarry) {
  }

  return ChainedOperationsJob;
}

module.exports = createChainedOperationsJob;

},{}],97:[function(require,module,exports){
function createFiniteLengthInsertJob(execlib, KnownLengthInsertJob) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function FiniteLengthInsertJob(db) {
    KnownLengthInsertJob.call(this, db)
    this.currentlyreceived = 0;
  }
  lib.inherit(FiniteLengthInsertJob, KnownLengthInsertJob);
  FiniteLengthInsertJob.prototype.destroy = function () {
    this.currentlyreceived = 0;
    KnownLengthInsertJob.prototype.destroy.call(this);
  };
  FiniteLengthInsertJob.prototype.put = function (key, val) {
    this.currentlyreceived ++;
    KnownLengthInsertJob.prototype.put.call(this, key, val);
  };
  FiniteLengthInsertJob.prototype.push = function (item) {
    this.currentlyreceived ++;
    KnownLengthInsertJob.prototype.push.call(this, item);
  };
  FiniteLengthInsertJob.prototype.finishInput = function () {
    this.setLength(this.currentlyreceived);
  };

  return FiniteLengthInsertJob;
}

module.exports = createFiniteLengthInsertJob;

},{}],98:[function(require,module,exports){
function createKnownLengthInsertJob(execlib, JobBase) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;
  function KnownLengthInsertJob(db) {
    JobBase.call(this);
    this.db = db;
    this.toinsert = null;
    this.inserted = 0;
  }
  lib.inherit(KnownLengthInsertJob, JobBase);
  KnownLengthInsertJob.prototype.destroy = function () {
    this.inserted = null;
    this.toinsert = null;
    this.db = null;
    JobBase.prototype.destroy.call(this);
  };
  KnownLengthInsertJob.prototype.doCheck = function () {
    if (this.inserted === this.toinsert) {
      this.resolve(this.inserted);
    }
  };
  KnownLengthInsertJob.prototype.onInsert = function () {
    this.inserted ++;
    this.doCheck();
  };
  KnownLengthInsertJob.prototype.put = function (key, val) {
    var ret = this.db.put(key.val);
    ret.then(
      this.onInsert.bind(this),
      this.reject.bind(this)
    );
    return ret;
  };
  KnownLengthInsertJob.prototype.push = function (item) {
    var ret = this.db.push(item);
    ret.then(
      this.onInsert.bind(this),
      this.reject.bind(this)
    );
    return ret;
  };
  KnownLengthInsertJob.prototype.add = function (item) {
    var ret = this.db.add(item);
    ret.then(
      this.onInsert.bind(this),
      this.reject.bind(this)
    );
    return ret;
  };
  KnownLengthInsertJob.prototype.setLength = function (length) {
    this.toinsert = length;
    this.doCheck();
  };

  return KnownLengthInsertJob;
}

module.exports = createKnownLengthInsertJob;

},{}],99:[function(require,module,exports){
module.exports = require('./libloader')(ALLEX, ALLEX.execSuite.libRegistry.get('allex_datafilterslib'), ALLEX.execSuite.libRegistry.get('allex_bufferlib'), require('./fakenodehelpers'));

},{"./fakenodehelpers":26,"./libloader":31}],100:[function(require,module,exports){

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;

},{}],101:[function(require,module,exports){
(function (global){(function (){
'use strict';

var objectAssign = require('object-assign');

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"object-assign":126,"util/":104}],102:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],103:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],104:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":103,"_process":127,"inherits":102}],105:[function(require,module,exports){
(function (global){(function (){
'use strict';

var filter = require('array-filter');

module.exports = function availableTypedArrays() {
	return filter([
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	], function (typedArray) {
		return typeof global[typedArray] === 'function';
	});
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"array-filter":100}],106:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],107:[function(require,module,exports){

},{}],108:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":106,"buffer":108,"ieee754":120}],109:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":110,"get-intrinsic":116}],110:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":115,"get-intrinsic":116}],111:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":116}],112:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],113:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],114:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],115:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":114}],116:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":115,"has":119,"has-symbols":117}],117:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":118}],118:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],119:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":115}],120:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],121:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],122:[function(require,module,exports){
'use strict';

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":109}],123:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],124:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var generatorFunc = getGeneratorFunc();
var GeneratorFunction = getProto && generatorFunc ? getProto(generatorFunc) : false;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	return getProto && getProto(fn) === GeneratorFunction;
};

},{}],125:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new global[typedArray]();
		if (!(Symbol.toStringTag in arr)) {
			throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
		}
		var proto = getPrototypeOf(arr);
		var descriptor = gOPD(proto, Symbol.toStringTag);
		if (!descriptor) {
			var superProto = getPrototypeOf(proto);
			descriptor = gOPD(superProto, Symbol.toStringTag);
		}
		toStrTags[typedArray] = descriptor.get;
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":105,"call-bind/callBound":109,"es-abstract/helpers/getOwnPropertyDescriptor":111,"foreach":113,"has-symbols":117}],126:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],127:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],128:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],129:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
isSharedArrayBufferToString.working = (
  typeof SharedArrayBuffer !== 'undefined' &&
  isSharedArrayBufferToString(new SharedArrayBuffer())
);
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBuffer === 'undefined') {
    return false;
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBuffer;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":122,"is-generator-function":124,"is-typed-array":125,"which-typed-array":131}],130:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require('./support/types');

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))
},{"./support/isBuffer":128,"./support/types":129,"_process":127,"inherits":121}],131:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('foreach');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = require('es-abstract/helpers/getOwnPropertyDescriptor');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof global[typedArray] === 'function') {
			var arr = new global[typedArray]();
			if (!(Symbol.toStringTag in arr)) {
				throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
			}
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = require('is-typed-array');

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":105,"call-bind/callBound":109,"es-abstract/helpers/getOwnPropertyDescriptor":111,"foreach":113,"has-symbols":117,"is-typed-array":125}]},{},[1]);
