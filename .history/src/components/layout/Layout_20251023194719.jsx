// FILE: src/components/layout/Layout.jsx
// ============================================
import { Outlet, Link } from 'react-router-dom'; // Added Link
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../ScrollToTop';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <ScrollToTop />
      {/* Preloader can be added here if needed */}
      
      <div className="main-container">
        {/* Header placeholder - You'll import/add your Header component here */}
        {/* <Header /> */}
        
        <main className="main-content">
          {children || <Outlet />}
        </main>
        
        {/* --- Updated Footer Section --- */}
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
                    has been at the forefront of digital transformation...
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

              {/* Column 2: Company */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget">
                  <h5 className="footer-widget-title">Company</h5>
                  <ul className="footer-links-list">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/">Our Services</Link></li> {/* Assuming / is services, adjust as needed */}
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/blogs">Our Blogs</Link></li>
                    <li><Link to="/career">Career</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 3: Our Services */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget">
                  <h5 className="footer-widget-title">Our Services</h5>
                  <ul className="footer-links-list">
                    <li><Link to="/services/content-marketing">Content Marketing</Link></li>
                    <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                    <li><Link to="/services/staff-augmentation">Staff Augmentation</Link></li>
                    <li><Link to="/services/web-application">Web Application</Link></li>
                    <li><Link to="/services/android-application">Android Application</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 4: Contact Us */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget">
                  <h5 className="footer-widget-title">Contact Us</h5>
                  <ul className="footer-contact-list">
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>B-25, First Floor, B Block, Sector 59, Noida, Uttar Pradesh 201301</span>
                    </li>
                    <li>
                      <i className="fas fa-phone-alt"></i>
                      <span>+91 8595335175</span>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <span>info@zureetelecom.com</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          
          <div className="footer-bottom-bar">
            <div className="container">
              <div className="row align-items-center">
                <div className="text-center col-md-6 text-md-start">
                  <p>Copyright 2024 Zuree Telecom. All Right Reserved.</p>
                </div>
                <div className="text-center col-md-6 text-md-end">
                  <p>Powered By: Zuree Telecom</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* --- End Footer Section --- */}

      </div>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;