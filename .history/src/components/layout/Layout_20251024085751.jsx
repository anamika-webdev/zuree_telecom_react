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
    // Add your subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

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
                    <a href="#services">Services</a>
                    {servicesOpen && (
                      <div className="mega-menu-content">
                        {/* Your mega menu content here */}
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

      {/* NEW MODERN FOOTER WITH redESIGNED NEWSLETTER */}
      <footer className="new-footer">
        {/* Newsletter Section - NEW DESIGN */}
        <div className="modern-newsletter-section">
          <div className="newsletter-background-pattern"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="modern-newsletter-card">
                  <div className="row align-items-center">
                    {/* Left Side - Icon & Text */}
                    <div className="mb-4 col-lg-6 mb-lg-0">
                      <div className="newsletter-content-left">
                        <div className="newsletter-icon-wrapper">
                          <svg className="newsletter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <h3 className="newsletter-heading">Stay in the Loop!</h3>
                        <p className="newsletter-description">
                          Get exclusive insights, tips, and updates delivered straight to your inbox.
                        </p>
                        <div className="newsletter-features">
                          <div className="feature-item">
                            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span>Weekly industry insights</span>
                          </div>
                          <div className="feature-item">
                            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span>Exclusive offers & deals</span>
                          </div>
                          <div className="feature-item">
                            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span>No spam, unsubscribe anytime</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="col-lg-6">
                      <div className="newsletter-form-wrapper">
                        <form className="modern-newsletter-form" onSubmit={handleSubscribe}>
                          <div className="form-group-modern">
                            <label className="form-label-modern">Your Email Address</label>
                            <div className="input-with-icon">
                              <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                              </svg>
                              <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="modern-email-input"
                                required
                              />
                            </div>
                          </div>
                          <button type="submit" className="modern-subscribe-btn">
                            <span>Subscribe Now</span>
                            <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                          </button>
                          <p className="privacy-note">
                            🔒 We respect your privacy. Your information is safe with us.
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="new-footer-links">
          <div className="container">
            <div className="row">
              <div className="mb-4 col-lg-3 col-md-6">
                <h3 className="new-footer-heading">Services</h3>
                <ul className="new-footer-list">
                  <li><Link to="/services/web-application">Web Development</Link></li>
                  <li><Link to="/services/android-application">Mobile Applications</Link></li>
                  <li><Link to="/services/cloud">Cloud Solutions</Link></li>
                  <li><Link to="/services/uiux">UI/UX Design</Link></li>
                  <li><Link to="/services/devops">DevOps Services</Link></li>
                  <li><Link to="/services/consulting">Consulting</Link></li>
                </ul>
              </div>

              <div className="mb-4 col-lg-3 col-md-6">
                <h3 className="new-footer-heading">Technologies</h3>
                <ul className="new-footer-list">
                  <li><Link to="/tech/react">React & Next.js</Link></li>
                  <li><Link to="/tech/node">Node.js & Python</Link></li>
                  <li><Link to="/tech/aws">AWS & Azure</Link></li>
                  <li><Link to="/tech/ai">AI & Machine Learning</Link></li>
                  <li><Link to="/services/blockchain">Blockchain</Link></li>
                  <li><Link to="/services/bi-analytics">Data Analytics</Link></li>
                </ul>
              </div>

              <div className="mb-4 col-lg-3 col-md-6">
                <h3 className="new-footer-heading">Company</h3>
                <ul className="new-footer-list">
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/career">Careers</Link></li>
                  <li><Link to="/blogs">Blog</Link></li>
                  <li><Link to="/case-studies">Case Studies</Link></li>
                  <li><Link to="/contact-us">Contact</Link></li>
                  <li><Link to="/partners">Partners</Link></li>
                </ul>
              </div>

              <div className="mb-4 col-lg-3 col-md-6">
                <h3 className="new-footer-heading">Legal</h3>
                <ul className="new-footer-list">
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-conditions">Terms of Service</Link></li>
                  <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                  <li><Link to="/gdpr">GDPR</Link></li>
                </ul>
                
                <div className="new-social-section">
                  <h3 className="new-footer-heading">Follow Us</h3>
                  <div className="new-social-icons">
                    <a href="https://facebook.com" className="new-social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" className="new-social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" className="new-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" className="new-social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com" className="new-social-icon" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="new-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="new-footer-bottom-content">
                  <p className="new-copyright">© 2025 Zuree Telecom. All rights reserved.</p>
                  <p className="new-crafted-by">Crafted with passion by the development team</p>
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