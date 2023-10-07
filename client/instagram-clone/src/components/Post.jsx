import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SinglePost } from "./SinglePost";

import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import SuggestedFriends from "./SuggestedFriends";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/post/timestatus/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        response.status === 500 && navigate("/login");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="min-h-screen flex justify-center mx-auto">
        <div className="w-full grid grid-cols-2 gap-4 max-w-[960px] md:grid-cols-2 px-4">
          {posts
            ?.slice()
            .reverse()
            .map((post) => {
              return <SinglePost key={post._id} post={post} />;
            })}
        </div>

        <div className="hidden px-4 md:block flex-1 p-4">
          <ProfileCard />
          <hr />
          <SuggestedFriends />
        </div>
      </div>
    </div>
  );
};
export default Post;
