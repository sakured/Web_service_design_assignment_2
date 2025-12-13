const express = require("express");
const router = express.Router();
const settlementController = require('../controllers/settlement');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", settlementController.getSettlement);
router.get("/", authMiddleware, adminOnly, settlementController.getSettlements);
router.post("/", settlementController.createSettlement);
router.put("/:id", settlementController.updateSettlement);
router.delete("/:id", authMiddleware, adminOnly, settlementController.deleteSettlement);

module.exports = router;
