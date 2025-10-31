// src/pages/Blogs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    search: '',
    category: ''
  });

  const blogsPerPage = 6;
  const breadcrumbs = [{ label: 'Blogs' }];

  // Mock blog data - replace with API call
  const mockBlogs = [
    {
      id: 1,
      title: 'Electric Vehicle Charger standards that OEMs should look for a successful market capture',
      urlTitle: 'electric-vehicle-charger-standards',
      image: 'ev-charger.jpg',
      date: '2022-02-18',
      author: 'Admin',
      excerpt: 'Explore the essential EV charger standards that Original Equipment Manufacturers need to consider for successful market penetration.',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'The evolution of Wi-Fi and its effects on RF Parameters',
      urlTitle: 'evolution-of-wifi-rf-parameters',
      image: 'wifi-evolution.jpg',
      date: '2022-02-18',
      author: 'Admin',
      excerpt: 'Discover how Wi-Fi technology has evolved over the years and its impact on Radio Frequency parameters.',
      category: 'Networking'
    },
    {
      id: 3,
      title: '5G Technology: Transforming the Future of Connectivity',
      urlTitle: '5g-technology-future-connectivity',
      image: '5g-tech.jpg',
      date: '2022-02-15',
      author: 'Tech Team',
      excerpt: 'Learn about how 5G technology is revolutionizing connectivity and enabling new possibilities.',
      category: 'Telecom'
    },
    {
      id: 4,
      title: 'Cloud Computing: Best Practices for Enterprise Solutions',
      urlTitle: 'cloud-computing-best-practices',
      image: 'cloud-computing.jpg',
      date: '2022-02-10',
      author: 'Admin',
      excerpt: 'Essential best practices for implementing cloud computing solutions in enterprise environments.',
      category: 'Cloud'
    },
    {
      id: 5,
      title: 'AI and Machine Learning in Modern Business Applications',
      urlTitle: 'ai-machine-learning-business',
      image: 'ai-ml.jpg',
      date: '2022-02-05',
      author: 'Data Science Team',
      excerpt: 'Explore how AI and ML are transforming business operations and decision-making processes.',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Cybersecurity Trends: Protecting Your Digital Assets',
      urlTitle: 'cybersecurity-trends',
      image: 'cybersecurity.jpg',
      date: '2022-02-01',
      author: 'Security Team',
      excerpt: 'Stay updated with the latest cybersecurity trends and how to protect your organization.',
      category: 'Security'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 500);
  }, []);

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = !filter.category || blog.category === filter.category;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Get unique categories
  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="blogs-page">
      <PageTitle title="Blogs" breadcrumbItems={breadcrumbs} />
      
      <section className="blogs-section section-padding">
        <div className="container">
          {/* Introduction */}
          <div className="mb-5 text-center blogs-intro">
            <h2 className="section-title">Latest Insights & Updates</h2>
            <p className="section-subtitle">
              Stay informed with our latest articles, industry insights, and technology trends.
              Explore our collection of expert knowledge and thought leadership.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-5 blogs-filters">
            <div className="row g-3">
              <div className="col-lg-8 col-md-6">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search articles by title or keyword..."
                    name="search"
                    value={filter.search}
                    onChange={handleFilterChange}
                  />
                  <i className="bi bi-search search-icon"></i>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <select 
                  className="form-select"
                  name="category"
                  value={filter.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="py-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading blogs...</p>
            </div>
          ) : currentBlogs.length === 0 ? (
            <div className="py-5 text-center empty-state">
              <i className="mb-3 bi bi-journal-x display-1 text-muted"></i>
              <h4>No blogs found</h4>
              <p>Try adjusting your search criteria</p>
              <button 
                className="mt-3 btn btn-primary"
                onClick={() => {
                  setFilter({ search: '', category: '' });
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="row">
                {currentBlogs.map((blog) => (
                  <div key={blog.id} className="mb-4 col-lg-4 col-md-6">
                    <article className="blog-card">
                      <Link to={`/blog-details/${blog.urlTitle}`} className="blog-card-link">
                        <div className="blog-image-wrapper">
                          <img
                            src={`/images/blog/${blog.image}`}
                            alt={blog.title}
                            className="blog-image"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x250?text=Blog+Image';
                            }}
                          />
                          <div className="blog-overlay">
                            <span className="read-more-overlay">Read Article</span>
                          </div>
                        </div>
                      </Link>

                      <div className="blog-card-content">
                        <h3 className="blog-card-title">
                          <Link to={`/blog-details/${blog.urlTitle}`}>
                            {blog.title}
                          </Link>
                        </h3>

                        <div className="blog-meta">
                          <span className="blog-date">
                            <i className="bi bi-calendar-event"></i>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {blog.excerpt && (
                          <p className="blog-excerpt">{blog.excerpt}</p>
                        )}

                        <Link
                          to={`/blog-details/${blog.urlTitle}`}
                          className="btn-read-more"
                        >
                          Read More 
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <nav aria-label="Blog pagination">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          aria-label="Previous"
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                      </li>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <li 
                            key={pageNumber} 
                            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                          >
                            <button 
                              className="page-link"
                              onClick={() => paginate(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          </li>
                        );
                      })}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          aria-label="Next"
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}

          {/* Blog Categories Section */}
          <div className="pt-5 mt-5 blog-categories-section">
            <h3 className="mb-4 text-center">Browse by Category</h3>
            <div className="row justify-content-center">
              {categories.map((category, index) => (
                <div key={index} className="mb-3 col-lg-2 col-md-3 col-sm-4 col-6">
                  <button
                    className={`category-badge ${filter.category === category ? 'active' : ''}`}
                    onClick={() => {
                      setFilter(prev => ({ ...prev, category: category }));
                      setCurrentPage(1);
                    }}
                  >
                    {category}
                  </button>
                </div>
              ))}
              {filter.category && (
                <div className="mb-3 col-lg-2 col-md-3 col-sm-4 col-6">
                  <button
                    className="category-badge clear"
                    onClick={() => {
                      setFilter(prev => ({ ...prev, category: '' }));
                      setCurrentPage(1);
                    }}
                  >
                    Clear <i className="bi bi-x-circle ms-1"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-5 mt-5 blog-cta">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3>Want to Stay Updated?</h3>
                <p>Subscribe to our newsletter and never miss an update on technology trends and insights.</p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/contact-us" className="btn btn-primary btn-lg">
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;