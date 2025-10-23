// src/components/layout/Layout.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
                  <li><Link to="/vision-mission">Vision & Mission</Link></li>
                  
                  <li 
                    className="mega-menu"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a href="#services">Services</a>
                    {servicesOpen && (
                      <div className="mega-menu-content">
                        {/* Your mega menu content */}
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
<div className="footer-newsletter">
  <div className="container">
    <div className="row justify-content-center">
      <div className="text-center col-lg-8">
        <h2>Great projects start with a great connection.</h2>
        <p>Subscribe to our newsletter and stay updated with the latest news, tips, and exclusive offers.</p>
        <form className="newsletter-form">
          <div className="input-group">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* Footer */}
{/* Footer Content with Section Titles */}
<div className="footer-content">
  <div className="container">
    <div className="row">
      {/* Services Column */}
      <div className="mb-4 col-lg-3 col-md-6">
        <h3 className="footer-column-title">Services</h3>
        <ul className="footer-links">
          <li><Link to="/services/web-application">Web Development</Link></li>
          <li><Link to="/services/android-application">Mobile Applications</Link></li>
          <li><Link to="/services/cloud">Cloud Solutions</Link></li>
          <li><Link to="/services/uiux">UI/UX Design</Link></li>
          <li><Link to="/services/devops">DevOps Services</Link></li>
          <li><Link to="/services/consulting">Consulting</Link></li>
        </ul>
      </div>

      {/* Technologies Column */}
      <div className="mb-4 col-lg-3 col-md-6">
        <h3 className="footer-column-title">Technologies</h3>
        <ul className="footer-links">
          <li><Link to="/tech/react">React & Next.js</Link></li>
          <li><Link to="/tech/node">Node.js & Python</Link></li>
          <li><Link to="/tech/aws">AWS & Azure</Link></li>
          <li><Link to="/tech/ai">AI & Machine Learning</Link></li>
          <li><Link to="/services/blockchain">Blockchain</Link></li>
          <li><Link to="/services/bi-analytics">Data Analytics</Link></li>
        </ul>
      </div>

      {/* Company Column */}
      <div className="mb-4 col-lg-3 col-md-6">
        <h3 className="footer-column-title">Company</h3>
        <ul className="footer-links">
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/career">Careers</Link></li>
          <li><Link to="/blogs">Blog</Link></li>
          <li><Link to="/case-studies">Case Studies</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
          <li><Link to="/partners">Partners</Link></li>
        </ul>
      </div>

      {/* Legal & Social Column */}
      <div className="mb-4 col-lg-3 col-md-6">
        <h3 className="footer-column-title">Legal</h3>
        <ul className="footer-links">
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-conditions">Terms of Service</Link></li>
          <li><Link to="/cookie-policy">Cookie Policy</Link></li>
          <li><Link to="/gdpr">GDPR</Link></li>
        </ul>
        
        <div className="footer-social-section">
          <h3 className="footer-social-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Layout;