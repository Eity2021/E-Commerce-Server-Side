const subCategoriesModel = require("../../models/subCategoriesModal");

const addSubCategories = async (req, res) => {
  try {
    const { category_id, subCategory_name } = req.body;

    const subCategoriesImage = req?.file?.filename;
    const subCategoriesData = {
      category_id,
      subCategory_name,
      subCategories_image: subCategoriesImage,
    };
    console.log("subCategoriesData", subCategoriesData);
    const subcategories = subCategoriesModel(subCategoriesData);
    await subcategories.save();
    res.json({
      code: 200,
      success: true,
      message: "Successfully! Added subCategory",
    });
  } catch (error) {
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};
const SubCategoriesList = async (req,res) => {
  try {
    const subcategories = await subCategoriesModel.find().populate("category_id");

    res.json({
      code: 200,
      success: true,
      subcategories,
    });
  } catch (error) {
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};
const deleteSubCategories = async (res, req) => {};
const perSubCategories = async (res, req) => {};
const updateSubCategories = async (res, req) => {};

module.exports = {
  addSubCategories,
  SubCategoriesList,
  deleteSubCategories,
  perSubCategories,
  updateSubCategories,
};
