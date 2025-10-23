// FILE: src/pages/services/EmailMarketing.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const EmailMarketing = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Email Marketing' }];

  return (
    <div className="service-page">
      <PageTitle title="Email Marketing" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Email Marketing Services</h2>
              <p>Reach your customers directly with targeted email campaigns.</p>
              
              <h3 className="mt-4">Services Include:</h3>
              <ul>
                <li>Email campaign design and management</li>
                <li>Newsletter creation</li>
                <li>Automated email sequences</li>
                <li>List building and segmentation</li>
                <li>Performance analytics</li>
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

export default EmailMarketing;