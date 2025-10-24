// src/components/layout/Layout.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../assets/css/layout.css';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const serviceCategories = [
    {
      title: 'Application Development',
      items: [
        { label: 'Web Application', path: '/services/web-application' },
        { label: 'Android Application', path: '/services/android-application' },
        { label: 'iOS Application', path: '/services/ios-application' },
        { label: 'Hybrid Application', path: '/services/hybrid-application' },
        { label: 'Windows Application', path: '/services/windows-application' }
      ]
    },
    {
      title: 'Digital Services',
      items: [
        { label: 'SEO Services', path: '/services/seo' },
        { label: 'Digital Marketing', path: '/services/digital-marketing' },
        { label: 'Social Media Marketing', path: '/services/social-media-marketing' },
        { label: 'Email Marketing', path: '/services/email-marketing' },
        { label: 'Content Marketing', path: '/services/content-marketing' }
      ]
    },
    {
      title: 'IT Consulting',
      items: [
        { label: 'Staff Augmentation/Flexi Staffing', path: '/services/staff-augmentation' },
        { label: 'Talent Management', path: '/services/talent-management' },
        { label: 'Recruitment Process Outsourcing', path: '/services/recruitment-process-outsourcing' }
      ]
    },
    {
      title: 'Other Services',
      items: [
        { label: '5G Transformation', path: '/services/5g' },
        { label: 'Networking and Wi-Fi', path: '/services/networking' },
        { label: 'Blockchain', path: '/services/blockchain' },
        { label: 'BI & Analytics', path: '/services/bi-analytics' },
        { label: 'VR & AR Solutions', path: '/services/vr-ar-solutions' }
      ]
    }
  ];

  return (
    <div className="site-wrapper">
      {/* Header */}
      <header className="page_header header-fixed">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-xl-2 col-lg-2 col-md-3 col-6">
              <Link to="/" className="logo">
                <img src="/images/mainlogo.jpeg" alt="Zuree Telecom" />
              </Link>
            </div>

            {/* Navigation */}
            <div className="col-xl-10 col-lg-10 col-md-9 col-6">
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-menu">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  
                  <li 
                    className="mega-menu"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a href="#services">
                      Our Services <span className="dropdown-arrow">▼</span>
                    </a>
                    {servicesOpen && (
                      <div className="mega-menu-content">
                        {serviceCategories.map((category, index) => (
                          <div key={index} className="mega-menu-col">
                            <h5>{category.title}</h5>
                            <ul>
                              {category.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link to={item.path}>{item.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  <li><Link to="/career">Career/Jobs</Link></li>
                  <li><Link to="/blogs">Our Blogs</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="new-footer">
        {/* Newsletter Section */}
        <div className="new-footer-newsletter">
          <div className="new-newsletter-content">
            <h2 className="new-newsletter-title">Great projects start with a great connection.</h2>
            <p className="new-newsletter-subtitle">
              Subscribe to our newsletter and stay updated with the latest news, tips, and exclusive offers.
            </p>
            <form className="new-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="new-newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="new-subscribe-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="new-footer-links">
          <div className="container">
            <div className="row">
              {/* Company Info */}
              <div className="mb-4 col-lg-4 col-md-6">
                <h4 className="new-footer-heading">Zuree Telecom</h4>
                <p className="new-footer-text">
                  Leading provider of IT solutions and services, helping businesses transform digitally.
                </p>
                <div className="new-social-section">
                  <h5 className="new-social-heading">Follow Us</h5>
                  <div className="new-social-links">
                    <a href="#" className="new-social-icon" aria-label="Facebook">
                      <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" className="new-social-icon" aria-label="Twitter">
                      <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="#" className="new-social-icon" aria-label="LinkedIn">
                      <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" className="new-social-icon" aria-label="Instagram">
                      <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mb-4 col-lg-2 col-md-6">
                <h4 className="new-footer-heading">Quick Links</h4>
                <ul className="new-footer-list">
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/career">Careers</Link></li>
                  <li><Link to="/blogs">Blog</Link></li>
                  <li><Link to="/contact-us">Contact</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="new-footer-heading">Services</h4>
                <ul className="new-footer-list">
                  <li><Link to="/services/web-application">Web Development</Link></li>
                  <li><Link to="/services/android-application">Mobile Apps</Link></li>
                  <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                  <li><Link to="/services/blockchain">Blockchain</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="new-footer-heading">Contact Info</h4>
                <ul className="new-footer-list">
                  <li>📍 Your Address Here</li>
                  <li>📞 +1 234 567 8900</li>
                  <li>✉️ info@zureetelecom.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="new-footer-bottom">
          <div className="container">
            <div className="new-footer-bottom-content">
              <p className="new-copyright">
                © {new Date().getFullYear()} Zuree Telecom. All rights reserved.
              </p>
              <p className="new-crafted-by">
                Crafted with ❤️ by Zuree Telecom
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;