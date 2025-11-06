// src/pages/admin/Blogs.jsx - UPDATED WITH REAL API
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const blogsPerPage = 10;

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllBlogs({
        status: statusFilter,
        search: searchTerm
      });
      
      if (response.success) {
        setBlogs(response.blogs || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to load blogs: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await adminService.deleteBlog(id);
        
        if (response.success) {
          setBlogs(blogs.filter(blog => blog.id !== id));
          alert('Blog deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const response = await adminService.updateBlogStatus(id, newStatus);
      
      if (response.success) {
        setBlogs(blogs.map(blog => 
          blog.id === id ? { ...blog, status: newStatus } : blog
        ));
        alert('Blog status updated successfully');
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update blog status: ' + (error.message || 'Unknown error'));
    }
  };

  const handleSearch = () => {
    fetchBlogs();
  };

  // Filter blogs locally
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

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
    <div className="admin-blogs">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Manage Blogs</h1>
        <Link to="/admin/blogs/create" className="btn btn-primary">
          <i className="fas fa-plus"></i> Create New Blog
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 row g-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search blogs..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-4 text-center">
                      No blogs found
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>{blog.id}</td>
                      <td>
                        <strong>{blog.title}</strong>
                      </td>
                      <td>{blog.author}</td>
                      <td>{new Date(blog.date).toLocaleDateString()}</td>
                      <td>{blog.views || 0}</td>
                      <td>
                        <span
                          className={`badge ${
                            blog.status === 'published'
                              ? 'bg-success'
                              : 'bg-secondary'
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/admin/blogs/edit/${blog.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleStatusToggle(blog.id, blog.status)}
                            title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            <i className={`fas fa-${blog.status === 'published' ? 'eye-slash' : 'eye'}`}></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(blog.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;