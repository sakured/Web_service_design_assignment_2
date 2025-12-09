const express = require("express");
const router = express.Router();
const bookController = require('../controllers/book');


router.get("/:id", bookController.getBook);
router.get("/", bookController.getBooks);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;