// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'Network error. Please try again.' });
    } else {
      // Something else happened
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;


// src/services/blogService.js
import api from './api';

export const blogService = {
  // Get all blogs with pagination
  getAllBlogs: async (page = 1, limit = 9) => {
    try {
      const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get blog by URL title
  getBlogByTitle: async (urlTitle) => {
    try {
      const response = await api.get(`/blogs/${urlTitle}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get recent blogs
  getRecentBlogs: async (limit = 3) => {
    try {
      const response = await api.get(`/blogs/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};


// src/services/careerService.js
import api from './api';

export const careerService = {
  // Get all job listings
  getAllJobs: async () => {
    try {
      const response = await api.get('/careers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get job by ID
  getJobById: async (id) => {
    try {
      const response = await api.get(`/careers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit job application
  applyForJob: async (jobId, applicationData) => {
    try {
      const formData = new FormData();
      formData.append('jobId', jobId);
      formData.append('name', applicationData.name);
      formData.append('email', applicationData.email);
      formData.append('phone', applicationData.phone);
      formData.append('resume', applicationData.resume);
      formData.append('coverLetter', applicationData.coverLetter);

      const response = await api.post('/careers/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};


// src/services/contactService.js
import api from './api';

export const contactService = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email) => {
    try {
      const response = await api.post('/contact/newsletter', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};


// src/services/authService.js
import api from './api';

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};