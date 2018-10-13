'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const documentSchema = new Schema({
  recipient: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  uploadedBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Contract', 'Proposal', 'Presentation', 'Survey', 'Other']
  }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
