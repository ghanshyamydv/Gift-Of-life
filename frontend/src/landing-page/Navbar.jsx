import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../AuthProvider';

import "./Navbar.css";

import { FaDollarSign } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

// import { SiStorybook } from "react-icons/si";
function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Remove token from localStorage and update state
    navigate('/');
  };
  return (
    <div className=''>
        <ul className="top-nav">
          <li><NavLink className="custom-link top-nav-hover" to="/contribute"><FaDollarSign/> Contribute</NavLink></li>
          <li><NavLink className="custom-link top-nav-hover" to="/donate-life-store"><MdLocalGroceryStore/> Donate Life Store</NavLink></li>
          {/* <li><NavLink className="custom-link top-nav-hover" to="/story"><SiStorybook/> Recipients' Stories</NavLink></li> */}
          <li>{isLoggedIn?<button className="btn text-white" onClick={handleLogout}>Logout</button>:<NavLink className="custom-link top-nav-hover" to="/login">Login</NavLink>}</li>
        </ul>
        <img className="web-logo" src="./images/web-logo.png" alt="web-logo"/>
        <ul className="bottom-nav">
          <li><NavLink className="custom-link nav-hover" to="/">Home</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="about">About Us</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="understand-donation">Understand Donation</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="news-event">News & Events</NavLink></li>
          <li><NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">Register to be a Donor</NavLink></li>
          <li><NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recipient">Register as a Recipient</NavLink></li>
        </ul>
    </div>
  )
}

export default Navbar
