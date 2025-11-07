// src/pages/admin/BlogForm.jsx - UPDATED WITH REAL API
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    urlTitle: '',
    description: '',
    content: '',
    author: '',
    image: '',
    category: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setFetchLoading(true);
    try {
      const response = await adminService.getBlogById(id);
      
      if (response.success && response.blog) {
        const blog = response.blog;
        setFormData({
          title: blog.title || '',
          urlTitle: blog.url_title || '',
          description: blog.description || '',
          content: blog.content || '',
          author: blog.author || '',
          image: blog.img || '',
          category: blog.category || '',
          tags: blog.tags || '',
          status: blog.status || 'draft'
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to load blog: ' + (error.message || 'Unknown error'));
      navigate('/admin/blogs');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate URL title from title
    if (name === 'title') {
      const urlTitle = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, urlTitle }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.urlTitle.trim()) {
      newErrors.urlTitle = 'URL Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        title: formData.title,
        urlTitle: formData.urlTitle,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        image: formData.image,
        category: formData.category,
        tags: formData.tags,
        status: formData.status
      };

      let response;
      if (isEdit) {
        response = await adminService.updateBlog(id, blogData);
      } else {
        response = await adminService.createBlog(blogData);
      }

      if (response.success) {
        alert(`Blog ${isEdit ? 'updated' : 'created'} successfully!`);
        navigate('/admin/blogs');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} blog: ` + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="admin-blog-form">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
        <button onClick={() => navigate('/admin/blogs')} className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left me-2"></i>Back to Blogs
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    disabled={loading}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">URL Title *</label>
                  <input
                    type="text"
                    name="urlTitle"
                    className={`form-control ${errors.urlTitle ? 'is-invalid' : ''}`}
                    value={formData.urlTitle}
                    onChange={handleChange}
                    placeholder="url-friendly-title"
                    disabled={loading}
                  />
                  {errors.urlTitle && <div className="invalid-feedback">{errors.urlTitle}</div>}
                  <small className="text-muted">This will be auto-generated from the title</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Short description for blog listing (160 characters recommended)"
                    disabled={loading}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  <small className="text-muted">{formData.description.length} characters</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Content *</label>
                  <textarea
                    name="content"
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    value={formData.content}
                    onChange={handleChange}
                    rows="15"
                    placeholder="Full blog content (HTML supported)"
                    disabled={loading}
                  />
                  {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                  <small className="text-muted">You can use HTML tags for formatting</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 card">
                  <div className="card-header">
                    <h6 className="mb-0">Publish Settings</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                      <small className="text-muted">
                        {formData.status === 'published' 
                          ? 'Visible on user site' 
                          : 'Hidden from user site'}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Author *</label>
                      <input
                        type="text"
                        name="author"
                        className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author name"
                        disabled={loading}
                      />
                      {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                    </div>
                  </div>
                </div>

                <div className="mb-3 card">
                  <div className="card-header">
                    <h6 className="mb-0">Featured Image</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Image Filename</label>
                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="image.jpg"
                        disabled={loading}
                      />
                      <small className="text-muted">Enter filename from /images/blog/</small>
                    </div>
                    {formData.image && (
                      <div className="text-center">
                        <img 
                          src={`/images/blog/${formData.image}`} 
                          alt="Preview" 
                          className="rounded img-fluid"
                          style={{ maxHeight: '200px' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 card">
                  <div className="card-header">
                    <h6 className="mb-0">Categories & Tags</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Technology, Business, etc."
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        className="form-control"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="tag1, tag2, tag3"
                        disabled={loading}
                      />
                      <small className="text-muted">Comma-separated tags</small>
                    </div>
                  </div>
                </div>

                <div className="gap-2 d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className={`fas fa-${isEdit ? 'save' : 'plus'} me-2`}></i>
                        {isEdit ? 'Update Blog' : 'Create Blog'}
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => navigate('/admin/blogs')} 
                    className="btn btn-outline-secondary"
                    disabled={loading}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;