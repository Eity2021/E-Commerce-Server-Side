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
    min: 0, 
    max: 5   
  },
  inFeatured: {
    type: Boolean,
    default: false,
  },
  bestSelling: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false },
  newProduct: { type: Boolean, default: false },

  numberReview: {
    type: Number,
    default: 0,
  },
  sizes: { type: Array, required: true },
  popular: { type: Boolean },
  date: { type: Date, required: true },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  viewedBy: [String],
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 5;
}
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
module.exports = productModel;
