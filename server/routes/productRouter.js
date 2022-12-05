const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addNewProduct);
router.get('/cat/:id', productController.getProductByCategory);
router.get('/:id', productController.getProductById);


module.exports = router