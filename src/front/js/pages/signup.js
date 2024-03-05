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

  const handleClick = async () => {
    let result = await actions.signup(first_name, last_name, email, password)
      console.log(result)
      if(result == true){
        navigate("/login");
      }else{
        alert("An error occurs when trying to signup");
      }
      
    };
    

  return (
    <div className="text-center mt-5">
      <h1>Sign up</h1>
      <div className="signup">
        <div className="row">
          <div className="col-2">
            <input
              type="text"
              value={first_name}
              placeholder="First Name"
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              value={last_name}
              placeholder="Last Name"
              onChange={(e) => setLast_name(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary btn-animated"
                onClick={handleClick}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
