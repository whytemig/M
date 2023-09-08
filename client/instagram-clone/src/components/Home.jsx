import React from 'react'
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const Home = () => {
	return (
		<>
			<div>
				<Layout/>
			<p>test test test</p>
			</div>
			<Outlet/>

		</>
	);
};

export default Home;
