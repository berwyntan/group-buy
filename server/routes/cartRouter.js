const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart)
router.get('/user/:id', cartController.getCartByUserId)
// router.get('/:id', cartController.getOrderById)

module.exports = router