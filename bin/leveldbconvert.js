#!/usr/bin/env node

var child_process = require('child_process'),
  path = require('path');

child_process.exec('allexrun '+ path.join(__dirname, '..', 'binscripts', 'leveldbconvert.js '+process.argv[2]+' '+process.argv[3]), console.log.bind(console, 'done'));
