const express = require("express");
const {
  multipleMiddleBannerUpload,
} = require("../../middleware/multer");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const { addMiddleBanner, middleBannerDelete, middleBannerLists } = require("../../controllers/middleBanner/middlebannerController");
const middleBannerRouter = express.Router();

middleBannerRouter.post(
  "/addMiddleBanner",
  adminAuthMiddleware,
  multipleMiddleBannerUpload,
  addMiddleBanner
);
middleBannerRouter.delete(
  "/deleteImage/:imageId",
  adminAuthMiddleware,
  middleBannerDelete
);

middleBannerRouter.get("/middleBannerLists", middleBannerLists);



module.exports = middleBannerRouter;
