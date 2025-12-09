const express = require("express");
const router = express.Router();
const pool = require('../db');


/**
 * Create a review
 */
exports.createReview = (req, res) => {
    const sql = `
        INSERT INTO reviews (book_id, user_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;
    const { book_id, user_id, rating, comment } = req.body;

    pool.query(sql, [book_id, user_id, rating, comment], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Review created', id: results.insertId });
    });
};

/**
 * Get all reviews for a book
 */
exports.getReviewsByBook = (req, res) => {
    const sql = `SELECT * FROM reviews WHERE book_id=?`;
    pool.query(sql, [req.params.bookId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single review
 */
exports.getReview = (req, res) => {
    const sql = `SELECT * FROM reviews WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Review not found' });
        res.json(results[0]);
    });
};

/**
 * Update review
 */
exports.updateReview = (req, res) => {
    const sql = `
        UPDATE reviews SET rating=?, comment=? WHERE id=?
    `;
    const { rating, comment } = req.body;
    pool.query(sql, [rating, comment, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Review updated' });
    });
};

/**
 * Delete review
 */
exports.deleteReview = (req, res) => {
    const sql = `DELETE FROM reviews WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Review deleted' });
    });
};

// Router mappings
router.get("/:bookId", exports.getReviewsByBook);
router.get("/:id", exports.getReview);
router.post("/", exports.createReview);
router.put("/:id", exports.updateReview);
router.delete("/:id", exports.deleteReview);

module.exports = router;