// FILE: src/pages/services/DigitalMarketing.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const DigitalMarketing = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Digital Marketing' }];

  return (
    <div className="service-page">
      <PageTitle title="Digital Marketing Services" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Digital Marketing Services</h2>
              <p>Grow your online presence with our comprehensive digital marketing solutions.</p>
              
              <h3 className="mt-4">Our Services:</h3>
              <ul>
                <li>Search Engine Optimization (SEO)</li>
                <li>Social Media Marketing</li>
                <li>Content Marketing</li>
                <li>Email Marketing</li>
                <li>PPC Advertising</li>
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

export default DigitalMarketing;