const pool = require('../db');

/**
 * Create a settlement
 */
exports.createSettlement = (req, res) => {
    const sql = `
        INSERT INTO settlements (seller_id, total_sales, commission, final_payout, period_start, period_end, settlement_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const { seller_id, total_sales, commission, final_payout, period_start, period_end, settlement_date } = req.body;

    pool.query(sql, [seller_id, total_sales, commission, final_payout, period_start, period_end, settlement_date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Settlement created', id: results.insertId });
    });
};

/**
 * Get all settlements
 */
exports.getSettlements = (req, res) => {
    const sql = `SELECT * FROM settlements`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single settlement
 */
exports.getSettlement = (req, res) => {
    const sql = `SELECT * FROM settlements WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Settlement not found' });
        res.json(results[0]);
    });
};

/**
 * Update settlement
 */
exports.updateSettlement = (req, res) => {
    const sql = `
        UPDATE settlements 
        SET seller_id=?, total_sales=?, commission=?, final_payout=?, period_start=?, period_end=?, settlement_date=?
        WHERE id=?
    `;
    const { seller_id, total_sales, commission, final_payout, period_start, period_end, settlement_date } = req.body;
    pool.query(sql, [seller_id, total_sales, commission, final_payout, period_start, period_end, settlement_date, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Settlement updated' });
    });
};

/**
 * Delete settlement
 */
exports.deleteSettlement = (req, res) => {
    const sql = `DELETE FROM settlements WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Settlement deleted' });
    });
};
