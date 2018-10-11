'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(422).json({ code: 'validation error' });
  }

  const user = new User(req.body);

  user.save()
    .then(() => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
