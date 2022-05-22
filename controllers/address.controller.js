const { StatusCodes } = require('http-status-codes');
const Address = require('../models/Address');

const getAllAddress = async (req, res) => {
  const id = req.user;
  const addressList = await Address.find({ userId: id });

  if (addressList.length <= 0) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  return res.status(StatusCodes.OK).json({ result: [...addressList] });
};

const createAddress = async (req, res) => {
  const id = req.user;
  const { phoneNumber, addressLine, state, pin, fullname } = req.body;

  if (!phoneNumber || !addressLine || !state || !pin) {
    return res.status(StatusCodes.OK).json({ error: 'Complete address data not provided' });
  }

  const newAddress = new Address({
    fullname,
    phoneNumber,
    addressLine,
    state,
    pin,
    userId: id,
  });

  await newAddress.save();

  return res
    .status(StatusCodes.OK)
    .json({
      message: 'Address added successfully',
      result: newAddress,
    });
};

const updateAddress = async (req, res) => {
  const id = req.user;
  const { phoneNumber, addressLine, state, pin, fullname } = req.body;
  const { addressId } = req.params;

  const address = await Address.findOne({ $and: [{ id: addressId }, { userId: id }] });

  if (!address) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  address.fullname = fullname;
  address.phoneNumber = phoneNumber;
  address.addressLine = addressLine;
  address.state = state;
  address.pin = pin;

  await address.save();

  return res
    .status(StatusCodes.OK)
    .json({
      message: 'Address updated successfully',
      result: address,
    });
};

const deleteAddress = async (req, res) => {
  const id = req.user;
  const { addressId } = req.params;
  const address = await Address.findOne({ $and: [{ id: addressId }, { userId: id }] });

  if (!address) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  await address.delete();
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Address deleted successfully' });
};

module.exports = { getAllAddress, updateAddress, deleteAddress, createAddress };
