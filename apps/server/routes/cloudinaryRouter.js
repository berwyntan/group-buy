const express = require('express');
const router = express.Router();
const cloudinaryController = require('../controllers/cloudinaryController');

router.post('/del', cloudinaryController.deleteImage)

module.exports = router