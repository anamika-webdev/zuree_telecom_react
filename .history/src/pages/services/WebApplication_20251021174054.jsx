// FILE: src/pages/services/WebApplication.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const WebApplication = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Web Application' }];

  return (
    <div className="service-page">
      <PageTitle title="Web Application Development" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Web Application Development Services</h2>
              <p>Create powerful, scalable web applications tailored to your business needs.</p>
              
              <h3 className="mt-4">Our Expertise:</h3>
              <ul>
                <li>Custom web application development</li>
                <li>React, Angular, Vue.js</li>
                <li>Node.js, .NET, PHP</li>
                <li>Responsive design</li>
                <li>Progressive Web Apps (PWA)</li>
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

export default WebApplication;