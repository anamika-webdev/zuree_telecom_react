// src/hooks/useAuth.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
// Import the single authService object
import { authService } from '../services/authService'; 
import api from '../services/api'; // Assuming you have api.js for setting headers

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user and token on initial load
    const storedUser = authService.getCurrentUser();
    const token = authService.getToken();
    
    if (storedUser && token) {
      setUser(storedUser);
      // Set auth header for all future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    // Call the method from the authService object
    const response = await authService.userLogin(credentials); 
    
    if (response.success && response.user) {
      // --- FIX IS HERE ---
      // We manually create the user object for the state to match
      // what authService saves in localStorage.
      const userForState = {
  ...response.data.user,
  userType: 'admin',
  role: response.data.user.role || 'admin'  // ← ADD THIS LINE
};
console.log('Admin user set:', userForState);  // ← ADD THIS FOR DEBUGGING
setUser(userForState);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    }
    return response;
  };

  const loginAdmin = async (credentials) => {
    // Call the method from the authService object
    const response = await authService.adminLogin(credentials);
    
    if (response.success && response.user) {
      // --- FIX IS HERE ---
      // We manually create the user object for the state to match
      // what authService saves in localStorage.
      const userForState = {
        ...response.user,
        userType: 'admin'
      };
      
      setUser(userForState); // Set the correct object in state
      // Set auth header after successful login
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    }
    return response;
  };

  const registerUser = async (userData) => {
    // Call the method from the authService object
    return await authService.userRegister(userData);
  };

  const logout = () => {
    // Call the method from the authService object
    authService.logout();
    setUser(null);
    // Remove auth header on logout
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    isAuthenticated: !!user,
    // These checks will now work immediately after login
    isAdmin: !!user && user.userType === 'admin',
    isUser: !!user && user.userType === 'user',
    loading,
    loginUser,
    loginAdmin,
    registerUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};