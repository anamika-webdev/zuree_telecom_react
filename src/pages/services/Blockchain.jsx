// FILE: src/pages/services/Blockchain.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const Blockchain = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Blockchain' }];

  return (
    <div className="service-page">
      <PageTitle title="Blockchain Solutions" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Blockchain Development Services</h2>
              <p>Leverage blockchain technology for secure and transparent solutions.</p>
              
              <h3 className="mt-4">Our Services:</h3>
              <ul>
                <li>Smart contract development</li>
                <li>DApp development</li>
                <li>Blockchain consulting</li>
                <li>Cryptocurrency solutions</li>
                <li>NFT marketplace development</li>
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

export default Blockchain;