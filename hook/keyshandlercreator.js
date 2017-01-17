function createKeyHandler (execlib, datafilterslib) {
  'use strict';

  var lib = execlib.lib,
    ALL_KEYS = '***';

  function isAFilterKey (key) {
    if ('object' === typeof key && (key.hasOwnProperty('values')  || key.hasOwnProperty('keys'))) {
      return true;
    }
    return false;
  }

  function AllPassKey () {
  }
  AllPassKey.prototype.destroy = lib.dummyFunc;
  AllPassKey.prototype.isOk = function (key) {
    return true;
  };
  AllPassKey.prototype.isKeyValHashOk = function (keyvalhash) {
    return true;
  };
  AllPassKey.prototype.isAllPass = function () {
    return true;
  };
  AllPassKey.prototype.hasKey = function (key) {
    return key === ALL_KEYS;
  }

  function FilterKeyHandler (key) {
    this.keyfilter = null;
    this.valfilter = null;
    if (key.keys) {
      this.keyfilter = datafilterslib.createFromDescriptor(key.keys);
    }
    if (key.values) {
      this.valfilter = datafilterslib.createFromDescriptor(key.values);
    }
  }
  FilterKeyHandler.prototype.destroy = function () {
    this.keyfilter = null;
    this.valfilter = null;
  };
  FilterKeyHandler.prototype.isOk = function (key) {
    if (this.keyfilter) {
      return this.keyfilter.isOK(key);
    }
    return true;
  };
  FilterKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    if (!this.isOk(keyvalhash.key)) {
      //console.log('key', keyvalhash.key, 'is not ok with keyfilter');
      return false;
    }
    return this.isValOk(keyvalhash.value);
  };
  FilterKeyHandler.prototype.isValOk = function (value) {
    if (this.valfilter) {
      //console.log('value', value, 'ok with valfilter', this.valfilter, '?', this.valfilter.isOK(value));
      return this.valfilter.isOK(value);
    }
    return true;
  };

  function SimpleKeyHandler (key) {
    this.key = key;
  }
  SimpleKeyHandler.prototype.destroy = function () {
    this.key = null;
  };
  SimpleKeyHandler.prototype.isOk = function (key) {
    return key === this.key;
  };
  SimpleKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    //console.log('SimpleKeyHandler isOk?', keyvalhash.key);
    return this.isOk(keyvalhash.key);
  };
  SimpleKeyHandler.prototype.isAllPass = function () {
    return false;
  };
  SimpleKeyHandler.prototype.hasKey = function (key) {
    return key === this.key;
  };

  function ComplexKeyHandler (key) {
    this.keys = key.map(keyHandlerFactory);
  }
  ComplexKeyHandler.prototype.destroy = function () {
    var ks = this.keys;
    this.keys = null;
    if (ks) {
      lib.arryDestroyAll(ks);
    }
  };
  function isAllPassHandler (handler) {
    return handler.isAllPass();
  }
  ComplexKeyHandler.prototype.isAllPass = function () {
    return this.keys && this.keys.every(isAllPassHandler);
  };
  function keyEquals(keyarr, kh, khindex) {
    return kh.hasKey(keyarr[khindex]);
  }
  ComplexKeyHandler.prototype.hasKey = function (key) {
    if (!lib.isArray(key)) {
      return false;
    }
    return this.keys.every(keyEquals.bind(null, key));
  };
  function isOkOnSubHandler (key, handler, handlerindex) {
    return handler.isOk(key[handlerindex]);
  }
  ComplexKeyHandler.prototype.isOk = function (key) {
    return this.keys && this.keys.every(isOkOnSubHandler.bind(null, key));
  };
  function isKeyValHashOkOnSubHandler (keyvalhash, handler, handlerindex) {
    return handler.isOk(keyvalhash.key[handlerindex]);
  }
  ComplexKeyHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    return this.keys && this.keys.every(isKeyValHashOkOnSubHandler.bind(null, keyvalhash));
  };

  function keyHandlerFactory (key) {
    if (key === ALL_KEYS) {
      return new AllPassKey();
    }
    if (lib.isString(key)) {
      return new SimpleKeyHandler(key);
    }
    if (lib.isArray(key)) {
      return new ComplexKeyHandler(key);
    }
    if (isAFilterKey(key)) {
      return new FilterKeyHandler(key);
    }
  }

  function KeysHandler () {
    this.handlers = [];
    this.isAllPass = false;
  }
  KeysHandler.prototype.destroy = function () {
    var hs;
    this.isAllPass = null;
    hs = this.handlers;
    this.handlers = null;
    if (hs) {
      lib.arryDestroyAll(hs);
    }
  };
  KeysHandler.prototype.isEmpty = function () {
    return (!(this.handlers && this.handlers.length > 0));
  };
  KeysHandler.prototype.setHandlers = function (handlers) {
    this.handlers = handlers;
    this.isAllPass = handlers.some(isAllPassHandler);
  };
  function handlerHasKey (key, handler) {
    return handler.hasKey(key);
  }
  KeysHandler.prototype.possiblyNewKey = function (res, key) {
    var kh;
    if (this.handlers.some(handlerHasKey.bind(null, key))) {
      //console.log('already handling key', key);
      return res;
    }
    kh = keyHandlerFactory(key);
    res.push(kh);
    return res;
  }
  KeysHandler.prototype.add = function (keys) {
    var newkeys, nkh;
    if (isAFilterKey(keys)) {
      this.handlers.push(new FilterKeyHandler(keys));
      return {
        filter: keys.values,
        keyfilter: keys.keys
      };
    }
    if (!lib.isArray(keys)) {
      return null;
    }
    newkeys = keys.reduce(this.possiblyNewKey.bind(this), []);
    if (newkeys.length) {
      Array.prototype.push.apply(this.handlers, newkeys);
      nkh = new KeysHandler();
      nkh.setHandlers(newkeys);
      this.isAllPass |= nkh.isAllPass;
      return nkh;
    }
    return null;
  };
  function indexAndElementFinder (findobj, handler, handlerindex) {
    if (handler.hasKey(findobj.key)) {
      findobj.handler = handler;
      findobj.index = handlerindex;
      return true;
    }
  }
  KeysHandler.prototype.remove = function (key) {
    var findobj = {key: key, handler: null, index: null},
      found = this.handlers.some(indexAndElementFinder.bind(null, findobj));
    if (found) {
      this.handlers.splice(findobj.index, 1);
    }
    return found;
  };
  function isOkOnHandler (key, handler) {
    //console.log(key, 'isOk', handler.isOk(key), 'on', handler);
    return handler.isOk(key);
  }
  KeysHandler.prototype.isOk = function (key) {
    return this.handlers && this.handlers.some(isOkOnHandler.bind(null, key));
  };
  function isKeyValHashOkOnHandler (keyvalhash, handler) {
    //console.log(key, 'isOk', handler.isKeyValHashOk(key), 'on', handler);
    return handler.isKeyValHashOk(keyvalhash);
  }
  KeysHandler.prototype.isKeyValHashOk = function (keyvalhash) {
    return this.handlers && this.handlers.some(isKeyValHashOkOnHandler.bind(null, keyvalhash));
  };

  KeysHandler.ALL_KEYS = ALL_KEYS;

  return KeysHandler;
}

module.exports = createKeyHandler;
