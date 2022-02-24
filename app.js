const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ urlencoded: true, extended: true }));
app.use(
  '/images',
  express.static(path.join(__dirname, '/public/assets/images')),
);

const bookRoute = require('./routes/books.route');
const { errorHandler } = require('./utils/middlewares');

app.use('/books', bookRoute);
app.use(errorHandler);

module.exports = app;
