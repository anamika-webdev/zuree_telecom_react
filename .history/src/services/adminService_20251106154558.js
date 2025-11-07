// src/services/adminService.js
import api from './api';

export const adminService = {
  // =====================================================
  // DASHBOARD
  // =====================================================
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async (limit = 10) => {
    const response = await api.get(`/admin/dashboard/activity?limit=${limit}`);
    return response.data;
  },

  // =====================================================
  // BLOGS
  // =====================================================
  getAllBlogs: async (params = {}) => {
    const { page = 1, limit = 20, search = '', status = 'all' } = params;
    const response = await api.get('/admin/blogs', {
      params: { page, limit, search, status }
    });
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/admin/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await api.post('/admin/blogs', blogData);
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const response = await api.put(`/admin/blogs/${id}`, blogData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/admin/blogs/${id}`);
    return response.data;
  },

  updateBlogStatus: async (id, status) => {
    const response = await api.patch(`/admin/blogs/${id}/status`, { status });
    return response.data;
  },

  uploadBlogImage: async (formData) => {
    const response = await api.post('/admin/blogs/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // =====================================================
  // JOBS
  // =====================================================
  getAllJobs: async (params = {}) => {
    const { page = 1, limit = 20, search = '', status = 'all', type = 'all' } = params;
    const response = await api.get('/admin/jobs', {
      params: { page, limit, search, status, type }
    });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/admin/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await api.post('/admin/jobs', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/admin/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/admin/jobs/${id}`);
    return response.data;
  },

  updateJobStatus: async (id, status) => {
    const response = await api.patch(`/admin/jobs/${id}/status`, { status });
    return response.data;
  },

  // =====================================================
  // APPLICATIONS
  // =====================================================
  getAllApplications: async (params = {}) => {
    const { page = 1, limit = 20, status = 'all', jobId = null } = params;
    const response = await api.get('/admin/applications', {
      params: { page, limit, status, jobId }
    });
    return response.data;
  },

  getApplicationById: async (id) => {
    const response = await api.get(`/admin/applications/${id}`);
    return response.data;
  },

  updateApplicationStatus: async (id, status) => {
    const response = await api.patch(`/admin/applications/${id}/status`, { status });
    return response.data;
  },

  deleteApplication: async (id) => {
    const response = await api.delete(`/admin/applications/${id}`);
    return response.data;
  },

  downloadResume: async (id) => {
    const response = await api.get(`/admin/applications/${id}/resume`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // =====================================================
  // CONTACTS
  // =====================================================
  getAllContacts: async (params = {}) => {
    const { page = 1, limit = 20, status = 'all', search = '' } = params;
    const response = await api.get('/admin/contacts', {
      params: { page, limit, status, search }
    });
    return response.data;
  },

  getContactById: async (id) => {
    const response = await api.get(`/admin/contacts/${id}`);
    return response.data;
  },

  updateContactStatus: async (id, status) => {
    const response = await api.patch(`/admin/contacts/${id}/status`, { status });
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/admin/contacts/${id}`);
    return response.data;
  },

  replyToContact: async (id, replyData) => {
    const response = await api.post(`/admin/contacts/${id}/reply`, replyData);
    return response.data;
  },

  // =====================================================
  // SERVICES
  // =====================================================
  getAllServices: async (params = {}) => {
    const { page = 1, limit = 20, category = 'all', status = 'all', search = '' } = params;
    const response = await api.get('/admin/services', {
      params: { page, limit, category, status, search }
    });
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/admin/services/${id}`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await api.post('/admin/services', serviceData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await api.put(`/admin/services/${id}`, serviceData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/admin/services/${id}`);
    return response.data;
  },

  updateServiceStatus: async (id, status) => {
    const response = await api.patch(`/admin/services/${id}/status`, { status });
    return response.data;
  },

  reorderServices: async (servicesOrder) => {
    const response = await api.post('/admin/services/reorder', { services: servicesOrder });
    return response.data;
  },

  // =====================================================
  // TEAM MEMBERS
  // =====================================================
  getAllTeamMembers: async (params = {}) => {
    const { page = 1, limit = 20, department = 'all', status = 'all' } = params;
    const response = await api.get('/admin/team', {
      params: { page, limit, department, status }
    });
    return response.data;
  },

  getTeamMemberById: async (id) => {
    const response = await api.get(`/admin/team/${id}`);
    return response.data;
  },

  createTeamMember: async (memberData) => {
    const response = await api.post('/admin/team', memberData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateTeamMember: async (id, memberData) => {
    const response = await api.put(`/admin/team/${id}`, memberData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteTeamMember: async (id) => {
    const response = await api.delete(`/admin/team/${id}`);
    return response.data;
  },

  updateTeamMemberStatus: async (id, status) => {
    const response = await api.patch(`/admin/team/${id}/status`, { status });
    return response.data;
  },

  // =====================================================
  // USERS (Admin Users Management)
  // =====================================================
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  updateUserStatus: async (id, status) => {
    const response = await api.patch(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  changePassword: async (id, passwordData) => {
    const response = await api.post(`/admin/users/${id}/change-password`, passwordData);
    return response.data;
  },

  // =====================================================
  // SETTINGS
  // =====================================================
  getSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  updateSettings: async (settingsData) => {
    const response = await api.put('/admin/settings', settingsData);
    return response.data;
  },

  // =====================================================
  // FILE UPLOADS
  // =====================================================
  uploadFile: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteFile: async (filePath) => {
    const response = await api.delete('/admin/upload', { data: { filePath } });
    return response.data;
  },
};

export default adminService;