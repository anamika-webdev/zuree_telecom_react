// src/pages/admin/Jobs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // TODO: Replace with actual API call
      const mockJobs = [
        { id: 1, title: 'Sr iOS Developer', location: 'Bangalore', type: 'Full-time', status: 'active', applications: 12 },
        { id: 2, title: 'Python Developer', location: 'Mumbai', type: 'Full-time', status: 'active', applications: 8 },
        { id: 3, title: '5G Core Developer', location: 'Noida', type: 'Contract', status: 'inactive', applications: 5 }
      ];
      setJobs(mockJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // TODO: Implement delete API call
        setJobs(jobs.filter(job => job.id !== id));
        alert('Job deleted successfully');
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      // TODO: Implement status toggle API call
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      setJobs(jobs.map(job => 
        job.id === id ? { ...job, status: newStatus } : job
      ));
      alert('Job status updated successfully');
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status');
    }
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

      <div className="mb-4 row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
                    <td colSpan="7" className="text-center">No jobs found</td>
                  </tr>
                ) : (
                  filteredJobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.title}</td>
                      <td>{job.location}</td>
                      <td>{job.type}</td>
                      <td>
                        <Link to={`/admin/applications?job=${job.id}`} className="badge bg-info">
                          {job.applications} applications
                        </Link>
                      </td>
                      <td>
                        <span className={`badge bg-${job.status === 'active' ? 'success' : 'secondary'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link to={`/admin/jobs/edit/${job.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleStatusToggle(job.id, job.status)}
                            className="btn btn-sm btn-outline-secondary"
                            title={job.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            <i className={`fas fa-${job.status === 'active' ? 'toggle-on' : 'toggle-off'}`}></i>
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="btn btn-sm btn-outline-danger"
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