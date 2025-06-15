const mongoose = require('mongoose');

// Mongoose schema for the shopping cart
const cartSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    required: true,
    ref: 'User',
  },

  // Array of items in the cart
  items: [
    {
      // Reference to the product added to the cart
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // References the Product model
        required: true,
      },

      // Quantity of this product in the cart
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
      },
    },
  ],
});

// export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
