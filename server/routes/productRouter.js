const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addNewProduct);
router.put('/', productController.updateProductById);
router.put('/list/:id', productController.updateProductListingById);
router.get('/cat/:id', productController.getProductByCategory);
router.get('/:id', productController.getProductById);
router.get('/cat/count/:id', productController.countProductByCategory);

module.exports = router