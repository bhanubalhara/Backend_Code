const mongoose = require('mongoose');

//Mongoose schema for a product in the e-commerce app
const productSchema = new mongoose.Schema({

  name: String,
  price: Number,
  description: String,
  stock: Number,
});

module.exports = mongoose.model('Product', productSchema);
