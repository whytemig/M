import "./App.css";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Register";


function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
				<Route index element={<Home />} />
				<Route path="Register" element={<Register />} />

			
		</Routes>
	);
}

export default App;
