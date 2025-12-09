const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

/**
 * Authentication middleware
 */
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, isAdmin }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

/**
 * Admin only middleware
 */
exports.adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
    next();
};
