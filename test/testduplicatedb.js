function eventuallyClose (db) {
  setTimeout(db.destroy.bind(db), 5000);
}

function startdb (execlib, leveldblib) {
  var d = execlib.lib.q.defer();
  d.promise.then(eventuallyClose);
  new leveldblib.LevelDBHandler({
    dbname: 'test/bla/test.db',
    starteddefer: d
  });
}

function go (execlib, leveldblib) {
  startdb(execlib, leveldblib);
  startdb(execlib, leveldblib);
}

function main (execlib) {
  execlib.loadDependencies('client', ['allex_leveldblib'], go.bind(null, execlib));
}

module.exports = main;
