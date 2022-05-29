const shortid = require('shortid');
const Razorpay = require('razorpay');
const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = require('../utils/config');

const router = Router();

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});
router.post('/', async (req, res) => {
  const paymentCapture = 1;
  const amount = 499;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture: paymentCapture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: 'Some error occurred' });
  }
});

module.exports = router;
