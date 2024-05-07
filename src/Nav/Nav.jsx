import React from "react";
import "./Nav.css";
import logoMain from "../assets/logoMain.png";
import notification from "../assets/notification.png";
import ellipse from "../assets/Ellipse_1-2.png";
import search_icon from "../assets/search_icon.png";
import arrows from "..//assets/arrows.png";
import EmployeeList from "../AdminDashboard/EmployeeList";

const Nav = () => {
  return (
    <>
      <div id="viewport">
        <div id="sidebar">
          <header>
            <img src={logoMain} alt="logo" />
          </header>

          <ul className="nav">
            <li>
              <a href="#">
                <i className="zmdi zmdi-view-dashboard"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-link"></i> Shortcuts
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-widgets"></i> Overview
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-calendar"></i> Events
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-info-outline"></i> About
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-settings"></i> Services
              </a>
            </li>
            <li>
              <a href="#">
                <i className="zmdi zmdi-comment-more"></i> Contact
              </a>
            </li>
          </ul>
        </div>

        <div id="content">
          <nav className="navbar ">
            <div className="container-fluid headmain">
              <div className="searchbar">
                <input
                  type="search"
                  placeholder="search"
                  aria-describedby="button-addon4"
                  className="form-control searchInput"
                />
                <i className="searchicon">
                  <img src={search_icon} alt="" />
                </i>
              </div>
              <div className="notification">
                <img src={notification} alt="bell" />
              </div>
              <div className="adminDetails">
                <img src={ellipse} alt="ellipse" />
                <span>Marc Gabriel</span>
                <p>Administrator</p>
                <img className="arrows" src={arrows} alt="arrows" />
              </div>
            </div>
          </nav>
          <div className="container">
            <h1>Simple Sidebar</h1>
            <p>
              Make sure to keep all page content within the
              <code>#content</code>.
            </p>
            
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Nav;
