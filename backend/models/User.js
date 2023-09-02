const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profileImg: {
      type: String,
      default: "",
    },
    followings: {
      type: [String],
      default: [],
    },
    followers: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    bookmarkedPosts: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
