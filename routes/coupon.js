const express = require("express");
const router = express.Router();
const couponController = require('../controllers/coupon');

router.get("/:id", couponController.getCoupon);
router.get("/", couponController.getCoupons);
router.post("/", couponController.createCoupon);
router.put("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
