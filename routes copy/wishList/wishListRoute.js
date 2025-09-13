const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { addToWishList, wishLists, deleteWishList } = require("../../controllers/wishList/wishListController");



const wishListRouter = express.Router();

wishListRouter.post("/addToWishList" , authMiddleware, addToWishList)
wishListRouter.get("/wishList" , authMiddleware, wishLists);
wishListRouter.delete("/delete/:productId" , authMiddleware, deleteWishList);

module.exports = wishListRouter;