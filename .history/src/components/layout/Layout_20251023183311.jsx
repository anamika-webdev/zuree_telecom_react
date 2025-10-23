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

{/* Footer */}
<footer className="page-footer">
  {/* Newsletter Section */}
  <div className="footer-newsletter">
    <div className="container">
      <div className="row justify-content-center">
        <div className="text-center col-lg-8">
          <h2>Great projects start with a great name.</h2>
          <form className="newsletter-form">
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email address" 
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

  {/* Footer Links - NO CARD WRAPPERS */}
  <div className="footer-content">
    <div className="container">
      <div className="row">
        {/* Column 1 */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links">
            <li><Link to="/services/web-application">Web Application</Link></li>
            <li><Link to="/services/android-application">Android Application</Link></li>
            <li><Link to="/services/ios-application">iOS Application</Link></li>
            <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
            <li><Link to="/services/windows-application">Windows Application</Link></li>
            <li><Link to="/services/staff-augmentation">Staff Augmentation/Flexi Staffing</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links">
            <li><Link to="/services/seo">SEO Services</Link></li>
            <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
            <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
            <li><Link to="/services/email-marketing">Email Marketing</Link></li>
            <li><Link to="/services/content-marketing">Content Marketing</Link></li>
            <li><Link to="/services/talent-management">Talent Management</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links">
            <li><Link to="/services/5g">5G Transformation</Link></li>
            <li><Link to="/services/networking">Networking and Wi-Fi</Link></li>
            <li><Link to="/services/blockchain">Blockchain</Link></li>
            <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
            <li><Link to="/services/vr-ar-solutions">VR & AR Solutions</Link></li>
            <li><Link to="/services/recruitment-process-outsourcing">Recruitment Process Outsourcing</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links">
            <li><Link to="/career">Career/Jobs</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy & Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram-plane"></i>
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

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="text-center col-md-6 text-md-start">
          <p>&copy; Copyright 2022 Zuree Telecom. All rights reserved</p>
        </div>
        <div className="text-center col-md-6 text-md-end">
          <p>Developed By Incroyable Industries Private Limited</p>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Layout;