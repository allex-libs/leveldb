'use strict';

function ctornameFromCreationHash(dflt, creationhash) {
  return creationhash.handlerctorname || dflt;
}
function instancenameFromCreationHash(dflt, creationhash) {
  return creationhash.instancename || dflt;
}

module.exports = {
  ctornameFromCreationHash: ctornameFromCreationHash,
  instancenameFromCreationHash: instancenameFromCreationHash
};
