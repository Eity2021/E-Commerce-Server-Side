const express = require("express");
const { subSingleUpload } = require("../../middleware/multer");
const {
  addSubCategories,
  SubCategoriesList,
  deleteSubCategories,
  updateSubCategories,
} = require("../../controllers/subCategories/subCategoriesController");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post(
  "/addSubCategories",
  subSingleUpload,
  addSubCategories
);
subCategoriesRouter.get("/subCategoriesList", SubCategoriesList);
subCategoriesRouter.delete("/subCategoryDelete/:id", deleteSubCategories);

subCategoriesRouter.put(
  "/updateSubCategory/:id",
  subSingleUpload,
  updateSubCategories
);

module.exports = subCategoriesRouter;
