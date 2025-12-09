const pool = require('../db'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_EXPIRES = '1h';

/** 
 * Login user
*/
exports.login = (req, res) => {
    const { email, password } = req.body;

    pool.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { id: user.id, isAdmin: !!user.is_admin };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        res.json({ token });
    });
};

/** 
 * Logout user
*/
exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

/**
 * Refresh token
 */
exports.refresh = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const newToken = jwt.sign({ id: decoded.id, isAdmin: decoded.isAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        res.json({ token: newToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
