// FILE: src/pages/AboutUs.jsx
// ============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const AboutUs = () => {
  const breadcrumbs = [{ label: 'About Us' }];
  const [activeTab, setActiveTab] = useState('company'); // 'company', 'footprint', 'vision'

  /**
   * Renders the content based on the active tab
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <div role="tabpanel" id="company-content">
            <h3>Our Company</h3>
            <p className="lead">
              Zuree Telecom was founded in 2014 by experienced telecom professionals. Established as dependable partner for leading service provider in USA and looks to expand across fast growing markets in Asia.
</p>
            <p>
Can't find what you’re looking for?
            </p>
            <Link to="/contact-us" className="mt-3 btn btn-primary">
              Contact Us
            </Link>
          </div>
        );

      case 'footprint':
        return (
          <div role="tabpanel" id="footprint-content">
            <h3>Our Footprint</h3>
            <p>
            USA
Philippines
Indonesia
Vietnam
India
            </p>
          </div>
        );

      case 'vision':
        return (
          <div role="tabpanel" id="vision-content">
            <h3>Vision & Mission</h3>
            {/* Content pulled from VisionMission.jsx */}
            <div className="p-4 mb-4 rounded bg-light-gray-ui">
              <h4 className="text-primary">Our Vision</h4>
              <p>
                To be the leading provider of innovative technology solutions that
                empower businesses to thrive in the digital age.
              </p>
            </div>
            <div className="p-4 rounded bg-light-gray-ui">
              <h4 className="text-primary">Our Mission</h4>
              <p>
                To deliver exceptional technology solutions that drive business growth
                and digital transformation.
              </p>
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
      
      <section className="section-padding">
        <div className="container">
          {/* --- New Aesthetic Tab Layout --- */}
          <div className="overflow-hidden rounded shadow-lg row about-tabs-container">
            
            {/* --- Sidebar Tab Navigation --- */}
            <div className="p-0 col-lg-3">
              <div 
                className="nav flex-column about-tab-nav" 
                role="tablist" 
                aria-orientation="vertical"
              >
                <button 
                  className={`tab-link ${activeTab === 'company' ? 'active' : ''}`}
                  onClick={() => setActiveTab('company')}
                  type="button"
                  role="tab"
                  aria-controls="company-content"
                  aria-selected={activeTab === 'company'}
                >
                  Our Company
                </button>
                <button 
                  className={`tab-link ${activeTab === 'footprint' ? 'active' : ''}`}
                  onClick={() => setActiveTab('footprint')}
                  type="button"
                  role="tab"
                  aria-controls="footprint-content"
                  aria-selected={activeTab === 'footprint'}
                >
                  Footprint
                </button>
                <button 
                  className={`tab-link ${activeTab === 'vision' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vision')}
                  type="button"
                  role="tab"
                  aria-controls="vision-content"
                  aria-selected={activeTab === 'vision'}
                >
                  Vision & Mission
                </button>
              </div>
            </div>

            {/* --- Tab Content Area --- */}
            <div className="col-lg-9">
              <div className="p-4 about-tab-content p-md-5">
                {renderTabContent()}
              </div>
            </div>

          </div>
          {/* --- End Tab Layout --- */}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;