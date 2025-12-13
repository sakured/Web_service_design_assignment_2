const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", orderController.getOrder);
router.get("/", authMiddleware, adminOnly, orderController.getOrders);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;