const { StatusCodes } = require('http-status-codes');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

const getCartItems = async (req, res) => {
  const { cart } = req;

  const populatedData = await cart.populate({
    path: 'products.bookId',
    select: '-createdAt',
  });
  return res.status(StatusCodes.OK).json({ result: populatedData });
};

const cartHandler = async (req, _res, next) => {
  const id = req.user;
  const cart = await Cart.findOne({ userId: id });
  req.cart = cart;

  if (!cart) {
    const newCart = new Cart({
      userId: id,
      products: [],
    });
    const savedCart = await newCart.save();
    req.cart = savedCart;
  }

  next();
};

const addToCart = async (req, res) => {
  const CART_ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
  };
  const { cart } = req;
  const { id, quantity, type } = req.body;

  const book = await Book.findOne({ _id: id });

  if (!book) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: "Book doesn't exist with the given ID" });
  }

  if (type === CART_ACTIONS.INCREMENT && !cart.products.length) {
    cart.products.push({ bookId: id, quantity: Number(quantity) });
  } else {
    const item = cart.products.find((product) =>
      product.bookId.equals(book._id));

    if (item) {
      const itemQuantity = type === CART_ACTIONS.DECREMENT
        ? item.quantity - Number(quantity)
        : item.quantity + Number(quantity);

      const prod = cart.products.map((product) =>
      (product.bookId.equals(book._id)
        ? { bookId: book._id, quantity: itemQuantity }
        : product));
      cart.products = prod;
    } else {
      cart.products.push({ quantity: Number(quantity), bookId: book._id });
    }
  }

  cart.products = cart.products.filter((product) => product.quantity > 0);
  await cart.save();

  const populatedData = await cart.populate({
    path: 'products.bookId',
    select: '-createdAt',
  });

  return res.status(StatusCodes.OK).json({ result: populatedData });
};

const deleteFromCart = async (req, res) => {
  const { cart } = req;
  const { id } = req.body;

  const book = await Book.findOne({ _id: id });

  if (!book) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: "Book doesn't exist with the given ID" });
  }

  const filteredProducts = cart.products.filter((product) => !product.bookId.equals(book._id));

  cart.products = filteredProducts;
  await cart.save();

  const populatedData = await cart.populate({
    path: 'products.bookId',
    select: '-createdAt',
  });

  return res.status(StatusCodes.OK).json({ result: populatedData });
};

module.exports = { getCartItems, cartHandler, deleteFromCart, addToCart };
