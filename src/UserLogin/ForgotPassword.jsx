import React, { useState } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserLogin.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:5000/login', {username, password })
    //   .then(response => {
    //     if(response.data.Login){
    //         navigate('/dashboard');
    //     }else{
    //         navigate('/');
    //     }

    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

    setShowOTP(true);
  };

  const handleforgotPassword = () => {
    navigate("/");
  };

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

                <form onSubmit={handleCreateAccount}>
                  <div className="form-group input-with-icon">
                    <label htmlFor="password">Write your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
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
                    />
                  </div>
                  {/* <Link to={'/login'}> */}
                  <button
                    type="submit"
                    className="signIn"
                    onClick={handleforgotPassword}
                  >
                    Sign In
                  </button>
                  {/* </Link> */}
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

export default ForgotPassword;
