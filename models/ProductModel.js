const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  image: {
    type: Array,
    required: true,
    validate: [arrayLimit, "You can pass only 5 product images"],
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },

  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 500,
  },
  rating: {
    type: Number,
    required: true,
  },
  inFeatured: {
    type: Boolean,
    default: false,
    required: true,
  },
  numberReview: {
    type: Number,
    default: 0,
  },
  sizes: { type: Array, required: true },
  popular: { type: Boolean },
  date: { type: Date, required: true },
});

function arrayLimit(val) {
  return val.length <= 5;
}
const productModal =
  mongoose.models.product || mongoose.model("product", productSchema);
module.exports = productModal;
