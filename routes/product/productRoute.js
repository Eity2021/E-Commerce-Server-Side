const express = require("express");
const {
  addProduct,
  productList,
  removeProduct,
  singleProduct,
  updateProduct,
} = require("../../controllers/product/productController");
// const  upload = require('../../middleware/multer');

const { multipleUpload } = require("../../middleware/multer");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

const productRouter = express.Router();

productRouter.post("/add", adminAuthMiddleware,multipleUpload, addProduct);
productRouter.delete("/remove/:id",adminAuthMiddleware, removeProduct);
productRouter.get("/singleProduct/:id", singleProduct);
productRouter.get("/productsList", productList);
productRouter.put("/updateProduct/:id", adminAuthMiddleware ,multipleUpload ,updateProduct);

module.exports = productRouter;
