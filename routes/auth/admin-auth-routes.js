const express = require('express');
const { adminLogin } = require('../../controllers/adminAuth/admin-auth-controller');


const adminRouter = express.Router();

adminRouter.post("/admin" , adminLogin);

module.exports = adminRouter;