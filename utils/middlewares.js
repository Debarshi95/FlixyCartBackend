const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, _, res, next) => {
  console.error({ error });
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'Malformatted ID.' });
  }
  if (error.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'Invalid token.' });
  }
  res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });

  return next(error);
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'No auth token found. Authorization denied.' });
    }

    const decodedToken = await jwt.verify(token);

    if (!decodedToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Token verification failed. Authorization denied.' });
    }

    req.user = decodedToken.id;

    return next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const validateRegister = async (req, res, next) => {
  const errors = {};
  const { firstname, lastname, username, email, password, confirmPassword } = req.body;

  if (!firstname || firstname.trim() === '') {
    errors.firstname = 'Firstname is required';
  }
  if (!lastname || lastname.trim() === '') {
    errors.lastname = 'Lastname is required';
  }
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
    errors.password = 'Passwords donot match';
  }

  if (Object.keys(errors).length) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
  }
  return next();
};

const validateLogin = (req, res, next) => {
  const errors = {};
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    errors.username = 'Email is required';
  }

  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
  }
  return next();
};

module.exports = { errorHandler, verifyToken, validateRegister, validateLogin };
