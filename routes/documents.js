'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Documents = require('../models/documents');

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

  Documents.findOne({ _id: id })
    .then((documents) => {
      res.json(documents);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ code: 'validation error' });
  }

  Documents.findOne({ username }, 'username')
    .then((documentExists) => {
      if (documentExists) {
        return res.status(409).json({ code: 'conflict' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const data = {
        username,
        password: hashPass,
        createdBy: currentUser._id,
        role: 'user'
      };

      const document = new Document(data);
      return document.save()
        .then(() => {
          res.json(document);
        });
    })
    .catch(next);
});

module.exports = router;
