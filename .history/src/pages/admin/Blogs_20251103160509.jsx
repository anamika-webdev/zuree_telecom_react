// src/pages/admin/Blogs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // TODO: Replace with actual API call
      const mockBlogs = [
        { id: 1, title: 'Electric Vehicle Charger standards', date: '2022-02-18', author: 'Admin', status: 'published' },
        { id: 2, title: 'Evolution of Wi-Fi and RF Parameters', date: '2022-02-18', author: 'Admin', status: 'published' },
        { id: 3, title: '5G Technology Future', date: '2022-02-15', author: 'Tech Team', status: 'draft' }
      ];
      setBlogs(mockBlogs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        // TODO: Implement delete API call
        setBlogs(blogs.filter(blog => blog.id !== id));
        alert('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      // TODO: Implement status toggle API call
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, status: newStatus } : blog
      ));
      alert('Blog status updated successfully');
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update blog status');
    }
  };

  // Filter blogs
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

      {/* Search */}
      <div className="mb-4 row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No blogs found</td>
                  </tr>
                ) : (
                  currentBlogs.map(blog => (
                    <tr key={blog.id}>
                      <td>{blog.id}</td>
                      <td>{blog.title}</td>
                      <td>{blog.author}</td>
                      <td>{new Date(blog.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-${blog.status === 'published' ? 'success' : 'warning'}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link to={`/admin/blogs/edit/${blog.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleStatusToggle(blog.id, blog.status)}
                            className="btn btn-sm btn-outline-secondary"
                            title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            <i className={`fas fa-${blog.status === 'published' ? 'eye-slash' : 'eye'}`}></i>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
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