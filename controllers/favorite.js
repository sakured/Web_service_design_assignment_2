const pool = require('../db');

/**
 * Add a favorite
 */
exports.createFavorite = (req, res) => {
    const sql = `INSERT INTO favorites (user_id, book_id) VALUES (?, ?)`;
    const { user_id, book_id } = req.body;

    pool.query(sql, [user_id, book_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Favorite added', id: results.insertId });
    });
};

/**
 * Get all favorites
 */
exports.getFavorites = (req, res) => {
    const sql = `SELECT * FROM favorites`;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single favorite
 */
exports.getFavorite = (req, res) => {
    const sql = `SELECT * FROM favorites WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Favorite not found' });
        res.json(results[0]);
    });
};

/**
 * Delete favorite
 */
exports.deleteFavorite = (req, res) => {
    const sql = `DELETE FROM favorites WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Favorite deleted' });
    });
};
