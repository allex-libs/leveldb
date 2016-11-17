var fs = require('fs'),
  Path = require('path');

function createDirDeleter(execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    JobBase = qlib.JobBase;

  function DirDeleter(path, defer) {
    JobBase.call(this, defer);
    this.path = path;
  }
  lib.inherit(DirDeleter, JobBase);
  DirDeleter.prototype.destroy = function () {
    this.path = null;
    JobBase.prototype.destroy.call(this);
  };
  DirDeleter.prototype.go = function () {
    fs.exists(this.path, this.onExists.bind(this));
    return this.defer ? this.defer.promise : q(false);
  };
  DirDeleter.prototype.onExists = function (exists) {
    if (!exists) {
      this.resolve(true);
      return;
    }
    fs.readdir(this.path, this.onDirContents.bind(this));
  };
  DirDeleter.prototype.onDirContents = function (err, list) {
    if (err) {
      this.reject(err);
      return;
    }
    q.all(list.map(this.deleteFsItem.bind(this))).then(
      this.onDirClear.bind(this)
    );
  };
  DirDeleter.prototype.onDirClear = function () {
    fs.rmdir(this.path, this.onDirDeleted.bind(this));
  };
  DirDeleter.prototype.onDirDeleted = function (err) {
    if (err) {
      this.reject(err);
    } else {
      this.resolve(true);
    }
  };
  DirDeleter.prototype.deleteFsItem = function (fsitemname) {
    var d = q.defer(), fsitempath = Path.join(this.path, fsitemname);
    fs.lstat(fsitempath, this.onItemStats.bind(this, d, fsitempath));
    return d.promise;
  };
  DirDeleter.prototype.onItemStats = function (defer, fsitempath, err, stats) {
    if (err) {
      defer.reject(err);
      return;
    }
    if (stats.isDirectory()) {
      (new DirDeleter(fsitempath, defer)).go();
    } else {
      fs.unlink(fsitempath, this.onUnlinked.bind(this, defer));
    }
  };
  DirDeleter.prototype.onUnlinked = function (defer, err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(true);
    }
  };

  function deleteDirAsPromised (path) {
    return new DirDeleter(path).go();
  }

  function deleteDir (path, cb) {
    deleteDirAsPromised(path).then(cb);
  }

  return {
    deleteDirWithCB: deleteDir,
    deleteDirWithPromise: deleteDirAsPromised
  };
}

module.exports = createDirDeleter;
