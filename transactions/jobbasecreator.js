function createJobBase(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function JobBase() {
    this.defer = q.defer();
    this.result = null;
    this.error = null;
  }
  JobBase.prototype.destroy = function () {
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
  };
  JobBase.prototype.resolve = function (result) {
    this.result = result;
    this.destroy();
  };
  JobBase.prototype.reject = function (error) {
    this.error = error;
    this.destroy();
  };

  return JobBase;
}

module.exports = createJobBase;
