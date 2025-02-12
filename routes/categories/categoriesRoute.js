const express = require('express');
const  {singleUpload} = require('../../middleware/multer');
const { addCategories } = require('../../controllers/categories/categoriesController');


const categoriesRouter = express.Router();

categoriesRouter.post("/addCategories"  ,singleUpload , addCategories);
// categoriesRouter.post("/remove" , removeProduct);

// categoriesRouter.get("/singleProduct/:id" , singleProduct);
// categoriesRouter.get("/productsList" , productList);
 
module.exports = categoriesRouter;