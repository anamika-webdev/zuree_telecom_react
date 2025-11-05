// src/pages/admin/Applications.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const jobFilter = searchParams.get('job');

  useEffect(() => {
    fetchApplications();
  }, [jobFilter]);

  const fetchApplications = async () => {
    try {
      // TODO: Replace with actual API call
      const mockApplications = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          job: 'Sr iOS Developer',
          jobId: 1,
          resumePath: '/uploads/resume1.pdf',
          date: '2024-01-15',
          status: 'pending'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '0987654321',
          job: 'Python Developer',
          jobId: 2,
          resumePath: '/uploads/resume2.pdf',
          date: '2024-01-14',
          status: 'reviewed'
        }
      ];

      let filtered = mockApplications;
      if (jobFilter) {
        filtered = mockApplications.filter(app => app.jobId === parseInt(jobFilter));
      }

      setApplications(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // TODO: Implement status update API call
      setApplications(applications.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      ));
      alert('Application status updated');
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        // TODO: Implement delete API call
        setApplications(applications.filter(app => app.id !== id));
        alert('Application deleted successfully');
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application');
      }
    }
  };

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
    <div className="admin-applications">
      <h1 className="mb-4">Job Applications</h1>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Job</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No applications found</td>
                  </tr>
                ) : (
                  applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>{app.name}</td>
                      <td><a href={`mailto:${app.email}`}>{app.email}</a></td>
                      <td>{app.phone}</td>
                      <td>{app.job}</td>
                      <td>{new Date(app.date).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <a
                            href={app.resumePath}
                            className="btn btn-sm btn-outline-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Resume"
                          >
                            <i className="fas fa-file-pdf"></i>
                          </a>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="btn btn-sm btn-outline-danger"
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

export default Applications;