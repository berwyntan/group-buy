const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addNewProduct);
router.get('/:id', productController.getProductByCategory);


module.exports = router