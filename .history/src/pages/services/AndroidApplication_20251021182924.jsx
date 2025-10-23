// FILE: src/pages/services/AndroidApplication.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const AndroidApplication = () => {
  const breadcrumbs = [
    { label: 'Services' },
    { label: 'Android Application' }
  ];

  return (
    <div className="service-page">
      <PageTitle title="Android Application Development" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Android Application Development Services</h2>
              <p>
                At Zuree Telecom, we specialize in creating cutting-edge Android applications
                that deliver exceptional user experiences.
              </p>
              
              <h3 className="mt-4">Our Services Include:</h3>
              <ul>
                <li>Custom Android app development</li>
                <li>Material Design implementation</li>
                <li>Integration with third-party APIs</li>
                <li>App testing and quality assurance</li>
                <li>Play Store deployment</li>
              </ul>

              <div className="mt-5">
                <Link to="/contact-us" className="btn btn-primary">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AndroidApplication;