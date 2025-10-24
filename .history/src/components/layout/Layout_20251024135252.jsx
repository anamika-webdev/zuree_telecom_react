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

    
    </div>
  );
};

export default Layout;