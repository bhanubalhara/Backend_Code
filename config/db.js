const mongoose = require('mongoose');

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt connection using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Success log
    console.log(` MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Error handling
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
