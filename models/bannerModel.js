const mongoose = require("mongoose");

const mainBannerSchema = new mongoose.Schema({

    mainBanner: {
        type: Array,
        required: true,
        validate: [arrayLimit, "You can pass only 15 product images"],
      },

}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 15;
  }


const mainBannerModel =mongoose.models.mainBanner || mongoose.model("mainBanner", mainBannerSchema);
module.exports = mainBannerModel;
