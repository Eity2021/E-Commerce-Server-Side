const express = require('express');
const { registerUser ,loginUser, userProfile, profileUpdate, changedPassword} = require('../../controllers/auth/auth-controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { singleUserUpload } = require("../../middleware/multer");
const router = express.Router();

router.post("/register" ,singleUserUpload, registerUser);
router.post("/login" , loginUser);
router.get("/profile"  ,authMiddleware, userProfile);
router.put("/profileUpdate"  , singleUserUpload, authMiddleware, profileUpdate);
router.put("/changedPassword" , authMiddleware, changedPassword);



module.exports = router;