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

const updateAddress = async (req, res) => {
  const id = req.user;
  const { phoneNumber, addressLine, state, pin } = req.body;

  let address = await Address.find({ userId: id });
  if (!address) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  address = {
    ...address,
    phoneNumber,
    addressLine,
    state,
    pin,
  };

  await address.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Address updated successfully' });
};

const deleteAddress = async (req, res) => {
  const id = req.user;
  const address = await Address.find({ userId: id });

  if (!address) {
    return res.status(StatusCodes.OK).json({ error: 'No address found!' });
  }

  await address.delete();
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Address deleted successfully' });
};

module.exports = { getAllAddress, updateAddress, deleteAddress };
