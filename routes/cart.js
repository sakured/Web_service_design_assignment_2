const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart');

router.get("/:id", cartController.getCart);
router.get("/", cartController.getCarts);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.post("/:userId", cartController.checkout);

module.exports = router;
