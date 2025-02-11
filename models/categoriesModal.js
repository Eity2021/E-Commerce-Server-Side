const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
});

const categoriesModal =
  mongoose.models.categories || mongoose.model("categories", categoriesSchema);
module.exports = categoriesModal;
