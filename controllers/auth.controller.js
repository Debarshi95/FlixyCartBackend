const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { SECRET } = require('../utils/config');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'User not registered' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: 'Invalid email or password' });
  }

  const tokenPayload = {
    id: user._id,
  };

  const token = await jwt.sign(tokenPayload, SECRET, {
    expiresIn: '7d',
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    id: user._id,
    email: user.email,
    username: user.username,
    token,
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: 'User already registered' });
  }

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    username,
    email,
    password: passwordHash,
  });

  const savedUser = await newUser.save();

  const tokenPayload = {
    id: savedUser._id,
  };
  const token = await jwt.sign(tokenPayload, SECRET, {
    expiresIn: '7d',
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    id: savedUser._id,
    email: savedUser.email,
    username: savedUser.username,
    token,
  });
};

module.exports = {
  loginUser,
  registerUser,
};
