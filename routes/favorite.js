const express = require("express");
const router = express.Router();
const favoriteController = require('../controllers/favorite');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite books management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 3
 *         book_id:
 *           type: integer
 *           example: 12
 */

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorite not found
 */
router.get("/:id", favoriteController.getFavorite);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites (admin only)
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get("/", authMiddleware, adminOnly, favoriteController.getFavorites);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a favorite
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Favorite added
 */
router.post("/", favoriteController.createFavorite);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Delete a favorite
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite deleted
 */
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
