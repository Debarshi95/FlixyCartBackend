const { Schema, model, Types } = require('mongoose');

const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User' },
    products: [
      {
        type: Types.ObjectId,
        ref: 'Book',
        quantity: Number,
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    address: [{ type: Types.ObjectId, ref: 'Address' }],
  },
  { timestamps: true },
);

module.exports = model('Cart', cartSchema);
