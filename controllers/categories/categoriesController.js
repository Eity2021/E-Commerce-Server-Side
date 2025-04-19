const categoriesModel = require("../../models/categoriesModel");
const subCategoriesModel = require("../../models/subCategoriesModel");
const uploadImageFile = require("../../utils/cloudinary");

const addCategories = async (req, res) => {
  try {
    const { category_name, color } = req.body;


    let imageCat = "";
    imageCat = req?.file;
    const image = await uploadImageFile(imageCat.path);
    const categoriesImage = image.url;
    // const categoriesImage = req?.file?.filename;

    const categoriesData = {
      category_name,
      color,
      categories_image: categoriesImage,
    };
    const categories = await categoriesModel(categoriesData);
    await categories.save();
    res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully! Added Category",
      data: categories,
    });

    if (!categories) {
      return res.json({
        code: 404,
        success: false,
        message: "The category cannot be created",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const categoryList = async (req, res) => {
  try {
    const categories = await categoriesModel.find().lean();

    const categoriesList = await Promise.all(
      categories.map(async (category) => {
        const subCategories = await subCategoriesModel
          .find({ category_id: category._id })
          .select("subCategory_name subCategories_image");
        return { ...category, subCategories };
      })
    );
    res.json({
      code: 200,
      success: true,
      categoriesList,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const perCategoryId = async (req, res) => {
  try {
    const perCategory = await categoriesModel.findById(req.params.id);
    if (!perCategory) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Category not found",
      });
    }

    const subCategories = await subCategoriesModel
      .find({ category_id: perCategory._id })
      .select("subCategory_name subCategories_image");

    res.json({
      code: 200,
      success: true,
      perCategory: {
        _id: perCategory._id,
        category_name: perCategory.category_name,
        subCategories,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const updateCategoryPerId = async (req, res) => {
  try {
    const { category_name, color } = req.body;
    const categoriesImage = req?.file?.filename;

    const existingCategory = await categoriesModel.findById(req.params.id);

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
    };

    const updateCategory = await categoriesModel.findByIdAndUpdate(
      req.params.id,
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

    res.status(201).json({
      code: 201,
      success: true,
      message: "Successfully! update Category",
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    await categoriesModel.findOneAndDelete(req.params.id);
    res.json({
      code: 200,
      success: true,
      message: "category delete successfully!",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCategories,
  deleteCategory,
  perCategoryId,
  updateCategoryPerId,
  categoryList,
};
