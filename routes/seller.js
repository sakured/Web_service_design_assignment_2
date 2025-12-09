const express = require("express");
const router = express.Router();
const sellerController = require('../controllers/seller');

router.get("/:id", sellerController.getSeller);
router.get("/", sellerController.getSellers);
router.post("/", sellerController.createSeller);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

module.exports = router;
