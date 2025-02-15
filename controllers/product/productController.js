const productModel = require("../../models/productModel");
const categoriesModel = require("../../models/categoriesModel");
const productList = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ code: 200, success: true, products });
  } catch (error) {
    res.json({
      code: 400,
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

    if (!category) return res.status(404).send("Invalid category");

    var arrImages = req.files.map((file) => file.filename);
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      // subcategory,
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
      products
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};
const singleProduct = async (req, res) => {
  try {

    const product = await productModel.findById(req.params.id).populate('category') ;

    res.json({
      code: 200,
      success: true,
      product,
    });
  } catch (error) {
    res.json({
      code: 400,
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
      code: 400,
      success: false,
      message: error.message,
    });
  }
};

module.exports = { productList, addProduct, singleProduct, removeProduct };
