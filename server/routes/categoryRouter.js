const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.addNewCategory)
router.get('/', categoryController.getAllCategory)

module.exports = router