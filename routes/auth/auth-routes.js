const express = require('express');
const { registerUser ,loginUser, adminLogin} = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/admin" , adminLogin);

module.exports = router;