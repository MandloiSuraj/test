
import React, { useState } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import btn_close from '../assets/btn_close.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://eaf2-125-18-168-34.ngrok-free.app/api/users/login/',
        { username, password}
        // {
        //   headers: {
        //     "access-control-allow-origin" : "*",
        //     "Content-type": "application/json; charset=UTF-8"
        //   }
        // }
      );
      console.log(response);
      if (response.data.Login) {
        navigate('/nav');
      } else {
        console.log("unable to login")
      }
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleCloseOTP = () => {
    setShowOTP(false);
  };

  const handlelogin = () => {
    console.log("Hello")
    navigate('/nav')
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
                <h1>Sign In</h1>

                <form onSubmit={handleCreateAccount}>
                  <div className="form-group ">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group input-with-icon">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="signIn">
                    Sign In
                  </button>
                  <Link to={'/forgot'}>
                    <button className="btn-forgot">Forgot Password</button>
                  </Link>
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
      {showOTP && (
        <div className="otp-modal">
          <div className="otp-popup">
            <h1>Verify with Authenticator </h1>
            <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
            <p>
              Enter the code shown in the app to make sure everything works fine
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="otp">Google Authentication code</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                />
              </div>
              <button type="submit" className="btn-otp" onClick={handlelogin}>
                Login to your account
              </button>
              <button
                type="button"
                className="btn-resend"
                
              >
                Resend OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLogin;

