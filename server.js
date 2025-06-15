// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route modules
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB(); 

// Create an Express app
const app = express();

// Middleware setup
app.use(cors());               
app.use(express.json());       

// Route registrations
app.use('/products', productRoutes); // Routes for product CRUD operations
app.use('/cart', cartRoutes);        // Routes for cart operations 
app.use('/', authRoutes);            // Routes for authentication 



// Start the server on provided PORT or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
