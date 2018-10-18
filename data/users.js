'use strict';

const bcrypt = require('bcrypt');
const getRandomColor = require('../helpers/random');

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
  createdBy: 0,
  color: getRandomColor.getRandomColor()
}, {
  username: 'user2',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 0,
  color: getRandomColor.getRandomColor()
}, {
  username: 'diana',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo1',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo2',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo3',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo4',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 2,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo5',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 3,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo6',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 4,
  color: getRandomColor.getRandomColor()
}, {
  username: 'majo7',
  password: encrypt('1234'),
  role: 'user',
  createdBy: 1,
  color: getRandomColor.getRandomColor()
}];

module.exports = { admins, users };
