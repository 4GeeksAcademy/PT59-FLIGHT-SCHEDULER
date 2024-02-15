import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	
	
	
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary" >Sign up</button>
					</Link>
					<Link to="/login">
					<button className="btn btn-success">Login</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};
