const express = require("express");
const router = express.Router();
const discountController = require('../controllers/discount');

router.get("/:id", discountController.getDiscount);
router.get("/", discountController.getDiscounts);
router.post("/", discountController.createDiscount);
router.put("/:id", discountController.updateDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
