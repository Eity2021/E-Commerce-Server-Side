const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // If the user is not logged in, handle the cart on the frontend
    if (!req.user) {
      return res
        .status(200)
        .json({ message: "Guest user: store cart in localStorage" });
    }

    const userId = req.user.id;

    // Validate product ID
    if (!productId) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    let cartItem = await cartModel.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new cartModel({ productId, userId, quantity: quantity || 1 });
      await cartItem.save();
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Product added to cart",
      cartItem,
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
    if (!req.user) {
      // If not logged in, return guest cart
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      return res.status(200).json({ cartItems: guestCart });
    }

    const userId = req.user.id;

    const cartItems = await cartModel
      .find({ userId })
      .populate({ path: "productId", model: "product" })
      .sort({ createdAt: -1 });

    res.status(200).json({ cartItems });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

module.exports = { addToCart, cartList };
