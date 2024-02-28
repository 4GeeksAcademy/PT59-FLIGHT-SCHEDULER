import React, { useContext } from "react"; 
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/navbar.css";

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
                    <span className="navbar-brand mb-0 h1">Authentication</span>
                </Link>
                <div className="ml-auto">
                {   !store.token ?
                        <>
                            <Link to="/signup">
                                <button className="btn btn-primary">Sign up</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-success">Login</button>
                            </Link>
                        </>
                    :
                        <div>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            <button className="btn btn-primary" onClick={goToProfile}>Profile</button>
                        </div>
                }
                </div>
            </div>
        </nav>
    );
};