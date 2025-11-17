// =====================================================
// VIDEO CAROUSEL COMPONENT FOR HERO SECTION
// File: src/components/VideoCarousel.jsx
// =====================================================

import React, { useState, useEffect, useRef } from 'react';
import '../styles/VideoCarousel.css';

const VideoCarousel = ({ videos, autoplay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoRef = useRef(null);

  // Auto-advance to next video
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, interval]);

  // Play current video when index changes
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    // Auto-advance to next video when current one ends
    handleNext();
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="video-carousel">
      <div className="video-carousel-container">
        {/* Video Player */}
        <div className="video-wrapper">
          <video
            ref={videoRef}
            key={currentVideo.src}
            className="carousel-video"
            autoPlay={autoplay}
            muted
            loop={videos.length === 1}
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src={currentVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="video-overlay">
            <div className="overlay-content">
              {currentVideo.title && (
                <h1 className="video-title">{currentVideo.title}</h1>
              )}
              {currentVideo.subtitle && (
                <p className="video-subtitle">{currentVideo.subtitle}</p>
              )}
              {currentVideo.cta && (
                <button className="video-cta-btn">
                  {currentVideo.cta}
                </button>
              )}
            </div>
          </div>

          {/* Play/Pause Button */}
          <button 
            className="play-pause-btn" 
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
        </div>

        {/* Navigation Arrows (only show if multiple videos) */}
        {videos.length > 1 && (
          <>
            <button 
              className="carousel-btn carousel-btn-prev" 
              onClick={handlePrev}
              aria-label="Previous video"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="carousel-btn carousel-btn-next" 
              onClick={handleNext}
              aria-label="Next video"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Indicator Dots (only show if multiple videos) */}
        {videos.length > 1 && (
          <div className="carousel-indicators">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Video Counter */}
        {videos.length > 1 && (
          <div className="video-counter">
            {currentIndex + 1} / {videos.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCarousel;