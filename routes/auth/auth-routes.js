const express = require('express');
const { registerUser ,loginUser, userProfile, profileUpdate} = require('../../controllers/auth/auth-controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post("/register" , registerUser);
router.get("/profile"  , authMiddleware, userProfile);
router.post("/profileUpdate"  , authMiddleware, profileUpdate);
router.post("/login" , loginUser);


module.exports = router;