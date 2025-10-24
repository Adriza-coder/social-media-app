const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/messages", require("./routes/messages"));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Create Server for Socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL (Vite)
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  // Receive a comment and broadcast it to all others
  socket.on("sendComment", (comment) => {
    console.log("💬 Broadcasting comment:", comment.text);
    socket.broadcast.emit("receiveComment", comment);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Deployment setup (optional)
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
}

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
