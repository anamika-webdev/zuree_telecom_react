// =====================================================
// HOME PAGE WITH VIDEO CAROUSEL HERO SECTION
// File: src/pages/Home.jsx
// =====================================================

import React from 'react';
import VideoCarousel from '../components/VideoCarousel';
import '../styles/Home.css';

const Home = () => {
  // Video configuration for the carousel
  const heroVideos = [
    {
      src: '/videos/about_us_home_page.mp4',
      title: 'Welcome to Zuree Telecom',
      subtitle: 'Leading the Future of Telecommunications',
      cta: 'Explore Our Services'
    }
    // You can add more videos here:
    // {
    //   src: '/videos/another_video.mp4',
    //   title: 'Innovation & Excellence',
    //   subtitle: 'Connecting You to Tomorrow',
    //   cta: 'Learn More'
    // }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Video Carousel */}
      <section className="hero-section">
        <VideoCarousel 
          videos={heroVideos}
          autoplay={true}
          interval={10000} // 10 seconds per video
        />
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <h2>About Zuree Telecom</h2>
                <p>Your Trusted Telecommunications Partner</p>
              </div>
              <p className="about-text">
                At Zuree Telecom, we're dedicated to providing cutting-edge 
                telecommunications solutions that connect people and businesses 
                worldwide. With years of experience and a commitment to innovation, 
                we deliver services that exceed expectations.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>24/7 Customer Support</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Cutting-Edge Technology</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Reliable Network Infrastructure</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-image">
                <img 
                  src="/images/about-zuree.jpg" 
                  alt="About Zuree Telecom"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-padding section-bg-light">
        <div className="container">
          <div className="text-center section-title">
            <h2>Our Services</h2>
            <p>Comprehensive Telecommunications Solutions</p>
          </div>
          
          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Solutions</h3>
                <p>
                  Advanced mobile app development for iOS and Android platforms 
                  with seamless user experiences.
                </p>
                <a href="/services" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3>Web Development</h3>
                <p>
                  Custom web applications built with modern technologies to 
                  drive your business forward.
                </p>
                <a href="/services" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-network-wired"></i>
                </div>
                <h3>5G Solutions</h3>
                <p>
                  Next-generation 5G technology solutions for faster, more 
                  reliable connectivity.
                </p>
                <a href="/services" className="service-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="/services" className="btn btn-primary btn-lg">
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-padding">
        <div className="container">
          <div className="text-center row">
            <div className="mb-4 col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
            <div className="mb-4 col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
            </div>
            <div className="mb-4 col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Team Members</div>
              </div>
            </div>
            <div className="mb-4 col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="text-center cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how we can help you achieve your goals</p>
            <div className="cta-buttons">
              <a href="/contact-us" className="btn btn-light btn-lg">
                Get in Touch
              </a>
              <a href="/services" className="btn btn-outline-light btn-lg">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="blog-section section-padding section-bg-light">
        <div className="container">
          <div className="text-center section-title">
            <h2>Latest from Our Blog</h2>
            <p>Stay updated with our latest insights and news</p>
          </div>
          
          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="blog-card">
                <div className="blog-image">
                  <img src="/images/blog1.jpg" alt="Blog Post" />
                </div>
                <div className="blog-content">
                  <span className="blog-category">Technology</span>
                  <h3>The Future of 5G Technology</h3>
                  <p>
                    Exploring how 5G will revolutionize telecommunications 
                    and connectivity worldwide...
                  </p>
                  <a href="/blogs" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="blog-card">
                <div className="blog-image">
                  <img src="/images/blog2.jpg" alt="Blog Post" />
                </div>
                <div className="blog-content">
                  <span className="blog-category">Business</span>
                  <h3>Digital Transformation Strategies</h3>
                  <p>
                    Key strategies for successful digital transformation in 
                    today's competitive landscape...
                  </p>
                  <a href="/blogs" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="blog-card">
                <div className="blog-image">
                  <img src="/images/blog3.jpg" alt="Blog Post" />
                </div>
                <div className="blog-content">
                  <span className="blog-category">Innovation</span>
                  <h3>AI in Telecommunications</h3>
                  <p>
                    How artificial intelligence is reshaping the telecom 
                    industry and customer experiences...
                  </p>
                  <a href="/blogs" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="/blogs" className="btn btn-primary btn-lg">
              View All Posts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;