const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');

// Get all products
router.get('/', getProducts);

// Add new product
router.post('/', addProduct);

module.exports = router;
