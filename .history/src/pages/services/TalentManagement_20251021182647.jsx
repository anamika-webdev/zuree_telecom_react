// FILE: src/pages/services/TalentManagement.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const TalentManagement = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Talent Management' }];

  return (
    <div className="service-page">
      <PageTitle title="Talent Management Solutions" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Talent Management Services</h2>
              <p>Attract, develop, and retain top talent for your organization.</p>
              
              <h3 className="mt-4">Our Solutions:</h3>
              <ul>
                <li>Talent acquisition strategies</li>
                <li>Performance management</li>
                <li>Learning and development</li>
                <li>Succession planning</li>
                <li>Employee engagement programs</li>
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

export default TalentManagement;