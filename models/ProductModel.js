import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  price: { type: Number, required: true, unique: true },
  image: { type: Array, required: true, unique: true },
  category: { type: String, required: true, unique: true },
  subCategory: { type: String, required: true, unique: true },
  sizes: { type: Array, required: true, unique: true },
  popular: { type: Boolean, unique: true },
  data: { type: Number, unique: true },
});

const productModal =
  mongoose.models.product || mongoose.model("product", productSchema);
module.exports = productModal;
