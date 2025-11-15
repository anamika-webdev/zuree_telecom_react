// src/pages/admin/Services.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    category: 'mobile',
    icon: '',
    image_url: '',
    features: '',
    status: 'active'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/services', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingService 
        ? `http://localhost:5000/api/admin/services/${editingService.id}`
        : 'http://localhost:5000/api/admin/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingService ? 'update' : 'add'} service`);
      }

      await fetchServices();
      resetForm();
      alert(`Service ${editingService ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      console.error('Error saving service:', err);
      alert(`Failed to ${editingService ? 'update' : 'add'} service: ${err.message}`);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      short_description: service.short_description || '',
      full_description: service.full_description || '',
      category: service.category || 'mobile',
      icon: service.icon || '',
      image_url: service.image_url || '',
      features: service.features || '',
      status: service.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      await fetchServices();
      alert('Service deleted successfully!');
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('Failed to delete service: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      short_description: '',
      full_description: '',
      category: 'mobile',
      icon: '',
      image_url: '',
      features: '',
      status: 'active'
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchServices} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Services Management</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Mobile App Development"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="mobile">Mobile Development</option>
                  <option value="web">Web Development</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="telecom">Telecom Services</option>
                  <option value="recruitment">Recruitment Services</option>
                  <option value="emerging-tech">Emerging Technologies</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="short_description">Short Description *</label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  rows="3"
                  placeholder="Brief description (shown on cards)"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="full_description">Full Description *</label>
                <textarea
                  id="full_description"
                  name="full_description"
                  value={formData.full_description}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  rows="6"
                  placeholder="Detailed description (shown on service page)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="icon">Icon Class</label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., fas fa-mobile-alt"
                />
                <small style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  FontAwesome icon class
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Image URL</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="features">Features (JSON format)</label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                  placeholder='["Feature 1", "Feature 2", "Feature 3"]'
                />
                <small style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  Enter as JSON array
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingService ? 'Update Service' : 'Create Service'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Services</span>
          <span className="stat-value">{Array.isArray(services) ? services.length : 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <span className="stat-value">
            {Array.isArray(services) ? services.filter(s => s.status === 'active').length : 0}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Categories</span>
          <span className="stat-value">
            {Array.isArray(services) ? new Set(services.map(s => s.category).filter(Boolean)).size : 0}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Short Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(services) || services.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No services found. Click "Add Service" to create one.
                </td>
              </tr>
            ) : (
              services.map(service => (
                <tr key={service.id}>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td>
                    <span className="badge-category">{service.category}</span>
                  </td>
                  <td>
                    {service.short_description ? 
                      (service.short_description.length > 60 
                        ? service.short_description.substring(0, 60) + '...' 
                        : service.short_description)
                      : 'N/A'
                    }
                  </td>
                  <td>
                    <span className={`status-badge status-${service.status}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(service)}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;