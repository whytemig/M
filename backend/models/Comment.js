const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", CommentSchema);

module.exports = Comment;
