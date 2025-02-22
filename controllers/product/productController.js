const productModel = require("../../models/productModel");
const categoriesModel = require("../../models/categoriesModel");
const subCategoriesModel = require("../../models/subCategoriesModel");
const productModal = require("../../models/productModel");
const productList = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ code: 200, success: true, products });

    if (!products) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "Product not found",
      });
    } 
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      popular,
      numberReview,
      inFeatured,
      rating,
      countInStock,
    } = req.body;

    const category = await categoriesModel.findById(req.body.category);
    // console.log(category);
    if (!category) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Category not found",
      });
    }

    const subCategories = await subCategoriesModel
      .find({ category_id: category._id })
      .select("subCategory_name subCategories_image");

    const categoryWithSubcategories = {
      _id: category._id,
      category_name: category.category_name,
      subCategories,
    };

    var arrImages = req?.files?.map((file) => file?.filename);
    const productData = {
      name,
      description,
      price: Number(price),
      category: categoryWithSubcategories,
      numberReview,
      inFeatured,
      rating,
      countInStock,
      popular: popular == "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: arrImages,
      date: Date.now(),
    };

    console.log(productData);

    const products = productModel(productData);
    await products.save();

    res.json({
      code: 200,
      success: true,
      message: "Successfully! Added Product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const singleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category", "_id category_name");

    if (!product) {
      return res.json({
        code: 404,
        success: false,
        message: "Product not found",
      });
    }

    const subCategories = await subCategoriesModel
      .find({ category_id: product.category._id })
      .select("subCategory_name subCategories_image");

    res.json({
      code: 200,
      success: true,
      product: {
        ...product.toObject(),
        category: {
          ...product.category.toObject(),
          subCategories,
        },
      },
      // product,
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findOneAndDelete(req.params.id);
    res.json({ code: 200, success: true, message: "removed product" });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req,res) => {
  try{
    const {
      name,
      description,
      price,
      sizes,
      popular,
      category,
      numberReview,
      inFeatured,
      rating,
      countInStock,
    } = req.body;
    const existingImages = req?.files?.map((file) => file?.filename || []);


    const existingProduct = await productModel.findById(req.params.id);
    console.log("existingProduct", existingProduct);


    if (!existingProduct) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "product not found",
      });
    }

    const productData = {
      name : name,
      description,
      price: Number(price),
      category,
      numberReview,
      inFeatured,
      rating,
      countInStock,
      popular: popular == "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: existingImages,
      date: Date.now(),
    };

  console.log("productData", productData);

const updateProductList = await productModel.findByIdAndUpdate(
  req.params.id,
  productData,
  {new:true}

);
console.log("updateProductList", updateProductList);
if (!updateProductList) {
  return res.status(500).json({
    code: 500,
    success: false,
    message: "Failed to update Product",
  });
}

res.json({
  code: 200,
  success: true,
  message: "Successfully! update Product",
  data: updateProductList,
});

  }catch(error){
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
}
module.exports = { productList, addProduct, singleProduct, removeProduct,updateProduct };
