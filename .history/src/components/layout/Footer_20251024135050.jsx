// Footer.jsx - Fixed version matching screenshot
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
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
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <i className="fab fa-telegram-plane"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
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
          <div className="footer-bottom-content">
            <p className="copyright-text">© Copyright 2022 Zuree Telecom. All rights reserved</p>
            <p className="developed-text">Developed By Incroyable Industries Private Limited</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;