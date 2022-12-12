const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.addNewCategory)
router.get('/', categoryController.getAllCategory)
router.get('/:id', categoryController.getCategoryById)

module.exports = router