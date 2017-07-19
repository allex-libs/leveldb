var libLoader = require('./libloader');

function createLib(execlib) {
  return execlib.loadDependencies('client', ['allex_datafilterslib', 'allex_bufferlib'], realCreator.bind(null, execlib));
}

function realCreator(execlib, datafilterslib, bufferlib) {
  return execlib.lib.q(libLoader(execlib, datafilterslib, bufferlib));
}



module.exports = createLib;
