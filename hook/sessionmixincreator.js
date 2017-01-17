function createHookableUserSessionMixin (execlib, Hook) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q;

  function HookableUserSessionMixin (leveldb) {
    Hook.call(this, {leveldb:leveldb, cb: this.onDataFromHook.bind(this)});
  }

  lib.inherit(HookableUserSessionMixin, Hook);

  HookableUserSessionMixin.addMethods = function (UserSession) {
    Hook.addMethods(UserSession);
    lib.inheritMethods(UserSession, HookableUserSessionMixin, 'onDataFromHook');
  };

  HookableUserSessionMixin.ALL_KEYS = Hook.ALL_KEYS;

  HookableUserSessionMixin.prototype.onDataFromHook = function (key, value) {
    this.sendOOB('l',[key, value]);
  };

  HookableUserSessionMixin.__methodDescriptors = {
    unhook: [{
      title: 'Unhook',
      type: 'array',
      items : {
        oneOf : [
          {type : 'string'},
          {type : 'array', items: {type: 'string'}}
        ]
      },
      required: false
    }],
    hook : [{
      title: 'Hook',
      type: 'object',
      anyOf : [
         { '$ref' : '#/definitions/propswithaccounts'},
         { '$ref' : '#/definitions/propswithkeys'},
         { '$ref' : '#/definitions/propswithfilter'}
      ],
      definitions: {
        propswithaccounts : {
          properties: {
            scan : {
              type : 'boolean',
            },
            accounts: {
              type : 'array',
              items : {
                type : 'string'
              }
            }
          },
          required: ['accounts'],
          additionalProperties : false
        },
        propswithkeys : {
          properties: {
            scan : {
              type : 'boolean',
            },
            keys: {
              type : 'array',
              items : {
                oneOf : [
                  {type : 'string'},
                  {type : 'array', items: {type: 'string'}}
                ]
              }
            }
          },
          required: ['keys'],
          additionalProperties : false
        },
        propswithfilter: {
          properties: {
            scan: {
              type: 'boolean'
            },
            filter: {
              type: 'object',
              properties: {
                values: {
                  type: 'object'
                }
              }
            }
          }
        }
      }
    }]
  };

  return HookableUserSessionMixin;

};

module.exports = createHookableUserSessionMixin;

