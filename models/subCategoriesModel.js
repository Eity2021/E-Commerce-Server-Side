const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subCategory_name: {
      type: String,
      required: true,
    },

    subCategories_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const subCategoriesModel =
  mongoose.models.subCategories ||
  mongoose.model("subCategories", subCategoriesSchema);
module.exports = subCategoriesModel;
