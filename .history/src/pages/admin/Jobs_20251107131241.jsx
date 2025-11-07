import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    responsibilities: '',
    salary_range: '',
    application_deadline: '',
    status: 'active'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
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
      const url = editingJob 
        ? `http://localhost:5000/api/jobs/${editingJob.id}`
        : 'http://localhost:5000/api/jobs';
      
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingJob ? 'update' : 'create'} job`);
      }

      await fetchJobs();
      resetForm();
      alert(`Job ${editingJob ? 'updated' : 'created'} successfully!`);
    } catch (err) {
      console.error('Error saving job:', err);
      alert(`Failed to ${editingJob ? 'update' : 'create'} job: ${err.message}`);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || '',
      description: job.description || '',
      requirements: job.requirements || '',
      responsibilities: job.responsibilities || '',
      salary_range: job.salary_range || '',
      application_deadline: job.application_deadline ? job.application_deadline.split('T')[0] : '',
      status: job.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      await fetchJobs();
      alert('Job deleted successfully!');
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      type: '',
      description: '',
      requirements: '',
      responsibilities: '',
      salary_range: '',
      application_deadline: '',
      status: 'active'
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchJobs} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Job Postings</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add New Job'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingJob ? 'Edit Job' : 'Create New Job'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Job Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Engineering"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., New York, NY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Job Type *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salary_range">Salary Range</label>
                <input
                  type="text"
                  id="salary_range"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="application_deadline">Application Deadline</label>
                <input
                  type="date"
                  id="application_deadline"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleInputChange}
                  className="form-input"
                />
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
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="form-textarea"
                rows="4"
                placeholder="Describe the role and what the candidate will be doing..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements *</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                className="form-textarea"
                rows="4"
                placeholder="List the qualifications and skills required (one per line)..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">Responsibilities *</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                required
                className="form-textarea"
                rows="4"
                placeholder="List the key responsibilities (one per line)..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingJob ? 'Update Job' : 'Create Job'}
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
          <span className="stat-label">Total Jobs</span>
          <span className="stat-value">{jobs.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <span className="stat-value">
            {jobs.filter(j => j.status === 'active').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Inactive</span>
          <span className="stat-value">
            {jobs.filter(j => j.status === 'inactive').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Closed</span>
          <span className="stat-value">
            {jobs.filter(j => j.status === 'closed').length}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No jobs found. Click "Add New Job" to create one.
                </td>
              </tr>
            ) : (
              jobs.map(job => (
                <tr key={job.id}>
                  <td>
                    <strong>{job.title}</strong>
                  </td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>
                    <span className="job-type-badge">{job.type}</span>
                  </td>
                  <td>{formatDate(job.application_deadline)}</td>
                  <td>
                    <span className={`status-badge status-${job.status}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(job)}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
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

export default Jobs;