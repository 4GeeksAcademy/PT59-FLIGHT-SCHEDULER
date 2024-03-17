import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";

export const Signup = () => {

  const { store, actions } = useContext(Context);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => { 
    e.preventDefault();
    let result = await actions.signup(first_name, last_name, email, password);
    if (result === true) {
      navigate("/login");
    } else {
      alert(
        "An error occurred during signup. Please check your information and try again."
      );
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Sign up</h1>
      <form className="signup" onSubmit={handleClick}>
        <div className="row">
          <div className="col-6">
            <label> First Name </label>
            <input
              type="text"
              value={first_name}
              placeholder="First Name"
              onChange={(e) => setFirst_name(e.target.value)}
            />

            <label> Email </label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-2">
            <label> Last Name </label>
            <input
              type="text"
              value={last_name}
              placeholder="Last Name"
              onChange={(e) => setLast_name(e.target.value)}
            />

            <label> Password </label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary btn-animated"
                
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

};
