'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const uploadCloud = require('../configs/cloudinary.js');

const Documents = require('../models/document');

router.get('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  Documents.find({ recipient: currentUser._id })
    .populate('createdBy')
    .then((documents) => {
      res.json(documents);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }

  Documents.findOne({ _id: id })
    .then((documents) => {
      if (documents) {
        res.json(documents);
      } else {
        return res.status(404).json({ code: 'document not found' });
      }
    })
    .catch(next);
});

router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }

  const file = req.file.url;
  const salt = bcrypt.genSaltSync(10);
  const hashDoc = bcrypt.hashSync(file, salt);

  const data = {
    recipient: req.body.recipient,
    uploadedBy: req.body.currentUser,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    file: hashDoc
  };

  const document = new Documents(data);
  return document.save()
    .then(() => {
      res.json(document);
    })
    .catch(next);
});

module.exports = router;
