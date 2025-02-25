import React from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
// import { RiAdminFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white vh-100 position-fixed" style={{ width: "250px" }}>
      <h4 className="text-center"><NavLink to='/admin' style={{color:"white", textDecoration:"none"}}>Admin Panel</NavLink></h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/news-events" className="nav-link sidebar-link text-white"><FaRegNewspaper/> News & Events</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/donors" className="nav-link sidebar-link text-white"><BiSolidDonateHeart/> Donors</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/recipients" className="nav-link sidebar-link text-white"><GiReceiveMoney/> Recipients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/life-store" className="nav-link sidebar-link text-white"><MdLocalGroceryStore/> Life Store</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/users" className="nav-link sidebar-link text-white"><PiUsersThreeFill /> Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
