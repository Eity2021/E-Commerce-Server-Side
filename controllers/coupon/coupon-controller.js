const couponModel = require("../../models/couponModel");

const addCoupon = async (req, res) => {
  try {
    const createCoupon = await new couponModel(req.body);
    await createCoupon.save();

    return res.status(201).json({
      code: 201,
      success: true,
      message: "add the coupon successfully!",
      createCoupon,
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};
const couponLists = async (req, res) => {
  try {
    const couponList = await couponModel.find({});
    if (!couponList) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "coupon code not found",
      });
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: "coupon list fetched",
      data: couponList,
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const perCouponCode = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    const perCoupon = await couponModel.findById(userId);

    if (!perCoupon) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "coupon code not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "per coupon list fetched",
      data: perCoupon,
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

const perCouponCodeDelete = async (req, res) => {
  try {
    const {userId}  = req.params;
    console.log("userId", userId)
    const deleteCouponCode = await couponModel.findByIdAndDelete(userId);

    if (!deleteCouponCode) {
      res.status(404).json({
        code: 404,
        success: true,
        message: "code not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "code successfully delete",
    });
  } catch (error) {
    res.json({
      code: 500,
      success: false,
      message: error.message,
    });
  }
};

// const updateCoupon = async (req, res) => {
//   try {
//     const {userId} = req.params;

//  if(!userId) {
//     return res.status(400).json({
//         code:400,
//         success:false,
//         message: "Invalid coupon ID" });
//  }
//  const updatedCoupon = await couponModel.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });

//  if(!updatedCoupon){
//    return res.status(404).json({
//         code: 404,
//         success: false,
//         message: "Coupon  not found",
//       });
// }

//  res.json({ 
//     code:200,
//     success:200,
//     message: "Coupon updated successfully", 
//     coupon: updatedCoupon 
// });

//   } catch (error) {
//     res.status(500).json({
//            code: 500,
//           success: false,
//              message: error.message,
//              });
//   }
// };
module.exports = {
  addCoupon,
  couponLists,
  perCouponCode,
  perCouponCodeDelete,
//   updateCoupon
};
