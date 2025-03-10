const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
    admin_image: {
      type: String,
      // required: true,
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v); 
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ "customer","customer"],
      default: "admin",
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

const adminModel = mongoose.models.admins || mongoose.model("admins", adminSchema);
module.exports = adminModel;
