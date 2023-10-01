import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleFollow } from "../redux/authSlice";

const SuggestedFriends = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [suggestedusers, setSuggestedUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFreinds = async () => {
      try {
        const response = await fetch(
          "http://localhost:5500/user/find/suggestedfriends",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setSuggestedUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFreinds();
  }, [user]);

  const addFriends = async (id) => {
    try {
      await fetch(`http://localhost:5500/user/friendorunfriend/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });

      setSuggestedUsers((prev) => {
        return [...prev].filter((user) => user._id !== id);
      });
      dispatch(handleFollow(id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mt-30">
      <div className="w-full h-auto  shadow-md">
        <div className="flex flex-col justify-center gap-3 items-center">
          <h3 className="text-xl uppercase text-slate-600 border-b-2 my-2">
            Recommended Friends
          </h3>
        </div>

        <div className="w-full">
          <div className="p-3 w-[60%] mx-auto">
            {suggestedusers?.length > 0 &&
              suggestedusers?.map((friends) => {
                return (
                  <div
                    className="flex items-center justify-around shadow-md p-3 border m-1 rounded-md"
                    key={friends._id}
                  >
                    <Link to={`/profileDetails/${friends._id}`}>
                      <div className=" text-black capitalize text-lg">
                        <h4>{`${friends.lastName}, ${friends.firstName}`}</h4>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        addFriends(friends._id);
                      }}
                      className="ml-auto bg-cyan-400 rounded-lg py-2 px-5 text-white cursor-pointer transition duration-150 hover:bg-cyan-700"
                    >
                      Add
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedFriends;
