'use strict';

const levelup = require('levelup');
const memdown = require('memdown');

// const db = levelup('/', {
//   valueEncoding: 'json',
//   db: memdown
// });

const db = levelup(memdown());

module.exports = db;