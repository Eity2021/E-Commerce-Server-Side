const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userModel = require("../../models/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {

  
  const { name, email, password,role} = req.body;

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
      password: hashPassword,
      role
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

   if( checkPasswordMatch) {
    const token = createToken(checkUser._id)
    res.json({
      code:200,
      success:true,
      message:"login Successfully",
      data:{
        token
      }

    })
   } else {
    res.json({
      code:400,
      success:false,
      message: "Invalid credentials"
    })
   }
  
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//admin
const adminLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      console.log('Generated token:', email === process.env.ADMIN_EMAIL);
      const token = jwt.sign({ email , password}, process.env.JWT_SECRET);
      res.status(201).json({
        code: 201,
        success: true,
        message: "Login successful",
        data: {
          token
        }
      });
    } else {
      res.status(400).json({
        code: 400,
        success: false,
        message: "Invalid Credentials"
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//auth middleware

module.exports = { registerUser, loginUser, adminLogin };
