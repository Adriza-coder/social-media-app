import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(res.data);
      fetchPosts(res.data._id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchPosts = async (userId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter((post) => post.user._id === userId);
      setUserPosts(filtered);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-purple-500 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">{userInfo.username}'s Profile</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/feed")}
            className="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold hover:bg-purple-100"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="bg-white text-purple-500 px-4 py-1 rounded-lg font-semibold hover:bg-purple-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* User info */}
      <section className="max-w-2xl mx-auto mt-6 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-purple-400 text-white flex items-center justify-center text-3xl font-bold mb-3">
          {userInfo.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-semibold mb-1">{userInfo.username}</h2>
        <p className="text-gray-500 mb-3">{userInfo.email}</p>
        <p className="text-sm text-gray-600">
          Total Posts: <span className="font-semibold">{userPosts.length}</span>
        </p>
      </section>

      {/* User posts */}
      <main className="max-w-2xl mx-auto mt-6 space-y-6">
        {userPosts.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">No posts yet!</p>
        ) : (
          userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="post"
                  className="rounded-xl w-full max-h-96 object-cover mb-3"
                />
              )}
              {post.caption && <p className="mb-2">{post.caption}</p>}
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>{dayjs(post.createdAt).format("DD MMM YYYY, HH:mm")}</span>
                <span>❤️ {post.likes.length}</span>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Profile;
