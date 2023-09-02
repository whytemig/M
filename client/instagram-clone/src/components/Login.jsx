import { Outlet, Link } from "react-router-dom";;

const Login = () => {
	return (
		<>
			<div>
				<title>Login</title>
				<h1>INSTAGRAM CLONE</h1>
				<h3>Login</h3>
				<form>
			<div>
				<label >Username</label>
				<input />
			</div>
			<div>
				<label>Password</label>
				<input />
			</div>
			<button>Submit</button>
		</form>
		<h3>Dont have an account?</h3>
		<button><Link to='/Register'>Register Account</Link></button>
		{/* Having a link will not work because it will load the link under the login form */}
		{/* must use another way to switch between sites */}
		{/* What about havng a routs and link */}

			</div>
		</>
	);
};

export default Login;


