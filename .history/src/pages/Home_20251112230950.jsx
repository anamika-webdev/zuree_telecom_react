// COMPLETE UPDATED Home.jsx
// Features:
// - Hero section with background image
// - Enhanced business model cards with animated icons
// - Modern carousel integration

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
      {/* =================================
        HERO SECTION WITH BACKGROUND IMAGE
      ================================= */}
      <section className="hero-section-modern hero-with-bg">
        {/* Animated Decorative Elements */}
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        {/* Floating Particles */}
        <div className="hero-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
        
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Centered Content */}
            <div className="text-center col-lg-8">
              <div className="hero-content-left">
                <div className="hero-badge">
                  <i className="fas fa-rocket"></i>
                  <span>Innovation First</span>
                </div>
                <h1 className="fade-in-up">Empowering Digital Transformation</h1>
                <p className="fade-in-up-delay-1">
                  Transform your business with innovative digital solutions and cutting-edge technology. 
                  We help organizations navigate their digital journey with confidence and expertise.
                </p>
                <div className="hero-buttons fade-in-up-delay-2">
                  <Link to="/about-us" className="btn-hero-primary">
                    Discover More
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                  <Link to="/contact-us" className="btn-hero-secondary">
                    Get Started
                    <i className="fas fa-paper-plane ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Video Carousel - Positioned Below Hero Content */}
          <div className="mt-5 row justify-content-center">
            <div className="col-lg-10">
              <div className="hero-carousel-wrapper" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="hero-carousel-container">
                  {videos.map((video, index) => (
                    <div 
                      key={video.id} 
                      className={`hero-carousel-image ${index === currentVideoIndex ? 'active' : ''}`}
                      style={{ display: index === currentVideoIndex ? 'block' : 'none' }}
                    >
                      <div className="hero-carousel-badge">
                        <i className="fas fa-play"></i>
                      </div>
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="hero-carousel-img"
                      />
                      <div className="hero-carousel-overlay">
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                      </div>
                    </div>
                  ))}

                  {/* Carousel Indicators (Dots) */}
                  <div className="hero-carousel-indicators">
                    {videos.map((_, index) => (
                      <div 
                        key={index} 
                        className={`carousel-dot ${index === currentVideoIndex ? 'active' : ''}`}
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

      {/* =================================
        BUSINESS MODELS SECTION (SERVICES)
      ================================= */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <div className="section-title-wrapper">
                <span className="section-subtitle">What We Offer</span>
                <h2 className="section-title">Business Models</h2>
                <p className="section-description">
                  Comprehensive solutions to drive your business forward with innovative technology
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Application Development */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-code"></i>
                  </div>
                </div>
                <h3>Application Development</h3>
                <p>Custom mobile and web applications tailored to your business needs with cutting-edge technology and best practices.</p>
                <Link to="/services/android-application" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">01</div>
              </div>
            </div>

            {/* Digital Marketing */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-bullhorn"></i>
                  </div>
                </div>
                <h3>Digital Marketing</h3>
                <p>Comprehensive digital marketing strategies to grow your business and reach your target audience effectively.</p>
                <Link to="/services/digital-marketing" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">02</div>
              </div>
            </div>

            {/* IOT Solution */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-broadcast-tower"></i>
                  </div>
                </div>
                <h3>IOT Solution</h3>
                <p>Advanced networking and IoT solutions for seamless connectivity and smart automation in your business.</p>
                <Link to="/services/5g" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">03</div>
              </div>
            </div>

            {/* Blockchain */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-link"></i>
                  </div>
                </div>
                <h3>Blockchain</h3>
                <p>Secure and transparent blockchain solutions for decentralized applications and smart contracts.</p>
                <Link to="/services/blockchain" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">04</div>
              </div>
            </div>

            {/* Cloud Services */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                </div>
                <h3>Cloud Services</h3>
                <p>Scalable cloud infrastructure and services to power your digital transformation journey.</p>
                <Link to="/services/cloud" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">05</div>
              </div>
            </div>

            {/* AI & ML */}
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-card-icon-wrapper">
                  <div className="icon-bg-circle circle-1"></div>
                  <div className="icon-bg-circle circle-2"></div>
                  <div className="icon">
                    <i className="fas fa-brain"></i>
                  </div>
                </div>
                <h3>AI & Machine Learning</h3>
                <p>Intelligent solutions powered by artificial intelligence and machine learning algorithms.</p>
                <Link to="/services/ai-ml" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
                <div className="service-card-number">06</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================
        24/7 SUPPORT SECTION
      ================================= */}
      <section className="support-section-modern">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="support-image-compact">
                <img 
                  src="../../images/customer2.jpg" 
                  alt="24/7 Support" 
                  className="support-img-compact"
                />
                <div className="support-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="support-content-compact">
                <h2 className="support-title-compact">24/7 Support Available</h2>
                <p className="support-description-compact">
                  Our dedicated team is always ready to assist you with any technical issues or questions you may have.
                </p>
                
                <div className="support-cards-grid-compact">
                  <div className="support-card-compact">
                    <div className="card-icon-compact">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h4>Live Chat</h4>
                    <p>Instant support through live chat</p>
                  </div>
                  
                  <div className="support-card-compact">
                    <div className="card-icon-compact">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <h4>Phone Support</h4>
                    <p>Call us anytime for assistance</p>
                  </div>
                  
                  <div className="support-card-compact">
                    <div className="card-icon-compact">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h4>Email Support</h4>
                    <p>Get responses within 2 hours</p>
                  </div>
                  
                  <div className="support-card-compact">
                    <div className="card-icon-compact">
                      <i className="fas fa-comments"></i>
                    </div>
                    <h4>Community Forum</h4>
                    <p>Connect with other users</p>
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