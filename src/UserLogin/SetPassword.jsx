import React, { useState } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasswrod] = useState("");

  const navigate = useNavigate();

  const handleSetPassword=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://be16-125-18-168-34.ngrok-free.app/api/users/reset-password",
        {
          password: password,
          confirm_password: confirmPassword,
          email: sessionStorage.getItem('email')
        }
      );
      console.log(response);
      navigate("/");
      

      
      
    } catch (error) {
      console.error("Error occurred during server side:", error);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="left">
              <div className="header">
                <div className="logoMain">
                  <img
                    className="img-responsive"
                    src={logoMain}
                    alt="logoMain"
                  />
                </div>
                <div className="backbtn">
                  <button type="button" className="btn btn-default">
                    {" "}
                    <img src={arrow_down} alt="arrow" /> Back
                  </button>
                </div>
              </div>

              <div className="sign-up-form">
                <h1>Reset your Password</h1>

                <form onSubmit={handleSetPassword}>
                  <div className="form-group input-with-icon">
                    <label htmlFor="password">Write your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group input-with-icon">
                    <label htmlFor="confirm_password">
                      Confirm your Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPasswrod(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="signIn"
                    
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="right">
              <img
                className="img-responsive logoRight"
                src={logoRight}
                alt="logoRight"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
