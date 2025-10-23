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


