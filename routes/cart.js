const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
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
 *         quantity:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 */
router.get("/", authMiddleware, adminOnly, cartController.getCarts);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart item not found
 */
router.get("/:id", cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - book_id
 *               - quantity
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item added
 */
router.post("/", cartController.createCart);

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
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
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.put("/:id", cartController.updateCart);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart item deleted
 */
router.delete("/:id", cartController.deleteCart);

/**
 * @swagger
 * /cart/{userId}:
 *   post:
 *     summary: Checkout cart and create orders
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checkout completed
 *       400:
 *         description: Cart is empty
 */
router.post("/:userId", cartController.checkout);

module.exports = router;