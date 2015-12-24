function createServicePackMixin(execlib) {
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

  function notificator(countobj, streamingdefer, options, item, stream) {
    streamingdefer.setStream(stream);
    countobj.count ++;
    streamingdefer.notify(item);
    if (options && options.pagesize && (countobj.count % options.pagesize === 0)) {
      stream.pause();
      streamingdefer.notify({pagebreak: streamingdefer.id});
    }
  }

  UserLevelDBMixin.prototype.streamLevelDB = function (db, options, defer) {
    var remover, streamingdefer;
    if (options.pagesize) {
      streamingdefer = new StreamingDefer(defer);
      remover = qlib.executor(this.__streamingDefers.remove.bind(this.__streamingDefers, streamingdefer.id));
      this.__streamingDefers.add(streamingdefer.id, streamingdefer);
      streamingdefer.defer.promise.then(
        remover,
        remover
      );
      db.traverse(notificator.bind(null, {count: 0}, streamingdefer, options));
    } else {
      return db.streamInto(defer, options);
    }
  };

  UserLevelDBMixin.prototype.resumeLevelDBStream = function (streamingdeferid, defer) {
    var streamingdefer = this.__streamingDefers.get(streamingdeferid);
    if (!streamingdefer) {
      defer.reject(new lib.Error('NO_STREAMING_DEFER', streamingdeferid));
      return;
    }
    defer.resolve(true);
    streamingdefer.stream.resume();
  };


  UserLevelDBMixin.addMethods = function (userklass) {
    userklass.prototype.streamLevelDB = UserLevelDBMixin.prototype.streamLevelDB;
    userklass.prototype.resumeLevelDBStream = UserLevelDBMixin.prototype.resumeLevelDBStream;
    userklass.prototype.__methodDescriptors.resumeLevelDBStream = resumeLevelDBStreamDescriptor;
  }

  return UserLevelDBMixin;
}

module.exports = createServicePackMixin;
