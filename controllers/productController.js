const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
