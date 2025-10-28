// UPDATED CODE FOR: src/pages/Home.jsx
// Replace your existing Home.jsx content with this

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    {
      id: 1,
      title: "Modern Workspace",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      description: "Empowering teams everywhere"
    },
    {
      id: 2,
      title: "Digital Innovation",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      description: "Transform your business with technology"
    },
    {
      id: 3,
      title: "Cloud Solutions",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      description: "Scalable infrastructure for modern businesses"
    },
    {
      id: 4,
      title: "Smart Analytics",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      description: "Data-driven insights for growth"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const handlePrevious = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="home-page">
      {/* Hero Section with Integrated Video Carousel */}
      <section className="hero-section-modern">
        {/* Decorative Blobs */}
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="hero-content-left">
                <span className="hero-badge">Digital Innovation Leader</span>
                <h1>Empowering Digital Transformation</h1>
                <p>Transform your business with innovative digital solutions and cutting-edge technology. We help organizations navigate their digital journey with confidence.</p>
                <Link to="/contact-us" className="btn btn-hero-primary">Get Started</Link>
              </div>
            </div>

            {/* Right - Video Carousel */}
            <div className="col-lg-6">
              <div className="hero-carousel-wrapper">
                <div className="hero-carousel-container">
                  {/* Main Carousel Image */}
                  <div className="hero-carousel-image">
                    <img 
                      src={videos[currentVideoIndex].thumbnail} 
                      alt={videos[currentVideoIndex].title}
                      className="hero-carousel-img"
                    />
                    {/* Small icon badge on top left */}
                    <div className="hero-carousel-badge">
                      <i className="fas fa-cube"></i>
                    </div>
                  </div>

                  {/* Carousel Dots Indicator */}
                  <div className="hero-carousel-dots">
                    {videos.map((_, index) => (
                      <button
                        key={index}
                        className={`hero-carousel-dot ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button className="hero-carousel-arrow hero-arrow-left" onClick={handlePrevious}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="hero-carousel-arrow hero-arrow-right" onClick={handleNext}>
                    <i className="fas fa-chevron-right"></i>
                  </button>

                  {/* Decorative circles */}
                  <div className="hero-carousel-deco hero-carousel-deco-1"></div>
                  <div className="hero-carousel-deco hero-carousel-deco-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Now comes directly after hero */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2>Our Services</h2>
            </div>
          </div>

          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Application Development</h3>
                <p>Custom mobile and web applications tailored to your business needs.</p>
                <Link to="/services/android-application">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <h3>Digital Marketing</h3>
                <p>Comprehensive digital marketing strategies to grow your business.</p>
                <Link to="/services/digital-marketing">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h3>5G & Networking</h3>
                <p>Advanced networking solutions for seamless connectivity.</p>
                <Link to="/services/5g">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-cube"></i>
                </div>
                <h3>Blockchain</h3>
                <p>Secure and transparent blockchain solutions.</p>
                <Link to="/services/blockchain">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-bar-chart"></i>
                </div>
                <h3>BI & Analytics</h3>
                <p>Data-driven insights for better business decisions.</p>
                <Link to="/services/bi-analytics">Learn More →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="icon">
                  <i className="fa fa-building"></i>
                </div>
                <h3>VR & AR Solutions</h3>
                <p>Immersive experiences through virtual and augmented reality.</p>
                <Link to="/services/vr-ar-solutions">Learn More →</Link>
              </div>
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
                  <i className="fa fa-users"></i>
                </div>
                <h3>Recruitment Process Outsourcing</h3>
                <Link to="/services/recruitment-process-outsourcing">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-user-plus"></i>
                </div>
                <h3>Staff Augmentation</h3>
                <Link to="/services/staff-augmentation">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-chart-line"></i>
                </div>
                <h3>Talent Management</h3>
                <Link to="/services/talent-management">read more →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support Section */}
      <section className="support-section-modern section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="mb-4 col-lg-6 mb-lg-0">
              <span className="section-badge">SUPPORT</span>
              <h2 className="support-title">
                We're Here <span className="highlight-text">24/7</span> for You
              </h2>
              <p className="support-description">
                Our dedicated support team is always ready to assist you with expert guidance 
                and solutions. Experience seamless support across all time zones.
              </p>

              <div className="support-cards-grid">
                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h4>Live Chat</h4>
                  <p>Instant responses from our expert team</p>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4>Email Support</h4>
                  <p>Detailed assistance within hours</p>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h4>Phone Support</h4>
                  <p>Direct line to our specialists</p>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h4>Priority Service</h4>
                  <p>VIP support for premium clients</p>
                </div>
              </div>

              <div className="support-stats">
                <div className="stats-row">
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