import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const location=useLocation();
  const navigate=useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null); // Initialize admin as null
  const [loading, setLoading] = useState(true); // Add loading state
  const backendUrl="http://localhost:4000";
  // Function to validate token
  const validateToken = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        const response = await axios.get(`${backendUrl}/api/admin/verify`, {
          headers: { Authorization: adminToken },
        });
        setAdmin(response.data.admin);
        setIsLoggedIn(response.data.valid); // Update state based on token validity
      } else {
        setIsLoggedIn(false); // No token found
        setAdmin(null); // Clear admin state
      }
    } catch (error) {
      setIsLoggedIn(false); // Token validation failed
      setAdmin(null); // Clear admin state
    } finally {
        setLoading(false);
       // Set loading to false after validation
    }
  };

  
  // Check if the admin is logged in on initial load
  useEffect(() => {
    validateToken(); // Call the function on initial load
  }, []);

  // Login function
  const login = async (adminToken) => {
    
    localStorage.setItem('adminToken', adminToken); // Save token to localStorage
    await validateToken(); // Validate token and update state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
    setAdmin(null); // Clear admin state
  };

  return (
    <AdminAuthContext.Provider value={{ backendUrl,isLoggedIn, login, logout, admin, setAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export { AdminAuthContext, AdminAuthProvider };