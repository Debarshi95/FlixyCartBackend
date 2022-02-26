const { StatusCodes } = require('http-status-codes');
const Book = require('../models/Book');

const getAllBooks = async (_, res) => {
  const books = await Book.find({});
  return res.status(StatusCodes.OK).json({ result: books });
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Book not found with the given id' });
  }
  return res.status(StatusCodes.OK).json({ result: book });
};

module.exports = { getAllBooks, getBook };
