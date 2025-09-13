const express = require("express");
const { subSingleUpload } = require("../../middleware/multer");
const {
  addSubCategories,
  SubCategoriesList,
  deleteSubCategories,
  updateSubCategories,
} = require("../../controllers/subCategories/subCategoriesController");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post(
  "/addSubCategories",
  adminAuthMiddleware,
  subSingleUpload,
  addSubCategories
);
subCategoriesRouter.get("/subCategoriesList", SubCategoriesList);
subCategoriesRouter.delete("/subCategoryDelete/:id", adminAuthMiddleware,deleteSubCategories);
subCategoriesRouter.put(
  "/updateSubCategory/:id",
  adminAuthMiddleware,
  subSingleUpload,
  updateSubCategories
);

module.exports = subCategoriesRouter;
