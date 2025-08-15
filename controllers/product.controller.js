const Product = require('../models/product.model');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');


//@desc Get all products
//@route GET /api/products
//@access Public

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//@desc Get a single product
//@route GET /api/products/:id
//@access Public
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('user', 'name email');
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//@desc Create a new product
//@route POST /api/products
//@access Private
const createProduct = async (req, res) => {
    const { name, quantity, price } = req.body;

    const product = new Product({
        name,
        quantity,
        price,
        user: req.user._id
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
}

//@desc Update a product
//@route PUT /api/products/:id
//@access Private
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
