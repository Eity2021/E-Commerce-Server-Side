const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },

    addedAt: {
        type: Date,
        default: Date.now,
      },
  },
  {
    timestamps: true,
  }
);

const wishListModel = mongoose.models.wishList || mongoose.model("wishList", wishListSchema);
module.exports = wishListModel;
