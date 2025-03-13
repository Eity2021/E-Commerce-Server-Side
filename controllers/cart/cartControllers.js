const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productInfo = await productModel.findById(productId);

    if (!productInfo) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!userId) {
      return res.status(200).json({ message: "Not found user" });
    }

    const pricePerQuantity = productInfo.price;
    const price = quantity * pricePerQuantity;

    let cartItem = await cartModel.findOne({ user: userId });

    if (!cartItem) {
      cartItem = new cartModel({
        user: userId,
        products: [],
        totalAmount: 0,
      });
    }

    const productExistIndex = cartItem.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (productExistIndex > -1) {
      cartItem.products[productExistIndex].quantity = quantity;
      cartItem.products[productExistIndex].price = price;
    } else {
      cartItem.products.push({ product: productId, quantity, price });
    }

    const totalAmount = cartItem.products.reduce(
      (total, item) => total + item.price,
      0
    );

    cartItem.totalAmount = totalAmount;

    const cartInfo = await cartItem.save();

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Product added to cart",
      cartInfo,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
const cartList = async (req, res) => {
  try {
  
    const userId = req.user.id;

   const cartItems = await cartModel.findOne({ user : userId});

   res.status(200) .json({ 
        code: 200, 
        success: true, 
        message: "cart Items fetched",
        data:cartItems
       });


  } catch (error) {
    res
      .status(500) .json({ 
        code: 500, 
        success: false, 
        message: "Internal Server Error" });
  }
};

module.exports = { addToCart, cartList };
