const express = require("express");
const router = express.Router();
const sellerController = require('../controllers/seller');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Sellers
 *   description: Seller management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         business_number:
 *           type: string
 *           example: "123-45-67890"
 *         business_name:
 *           type: string
 *           example: BookStore Inc.
 *         email:
 *           type: string
 *           example: seller@email.com
 *         phone_number:
 *           type: string
 *           example: "010-1234-5678"
 *         address:
 *           type: string
 *           example: Seoul, South Korea
 *         payout_bank:
 *           type: string
 *           example: KB Bank
 *         payout_account:
 *           type: string
 *           example: "1234567890"
 *         payout_holder:
 *           type: string
 *           example: John Doe
 */

/**
 * @swagger
 * /sellers:
 *   get:
 *     summary: Get all sellers
 *     tags: [Sellers]
 *     responses:
 *       200:
 *         description: List of sellers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seller'
 */
router.get("/", sellerController.getSellers);

/**
 * @swagger
 * /sellers/{id}:
 *   get:
 *     summary: Get a seller by ID
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seller found
 *       404:
 *         description: Seller not found
 */
router.get("/:id", sellerController.getSeller);

/**
 * @swagger
 * /sellers:
 *   post:
 *     summary: Create a seller
 *     tags: [Sellers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - business_number
 *               - business_name
 *               - email
 *               - phone_number
 *               - address
 *               - payout_bank
 *               - payout_account
 *               - payout_holder
 *             properties:
 *               business_number:
 *                 type: string
 *               business_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               payout_bank:
 *                 type: string
 *               payout_account:
 *                 type: string
 *               payout_holder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seller created
 */
router.post("/", sellerController.createSeller);

/**
 * @swagger
 * /sellers/{id}:
 *   put:
 *     summary: Update a seller
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Seller updated
 */
router.put("/:id", sellerController.updateSeller);

/**
 * @swagger
 * /sellers/{id}:
 *   delete:
 *     summary: Delete a seller
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seller deleted
 */
router.delete("/:id", sellerController.deleteSeller);

/**
 * @swagger
 * /sellers/seller/{sellerId}:
 *   get:
 *     summary: Get books by seller
 *     tags: [Sellers]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Books of the seller
 */
router.get("/seller/:sellerId", sellerController.getBooksBySeller);

module.exports = router;
