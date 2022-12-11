const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.addNewOrder)
router.put('/', orderController.updateOrder)
router.get('/user/:id', orderController.getOrdersByUserId)
router.get('/:id', orderController.getOrderById)
router.get('/admin/:id', orderController.getOrderByIdAdmin)
router.get('/product/:id', orderController.getOrdersByProductId)

module.exports = router