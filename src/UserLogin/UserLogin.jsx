import React, { useState, useEffect } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import btn_close from "../assets/btn_close.png";

import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

import axios from "axios";
import "./UserLogin.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [auth, setAuth] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailOtp, setEmailOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [secret_key, setSecretKey] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const navigate = useNavigate();

  const generateSecret = () => {
    const newSecret = generateRandomSecret();
    setSecretKey(newSecret);
    const qrCodeUrl = `otpauth://totp/Reporting?secret=${newSecret}&issuer=Reporting Application`;
    setQrCodeUrl(qrCodeUrl);
    console.log(newSecret);
  };
  const generateRandomSecret = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret_key = "";
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      secret_key += charset[randomIndex];
    }
    return secret_key;
  };

  axios.defaults.withCredentials = true;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        " https://be16-125-18-168-34.ngrok-free.app/api/users/login/",
        { username, password }
      );

      console.log(response);
      console.log(response.data.status);
      console.log(response.data.data.mfa_enabled);

      if (response.data.status === "success") {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        if (response.data.data.mfa_enabled == true) {
          setAuth(true);
          generateSecret();
        } else {
          setSecretKey(null);
          setAuth(true);
        }
      } else {
        console.log("Unable to login");
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
    }
  };

  const handleCloseOTP = () => {
    setAuth(false);
    setForgotPassword(false);
    setEmailOtp(false);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const response = await axios.post(
        "https://be16-125-18-168-34.ngrok-free.app/api/users/two-factor-authentication/",
        {
          username,
          password,
          otp,
          secret_key,
        }
      );

      console.log(response.data.data.access);

      sessionStorage.setItem("access", response.data.data.access);
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("password");
      navigate("/nav");
    } catch (error) {
      console.error("Error occurred during the API request:", error);
    }
  };
  const handleResetPassword = () => {
    setForgotPassword(true);
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://be16-125-18-168-34.ngrok-free.app/api/users/request-password-reset-otp",
        {
          email,
        }
      );

      console.log(response);

      setForgotPassword(false);
      setEmailOtp(true);
      
    } catch (error) {
      console.error("Error occurred during server side:", error);
    }
    
  };

  const resetPasswordOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://be16-125-18-168-34.ngrok-free.app/api/users/verify-otp",
        {
          email,
          otp: otpEmail,
        }
      );
      console.log(response.data.status);
      if(response.data.status=='success'){
        
        sessionStorage.setItem('email',email)
        
        navigate('/setPassword')
      }

      
      
    } catch (error) {
      console.error("Error occurred during server side:", error);
    }
    
  };
  useEffect(() => {}, []);

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

                  <button className="btn-forgot" onClick={handleResetPassword}>
                    Forgot Password
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
      {auth && (
        <div className="otp-modal">
          <div className="otp-popup">
            <h1>Verify with Authenticator </h1>
            <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
            <p>
              Enter the code shown in the app to make sure everything works fine
            </p>
            <div className="qrcode">
              {secret_key ? <QRCode value={qrCodeUrl} /> : <></>}
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="otp">Google Authentication code</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-otp" onClick={handlelogin}>
                Login to your account
              </button>
            </form>
          </div>
        </div>
      )}
      {forgotPassword && (
        <div className="otp-modal">
          <div className="otp-popup">
            <h1>Forgot Password </h1>
            <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
            <p>Enter your email id to reset your password</p>
            <form>
              <div className="form-group">
                <label htmlFor="Email">Email id</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-otp" onClick={handleSendOtp}>
                Reset your password
              </button>
            </form>
          </div>
        </div>
      )}
      {emailOtp && (
        <div className="otp-modal">
          <div className="otp-popup">
            <h1>Verify OTP</h1>
            <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
            <p>
              The Verification code is Shared to user Email id
              sbmandlo@gmail.com, Please write the otp for resetting the
              password
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="Email">OTP</label>
                <input
                  type="otp"
                  className="form-control"
                  id="otp"
                  placeholder="Enter Otp"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-otp"
                onClick={resetPasswordOtp}
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLogin;
