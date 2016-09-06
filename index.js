var levelup = require('level-browserify'),
  libLoader = require('./libloader');

function createLib(execlib) {
  return execlib.loadDependencies('client', ['allex:datafilters:lib'], realCreator.bind(null, execlib));
}

function realCreator(execlib, datafilterslib) {
  return execlib.lib.q(libLoader(execlib, datafilterslib));
}



module.exports = createLib;
