function createPromiseChainerJob(execlib, JobBase) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function PromiseChainerJob(promiseproviderarry) {
    JobBase.call(this);
    this.promiseproviderarry = promiseproviderarry;
  }
  lib.inherit(PromiseChainerJob, JobBase);
  PromiseChainerJob.prototype.destroy = function () {
    this.promiseproviderarry = null;
    JobBase.prototype.destroy.call(this);
  };
  PromiseChainerJob.prototype.go = function () {
    this.doPromise(0);
  };
  PromiseChainerJob.prototype.doPromise = function (index, result) {
    if (index >= this.promiseproviderarry.length) {
      this.resolve(result);
      return;
    }
    var promiseprovider = this.promiseproviderarry[index];
    promiseprovider(result).then(
      this.doPromise.bind(this, index+1),
      this.reject.bind(this)
    );
  };

  return PromiseChainerJob;
}

module.exports = createPromiseChainerJob;
