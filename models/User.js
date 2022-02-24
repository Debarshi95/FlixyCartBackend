const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    lastname: {
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
    cartItems: [
      {
        type: Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
