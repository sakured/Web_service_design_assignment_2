const express = require("express");
const router = express.Router();
const discountController = require('../controllers/discount');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         book_id:
 *           type: integer
 *           example: 5
 *         discount_rate:
 *           type: number
 *           example: 0.2
 *         start:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *         end:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         is_valid:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: List of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discount'
 */
router.get("/", discountController.getDiscounts);

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get a discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       404:
 *         description: Discount not found
 */
router.get("/:id", discountController.getDiscount);

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book_id
 *               - discount_rate
 *               - start
 *               - end
 *               - is_valid
 *             properties:
 *               book_id:
 *                 type: integer
 *               discount_rate:
 *                 type: number
 *               start:
 *                 type: string
 *                 format: date
 *               end:
 *                 type: string
 *                 format: date
 *               is_valid:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Discount created
 */
router.post("/", authMiddleware, adminOnly, discountController.createDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Update a discount
 *     tags: [Discounts]
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
 *             properties:
 *               discount_rate:
 *                 type: number
 *               start:
 *                 type: string
 *                 format: date
 *               end:
 *                 type: string
 *                 format: date
 *               is_valid:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Discount updated
 */
router.put("/:id", discountController.updateDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount deleted
 */
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
