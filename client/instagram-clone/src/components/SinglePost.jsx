import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import Comment from "./Comment";
import { format } from "timeago.js";

export const SinglePost = ({ post }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    user?.bookmarkedPosts?.some(
      (bookmarkedPost) => bookmarkedPost._id === post._id
    )
  );
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();

  // 1st FUNCTION - GET ALL THE COMMENTS FROM THE COMMENT MONGOOSE COLLECTION.
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/comment/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data)
        setComments(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [post._id]);

  // DELETE THE POST BY POSTID IF THE USERID MATCHES.
  const handleDeletePOst = async () => {
    try {
      const res = await fetch(
        `http://localhost:5500/post/find/delete/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );
      const data = await res.json();
      // console.log(data)

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE THE LIKES
  const handleUpdateLikes = async () => {
    try {
      await fetch(`http://localhost:5500/post/likeorunlike/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });

      // console.log(token);
      // console.log(data)
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error.message);
    }
  };

  // UPDATE SAVE
  //  const handleBookmark = async () => {
  //    try {
  //      await fetch(`http://localhost:5500/user/bookmark/${post._id}`, {
  //        headers: {
  //          "Authorization": `Bearer ${token}`,
  //        },
  //        method: "PUT",
  //      });
  //      dispatch(bookmarkPost(post));
  //      setIsBookmarked((prev) => !prev);
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  };

  // POST A COMMENT
  const handleComment = async () => {
    if (commentText === "") {
      setIsCommentEmpty(true);
    }

    try {
      const response = await fetch(`http://localhost:5500/comment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ commentText, post: post._id }),
      });

      const data = await response.json();

      console.log(data);

      setComments(!comments);
      setCommentText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(post);

  return (
    <>
      <div className="mx-auto p-4 w-full">
        <div className="border rounded-sm w-full shadow-md">
          <div className="flex items-center px-4 py-3 bg-">
            <Link>
              {/* link to profiledetails by user ID */}
              <div className="bg-slate-600 rounded-[50%] w-full h-full p-2 text-white">
                {user && user.firstName.toString().charAt(0)}
              </div>
            </Link>
            {/* link to profiledetails by user ID */}
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">
                {post.user.firstName}
              </span>
              <span className="text-gray-600 text-xs block">
                Location: {post.location ? post.location : "Planet Earth"}
              </span>
              <span className="text-gray-600 text-xs block">
                {format(post.updatedAt)}
              </span>
            </div>
          </div>
          <img
            className="w-full h-64 object-cover object-center"
            src={
              post.photo 
                ? `http://localhost:5500/images/${post.photo}`
                : "https://placewaifu.com/image/200"
            }
            alt="Post Image"
          />
          <div className="flex items-center justify-around mx-2 mt-3 mb-2 ">
            <div className="flex">
              {user._id === post.user._id && (
                <div className="flex justify-start">
                  <BsFillTrashFill
                    className="mr-12"
                    style={{ color: "red" }}
                    size={25}
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                  />
                </div>
              )}
              {showDeleteModal && (
                <div className="absolute top-1/2 left-1/2  bg-red-500 border border-white rounded-lg p-3 flex flex-col gap-2">
                  <h3>Delete Post</h3>
                  <div className="flex justify-center gap-3 bg-gray-600 text-white">
                    <button onClick={handleDeletePOst}>Yes</button>
                    <button
                      onClick={() => setShowDeleteModal(!showDeleteModal)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {/* SAVE */}
              {isBookmarked ? (
                <BsBookmarkFill size={25} />
              ) : (
                <BsBookmark size={25} />
              )}
            </div>
            {/* LIKED */}
            <div className="flex">
              {isLiked ? (
                <AiFillHeart size={25} onClick={handleUpdateLikes} />
              ) : (
                <AiOutlineHeart size={25} onClick={handleUpdateLikes} />
              )}
            </div>
            <div className="flex">
              <BiMessageRounded
                size={25}
                onClick={() => setShowComment(!showComment)}
              />
            </div>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">
            {post.likes.length > 0 ? "Post Liked" : null}
          </div>
        </div>
        {showComment && (
          <div className="bg-slate-400 rounded-b-md">
            <div className="flex flex-col gap-7 p-6 border-b border-gray-500 max-h-[550px] overflow-auto">
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <Comment c={comment} key={comment._id} />
                ))
              ) : (
                <span className="ml-3 text-lg">No comments</span>
              )}
            </div>
            <div className="w-95 mx-auto mt-5 flex justify-between bg-white border p-3">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
                className="border-none outline-none bg-transparent  w-90 p-2 pl-1 transition-all duration-150"
                placeholder="Comment on my Post!"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
                onClick={handleComment}
              >
                Post
              </button>
            </div>
            {isCommentEmpty && (
              <span className="">You can't post empty comment!</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};
