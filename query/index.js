function createQueryLib (execlib, datafilterslib) {
  'use strict';

  var Query = require('./creator')(execlib, datafilterslib);

  require('./querytaskcreator')(execlib);

  return {
    Query: Query,
    SessionMixin: require('./sessionmixincreator')(execlib, Query)
  };
}

module.exports = createQueryLib;
