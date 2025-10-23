// src/services/contactService.js
import api from './api';

export const contactService = {
  submitContactForm: async (formData) => {
    const response = await api.post('/contact', formData);
    return response.data;
  },

  subscribeNewsletter: async (email) => {
    const response = await api.post('/contact/newsletter', { email });
    return response.data;
  },
};