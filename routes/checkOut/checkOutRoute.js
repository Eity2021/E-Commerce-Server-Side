const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { checkout, confirmCheckout } = require("../../controllers/checkOut/checkoutController");



const checkoutRouter = express.Router();

checkoutRouter.post("/checkout" , authMiddleware, checkout)
checkoutRouter.put("/confirmOrder/:orderId" , authMiddleware,confirmCheckout)

module.exports = checkoutRouter;