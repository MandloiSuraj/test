
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
  const [otp,setOtp]=useState("")
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
       ' https://763e-125-18-168-34.ngrok-free.app/api/users/authenticate-user/'
        ,
        { username, password }
      );
  
      console.log(response);
      console.log(response.data.status);
  
      if (response.data.status === 'success') {
        // Save username and password to session storage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
  
        setShowOTP(true);
      } else {
        console.log('Unable to login');
      }
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };
  
  
  const handleCloseOTP = () => {
    setShowOTP(false);
  };

  const handlelogin = async(e) => {
    e.preventDefault();
    try {
      // Retrieve values from session storage
      
      const username = sessionStorage.getItem('username');
      const password = sessionStorage.getItem('password');
      
      // Make sure all required values are present
      // if (!username || !password) {
      //   console.error('Missing required values in session storage');
      //   return;
      // }
  
      // Make another API request including username, password, and authentication code
      const response = await axios.post('https://763e-125-18-168-34.ngrok-free.app/api/users/login/',
        {
          username,
          password,
          otp,
        }
      );
      
      console.log(response.data.data.access)
      
      sessionStorage.setItem('access', response.data.data.access);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('password');
      navigate('/nav')
      
    } catch (error) {
      console.error('Error occurred during the API request:', error);
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
    </>
  );
};

export default UserLogin;

