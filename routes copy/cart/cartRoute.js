const express = require("express");
const { addToCart, cartList, cartDelete } = require("../../controllers/cart/cartControllers");
const authMiddleware = require("../../middleware/authMiddleware");


const cartRouter = express.Router();

cartRouter.post("/addToCart" , authMiddleware, addToCart)
cartRouter.get("/cartList" , authMiddleware,cartList)
cartRouter.delete("/cartDelete/:productId" , authMiddleware,cartDelete)


module.exports = cartRouter;