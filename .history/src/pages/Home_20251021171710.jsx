// FILE: src/pages/Home.jsx
// ============================================
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="page-slider home-slider">
        <div className="slider-container">
          <div className="slide-item">
            <img 
              src="/images/slide01.jpg" 
              alt="Zuree Telecom" 
              className="slide-image"
            />
            <div className="slide-overlay">
              <div className="container">
                <div className="slide-content">
                  <h1>Connect Device to Enable Digital</h1>
                  <p>Comprehensive infrastructure analysis and communications solutions</p>
                  <Link to="/contact-us" className="btn btn-primary">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="about-content">
                <h2 className="section-title">
                  <span>About Us</span>
                </h2>
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
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Our Services</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="service-card">
                <h3>Mobile Development</h3>
                <p>Android, iOS, and Hybrid applications</p>
                <Link to="/services/android-application">Learn More →</Link>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="service-card">
                <h3>Web Development</h3>
                <p>Custom web applications</p>
                <Link to="/services/web-application">Learn More →</Link>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="service-card">
                <h3>Digital Marketing</h3>
                <p>SEO, Social Media, Content Marketing</p>
                <Link to="/services/digital-marketing">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;