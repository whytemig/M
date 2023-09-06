import { Outlet, Link } from "react-router-dom";
/** @type {import('tailwindcss').Config} */

const Login = () => {
	return (
		<>
		<div>
			<title>Login</title>


<div>


</div>

			<h1>INSTAGRAM CLONE</h1>
			<h3>Login</h3>
			<form>
				<div>
					<label>Username</label>
					<input />
				</div>
				<div>
					<label>Password</label>
					<input />
				</div>
				<button>
					<Link to="/home">Submit</Link>
				</button>
			</form>
			<h3>Dont have an account?</h3>
			<button>
				<Link to="/Register">Register Account</Link>
			</button>
		</div>
	</>
	);
};

export default Login;

