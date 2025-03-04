import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId]=useState("");

  // Check if the user is logged in on initial load
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:4000/auth/verify', {
            headers: { Authorization: token },
          });
          setIsLoggedIn(response.data.valid); // Update state based on token validity
        } else {
          setIsLoggedIn(false); // No token found
        }
      } catch (error) {
        setIsLoggedIn(false); // Token validation failed
      }
    };
    validateToken(); // Call the function on initial load
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token); // Save token to localStorage
    setIsLoggedIn(true); // Update state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };