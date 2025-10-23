// FILE: src/pages/services/WindowsApplication.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';

const WindowsApplication = () => {
  const breadcrumbs = [{ label: 'Services' }, { label: 'Windows Application' }];

  return (
    <div className="service-page">
      <PageTitle title="Windows Application Development" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Windows Application Development</h2>
              <p>Desktop applications for Windows platform with modern technologies.</p>
              
              <h3 className="mt-4">Services Include:</h3>
              <ul>
                <li>.NET Framework applications</li>
                <li>WPF and WinForms</li>
                <li>UWP applications</li>
                <li>Desktop application modernization</li>
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

export default WindowsApplication;