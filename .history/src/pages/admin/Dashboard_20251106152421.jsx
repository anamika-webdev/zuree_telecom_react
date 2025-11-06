// src/pages/admin/Dashboard.jsx - UPDATED WITH REAL API
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import '/../assets/css/admin-dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalContacts: 0,
    recentApplications: [],
    recentContacts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminService.getDashboardStats();
      
      if (response.success) {
        setStats(response.stats || {
          totalBlogs: 0,
          totalJobs: 0,
          totalApplications: 0,
          totalContacts: 0,
          recentApplications: [],
          recentContacts: []
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data. Please try again.');
      
      // Fallback to empty stats on error
      setStats({
        totalBlogs: 0,
        totalJobs: 0,
        totalApplications: 0,
        totalContacts: 0,
        recentApplications: [],
        recentContacts: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="mb-4">Dashboard</h1>

      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="mb-4 row g-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon bg-primary">
              <i className="fas fa-blog"></i>
            </div>
            <div className="stat-details">
              <h3>{stats.totalBlogs || 0}</h3>
              <p>Total Blogs</p>
            </div>
            <Link to="/admin/blogs" className="stat-link">View All →</Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon bg-success">
              <i className="fas fa-briefcase"></i>
            </div>
            <div className="stat-details">
              <h3>{stats.totalJobs || 0}</h3>
              <p>Active Jobs</p>
            </div>
            <Link to="/admin/jobs" className="stat-link">View All →</Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon bg-warning">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="stat-details">
              <h3>{stats.totalApplications || 0}</h3>
              <p>Applications</p>
            </div>
            <Link to="/admin/applications" className="stat-link">View All →</Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon bg-info">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="stat-details">
              <h3>{stats.totalContacts || 0}</h3>
              <p>Contact Messages</p>
            </div>
            <Link to="/admin/contacts" className="stat-link">View All →</Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-users me-2"></i>
                Recent Applications
              </h5>
            </div>
            <div className="card-body">
              {!stats.recentApplications || stats.recentApplications.length === 0 ? (
                <p className="py-3 text-center text-muted">No recent applications</p>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0 table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentApplications.map((app) => (
                        <tr key={app.id}>
                          <td>{app.name || app.applicant_name}</td>
                          <td className="text-muted small">{app.job || app.job_title}</td>
                          <td className="text-muted small">
                            {new Date(app.date || app.applied_date).toLocaleDateString()}
                          </td>
                          <td className="text-end">
                            <Link
                              to={`/admin/applications?id=${app.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-envelope me-2"></i>
                Recent Contact Messages
              </h5>
            </div>
            <div className="card-body">
              {!stats.recentContacts || stats.recentContacts.length === 0 ? (
                <p className="py-3 text-center text-muted">No recent contact messages</p>
              ) : (
                <div className="table-responsive">
                  <table className="table mb-0 table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td className="text-muted small">{contact.subject}</td>
                          <td className="text-muted small">
                            {new Date(contact.date || contact.created_at).toLocaleDateString()}
                          </td>
                          <td className="text-end">
                            <Link
                              to={`/admin/contacts?id=${contact.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <Link to="/admin/blogs/create" className="btn btn-outline-primary w-100">
                    <i className="fas fa-plus me-2"></i>
                    Create New Blog
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/admin/jobs/create" className="btn btn-outline-success w-100">
                    <i className="fas fa-plus me-2"></i>
                    Post New Job
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/admin/applications" className="btn btn-outline-warning w-100">
                    <i className="fas fa-eye me-2"></i>
                    Review Applications
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/admin/contacts" className="btn btn-outline-info w-100">
                    <i className="fas fa-inbox me-2"></i>
                    Check Messages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;