import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import Home from "../pages/home";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  console.log(store.user);
  // Function to handle logout and navigate to login page
  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  // Function to navigate to profile
  const goToProfile = () => navigate("/profile");
  // const goToHome = () => navigate("/");

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
      
          <Link to="/" className="navbar-brand">
            <img className=" mh-5 mw-5 logo" src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fwww.bing.com%2Fimages%2Fcreate%2FgetThumbnail%2F1-65f772fd98da4393aa54f8faedcc2408%3Fid%3D%252fawD8maDVbYwIrvBs53uDg%253d%253d" />
          </Link>
        
        <div className="ml-auto">
          {store.token ? (
            <div>
              <button
                className="btn btn-danger btn-animated3 m-3"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="btn btn-primary btn-animated4"
                onClick={goToProfile}
              >
                Profile
              </button>
            </div>
          ) : (
            <>
              <Link to="/signup">
                <button type="button" className="btn btn-primary btn-animated m-3">
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button type="button" className="btn btn-primary btn-animated2 ml-2">
                  Login
                </button>
              </Link>
              {/* <Link to="/">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={goToHome}
                >
                  Home{" "}
                </button>
              </Link> */}
            </>
          )}
          {!Home && (
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger mr-2" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn btn-primary" onClick={goToProfile}>
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
