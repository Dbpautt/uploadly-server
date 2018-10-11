'use strict';

const mongoose = require('mongoose');

const User = require('../../models/user.js');
const data = require('../../data/users.js');

mongoose.connect('mongodb://localhost/uploadlydb')
  .then(() => {
    console.log('Connected to Mongo!');
    return User.remove({});
  })
  .then(() => {
    console.log('Empty db');
    return User.insertMany(data.admins);
  })
  .then((admins) => {
    console.log('You have some admins', admins.length);
    data.users.forEach(user => {
      user.createdBy = admins[user.createdBy]._id;
    });
    return User.insertMany(data.users);
  })
  .then((results) => {
    console.log('You have some users', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
