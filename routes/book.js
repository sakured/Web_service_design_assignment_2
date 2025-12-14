const express = require("express");
const router = express.Router();
const bookController = require('../controllers/book');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Clean Code
 *         author:
 *           type: string
 *           example: Robert C. Martin
 *         publisher:
 *           type: string
 *           example: Pearson
 *         summary:
 *           type: string
 *           example: A handbook of agile software craftsmanship
 *         isbn:
 *           type: string
 *           example: "9780132350884"
 *         price:
 *           type: number
 *           example: 29.99
 *         publication_date:
 *           type: string
 *           format: date
 *           example: "2008-08-01"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve books with search, sorting and pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           default: ""
 *         description: Search by title or author
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: created_at,DESC
 *         description: Sort format field,order
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             example:
 *               content: []
 *               page: 0
 *               size: 20
 */
router.get("/", bookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get("/:id", bookController.getBook);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, adminOnly, bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.put("/:id", authMiddleware, adminOnly, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, adminOnly, bookController.deleteBook);

/**
 * @swagger
 * /books/{id}/reviews:
 *   get:
 *     summary: Get reviews for a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/:id/reviews", bookController.getBookReviews);

module.exports = router;
