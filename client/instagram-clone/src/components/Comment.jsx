import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useState, useEffect } from "react";

const Comment = ({ com }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState(com);
  const [isLiked, setIsLiked] = useState(comment?.likes?.includes(user._id));


  const handleLikeComment = async () => {
    try {
      await fetch(`http://localhost:5500/comment/like/${com?._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "PUT"
      });

       setComment((prev) => {
         return {
           ...prev,
           likes: isLiked
             ? [...prev.likes].filter((id) => id !== user._id)
             : [...prev.likes, user._id],
         };
       });
      setIsLiked(!isLiked);

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="flex justify-between items-center p-1/4 p-1/2">
      <div className="flex items-center gap-2 ">
        <div className="bg-slate-600 rounded-[50%] w-full h-full p-2 text-white">
          {user && user.firstName.toString().charAt(0)}
        </div>
        <div className="flex flex-col mr-6 min-w-[100px]">
          <span>{comment?.user?.username ? comment?.user?.username : ""}</span>
          <span className="text-sm text-gray-600">
            {format(comment?.createdAt)}
          </span>
        </div>
        <div className="self-start text-base text-gray-800 w-3/4 break-words">
          {comment.commentText}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1/4 cursor-pointer">
        {isLiked ? (
          <AiFillHeart onClick={handleLikeComment} />
        ) : (
          <AiOutlineHeart onClick={handleLikeComment} />
        )}
        <span>{comment?.likes?.length || 0}</span>
        <span>likes</span>
      </div>
    </div>
  );
}

export default Comment