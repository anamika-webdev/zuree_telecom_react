import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const video = document.getElementById('aboutVideo');
    const playButton = document.getElementById('playButton');

    if (playButton && video) {
      const handlePlayClick = () => {
        video.play();
        video.setAttribute('controls', 'controls');
        playButton.classList.add('hidden');
      };

      const handlePause = () => {
        if (video.currentTime === 0) {
          playButton.classList.remove('hidden');
          video.removeAttribute('controls');
        }
      };

      playButton.addEventListener('click', handlePlayClick);
      video.addEventListener('pause', handlePause);

      // Cleanup
      return () => {
        playButton.removeEventListener('click', handlePlayClick);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section - Updated with Curved Design */}
      <section className="hero-section">
        {/* Floating Particles for Animation */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-content">
                <h1>Empowering Digital Transformation</h1>
                <p>Leading provider of innovative telecom infrastructure solutions and digital services for businesses worldwide</p>
                <Link to="/contact-us" className="btn btn-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="mb-4 col-lg-6 mb-lg-0">
              <div className="about-video-wrapper">
                <div className="about-video">
                  <video 
                    id="aboutVideo"
                    className="video-player" 
                    preload="metadata"
                    playsInline
                  >
                    <source src="/videos/about_us_home_page.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="play-button-overlay" id="playButton">
                    <div className="play-button">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2>About Us</h2>
              <p>
                Zuree Telecom was founded in 2014 by experienced telecom professionals. 
                We specialize in providing comprehensive infrastructure analysis and 
                communications solutions tailored to your needs.
              </p>
              <Link to="/about-us" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
      {/* Business Units Section */}
      <section className="business-units-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2 className="section-title">Business Units</h2>
            </div>
          </div>

          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-cube"></i>
                </div>
                <h3>Blockchain</h3>
                <Link to="/services/blockchain">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-bar-chart"></i>
                </div>
                <h3>BI & Analytics</h3>
                <Link to="/services/bi-analytics">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-building"></i>
                </div>
                <h3>VR & AR Solutions</h3>
                <Link to="/services/vr-ar-solutions">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-mobile"></i>
                </div>
                <h3>Application Development</h3>
                <Link to="/services/android-application">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h3>Digital Services</h3>
                <Link to="/services/digital-marketing">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-users"></i>
                </div>
                <h3>IT Consulting</h3>
                <Link to="/services/staff-augmentation">read more →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="openings-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="openings-image">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="Team" className="rounded img-fluid" />
              </div>
            </div>
            <div className="col-lg-6">
              <h2>Zuree Telecom Current Openings</h2>
              <div className="job-list">
                <div className="job-item">
                  <span>AJAX, Telecom (01-JUN2025)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>Integration and Test Engineer (w/ KPI)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>ICT or Low Volt Stack Developer</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>RF Construction BPR</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>Telecom Recruiter - USA, Mexico (remote based)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Innovate Section */}
      <section className="innovate-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2>Create, Innovate and Produce</h2>
              <p className="lead">
                Zuree works with global Tier 1, 2 OEMs, System Integrators, Telcos across the globe 
                in business units and helps them create innovative products with excellence.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="process-card">
                <span className="badge">Excellence in</span>
                <h3>Product Engineering</h3>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="process-card">
                <span className="badge">Agility in</span>
                <h3>Manufacturing</h3>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="process-card">
                <span className="badge">Guaranteed</span>
                <h3>Value Delivery</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2 className="section-title">Our Services</h2>
            </div>
          </div>

          <div className="row">
            <div className="mb-4 col-md-4">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-mobile fa-3x"></i>
                </div>
                <h3>Mobile Development</h3>
                <p>Android, iOS, and Hybrid applications</p>
                <Link to="/services/android-application">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-md-4">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-laptop fa-3x"></i>
                </div>
                <h3>Web Development</h3>
                <p>Custom web applications</p>
                <Link to="/services/web-application">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-md-4">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-bullhorn fa-3x"></i>
                </div>
                <h3>Digital Marketing</h3>
                <p>SEO, Social Media, Content Marketing</p>
                <Link to="/services/digital-marketing">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* 24/7 Support Section - IMPROVED DESIGN */}
      <section className="support-section-modern section-padding">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side - Support Cards */}
            <div className="mb-4 col-lg-6 mb-lg-0">
              <div className="support-content">
                <div className="section-badge">CUSTOMER SUPPORT</div>
                <h2 className="support-title">
                  We are ready to help you <span className="highlight-text">24/7</span>
                </h2>
                <p className="support-description">
                  Our dedicated support team is always available to assist you with any questions or concerns. 
                  Choose your preferred method of communication and we'll be there for you.
                </p>

                <div className="support-cards-grid">
                  {/* Live Chat */}
                  <div className="support-card-modern">
                    <div className="support-icon-wrapper chat">
                      <i className="fas fa-comments"></i>
                    </div>
                    <div className="support-card-content">
                      <h4>Live Chat</h4>
                      <p>Chat with our team instantly</p>
                      <a href="#" className="support-link">Start Chat →</a>
                    </div>
                  </div>

                  {/* Phone Calls */}
                  <div className="support-card-modern">
                    <div className="support-icon-wrapper phone">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="support-card-content">
                      <h4>Phone Support</h4>
                      <p>Call us for immediate help</p>
                      <a href="tel:+911234567890" className="support-link">Call Now →</a>
                    </div>
                  </div>

                  {/* Ticket Support */}
                  <div className="support-card-modern">
                    <div className="support-icon-wrapper ticket">
                      <i className="fas fa-ticket-alt"></i>
                    </div>
                    <div className="support-card-content">
                      <h4>Ticket System</h4>
                      <p>Submit and track support tickets</p>
                      <a href="#" className="support-link">Create Ticket →</a>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="support-card-modern">
                    <div className="support-icon-wrapper email">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="support-card-content">
                      <h4>Email Support</h4>
                      <p>Send us a detailed message</p>
                      <a href="mailto:support@zureetelecom.com" className="support-link">Send Email →</a>
                    </div>
                  </div>
                </div>

                {/* Support Stats */}
                <div className="support-stats">
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Available</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">&lt;2min</span>
                    <span className="stat-label">Avg Response</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-lg-6">
              <div className="support-image-wrapper">
                <div className="image-decoration"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800" 
                  alt="Customer Support Representative" 
                  className="support-image"
                />
                <div className="floating-badge">
                  <i className="fas fa-headset"></i>
                  <div>
                    <strong>24/7 Support</strong>
                    <span>Always Here for You</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;