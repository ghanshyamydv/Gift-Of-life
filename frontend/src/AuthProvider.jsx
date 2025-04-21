import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location=useLocation();
  const navigate=useNavigate();

  const [renderViewAll, setRenderViewAll] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [userId, setUserId]=useState("");
  const [registered, setRegistered]=useState(false);
  // const backendUrl="https://gift-of-life-backend.onrender.com";
  const backendUrl="http://localhost:4000";
  // Function to validate token
  const validateToken = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${backendUrl}/api/auth/verify`, {
          headers: { Authorization: token },
        });
        setUserId(response.data.user._id);
        setUser(response.data.user);
        setIsLoggedIn(response.data.valid); // Update state based on token validity
      } else {
        setIsLoggedIn(false); // No token found
        setUser(null); // Clear user state
      }
    } catch (error) {
      setIsLoggedIn(false); // Token validation failed
      setUser(null); // Clear user state
    } finally {
        setLoading(false);
       // Set loading to false after validation
    }
  };

  // Function to check registered or not
  const isRegistered= async () => {
    try {
        const response = await axios.get( `${backendUrl}/api/${
          user.category === "donor" 
            ? `donor-registered/${user._id}` 
            : `recipient-registered/${user._id}`
        }`);
        if (response.data.isRegistered !== registered) {
        setRegistered(response.data.isRegistered);
        }
    } catch (error) {
      console.log(error);
      
    } 
  };
  // Check if the user is logged in on initial load
  useEffect(() => {
    validateToken(); // Call the function on initial load
  }, []);

  // Check if the user is registered whenever `user` changes
  useEffect(() => {
    if (user) {
      isRegistered();
    }
    
  }, [user]); // Add `user` as a dependency

  if(location.pathname==="/donors" && user?.category==="donor"){
    navigate("/*")
  }else if(location.pathname==="/recipients" && user?.category==="recipient"){
    navigate("/*")
  }
  // Login function
  const login = async (token) => {
    localStorage.setItem('token', token); // Save token to localStorage
    await validateToken(); // Validate token and update state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
    setUser(null); // Clear user state
  };

  // Function to update user data
  const updateUser = async () => {
    await validateToken(); // Fetch and update user data
  };

  return (
    <AuthContext.Provider value={{ backendUrl,isLoggedIn, login, logout, user,updateUser,loading , setUserId, userId, registered, renderViewAll, setRenderViewAll}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
