{/* MODERN HERO SECTION - OPTION 1: Split Screen with Animated Particles */}
      <section className="hero-modern">
        <div className="hero-particles"></div>
        
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="hero-content-modern">
                <div className="hero-badge" data-aos="fade-down">
                  <span className="badge-dot"></span>
                  Leading Innovation Since 2014
                </div>
                
                <h1 className="hero-title-modern" data-aos="fade-up" data-aos-delay="100">
                  Empowering
                  <span className="gradient-text"> Digital</span>
                  <br />
                  Transformation
                </h1>
                
                <p className="hero-description-modern" data-aos="fade-up" data-aos-delay="200">
                  Leading provider of innovative telecom infrastructure solutions 
                  and digital services for businesses worldwide
                </p>
                
                <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
                  <Link to="/contact-us" className="btn-modern btn-primary-modern">
                    Get Started
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                  <Link to="/services" className="btn-modern btn-secondary-modern">
                    <i className="fas fa-play-circle"></i>
                    Our Services
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
                  <div className="stat-item-hero">
                    <div className="stat-number-hero">500+</div>
                    <div className="stat-label-hero">Projects</div>
                  </div>
                  <div className="stat-divider-hero"></div>
                  <div className="stat-item-hero">
                    <div className="stat-number-hero">15+</div>
                    <div className="stat-label-hero">Countries</div>
                  </div>
                  <div className="stat-divider-hero"></div>
                  <div className="stat-item-hero">
                    <div className="stat-number-hero">98%</div>
                    <div className="stat-label-hero">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="col-lg-6">
              <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
                {/* 3D Cards Stack */}
                <div className="cards-3d-stack">
                  <div className="card-3d card-3d-1">
                    <div className="card-icon">
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <div className="card-title">Infrastructure</div>
                  </div>
                  <div className="card-3d card-3d-2">
                    <div className="card-icon">
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="card-title">Digital Services</div>
                  </div>
                  <div className="card-3d card-3d-3">
                    <div className="card-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="card-title">Analytics</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="floating-element element-1">
                  <i className="fas fa-cloud"></i>
                </div>
                <div className="floating-element element-2">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="floating-element element-3">
                  <i className="fas fa-bolt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </section>