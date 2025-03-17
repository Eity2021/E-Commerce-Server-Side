const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userModel = require("../../models/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const userImage = req?.file?.filename || "";
  try {
    // Check if email already exists
    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.status(208).json({
        data: null,
        success: false,
        message: "User Already Exists",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new userModel({
      name: name,
      email: email,
      phone: phone,
      user_image: userImage,
      password: hashPassword,
      role,
    });

    const savedUser = await newUser.save();

    // Create token
    const token = createToken(savedUser._id);

    // Send response
    res.status(201).json({
      code: 201,
      data: {
        token,
      },
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("Error in registerUser:", e);
    res.status(500).json({
      data: null,
      success: false,
      message: "Some error occurred",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't  exists! Please Register",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (checkPasswordMatch) {
      const token = createToken(checkUser._id);
      res.json({
        code: 200,
        success: true,
        message: "login Successfully",
        data: {
          token,
        },
      });
    } else {
      res.json({
        code: 400,
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Some error occurred",
    });
  }
};
// userProfile
const userProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized, token missing or invalid",
      });
    }

    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found",
      });
    }
    res.status(201).json({
      code: 201,
      success: true,
      message: "data Fetched",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};
// profileUpdate
const profileUpdate = async (req, res) => {
  try {
    const userId = req?.user?.id;
    // console.log("userId", userId)
    const { name, email, phone } = req.body;
    console.log("req.body", req.body);

    const userImage = req?.file?.filename || "";
    console.log("userImage", userImage);

    const existingUser = await userModel.findById(userId);
    console.log("existingUser", existingUser);

    if (!userImage) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "image not found",
      });
    }

    if (!existingUser) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "User Not found",
      });
    }

    const userData = {
      name,
      email,
      phone,
      user_image: userImage,
    };

    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   userData.password = await bcrypt.hash(password, salt);
    // }

    const updateUserProfile = await userModel.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    );

    if (!updateUserProfile) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Failed to update user",
      });
    }
    console.log("updateUserProfile:", updateUserProfile);

    res.status(201).json({
      code: 201,
      success: true,
      message: "User Successfully! update ",
      data: updateUserProfile,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};
// changedPassword
const changedPassword = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ code: 404, success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(201).json({
      code: 201,
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  userProfile,
  profileUpdate,
  changedPassword,
};
