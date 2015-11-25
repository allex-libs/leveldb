function createJobCollection(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q;

  function Lock() {
    this.defer = null;
    this.q = new lib.Fifo();
    this.nexter = this.next.bind(this);
  }
  Lock.prototype.destroy = function () {
    var j;
    this.nexter = null;
    while(this.q.length) {
      j = this.q.pop();
      j.reject(new lib.Error('JOB_COLLECTION_DESTROYING'));
    }
    this.q.destroy();
    this.defer = null;
  };
  Lock.prototype.add = function (job) {
    if (this.defer) {
      this.q.push(job);
    } else {
      this.activate(job);
    }
  };
  Lock.prototype.activate = function (job) {
    var p = job.defer.promise;
    p.then(
      this.next.bind(this),
      this.next.bind(this)
    );
    this.defer = p;
    job.go();
  };
  Lock.prototype.next = function () {
    this.defer = null;
    var job = this.q.pop();
    if (job) {
      this.activate(job);
    }
  };

  function JobCollection () {
    this.__locks = new lib.Map();
  }
  JobCollection.prototype.destroy = function () {
    lib.containerDestroyAll(this.__locks);
    this.__locks.destroy();
  };
  JobCollection.prototype.run = function (jobclassname, job) {
    var lock = this.__locks.get(jobclassname),
      p = job.defer.promise;
    if (!lock) {
      lock = new Lock();
      this.__locks.add(jobclassname, lock);
    }
    lock.add(job);
    return p;
  };
  
  return JobCollection;
}

module.exports = createJobCollection;
