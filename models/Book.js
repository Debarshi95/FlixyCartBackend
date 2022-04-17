const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    categories: {
      type: Array,
    },
    description: {
      type: String,

    },
    inStock: {
      type: Boolean,
      default: true,
    },
    fastDelivery: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Book', bookSchema);
