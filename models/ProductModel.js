const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true ,validate:[arrayLimit, "You can pass only 5 product images"] },
  category: { type: String, required: true},
  subcategory: { type: String, required: true},
  sizes: { type: Array, required: true },
  popular: { type: Boolean},
  date: { type: Number, required: true  },
});

function arrayLimit(val){
return val.length <=5;
 }
const productModal =mongoose.models.product || mongoose.model("product", productSchema);
module.exports = productModal;
