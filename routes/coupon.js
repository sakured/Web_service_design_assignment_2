const express = require("express");
const router = express.Router();
const couponController = require('../controllers/coupon');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: string
 *           example: PROMO10
 *         coupon_amount:
 *           type: number
 *           example: 10
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
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: List of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get("/", couponController.getCoupons);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coupon found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 */
router.get("/:id", couponController.getCoupon);

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - coupon_amount
 *               - start
 *               - end
 *               - is_valid
 *             properties:
 *               code:
 *                 type: string
 *               coupon_amount:
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
 *         description: Coupon created
 */
router.post("/", authMiddleware, adminOnly, couponController.createCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon
 *     tags: [Coupons]
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
 *               code:
 *                 type: string
 *               coupon_amount:
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
 *         description: Coupon updated
 */
router.put("/:id", couponController.updateCoupon);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coupon deleted
 */
router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
