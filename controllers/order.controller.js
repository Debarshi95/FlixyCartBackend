const { StatusCodes } = require('http-status-codes');
const Orders = require('../models/Orders');
const Address = require('../models/Address');
const Cart = require('../models/Cart');

const getAllOrders = async (req, res) => {
  const id = req.user;
  const orders = await Orders.find({ userId: id }).populate('products.bookId').populate('address');

  if (orders.length <= 0) {
    return res.status(StatusCodes.OK).json({ error: 'No orders found!' });
  }

  return res.status(StatusCodes.OK).json({ result: [...orders] });
};

const createOrder = async (req, res) => {
  const id = req.user;
  const { addressId, cartId } = req.body;

  const address = await Address.findOne({ $and: [{ id: addressId }, { userId: id }] });

  if (!address) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  const cart = await Cart.findOne({ $and: [{ id: cartId }, { userId: id }] });
  const newOrder = new Orders({
    products: cart.products,
    address,
    userId: id,
  });

  await newOrder.save();

  cart.products = [];

  await cart.save();
  return res
    .status(StatusCodes.OK)
    .json({
      message: 'Order added successfully!!',
    });
};

module.exports = { getAllOrders, createOrder };
