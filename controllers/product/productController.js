const productModel = require("../../models/productModel");

const productList = async (req, res) => {
  try {
    const products = await productModal.find({});
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
    const { name, description, price, category, subcategory, sizes, popular } =
      req.body;

    var arrImages = req.files.map(file => file.filename);

    // for (let i = 0; i < req.files.length; i++) {
    //   arrImages[i] = req.files[i].filename;
    // }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      popular: popular == "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: arrImages,
      date: Date.now(),
    };

    console.log(productData);

    const product = productModel(productData);
    await product.save();

    res.json({
      code: 200,
      success: true,
      message: "Successfully! Added Product",
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
  try{
  const {id} = req.params;

  const product = await productModal.findById(id);

    res.json({
      code:200, 
      success: true,
      product
    })

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
    await productModal.findOneAndDelete(req.body.id);
    res.json({code:200, success: true, message: "Product Removed" });
  } catch (error) {
    res.json({
      code: 400,
      success: false,
      message: error.message,
    });
  }
};

module.exports = { productList, addProduct, singleProduct, removeProduct };
