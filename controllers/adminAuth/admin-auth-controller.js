const bcrypt = require("bcrypt");
const adminModel = require("../../models/adminModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, { expiresIn: "7d" });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminData = await adminModel.findOne({ email });
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

const adminUpdate = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const adminImage = req?.file?.filename || "";

    const existingAdmin = await adminModel.findById(req.admin.id);

    if (!existingAdmin) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "admin not found",
      });
    }

    const adminData = {
      name,
      email,
      phone,
      admin_image: adminImage,
    };

    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   adminData.password = await bcrypt.hash(password, salt);
    // }

    const updateAdminProfile = await adminModel.findByIdAndUpdate(
      req.admin.id,
      { $set: adminData },
      { new: true }
    );
    if (!updateAdminProfile) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Failed to update user",
      });
    }

    res.status(201).json({
      code: 201,
      success: true,
      message: "Admin Successfully! update ",
      data: updateAdminProfile,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};

const adminProfile = async (req, res) => {
  try {
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized, token missing or invalid",
      });
    }

    const admin = await adminModel.findById(req?.admin?.id);

    if (!admin) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "admin not found",
      });
    }

    res.status(201).json({
      code: 201,
      success: true,
      message: "data fetched",
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = { adminLogin, adminUpdate, adminProfile };
