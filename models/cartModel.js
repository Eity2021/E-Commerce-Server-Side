const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    products: [ {

        product: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 0,
        },

      } ],

    totalAmount: Number,
  
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);
module.exports = cartModel;


