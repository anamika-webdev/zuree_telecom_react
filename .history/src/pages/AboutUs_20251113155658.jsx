// src/pages/AboutUs.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import TeamMembersSection from '../components/TeamMembersSection';
import '../assets/css/about.css';

const AboutUs = () => {
  const breadcrumbs = [{ label: 'About Us' }];

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page-clean">
      <PageTitle title="About Us" breadcrumbItems={breadcrumbs} />

      {/* Introduction Section */}
      <section className="about-intro-section">
        <div className="container">
          <div className="row">
            <div className="mx-auto text-center col-lg-8 reveal-on-scroll">
              <span className="section-badge">Since 2014</span>
              <h2 className="section-heading">Welcome to Zuree Telecom</h2>
              <p className="intro-text">
                Founded in 2014 by experienced telecom professionals, Zuree Telecom has been at the 
                forefront of digital transformation. We specialize in providing comprehensive 
                infrastructure analysis and communications solutions tailored to meet the unique needs 
                of our clients.
              </p>
              <p className="intro-subtext">
                Established as a dependable partner for leading service providers in the USA, 
                we continue to expand across fast-growing markets in Asia, delivering innovative 
                solutions that drive business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 reveal-on-scroll">
              <div className="content-block">
                <div className="icon-wrapper vision-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h3 className="content-title">Our Vision</h3>
                <p className="content-text">
                  To be the leading provider of innovative technology solutions that empower 
                  businesses to thrive in the digital age, setting industry standards for 
                  excellence and innovation while maintaining unwavering commitment to quality 
                  and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="col-lg-6 reveal-on-scroll">
              <div className="content-block">
                <div className="icon-wrapper mission-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="content-title">Our Mission</h3>
                <p className="content-text">
                  To deliver exceptional technology solutions that drive business growth and 
                  digital transformation, while maintaining the highest standards of quality, 
                  reliability, and customer satisfaction. We partner with our clients to 
                  achieve shared success and sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="row">
            <div className="mx-auto text-center col-lg-8 reveal-on-scroll">
              <h2 className="section-heading">Our Core Values</h2>
              <p className="section-description">
                The principles that guide everything we do
              </p>
            </div>
          </div>

          <div className="mt-5 row">
            <div className="mb-4 col-lg-3 col-md-6 reveal-on-scroll">
              <div className="value-item">
                <div className="value-number">01</div>
                <h4 className="value-title">Innovation</h4>
                <p className="value-description">
                  Constantly pushing boundaries to deliver cutting-edge solutions.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-3 col-md-6 reveal-on-scroll">
              <div className="value-item">
                <div className="value-number">02</div>
                <h4 className="value-title">Excellence</h4>
                <p className="value-description">
                  Committed to the highest quality in everything we do.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-3 col-md-6 reveal-on-scroll">
              <div className="value-item">
                <div className="value-number">03</div>
                <h4 className="value-title">Integrity</h4>
                <p className="value-description">
                  Building trust through transparency and ethical practices.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-3 col-md-6 reveal-on-scroll">
              <div className="value-item">
                <div className="value-number">04</div>
                <h4 className="value-title">Collaboration</h4>
                <p className="value-description">
                  Working together as partners to achieve shared success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="global-presence-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 reveal-on-scroll">
              <h2 className="section-heading">Our Global Footprint</h2>
              <p className="section-text">
                Operating across multiple continents, we deliver world-class telecom solutions 
                to clients worldwide. Our strategic presence allows us to understand local markets 
                while maintaining global standards of excellence.
              </p>
              
              <div className="locations-list">
                <div className="location-item">
                  <div className="location-marker">📍</div>
                  <div className="location-info">
                    <h5>United States</h5>
                    <p>Headquarters & Major Operations</p>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-marker">📍</div>
                  <div className="location-info">
                    <h5>Philippines</h5>
                    <p>Regional Hub - Southeast Asia</p>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-marker">📍</div>
                  <div className="location-info">
                    <h5>Indonesia</h5>
                    <p>Expanding Market Presence</p>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-marker">📍</div>
                  <div className="location-info">
                    <h5>Vietnam</h5>
                    <p>Growing Operations Center</p>
                  </div>
                </div>

                <div className="location-item">
                  <div className="location-marker">📍</div>
                  <div className="location-info">
                    <h5>India</h5>
                    <p>Technology & Support Hub</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 reveal-on-scroll">
              <div className="global-stats">
                <div className="stat-item">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Projects Delivered</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">10+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">200+</div>
                  <div className="stat-label">Satisfied Clients</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="container">
          <div className="row">
            <div className="mx-auto text-center col-lg-8 reveal-on-scroll">
              <h2 className="section-heading">What We Do</h2>
              <p className="section-description">
                Comprehensive solutions for modern businesses
              </p>
            </div>
          </div>

          <div className="mt-5 row">
            <div className="mb-4 col-lg-6 reveal-on-scroll">
              <div className="service-block">
                <h4 className="service-title">Infrastructure Solutions</h4>
                <p className="service-text">
                  Advanced network infrastructure analysis and optimization services that ensure 
                  your business operations run smoothly and efficiently.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-6 reveal-on-scroll">
              <div className="service-block">
                <h4 className="service-title">Digital Transformation</h4>
                <p className="service-text">
                  End-to-end digital transformation services that help businesses modernize 
                  their operations and stay competitive in the digital age.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-6 reveal-on-scroll">
              <div className="service-block">
                <h4 className="service-title">Communications Technology</h4>
                <p className="service-text">
                  Cutting-edge communication solutions that connect your teams, partners, 
                  and customers seamlessly across the globe.
                </p>
              </div>
            </div>

            <div className="mb-4 col-lg-6 reveal-on-scroll">
              <div className="service-block">
                <h4 className="service-title">Enterprise Solutions</h4>
                <p className="service-text">
                  Tailored enterprise solutions designed to meet the unique challenges and 
                  requirements of your business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       <TeamMembersSection />
      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="row">
            <div className="mx-auto text-center col-lg-8 reveal-on-scroll">
              <h2 className="cta-heading">Let's Work Together</h2>
              <p className="cta-text">
                Ready to take your business to the next level? Get in touch with our team 
                to discuss how we can help you achieve your goals.
              </p>
              <div className="cta-buttons">
                <Link to="/contact-us" className="btn btn-primary">
                  Contact Us
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;