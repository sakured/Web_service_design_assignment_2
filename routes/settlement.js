const express = require("express");
const router = express.Router();
const settlementController = require('../controllers/settlement');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Settlements
 *   description: Settlement management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Settlement:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         seller_id:
 *           type: integer
 *         total_sales:
 *           type: number
 *         commission:
 *           type: number
 *         final_payout:
 *           type: number
 *         period_start:
 *           type: string
 *           format: date
 *         period_end:
 *           type: string
 *           format: date
 *         settlement_date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /settlements:
 *   get:
 *     summary: Get all settlements
 *     tags: [Settlements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of settlements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Settlement'
 */
router.get("/", authMiddleware, adminOnly, settlementController.getSettlements);

/**
 * @swagger
 * /settlements/{id}:
 *   get:
 *     summary: Get a settlement by ID
 *     tags: [Settlements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Settlement found
 *       404:
 *         description: Settlement not found
 */
router.get("/:id", settlementController.getSettlement);

/**
 * @swagger
 * /settlements:
 *   post:
 *     summary: Create a settlement
 *     tags: [Settlements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seller_id
 *               - total_sales
 *               - commission
 *               - final_payout
 *               - period_start
 *               - period_end
 *               - settlement_date
 *             properties:
 *               seller_id:
 *                 type: integer
 *               total_sales:
 *                 type: number
 *               commission:
 *                 type: number
 *               final_payout:
 *                 type: number
 *               period_start:
 *                 type: string
 *                 format: date
 *               period_end:
 *                 type: string
 *                 format: date
 *               settlement_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Settlement created
 */
router.post("/", settlementController.createSettlement);

/**
 * @swagger
 * /settlements/{id}:
 *   put:
 *     summary: Update a settlement
 *     tags: [Settlements]
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
 *         description: Settlement updated
 */
router.put("/:id", settlementController.updateSettlement);

/**
 * @swagger
 * /settlements/{id}:
 *   delete:
 *     summary: Delete a settlement
 *     tags: [Settlements]
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
 *         description: Settlement deleted
 */
router.delete("/:id", authMiddleware, adminOnly, settlementController.deleteSettlement);

module.exports = router;
