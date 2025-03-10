const mongoose = require("mongoose");

const middleBannerSchema = new mongoose.Schema({

    middleBanner: {
        type: Array,
        required: true,
        validate: [arrayLimit, "You can pass only 15 product images"],
      },

}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 15;
  }


const middleBannerModel =mongoose.models.middleBanner || mongoose.model("middleBanner", middleBannerSchema);
module.exports = middleBannerModel;
