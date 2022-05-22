const { Schema, model, Types } = require('mongoose');

const addressSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = model('Address', addressSchema);
