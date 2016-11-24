#!/usr/bin/env node

var child_process = require('child_process'),
  path = require('path'),
  originaldbname = process.argv[2],
  convertscript = process.argv[3],
  scriptpath;

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
  console.log('Usage: allex-leveldb-convert dbfilename convertscriptname');
  console.log('');
  console.log('convertscript should module.exports = {');
  console.log('  inOptionsCreator: function (execlib, bufferlib, leveldblib) {...},');
  console.log('  outOptionsCreator: function (execlib, bufferlib, leveldblib) {...},');
  console.log('  convertor: function (keyvalue) { return {key: ..., value: ...} }');
  console.log('};');
  console.log('');
  console.log('instead of convertor: function...');
  console.log('there may be createConvertor(execlib, bufferlib, leveldblib) {...}');
  process.exit(1);
}

if (!originaldbname) {
  return printUsage();
}
if (!convertscript) {
  return printUsage();
}
scriptpath = path.relative(process.cwd(), path.join(__dirname, '..', 'binscripts', 'leveldbconvert.js '+originaldbname+' '+convertscript));
child_process.exec('allexrun '+ scriptpath, console.log.bind(console, 'done'));
