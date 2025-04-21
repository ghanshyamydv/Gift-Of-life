import React, { useContext } from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { SiStorybook } from "react-icons/si";
import { LuLogOut } from "react-icons/lu";
import { AdminAuthContext } from "./AdminAuthProvider";

const Sidebar = () => {
  const {logout, admin}=useContext(AdminAuthContext);
  
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white vh-100 position-fixed" style={{ width: "250px" }}>
      <div className="d-flex">
        <img
          id="dropdownMenuButton"
            src={admin?.profileImage?.url} 
            alt="Profile"
            onError={(e) => {
              e.target.src = ''; // Fallback image if the profile image fails to load
            }}
            style={{ borderRadius: "50%", width: "2rem", height: "2rem"  ,objectFit:"cover", objectPosition:"top" }}
          />
        <h4 className="text-center ms-3"><NavLink to='/admin' style={{color:"white", textDecoration:"none"}}>{admin?.username.charAt(0).toUpperCase()+admin?.username.slice(1)}</NavLink></h4>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/news-events" className="nav-link sidebar-link text-white"><FaRegNewspaper/> News & Events</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/stories" className="nav-link sidebar-link text-white"><SiStorybook/> Review Stories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/donors" className="nav-link sidebar-link text-white"><BiSolidDonateHeart/> Review Donors</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/recipients" className="nav-link sidebar-link text-white"><GiReceiveMoney/> Review Recipients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/post-product" className="nav-link sidebar-link text-white"><MdLocalGroceryStore/> Manage Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/order-status" className="nav-link sidebar-link text-white"><TbTruckDelivery /> Order Status</NavLink>
        </li>
        <li className="nav-item position-absolute" style={{bottom:"0.5rem"}}>
          <button className="nav-link sidebar-link text-white" onClick={()=>{logout()}}><LuLogOut/> Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
