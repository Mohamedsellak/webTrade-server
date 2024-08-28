
// Middleware for admin verification
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access Denied: Admins Only');
    }
    next();
};


module.exports = verifyAdmin