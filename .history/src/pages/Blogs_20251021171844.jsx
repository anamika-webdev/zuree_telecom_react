// FILE: src/pages/Blogs.jsx
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { blogService } from '../services/blogService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbs = [{ label: 'Blogs' }];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data.blogs);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blogs-page">
      <PageTitle title="Blogs" breadcrumbItems={breadcrumbs} />
      
      <section className="blogs-content section-padding">
        <div className="container">
          {loading ? (
            <LoadingSpinner text="Loading blogs..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchBlogs} />
          ) : blogs.length === 0 ? (
            <div className="text-center">
              <p>No blogs found.</p>
            </div>
          ) : (
            <div className="row">
              {blogs.map((blog) => (
                <div key={blog.id} className="col-xl-4 col-md-6 mb-4">
                  <article className="blog-card">
                    <div className="blog-thumbnail">
                      <Link to={`/blog-details/${blog.urlTitle}`}>
                        <img
                          src={`/images/blog/${blog.image}`}
                          alt={blog.title}
                          className="img-fluid"
                        />
                      </Link>
                    </div>

                    <div className="blog-content">
                      <h3 className="blog-title">
                        <Link to={`/blog-details/${blog.urlTitle}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      <div className="blog-meta">
                        <span>
                          {new Date(blog.date).toLocaleDateString()}
                        </span>
                      </div>

                      <Link
                        to={`/blog-details/${blog.urlTitle}`}
                        className="read-more"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;