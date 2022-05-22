const { Router } = require('express');
const {
  deleteAddress,
  getAllAddress,
  updateAddress,
  createAddress,
} = require('../controllers/address.controller');
const { verifyToken } = require('../utils/middlewares');

const router = Router();

router.use(verifyToken);
router.get('/address', getAllAddress);
router.post('/address', createAddress);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

module.exports = router;
