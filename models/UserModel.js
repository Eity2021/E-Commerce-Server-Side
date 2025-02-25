const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    cartData: {
      type: Object,
      default: {},
    },

  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = userModal;
