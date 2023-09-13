import React, { useState } from "react";

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-0 right-0 mt-10 w-40 bg-white border border-gray-300 shadow-lg rounded-lg">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100">
              <a href="#">Home</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <a href="#">Profile</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <a href="#">Messages</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerNav;