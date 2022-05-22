const { Router } = require('express');
const {
  createOrder,
  getAllOrders,
} = require('../controllers/order.controller');
const { verifyToken } = require('../utils/middlewares');

const router = Router();

router.use(verifyToken);
router.get('/order', getAllOrders);
router.post('/order', createOrder);

module.exports = router;
