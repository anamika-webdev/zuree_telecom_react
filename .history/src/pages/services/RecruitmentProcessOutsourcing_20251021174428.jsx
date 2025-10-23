// FILE: src/pages/services/RecruitmentProcessOutsourcing.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const RecruitmentProcessOutsourcing = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Recruitment Process Outsourcing' }];

  return (
    <div className="service-page">
      <PageTitle title="Recruitment Process Outsourcing (RPO)" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Recruitment Process Outsourcing</h2>
              <p>Streamline your hiring process with our RPO solutions.</p>
              
              <h3 className="mt-4">Services Include:</h3>
              <ul>
                <li>End-to-end recruitment</li>
                <li>Candidate sourcing and screening</li>
                <li>Interview coordination</li>
                <li>Onboarding support</li>
                <li>Recruitment analytics</li>
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

export default RecruitmentProcessOutsourcing;