require('dotenv').config();

const { MONGO_URI, PORT, SECRET, RAZORPAY_SECRET, RAZORPAY_KEY_ID } = process.env;

module.exports = {
  MONGO_URI,
  PORT,
  SECRET,
  RAZORPAY_KEY_ID,
  RAZORPAY_SECRET,
};
