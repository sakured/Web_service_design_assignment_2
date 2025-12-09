const express = require("express");
const router = express.Router();
const pool = require('../db');

/**
 * Create a seller
 */
exports.createSeller = (req, res) => {
    const sql = `
        INSERT INTO sellers (business_number, business_name, email, phone_number, address, payout_bank, payout_account, payout_holder)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const { business_number, business_name, email, phone_number, address, payout_bank, payout_account, payout_holder } = req.body;

    pool.query(sql, [business_number, business_name, email, phone_number, address, payout_bank, payout_account, payout_holder], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Seller created', id: results.insertId });
    });
};

/**
 * Get all sellers
 */
exports.getSellers = (req, res) => {
    const sql = `SELECT * FROM sellers`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single seller
 */
exports.getSeller = (req, res) => {
    const sql = `SELECT * FROM sellers WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Seller not found' });
        res.json(results[0]);
    });
};

/**
 * Update seller
 */
exports.updateSeller = (req, res) => {
    const sql = `
        UPDATE sellers SET business_number=?, business_name=?, email=?, phone_number=?, address=?, payout_bank=?, payout_account=?, payout_holder=?
        WHERE id=?
    `;
    const { business_number, business_name, email, phone_number, address, payout_bank, payout_account, payout_holder } = req.body;
    pool.query(sql, [business_number, business_name, email, phone_number, address, payout_bank, payout_account, payout_holder, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Seller updated' });
    });
};

/**
 * Delete seller
 */
exports.deleteSeller = (req, res) => {
    const sql = `DELETE FROM sellers WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Seller deleted' });
    });
};

// Router mappings
router.get("/:id", exports.getSeller);
router.get("/", exports.getSellers);
router.post("/", exports.createSeller);
router.put("/:id", exports.updateSeller);
router.delete("/:id", exports.deleteSeller);

module.exports = router;
