import { Link } from "react-router-dom";
import ModalPost from "./ModelPost";
import { useEffect, useState } from "react";
import image from "/message1.png";

const Layout = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      <div>
        <nav className="bg-white dark:bg-gray-300  w-full z-20 top-0 left-0 border-b border-gray-300 dark:border-gray-300">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between px-4">
            <a className="flex items-center">
              <span className="">
                <img src={image} alt="Logo" style={{ width: "70px" }} />
              </span>
            </a>
            <div className="flex md:order-2">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  checked={theme === "light" ? false : true}
                />
              </label>
              {/* Mig nav bar button? */}
              <div className="flex justify-around mx-auto">
                <ModalPost />
              </div>

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                {/* <span className="sr-only">Open main menu</span> */}
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            {/* Nav bar ICONS */}
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-300 md:dark:bg-gray-300 dark:border-gray-300">
                  {/* HOME LINK AND ICON */}
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/small/40/000000/home.png"
                        alt="home"
                      />
                    </Link>
                  </li>
                  {/* SEARCH BAR LINK AND ICON */}
                  <li>
                    <a
                      href="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/small/128/search--v1.png"
                        alt="search--v1"
                      />
                    </a>
                  </li>
                  {/* PROFILE LINK AND ICON */}
                  <li>
                    <Link
                      to="/profile"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black-700 md:p-0 md:dark:hover:text-black-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/small/40/user-male-circle.png"
                        alt="user-male-circle"
                      />
                    </Link>
                  </li>
                  {/* This link will allow us to import icons free DONT DELETE*/}
                  <a href="https://icons8.com/icon/43719/search"></a>{" "}
                  <a href="https://icons8.com"></a>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Layout;
