function createLib (execlib) {
  return require('./index')(execlib);
}
module.exports = createLib;
