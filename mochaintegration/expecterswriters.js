'use strict';

function delayedWait(expectable) {
  lib.runNext(expectable.wait.bind(expectable));
  expectable = null;
}

function writeForSingleWaitable (creationhash) {
  var db = getGlobal(creationhash.dbname),
    expectable = getGlobal(creationhash.expectablename),
    key = creationhash.key,
    val = creationhash.value,
    putparams = creationhash.putparams,
    expct = creationhash.expect || val,
    p,
    w;
  creationhash = null;
  w = expectable.wait();
  p = putparams ? db.put.apply(db, putparams) : db.put(key, val);
  p.then(
    //expectable.wait.bind(expectable)
    delayedWait.bind(null, expectable)
  );
  return {promise: w, expect: expct};
}

function writeForWaitableArray (creationhash) {
  var db = getGlobal(creationhash.dbname),
    expectables = creationhash.expectablename.map(getGlobal),
    key = creationhash.key,
    val = creationhash.value,
    putparams = creationhash.putparams,
    expct = creationhash.expect || val,
    p,
    w;
  function waiter (_h) {return _h.wait();}
  w = q.all(expectables.map(waiter));
  p = putparams ? db.put.apply(db, putparams) : db.put(key, val);
  p.then(expectables.forEach.bind(expectables, waiter));
  return {promise: w, expect: expct};
}

function writeForWaitable (creationhash) {
  if (lib.isArray(creationhash.expectablename)) {
    return writeForWaitableArray(creationhash);
  }
  return writeForSingleWaitable(creationhash);
}

function expectForWaitable (creationhash, pe) {
  if (lib.isArray(creationhash.expectablename)) {
    return pe.promise.then(function (res) {
      res.forEach(function(v) {
        expect(v[1]).to.equal(pe.expect)
      });
      pe = null;
      return q(true);
    });
  } else {
    return expect(pe.promise).to.eventually.have.property(1, pe.expect);
  }
}

function expectEmptyForWaitable (creationhash, pe) {
  if (lib.isArray(creationhash.expectablename)) {
    return pe.promise.then(function (res) {
      res.forEach(function (r) {
        expect(r).to.be.empty;
      });
    });
  }
  return expect(pe.promise).to.eventually.be.empty;
}


module.exports = {
  expectForWaitable: expectForWaitable,
  writeForWaitable: writeForWaitable,
  expectEmptyForWaitable: expectEmptyForWaitable
};



