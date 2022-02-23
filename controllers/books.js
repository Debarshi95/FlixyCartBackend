const { StatusCodes } = require('http-status-codes');
const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  const books = Book.find({});
  return res.status(StatusCodes.OK).json({ result: [...books] });
};

module.exports = { getAllBooks };
