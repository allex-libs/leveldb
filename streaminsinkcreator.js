function createStreamInSink(execlib) {
  var q = execlib.lib.q,
    qlib = execlib.lib.qlib;

  function notificator(sink, defer, itemer, pager, item) {
    if (item.pagebreak) {
      var d = q.defer();
      d.promise.then(sink.call.bind(sink, 'resumeLevelDBStream', item.pagebreak));
      pager(d);
      return;
    }
    itemer(item);
  }

  return function (sink, method, options, itemcb, pagecb) {
    var d = q.defer();
    var sd = sink.call(method, options);
    sd.then(
      d.resolve.bind(d),
      d.reject.bind(d),
      notificator.bind(null, sink, d, itemcb, pagecb)
    );
    return d.promise;
  }
}

module.exports = createStreamInSink;
