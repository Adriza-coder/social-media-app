const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// ✅ Return currently logged-in user's info
router.get("/me", auth, async (req, res) => {
  try {
    const user = req.user; // from authMiddleware
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
