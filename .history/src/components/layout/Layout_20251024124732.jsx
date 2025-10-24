// FILE: src/components/layout/Layout.jsx

import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../ScrollToTop';
import ServicesMegaMenu from './ServicesMegaMenu';
import '../../assets/css/layout.css';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <ToastContainer />

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
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-menu">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  
                  {/* Services Mega Menu */}
                  <li 
                    className="mega-menu"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a>Our Services</a>
                    {servicesOpen && <ServicesMegaMenu />}
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
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="footer-container-new">
        <div className="container">
          <div className="row gy-4">
            
            {/* Column 1: About */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <img 
                  src="/images/mainlogo.jpeg" 
                  alt="Zuree Telecom" 
                  className="mb-3 footer-logo" 
                />
                <p className="footer-about-text">
                  Zuree Telecom, founded in 2014 by experienced telecom professionals, 
                  has been at the forefront of digital transformation.
                </p>
                <div className="mt-4 footer-social-icons">
                  <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Application Development */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title">Application Development</h4>
                <ul className="footer-links">
                  <li><Link to="/services/web-application">Web Application</Link></li>
                  <li><Link to="/services/android-application">Android Application</Link></li>
                  <li><Link to="/services/ios-application">iOS Application</Link></li>
                  <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
                  <li><Link to="/services/windows-application">Windows Application</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Digital Services */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title">Digital Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/seo">SEO Services</Link></li>
                  <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                  <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
                  <li><Link to="/services/email-marketing">Email Marketing</Link></li>
                  <li><Link to="/services/content-marketing">Content Marketing</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 4: IT Consulting & Other Services */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-widget-title">IT Consulting</h4>
                <ul className="footer-links">
                  <li><Link to="/services/staff-augmentation">Staff Augmentation</Link></li>
                  <li><Link to="/services/talent-management">Talent Management</Link></li>
                  <li><Link to="/services/5g-transformation">5G Transformation</Link></li>
                  <li><Link to="/services/blockchain">Blockchain</Link></li>
                  <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="pt-4 mt-5 row border-top">
            <div className="text-center col-12">
              <p className="footer-copyright">
                © {new Date().getFullYear()} Zuree Telecom. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;