// src/pages/AboutUs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import '../assets/css/about.css';

const AboutUs = () => {
  const breadcrumbs = [{ label: 'About Us' }];
  const [activeTab, setActiveTab] = useState('company');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '🚀' },
    { number: '10+', label: 'Years Experience', icon: '⭐' },
    { number: '200+', label: 'Happy Clients', icon: '😊' },
    { number: '50+', label: 'Team Members', icon: '👥' }
  ];

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions that drive digital transformation.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in everything we do, exceeding expectations.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Collaboration',
      description: 'Working together with our clients as partners to achieve shared success and growth.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: 'Integrity',
      description: 'Building trust through transparency, honesty, and ethical business practices.'
    }
  ];

  const milestones = [
    { year: '2014', title: 'Company Founded', description: 'Zuree Telecom established by telecom professionals' },
    { year: '2016', title: 'Global Expansion', description: 'Extended services across Asia markets' },
    { year: '2018', title: 'Innovation Hub', description: 'Launched R&D center for next-gen solutions' },
    { year: '2020', title: '500+ Projects', description: 'Reached milestone of successful deliveries' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as top telecom solution provider' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <div className="tab-content-wrapper fade-in">
            <h3 className="content-title">Our Company</h3>
            <p className="lead-text">
              Zuree Telecom was founded in 2014 by experienced telecom professionals. 
              Established as a dependable partner for leading service providers in the USA 
              and expanding across fast-growing markets in Asia.
            </p>
            <p className="content-description">
              We specialize in providing comprehensive infrastructure analysis and 
              communications solutions tailored to meet the unique needs of our clients. 
              Our expertise spans across multiple domains including network optimization, 
              digital transformation, and enterprise solutions.
            </p>
            
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📡</div>
                <h4>Network Solutions</h4>
                <p>Advanced infrastructure and connectivity solutions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💡</div>
                <h4>Digital Innovation</h4>
                <p>Cutting-edge technology implementations</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h4>Security First</h4>
                <p>Enterprise-grade security solutions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌐</div>
                <h4>Global Reach</h4>
                <p>Serving clients across multiple continents</p>
              </div>
            </div>
          </div>
        );

      case 'footprint':
        return (
          <div className="tab-content-wrapper fade-in">
            <h3 className="content-title">Our Global Footprint</h3>
            <p className="lead-text">
              Operating across multiple continents, we deliver world-class telecom solutions 
              to clients worldwide.
            </p>
            
            <div className="countries-grid">
              <div className="country-card">
                <div className="country-flag">🇺🇸</div>
                <h4>United States</h4>
                <p>Headquarters & Major Operations</p>
              </div>
              <div className="country-card">
                <div className="country-flag">🇵🇭</div>
                <h4>Philippines</h4>
                <p>Regional Hub - Southeast Asia</p>
              </div>
              <div className="country-card">
                <div className="country-flag">🇮🇩</div>
                <h4>Indonesia</h4>
                <p>Expanding Market Presence</p>
              </div>
              <div className="country-card">
                <div className="country-flag">🇻🇳</div>
                <h4>Vietnam</h4>
                <p>Growing Operations Center</p>
              </div>
              <div className="country-card">
                <div className="country-flag">🇮🇳</div>
                <h4>India</h4>
                <p>Technology & Support Hub</p>
              </div>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="tab-content-wrapper fade-in">
            <h3 className="content-title">Vision & Mission</h3>
            
            <div className="vision-mission-grid">
              <div className="vm-card vision-card">
                <div className="vm-icon">🎯</div>
                <h4>Our Vision</h4>
                <p>
                  To be the leading provider of innovative technology solutions that 
                  empower businesses to thrive in the digital age, setting industry 
                  standards for excellence and innovation.
                </p>
              </div>
              
              <div className="vm-card mission-card">
                <div className="vm-icon">🚀</div>
                <h4>Our Mission</h4>
                <p>
                  To deliver exceptional technology solutions that drive business growth 
                  and digital transformation, while maintaining the highest standards of 
                  quality, reliability, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="core-values-section">
              <h4 className="section-subtitle">Our Core Values</h4>
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="value-icon">{value.icon}</div>
                    <h5>{value.title}</h5>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="tab-content-wrapper fade-in">
            <h3 className="content-title">Our Journey</h3>
            <p className="lead-text">
              A decade of innovation, growth, and excellence in the telecom industry.
            </p>
            
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className={`timeline-item fade-in-up ${index % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="timeline-content">
                    <div className="timeline-year">{milestone.year}</div>
                    <h4>{milestone.title}</h4>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="about-page">
      <PageTitle title="About Us" breadcrumbItems={breadcrumbs} />
      
      {/* Hero Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`stat-card ${isVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="section-padding about-content-section">
        <div className="container">
          <div className="about-tabs-container">
            {/* Tab Navigation */}
            <div className="tabs-nav">
              <button 
                className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
                onClick={() => setActiveTab('company')}
              >
                <span className="tab-icon">🏢</span>
                <span className="tab-text">Our Company</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'footprint' ? 'active' : ''}`}
                onClick={() => setActiveTab('footprint')}
              >
                <span className="tab-icon">🌍</span>
                <span className="tab-text">Global Footprint</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                <span className="tab-icon">🎯</span>
                <span className="tab-text">Vision & Mission</span>
              </button>
              <button 
                className={`tab-button ${activeTab === 'journey' ? 'active' : ''}`}
                onClick={() => setActiveTab('journey')}
              >
                <span className="tab-icon">📈</span>
                <span className="tab-text">Our Journey</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-description">
              Let's discuss how we can help you achieve your goals with our innovative solutions.
            </p>
            <div className="cta-buttons">
              <Link to="/contact-us" className="btn btn-primary btn-lg">
                Get in Touch
                <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link to="/services" className="btn btn-outline-primary btn-lg">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;