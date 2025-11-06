// src/pages/admin/Jobs.jsx - UPDATED WITH REAL API
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../services/adminService';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, typeFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllJobs({
        status: statusFilter,
        type: typeFilter,
        search: searchTerm
      });
      
      if (response.success) {
        setJobs(response.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      alert('Failed to load jobs: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await adminService.deleteJob(id);
        
        if (response.success) {
          setJobs(jobs.filter(job => job.id !== id));
          alert('Job deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await adminService.updateJobStatus(id, newStatus);
      
      if (response.success) {
        setJobs(jobs.map(job => 
          job.id === id ? { ...job, status: newStatus } : job
        ));
        alert('Job status updated successfully');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status: ' + (error.message || 'Unknown error'));
    }
  };

  const handleSearch = () => {
    fetchJobs();
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="admin-jobs">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Manage Jobs</h1>
        <Link to="/admin/jobs/create" className="btn btn-primary">
          <i className="fas fa-plus"></i> Create New Job
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 row g-3">
        <div className="col-md-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs by title or location..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Applications</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-4 text-center">
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>
                        <strong>{job.title}</strong>
                        {job.department && (
                          <div className="text-muted small">{job.department}</div>
                        )}
                      </td>
                      <td>{job.location}</td>
                      <td>
                        <span className="badge bg-info">{job.type}</span>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {job.application_count || 0}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            job.status === 'active'
                              ? 'bg-success'
                              : job.status === 'closed'
                              ? 'bg-danger'
                              : 'bg-secondary'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/admin/jobs/edit/${job.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <Link
                            to={`/admin/applications?jobId=${job.id}`}
                            className="btn btn-sm btn-outline-info"
                            title="View Applications"
                          >
                            <i className="fas fa-users"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleStatusToggle(job.id, job.status)}
                            title={job.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            <i className={`fas fa-${job.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(job.id)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
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
      </div>
    </div>
  );
};

export default Jobs;