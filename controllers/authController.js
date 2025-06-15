const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JWT tokens

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with success
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user and return JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token with user ID as payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token valid for 1 day
    });

    // Send the token
    res.json({ token });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};
