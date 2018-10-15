'use strict';

require('dotenv').config();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploadly',
  allowedFormats: ['pdf', 'jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, bcrypt.hashSync(`${Math.floor(Math.random() * 300000)}`, saltRounds));
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
