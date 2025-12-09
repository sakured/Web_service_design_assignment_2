const pool = require('../db');

/**
 * Add item to cart
 */
exports.createCart = (req, res) => {
    const sql = `INSERT INTO carts (user_id, book_id, quantity) VALUES (?, ?, ?)`;
    const { user_id, book_id, quantity } = req.body;

    pool.query(sql, [user_id, book_id, quantity], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Cart item added', id: results.insertId });
    });
};

/**
 * Get all cart items
 */
exports.getCarts = (req, res) => {
    const sql = `SELECT * FROM carts`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single cart item
 */
exports.getCart = (req, res) => {
    const sql = `SELECT * FROM carts WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Cart item not found' });
        res.json(results[0]);
    });
};

/**
 * Update cart item quantity
 */
exports.updateCart = (req, res) => {
    const sql = `UPDATE carts SET quantity=? WHERE id=?`;
    const { quantity } = req.body;
    pool.query(sql, [quantity, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Cart updated' });
    });
};

/**
 * Delete cart item
 */
exports.deleteCart = (req, res) => {
    const sql = `DELETE FROM carts WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Cart item deleted' });
    });
};

/**
 * Checkout: transform cart items into orders
 */
exports.checkout = (req, res) => {
    const userId = req.params.userId;

    // Get all items from cart
    const getCartSql = `SELECT * FROM carts WHERE user_id=?`;
    pool.query(getCartSql, [userId], (err, cartItems) => {
        if (err) return res.status(500).json({ error: err });
        if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });

        // Create orders for each cart item
        const createOrderSql = `INSERT INTO orders (settlement_id, book_id, user_id, status, quantity) VALUES (?, ?, ?, ?, ?)`;
        const tasks = cartItems.map(item => {
            return new Promise((resolve, reject) => {
                pool.query(createOrderSql, [null, item.book_id, userId, 'pending', item.quantity], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        });

        Promise.all(tasks)
            .then(() => {
                // Empty the cart
                const deleteCartSql = `DELETE FROM carts WHERE user_id=?`;
                pool.query(deleteCartSql, [userId], (err) => {
                    if (err) return res.status(500).json({ error: err });
                    res.json({ message: 'Checkout completed: orders created and cart emptied' });
                });
            })
            .catch(err => res.status(500).json({ error: err }));
    });
};

