'use strict';

const express = require('express');
const router = express.Router();

const Document = require('../models/document');

router.get('/document', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'user') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  Document.find({ recipient: currentUser._id })
    .populate('recipient')
    .populate('uploadedBy')
    .then((documents) => {
      res.json(documents);
    })
    .catch(next);
});

router.get('/document/:id', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'user') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  Document.findOne({ recipient: currentUser._id, _id: id })
    .populate('recipient')
    .populate('uploadedBy')
    .then((documents) => {
      res.json(documents);
    })
    .catch(next);
});

module.exports = router;
