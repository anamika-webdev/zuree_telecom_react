// FILE: src/pages/services/HybridApplication.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const HybridApplication = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Hybrid Application' }];

  return (
    <div className="service-page">
      <PageTitle title="Hybrid Application Development" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Hybrid Application Development</h2>
              <p>Build once, deploy everywhere with our hybrid app solutions.</p>
              
              <h3 className="mt-4">Technologies:</h3>
              <ul>
                <li>React Native</li>
                <li>Flutter</li>
                <li>Ionic</li>
                <li>Cross-platform development</li>
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

export default HybridApplication;