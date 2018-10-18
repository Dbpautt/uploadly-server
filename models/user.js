'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  },
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  color: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
