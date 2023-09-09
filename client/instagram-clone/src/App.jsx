import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import React, { useState } from "react";
import Post from "./components/Post";

function App() {
	const [isPostOpen, setIsPostOpen] = useState(false);

	const openPost = () => {
		setIsPostOpen(true);
	};
	const closePost = () => {
		setIsPostOpen(false);
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="signup" element={<SignupPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="profile" element={<ProfilePage />} />
				</Route>
			</Routes>
<br />
<br />
<br />
			<div className="App">
				<button
					onClick={openPost}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Open Modal
				</button>

				<Post isOpen={isPostOpen} onClose={closePost}>
					<div>
						<h2 className="text-2xl mb-4">Modal Content</h2>
						<p>This is some content inside the modal.</p>
					</div>
				</Post>
			</div>
		</>
	);
}

export default App;
