const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const errorHandler = (error, _, res, next) => {
  console.error({ error });
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: true, message: 'Malformatted ID.' });
  }
  if (error.name === 'ValidationError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: true, message: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: true, message: 'Invalid token.' });
  }
  res
    .status(StatusCodes.BAD_REQUEST)
    .send({ error: true, message: error.message });

  return next(error);
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: true,
        message: 'No auth token found. Authorization denied.',
      });
    }

    const decodedToken = await jwt.verify(token);

    if (!decodedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: true,
        message: 'Token verification failed. Authorization denied.',
      });
    }

    req.user = decodedToken.id;

    return next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: error.message,
    });
  }
};

const validateRegister = async (req, res, next) => {
  const errors = {};
  const { username, email, password, confirmPassword } = req.body;

  // if (!firstname || firstname.trim() === '') {
  //   errors.firstname = 'Firstname is required';
  // }
  // if (!lastname || lastname.trim() === '') {
  //   errors.lastname = 'Lastname is required';
  // }
  if (!username || username.trim() === '') {
    errors.username = 'Username is required';
  }
  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }
  if (!confirmPassword || confirmPassword.trim() === '') {
    errors.confirmPassword = 'Confirm Password is required';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords donot match';
  }

  if (Object.keys(errors).length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: errors });
  }
  return next();
};

const validateLogin = (req, res, next) => {
  const errors = {};
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: errors });
  }
  return next();
};

const validateDatabaseToken = async (req, _res, next) => {
  console.log(JSON.stringify(req.cookies));
  const { token } = req.cookies;

  const user = await User.findOne({ token });
  console.log({ user });
  req.token = user.token;
  req.user = user;
  next();
};

module.exports = {
  errorHandler,
  verifyToken,
  validateRegister,
  validateLogin,
  validateDatabaseToken,
};
