// FILE: src/pages/services/SocialMediaMarketing.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const SocialMediaMarketing = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Social Media Marketing' }];

  return (
    <div className="service-page">
      <PageTitle title="Social Media Marketing" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Social Media Marketing Services</h2>
              <p>Build and engage your audience across social media platforms.</p>
              
              <h3 className="mt-4">Platforms We Cover:</h3>
              <ul>
                <li>Facebook Marketing</li>
                <li>Instagram Marketing</li>
                <li>LinkedIn Marketing</li>
                <li>Twitter/X Marketing</li>
                <li>Social media strategy and management</li>
              </ul>

              <div className="mt-5">
                <Link to="/contact-us" className="btn btn-primary">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaMarketing;