const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/", auth, sendMessage);               // send message
router.get("/:userId", auth, getMessages);         // get messages between users

module.exports = router;
