// =====================================================
// ADMIN BLOGS MANAGEMENT PAGE - COMPLETE VERSION
// File: src/pages/admin/Blogs.jsx
// =====================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Technology',
    content: '',
    excerpt: '',
    featuredImage: '',
    tags: '',
    status: 'draft',
    publishedDate: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, [filterStatus, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        status: filterStatus,
        search: searchTerm
      });

      const response = await fetch(`http://localhost:5000/api/admin/blogs?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data.blogs || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
      setBlogs([]);
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

    if (!formData.title || !formData.author || !formData.content) {
      alert('Title, Author, and Content are required!');
      return;
    }

    try {
      const url = editingBlog 
        ? `http://localhost:5000/api/admin/blogs/${editingBlog.id}`
        : 'http://localhost:5000/api/admin/blogs';
      
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingBlog ? 'update' : 'create'} blog`);
      }

      await fetchBlogs();
      resetForm();
      alert(`Blog ${editingBlog ? 'updated' : 'created'} successfully!`);
    } catch (err) {
      console.error('Error saving blog:', err);
      alert(`Failed to ${editingBlog ? 'update' : 'create'} blog: ${err.message}`);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      author: blog.author || '',
      category: blog.category || 'Technology',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      featuredImage: blog.featured_image || '',
      tags: blog.tags || '',
      status: blog.status || 'draft',
      publishedDate: blog.published_date || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/blogs/${id}`, {
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

  const handleStatusToggle = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`http://localhost:5000/api/admin/blogs/${blog.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      await fetchBlogs();
      alert(`Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      category: 'Technology',
      content: '',
      excerpt: '',
      featuredImage: '',
      tags: '',
      status: 'draft',
      publishedDate: ''
    });
    setEditingBlog(null);
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
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error && !blogs.length) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchBlogs} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1><i className="fas fa-blog"></i> Blog Management</h1>
          <p>Create, edit, and manage all blog posts</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus-circle'}`}></i>
          {showForm ? ' Cancel' : ' Create New Blog'}
        </button>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs..."
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-container">
          <h2>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Author name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Development">Development</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="featuredImage">Featured Image URL</label>
                <input
                  type="text"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="2"
                  placeholder="Brief summary of the blog post..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  rows="10"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="tech, business, marketing"
                />
              </div>

              <div className="form-group">
                <label htmlFor="publishedDate">Published Date</label>
                <input
                  type="date"
                  id="publishedDate"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Blogs</span>
          <span className="stat-value">{blogs.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Published</span>
          <span className="stat-value">
            {blogs.filter(b => b.status === 'published').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Draft</span>
          <span className="stat-value">
            {blogs.filter(b => b.status === 'draft').length}
          </span>
        </div>
      </div>

      {/* Table */}
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
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No blogs found. Click "Create New Blog" to add one.
                </td>
              </tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id}>
                  <td><strong>{blog.title}</strong></td>
                  <td>{blog.author}</td>
                  <td><span className="badge-category">{blog.category}</span></td>
                  <td>
                    <span 
                      className={`status-badge status-${blog.status}`}
                      onClick={() => handleStatusToggle(blog)}
                      style={{ cursor: 'pointer' }}
                      title="Click to toggle status"
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td>{formatDate(blog.published_date)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="btn btn-sm btn-primary"
                        title="Edit"
                      >
                        Edit
                      </button>
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

export default AdminBlogs;