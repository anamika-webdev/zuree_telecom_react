// src/services/authService.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      console.log('authService.login called with:', credentials);
      
      const response = await api.post('/admin/auth/login', credentials);
      
      console.log('Login response:', response.data);
      
      if (response.data.success && response.data.token) {
        // Store token and user info
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Token stored:', response.data.token.substring(0, 20) + '...');
        console.log('User stored:', response.data.user);
        
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('authService.login error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data?.message || 'Invalid credentials');
      } else if (error.request) {
        // Request made but no response
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      } else {
        // Other errors
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
  }
};