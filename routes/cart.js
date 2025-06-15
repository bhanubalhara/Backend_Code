
const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
} = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateCart);
router.delete('/:id', protect, deleteFromCart);

module.exports = router;
