function createKeyHandler (execlib) {
  'use strict';

  var lib = execlib.lib,
    ALL_KEYS = '***';

  function AllPassKey () {
  }
  AllPassKey.prototype.destroy = lib.dummyFunc;
  AllPassKey.prototype.isOk = function (key) {
    return true;
  };
  AllPassKey.prototype.isAllPass = function () {
    return true;
  };
  AllPassKey.prototype.hasKey = function (key) {
    return key === ALL_KEYS;
  }

  function SimpleKeyHandler (key) {
    this.key = key;
  }
  SimpleKeyHandler.prototype.destroy = function () {
    this.key = null;
  };
  SimpleKeyHandler.prototype.isOk = function (key) {
    return key === this.key;
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
      return res;
    }
    kh = keyHandlerFactory(key);
    res.push(kh);
    return res;
  }
  KeysHandler.prototype.add = function (keys) {
    var newkeys, nkh;
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

  KeysHandler.ALL_KEYS = ALL_KEYS;

  return KeysHandler;
}

module.exports = createKeyHandler;
