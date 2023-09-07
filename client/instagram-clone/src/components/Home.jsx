import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";

const Home = () => {
	return (
		<>
			<div>
				<Layout />
				<Outlet />
				<p>test test test</p>
			</div>
		</>
	);
};

export default Home;
