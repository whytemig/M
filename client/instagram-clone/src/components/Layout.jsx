import { Outlet, Link } from "react-router-dom";
import ModalPost from "./ModelPost";
import { useEffect, useState } from "react";

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
					<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
						<a className="flex items-center">
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
								TITLE
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

								{/* sun and mmon icon */}
								{/* <svg
									className="swap-on fill-current w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
								</svg>

								
								<svg
									className="swap-off fill-current w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
								</svg> */}
							</label>
							{/* Mig nav bar button? */}
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
									{/* <li>
									
			<ModalPost />

								</li> */}
									{/* This link will allow us to import icons free DONT DELETE*/}
									<a href="https://icons8.com/icon/43719/search"></a>{" "}
									<a href="https://icons8.com"></a>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
			{/* <Outlet /> */}
		</>
	);
};

export default Layout;
