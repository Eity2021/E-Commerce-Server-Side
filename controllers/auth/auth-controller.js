const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const userModal = require("../../models/UserModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {
  
  const { name, email, password } = req.body;

  try {
 
    // Check if email already exists
    const checkEmail = await userModal.findOne({ email });
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
    const newUser = new userModal({
      name:name,
      email:email,
      password: hashPassword,
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
  // const { email, password } = req.body;
  // try {
  //   const checkUser = await userModal.findOne({ email });
  //   if (!checkUser)
  //     return res.json({
  //       success: false,
  //       message: "User doesn't  exists! Please Register",
  //     });

  //   const tokenFromCookie = req.cookies.token;

  //   if (tokenFromCookie) {
  //     try {
  //       const decode = jwt.verify(tokenFromCookie, "CLIENT_SECRET_KEY");
  //       if (decode.email === checkUser.email) {
  //         return res.json({
  //           success: false,
  //           message: "user is already logged in",
  //         });
  //       }
  //     } catch (err) {
  //       // Token is invalid or expired, continue with login
  //     }
  //   }

  //   const checkPasswordMatch = await bcrypt.compare(
  //     password,
  //     checkUser.password
  //   );
  //   if (!checkPasswordMatch)
  //     return res.json({
  //       success: false,
  //       message: "Incorrect password! Please try again",
  //     });

  //   const token = jwt.sign(
  //     {
  //       id: checkUser._id,
  //       // role: checkUser.role,
  //       email: checkUser,
  //     },
  //     "CLIENT_SECRET_KEY",
  //     { expiresIn: "60m" }
  //   );

  //   res.cookie("token", token, { httpOnly: true, secure: false }).json({
  //     success: true,
  //     message: "Logged in Successfully",
  //     code:200,
  //     user: {
  //       email: checkUser.email,
  //       // role: checkUser.role,
  //       id: checkUser._id,
  //     },
  //   });
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).json({
  //     success: false,
  //     message: "Some error occurred",
  //   });
  // }
};

//admin
const adminLogin = async(req,res) => {

}

//auth middleware

module.exports = { registerUser, loginUser ,adminLogin};
