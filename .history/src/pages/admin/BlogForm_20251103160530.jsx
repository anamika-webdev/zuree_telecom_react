// src/pages/admin/BlogForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      // TODO: Replace with actual API call
      const mockBlog = {
        title: 'Sample Blog',
        urlTitle: 'sample-blog',
        description: 'This is a sample blog description',
        content: 'This is the content of the blog...',
        author: 'Admin',
        image: 'sample.jpg',
        status: 'published'
      };
      setFormData(mockBlog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to load blog');
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
      // TODO: Replace with actual API call
      if (isEdit) {
        // Update blog
        console.log('Updating blog:', formData);
      } else {
        // Create blog
        console.log('Creating blog:', formData);
      }

      alert(`Blog ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} blog`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-blog-form">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
        <button onClick={() => navigate('/admin/blogs')} className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left"></i> Back to Blogs
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
                  />
                  {errors.urlTitle && <div className="invalid-feedback">{errors.urlTitle}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Short description for blog listing"
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Content *</label>
                  <textarea
                    name="content"
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    value={formData.content}
                    onChange={handleChange}
                    rows="10"
                    placeholder="Full blog content (supports HTML)"
                  />
                  {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                  <small className="text-muted">You can use HTML tags for formatting</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Author *</label>
                  <input
                    type="text"
                    name="author"
                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                  {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="image-filename.jpg"
                  />
                  <small className="text-muted">Enter image filename</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="gap-2 d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Create Blog')}
                  </button>
                  <button type="button" onClick={() => navigate('/admin/blogs')} className="btn btn-outline-secondary">
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