const { Cart, Product, User } = require('../models/models');
const validator = require('validator');

const addToCart = async (req, res) => {
    const { UserId, ProductId, quantity } = req.body;
    console.log(UserId, ProductId, quantity)
    // validation

    if (!quantity || !ProductId || !UserId) 
        return res.status(400).json({ 'message':  'Cart details are missing.'});
    if (typeof quantity !== "number") 
        return res.status(400).json({ 'message': 'Invalid order quantity.'});
    if (quantity < 1) 
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
        
        const result = await Cart.create({
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
const getCartByUserId = async (req, res) => {
    const { id } = req.params;
    // check id
    try {
        const checkUser = await User.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid user id.'})
    }

    try {        
        const result = await Cart.findAll({where: {UserId: id}, include: Product,
            order: [['createdAt', 'DESC']]});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { addToCart, getCartByUserId }