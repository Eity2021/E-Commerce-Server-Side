const express = require("express");
const { singleUpload } = require("../../middleware/multer");
const {
  addCategories,
  deleteCategory,
  perCategoryId,
  updateCategoryPerId,
  categoryList,
} = require("../../controllers/categories/categoriesController");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

const categoriesRouter = express.Router();

categoriesRouter.post(
  "/addCategories",
  adminAuthMiddleware,
  singleUpload,
  addCategories
);
categoriesRouter.get("/categoriesList", categoryList);
categoriesRouter.delete("/delete/:id", adminAuthMiddleware, deleteCategory);
categoriesRouter.get("/category/:id", perCategoryId);
categoriesRouter.put(
  "/updateCategory/:id",
  adminAuthMiddleware,
  singleUpload,
  updateCategoryPerId
);

module.exports = categoriesRouter;
