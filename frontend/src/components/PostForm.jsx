import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption && !image) {
      setError("Please add a caption or image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCaption("");
      setImage(null);
      setError("");
      onPostCreated(res.data); // refresh feed
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
