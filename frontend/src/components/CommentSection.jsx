import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();

    // Listen for new comments in real-time
    socket.on("receiveComment", (comment) => {
      if (comment.post === postId) {
        setComments((prev) => [...prev, comment]);
      }
    });

    return () => socket.off("receiveComment");
  }, []);

  // Fetch all comments for a specific post
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Send a new comment
  const sendComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Emit comment to all users (real-time)
      socket.emit("sendComment", res.data);

      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Error sending comment:", err);
    }
  };

  return (
    <div className="mt-3 p-3 bg-purple-50 rounded-xl">
      <h3 className="font-semibold text-purple-700 mb-2">Comments</h3>

      {/* Comment List */}
      <div className="max-h-40 overflow-y-auto space-y-2">
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm text-center">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-purple-200 shadow-sm rounded-lg p-2"
          >
            <p className="text-sm">
              <span className="font-semibold text-purple-600">
                {c.user?.username || "User"}:
              </span>{" "}
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Add Comment Box */}
      <div className="flex mt-3">
        <input
          type="text"
          className="flex-1 p-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          className="bg-purple-500 text-white px-4 rounded-r-lg hover:bg-purple-600 transition"
          onClick={sendComment}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
