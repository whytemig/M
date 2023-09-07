import { Outlet, Link } from "react-router-dom";
/** @type {import('tailwindcss').Config} */
import Layout from "./Layout";

const Home = () => {
	return (
		<>
			<div>
				<Layout/>
				<p>
					fuck this shit
				</p>
			</div>
			<Outlet/>

		</>
	);
};

export default Home;
