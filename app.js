const express = require('express');
require('express-async-errors');

const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ urlencoded: true, extended: true }));
app.use(
  '/images',
  express.static(path.join(__dirname, '/public/assets/images')),
);

const bookRoute = require('./routes/books.route');
const cartRoute = require('./routes/cart.route');
const authRoute = require('./routes/auth.route');
const addressRoute = require('./routes/address.route');
const { errorHandler } = require('./utils/middlewares');

app.use('/api/books', bookRoute);
app.use('/api/cart', cartRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', addressRoute);
app.use(errorHandler);

module.exports = app;
