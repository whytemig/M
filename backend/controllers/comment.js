const authToken = require("../middleware/authToken");
const Comment = require("../models/Comment");
const express = require("express");
const commentRouter = express.Router();

// Get all comments that was posted.

commentRouter.get("/:postId", authToken, async (req, res) => {
  const { id } = req.params.postId;

  try {
    const comments = await Comment.find({ id })
      .populate("user", "-password")
      .populate("post", "-user");

    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// get a comment by ID.
commentRouter.get("/find/:commentId", authToken, async (req, res) => {
  const { id } = req.params.commentId;
  try {
    const comment = await Comment.findById(id).populate("user", "-password");

    return res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// create a comment

commentRouter.post("/", authToken, async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body, user: req.user.id });
    return res.status(200).json(newComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Update comment

commentRouter.put("/update/:commentId", authToken, async (req, res) => {
  try {
      const newComment = await Comment.findById(req.params.commentId);
      
      const { commentText, user } = newComment;

    if (!newComment) {
      return res.status(500).json({ message: "No comment exits" });
    }

    
    if (user.toString() === req.user.id.toString()) {
        
      commentText = req.body.commentText;
     await Comment.findByIdAndUpdate(req.params.commentId);
      return res.status(200).json(newComment, {message: 'Comment Updated'});
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});


// delete comment 
commentRouter.delete('/delete/:commentId', authToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
      
        const { commentText, user } = comment;

        if (user.toString() === req.user.id.toString()) {
        
            await Comment.findByIdAndDelete(req.params.commentId);
            return res.status(200).json({ message: 'Comment deleted' });
        } else {
            return res.status(200).json({ message: "You can only delete User's comment" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// like/unlike comment

commentRouter.delete('/like/:commentId', authToken, async (req, res) => {
    // get the user Id;
    const loginId = req.user.id; 
    const commentId = req.params.commentId;

    try {
        const comment = await Comment.findById(commentId);

        const {likes } = comment;

        if (!likes.includes(loginId)) {
            likes.push(loginId)
            await comment.save()
             return res
               .status(200)
               .json({ message: "Comment Liked" });
        } else {
            // return a new array with the ID that doesn't match. 
             likes = likes.filter((id) => id !== loginId);
            await comment.save();
            return res.status(200).json({ message: "Comment Unliked" });

        }

    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    
})


module.exports = commentRouter;
