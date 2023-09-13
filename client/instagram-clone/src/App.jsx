import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import React, { useState } from "react";
import Post from "./components/Post";
import Layout from "./components/Layout";

function App() {
	return (
		<>
			
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="profile" element={<ProfilePage />} />
					</Route>

					<Route path="signup" element={<SignupPage />} />
					<Route path="login" element={<LoginPage />} />
				</Routes>
			
		</>
	);
}

export default App;
