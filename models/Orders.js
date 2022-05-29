const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    products: [
      {
        bookId: { type: Types.ObjectId, ref: 'Book' },
        quantity: Number,
      },
    ],
    address: [{ type: Types.ObjectId, ref: 'Address' }],
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Order', orderSchema);
