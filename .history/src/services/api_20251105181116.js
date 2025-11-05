// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Error response:', error.response.data);
      
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        console.log('Unauthorized - clearing auth and redirecting to login');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
      return Promise.reject({ 
        message: 'Network error. Please check if the server is running at ' + API_BASE_URL 
      });
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;