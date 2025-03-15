const cartModel = require("../../models/cartModel");
const orderModel = require("../../models/orderModel");

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartInfo = await cartModel.findOne({ user: userId });
    if (!cartInfo) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "not product  on cart",
      });
    }
    const products = cartInfo.products;
    const totalAmount = cartInfo.totalAmount;

    const checkOutInfo = ({
      paymentMethod,
      firstName,
      lastName,
      country,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
    } = req.body);

    const order = await orderModel.create({
      user: userId,
      products,
      totalAmount,
      checkOutInfo,
    });

    res.status(200).json({
      code: 200,
      success: true,
      message: "order initiated",
      data: { orderId: order.id },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const confirmCheckout = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { orderId } = req.params;

    const orderInfo = await orderModel.findOne({
      _id: orderId,
      user: userId,
      status: "initiated",
    });

    if (!orderInfo) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "order not found",
      });
    }

    const cartInfo = await cartModel.findOne({ user: userId });
    if (!cartInfo) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "no product  on cart",
      });
    }

    await orderModel.findByIdAndUpdate({ _id: orderId }, { status: "pending" });
    const findUser = await cartModel.findOneAndDelete({ user: userId });
    console.log("findUser", findUser);
    res.status(200).json({
      code: 200,
      success: true,
      message: "Order Confirm",
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
  checkout,
  confirmCheckout,
};
