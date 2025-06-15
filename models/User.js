const mongoose = require('mongoose');

// User schema for authentication 
const userSchema = new mongoose.Schema({
  // Full name of the user
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Unique email used for login
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  // Hashed password
  password: {
    type: String,
    required: true,
  }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
