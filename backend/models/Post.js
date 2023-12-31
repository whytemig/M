const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      required: true,
      min: 6,
    },
    photo: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
