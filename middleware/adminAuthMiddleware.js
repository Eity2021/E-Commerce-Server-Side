const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            code: 401,
            success: false,
            message: "No admin token, authorization denied",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            code: 401,
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = adminAuthMiddleware;
