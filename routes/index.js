'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Welcome to the uploadly API' });
});

module.exports = router;
