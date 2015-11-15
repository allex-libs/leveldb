function createNumChecker(execlib) {
  'use strict';
  var lib = execlib.lib;

  return function numChecker(num) {
    var ret;
    if (lib.isNumber(num)) {
      ret = num;
    }
    if (lib.isString(num)) {
      ret = parseInt(num.replace(/^[0]*/,'','g'));
    }
    if (isNaN(num)) {
      throw new lib.Error('NOT_A_NUMBER', num);
    }
    if (!lib.isNumber(ret)) {
      throw new lib.Error('NOT_A_NUMBER', num);
    }
    return ret;
  }
}

module.exports = createNumChecker;
