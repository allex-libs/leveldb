function createShift2Pusher(execlib, leveldblib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    QueueableMixin = leveldblib.QueueableMixin,
    DBArray = leveldblib.DBArray,
    consume = QueueableMixin.consume;

  function Shift2Pusher(prophash){
    QueueableMixin.call(this);
    var sd = q.defer(), pd = q.defer();
    q.all([sd.promise, pd.promise]).then(
      this.created.bind(this, prophash),
      this.destroy.bind(this)
    ); 
    prophash.shifter.starteddefer = sd;
    prophash.pusher.starteddefer = pd;
    this.shifter = new DBArray(prophash.shifter);
    this.pusher = new DBArray(prophash.pusher);
  }
  QueueableMixin.inheritMethods(Shift2Pusher);
  Shift2Pusher.prototype.destroy = function () {
    if (this.shifter) {
      this.shifter.destroy();
    }
    this.shifter = null;
    if (this.pusher) {
      this.pusher.destroy();
    }
    this.pusher.destroy();
  };
  Shift2Pusher.prototype.created = function (prophash) {
    if (prophash.starteddefer) {
      prophash.starteddefer.resolve(this);
    }
  };
  Shift2Pusher.prototype.move = function (howmany, defer) {
    var shiftd = q.defer();
    shiftd.promise.done(
      this.afterShiftMany.bind(this,howmany, defer)
    );
    this.shifter.shiftMany(howmany, shiftd);
  };
  Shift2Pusher.prototype.afterShiftMany = function (howmany, defer, shiftresult) {
    shiftresult.finalizer().done(
      this.doPush.bind(this, howmany, defer, shiftresult),
      defer.reject.bind(defer)
    );
  };
  Shift2Pusher.prototype.doPush = function (howmany, defer, shiftresult) {
    /*
    var items = [];
    this.shifter.readInto(items).done(
      console.log.bind(console, 'after shift', items)
    );
    return;
    */
    var d = q.defer(), shifted = shiftresult.items;
    //console.log(shifted);
    d.promise.done(
      //defer.resolve.bind(defer, shifted.length),
      this.finalizeMove.bind(this, defer, shifted.length),
      defer.reject.bind(defer)
    );
    //consume(shifted, this.convert.bind(this));
    this.pusher.pushMany(shifted, d);
  };
  Shift2Pusher.prototype.finalizeMove = function (defer, len, pushfinalizer) {
    pushfinalizer().done(
      defer.resolve.bind(defer, len),
      defer.reject.bind(defer)
    );
  };
  Shift2Pusher.prototype.convert = function (shifteditem) {
    return shifteditem;
  };

  return Shift2Pusher;
}

module.exports = createShift2Pusher;
