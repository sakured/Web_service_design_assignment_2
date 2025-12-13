const express = require("express");
const router = express.Router();
const bookController = require('../controllers/book');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

router.get("/:id", bookController.getBook);
router.get("/", bookController.getBooks);
router.post("/", authMiddleware, adminOnly, bookController.createBook);
router.put("/:id", authMiddleware, adminOnly, bookController.updateBook);
router.delete("/:id", authMiddleware, adminOnly, bookController.deleteBook);
router.get("/:id/reviews", bookController.getBookReviews);

module.exports = router;