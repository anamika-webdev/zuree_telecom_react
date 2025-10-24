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

     {/* NEW FOOTER - REPLACES OLD FOOTER */}
<footer className="site-footer">
  {/* Newsletter Section */}
  <div className="footer-newsletter-section">
    <div className="container">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Great projects start with a great name.</h2>
        <form className="newsletter-form">
          <input 
            type="email" 
            placeholder="Email" 
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-btn">Send</button>
        </form>
      </div>
    </div>
  </div>

  {/* Footer Links Section */}
  <div className="footer-links-section">
    <div className="container">
      <div className="row">
        {/* Column 1 */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links-list">
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
          <ul className="footer-links-list">
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
          <ul className="footer-links-list">
            <li><Link to="/services/5g">5G Transformation</Link></li>
            <li><Link to="/services/networking">Networking and Wi-Fi</Link></li>
            <li><Link to="/services/blockchain">Blockchain</Link></li>
            <li><Link to="/services/bi-analytics">BI & Analytics</Link></li>
            <li><Link to="/services/vr-ar">VR & AR Solutions</Link></li>
            <li><Link to="/services/recruitment">Recruitment Process Outsourcing</Link></li>
          </ul>
        </div>

        {/* Column 4 - with social icons */}
        <div className="mb-4 col-lg-3 col-md-6">
          <ul className="footer-links-list">
            <li><Link to="/career">Career/Jobs</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy & Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
          
          {/* Social Icons */}
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <i className="bi bi-telegram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="footer-bottom">
    <div className="container">
      <div className="footer-bottom-content">
        <p className="copyright-text">© Copyright 2022 Zuree Telecom. All rights reserved</p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Layout;