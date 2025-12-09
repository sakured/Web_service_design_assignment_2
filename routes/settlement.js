const express = require("express");
const router = express.Router();
const settlementController = require('../controllers/settlement');

router.get("/:id", settlementController.getSettlement);
router.get("/", settlementController.getSettlements);
router.post("/", settlementController.createSettlement);
router.put("/:id", settlementController.updateSettlement);
router.delete("/:id", settlementController.deleteSettlement);

module.exports = router;
