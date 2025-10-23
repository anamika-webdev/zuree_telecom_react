// FILE: src/pages/services/BIAnalytics.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const BIAnalytics = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'BI & Analytics' }];

  return (
    <div className="service-page">
      <PageTitle title="Business Intelligence & Analytics" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>BI & Analytics Services</h2>
              <p>Turn data into actionable insights for better business decisions.</p>
              
              <h3 className="mt-4">What We Offer:</h3>
              <ul>
                <li>Data visualization and dashboards</li>
                <li>Business intelligence solutions</li>
                <li>Data warehousing</li>
                <li>Predictive analytics</li>
                <li>Big data analytics</li>
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

export default BIAnalytics;