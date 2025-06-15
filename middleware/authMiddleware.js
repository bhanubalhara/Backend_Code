const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  //  Authorization header 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // Extract token from 'Bearer <token>'
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = decoded;

    // Move to the next middleware 
    next();
  } catch (err) {
    // Log and handle invalid or expired token errors
    console.error('JWT Error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
