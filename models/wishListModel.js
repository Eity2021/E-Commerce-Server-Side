const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const wishListModel = mongoose.models.wishList || mongoose.model("wishList", wishListSchema);
module.exports = wishListModel;
