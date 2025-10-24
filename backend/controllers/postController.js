const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Create post
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file?.path; // optional image

    // Require at least caption or image
    if (!caption && !image) {
      return res.status(400).json({ message: "Caption or image required" });
    }

    const newPost = new Post({
      user: req.user.id,
      image,
      caption
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts (feed)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .populate({ path: "comments", populate: { path: "user", select: "username" } })
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like / Unlike
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) post.likes.push(req.user.id);
    else post.likes.splice(index, 1);

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
