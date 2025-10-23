// FILE: src/components/layout/Layout.jsx
// ============================================
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className="site-wrapper">
      {/* Header */}
      <header className="page_header header-fixed header-transparent">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-xl-2 col-lg-3 col-11">
              <Link to="/" className="logo">
                <img src="/images/toplogo-image.jpg" alt="Zuree Telecom" />
              </Link>
            </div>

            {/* Navigation */}
            <div className="col-xl-8 col-lg-9 col-1 text-right">
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
              </button>

              <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-menu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  
                  <li>
                    <Link to="/about-us">About Us</Link>
                  </li>

                  <li>
                    <Link to="/vision-mission">Vision & Mission</Link>
                  </li>

                  <li 
                    className="mega-menu"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <a href="#services">Services</a>
                    {servicesOpen && (
                      <div className="mega-menu-content">
                        <div className="mega-menu-col">
                          <h5>Development</h5>
                          <ul>
                            <li><Link to="/services/android-application">Android Application</Link></li>
                            <li><Link to="/services/ios-application">iOS Application</Link></li>
                            <li><Link to="/services/hybrid-application">Hybrid Application</Link></li>
                            <li><Link to="/services/web-application">Web Application</Link></li>
                            <li><Link to="/services/windows-application">Windows Application</Link></li>
                          </ul>
                        </div>

                        <div className="mega-menu-col">
                          <h5>Digital Marketing</h5>
                          <ul>
                            <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                            <li><Link to="/services/seo">SEO</Link></li>
                            <li><Link to="/services/social-media-marketing">Social Media Marketing</Link></li>
                            <li><Link to="/services/content-marketing">Content Marketing</Link></li>
                            <li><Link to="/services/email-marketing">Email Marketing</Link></li>
                          </ul>
                        </div>

                        <div className="mega-menu-col">
                          <h5>IT Consulting</h5>
                          <ul>
                            <li><Link to="/services/recruitment-process-outsourcing">RPO</Link></li>
                            <li><Link to="/services/staff-augmentation">Staff Augmentation</Link></li>
                            <li><Link to="/services/talent-management">Talent Management</Link></li>
                          </ul>
                        </div>

                        <div className="mega-menu-col">
                          <h5>Other Services</h5>
                          <ul>
                            <li><Link to="/services/5g">5G Transformation</Link></li>
                            <li><Link to="/services/networking">Networking & Wi-Fi</Link></li>
                            <li><Link to="/services/blockchain">Blockchain</Link></li>
                            <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
                            <li><Link to="/services/vr-ar-solutions">VR & AR Solutions</Link></li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link to="/career">Career/Jobs</Link>
                  </li>

                  <li>
                    <Link to="/blogs">Our Blogs</Link>
                  </li>

                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>

                  <li>
                    <Link to="/login">Login</Link>
                  </li>
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
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="widget">
                <h3 className="widget-title">About Zuree</h3>
                <p>
                  Zuree Telecom was founded in 2014 by experienced telecom professionals.
                  We provide comprehensive infrastructure analysis and communications solutions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="widget">
                <h3 className="widget-title">Quick Links</h3>
                <ul className="footer-links">
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/vision-mission">Vision & Mission</Link></li>
                  <li><Link to="/career">Careers</Link></li>
                  <li><Link to="/blogs">Blogs</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="widget">
                <h3 className="widget-title">Contact Info</h3>
                <ul className="contact-info">
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <span>Your Address Here</span>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <span>+1 234 567 8900</span>
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <span>info@zureetelecom.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="row">
              <div className="col-md-12 text-center">
                <p>&copy; {new Date().getFullYear()} Zuree Telecom. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;