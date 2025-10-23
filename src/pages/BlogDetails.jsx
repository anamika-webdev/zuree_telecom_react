// FILE: src/pages/BlogDetails.jsx
// ============================================
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { blogService } from '../services/blogService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogByTitle(title);
        setBlog(data.blog);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [title]);

  if (loading) return <LoadingSpinner />;
  if (!blog) return <div className="container" style={{ padding: '100px 0' }}><h3>Blog not found</h3></div>;

  const breadcrumbs = [
    { label: 'Blogs', link: '/blogs' },
    { label: blog.title }
  ];

  return (
    <div className="blog-details-page">
      <PageTitle title={blog.title} breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="blog-meta mb-4">
                <span>
                  <i className="fa fa-calendar"></i> {new Date(blog.date).toLocaleDateString()}
                </span>
                <span className="ms-3">
                  <i className="fa fa-user"></i> {blog.author}
                </span>
              </div>
              
              {blog.image && (
                <img 
                  src={`/images/blog/${blog.image}`} 
                  alt={blog.title} 
                  className="img-fluid rounded mb-4"
                />
              )}
              
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.description }} />
              
              <div className="mt-5">
                <Link to="/blogs" className="btn btn-outline-primary">
                  <i className="fa fa-arrow-left me-2"></i> Back to Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;