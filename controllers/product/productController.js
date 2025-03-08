const productModel = require("../../models/productModel");
const categoriesModel = require("../../models/categoriesModel");
const subCategoriesModel = require("../../models/subCategoriesModel");

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
      newProduct,
      onSale,
      bestSelling,
      rating,
      tags,
      views,
      countInStock,
    } = req.body;
    const userIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const category = await categoriesModel.findById(req.body.category);

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
      newProduct,
      onSale,
      bestSelling,
      rating,
      countInStock,
      tags,
      views,
      viewedBy: [userIp],
      popular: popular == "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: arrImages,
      date: Date.now(),
    };

    const products = productModel(productData);
    await products.save();

    const updatedProduct = await productModel.findByIdAndUpdate(
      products._id,
      { $inc: { views: 1 } }, // Increase views by 1
      { new: true } // Return updated product
    );

    res.json({
      code: 200,
      success: true,
      message: "Successfully! Added Product",
      updatedProduct,
    });
  } catch (error) {
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
    res.json({
      code: 200,
      success: true,
      message: "removed product",
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
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

    if (!existingProduct) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "product not found",
      });
    }

    const productData = {
      name: name,
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

    const updateProductList = await productModel.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    if (!updateProductList) {
      return res.status(400).json({
        code: 400,
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
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const getFilteredProducts = async (req, res) => {
  try {
    const {
      bestSelling,
      featured,
      onSale,
      newProduct,
      category,
      priceMin,
      priceMax,
      search,
      sortBy,
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;
    console.log("Received Query Params:", req.query);
    let filter = {};
    console.log("Filter applied:", filter);

    if (bestSelling) filter.bestSelling = bestSelling === "true";
    if (featured) filter.inFeatured = featured === "true";
    if (onSale) filter.onSale = onSale === "true";
    if (newProduct) filter.newProduct = newProduct === "true";
    if (category) filter.category = category;
    if (priceMin)
      filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    if (priceMax)
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };

    //  Search by product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Sorting logic
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    } else {
      sortOptions.date = -1; // Default sorting by newest
    }

    //  Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch filtered products with pagination & sorting
    const products = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    //  Get total count of matching products
    const totalProducts = await productModel.countDocuments(filter);

    res.json({
      totalProducts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID
    const currentProduct = await productModel.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find related products (same category OR matching tags)
    const relatedProducts = await productModel
      .find({
        _id: { $ne: productId },
        $or: [
          { category: currentProduct.category },
          { tags: { $in: currentProduct.tags } },
        ],
      })
      .limit(5);

    res.status(200).json({
      code: 200,
      success: true,
      message: "related product fetched",
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecommendedProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const currentProduct = await productModel.findById(productId);
    if (!currentProduct) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "product not found",
      });
    }

    const recommendProducts = await productModel
      .find({
        _id: { $ne: productId }, // Exclude the current product
        $or: [
          { category: currentProduct.category },
          { tags: { $in: currentProduct.tags } }, // Matching tags
        ],
      })
      .sort({ views: -1 })
      .limit(5);

    res.status(200).json({
      code: 200,
      success: true,
      message: "recommend product list",
      recommendProducts
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
  productList,
  addProduct,
  singleProduct,
  removeProduct,
  updateProduct,
  getFilteredProducts,
  getRelatedProducts,
  getRecommendedProduct,
};
