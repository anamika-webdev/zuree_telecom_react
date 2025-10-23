import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1>Connect Device to Enable Digital</h1>
                <p>Comprehensive infrastructure analysis and communications solutions</p>
                <Link to="/contact-us" className="btn btn-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-video">
                <div className="play-button">
                  <i className="fa fa-play"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h2>About Us</h2>
              <p>
                Zuree Telecom was founded in 2014 by experienced telecom professionals. 
                We specialize in providing comprehensive infrastructure analysis and 
                communications solutions tailored to your needs.
              </p>
              <Link to="/about-us" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Units Section */}
      <section className="business-units-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2 className="section-title">Business Units</h2>
            </div>
          </div>

          <div className="row">
            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-cube"></i>
                </div>
                <h3>Blockchain</h3>
                <Link to="/services/blockchain">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-bar-chart"></i>
                </div>
                <h3>BI & Analytics</h3>
                <Link to="/services/bi-analytics">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-building"></i>
                </div>
                <h3>VR & AR Solutions</h3>
                <Link to="/services/vr-ar-solutions">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-mobile"></i>
                </div>
                <h3>Application Development</h3>
                <Link to="/services/android-application">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h3>Digital Services</h3>
                <Link to="/services/digital-marketing">read more →</Link>
              </div>
            </div>

            <div className="mb-4 col-lg-4 col-md-6">
              <div className="business-unit-card">
                <div className="icon">
                  <i className="fa fa-users"></i>
                </div>
                <h3>IT Consulting</h3>
                <Link to="/services/staff-augmentation">read more →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="openings-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/images/team-working.jpg" alt="Team" className="rounded img-fluid" />
            </div>
            <div className="col-lg-6">
              <h2>Zuree Telecom Current Openings</h2>
              <div className="job-list">
                <div className="job-item">
                  <span>AJAX, Telecom (01-JUN2025)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>Integration and Test Engineer (w/ KPI)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>ICT or Low Volt Stack Developer</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>RF Construction BPR</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
                <div className="job-item">
                  <span>Telecom Recruiter - USA, Mexico (remote based)</span>
                  <i className="fa fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Innovate Section */}
      <section className="innovate-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12">
              <h2>Create, Innovate and Produce</h2>
              <p className="lead">
                Zuree works with global Tier 1, 2 OEMs, System Integrators, Telcos across the globe 
                in business units and helps them create innovative products with excellence.
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
                <div className="mb-4 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-comments fa-3x"></i>
                    <h4>Live Chat</h4>
                  </div>
                </div>
                <div className="mb-4 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-phone fa-3x"></i>
                    <h4>Phone Calls</h4>
                  </div>
                </div>
                <div className="mb-4 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-ticket fa-3x"></i>
                    <h4>Tickets Support</h4>
                  </div>
                </div>
                <div className="mb-4 col-md-6">
                  <div className="support-card">
                    <i className="fa fa-envelope fa-3x"></i>
                    <h4>Mail Support</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/images/support-team.jpg" alt="Support" className="rounded img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="text-center col-lg-8">
              <h2>Great projects start with a great name.</h2>
              <form className="mt-4 newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                  />
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;