import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Outlet } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const errorMessage = () => {
		if (password === "") {
			toast.error("All Inputs are require", {
				position: "top-left",
			});
		}

		if (!email.includes("@")) {
			toast.error("Invalid Email", {
				position: "top-left",
			});
		} else if (password.length < 7) {
			toast.error("Password must be 6 characters minimum", {
				position: "top-left",
			});
		}
	};

	const handleLoginUp = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:5500/auth/login", {
				headers: {
					"Content-type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();

			dispatch(login(data));

			setEmail("");
			setPassword("");
			navigate("/");
		} catch (error) {}
	};

	return (
		<>
			<div>
				<div>
					<section className="bg-gray-50 dark:bg-gray-900">
						<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
							{/* Title */}
							<a
								href="#"
								className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
							>
								Instagram clone
							</a>
							<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
								<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
									{/* Login title */}
									<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
										Login
									</h1>
									<form
										className="space-y-4 md:space-y-6"
										action="#"
										onSubmit={handleLoginUp}
									>
										{/* Email input field */}
										<div>
											<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Email{" "}
											</label>
											<input
												type="email"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Enter your email"
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										{/* Password input field */}
										<div>
											<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
												Password
											</label>
											<input
												type="password"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Enter your passworddd"
												required=""
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>

										{/* Login button */}
										<button
											type="submit"
											className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
											onClick={errorMessage}
										>
											Login
										</button>

										{/* Creat account button link */}
										<p className="text-sm font-light text-gray-500 dark:text-gray-400">
											Dont have an account? {""}
											<button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
												<Link to="/signup">Create Account</Link>
											</button>
										</p>
										<ToastContainer />
									</form>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Login;
