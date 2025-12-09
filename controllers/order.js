const pool = require('../db');

/**
 * Create a new order
 */
exports.createOrder = (req, res) => {
    const sql = `
        INSERT INTO orders (settlement_id, book_id, user_id, status, quantity)
        VALUES (?, ?, ?, ?, ?)
    `;
    const { settlement_id, book_id, user_id, status, quantity } = req.body;

    pool.query(sql, [settlement_id, book_id, user_id, status, quantity], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Order created', id: results.insertId });
    });
};

/**
 * Get all orders with pagination
 */
exports.getOrders = (req, res) => {
    let { page = 1, size = 10, userId } = req.query;
    page = parseInt(page); size = parseInt(size);
    const offset = (page - 1) * size;

    let sql = `SELECT * FROM orders`;
    let params = [];

    if (userId) {
        sql += ` WHERE user_id=?`;
        params.push(userId);
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(size, offset);

    pool.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single order
 */
exports.getOrder = (req, res) => {
    const sql = `SELECT * FROM orders WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.json(results[0]);
    });
};

/**
 * Update order status or quantity
 */
exports.updateOrder = (req, res) => {
    const sql = `
        UPDATE orders SET status=?, quantity=? WHERE id=?
    `;
    const { status, quantity } = req.body;
    pool.query(sql, [status, quantity, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Order updated' });
    });
};

/**
 * Delete order
 */
exports.deleteOrder = (req, res) => {
    const sql = `DELETE FROM orders WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Order deleted' });
    });
};
