import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchProfiles = () => {
    fetch(`/user/search?term=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          console.error(
            "Received non-JSON response:",
            response.status,
            response.statusText
          );
          // Handle non-JSON response here, if needed
          // For example, you can return an empty array for profiles or handle it differently.
          return []; // Return an empty array as a placeholder
        }
      })
      .then((data) => {
        console.log(data);
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  // Fetch profiles when the search term changes
  useEffect(() => {
    fetchProfiles();
  }, [searchTerm]);

  return (
    <div className="relative inline-block text-left">
      {" "}
      {/* Adjusted the div styles */}
      <div className="mb-4 relative">
        <input
          id="searchTerm"
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded bg-white text-gray-900 hover:bg-gray-100 md:hover:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark:text-white" // Updated styling here
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay hiding for user to click an item
        />
        {/* Dropdown */}
        {showDropdown && (
          <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            {profiles.map((profile) => (
              <Link
                to={`/profile/${profile._id}`}
                key={profile._id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-black-500 dark:hover:bg-gray-700" // Updated styling here
              >
                <div className="flex items-center">
                  {/* <img
                      src={profile.avatarUrl}
                      alt="Profile Avatar"
                      className="w-10 h-10 rounded-full"
                    /> */}
                  <div className="ml-4">
                    <p className="font-semibold">{profile.username}</p>
                    {/* <p className="text-gray-500">{profile.fullName}</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
