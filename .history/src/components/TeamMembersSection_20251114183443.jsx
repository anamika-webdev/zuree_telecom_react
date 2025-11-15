// ============================================
// TEAM CAROUSEL with Text Overlay
// Modern carousel design with text on images
// File: src/components/TeamMembersSection.jsx
// ============================================

import { useState, useEffect, useRef } from 'react';
import '../assets/css/team-section.css';

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Number of cards to show at once (responsive)
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    fetchTeamMembers();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && teamMembers.length > 0) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, teamMembers.length, cardsToShow]);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 576) {
      setCardsToShow(1);
    } else if (width < 768) {
      setCardsToShow(2);
    } else if (width < 992) {
      setCardsToShow(3);
    } else {
      setCardsToShow(4);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team');
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }

      const data = await response.json();
      const activeMembers = data.filter(member => member.status === 'active');
      
      setTeamMembers(activeMembers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? Math.max(0, teamMembers.length - cardsToShow) : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, teamMembers.length - cardsToShow);
      const newIndex = prevIndex + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  if (loading) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="loading-wrapper">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading our amazing team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-section">
        <div className="container">
          <div className="error-wrapper">
            <i className="fas fa-exclamation-circle error-icon"></i>
            <p className="error-text">Unable to load team members.</p>
            <button onClick={fetchTeamMembers} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, teamMembers.length - cardsToShow);
  const showNavigation = teamMembers.length > cardsToShow;

  return (
    <section className="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Our Team</span>
          <h2 className="section-title">Meet Our Leadership</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to driving innovation and excellence in everything we do.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="team-carousel-container"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Previous Button */}
          {showNavigation && (
            <button 
              className="carousel-nav prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous team members"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {/* Carousel Track */}
          <div className="team-carousel" ref={carouselRef}>
            <div 
              className="team-carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="team-carousel-card"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div className="team-card-overlay">
                    {/* Background Image */}
                    <div className="team-card-background">
                      <img 
                        src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=600&background=2d1b4e&color=fff&bold=true`}
                        alt={member.name}
                        className="team-card-image"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=600&background=2d1b4e&color=fff&bold=true`;
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div className="team-card-gradient"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="team-card-content">
                      <div className="team-card-info">
                        <h3 className="team-card-name">{member.name}</h3>
                        <p className="team-card-position">{member.position}</p>
                        {member.department && (
                          <span className="team-card-department">
                            {member.department}
                          </span>
                        )}
                      </div>

                      {/* Social Links */}
                      <div className="team-card-social">
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="team-social-link"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                        {member.twitter && (
                          <a 
                            href={member.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="team-social-link"
                            aria-label={`${member.name}'s Twitter`}
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="team-social-link"
                            aria-label={`Email ${member.name}`}
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {showNavigation && (
            <button 
              className="carousel-nav next"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next team members"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>

        {/* Carousel Dots */}
        {showNavigation && (
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembersSection;