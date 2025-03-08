const express = require("express");
const { addToCart, cartList } = require("../../controllers/cart/cartControllers");
const authMiddleware = require("../../middleware/authMiddleware");


const cartRouter = express.Router();

cartRouter.post("/addToCart" , authMiddleware, addToCart)
cartRouter.get("/cartList" , authMiddleware,cartList)


module.exports = cartRouter;