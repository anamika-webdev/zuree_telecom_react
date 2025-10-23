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


