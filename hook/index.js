function extendLibWithHooks (execlib, leveldblib) {
  'use strict';

  var Hook = require('./creator')(execlib),
    HookableUserSessionMixin = require('./sessionmixincreator')(execlib, Hook);

  leveldblib.Hook = Hook;
  leveldblib.HookableUserSessionMixin = HookableUserSessionMixin;
}

module.exports = extendLibWithHooks;
