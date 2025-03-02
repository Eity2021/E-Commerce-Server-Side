const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req,res,next) => {
    
    const adminToken = req.header("Authorization");
  console.log("adminToken", adminToken )
    if(!adminToken){
        return res.status(401).json({
            code:401,
            success:false,
            message: "No admin token, authorization denied"
        })
    }
    try{
        const decoded = jwt.verify(adminToken,process.env.JWT_SECRET_ADMIN);
        req.admin = decoded;
        next();
    }catch(error){
        res.status(500).json({ 
            code:500,
            success:false,
            message: "Invalid token" });
    }

}

module.exports = adminAuthMiddleware;