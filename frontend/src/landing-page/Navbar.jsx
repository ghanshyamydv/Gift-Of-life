import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../AuthProvider';
import { LuLogOut } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { IoMdMenu,IoMdClose } from "react-icons/io";
import "./Navbar.css";

import { FaDollarSign } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

// const ShowRegisterForm=({user, registered})=>{
//     if(user){
//       if(registered && user?.category==="donor"){
//         console.log("hi");
        
//         return <li><NavLink className="custom-link nav-hover" to="recipients">View all Recipients</NavLink></li>
//       }else if(registered && user?.category==="recipient"){
//         console.log("hi");
//         return <li><NavLink className="custom-link nav-hover" to="donors">View all Donors</NavLink></li>
//       }else if(user?.category==="donor"){
//         return <li><NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">Register to be a Donor</NavLink></li>
//       }else{
//         return <li><NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recipient">Register as a Recipient</NavLink></li>
//       }
//     }else{
//       return <>
//       <li><NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">Register to be a Donor</NavLink></li>
//       <li><NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recipient">Register as a Recipient</NavLink></li>
//       </>
//     }
//   }

// import { SiStorybook } from "react-icons/si";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Toggle dropdown visibility
  const toggleDropdown = (event) => {
    if (event.target.id === 'dropdownMenuButton') {
      event.stopPropagation();
      // Toggle the dropdown state
      setIsOpen((prev) => !prev);
    } else {
      // Set the dropdown state to false for all other clicks
      setIsOpen(false);
    }
  };

  
  
  useEffect(() => {
    document.addEventListener('click', toggleDropdown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', toggleDropdown);
    };
  }, [isOpen]);

  const { isLoggedIn, logout, userId, user, registered, loading, setRenderViewAll} = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Remove token from localStorage and update state
    toast("You have been successfully logged out!")
    setIsOpen(false);
    navigate('/');
  };

  // Handle profile settings
  const handleProfileSettings = () => {
    navigate(`/${userId}/profile`)
  };

  //code for responsiveness 
const [size, setSize]=useState(window.innerWidth)
const [isNavbarOpened, setIsNavbarOpened]=useState(false);
useEffect(()=>{
  const handleResize=()=>{
    setSize(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);
  return ()=>window.removeEventListener("resize", handleResize);
  
},[])

  if(loading){
    return <h1 className='text-center'>Loading...</h1>
  }
  
  return (
    <div className='nav-container'>
        <ul className="top-nav p-2">
          <li><NavLink className="custom-link top-nav-hover" to="/contribute"><FaDollarSign/> Contribute</NavLink></li>
          <li><NavLink className="custom-link top-nav-hover" to="/donate-life-store"><MdLocalGroceryStore/> Donate Life Store</NavLink></li>
          <li>{isLoggedIn?
            <div className="dropdown">
      {/* Profile Icon */}
        <img
        id="dropdownMenuButton"
        onClick={toggleDropdown}
        aria-expanded={isOpen ? "true" : "false"}
          src={user?.profileImage?.url} 
          alt="Profile"
          onError={(e) => {
            e.target.src = '/images/profile-pic.png'; // Fallback image if the profile image fails to load
          }}
          style={{ borderRadius: "50%", width: "2rem", height: "2rem"  ,objectFit:"cover", objectPosition:"top" }}
        />

      {/* Dropdown Menu */}
      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        style={{right:"auto", left:"0", transform: "translateX(-80%)"}}
        aria-labelledby="dropdownMenuButton"
      >
        <li className="dropdown-item">
            {user && "Welcome " + user.username.charAt(0).toUpperCase()+user.username.slice(1)}
        </li>
        <li>
          <button className="dropdown-item" onClick={handleProfileSettings}>
          <IoSettingsOutline /> Profile Settings
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
           <LuLogOut/> Logout
          </button>
        </li>
      </ul>
    </div>
          :<NavLink className="custom-link top-nav-hover" to="/login">Login</NavLink>}</li>
        </ul>
        
        {size < 700 && <div className='d-flex justify-content-between align-items-center ps-2 pe-2' style={{backgroundColor:" #f0eef1", width:"100%"}}><img className="web-logo" src="/images/web-logo.png" alt="web-logo" onClick={()=>{navigate("/")}}/>{isNavbarOpened?<IoMdClose className='fs-1' onClick={()=>setIsNavbarOpened(false)}/>:<IoMdMenu className='fs-1' onClick={()=>setIsNavbarOpened(true)}/>}</div>}
        {size > 700 && <img className="web-logo" src="/images/web-logo.png" alt="web-logo" onClick={()=>{navigate("/")}}/>}
        {/* {isNavbarOpened && */}
        <ul className={`bottom-nav ${isNavbarOpened?"navOpened":"navClosed"}`}>
        <li><NavLink className="custom-link nav-hover" to="/">Home</NavLink></li>
        <li><NavLink className="custom-link nav-hover" to="about">About Us</NavLink></li>
        <li><NavLink className="custom-link nav-hover" to="understand-donation">Understand Donation</NavLink></li>
        <li><NavLink className="custom-link nav-hover" to="news-event">News & Events</NavLink></li>
        {/* <ShowRegisterForm user={user} registered={registered}/> */}
        {user ? (
      registered ? (
        user?.category === "donor" ? (
          <li>
            <NavLink className="custom-link nav-hover" to="recipients">
              View all Recipients
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="custom-link nav-hover" to="donors" onClick={()=>{setRenderViewAll((prev)=>prev+1)}}>
              View all Donors
            </NavLink>
          </li>
        )
      ) : user?.category === "donor" ? (
        <li>
          <NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">
            Register to be a Donor
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recipient">
            Register as a Recipient
          </NavLink>
        </li>
      )
    ) : (
      <>
        <li>
          <NavLink className="custom-link btn btn-success text-white fw-semibold" to="register-donor">
            Register to be a Donor
          </NavLink>
        </li>
        <li>
          <NavLink className="custom-link btn btn-danger text-white fw-semibold" to="register-recipient">
            Register as a Recipient
          </NavLink>
        </li>
      </>
    )}
      </ul>
{/* } */}
        
    </div>
  )
}

export default Navbar
