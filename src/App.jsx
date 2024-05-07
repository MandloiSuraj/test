import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLogin from "./UserLogin/UserLogin";
import ForgotPassword from "./UserLogin/ForgotPassword";
import Nav from "./Nav/Nav";
import EmployeeList from "./AdminDashboard/EmployeeList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/list" element={<EmployeeList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
