import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/login.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email,setEmail] = useState("");
	const [password, setPassword] = useState("");

	
	const handleClick =() =>{
		
		const opts = {
			method :'POST',
			headers:{
				"content-type" : "application/json"
			},
			body   : JSON.stringify({
				"email": email,
				"password" : password
			})
		}

		fetch(' ', opts)
		.then(resp =>{
			if(resp.status === 200) 
				return resp.json();
			else 
				alert("There has been some errors");
		})
		.then()
		.catch(error =>{
			console.log("There was error !!!", error);
		})
	}

	return (
		<div className="text-center mt-5">
								
			<h1>Login</h1>
			<div className="Login">
				<input type="text" value={email} placeholder="Email address" onChange={(e)=>setEmail(e.target.value)} />
				<input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
				<button onClick={handleClick}>Login</button>
			</div>
			
		</div>
	);
};
