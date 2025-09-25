// In-memory products (with descriptions)
let products = [
  { id: 1, name: 'Ashwagandha', description: 'Boosts immunity and reduces stress' },
  { id: 2, name: 'Tulsi', description: 'Supports respiratory health and immunity' },
];

// Get all products
const getProducts = (req, res) => {
  res.json(products);
};

// Add new product
const addProduct = (req, res) => {
  const { name, description } = req.body;
  const newProduct = { id: products.length + 1, name, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

module.exports = { getProducts, addProduct };
