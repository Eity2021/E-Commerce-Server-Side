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
  
  
  const adminUpdate = async (req,res) => {
    try{
      const {name,phone,email,password} = req.body;
      console.log(" req.body" , req.body)

const existingAdmin = await adminModel.findById(req.admin.id)
 
  console.log( "existingAdmin",existingAdmin );

  if(!existingAdmin){
    res.status(400).json({
      code:400,
      success:false,
      message:"admin not found"
    })
  }

  const adminData = {
    name, email, password, phone
  }

if (password) {
  const salt = await bcrypt.genSalt(10);
  adminData.password = await bcrypt.hash(password, salt);
}

const updateAdminProfile = await adminModel.findByIdAndUpdate(
   req.admin.id, 
  {$set: adminData}, 
  {new:true}
  
);
if(!updateAdminProfile) {
return res.status(404).json({
code:404,
success:false,
message:"Failed to update user"
})
}

res.status(201).json({
code:201,
success:true,
message:"Admin Successfully! update ",
data:updateAdminProfile
})


}catch (error) {
  res.status(500).json({
    code: 500, 
    success: false,
    message: "Internal Server error" 
  });
  
}   
  }
  module.exports = {adminLogin , adminUpdate};