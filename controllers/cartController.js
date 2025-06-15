const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

//GET 
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json(cart);
  } catch (err) {
    console.error('Get Cart Error:', err);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// POST
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validation
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid productId or quantity' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Get or create user cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error('Add to Cart Error:', err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Update product quantity in cart
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid productId or quantity' });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error('Update Cart Error:', err);
    res.status(500).json({ message: 'Error updating cart' });
  }
};

// Delete a product from cart


exports.deleteFromCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const before = cart.items.length;

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    if (cart.items.length === before) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (err) {
    console.error('Delete From Cart Error:', err);
    res.status(500).json({ message: 'Error deleting item from cart' });
  }
};
