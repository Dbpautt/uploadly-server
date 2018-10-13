'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

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

router.get('/:id', (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const id = req.params.id;

  User.findOne({ _id: id })
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

module.exports = router;
