const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};