class Product {
  constructor(id, name, batch, status, description) {
    this.id = id;
    this.name = name;
    this.batch = batch;
    this.status = status; // e.g., Verified, Pending, Rejected
    this.description = description; // New field
  }
}
const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/productController');

// GET /products
router.get('/', getProducts);

// POST /products
router.post('/', addProduct);

module.exports = router;


module.exports = Product;
