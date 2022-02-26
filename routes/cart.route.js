const { Router } = require('express');
const {
  addToCart,
  cartHandler,
  deleteFromCart,
  getCartItems,
} = require('../controllers/cart.controller');

const router = Router();

router.use(cartHandler);
router.get('/', getCartItems);
router.post('/', addToCart);
router.delete('/', deleteFromCart);

module.exports = router;
