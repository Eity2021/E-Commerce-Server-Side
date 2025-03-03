const express = require('express');
const { registerUser ,loginUser, userProfile, profileUpdate} = require('../../controllers/auth/auth-controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { singleUserUpload } = require("../../middleware/multer");
const router = express.Router();

router.post("/register" ,singleUserUpload, registerUser);
router.get("/profile"  , authMiddleware, userProfile);
router.post("/profileUpdate"  , singleUserUpload, authMiddleware, profileUpdate);
router.post("/login" , loginUser);


module.exports = router;