const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category_name: { 
    type: String, 
    required: true 
  },

  color: {
    type: String,
  },
  categories_image: {
    type: String,
    required: true,
  },
});

const categoriesModel =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);
module.exports = categoriesModel;
