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


