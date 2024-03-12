import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const token = sessionStorage.getItem("token");
	const history = useNavigate();


	console.log("This is your token", store.token);

	const handleClick = () => {

		actions.login(email, password).then(() => {
			// history("/");
		})

		
	}

	console.log(store.token)
	return (
		<div className="text-center mt-5">

			<h1>Login</h1>
			{(store.token !== "undefined" && store.token !== null && typeof (store.token)) ? "You are logged in" :

				<div className="Login">
					<input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
					<input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

					<button type="button"
						className="btn btn-primary btn-animated"
						onClick={handleClick} >Login</button>
				</div>
			}
		</div>
	);
};
