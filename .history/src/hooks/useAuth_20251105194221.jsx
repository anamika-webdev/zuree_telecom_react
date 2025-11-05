// src/hooks/useAuth.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser as apiLoginUser, 
  loginAdmin as apiLoginAdmin,
  registerUser as apiRegisterUser, // <-- IMPORTED
  logout as apiLogout, 
  getCurrentUser 
} from '../services/authService';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
    }
    setLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    const userData = await apiLoginUser(credentials);
    setUser(userData);
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    return userData;
  };

  const loginAdmin = async (credentials) => {
    const adminData = await apiLoginAdmin(credentials);
    setUser(adminData);
    api.defaults.headers.common['Authorization'] = `Bearer ${adminData.token}`;
    return adminData;
  };

  // ** NEW: Add register function to context **
  const registerUser = async (userData) => {
    // This will call the authService function.
    // We just pass the request through. If it fails, authService will throw an error.
    return await apiRegisterUser(userData);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    isAuthenticated: !!user,
    // Note: Roles 'editor' and 'super_admin' seem to be from your admin panel
    isAdmin: !!user && (user.role === 'admin' || user.role === 'super_admin' || user.role === 'editor'),
    isUser: !!user && user.role === 'user',
    loading,
    loginUser,
    loginAdmin,
    registerUser, // <-- EXPOSED to components
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