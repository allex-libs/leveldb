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
