// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/admin-dashboard.css';

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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API calls
      // This is mock data for demonstration
      setStats({
        totalBlogs: 12,
        totalJobs: 8,
        totalApplications: 45,
        totalContacts: 23,
        recentApplications: [
          { id: 1, name: 'John Doe', job: 'Sr iOS Developer', date: '2024-01-15' },
          { id: 2, name: 'Jane Smith', job: 'Python Developer', date: '2024-01-14' },
          { id: 3, name: 'Mike Johnson', job: 'Full Stack Developer', date: '2024-01-13' }
        ],
        recentContacts: [
          { id: 1, name: 'Alice Brown', subject: 'Partnership Inquiry', date: '2024-01-15' },
          { id: 2, name: 'Bob Wilson', subject: 'Service Question', date: '2024-01-14' }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
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
    <div className="admin-dashboard">
      <h1 className="mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="mb-4 row g-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon bg-primary">
              <i className="fas fa-blog"></i>
            </div>
            <div className="stat-details">
              <h3>{stats.totalBlogs}</h3>
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
              <h3>{stats.totalJobs}</h3>
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
              <h3>{stats.totalApplications}</h3>
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
              <h3>{stats.totalContacts}</h3>
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Applications</h5>
              <Link to="/admin/applications" className="btn btn-sm btn-primary">View All</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentApplications.map(app => (
                      <tr key={app.id}>
                        <td>{app.name}</td>
                        <td>{app.job}</td>
                        <td>{new Date(app.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Contact Messages</h5>
              <Link to="/admin/contacts" className="btn btn-sm btn-primary">View All</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentContacts.map(contact => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.subject}</td>
                        <td>{new Date(contact.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;