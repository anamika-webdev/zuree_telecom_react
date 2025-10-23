// src/services/blogService.js
import api from './api';

export const blogService = {
  getAllBlogs: async (page = 1, limit = 9) => {
    const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
    return response.data;
  },

  getBlogByTitle: async (urlTitle) => {
    const response = await api.get(`/blogs/${urlTitle}`);
    return response.data;
  },

  getRecentBlogs: async (limit = 3) => {
    const response = await api.get(`/blogs/recent?limit=${limit}`);
    return response.data;
  },
};