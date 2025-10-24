const Message = require("../models/Message");

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    if (!text || !receiverId) return res.status(400).json({ message: "Text and receiver required" });

    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      text
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 }); // sort by oldest first

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
