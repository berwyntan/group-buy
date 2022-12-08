const { Order, Product, User } = require('../models/models');
const validator = require('validator');

const addNewOrder = async (req, res) => {
    const { fulfil, cancel, ProductId, UserId, quantity } = req.body;
    
    // validation

    if (!fulfil || !cancel || !ProductId || !UserId || !quantity) 
        return res.status(400).json({ 'message': 'Order details are missing.'});
    if (!validator.isBoolean(fulfil)) 
        return res.status(400).json({ 'message': 'Invalid fulfilment status.'});
    if (!validator.isBoolean(cancel)) 
        return res.status(400).json({ 'message': 'Invalid order status.'});
    if (!validator.isInt(quantity, { min: 1})) 
        return res.status(400).json({ 'message': 'Invalid order quantity.'});
    // if (!validator.isUUID(CategoryId, {version: 4})) 
    //     return res.status(400).json({ 'message': 'Invalid category id.'});

    // check if product exists
    try {
        const checkProduct = await Product.findByPk(ProductId);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid product id.'})
    }
    // check if user exists
    try {
        const checkUser = await User.findByPk(UserId);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid user id.'})
    }

    try {
        
        const result = await Order.create({
            fulfil: fulfil,
            cancel: cancel,
            ProductId: ProductId,
            UserId: UserId,
            quantity: quantity
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    } 
}
const getOrdersByUserId = async (req, res) => {
    const { id } = req.params;
    // check id
    try {
        const checkUser = await User.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid user id.'})
    }

    try {        
        const result = await Order.findAll({where: {UserId: id}, include: Product,
            order: [['createdAt', 'DESC']]});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;
    // check id
    // try {
    //     const checkUser = await Order.findByPk(id);
    // } catch (error) {
    //     return res.status(404).json({ 'message': 'Invalid user id.'})
    // }

    try {        
        const result = await Order.findByPk(id, {include: Product});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateOrder = async (req, res) => {}

module.exports = { addNewOrder, getOrdersByUserId, getOrderById }