function createKnownLengthInsertJob(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;
  function KnownLengthInsertJob(db) {
    this.db = db;
    this.toinsert = null;
    this.inserted = 0;
    this.defer = q.defer();
    this.result = null;
    this.error = null;
  }
  KnownLengthInsertJob.prototype.destroy = function () {
    if (this.defer) {
      if (this.error) {
        this.defer.reject(this.error);
      } else {
        this.defer.resolve(this.result);
      }
    }
    this.error = null;
    this.result = null;
    this.defer = null;
    this.inserted = null;
    this.toinsert = null;
    this.db = null;
  };
  KnownLengthInsertJob.prototype.resolve = function (result) {
    this.result = result;
    this.destroy();
  };
  KnownLengthInsertJob.prototype.reject = function (error) {
    this.error = error;
    this.destroy();
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
  KnownLengthInsertJob.prototype.setLength = function (length) {
    this.toinsert = length;
    this.doCheck();
  };

  return KnownLengthInsertJob;
}

module.exports = createKnownLengthInsertJob;
