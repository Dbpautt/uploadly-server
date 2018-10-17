'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const uploadCloud = require('../configs/cloudinary.js');

const Document = require('../models/document');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }

  User.find({ createdBy: currentUser._id })
    .populate('createdBy')
    .then((users) => {
      res.json(users);
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

  User.findOne({ username }, 'username')
    .then((userExists) => {
      if (userExists) {
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

      const user = new User(data);
      return user.save()
        .then(() => {
          res.json(user);
        });
    })
    .catch(next);
});

router.get('/:id/document', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }

  User.findOne({
    $and: [ { createdBy: currentUser._id }, { _id: id } ]
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' });
      }
      return Document.find({ recipient: user._id })
        .populate('recipient')
        .populate('uploadedBy')
        .then((documents) => {
          res.json(documents);
        });
    })
    .catch(next);
});

router.post('/:id/document/create', uploadCloud.single('file'), (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return next();
  }
  User.findOne({
    $and: [ { createdBy: currentUser._id }, { _id: id } ]
  });
  const file = req.file.url;

  const httpArray = file.split(':');
  httpArray[0] = 'https';
  const secureFile = httpArray.join(':');

  const data = {
    recipient: req.params.id,
    uploadedBy: req.body.uploadedBy,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    file: secureFile
  };

  const document = new Document(data);
  return document.save()
    .then(() => {
      res.json(document);
    })
    .catch(next);
});

router.get('/:id/document/:docid', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const docid = req.params.docid;
  const id = req.params.userid;

  if (!ObjectId.isValid(id, docid)) {
    return next();
  }

  Document.findOne({
    $and: [ { createdBy: id }, { _id: docid } ]
  })
    .then((document) => {
      if (!document) {
        return res.status(404).json({ code: 'not-found' });
      }
      return Document.find({ recipient: user._id })
        .populate('recipient')
        .populate('uploadedBy')
        .then((documents) => {
          res.json(documents);
        });
    })
    .catch(next);
});

module.exports = router;
