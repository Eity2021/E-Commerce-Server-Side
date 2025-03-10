const express = require("express");
const {
  mainBanners,
  mainBannerLists,
  deleteMainBannerImage,
} = require("../../controllers/mainBanner/mainBannerController");
const {
  multipleMainBannerUpload,
  multipleMiddleBannerUpload,
} = require("../../middleware/multer");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const {
  addMiddleBanner,
} = require("../../controllers/middleBanner/middleBannerController");

const bannerRouter = express.Router();

bannerRouter.post(
  "/mainBanner",
  adminAuthMiddleware,
  multipleMainBannerUpload,
  mainBanners
);
bannerRouter.delete(
  "/deleteImage/:imageId",
  adminAuthMiddleware,
  deleteMainBannerImage
);

bannerRouter.get("/mainBannerLists", mainBannerLists);

bannerRouter.post(
  "/middleBanner",
  adminAuthMiddleware,
  multipleMiddleBannerUpload,
  addMiddleBanner
);

module.exports = bannerRouter;
