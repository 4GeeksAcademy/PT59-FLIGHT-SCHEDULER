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
    const goToHome = () => navigate("/");

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Logo here</span>
                </Link>
                <div className="ml-auto">
                {   ! Home ? null : (

                        <>
                            <Link to="/signup">
                                <button type="button"
					 			className="btn btn-primary btn-animated">Sign up</button>
                            </Link>
                            <Link to="/login">
                                <button type="button"
					 			className="btn btn-primary btn-animated2">Login</button>
                            </Link>
                            <Link to="/">
                            <button type="button" className="btn btn-warning" onClick={goToHome}>Home </button>
                            </Link>
                        </>
                )}
                {! Home && (
                        <div>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            <button className="btn btn-primary" onClick={goToProfile}>Profile</button>
                            
                        </div>
                )}
                </div>
            </div>
           
        </nav>
    );
};