// FILE: src/pages/services/VRARSolutions.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const VRARSolutions = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'VR & AR Solutions' }];

  return (
    <div className="service-page">
      <PageTitle title="VR & AR Solutions" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Virtual Reality & Augmented Reality</h2>
              <p>Create immersive experiences with VR and AR technologies.</p>
              
              <h3 className="mt-4">Our Capabilities:</h3>
              <ul>
                <li>VR application development</li>
                <li>AR mobile applications</li>
                <li>Mixed reality solutions</li>
                <li>3D modeling and visualization</li>
                <li>VR/AR training simulations</li>
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

export default VRARSolutions;