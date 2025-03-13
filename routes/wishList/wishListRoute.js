const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { addToWishList, wishLists } = require("../../controllers/wishList/wishListController");



const wishListRouter = express.Router();

wishListRouter.post("/addToWishList" , authMiddleware, addToWishList)
wishListRouter.get("/wishList" , authMiddleware, wishLists)



module.exports = wishListRouter;