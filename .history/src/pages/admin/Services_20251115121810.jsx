import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mobile',
    shortDescription: '',
    fullDescription: '',
    icon: '',
    image: '',
    features: '',
    status: 'active'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/services', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      const data = await response.json();
      setServices(data.services || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingService 
        ? `http://localhost:5000/api/admin/services/${editingService.id}`
        : 'http://localhost:5000/api/admin/services';
      
      const response = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchServices();
        resetForm();
        alert('Service saved successfully!');
      }
    } catch (err) {
      alert('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      category: service.category || 'Mobile',
      shortDescription: service.short_description || '',
      fullDescription: service.full_description || '',
      icon: service.icon || '',
      image: service.image || '',
      features: service.features || '',
      status: service.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await fetch(`http://localhost:5000/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      await fetchServices();
      alert('Service deleted!');
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Mobile',
      shortDescription: '',
      fullDescription: '',
      icon: '',
      image: '',
      features: '',
      status: 'active'
    });
    setEditingService(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1><i className="fas fa-cogs"></i> Services Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="form-select"
                >
                  <option value="Mobile">Mobile Development</option>
                  <option value="Web">Web Development</option>
                  <option value="Marketing">Digital Marketing</option>
                  <option value="Telecom">Telecommunications</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Short Description *</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  required
                  className="form-textarea"
                  rows="2"
                />
              </div>
              <div className="form-group full-width">
                <label>Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  className="form-textarea"
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label>Icon (FontAwesome class)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  placeholder="fas fa-mobile-alt"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingService ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td><strong>{service.title}</strong></td>
                <td><span className="badge-category">{service.category}</span></td>
                <td><span className={`status-badge status-${service.status}`}>{service.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(service)} className="btn btn-sm btn-primary">Edit</button>
                    <button onClick={() => handleDelete(service.id)} className="btn btn-sm btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;