// src/services/careerService.js
import api from './api';

export const careerService = {
  getAllJobs: async () => {
    const response = await api.get('/careers');
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/careers/${id}`);
    return response.data;
  },

  applyForJob: async (jobId, applicationData) => {
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
  },
};