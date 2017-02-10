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

