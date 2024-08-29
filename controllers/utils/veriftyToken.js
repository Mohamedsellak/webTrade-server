const jwt = require("jsonwebtoken");

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access Denied: No Token Provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json('Invalid Token');
    }
};


module.exports = verifyToken