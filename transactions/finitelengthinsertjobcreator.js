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
