const express = require("express");
const router = express.Router();
const favoriteController = require('../controllers/favorite');

router.get("/:id", favoriteController.getFavorite);
router.get("/", favoriteController.getFavorites);
router.post("/", favoriteController.createFavorite);
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
