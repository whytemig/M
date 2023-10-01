import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowSmDown } from "react-icons/hi";
import image from "/message1.png";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg p-5 shadow-md">
        <div className="bg-slate-600 rounded-md w-full h-full p-2 text-white uppercase text-center h-9"></div>

        <p className="text-center text-gray-600 mt-1 text-2xl font-bold">
          {" "}
          Welcome to the{" "}
          <span className="">
            <img
              src={image}
              alt="Logo"
              style={{ width: "65px", margin: "0 auto" }}
            />
          </span>
        </p>
        <h2 className="text-center text-2xl font-semibold mt-3">
          {" "}
          {user && `${user.lastName},${user.firstName}`}
        </h2>
        <div className="flex flex-col items-center justify-center mt-5">
          <Link to={`/profileDetail/${user._id}`}>
            <p
              href=""
              className="text-blue-500 hover:text-blue-700 mx-3 text-xl"
            >
              Profile
            </p>
          </Link>
          <hr />
          <div className="flex justify-around gap-5 my-2 text-blue-500 hover:text-blue-700 mx-3 text-xl">
            <p>
              Followers: <span>{user.followers.length}</span>
            </p>
            <p>
              Followings: <span>{user.followings.length}</span>
            </p>
          </div>
        </div>
        <div className="my-5 bg-slate-600 rounded-md">
          <p className=" my-2 text-md text-center uppercase mx-auto text-white p-1">
            Check out Suggested Friends{" "}
            <HiArrowSmDown style={{ margin: "0 auto", fontSize: "25px" }} />
          </p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProfileCard;
