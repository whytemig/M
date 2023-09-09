
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";




const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');






  const navigate = useNavigate();
  const dispatch = useDispatch();


  const errorMessage = () => {
      if (
        firstName === "" ||
        lastName === "" ||
        username === "" ||
        email === "" ||
        password === ""
      ) {
        toast.error("All Inputs are require", {
          position:'top-left',
        });
      }

      if (!email.includes("@")) {
        toast.error("Invalid Email", {
          position: "top-left",
        });
      } else if (password.length < 7) {
        toast.error("Password must be 6 characters minimum", {
          position: "top-left",
        });
      } 
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
     
      
      try {
        const response = await fetch('http://localhost:5500/auth/register', {
          headers: {
            'Content-type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ firstName, lastName, username, email, password })
        });
        const data = await response.json()
        // console.log(data)
        if (data) {
          (dispatch(register(data)));
          navigate("/login");
        } 

        if (response.status === 400) {
          navigate("/signup");
        }
        
        
      } catch (error) {
        console.log(error.message)
      }
    
  }


	return (
    <>
      <div>
        <title>Register</title>
        <h1>INSTAGRAM CLONE</h1>
        <h3>Register</h3>
        <form onSubmit={handleSignUp}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your first name..."
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter a last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter youe email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter a Username..."
              onChange={(e) => setUserName(e.target.value)}
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

export default Register;

