const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  // icon:{
  //   type:String
  // },
  color: {
    type: String,
  },
  categories_image: {
    type: String,
    required: true,
    // validate: [arrayLimit, "You can pass only 5 product images"],
  },
});
// function arrayLimit(val){
//   return val.length 1;
//    }
const categoriesModel =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);
module.exports = categoriesModel;
