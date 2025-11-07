// src/pages/admin/Services.jsx - Services Management Component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchServices();
  }, [categoryFilter]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllServices({
        category: categoryFilter,
        search: searchTerm
      });
      
      if (response.success) {
        setServices(response.services || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to load services: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await adminService.deleteService(id);
        
        if (response.success) {
          setServices(services.filter(service => service.id !== id));
          alert('Service deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await adminService.updateServiceStatus(id, newStatus);
      
      if (response.success) {
        setServices(services.map(service => 
          service.id === id ? { ...service, status: newStatus } : service
        ));
        alert('Service status updated successfully');
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      alert('Failed to update service status: ' + (error.message || 'Unknown error'));
    }
  };

  const handleSearch = () => {
    fetchServices();
  };

  const filteredServices = services.filter(service =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-services">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Manage Services</h1>
        <Link to="/admin/services/create" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Service
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 row g-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-outline-secondary" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Application Development">Application Development</option>
            <option value="Digital Services">Digital Services</option>
            <option value="IT Consulting">IT Consulting</option>
            <option value="Other Services">Other Services</option>
          </select>
        </div>
      </div>

      {/* Services Grid/Table */}
      <div className="row g-4">
        {filteredServices.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="py-5 text-center card-body">
                <i className="mb-3 fas fa-cogs fa-3x text-muted"></i>
                <h5>No services found</h5>
                <p className="text-muted">Start by adding your first service</p>
                <Link to="/admin/services/create" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Add Service
                </Link>
              </div>
            </div>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card h-100 service-card">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between align-items-start">
                    <div className="service-icon">
                      <i className={service.icon || 'fas fa-cog'}></i>
                    </div>
                    <span
                      className={`badge ${
                        service.status === 'active'
                          ? 'bg-success'
                          : 'bg-secondary'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                  
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text text-muted small">
                    {service.short_description?.substring(0, 100)}...
                  </p>
                  
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fas fa-folder me-1"></i>
                      {service.category}
                    </small>
                  </div>

                  <div className="btn-group w-100" role="group">
                    <Link
                      to={`/admin/services/edit/${service.id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleStatusToggle(service.id, service.status)}
                      title={service.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      <i className={`fas fa-${service.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(service.id)}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Services;