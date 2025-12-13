const express = require("express");
const router = express.Router();
const discountController = require('../controllers/discount');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", discountController.getDiscount);
router.get("/", discountController.getDiscounts);
router.post("/", authMiddleware, adminOnly, discountController.createDiscount);
router.put("/:id", discountController.updateDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
