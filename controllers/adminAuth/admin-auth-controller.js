const bcrypt = require("bcrypt");
const adminModel = require("../../models/adminModel");
const userModal = require("../../models/userModel");
const jwt = require("jsonwebtoken");


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('email',req.body);
    try {
  
      const adminData = await adminModel.findOne({ email });
     console.log('email',adminData);
      if (!adminData) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "admin not found",
        });
      }
  
      // Compare hashed password
      const isMatch = await bcrypt.compare(password, adminData.password);
      if (!isMatch) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "Invalid Credentials",
        });
      }
  
      const token = createToken(adminData._id);
  
      res.status(201).json({
        code: 201,
        success: true,
        message: "Admin Login successful",
        data: {
          token,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "Some error occurred",
      });
    }
  };
  

  module.exports = {adminLogin};