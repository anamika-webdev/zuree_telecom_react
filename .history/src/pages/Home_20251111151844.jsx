// UPDATED CODE FOR: src/pages/Home.jsx
// This fix removes the carousel from all Bootstrap containers,
// allowing it to be full-screen width, just like the hero section.

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
      {/* Hero Section (Content Only) */}
      <section className="hero-section-modern">
        {/* Decorative Blobs */}
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Centered Content */}
            <div className="text-center col-lg-8">
              <div className="hero-content-left">
                <h1>Empowering Digital Transformation</h1>
                <p>Transform your business with innovative digital solutions and cutting-edge technology. We help organizations navigate their digital journey with confidence.</p>
                <Link to="/contact-us" className="btn btn-hero-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
        FIX: VIDEO CAROUSEL SECTION (NOW FULL-WIDTH)
        Notice there is no <div className="container"> here.
        The wrapper is directly inside the <section> block.
        ==================================================================
      */}
      <section className="hero-carousel-section section-padding-top">
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
      </section>


      {/* Services Section - Now comes after hero and carousel */}
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

      
{/* Compact 24/7 Support Section - Single Screen */}
      <section className="support-section-modern section-padding-compact">
        <div className="container">
          {/* Compact Section Header */}
          <div className="mb-4 row">
            <div className="mx-auto text-center col-lg-10">
              <span className="mb-2 section-badge">24/7 SUPPORT</span>
              <h2 className="mb-3 support-title-compact">
                We're Here <span className="highlight-text">24/7</span> for You
              </h2>
              <p className="support-description-compact">
                Our dedicated support team is always ready to assist you with expert guidance and solutions.
              </p>
            </div>
          </div>

          <div className="row align-items-center">
            {/* Left Side - Support Options */}
            <div className="mb-4 col-lg-7 mb-lg-0">
              {/* Decorative Shapes */}
              <div className="support-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>

              <div className="support-cards-grid-compact">
                {/* Live Chat Card */}
                <div className="support-card-compact">
                  <div className="card-icon-compact">
                    <i className="fas fa-comment-dots"></i>
                  </div>
                  <div className="card-content-compact">
                    <h4>Live Chat</h4>
                    <p>Instant responses from our expert team</p>
                    <span className="meta-badge-compact meta-available">
                      <i className="fas fa-circle"></i> Available Now
                    </span>
                  </div>
                </div>

                {/* Email Support Card */}
                <div className="support-card-compact">
                  <div className="card-icon-compact">
                    <i className="fas fa-envelope-open-text"></i>
                  </div>
                  <div className="card-content-compact">
                    <h4>Email Support</h4>
                    <p>Detailed assistance within hours</p>
                    <span className="meta-badge-compact meta-time">
                      <i className="far fa-clock"></i> 2-4 hrs
                    </span>
                  </div>
                </div>

                {/* Phone Support Card */}
                <div className="support-card-compact">
                  <div className="card-icon-compact">
                    <i className="fas fa-phone-volume"></i>
                  </div>
                  <div className="card-content-compact">
                    <h4>Phone Support</h4>
                    <p>Direct line to our specialists</p>
                    <span className="meta-badge-compact meta-phone">
                      <i className="fas fa-phone"></i> +1-800-123-4567
                    </span>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="support-card-compact">
                  <div className="card-icon-compact">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div className="card-content-compact">
                    <h4>Need Help Right Now?</h4>
                    <p>Our team is standing by to assist</p>
                    <Link to="/contact-us" className="meta-link-compact">
                      <i className="fas fa-arrow-right"></i> Get Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Compact Image */}
            <div className="col-lg-5">
              <div className="support-image-compact">
                <div className="image-backdrop-compact"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80" 
                  alt="Customer Support Team" 
                  className="support-img-compact"
                />
                <div className="support-badge-overlay">
                  <div className="badge-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div className="badge-text">
                    <strong>24/7</strong>
                    <span>Always Available</span>
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