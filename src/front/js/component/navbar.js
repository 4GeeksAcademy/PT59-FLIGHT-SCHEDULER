import React, { useContext } from "react"; 
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/navbar.css";
import Home from "../pages/home";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    // Function to handle logout and navigate to login page
    const handleLogout = () => {
        actions.logout();
        navigate("/login");     };

    // Function to navigate to profile
    const goToProfile = () => navigate("/profile");

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Logo here</span>
                </Link>
                <div className="ml-auto">
                {   store.token ? <div>
                            <button className="btn btn-danger btn-animated3" onClick={handleLogout}>Logout</button>
                            <button className="btn btn-primary btn-animated4" onClick={goToProfile}>Profile</button>
                        </div>
                    : (

                        <>
                            <Link to="/signup">
                                <button type="button"
					 			className="btn btn-primary btn-animated">Sign up</button>
                            </Link>
                            <Link to="/login">
                                <button type="button"
					 			className="btn btn-primary btn-animated2">Login</button>
                            </Link>
                        </>
                )}
                
                </div>
            </div>
        </nav>
    );
};