import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Video carousel data
  const videos = [
    {
      id: 1,
      title: 'Company Overview',
      description: 'Discover our journey and commitment to excellence',
      videoUrl: '/videos/about_us_home_page.mp4',
      thumbnail: '/images/video-thumb-1.jpg'
    },
    {
      id: 2,
      title: 'Our Services',
      description: 'Innovative solutions for digital transformation',
      videoUrl: '/videos/services_showcase.mp4',
      thumbnail: '/images/video-thumb-2.jpg'
    },
    {
      id: 3,
      title: 'Client Success Stories',
      description: 'Real results from real partnerships',
      videoUrl: '/videos/client_testimonials.mp4',
      thumbnail: '/images/video-thumb-3.jpg'
    },
    {
      id: 4,
      title: 'Technology & Innovation',
      description: 'Leading the future with cutting-edge solutions',
      videoUrl: '/videos/technology_showcase.mp4',
      thumbnail: '/images/video-thumb-4.jpg'
    }
  ];

  useEffect(() => {
    const video = document.getElementById('carouselVideo');
    const playButton = document.getElementById('carouselPlayButton');

    if (playButton && video) {
      const handlePlayClick = () => {
        video.play();
        video.setAttribute('controls', 'controls');
        setIsPlaying(true);
      };

      const handlePause = () => {
        if (video.currentTime === 0 || video.paused) {
          setIsPlaying(false);
          video.removeAttribute('controls');
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        video.removeAttribute('controls');
        // Auto-advance to next video
        nextVideo();
      };

      playButton.addEventListener('click', handlePlayClick);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);

      return () => {
        playButton.removeEventListener('click', handlePlayClick);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentVideoIndex]);

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const goToVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

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

      {/* Video Carousel Section - Replaces About Us */}
      <section className="video-carousel-section section-padding">
        <div className="container">
          <div className="mb-5 row">
            <div className="text-center col-12">
              <h2 className="section-title">Explore Our Story</h2>
              <p className="section-subtitle">Watch our journey through innovation and excellence</p>
            </div>
          </div>

          <div className="row">
            <div className="mx-auto col-lg-8">
              {/* Main Video Display */}
              <div className="video-carousel-main">
                <div className="video-wrapper">
                  <video 
                    id="carouselVideo"
                    className="carousel-video-player" 
                    preload="metadata"
                    playsInline
                    key={currentVideoIndex}
                  >
                    <source src={videos[currentVideoIndex].videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {!isPlaying && (
                    <div className="video-overlay" id="carouselPlayButton">
                      <div className="play-button-wrapper">
                        <div className="play-button">
                          <i className="fas fa-play"></i>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3>{videos[currentVideoIndex].title}</h3>
                        <p>{videos[currentVideoIndex].description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Carousel Controls */}
                <div className="carousel-controls">
                  <button 
                    className="carousel-btn prev-btn" 
                    onClick={prevVideo}
                    aria-label="Previous video"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  <div className="carousel-indicators">
                    {videos.map((video, index) => (
                      <button
                        key={video.id}
                        className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => goToVideo(index)}
                        aria-label={`Go to video ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="carousel-btn next-btn" 
                    onClick={nextVideo}
                    aria-label="Next video"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Video Thumbnails Navigation */}
              <div className="video-thumbnails">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`thumbnail-item ${index === currentVideoIndex ? 'active' : ''}`}
                    onClick={() => goToVideo(index)}
                  >
                    <div className="thumbnail-content">
                      <div className="thumbnail-icon">
                        <i className="fas fa-play-circle"></i>
                      </div>
                      <div className="thumbnail-text">
                        <h4>{video.title}</h4>
                        <p>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Innovate Section */}
      <section className="innovate-section section-padding bg-light">
        <div className="container">
          <div className="mb-4 row">
            <div className="text-center col-12">
              <h2>How We Innovate</h2>
              <p className="lead">
                Our commitment to excellence drives every aspect of our work
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

      {/* 24/7 Support Section */}
      <section className="support-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>We are ready to help you 24/7</h2>
              <div className="mt-4 row">
                <div className="mb-3 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-phone fa-2x"></i>
                    <h4>Phone Support</h4>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-envelope fa-2x"></i>
                    <h4>Email Support</h4>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-comments fa-2x"></i>
                    <h4>Live Chat</h4>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-ticket fa-2x"></i>
                    <h4>Ticket System</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="support-image">
                <i className="fa fa-headset fa-10x text-primary"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;