// FILE: src/pages/services/IOSApplication.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const IOSApplication = () => {
  const breadcrumbs = [
    { label: 'Services' },
    { label: 'iOS Application' }
  ];

  return (
    <div className="service-page">
      <PageTitle title="iOS Application Development" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>iOS Application Development Services</h2>
              <p>Build powerful iOS applications for iPhone and iPad with our expert team.</p>
              
              <h3 className="mt-4">What We Offer:</h3>
              <ul>
                <li>Native iOS development</li>
                <li>Swift and Objective-C expertise</li>
                <li>App Store optimization</li>
                <li>UI/UX design</li>
                <li>Maintenance and support</li>
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

export default IOSApplication;