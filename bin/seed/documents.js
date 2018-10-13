'use strict';

const mongoose = require('mongoose');

const Documents = require('../../models/document.js');
const User = require('../../models/user.js');
const data = require('../../data/documents.js');

function updateRecipient (user, document, index) {
  return User.findOne({ username: user })
    .then((recipient) => {
      if (!recipient) {
        throw new Error('Unknown recipient ' + user);
      }
      document.recipient[index] = recipient._id;
    });
}

function updateRecipientId (document) {
  const promisesOfUpdatingRecipientId = document.recipient.map((user, index) => updateRecipient(user, document, index));
  return Promise.all(promisesOfUpdatingRecipientId);
}

mongoose.connect('mongodb://localhost/uploadlydb')
  .then(() => {
    console.log('Connected to Mongo!');
    return Documents.remove({});
  })
  .then(() => {
    console.log('Empty db');
    return Documents.insertMany(data);
  })
  .then(() => {
    const promisesOfUpdatingRecipientId = document.map((document) => {
      updateRecipientId(document);
    });
    return Promise.all(promisesOfUpdatingRecipientId);
  })
  .then(() => {
    return Documents.insertMany(data);
  })
  .then((results) => {
    console.log('You have some users', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
