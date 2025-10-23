// FILE: src/pages/services/StaffAugmentation.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const StaffAugmentation = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Staff Augmentation' }];

  return (
    <div className="service-page">
      <PageTitle title="Staff Augmentation & Flexi Staffing" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Staff Augmentation Services</h2>
              <p>Scale your team quickly with skilled professionals.</p>
              
              <h3 className="mt-4">What We Provide:</h3>
              <ul>
                <li>Contract staffing</li>
                <li>Project-based teams</li>
                <li>Skill-specific resources</li>
                <li>Flexible engagement models</li>
                <li>Quick onboarding</li>
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

export default StaffAugmentation;