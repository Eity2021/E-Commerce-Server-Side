const uploadImageFile = require("../../utils/cloudinary");
const productModel = require("../../models/productModel");
const subCategoriesModel = require("../../models/subCategoriesModel");

const addSubCategories = async (req, res) => {
  try {
    const { category_id, subCategory_name } = req.body;

    let imageSubCat = "";
    imageSubCat = req?.file;
    const image = await uploadImageFile(imageSubCat.path);
    const subCategoriesImage = image.url;

    const subCategoriesData = {
      category_id,
      subCategory_name,
      subCategories_image: subCategoriesImage,
    };
    const subcategories = await subCategoriesModel(subCategoriesData);
    await subcategories.save();
    res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully! Added subCategory",
      data: subcategories,
    });
  } catch (error) {
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};
const SubCategoriesList = async (req, res) => {
  try {
    const subcategories = await subCategoriesModel
      .find()
      .populate("category_id");

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
const deleteSubCategories = async (req, res) => {
  try {
    const deleteSubCategory = await subCategoriesModel.findByIdAndDelete(
      req.params.id
    );

    if (!deleteSubCategory) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "subcategory remove Successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const updateSubCategories = async (req, res) => {
  try {
    const { subCategory_name } = req.body;

    const subCategoriesImage = req?.file?.filename;

    const existingSubcategory = await subCategoriesModel.findById(
      req.params.id
    );

    if (!existingSubcategory) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "subcategory not found",
        // message:"Update subcategory successfully"
      });
    }

    const subcategoryData = {
      subCategory_name,
      subCategories_image: subCategoriesImage,
    };

    const updateSubcategory = await subCategoriesModel.findByIdAndUpdate(
      req.params.id,
      subcategoryData,
      { new: true }
    );

    if (!updateSubcategory) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Failed to update Product",
      });
    }

    res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully! update subcategory",
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const subCategoryWithProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel
      .find({ subCategory: id })
      .populate("subCategory");

    return res.status(200).json({
      code: 200,
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(400).json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addSubCategories,
  SubCategoriesList,
  deleteSubCategories,
  updateSubCategories,
  subCategoryWithProduct,
};
