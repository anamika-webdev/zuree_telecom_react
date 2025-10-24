// FILE: src/pages/AboutUs.jsx
// ============================================
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const AboutUs = () => {
  const breadcrumbs = [{ label: 'About Us' }];

  return (
    <div className="about-page">
      <PageTitle title="About Us" breadcrumbItems={breadcrumbs} />
      
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <h2 className="mb-4">Welcome to Zuree Telecom</h2>
              <p className="lead">
                Founded in 2014 by experienced telecom professionals, Zuree Telecom
                has been at the forefront of digital transformation.
              </p>
              <p>
                We specialize in providing comprehensive infrastructure analysis and
                communications solutions tailored to meet the unique needs of our clients.
              </p>
              <Link to="/vision-mission" className="mt-3 btn btn-primary">
                Our Vision & Mission
              </Link>
            </div>
          </div>

          {/* --- New Image Section --- */}
          <div className="mt-5 row">
            <div className="mb-4 col-lg-4 col-md-6">
              <img 
                src="/images/image_7ff521.png" 
                alt="About Us 1" 
                className="rounded shadow img-fluid" 
              />
            </div>
            <div className="mb-4 col-lg-4 col-md-6">
              <img 
                src="/images/image_7ff221.png" 
                alt="About Us 2" 
                className="rounded shadow img-fluid" 
              />
            </div>
            <div className="mb-4 col-lg-4 col-md-6">
              <img 
                src="/images/image_7ff1ff.png" 
                alt="About Us 3" 
                className="rounded shadow img-fluid" 
              />
            </div>
          </div>
          {/* --- End Image Section --- */}
          
        </div>
      </section>
    </div>
  );
};

export default AboutUs;