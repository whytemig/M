import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Signup";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
 

function App() {
	return (

		<div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</div>
		</div>

	);
}

export default App;
