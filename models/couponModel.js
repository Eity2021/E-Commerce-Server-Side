const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
      },
      discountType: {
        type: String,
        enum: ["fixed", "percentage"],
        required: true,
      },
      discountValue: {
        type: Number,
        required: true,
      },
      minOrderAmount: {
        type: Number,
        default: 0,
      },
      maxDiscount: {
        type: Number,
        default: null, 
      },
      expirationDate: {
        type: Date,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    });
const couponModel =
mongoose.models.coupon || mongoose.model("coupon", couponSchema);
module.exports = couponModel;
