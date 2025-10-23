// FILE: src/pages/services/SEO.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const SEO = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'SEO' }];

  return (
    <div className="service-page">
      <PageTitle title="Search Engine Optimization (SEO)" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>SEO Services</h2>
              <p>Improve your search engine rankings and drive organic traffic.</p>
              
              <h3 className="mt-4">What We Do:</h3>
              <ul>
                <li>On-page SEO optimization</li>
                <li>Off-page SEO strategies</li>
                <li>Keyword research and analysis</li>
                <li>Technical SEO audits</li>
                <li>Local SEO</li>
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

export default SEO;