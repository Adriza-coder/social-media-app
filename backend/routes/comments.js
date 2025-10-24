const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addComment, getCommentsByPost } = require("../controllers/commentController");

// POST → Add new comment
router.post("/:postId", auth, addComment);

// GET → Get all comments for a post
router.get("/:postId", auth, getCommentsByPost);

module.exports = router;
