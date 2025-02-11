const express = require('express');
const { addProduct, productList, removeProduct, singleProduct } = require("../../controllers/product/productController");
const  upload = require('../../middleware/multer');


const productRouter = express.Router();

productRouter.post("/add"  , upload.array('image') ,addProduct);
productRouter.post("/remove" , removeProduct);

productRouter.get("/singleProduct/:id" , singleProduct);
productRouter.get("/productsList" , productList);
 
module.exports = productRouter;