// FILE: src/pages/services/FiveG.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const FiveG = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: '5G Transformation' }];

  return (
    <div className="service-page">
      <PageTitle title="5G Transformation Services" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>5G Transformation</h2>
              <p>Embrace the future with 5G technology solutions.</p>
              
              <h3 className="mt-4">Our 5G Services:</h3>
              <ul>
                <li>5G network planning and design</li>
                <li>5G implementation and deployment</li>
                <li>IoT integration with 5G</li>
                <li>Edge computing solutions</li>
                <li>5G security and optimization</li>
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

export default FiveG;