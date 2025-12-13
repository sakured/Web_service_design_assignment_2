const express = require("express");
const router = express.Router();
const favoriteController = require('../controllers/favorite');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", favoriteController.getFavorite);
router.get("/", authMiddleware, adminOnly, favoriteController.getFavorites);
router.post("/", favoriteController.createFavorite);
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
