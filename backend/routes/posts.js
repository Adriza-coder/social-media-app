const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { createPost, getPosts, toggleLike } = require("../controllers/postController");

router.post("/", auth, upload.single("image"), createPost);
router.get("/", auth, getPosts);
router.put("/like/:id", auth, toggleLike);

module.exports = router;