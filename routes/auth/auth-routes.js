const express = require('express');
const { registerUser ,loginUser, adminLogin, userProfile} = require('../../controllers/auth/auth-controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post("/register" , registerUser);
router.get("/profile"  , authMiddleware, userProfile);
router.post("/login" , loginUser);
router.post("/admin" , adminLogin);

module.exports = router;