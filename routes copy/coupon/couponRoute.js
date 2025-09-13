const express = require("express");

const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const {
  addCoupon,
  couponLists,
  perCouponCode,
  perCouponCodeDelete,
  updateCoupon,
} = require("../../controllers/coupon/coupon-controller");

const couponRouter = express.Router();

couponRouter.post("/createCoupon", adminAuthMiddleware, addCoupon);
couponRouter.get("/couponLists", adminAuthMiddleware, couponLists);
couponRouter.get("/perCouponList/:userId", perCouponCode);
couponRouter.delete(
  "/delete/:userId",
  adminAuthMiddleware,
  perCouponCodeDelete
);
couponRouter.put("/perCoupon/:userId", adminAuthMiddleware, updateCoupon);

module.exports = couponRouter;
