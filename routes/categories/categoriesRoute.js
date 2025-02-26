const express = require('express');
const  {singleUpload} = require('../../middleware/multer');
const { addCategories,deleteCategory ,perCategoryId ,updateCategoryPerId ,categoryList} = require('../../controllers/categories/categoriesController');


const categoriesRouter = express.Router();

categoriesRouter.post("/addCategories"  ,singleUpload , addCategories);
categoriesRouter.get("/categoriesList"  ,categoryList);
categoriesRouter.delete("/delete/:id" ,deleteCategory );
 categoriesRouter.get("/category/:id" , perCategoryId);
categoriesRouter.put("/updateCategory/:id" ,singleUpload , updateCategoryPerId);

 
module.exports = categoriesRouter;