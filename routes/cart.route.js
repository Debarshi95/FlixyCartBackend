const { Router } = require('express');
const {
  addToCart,
  cartHandler,
  deleteFromCart,
  getCartItems,
} = require('../controllers/cart.controller');
const { verifyToken } = require('../utils/middlewares');

const router = Router();

router.use(verifyToken, cartHandler);
router.get('/', getCartItems);
router.post('/', addToCart);
router.delete('/', deleteFromCart);

module.exports = router;
