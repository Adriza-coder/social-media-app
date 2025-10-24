const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = new Comment({
      user: req.user.id,
      post: postId,
      text,
    });

    await comment.save();

    // Link the comment to the post
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    const populatedComment = await Comment.findById(comment._id).populate("user", "username email");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
