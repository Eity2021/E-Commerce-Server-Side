const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    const token = req.header("Authorization"); 

    if (!token) {
        return res.status(401).json({ 
            code:401,
            success:false,
            message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(500).json({      
               code:500,
            success:false,
            message: "Invalid token" });
    }
};

module.exports = authMiddleware;
