// src/components/layout/Layout.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ServicesMegaMenu from './ServicesMegaMenu';
import './ServicesMegaMenu.css';

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
        {children}
      </main>

      {/* Footer */}
      <footer className="page-footer">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center">
              <div className="text-center col-lg-8">
                <h3>Great projects start with a great name.</h3>
                <p>Subscribe to our newsletter for updates</p>
                <form className="newsletter-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email"
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          <div className="container">
            <div className="row">
              {/* Column 1 - Application Development */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Application Development</h4>
                <ul className="footer-links">
                  <li><Link to="/services/web-application">Web Application</Link></li>
                  <li><Link to="/services/android-application">Android Application</Link></li>
                  <li><Link to="/services/ios-application">iOS Application</Link></li>
                  <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
                  <li><Link to="/services/windows-application">Windows Application</Link></li>
                </ul>
              </div>

              {/* Column 2 - Digital Services */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Digital Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/seo">SEO Services</Link></li>
                  <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                  <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
                  <li><Link to="/services/email-marketing">Email Marketing</Link></li>
                  <li><Link to="/services/content-marketing">Content Marketing</Link></li>
                </ul>
              </div>

              {/* Column 3 - IT Consulting */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">IT Consulting</h4>
                <ul className="footer-links">
                  <li><Link to="/services/staff-augmentation">Staff Augmentation/Flexi Staffing</Link></li>
                  <li><Link to="/services/talent-management">Talent Management</Link></li>
                  <li><Link to="/services/recruitment-process-outsourcing">Recruitment Process Outsourcing</Link></li>
                </ul>
              </div>

              {/* Column 4 - Other Services */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Other Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/5g-transformation">5G Transformation</Link></li>
                  <li><Link to="/services/networking-wifi">Networking and Wi-Fi</Link></li>
                  <li><Link to="/services/blockchain">Blockchain</Link></li>
                  <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
                  <li><Link to="/services/vr-ar-solutions">VR & AR Solutions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright-text">
                  © {new Date().getFullYear()} Zuree Telecom. All rights reserved.
                </p>
              </div>
              <div className="col-md-6">
                <div className="footer-social">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;// src/components/layout/Layout.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ServicesMegaMenu from './ServicesMegaMenu';
import './ServicesMegaMenu.css';

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
        {children}
      </main>

      {/* Footer */}
      <footer className="page-footer">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center">
              <div className="text-center col-lg-8">
                <h3>Great projects start with a great name.</h3>
                <p>Subscribe to our newsletter for updates</p>
                <form className="newsletter-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter your email"
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          <div className="container">
            <div className="row">
              {/* Column 1 - Application Development */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Application Development</h4>
                <ul className="footer-links">
                  <li><Link to="/services/web-application">Web Application</Link></li>
                  <li><Link to="/services/android-application">Android Application</Link></li>
                  <li><Link to="/services/ios-application">iOS Application</Link></li>
                  <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
                  <li><Link to="/services/windows-application">Windows Application</Link></li>
                </ul>
              </div>

              {/* Column 2 - Digital Services */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Digital Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/seo">SEO Services</Link></li>
                  <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                  <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
                  <li><Link to="/services/email-marketing">Email Marketing</Link></li>
                  <li><Link to="/services/content-marketing">Content Marketing</Link></li>
                </ul>
              </div>

              {/* Column 3 - IT Consulting */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">IT Consulting</h4>
                <ul className="footer-links">
                  <li><Link to="/services/staff-augmentation">Staff Augmentation/Flexi Staffing</Link></li>
                  <li><Link to="/services/talent-management">Talent Management</Link></li>
                  <li><Link to="/services/recruitment-process-outsourcing">Recruitment Process Outsourcing</Link></li>
                </ul>
              </div>

              {/* Column 4 - Other Services */}
              <div className="mb-4 col-lg-3 col-md-6">
                <h4 className="footer-column-title">Other Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/5g-transformation">5G Transformation</Link></li>
                  <li><Link to="/services/networking-wifi">Networking and Wi-Fi</Link></li>
                  <li><Link to="/services/blockchain">Blockchain</Link></li>
                  <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
                  <li><Link to="/services/vr-ar-solutions">VR & AR Solutions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright-text">
                  © {new Date().getFullYear()} Zuree Telecom. All rights reserved.
                </p>
              </div>
              <div className="col-md-6">
                <div className="footer-social">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;