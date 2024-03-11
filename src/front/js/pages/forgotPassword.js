import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [message, setMessage] = useState(
    "Please enter your email to request for a password reset"
  );
  const { store, actions } = useContext(Context);

  const handleSubmit = async () => {
    let result = await actions.forgotPasswordRequest(email);
    if (result) {
      setMessage("An email with a password reset link has been sent to you!");
      setShowInput(false);
    } else {
      setMessage(
        "An error occurs while attempting to send your password reset request! Please try again later!"
      );
      setShowInput(false);
    }
  };
  return (
    <div className="pt-5">
      <form
        className="mx-auto text-center "
        style={{ width: "25rem" }}
        onSubmit={() => handleSubmit()}
      >
        <h1>Forgot Password</h1>
        <p> {message} </p>
        {showInput ? (
          <div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label ">
                Email address:
              </label>
              <input
                type="email"
                class="form-control  mx-auto"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
