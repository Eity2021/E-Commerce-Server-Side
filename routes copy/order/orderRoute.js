const express = require("express");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const { orderList, userOrderList } = require("../../controllers/order/orderController");
const authMiddleware = require("../../middleware/authMiddleware");

const orderRouter = express.Router();

orderRouter.get("/orderList", adminAuthMiddleware, orderList);
orderRouter.get("/userOrderList", authMiddleware, userOrderList);

module.exports = orderRouter;
