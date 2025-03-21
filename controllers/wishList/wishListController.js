const productModel = require("../../models/productWModel");
const wishListModel = require("../../models/wishListModel");

const addToWishList = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Invalid product ID",
      });
    }
    const productInfo = await productModel.findById(productId);

    if (!productInfo) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Invalid product ID",
      });
    }
    if (!userId) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "user not found",
      });
    }

    const pricePerQuantity = productInfo.price;
    const price = quantity * pricePerQuantity;

    let wishListItem = await wishListModel.findOne({ user: userId });

    if (!wishListItem) {
      wishListItem = new wishListModel({
        user: userId,
        products: [],
      });
    }

    const productExistIndex = wishListItem.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (productExistIndex > -1) {
      wishListItem.products[productExistIndex].quantity = quantity;
      wishListItem.products[productExistIndex].price = price;
    } else {
      wishListItem.products.push({ product: productId, quantity, price });
    }

    const wishListInfo = await wishListItem.save();

    res.status(200).json({
      code: 200,
      success: true,
      message: "Product added to wishlist",
      wishListInfo,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const wishLists = async (req, res) => {
  try {
    // const userCheck = req?.user;

    // if (!userCheck) {
    //   const guestWishList =
    //     JSON.parse(localStorage.getItem("guestWishList")) || [];
    //   return res.status(200).json({
    //     code: 200,
    //     success: false,
    //     wishListItems: guestWishList,
    //   });
    // }

    const userId = req?.user?.id;

    const listItems = await wishListModel
      .findOne({ user: userId })
      .populate("products.product");

    res.status(200).json({
      code: 200,
      success: true,
      message: "wishList Fetched",
      data: listItems,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteWishList = async (req,res) => {

  const userId = req.user.id;
  const productId = req.params.productId;
  const wishListInfo = await wishListModel.findOne({user:userId});

      if (!wishListInfo) {
        res.status(400).json({
          code: 400,
          success: true,
          message: "wishlist not found",
        });
      }
      if (!productId) {
        res.status(400).json({
          code: 400,
          success: true,
          message: "product not found",
        });
      }

     wishListInfo.products.find((item) => item.product.equals(productId));
  
     await wishListModel.findOneAndUpdate(
      {user : userId},
      {
        $pull : {products : {product : productId}}
      }
     )

     res.status(200).json({
      code: 200,
      success: true,
      message: "successfully removed wishList  ",
    });



}
module.exports = { addToWishList, wishLists ,deleteWishList};
