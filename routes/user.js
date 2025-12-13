const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/", authMiddleware, adminOnly, userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id/orders", userController.getUserOrders);

module.exports = router;