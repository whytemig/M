import React, { useState } from "react";
import HamburgerNav from "./HamburgerNav";

// Placeholder component for the logo
const Logo = () => {
  return <div className="text-3xl font-bold">Logo</div>;
}

// Placeholder component for the dark mode button
const DarkModeButton = () => {
  // Check the initial mode from localStorage or use the default
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    // Store the mode in localStorage
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  return (
    <button
      className={`bg-gray-900 text-white px-3 py-1 rounded ${
        darkMode ? "bg-opacity-100" : "bg-opacity-50"
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? "Dark" : "Light"} Mode
    </button>
  );
};


// Placeholder component for the profile image
const ProfileImage = () => {
  return (
    <div className="w-32 h-32 rounded-full bg-gray-500 mx-auto"></div>
  );
};

const ProfilePage = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex space-x-4">
            <DarkModeButton />
            <HamburgerNav />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-1 text-center">
            <span className="text-lg font-semibold">Following</span>
            <span className="block text-sm">100</span>
          </div>
          <ProfileImage />
          <div className="flex-1 text-center">
            <span className="text-lg font-semibold">Followers</span>
            <span className="block text-sm">500</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xl font-semibold">@USERNAME</span>
        </div>
        <div className="mt-4">
          <ul className="text-center">
            <li>Biography</li>
            <li>Profession</li>
            <li>Hobbies and interests</li>
          </ul>
        </div>
      </div>
      {/* 3-column posts section */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-3 gap-4">
        {/* Render your posts here */}
        {/* You can map through your posts data and display them */}
      </div>
    </div>
  );
};

export default ProfilePage;
