import React from 'react'
import { NavLink } from "react-router-dom";

import "./Navbar.css"

import { FaDollarSign } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
function Navbar() {
  return (
    <div className=''>
        <ul className="top-nav">
          <li><NavLink className="custom-link top-nav-hover" to="/contribute"><FaDollarSign/> Contribute</NavLink></li>
          <li><NavLink className="custom-link top-nav-hover" to="/donate-life-store"><MdLocalGroceryStore/> Donate Life Store</NavLink></li>
          <li><NavLink className="custom-link top-nav-hover" to="/story"><SiStorybook/> Recipients' Stories</NavLink></li>
        </ul>
        <img className="web-logo" src="./images/web-logo.png" alt="web-logo"/>
        <ul className="bottom-nav">
          <li><NavLink className="custom-link nav-hover" to="/">Home</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="about">About Us</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="understand-donation">Understand Donation</NavLink></li>
          <li><NavLink className="custom-link nav-hover" to="news-event">News & Events</NavLink></li>
          <li><NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">Register to be a Donor</NavLink></li>
          <li><NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recepient">Register as a Recepient</NavLink></li>
        </ul>
    </div>
  )
}

export default Navbar
