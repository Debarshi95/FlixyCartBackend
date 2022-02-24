const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { SECRET } = require('../utils/config');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'User not registered' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Invalid email or password' });
  }

  const tokenPayload = {
    id: user._id,
  };
  const token = jwt.sign(tokenPayload, SECRET, {
    expiresIn: '7d',
  });

  return res.status(StatusCodes.OK).json({
    token,
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'User already registered with the email or username' });
  }

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: passwordHash,
  });

  const savedUser = await newUser.save();

  const tokenPayload = {
    id: savedUser._id,
  };
  const token = jwt.sign(tokenPayload, SECRET, {
    expiresIn: '7d',
  });

  return res.status(StatusCodes.OK).json({
    token,
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
  });
};
module.exports = {
  loginUser,
  registerUser,
};
