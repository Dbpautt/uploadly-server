'use strict';

const bcrypt = require('bcrypt');

function encrypt (password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

const admins = [{
  username: 'admin1',
  password: encrypt('1234'),
  role: 'admin'
}, {
  username: 'admin2',
  password: encrypt('1234'),
  role: 'admin'
}, {
  username: 'admin3',
  password: encrypt('1234'),
  role: 'admin'
}, {
  username: 'admin4',
  password: encrypt('1234'),
  role: 'admin'
}, {
  username: 'admin5',
  password: encrypt('1234'),
  role: 'admin'
}, {
  username: 'admin6',
  password: encrypt('1234'),
  role: 'admin'
}];

const users = [{
  username: 'user1',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 0
}, {
  username: 'user2',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 0
}, {
  username: 'diana',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1
}, {
  username: 'majo',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1
}, {
  username: 'majo1',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2
}, {
  username: 'majo2',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2
}, {
  username: 'majo3',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2
}, {
  username: 'majo4',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2
}, {
  username: 'majo5',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 3
}, {
  username: 'majo6',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 4
}, {
  username: 'majo7',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1
}];

module.exports = { admins, users };
