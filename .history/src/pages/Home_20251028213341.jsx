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
                <span className="hero-badge">Zuree Telecom</span>
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

      

     {/* Enhanced 24/7 Support Section */}
      <section className="support-section-modern section-padding">
        <div className="container">
          {/* Section Header */}
          <div className="mb-5 row">
            <div className="mx-auto text-center col-lg-8">
              <span className="mb-3 section-badge">24/7 SUPPORT</span>
              <h2 className="mb-4 support-title">
                We're Here <span className="highlight-text">24/7</span> for You
              </h2>
              <p className="support-description">
                Our dedicated support team is always ready to assist you with expert guidance 
                and solutions. Experience seamless support across all time zones with multiple 
                channels to reach us instantly.
              </p>
            </div>
          </div>

          <div className="row align-items-center">
            {/* Left Side - Support Options */}
            <div className="mb-4 col-lg-6 mb-lg-0">
              <div className="support-cards-grid">
                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <div className="card-content">
                    <h4>Live Chat</h4>
                    <p>Instant responses from our expert team available round the clock</p>
                    <div className="support-availability">
                      <i className="fas fa-circle text-success"></i>
                      <span>Available Now</span>
                    </div>
                  </div>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="card-content">
                    <h4>Email Support</h4>
                    <p>Detailed assistance with comprehensive solutions within hours</p>
                    <div className="support-response-time">
                      <i className="fas fa-clock"></i>
                      <span>Response in 2-4 hrs</span>
                    </div>
                  </div>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="card-content">
                    <h4>Phone Support</h4>
                    <p>Direct line to our specialists for immediate assistance</p>
                    <div className="support-phone">
                      <i className="fas fa-phone"></i>
                      <span>+1 (800) 123-4567</span>
                    </div>
                  </div>
                </div>

                <div className="support-card-modern">
                  <div className="card-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div className="card-content">
                    <h4>Priority Service</h4>
                    <p>VIP support with dedicated account managers for premium clients</p>
                    <div className="support-badge-vip">
                      <i className="fas fa-crown"></i>
                      <span>Premium</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Stats */}
              <div className="mt-4 support-stats">
                <div className="stat-item">
                  <h3 className="stat-number">98%</h3>
                  <p className="stat-label">Customer Satisfaction</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">&lt;2min</h3>
                  <p className="stat-label">Avg Response Time</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">24/7</h3>
                  <p className="stat-label">Always Available</p>
                </div>
              </div>
            </div>

            {/* Right Side - Image with Floating Elements */}
            <div className="col-lg-6">
              <div className="support-image-wrapper">
                <div className="image-decoration"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800" 
                  alt="Customer Support Representative" 
                  className="support-image"
                />                
              </div>
            </div>
          </div>

          {/* Support CTA */}
          <div className="mt-5 row">
            <div className="text-center col-lg-12">
              <div className="support-cta">
                <h3>Need Help Right Now?</h3>
                <p>Our support team is standing by to assist you</p>
                <div className="cta-buttons">
                  <Link to="/contact-us" className="btn-hero-primary">
                    <i className="fas fa-comments"></i> Start Live Chat
                  </Link>
                  <a href="tel:+18001234567" className="btn-hero-secondary">
                    <i className="fas fa-phone-alt"></i> Call Us Now
                  </a>
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