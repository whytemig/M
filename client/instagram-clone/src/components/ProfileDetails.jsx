import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { SinglePost } from "./SinglePost";
import { handleFollow } from "../redux/authSlice";

const ProfileDetails = () => {
  const [profile, setProfile] = useState("");
  const [profilePosts, setProfilePosts] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);
  const [show, setShow] = useState("mypost");
  const dispatch = useDispatch();
  const { id } = useParams();

  // fetch profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5500/user/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // console.log(data);
        setProfile(data);

        if (user?._id !== data?._id) {
          setIsFollowed(user?.followings?.includes(data?._id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [id]);

  // get use by id post
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        const res = await fetch(`http://localhost:5500/post/find/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // console.log(data);

        setProfilePosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    profile && fetchProfilePosts();
  }, [profile]);

  // follow function
  const handleFollowFunction = async () => {
    try {
      await fetch(
        `http://localhost:5500/user/friendorunfriend/${profile?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
        }
      );

      dispatch(handleFollow(id));

      setProfile((prev) => {
        return {
          ...prev,
          followers: isFollowed
            ? [...prev.followers].filter((id) => id !== user._id)
            : [...prev.followers, user._id],
        };
      });
      setIsFollowed((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout />
      <div className="min-h-[calc(100vh-60px)] h-full max-h-full w-full">
        <div className="w-90 h-full mx-auto mt-6 flex flex-col items-center">
          <div className="flex items-center gap-1 p-3 border rounded-md shadow-md">
            <div className=" w-full flex flex-col gap-3">
              <h4 className="text-center uppercase font-bold text-4xl w-full">
                {profile?.username}
              </h4>
              <h4 className="">
                BIO: {profile?.desc ? profile.desc : "Life & Stuff"}
              </h4>
            </div>
            {profile?._id !== user._id && (
              <button
                className=" py-1 px-3 bg-blue-600 border border-transparent hover:border-blue-700 rounded-md text-white text-lg cursor-pointer mx-8"
                onClick={handleFollowFunction}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="flex justify-between gap-40 my-10">
            <div className="font-bold text-18 text-gray-700">
              Followings: {profile?.followings?.length}
            </div>
            <div className="font-bold text-18 text-gray-700">
              Followers: {profile?.followers?.length}
            </div>
          </div>
          {user._id === profile?._id && (
            <div className="flex justify-between gap-32 mb-6 ">
              <button
                onClick={() => setShow("mypost")}
                className={`${
                  show === "mypost" && "active"
                } p-3 border rounded-md shadow-md uppercase font-bold text-cyan-500`}
              >
                My posts
              </button>
              <button
                onClick={() => setShow("bookmarked")}
                className={`${
                  show === "bookmarked" && "active"
                } p-3 border rounded-md shadow-md uppercase font-bold text-cyan-500`}
              >
                Bookmarked
              </button>
            </div>
          )}

          {show === "mypost" && profilePosts?.length > 0 ? (
            <div className="bottom">
              {profilePosts?.map((post) => (
                <SinglePost post={post} key={post._id} />
              ))}
            </div>
          ) : show === "mypost" ? (
            <h2>Profile has no posts</h2>
          ) : (
            ""
          )}
          {show === "bookmarked" && profilePosts?.length > 0 ? (
            <div className="bottom">
              {user?.bookmarkedPosts?.map((post) => (
                <SinglePost post={post} key={post._id} />
              ))}
            </div>
          ) : show === "bookmarked" ? (
            <h2>You have no bookmarked posts</h2>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
