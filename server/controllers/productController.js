const { Product, Category } = require('../models/models');
const validator = require('validator');

const addNewProduct = async (req, res) => {
    const { name, desc, price, imgUrl, listed, CategoryId } = req.body;

    
    // validation

    if (!imgUrl || !name || !desc || !price || !listed || !CategoryId) 
        return res.status(400).json({ 'message': 'Product details are missing.'});
    if (!validator.isCurrency(price)) 
        return res.status(400).json({ 'message': 'Invalid price.'});
    if (!validator.isURL(imgUrl)) 
        return res.status(400).json({ 'message': 'Invalid image URL.'});
    if (!validator.isBoolean(listed)) 
        return res.status(400).json({ 'message': 'Invalid listing status.'});
    // if (!validator.isUUID(CategoryId, {version: 4})) 
    //     return res.status(400).json({ 'message': 'Invalid category id.'});

    // check if category exists
    try {
        const checkCategory = await Category.findByPk(CategoryId);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid category id.'})
    }

    try {
        
        const result = await Product.create({
            name: name,
            desc: desc,
            price: price,
            imgUrl: imgUrl,
            listed: listed,
            CategoryId: CategoryId
        });

        // console.log(result);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
const getProductByCategory = async (req, res) => {
    const { id } = req.params;
    // check id
    try {
        const checkCategory = await Category.findByPk(id);
    } catch (error) {
        return res.status(404).json({ 'message': 'Invalid category id.'})
    }

    try {        
        const result = await Product.findAll({where: {CategoryId: id}});
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}
const updateProduct = async (req, res) => {}

module.exports = { addNewProduct, getProductByCategory }