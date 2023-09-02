import { Outlet, Link } from "react-router-dom";

const Register = () => {
	return (
		<>
			<div>
				<title>Register</title>
				<h1>INSTAGRAM CLONE</h1>
				<h3>Register</h3>
				<form>
					<div>
						<label>Email</label>
						<input />
					</div>
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
				<h3>Already have an account?</h3>
				<button>
					<Link to="/Login">Login</Link>
				</button>
				
			</div>
		</>
	);
};

export default Register;
