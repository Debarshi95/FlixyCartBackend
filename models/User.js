const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Types.ObjectId,
      ref: 'Book',
    },

    address: [
      {
        type: Types.ObjectId,
        ref: 'Address',
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
