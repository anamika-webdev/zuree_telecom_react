import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [blogsRes, jobsRes, applicationsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:5000/api/blogs', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/jobs', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/applications', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/contacts', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      const blogs = await blogsRes.json();
      const jobs = await jobsRes.json();
      const applications = await applicationsRes.json();
      const messages = await messagesRes.json();

      setStats({
        totalBlogs: blogs.length,
        totalJobs: jobs.length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(a => a.status === 'pending').length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(m => m.status === 'unread').length
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/blogs" className="dashboard-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <i className="fas fa-blog"></i>
          </div>
          <div className="card-content">
            <h3>{stats.totalBlogs}</h3>
            <p>Total Blogs</p>
          </div>
        </Link>

        <Link to="/admin/jobs" className="dashboard-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="card-content">
            <h3>{stats.totalJobs}</h3>
            <p>Job Postings</p>
          </div>
        </Link>

        <Link to="/admin/applications" className="dashboard-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="card-content">
            <h3>{stats.totalApplications}</h3>
            <p>Applications</p>
            {stats.pendingApplications > 0 && (
              <span className="badge-notification">{stats.pendingApplications} pending</span>
            )}
          </div>
        </Link>

        <Link to="/admin/contacts" className="dashboard-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <i className="fas fa-envelope"></i>
          </div>
          <div className="card-content">
            <h3>{stats.totalMessages}</h3>
            <p>Contact Messages</p>
            {stats.unreadMessages > 0 && (
              <span className="badge-notification">{stats.unreadMessages} unread</span>
            )}
          </div>
        </Link>
      </div>

      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <Link to="/admin/blogs" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Create New Blog
          </Link>
          <Link to="/admin/jobs" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Post New Job
          </Link>
          <Link to="/admin/applications" className="btn btn-secondary">
            <i className="fas fa-list"></i>
            View Applications
          </Link>
          <Link to="/admin/contacts" className="btn btn-secondary">
            <i className="fas fa-inbox"></i>
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;