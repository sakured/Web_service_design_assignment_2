const express = require("express");
const router = express.Router();
const couponController = require('../controllers/coupon');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", couponController.getCoupon);
router.get("/", couponController.getCoupons);
router.post("/", authMiddleware, adminOnly, couponController.createCoupon);
router.put("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
