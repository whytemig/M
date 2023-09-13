const User = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const Post = require('../models/Post');
const authToken = require('../middleware/authToken');



// Get friends that will be suggested

userRouter.get('/find/suggestedfriends', authToken, async (req, res) => {
    // console.log(req.user)
    try {
        // find the person logged in.
        const loginUser = await User.findById(req.user.id);
        // console.log(loginUser)
        // find the friends with password remove
        const users = await User.find({}).select('-password')
        // console.log(users)


        // Aquire friends that are suggested and are not our friends and its not us. 
        let suggestedFriends = users.filter((user) => {
            return !loginUser.followings.includes(user._id) && user._id !== loginUser._id
        })


        if (suggestedFriends.length >= 7) {
            suggestedFriends = suggestedFriends.slice(0, 7)
        }
        
        return res.status(200).json(suggestedFriends)
        
    } catch (err) {
       return  res.status(404).json({ message: err.message }); 
    }
})




// Get Friends

userRouter.get('/find/friends', authToken, async (req, res) => {
    const id = req.user.id;
    // console.log(id)

    try {
        const loginUser = await User.findById(id);
        const { followings } = loginUser;
       

        // get all friends that follow the login users by the ID, formatting their passwords. As each login users have an ID that can be used.


        const friends = await Promise.all(
            (followings).map((friendId) => {
                return User.findById(friendId).select('-password')
            }));
        
        
         return res.status(200).json(friends);
    } catch (err) {
         return  res.status(404).json({ message: err.message });
    }
})




// Get One by id
userRouter.get("/find/:userId", authToken, async (req, res) => {
    const id = req.params.userId

    try {
        const user = await User.findById(id).select('-password');  

         if (!user) {
           return res.status(500).json({ msg: "No such user, wrong id!" });
        }
        
         return res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({ message: err.message }); 
    }
});


// Get All

userRouter.get('/findAll', authToken, async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); 
         const formattedUsers = users.map((user) => {
           return {
             username: user.username,
             email: user.email,
             _id: user._id,
             createdAt: user.createdAt,
           };
         });
        
         return res.status(200).json(formattedUsers);
    } catch (err) {
      return  res.status(404).json({ message: err.message }); 
    }
})
// Update info
userRouter.put('/updateprofile/:userId', authToken, async (req, res) => {
    const userId = req.params.userId;
    // console.log(userId);
    const loginId = req.user.id;
    // console.log(loginId);

    if (userId === loginId) {
      const { password } = req.body;
        try {
            if (password) {
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt)
            }
            const updatedUser = await User.findByIdAndUpdate(
              userId,
              { $set: req.body },
              { new: true }
            );
            return res.status(200).json(updatedUser); 

      } catch (err) {
         return  res.status(404).json({ message: err.message });
      }  
    } else {
        // Only the person that is logged in can update the profile.
        return res.status(404).json({message: "Only Your profile can be updated"})
    }
    
 }
)




// Delete Info
userRouter.delete('/deleteprofile/:userId', authToken, async (req, res) => {
     const userId = req.params.userId;
    const loginId = req.user.id;

    if (userId === loginId) { 
        try {
            await User.findByIdAndDelete(loginId)
            return res.status(200).json({message: "Profile Page Deleted"}) 
        } catch (err) {
         return  res.status(404).json({ message: 'Only your profile can be deleted' });  
        }
    }
})


// Update: Add friend or Unfriend
userRouter.put('/friendorunfriend/:friendUserId', authToken, async (req,res)=>{
    try {
         const loginId = req.user.id;
        const friendId = req.params.friendUserId;
        
        if (loginId === friendId) {
           return res
             .status(404)
             .json({ message: "Can't follow yourself" });
        }

         const loginUser = await User.findById(loginId);
        const friendUser = await User.findById(friendId);
        
        if (!loginUser.followings.includes(friendId)) {
            loginUser.followings.push(friendId)
            friendUser.followers.push(loginId)

             await User.findByIdAndUpdate(
               loginId,
               { $set: loginUser },
               { new: true }
             );
             await User.findByIdAndUpdate(
               friendId,
               { $set: friendUser},
               { new: true }
            );
            return res
              .status(200)
              .json({ msg: "Follow friend" });
        } else {
             loginUser.followings = loginUser.followings.filter(
               (id) => id !== friendId
             );
             friendUser.followers = friendUser.followers.filter(
               (id) => id !== loginId
            );
            
            await User.findByIdAndUpdate(
              loginId,
              { $set: loginUser },
              { new: true }
            );
            await User.findByIdAndUpdate(
              friendId,
              { $set: friendUser },
              { new: true }
            );

            return res
              .status(200)
                .json({message: "unfollow Friend" });

        }


        
    } catch (err) {
        return res
          .status(404)
          .json({ message: err.message});  
    }
})


// Update: Save
userRouter.put('/bookmark/:postId', authToken, async (req, res) => {

  // Population is the process of replacing the specified path in the document of one collection with the actual document from the other collection.
  // After using the populate method, we can see that in the output we can get all the user data inside the postedBy field of posts.
    try {
        const post = await Post.findById(req.params.postId).populate("user", '-password')
        console.log(post)

        if (!post) {
           return res.status(404).json({ message: "No such post" }); 
        } else {
          // some takes in a callback function where you can write your own logic to determine if an array contains some element which matches the conditions you wrote. includes does a generic equalTo comparison on every element and will return true if at least one element in the array is equal to the value to find.
            
            // console.log(post.user)


            let postUserArray = post.user.bookMarkedPost;

            if (postUserArray.some((post)=> post._id === req.params.postId)) {
                await User.findByIdAndUpdate(req.user.id, { $pull: { 'bookmarkedPosts': post } })
                return res
                  .status(200)
                  .json({ msg: "Successfully unbookmarked/unsaved the post" });
            } else {
              await User.findByIdAndUpdate(req.user.id, {
                $addToSet: { 'bookmarkedPosts': post },
              }); 
                 return res
                   .status(200)
                   .json({ message: "Successfully boomkarked/saved the post" });
            }
            
        }

  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
})


module.exports = userRouter;
