'use strict';

var utils = require('./utils'),
  ctrnFCH = utils.ctornameFromCreationHash.bind(null, 'LevelDBHandler'),
  inFCH = utils.instancenameFromCreationHash.bind(null, 'db');

function createLevelDBHandlerIt(creationhash) {
  var _ctrn = ctrnFCH, _in = inFCH;
  it('Creating an instance of '+_ctrn(creationhash)+' named '+_in(creationhash), function () {
    var ctorname = _ctrn(creationhash),
      ctor = allex_leveldblib[ctorname],
      instancename = _in(creationhash),
      d = creationhash.starteddefer || q.defer(),
      ret;
    _ctrn = null;
    _in = null;
    if (!ctor) {
      creationhash = null;
      return q.reject(new lib.Error('INVALID_LEVELDB_CTOR_NAME', ctorname+' is not a valid LevelDB handler constructor name'));
    }
    creationhash.starteddefer = d;
    new ctor(creationhash);
    creationhash = null;
    return setGlobal(instancename, null).then(qlib.executor(setGlobal.bind(null, instancename, d.promise)));
  });
};

setGlobal('createLevelDBHandlerIt', createLevelDBHandlerIt);

