const categoriesModel = require("../../models/categoriesModel");

const addCategories = async (req, res) => {
  try {
    const { category_name, color } = req.body;

    const categoriesImage = req?.file?.filename;

    const categoriesData = {
      category_name,
      color,
      categories_image: categoriesImage,
    };
    console.log("categoriesData", categoriesData);
    const categories = categoriesModel(categoriesData);
    await categories.save();
    res.json({
      code: 200,
      success: true,
      message: "Successfully! Added Category",
    });

    if (!categories) {
      return res.json({
        code: 404,
        success: false,
        message: "The category cannot be created",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};
const categoryList = async(req,res) => {
    try{

        const categoriesList = await categoriesModel.find({});
        res.json({
            code:200,
            success:true,
            categoriesList
        })

    }catch(error){
        res.json({
            code: 400,
            success: false,
            message: error.message,
          });
    }
}
const perCategoryId = async (req,res) => {
    try{
   const perCategory= await categoriesModel.findById(req.params.id);
    res.json({
        code:200,
        success:true,
        perCategory
    })

    } catch (error) {
        res.json({
            code: 400,
            success: false,
            message: error.message,
          });
    }
}

const updateCategoryPerId = async (req,res) => {

try{
    const { category_name, color } = req.body;
    const categoriesImage = req?.file?.filename;


    const existingCategory  = await categoriesModel.findById(req.params.id);

    if (!existingCategory) {
        return res.status(404).json({
          code: 404,
          success: false,
          message: "Category not found",
        });
      }

      const categoriesData = {
        category_name,
        color,
        categories_image: categoriesImage || existingCategory.categories_image, 
      }
    
      var updateCategory = await categoriesModel.findByIdAndUpdate(req.params.id,
        categoriesData,
        { new: true }
      );
      
        if (!updateCategory) {
            return res.status(400).json({
              code: 400,
              success: false,
              message: "Failed to update category",
            });
          }
      
    res.json({
        code: 200,
        success: true,
        message: "Successfully! update Category",
        data:updateCategory
      });


}catch(error) {
    res.json({
        code: 400,
        success: false,
        message: error.message,
      });
}



}
const deleteCategory = async (req, res) => {
  try {
    await categoriesModel.findOneAndDelete(req.params.id);
    res.json({
      code: 200,
      success: true,
      message: "category delete successfully!",
    });
  } catch (error) {
    res.json({
        code: 400,
        success: false,
        message: error.message,
      });
  }
};

module.exports = { addCategories, deleteCategory,perCategoryId ,updateCategoryPerId ,categoryList};
