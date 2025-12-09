const pool = require('../db');

/**
 * Create a new book
 */
exports.createBook = (req, res) => {
    const sql = `
        INSERT INTO books (title, author, publisher, summary, isbn, price, publication_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const { title, author, publisher, summary, isbn, price, publication_date } = req.body;

    pool.query(sql, [title, author, publisher, summary, isbn, price, publication_date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Book created', id: results.insertId });
    });
};

/**
 * Get all books with search, sort, pagination
 */
exports.getBooks = (req, res) => {
    let { page = 1, size = 10, keyword = '', sort = 'title' } = req.query;
    page = parseInt(page); size = parseInt(size);
    const offset = (page - 1) * size;

    const sql = `
        SELECT * FROM books 
        WHERE title LIKE ? OR author LIKE ?
        ORDER BY ${sort} 
        LIMIT ? OFFSET ?
    `;
    pool.query(sql, [`%${keyword}%`, `%${keyword}%`, size, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Get single book
 */
exports.getBook = (req, res) => {
    const sql = `SELECT * FROM books WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.json(results[0]);
    });
};

/**
 * Update book
 */
exports.updateBook = (req, res) => {
    const sql = `
        UPDATE books SET title=?, author=?, publisher=?, summary=?, isbn=?, price=?, publication_date=?
        WHERE id=?
    `;
    const { title, author, publisher, summary, isbn, price, publication_date } = req.body;
    pool.query(sql, [title, author, publisher, summary, isbn, price, publication_date, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Book updated' });
    });
};

/**
 * Delete book
 */
exports.deleteBook = (req, res) => {
    const sql = `DELETE FROM books WHERE id=?`;
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Book deleted' });
    });
};
