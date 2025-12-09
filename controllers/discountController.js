const express = require("express");
const router = express.Router();
const pool = require('../db');

/**
 * Create a discount
 */
exports.createDiscount = (req, res) => {
    const sql = `INSERT INTO discounts (book_id, discount_rate, start, end, is_valid) VALUES (?, ?, ?, ?, ?)`;
    const { book_id, discount_rate, start, end, is_valid } = req.body;

    pool.query(sql, [book_id, discount_rate, start, end, is_valid], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Discount created', id: results.insertId });
    });
};

/**
 * Get all discounts
 */
exports.getDiscounts = (req, res) => {
    const sql = `SELECT * FROM discounts`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single discount
 */
exports.getDiscount = (req, res) => {
    const sql = `SELECT * FROM discounts WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Discount not found' });
        res.json(results[0]);
    });
};

/**
 * Update discount
 */
exports.updateDiscount = (req, res) => {
    const sql = `UPDATE discounts SET discount_rate=?, start=?, end=?, is_valid=? WHERE id=?`;
    const { discount_rate, start, end, is_valid } = req.body;
    pool.query(sql, [discount_rate, start, end, is_valid, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Discount updated' });
    });
};

/**
 * Delete discount
 */
exports.deleteDiscount = (req, res) => {
    const sql = `DELETE FROM discounts WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Discount deleted' });
    });
};

// Router mappings
router.get("/:id", exports.getDiscount);
router.get("/", exports.getDiscounts);
router.post("/", exports.createDiscount);
router.put("/:id", exports.updateDiscount);
router.delete("/:id", exports.deleteDiscount);

module.exports = router;
