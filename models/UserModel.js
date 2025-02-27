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
      enum: ["admin", "customer"],
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
