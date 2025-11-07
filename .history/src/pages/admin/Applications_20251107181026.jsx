import React, { useState, useEffect } from 'react';
import '../../styles/components.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/careers/applications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/careers/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      await fetchApplications();
      alert('Application status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update application status');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/careers/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      await fetchApplications();
      setSelectedApplication(null);
      alert('Application deleted successfully');
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application');
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchApplications} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Job Applications</h2>
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="applications-container">
        <div className="applications-list">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">Total</span>
              <span className="stat-value">{applications.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending</span>
              <span className="stat-value">
                {applications.filter(a => a.status === 'pending').length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Reviewed</span>
              <span className="stat-value">
                {applications.filter(a => a.status === 'reviewed').length}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Shortlisted</span>
              <span className="stat-value">
                {applications.filter(a => a.status === 'shortlisted').length}
              </span>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map(app => (
                    <tr 
                      key={app.id}
                      className={selectedApplication?.id === app.id ? 'selected' : ''}
                      onClick={() => setSelectedApplication(app)}
                    >
                      <td>{app.full_name}</td>
                      <td>{app.job_title || 'N/A'}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>{formatDate(app.applied_at)}</td>
                      <td>
                        <span className={`status-badge status-${app.status}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApplication(app);
                          }}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedApplication && (
          <div className="application-detail">
            <div className="detail-header">
              <h3>Application Details</h3>
              <button 
                onClick={() => setSelectedApplication(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h4>Personal Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Full Name:</label>
                    <span>{selectedApplication.full_name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedApplication.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{selectedApplication.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Position:</label>
                    <span>{selectedApplication.job_title || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Cover Letter</h4>
                <p className="cover-letter">{selectedApplication.cover_letter || 'No cover letter provided'}</p>
              </div>

              {selectedApplication.resume_path && (
                <div className="detail-section">
                  <h4>Resume</h4>
                  <a 
                    href={`http://localhost:5000${selectedApplication.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Download Resume
                  </a>
                </div>
              )}

              <div className="detail-section">
                <h4>Application Status</h4>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => updateApplicationStatus(selectedApplication.id, e.target.value)}
                  className="form-select"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="detail-actions">
                <button
                  onClick={() => deleteApplication(selectedApplication.id)}
                  className="btn btn-danger"
                >
                  Delete Application
                </button>
              </div>

              <div className="detail-meta">
                <small>Applied on: {formatDate(selectedApplication.applied_at)}</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;