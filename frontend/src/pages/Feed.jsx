import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import CommentSection from "../components/CommentSection";

dayjs.extend(relativeTime);

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = async (postId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-purple-500 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold">MySocialApp</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold hover:bg-purple-100"
          >
            Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold hover:bg-purple-100"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto mt-6">
        {/* Post creation */}
        <PostForm onPostCreated={fetchPosts} />

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No posts yet!</p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center text-white font-bold text-lg">
                    {post.user.username.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-semibold">{post.user.username}</p>
                </div>
                <span className="text-gray-400 text-sm">
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </div>

              {/* Image */}
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="post"
                  className="rounded-xl w-full max-h-96 object-cover mb-3"
                />
              )}

              {/* Caption */}
              {post.caption && <p className="mb-3">{post.caption}</p>}

              {/* Likes & Comments */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => toggleLike(post._id)}
                  className={`font-semibold ${
                    post.likes.includes(post.user._id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  ❤️ {post.likes.length}
                </button>
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => alert("Comments below!")}
                >
                  💬 Comment
                </button>
              </div>

              {/* Comment Section */}
              <CommentSection postId={post._id} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
