import React, { useState } from "react";
import logoMain from "../assets/logoMain.png";
import logoRight from "../assets/logoRight.png";
import arrow_down from "../assets/arrow_down.png";
import lock from "../assets/lock.png";
import eye from "../assets/eye.png";
import btn_close from "../assets/btn_close.png";
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
    //             <h1>Reset your Password</h1>

    //             <form onSubmit={handleSetPassword}>
    //               <div className="form-group input-with-icon">
    //                 <label htmlFor="password">Write your Password</label>
    //                 <input
    //                   type="password"
    //                   className="form-control"
    //                   id="password"
    //                   value={password}
    //                   onChange={(e)=>setPassword(e.target.value)}
    //                 />
    //               </div>
    //               <div className="form-group input-with-icon">
    //                 <label htmlFor="confirm_password">
    //                   Confirm your Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="form-control"
    //                   id="password"
    //                   value={confirmPassword}
    //                   onChange={(e)=>setConfirmPasswrod(e.target.value)}
    //                 />
    //               </div>

    //               <button
    //                 type="submit"
    //                 className="signIn"
                    
    //               >
    //                 Sign In
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
    // </>
    
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
            <h2 className="text-4xl font-Nova font-fw mb-4 mr-[32px] text-bold-blue">
            Reset your Password
            </h2>
            <form className="w-full max-w-sm">
              
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-label font-Nova font-fw"
                >
                  Confirm your Password
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
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-label font-Nova font-fw"
                >
                  Confirm your Password
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

        



      </div>
    </>
    
  );
};

export default SetPassword;
