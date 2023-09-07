import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const errorMessage = () => {
    if (
      password === ""
    ) {
      toast.error("All Inputs are require", {
        position: "top-left",
      });
    }

    if (!email.includes("@")) {
      toast.error("Invalid Email", {
        position: 'top-left',
      });
    } else if (password.length < 7) {
      toast.error("Password must be 6 characters minimum", {
        position: 'top-left',
      });
    }
	};
	
	const handleLoginUp = async (e) => { 
		e.preventDefault();
		
		try {
			const response = await fetch("http://localhost:5500/auth/login", {
        headers: {
          "Content-type": "application/json",
				},
				method: 'POST',
				body: JSON.stringify({email, password})
			});
			const data = await response.json();
			
			dispatch(login(data))
			
			setEmail('')
			setPassword('')
			navigate('/')
			
		} catch (error) {
			
		}

	}
	

  return (
    <>
      <div>
       
        <h1>INSTAGRAM CLONE</h1>
        <h3>Login</h3>
        <form onSubmit={handleLoginUp}>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter youe email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter a password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={errorMessage}>Submit</button>
        </form>
        <h3>Already have an account?</h3>
        <button>Login</button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
