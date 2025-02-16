const express = require('express');
const  {subSingleUpload} = require('../../middleware/multer');
const { addSubCategories, SubCategoriesList, deleteSubCategories, perSubCategories, updateSubCategories } = require('../../controllers/subCategories/subCategoriesController');



const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/addSubCategories"  ,subSingleUpload , addSubCategories);
subCategoriesRouter.get("/subCategoriesList"  ,SubCategoriesList);
subCategoriesRouter.delete("/subDelete/:id" ,deleteSubCategories );
 subCategoriesRouter.get("/subCategory/:id" , perSubCategories);
subCategoriesRouter.put("/updateSubCategory/:id" , updateSubCategories);
 
module.exports = subCategoriesRouter;