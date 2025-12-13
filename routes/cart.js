const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/", authMiddleware, adminOnly, cartController.getCarts); 
router.get("/:id", cartController.getCart);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.post("/:userId", cartController.checkout);

module.exports = router;