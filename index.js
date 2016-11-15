var libLoader = require('./libloader');

function createLib(execlib) {
  return execlib.loadDependencies('client', ['allex:datafilters:lib', 'allex:buffer:lib'], realCreator.bind(null, execlib));
}

function realCreator(execlib, datafilterslib, bufferlib) {
  return execlib.lib.q(libLoader(execlib, datafilterslib, bufferlib));
}



module.exports = createLib;
