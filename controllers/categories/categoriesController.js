const categoriesModel = require("../../models/categoriesModel");




const addCategories = async (req, res) => {
    try{
        const {category_name, color } = req.body;

        const categoriesImage = req.file.filename;
 
     const categoriesData = {
        category_name,
        color,
        categories_image:categoriesImage
     }



     const categories =  categoriesModel(categoriesData)
     await  categories.save();
    res.json({
        code:200,
        success:true,
        message:"Successfully! Added Category"
    })



    } catch(error){
    
        console.log(error);
          res.json({
          code: 400,
          success: false,
          message: error.message,
        });
    }
}



module.exports = {addCategories}