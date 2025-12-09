const pool = require("../db");
/**
 * Create a new user
 */
exports.createUser = (req, res) => {
    const sql = `
        INSERT INTO users (is_admin, email, password, name, birth_date, gender, address, phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const { is_admin, email, password, name, birth_date, gender, address, phone_number } = req.body;

    pool.query(sql, [is_admin, email, password, name, birth_date, gender, address, phone_number], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User created', id: results.insertId });
    });
};

/**
 * Get all users with pagination & search
 */
exports.getUsers = (req, res) => {
    let { page = 1, size = 10, keyword = '' } = req.query;
    page = parseInt(page); size = parseInt(size);
    const offset = (page - 1) * size;

    const sql = `
        SELECT * FROM users 
        WHERE name LIKE ? OR email LIKE ?
        LIMIT ? OFFSET ?
    `;
    pool.query(sql, [`%${keyword}%`, `%${keyword}%`, size, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single user
 */
exports.getUser = (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
};

/**
 * Update user
 */
exports.updateUser = (req, res) => {
    const sql = `
        UPDATE users SET is_admin=?, email=?, password=?, name=?, birth_date=?, gender=?, address=?, phone_number=?
        WHERE id=?
    `;
    const { is_admin, email, password, name, birth_date, gender, address, phone_number } = req.body;
    pool.query(sql, [is_admin, email, password, name, birth_date, gender, address, phone_number, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User updated' });
    });
};

/**
 * Delete user
 */
exports.deleteUser = (req, res) => {
    const sql = `DELETE FROM users WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User deleted' });
    });
};

/**
 * Get orders for a specific user
 */
exports.getUserOrders = (req,res)=>{
    const userId = req.params.id;
    pool.query("SELECT * FROM orders WHERE user_id=?", [userId], (err, results)=>{
        if(err) return res.status(500).json({ code:'DATABASE_ERROR', message: err.message });
        res.json(results);
    });
};