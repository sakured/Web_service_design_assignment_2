const pool = require('../db');

/**
 * Create a coupon
 */
exports.createCoupon = (req, res) => {
    const sql = `INSERT INTO coupons (code, coupon_amount, start, end, is_valid) VALUES (?, ?, ?, ?, ?)`;
    const { code, coupon_amount, start, end, is_valid } = req.body;

    pool.query(sql, [code, coupon_amount, start, end, is_valid], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Coupon created', id: results.insertId });
    });
};

/**
 * Get all coupons
 */
exports.getCoupons = (req, res) => {
    const sql = `SELECT * FROM coupons`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single coupon
 */
exports.getCoupon = (req, res) => {
    const sql = `SELECT * FROM coupons WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Coupon not found' });
        res.json(results[0]);
    });
};

/**
 * Update coupon
 */
exports.updateCoupon = (req, res) => {
    const sql = `UPDATE coupons SET code=?, coupon_amount=?, start=?, end=?, is_valid=? WHERE id=?`;
    const { code, coupon_amount, start, end, is_valid } = req.body;
    pool.query(sql, [code, coupon_amount, start, end, is_valid, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Coupon updated' });
    });
};

/**
 * Delete coupon
 */
exports.deleteCoupon = (req, res) => {
    const sql = `DELETE FROM coupons WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Coupon deleted' });
    });
};
