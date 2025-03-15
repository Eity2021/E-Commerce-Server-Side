const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    products: [
      {
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
      },
    ],

    totalAmount: Number,

    paymentMethod: {
    type: String,
    enum : ['COD', 'SSLCommerz'],
    default: 'COD'

    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    zipCode: {
      type: Number,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    }, 
    status: {
      type: String,
     enum:['initiated','pending', 'processing', 'complete', 'cancel'],
     default:'initiated'
    }, 
  },

  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
module.exports = orderModel;
