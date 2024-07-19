import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserLogin from "./UserLogin/UserLogin";
import SetPassword from './UserLogin/SetPassword'
import Nav from "./Nav/Nav";
import EmployeeList from "./AdminDashboard/EmployeeList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/setPassword" element={<SetPassword/>} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/list" element={<EmployeeList/>}/>
          {/* <Route path="/sidebar" element={<BaseLayout/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;


// sddfdffffd
