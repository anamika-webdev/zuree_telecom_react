// src/services/authService.js - Updated with separate login methods
import api from './api';

export const authService = {
  // Admin login - for admin portal
  adminLogin: async (credentials) => {
    try {
      console.log('authService.adminLogin called with:', credentials);
      
      const response = await api.post('/admin/auth/login', credentials);
      
      console.log('Admin login response:', response.data);
      
      if (response.data.success && response.data.token) {
        // Store token and user info with admin flag
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          ...response.data.user,
          userType: 'admin' // Flag to identify admin users
        }));
        
        console.log('Admin token stored');
        return response.data;
      } else {
        throw new Error(response.data.message || 'Admin login failed');
      }
    } catch (error) {
      console.error('authService.adminLogin error:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.message || 'Invalid admin credentials');
      } else if (error.request) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      } else {
        throw new Error(error.message || 'An error occurred during admin login');
      }
    }
  },

  // Regular user login - for main site
  userLogin: async (credentials) => {
    try {
      console.log('authService.userLogin called with:', credentials);
      
      const response = await api.post('/auth/login', credentials);
      
      console.log('User login response:', response.data);
      
      if (response.data.success && response.data.token) {
        // Store token and user info
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          ...response.data.user,
          userType: 'user' // Flag to identify regular users
        }));
        
        console.log('User token stored');
        return response.data;
      } else {
        throw new Error(response.data.message || 'User login failed');
      }
    } catch (error) {
      console.error('authService.userLogin error:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.message || 'Invalid credentials');
      } else if (error.request) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      } else {
        throw new Error(error.message || 'An error occurred during login');
      }
    }
  },

  logout: () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.userType === 'admin';
  },

  isRegularUser: () => {
    const user = authService.getCurrentUser();
    return user?.userType === 'user';
  }
};