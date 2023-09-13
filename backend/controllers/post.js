const authToken = require("../middleware/authToken");
const Post = require("../models/Post");
const User = require("../models/User");
const express = require("express");
const postRouter = express.Router();
const mongoose = require("mongoose");




// get user posts by finding it by ID
postRouter.get("/find/posts/:id", authToken, async (req, res) => {
  const id = req.params.id;

  try {
    const posts = await Post.find({ id });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});


// get timeline posts??? I don't think i'll need this but we'll see
postRouter.get("/timestatus/posts", authToken, async (req, res) => {
    const id = req.user.id;
    try {
        // get the ID for the login user
        const loginUser = await User.findById(id);
        // find all post 
        const posts = await Post.find({})
          .populate("user", "-password")
          .sort({ createdAt: -1 });

        // Find all the post for the login user.

        const loginUserPosts = await Post.find({ user: loginUser._id }).populate('user', '-password');

        // Find friends Posts by using the filter method, if the 

        const friendsPost = posts.filter((post) => {
            return loginUser.followings.includes(post.user._id)
        })

        let timeStatusPosts = loginUserPosts.concat(...friendsPost);

        if (timeStatusPosts.length > 20) {
          timeStatusPosts = timeStatusPosts.slice(0, 20);
        }

        return res.status(200).json(timeStatusPosts);

        

    } catch (err) {
         return res.status(404).json({ message: err.message });
    }
    
});
// get one post
postRouter.get('/find/:id', async (req, res) => {
        const id = req.params.id;
    
    
    try {
        console.log(id);

        const post = await Post.findById(id).populate('user', '-password');

        if (!post) {
            return res.status(404).json({ message: "No such post with this id!" });
        } else {
            return res.status(200).json(post);
        }
        
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
        
});

// create a post

postRouter.post("/create", authToken, async (req, res) => {
    const id = req.user.id;

    try {
        const userId = new mongoose.Types.ObjectId(id);
        const newPost = await Post.create({ ...req.body, user: id });

         return res.status(200).json(newPost);
        
    } catch (err) {
         return res.status(404).json({ message: err.message });
    }
    
    
});
// update a post
postRouter.put('/find/update/:id', authToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        // console.log(post)

        if (post.user.toString() === userId.toString()) {
            const updatePost = await Post.findByIdAndUpdate(postId, { $set: req.body }, { new: true })
            // console.log(updatePost);
            return res.status(200).json(updatePost);
        }
        
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }


});
// delete a post

postRouter.delete('/find/delete/:id', authToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;


    try {
        const post = await Post.findById(postId).populate('user', '-password');
        
        if (!post) {
            return res.status(404).json({ message: "Post doesn't exist" });
        } else if (post.user._id.toString() !== userId.toString()) {
            return res
                .status(404)
                .json({ msg: "You can delete only your own posts" });
        } else {
            await Post.findByIdAndDelete(postId);
            return res
                .status(500)
                .json({ message: "Post is successfully deleted" });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
});


// like a post
postRouter.put('/likeorunlike/:id', authToken, async (req, res) => {
    //Login User Id
    // Find the post by Id and update it. 

    try {
        const loginUserId = req.user.id;
        const postId = req.params.id;
        // find post by Id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const { likes } = post;

        if (post.likes.includes(loginUserId)) {
            post.likes = post.likes.filter((id) => id !== loginUserId);
            await post.save();
            return res
                .status(200)
                .json({ message: "Successfully unliked the post" });
        } else {
            likes.push(loginUserId);
            await post.save();
            return res.status(200).json({ msg: "Successfully liked the post" });
        }

        
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
});

module.exports = postRouter;

