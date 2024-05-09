import React, { useState, useEffect } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import lock from "../assets/lock.png";
import eye from "../assets/eye.png";
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
  const [showModal, setShowModal] = useState(false); // sdhsdhsjh
  const [authCode, setAuthCode] = useState(""); // ldkjfdkj
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
        " http://125.18.168.34:7000/api/users/login/",
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
        "http://125.18.168.34:7000/api/users/two-factor-authentication/",
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
        "http://125.18.168.34:7000/api/users/request-password-reset-otp",
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
        "http://125.18.168.34:7000/api/users/verify-otp",
        {
          email,
          otp: otpEmail,
        }
      );
      console.log(response.data.status);
      if (response.data.status == "success") {
        sessionStorage.setItem("email", email);

        navigate("/setPassword");
      }
    } catch (error) {
      console.error("Error occurred during server side:", error);
    }
  };
  useEffect(() => {}, []);

  return (
    // <>
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-md-6">
    //         <div className="left">
    //           <div className="header">
    //             <div className="logoMain">
    //               <img
    //                 className="img-responsive"
    //                 src={logoMain}
    //                 alt="logoMain"
    //               />
    //             </div>
    //             <div className="backbtn">
    //               <button type="button" className="btn btn-default">
    //                 {" "}
    //                 <img src={arrow_down} alt="arrow" /> Back
    //               </button>
    //             </div>
    //           </div>

    //           <div className="sign-up-form">
    //             <h1>Sign In</h1>

    //             <form onSubmit={handleCreateAccount}>
    //               <div className="form-group ">
    //                 <label htmlFor="username">Username</label>
    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   id="username"
    //                   placeholder="Username"
    //                   value={username}
    //                   onChange={(e) => setUsername(e.target.value)}
    //                 />
    //               </div>
    //               <div className="form-group input-with-icon">
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                   type="password"
    //                   className="form-control"
    //                   id="password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />
    //               </div>
    //               <button type="submit" className="signIn">
    //                 Sign In
    //               </button>

    //               <button className="btn-forgot" onClick={handleResetPassword}>
    //                 Forgot Password
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-6 ">
    //         <div className="right">
    //           <img
    //             className="img-responsive logoRight"
    //             src={logoRight}
    //             alt="logoRight"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {auth && (
    //     <div className="otp-modal">
    //       <div className="otp-popup">
    //         <h1>Verify with Authenticator </h1>
    //         <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
    //         <p>
    //           Enter the code shown in the app to make sure everything works fine
    //         </p>
    //         <div className="qrcode">
    //           {secret_key ? <QRCode value={qrCodeUrl} /> : <></>}
    //         </div>

    //         <form>
    //           <div className="form-group">
    //             <label htmlFor="otp">Google Authentication code</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               id="otp"
    //               placeholder="Enter OTP"
    //               value={otp}
    //               onChange={(e) => setOtp(e.target.value)}
    //             />
    //           </div>
    //           <button type="submit" className="btn-otp" onClick={handlelogin}>
    //             Login to your account
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    //   {forgotPassword && (
    //     <div className="otp-modal">
    //       <div className="otp-popup">
    //         <h1>Forgot Password </h1>
    //         <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
    //         <p>Enter your email id to reset your password</p>
    //         <form>
    //           <div className="form-group">
    //             <label htmlFor="Email">Email id</label>
    //             <input
    //               type="email"
    //               className="form-control"
    //               id="email"
    //               placeholder="Enter Email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //           </div>
    //           <button type="submit" className="btn-otp" onClick={handleSendOtp}>
    //             Reset your password
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    //   {emailOtp && (
    //     <div className="otp-modal">
    //       <div className="otp-popup">
    //         <h1>Verify OTP</h1>
    //         <img src={btn_close} alt="closebtn" onClick={handleCloseOTP} />
    //         <p>
    //           The Verification code is Shared to user Email id
    //           sbmandlo@gmail.com, Please write the otp for resetting the
    //           password
    //         </p>
    //         <form>
    //           <div className="form-group">
    //             <label htmlFor="Email">OTP</label>
    //             <input
    //               type="otp"
    //               className="form-control"
    //               id="otp"
    //               placeholder="Enter Otp"
    //               value={otpEmail}
    //               onChange={(e) => setOtpEmail(e.target.value)}
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="btn-otp"
    //             onClick={resetPasswordOtp}
    //           >
    //             Reset password
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </>

    // --------------------------------------------------------
    <>
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-white h-screen flex flex-col">
          {/* Navigation Bar */}
          <nav
            className="h-[90px] flex items-center font-fw font-Nova justify-between px-6 border-b"
            style={{ borderBottom: "1px solid #F1F4F9", paddingTop: "10px" }}
          >
            {/* Logo at the left corner */}
            <div className="flex items-center">
              <img src={logoMain} alt="Logo" className="h-15 w-auto" />
            </div>
            {/* Back button at the right corner */}
            <div className="flex items-center">
              {/* Back button with border and icon */}
              <button className="text-bold-blue border font-Nova font-fw border-blue-500 rounded-md px-4 py-2 flex items-center">
                {/* Icon */}
                <img
                  src={arrow_down}
                  alt="Back Icon"
                  className="h-4 w-4 mr-2"
                />
                Back
              </button>
            </div>
          </nav>
          {/* Form */}
          <div className="flex-grow flex items-center justify-center flex-col mb-60 p-6">
            <h2 className="text-4xl font-Nova font-fw mb-4 mr-[170px] text-bold-blue">
              Sign In
            </h2>
            <form className="w-full max-w-sm">
              <div className="mb-4 relative">
                <label
                  htmlFor="username"
                  className="block text-label font-Nova font-fw"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-Nova font-fw text-Input text-inputcolor"
                  style={{ padding: "0.75rem" }} // Added padding
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-label font-Nova font-fw"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10 font-Nova text-Input font-fw text-inputcolor"
                    style={{ padding: "0.75rem" }} // Added padding
                  />
                  <img
                    src={lock}
                    alt="Start Icon"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  />
                  <img
                    src={eye}
                    alt="End Icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  />
                </div>
              </div>
              <button
                id="signin-button"
                className="bg-bold-blue font-Nova font-fw text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors w-full"
              >
                Sign In
              </button>
            </form>

            <button className="text-bold-blue font-Nova font-fw mt-2">
              Forgot Password
            </button>
          </div>
        </div>
        {/* Right Section */}
        <div className="md:flex md:items-center md:justify-center w-1/2 bg-[#D0EFFC] h-screen">
          {/* Center the image within the section */}
          <div className="w-575px h-194.7px bg-white flex items-center justify-center">
            <img
              src={logoRight}
              alt=""
              className="object-contain md:object-cover w-full h-full"
            />
          </div>
        </div>

        {/* auth popup */}
        {/* <div
          id="myModal"
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-32 rounded-lg  relative flex flex-col justify-between h-[300px] w-[560px]">
            <div>
              <img
                src={btn_close}
                alt="Close"
                className="absolute top-7 right-6 cursor-pointer"
                onClick={() => closeModal()}
              />
              <h2 className="text-bold-blue text-4xl font-Nova font-fw mb-4">
                Verify with Authenticator
              </h2>
              <p className="text-black font-Nova   mb-4">
                Enter the code shown in the app to make sure everything works
                fine.
              </p>
              <label
                htmlFor="google-auth-code"
                className="block text-label font-Nova font-fw mb-2"
              >
                Google Authentication code
              </label>
              <input
                type="text"
                id="google-auth-code"
                name="google-auth-code"
                placeholder="Enter code..."
                className="border border-gray-300 p-2 rounded-md w-full mb-4 font-Nova text-inputcolor text-Input"
              />
            </div>
            <button
              id="login-button"
              className="bg-bold-blue font-Nova  text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors w-full mt-4"
            >
              Log In to your account
            </button>
          </div>
        </div> */}

        {/* verify email otp popup */}
        {/* <div
          id="myModal"
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-32 rounded-lg  relative flex flex-col justify-between h-[300px] w-[560px]">
            <div>
              <img
                src={btn_close}
                alt="Close"
                className="absolute top-7 right-6 cursor-pointer"
                onClick={() => closeModal()}
              />
              <h2 className="text-bold-blue text-4xl font-Nova font-fw mb-4">
              Verify OTP
              </h2>
              <p className="text-black font-Nova   mb-4">
              The Verification code is Shared to user Email id xyz@abc.com, Please write the otp for resetting the password
              </p>
              <label
                htmlFor="google-auth-code"
                className="block text-label font-Nova font-fw mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="google-auth-code"
                name="google-auth-code"
                placeholder="Enter code..."
                className="border border-gray-300 p-2 rounded-md w-full mb-4 font-Nova text-inputcolor text-Input"
              />
            </div>
            <button
              id="login-button"
              className="bg-bold-blue font-Nova  text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors w-full mt-4"
            >
              Reset Password
            </button>
          </div>
        </div> */}

        {/* enter the mail id to reset password popup */}
        {/* <div
          id="myModal"
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-32 rounded-lg h-[300px] w-[560px] relative flex flex-col justify-between">
            <div>
              <img
                src={btn_close}
                alt="Close"
                className="absolute top-7 right-6 cursor-pointer"
                onClick={() => closeModal()}
              />
              <h2 className="text-bold-blue text-4xl font-Nova font-fw mb-4">
              Forgot Password
              </h2>
              <p className="text-black font-Nova   mb-4">
              Enter your email id to reset your password
              </p>
              <label
                htmlFor="google-auth-code"
                className="block text-label font-Nova font-fw mb-2"
              >
Email id              </label>
              <input
                type="text"
                id="google-auth-code"
                name="google-auth-code"
                placeholder="Enter code..."
                className="border border-gray-300 p-2 rounded-md w-full mb-4 font-Nova text-inputcolor text-Input"
              />
            </div>
            <button
              id="login-button"
              className="bg-bold-blue font-Nova  text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors w-full mt-4"
            >
              Reset your password
            </button>
          </div>
        </div> */}



      </div>
    </>
  );
};

export default UserLogin;
