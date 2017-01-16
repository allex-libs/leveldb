function extendLibWithHooks (execlib, leveldblib, datafilterslib) {
  'use strict';

  var Hook = require('./creator')(execlib, datafilterslib),
    HookableUserSessionMixin = require('./sessionmixincreator')(execlib, Hook);

  leveldblib.Hook = Hook;
  leveldblib.HookableUserSessionMixin = HookableUserSessionMixin;
}

module.exports = extendLibWithHooks;
