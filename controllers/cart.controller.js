/* eslint-disable function-paren-newline */
const { StatusCodes } = require('http-status-codes');
const Cart = require('../models/Cart');

const getCartItems = async (req, res) => {
  const { id } = req.cart;
  const cart = await Cart.findOne({ id });
  const populatedData = cart.populate({ path: 'books', select: '-createdAt' });
  return res.status(StatusCodes.OK).json({ result: populatedData });
};

const cartHandler = async (req, _req, next) => {
  const id = req.user;
  const cart = await Cart.findOne({ userId: id });

  if (!cart) {
    const newCart = new Cart({
      userId: id,
      product: [],
    });
    await newCart.save();
    req.cart = newCart;
  }
  next();
};

const addToCart = async (req, res) => {
  const { id } = req.cart;
  const { cartItem } = req.body;

  const cart = await Cart.findOne({ id });

  if (cart.products.length <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Cannot delete!! Cart is empty' });
  }

  const filteredProducts = cart.products.map((product) => {
    if (product._id === cartItem.id) {
      return {
        ...product,
        quantity: product.quantity - cartItem.quantity,
      };
    }
    return product;
  });

  cart.products = filteredProducts;
  await cart.save();

  const populatedData = await cart.populate({
    path: 'products',
    select: '-createdAt',
  });

  return res.status(StatusCodes.OK).json({ result: populatedData });
};

const deleteFromCart = async (req, res) => {
  const { id } = req.cart;
  const { cartItem } = req.body;

  const cart = await Cart.findOne({ id });

  if (cart.products.length <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Cannot delete!! Cart is empty' });
  }

  const filteredProducts = cart.products.map((product) => {
    if (product._id === cartItem.id) {
      return {
        ...product,
        quantity: product.quantity + cartItem.quantity,
      };
    }
    return product;
  });

  cart.products = filteredProducts;
  await cart.save();

  const populatedData = await cart.populate({
    path: 'products',
    select: '-createdAt',
  });

  return res.status(StatusCodes.OK).json({ result: populatedData });
};

module.exports = { getCartItems, cartHandler, deleteFromCart, addToCart };
