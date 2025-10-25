// src/pages/BlogDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/pages/blog-details.css';

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Mock blog data - replace with API call
  const mockBlogDetails = {
    'electric-vehicle-charger-standards': {
      id: 1,
      title: 'Electric Vehicle Charger standards that OEMs should look for a successful market capture',
      urlTitle: 'electric-vehicle-charger-standards',
      image: 'ev-charger.jpg',
      date: '2022-02-18',
      author: 'Admin',
      category: 'Technology',
      readTime: '8 min read',
      content: `
        <h2>Introduction</h2>
        <p>The electric vehicle (EV) market is rapidly expanding, and with it comes the critical need for standardized charging infrastructure. Original Equipment Manufacturers (OEMs) must understand and implement proper EV charger standards to ensure successful market penetration and customer satisfaction.</p>

        <h3>Key Charging Standards</h3>
        <p>Several charging standards have emerged globally, each with its own specifications and regional preferences:</p>

        <h4>1. Combined Charging System (CCS)</h4>
        <p>CCS has become one of the most widely adopted standards, particularly in Europe and North America. It supports both AC and DC charging through a single connector, offering flexibility and convenience for EV owners.</p>

        <h4>2. CHAdeMO</h4>
        <p>Popular primarily in Japan and Asia, CHAdeMO was one of the first fast-charging standards. It has evolved to support bidirectional charging, enabling vehicle-to-grid (V2G) capabilities.</p>

        <h4>3. Tesla Supercharger</h4>
        <p>Tesla's proprietary charging network uses a unique connector in North America, though the company has begun opening its network to other manufacturers and adopting CCS in newer markets.</p>

        <h3>Power Levels and Charging Speeds</h3>
        <p>Understanding different power levels is crucial for OEMs:</p>
        <ul>
          <li><strong>Level 1 (AC):</strong> 120V, 1.4-1.9 kW - Slow charging for overnight use</li>
          <li><strong>Level 2 (AC):</strong> 240V, 3.3-19.2 kW - Common for home and public charging</li>
          <li><strong>Level 3 (DC Fast Charging):</strong> 50-350 kW - Rapid charging for commercial applications</li>
        </ul>

        <h3>Safety and Certification Requirements</h3>
        <p>OEMs must ensure their charging solutions meet rigorous safety standards:</p>
        <ul>
          <li>UL certification for North American markets</li>
          <li>CE marking for European compliance</li>
          <li>IEC 61851 international standard for EV charging systems</li>
          <li>ISO 15118 for communication between EV and charging station</li>
        </ul>

        <h3>Communication Protocols</h3>
        <p>Modern EV chargers require sophisticated communication capabilities:</p>
        <ul>
          <li><strong>ISO 15118:</strong> Enables plug-and-charge functionality and bidirectional power flow</li>
          <li><strong>OCPP (Open Charge Point Protocol):</strong> Facilitates communication between charging stations and management systems</li>
          <li><strong>Smart Grid Integration:</strong> Allows dynamic load management and grid services</li>
        </ul>

        <h3>Future-Proofing Considerations</h3>
        <p>OEMs should consider these forward-looking factors:</p>
        <ul>
          <li>Scalability for higher power levels (up to 1 MW for commercial vehicles)</li>
          <li>Support for wireless charging standards</li>
          <li>Integration with renewable energy sources</li>
          <li>Compatibility with emerging battery technologies</li>
        </ul>

        <h3>Regional Market Considerations</h3>
        <p>Different regions have varying preferences and regulations:</p>
        <ul>
          <li><strong>Europe:</strong> Strong CCS adoption with mandates for interoperability</li>
          <li><strong>North America:</strong> Mix of CCS and Tesla standards, with growing CCS infrastructure</li>
          <li><strong>Asia:</strong> CHAdeMO remains popular alongside emerging CCS adoption</li>
          <li><strong>China:</strong> GB/T standard dominates the domestic market</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Success in the EV charging market requires OEMs to carefully balance multiple standards, prioritize safety and interoperability, and plan for future technological advancements. By understanding these key considerations, manufacturers can position themselves effectively in this rapidly evolving market.</p>

        <p>The transition to electric vehicles represents not just a technological shift, but a complete reimagining of transportation infrastructure. OEMs that embrace comprehensive charging standards and prioritize user experience will be best positioned to capture market share in this dynamic industry.</p>
      `,
      tags: ['EV Charging', 'Electric Vehicles', 'Technology', 'Standards']
    },
    'evolution-of-wifi-rf-parameters': {
      id: 2,
      title: 'The evolution of Wi-Fi and its effects on RF Parameters',
      urlTitle: 'evolution-of-wifi-rf-parameters',
      image: 'wifi-evolution.jpg',
      date: '2022-02-18',
      author: 'Admin',
      category: 'Networking',
      readTime: '6 min read',
      content: `
        <h2>The Journey of Wi-Fi Technology</h2>
        <p>Wi-Fi technology has undergone remarkable evolution since its inception, transforming how we connect and communicate. This evolution has significantly impacted Radio Frequency (RF) parameters and network performance.</p>

        <h3>Historical Timeline</h3>
        <p>From 802.11 to Wi-Fi 6E, each generation brought improvements in speed, range, and efficiency...</p>

        <h3>RF Parameter Changes</h3>
        <p>Modern Wi-Fi standards have introduced sophisticated RF techniques to enhance performance and reliability...</p>
      `,
      tags: ['Wi-Fi', 'RF Parameters', 'Networking', 'Wireless']
    }
  };

  const mockRelatedBlogs = [
    {
      id: 3,
      title: '5G Technology: Transforming the Future of Connectivity',
      urlTitle: '5g-technology-future-connectivity',
      image: '5g-tech.jpg',
      date: '2022-02-15'
    },
    {
      id: 4,
      title: 'Cloud Computing: Best Practices for Enterprise Solutions',
      urlTitle: 'cloud-computing-best-practices',
      image: 'cloud-computing.jpg',
      date: '2022-02-10'
    },
    {
      id: 5,
      title: 'AI and Machine Learning in Modern Business Applications',
      urlTitle: 'ai-machine-learning-business',
      image: 'ai-ml.jpg',
      date: '2022-02-05'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const blogData = mockBlogDetails[title];
      setBlog(blogData);
      setRelatedBlogs(mockRelatedBlogs);
      setLoading(false);
    }, 500);
  }, [title]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h3>Blog not found</h3>
        <Link to="/blogs" className="mt-3 btn btn-primary">Back to Blogs</Link>
      </div>
    );
  }

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
            {/* Main Content */}
            <div className="col-lg-8">
              <article className="blog-article">
                {/* Blog Header */}
                <div className="blog-header">
                  <div className="blog-meta-top">
                    <span className="meta-item">
                      <i className="bi bi-calendar-event"></i>
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="meta-item">
                      <i className="bi bi-person"></i>
                      {blog.author}
                    </span>
                    {blog.readTime && (
                      <span className="meta-item">
                        <i className="bi bi-clock"></i>
                        {blog.readTime}
                      </span>
                    )}
                    {blog.category && (
                      <span className="meta-item category">
                        <i className="bi bi-folder"></i>
                        {blog.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Featured Image */}
                {blog.image && (
                  <div className="featured-image">
                    <img 
                      src={`/images/blog/${blog.image}`} 
                      alt={blog.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x600?text=Blog+Image';
                      }}
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="blog-tags">
                    <h5>Tags:</h5>
                    <div className="tags-list">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="blog-share">
                  <h5>Share this article:</h5>
                  <div className="share-buttons">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                      <i className="fab fa-telegram-plane"></i>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${blog.title} ${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>

                {/* Navigation */}
                <div className="blog-navigation">
                  <Link to="/blogs" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to All Blogs
                  </Link>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                {/* Author Card */}
                <div className="sidebar-widget author-widget">
                  <h4 className="widget-title">About the Author</h4>
                  <div className="author-info">
                    <div className="author-avatar">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <h5>{blog.author}</h5>
                    <p>Technology enthusiast and industry expert sharing insights on the latest trends and innovations.</p>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                  <div className="sidebar-widget related-posts-widget">
                    <h4 className="widget-title">Related Articles</h4>
                    <div className="related-posts-list">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link 
                          key={relatedBlog.id} 
                          to={`/blog-details/${relatedBlog.urlTitle}`}
                          className="related-post-item"
                        >
                          <div className="related-post-image">
                            <img 
                              src={`/images/blog/${relatedBlog.image}`} 
                              alt={relatedBlog.title}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100x80?text=Blog';
                              }}
                            />
                          </div>
                          <div className="related-post-content">
                            <h6>{relatedBlog.title}</h6>
                            <span className="related-post-date">
                              {new Date(relatedBlog.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Widget */}
                <div className="sidebar-widget newsletter-widget">
                  <h4 className="widget-title">Subscribe to Newsletter</h4>
                  <p>Get the latest articles and insights delivered to your inbox.</p>
                  <form className="newsletter-form">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Your email address"
                      required
                    />
                    <button type="submit" className="mt-3 btn btn-primary w-100">
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Categories Widget */}
                <div className="sidebar-widget categories-widget">
                  <h4 className="widget-title">Categories</h4>
                  <ul className="categories-list">
                    <li><Link to="/blogs">Technology</Link></li>
                    <li><Link to="/blogs">Networking</Link></li>
                    <li><Link to="/blogs">Telecom</Link></li>
                    <li><Link to="/blogs">Cloud</Link></li>
                    <li><Link to="/blogs">AI/ML</Link></li>
                    <li><Link to="/blogs">Security</Link></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;