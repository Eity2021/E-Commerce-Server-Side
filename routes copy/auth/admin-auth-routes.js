const express = require("express");
const {
  adminLogin,
  adminUpdate,
  adminProfile,
} = require("../../controllers/adminAuth/admin-auth-controller");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
const { singleAdminUpload } = require("../../middleware/multer");

const adminRouter = express.Router();

adminRouter.post("/admin", adminLogin);
adminRouter.post(
  "/update",
  singleAdminUpload,
  adminAuthMiddleware,
  adminUpdate
);
adminRouter.get(
  "/profile",
  adminAuthMiddleware,
  adminProfile
);

module.exports = adminRouter;
