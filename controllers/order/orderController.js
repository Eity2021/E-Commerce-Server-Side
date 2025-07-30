const orderModel = require("../../models/orderModel");

const orderList = async (req, res) => {
  try {
    const { limit = 0, offset = 1 } = req.query;

    const skip = offset - 1 + limit;

    const orderList = await orderModel
      .find()
      .populate({
         path: "products.product",
        select: "name image price countInStock" ,
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAtt: -1 });

console.log("orderList" , orderList)

    res.status(200).json({
      code: 200,
      success: false,
      message: "order List fetched",
      data: {
        orderList,
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



const userOrderList = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const { limit = 0, offset = 1 } = req.query;

    const skip = offset - 1 + limit;

    const userOrderList = await orderModel
      .find({ user: userId })
      .populate(
        {
        path: "products.product",
        select: "name image price countInStock" ,
        }
      )
      .skip(skip)
      .limit(limit)
      .sort({ createdAtt: -1 });
    const total = await orderModel.countDocuments();

    res.status(200).json({
      code: 200,
      success: false,
      message: "order List fetched",
      data: {
        userOrderList,
        pagination: {
          limit,
          offset,
          total,
        },
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

module.exports = {
  orderList,
  userOrderList,
};
