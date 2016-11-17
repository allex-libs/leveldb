function createEncodingMakeup (execlib, leveldblib, bufferlib) {
  'use strict';

  var lib = execlib.lib;

  function encodingFor(encname, dbcreationoptions, codecname) { //encname = 'key' || 'value'
    var encnamecap, bufferencname, leveldbencname, realencname;
    if (encname !== 'key' && encname !== 'value') {
      throw new Error('encname must be "key" or "value"');
    }
    if (!dbcreationoptions) {
      return 'json';
    }
    encnamecap = lib.capitalize(encname);
    bufferencname = 'buffer'+encnamecap+'Encoding';
    if (dbcreationoptions[bufferencname] &&
        lib.isArray(dbcreationoptions[bufferencname])) {
      return bufferlib.makeCodec(dbcreationoptions[bufferencname], codecname);
    }
    leveldbencname = 'leveldb'+encnamecap+'Encoding';
    if (dbcreationoptions[leveldbencname]) {
      if (!leveldblib[dbcreationoptions[leveldbencname]]) {
        throw new lib.Error('LEVELDB_ENCODING_NOT_RECOGNIZED', dbcreationoptions[leveldbencname]);
      }
      return leveldblib[dbcreationoptions[leveldbencname]];
    }
    return dbcreationoptions[encname+'Encoding'];
  }

  function encodingMakeup (dbcreationoptions, codecname) {
    var keyencoding,
      valueencoding;

    if (!(dbcreationoptions && 'object' === typeof dbcreationoptions)) {
      return;
    }
    keyencoding = encodingFor('key', dbcreationoptions, codecname+'key');
    valueencoding = encodingFor('value', dbcreationoptions, codecname);

    if (keyencoding) {
      dbcreationoptions.keyEncoding = keyencoding;
    }
    if (valueencoding) {
      dbcreationoptions.valueEncoding = valueencoding;
    }
  }

  return encodingMakeup;
}

module.exports = createEncodingMakeup;
