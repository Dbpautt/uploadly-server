'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

cloudinary.config({
  cloud_name: 'drtjvxqyi',
  api_key: '729837836316418',
  api_secret: '9b6e0mkfwqFo3TKrbdAtiKuuyC8'
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploadly',
  allowedFormats: ['pdf', 'jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, bcrypt.hashSync(`${Math.floor(Math.random() * 300000)}`, saltRounds));
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
