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
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role,
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
    console.log(e);
    res.status(500).json({
      code: 500,
      success: false,
      message: "Some error occurred",
    });
  }
};
// adminLogin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Admin not found",
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = createToken(admin._id);

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

// userProfile
const userProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token missing or invalid" });
    }

    const user = await userModel.findById(req.user.id).select("-password");
console.log( "req.user.id",req.user.id)
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
      message: "Internal Server error" });
  }
};

const profileUpdate = async(req,res) => {
  
  try{
    const { name, email, password, phone } = req.body;
    console.log("req.body",req.body)
    
    const  existingUser= await userModel.findById(req.user.id);
    
    console.log("existingUser", existingUser)
    if(!existingUser){
      return res.status(400).json({
        code:400,
        success:false,
        message:"User Not found"
      })
    }

const userData = {
  name, email, password, phone
}

if (password) {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(password, salt);
}

const updateUserProfile = await userModel.findByIdAndUpdate(
      req.user.id,  { $set: userData },  {new:true}
      
    );
if(!updateUserProfile) {
  return res.status(404).json({
    code:404,
    success:false,
    message:"Failed to update user"
  })
}

res.status(201).json({
  code:201,
  success:true,
  message:"User Successfully! update ",
  data:updateUserProfile
})
  }catch(error){

    res.status(500).json({
      code: 500, 
      success: false,
      message: "Internal Server error" });
  }
}
module.exports = { registerUser, loginUser, adminLogin, userProfile,profileUpdate };
