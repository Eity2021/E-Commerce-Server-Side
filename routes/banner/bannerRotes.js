const express = require("express");
const {
  mainBanners,
  mainBannerLists,
  deleteBanner,
  deleteMainBannerImage,
} = require("../../controllers/mainBanner/mainBannerController");
const { multipleMainBannerUpload } = require("../../middleware/multer");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");

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

bannerRouter.get(
  "/mainBannerLists",
  mainBannerLists
);

module.exports = bannerRouter;
