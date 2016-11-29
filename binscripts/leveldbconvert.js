var Path = require('path'),
  _dummyFunc;

/*
convertscript should module.exports = {
  inOptionsCreator: function (execlib, bufferlib, leveldblib) {...},
  outOptionsCreator: function (execlib, bufferlib, leveldblib) {...},
  convertor: function (keyvalue) { return {key: ..., value: ...} }
};

instead of convertor: function...
there may be createConvertor(execlib, bufferlib, leveldblib) {...}

*/

function printUsage() {
  console.log('allex-leveldb-convert dbfilename convertscriptname');
  process.exit(1);
}

function printConvertorNote() {
  console.log('your convertor script has to export a hash with at least the convertor function');
  process.exit(2);
}

function traverser(convertee, convertorfunc, keyval, stream) {
  try {
  stream.pause();
  var c = convertorfunc(keyval);
  console.log(keyval, '=>', c);
  convertee.put(c.key, c.value).then(stream.resume.bind(stream));
  } catch(e) {
    console.error(e.stack);
    console.error(e);
  }
}

function onConverteeOpened(originaldbname, convertor, original, convertee) {
  original.traverse(traverser.bind(null, convertee, convertor.convertor)).then(
    convertor.finalizer || _dummyFunc
  );
}

function converteeName(originaldbname) {
  while (originaldbname[originaldbname.length-1] === Path.sep) {
    originaldbname = originaldbname.substring(0, originaldbname.length-1);
  }
  return originaldbname+'.converted';
}

function onOriginalOpened(execlib, originaldbname, convertor, bufferlib, leveldblib, original) {
  try {
  var d = execlib.lib.q.defer(), openhash;
  _dummyFunc = execlib.lib.dummyFunc;
  openhash = {
    dbname: converteeName(originaldbname),
    starteddefer: d
  };
  if (execlib.lib.isFunction(convertor.outOptionsCreator)) {
    openhash.dbcreationoptions = convertor.outOptionsCreator(execlib, bufferlib, leveldblib);
  }
  d.promise.then(onConverteeOpened.bind(null, originaldbname, convertor, original));
  new leveldblib.LevelDBHandler(openhash);
  } catch(e) {
    console.error(e.stack);
    console.error(e);
  }
}

function go(execlib, originaldbname, convertor, bufferlib, leveldblib) {
  try {
  var d = execlib.lib.q.defer(), openhash;
  _dummyFunc = execlib.lib.dummyFunc;
  openhash = {
    dbname: originaldbname,
    starteddefer: d
  };
  if (execlib.lib.isFunction(convertor.createConvertor)) {
    convertor.convertor = convertor.createConvertor(execlib, bufferlib, leveldblib);
  }
  if(!execlib.lib.isFunction(convertor.convertor)) {
    return printConvertorNote();
  }
  if (execlib.lib.isFunction(convertor.inOptionsCreator)) {
    openhash.dbcreationoptions = convertor.inOptionsCreator(execlib, bufferlib, leveldblib);
  }
  d.promise.then(onOriginalOpened.bind(null, execlib, originaldbname, convertor, bufferlib, leveldblib));
  new leveldblib.LevelDBHandler(openhash);
  } catch(e) {
    console.error(e.stack);
    console.error(e);
  }
}
module.exports = function (execlib) {
  'use strict';
  try {
  var lib = execlib.lib,
    originaldbname = process.argv[3],
    convertscript = process.argv[4],
    convertor,
    libRegistry;
  if (!originaldbname) {
    return printUsage();
  }
  if (!convertscript) {
    return printUsage();
  }
  convertor = require(Path.join(process.cwd(), convertscript));
  libRegistry = execlib.execSuite.libRegistry;

  new execlib.lib.qlib.PromiseExecutionMapReducerJob([
    libRegistry.register.bind(libRegistry, 'allex_bufferlib'),
    libRegistry.register.bind(libRegistry, 'allex_leveldblib')
  ], [execlib, originaldbname, convertor], go).go();
  } catch(e) {
    console.error(e.stack);
    console.error(e);
  }
}
