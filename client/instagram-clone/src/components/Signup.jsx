// import { Outlet, Link } from "react-router-dom";

// const Register = () => {
// 	return (
// 		<>
// 			<div>
// 				<title>Register</title>
// 				<h1>INSTAGRAM CLONE</h1>
// 				<h3>Register</h3>
// 				<form>
// 					<div>
// 						<label>Email</label>
// 						<input />
// 					</div>
// 					<div>
// 						<label>Username</label>
// 						<input />
// 					</div>
// 					<div>
// 						<label>Password</label>
// 						<input />
// 					</div>
// 					<button>
// 						<Link to="/home">Submit</Link>
// 					</button>
// 				</form>
// 				<h3>Already have an account?</h3>
// 				<button>
// 					<Link to="/Login">Login</Link>
// 				</button>
// 			</div>
// 		</>
// 	);
// };

// export default Register;

import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                    
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />

        </div>

         

      </form>
    )
}
