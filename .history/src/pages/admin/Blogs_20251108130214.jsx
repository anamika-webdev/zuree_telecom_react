import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/components.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/blogs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      // CRITICAL FIX: Ensure data is always an array
      setBlogs(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
      setBlogs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      await fetchBlogs();
      alert('Blog deleted successfully!');
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-section">
        <div className="loading-spinner">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-section">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchBlogs} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-section" style={{ background: 'white', padding: '20px', minHeight: '500px' }}>
      
      <div className="section-header">
        <h2>Blog Management</h2>
        <Link to="/admin/blogs/create" className="btn btn-primary">
          <i className="fas fa-plus"></i> Create New Blog
        </Link>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Blogs</span>
          <span className="stat-value">{Array.isArray(blogs) ? blogs.length : 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Published</span>
          <span className="stat-value">
            {Array.isArray(blogs) ? blogs.filter(b => b.status === 'published').length : 0}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Draft</span>
          <span className="stat-value">
            {Array.isArray(blogs) ? blogs.filter(b => b.status === 'draft').length : 0}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(blogs) || blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No blogs found. Click "Create New Blog" to add one.
                </td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id}>
                  <td>
                    <strong>{blog.title}</strong>
                  </td>
                  <td>{blog.author}</td>
                  <td>{blog.category}</td>
                  <td>
                    <span className={`status-badge status-${blog.status || 'published'}`}>
                      {blog.status || 'published'}
                    </span>
                  </td>
                  <td>{formatDate(blog.published_date || blog.created_at)}</td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
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

export default Blogs;