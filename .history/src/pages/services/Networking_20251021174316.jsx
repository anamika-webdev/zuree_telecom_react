// FILE: src/pages/services/Networking.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const Networking = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Networking' }];

  return (
    <div className="service-page">
      <PageTitle title="Networking & Wi-Fi Solutions" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Networking & Wi-Fi Services</h2>
              <p>Build robust and secure network infrastructure for your business.</p>
              
              <h3 className="mt-4">Solutions We Provide:</h3>
              <ul>
                <li>Network design and implementation</li>
                <li>Wi-Fi solutions</li>
                <li>Network security</li>
                <li>Network monitoring and management</li>
                <li>Cloud networking</li>
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

export default Networking;