const express = require('express');
const { adminLogin, adminUpdate } = require('../../controllers/adminAuth/admin-auth-controller');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');
const { singleAdminUpload } = require('../../middleware/multer');


const adminRouter = express.Router();

adminRouter.post("/admin" , adminLogin);
adminRouter.post("/update"  ,singleAdminUpload,adminAuthMiddleware  ,adminUpdate);

module.exports = adminRouter;