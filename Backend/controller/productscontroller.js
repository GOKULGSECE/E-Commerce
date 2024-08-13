const Product = require('../models/productModels');
const {v4:uuidv4} = require('uuid')

const getProducts = async (req, res) => {
    try {
        const getproducts = await Product.find();
        res.status(200).json(getproducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProducts = async (req, res) => {
    try {
        const { title, price, description, category, image, rating } = req.body;
        const new_product = new Product({
            id :uuidv4(),
            title,
            price,
            description,
            category,
            image,
            rating
        });
        await new_product.save();
        res.status(201).json(new_product);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getProducts, createProducts };
