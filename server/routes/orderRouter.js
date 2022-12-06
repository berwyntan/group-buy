const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.addNewOrder)
router.get('/user/:id', orderController.getOrdersByUserId)

module.exports = router